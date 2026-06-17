import React, { useState } from "react";
import { User, UserRole } from "../types";
import { Award, ShieldCheck, Mail, CheckCircle, Database, BookOpen, GraduationCap, FileSpreadsheet, CheckCircle2, ChevronRight, BarChart3, Star, AlertCircle } from "lucide-react";

interface UniversityDashboardProps {
  user: User;
}

export const UniversityDashboard: React.FC<UniversityDashboardProps> = ({ user }) => {
  const [students, setStudents] = useState<any[]>([
    { id: "st_1", name: "Sarah Jenkins", email: "sarah.j@imperial.ac.uk", domain: "Full Stack Development", progress: 66, averageGrade: "A+", creditState: "Approved (+4 Credits)", status: "Active" },
    { id: "st_2", name: "John Sterling", email: "john.sterl@imperial.ac.uk", domain: "Cyber Security", progress: 33, averageGrade: "B+", creditState: "Pending Approval", status: "Active" },
    { id: "st_3", name: "Helena Rostova", email: "helena.r@imperial.ac.uk", domain: "Artificial Intelligence", progress: 100, averageGrade: "A+", creditState: "Approved (+4 Credits)", status: "Completed" },
    { id: "st_4", name: "Marcus Finch", email: "marcus.f@imperial.ac.uk", domain: "DevOps", progress: 0, averageGrade: "N/A", creditState: "Pending Approval", status: "Active" }
  ]);

  const handleApproveCredit = (id: string) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        return { ...s, creditState: "Approved (+4 Credits)" };
      }
      return s;
    }));
    alert("Official Academic Credits dispatched and linked to the scholar's student portal!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* University banner */}
      <div className="bg-slate-900 border border-zinc-800 text-white rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-650/15 rounded-full blur-3xl -z-10" />
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-bold bg-indigo-950/40 border border-indigo-900 px-3 py-1 rounded-full mb-2">
            <GraduationCap className="w-4.5 h-4.5" />
            Nextern AI University Integration Portal
          </div>
          <h1 className="text-2xl md:text-3xl font-sans font-bold tracking-tight">{user.universityName || "Imperial College London"}</h1>
          <p className="text-zinc-400 text-xs mt-1">
            Official academic dashboard checking performance indexes, sequential milestones progression, and accredited credits approval status for affiliated courses.
          </p>
        </div>
        <div className="text-right text-xs font-mono text-zinc-500">
          <p className="text-indigo-455 font-bold">NODE CONNECTION: SECURED</p>
          <p>Integration Key: NX-UNIV-IMP-948</p>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
          <p className="text-xs text-zinc-455 font-bold uppercase tracking-wider mb-1.5">Affiliated Students</p>
          <p className="text-3xl font-serif font-black text-slate-800 dark:text-white">124</p>
          <span className="text-[10px] text-zinc-400 block mt-1">Class registration metrics verified</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
          <p className="text-xs text-zinc-455 font-bold uppercase tracking-wider mb-1.5">Average Progress Index</p>
          <p className="text-3xl font-serif font-black text-slate-800 dark:text-white">48.2%</p>
          <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-indigo-650 h-full" style={{ width: "48.2%" }} />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
          <p className="text-xs text-zinc-455 font-bold uppercase tracking-wider mb-1.5">Completeness completions</p>
          <p className="text-3xl font-serif font-black text-slate-800 dark:text-white">42 Students</p>
          <span className="text-[10px] text-emerald-600 block mt-1">Eligible for physical credits validation</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
          <p className="text-xs text-zinc-455 font-bold uppercase tracking-wider mb-1.5">Placement rate</p>
          <p className="text-3xl font-serif font-black text-slate-800 dark:text-white">84.2%</p>
          <span className="text-[10px] text-emerald-600 block mt-1">+6% vs conventional programs</span>
        </div>
      </div>

      {/* Main Students list operational Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/60 border-b flex justify-between items-center flex-wrap gap-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Institutional Student Roster</h3>
            <p className="text-[10.5px] text-zinc-450 mt-0.5">Approve 4 points of academic credits once students pass all 2 milestones.</p>
          </div>
          <span className="text-[10.5px] font-mono text-zinc-550">Class Code: IMP-INTE-2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b bg-zinc-50/50 dark:bg-zinc-955/30 text-zinc-450 font-bold uppercase tracking-wider border-zinc-200 dark:border-zinc-800">
                <th className="p-4">Student Identity</th>
                <th className="p-4">Selected Domain</th>
                <th className="p-4">Milestone Progress</th>
                <th className="p-4">Nextern AI Average Grade</th>
                <th className="p-4">Official Credit Status</th>
                <th className="p-4 text-center">Registrar controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-normal text-slate-705 dark:text-zinc-350">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/40">
                  <td className="p-4">
                    <div>
                      <strong className="block text-slate-900 dark:text-white text-sm">{st.name}</strong>
                      <span className="text-[10.5px] text-zinc-400">{st.email}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-zinc-200">{st.domain}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-zinc-100 dark:bg-zinc-950 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-650 h-full" style={{ width: `${st.progress}%` }} />
                      </div>
                      <span className="font-mono font-bold">{st.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4 font-serif font-black text-indigo-600 dark:text-indigo-400 text-sm">{st.averageGrade}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold leading-none ${
                      st.creditState.includes("Approved") ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400" : "bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
                    }`}>
                      {st.creditState}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {st.creditState.includes("Pending") ? (
                      <button
                        onClick={() => handleApproveCredit(st.id)}
                        disabled={st.progress < 100}
                        className={`px-3 py-1.5 text-[10.5px] font-semibold rounded cursor-pointer leading-none ${
                          st.progress < 100
                            ? "bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed opacity-60"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }`}
                        title={st.progress < 100 ? "Unlocked after student hits 100% Milestone" : "Approve Credit points"}
                      >
                        Approve Credits
                      </button>
                    ) : (
                      <div className="text-emerald-600 font-bold text-xs flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        Accredited
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
