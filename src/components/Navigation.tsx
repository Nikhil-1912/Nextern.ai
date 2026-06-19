import React, { useState } from "react";
import { User, UserRole } from "../types";
import { Sun, Moon, Bell, Award, LogOut, ChevronDown, Sparkles, Menu, X } from "lucide-react";

interface NavigationProps {
  user: User | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenVerification: () => void;
  onSelectRole: (role: UserRole) => void;
  onBackToLanding: () => void;
  viewingVerify: boolean;
  activeRole: UserRole | null;
  isViewingDashboard: boolean;
  onSetViewingDashboard: (viewDash: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  user,
  onLogout,
  onOpenAuth,
  darkMode,
  onToggleDarkMode,
  onOpenVerification,
  onSelectRole,
  onBackToLanding,
  viewingVerify,
  activeRole,
  isViewingDashboard,
  onSetViewingDashboard
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const alerts = [
    { id: "1", title: "Milestone Verified", desc: "Task 1 code verification complete.", time: "2h" },
    { id: "2", title: "Offer Package Issued", desc: "Signed offer sent to your inbox.", time: "1d" }
  ];

  const ActionControls = () => (
    <>
      <div className="relative">
        <button
          onClick={() => setShowRoleSelector(!showRoleSelector)}
          className="flex items-center justify-between min-w-[44px] min-h-[44px] px-3 py-1.5 border-2 border-zinc-900 dark:border-zinc-700 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-[10px] font-pixel uppercase tracking-wider text-emerald-950 dark:text-emerald-300 transition-colors w-full md:w-auto shadow-[2px_2px_0px_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none"
        >
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>HUD: {activeRole ? activeRole : "Browse"}</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 ml-2" />
        </button>

        {showRoleSelector && (
          <div className="absolute right-0 lg:left-0 mt-3 w-full md:w-56 bg-zinc-50 dark:bg-zinc-900 border-4 border-zinc-900 dark:border-zinc-700 shadow-[4px_4px_0px_#000] p-2 space-y-1 block z-50 text-[10px] font-pixel uppercase">
            <p className="px-2 py-2 border-b-2 border-zinc-900 dark:border-zinc-700 mb-1 font-bold text-zinc-500 tracking-wide text-[8px]">
              Active HUD
            </p>
            <button onClick={() => { onSelectRole(UserRole.STUDENT); setShowRoleSelector(false); setMobileMenuOpen(false); }} className="w-full text-left px-2 py-2.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">Student</button>
            <button onClick={() => { onSelectRole(UserRole.RECRUITER); setShowRoleSelector(false); setMobileMenuOpen(false); }} className="w-full text-left px-2 py-2.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">Recruiter</button>
            <button onClick={() => { onSelectRole(UserRole.ADMIN); setShowRoleSelector(false); setMobileMenuOpen(false); }} className="w-full text-left px-2 py-2.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">Admin</button>
            <button onClick={() => { onSelectRole(UserRole.UNIVERSITY); setShowRoleSelector(false); setMobileMenuOpen(false); }} className="w-full text-left px-2 py-2.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">University</button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <button
          onClick={onToggleDarkMode}
          className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center border-2 border-zinc-900 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-[2px_2px_0px_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none"
          title="Toggle theme mode"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {user && (
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center border-2 border-zinc-900 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-[2px_2px_0px_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-[8px] right-[8px] w-2 h-2 bg-red-500 border-2 border-zinc-900 dark:border-zinc-700" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-zinc-900 border-4 border-zinc-900 dark:border-zinc-700 shadow-[4px_4px_0px_#000] p-4 space-y-3 z-50 font-pixel">
                <h4 className="text-[10px] tracking-wider border-b-2 border-zinc-900 dark:border-zinc-700 pb-2 text-zinc-900 dark:text-white font-bold uppercase">Alerts</h4>
                {alerts.map((alert) => (
                  <div key={alert.id} className="space-y-1.5 pb-2 border-b-2 border-dotted border-zinc-300 dark:border-zinc-700 last:border-b-0">
                    <strong className="block text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase">{alert.title}</strong>
                    <p className="text-[9px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[200px] normal-case tracking-normal">{alert.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {user ? (
        <div className="flex items-center justify-between w-full md:w-auto gap-3 md:border-l-4 md:border-zinc-200 md:dark:border-zinc-800 md:pl-4 pt-4 md:pt-0 border-t-4 border-zinc-200 dark:border-zinc-800 md:border-t-0 font-pixel min-h-[44px]">
          <div className="text-left md:text-right flex-1">
            <span className="block text-[11px] font-bold text-zinc-900 dark:text-white mb-1 uppercase tracking-wider">{user.name}</span>
            <span className="text-[9px] uppercase bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-400 px-1.5 py-0.5 border border-amber-900/20">{user.role}</span>
          </div>
          <button
            onClick={() => { onLogout(); setMobileMenuOpen(false); }}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center border-2 border-zinc-900 dark:border-zinc-700 bg-red-100 dark:bg-red-950/50 hover:bg-red-200 dark:hover:bg-red-900 text-red-600 dark:text-red-400 transition-colors shadow-[2px_2px_0px_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none ml-2"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
          className="px-5 py-2 min-h-[44px] w-full md:w-auto text-[10px] font-bold font-pixel uppercase bg-indigo-600 hover:bg-indigo-700 text-white shadow-[3px_3px_0px_#000] transition-all text-center border-2 border-zinc-900 active:translate-y-[3px] active:translate-x-[3px] active:shadow-none"
        >
          Sign In
        </button>
      )}
    </>
  );

  return (
    <header className="sticky top-0 bg-white dark:bg-zinc-950 border-b-4 border-zinc-900 dark:border-zinc-800 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-[72px] flex items-center justify-between">
        
        <div className="flex items-center gap-6">
          <button
            onClick={() => { onBackToLanding(); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold hover:opacity-80 transition-opacity"
            title="Go to Home"
          >
            <span className="w-10 h-10 border-2 border-zinc-900 bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-[2px_2px_0px_#000] font-press">
              N
            </span>
            <span className="text-zinc-900 dark:text-white font-press text-[10px] sm:text-[14px] uppercase pt-1">
              Nextern AI
            </span>
          </button>

          {/* Quick Tab Selector for Logged-In Users */}
          {user && (
            <div className="hidden md:flex items-center gap-2 border-l-2 border-zinc-200 dark:border-zinc-800 pl-4">
              <button
                onClick={() => { onSetViewingDashboard(false); }}
                className={`min-h-[44px] flex items-center justify-center px-4 py-2 text-[10px] font-pixel font-bold uppercase transition-all shadow-[2px_2px_0px_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none border-2 ${
                  !isViewingDashboard && !viewingVerify
                    ? "bg-indigo-600 text-white border-zinc-900"
                    : "bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white border-zinc-950 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => { onSetViewingDashboard(true); }}
                className={`min-h-[44px] flex items-center justify-center px-4 py-2 text-[10px] font-pixel font-bold uppercase transition-all shadow-[2px_2px_0px_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none border-2 ${
                  isViewingDashboard && !viewingVerify
                    ? "bg-indigo-600 text-white border-zinc-900"
                    : "bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white border-zinc-950 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
              >
                Dashboard
              </button>
            </div>
          )}

          <button
            onClick={() => { onOpenVerification(); setMobileMenuOpen(false); }}
            className={`hidden md:flex min-h-[44px] items-center justify-center gap-2 px-4 py-2 text-[10px] font-pixel font-bold uppercase transition-all shadow-[2px_2px_0px_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none ${
              viewingVerify
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black border-2 border-zinc-900 dark:border-zinc-100"
                : "bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white border-2 border-zinc-900 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            Verify
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center border-2 border-zinc-900 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-[2px_2px_0px_#000] text-zinc-900 dark:text-white active:translate-y-[2px] active:translate-x-[2px] active:shadow-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ActionControls />
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white dark:bg-zinc-900 border-b-4 border-zinc-900 dark:border-zinc-700 shadow-[0_8px_0_rgba(0,0,0,0.1)] px-4 py-6 space-y-5 max-h-[calc(100vh-72px)] overflow-y-auto">
          {user && (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { onSetViewingDashboard(false); setMobileMenuOpen(false); }}
                className={`flex w-full min-h-[44px] items-center justify-center gap-2 px-4 py-3 border-2 text-[10px] font-bold font-pixel uppercase transition-all shadow-[2px_2px_0px_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none ${
                  !isViewingDashboard && !viewingVerify
                    ? "bg-indigo-600 text-white border-zinc-900"
                    : "bg-white text-zinc-900 border-zinc-900 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => { onSetViewingDashboard(true); setMobileMenuOpen(false); }}
                className={`flex w-full min-h-[44px] items-center justify-center gap-2 px-4 py-3 border-2 text-[10px] font-bold font-pixel uppercase transition-all shadow-[2px_2px_0px_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none ${
                  isViewingDashboard && !viewingVerify
                    ? "bg-indigo-600 text-white border-zinc-900"
                    : "bg-white text-zinc-900 border-zinc-900 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
                }`}
              >
                Dashboard
              </button>
            </div>
          )}

          <button
            onClick={() => { onOpenVerification(); setMobileMenuOpen(false); }}
            className={`flex w-full min-h-[44px] items-center justify-center gap-2 px-4 py-3 border-2 text-[10px] font-bold font-pixel uppercase transition-all shadow-[2px_2px_0px_#000] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none ${
              viewingVerify
                ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-black"
                : "bg-white text-zinc-900 border-zinc-900 dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            Verify Credential
          </button>
          <div className="flex flex-col gap-4 pt-2">
            <ActionControls />
          </div>
        </div>
      )}
    </header>
  );
};

