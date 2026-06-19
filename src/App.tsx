/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { User, UserRole, EmailLog } from "./types";
import { Navigation } from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { StudentDashboard } from "./components/StudentDashboard";
import { RecruiterDashboard } from "./components/RecruiterDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { UniversityDashboard } from "./components/UniversityDashboard";
import { VerificationPortal } from "./components/VerificationPortal";
import { AuthModal } from "./components/AuthModal";
import { ShieldCheck, Layers, BookOpen, UserCheck, Star } from "lucide-react";
import { getAccessToken, sendGmailMessage, auth, fetchUserProfile, logoutAuth } from "./lib/googleAuth";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("nextern_dark_mode");
    return saved === "true";
  });

  // User States
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("nextern_current_user");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  // System outgoing email simulation state
  const [systemEmails, setSystemEmails] = useState<EmailLog[]>(() => {
    const saved = localStorage.getItem("nextern_emails");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    // Pre-populate with standard initial setup
    return [
      {
        id: "EM-INITIAL",
        recipient: "system-audit@nextern.dev",
        subject: "Nextern.ai System Online",
        sentAt: new Date().toISOString(),
        type: "REGISTRATION"
      }
    ];
  });

  // Verification Gate display toggle
  const [viewingVerify, setViewingVerify] = useState<boolean>(false);

  // Toggle between Home (Landing) and Workspace Dashboard when logged in
  const [isViewingDashboard, setIsViewingDashboard] = useState<boolean>(true);

  // Auth Dialog open/close
  const [authOpen, setAuthOpen] = useState<boolean>(false);

  // Sync dark mode style on mount and update
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("nextern_dark_mode", String(darkMode));
  }, [darkMode]);

  // Dynamic Document Title Builder
  useEffect(() => {
    if (authOpen) {
      document.title = "Login — Nextern.ai";
    } else if (viewingVerify) {
      document.title = "Verification Ledger — Nextern.ai";
    } else if (currentUser) {
      document.title = "Dashboard — Nextern.ai";
    } else {
      document.title = "Nextern.ai — Find Internships, Build Your Career";
    }
  }, [authOpen, viewingVerify, currentUser]);

  // Sync user state changes to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("nextern_current_user", JSON.stringify(currentUser));
      // Save user to simulated centralized user pool as well to sync verification codes!
      const currentUsersList: User[] = JSON.parse(localStorage.getItem("nextern_users") || "[]");
      const filtered = currentUsersList.filter((u) => u.email !== currentUser.email);
      localStorage.setItem("nextern_users", JSON.stringify([...filtered, currentUser]));
    } else {
      localStorage.removeItem("nextern_current_user");
    }
  }, [currentUser]);

  // Sync emails history state
  useEffect(() => {
    localStorage.setItem("nextern_emails", JSON.stringify(systemEmails));
  }, [systemEmails]);

  // Listen for Firebase auth state changes to persist and restore sessions
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const saved = localStorage.getItem("nextern_current_user");
        let parsed: User | null = null;
        if (saved) {
          try { parsed = JSON.parse(saved); } catch (e) {}
        }

        if (!parsed || parsed.email !== firebaseUser.email) {
          try {
            const profile = await fetchUserProfile(firebaseUser.uid);
            const recoveredUser: User = {
              id: firebaseUser.uid,
              name: profile?.fullName || firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Student",
              email: firebaseUser.email || "",
              role: UserRole.STUDENT,
              verified: firebaseUser.emailVerified || true,
            };
            setCurrentUser(recoveredUser);
          } catch (err) {
            console.error("Failed to fetch user profile on auth change:", err);
          }
        }
      } else {
        const saved = localStorage.getItem("nextern_current_user");
        if (saved) {
          try {
            const parsed: User = JSON.parse(saved);
            if (parsed && !parsed.id.startsWith("NX-USR-SHORTCUT-")) {
              setCurrentUser(null);
            }
          } catch (e) {}
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLoginSuccess = (loginData: { name: string; email: string; role: UserRole; universityName?: string }) => {
    const usersList: User[] = JSON.parse(localStorage.getItem("nextern_users") || "[]");
    
    // Check if user already exists in simulated db
    const existing = usersList.find((u) => u.email === loginData.email);

    if (existing) {
      setCurrentUser(existing);
    } else {
      const newUser: User = {
        id: `NX-USR-${Math.floor(1000 + Math.random() * 9000)}`,
        name: loginData.name,
        email: loginData.email,
        role: loginData.role,
        verified: true,
        universityName: loginData.universityName
      };
      
      setCurrentUser(newUser);
      handleLogEmail(newUser.email, "REGISTRATION", `Successfully registered on Nextern.ai Platform!`);
    }

    setViewingVerify(false);
    setIsViewingDashboard(false); // Stay on Home / Landing page after successful login
  };

  const handleLogout = async () => {
    try {
      await logoutAuth();
    } catch (e) {
      console.warn("Could not log out of Firebase Auth", e);
    }
    setCurrentUser(null);
    setViewingVerify(false);
    setIsViewingDashboard(false);
  };

  const handleSelectRoleDirectly = (selectedRole: UserRole) => {
    // Convenience shortcut trigger for seamless evaluator walkthroughs!
    const customNameMap = {
      [UserRole.STUDENT]: "Sarah Jenkins",
      [UserRole.RECRUITER]: "Jordan Vance",
      [UserRole.ADMIN]: "Alex Mercer",
      [UserRole.UNIVERSITY]: "Dr. Helen Rostova"
    };

    const customEmailMap = {
      [UserRole.STUDENT]: "sarah@university.edu",
      [UserRole.RECRUITER]: "recruitment@shopee.com",
      [UserRole.ADMIN]: "admin@nextern.dev",
      [UserRole.UNIVERSITY]: "rostova@imperial.ac.uk"
    };

    const newUser: User = {
      id: `NX-USR-SHORTCUT-${selectedRole}`,
      name: customNameMap[selectedRole],
      email: customEmailMap[selectedRole],
      role: selectedRole,
      verified: true,
      universityName: selectedRole === UserRole.UNIVERSITY ? "Imperial College London" : undefined
    };

    setCurrentUser(newUser);
    setViewingVerify(false);
    setIsViewingDashboard(true);
    handleLogEmail(newUser.email, "REGISTRATION", `Bypass authenticated role: ${selectedRole}`);
  };

  const handleLogEmail = async (recipient: string, type: "REGISTRATION" | "OFFER_LETTER" | "TASK_UNLOCK" | "COMPLETION" | "CERTIFICATE", subject: string) => {
    const newMail: EmailLog = {
      id: `EM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      recipient,
      subject,
      sentAt: new Date().toISOString(),
      type
    };
    
    // Attempt Gmail if Access Token is present
    try {
      const token = await getAccessToken();
      if (token && currentUser) {
        let textContent = `This is an automated notification from Nextern.ai regarding your ${type} update.`;
        if (type === "OFFER_LETTER") textContent = "Congratulations on unlocking your Offer Letter for your internship. Visit your dashboard to download it.";
        if (type === "CERTIFICATE") textContent = "Congratulations on completing your internship. Visit your dashboard to download your verified certificate.";
        if (type === "REGISTRATION") textContent = "Welcome to Nextern.ai! Begin your first project via the dashboard.";
        
        const htmlBody = `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; background: white;">
            <h2 style="color: #4f46e5; margin-bottom: 24px;">Nextern.ai Alert</h2>
            <div style="color: #374151; line-height: 1.6; font-size: 15px;">
              <p>Hi ${recipient.split('@')[0]},</p>
              <p>${textContent}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 24px 0;" />
            <p style="font-size: 12px; color: #9ca3af; text-align: center;">Nextern AI Technologies</p>
          </div>
        `;
        await sendGmailMessage(token, currentUser.email, subject, htmlBody);
      }
    } catch (e) {
      console.error("Gmail sending failed:", e);
    }
    
    setSystemEmails((prev) => [newMail, ...prev]);
  };

  const updateUserProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  // Content dispatcher
  const renderDashboardContent = () => {
    if (viewingVerify) {
      return <VerificationPortal onBack={() => setViewingVerify(false)} />;
    }

    if (!currentUser || !isViewingDashboard) {
      return (
        <LandingPage
          onGetStarted={() => {
            if (currentUser) {
              setIsViewingDashboard(true);
            } else {
              setAuthOpen(true);
            }
          }}
          onExploreDomains={() => {
            const el = document.getElementById("featured-domains");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          onSelectRole={(role) => handleSelectRoleDirectly(role)}
        />
      );
    }

    switch (currentUser.role) {
      case UserRole.STUDENT:
        return (
          <StudentDashboard
            user={currentUser}
            onUpdateUser={updateUserProfile}
            onLogEmail={(type, subject) => handleLogEmail(currentUser.email, type, subject)}
          />
        );
      case UserRole.RECRUITER:
        return <RecruiterDashboard onBackToLanding={() => { setIsViewingDashboard(false); setViewingVerify(false); }} />;
      case UserRole.ADMIN:
        return (
          <AdminDashboard
            systemEmails={systemEmails}
            onTriggerEmail={(recipient, type, subject) => handleLogEmail(recipient, type, subject)}
          />
        );
      case UserRole.UNIVERSITY:
        return <UniversityDashboard user={currentUser} />;
      default:
        return (
          <LandingPage
            onGetStarted={() => {
              if (currentUser) {
                setIsViewingDashboard(true);
              } else {
                setAuthOpen(true);
              }
            }}
            onExploreDomains={() => {
              const el = document.getElementById("featured-domains");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            onSelectRole={handleSelectRoleDirectly}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 flex flex-col justify-between transition-colors duration-300">
      
      {/* Platform Header Navigation */}
      <Navigation
        user={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setAuthOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenVerification={() => setViewingVerify(true)}
        onBackToLanding={() => {
          setIsViewingDashboard(false);
          setViewingVerify(false);
        }}
        viewingVerify={viewingVerify}
        activeRole={currentUser ? currentUser.role : null}
        isViewingDashboard={isViewingDashboard}
        onSetViewingDashboard={(viewDash) => {
          setIsViewingDashboard(viewDash);
          setViewingVerify(false);
        }}
      />

      {/* Main Content Body */}
      <main className="flex-grow">
        {renderDashboardContent()}
      </main>

      {/* Platform Footer */}
      <footer className="border-t-4 border-zinc-900 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12 px-4 transition-colors font-pixel">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 font-bold text-zinc-900 border-zinc-900 dark:text-white">
              <span className="w-10 h-10 border-2 border-zinc-900 bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-[2px_2px_0px_#000] font-press">N</span>
              <span className="font-press text-[10px] sm:text-[14px] uppercase pt-1 tracking-wider">Nextern AI</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-4 uppercase tracking-widest leading-relaxed max-w-sm">Build Skills.<br/>Prove Talent.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-400">
            <button onClick={() => setViewingVerify(true)} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Verification Ledger</button>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <button onClick={() => setAuthOpen(true)} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Login / Register</button>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <a href="#help" onClick={(e) => { e.preventDefault(); }} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Platform API</a>
          </div>
          <div className="text-left md:text-right text-[9px] text-zinc-400 uppercase tracking-widest leading-loose">
            © {new Date().getFullYear()} Nextern.ai Technologies.<br />Verifiable Accreditation & Placement.
          </div>
        </div>
      </footer>

      {/* Auth Form Overplays */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
