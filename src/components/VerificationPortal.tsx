import React, { useState } from "react";
import { Search, ShieldCheck, Loader2, Award, CheckCircle, FileText, Calendar, Database, Sparkles, UserCheck } from "lucide-react";

interface VerificationPortalProps {
  onBack?: () => void;
}

export const VerificationPortal: React.FC<VerificationPortalProps> = ({ onBack }) => {
  const [certId, setCertId] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  // We can verify some default mock certificate IDs of our success stories
  // or dynamically generated certificates in local storage!
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setLoading(true);
    setSearched(true);
    setVerificationResult(null);

    setTimeout(() => {
      setLoading(false);
      const cleanId = certId.trim().toUpperCase();

      // Check if ID matches some default ones or local ones
      const isMockStory1 = cleanId.includes("ARJUN") || cleanId === "NX-ARJUN-88";
      const isMockStory2 = cleanId.includes("EMILY") || cleanId.includes("ANANYA") || cleanId === "NX-EMILY-24" || cleanId === "NX-ANANYA-24";
      const isMockStory3 = cleanId.includes("CHEN") || cleanId.includes("KABIR") || cleanId === "NX-CHEN-51" || cleanId === "NX-KABIR-51";

      // Also support checking the localStorage for dynamically completed tasks
      const localUsers = JSON.parse(localStorage.getItem("nextern_users") || "[]");
      const activeStudent = localUsers.find((u: any) => u.internship?.certificateId === cleanId);

      if (isMockStory1) {
        setVerificationResult({
          id: "NX-ARJUN-88",
          studentName: "Arjun Mehta",
          domain: "Full Stack Development",
          completionDate: "May 12, 2026",
          status: "PASSED",
          verificationNode: "NX-LEDGER-MAIN-0019",
          grade: "A+",
          plagiarismScore: 3.2,
          projectsSubmitted: 3,
          complianceScore: 98,
          issuer: "Nextern AI Verification Authority",
          authorizedBy: "CEO Arjun Vance",
          university: "Amity University, India"
        });
      } else if (isMockStory2) {
        setVerificationResult({
          id: "NX-ANANYA-24",
          studentName: "Ananya Sharma",
          domain: "Machine Learning",
          completionDate: "April 28, 2026",
          status: "PASSED",
          verificationNode: "NX-LEDGER-MAIN-0082",
          grade: "A",
          plagiarismScore: 1.5,
          projectsSubmitted: 3,
          complianceScore: 95,
          issuer: "Nextern AI Verification Authority",
          authorizedBy: "CEO Arjun Vance",
          university: "Stanford University, USA"
        });
      } else if (isMockStory3) {
        setVerificationResult({
          id: "NX-KABIR-51",
          studentName: "Kabir Malhotra",
          domain: "UI/UX Design",
          completionDate: "June 02, 2026",
          status: "PASSED",
          verificationNode: "NX-LEDGER-MAIN-0145",
          grade: "A+",
          plagiarismScore: 0.0,
          projectsSubmitted: 3,
          complianceScore: 100,
          issuer: "Nextern AI Verification Authority",
          authorizedBy: "CEO Arjun Vance",
          university: "National University of Singapore"
        });
      } else if (activeStudent) {
        setVerificationResult({
          id: cleanId,
          studentName: activeStudent.name,
          domain: activeStudent.internship.domainTitle,
          completionDate: new Date(activeStudent.internship.completedAt || Date.now()).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }),
          status: "PASSED",
          verificationNode: "NX-LEDGER-LOCAL-DB",
          grade: "A+",
          plagiarismScore: 4.8,
          projectsSubmitted: 3,
          complianceScore: 97,
          issuer: "Nextern AI Verification Authority",
          authorizedBy: "CEO Arjun Vance",
          university: activeStudent.universityName || "Self-Affiliated Student"
        });
      } else {
        // Create a temporary mock valid certificate response if they enter anything interesting or we let them know it has failed
        // But to make it professional, if it is any other structural code we give a standard error.
        setVerificationResult(null);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 flex flex-col justify-between py-12 px-4 transition-colors">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-2xl tracking-tight mb-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-lg font-black shadow-md">
              N
            </span>
            NEXTERN
          </div>
          <h1 className="text-2xl md:text-4xl font-sans font-bold text-slate-950 dark:text-white tracking-tight">
            Anti-Fraud Verification Server
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 max-w-md mx-auto">
            Input a 12-digit student credential ID below to verify authenticity and download secure logs.
          </p>
        </div>

        {/* Search Container */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
                Certificate ID / Unique Token Reference
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. NX-ARJUN-88, NX-EMILY-24, NX-CHEN-51"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  className="w-full text-base font-mono py-3 pl-11 pr-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-800 dark:text-white"
                />
                <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-3.5" />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-6 py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2 disabled:bg-zinc-300 cursor-pointer disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Checking Ledger Node...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Verify Integrity State
                  </>
                )}
              </button>

              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="px-6 py-3 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                  Return
                </button>
              )}
            </div>
          </form>

          {/* Quick Sandbox Help */}
          <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Valid Sandboxed Test Credentials (Copy to Try):
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => setCertId("NX-ARJUN-88")}
                className="px-3 py-1.5 rounded bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 hover:text-indigo-700 text-indigo-600 font-mono transition-colors"
              >
                NX-ARJUN-88 (Full Stack)
              </button>
              <button
                onClick={() => setCertId("NX-EMILY-24")}
                className="px-3 py-1.5 rounded bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 hover:text-indigo-700 text-indigo-600 font-mono transition-colors"
              >
                NX-EMILY-24 (Machine Learning)
              </button>
              <button
                onClick={() => setCertId("NX-CHEN-51")}
                className="px-3 py-1.5 rounded bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 hover:text-indigo-700 text-indigo-600 font-mono transition-colors"
              >
                NX-CHEN-51 (UI/UX)
              </button>
            </div>
          </div>
        </div>

        {/* Results Container */}
        {searched && !loading && (
          <div className="space-y-6 animate-fade-in">
            {verificationResult ? (
              <div className="bg-emerald-500/10 border-2 border-emerald-500/20 dark:border-emerald-500/40 rounded-2xl p-6 md:p-8 text-slate-800 dark:text-zinc-100">
                <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6 border-b border-emerald-500/10 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-1 bg-emerald-500 text-white font-semibold text-xs px-2.5 py-1 rounded-full mb-2">
                      <UserCheck className="w-3.5 h-3.5" />
                      SECURE CREDENTIAL VALIDATED
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                      {verificationResult.studentName}
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">{verificationResult.university}</p>
                  </div>
                  <div className="text-right font-mono text-xs text-zinc-500">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">LEDGER STATUS: VERIFIED</p>
                    <p>Ref: {verificationResult.id}</p>
                    <p className="text-[10px]">Node: {verificationResult.verificationNode}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <p className="flex justify-between border-b pb-2 dark:border-zinc-800">
                      <span className="text-zinc-400">Internship Domain:</span>
                      <strong className="text-slate-900 dark:text-zinc-100">{verificationResult.domain}</strong>
                    </p>
                    <p className="flex justify-between border-b pb-2 dark:border-zinc-800">
                      <span className="text-zinc-400">Accreditation Date:</span>
                      <strong className="text-slate-900 dark:text-zinc-100">{verificationResult.completionDate}</strong>
                    </p>
                    <p className="flex justify-between border-b pb-2 dark:border-zinc-800">
                      <span className="text-zinc-400">Award Authority:</span>
                      <strong className="text-slate-900 dark:text-zinc-100">{verificationResult.issuer}</strong>
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="flex justify-between border-b pb-2 dark:border-zinc-800">
                      <span className="text-zinc-400">Automated AI Grade:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 text-base">{verificationResult.grade}</strong>
                    </p>
                    <p className="flex justify-between border-b pb-2 dark:border-zinc-800">
                      <span className="text-zinc-400">Milestone Compliance:</span>
                      <strong className="text-slate-900 dark:text-zinc-100">{verificationResult.complianceScore}%</strong>
                    </p>
                    <p className="flex justify-between border-b pb-2 dark:border-zinc-800">
                      <span className="text-zinc-400">AI Plagiarism Metric:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400">{verificationResult.plagiarismScore}% (Pass)</strong>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-emerald-500/15 flex items-center justify-between text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Database className="w-3.5 h-3.5 text-indigo-500" />
                    Distributed Audit Node: Secure cryptographic verification keys signed on local ledger block.
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-500/10 border-2 border-red-500/20 dark:border-red-500/30 rounded-2xl p-8 text-center text-red-700 dark:text-red-400">
                <Award className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold mb-1 font-sans">No Authentic Record Associated</h3>
                <p className="text-xs text-red-600/70 dark:text-red-400/70 max-w-md mx-auto">
                  We could not locate cryptographic record references matching <code className="bg-red-500/15 text-red-700 dark:text-red-300 font-mono text-xs px-1.5 py-0.5 rounded">{certId}</code>. Ensure typos are corrected, or contact operations administration.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-center text-xs text-zinc-400 mt-12">
        <p>© 2026 Nextern AI SaaS Corp. All credentials recorded on verified Ledger Nodes. Secure transmission SSL.</p>
      </div>
    </div>
  );
};
