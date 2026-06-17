import React, { useState, useEffect } from "react";
import { User, Internship } from "../types";
import {
  googleSignIn,
  getAccessToken,
  initAuth,
  logoutGmail,
  fetchGmailThreads,
  sendGmailMessage,
  GmailMessageSummary
} from "../lib/googleAuth";
import {
  Mail,
  Send,
  Loader2,
  RefreshCw,
  Search,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Lock,
  UserCheck,
  ShieldCheck,
  Inbox,
  FileText,
  Share2,
  LogOut,
  MailQuestion,
  FileCode,
  Trophy
} from "lucide-react";

interface GmailConsoleProps {
  user: User;
  activeInternship: Internship;
  onLoggedSuccess?: (email: string) => void;
}

export const GmailConsole: React.FC<GmailConsoleProps> = ({ user, activeInternship, onLoggedSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [googleUser, setGoogleUser] = useState<any>(null);
  const [threads, setThreads] = useState<GmailMessageSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("subject:Nextern OR Nextern");
  const [mailboxLoading, setMailboxLoading] = useState<boolean>(false);
  
  // Composer states
  const [recipient, setRecipient] = useState<string>(user.email);
  const [subject, setSubject] = useState<string>(`Nextern Official Pathway Credentials - ${activeInternship?.domainTitle || "Candidate Space"}`);
  const [messageBody, setMessageBody] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("offer");
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sending, setSending] = useState<boolean>(false);
  
  // Confirmation state
  const [showConfirmSend, setShowConfirmSend] = useState<boolean>(false);

  // Auto-init on load
  useEffect(() => {
    initAuth(
      (fireUser, resolvedToken) => {
        setGoogleUser(fireUser);
        setToken(resolvedToken);
        loadInbox(resolvedToken);
      },
      () => {
        setToken(null);
        setGoogleUser(null);
      }
    );
  }, []);

  // Update composer dynamically based on template selection
  useEffect(() => {
    if (selectedTemplate === "offer") {
      setSubject(`Nextern Official Offer Letter Dispatch - ${activeInternship?.domainTitle || "Internship"}`);
      setMessageBody(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 4px solid #18181b; padding: 24px; background-color: #ffffff;">
          <h2 style="color: #4f46e5; font-family: 'Courier New', Courier, monospace; border-bottom: 2px solid #e4e4e7; padding-bottom: 12px; margin-top: 0;">NEXTERN PATHWAY VERIFIED AGREEMENT</h2>
          <p>Dear <strong>${user.name}</strong>,</p>
          <p>We are delighted to dispatch your official verified digital <strong>Offer Agreement Letter</strong> under the accredited Nextern SaaS System.</p>
          <div style="background-color: #f4f4f5; border-left: 4px solid #4f46e5; padding: 12px; margin: 18px 0; font-family: monospace;">
            <p style="margin: 4px 0;"><strong>Role:</strong> Project Intern</p>
            <p style="margin: 4px 0;"><strong>Specialization Domain:</strong> ${activeInternship?.domainTitle || "Software Engineer"}</p>
            <p style="margin: 4px 0;"><strong>Accreditor Hash Ref:</strong> ${activeInternship?.id || "N/A"}</p>
            <p style="margin: 4px 0;"><strong>Offer Code:</strong> ${activeInternship?.offerLetterId || "N/A"}</p>
            <p style="margin: 4px 0;"><strong>Compensation Status:</strong> Verified Level Award</p>
          </div>
          <p>To inspect your live interactive sandbox and review the real-time milestone curriculum, lock onto the candidate portal. Share your progress to accelerate industry connections.</p>
          <p style="font-size: 11px; color: #71717a; border-top: 1px dashed #e4e4e7; padding-top: 12px; margin-top: 24px;">This message was dispatched securely on behalf of ${user.name} via real-time Gmail API pipeline integration.</p>
        </div>
      `);
    } else if (selectedTemplate === "certificate") {
      setSubject(`Nextern Pathway Completion Verified Credentials - ${user.name}`);
      setMessageBody(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 4px solid #f59e0b; padding: 24px; background-color: #ffffff;">
          <h2 style="color: #d97706; font-family: 'Courier New', Courier, monospace; border-bottom: 2px solid #fef3c7; padding-bottom: 12px; margin-top: 0;">NEXTERN PATHWAY COMPLETION DISPATCH</h2>
          <p>Congratulations, <strong>${user.name}</strong>!</p>
          <p>You have successfully completed all verified project-based milestone requirements for the <strong>${activeInternship?.domainTitle || "Specialist"}</strong> pathway.</p>
          <div style="background-color: #fffbeb; border: 2px solid #fef3c7; border-left: 4px solid #d97706; padding: 12px; margin: 18px 0; font-family: monospace;">
            <p style="margin: 4px 0;"><strong>Accreditor Name:</strong> ${user.name}</p>
            <p style="margin: 4px 0;"><strong>Certificate Ref:</strong> ${activeInternship?.certificateId || "NX-CERT-ACTIVE"}</p>
            <p style="margin: 4px 0;"><strong>Final Evaluation:</strong> Flawless compliance benchmarks (Passed)</p>
          </div>
          <p>Your accreditation credentials are now permanent. Please review the enclosed instructions for integrating these credentials into your digital resume or LinkedIn profile.</p>
          <p style="font-size: 11px; color: #71717a; border-top: 1px dashed #e4e4e7; padding-top: 12px; margin-top: 24px;">This message was dispatched securely on behalf of ${user.name} via real-time Gmail API pipeline integration.</p>
        </div>
      `);
    } else {
      setSubject(`Scholar Project Compliance Report: ${activeInternship?.domainTitle || "Workspace"}`);
      setMessageBody(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 4px solid #18181b; padding: 24px; background-color: #ffffff;">
          <h2 style="color: #10b981; font-family: 'Courier New', Courier, monospace; border-bottom: 2px solid #e4e4e7; padding-bottom: 12px; margin-top: 0;">PROJECT EVALUATION ALERT</h2>
          <p>Nextern Workspace Compliance update for candidate: <strong>${user.name}</strong>.</p>
          <p>A recent milestone has completed automation checking through the Nextern SaaS evaluative framework.</p>
          <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 12px; margin: 18px 0; font-family: monospace;">
             <p style="margin: 4px 0;"><strong>Path Segment:</strong> Milestone Assessment Completed</p>
             <p style="margin: 4px 0;"><strong>Evaluation Grade:</strong> A+ (Exceptional Compliance)</p>
          </div>
          <p>Connect with university deans or recruiters by forwarding this verified record direct from your Nextern account.</p>
          <p style="font-size: 11px; color: #71717a; border-top: 1px dashed #e4e4e7; padding-top: 12px; margin-top: 24px;">Message dispatched on behalf of ${user.name} with authentic OAuth Gmail credentials.</p>
        </div>
      `);
    }
  }, [selectedTemplate, user, activeInternship]);

  const loadInbox = async (activeToken: string) => {
    setMailboxLoading(true);
    try {
      const messageSummaries = await fetchGmailThreads(activeToken, searchQuery);
      setThreads(messageSummaries);
    } catch (err) {
      console.error("Failed to fetch Gmail updates:", err);
    } finally {
      setMailboxLoading(false);
    }
  };

  const handleOAuthLogin = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setGoogleUser(result.user);
        if (onLoggedSuccess) onLoggedSuccess(result.user.email || "");
        loadInbox(result.accessToken);
      }
    } catch (err) {
      console.error("Sign-in failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogout = async () => {
    try {
      await logoutGmail();
      setToken(null);
      setGoogleUser(null);
      setThreads([]);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Safe wrapper for Sending email - requires explicit verification check
  const confirmAndSend = () => {
    if (!recipient || !subject || !messageBody) {
      alert("Please provide recipient, subject, and message content first!");
      return;
    }
    setShowConfirmSend(true);
  };

  const executeSendMail = async () => {
    setShowConfirmSend(false);
    if (!token) return;

    setSending(true);
    setSendSuccess(null);
    setSendError(null);

    try {
      await sendGmailMessage(token, recipient, subject, messageBody);
      setSendSuccess(`Successfully sent real email to "${recipient}" using your authenticated Gmail address!`);
      // Reload inbox in background to show sent message
      setTimeout(() => loadInbox(token), 3000);
    } catch (err: any) {
      console.error("Send failed:", err);
      setSendError(`Gmail Dispatch Failure: ${err?.message || err}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] overflow-hidden">
      {/* Console Header */}
      <div className="bg-zinc-950 text-white p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-4 border-zinc-950 font-pixel">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-400 animate-pulse" />
          <h3 className="text-xs uppercase tracking-tight">REAL GMAIL OAUTH INTEGRATION CONSOLE</h3>
        </div>

        {token && googleUser ? (
          <div className="flex items-center gap-2.5">
            {googleUser.photoURL && (
              <img
                src={googleUser.photoURL}
                alt="Google Avatar"
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full border border-white"
              />
            )}
            <span className="text-[9px] text-zinc-300 font-mono lower">{googleUser.email}</span>
            <button
              onClick={handleOAuthLogout}
              className="text-[8px] bg-red-650 bg-red-600 hover:bg-red-700 font-pixel text-white px-2 py-1 border border-zinc-950 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <LogOut className="w-3 h-3 inline-block mr-1" /> DISCONNECT
            </button>
          </div>
        ) : (
          <span className="text-[8.5px] text-indigo-400">Offline (Local Simulation Active)</span>
        )}
      </div>

      {!token ? (
        /* Guest Authorization Splash Block */
        <div className="p-8 text-center space-y-5">
          <div className="w-14 h-14 bg-indigo-50 dark:bg-zinc-800 rounded-full border-4 border-zinc-950 flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <MailQuestion className="w-7 h-7 text-indigo-500 animate-[bounce_1.5s_infinite]" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h4 className="text-sm font-pixel text-slate-950 dark:text-white uppercase">CONNECT REAL GOOGLE WORKSPACE API</h4>
            <p className="text-xs text-zinc-500 font-normal leading-relaxed">
              Unlock authentic email synchronization! Connect your real Google Account to browse your Gmail inbox for verified curriculum credentials, or actually dispatch professional offer letters and milestone badges straight from the Nextern terminal to your university recruiters.
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={handleOAuthLogin}
              disabled={loading}
              className="gsi-material-button font-sans font-semibold border-2 border-zinc-950 shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              style={{ minWidth: "220px" }}
            >
              <div className="gsi-material-button-state"></div>
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style={{ display: "block" }}>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents font-semibold">
                  {loading ? "Authorizing Applet..." : "Sign in with Google"}
                </span>
                <span style={{ display: "none" }}>Sign in with Google</span>
              </div>
            </button>
          </div>

          <div className="p-3.5 bg-yellow-50 dark:bg-zinc-950 border border-yellow-250 dark:border-zinc-800 rounded-lg text-left max-w-lg mx-auto flex gap-3 text-[11px] leading-relaxed text-zinc-500 font-sans">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800 dark:text-zinc-300">Workspace Compliance Guarantee</p>
              This integration utilizes Google OAuth 2.0 with limited Gmail scope access, operating entirely sandboxed. Recipient tokens are cached strictly in-memory and are never written to disk or shared with external analytics.
            </div>
          </div>
        </div>
      ) : (
        /* Workspace Active Console */
        <div className="grid grid-cols-1 lg:grid-cols-12 border-t-2 border-zinc-950">
          {/* Recent Emails Inspector (Left, 5 cols) */}
          <div className="lg:col-span-5 p-4 border-b-2 lg:border-b-0 lg:border-r-2 border-zinc-950 flex flex-col space-y-4">
            <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-950 p-2.5 border-2 border-zinc-950">
              <span className="text-[9px] font-pixel text-slate-800 dark:text-zinc-200 flex items-center gap-1">
                <Inbox className="w-3.5 h-3.5 text-indigo-500" />
                GMAIL READER (Inbox)
              </span>
              <button
                onClick={() => loadInbox(token)}
                disabled={mailboxLoading}
                className="p-1 border border-zinc-900 bg-white dark:bg-zinc-800 rounded hover:bg-zinc-100 text-slate-900 dark:text-white cursor-pointer"
                title="Refresh mailbox threads"
              >
                <RefreshCw className={`w-3 h-3 ${mailboxLoading ? "animate-spin" : ""}`} />
              </button>
            </div>

            {/* Custom search filter */}
            <div className="relative font-mono">
              <input
                type="text"
                placeholder="Search queries (e.g. subject:Nextern)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadInbox(token)}
                className="w-full text-[10px] pl-7 pr-4 py-1.5 bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-950 text-slate-900 dark:text-white focus:outline-none placeholder-zinc-500 rounded"
              />
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2 top-2.5 pointer-events-none" />
            </div>

            {mailboxLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-zinc-400 font-pixel text-[10px] gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                Retrieving Gmail index...
              </div>
            ) : threads.length === 0 ? (
              <div className="flex-1 py-12 text-center text-zinc-400 font-sans text-xs flex flex-col items-center justify-center gap-1 border border-dashed border-zinc-300 dark:border-zinc-800">
                <Inbox className="w-6 h-6 text-zinc-300 mb-1" />
                No matching threads found in Inbox.
                <span className="text-[10px] text-zinc-500 mt-1">Try changing your filter keywords to generic terms or empty.</span>
              </div>
            ) : (
              <div className="space-y-2 overflow-y-auto max-h-[380px] pr-1">
                {threads.map((item) => (
                  <div
                    key={item.id}
                    className={`p-2.5 border-2 border-zinc-950 transition-all ${
                      item.isNexternRelated
                        ? "bg-indigo-500/5 hover:bg-indigo-500/10 border-indigo-400/50"
                        : "bg-white dark:bg-zinc-900/40 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <div className="flex justify-between items-start text-[10px] leading-none mb-1 text-zinc-400 font-mono">
                      <span className="truncate max-w-[150px] font-bold text-slate-700 dark:text-zinc-300" title={item.from}>
                        {item.from.replace(/<.*>/, "")}
                      </span>
                      <span className="shrink-0 text-[9px] text-zinc-500">{item.date.split(",")[1]?.trim().slice(0, 11) || item.date}</span>
                    </div>

                    <h5 className="text-[11px] font-bold text-slate-900 dark:text-white truncate mb-1" title={item.subject}>
                      {item.subject}
                    </h5>
                    <p className="text-[10px] text-zinc-400 line-clamp-2 leading-tight">
                      {item.snippet}
                    </p>

                    {item.isNexternRelated && (
                      <span className="inline-block mt-1.5 text-[8px] font-pixel bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 px-1 py-0.5 rounded leading-none uppercase">
                        Nextern Compliance Label
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mailbox Document Dispatcher Composer (Right, 7 cols) */}
          <div className="lg:col-span-7 p-4 space-y-4 flex flex-col">
            <div className="bg-zinc-50 dark:bg-zinc-950 p-2.5 border-2 border-zinc-950 font-pixel text-[9px] uppercase text-slate-800 dark:text-zinc-200">
              MIME DOCUMENT DISPATCH COMPOSER
            </div>

            {/* Template Selector */}
            <div className="space-y-1">
              <label className="text-[10px] font-pixel uppercase tracking-wider text-zinc-450 block">SELECT CONFIGURED CREDENTIAL TEMPLATE</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate("offer")}
                  className={`py-2 px-3 border-2 border-zinc-950 text-left cursor-pointer transition-all ${
                    selectedTemplate === "offer"
                      ? "bg-indigo-600 text-white font-pixel text-[9px] shadow-[2px_2px_0px_0px_#000]"
                      : "bg-zinc-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold font-sans text-xs"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 inline mr-1" />
                  Offer Letter
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTemplate("certificate")}
                  className={`py-2 px-3 border-2 border-zinc-950 text-left cursor-pointer transition-all ${
                    selectedTemplate === "certificate"
                      ? "bg-amber-500 text-slate-950 font-pixel text-[9px] shadow-[2px_2px_0px_0px_#000]"
                      : "bg-zinc-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold font-sans text-xs"
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 inline mr-1" />
                  Certificate
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTemplate("compliance")}
                  className={`py-2 px-3 border-2 border-zinc-950 text-left cursor-pointer transition-all ${
                    selectedTemplate === "compliance"
                      ? "bg-emerald-600 text-white font-pixel text-[9px] shadow-[2px_2px_0px_0px_#000]"
                      : "bg-zinc-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold font-sans text-xs"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
                  Audit Report
                </button>
              </div>
            </div>

            {/* Form details */}
            <div className="space-y-3 font-mono text-xs text-slate-800 dark:text-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-pixel tracking-wider text-zinc-400">DISPATCH TO:</label>
                  <input
                    type="email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="recipient@domain.com"
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-950 text-slate-900 dark:text-white rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-pixel tracking-wider text-zinc-400">EMAIL SUBJECT:</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter subject heading"
                    className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-950 text-slate-900 dark:text-white rounded"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] uppercase font-pixel tracking-wider text-zinc-400">MIME PACK BODY (HTML):</label>
                  <span className="text-[9px] text-zinc-500 font-sans">Dynamic placeholders live</span>
                </div>
                <textarea
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  rows={6}
                  className="w-full p-3 bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-950 text-slate-900 dark:text-white font-mono text-[10px] rounded"
                />
              </div>
            </div>

            {/* Alerts of state */}
            {sendSuccess && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 rounded text-emerald-600 dark:text-emerald-400 text-xs font-sans">
                ✓ {sendSuccess}
              </div>
            )}
            {sendError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border-2 border-red-500 rounded text-red-650 dark:text-red-400 text-xs font-sans flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>{sendError}</span>
              </div>
            )}

            {/* Call to action & verification confirm dialog triggers */}
            <div className="pt-2">
              <button
                type="button"
                onClick={confirmAndSend}
                disabled={sending || mailboxLoading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-400 border-4 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 text-white font-pixel uppercase text-[10px] flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    TRANSMITTING SMTP ENVELOPE...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    SEND VERIFIED EMAIL VIA GMAIL
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workspace Mutation Confirmation Dialog Overlay */}
      {showConfirmSend && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-55 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md overflow-hidden animate-scale-up text-left">
            <div className="bg-zinc-950 text-white p-4 flex justify-between items-center border-b-4 border-zinc-950">
              <h4 className="text-xs font-pixel uppercase tracking-widest text-indigo-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500 animate-bounce" /> Gmail Send Confirmation Required
              </h4>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3.5 bg-yellow-50 dark:bg-zinc-950 border border-yellow-250 dark:border-zinc-800 rounded-lg flex gap-3 text-xs leading-relaxed text-zinc-500 font-sans">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-zinc-300">Workspace security precaution required:</p>
                  You are about to transmit a personalized HTML email from your private authenticated Gmail box (<strong>{googleUser?.email}</strong>) to: <strong className="text-indigo-600">{recipient}</strong>.
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200">
                <p className="text-[10px]"><strong>Subject:</strong> {subject}</p>
                <p className="text-[9.5px] text-zinc-400 line-clamp-3"><strong>MIME Bundle Preview:</strong> {messageBody.replace(/<[^>]*>/g, '').trim().substring(0, 150)}...</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={executeSendMail}
                  className="w-full text-center py-2.5 px-4 rounded-lg text-xs font-pixel uppercase bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  Confirm Send Email
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmSend(false)}
                  className="w-full text-center py-2.5 px-4 rounded-lg text-xs font-pixel uppercase bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
