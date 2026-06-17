import React, { useRef } from "react";
import { User, Internship } from "../types";
import { Award, ShieldCheck, Download, Printer, CheckCircle, FileText, ArrowLeft, QrCode } from "lucide-react";
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

interface OfferLetterProps {
  user: User;
  internship: Internship;
  onBack?: () => void;
}

export const OfferLetterView: React.FC<OfferLetterProps> = ({ user, internship, onBack }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!printRef.current) return;
    const element = printRef.current;
    
    try {
      const dataUrl = await toPng(element, { pixelRatio: 2 });
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      });
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${user.name.replace(/\s+/g, '_')}_Offer_Letter.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-semibold shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Actual Letter Workspace */}
      <div
        ref={printRef}
        id="offer-letter-canvas"
        style={{
          backgroundColor: '#ffffff',
          color: '#18181b',
          padding: '40px 60px',
          borderRadius: '8px',
          border: '1px solid #f4f4f5',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden'
        }}
        className="print:border-none print:p-0"
      >
        {/* Modern Geometric Accents */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '128px', height: '128px', backgroundColor: '#f0f9ff', borderBottomLeftRadius: '100%', zIndex: 0, opacity: 0.6 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '96px', height: '96px', backgroundColor: '#eef2ff', borderTopRightRadius: '100%', zIndex: 0, opacity: 0.6 }} />

        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e4e4e7', paddingBottom: '32px', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#312e81', fontWeight: 800, fontSize: '24px', letterSpacing: '-0.5px' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#4f46e5', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 900 }}>
                N
              </span>
              NEXTERN
            </div>
            <p style={{ fontSize: '12px', color: '#71717a', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
              Build Skills • Prove Talent
            </p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '12px', color: '#71717a', lineHeight: '1.5' }}>
            <p style={{ fontWeight: 600, color: '#27272a' }}>Nextern AI Technologies Private Limited</p>
            <p>SaaS & Talent Operations Headquarters</p>
            <p>contact@nextern.dev • https://nextern.dev</p>
          </div>
        </div>

        {/* Meta Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', fontSize: '14px', gap: '16px', color: '#3f3f46', position: 'relative', zIndex: 1 }}>
          <div>
            <span style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', display: 'block', textTransform: 'uppercase' }}>Date:</span>
            <span style={{ fontWeight: 500, color: '#27272a' }}>{todayStr}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', display: 'block', textTransform: 'uppercase' }}>Document Reference:</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 500, color: '#4f46e5' }}>{internship.offerLetterId}</span>
          </div>
        </div>

        {/* Address */}
        <div style={{ marginBottom: '32px', fontSize: '14px', color: '#3f3f46', position: 'relative', zIndex: 1, lineHeight: '1.5' }}>
          <span style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>To,</span>
          <p style={{ fontWeight: 'bold', color: '#18181b', fontSize: '16px' }}>{user.name}</p>
          <p style={{ color: '#52525b' }}>{user.email}</p>
          {user.universityName && <p style={{ color: '#71717a', fontWeight: 500 }}>{user.universityName}</p>}
          <p style={{ color: '#a1a1aa', marginTop: '4px', fontSize: '12px' }}>Intern Identification Status: Verified Account</p>
        </div>

        {/* Subject */}
        <div style={{ marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontWeight: 'bold', color: '#18181b', borderLeft: '4px solid #4f46e5', paddingLeft: '12px', paddingTop: '4px', paddingBottom: '4px', fontSize: '16px' }}>
            Subject: Offer of Project-Based Internship in {internship.domainTitle}
          </h2>
        </div>

        {/* Letter Body */}
        <div style={{ fontSize: '14px', color: '#3f3f46', lineHeight: '1.6', position: 'relative', zIndex: 1 }}>
          <p style={{ marginBottom: '16px' }}>
            Dear <strong style={{ color: '#18181b' }}>{user.name}</strong>,
          </p>
          <p style={{ marginBottom: '16px' }}>
            We are thrilled to extend this formal offer of a virtual, project-driven internship at <strong style={{ color: '#18181b' }}>Nextern AI</strong>. Based on your profile evaluation and academic discipline, you have been selected for the position of <strong style={{ color: '#18181b' }}>{internship.domainTitle} Intern</strong>.
          </p>
          <p style={{ marginBottom: '16px' }}>
            This internship is structured as a skill-first, sequence-controlled program spanning up to 4 weeks. Throughout this tenure, you will be assigned industrial-grade project briefs specifically designed to challenge your engineering and problem-solving capacities. Each task contains explicit acceptance conditions, mock resources, and automated AI evaluation metrics.
          </p>
          <p style={{ backgroundColor: '#eef2ff', border: '1px solid #e0e7ff', padding: '16px', borderRadius: '8px', color: '#312e81', fontWeight: 500, marginBottom: '16px' }}>
            <strong style={{ color: '#312e81' }}>Program Structure & Deliverables:</strong>
            <br />
            • Milestones submitted via active public work directories (GitHub, File Links, etc.).
            <br />
            • Access to Nextern AI’s Automated AI Review Engine supplying immediate scorecard critiques.
            <br />
            • Global recruiter visibility on our candidate ranking boards upon successfully completing all tasks.
          </p>
          <p style={{ marginBottom: '16px' }}>
            Upon your complete fulfillment of the designated task chain and strict observance of plagiarism rules (maximum of 15% similarity), Nextern AI will issue an official, tamper-proof <strong style={{ color: '#18181b' }}>Internship Completion Certificate</strong> verified securely with a cryptographic identifier.
          </p>
          <p>
            Please access your customized Nextern AI workspace using your registered credentials to initialize Task 1 immediately. We are excited about your potential and look forward to seeing your practical portfolios expand.
          </p>
        </div>

        {/* Signatures */}
        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #f4f4f5', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '20px', color: '#312e81', letterSpacing: '0.5px' }}>
              Arjun Vance
            </div>
            <div style={{ width: '128px', borderBottom: '2px solid #d4d4d8', margin: '4px 0' }}></div>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#27272a', textTransform: 'uppercase' }}>Arjun Vance</p>
            <p style={{ fontSize: '10px', color: '#71717a' }}>Chief Executive Officer, Nextern AI Platform</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#fafafa', border: '1px solid #e4e4e7', padding: '10px', borderRadius: '8px' }}>
            <QrCode style={{ width: '48px', height: '48px', color: '#27272a' }} />
            <div style={{ fontSize: '10px', color: '#71717a', fontFamily: 'monospace' }}>
              <span style={{ fontWeight: 'bold', color: '#4338ca', display: 'block', fontSize: '12px' }}>SECURE ID</span>
              {internship.offerLetterId.substring(0, 16)}...
              <br />
              VERIFIED DEPLOYMENT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CertificateProps {
  user: User;
  internship: Internship;
  onBack?: () => void;
}

export const CertificateView: React.FC<CertificateProps> = ({ user, internship, onBack }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!printRef.current) return;
    const element = printRef.current;
    
    try {
      const dataUrl = await toPng(element, { pixelRatio: 2 });
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: 'letter'
      });
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${user.name.replace(/\s+/g, '_')}_Certificate.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const completeDateStr = internship.completedAt
    ? new Date(internship.completedAt).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
    : new Date().toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });

  const startDateStr = new Date(
    (internship.completedAt ? new Date(internship.completedAt) : new Date()).getTime() - 60 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const certId = internship.certificateId || `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black font-semibold shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Actual Certificate Workspace */}
      <div className="w-full overflow-x-auto pb-4 select-none">
        <div
          ref={printRef}
          id="certificate-canvas"
          className="relative overflow-hidden print:border-none print:m-0"
          style={{
            width: "1000px",
            height: "707px",
            backgroundColor: "#ffffff",
            color: "#0f172a",
            fontFamily: "sans-serif",
            padding: "35px 50px",
            position: "relative",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e2e8f0",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          {/* Borders */}
          <div style={{ position: 'absolute', top: '15px', left: '15px', right: '15px', bottom: '15px', border: '5px solid #0f172a', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '24px', left: '24px', right: '24px', bottom: '24px', border: '1px solid #c8a45d', pointerEvents: 'none' }} />

          {/* Left Ribbon */}
          <div style={{ 
            position: 'absolute', 
            top: '0', 
            left: '60px', 
            width: '100px', 
            height: '280px', 
            backgroundColor: '#0f172a', /* Dark slate */
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '25px',
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 85%, 0% 100%)',
            zIndex: 10
          }}>
            {/* Inner border line inside ribbon */}
            <div style={{position: 'absolute', top: 0, left: '6px', bottom: '25px', right: '6px', borderLeft: '1px solid #c8a45d', borderRight: '1px solid #c8a45d', borderBottom: '1px solid transparent'}} />
            <div style={{ padding: '15px 0' }}>
              <Award style={{ width: '48px', height: '48px', color: '#fbbf24', strokeWidth: 1.5 }} />
            </div>
            <div style={{ 
              fontSize: '9px', 
              textAlign: 'center', 
              marginTop: '25px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              lineHeight: '1.8',
              color: '#c8a45d',
              fontWeight: 'bold'
            }}>
              BUILD.<br/>
              LEARN.<br/><br/>
              GET DISCOVERED.
            </div>
          </div>

          {/* Certificate Content - Flex column */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', position: 'relative', zIndex: 5 }}>
            
            {/* 1. Header (Logo & ID) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', paddingLeft: '110px' }}>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ color: '#4f46e5', display: 'flex', alignItems: 'center' }}>
                  <ShieldCheck style={{ width: '38px', height: '38px' }} />
                </div>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '2px', fontFamily: '"Space Grotesk", sans-serif' }}>
                  NEXTERN <span style={{ color: '#4f46e5' }}>AI</span>
                </span>
              </div>
              {/* ID */}
              <div style={{ textAlign: 'right', fontSize: '11px', color: '#64748b', fontFamily: '"JetBrains Mono", monospace' }}>
                <div style={{ textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Certificate ID</div>
                <div style={{ color: '#1e293b', marginTop: '2px', fontWeight: 'bold' }}>{certId}</div>
              </div>
            </div>

            {/* 2. Body Content (Structured spacing) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1, justifyContent: 'center', padding: '10px 0' }}>
              <h1 style={{ fontSize: '42px', fontWeight: 800, color: '#0f172a', letterSpacing: '6px', margin: '0 0 4px 0', fontFamily: 'serif' }}>
                CERTIFICATE
              </h1>
              
              <div style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '4px', color: '#64748b', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px', textTransform: 'uppercase' }}>
                <span style={{ height: '1px', width: '30px', backgroundColor: '#cbd5e1' }}></span>
                of internship completion
                <span style={{ height: '1px', width: '30px', backgroundColor: '#cbd5e1' }}></span>
              </div>

              <div style={{ fontSize: '14px', color: '#475569', fontStyle: 'italic', marginBottom: '10px' }}>
                This is to certify that
              </div>

              <h2 style={{ fontSize: '44px', fontWeight: 700, color: '#0f172a', margin: '0 0 10px 0', fontFamily: 'serif', WebkitFontSmoothing: 'antialiased' }}>
                {user.name}
              </h2>

              <div style={{ fontSize: '14px', color: '#475569', marginBottom: '10px' }}>
                has successfully completed the project-based internship in
              </div>

              <h3 style={{ fontSize: '26px', fontWeight: 'bold', color: '#4338ca', margin: '0 0 12px 0', fontFamily: 'serif', letterSpacing: '0.5px' }}>
                {internship.domainTitle}
              </h3>

              <div style={{ fontSize: '14px', color: '#475569', marginBottom: '15px' }}>
                at <strong style={{ color: '#0f172a' }}>Nextern AI</strong>
              </div>

              <p style={{ fontSize: '12.5px', color: '#475569', textAlign: 'center', maxWidth: '650px', lineHeight: '1.6', margin: '0 0 15px 0' }}>
                During this internship, the candidate has demonstrated dedication, consistency, 
                and a strong understanding of the domain by completing all assigned tasks and milestones.
              </p>
            </div>

            {/* 3. Footer (Dates, Signatures, QR) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '130px', borderTop: '1px solid #f1f5f9', paddingTop: '15px' }}>
              
              {/* Dates */}
              <div style={{ width: '220px', fontSize: '11px', color: '#475569', lineHeight: '1.4' }}>
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold', color: '#64748b' }}>Internship Duration</div>
                <div style={{ color: '#1e293b', fontWeight: 600, marginTop: '2px' }}>{startDateStr} - {completeDateStr}</div>
                <div style={{ color: '#64748b' }}>Duration: 2 Months</div>
              </div>

              {/* Signatures & Seal */}
              <div style={{ display: 'flex', gap: '35px', alignItems: 'flex-end' }}>
                {/* CEO Signature */}
                <div style={{ textAlign: 'center', width: '130px' }}>
                  <div style={{ fontFamily: 'cursive', fontSize: '24px', color: '#1e293b', marginBottom: '4px', height: '36px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    Arjun Vance
                  </div>
                  <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '4px', fontSize: '10px', fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase' }}>
                    Arjun Vance
                  </div>
                  <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px' }}>Chief Executive Officer</div>
                </div>

                {/* Verified Badge */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ 
                    width: '74px', 
                    height: '74px', 
                    borderRadius: '50%', 
                    border: '3px double #c8a45d', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#c8a45d', 
                    backgroundColor: '#fafaf9',
                    position: 'relative'
                  }}>
                    <span style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '0.5px' }}>NEXTERN AI</span>
                    <Award style={{ width: '24px', height: '24px', margin: '2px 0' }} />
                    <span style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '0.5px' }}>VERIFIED</span>
                  </div>
                </div>

                {/* PD Signature */}
                <div style={{ textAlign: 'center', width: '130px' }}>
                  <div style={{ fontFamily: 'cursive', fontSize: '24px', color: '#1e293b', marginBottom: '4px', height: '36px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    Parth Sharma
                  </div>
                  <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '4px', fontSize: '10px', fontWeight: 'bold', color: '#1e293b', textTransform: 'uppercase' }}>
                    Parth Sharma
                  </div>
                  <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px' }}>Program Director</div>
                </div>
              </div>

              {/* QR Verification */}
              <div style={{ width: '220px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '10px', color: '#475569', textAlign: 'right', lineHeight: '1.4' }}>
                  <span style={{ fontWeight: 'bold', color: '#1e293b', display: 'block' }}>Verify Online</span>
                  nextern.ai/verify
                </div>
                <div style={{ width: '50px', height: '50px', backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '4px', display: 'flex', alignItems: 'center', justify: 'center' }}>
                  <QrCode style={{ width: '100%', height: '100%', color: '#0f172a' }} />
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
