import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { FileText, Plus, Edit2, Trash2, X, ExternalLink, Calendar, User } from "lucide-react";

export const AdminBlog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "AI & Automation",
    summary: "",
    content: "",
    author: "Digee Tech Engineering Lead",
    readTime: "5 min read",
    featured: false,
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await api.getBlogPosts();
      setPosts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      slug: "",
      category: "AI & Automation",
      summary: "",
      content: "",
      author: "Digee Tech Engineering Lead",
      readTime: "5 min read",
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: any) => {
    setEditingPost(p);
    setFormData({
      title: p.title || "",
      slug: p.slug || "",
      category: p.category || "AI & Automation",
      summary: p.summary || "",
      content: p.content || "",
      author: p.author || "Digee Tech Engineering Lead",
      readTime: p.readTime || "5 min read",
      featured: !!p.featured,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete blog post "${title}"?`)) return;
    try {
      await api.deleteBlogPost(id);
      loadPosts();
    } catch (err: any) {
      alert(err.message || "Failed to delete post.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      publishedAt: new Date().toISOString().split("T")[0],
    };

    try {
      if (editingPost) {
        await api.updateBlogPost(editingPost.id, payload);
      } else {
        await api.createBlogPost(payload);
      }
      setIsModalOpen(false);
      loadPosts();
    } catch (err: any) {
      alert(err.message || "Failed to save blog post.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-brand-navy">
            Tech Insights & Thought Leadership Articles
          </h2>
          <p className="text-xs text-brand-gray mt-0.5">
            Publish technical guides, engineering architectures, and Singapore business digitalization insights.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-brand-blue hover:bg-brand-blue-dark text-white px-4 py-2.5 rounded-xl font-display text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-brand-gray">Loading articles...</div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl p-5 border border-brand-navy/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-brand-blue uppercase font-mono">{post.category}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(post)}
                      className="p-1 rounded-lg hover:bg-brand-navy/5 text-brand-navy transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="p-1 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-display text-base font-bold text-brand-navy mb-1">{post.title}</h3>
                <p className="text-[11px] text-brand-gray line-clamp-3 mb-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-brand-navy/8 flex items-center justify-between text-[11px] text-brand-gray">
                <span>{post.publishedAt || "Recently"}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center bg-white rounded-2xl border border-brand-navy/10 text-brand-gray text-xs">
          No articles published yet.
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-brand-navy/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-brand-navy/10">
              <h3 className="font-display text-base font-bold text-brand-navy">
                {editingPost ? "Edit Article" : "Write New Article"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-gray hover:text-brand-navy">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-brand-navy mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Deploying Autonomous AI Agents on Singapore Cloud Run"
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
                <div>
                  <label className="block font-bold text-brand-navy mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    required
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">Summary / Lead Excerpt</label>
                <textarea
                  required
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="High-level synopsis for search previews and cards."
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1">Full Article Body (Markdown supported)</label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="# Technical Deep Dive..."
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-mono"
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
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
