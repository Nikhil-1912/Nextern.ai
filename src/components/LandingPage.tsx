import React, { useState } from "react";
import { mockSuccessStories, mockFAQs, domains } from "../data/domains";
import { UserRole } from "../types";
import cozyCoderPixel from "../assets/images/cozy_coder_pixel_1781629767871.jpg";
import {
  Award, ShieldCheck, Mail, CheckCircle, ArrowRight, BookOpen, Layers, Monitor, Cpu, Brain,
  Workflow, BarChart3, ShieldAlert, Cloud, Infinity as DevopsIcon, Smartphone, Palette, Binary, LineChart,
  HelpCircle, ChevronDown, ChevronUp, MessageSquare, Send, Globe, Zap, Users, GraduationCap, Star
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreDomains: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onExploreDomains, onSelectRole }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      alert("Your corporate proposal has been delivered to Nextern AI Operations! Our team will reach back via your inbox.");
    }, 1200);
  };

  const getIconForDomain = (iconName: string) => {
    switch (iconName) {
      case "Coffee": return <Layers className="w-5 h-5 text-indigo-650" />;
      case "Layers": return <Layers className="w-5 h-5 text-purple-650" />;
      case "Monitor": return <Monitor className="w-5 h-5 text-blue-650" />;
      case "Cpu": return <Cpu className="w-5 h-5 text-zinc-650" />;
      case "Brain": return <Brain className="w-5 h-5 text-pink-650" />;
      case "Workflow": return <Workflow className="w-5 h-5 text-emerald-650" />;
      case "BarChart3": return <BarChart3 className="w-5 h-5 text-orange-650" />;
      case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-red-650" />;
      case "Cloud": return <Cloud className="w-5 h-5 text-sky-500" />;
      case "Infinity": return <DevopsIcon className="w-5 h-5 text-indigo-500" />;
      case "Smartphone": return <Smartphone className="w-5 h-5 text-emerald-650" />;
      case "Palette": return <Palette className="w-5 h-5 text-rose-650" />;
      case "Binary": return <Binary className="w-5 h-5 text-amber-655" />;
      case "LineChart": return <LineChart className="w-5 h-5 text-blue-650" />;
      default: return <BookOpen className="w-5 h-5 text-zinc-600" />;
    }
  };

  const getRetroBgStyle = (id: string) => {
    const pal: Record<string, { bg: string; text: string; border: string; accent: string }> = {
      "java-dev": { bg: "bg-[#fef9c3]", text: "text-amber-950", border: "border-amber-950", accent: "bg-amber-400" }, // Retro yellow
      "full-stack": { bg: "bg-[#f3e8ff]", text: "text-purple-955", border: "border-purple-950", accent: "bg-purple-400" }, // Lilac
      "frontend-dev": { bg: "bg-[#ecfdf5]", text: "text-emerald-950", border: "border-emerald-950", accent: "bg-emerald-400" }, // Mint Green
      "backend-dev": { bg: "bg-[#eff6ff]", text: "text-[#1e3a8a]", border: "border-[#1e3a8a]", accent: "bg-[#3b82f6]" }, // Water Blue
      "ai-engineer": { bg: "bg-[#fff1f2]", text: "text-[#881337]", border: "border-[#881337]", accent: "bg-[#f43f5e]" }, // Cherry Red
      "machine-learning": { bg: "bg-[#fafaf9]", text: "text-[#44403c]", border: "border-[#292524]", accent: "bg-[#a8a29e]" }, // Ivory/Stone
      "data-science": { bg: "bg-[#ffedd5]", text: "text-[#7c2d12]", border: "border-[#7c2d12]", accent: "bg-[#f97316]" }, // Orange peel
      "cyber-security": { bg: "bg-[#fee2e2]", text: "text-[#7f1d1d]", border: "border-[#7f1d1d]", accent: "bg-[#ef4444]" }, // Neon Red
      "cloud-computing": { bg: "bg-[#e0f2fe]", text: "text-[#0369a1]", border: "border-[#0369a1]", accent: "bg-[#0ea5e9]" }, // Sky Blue
      "devops": { bg: "bg-[#e0e7ff]", text: "text-[#312e81]", border: "border-[#312e81]", accent: "bg-[#6366f1]" }, // Cyber blue
      "android-dev": { bg: "bg-[#f0fdf4]", text: "text-[#14532d]", border: "border-[#14532d]", accent: "bg-[#22c55e]" }, // Slime Green
      "uiux-design": { bg: "bg-[#fff1f2]", text: "text-[#4c0519]", border: "border-[#4b5563]", accent: "bg-[#ec4899]" }, // Bubblegum Pink
      "python-dev": { bg: "bg-[#ecfdf5]", text: "text-[#064e3b]", border: "border-[#064e3b]", accent: "bg-[#10b981]" }, // Emerald
      "data-analytics": { bg: "bg-[#fef3c7]", text: "text-[#78350f]", border: "border-[#78350f]", accent: "bg-[#f59e0b]" }  // Gold Amber
    };
    return pal[id] || { bg: "bg-white", text: "text-zinc-900", border: "border-zinc-950", accent: "bg-zinc-400" };
  };

  return (
    <div className="space-y-24 pb-16 font-mono text-zinc-900 dark:text-zinc-100">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative pt-12 md:pt-20">
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 -z-10 overflow-hidden">
          {/* Retro pixelated grid backdrop simulation */}
          <div className="absolute top-1/4 right-[5%] w-[400px] h-[400px] bg-yellow-500/10 rounded-none blur-3xl" />
          <div className="absolute bottom-1/4 left-[5%] w-[300px] h-[300px] bg-indigo-500/10 rounded-none blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text Left */}
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold bg-[#eff6ff] text-[#1e40af] border-2 border-[#1e40af] dark:bg-zinc-900 dark:text-blue-400 dark:border-blue-400 select-none uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(30,64,175,1)] dark:shadow-[2px_2px_0px_0px_rgba(96,165,250,1)]">
              <Zap className="w-4 h-4 text-amber-500 animate-bounce shrink-0" />
              SYSTEM LOADED: INTERNSHIP PATHWAYS ON-LINE
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-pixel font-bold uppercase text-slate-950 dark:text-white leading-[1.1] tracking-normal">
              Build Skills.<br />
              Prove Talent.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-605 via-purple-600 to-amber-500 bg-size-200">
                Level Up.
              </span>
            </h1>

            <p className="text-zinc-750 dark:text-zinc-300 text-xs sm:text-sm font-sans leading-relaxed max-w-xl">
              Gain audited professional experience through sequence-locked tech pathways. Defeat industrial coding milestones, obtain secure academic credits, and showcase real portfolio proofs that hiring managers can verify instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onGetStarted}
                className="px-6 py-4 text-xs font-pixel uppercase tracking-wider text-white bg-indigo-600 border-4 border-zinc-950 dark:border-white shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.85)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer text-center"
              >
                START ADVENTURE (FREE)
              </button>
              <button
                onClick={onExploreDomains}
                className="px-6 py-4 text-xs font-pixel uppercase tracking-wider text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 border-4 border-zinc-950 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer text-center"
              >
                EXPLORE DOMAINS
              </button>
            </div>
          </div>

          {/* Hero Illustration Right: Gorgeous Cozy Coder Pixel Art */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-white dark:bg-zinc-900 p-3 border-4 border-zinc-950 dark:border-white shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
              {/* Retro top strip */}
              <div className="flex items-center justify-between border-b-4 border-zinc-950 dark:border-zinc-800 pb-2 mb-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 bg-red-500 rounded-none border-2 border-zinc-950" />
                  <span className="w-3 h-3 bg-yellow-400 rounded-none border-2 border-zinc-950" />
                  <span className="w-3 h-3 bg-green-500 rounded-none border-2 border-zinc-950" />
                </div>
                <span className="text-[10px] font-pixel text-zinc-500 uppercase tracking-widest leading-none">NX-SYS-V1.0</span>
              </div>
              
              {/* Cozy coder pixel art */}
              <div className="aspect-video relative overflow-hidden border-2 border-zinc-950 bg-neutral-900/40">
                <img
                  referrerPolicy="no-referrer"
                  src={cozyCoderPixel}
                  alt="Cozy Cat Coder Pixel Art Desk Asset"
                  className="w-full h-full object-cover select-none"
                />
                
                {/* Floating Retro terminal overlay */}
                <div className="absolute bottom-1 right-1 bg-zinc-950/80 border border-zinc-800 px-2 py-0.5 text-[8px] tracking-wide text-green-400 uppercase">
                  ACTIVE_EXP : +2500 XP
                </div>
              </div>
              
              {/* Retro legend line indicator */}
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 fill-amber-500" />
                  <span className="font-bold text-zinc-950 dark:text-zinc-300">Nextern AI Mascot: Catzilla</span>
                </div>
                <span className="text-[10px] text-zinc-450 font-bold bg-[#fef3c7] text-[#78350f] border border-[#78350f] dark:bg-amber-955 px-1.5 py-0.5 uppercase">Level 18</span>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Mockup active pipeline container */}
        <div className="max-w-5xl mx-auto px-4 mt-20">
          <div className="bg-white dark:bg-zinc-950 border-4 border-zinc-950 dark:border-zinc-850 p-1 shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] relative">
            
            <div className="absolute -top-3 left-6 px-3 py-1 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[10px] font-pixel uppercase tracking-widest border-2 border-zinc-950 dark:border-white">
              ACTIVE PLAYING AREA
            </div>
            
            <div className="bg-zinc-950 p-6 text-zinc-300 text-left relative mt-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-zinc-800 pb-4 mb-4 gap-4">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest bg-amber-500 border border-zinc-950 text-zinc-950 px-2.5 py-1">
                    CURRENT QUEST PIPELINE
                  </span>
                  <h3 className="text-base sm:text-lg font-pixel text-white mt-2 tracking-normal">MILESTONE 2: API ENCRYPTION ENGINE</h3>
                </div>
                <div className="text-right text-[10px]">
                  <span className="text-zinc-500">QUEST VERIFIER STATE:</span>
                  <strong className="text-emerald-400 block font-bold">✓ SECURE DEPLOYMENT SECURED</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] font-sans">
                <div className="space-y-4 text-zinc-400">
                  <div>
                    <h4 className="font-pixel text-[10px] text-zinc-250 uppercase tracking-widest mb-1 text-white">Milestone Storyline:</h4>
                    <p className="leading-relaxed font-sans">Evolve direct backend API systems into highly buffered structures with JWT session keys, secure cookie authorization buffers and CORS gates.</p>
                  </div>
                  <div>
                    <h4 className="font-pixel text-[10px] text-zinc-250 uppercase tracking-widest mb-1 text-white">Required Objectives:</h4>
                    <p className="font-sans">• Authenticate connection payloads with verified cryptographic variables.</p>
                    <p className="font-sans">• Enforce secure, non-exposed secrets using backend environment keys.</p>
                  </div>
                </div>

                <div className="bg-neutral-900 border-2 border-zinc-800 p-4 font-mono text-[10px] text-zinc-300">
                  <span className="text-[#a78bfa] block font-bold mb-1 font-pixel">&gt; AUDIT STATE CARD:</span>
                  <p className="leading-relaxed">&gt; PERFORMANCE SCORE: S (100/100 PASS)</p>
                  <p className="leading-relaxed">&gt; PLAGIARISM CHECK: 1.2% AUTHENTIC WORK</p>
                  <p className="leading-relaxed">&gt; SECURE PROTOCOLS: ENFORCED EXPORTS ACTIVE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STANDOUT STATISTICS RE-IMAGINED AS CHAR HERO STATISTICS */}
      <section className="bg-zinc-150 dark:bg-zinc-950 py-12 border-y-4 border-zinc-950 dark:border-zinc-800 bg-[linear-gradient(45deg,#fafaf9_25%,transparent_25%),linear-gradient(-45deg,#fafaf9_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#fafaf9_75%),linear-gradient(-45deg,transparent_75%,#fafaf9_75%)] bg-[size:20px_20px] dark:bg-none">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Stat Card 1 */}
            <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center relative block overflow-hidden">
              <span className="absolute top-2 right-2 text-[8px] font-pixel text-zinc-400 tracking-widest">LVL.MAX</span>
              <p className="text-4xl font-pixel text-indigo-650 tracking-normal text-indigo-600 dark:text-indigo-400">12,500+</p>
              <p className="text-[10px] font-pixel uppercase tracking-wider text-zinc-550 dark:text-zinc-400 mt-2">CODER SCHOLARS</p>
              <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-2 border-2 border-zinc-950 mt-2">
                <div className="bg-indigo-500 h-full w-4/5" />
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center relative block overflow-hidden">
              <span className="absolute top-2 right-2 text-[8px] font-pixel text-zinc-405 text-zinc-400 tracking-widest">EXP EXP</span>
              <p className="text-4xl font-pixel text-purple-650 tracking-normal text-purple-600 dark:text-purple-400">38,900+</p>
              <p className="text-[10px] font-pixel uppercase tracking-wider text-zinc-555 dark:text-zinc-400 mt-2">QUEST SOLVED</p>
              <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-2 border-2 border-zinc-950 mt-2">
                <div className="bg-purple-500 h-full w-11/12" />
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center relative block overflow-hidden">
              <span className="absolute top-2 right-2 text-[8px] font-pixel text-zinc-400 tracking-widest">GOLD DR</span>
              <p className="text-4xl font-pixel text-amber-600 tracking-normal dark:text-amber-400">8,400+</p>
              <p className="text-[10px] font-pixel uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-2">CERTIFICATES</p>
              <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-2 border-2 border-zinc-950 mt-2">
                <div className="bg-amber-400 h-full w-2/3" />
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center relative block overflow-hidden">
              <span className="absolute top-2 right-2 text-[8px] font-pixel text-zinc-400 tracking-widest">GUILDS</span>
              <p className="text-4xl font-pixel text-emerald-600 tracking-normal dark:text-emerald-400">220+</p>
              <p className="text-[10px] font-pixel uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-2">HIRING GUILDS</p>
              <div className="w-full bg-zinc-100 dark:bg-zinc-950 h-2 border-2 border-zinc-950 mt-2">
                <div className="bg-emerald-500 h-full w-3/4" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED DOMAINS INTERACTIVE CARDS */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3.5xl md:text-4xl font-pixel uppercase text-slate-955 dark:text-white tracking-normal">
            7+ ARCH INTERNSHIP PATHWAYS
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-indigo-500 to-amber-400 mx-auto border border-zinc-950" />
          <p className="text-zinc-500 dark:text-zinc-400 text-xs font-sans leading-relaxed">
            Click into tailored pathways complete with automated sequence locks. Level up key indices to claims legendary, cryptographically signed portfolio assets.
          </p>
        </div>

        {/* Pathways Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((dom) => {
            const pal = getRetroBgStyle(dom.id);
            return (
              <div
                key={dom.id}
                onClick={onGetStarted}
                className={`flex flex-col justify-between p-6 ${pal.bg} ${pal.text} border-4 border-zinc-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.15)] transition-all cursor-pointer relative`}
              >
                {/* Level Tag */}
                <div className="absolute top-4 right-4 text-[9px] font-pixel uppercase px-2.5 py-0.5 border-2 border-zinc-950 bg-white/70">
                  {dom.difficulty}
                </div>

                <div>
                  {/* Icon holder */}
                  <div className="mb-4">
                    <div className={`p-2.5 inline-block ${pal.accent} border-2 border-zinc-950`}>
                      {getIconForDomain(dom.icon)}
                    </div>
                  </div>

                  <h3 className="text-xs sm:text-sm font-pixel uppercase tracking-normal mb-2 leading-tight">
                    {dom.title}
                  </h3>
                  
                  <p className="text-[11px] font-sans leading-relaxed text-zinc-700/90 dark:text-zinc-900/90 line-clamp-3">
                    {dom.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-955/35 mt-5 flex items-center justify-between text-[10px] font-pixel uppercase tracking-widest">
                  Apply for Intern
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: THE CAMPAIGN MAP (HOW WORK) */}
      <section className="bg-zinc-50 dark:bg-zinc-950/40 py-16 border-y-4 border-zinc-950 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[10px] font-pixel bg-[#fef3c7] text-[#78350f] border-2 border-zinc-950 px-2.5 py-1 uppercase tracking-widest font-bold">
              SYSTEM DIRECTORY: TRANSIT PLAN
            </span>
            <h2 className="text-2xl font-pixel uppercase text-slate-950 dark:text-white mt-3">
              NEXTERN AI COMPLIANCE FLOW CHART
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs font-sans max-w-xl mx-auto">
              Follow the verified roadmap to complete realistic corporate tasks, satisfy compliance checks, and earn secure credentials.
            </p>
          </div>

          {/* RETRO PIXEL ROADMAP FLOW CHART */}
          <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] mb-12">
            <div className="text-center font-pixel text-[10px] text-zinc-400 uppercase tracking-widest mb-8 border-b-2 border-dashed border-zinc-200 dark:border-zinc-805 pb-4">
              [ SCHEMA: TRANSIT NODE MATRIX V1.8 ]
            </div>

            {/* Desktop Horizontal / Mobile Vertical Flow Chart Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-7 items-center justify-between gap-4 relative">
              
              {/* Node 1 */}
              <div className="bg-[#eff6ff] dark:bg-blue-955/20 border-4 border-zinc-950 p-4 relative text-left rounded-none col-span-1 min-h-[140px] flex flex-col justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <div className="absolute top-2 right-2 font-pixel text-[8px] bg-blue-600 text-white px-1 py-0.5 border border-zinc-950">NODE 01</div>
                  <span className="font-pixel text-[8px] text-blue-600 dark:text-blue-400 uppercase block mb-1">01 / DISCOVERY</span>
                  <h4 className="font-pixel text-[11px] uppercase text-zinc-950 dark:text-white leading-snug">Apply for Intern</h4>
                </div>
                <p className="text-[10px] text-zinc-500 leading-normal font-sans mt-2">Pick from 7+ modern tracks. Setup your interactive workspace instantly.</p>
              </div>

              {/* Arrow 1 */}
              <div className="flex items-center justify-center col-span-1 py-2 lg:py-0">
                <div className="flex lg:flex-col items-center gap-1">
                  <span className="text-xs font-pixel text-zinc-400 hidden lg:inline">SUCCESSRATE: 100%</span>
                  <div className="text-lg font-bold text-zinc-800 dark:text-zinc-300 transform rotate-90 lg:rotate-0 tracking-widest">
                    ━━━━►
                  </div>
                  <span className="text-[9px] font-pixel text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950/40 px-1.5 py-0.5 border border-zinc-950">VERIFIED</span>
                </div>
              </div>

              {/* Node 2 */}
              <div className="bg-[#faf5ff] dark:bg-purple-955/20 border-4 border-zinc-950 p-4 relative text-left rounded-none col-span-1 min-h-[140px] flex flex-col justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <div className="absolute top-2 right-2 font-pixel text-[8px] bg-purple-600 text-white px-1 py-0.5 border border-zinc-950">NODE 02</div>
                  <span className="font-pixel text-[8px] text-purple-600 dark:text-purple-400 uppercase block mb-1">02 / COMPLIANCE</span>
                  <h4 className="font-pixel text-[11px] uppercase text-zinc-950 dark:text-white leading-snug">Claim Formal Offer</h4>
                </div>
                <p className="text-[10px] text-zinc-500 leading-normal font-sans mt-2">Get an officially signed, downloadable PDF letter for university appraisal credits.</p>
              </div>

              {/* Arrow 2 */}
              <div className="flex items-center justify-center col-span-1 py-2 lg:py-0">
                <div className="flex lg:flex-col items-center gap-1">
                  <span className="text-xs font-pixel text-zinc-400 hidden lg:inline">COMPILATION</span>
                  <div className="text-lg font-bold text-zinc-800 dark:text-zinc-300 transform rotate-90 lg:rotate-0 tracking-widest">
                    ━━━━►
                  </div>
                  <span className="text-[9px] font-pixel text-purple-600 dark:text-purple-400 font-bold bg-purple-100 dark:bg-purple-950/40 px-1.5 py-0.5 border border-zinc-950">COMPILES</span>
                </div>
              </div>

              {/* Node 3 */}
              <div className="bg-[#fdf2f8] dark:bg-pink-955/20 border-4 border-zinc-950 p-4 relative text-left rounded-none col-span-1 min-h-[140px] flex flex-col justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <div className="absolute top-2 right-2 font-pixel text-[8px] bg-pink-600 text-white px-1 py-0.5 border border-zinc-950">NODE 03</div>
                  <span className="font-pixel text-[8px] text-pink-600 dark:text-pink-400 uppercase block mb-1">03 / CAMPAIGN</span>
                  <h4 className="font-pixel text-[11px] uppercase text-zinc-950 dark:text-white leading-snug">Solve 3 Milestones</h4>
                </div>
                <p className="text-[10px] text-zinc-500 leading-normal font-sans mt-2">Build dynamic products. Static validators audit syntax and plagiarism metrics.</p>
              </div>

              {/* Arrow 3 */}
              <div className="flex items-center justify-center col-span-1 py-2 lg:py-0">
                <div className="flex lg:flex-col items-center gap-1">
                  <span className="text-xs font-pixel text-zinc-400 hidden lg:inline">ZERO PLAGIARISM</span>
                  <div className="text-lg font-bold text-zinc-800 dark:text-zinc-300 transform rotate-90 lg:rotate-0 tracking-widest">
                    ━━━━►
                  </div>
                  <span className="text-[9px] font-pixel text-pink-600 dark:text-pink-400 font-bold bg-pink-100 dark:bg-pink-950/40 px-1.5 py-0.5 border border-zinc-950">AUTHENTIC</span>
                </div>
              </div>

              {/* Node 4 */}
              <div className="bg-[#ecfdf5] dark:bg-emerald-955/20 border-4 border-zinc-950 p-4 relative text-left rounded-none col-span-1 min-h-[140px] flex flex-col justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <div className="absolute top-2 right-2 font-pixel text-[8px] bg-emerald-600 text-white px-1 py-0.5 border border-zinc-950">NODE 04</div>
                  <span className="font-pixel text-[8px] text-emerald-600 dark:text-emerald-400 uppercase block mb-1">04 / REWARDS</span>
                  <h4 className="font-pixel text-[11px] uppercase text-zinc-950 dark:text-white leading-snug">Claim Verification Cert</h4>
                </div>
                <p className="text-[10px] text-zinc-500 leading-normal font-sans mt-2">Issued automatically on our global verification node gates. No costs ever.</p>
              </div>

            </div>
          </div>

          {/* DEDICATED FREE CERTIFICATE ACCREDITATION DETAIL SHOWCASE */}
          <div className="bg-[#f0fdf4] dark:bg-zinc-900 border-4 border-emerald-950 p-6 md:p-8 relative block overflow-hidden shadow-[6px_6px_0px_0px_#14532d] dark:shadow-[6px_6px_0px_0px_rgba(16,185,129,0.15)]">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white px-4 py-1 text-[9px] font-pixel uppercase tracking-widest border-b-2 border-l-2 border-emerald-950">
              100% FREE OF CHARGE
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              {/* Illustrative Retro Certificate Badge */}
              <div className="w-full md:w-1/3 bg-white dark:bg-zinc-950 border-4 border-zinc-950 p-4 text-center relative shadow-[4px_4px_0px_0px_#000] rotate-1 hover:rotate-0 transition-transform">
                <div className="border border-dashed border-zinc-300 p-4 space-y-2">
                  <div className="inline-flex items-center gap-1 font-pixel text-[8px] text-emerald-700 bg-emerald-50 dark:bg-emerald-900/10 px-2 py-0.5 border border-emerald-700">
                    ★ NEXTERN AI VERIFIED ★
                  </div>
                  <p className="text-[14px] font-pixel text-zinc-900 dark:text-white uppercase leading-tight tracking-tight mt-1">SCHOLAR ACCREDITATION</p>
                  <div className="w-12 h-1 bg-zinc-300 mx-auto" />
                  <p className="text-[9px] text-zinc-400 font-sans mt-2 leading-tight">This certifies full compliance with all project metrics.</p>
                  
                  <div className="flex items-center justify-between text-[7px] font-mono pt-3 text-zinc-400 border-t border-zinc-100">
                    <div>LEDGER NODE: #77A1</div>
                    <div>SECURE DIGITAL SIGN</div>
                  </div>
                </div>
              </div>

              {/* Certificate Features */}
              <div className="flex-1 space-y-4">
                <span className="text-[9px] font-pixel text-emerald-700 dark:text-emerald-400 uppercase tracking-widest bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 border border-emerald-300 inline-block font-bold">
                  VERIFIED CREDENTIAL PORTFOLIO
                </span>
                <h3 className="text-lg md:text-xl font-pixel uppercase text-slate-950 dark:text-white leading-snug">
                  Earn Your Verifiable, Free-to-Share Career Asset
                </h3>
                <p className="text-zinc-650 dark:text-zinc-300 text-xs font-sans leading-relaxed">
                  We believe talented developer students shouldn't have to pay a single penny to lock real proof of work. Every single successful pathway finisher receives a premium, high-fidelity internship completion certificate incorporating active QR-Code verification mechanisms, completely free of any administrative charges.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold font-pixel">✓</span>
                    <span className="text-zinc-700 dark:text-zinc-300"><strong>Public Cryptographic Ref</strong> — Permanent verifiable URL keys for LinkedIn headers.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold font-pixel">✓</span>
                    <span className="text-zinc-700 dark:text-zinc-300"><strong>PDF Vector Downloads</strong> — Ready-to-print, ultra-high resolution documents.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold font-pixel">✓</span>
                    <span className="text-zinc-700 dark:text-zinc-300"><strong>Enterprise Verified Logs</strong> — Connects instantly with our premium recruitment partners.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold font-pixel">✓</span>
                    <span className="text-zinc-700 dark:text-zinc-300"><strong>Zero Lifetime Hidden Charges</strong> — Absolutely zero fees for issuance or hosting layers.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: BOSS DUNGEON BANNER (RECRUITER TARGET) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-[#fffbeb] border-4 border-zinc-950 p-8 md:p-12 text-zinc-900 shadow-[8px_8px_0px_0px_#000] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 dark:bg-zinc-900 dark:text-white dark:border-white dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)]">
          
          {/* Warning hazard stripe trim */}
          <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-amber-400 via-zinc-950 to-amber-400 bg-[size:40px_10px]" />
          
          <div className="max-w-xl text-left space-y-3">
            <span className="text-[9px] font-pixel font-bold uppercase tracking-widest bg-amber-400 text-zinc-950 py-1 px-2.5 border-2 border-zinc-950">
              UNLOCKED: SOURCING HUBS
            </span>
            <h2 className="text-xl sm:text-2xl font-pixel uppercase tracking-normal">FIND LEGITIMATE PRACTICAL EXPERT CODER</h2>
            <p className="text-xs font-sans leading-relaxed text-zinc-700 dark:text-zinc-300">
              Bypass static resume stacks. The Nextern AI guild candidate list filters talent strictly by compiled milestone portfolios, safe plagiarism indicators, and verified ledger transcripts.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[8px] font-pixel font-semibold">
              <span className="bg-white border-2 border-zinc-950 dark:bg-zinc-800 px-2.5 py-1 text-zinc-900 dark:text-white">✓ VERIFIED GITHUB PORTFOLIO</span>
              <span className="bg-white border-2 border-zinc-950 dark:bg-zinc-800 px-2.5 py-1 text-zinc-900 dark:text-white">✓ ZERO AI COPY DETECTION</span>
              <span className="bg-white border-2 border-zinc-950 dark:bg-zinc-800 px-2.5 py-1 text-zinc-900 dark:text-white">✓ QUICK QR LEDGER DIRECTORY</span>
            </div>
          </div>
          
          <button
            onClick={() => onSelectRole(UserRole.RECRUITER)}
            className="px-6 py-4 bg-amber-400 hover:bg-amber-505 hover:bg-amber-500 text-zinc-950 font-pixel text-xs border-4 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer shrink-0 text-center uppercase tracking-wider"
          >
            ENTER RECRUITER HUD
          </button>
        </div>
      </section>

      {/* SECTION 6: STUDENT TALK TALP POPUPS (SUCCESS STORIES) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-2xl font-pixel uppercase text-slate-950 dark:text-white">ADVENTURER DIALOGS</h2>
          <div className="w-16 h-1.5 bg-indigo-500 mx-auto border border-zinc-950" />
          <p className="text-zinc-500 dark:text-zinc-400 text-xs font-sans">Nextern AI guild alumni are currently deployed at tier-1 technology groups globally.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[11px] font-sans">
          {mockSuccessStories.map((story) => (
            <div
              key={story.id}
              className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.1)] flex flex-col justify-between relative"
            >
              <div className="absolute top-2 right-4 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-none bg-emerald-500 animate-pulse border border-zinc-950" />
                <span className="text-[8px] font-pixel text-zinc-400">ONLINE</span>
              </div>

              {/* Chat Speech display bubble container */}
              <div className="relative bg-zinc-50 dark:bg-zinc-950 p-4 border-2 border-zinc-950 rounded-none mb-6">
                <p className="text-zinc-650 dark:text-zinc-350 italic leading-relaxed text-xs">
                  &ldquo;{story.quote}&rdquo;
                </p>
                {/* Cute little speech bubble caret anchor */}
                <div className="absolute bottom-[-10px] left-6 w-3 h-3 bg-zinc-50 dark:bg-zinc-950 border-r-2 border-b-2 border-zinc-950 rotate-45" />
              </div>

              <div className="flex items-center gap-3">
                <img
                  referrerPolicy="no-referrer"
                  src={story.image}
                  alt={story.name}
                  className="w-11 h-11 rounded-none object-cover border-2 border-zinc-950 shadow-[2px_2px_0px_0px_#000]"
                />
                <div>
                  <h4 className="font-pixel text-[10px] uppercase text-slate-955 dark:text-white leading-none mb-1.5">
                    {story.name}
                  </h4>
                  <p className="text-[9px] font-pixel text-indigo-600 dark:text-indigo-400 uppercase">
                    {story.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: CAMPUS COALITION (UNI PARTNER) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main info text left */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[9px] font-pixel font-bold uppercase tracking-widest text-[#065f46] bg-[#d1fae5] border-2 border-[#065f46] px-3 py-1 text-left block w-fit select-none shadow-[2px_2px_0px_0px_#065f46]">
              CURRICULUM CHAPTER
            </span>
            <h2 className="text-xl sm:text-2xl font-pixel uppercase text-slate-950 dark:text-white leading-tight">
              CONNECT YOUR COLLEGE COHORT TO VERIFIABLE RUNS
            </h2>
            <p className="text-zinc-550 dark:text-zinc-400 text-xs font-sans leading-relaxed">
              Equip college placement deans, course heads, and registrar desks with deep, real-time progression telemetry. Track assignments, calculate score diagnostics, and dispatch verified academic courses credentials.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onSelectRole(UserRole.UNIVERSITY)}
                className="inline-flex items-center gap-1.5 text-xs font-pixel uppercase text-indigo-650 dark:text-indigo-400 hover:underline"
              >
                Launch University Partner Dashboard
                <ArrowRight className="w-4 h-4 animate-bounce shrink-0" />
              </button>
            </div>
          </div>

          {/* University Board Mockup Right */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 p-6 shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] w-full max-w-sm text-left relative">
              <div className="absolute top-2 right-2 text-[8px] font-pixel text-zinc-400">NX-UNIV.SYS</div>
              
              <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-zinc-950 dark:border-zinc-800">
                <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="font-pixel text-[10px] uppercase text-zinc-950 dark:text-zinc-150">CAMPUS COALITION PORTAL</span>
              </div>
              
              <div className="space-y-3 text-[11px]">
                <div className="flex justify-between border-b border-zinc-150 pb-1">
                  <span className="text-zinc-450">COMPLETED MILSTONES:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">88% PASSED</strong>
                </div>
                <div className="flex justify-between border-b border-zinc-150 pb-1 border-dashed">
                  <span className="text-zinc-450">ENROLLED SCHOLARS:</span>
                  <strong className="text-[#111] dark:text-white font-bold">124 STUDENTS</strong>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-zinc-455">PLACEMENT PIPELINE:</span>
                  <strong className="text-indigo-600 dark:text-indigo-400">42 CANDIDATES</strong>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 8: FAQ DIALOGS (ACCORDION) */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl font-pixel uppercase text-slate-955 dark:text-white">GUIDELINES ENCYCLOPEDIA</h2>
          <p className="text-zinc-400 text-xs font-sans">Access quick instruction indices on Nextern AI guidelines and rules.</p>
        </div>

        <div className="space-y-4 text-xs font-sans">
          {mockFAQs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 rounded-none transition-all text-left"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-4 flex justify-between items-center text-xs font-pixel uppercase text-slate-955 dark:text-zinc-150 outline-none text-left leading-normal"
                >
                  {faq.question}
                  {isOpen ? <ChevronUp className="w-4 h-4 text-zinc-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 border-t-2 border-zinc-950 text-xs font-sans text-zinc-650 dark:text-zinc-350 leading-relaxed font-normal bg-zinc-50 dark:bg-zinc-950/60 p-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 9: CAMPAIGN HEADQUARTERS RESPONSE FORM */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-zinc-900 border-4 border-zinc-950 p-6 md:p-8 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] text-left relative">
          
          <div className="text-center mb-8 border-b-2 border-zinc-900 dark:border-zinc-850 pb-4">
            <h3 className="text-sm font-pixel uppercase text-slate-955 dark:text-white">GUILD SUPPORT RESPONSE OFFICE</h3>
            <p className="text-zinc-500 text-[11px] font-sans mt-2">Ready to connect your academic pipeline or sponsor a dedicated developer pathway?</p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-5 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-pixel uppercase tracking-wider text-zinc-500 mb-2">CAMPUS LEAD NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Prof. Jenkins"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full text-xs p-3 bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-950 rounded-none text-zinc-805 dark:text-white outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-pixel uppercase tracking-wider text-zinc-500 mb-2">CONTACT INBOX</label>
                <input
                  type="email"
                  required
                  placeholder="jenkins@college.edu"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full text-xs p-3 bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-950 rounded-none text-zinc-805 dark:text-white outline-none focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-pixel uppercase tracking-wider text-zinc-500 mb-2">PROPOSAL COMMUNICATIONS DETAILS</label>
              <textarea
                required
                rows={4}
                placeholder="State your student roster parameters, target technology pathway, or recruiter metrics requests..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full text-xs p-3 bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-950 rounded-none text-zinc-805 dark:text-white outline-none focus:bg-white leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 font-pixel text-xs uppercase bg-indigo-600 hover:bg-indigo-700 text-white border-4 border-zinc-950 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-1.5 ml-auto"
            >
              DISPATCH PROPOSAL
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
