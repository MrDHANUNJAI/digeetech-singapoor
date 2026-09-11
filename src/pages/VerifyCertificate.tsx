import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../lib/api";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Search,
  Calendar,
  Building2,
  User,
  Printer,
  Download,
  Share2,
  ArrowRight,
  Sparkles,
  QrCode
} from "lucide-react";

export const VerifyCertificate: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [searchQuery, setSearchQuery] = useState<string>(id || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [certData, setCertData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setSearchQuery(id);
      handleVerify(id);
    }
  }, [id]);

  const handleVerify = async (certIdToSearch: string) => {
    const trimmed = certIdToSearch.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const res = await api.verifyCertificate(trimmed);
      if (res && res.certificate) {
        setCertData(res.certificate);
      } else {
        setCertData(null);
        setError("Certificate not found. Please double-check the Certificate ID or Verification Code.");
      }
    } catch (err: any) {
      setCertData(null);
      setError(err.message || "Certificate record could not be verified in the Digee Tech official registry.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      handleVerify(searchQuery);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="verify-certificate-page" className="py-12 bg-brand-navy/[0.02] min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4 text-brand-blue" /> Official Credential Registry
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Certificate Verification Portal
          </h1>
          <p className="font-sans text-sm sm:text-base text-brand-gray mt-2 max-w-xl mx-auto">
            Verify the authenticity of professional certifications, masterclasses, and engineering fellowship credentials issued by DIGEE TECH (Singapore).
          </p>
        </div>

        {/* Verification Search Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-navy/10 mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-brand-gray absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Certificate ID (e.g. DT-2025-ENG-0891)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-brand-navy/15 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-sm font-mono tracking-wide text-brand-navy outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !searchQuery.trim()}
              className="bg-brand-blue hover:bg-brand-blue-dark disabled:opacity-50 text-white px-8 py-3.5 rounded-2xl font-display text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Credential</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Examples */}
          <div className="mt-4 pt-3 border-t border-brand-navy/8 flex flex-wrap items-center gap-2 text-xs text-brand-gray">
            <span>Try sample credentials:</span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("DT-2025-ENG-0891");
                handleVerify("DT-2025-ENG-0891");
              }}
              className="text-brand-blue hover:underline font-mono bg-brand-blue/5 px-2 py-0.5 rounded cursor-pointer"
            >
              DT-2025-ENG-0891
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("DT-2025-AI-0412");
                handleVerify("DT-2025-AI-0412");
              }}
              className="text-brand-blue hover:underline font-mono bg-brand-blue/5 px-2 py-0.5 rounded cursor-pointer"
            >
              DT-2025-AI-0412
            </button>
          </div>
        </div>

        {/* Certificate Display Result */}
        {certData && (
          <div className="bg-white rounded-3xl shadow-2xl border border-brand-navy/15 overflow-hidden transition-all print:shadow-none print:border-0 mb-8">
            
            {/* Status Banner */}
            <div className={`py-3 px-6 text-xs sm:text-sm font-bold flex items-center justify-between text-white ${
              certData.status === "Active" ? "bg-emerald-600" : "bg-rose-600"
            }`}>
              <div className="flex items-center gap-2">
                {certData.status === "Active" ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <span>AUTHENTIC & VERIFIED CREDENTIAL — ACTIVE REGISTRY</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-white" />
                    <span>REVOKED CREDENTIAL — {certData.revokedReason || "Revoked by Institution"}</span>
                  </>
                )}
              </div>
              <span className="font-mono text-xs opacity-90 hidden sm:inline">
                Verified on {new Date().toLocaleDateString("en-SG")}
              </span>
            </div>

            {/* Certificate Body (Formal Corporate Design) */}
            <div className="p-8 sm:p-12 relative bg-linear-to-b from-amber-500/[0.03] to-white border-8 border-double border-amber-900/10 m-3 sm:m-4 rounded-2xl">
              
              {/* Watermark Logo */}
              <div className="absolute right-8 top-8 opacity-10 pointer-events-none">
                <Award className="w-48 h-48 text-brand-navy" />
              </div>

              {/* Organization Top Seal */}
              <div className="text-center mb-8 relative z-10">
                <div className="inline-flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue text-white flex items-center justify-center font-display font-extrabold text-sm">
                    D
                  </div>
                  <span className="font-display text-xl font-extrabold text-brand-navy tracking-tight">
                    DIGEE TECH
                  </span>
                </div>
                <p className="text-xs font-mono tracking-widest text-brand-gray uppercase">
                  Singapore Corporate & Digital Solutions Institute
                </p>
                <div className="w-24 h-0.5 bg-amber-500 mx-auto mt-3" />
              </div>

              {/* Certificate Title */}
              <div className="text-center my-6 relative z-10">
                <span className="text-xs font-mono text-amber-800 uppercase tracking-widest block font-bold">
                  Official Certificate of Achievement
                </span>
                <p className="text-xs text-brand-gray italic mt-1">This is to certify that</p>
                
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-brand-navy my-3 tracking-tight">
                  {certData.recipientName}
                </h2>

                <p className="text-xs sm:text-sm text-brand-gray max-w-lg mx-auto leading-relaxed">
                  has successfully completed the intensive curriculum in
                </p>

                <h3 className="font-display text-lg sm:text-xl font-bold text-brand-blue my-2">
                  {certData.program}
                </h3>

                <p className="text-xs text-brand-gray max-w-md mx-auto">
                  awarded with <strong className="text-brand-navy">{certData.gradeScore || "Distinction"}</strong> under the mentorship of Digee Tech Singapore engineering leads.
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 p-4 bg-brand-navy/[0.02] border border-brand-navy/8 rounded-2xl text-xs relative z-10">
                <div>
                  <span className="text-brand-gray block text-[10px] uppercase font-mono">Certificate ID</span>
                  <strong className="font-mono text-brand-navy text-xs sm:text-sm">{certData.id}</strong>
                </div>
                <div>
                  <span className="text-brand-gray block text-[10px] uppercase font-mono">Issue Date</span>
                  <strong className="text-brand-navy">{certData.issueDate}</strong>
                </div>
                <div>
                  <span className="text-brand-gray block text-[10px] uppercase font-mono">Category</span>
                  <strong className="text-brand-navy">{certData.category}</strong>
                </div>
                <div>
                  <span className="text-brand-gray block text-[10px] uppercase font-mono">Organization</span>
                  <strong className="text-brand-navy">Digee Tech (SG)</strong>
                </div>
              </div>

              {/* Skills Acquired */}
              {certData.skillsAcquired && certData.skillsAcquired.length > 0 && (
                <div className="mb-8 relative z-10">
                  <span className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block mb-2 text-center sm:text-left">
                    Demonstrated Competencies & Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    {certData.skillsAcquired.map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-brand-blue/10 text-brand-blue border border-brand-blue/20 text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Signatures & QR Section */}
              <div className="pt-6 border-t border-brand-navy/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div className="text-center sm:text-left">
                  <span className="font-mono text-[10px] text-brand-gray block">ISSUED & SIGNED BY</span>
                  <strong className="font-display text-xs sm:text-sm text-brand-navy block mt-0.5">
                    {certData.issuedBy}
                  </strong>
                  <span className="text-[10px] text-brand-gray">Chief Executive & Technology Architect</span>
                </div>

                <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-brand-navy/10 shadow-xs">
                  <div className="p-1 bg-brand-navy/5 rounded">
                    <QrCode className="w-10 h-10 text-brand-navy" />
                  </div>
                  <div className="text-[10px] text-brand-gray leading-tight">
                    <span className="font-mono font-bold text-brand-navy block uppercase">DIGITAL VERIFIED</span>
                    <span>Hash: {certData.verificationId?.substring(0, 16)}...</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Print & Share Actions Bar */}
            <div className="bg-brand-navy/5 p-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
              <span className="text-xs text-brand-gray">
                Official Digital Credential • Verified through Digee Tech Singapore Registry
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="bg-brand-navy text-white hover:bg-brand-navy/90 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Error Notice */}
        {searched && error && (
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-center text-rose-800 shadow-sm">
            <XCircle className="w-8 h-8 text-rose-600 mx-auto mb-2" />
            <h3 className="font-display text-base font-bold">Verification Failed</h3>
            <p className="text-xs sm:text-sm text-rose-700 mt-1 max-w-md mx-auto">{error}</p>
            <p className="text-[11px] text-rose-600/80 mt-3">
              If you believe this is an administrative mistake, please email{" "}
              <a href="mailto:contact@digeetech.com" className="underline font-bold">contact@digeetech.com</a> with your certificate details.
            </p>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-white rounded-2xl p-6 border border-brand-navy/8 mt-8">
          <h3 className="font-display text-sm font-bold text-brand-navy flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> About Digee Tech Credential Verification
          </h3>
          <p className="text-xs text-brand-gray leading-relaxed">
            Every technical fellowship, enterprise masterclass, and advisory certification issued by Digee Tech Singapore is assigned a cryptographically generated identification number and indexed in our immutable database. Employers and academic institutions may verify credential validity 24/7.
          </p>
        </div>

      </div>
    </div>
  );
};
