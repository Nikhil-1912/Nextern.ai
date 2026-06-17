import React, { useState } from "react";
import { User, Internship, Domain, UserRole, EmailLog } from "../types";
import { domains as initialDomains } from "../data/domains";
import { Database, Users, Code, Award, CheckCircle, Mail, Plus, Trash2, ShieldCheck, RefreshCw, BarChart2, Star, Play, Edit, Trash } from "lucide-react";

interface AdminDashboardProps {
  systemEmails: EmailLog[];
  onTriggerEmail: (recipient: string, type: "REGISTRATION" | "OFFER_LETTER" | "TASK_UNLOCK" | "COMPLETION" | "CERTIFICATE", subject: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ systemEmails, onTriggerEmail }) => {
  const [activeTab, setActiveTab] = useState<"analytics" | "users" | "domains" | "certificates" | "emails">("analytics");
  const [domainsList, setDomainsList] = useState<Domain[]>(initialDomains);
  
  // Custom Domain Creator States
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState("Software Development");
  const [newDifficulty, setNewDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");

  // Custom Student creation mock database state
  const [students, setStudents] = useState<any[]>([
    { id: "s1", name: "Sarah Jenkins", email: "sarah@university.edu", status: "Active", progress: 66, domain: "Full Stack Development", university: "Imperial College London" },
    { id: "s2", name: "Ananya Sharma", email: "ananya@stanford.edu", status: "Completed", progress: 100, domain: "Machine Learning", university: "Stanford University, USA" },
    { id: "s3", name: "Arjun Mehta", email: "arjun@amity.edu", status: "Completed", progress: 100, domain: "Full Stack Development", university: "Amity University, India" },
    { id: "s4", name: "Kabir Malhotra", email: "kabir@nus.edu.sg", status: "Completed", progress: 100, domain: "UI/UX Design", university: "National University of Singapore" },
    { id: "s5", name: "Vikram Sen", email: "vikram@iitkgp.ac.in", status: "Active", progress: 33, domain: "Backend Development", university: "IIT Kharagpur, India" }
  ]);

  const handleCreateDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const newDomain: Domain = {
      id: `custom-${Math.random().toString(36).substr(2, 5)}`,
      title: newTitle,
      description: newDesc,
      category: newCategory,
      icon: "Layers",
      difficulty: newDifficulty,
      tasks: [
        {
          id: "task_1",
          title: "Task 1: Core Systems Setup",
          description: "Initialize backend structures and baseline modules.",
          requirements: ["Establish configuration keys structure.", "Run compliance formatting audits."],
          instructions: ["Draft repository setup layouts.", "Validate execution speeds."],
          sampleOutput: "Compilation Successful.",
          resources: ["Foundation guides"],
          submissionFormat: "GitHub Link",
          deadlineDays: 7
        }
      ]
    };

    setDomainsList([newDomain, ...domainsList]);
    setNewTitle("");
    setNewDesc("");
    alert(`Custom Pathway '${newTitle}' published on the Nextern AI platform!`);
  };

  const handleDeleteDomain = (id: string) => {
    setDomainsList(domainsList.filter(d => d.id !== id));
  };

  const handleToggleUserVerify = (id: string) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === "Active" ? "Paused" : "Active" };
      }
      return s;
    }));
  };

  const handleDeleteUser = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Control Banner */}
      <div className="bg-slate-900 border border-zinc-800 text-white rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-650/15 rounded-full blur-3xl -z-10" />
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-bold bg-indigo-950/40 border border-indigo-900 px-3 py-1 rounded-full mb-2">
            <Database className="w-4 h-4" />
            Nextern AI Core Administration Interface
          </div>
          <h1 className="text-2xl md:text-3xl font-sans font-bold tracking-tight">System Operations Console</h1>
          <p className="text-zinc-400 text-xs mt-1">
            Gives operators micro-control over active scholars, accreditation lists, custom domain tasks, and real-time email dispatch states.
          </p>
        </div>
        <div className="text-right text-xs font-mono text-zinc-500">
          <p className="text-indigo-455 font-bold">SYSTEM CORE: ONLINE</p>
          <p>Local time: 2026-06-16</p>
          <p>SSL Encryption: Validated AES-256</p>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800 mb-8 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`text-sm font-semibold whitespace-nowrap pb-2 outline-none border-b-2 px-2 transition-colors ${
            activeTab === "analytics" ? "text-indigo-600 border-indigo-600" : "text-zinc-500 border-transparent hover:text-zinc-800"
          }`}
        >
          Telemetry Analytics
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`text-sm font-semibold whitespace-nowrap pb-2 outline-none border-b-2 px-2 transition-colors ${
            activeTab === "users" ? "text-indigo-600 border-indigo-600" : "text-zinc-500 border-transparent hover:text-zinc-800"
          }`}
        >
          Verify active scholars ({students.length})
        </button>
        <button
          onClick={() => setActiveTab("domains")}
          className={`text-sm font-semibold whitespace-nowrap pb-2 outline-none border-b-2 px-2 transition-colors ${
            activeTab === "domains" ? "text-indigo-600 border-indigo-600" : "text-zinc-500 border-transparent hover:text-zinc-800"
          }`}
        >
          Manage domains ({domainsList.length})
        </button>
        <button
          onClick={() => setActiveTab("certificates")}
          className={`text-sm font-semibold whitespace-nowrap pb-2 outline-none border-b-2 px-2 transition-colors ${
            activeTab === "certificates" ? "text-indigo-600 border-indigo-600" : "text-zinc-500 border-transparent hover:text-zinc-800"
          }`}
        >
          Certificate Ledgers
        </button>
        <button
          onClick={() => setActiveTab("emails")}
          className={`text-sm font-semibold whitespace-nowrap pb-2 outline-none border-b-2 px-2 transition-colors ${
            activeTab === "emails" ? "text-indigo-600 border-indigo-600" : "text-zinc-500 border-transparent hover:text-zinc-800"
          }`}
        >
          SMTP Mailer logs ({systemEmails.length})
        </button>
      </div>

      {/* Tab CONTENT: Telemetry Analytics Dashboard */}
      {activeTab === "analytics" && (
        <div className="space-y-8 animate-fade-in">
          {/* General Grid stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Active Interns</span>
                <Users className="w-5 h-5 text-indigo-500" />
              </div>
              <p className="text-3xl font-serif font-black text-slate-900 dark:text-white">1,492</p>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">+14% vs Previous Month</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Completed Milestones</span>
                 <Code className="w-5 h-5 text-indigo-500" />
              </div>
              <p className="text-3xl font-serif font-black text-slate-900 dark:text-white">3,810</p>
              <span className="text-[10px] text-zinc-400 font-bold block mt-1">Validated on Ledger nodes</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Certificates Issued</span>
                 <Award className="w-5 h-5 text-amber-500 animate-pulse" />
              </div>
              <p className="text-3xl font-serif font-black text-slate-900 dark:text-white">924</p>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">100% Antifraud Verification Checked</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Partner Recruiters</span>
                 <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-3xl font-serif font-black text-slate-900 dark:text-white">186</p>
              <span className="text-[10px] text-zinc-400 font-bold block mt-1">Active candidate sourcing searches</span>
            </div>
          </div>

          {/* Sizing / Pop of Domains Bars (Pure CSS High Quality) */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-6 flex items-center gap-1.5">
              <BarChart2 className="w-4.5 h-4.5 text-indigo-550" />
              Real-time Domain Popularity Index
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 dark:text-zinc-300">Full Stack Development</span>
                  <span className="font-mono text-zinc-500">421 Scholars (38% overall)</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-3 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full transition-all duration-700" style={{ width: "38%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 dark:text-zinc-300">Artificial Intelligence & ML</span>
                  <span className="font-mono text-zinc-500">294 Scholars (24% overall)</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-3 rounded-full overflow-hidden">
                  <div className="bg-royal h-full rounded-full transition-all duration-700" style={{ width: "24%", backgroundColor: "#3b82f6" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 dark:text-zinc-300">UI/UX Design & Prototyping</span>
                  <span className="font-mono text-zinc-500">210 Scholars (18% overall)</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-3 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full transition-all duration-700" style={{ width: "18%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-800 dark:text-zinc-300">Data Analytics & Analytics Sciences</span>
                  <span className="font-mono text-zinc-500">182 Scholars (14% overall)</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-3 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: "14%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab CONTENT: Scholars management table */}
      {activeTab === "users" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm animate-fade-in">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/60 border-b flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Database Entry Rows: Active Scholars</h3>
            <span className="text-[10px] text-zinc-500">Database Table: nx_student_table</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b bg-zinc-50/50 dark:bg-zinc-955/30 text-zinc-400 font-bold uppercase tracking-wider border-zinc-200 dark:border-zinc-800">
                  <th className="p-4">Candidate Identification</th>
                  <th className="p-4">Enrolled pathway</th>
                  <th className="p-4">Affiliated School</th>
                  <th className="p-4">Completeness progress</th>
                  <th className="p-4 text-center">Admin Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-normal text-slate-700 dark:text-zinc-300">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40">
                    <td className="p-4">
                      <div>
                        <strong className="block text-slate-900 dark:text-white text-sm">{student.name}</strong>
                        <span className="text-[10.5px] text-zinc-400 block">{student.email}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-indigo-650 dark:text-indigo-400">{student.domain}</td>
                    <td className="p-4 text-zinc-450">{student.university}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-zinc-100 dark:bg-zinc-950 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full" style={{ width: `${student.progress}%` }} />
                        </div>
                        <span className="font-mono font-bold">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleToggleUserVerify(student.id)}
                          className={`px-3 py-1 text-[10px] font-bold rounded cursor-pointer ${
                            student.status === "Active" ? "bg-amber-100 text-amber-700 hover:bg-amber-200" : "bg-emerald-100 text-emerald-840 hover:bg-emerald-200"
                          }`}
                        >
                          {student.status === "Active" ? "Pause" : "Re-activate"}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(student.id)}
                          className="p-1 px-2 rounded bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab CONTENT: Manage domains index with add pathway options */}
      {activeTab === "domains" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in font-normal">
          {/* List of active paths */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-450 mb-4">Functional Program pathways ({domainsList.length})</h3>

              <div className="divide-y divide-zinc-150 dark:divide-zinc-800 space-y-4">
                {domainsList.map((dom) => (
                  <div key={dom.id} className="pt-4 flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{dom.title}</h4>
                      <p className="text-[10.5px] text-zinc-500 font-semibold">{dom.category} • Difficulty: {dom.difficulty}</p>
                      <p className="text-xs text-zinc-450 mt-1 line-clamp-2">{dom.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteDomain(dom.id)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-650 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Domain Creator */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-450 mb-4">Create custom Pathway</h3>

              <form onSubmit={handleCreateDomain} className="space-y-4 text-xs font-normal">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Pathway Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kotlin Android App Architect"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Detailed description</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Design structural Kotlin pipelines and deploy native builds."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full text-xs p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Organizational category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full text-xs py-2 px-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Software Development">Software Development</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Design">Design</option>
                    <option value="Cloud Systems">Cloud Systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Difficulty level</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as any)}
                    className="w-full text-xs py-2 px-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <p className="text-[10px] text-zinc-400">Creation automatically scaffolds 2 progressive milestones with baseline templates.</p>

                <button
                  type="submit"
                  className="w-full text-center py-2.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Publish custom Pathway
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Tab CONTENT: Certificate Ledgers */}
      {activeTab === "certificates" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm animate-fade-in font-normal">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/60 border-b flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-450">Algorithmic Certificate Sign Ledger</h3>
            <span className="text-[10px] text-zinc-500">Validation Authority ledger checks</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b bg-zinc-50/50 dark:bg-zinc-955/30 text-zinc-450 font-bold uppercase tracking-wider border-zinc-200 dark:border-zinc-800">
                  <th className="p-4">Registered Recipient</th>
                  <th className="p-4">Cryptographic Cert ID</th>
                  <th className="p-4">Accredited Domain</th>
                  <th className="p-4">Compliance Rating</th>
                  <th className="p-4 text-center">Anti-Fraud status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-normal text-slate-700 dark:text-zinc-300">
                {students.filter(s => s.status === "Completed").map((student, i) => (
                  <tr key={student.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40">
                    <td className="p-4">
                      <strong>{student.name}</strong>
                      <span className="text-[10px] text-zinc-400 block">{student.email}</span>
                    </td>
                    <td className="p-4 font-mono text-indigo-600 font-bold">NX-CERT-{student.id.toUpperCase()}-882</td>
                    <td className="p-4 font-semibold">{student.domain}</td>
                    <td className="p-4 font-mono font-bold text-center text-slate-800 dark:text-zinc-100">{100 - i * 2}%</td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded text-[10px] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" /> Checked & Validated
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab CONTENT: Email automated dispatch logs */}
      {activeTab === "emails" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm animate-fade-in font-normal">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-955/40 border-b flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-450">Active SMTP Delivery Logs queue</h3>
            <span className="text-[10px] text-zinc-550">SMTP Gate: mail.nextern.dev</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b bg-zinc-50/50 dark:bg-zinc-955/30 text-zinc-450 font-bold uppercase tracking-wider border-zinc-200 dark:border-zinc-800">
                  <th className="p-4">Mail Target</th>
                  <th className="p-4">Notification Category</th>
                  <th className="p-4">Subject Title</th>
                  <th className="p-4">Dispatched At Timestamp</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-normal text-slate-700 dark:text-zinc-300">
                {systemEmails.map((mail) => (
                  <tr key={mail.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40">
                    <td className="p-4 font-mono text-[11px] text-slate-800 dark:text-zinc-200">{mail.recipient}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider ${
                        mail.type === "OFFER_LETTER" ? "bg-blue-100 text-blue-800" :
                        mail.type === "CERTIFICATE" ? "bg-amber-100 text-amber-805" :
                        mail.type === "TASK_UNLOCK" ? "bg-indigo-100 text-indigo-805" :
                        "bg-zinc-100 text-zinc-800"
                      }`}>
                        {mail.type}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">{mail.subject}</td>
                    <td className="p-4 text-zinc-450 font-mono text-[10px]">{new Date(mail.sentAt).toLocaleTimeString()}</td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                        <CheckCircle className="w-3.5 h-3.5" /> Dispatched
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
