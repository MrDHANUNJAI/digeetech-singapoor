import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, setAuthToken, setStoredAdminUser } from "../../lib/api";
import { Lock, Mail, Key, ShieldCheck, ArrowRight, AlertCircle, Sparkles, Building2 } from "lucide-react";

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.login({ email, password });
      if (res && res.token && res.user) {
        setAuthToken(res.token);
        setStoredAdminUser(res.user);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials. Access denied.");
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="admin-login-page" className="min-h-screen bg-brand-navy/[0.03] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center font-display font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
              D
            </div>
            <span className="font-display text-2xl font-extrabold text-brand-navy tracking-tight">
              DIGEE TECH
            </span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-navy/5 text-brand-navy text-xs font-mono font-semibold">
            <Lock className="w-3 h-3 text-brand-blue" /> Executive Administration Portal
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-brand-navy/10">
          <h2 className="font-display text-xl font-bold text-brand-navy mb-1">
            Administrator Sign In
          </h2>
          <p className="text-xs text-brand-gray mb-6">
            Enter your provisioned executive credentials to manage Digee Tech services, staff, leads, and website operations.
          </p>

          {error && (
            <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-2xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5 font-mono">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter administrator email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-navy/15 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-xs sm:text-sm text-brand-navy outline-none font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5 font-mono">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-brand-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-navy/15 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 text-xs sm:text-sm text-brand-navy outline-none font-sans"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-brand-gray cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-brand-blue focus:ring-brand-blue/20"
                />
                <span>Remember session</span>
              </label>
              <span className="text-brand-gray text-[11px]">Backend JWT Authenticated</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-blue hover:bg-brand-blue-dark disabled:opacity-50 text-white py-3 rounded-xl font-display text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate & Access Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-brand-gray hover:text-brand-blue font-semibold transition-colors">
            ← Return to Digee Tech Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};
