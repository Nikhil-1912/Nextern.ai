import React, { useState } from "react";
import { User, Internship, UserRole } from "../types";
import { Search, Filter, Award, ShieldCheck, Mail, ArrowRight, UserCheck, CheckCircle2, Star, ExternalLink, X, ChevronRight, BarChart3, Database } from "lucide-react";
import { CertificateView } from "./PDFTemplate";

interface RecruiterDashboardProps {
  onBackToLanding?: () => void;
}

// Establish a static cache of world-class student mockups to make the recruiter panel fully populated and functional out of the box!
const mockCandidates = [
  {
    id: "cand_1",
    name: "Sarah Jenkins",
    email: "sarah.j@university.edu",
    universityName: "Imperial College London",
    domainTitle: "Full Stack Development",
    skills: ["React", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL"],
    avatar: "S",
    status: "COMPLETED",
    grade: "A+",
    complianceScore: 98,
    plagiarismScore: 2.1,
    certificateId: "NX-CERT-489201",
    offerLetterId: "OFFER-FULLSTACK-384910",
    startedAt: "2026-05-10T10:00:00Z",
    completedAt: "2026-06-12T14:30:00Z",
    submissions: {
      task_1: { id: "sub_1", githubLink: "https://github.com/sarahj/nextern-fullstack-core", status: "PASSED", grade: "A+" },
      task_2: { id: "sub_2", githubLink: "https://github.com/sarahj/nextern-fullstack-advanced-api", status: "PASSED", grade: "A" },
      task_3: { id: "sub_3", githubLink: "https://github.com/sarahj/nextern-production-build", status: "PASSED", grade: "A+" }
    },
    bio: "Enthusiastic full-stack engineer specialized in high-performance React architectures and secure REST API services."
  },
  {
    id: "cand_2",
    name: "Ananya Sharma",
    email: "ananya.s@stanford.edu",
    universityName: "Stanford University, USA",
    domainTitle: "Machine Learning",
    skills: ["Python", "TensorFlow", "Scikit-Learn", "Data analytics", "NumPy"],
    avatar: "A",
    status: "COMPLETED",
    grade: "A",
    complianceScore: 95,
    plagiarismScore: 1.5,
    certificateId: "NX-ANANYA-24",
    offerLetterId: "OFFER-ML-98402",
    startedAt: "2026-04-01T09:00:00Z",
    completedAt: "2026-04-28T17:00:00Z",
    submissions: {
      task_1: { id: "sub_4", githubLink: "https://github.com/ananyas/nextern-ml-models", status: "PASSED", grade: "A" },
      task_2: { id: "sub_5", githubLink: "https://github.com/ananyas/nextern-ml-optimization", status: "PASSED", grade: "A" },
      task_3: { id: "sub_6", githubLink: "https://github.com/ananyas/nextern-ml-serving", status: "PASSED", grade: "A" }
    },
    bio: "Data scholar modeling neural networks for automated visual categorization algorithms."
  },
  {
    id: "cand_3",
    name: "Arjun Mehta",
    email: "arjun.m@amity.edu",
    universityName: "Amity University, India",
    domainTitle: "Full Stack Development",
    skills: ["React", "TypeScript", "Vite", "Spring Boot", "JPA"],
    avatar: "A",
    status: "COMPLETED",
    grade: "A+",
    complianceScore: 98,
    plagiarismScore: 3.2,
    certificateId: "NX-ARJUN-88",
    offerLetterId: "OFFER-JAVA-14820",
    startedAt: "2026-05-01T09:00:00Z",
    completedAt: "2026-05-12T17:00:00Z",
    submissions: {
      task_1: { id: "sub_7", githubLink: "https://github.com/arjunm/java-springboot-core", status: "PASSED", grade: "A+" },
      task_2: { id: "sub_8", githubLink: "https://github.com/arjunm/java-springboot-api", status: "PASSED", grade: "A+" },
      task_3: { id: "sub_9", githubLink: "https://github.com/arjunm/java-springboot-deploy", status: "PASSED", grade: "A+" }
    },
    bio: "Focused web technologist combining Spring Boot microservice boundaries with highly polished Vite clients."
  },
  {
    id: "cand_4",
    name: "Kabir Malhotra",
    email: "kabir.m@nus.edu.sg",
    universityName: "National University of Singapore",
    domainTitle: "UI/UX Design",
    skills: ["Figma", "Sleek typography", "Prototyping", "User research"],
    avatar: "K",
    status: "COMPLETED",
    grade: "A+",
    complianceScore: 100,
    plagiarismScore: 0.0,
    certificateId: "NX-KABIR-51",
    offerLetterId: "OFFER-DESIGN-24890",
    startedAt: "2026-05-20T10:00:00Z",
    completedAt: "2026-06-02T16:50:00Z",
    submissions: {
      task_1: { id: "sub_10", githubLink: "https://figma.com/file/mock-design-link-1", status: "PASSED", grade: "A+" },
      task_2: { id: "sub_11", githubLink: "https://figma.com/file/mock-design-link-2", status: "PASSED", grade: "A+" },
      task_3: { id: "sub_12", githubLink: "https://figma.com/file/mock-design-link-3", status: "PASSED", grade: "A+" }
    },
    bio: "User interaction designer prioritizing streamlined vector styles, dark theme ergonomics and clear visual pacing."
  },
  {
    id: "cand_5",
    name: "Vikram Sen",
    email: "v.sen@iitkgp.ac.in",
    universityName: "IIT Kharagpur, India",
    domainTitle: "Backend Development",
    skills: ["Node.js", "Express", "MongoDB", "Redis", "Docker"],
    avatar: "V",
    status: "ACTIVE",
    grade: "B",
    complianceScore: 81,
    plagiarismScore: 3.8,
    offerLetterId: "OFFER-BACKEND-14920",
    startedAt: "2026-06-01T08:00:00Z",
    submissions: {
      task_1: { id: "sub_13", githubLink: "https://github.com/vikramsen/backend-core", status: "PASSED", grade: "B" },
      task_2: { id: "sub_14", githubLink: "https://github.com/vikramsen/backend-caching", status: "PASSED", grade: "B+" }
    },
    bio: "Backend developer constructing relational microservices optimized for zero-cache cold starts."
  }
];

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ onBackToLanding }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);

  // Recruiter action form
  const [contactMessage, setContactMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);
  const [viewingCertificate, setViewingCertificate] = useState(false);

  // Retrieve any students that completed from local storage to show in the recruiter directory
  const localUsers = JSON.parse(localStorage.getItem("nextern_users") || "[]");
  const activeLocalStudents = localUsers
    .filter((u: any) => u.internship)
    .map((u: any) => {
      const completed = u.internship.status === "COMPLETED";
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        universityName: u.universityName || "Self-Affiliated Scholar",
        domainTitle: u.internship.domainTitle,
        skills: u.biodata?.skills || ["React", "TypeScript", "TailwindCSS"],
        avatar: u.name.charAt(0).toUpperCase(),
        status: u.internship.status,
        grade: completed ? "A+" : "A",
        complianceScore: completed ? 97 : 85,
        plagiarismScore: 1.8,
        certificateId: u.internship.certificateId || undefined,
        offerLetterId: u.internship.offerLetterId,
        startedAt: u.internship.startedAt,
        completedAt: u.internship.completedAt,
        submissions: Object.keys(u.internship.submissions).reduce((acc: any, key) => {
          acc[key] = {
            id: u.internship.submissions[key].id,
            githubLink: u.internship.submissions[key].githubLink,
            status: u.internship.submissions[key].status,
            grade: u.internship.submissions[key].aiReview?.grade || "A"
          };
          return acc;
        }, {}),
        bio: u.biodata?.bio || "Highly motivated project-based intern focused on professional skill building."
      };
    });

  const allCandidates = [...activeLocalStudents, ...mockCandidates];

  const uniqueDomains = ["All", ...Array.from(new Set(allCandidates.map((c) => c.domainTitle)))];
  const uniqueSkills = ["All", ...Array.from(new Set(allCandidates.flatMap((c) => c.skills)))];

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setContactMessage("");
      // Clear popup
      setSelectedCandidate(null);
      alert(`Interview proposal delivered to ${selectedCandidate.name}'s secure inbox!`);
    }, 1500);
  };

  const filteredCandidates = allCandidates.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.universityName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDomain = selectedDomain === "All" || c.domainTitle === selectedDomain;
    const matchSkill = selectedSkill === "All" || c.skills.includes(selectedSkill);
    return matchSearch && matchDomain && matchSkill;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative">
      {/* Recruiter Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-indigo-950 text-white rounded-2xl p-6 md:p-8 border border-zinc-800 mb-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest px-2.5 py-1 rounded mb-2 select-none">
              <UserCheck className="w-4 h-4" />
              Recruiter Sourcing Suite
            </div>
            <h1 className="text-2xl md:text-3xl font-sans font-bold tracking-tight">Discover Top-Performing Scholars</h1>
            <p className="text-zinc-300 text-xs mt-1">
              Verify real-time project milestone checks, actual audited repository codes, and AI performance scorecards before proceeding with hiring pipelines.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="text-center font-sans">
              <span className="block text-xl font-bold font-mono text-indigo-400">{allCandidates.length}</span>
              <span className="text-[9px] uppercase font-bold text-zinc-400">Total Scholars</span>
            </div>
            <div className="w-px h-8 bg-zinc-800" />
            <div className="text-center font-sans">
              <span className="block text-xl font-bold font-mono text-emerald-400">
                {allCandidates.filter(c => c.status === "COMPLETED").length}
              </span>
              <span className="text-[9px] uppercase font-bold text-zinc-400">Completely Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* filters Row */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 md:p-6 mb-8 shadow-sm flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search candidate name or university..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs py-2 pl-9 pr-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-800 dark:text-white"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
        </div>

        {/* Domain Filter */}
        <div className="w-full md:w-56 relative">
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="w-full text-xs py-2 px-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-305 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {uniqueDomains.map((dom) => (
              <option key={dom} value={dom}>
                Domain: {dom === "All" ? "All Domains" : dom}
              </option>
            ))}
          </select>
        </div>

        {/* Skill Filter */}
        <div className="w-full md:w-48 relative">
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="w-full text-xs py-2 px-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-305 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {uniqueSkills.map((sk) => (
              <option key={sk} value={sk}>
                Skill: {sk === "All" ? "All Skills" : sk}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Candidates List/Grid Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((cand) => {
          return (
            <div
              key={cand.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-650 text-white flex items-center justify-center font-bold text-base shadow-sm">
                      {cand.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-950 dark:text-white text-sm leading-tight">{cand.name}</h4>
                      <p className="text-[10px] text-zinc-500 font-semibold line-clamp-1">{cand.universityName}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded leading-none ${
                    cand.status === "COMPLETED" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400" :
                    "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-400"
                  }`}>
                    {cand.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-xs font-normal">
                  <p className="flex justify-between border-b pb-1 dark:border-zinc-800">
                    <span className="text-zinc-400 text-[10.5px]">Internship Path:</span>
                    <strong className="text-slate-900 dark:text-zinc-100">{cand.domainTitle}</strong>
                  </p>
                  <p className="flex justify-between border-b pb-1 dark:border-zinc-800">
                    <span className="text-zinc-400 text-[10.5px]">AI Grade Scorecard:</span>
                    <strong className="text-indigo-600 dark:text-indigo-400 text-sm leading-none font-serif">{cand.grade} ({cand.complianceScore}%)</strong>
                  </p>
                  <p className="flex justify-between border-b pb-1 dark:border-zinc-800">
                    <span className="text-zinc-400 text-[10.5px]">Plagiarism Metric:</span>
                    <strong className="text-emerald-600 dark:text-emerald-450">{cand.plagiarismScore}% Pass</strong>
                  </p>
                </div>

                {/* Candidate tags */}
                <div className="flex flex-wrap gap-1 mb-6">
                  {cand.skills.slice(0, 3).map((sk: string) => (
                    <span key={sk} className="text-[9px] font-bold bg-zinc-50 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full leading-none">
                      {sk}
                    </span>
                  ))}
                  {cand.skills.length > 3 && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 text-zinc-400">+{cand.skills.length - 3} more</span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex justify-between items-center">
                <span className="text-[10px] text-zinc-400">
                  {Object.keys(cand.submissions).length}/3 Milestones Verified
                </span>
                <button
                  onClick={() => setSelectedCandidate(cand)}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  Inspect Dossier
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredCandidates.length === 0 && (
          <div className="col-span-1 md:col-span-3 text-center py-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <Filter className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-zinc-500">No candidates match filters</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">Try resetting your skills search criteria or modifying keywords.</p>
          </div>
        )}
      </div>

      {/* Slide-out Candidate Dossier Panel */}
      {selectedCandidate && !viewingCertificate && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-white dark:bg-zinc-900 border-l border-zinc-250 dark:border-zinc-800 w-full max-w-lg h-full overflow-y-auto p-6 md:p-8 shadow-2xl relative animate-slide-in">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:scale-105 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dossier Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl select-none">
                {selectedCandidate.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">{selectedCandidate.name}</h3>
                <p className="text-xs text-zinc-500 font-semibold">{selectedCandidate.universityName}</p>
                <div className="flex gap-2 items-center mt-2">
                  <span className="text-[9px] font-bold bg-indigo-50 text-indigo-650 dark:bg-indigo-950/40 dark:text-indigo-400 px-2 py-0.5 rounded leading-none">
                    {selectedCandidate.domainTitle} Path
                  </span>
                  <span className="text-[9px] font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 px-2 py-0.5 rounded leading-none flex items-center gap-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Accredited ID
                  </span>
                </div>
              </div>
            </div>

            {/* Bio Box */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Scholar Bio</h4>
              <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed font-normal bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border">
                &ldquo;{selectedCandidate.bio}&rdquo;
              </p>
            </div>

            {/* Academic Track Record */}
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-white mb-6 font-normal">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5 border-b border-zinc-800 pb-2">
                <BarChart3 className="w-4.5 h-4.5 text-indigo-500" />
                Verified Nextern AI Grade Card
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="block text-xl font- serif font-black text-indigo-400 leading-none">{selectedCandidate.grade}</span>
                  <p className="text-[9px] text-zinc-400 uppercase font-bold mt-1">Average Grade</p>
                </div>
                <div className="border-x border-zinc-800">
                  <span className="block text-xl font-bold leading-none">{selectedCandidate.complianceScore}%</span>
                  <p className="text-[9px] text-zinc-400 uppercase font-bold mt-1">Milestone Compliance</p>
                </div>
                <div>
                  <span className="block text-xl font-bold text-emerald-500 leading-none">{selectedCandidate.plagiarismScore}%</span>
                  <p className="text-[9px] text-zinc-400 uppercase font-bold mt-1">Similarity Check</p>
                </div>
              </div>
            </div>

            {/* Artifacts list */}
            <div className="mb-6 space-y-3 font-normal">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Milestone code deliveries</h4>
              <div className="space-y-2">
                {Object.keys(selectedCandidate.submissions).map((key, i) => {
                  const sub = selectedCandidate.submissions[key];
                  return (
                    <div key={key} className="p-3 bg-zinc-50 dark:bg-zinc-950 border rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <strong className="block text-slate-800 dark:text-white text-[11px]">Milestone {i + 1} Deliverable</strong>
                        <span className="text-[9.5px] text-zinc-450 uppercase">GRADE: {sub.grade} (Passed)</span>
                      </div>
                      <a
                        href={sub.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-600 hover:underline flex items-center gap-1 bg-white dark:bg-zinc-900 border px-3 py-1 rounded"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Code Repo
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Credentials inspection */}
            {selectedCandidate.status === "COMPLETED" && (
              <div className="mb-8 p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-250 flex justify-between items-center text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                  <Award className="w-4.5 h-4.5 text-indigo-500" />
                  Credentials Verified: {selectedCandidate.certificateId}
                </span>
                <button
                  onClick={() => setViewingCertificate(true)}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-semibold cursor-pointer"
                >
                  Preview Cert
                </button>
              </div>
            )}

            {/* Placement request portal form */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Interview proposals / offer Dispatch</h4>
              <form onSubmit={handleSendOffer} className="space-y-3 text-xs font-normal">
                <textarea
                  required
                  rows={3}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full text-xs p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-white"
                  placeholder={`Hi ${selectedCandidate.name}, we loved your Nextern AI portfolio submissions and want to schedule a brief team interview...`}
                />
                <button
                  type="submit"
                  disabled={sentSuccess}
                  className="w-full text-center py-2.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow flex items-center justify-center gap-1.5"
                >
                  {sentSuccess ? "Dispatching Secure Logs..." : "Dispatch Interview Invitation"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Inner Certificate preview block */}
      {viewingCertificate && selectedCandidate && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CertificateView
              user={{ name: selectedCandidate.name, email: selectedCandidate.email, role: UserRole.STUDENT, verified: true }}
              internship={{
                id: "NX-INT-PREV",
                domainId: "nx-domain",
                domainTitle: selectedCandidate.domainTitle,
                startedAt: selectedCandidate.startedAt,
                completedAt: selectedCandidate.completedAt,
                status: "COMPLETED",
                offerLetterId: selectedCandidate.offerLetterId,
                certificateId: selectedCandidate.certificateId,
                currentTaskIndex: 2,
                submissions: {}
              }}
              onBack={() => setViewingCertificate(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
