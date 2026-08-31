import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingContactCTA } from "./components/FloatingContactCTA";

// Page Imports
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
import { NotFound } from "./pages/NotFound";

// ScrollToTop component reset on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div id="digeetech-app-root" className="min-h-screen bg-white text-brand-navy flex flex-col justify-between font-sans">
        
        {/* Sticky Header */}
        <Navbar />

        {/* Content Views */}
        <main id="app-main-content" className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            
            {/* Unified Dynamic Service Routes */}
            <Route path="/services/:slug" element={<ServiceDetail />} />
            
            {/* Standard exact service paths matching specific links */}
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
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/process" element={<Process />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/start-a-project" element={<StartProject />} />
            
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/internships" element={<Internships />} />
            
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Premium Large Footer */}
        <Footer />

        {/* Global Action Elements */}
        <FloatingContactCTA />

      </div>
    </Router>
  );
}
