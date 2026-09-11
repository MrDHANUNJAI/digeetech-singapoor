import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { Briefcase, Plus, Edit2, Trash2, X, ExternalLink, Sparkles } from "lucide-react";

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    clientName: "",
    industry: "Logistics & Supply Chain",
    category: "Full-Stack Web App",
    summary: "",
    impactMetrics: "+140% Efficiency, -35h manual entry/wk",
    techStack: "React 19, Node.js, Cloud Run, Tailwind CSS",
    featured: true,
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await api.getProjects();
      setProjects(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      clientName: "Singapore Client Pte Ltd",
      industry: "Fintech & Payments",
      category: "Custom Web Application",
      summary: "",
      impactMetrics: "Saved 20 hours/week, 99.99% uptime",
      techStack: "React 19, TypeScript, Express, GCP",
      featured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: any) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title || "",
      slug: proj.slug || "",
      clientName: proj.clientName || "",
      industry: proj.industry || "Fintech",
      category: proj.category || "Web App",
      summary: proj.summary || "",
      impactMetrics: proj.impactMetrics || "",
      techStack: Array.isArray(proj.techStack) ? proj.techStack.join(", ") : (proj.techStack || ""),
      featured: !!proj.featured,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete project "${name}"?`)) return;
    try {
      await api.deleteProject(id);
      loadProjects();
    } catch (err: any) {
      alert(err.message || "Failed to delete project.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      techStack: formData.techStack.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingProject) {
        await api.updateProject(editingProject.id, payload);
      } else {
        await api.createProject(payload);
      }
      setIsModalOpen(false);
      loadProjects();
    } catch (err: any) {
      alert(err.message || "Failed to save project.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-brand-navy">
            Client Projects & Case Studies
          </h2>
          <p className="text-xs text-brand-gray mt-0.5">
            Manage showcase deliverables, client impact metrics, and technology stacks.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-brand-blue hover:bg-brand-blue-dark text-white px-4 py-2.5 rounded-xl font-display text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Case Study
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-brand-gray">Loading projects...</div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl p-5 border border-brand-navy/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider font-mono">
                    {proj.industry}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(proj)}
                      className="p-1 rounded-lg hover:bg-brand-navy/5 text-brand-navy transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id, proj.title)}
                      className="p-1 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-display text-base font-bold text-brand-navy mb-1">{proj.title}</h3>
                <span className="text-[10px] text-brand-gray block mb-2">Client: {proj.clientName}</span>
                <p className="text-[11px] text-brand-gray line-clamp-3 mb-3 leading-relaxed">
                  {proj.summary}
                </p>

                {proj.impactMetrics && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[10px] font-bold mb-3">
                    Impact: {proj.impactMetrics}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-brand-navy/8 flex flex-wrap gap-1">
                {proj.techStack &&
                  proj.techStack.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="text-[9px] font-mono bg-brand-navy/5 text-brand-navy px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center bg-white rounded-2xl border border-brand-navy/10 text-brand-gray text-xs">
          No projects recorded yet.
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-brand-navy/10">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-brand-navy/10">
              <h3 className="font-display text-base font-bold text-brand-navy">
                {editingProject ? "Edit Case Study" : "Add New Case Study"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-gray hover:text-brand-navy">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-brand-navy mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Automated Container Logistics Portal"
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Industry</label>
                  <input
                    type="text"
                    required
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">Summary of Solution</label>
                <textarea
                  required
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Problem, custom engineering solution, and ROI delivered."
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">Measurable Impact Metric</label>
                <input
                  type="text"
                  value={formData.impactMetrics}
                  onChange={(e) => setFormData({ ...formData, impactMetrics: e.target.value })}
                  placeholder="+140% Order Velocity, -35h manual entry/wk"
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">Tech Stack (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="React 19, TypeScript, PostgreSQL, Cloud Run"
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
