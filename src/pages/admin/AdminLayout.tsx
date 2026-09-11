import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { api, getAuthToken, removeAuthToken, getStoredAdminUser } from "../../lib/api";
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  Briefcase,
  Users,
  GraduationCap,
  Award,
  Inbox,
  FileText,
  Settings,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Calculator,
  Laptop,
  CheckCircle2,
  Lock,
  Globe,
  Bot,
} from "lucide-react";

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(getStoredAdminUser());
  const [checkingAuth, setCheckingAuth] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const token = getAuthToken();
      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        const res = await api.getMe();
        if (res && res.user) {
          setUser(res.user);
        } else {
          removeAuthToken();
          navigate("/admin/login");
        }
      } catch (err) {
        removeAuthToken();
        navigate("/admin/login");
      } finally {
        setCheckingAuth(false);
      }
    };

    checkSession();
  }, [navigate, location.pathname]);

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch {
      // ignore
    } finally {
      removeAuthToken();
      navigate("/admin/login");
    }
  };

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Website CMS", path: "/admin/cms", icon: <Globe className="w-4 h-4" /> },
    { label: "AI Chatbot & KB", path: "/admin/chatbot", icon: <Bot className="w-4 h-4 text-emerald-400" /> },
    { label: "Services (100+)", path: "/admin/services", icon: <Layers className="w-4 h-4" /> },
    { label: "Solutions & ERP", path: "/admin/solutions", icon: <Sparkles className="w-4 h-4" /> },
    { label: "Projects & Portfolio", path: "/admin/projects", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Staff Team", path: "/admin/staff", icon: <Users className="w-4 h-4" /> },
    { label: "Internships", path: "/admin/internships", icon: <GraduationCap className="w-4 h-4" /> },
    { label: "Workshops", path: "/admin/workshops", icon: <Laptop className="w-4 h-4" /> },
    { label: "Certificates Registry", path: "/admin/certificates", icon: <Award className="w-4 h-4" /> },
    { label: "Leads & Enquiries", path: "/admin/leads", icon: <Inbox className="w-4 h-4" /> },
    { label: "Quote Requests", path: "/admin/quotes", icon: <Calculator className="w-4 h-4" /> },
    { label: "Tech Insights / Blog", path: "/admin/blog", icon: <FileText className="w-4 h-4" /> },
    { label: "Security & Settings", path: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
    { label: "Audit Logs", path: "/admin/audit-logs", icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center text-white">
        <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin mb-3" />
        <span className="font-display text-sm font-bold tracking-wide">
          Verifying Digee Tech Security Session...
        </span>
      </div>
    );
  }

  return (
    <div id="admin-portal-layout" className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
      
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-brand-navy text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-blue text-white flex items-center justify-center font-display font-extrabold text-sm shadow-md">
              D
            </div>
            <div>
              <span className="font-display text-base font-extrabold text-white tracking-tight block">
                DIGEE TECH
              </span>
              <span className="text-[10px] font-mono text-brand-blue-light uppercase tracking-wider block">
                Admin Console
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5 scrollbar-thin">
          <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white/40">
            Management & Operations
          </div>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  active
                    ? "bg-brand-blue text-white font-bold shadow-xs"
                    : "text-white/75 hover:bg-white/8 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {active && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer - Admin User & Logout */}
        <div className="p-3 border-t border-white/10 bg-brand-navy/60">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 mb-2">
            <div className="w-8 h-8 rounded-full bg-brand-blue/30 border border-brand-blue flex items-center justify-center font-bold text-xs text-brand-blue-light">
              {user?.name?.[0] || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-white block truncate">
                {user?.name || "Administrator"}
              </span>
              <span className="text-[10px] text-white/60 font-mono block truncate">
                {user?.email || "ceo@digeetech.com"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white/8 hover:bg-white/15 text-[11px] font-semibold text-white/80 transition-colors"
            >
              <ExternalLink className="w-3 h-3" /> Live Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3 h-3" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-brand-navy/10 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-brand-navy/5 text-brand-navy hover:text-brand-blue"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider block">
                Digee Tech (Singapore) Operations
              </span>
              <h1 className="font-display text-base font-bold text-brand-navy leading-tight">
                {navItems.find((n) => n.path === location.pathname)?.label || "Administration Portal"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Server Online</span>
            </div>
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1 text-brand-blue hover:underline font-semibold"
            >
              <Globe className="w-3.5 h-3.5" /> View Public Site
            </Link>
          </div>
        </header>

        {/* Page Outlet */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};
