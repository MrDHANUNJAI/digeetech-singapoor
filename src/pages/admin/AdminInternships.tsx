import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import {
  GraduationCap,
  Plus,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  FileText,
  Trash2,
  Edit2,
  X,
  ExternalLink,
  Award
} from "lucide-react";

export const AdminInternships: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"applicants" | "programs">("applicants");
  const [applicants, setApplicants] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [appData, progData] = await Promise.all([
        api.getApplicants(),
        api.getInternships(),
      ]);
      setApplicants(appData || []);
      setPrograms(progData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appId: string, newStatus: string) => {
    try {
      await api.updateApplicantStatus(appId, newStatus);
      loadData();
    } catch (err: any) {
      alert(err.message || "Failed to update applicant status.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-brand-navy">
            Engineering Fellowship & Internship Programs
          </h2>
          <p className="text-xs text-brand-gray mt-0.5">
            Review student applications, candidate portfolios, and manage status workflows.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("applicants")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === "applicants" ? "bg-brand-blue text-white" : "bg-white text-brand-navy border border-brand-navy/10"
            }`}
          >
            Applicants ({applicants.length})
          </button>
          <button
            onClick={() => setActiveTab("programs")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === "programs" ? "bg-brand-blue text-white" : "bg-white text-brand-navy border border-brand-navy/10"
            }`}
          >
            Programs ({programs.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-brand-gray">Loading fellowship records...</div>
      ) : activeTab === "applicants" ? (
        <div className="bg-white rounded-2xl border border-brand-navy/10 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-navy/5 text-brand-navy font-bold uppercase tracking-wider text-[10px] border-b border-brand-navy/10">
                <tr>
                  <th className="p-3.5">Candidate & University</th>
                  <th className="p-3.5">Program Track</th>
                  <th className="p-3.5">Portfolio / GitHub</th>
                  <th className="p-3.5">Applied Date</th>
                  <th className="p-3.5">Workflow Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/5 font-sans">
                {applicants.map((app) => (
                  <tr key={app.id} className="hover:bg-brand-navy/[0.02] transition-colors">
                    <td className="p-3.5">
                      <strong className="font-bold text-brand-navy block text-xs">{app.fullName}</strong>
                      <span className="text-[11px] text-brand-gray">{app.email}</span>
                      <span className="text-[10px] text-brand-gray block font-mono mt-0.5">{app.university}</span>
                    </td>
                    <td className="p-3.5 font-semibold text-brand-navy">
                      {app.programId}
                    </td>
                    <td className="p-3.5">
                      {app.portfolioUrl ? (
                        <a
                          href={app.portfolioUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-blue hover:underline flex items-center gap-1 font-semibold"
                        >
                          <ExternalLink className="w-3 h-3" /> View Portfolio
                        </a>
                      ) : (
                        <span className="text-brand-gray text-[11px]">None provided</span>
                      )}
                    </td>
                    <td className="p-3.5 text-brand-gray text-[11px]">
                      {app.appliedAt?.split("T")[0] || "Today"}
                    </td>
                    <td className="p-3.5">
                      <select
                        value={app.status || "Applied"}
                        onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg border border-brand-navy/15 text-xs font-bold text-brand-navy outline-none bg-white cursor-pointer"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Selected">Selected</option>
                        <option value="Active">Active Fellow</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      {app.status === "Completed" && (
                        <span className="text-emerald-600 font-bold text-[11px] flex items-center justify-end gap-1">
                          <Award className="w-3.5 h-3.5" /> Eligible for Cert
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {programs.map((prog) => (
            <div key={prog.id} className="bg-white rounded-3xl p-5 border border-brand-navy/10 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-brand-blue uppercase font-mono">{prog.duration}</span>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{prog.status}</span>
              </div>
              <h3 className="font-display text-base font-bold text-brand-navy mb-1">{prog.title}</h3>
              <p className="text-xs text-brand-gray mb-3">{prog.description}</p>
              <div className="flex items-center justify-between text-xs pt-3 border-t border-brand-navy/8">
                <span className="font-bold text-brand-navy">Stipend: {prog.stipendSGD}</span>
                <span className="text-brand-gray font-mono text-[10px]">Mentors: {prog.mentorship}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
