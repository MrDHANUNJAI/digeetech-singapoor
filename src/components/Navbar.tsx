import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { ChevronDown, Menu, X, Globe, Cpu, Briefcase, TrendingUp, Palette } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"services" | "solutions" | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<"services" | "solutions" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close menus on navigation
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [location]);

  // Handle scroll state for sticky style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const serviceCategories = [
    {
      title: "DIGITAL DEVELOPMENT",
      icon: <Globe className="w-4 h-4 text-brand-blue" />,
      items: [
        { name: "Website Development", path: "/services/web-development" },
        { name: "App Development", path: "/services/app-development" },
        { name: "SaaS Development", path: "/services/saas" },
        { name: "Custom Software", path: "/services/saas" }
      ]
    },
    {
      title: "AI & AUTOMATION",
      icon: <Cpu className="w-4 h-4 text-[#00b4d8]" />,
      items: [
        { name: "AI Agents", path: "/services/ai-agents" },
        { name: "AI Tools", path: "/services/ai-tools" },
        { name: "AI Automation", path: "/services/automation" },
        { name: "API & Integrations", path: "/services/automation" }
      ]
    },
    {
      title: "BUSINESS SYSTEMS",
      icon: <Briefcase className="w-4 h-4 text-[#0096c7]" />,
      items: [
        { name: "CRM Systems", path: "/services/crm" },
        { name: "ERP Systems", path: "/services/erp" },
        { name: "Management Portals", path: "/services/management-portals" },
        { name: "Business Automation", path: "/services/automation" }
      ]
    },
    {
      title: "DIGITAL GROWTH",
      icon: <TrendingUp className="w-4 h-4 text-[#0077b6]" />,
      items: [
        { name: "Digital Marketing", path: "/services/digital-marketing" },
        { name: "SEO Solutions", path: "/services/seo" },
        { name: "Meta Ads", path: "/services/meta-ads" }
      ]
    },
    {
      title: "CREATIVE",
      icon: <Palette className="w-4 h-4 text-[#03045e]" />,
      items: [
        { name: "Graphic Design", path: "/services/graphic-design" },
        { name: "Branding", path: "/services/branding" },
        { name: "UI/UX Design", path: "/services/ui-ux" }
      ]
    }
  ];

  const solutionsList = [
    { name: "Startup Solutions", path: "/solutions", hash: "startups", description: "From visual concept to live scaling software." },
    { name: "Business Solutions", path: "/solutions", hash: "business-growth", description: "Unify workflows, automate, and build portals." },
    { name: "AI Solutions", path: "/solutions", hash: "ai-enterprise", description: "Integrate reasoning models and customized agents." },
    { name: "Digital Growth Solutions", path: "/solutions", hash: "digital-growth", description: "Performance campaigns and technical SEO audits." },
    { name: "Enterprise Solutions", path: "/solutions", hash: "ai-enterprise", description: "Custom centralized CRM/ERP workflows at scale." }
  ];

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "glass-panel py-4 shadow-lg border-b border-brand-navy/5"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div id="nav-container" className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Logo id="navbar-logo" />

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
            <Link
              id="link-home"
              to="/"
              className={`font-display text-sm font-semibold transition-colors hover:text-brand-blue ${
                location.pathname === "/" ? "text-brand-blue" : "text-brand-navy/80"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown Trigger */}
            <div
              id="services-dropdown-trigger"
              className="relative"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="btn-services-menu"
                className={`flex items-center gap-1 font-display text-sm font-semibold transition-colors hover:text-brand-blue cursor-pointer ${
                  location.pathname.startsWith("/services") ? "text-brand-blue" : "text-brand-navy/80"
                }`}
              >
                Services <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "services" ? "rotate-185" : ""}`} />
              </button>

              {/* Mega-Menu Dropdown Panel */}
              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    id="services-mega-menu"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-[42%] mt-3 w-[880px] glass-panel rounded-2xl p-6 grid grid-cols-5 gap-6 shadow-2xl z-50"
                  >
                    {serviceCategories.map((cat, idx) => (
                      <div id={`cat-group-${idx}`} key={cat.title} className="flex flex-col gap-3">
                        <div className="flex items-center gap-1.5 border-b border-brand-navy/5 pb-2">
                          {cat.icon}
                          <span className="font-display text-[10px] font-bold tracking-wider text-brand-blue">
                            {cat.title}
                          </span>
                        </div>
                        <ul className="flex flex-col gap-2">
                          {cat.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.path}
                                className="font-sans text-[13px] text-brand-gray hover:text-brand-blue transition-colors block py-1"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solutions Dropdown Trigger */}
            <div
              id="solutions-dropdown-trigger"
              className="relative"
              onMouseEnter={() => setActiveDropdown("solutions")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="btn-solutions-menu"
                className={`flex items-center gap-1 font-display text-sm font-semibold transition-colors hover:text-brand-blue cursor-pointer ${
                  location.pathname === "/solutions" ? "text-brand-blue" : "text-brand-navy/80"
                }`}
              >
                Solutions <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "solutions" ? "rotate-185" : ""}`} />
              </button>

              {/* Simple Dropdown Panel */}
              <AnimatePresence>
                {activeDropdown === "solutions" && (
                  <motion.div
                    id="solutions-menu-panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-3 w-80 glass-panel rounded-xl p-4 flex flex-col gap-1 shadow-2xl z-50"
                  >
                    {solutionsList.map((sol) => (
                      <Link
                        key={sol.name}
                        to={`${sol.path}#${sol.hash}`}
                        className="flex flex-col p-2.5 rounded-lg hover:bg-brand-navy/5 transition-colors group"
                      >
                        <span className="font-display text-sm font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                          {sol.name}
                        </span>
                        <span className="font-sans text-xs text-brand-gray mt-0.5">
                          {sol.description}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              id="link-projects"
              to="/projects"
              className={`font-display text-sm font-semibold transition-colors hover:text-brand-blue ${
                location.pathname === "/projects" ? "text-brand-blue" : "text-brand-navy/80"
              }`}
            >
              Projects
            </Link>

            <Link
              id="link-about"
              to="/about"
              className={`font-display text-sm font-semibold transition-colors hover:text-brand-blue ${
                location.pathname === "/about" ? "text-brand-blue" : "text-brand-navy/80"
              }`}
            >
              About
            </Link>

            <Link
              id="link-insights"
              to="/insights"
              className={`font-display text-sm font-semibold transition-colors hover:text-brand-blue ${
                location.pathname.startsWith("/insights") ? "text-brand-blue" : "text-brand-navy/80"
              }`}
            >
              Insights
            </Link>

            <Link
              id="link-contact"
              to="/contact"
              className={`font-display text-sm font-semibold transition-colors hover:text-brand-blue ${
                location.pathname === "/contact" ? "text-brand-blue" : "text-brand-navy/80"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Start a Project CTA Button */}
          <div id="nav-cta-wrapper" className="hidden lg:block">
            <Button id="navbar-cta-btn" variant="primary" size="sm" to="/start-a-project">
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-brand-navy hover:text-brand-blue transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Out Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />

            {/* Panel */}
            <motion.div
              id="mobile-side-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[320px] bg-white border-l border-brand-navy/10 z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden overflow-y-auto"
            >
              <div id="mobile-menu-content" className="flex flex-col gap-8 mt-12">
                <Logo id="mobile-logo" />

                <div id="mobile-nav-links" className="flex flex-col gap-4 text-brand-navy">
                  <Link
                    to="/"
                    className="font-display text-lg font-bold hover:text-brand-blue transition-colors py-1"
                  >
                    Home
                  </Link>

                  {/* Mobile Services Accordion */}
                  <div className="flex flex-col">
                    <button
                      id="mobile-services-toggle"
                      onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
                      className="flex items-center justify-between font-display text-lg font-bold hover:text-brand-blue transition-colors py-1 text-left cursor-pointer"
                    >
                      Services
                      <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpanded === "services" ? "rotate-180" : ""}`} />
                    </button>
                    {mobileExpanded === "services" && (
                      <div className="pl-4 mt-2 flex flex-col gap-3 border-l border-brand-navy/10">
                        {serviceCategories.map((cat) => (
                          <div key={cat.title} className="flex flex-col gap-1.5 mt-2">
                            <span className="font-display text-[10px] font-bold text-brand-blue/80 tracking-wider">
                              {cat.title}
                            </span>
                            {cat.items.map((item) => (
                              <Link
                                key={item.name}
                                to={item.path}
                                className="font-sans text-[14px] text-brand-navy/85 hover:text-brand-blue block py-0.5"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mobile Solutions Accordion */}
                  <div className="flex flex-col">
                    <button
                      id="mobile-solutions-toggle"
                      onClick={() => setMobileExpanded(mobileExpanded === "solutions" ? null : "solutions")}
                      className="flex items-center justify-between font-display text-lg font-bold hover:text-brand-blue transition-colors py-1 text-left cursor-pointer"
                    >
                      Solutions
                      <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpanded === "solutions" ? "rotate-180" : ""}`} />
                    </button>
                    {mobileExpanded === "solutions" && (
                      <div className="pl-4 mt-2 flex flex-col gap-2 border-l border-brand-navy/10">
                        {solutionsList.map((sol) => (
                          <Link
                            key={sol.name}
                            to={`${sol.path}#${sol.hash}`}
                            className="font-sans text-[14px] text-brand-navy/85 hover:text-brand-blue block py-1"
                          >
                            {sol.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    to="/projects"
                    className="font-display text-lg font-bold hover:text-brand-blue transition-colors py-1"
                  >
                    Projects
                  </Link>

                  <Link
                    to="/about"
                    className="font-display text-lg font-bold hover:text-brand-blue transition-colors py-1"
                  >
                    About
                  </Link>

                  <Link
                    to="/insights"
                    className="font-display text-lg font-bold hover:text-brand-blue transition-colors py-1"
                  >
                    Insights
                  </Link>

                  <Link
                    to="/contact"
                    className="font-display text-lg font-bold hover:text-brand-blue transition-colors py-1"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Mobile CTA */}
              <div id="mobile-cta-wrapper" className="mt-8 flex flex-col gap-4 border-t border-brand-navy/5 pt-6">
                <Button id="mobile-start-project-btn" variant="primary" to="/start-a-project" className="w-full">
                  Start a Project
                </Button>
                <div className="text-center text-xs text-brand-gray font-sans mt-2">
                  Creating What's Next...
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
