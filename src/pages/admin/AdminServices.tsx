import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import {
  Layers,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  DollarSign
} from "lucide-react";

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Software Development",
    shortDescription: "",
    startingPriceSGD: 1000,
    deliveryEstimate: "2 - 3 Weeks",
    features: "Custom Architecture, Responsive Layout, API Integration",
    isPopular: false,
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await api.getServices();
      setServices(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: "",
      slug: "",
      category: "Software Development",
      shortDescription: "",
      startingPriceSGD: 1000,
      deliveryEstimate: "2 - 3 Weeks",
      features: "Custom UI Design, Secure Database, Production Deployment",
      isPopular: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (svc: any) => {
    setEditingService(svc);
    setFormData({
      title: svc.title || "",
      slug: svc.slug || "",
      category: svc.category || "Software Development",
      shortDescription: svc.shortDescription || "",
      startingPriceSGD: svc.startingPriceSGD || 1000,
      deliveryEstimate: svc.deliveryEstimate || "2 - 3 Weeks",
      features: Array.isArray(svc.features) ? svc.features.join(", ") : (svc.features || ""),
      isPopular: !!svc.isPopular,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await api.deleteService(id);
      loadServices();
    } catch (err: any) {
      alert(err.message || "Failed to delete service.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      features: formData.features.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingService) {
        await api.updateService(editingService.id, payload);
      } else {
        await api.createService(payload);
      }
      setIsModalOpen(false);
      loadServices();
    } catch (err: any) {
      alert(err.message || "Failed to save service.");
    }
  };

  const filteredServices = services.filter((svc) => {
    const matchesSearch =
      svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "all" || svc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = Array.from(new Set(services.map((s) => s.category).filter(Boolean)));

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-brand-navy">
            Services Catalog Management (100+)
          </h2>
          <p className="text-xs text-brand-gray mt-0.5">
            Manage public digital services, starting Singapore Dollar (S$) pricing, and delivery estimates.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-brand-blue hover:bg-brand-blue-dark text-white px-4 py-2.5 rounded-xl font-display text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-brand-navy/10 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-brand-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-brand-navy/15 text-xs outline-none focus:border-brand-blue"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-brand-gray" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-brand-navy/15 text-xs text-brand-navy font-semibold outline-none bg-white"
          >
            <option value="all">All Categories ({services.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services List Table / Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs text-brand-gray">Loading services catalog...</div>
      ) : filteredServices.length > 0 ? (
        <div className="bg-white rounded-2xl border border-brand-navy/10 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-navy/5 text-brand-navy font-bold uppercase tracking-wider text-[10px] border-b border-brand-navy/10">
                <tr>
                  <th className="p-3.5">Service Title & Slug</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Starting SGD</th>
                  <th className="p-3.5">Delivery Time</th>
                  <th className="p-3.5">Status / Badge</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/5 font-sans">
                {filteredServices.map((svc) => (
                  <tr key={svc.id} className="hover:bg-brand-navy/[0.02] transition-colors">
                    <td className="p-3.5">
                      <strong className="font-bold text-brand-navy block">{svc.title}</strong>
                      <span className="font-mono text-[10px] text-brand-gray">/{svc.slug}</span>
                      <p className="text-[11px] text-brand-gray line-clamp-1 mt-0.5 max-w-sm">
                        {svc.shortDescription}
                      </p>
                    </td>
                    <td className="p-3.5">
                      <span className="bg-brand-navy/5 text-brand-navy font-medium px-2 py-0.5 rounded-full text-[10px]">
                        {svc.category}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-brand-navy">
                      S${svc.startingPriceSGD?.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-brand-gray text-[11px] flex items-center gap-1 mt-3">
                      <Clock className="w-3 h-3 text-cyan-600" /> {svc.deliveryEstimate}
                    </td>
                    <td className="p-3.5">
                      {svc.isPopular ? (
                        <span className="bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded-full text-[10px]">
                          Popular
                        </span>
                      ) : (
                        <span className="text-brand-gray text-[10px]">Standard</span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(svc)}
                          className="p-1.5 rounded-lg bg-brand-navy/5 hover:bg-brand-blue hover:text-white text-brand-navy transition-colors cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(svc.id, svc.title)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors cursor-pointer"
                          title="Delete Service"
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
          No services match your current query or category filter.
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-brand-navy/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-navy/10">
              <h3 className="font-display text-base font-bold text-brand-navy">
                {editingService ? "Edit Service" : "Add New Service to Catalog"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-brand-gray hover:text-brand-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-brand-navy mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Next.js Enterprise Web Platform"
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. enterprise-web-platform"
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Software Development"
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Starting Price (SGD S$)</label>
                  <input
                    type="number"
                    required
                    value={formData.startingPriceSGD}
                    onChange={(e) =>
                      setFormData({ ...formData, startingPriceSGD: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-bold font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Delivery Estimate</label>
                  <input
                    type="text"
                    required
                    value={formData.deliveryEstimate}
                    onChange={(e) => setFormData({ ...formData, deliveryEstimate: e.target.value })}
                    placeholder="2 - 3 Weeks"
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">Short Description</label>
                <textarea
                  required
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Summary of deliverables, value proposition, and architecture."
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">
                  Features / Deliverables (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="React 19, Tailwind CSS, API Integration, 60 Days Warranty"
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <label className="flex items-center gap-2 font-bold text-brand-navy cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                  className="rounded text-brand-blue"
                />
                <span>Highlight with 'Popular' badge</span>
              </label>

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
                  {editingService ? "Save Changes" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
