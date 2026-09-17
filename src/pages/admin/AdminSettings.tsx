import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import {
  Settings,
  Lock,
  Building2,
  Globe,
  ShieldCheck,
  Key,
  CheckCircle2,
  AlertCircle,
  Save,
  PhoneCall,
  Mail,
  MapPin,
  FileCode,
  Sparkles
} from "lucide-react";

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"company" | "security" | "seo">("company");
  const [settings, setSettings] = useState<any>({
    companyName: "DIGEE TECH",
    tagline: "Singapore's Premier Digital Engineering & Business Solutions Partner",
    uenNumber: "202419803M",
    email: "contact@digeetech.com",
    phone: "",
    address: "Marina Bay Financial Centre, Tower 1, Singapore 018981",
    metaTitle: "DIGEE TECH — Digital Transformation, AI & Software Engineering (Singapore)",
    metaDescription: "Enterprise-grade digital technology partner in Singapore. 100+ services including custom web & mobile apps, CRM, ERP, AI agents, cloud architectures and cybersecurity.",
    announcementText: "🇸🇬 Digital Technology & Business Solutions Partner • Fixed SGD Quotes • 100% IP Ownership",
    enableAnnouncement: true,
  });

  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Password Change Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState<string | null>(null);
  const [pwError, setPwError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
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

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(null);
    setSaveError(null);

    try {
      await api.updateSettings(settings);
      setSaveSuccess("Company details and SEO configuration saved successfully.");
      setTimeout(() => setSaveSuccess(null), 4000);
    } catch (err: any) {
      setSaveError(err.message || "Failed to update settings.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwSuccess(null);
    setPwError(null);

    if (newPassword !== confirmPassword) {
      setPwError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }

    setPwLoading(true);

    try {
      const res = await api.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setPwSuccess(res.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPwError(err.message || "Failed to change password. Please verify current password.");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-xl font-bold text-brand-navy">
          System Settings & Executive Security
        </h2>
        <p className="text-xs text-brand-gray mt-0.5">
          Manage Singapore entity registration, contact channels, SEO meta tags, and change administrator credentials.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-brand-navy/10 pb-2">
        <button
          onClick={() => setActiveTab("company")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === "company" ? "bg-brand-blue text-white shadow-xs" : "text-brand-gray hover:text-brand-navy"
          }`}
        >
          <Building2 className="w-4 h-4" /> Company & Singapore Profile
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === "security" ? "bg-brand-blue text-white shadow-xs" : "text-brand-gray hover:text-brand-navy"
          }`}
        >
          <Lock className="w-4 h-4" /> Security & Change Password
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            activeTab === "seo" ? "bg-brand-blue text-white shadow-xs" : "text-brand-gray hover:text-brand-navy"
          }`}
        >
          <Globe className="w-4 h-4" /> SEO & Announcement Bar
        </button>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}
      {saveError && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Tab 1: Company Profile */}
      {activeTab === "company" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-navy/10 shadow-xs">
          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-brand-navy mb-1">Company Legal Brand Name</label>
                <input
                  type="text"
                  required
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-bold font-display"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-navy mb-1">Singapore Registration / UEN</label>
                <input
                  type="text"
                  required
                  value={settings.uenNumber}
                  onChange={(e) => setSettings({ ...settings, uenNumber: e.target.value })}
                  placeholder="202419803M"
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-brand-navy mb-1">Brand Positioning Tagline</label>
              <input
                type="text"
                required
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-brand-navy mb-1">Primary Email Address</label>
                <input
                  type="email"
                  required
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-navy mb-1">Direct Phone / WhatsApp</label>
                <input
                  type="text"
                  required
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-brand-navy mb-1">Singapore Office Address</label>
              <input
                type="text"
                required
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
              />
            </div>

            <div className="pt-4 border-t border-brand-navy/10 flex justify-end">
              <button
                type="submit"
                className="bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-2.5 rounded-xl font-display text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Profile Details
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Security & Change Password */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-navy/10 shadow-xs max-w-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-brand-navy/10">
              <Key className="w-5 h-5 text-brand-blue" />
              <div>
                <h3 className="font-display text-base font-bold text-brand-navy">
                  Change Administrator Password
                </h3>
                <p className="text-xs text-brand-gray">
                  Update executive access credentials with secure bcrypt verification.
                </p>
              </div>
            </div>

            {pwSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{pwSuccess}</span>
              </div>
            )}
            {pwError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{pwError}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-brand-navy mb-1 font-mono uppercase text-[10px]">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-sans"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1 font-mono uppercase text-[10px]">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-sans"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-navy mb-1 font-mono uppercase text-[10px]">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={pwLoading}
                  className="bg-brand-navy hover:bg-brand-navy/90 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-display text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {pwLoading ? "Verifying..." : "Update Administrator Password"}
                </button>
              </div>
            </form>
          </div>

          {/* Session & Security Info */}
          <div className="bg-white rounded-3xl p-6 border border-brand-navy/10 shadow-xs max-w-xl text-xs space-y-3">
            <h4 className="font-display text-sm font-bold text-brand-navy flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Active Security Architecture
            </h4>
            <ul className="space-y-1.5 text-brand-gray text-[11px]">
              <li>• Passwords encrypted with salted bcrypt work factor 10.</li>
              <li>• Sessions signed via JSON Web Tokens (JWT) with 7-day expiration.</li>
              <li>• All administrative actions automatically recorded in immutable Audit Logs.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: SEO & Announcement Bar */}
      {activeTab === "seo" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-navy/10 shadow-xs">
          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-brand-navy mb-1">Global Meta Title</label>
              <input
                type="text"
                required
                value={settings.metaTitle}
                onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="block font-bold text-brand-navy mb-1">Global Meta Description</label>
              <textarea
                rows={3}
                required
                value={settings.metaDescription}
                onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue"
              />
            </div>

            <div className="pt-2 border-t border-brand-navy/10">
              <label className="flex items-center gap-2 font-bold text-brand-navy cursor-pointer mb-2">
                <input
                  type="checkbox"
                  checked={settings.enableAnnouncement}
                  onChange={(e) =>
                    setSettings({ ...settings, enableAnnouncement: e.target.checked })
                  }
                  className="rounded text-brand-blue"
                />
                <span>Enable Top Announcement Banner</span>
              </label>

              <label className="block font-bold text-brand-navy mb-1">Announcement Text</label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-brand-navy/15 outline-none focus:border-brand-blue font-sans"
              />
            </div>

            <div className="pt-4 border-t border-brand-navy/10 flex justify-end">
              <button
                type="submit"
                className="bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-2.5 rounded-xl font-display text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save SEO & Announcement
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
