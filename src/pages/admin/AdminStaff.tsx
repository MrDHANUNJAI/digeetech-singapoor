import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Linkedin,
  CheckCircle2,
  XCircle,
  X,
  Sparkles,
  Building2,
  Shield
} from "lucide-react";

export const AdminStaff: React.FC = () => {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    department: "Executive & AI Architecture",
    bio: "",
    skills: "React, Node.js, AI Architecture",
    experienceYears: 5,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    linkedinUrl: "",
    featured: true,
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    try {
      setLoading(true);
      const data = await api.getStaff();
      setStaffList(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingStaff(null);
    setFormData({
      name: "",
      title: "",
      department: "Software Engineering",
      bio: "",
      skills: "TypeScript, React, Cloud Architecture",
      experienceYears: 4,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      linkedinUrl: "",
      featured: true,
      status: "active",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (staff: any) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name || "",
      title: staff.title || "",
      department: staff.department || "Software Engineering",
      bio: staff.bio || "",
      skills: Array.isArray(staff.skills) ? staff.skills.join(", ") : (staff.skills || ""),
      experienceYears: staff.experienceYears || 3,
      avatarUrl: staff.avatarUrl || "",
      linkedinUrl: staff.linkedinUrl || "",
      featured: !!staff.featured,
      status: staff.status || "active",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove staff member "${name}"?`)) return;
    try {
      await api.deleteStaff(id);
      loadStaff();
    } catch (err: any) {
      alert(err.message || "Failed to delete staff.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingStaff) {
        await api.updateStaff(editingStaff.id, payload);
      } else {
        await api.createStaff(payload);
      }
      setIsModalOpen(false);
      loadStaff();
    } catch (err: any) {
      alert(err.message || "Failed to save staff.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-brand-navy">
            Engineering Leads & Staff Management
          </h2>
          <p className="text-xs text-brand-gray mt-0.5">
            Manage Singapore tech leads, researchers, and developers displayed on the public About page.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-brand-blue hover:bg-brand-blue-dark text-white px-4 py-2.5 rounded-xl font-display text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Team Member
        </button>
      </div>

      {/* Staff Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs text-brand-gray">Loading team records...</div>
      ) : staffList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {staffList.map((staff) => (
            <div
              key={staff.id}
              className="bg-white rounded-3xl p-5 border border-brand-navy/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-3">
                  <img
                    src={staff.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                    alt={staff.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-brand-navy/10 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-display text-sm font-bold text-brand-navy truncate">
                        {staff.name}
                      </h3>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        staff.status === "active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700"
                      }`}>
                        {staff.status}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-brand-blue block truncate">
                      {staff.title}
                    </span>
                    <span className="text-[10px] text-brand-gray block mt-0.5">
                      {staff.department} • {staff.experienceYears}y exp
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-brand-gray line-clamp-3 mb-3 leading-relaxed">
                  {staff.bio}
                </p>

                {staff.skills && staff.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {staff.skills.slice(0, 3).map((sk: string, i: number) => (
                      <span
                        key={i}
                        className="text-[9px] font-mono bg-brand-navy/5 text-brand-navy px-2 py-0.5 rounded-md"
                      >
                        {sk}
                      </span>
                    ))}
                    {staff.skills.length > 3 && (
                      <span className="text-[9px] text-brand-gray font-mono">
                        +{staff.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-brand-navy/8 flex items-center justify-between text-xs">
                {staff.linkedinUrl ? (
                  <a
                    href={staff.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-blue hover:underline flex items-center gap-1 font-semibold text-[11px]"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> Profile
                  </a>
                ) : (
                  <span className="text-brand-gray text-[11px]">No LinkedIn</span>
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(staff)}
                    className="p-1.5 rounded-lg bg-brand-navy/5 hover:bg-brand-blue hover:text-white text-brand-navy transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(staff.id, staff.name)}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center bg-white rounded-2xl border border-brand-navy/10 text-brand-gray text-xs">
          No team members added yet. Click "Add Team Member" above.
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-brand-navy/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-navy/10">
              <h3 className="font-display text-base font-bold text-brand-navy">
                {editingStaff ? "Edit Team Member" : "Add New Team Member"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-brand-gray hover:text-brand-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rachel Lim"
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Principal AI Engineer"
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="AI & Cloud Solutions"
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Years Experience</label>
                  <input
                    type="number"
                    required
                    value={formData.experienceYears}
                    onChange={(e) =>
                      setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">Avatar / Photo URL</label>
                <input
                  type="url"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">Professional Bio</label>
                <textarea
                  required
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Summary of tech background, leadership, and Singapore projects."
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">
                  Skills Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="React 19, TypeScript, PyTorch, Cloud Run"
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 font-bold text-brand-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-brand-blue"
                  />
                  <span>Feature on public About page</span>
                </label>
              </div>

              <div className="pt-4 border-t border-brand-navy/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-brand-navy/5 font-bold text-brand-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold shadow-xs cursor-pointer"
                >
                  {editingStaff ? "Save Team Member" : "Add Team Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
