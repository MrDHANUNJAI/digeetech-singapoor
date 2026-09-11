import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import {
  Calculator,
  Search,
  Download,
  Trash2,
  DollarSign,
  Edit2,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  X
} from "lucide-react";

export const AdminQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);
  const [quoteAmountSGD, setQuoteAmountSGD] = useState<number>(0);
  const [quoteStatus, setQuoteStatus] = useState("Under Review");

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      setLoading(true);
      const data = await api.getQuotes();
      setQuotes(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenQuote = (q: any) => {
    setSelectedQuote(q);
    setQuoteAmountSGD(q.quoteAmountSGD || q.estimatedBudgetSGD || 0);
    setQuoteStatus(q.status || "Under Review");
  };

  const handleUpdateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuote) return;

    try {
      await api.updateQuote(selectedQuote.id, {
        status: quoteStatus,
        quoteAmountSGD: Number(quoteAmountSGD),
      });
      setSelectedQuote(null);
      loadQuotes();
    } catch (err: any) {
      alert(err.message || "Failed to update quote.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete quote request from "${name}"?`)) return;
    try {
      await api.deleteQuote(id);
      loadQuotes();
    } catch (err: any) {
      alert(err.message || "Failed to delete quote.");
    }
  };

  const filteredQuotes = quotes.filter((q) => {
    const term = searchQuery.toLowerCase();
    return (
      q.clientName?.toLowerCase().includes(term) ||
      q.email?.toLowerCase().includes(term) ||
      q.company?.toLowerCase().includes(term) ||
      q.serviceCategory?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-brand-navy">
            Project Scope Estimator & Quote Requests
          </h2>
          <p className="text-xs text-brand-gray mt-0.5">
            Review itemized technical scopes calculated by Singapore prospects and set approved SGD quotations.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-brand-navy/10 flex items-center gap-3 shadow-xs">
        <Search className="w-4 h-4 text-brand-gray" />
        <input
          type="text"
          placeholder="Search quote requests by client, company or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs outline-none bg-transparent"
        />
      </div>

      {/* Quotes Table */}
      {loading ? (
        <div className="py-12 text-center text-xs text-brand-gray">Loading quote requests...</div>
      ) : filteredQuotes.length > 0 ? (
        <div className="bg-white rounded-2xl border border-brand-navy/10 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-navy/5 text-brand-navy font-bold uppercase tracking-wider text-[10px] border-b border-brand-navy/10">
                <tr>
                  <th className="p-3.5">Client & Company</th>
                  <th className="p-3.5">Category & Modules</th>
                  <th className="p-3.5">Requested SGD</th>
                  <th className="p-3.5">Approved SGD</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/5 font-sans">
                {filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-brand-navy/[0.02] transition-colors">
                    <td className="p-3.5">
                      <strong className="font-bold text-brand-navy block text-xs">{q.clientName}</strong>
                      <span className="text-[11px] text-brand-gray">{q.email}</span>
                      {q.company && <span className="text-[10px] text-brand-gray block font-mono">({q.company})</span>}
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-brand-navy block">{q.serviceCategory}</span>
                      {q.deliverables && (
                        <span className="text-[10px] text-brand-gray line-clamp-1 max-w-xs">
                          {Array.isArray(q.deliverables) ? q.deliverables.join(", ") : q.deliverables}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 font-bold text-brand-navy">
                      S${q.estimatedBudgetSGD?.toLocaleString() || "Custom"}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-700">
                      {q.quoteAmountSGD ? `S$${q.quoteAmountSGD.toLocaleString()}` : "Pending Review"}
                    </td>
                    <td className="p-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        q.status === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}>
                        {q.status || "Under Review"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenQuote(q)}
                          className="p-1.5 rounded-lg bg-brand-navy/5 hover:bg-brand-blue hover:text-white text-brand-navy transition-colors cursor-pointer"
                          title="Review & Set Quote"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(q.id, q.clientName)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                          title="Delete Request"
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
          No project estimator requests recorded yet.
        </div>
      )}

      {/* Review Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-brand-navy/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-navy/10">
              <h3 className="font-display text-base font-bold text-brand-navy">
                Scope & Quote Review: {selectedQuote.clientName}
              </h3>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-brand-gray hover:text-brand-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-brand-navy/[0.02] border border-brand-navy/8 rounded-xl">
                <div>
                  <span className="text-brand-gray text-[10px] uppercase font-mono block">Email</span>
                  <span className="font-semibold text-brand-navy">{selectedQuote.email}</span>
                </div>
                <div>
                  <span className="text-brand-gray text-[10px] uppercase font-mono block">Phone</span>
                  <span className="font-semibold text-brand-navy">{selectedQuote.phone || "N/A"}</span>
                </div>
                <div>
                  <span className="text-brand-gray text-[10px] uppercase font-mono block">Timeline</span>
                  <span className="font-semibold text-brand-navy">{selectedQuote.estimatedTimeline || "Standard"}</span>
                </div>
                <div>
                  <span className="text-brand-gray text-[10px] uppercase font-mono block">Calculated Initial Estimate</span>
                  <span className="font-bold text-brand-blue">S${selectedQuote.estimatedBudgetSGD?.toLocaleString()}</span>
                </div>
              </div>

              {selectedQuote.deliverables && (
                <div>
                  <span className="text-brand-gray text-[10px] uppercase font-mono block mb-1">Selected Deliverables & Modules</span>
                  <div className="p-3 bg-brand-navy/5 rounded-xl text-brand-navy">
                    {Array.isArray(selectedQuote.deliverables) ? (
                      <ul className="list-disc list-inside space-y-1">
                        {selectedQuote.deliverables.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      selectedQuote.deliverables
                    )}
                  </div>
                </div>
              )}

              {selectedQuote.additionalNotes && (
                <div>
                  <span className="text-brand-gray text-[10px] uppercase font-mono block mb-1">Client Notes</span>
                  <p className="p-3 bg-brand-navy/5 rounded-xl text-brand-navy italic">
                    "{selectedQuote.additionalNotes}"
                  </p>
                </div>
              )}

              <form onSubmit={handleUpdateQuote} className="space-y-3 pt-3 border-t border-brand-navy/10">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-brand-navy mb-1">Approved Quote (SGD S$)</label>
                    <input
                      type="number"
                      required
                      value={quoteAmountSGD}
                      onChange={(e) => setQuoteAmountSGD(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-brand-navy mb-1">Status</label>
                    <select
                      value={quoteStatus}
                      onChange={(e) => setQuoteStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue bg-white"
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Approved">Approved / Quote Sent</option>
                      <option value="Negotiating">Negotiating Scope</option>
                      <option value="Accepted">Accepted & Kickoff</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedQuote(null)}
                    className="px-4 py-2 rounded-xl bg-brand-navy/5 font-bold text-brand-navy"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold shadow-xs cursor-pointer"
                  >
                    Save Quotation
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
