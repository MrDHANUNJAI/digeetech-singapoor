import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import {
  Inbox,
  Search,
  Filter,
  Download,
  Trash2,
  Phone,
  Mail,
  Building2,
  Calendar,
  MessageSquare,
  DollarSign,
  Edit2,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  X
} from "lucide-react";

export const AdminLeads: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [statusInput, setStatusInput] = useState("New");
  const [notesInput, setNotesInput] = useState("");

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const data = await api.getLeads();
      setLeads(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenLead = (lead: any) => {
    setSelectedLead(lead);
    setStatusInput(lead.status || "New");
    setNotesInput(lead.notes || "");
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    try {
      await api.updateLeadStatus(selectedLead.id, statusInput, notesInput);
      setSelectedLead(null);
      loadLeads();
    } catch (err: any) {
      alert(err.message || "Failed to update lead status.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete lead submission from "${name}"?`)) return;
    try {
      await api.deleteLead(id);
      loadLeads();
    } catch (err: any) {
      alert(err.message || "Failed to delete lead.");
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ["ID", "Name", "Email", "Phone", "Company", "Service", "Budget", "Status", "Date", "Notes"];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.name || ""}"`,
      `"${l.email || ""}"`,
      `"${l.phone || ""}"`,
      `"${l.company || ""}"`,
      `"${l.serviceRequested || l.projectScope || ""}"`,
      `"${l.budgetSGD || ""}"`,
      `"${l.status || "New"}"`,
      `"${l.submittedAt || ""}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `digee-tech-leads-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((l) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      l.name?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.company?.toLowerCase().includes(q) ||
      l.serviceRequested?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (st: string) => {
    switch (st) {
      case "New":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Contacted":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Qualified":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Proposal Sent":
        return "bg-cyan-100 text-cyan-800 border-cyan-300";
      case "Won":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Lost":
        return "bg-rose-100 text-rose-800 border-rose-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-brand-navy">
            Leads & Client Inquiries Pipeline
          </h2>
          <p className="text-xs text-brand-gray mt-0.5">
            Track inquiries from contact forms, service consultation requests, and calculate conversion ROI.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-navy px-4 py-2.5 rounded-xl font-display text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export CSV ({filteredLeads.length})
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-brand-navy/10 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-brand-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by client name, email, company or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-brand-navy/15 text-xs outline-none focus:border-brand-blue"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-brand-gray" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-brand-navy/15 text-xs text-brand-navy font-semibold outline-none bg-white"
          >
            <option value="all">All Statuses ({leads.length})</option>
            <option value="New">New ({leads.filter((l) => l.status === "New").length})</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won Deals</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-12 text-center text-xs text-brand-gray">Loading leads pipeline...</div>
      ) : filteredLeads.length > 0 ? (
        <div className="bg-white rounded-2xl border border-brand-navy/10 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-navy/5 text-brand-navy font-bold uppercase tracking-wider text-[10px] border-b border-brand-navy/10">
                <tr>
                  <th className="p-3.5">Contact & Company</th>
                  <th className="p-3.5">Service & Scope</th>
                  <th className="p-3.5">Budget (SGD)</th>
                  <th className="p-3.5">Submitted</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/5 font-sans">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-brand-navy/[0.02] transition-colors">
                    <td className="p-3.5">
                      <strong className="font-bold text-brand-navy block text-xs">{lead.name}</strong>
                      <div className="flex items-center gap-2 text-[11px] text-brand-gray mt-0.5">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-brand-blue" /> {lead.email}</span>
                        {lead.phone && <span>• {lead.phone}</span>}
                      </div>
                      {lead.company && (
                        <span className="text-[10px] text-brand-navy/70 font-mono block mt-0.5">
                          {lead.company}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-brand-navy block">
                        {lead.serviceRequested || lead.projectScope || "General Enquiry"}
                      </span>
                      {lead.message && (
                        <p className="text-[11px] text-brand-gray line-clamp-1 mt-0.5 max-w-xs italic">
                          "{lead.message}"
                        </p>
                      )}
                    </td>
                    <td className="p-3.5 font-bold text-brand-navy">
                      {lead.budgetSGD || "Custom"}
                    </td>
                    <td className="p-3.5 text-brand-gray text-[11px]">
                      {lead.submittedAt?.split("T")[0] || "Today"}
                    </td>
                    <td className="p-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(lead.status || "New")}`}>
                        {lead.status || "New"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenLead(lead)}
                          className="p-1.5 rounded-lg bg-brand-navy/5 hover:bg-brand-blue hover:text-white text-brand-navy transition-colors cursor-pointer"
                          title="Manage Lead"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id, lead.name)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                          title="Delete Lead"
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
          No lead submissions found matching the criteria.
        </div>
      )}

      {/* Lead Details & Status Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-brand-navy/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-navy/10">
              <h3 className="font-display text-base font-bold text-brand-navy">
                Lead Review: {selectedLead.name}
              </h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-brand-gray hover:text-brand-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-brand-navy/[0.02] border border-brand-navy/8 rounded-xl">
                <div>
                  <span className="text-brand-gray text-[10px] uppercase font-mono block">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-brand-blue font-semibold hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-brand-gray text-[10px] uppercase font-mono block">Phone</span>
                  <span className="font-semibold text-brand-navy">{selectedLead.phone || "Not specified"}</span>
                </div>
                <div>
                  <span className="text-brand-gray text-[10px] uppercase font-mono block">Company</span>
                  <span className="font-semibold text-brand-navy">{selectedLead.company || "Not specified"}</span>
                </div>
                <div>
                  <span className="text-brand-gray text-[10px] uppercase font-mono block">Budget Range</span>
                  <span className="font-semibold text-brand-navy">{selectedLead.budgetSGD || "Custom SGD"}</span>
                </div>
              </div>

              <div>
                <span className="text-brand-gray text-[10px] uppercase font-mono block mb-1">Service Requested</span>
                <span className="font-bold text-brand-navy block text-sm">
                  {selectedLead.serviceRequested || selectedLead.projectScope || "General Consulting"}
                </span>
              </div>

              {selectedLead.message && (
                <div>
                  <span className="text-brand-gray text-[10px] uppercase font-mono block mb-1">Client Message / Requirement</span>
                  <div className="p-3 bg-brand-navy/5 rounded-xl text-brand-navy whitespace-pre-wrap leading-relaxed">
                    {selectedLead.message}
                  </div>
                </div>
              )}

              <form onSubmit={handleUpdateStatus} className="space-y-3 pt-3 border-t border-brand-navy/10">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Update Status</label>
                  <select
                    value={statusInput}
                    onChange={(e) => setStatusInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue bg-white"
                  >
                    <option value="New">New Lead</option>
                    <option value="Contacted">Contacted via Email/WhatsApp</option>
                    <option value="Qualified">Qualified Opportunity</option>
                    <option value="Proposal Sent">Proposal / SGD Quote Sent</option>
                    <option value="Won">Won / Project Closed</option>
                    <option value="Lost">Lost Opportunity</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-brand-navy mb-1">Internal Notes & Action Items</label>
                  <textarea
                    rows={3}
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    placeholder="e.g. Sent formal quote of S$2,800. Meeting scheduled for Friday."
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedLead(null)}
                    className="px-4 py-2 rounded-xl bg-brand-navy/5 font-bold text-brand-navy"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold shadow-xs cursor-pointer"
                  >
                    Save Status & Notes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
