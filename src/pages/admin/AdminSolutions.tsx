import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { Sparkles, Plus, Edit2, Trash2, X, ArrowRight, ShieldCheck, Check } from "lucide-react";

export const AdminSolutions: React.FC = () => {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSolution, setEditingSolution] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    targetAudience: "Singapore SMEs & Scaleups",
    summary: "",
    keyBenefits: "Eliminates manual entry, Integrates with Xero/Stripe, Zero license bloat",
    startingPriceSGD: 3500,
  });

  useEffect(() => {
    loadSolutions();
  }, []);

  const loadSolutions = async () => {
    try {
      setLoading(true);
      const data = await api.getSolutions();
      setSolutions(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingSolution(null);
    setFormData({
      title: "",
      slug: "",
      targetAudience: "Singapore Enterprises & SMEs",
      summary: "",
      keyBenefits: "Automates daily workflows, 100% IP ownership, Scalable cloud backend",
      startingPriceSGD: 3500,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sol: any) => {
    setEditingSolution(sol);
    setFormData({
      title: sol.title || "",
      slug: sol.slug || "",
      targetAudience: sol.targetAudience || "",
      summary: sol.summary || "",
      keyBenefits: Array.isArray(sol.keyBenefits) ? sol.keyBenefits.join(", ") : (sol.keyBenefits || ""),
      startingPriceSGD: sol.startingPriceSGD || 3500,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete solution "${name}"?`)) return;
    try {
      await api.deleteSolution(id);
      loadSolutions();
    } catch (err: any) {
      alert(err.message || "Failed to delete solution.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      keyBenefits: formData.keyBenefits.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingSolution) {
        await api.updateSolution(editingSolution.id, payload);
      } else {
        await api.createSolution(payload);
      }
      setIsModalOpen(false);
      loadSolutions();
    } catch (err: any) {
      alert(err.message || "Failed to save solution.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-brand-navy">
            Enterprise Solutions & Industry Suites
          </h2>
          <p className="text-xs text-brand-gray mt-0.5">
            Manage bespoke software solutions, CRM/ERP templates, and industry-specific automation platforms.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-brand-blue hover:bg-brand-blue-dark text-white px-4 py-2.5 rounded-xl font-display text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Solution
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-brand-gray">Loading enterprise solutions...</div>
      ) : solutions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((sol) => (
            <div
              key={sol.id}
              className="bg-white rounded-3xl p-5 border border-brand-navy/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider font-mono">
                    Starting S${sol.startingPriceSGD?.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(sol)}
                      className="p-1 rounded-lg hover:bg-brand-navy/5 text-brand-navy transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(sol.id, sol.title)}
                      className="p-1 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-display text-base font-bold text-brand-navy mb-1">{sol.title}</h3>
                <span className="text-[10px] text-brand-gray block mb-2 font-mono">Target: {sol.targetAudience}</span>
                <p className="text-[11px] text-brand-gray line-clamp-3 mb-3 leading-relaxed">
                  {sol.summary}
                </p>

                {sol.keyBenefits && sol.keyBenefits.length > 0 && (
                  <div className="space-y-1 mb-2">
                    {sol.keyBenefits.slice(0, 3).map((b: string, i: number) => (
                      <div key={i} className="text-[10px] text-brand-navy/80 flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center bg-white rounded-2xl border border-brand-navy/10 text-brand-gray text-xs">
          No solutions configured yet.
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-brand-navy/10">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-brand-navy/10">
              <h3 className="font-display text-base font-bold text-brand-navy">
                {editingSolution ? "Edit Solution" : "Add New Solution"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-gray hover:text-brand-navy">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-brand-navy mb-1">Solution Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Real Estate CRM & Property Portal"
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Target Audience</label>
                  <input
                    type="text"
                    required
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Starting Price (SGD S$)</label>
                  <input
                    type="number"
                    required
                    value={formData.startingPriceSGD}
                    onChange={(e) =>
                      setFormData({ ...formData, startingPriceSGD: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">Summary</label>
                <textarea
                  required
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Overview of business problems solved and core workflows."
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">Key Benefits (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.keyBenefits}
                  onChange={(e) => setFormData({ ...formData, keyBenefits: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-brand-navy/5 font-bold text-brand-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold cursor-pointer"
                >
                  Save Solution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
