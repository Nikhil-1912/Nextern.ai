import React, { useState } from "react";
import { UserRole } from "../types";
import { X, Mail, ShieldCheck, Lock } from "lucide-react";
import { 
  registerEmailPassword, 
  loginEmailPassword, 
  resetPassword,
  googleSignIn,
  fetchUserProfile,
} from "../lib/googleAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; role: UserRole }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot_password'>('login');
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (mode === 'forgot_password') {
        if (!email) throw new Error("Please enter your email address.");
        await resetPassword(email);
        setSentMessage("If an account exists, a password reset email has been sent. Please check your inbox and spam folder.");
        setLoading(false);
        return;
      }

      if (mode === 'register') {
        if (name.trim().length < 3) throw new Error("Please enter your full official name.");
        if (password !== confirmPassword) throw new Error("Passwords do not match.");
        if (password.length < 6) throw new Error("Password should be at least 6 characters.");
        
        const user = await registerEmailPassword(email, password, name);
        onLoginSuccess({
          name: user.displayName || name,
          email: user.email || email,
          role: UserRole.STUDENT,
        });
        onClose();
      } else if (mode === 'login') {
        const user = await loginEmailPassword(email, password);
        const profile = await fetchUserProfile(user.uid);
        onLoginSuccess({
          name: profile?.fullName || user.displayName || email.split("@")[0],
          email: user.email || email,
          role: UserRole.STUDENT,
        });
        onClose();
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setErrorMsg("An account with this email already exists. Please log in.");
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setErrorMsg("Invalid email or password.");
      } else {
        setErrorMsg(err.message || "Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const result = await googleSignIn();
      if (result) {
        const profile = await fetchUserProfile(result.user.uid);
        onLoginSuccess({
          name: profile?.fullName || result.user.displayName || result.user.email?.split("@")[0] || "Student",
          email: result.user.email || "",
          role: UserRole.STUDENT,
        });
        onClose();
      }
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      if (err.code === "auth/unauthorized-domain" || (err.message && err.message.includes("unauthorized-domain"))) {
        setErrorMsg("auth/unauthorized-domain");
      } else {
        setErrorMsg(err.message || "Google Sign-In failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetState = (newMode: 'login' | 'register' | 'forgot_password') => {
    setMode(newMode);
    setErrorMsg("");
    setSentMessage(null);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl relative w-full max-w-md overflow-hidden rounded-2xl animate-scale-up">
        
        {/* Header */}
        <div className="p-6 text-center border-b border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold tracking-tighter">N</div>
            <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">Nextern.ai</span>
          </div>
          <p className="text-sm text-zinc-500 font-medium">Build your career in tech.</p>
        </div>

        <div className="p-6 md:p-8">
          {sentMessage ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <p className="font-semibold text-zinc-900 dark:text-white text-sm">Check your inbox</p>
              <p className="text-sm text-zinc-500">{sentMessage}</p>
              <button
                onClick={() => resetState('login')}
                className="pt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <>
              {mode !== 'forgot_password' && (
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => resetState('login')}
                    className={`flex-1 text-sm font-semibold pb-2 border-b-2 transition-colors ${
                      mode === 'login' ? "text-indigo-600 border-indigo-600" : "text-zinc-400 border-transparent hover:text-zinc-600"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => resetState('register')}
                    className={`flex-1 text-sm font-semibold pb-2 border-b-2 transition-colors ${
                      mode === 'register' ? "text-indigo-600 border-indigo-600" : "text-zinc-400 border-transparent hover:text-zinc-600"
                    }`}
                  >
                    Register
                  </button>
                </div>
              )}

              {mode === 'forgot_password' && (
                <div className="mb-6 text-center">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Reset Password</h3>
                  <p className="text-sm text-zinc-500">Enter your email address to receive a password reset link.</p>
                </div>
              )}

              {errorMsg === "auth/unauthorized-domain" ? (
                <div className="p-4 mb-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-800 dark:text-amber-200 text-xs space-y-3">
                  <div className="flex items-center gap-2 font-semibold text-sm text-amber-900 dark:text-amber-205">
                    <ShieldCheck className="w-5 h-5 text-amber-550 shrink-0" />
                    <span>Domain Authorization Required</span>
                  </div>
                  <p className="leading-relaxed">
                    Firebase blocked this authentication flow because the current domain is not registered as an authorized domain in your <strong>nextern-ai</strong> project.
                  </p>
                  
                  <div className="space-y-1.5 pt-1">
                    <span className="font-semibold block uppercase tracking-wide text-[9px] text-zinc-500 dark:text-zinc-400">
                      Domains you MUST authorize:
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between p-1.5 px-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                        <code className="font-mono text-[10px] select-all">{window.location.hostname}</code>
                        <button 
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.hostname);
                          }}
                          className="text-[10px] uppercase font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-1.5 px-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                        <code className="font-mono text-[10px] select-all">nexternai.netlify.app</code>
                        <button 
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText("nexternai.netlify.app");
                          }}
                          className="text-[10px] uppercase font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-amber-200/40 dark:border-amber-900/40 leading-relaxed text-[11px]">
                    <span className="font-semibold block uppercase tracking-wide text-[9px] text-zinc-500 dark:text-zinc-400">
                      How to add them:
                    </span>
                    <ol className="list-decimal pl-4 space-y-0.5 text-zinc-700 dark:text-zinc-300">
                      <li>Open your <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-indigo-600 dark:text-indigo-400">Firebase Console</a></li>
                      <li>Select your project <strong>nextern-ai</strong></li>
                      <li>Go to <strong>Authentication</strong> &rarr; <strong>Settings</strong> &rarr; <strong>Authorized domains</strong></li>
                      <li>Click <strong>Add domain</strong> and add both domains from above</li>
                      <li>Refresh this page &amp; try again!</li>
                    </ol>
                  </div>
                  
                  <div className="pt-1">
                    <button 
                      type="button"
                      onClick={() => setErrorMsg("")}
                      className="w-full py-2 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/40 dark:hover:bg-amber-900/60 font-semibold rounded-lg text-center text-amber-900 dark:text-amber-200 transition-colors text-[10.5px]"
                    >
                      Close &amp; Reset
                    </button>
                  </div>
                </div>
              ) : errorMsg && (
                <div className="p-3 mb-4 bg-red-50 text-red-600 text-xs rounded-lg font-medium flex items-start gap-2">
                  <div className="mt-0.5"><Lock className="w-4 h-4" /></div>
                  <p>{errorMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-sm p-3 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm p-3 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>

                {mode !== 'forgot_password' && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">Password <span className="text-red-500">*</span></label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-sm p-3 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                )}

                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5 uppercase tracking-wide">Confirm Password <span className="text-red-500">*</span></label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full text-sm p-3 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                )}

                {mode === 'login' && (
                  <div className="flex items-center justify-between mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900" 
                      />
                      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Remember Me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => resetState('forgot_password')}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? "Processing..." : (mode === 'login' ? "Sign In" : mode === 'register' ? "Create Account" : "Send Reset Link")}
                  </button>
                </div>
              </form>

              {mode !== 'forgot_password' && (
                <>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">or</span>
                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1"></div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleGoogleSignIn}
                      className="w-full py-3 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-medium rounded-xl shadow-sm transition-all flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </button>
                  </div>
                </>
              )}

              {mode === 'forgot_password' && (
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => resetState('login')}
                    className="text-xs font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  >
                    Back to login
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

