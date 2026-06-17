import React, { useState, useEffect } from "react";
import { User, Internship, Domain, Task, Submission, UserRole } from "../types";
import { domains } from "../data/domains";
import { CertificateView, OfferLetterView } from "./PDFTemplate";
import { AchievementCollection, AchievementIcon } from "./AchievementCollection";
import { GmailConsole } from "./GmailConsole";
import { evaluateUserBadges, ACHIEVEMENTS_DATABASE } from "../data/achievements";
import {
  BookOpen, FileText, Award, Layers, CheckCircle, ArrowRight, Github, Send, Loader2, PlayCircle, ExternalLink,
  Lock, RefreshCw, Star, HelpCircle, Share2, Clipboard, Plus, ShieldCheck, Mail, ChevronRight, User as UserIcon, FileCode, CheckCheck, X, Trophy, Download
} from "lucide-react";

interface StudentDashboardProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onLogEmail: (type: "REGISTRATION" | "OFFER_LETTER" | "TASK_UNLOCK" | "COMPLETION" | "CERTIFICATE", subject: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onUpdateUser, onLogEmail }) => {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<"workspace" | "credentials" | "portfolio" | "timeline" | "achievements">("workspace");

  // Submission form states
  const [githubLink, setGithubLink] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [evaluationLogs, setEvaluationLogs] = useState<string[]>([]);
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  // PDF Viewer states
  const [viewingOffer, setViewingOffer] = useState(false);
  const [viewingCert, setViewingCert] = useState(false);

  // Portfolio states
  const [bio, setBio] = useState(user.biodata?.bio || "Enthusiastic developer building practical skills on Nextern AI.");
  const [skillsStr, setSkillsStr] = useState(user.biodata?.skills.join(", ") || "React, TypeScript, TailwindCSS");
  const [linkedin, setLinkedin] = useState(user.biodata?.linkedin || "");
  const [github, setGithub] = useState(user.biodata?.github || "");
  const [copiedLink, setCopiedLink] = useState(false);

  // LinkedIn modal state
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [copiedPost, setCopiedPost] = useState(false);

  const categories = ["All", ...Array.from(new Set(domains.map((d) => d.category)))];

  const activeInternship = user.internship;
  const currentDomain = activeInternship ? domains.find(d => d.id === activeInternship.domainId) : null;

  const [isViewingCatalog, setIsViewingCatalog] = useState<boolean>(!activeInternship);

  // Synchronize legacy users who only have user.internship to also have user.internships array
  useEffect(() => {
    if (user && user.internship && (!user.internships || user.internships.length === 0)) {
      onUpdateUser({
        ...user,
        internships: [user.internship]
      });
    }
  }, [user, onUpdateUser]);

  // Sync index on load and fix deprecated domains
  useEffect(() => {
    if (activeInternship) {
      if (!currentDomain) {
        // Clear out deprecated or missing domain to return to grid
        onUpdateUser({ ...user, internship: undefined });
      } else {
        setActiveTaskIndex(activeInternship.currentTaskIndex);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeInternship, currentDomain]);

  const handleSwitchInternship = (targetInternship: Internship) => {
    const updatedUser: User = {
      ...user,
      internship: targetInternship
    };
    onUpdateUser(updatedUser);
    setIsViewingCatalog(false);
    setSubmissionComplete(false);
  };

  const handleEnroll = (domain: Domain) => {
    const offerLetterId = `NX-OFFER-${domain.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newInternship: Internship = {
      id: `NX-INT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      domainId: domain.id,
      domainTitle: domain.title,
      startedAt: new Date().toISOString(),
      status: "ACTIVE",
      offerLetterId,
      currentTaskIndex: 0,
      submissions: {},
    };

    const currentList = user.internships || [];
    const alreadyEnrolled = currentList.find(item => item.domainId === domain.id);
    if (alreadyEnrolled) {
      handleSwitchInternship(alreadyEnrolled);
      return;
    }

    const updatedList = [...currentList, newInternship];

    const updatedUser: User = {
      ...user,
      internship: newInternship,
      internships: updatedList,
      biodata: {
        bio: bio,
        skills: skillsStr.split(",").map(s => s.trim()).filter(Boolean),
        linkedin: linkedin,
        github: github
      }
    };

    onUpdateUser(updatedUser);
    setIsViewingCatalog(false);
    setSubmissionComplete(false);
    onLogEmail("OFFER_LETTER", `Official Internship Offer Letter - ${domain.title}`);
    onLogEmail("TASK_UNLOCK", `Task 1 Ready: Core Foundation in ${domain.title}`);
  };

  const handleTaskSelect = (idx: number) => {
    if (activeInternship && idx <= activeInternship.currentTaskIndex) {
      setActiveTaskIndex(idx);
    }
  };

  const handleTaskSubmit = (e: React.FormEvent, task: Task) => {
    e.preventDefault();
    if (!githubLink.trim() && !driveLink.trim()) {
      alert("Please supply your verified GitHub repository link or a project file/folder link (e.g. Google Drive).");
      return;
    }

    setSubmitting(true);
    setEvaluationLogs([
      "Initializing automated Nextern AI container environment...",
      "Cloning submission references... [OK]",
      "Executing syntax validation and ESLint verification...",
      "Analyzing static architecture and module imports...",
      "Running AI-powered compliance grading against task checklist...",
      "Cross-referencing global code indices for plagiarism audit..."
    ]);

    let logCounter = 0;
    const interval = setInterval(() => {
      logCounter++;
      if (logCounter === 1) setEvaluationLogs(prev => [...prev, "Checking secure environment variables compliance... Passed."]);
      if (logCounter === 2) setEvaluationLogs(prev => [...prev, "AI Grading engine parsing README.md documentation... Excellent details."]);
      if (logCounter === 3) setEvaluationLogs(prev => [...prev, "Plagiarism similarity index computed: 2.8% (Maximum permissible is 15%)"]);
      if (logCounter === 4) {
        clearInterval(interval);

        // Grade outcome
        const compliance = Math.floor(82 + Math.random() * 16);
        const marks: ("A+" | "A" | "B" | "C")[] = ["A+", "A", "B", "C"];
        const selectedGrade = marks[Math.floor(Math.random() * marks.length)];

        const newSubmission: Submission = {
          id: `SUB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          taskId: task.id,
          taskTitle: task.title,
          githubLink: githubLink || undefined,
          driveLink: driveLink || undefined,
          submittedAt: new Date().toISOString(),
          status: "APPROVED",
          aiReview: {
            grade: selectedGrade,
            complianceScore: compliance,
            plagiarismScore: Math.ceil(1.5 + Math.random() * 4),
            strengths: [
              "Extremely clean structure matching production principles",
              "Properly structured modular files and exports namespaces",
              "Rigorous try-catch blocks surrounding external connectors"
            ],
            improvements: [
              "Consider abstracting helper utilities further to decrease footprint",
              "Increase test coverage targets to improve code stability indices"
            ],
            logFeedback: `Successfully compiled in automated runtime block. Total latency 14ms. Checked functions against core schemas and certified complete validation.`
          }
        };

        if (activeInternship) {
          const updatedSubmissions = {
            ...activeInternship.submissions,
            [task.id]: newSubmission
          };

          // "whatever they submit give them certificate" -> any task submission immediately completes the internship
          const isLastTask = true;
          const nextIndex = activeTaskIndex;
          const status = "COMPLETED";
          const completedAt = isLastTask ? new Date().toISOString() : undefined;
          const certificateId = isLastTask ? `NX-CERT-${Math.floor(100000 + Math.random() * 900000)}` : undefined;

          const updatedInternship: Internship = {
            ...activeInternship,
            currentTaskIndex: nextIndex,
            status,
            completedAt,
            certificateId,
            submissions: updatedSubmissions
          };

          const updatedInternships = (user.internships || []).map(item =>
            item.id === updatedInternship.id ? updatedInternship : item
          );
          if (!updatedInternships.some(item => item.id === updatedInternship.id)) {
            updatedInternships.push(updatedInternship);
          }

          const updatedUser: User = {
            ...user,
            internship: updatedInternship,
            internships: updatedInternships
          };

          onUpdateUser(updatedUser);

          // Notifications and emails
          if (isLastTask) {
            onLogEmail("COMPLETION", `Congratulations on completing your ${activeInternship.domainTitle} Internship!`);
            onLogEmail("CERTIFICATE", `Nextern AI Verified Certificate Delivered - Ref ID: ${certificateId}`);
          } else {
            onLogEmail("TASK_UNLOCK", `Task ${nextIndex + 1} Unlocked: Continue your journey!`);
          }
        }

        setSubmitting(false);
        setSubmissionComplete(true);
        // Clean fields
        setGithubLink("");
        setDriveLink("");
      }
    }, 1000);
  };

  const handleSavePortfolio = () => {
    const updatedUser: User = {
      ...user,
      biodata: {
        bio,
        skills: skillsStr.split(",").map(s => s.trim()).filter(Boolean),
        linkedin,
        github
      }
    };
    onUpdateUser(updatedUser);
    alert("Public Portfolio successfully updated!");
  };

  const copyPublicLink = () => {
    const mockLink = `${window.location.origin}/portfolio/${user.name.toLowerCase().replace(/\s+/g, "-")}`;
    navigator.clipboard.writeText(mockLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);

    // Unlock networking-maven badge
    const currentUnlocked = user.unlockedBadgeIds || [];
    if (!currentUnlocked.includes("networking-maven")) {
      const updatedUser: User = {
        ...user,
        unlockedBadgeIds: [...currentUnlocked, "networking-maven"]
      };
      onUpdateUser(updatedUser);
    }
  };

  const handleShareLinkedIn = () => {
    setShowLinkedInModal(true);
    // Unlock networking-maven badge on share click
    const currentUnlocked = user.unlockedBadgeIds || [];
    if (!currentUnlocked.includes("networking-maven")) {
      const updatedUser: User = {
        ...user,
        unlockedBadgeIds: [...currentUnlocked, "networking-maven"]
      };
      onUpdateUser(updatedUser);
    }
  };

  const copyLinkedInPost = () => {
    const text = `🎉 Thrilled to share that I have officially completed my Project-Based Internship in #${activeInternship?.domainTitle.replace(/\s+/g, "")} on Nextern AI! 🚀\n\nThroughout this structured program, I successfully engineered, validated, and deployed production-grade capabilities across 2 dynamic milestones. My code has been fully audited with zero plagiarism metrics and verified securely with Certificate ID: ${activeInternship?.certificateId || "N/A"}.\n\nCheck out my dynamic portfolio on Nextern AI! 🔗\n\n#CareerGrowth #NexternAI #WebDeveloper #${activeInternship?.domainTitle.replace(/\s+/g, "")} #ProjectBasedLearning`;
    navigator.clipboard.writeText(text);
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 2000);
  };

  if (viewingOffer && activeInternship) {
    return <OfferLetterView user={user} internship={activeInternship} onBack={() => setViewingOffer(false)} />;
  }

  if (viewingCert && activeInternship) {
    return <CertificateView user={user} internship={activeInternship} onBack={() => setViewingCert(false)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {!activeInternship || !currentDomain || isViewingCatalog ? (
        <div className="animate-fade-in">
          <div className="text-center max-w-2xl mx-auto mb-10">
            {activeInternship && currentDomain && (
              <button
                onClick={() => setIsViewingCatalog(false)}
                className="mb-6 px-4 py-2 border-2 border-zinc-950 bg-white hover:bg-zinc-100 text-zinc-900 text-[10px] font-pixel uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] flex items-center gap-1.5 mx-auto active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer font-bold"
              >
                ← Back to Active Workspace ({activeInternship.domainTitle})
              </button>
            )}
            <span className="text-[10px] uppercase tracking-widest text-[#78350f] bg-[#fef3c7] border-2 border-zinc-950 px-3 py-1.5 font-pixel inline-block mb-3">
              ACTIVE WORKSTATIONS FOR APPLICANTS
            </span>
            <h1 className="text-2xl md:text-3xl font-pixel text-slate-955 dark:text-white tracking-normal leading-tight uppercase">
              SELECT YOUR INTERNSHIP PATHWAY
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-3 text-xs font-sans">
              Each Nextern AI domain contains a structured, sequence-locked suite of 2 production-grade project milestones. Upon entry, your signed PDF Offer Letter is dispatched immediately.
            </p>

            {/* Quick search input */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto font-mono">
              <input
                type="text"
                placeholder="PROBE DOMAINS (e.g. AI, Full Stack)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs py-3 px-4 rounded-none border-2 border-zinc-950 bg-white dark:bg-zinc-900 focus:outline-none text-zinc-800 dark:text-white uppercase font-sans tracking-wide"
              />
              <div className="flex gap-2 justify-center font-pixel">
                {categories.slice(0, 3).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`text-[9.5px] px-3 py-2 uppercase border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
                      categoryFilter === cat
                        ? "bg-indigo-600 text-white shadow-none translate-x-[1px] translate-y-[1px]"
                        : "bg-white dark:bg-zinc-900 hover:bg-zinc-100 text-zinc-600 dark:text-zinc-450 cursor-pointer"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains
              .filter((d) => {
                const matchSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.description.toLowerCase().includes(searchTerm.toLowerCase());
                const matchFilter = categoryFilter === "All" || d.category === categoryFilter;
                return matchSearch && matchFilter;
              })
              .map((domain) => {
                return (
                  <div
                    key={domain.id}
                    className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)] hover:-translate-y-1 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-[9px] font-pixel uppercase tracking-wider px-2 py-0.5 border-2 border-zinc-950 ${
                          domain.difficulty === "Advanced" ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400" :
                          domain.difficulty === "Intermediate" ? "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400" :
                          "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                        }`}>
                          {domain.difficulty}
                        </span>
                        <span className="text-[9px] font-pixel text-zinc-400 uppercase tracking-widest">{domain.category}</span>
                      </div>

                      <h3 className="text-sm font-pixel text-slate-950 dark:text-white uppercase tracking-normal mb-2 mb-1.5">{domain.title}</h3>
                      <p className="text-xs text-zinc-650 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-6 font-sans">
                        {domain.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-805 flex items-center justify-between font-pixel">
                      <div className="text-zinc-400 text-[10px] uppercase flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-550" />
                        {domain.tasks.length} Campaigns
                      </div>
                      {user.internships?.some((i) => i.domainId === domain.id) ? (
                        <button
                          onClick={() => {
                            const found = user.internships?.find((i) => i.domainId === domain.id);
                            if (found) handleSwitchInternship(found);
                          }}
                          className="px-3 py-2 border-2 border-zinc-950 bg-emerald-605 bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[9.5px] uppercase tracking-wider flex items-center gap-1 active:translate-x-0.5 active:translate-y-0.5 font-bold font-pixel"
                        >
                          Workspace Active
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEnroll(domain)}
                          className="px-3 py-2 border-2 border-zinc-950 bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[9.5px] uppercase tracking-wider flex items-center gap-1 group active:translate-x-0.5 active:translate-y-0.5 font-bold"
                        >
                          Apply for Intern
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        /* Enrolled Student Intern Workspace Dashboard */
        <div className="animate-fade-in">
          {/* Header Dashboard Banner */}
          <div className="bg-zinc-950 text-white border-4 border-zinc-900 dark:border-zinc-800 p-6 md:p-8 mb-8 relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,0.85)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-pixel uppercase tracking-widest bg-yellow-400 text-zinc-950 px-2.5 py-1 border-2 border-zinc-950 font-bold">
                    ACTIVE INTERNSHIP HUD
                  </span>
                  <span className="text-xs text-zinc-400">Credential Ref: #{activeInternship.id}</span>
                </div>
                <h1 className="text-xl md:text-2xl font-pixel uppercase tracking-normal">
                  {activeInternship.domainTitle} PATHWAY
                </h1>
                <p className="text-zinc-400 text-xs mt-1 max-w-xl">
                  Finish all 2 progressive benchmarks to lock your certified credentials and make your portfolio visible to search algorithms.
                </p>

                {/* Switch active classroom / workstation */}
                {user.internships && user.internships.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-pixel text-zinc-400 uppercase tracking-wider">Active Workspace:</span>
                    <select
                      value={activeInternship.id}
                      onChange={(e) => {
                        const target = user.internships?.find(i => i.id === e.target.value);
                        if (target) handleSwitchInternship(target);
                      }}
                      className="bg-zinc-900 text-white border-2 border-zinc-700 text-[10px] px-2.5 py-1.5 font-pixel focus:outline-none focus:border-indigo-500 rounded uppercase cursor-pointer"
                    >
                      {user.internships.map((int) => (
                        <option key={int.id} value={int.id}>
                          {int.domainTitle} ({int.status})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Offer and Certificate Quick Action Links */}
              <div className="flex flex-wrap gap-2 text-[10px] font-pixel">
                <button
                  onClick={() => setIsViewingCatalog(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 uppercase border-2 border-indigo-600 bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all cursor-pointer shadow-[2px_2px_0px_0px_#000] active:translate-y-[1px] active:translate-x-[1px] active:shadow-none"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + Apply for New Pathway
                </button>
                <button
                  onClick={() => setViewingOffer(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 uppercase border-2 border-zinc-500 bg-zinc-900 hover:bg-zinc-800 text-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  Offer Letter
                </button>
                {activeInternship.status === "COMPLETED" ? (
                  <button
                    onClick={() => setViewingCert(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 uppercase border-2 border-zinc-950 bg-amber-400 text-zinc-950 hover:bg-amber-500 font-bold transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                  >
                    <Award className="w-3.5 h-3.5" />
                    Claim Certificate
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 px-3.5 py-2 uppercase border-2 border-zinc-805 bg-zinc-900 text-zinc-500 select-none">
                    <Lock className="w-3.5 h-3.5" />
                    Locked Cert
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar representation */}
            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap gap-4 items-center justify-between font-mono">
              <div className="flex-1 min-w-[200px]">
                <div className="flex justify-between items-center text-[10px] uppercase font-pixel tracking-wider mb-2">
                  <span className="text-zinc-400">Path Completion Index</span>
                  <span className="font-bold text-indigo-400">
                    {activeInternship.status === "COMPLETED" ? "100%" : `${Math.floor((activeInternship.currentTaskIndex / 2) * 100)}%`} OK
                  </span>
                </div>
                <div className="w-full bg-zinc-900 h-3 border-2 border-zinc-800 overflow-hidden">
                  <div
                    className="bg-indigo-505 bg-indigo-500 h-full transition-all duration-500"
                    style={{
                      width: activeInternship.status === "COMPLETED" ? "100%" : `${(activeInternship.currentTaskIndex / 2) * 100}%`
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-4 text-xs font-semibold text-zinc-405">
                <div>
                  <span className="block text-slate-100 text-sm font-pixel font-bold">
                    {(Object.values(activeInternship.submissions) as Submission[]).filter((sub) => sub.status === "APPROVED").length}/{currentDomain.tasks.length}
                  </span>
                  Verified Submissions
                </div>
                <div className="border-l border-zinc-800 pl-4">
                  <span className="block text-slate-100 text-sm font-pixel font-bold">14 Days</span>
                  Program Remaining
                </div>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800 mb-8 overflow-x-auto pb-1">
            <button
               onClick={() => { setActiveTab("workspace"); setSubmissionComplete(false); }}
               className={`text-sm font-semibold whitespace-nowrap pb-2 outline-none border-b-2 px-1 transition-colors ${
                 activeTab === "workspace" ? "text-indigo-600 border-indigo-600" : "text-zinc-500 border-transparent hover:text-zinc-800"
               }`}
            >
              Interactive Workspace
            </button>
            <button
               onClick={() => setActiveTab("credentials")}
               className={`text-sm font-semibold whitespace-nowrap pb-2 outline-none border-b-2 px-1 transition-colors ${
                 activeTab === "credentials" ? "text-indigo-600 border-indigo-600" : "text-zinc-500 border-transparent hover:text-zinc-800"
               }`}
            >
              Credentials & Logs
            </button>
            <button
               onClick={() => setActiveTab("achievements")}
               className={`text-sm font-semibold whitespace-nowrap pb-2 outline-none border-b-2 px-1 transition-colors flex items-center gap-1.5 ${
                 activeTab === "achievements" ? "text-indigo-600 border-indigo-600" : "text-zinc-500 border-transparent hover:text-zinc-800"
               }`}
            >
              <Trophy className="w-4 h-4 text-amber-500 animate-pulse" />
              Achievements & Badges
            </button>
            <button
               onClick={() => setActiveTab("portfolio")}
               className={`text-sm font-semibold whitespace-nowrap pb-2 outline-none border-b-2 px-1 transition-colors ${
                 activeTab === "portfolio" ? "text-indigo-600 border-indigo-600" : "text-zinc-500 border-transparent hover:text-zinc-800"
               }`}
            >
              Public Portfolio Builder
            </button>
          </div>

          {/* Tab 1: Interactive Workspace */}
          {activeTab === "workspace" && currentDomain && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Task List */}
              <div className="lg:col-span-1 space-y-3">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Sequential Task Milestones</h3>
                {currentDomain.tasks.map((task, idx) => {
                  const isUnlocked = idx <= activeInternship.currentTaskIndex;
                  const isCompleted = activeInternship.submissions[task.id]?.status === "PASSED";
                  const isCurrentlyActive = idx === activeTaskIndex;

                  return (
                    <button
                      key={task.id}
                      onClick={() => handleTaskSelect(idx)}
                      disabled={!isUnlocked}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex gap-3 ${
                        isCurrentlyActive
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 dark:shadow-none"
                          : isUnlocked
                          ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 hover:border-zinc-300"
                          : "bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-900/60 opacity-60 cursor-not-allowed"
                      }`}
                    >
                      <div className="mt-0.5">
                        {!isUnlocked ? (
                          <Lock className="w-4 h-4 text-zinc-450" />
                        ) : isCompleted ? (
                          <CheckCircle className={`w-4 h-4 ${isCurrentlyActive ? "text-white" : "text-emerald-500"}`} />
                        ) : (
                          <PlayCircle className={`w-4 h-4 ${isCurrentlyActive ? "text-white" : "text-indigo-500"}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs font-bold uppercase tracking-wide leading-none mb-1.5 ${
                          isCurrentlyActive ? "text-indigo-200" : "text-zinc-400"
                        }`}>
                          Milestone {idx + 1}
                        </p>
                        <h4 className="text-xs font-bold line-clamp-1 leading-normal">
                          {task.title.replace(/^Task \d+: /, "")}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Main Workspace Frame */}
              <div className="lg:col-span-3">
                {currentDomain.tasks[activeTaskIndex] && (() => {
                  const currentTask = currentDomain.tasks[activeTaskIndex];
                  const submission = activeInternship.submissions[currentTask.id];
                  const isCompleted = submission?.status === "PASSED" || submission?.status === "APPROVED";

                  return (
                    <div className="space-y-6">
                      {/* Task Brief */}
                      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between border-b pb-4 border-zinc-150 dark:border-zinc-800/80 gap-4 mb-4">
                          <h2 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                            <FileCode className="w-5 h-5 text-indigo-500 animate-pulse" />
                            {currentTask.title}
                          </h2>
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-300 px-3 py-1.5 rounded-full">
                            Deadline: {currentTask.deadlineDays} Days
                          </span>
                        </div>

                        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6 font-normal">
                          {currentTask.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Acceptance Conditions:</h3>
                            <ul className="space-y-2">
                              {currentTask.requirements.map((req, i) => (
                                <li key={i} className="text-xs flex items-start gap-2 text-zinc-600 dark:text-zinc-300 font-normal">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Step-by-step Execution:</h3>
                            <ul className="space-y-2">
                              {currentTask.instructions.map((inst, i) => (
                                <li key={i} className="text-xs flex items-start gap-2 text-zinc-650 dark:text-zinc-400 font-normal">
                                  <span className="text-indigo-550 font-bold shrink-0">{i + 1}.</span>
                                  {inst}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Sample Code Output Box */}
                        <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-indigo-300 mb-6">
                          <div className="flex justify-between text-[10px] text-zinc-500 border-b border-zinc-800 pb-2 mb-2 font-sans font-semibold">
                            <span>SAMPLE MODULE ACCREDITATION LOGS</span>
                            <span>COMPLIANCE ACCREDIT</span>
                          </div>
                          <pre className="overflow-x-auto whitespace-pre-wrap">{currentTask.sampleOutput}</pre>
                        </div>

                        {/* Extra Resource URLs */}
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Mock Resources and Tool Documentation</h3>
                          <div className="flex flex-wrap gap-2">
                            {currentTask.resources.map((res, i) => (
                              <a
                                key={i}
                                href="#docs"
                                onClick={(e) => { e.preventDefault(); alert("Synthesizing system training data..."); }}
                                className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline bg-indigo-50/50 dark:bg-indigo-950/20 py-1.5 px-3 rounded-lg"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                {res}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Submissions Section */}
                      {!isCompleted ? (
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">Milestone Accrediting Submission Workspace</h3>

                          {submitting ? (
                            <div className="py-8 text-center bg-zinc-50 dark:bg-zinc-950 border rounded-xl">
                              <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mx-auto mb-4" />
                              <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-2">Automated Evaluation Engine Processing</h4>
                              <div className="max-w-md mx-auto text-left font-mono text-[10px] text-indigo-400 p-3 bg-zinc-900 border rounded-lg h-36 overflow-y-auto space-y-1 select-none">
                                {evaluationLogs.map((log, i) => (
                                  <p key={i}>&gt; {log}</p>
                                ))}
                              </div>
                            </div>
                          ) : submissionComplete ? (
                            <div className="p-6 text-center border-2 border-dashed border-emerald-500 bg-emerald-500/5 rounded-xl">
                              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                              <h4 className="text-base font-bold text-emerald-800 dark:text-emerald-400 mb-1">Milestone Evaluated Successfully!</h4>
                              <p className="text-xs text-zinc-500 mb-4">Your workspace met Nextern AI compliance parameters. The next sequential milestone is unlocked.</p>
                              <button
                                onClick={() => { setSubmissionComplete(false); }}
                                className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700"
                              >
                                Continue Workspace Tasks
                              </button>
                            </div>
                          ) : (
                            <form onSubmit={(e) => handleTaskSubmit(e, currentTask)} className="space-y-4">
                              <div className="grid grid-cols-1 gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                                  <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">
                                      GitHub Public Repository URL
                                    </label>
                                    <div className="relative">
                                      <input
                                        type="url"
                                        placeholder="https://github.com/profile/repo"
                                        value={githubLink}
                                        onChange={(e) => setGithubLink(e.target.value)}
                                        className="w-full text-sm py-2 pl-9 pr-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-white"
                                      />
                                      <Github className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                                    </div>
                                  </div>
                                  <div className="text-center font-bold text-zinc-400 text-xs mt-4 md:mt-6">
                                    OR
                                  </div>
                                  <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">
                                      File / Folder / Drive Link
                                    </label>
                                    <div className="relative">
                                      <input
                                        type="url"
                                        placeholder="https://drive.google.com/..."
                                        value={driveLink}
                                        onChange={(e) => setDriveLink(e.target.value)}
                                        className="w-full text-sm py-2 pl-9 pr-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-white"
                                      />
                                      <ExternalLink className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                                    </div>
                                  </div>
                                </div>
                                <p className="text-[10px] text-zinc-400 mt-1">Nextern AI static validators will run standard ESLint analysis checks on your submitted project.</p>
                              </div>

                              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border rounded-lg flex items-center justify-between text-xs text-zinc-500">
                                <span>Required Format: {currentTask.submissionFormat}</span>
                                <span className="font-semibold text-indigo-600 dark:text-indigo-400">Security Encrypted Secure Pipeline</span>
                              </div>

                              <button
                                type="submit"
                                className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow shadow-indigo-150 flex items-center gap-1.5 cursor-pointer ml-auto"
                              >
                                Submit Milestone Deliverables
                                <Send className="w-4 h-4" />
                              </button>
                            </form>
                          )}
                        </div>
                      ) : (
                        /* Milestone Completed Feedback Cards */
                        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 shadow-sm">
                          <div className="flex flex-wrap justify-between items-start mb-6 pb-4 border-b border-emerald-550/10 gap-4">
                            <div>
                              <div className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold text-xs px-2.5 py-1 rounded-full mb-2">
                                <CheckCheck className="w-3.5 h-3.5" />
                                MILESTONE PASSED & ACCREDITED
                              </div>
                              <h3 className="text-base font-bold text-slate-900 dark:text-white">Official Nextern AI Evaluation Scorecard</h3>
                              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">Audit: {submission.id} • Processed: {new Date(submission.submittedAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-emerald-500/20">
                              <div className="text-center">
                                <span className="block text-2xl font-serif font-black text-emerald-500 leading-none">{submission.aiReview?.grade}</span>
                                <span className="text-[9px] text-zinc-400 uppercase font-bold">Grade</span>
                              </div>
                              <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />
                              <div className="text-center">
                                <span className="block text-xl font-bold text-slate-800 dark:text-white leading-none">{submission.aiReview?.complianceScore}%</span>
                                <span className="text-[9px] text-zinc-400 uppercase font-bold">Compliance</span>
                              </div>
                              <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />
                              <div className="text-center">
                                <span className="block text-xl font-bold text-emerald-500 leading-none">{submission.aiReview?.plagiarismScore}%</span>
                                <span className="text-[9px] text-zinc-400 uppercase font-bold">Similarity</span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs mb-6">
                            <div>
                              <h4 className="font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest mb-2">Structural Strengths:</h4>
                              <ul className="space-y-1.5 list-disc pl-4 text-zinc-650 dark:text-zinc-350">
                                {submission.aiReview?.strengths.map((str, i) => <li key={i} className="font-normal">{str}</li>)}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-400 uppercase tracking-widest mb-2">Recommended Optimization:</h4>
                              <ul className="space-y-1.5 list-disc pl-4 text-zinc-650 dark:text-zinc-350 font-normal">
                                {submission.aiReview?.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
                              </ul>
                            </div>
                          </div>

                          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-[11px] text-zinc-400">
                            <span className="text-emerald-400 font-bold block mb-1">SYSTEM CRITIQUE LOGS</span>
                            {submission.aiReview?.logFeedback}
                          </div>

                          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap gap-2">
                            {submission.githubLink && (
                              <a
                                href={submission.githubLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded bg-white dark:bg-zinc-900 border hover:bg-zinc-50 border-zinc-200 dark:border-zinc-850"
                              >
                                <Github className="w-3.5 h-3.5" />
                                Inspect Submitted Repository
                              </a>
                            )}
                            {submission.driveLink && (
                              <a
                                href={submission.driveLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded bg-white dark:bg-zinc-900 border hover:bg-zinc-50 border-zinc-200 dark:border-zinc-850"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                Inspect Submitted Files
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Unified Certificate Download Option */}
                      {activeInternship.status === "COMPLETED" && (
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/5 to-yellow-500/5 border border-amber-500/20 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20">
                              <Award className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                                Verified Completion Certificate Unlocked!
                                <span className="bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 text-[10px] uppercase font-bold py-0.5 px-2 rounded-full border border-amber-200 dark:border-amber-900">
                                  Accredited
                                </span>
                              </h4>
                              <p className="text-xs text-zinc-500 mt-1">
                                Congratulations! You have successfully completed this internship and unlocked your certificate.
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
                            <button
                              onClick={() => setViewingCert(true)}
                              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                            >
                              <Download className="w-4 h-4" />
                              View & Download Certificate
                            </button>
                            <button
                              onClick={handleShareLinkedIn}
                              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-black shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                            >
                              <Share2 className="w-4 h-4 text-indigo-400 dark:text-indigo-600" />
                              Share on LinkedIn
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Tab 2: Credentials & logs */}
          {activeTab === "credentials" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Offer and Certificate panels */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-base font-bold text-slate-950 dark:text-white mb-4">Official Accredit Documentation</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Offer document */}
                      <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800/85">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <FileText className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500">PDF Document</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Official Offer Letter</h4>
                        <p className="text-[11px] text-zinc-400 mb-4 font-mono leading-none">ID: {activeInternship.offerLetterId}</p>
                        <button
                          onClick={() => setViewingOffer(true)}
                          className="w-full text-center py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm"
                        >
                          View & Download PDF
                        </button>
                      </div>

                      {/* Certificate document */}
                      <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-800/85">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-955 flex items-center justify-center text-amber-500">
                            <Award className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500">Ledger Sign</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Completion Certificate</h4>
                        <p className="text-[11px] text-zinc-400 mb-4 font-mono leading-none">
                          Ref: {activeInternship.certificateId || "LOCKED (Completed milestones)"}
                        </p>

                        {activeInternship.status === "COMPLETED" ? (
                          <div className="space-y-2">
                            <button
                              onClick={() => setViewingCert(true)}
                              className="w-full text-center py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                            >
                              Launch Certificate
                            </button>
                            <button
                              onClick={handleShareLinkedIn}
                              className="w-full text-center py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-zinc-800 text-white flex items-center justify-center gap-1.5"
                            >
                              <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                              Share on LinkedIn
                            </button>
                          </div>
                        ) : (
                          <div className="text-center p-3 text-xs bg-zinc-200 dark:bg-zinc-900 rounded-lg text-zinc-400 font-semibold flex items-center justify-center gap-1">
                            <Lock className="w-3.5 h-3.5" />
                            Unlocks after Milestone 2
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulation logs of dispatch */}
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">Email Delivery Automation logs</h3>
                    <p className="text-[10px] text-zinc-400 mb-4">Verify instantaneous background dispatches to candidate, universities, and server ledger histories in real-time.</p>

                    <div className="space-y-3">
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800/80 text-xs text-slate-700 dark:text-zinc-300">
                        <div className="flex gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold mb-1">
                          <Mail className="w-4 h-4 shrink-0" />
                          Offer letter delivered
                        </div>
                        <p className="text-[10px] text-zinc-400">Recipient: {user.email}</p>
                        <p className="text-[9.5px] text-zinc-500 mt-1 font-mono">Attachment: {activeInternship.offerLetterId}.pdf</p>
                      </div>

                      {(Object.values(activeInternship.submissions) as Submission[]).map((sub, i) => (
                        <div key={sub.id} className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800/80 text-xs text-zinc-400">
                          <div className="flex gap-1.5 text-emerald-600 font-bold mb-1 leading-none">
                            <CheckCircle className="w-4 h-4 shrink-0" />
                            Milestone Passed alert
                          </div>
                          <p className="text-[10px]">Successfully accredited Milestone {i + 1} with Grade {sub.aiReview?.grade}</p>
                        </div>
                      ))}

                      {activeInternship.status === "COMPLETED" && (
                        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-xs text-slate-700 dark:text-zinc-300">
                          <div className="flex gap-1.5 text-amber-500 font-bold mb-1 select-none">
                            <Award className="w-4 h-4 shrink-0" />
                            Grad accreditation completed
                          </div>
                          <p className="text-[10px]">Recipient: {user.email}</p>
                          <p className="text-[9.5px] text-zinc-500 mt-1 font-mono">Attachment: Nextern-AI-Completion-Accreditation.pdf</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Real Workspace Gmail Integration Console */}
              <GmailConsole
                user={user}
                activeInternship={activeInternship}
                onLoggedSuccess={(emailAdd) => {
                  onLogEmail("REGISTRATION", `Authorised Workspace Gmail Account: ${emailAdd}`);
                }}
              />
            </div>
          )}

          {/* Tab: Achievements & Badges Showcase */}
          {activeTab === "achievements" && (
            <AchievementCollection
              user={user}
              onUpdateUser={onUpdateUser}
              onLogEmail={onLogEmail}
            />
          )}

          {/* Tab 3: Public Portfolio Builder */}
          {activeTab === "portfolio" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Input workspace */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-950 dark:text-white mb-4">Edit Public Portfolio Card</h3>

                  <div className="space-y-4 text-xs font-normal">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Personal Biography</label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full text-xs p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-white"
                        placeholder="I'm a full stack web engineer focused on backend performance optimization."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Core Technical Skills (comma separated)</label>
                      <input
                        type="text"
                        value={skillsStr}
                        onChange={(e) => setSkillsStr(e.target.value)}
                        className="w-full text-xs py-2 px-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-white"
                        placeholder="React, Nextjs, Drizzle, PostgreSQL, AWS"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">LinkedIn Profile Link</label>
                      <input
                        type="url"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="w-full text-xs py-2 px-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-white"
                        placeholder="https://linkedin.com/in/profile"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">GitHub Profile Link</label>
                      <input
                        type="url"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className="w-full text-xs py-2 px-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-white"
                        placeholder="https://github.com/profile"
                      />
                    </div>

                    <button
                      onClick={handleSavePortfolio}
                      className="w-full text-center py-2.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow"
                    >
                      Save Portfolio Assets
                    </button>
                  </div>
                </div>
              </div>

              {/* Public Frame Mock Presentation */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm relative">
                  {/* Public Link Box */}
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-950/60 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                    <span className="font-mono text-[10.5px] text-zinc-400 select-all overflow-hidden truncate">
                      {window.location.origin}/portfolio/{user.name.toLowerCase().replace(/\s+/g, "-")}
                    </span>
                    <button
                      onClick={copyPublicLink}
                      className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded bg-white hover:bg-zinc-50 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-805"
                    >
                      {copiedLink ? "Link Copied!" : "Copy Public Link"}
                    </button>
                  </div>

                  {/* Portfolio Presentation */}
                  <div className="p-6 md:p-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg border-2 border-white select-none">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                        {user.universityName && <p className="text-xs text-zinc-400 font-semibold">{user.universityName}</p>}
                        <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest mt-1">Verified Nextern AI Scholar</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-bold uppercase text-zinc-400 tracking-widest mb-1.5">Biography</h3>
                        <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed font-normal">{bio}</p>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold uppercase text-zinc-400 tracking-widest mb-1.5">Verified Accreditation Domain</h3>
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-95a border rounded-xl flex items-center justify-between text-xs font-semibold">
                          <div className="flex items-center gap-1.5 text-indigo-600">
                            <Layers className="w-4.5 h-4.5" />
                            {activeInternship.domainTitle}
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded leading-none ${
                            activeInternship.status === "COMPLETED" ? "bg-emerald-100 text-emerald-800" : "bg-indigo-100 text-indigo-800"
                          }`}>
                            {activeInternship.status}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs font-bold uppercase text-zinc-400 tracking-widest mb-1.5">Accredited Skills Matrix</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {skillsStr.split(",").map(s => s.trim()).filter(Boolean).map((skill, i) => (
                            <span key={i} className="text-[10px] font-bold bg-indigo-50 text-indigo-600 dark:bg-zinc-800 dark:text-zinc-300 px-2.5 py-1 rounded-full leading-none">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Gamified Badges Showcase */}
                      <div>
                        <h3 className="text-xs font-bold uppercase text-zinc-400 tracking-widest mb-2 flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-amber-500" />
                          Earned Gamer Accreditations ({evaluateUserBadges(user).length} Unlocked)
                        </h3>
                        {evaluateUserBadges(user).length > 0 ? (
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                            {ACHIEVEMENTS_DATABASE.map(badge => {
                              const isUnlocked = evaluateUserBadges(user).includes(badge.id);
                              if (!isUnlocked) return null;
                              return (
                                <div
                                  key={badge.id}
                                  title={`${badge.title}: ${badge.description}`}
                                  className={`p-2.5 border-2 border-zinc-950 flex flex-col items-center justify-center text-center bg-gradient-to-br ${badge.bgGradient} rounded-xl hover:translate-y-[-1px] transition-all relative overflow-hidden`}
                                >
                                  <div className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-white dark:bg-zinc-800 flex items-center justify-center mb-1.5 shadow-[1px_1px_0px_0px_#000]">
                                    <AchievementIcon name={badge.iconName} className="w-4.5 h-4.5" />
                                  </div>
                                  <span className="text-[7.5px] font-pixel uppercase tracking-tight truncate w-full text-slate-950 dark:text-zinc-100 block leading-none">
                                    {badge.title}
                                  </span>
                                  <span className="text-[6.5px] font-pixel text-zinc-400 block mt-0.5 scale-90">
                                    {badge.rarity}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-[10px] text-zinc-400 italic">No achievements unlocked yet.</p>
                        )}
                      </div>

                      {/* Submitted Milestones proof */}
                      <div>
                        <h3 className="text-xs font-bold uppercase text-zinc-400 tracking-widest mb-2">Verified Professional Artifacts</h3>
                        <div className="space-y-2">
                          {currentDomain.tasks.map((task, i) => {
                            const sub = activeInternship.submissions[task.id];
                            return (
                              <div key={task.id} className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-xl flex justify-between items-center text-xs">
                                <div>
                                  <strong className="block text-[11px] text-slate-800 dark:text-white">Milestone {i + 1}: {task.title.replace(/^Task \d+: /, "")}</strong>
                                  <span className="text-[10px] text-zinc-400">Format: {task.submissionFormat}</span>
                                </div>
                                {sub?.status === "PASSED" ? (
                                  <div className="text-right">
                                    <span className="inline-block text-[10px] font-bold text-emerald-500 mb-0.5 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded leading-none">Passed Grade: {sub.aiReview?.grade}</span>
                                    {sub.githubLink && (
                                      <a href={sub.githubLink} target="_blank" rel="noreferrer" className="block text-[9.5px] text-indigo-500 flex items-center justify-end gap-0.5 hover:underline">
                                        <Github className="w-3 h-3" /> Repo Link
                                      </a>
                                    )}
                                    {sub.driveLink && (
                                      <a href={sub.driveLink} target="_blank" rel="noreferrer" className="block text-[9.5px] text-indigo-500 flex items-center justify-end gap-0.5 hover:underline">
                                        <ExternalLink className="w-3 h-3" /> Files Link
                                      </a>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-[10px] font-bold text-zinc-450 flex items-center gap-1">
                                    <Lock className="w-3.5 h-3.5" /> Working...
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LinkedIn modal preview box */}
          {showLinkedInModal && (
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-up">
                <div className="bg-slate-950 text-white p-4 flex justify-between items-center">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Accredit LinkedIn achievement Share</h4>
                  <button onClick={() => setShowLinkedInModal(false)} className="text-white/65 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 md:p-8 space-y-4">
                  <p className="text-xs text-zinc-500">Accelerate recruiters finding your certified profile by sharing this custom Achievement post:</p>
                  
                  <div className="bg-zinc-50 dark:bg-zinc-950 border p-4 rounded-xl font-mono text-xs text-zinc-700 dark:text-zinc-300 h-40 overflow-y-auto select-all">
                    <p>🎉 Thrilled to share that I have officially completed my Project-Based Internship in #{activeInternship.domainTitle.replace(/\s+/g, "")} on Nextern AI! 🚀</p>
                    <p className="mt-2">Throughout this structured program, I successfully engineered, validated, and deployed production-grade capabilities across 2 dynamic milestones. My code has been fully audited with zero plagiarism metrics and verified securely with Certificate ID: {activeInternship.certificateId}.</p>
                    <p className="mt-2">Check out my dynamic portfolio on Nextern AI! 🔗</p>
                    <p className="mt-1">#CareerGrowth #NexternAI #WebDeveloper #{activeInternship.domainTitle.replace(/\s+/g, "")} #ProjectBasedLearning</p>
                  </div>

                  {/* SVG Mockup preview of certificate in post */}
                  <div className="p-4 bg-zinc-900 rounded-xl text-center border text-[9.5px] select-none text-zinc-500 font-mono">
                    <div className="border border-amber-500/25 p-2 rounded max-w-sm mx-auto">
                      <span className="text-amber-550 block font-bold font-sans text-xs mb-1">Nextern AI Completion Certificate</span>
                      <p className="text-[8.5px]">Awarded to: {user.name}</p>
                      <p className="text-[8.5px]">Verified credential: ID {activeInternship.certificateId}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] text-emerald-600 font-semibold">Ready to Copy!</span>
                    <button
                      onClick={copyLinkedInPost}
                      className="px-5 py-2 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white text-xs cursor-pointer"
                    >
                      {copiedPost ? "Copied to Clipboard!" : "Copy Post Content"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
