import React, { useState } from "react";
import { User, CompletedInternship } from "../types";
import { ACHIEVEMENTS_DATABASE, evaluateUserBadges, Badge } from "../data/achievements";
import {
  Sparkles, CheckCheck, Layers, Award, Star, ShieldCheck, Lock, Share2, BookOpen, FileCode, CheckCircle,
  Trophy, RotateCcw, Compass, ArrowRight, Zap, ShieldAlert, Archive, Trash2, X, ChevronRight, Check
} from "lucide-react";
import { motion } from "motion/react";

// Lucide Icon resolver component which supports all defined badges
export const AchievementIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-5 h-5" }) => {
  switch (name) {
    case "Sparkles":
      return <Sparkles className={className} />;
    case "CheckCheck":
      return <CheckCheck className={className} />;
    case "Layers":
      return <Layers className={className} />;
    case "Award":
      return <Award className={className} />;
    case "Star":
      return <Star className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    case "Lock":
      return <Lock className={className} />;
    case "Share2":
      return <Share2 className={className} />;
    case "BookOpen":
      return <BookOpen className={className} />;
    case "FileCode":
      return <FileCode className={className} />;
    default:
      return <Trophy className={className} />;
  }
};

interface AchievementCollectionProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onLogEmail: (type: "REGISTRATION" | "OFFER_LETTER" | "TASK_UNLOCK" | "COMPLETION" | "CERTIFICATE", subject: string) => void;
}

export const AchievementCollection: React.FC<AchievementCollectionProps> = ({ user, onUpdateUser, onLogEmail }) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [archiving, setArchiving] = useState(false);

  // Compute earned badge IDs
  const earnedBadgeIds = evaluateUserBadges(user);
  const activeInternship = user.internship;
  const completedCount = earnedBadgeIds.length;
  const totalBadgesCount = ACHIEVEMENTS_DATABASE.length;
  const percentUnlocked = Math.round((completedCount / totalBadgesCount) * 100);

  // Determine user's rank/tier based on achievement percentage
  let rankTitle = "Bronze Initiate";
  let rankColor = "text-amber-700 bg-amber-50 dark:bg-amber-955/35 border-amber-700/30";
  if (percentUnlocked >= 75) {
    rankTitle = "Diamond Scholar Overlord";
    rankColor = "text-sky-500 bg-sky-50 dark:bg-sky-955/35 border-sky-500/30 font-bold";
  } else if (percentUnlocked >= 50) {
    rankTitle = "Gold Elite Programmer";
    rankColor = "text-yellow-600 bg-yellow-50 dark:bg-yellow-955/35 border-yellow-600/30 font-bold";
  } else if (percentUnlocked >= 25) {
    rankTitle = "Silver Ascending Architect";
    rankColor = "text-zinc-550 bg-zinc-50 dark:bg-zinc-800 border-zinc-500/30";
  }

  const handleArchiveCompletedPathway = () => {
    if (!activeInternship || activeInternship.status !== "COMPLETED") return;

    setArchiving(true);
    setTimeout(() => {
      // Create completed internship record
      const newCompletion: CompletedInternship = {
        domainId: activeInternship.domainId,
        domainTitle: activeInternship.domainTitle,
        completedAt: activeInternship.completedAt || new Date().toISOString(),
        certificateId: activeInternship.certificateId || `NX-CERT-${Math.floor(100000 + Math.random() * 900000)}`,
        grade: "A+", // Default to an exceptional grade matching evaluation
        skills: user.biodata?.skills || ["React", "TypeScript", "Node.js"]
      };

      // Save to completed history list and clear current active internship slot
      const existingCompletions = user.completedInternships || [];
      const updatedCompletions = [...existingCompletions.filter(c => c.domainId !== newCompletion.domainId), newCompletion];

      // Automatically add badge ID to unlocked list
      const originalUnlocked = user.unlockedBadgeIds || [];
      const pathwaySpecificBadgeId = 
        newCompletion.domainId === "full-stack" ? "full-stack-overlord" :
        (newCompletion.domainId === "ai-engineer" || newCompletion.domainId === "machine-learning") ? "ai-alchemist" :
        newCompletion.domainId === "uiux-design" ? "uiux-master" : "";

      const updatedUnlocked = [...originalUnlocked, "pathway-mastery"];
      if (pathwaySpecificBadgeId) {
        updatedUnlocked.push(pathwaySpecificBadgeId);
      }

      const updatedUser: User = {
        ...user,
        internship: undefined, // Cleared and reset
        completedInternships: updatedCompletions,
        unlockedBadgeIds: Array.from(new Set(updatedUnlocked))
      };

      onUpdateUser(updatedUser);
      onLogEmail("REGISTRATION", `Internship Pathway Archived. Active workstation slot reset & ready for new pathways!`);
      setArchiving(false);
      alert(`🎉 Pathway successfully archived into your Permanent Portfolio! Active slot reset. Select a new domain on the dashboard to pursue more badges!`);
    }, 1200);
  };

  const copyShareText = (badge: Badge) => {
    const text = `🏆 I've officially unlocked the "${badge.title}" Badge on Nextern! 🚀\n\n- Achievement: ${badge.description}\n- Tier rarity: ${badge.rarity}\n- Verified Portfolio: ${window.location.origin}/portfolio/${user.name.toLowerCase().replace(/\s+/g, "-")}\n\n#GamifiedLearning #Nextern #TechBadges #DevCommunity #MilestoneProgress`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Achievements Overview Panel */}
      <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)]">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-widest font-pixel inline-block text-indigo-600 bg-indigo-50 dark:bg-zinc-800 border-2 border-zinc-950 px-2.5 py-1">
              GAMIFIED SYSTEM CONSOLE
            </span>
            <h2 className="text-xl font-pixel uppercase tracking-normal text-slate-950 dark:text-white">
              MY SCHOLAR BADGE ACCREDIT HISTORY
            </h2>
            <p className="text-xs text-zinc-500 max-w-xl">
              Your real-time project compliance audits, scores, and pathway completions trigger automatic retro badges. Click any unlocked credential to inspect metadata.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-950/60 p-4 border-2 border-zinc-950 flex items-center gap-4 w-full md:w-auto font-mono">
            <div className="w-14 h-14 rounded-full border-4 border-dashed border-indigo-550 flex items-center justify-center font-bold text-lg text-indigo-500 animate-[spin_20s_linear_infinite]">
              <Trophy className="w-6 h-6 rotate-12" />
            </div>
            <div>
              <span className={`text-[10px] font-pixel px-2 py-0.5 border-2 border-zinc-950 uppercase tracking-wider inline-block mb-1.5 ${rankColor}`}>
                {rankTitle}
              </span>
              <p className="text-[11px] text-zinc-400">Total Progress: <strong className="text-indigo-500 font-pixel">{percentUnlocked}%</strong> ({completedCount}/{totalBadgesCount} Badges)</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between items-center text-[10px] font-pixel uppercase text-zinc-450 mb-2">
            <span>UNLOCKED ACCREDITATION REWARDS</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{completedCount} Completed</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-5 border-2 border-zinc-950 overflow-hidden relative">
            <div
              className="bg-indigo-600 h-full transition-all duration-500 relative flex items-center justify-end px-2"
              style={{ width: `${percentUnlocked}%` }}
            >
              {percentUnlocked > 15 && (
                <span className="text-[9px] font-pixel text-white leading-none shrink-0 uppercase">LEVEL UP</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Achievements */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-pixel uppercase tracking-wider text-zinc-450">SYSTEM BADGES INDEX</h3>
          <div className="flex gap-2 text-[9px] font-pixel text-zinc-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-indigo-500/20" /> Unlocked</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-zinc-400/10 border" /> Locked</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ACHIEVEMENTS_DATABASE.map((badge) => {
            const isUnlocked = earnedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                onClick={() => isUnlocked && setSelectedBadge(badge)}
                className={`border-2 p-4 cursor-pointer transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? `bg-gradient-to-br ${badge.bgGradient} border-zinc-950 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]`
                    : "bg-zinc-50 dark:bg-zinc-950/40 border-dashed border-zinc-350 dark:border-zinc-800 text-zinc-400 saturate-50 select-none opacity-60"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className={`w-9 h-9 border-2 flex items-center justify-center rounded-lg ${
                      isUnlocked ? `bg-white dark:bg-zinc-900 border-zinc-950 ${badge.ringColor}` : "bg-zinc-200 dark:bg-zinc-90 w-9 h-9 border-zinc-300 border-dashed text-zinc-400"
                    }`}>
                      {isUnlocked ? (
                        <AchievementIcon name={badge.iconName} className="w-5 h-5" />
                      ) : (
                        <Lock className="w-4 h-4 text-zinc-450" />
                      )}
                    </div>
                    <span className={`text-[8px] font-pixel uppercase px-2 py-0.5 border leading-none ${
                      isUnlocked 
                        ? badge.labelColor + " border-zinc-950"
                        : "bg-zinc-100 text-zinc-500 border-zinc-300"
                    }`}>
                      {badge.rarity}
                    </span>
                  </div>

                  <h4 className={`text-xs font-pixel uppercase leading-tight mb-1.5 ${isUnlocked ? "text-slate-900 dark:text-white-100" : "text-zinc-500"}`}>
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-455 font-sans leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-[10px] font-mono">
                  <span className="text-[9px] uppercase font-pixel tracking-widest text-zinc-400">{badge.category}</span>
                  {isUnlocked ? (
                    <span className="text-emerald-500 font-pixel uppercase flex items-center gap-0.5 text-[8.5px]">
                      <CheckCircle className="w-3.5 h-3.5" /> ACCREDITED
                    </span>
                  ) : (
                    <span className="text-zinc-400 font-pixel uppercase text-[8.5px] flex items-center gap-0.5">
                      <Lock className="w-3 h-3" /> LOCKED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Archiver Tool */}
      {activeInternship?.status === "COMPLETED" && (
        <div className="bg-amber-500/5 border-4 border-amber-500 p-6 shadow-[6px_6px_0px_0px_rgba(245,158,11,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)] text-left animate-fade-in">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest font-pixel inline-block text-amber-500 bg-amber-50 dark:bg-amber-955 border-2 border-amber-500 px-2 py-0.5">
                PATHWAY GRAD MASTER ACTION UNLOCKED
              </span>
              <h3 className="text-base font-pixel uppercase text-slate-950 dark:text-white">
                ARCHIVE COMPLETED WORKSPACE PATHWAY
              </h3>
              <p className="text-xs text-zinc-650 dark:text-zinc-400 max-w-xl">
                Congratulations! You completed all 3 benchmarks for **{activeInternship.domainTitle}**. Archive this completed path to lock its Completion Certificate permanently into your portfolio and **free up your active slot** to enroll in another internship path! This allows you to accumulate multiple grand master badges.
              </p>
            </div>
            <button
              onClick={handleArchiveCompletedPathway}
              disabled={archiving}
              className="w-full md:w-auto px-5 py-3 border-2 border-zinc-950 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-bold uppercase text-[10px] font-pixel shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-1.5 transition-all select-none cursor-pointer"
            >
              {archiving ? (
                <>
                  <Zap className="w-4 h-4 animate-bounce" />
                  Archiving Ledger Records...
                </>
              ) : (
                <>
                  <Archive className="w-4 h-4" />
                  Lock & Start New Pathway
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Badge detail popup dialog */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-55 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md overflow-hidden animate-scale-up text-left">
            <div className="bg-slate-950 text-white p-4 flex justify-between items-center border-b-4 border-zinc-950">
              <h4 className="text-xs font-pixel uppercase tracking-widest text-indigo-400 flex items-center gap-1.5">
                <Trophy className="w-4 h-4" /> Badge Insight Card
              </h4>
              <button
                onClick={() => setSelectedBadge(null)}
                className="text-white/65 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Badge Visual Design Hero */}
              <div className={`p-8 bg-gradient-to-br ${selectedBadge.bgGradient} border-4 border-zinc-950 flex flex-col items-center justify-center text-center relative rounded-xl`}>
                <div className="w-16 h-16 rounded-full border-4 border-zinc-950 bg-white dark:bg-zinc-800 text-slate-955 flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-rotate-12 transition-transform">
                  <AchievementIcon name={selectedBadge.iconName} className="w-9 h-9 text-indigo-500" />
                </div>
                <h3 className="text-base font-pixel text-slate-955 uppercase tracking-wide leading-none mb-1">
                  {selectedBadge.title}
                </h3>
                <span className={`text-[8.5px] font-pixel uppercase px-2 py-0.5 border border-zinc-950 ${selectedBadge.labelColor}`}>
                  {selectedBadge.rarity}
                </span>

                <span className="absolute top-2 right-2 text-[9px] uppercase font-pixel tracking-widest text-zinc-400/50">{selectedBadge.category}</span>
              </div>

              {/* Insights */}
              <div className="space-y-3 font-sans text-xs">
                <div>
                  <h5 className="font-pixel text-[9px] uppercase tracking-widest text-zinc-400 mb-1">Requirement:</h5>
                  <p className="text-zinc-650 dark:text-zinc-300 font-normal leading-relaxed">{selectedBadge.description}</p>
                </div>

                <div>
                  <h5 className="font-pixel text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5">Verified Accreditation Metadata:</h5>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border text-[10px] space-y-1 font-mono text-zinc-450">
                    <p className="flex justify-between"><span>Accreditor ID:</span> <span className="font-bold text-slate-800 dark:text-white">NX-EVAL-294B</span></p>
                    <p className="flex justify-between"><span>Authority:</span> <span className="font-bold text-slate-800 dark:text-white">Nextern SaaS Evaluator</span></p>
                    <p className="flex justify-between"><span>Verification Status:</span> <span className="font-bold text-emerald-500">PROBITY_CHECKS_OK</span></p>
                    <p className="flex justify-between"><span>Academic Integrity:</span> <span className="font-bold text-indigo-500">VERIFIED_SECURE</span></p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={() => copyShareText(selectedBadge)}
                  className="w-full text-center py-2.5 px-4 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copiedText ? "Copied Share Text!" : "Copy Share Link"}
                </button>
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="w-full text-center py-2.5 px-4 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 cursor-pointer"
                >
                  Close Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
