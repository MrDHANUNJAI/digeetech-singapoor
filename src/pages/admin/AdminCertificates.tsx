import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import {
  Award,
  Plus,
  Search,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Printer,
  Trash2,
  X,
  Sparkles,
  QrCode,
  Calendar
} from "lucide-react";

export const AdminCertificates: React.FC = () => {
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [revokingCert, setRevokingCert] = useState<any | null>(null);
  const [revokeReason, setRevokeReason] = useState("");

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    program: "Full-Stack AI & Cloud Engineering Fellowship",
    category: "Internship",
    gradeScore: "Distinction (Top 5%)",
    skillsAcquired: "React 19, TypeScript, Express, Cloud Run, Gemini 2.5 API",
    issuedBy: "Dhanush K (CEO & Technology Architect)",
  });

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const data = await api.getCertificates();
      setCerts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleIssueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      skillsAcquired: formData.skillsAcquired.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      await api.issueCertificate(payload);
      setIsIssueModalOpen(false);
      loadCertificates();
    } catch (err: any) {
      alert(err.message || "Failed to issue certificate.");
    }
  };

  const handleRevokeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revokingCert) return;

    try {
      await api.revokeCertificate(revokingCert.id, revokeReason || "Administrative Revocation");
      setRevokingCert(null);
      setRevokeReason("");
      loadCertificates();
    } catch (err: any) {
      alert(err.message || "Failed to revoke certificate.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this certificate record?")) return;
    try {
      await api.deleteCertificate(id);
      loadCertificates();
    } catch (err: any) {
      alert(err.message || "Failed to delete record.");
    }
  };

  const filteredCerts = certs.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.id?.toLowerCase().includes(q) ||
      c.recipientName?.toLowerCase().includes(q) ||
      c.program?.toLowerCase().includes(q) ||
      c.recipientEmail?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-brand-navy">
            Official Credential & Certificate Registry
          </h2>
          <p className="text-xs text-brand-gray mt-0.5">
            Issue cryptographically verifiable certificates, monitor validity, and manage public verification links.
          </p>
        </div>
        <button
          onClick={() => setIsIssueModalOpen(true)}
          className="bg-brand-blue hover:bg-brand-blue-dark text-white px-4 py-2.5 rounded-xl font-display text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Issue New Certificate
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-brand-navy/10 flex items-center gap-3 shadow-xs">
        <Search className="w-4 h-4 text-brand-gray" />
        <input
          type="text"
          placeholder="Search by Certificate ID, Recipient Name, Program or Email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs outline-none bg-transparent"
        />
      </div>

      {/* Certificate Table */}
      {loading ? (
        <div className="py-12 text-center text-xs text-brand-gray">Loading certificate registry...</div>
      ) : filteredCerts.length > 0 ? (
        <div className="bg-white rounded-2xl border border-brand-navy/10 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-navy/5 text-brand-navy font-bold uppercase tracking-wider text-[10px] border-b border-brand-navy/10">
                <tr>
                  <th className="p-3.5">Certificate ID</th>
                  <th className="p-3.5">Recipient & Email</th>
                  <th className="p-3.5">Program / Course</th>
                  <th className="p-3.5">Issue Date & Grade</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/5 font-sans">
                {filteredCerts.map((cert) => (
                  <tr key={cert.id} className="hover:bg-brand-navy/[0.02] transition-colors">
                    <td className="p-3.5">
                      <strong className="font-mono font-bold text-brand-blue text-xs block">
                        {cert.id}
                      </strong>
                      <span className="text-[10px] text-brand-gray font-mono">
                        Hash: {cert.verificationId?.substring(0, 8)}...
                      </span>
                    </td>
                    <td className="p-3.5">
                      <strong className="text-brand-navy block font-bold">{cert.recipientName}</strong>
                      <span className="text-[11px] text-brand-gray">{cert.recipientEmail || "N/A"}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-brand-navy block">{cert.program}</span>
                      <span className="text-[10px] text-brand-gray bg-brand-navy/5 px-2 py-0.5 rounded">
                        {cert.category}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="text-brand-navy block">{cert.issueDate}</span>
                      <span className="text-[10px] text-amber-700 font-bold">{cert.gradeScore}</span>
                    </td>
                    <td className="p-3.5">
                      {cert.status === "Active" ? (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                        </span>
                      ) : (
                        <span className="bg-rose-50 text-rose-700 border border-rose-200 font-bold px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1 w-fit">
                          <XCircle className="w-3 h-3 text-rose-600" /> Revoked
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/verify-certificate/${cert.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-brand-navy/5 hover:bg-brand-blue hover:text-white text-brand-navy transition-colors"
                          title="View Public Verification Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        {cert.status === "Active" && (
                          <button
                            onClick={() => setRevokingCert(cert)}
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-700 transition-colors cursor-pointer"
                            title="Revoke Certificate"
                          >
                            <ShieldAlert className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(cert.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center bg-white rounded-2xl border border-brand-navy/10 text-brand-gray text-xs">
          No certificate records match your search.
        </div>
      )}

      {/* Issue Certificate Modal */}
      {isIssueModalOpen && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-brand-navy/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-navy/10">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-blue" />
                <h3 className="font-display text-base font-bold text-brand-navy">
                  Issue Official Singapore Certificate
                </h3>
              </div>
              <button
                onClick={() => setIsIssueModalOpen(false)}
                className="text-brand-gray hover:text-brand-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIssueSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Recipient Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.recipientName}
                    onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    placeholder="e.g. Jason Chen"
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Recipient Email</label>
                  <input
                    type="email"
                    required
                    value={formData.recipientEmail}
                    onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                    placeholder="jason.chen@u.nus.edu"
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Program / Credential</label>
                  <input
                    type="text"
                    required
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    placeholder="Full-Stack AI & Cloud Fellowship"
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Program Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue bg-white"
                  >
                    <option value="Internship">Engineering Internship</option>
                    <option value="Workshop">Technical Masterclass</option>
                    <option value="Research">Research & Documentation</option>
                    <option value="Consultancy">Corporate Client Delivery</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Grade / Distinction</label>
                  <input
                    type="text"
                    required
                    value={formData.gradeScore}
                    onChange={(e) => setFormData({ ...formData, gradeScore: e.target.value })}
                    placeholder="Distinction (Top 5%)"
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Signatory & Authority</label>
                  <input
                    type="text"
                    required
                    value={formData.issuedBy}
                    onChange={(e) => setFormData({ ...formData, issuedBy: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">
                  Skills Demonstrated (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.skillsAcquired}
                  onChange={(e) => setFormData({ ...formData, skillsAcquired: e.target.value })}
                  placeholder="React 19, TypeScript, Vector Search, Cloud Security"
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div className="p-3 bg-brand-navy/[0.02] border border-brand-navy/8 rounded-xl text-[11px] text-brand-gray">
                * An immutable Certificate ID (e.g. DT-2025-ENG-XXXX) and cryptographic verification hash will automatically be generated.
              </div>

              <div className="pt-4 border-t border-brand-navy/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsIssueModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-brand-navy/5 font-bold text-brand-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold shadow-xs cursor-pointer"
                >
                  Generate & Issue Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Revoke Certificate Modal */}
      {revokingCert && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-brand-navy/10">
            <h3 className="font-display text-base font-bold text-rose-800 mb-1">
              Revoke Certificate {revokingCert.id}
            </h3>
            <p className="text-xs text-brand-gray mb-4">
              Recipient: <strong className="text-brand-navy">{revokingCert.recipientName}</strong>
            </p>

            <form onSubmit={handleRevokeSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-brand-navy mb-1">Reason for Revocation</label>
                <textarea
                  required
                  rows={2}
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  placeholder="e.g. Program incomplete / Reissued under updated credential"
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRevokingCert(null)}
                  className="px-4 py-2 rounded-xl bg-brand-navy/5 font-bold text-brand-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer"
                >
                  Confirm Revocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
