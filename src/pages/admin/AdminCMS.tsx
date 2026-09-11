import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { Globe, Save, CheckCircle2, AlertCircle, Sparkles, Layout, HelpCircle } from "lucide-react";

export const AdminCMS: React.FC = () => {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadCMS();
  }, []);

  const loadCMS = async () => {
    try {
      setLoading(true);
      const data = await api.getSettings();
      if (data) setSettings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateSettings(settings);
      setSuccess("Website content updated successfully!");
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      alert(err.message || "Failed to update CMS.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-brand-navy">
          Website Content Management (CMS)
        </h2>
        <p className="text-xs text-brand-gray mt-0.5">
          Edit global hero headlines, brand statements, Singapore badges, and live announcement bars.
        </p>
      </div>

      {success && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-navy/10 shadow-xs">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-brand-navy mb-1">Company Positioning Name</label>
            <input
              type="text"
              required
              value={settings.companyName || "DIGEE TECH"}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-bold font-display"
            />
          </div>

          <div>
            <label className="block font-bold text-brand-navy mb-1">Hero Subtitle & Tagline</label>
            <textarea
              rows={2}
              required
              value={settings.tagline || ""}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
            />
          </div>

          <div className="pt-2 border-t border-brand-navy/10">
            <label className="block font-bold text-brand-navy mb-1">Top Announcement Bar Text</label>
            <input
              type="text"
              value={settings.announcementText || ""}
              onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-brand-navy mb-1">Singapore Office Location</label>
              <input
                type="text"
                value={settings.address || ""}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="block font-bold text-brand-navy mb-1">UEN Registration</label>
              <input
                type="text"
                value={settings.uenNumber || ""}
                onChange={(e) => setSettings({ ...settings, uenNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-brand-navy/10 flex justify-end">
            <button
              type="submit"
              className="bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-2.5 rounded-xl font-display text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save CMS Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
