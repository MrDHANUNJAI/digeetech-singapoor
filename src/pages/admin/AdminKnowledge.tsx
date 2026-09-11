import React, { useState, useEffect } from "react";
import {
  Bot,
  Database,
  RefreshCw,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  MessageSquare,
  Volume2,
  ShieldCheck,
  FileText,
  Search,
  Filter,
} from "lucide-react";
import { api } from "../../lib/api";

export const AdminKnowledge: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [reindexing, setReindexing] = useState<boolean>(false);
  const [savingSettings, setSavingSettings] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // KB Stats & Items
  const [kbData, setKbData] = useState<{
    totalIndexedChunks: number;
    customKbItems: any[];
    indexedSources: { name: string; count: number }[];
  }>({
    totalIndexedChunks: 0,
    customKbItems: [],
    indexedSources: [],
  });

  // Chatbot Settings
  const [settings, setSettings] = useState({
    companyName: "Digee Tech",
    botName: "Digee Tech AI Assistant",
    welcomeGreeting: "Welcome to Digee Tech, how can I help you today?",
    whatsappNumber: "+65 8123 4567",
    whatsappMessage: "Hello Digee Tech team, I would like to inquire about your software and AI solutions.",
    fallbackEmail: "contact@digeetech.com",
    enabled: true,
    strictRAGMode: true,
    voiceEnabledDefault: false,
  });

  // Modal / Form state for custom KB item
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "FAQ",
    content: "",
    tags: "",
  });

  const [searchFilter, setSearchFilter] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [kbRes, setRes] = await Promise.all([
        api.getKnowledgeBase(),
        api.getChatbotSettings(),
      ]);
      if (kbRes) setKbData(kbRes);
      if (setRes) setSettings((prev) => ({ ...prev, ...setRes }));
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load chatbot data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReindex = async () => {
    setReindexing(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const res = await api.reindexKb();
      setSuccessMsg(res.message || "Successfully re-indexed website knowledge base!");
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to re-index knowledge base.");
    } finally {
      setReindexing(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      await api.updateChatbotSettings(settings);
      setSuccessMsg("Chatbot configuration saved successfully!");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "FAQ",
      content: "",
      tags: "",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      content: item.content,
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "",
    });
    setShowModal(true);
  };

  const handleSaveKbItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    try {
      if (editingId) {
        await api.updateKbItem(editingId, formData);
        setSuccessMsg("Knowledge Base item updated successfully!");
      } else {
        await api.addKbItem(formData);
        setSuccessMsg("New Knowledge Base item added!");
      }
      setShowModal(false);
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save KB item.");
    }
  };

  const handleDeleteKbItem = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await api.deleteKbItem(id);
      setSuccessMsg("Knowledge Base item deleted.");
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to delete item.");
    }
  };

  const filteredItems = (kbData.customKbItems || []).filter(
    (item) =>
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.content.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-navy text-emerald-400 flex items-center justify-center shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
              Website AI Chatbot & Knowledge Base (RAG)
            </h1>
            <p className="text-sm text-slate-500">
              Single Source of Truth Knowledge Index & Anti-Hallucination Guardrails
            </p>
          </div>
        </div>

        <button
          onClick={handleReindex}
          disabled={reindexing}
          className="bg-brand-navy hover:bg-slate-800 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${reindexing ? "animate-spin text-emerald-400" : ""}`} />
          {reindexing ? "Re-Indexing Site Data..." : "Re-Index Website Data"}
        </button>
      </div>

      {/* NOTIFICATIONS */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Knowledge Chunks</span>
            <Database className="w-4 h-4 text-brand-blue" />
          </div>
          <div className="font-display text-3xl font-extrabold text-slate-900">
            {kbData.totalIndexedChunks}
          </div>
          <p className="text-xs text-slate-500 mt-1">Live Indexed Content Chunks</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">RAG Architecture</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-display text-lg font-bold text-emerald-700">
            Strict Zero-Hallucination
          </div>
          <p className="text-xs text-slate-500 mt-1">Website-Only Grounding</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Custom KB & FAQs</span>
            <HelpCircle className="w-4 h-4 text-purple-500" />
          </div>
          <div className="font-display text-3xl font-extrabold text-slate-900">
            {kbData.customKbItems ? kbData.customKbItems.length : 0}
          </div>
          <p className="text-xs text-slate-500 mt-1">Manual Overrides & Policy FAQs</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">WhatsApp Routing</span>
            <MessageSquare className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-display text-sm font-bold text-slate-900 truncate">
            {settings.whatsappNumber}
          </div>
          <p className="text-xs text-slate-500 mt-1">Fallback Quotation Redirection</p>
        </div>
      </div>

      {/* INDEXED CONTENT SOURCES GRID */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-blue" />
          Live Website Content Indexed in Knowledge Base
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {kbData.indexedSources.map((src, i) => (
            <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
              <span className="block font-display text-lg font-bold text-slate-900">{src.count}</span>
              <span className="text-[11px] text-slate-500 font-medium">{src.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CHATBOT CONFIGURATION FORM */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Bot className="w-5 h-5 text-brand-blue" />
          Chatbot Settings & Behavior Rules
        </h2>

        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Bot Display Name
            </label>
            <input
              type="text"
              value={settings.botName}
              onChange={(e) => setSettings({ ...settings, botName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              WhatsApp Contact Number (Fallback / Pricing Inquiries)
            </label>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Welcome Greeting Message
            </label>
            <input
              type="text"
              value={settings.welcomeGreeting}
              onChange={(e) => setSettings({ ...settings, welcomeGreeting: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="voiceEnabled"
              checked={settings.voiceEnabledDefault}
              onChange={(e) => setSettings({ ...settings, voiceEnabledDefault: e.target.checked })}
              className="w-4 h-4 text-brand-blue rounded border-slate-300"
            />
            <label htmlFor="voiceEnabled" className="text-sm font-semibold text-slate-800">
              Enable Text-to-Speech Voice by Default
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="strictRAG"
              checked={settings.strictRAGMode}
              onChange={(e) => setSettings({ ...settings, strictRAGMode: e.target.checked })}
              className="w-4 h-4 text-brand-blue rounded border-slate-300"
            />
            <label htmlFor="strictRAG" className="text-sm font-semibold text-slate-800">
              Enforce Strict Zero-Hallucination Mode
            </label>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={savingSettings}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {savingSettings ? "Saving Settings..." : "Save Chatbot Settings"}
            </button>
          </div>
        </form>
      </div>

      {/* CUSTOM KNOWLEDGE BASE & FAQS SECTION */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-blue" />
              Custom Knowledge Base Entries & FAQs
            </h2>
            <p className="text-xs text-slate-500">
              Add specific policy notes, pricing overrides, or tailored answers for the chatbot
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Custom FAQ / KB Item
          </button>
        </div>

        {/* SEARCH FILTER */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search custom FAQs or content..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-brand-blue"
          />
        </div>

        {/* KB LIST */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No custom Knowledge Base items found.
            </div>
          ) : (
            filteredItems.map((item: any) => (
              <div
                key={item.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-brand-blue/30 transition-colors"
              >
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-navy text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.content}</p>
                  {item.tags && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {(Array.isArray(item.tags) ? item.tags : (item.tags || "").split(",")).map((t: string, i: number) => (
                        <span key={i} className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                          #{t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 text-slate-600 hover:text-brand-blue hover:bg-white rounded-lg transition-colors cursor-pointer"
                    title="Edit Item"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteKbItem(item.id, item.title)}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                    title="Delete Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL FOR ADD/EDIT KB ITEM */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-display font-bold text-lg text-slate-900">
                {editingId ? "Edit KB Item / FAQ" : "Add Custom KB Item / FAQ"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveKbItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Title / Question
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., What is Digee Tech's refund policy?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-brand-blue"
                >
                  <option value="FAQ">FAQ</option>
                  <option value="Company Profile">Company Profile</option>
                  <option value="Services">Services</option>
                  <option value="Pricing">Pricing</option>
                  <option value="Policies">Policies</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Content / Answer
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Detailed answer or content for the chatbot to use as authoritative source..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="refund, policy, guarantee, terms"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-blue hover:bg-brand-blue-dark shadow-sm"
                >
                  Save KB Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
