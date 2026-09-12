import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";
import { logger } from "./lib/logger";

// Public Page Imports
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { ServiceDetail } from "./pages/ServiceDetail";
import { Solutions } from "./pages/Solutions";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Insights } from "./pages/Insights";
import { BlogDetail } from "./pages/BlogDetail";
import { Contact } from "./pages/Contact";
import { StartProject } from "./pages/StartProject";
import { Technology } from "./pages/Technology";
import { Process } from "./pages/Process";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { Workshops } from "./pages/Workshops";
import { Internships } from "./pages/Internships";
import { Industries } from "./pages/Industries";
import { Research } from "./pages/Research";
import { Careers } from "./pages/Careers";
import { Pricing } from "./pages/Pricing";
import { VerifyCertificate } from "./pages/VerifyCertificate";
import { NotFound } from "./pages/NotFound";

// Admin Portal Page Imports
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminServices } from "./pages/admin/AdminServices";
import { AdminSolutions } from "./pages/admin/AdminSolutions";
import { AdminProjects } from "./pages/admin/AdminProjects";
import { AdminStaff } from "./pages/admin/AdminStaff";
import { AdminInternships } from "./pages/admin/AdminInternships";
import { AdminWorkshops } from "./pages/admin/AdminWorkshops";
import { AdminCertificates } from "./pages/admin/AdminCertificates";
import { AdminLeads } from "./pages/admin/AdminLeads";
import { AdminQuotes } from "./pages/admin/AdminQuotes";
import { AdminBlog } from "./pages/admin/AdminBlog";
import { AdminCMS } from "./pages/admin/AdminCMS";
import { AdminKnowledge } from "./pages/admin/AdminKnowledge";
import { AdminSettings } from "./pages/admin/AdminSettings";
import { AdminAuditLogs } from "./pages/admin/AdminAuditLogs";

// ScrollToTop component & Hash route normalizer
const ScrollToTopAndRouteTracer: React.FC = () => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user visited via a legacy hash URL (e.g. domain.com/#/admin/login)
    if (hash && hash.startsWith("#/")) {
      const cleanPath = hash.substring(1); // remove '#'
      logger.logHashRouterIssue(hash, cleanPath);
      navigate(cleanPath, { replace: true });
      return;
    }

    window.scrollTo(0, 0);
    logger.logRouteChange(document.referrer, pathname + search, false);
  }, [pathname, search, hash, navigate]);

  return null;
};

// Main App Container with conditionally rendered headers/footers
const MainAppLayout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div id="digeetech-app-root" className="min-h-screen bg-white text-brand-navy flex flex-col justify-between font-sans">
      
      {/* Sticky Header (Hidden on Admin Routes) */}
      {!isAdminRoute && <Navbar />}

      {/* Content Views */}
      <main id="app-main-content" className={`grow ${isAdminRoute ? "bg-slate-50" : ""}`}>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          
          {/* Unified Dynamic Service Routes */}
          <Route path="/services/:slug" element={<ServiceDetail />} />
          
          {/* Standard exact service paths */}
          <Route path="/services/web-development" element={<ServiceDetail />} />
          <Route path="/services/app-development" element={<ServiceDetail />} />
          <Route path="/services/ai-agents" element={<ServiceDetail />} />
          <Route path="/services/ai-tools" element={<ServiceDetail />} />
          <Route path="/services/saas" element={<ServiceDetail />} />
          <Route path="/services/crm" element={<ServiceDetail />} />
          <Route path="/services/erp" element={<ServiceDetail />} />
          <Route path="/services/management-portals" element={<ServiceDetail />} />
          <Route path="/services/automation" element={<ServiceDetail />} />
          <Route path="/services/digital-marketing" element={<ServiceDetail />} />
          <Route path="/services/seo" element={<ServiceDetail />} />
          <Route path="/services/meta-ads" element={<ServiceDetail />} />
          <Route path="/services/graphic-design" element={<ServiceDetail />} />
          <Route path="/services/branding" element={<ServiceDetail />} />
          <Route path="/services/ui-ux" element={<ServiceDetail />} />

          <Route path="/solutions" element={<Solutions />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/portfolio" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/process" element={<Process />} />
          <Route path="/pricing" element={<Pricing />} />
          
          <Route path="/insights" element={<Insights />} />
          <Route path="/blog" element={<Insights />} />
          <Route path="/insights/:slug" element={<BlogDetail />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />

          <Route path="/industries" element={<Industries />} />
          <Route path="/research" element={<Research />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/training" element={<Workshops />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/careers" element={<Careers />} />

          {/* Certificate Verification Public Route */}
          <Route path="/verify-certificate" element={<VerifyCertificate />} />
          <Route path="/verify-certificate/:certificateId" element={<VerifyCertificate />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/start-a-project" element={<StartProject />} />
          
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Admin Authentication & Management Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="cms" element={<AdminCMS />} />
            <Route path="chatbot" element={<AdminKnowledge />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="solutions" element={<AdminSolutions />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="staff" element={<AdminStaff />} />
            <Route path="internships" element={<AdminInternships />} />
            <Route path="workshops" element={<AdminWorkshops />} />
            <Route path="certificates" element={<AdminCertificates />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="quotes" element={<AdminQuotes />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="audit-logs" element={<AdminAuditLogs />} />
          </Route>
          
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Premium Large Footer (Hidden on Admin Routes) */}
      {!isAdminRoute && <Footer />}

      {/* Global Action Elements (Hidden on Admin Routes) */}
      {!isAdminRoute && <Chatbot />}

    </div>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTopAndRouteTracer />
      <MainAppLayout />
    </Router>
  );
}
