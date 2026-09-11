import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Github, Twitter, Linkedin, ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "About Digee Tech", path: "/about" },
    { name: "Why Digee Tech", path: "/about#why-us" },
    { name: "Our 7-Step Process", path: "/process" },
    { name: "Portfolio & Case Studies", path: "/projects" },
    { name: "Industries Served", path: "/industries" },
    { name: "Careers", path: "/careers" },
    { name: "Contact Us", path: "/contact" }
  ];

  const serviceLinks = [
    { name: "Website Development", path: "/services/web-development" },
    { name: "Mobile App Development", path: "/services/app-development" },
    { name: "AI Agents & Autonomous Loops", path: "/services/ai-agents" },
    { name: "AI Tools & Document Parsers", path: "/services/ai-tools" },
    { name: "SaaS Product Engineering", path: "/services/saas" },
    { name: "Custom CRM Solutions", path: "/services/crm" },
    { name: "Business Process Automation", path: "/services/automation" },
    { name: "Digital Marketing & SEO", path: "/services/digital-marketing" }
  ];

  const solutionsLinks = [
    { name: "For Startups & MVPs", path: "/solutions#startups" },
    { name: "For Singapore SMEs", path: "/solutions#business-growth" },
    { name: "AI-First Operations", path: "/solutions#ai-enterprise" },
    { name: "Research Consulting", path: "/research" },
    { name: "Practical Workshops", path: "/workshops" },
    { name: "Engineering Internships", path: "/internships" }
  ];

  const resourcesLinks = [
    { name: "Project Scope Estimator", path: "/#project-estimator" },
    { name: "Smart Service Finder", path: "/#service-finder" },
    { name: "Articles & Tech Insights", path: "/insights" },
    { name: "Frequently Asked Questions", path: "/about#faq" },
    { name: "Start a Project", path: "/start-a-project" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" }
  ];

  return (
    <footer id="main-footer" className="bg-[#fcfcf9] border-t border-brand-navy/5 pt-16 pb-10">
      <div id="footer-container" className="max-w-7xl mx-auto px-6">
        <div id="footer-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1 - Brand Info */}
          <div id="footer-col-brand" className="lg:col-span-2 flex flex-col gap-5">
            <Logo id="footer-logo" />
            <p className="font-sans text-xs md:text-sm text-brand-gray max-w-sm leading-relaxed">
              Digee Tech delivers affordable, high-performance software development, autonomous AI agents, CRM systems, and digital solutions for Singapore businesses, startups, SMEs, and international clients.
            </p>
            <div className="font-display text-xs tracking-wider text-brand-blue font-bold">
              Engineering Intelligent Digital Futures
            </div>

            {/* Coordinates */}
            <div className="flex flex-col gap-2 pt-2 border-t border-brand-navy/5 text-xs text-brand-navy/80">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-blue" />
                <a href="mailto:contact@digeetech.com" className="hover:text-brand-blue transition-colors">
                  contact@digeetech.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-blue" />
                <span>+65 8123 4567 (Mon - Fri, 9am - 6pm SGT)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                <span>Singapore & Global Operations</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 text-brand-navy/50 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 - Company */}
          <div id="footer-col-company" className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="font-sans text-xs text-brand-navy/80 hover:text-brand-blue transition-colors flex items-center gap-1 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-brand-blue" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div id="footer-col-services" className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="font-sans text-xs text-brand-navy/80 hover:text-brand-blue transition-colors flex items-center gap-1 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-brand-blue" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Solutions & Resources */}
          <div id="footer-col-solutions" className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy">
              Solutions & Resources
            </h4>
            <ul className="flex flex-col gap-2.5">
              {solutionsLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="font-sans text-xs text-brand-navy/80 hover:text-brand-blue transition-colors flex items-center gap-1 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-brand-blue" />
                    {link.name}
                  </Link>
                </li>
              ))}
              {resourcesLinks.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="font-sans text-xs text-brand-navy/80 hover:text-brand-blue transition-colors flex items-center gap-1 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-brand-blue" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div id="footer-bottom-bar" className="border-t border-brand-navy/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-gray font-sans">
          <span>
            © {currentYear} Digee Tech. All rights reserved. Registered Singapore & International Client Services.
          </span>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-brand-blue transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-brand-blue transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
