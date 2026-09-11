import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import {
  Users,
  Inbox,
  Award,
  Layers,
  Sparkles,
  Briefcase,
  TrendingUp,
  Globe,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calculator,
  ShieldCheck,
  Building2,
  Laptop
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await api.getDashboardStats();
      setStats(data);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard metrics.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-brand-navy">
        <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin mb-3" />
        <span className="text-xs font-semibold">Loading real-time operational analytics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-800 p-6 rounded-3xl">
        <div className="flex items-center gap-2 font-bold mb-1">
          <AlertCircle className="w-5 h-5 text-rose-600" />
          <span>Error Loading Dashboard</span>
        </div>
        <p className="text-xs">{error}</p>
        <button
          onClick={fetchStats}
          className="mt-3 bg-rose-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold"
        >
          Retry
        </button>
      </div>
    );
  }

  const kpis = [
    { label: "Total Visitors", value: stats?.visitorsCount || 0, icon: <Globe className="w-4 h-4 text-brand-blue" />, sub: "Real Page Views" },
    { label: "Contact Enquiries", value: stats?.leads?.total || 0, icon: <Inbox className="w-4 h-4 text-emerald-600" />, sub: `${stats?.leads?.pending || 0} Pending Actions` },
    { label: "Quote Requests", value: stats?.quotes?.total || 0, icon: <Calculator className="w-4 h-4 text-amber-600" />, sub: "Scope Estimators" },
    { label: "Active Services", value: stats?.servicesCount || 0, icon: <Layers className="w-4 h-4 text-indigo-600" />, sub: "100+ Catalog Entries" },
    { label: "Client Projects", value: stats?.projectsCount || 0, icon: <Briefcase className="w-4 h-4 text-purple-600" />, sub: "Case Studies" },
    { label: "Active Staff", value: stats?.staffCount || 0, icon: <Users className="w-4 h-4 text-cyan-600" />, sub: "Engineering Leads" },
    { label: "Certificates Issued", value: stats?.certificatesCount || 0, icon: <Award className="w-4 h-4 text-amber-500" />, sub: "Active Registry" },
    { label: "Internship Applicants", value: stats?.applicantsCount || 0, icon: <TrendingUp className="w-4 h-4 text-rose-500" />, sub: "Fellowships" },
  ];

  return (
    <div id="admin-dashboard-view" className="space-y-8">
      
      {/* Welcome Banner & Quick Actions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-brand-navy/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-blue uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Digee Tech Management
          </div>
          <h1 className="font-display text-2xl font-extrabold text-brand-navy tracking-tight">
            Executive Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-brand-gray mt-1">
            Real-time management of Singapore client inquiries, project deliverables, staff records, and certificates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            to="/admin/certificates"
            className="bg-brand-blue hover:bg-brand-blue-dark text-white px-4 py-2.5 rounded-xl font-display text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5" /> Issue Certificate
          </Link>
          <Link
            to="/admin/services"
            className="bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-navy px-4 py-2.5 rounded-xl font-display text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Service
          </Link>
          <Link
            to="/admin/leads"
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-4 py-2.5 rounded-xl font-display text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Inbox className="w-3.5 h-3.5 text-emerald-600" /> View Leads ({stats?.leads?.pending || 0})
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-brand-navy/10 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-bold text-brand-gray font-sans truncate">{kpi.label}</span>
              <div className="p-2 rounded-xl bg-brand-navy/5 shrink-0">
                {kpi.icon}
              </div>
            </div>
            <div>
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy block">
                {typeof kpi.value === "number" ? kpi.value.toLocaleString() : kpi.value}
              </span>
              <span className="text-[10px] text-brand-gray font-medium mt-0.5 block truncate">
                {kpi.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Recent Leads + Live Audit Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recent Enquiries */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-xs border border-brand-navy/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-navy/8">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-brand-blue" />
                <h3 className="font-display text-sm font-bold text-brand-navy">Recent Inquiries & Leads</h3>
              </div>
              <Link to="/admin/leads" className="text-xs text-brand-blue hover:underline font-bold flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {stats?.recentLeads && stats.recentLeads.length > 0 ? (
              <div className="space-y-2.5">
                {stats.recentLeads.map((lead: any) => (
                  <div
                    key={lead.id}
                    className="p-3 rounded-2xl bg-brand-navy/[0.02] border border-brand-navy/8 hover:border-brand-blue/30 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-xs font-bold text-brand-navy truncate">{lead.name}</strong>
                        {lead.company && (
                          <span className="text-[10px] text-brand-gray font-mono truncate">({lead.company})</span>
                        )}
                      </div>
                      <span className="text-[11px] text-brand-gray block truncate mt-0.5">
                        {lead.serviceRequested || lead.projectScope || "General Consulting"} • {lead.email}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lead.status === "New"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-brand-blue/10 text-brand-blue"
                      }`}>
                        {lead.status}
                      </span>
                      <span className="text-[10px] text-brand-gray block mt-0.5">
                        {lead.submittedAt?.split("T")[0] || "Today"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-brand-gray text-xs">
                No inquiries recorded yet.
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-brand-navy/8">
            <Link
              to="/admin/leads"
              className="w-full text-center py-2 rounded-xl bg-brand-navy/5 hover:bg-brand-navy/10 text-xs font-bold text-brand-navy block transition-colors"
            >
              Open Lead Manager
            </Link>
          </div>
        </div>

        {/* Right Column: Live Audit Logs */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-xs border border-brand-navy/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-navy/8">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <h3 className="font-display text-sm font-bold text-brand-navy">Live Audit Activity</h3>
              </div>
              <Link to="/admin/audit-logs" className="text-xs text-brand-blue hover:underline font-bold flex items-center gap-1">
                Full Log <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {stats?.recentAuditLogs && stats.recentAuditLogs.length > 0 ? (
              <div className="space-y-3">
                {stats.recentAuditLogs.slice(0, 5).map((log: any) => (
                  <div key={log.id} className="text-xs flex items-start gap-2.5 pb-2.5 border-b border-brand-navy/5 last:border-0">
                    <div className="w-2 h-2 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <strong className="font-bold text-brand-navy truncate">{log.action}</strong>
                        <span className="text-[10px] text-brand-gray font-mono shrink-0">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[11px] text-brand-gray truncate mt-0.5">{log.details}</p>
                      <span className="text-[9px] text-brand-gray/70 font-mono">By {log.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-brand-gray text-xs">
                No recent activity recorded.
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-brand-navy/8">
            <Link
              to="/admin/settings"
              className="w-full text-center py-2 rounded-xl bg-brand-navy/5 hover:bg-brand-navy/10 text-xs font-bold text-brand-navy block transition-colors"
            >
              Security Settings & Password
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
