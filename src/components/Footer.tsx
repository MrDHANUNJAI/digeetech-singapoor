import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Github, Twitter, Linkedin, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Projects", path: "/projects" },
    { name: "Our Technology", path: "/technology" },
    { name: "Insights & Blog", path: "/insights" },
    { name: "Contact Us", path: "/contact" }
  ];

  const serviceLinks = [
    { name: "Web Development", path: "/services/web-development" },
    { name: "App Development", path: "/services/app-development" },
    { name: "AI Agents", path: "/services/ai-agents" },
    { name: "SaaS Development", path: "/services/saas" },
    { name: "CRM Systems", path: "/services/crm" },
    { name: "ERP Systems", path: "/services/erp" }
  ];

  const growthLinks = [
    { name: "Digital Marketing", path: "/services/digital-marketing" },
    { name: "SEO Solutions", path: "/services/seo" },
    { name: "Meta Ads Campaigns", path: "/services/meta-ads" },
    { name: "Graphic Design", path: "/services/graphic-design" },
    { name: "Branding Design", path: "/services/branding" }
  ];

  return (
    <footer id="main-footer" className="bg-[#fcfcf9] border-t border-brand-navy/5 pt-20 pb-10">
      <div id="footer-container" className="max-w-7xl mx-auto px-6">
        <div id="footer-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1 - Brand Info */}
          <div id="footer-col-brand" className="lg:col-span-2 flex flex-col gap-6">
            <Logo id="footer-logo" />
            <p className="font-sans text-sm text-brand-gray max-w-sm leading-relaxed">
              Digeetech provides premium, end-to-end digital technology, custom software, AI agents, operations automation, and digital growth systems for startups and enterprises.
            </p>
            <span className="font-display italic text-xs tracking-wider text-brand-blue font-semibold">
              "Creating What's Next..."
            </span>
            <div className="flex items-center gap-4 text-brand-navy/50">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Company Links */}
          <div id="footer-col-company" className="flex flex-col gap-5">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="font-sans text-sm text-brand-navy/80 hover:text-brand-blue transition-colors flex items-center gap-1 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-brand-blue" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services Links */}
          <div id="footer-col-services" className="flex flex-col gap-5">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy">
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="font-sans text-sm text-brand-navy/80 hover:text-brand-blue transition-colors flex items-center gap-1 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-brand-blue" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Growth Links */}
          <div id="footer-col-growth" className="flex flex-col gap-5">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy">
              Growth & Creative
            </h4>
            <ul className="flex flex-col gap-3">
              {growthLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="font-sans text-sm text-brand-navy/80 hover:text-brand-blue transition-colors flex items-center gap-1 group">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-brand-blue" />
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
            © {currentYear} Digeetech. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-brand-blue transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-brand-blue transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
