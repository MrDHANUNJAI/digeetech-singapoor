import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Globe,
  Cpu,
  Briefcase,
  TrendingUp,
  Palette,
  ArrowRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  Users,
  ShieldCheck,
  Zap,
  Calculator,
  Compass,
  FileText,
  HelpCircle,
  Building2,
  CheckCircle2,
  Code2,
  Smartphone,
  Cloud,
  Server,
  Layout,
  BarChart4,
  Radio,
  FileSignature,
  CreditCard,
  Layers,
  Lock,
  PhoneCall,
  ShoppingBag,
  HeartPulse,
  Truck,
  Landmark,
  GraduationCap as SchoolIcon,
  Search,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type DropdownKey = "about" | "services" | "solutions" | "industries" | "digital" | "projects" | "resources" | null;

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [location.pathname, location.hash]);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Escape key to close dropdown
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Safe hover trigger with delay bridge to prevent accidental closing
  const handleMouseEnter = (menu: DropdownKey) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const isRouteActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Nav Data Definitions
  const aboutMenuItems = [
    { title: "Company Overview", path: "/about", desc: "Discover Digee Tech Singapore's digital engineering ethos and vision.", icon: <Building2 className="w-4 h-4 text-brand-blue" /> },
    { title: "Our Story & Values", path: "/about#story", desc: "How we grew into Singapore's trusted technology partner.", icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { title: "Mission & Vision", path: "/about#mission", desc: "Empowering businesses through scalable, secure digital technology.", icon: <Zap className="w-4 h-4 text-cyan-600" /> },
    { title: "Leadership Team", path: "/about#leadership", desc: "Meet our architects, AI researchers, and engineering leads.", icon: <Users className="w-4 h-4 text-indigo-600" /> },
    { title: "Why Choose Us", path: "/about#why-us", desc: "Fixed SGD quotes, 100% IP ownership, and zero technical debt.", icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
    { title: "Careers & Openings", path: "/careers", desc: "Join our fast-growing engineering team in Singapore.", icon: <Briefcase className="w-4 h-4 text-purple-600" /> }
  ];

  const servicesMegaCategories = [
    {
      group: "Core Software & Mobile",
      items: [
        { name: "Web Application Development", path: "/services/web-development", desc: "React, Next.js, and high-speed web apps.", icon: <Code2 className="w-4 h-4 text-brand-blue" />, badge: "Popular" },
        { name: "Mobile App Development", path: "/services/app-development", desc: "iOS, Android, and Flutter cross-platform apps.", icon: <Smartphone className="w-4 h-4 text-cyan-600" /> },
        { name: "Custom Software & SaaS", path: "/services/saas", desc: "Multi-tenant cloud platforms built to scale.", icon: <Server className="w-4 h-4 text-indigo-600" /> },
        { name: "UI/UX & Product Design", path: "/services/ui-ux", desc: "Conversion-focused user experiences & design systems.", icon: <Palette className="w-4 h-4 text-amber-500" /> },
      ]
    },
    {
      group: "AI, Cloud & Security",
      items: [
        { name: "AI Agents & Automation", path: "/services/ai-agents", desc: "Autonomous bots, RAG pipelines & document parsing.", icon: <Sparkles className="w-4 h-4 text-purple-600" />, badge: "AI Ready" },
        { name: "Cloud & DevOps Architecture", path: "/services/cloud-services", desc: "Cloud Run, Kubernetes & automated CI/CD.", icon: <Cloud className="w-4 h-4 text-sky-600" /> },
        { name: "Cybersecurity & Audits", path: "/services/cybersecurity-services", desc: "Vulnerability audits & Singapore PDPA compliance.", icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
        { name: "Data Analytics & BI", path: "/services/data-analytics", desc: "Executive dashboards and telemetry pipelines.", icon: <BarChart4 className="w-4 h-4 text-rose-500" /> },
      ]
    },
    {
      group: "Growth & Business Systems",
      items: [
        { name: "Custom CRM & ERP Portals", path: "/services/crm", desc: "Unified operational portals with zero license bloat.", icon: <Layers className="w-4 h-4 text-brand-blue" /> },
        { name: "Digital Marketing & SEO", path: "/services/digital-marketing", desc: "Local Singapore SEO and performance ads.", icon: <TrendingUp className="w-4 h-4 text-emerald-600" /> },
        { name: "IT Support & Consulting", path: "/services/it-consulting", desc: "Strategic technology advisory for Singapore SMEs.", icon: <HelpCircle className="w-4 h-4 text-amber-600" /> },
        { name: "Explore All 100+ Services", path: "/services", desc: "Browse our comprehensive digital solutions catalog.", icon: <ArrowRight className="w-4 h-4 text-brand-blue" />, highlight: true }
      ]
    }
  ];

  const solutionsMegaCategories = [
    {
      group: "Enterprise & Operations",
      items: [
        { name: "Business Process Automation & RPA", path: "/solutions#business-automation", desc: "Eliminate repetitive tasks and human data entry.", icon: <Zap className="w-4 h-4 text-amber-500" /> },
        { name: "Custom CRM & Sales Pipeline", path: "/solutions#crm", desc: "Manage leads, automated quotes, and deals.", icon: <Users className="w-4 h-4 text-brand-blue" /> },
        { name: "Enterprise ERP & HRMS", path: "/solutions#erp", desc: "Payroll, Singapore GST invoicing & staff roster.", icon: <Building2 className="w-4 h-4 text-indigo-600" /> },
        { name: "POS & Multi-Outlet Inventory", path: "/solutions#pos", desc: "PayNow barcode billing and real-time stock sync.", icon: <ShoppingBag className="w-4 h-4 text-emerald-600" /> }
      ]
    },
    {
      group: "Industry-Specific Portals",
      items: [
        { name: "Healthcare & Telehealth Portals", path: "/solutions#healthcare", desc: "Doctor appointments, EHR & PDPA privacy.", icon: <HeartPulse className="w-4 h-4 text-rose-500" /> },
        { name: "Logistics & Fleet Dispatching", path: "/solutions#logistics", desc: "Live GPS container tracking & automated e-BOL.", icon: <Truck className="w-4 h-4 text-cyan-600" /> },
        { name: "Real Estate & Property Portals", path: "/solutions#real-estate", desc: "Automated WhatsApp lead response & listings.", icon: <Landmark className="w-4 h-4 text-amber-600" /> },
        { name: "School & Learning Management", path: "/solutions#education", desc: "Student portals, automated grading & fees.", icon: <SchoolIcon className="w-4 h-4 text-purple-600" /> }
      ]
    },
    {
      group: "Smart Systems & Digital",
      items: [
        { name: "Customer & Employee Portals", path: "/solutions#portals", desc: "Self-service client hubs and staff workspaces.", icon: <Layout className="w-4 h-4 text-brand-blue" /> },
        { name: "Executive Admin Dashboards", path: "/solutions#dashboards", desc: "Real-time revenue, KPI and visitor metrics.", icon: <BarChart4 className="w-4 h-4 text-indigo-600" /> },
        { name: "Industrial IoT & Remote Telemetry", path: "/solutions#iot", desc: "Sensor data acquisition and live alerts.", icon: <Radio className="w-4 h-4 text-emerald-600" /> },
        { name: "View All Custom Solutions", path: "/solutions", desc: "Tailored software built for Singapore businesses.", icon: <ArrowRight className="w-4 h-4 text-brand-blue" />, highlight: true }
      ]
    }
  ];

  const industriesList = [
    { name: "Startups & High-Growth Scaleups", path: "/industries#startups", icon: <Zap className="w-4 h-4 text-amber-500" /> },
    { name: "Singapore SMEs & Family Businesses", path: "/industries#smes", icon: <Building2 className="w-4 h-4 text-brand-blue" /> },
    { name: "E-Commerce, Retail & F&B Outlets", path: "/industries#retail", icon: <ShoppingBag className="w-4 h-4 text-emerald-600" /> },
    { name: "Healthcare, Clinics & MedTech", path: "/industries#healthcare", icon: <HeartPulse className="w-4 h-4 text-rose-500" /> },
    { name: "Logistics, Supply Chain & Freight", path: "/industries#logistics", icon: <Truck className="w-4 h-4 text-cyan-600" /> },
    { name: "Finance, Wealth & Accounting", path: "/industries#finance", icon: <Landmark className="w-4 h-4 text-indigo-600" /> },
    { name: "Real Estate & Construction", path: "/industries#realestate", icon: <Layers className="w-4 h-4 text-amber-600" /> },
    { name: "Education, Universities & Training", path: "/industries#education", icon: <SchoolIcon className="w-4 h-4 text-purple-600" /> }
  ];

  const digitalSolutionsList = [
    { title: "Autonomous AI Agents", desc: "24/7 self-reasoning customer and internal task bots.", path: "/services/ai-agents", icon: <Sparkles className="w-4 h-4 text-purple-600" /> },
    { title: "Workflow Automation & RPA", desc: "Seamless Zapier/Make/Custom code connectors.", path: "/solutions#business-automation", icon: <Zap className="w-4 h-4 text-amber-500" /> },
    { title: "Document & Invoice AI", desc: "Automated OCR extraction for receipts and PDF contracts.", path: "/solutions#document-ai", icon: <FileText className="w-4 h-4 text-cyan-600" /> },
    { title: "Business Intelligence & BI", desc: "Unified dashboards connecting Xero, Stripe, and CRM.", path: "/services/data-analytics", icon: <BarChart4 className="w-4 h-4 text-emerald-600" /> },
    { title: "Smart IoT Monitoring", desc: "Device telemetry, sensor alarms, and live diagnostics.", path: "/solutions#iot", icon: <Radio className="w-4 h-4 text-indigo-600" /> },
    { title: "Cloud Transformation & DevOps", desc: "Zero-downtime microservices and automated CI/CD.", path: "/services/cloud-services", icon: <Cloud className="w-4 h-4 text-brand-blue" /> }
  ];

  const projectsMenuItems = [
    { title: "All Client Projects & Case Studies", path: "/projects", desc: "Explore our real Singapore and regional client deliveries.", icon: <Briefcase className="w-4 h-4 text-brand-blue" /> },
    { title: "Web & SaaS Platforms", path: "/projects#web", desc: "High-concurrency portals and modern web apps.", icon: <Code2 className="w-4 h-4 text-cyan-600" /> },
    { title: "Mobile Applications", path: "/projects#mobile", desc: "App Store & Google Play production builds.", icon: <Smartphone className="w-4 h-4 text-indigo-600" /> },
    { title: "AI & Automation Case Studies", path: "/projects#ai", desc: "Measurable ROI, labor hour savings, and efficiency.", icon: <Sparkles className="w-4 h-4 text-purple-600" /> },
    { title: "Client Testimonials & CSAT", path: "/about#testimonials", desc: "99.8% satisfaction rating across 1,000+ engagements.", icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> }
  ];

  const resourcesMenuItems = [
    {
      group: "Knowledge & Research",
      items: [
        { name: "Tech Insights & Blog", path: "/insights", desc: "Guides on AI agents, SaaS scaling, and local SEO.", icon: <FileText className="w-4 h-4 text-emerald-600" /> },
        { name: "Research & Technical Papers", path: "/research", desc: "Academic paper structuring and documentation advisory.", icon: <BookOpen className="w-4 h-4 text-brand-blue" />, badge: "From S$100+" },
        { name: "Practical Tech Workshops", path: "/workshops", desc: "Corporate and developer masterclasses.", icon: <Users className="w-4 h-4 text-cyan-600" /> },
        { name: "Engineering Internships", path: "/internships", desc: "Hands-on project mentorship for students.", icon: <GraduationCap className="w-4 h-4 text-indigo-600" /> }
      ]
    },
    {
      group: "Verification & Tools",
      items: [
        { name: "Official Certificate Verification", path: "/verify-certificate", desc: "Validate authenticity of Digee Tech credentials.", icon: <Award className="w-4 h-4 text-amber-500" />, badge: "Live Registry" },
        { name: "Project Scope Estimator", path: "/start-a-project", desc: "Calculate your Singapore Dollar quote in 60s.", icon: <Calculator className="w-4 h-4 text-brand-blue" /> },
        { name: "Smart Service Finder", path: "/#service-finder", desc: "Interactive 3-question solution finder.", icon: <Compass className="w-4 h-4 text-emerald-600" /> },
        { name: "FAQ & Help Center", path: "/about#faq", desc: "Contracts, IP rights, warranties & SLA terms.", icon: <HelpCircle className="w-4 h-4 text-indigo-600" /> }
      ]
    }
  ];

  return (
    <header
      id="main-navigation-header"
      ref={navContainerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md border-b border-brand-navy/10 py-2.5" : "bg-white border-b border-brand-navy/8 py-3.5"
      }`}
    >
      {/* Top Announcement Bar for Singapore Clients */}
      <div className="bg-brand-navy text-white text-[11px] py-1 px-4 text-center font-medium hidden lg:flex items-center justify-between border-b border-white/10 -mt-3.5 mb-2">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <span className="flex items-center gap-1.5 truncate">
            <span className="bg-brand-blue px-2 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider">Singapore HQ</span>
            <span className="text-white/90">🇸🇬 Digital Technology & Business Solutions Partner • Fixed SGD Quotes • 100% IP Ownership</span>
          </span>
          <div className="flex items-center gap-4 text-white/80 shrink-0">
            <span className="flex items-center gap-1"><PhoneCall className="w-3 h-3 text-brand-blue" /> +65 6980 3411</span>
            <Link to="/verify-certificate" className="text-brand-blue-light hover:underline flex items-center gap-1">
              <Award className="w-3 h-3" /> Verify Certificate
            </Link>
            <Link to="/admin/login" className="text-white/60 hover:text-white flex items-center gap-1 text-[10px]">
              <Lock className="w-2.5 h-2.5" /> Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo Branding */}
          <Logo id="nav-brand-logo" className="shrink-0" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-xs font-semibold text-brand-navy">
            
            {/* 1. HOME */}
            <Link
              id="nav-link-home"
              to="/"
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                isRouteActive("/") && location.pathname === "/" ? "text-brand-blue bg-brand-blue/10 font-bold" : "hover:text-brand-blue hover:bg-brand-navy/5"
              }`}
            >
              Home
            </Link>

            {/* 2. ABOUT */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-btn-about"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeDropdown === "about" || isRouteActive("/about") || isRouteActive("/careers")
                    ? "text-brand-blue bg-brand-blue/10 font-bold"
                    : "hover:text-brand-blue hover:bg-brand-navy/5"
                }`}
                aria-expanded={activeDropdown === "about"}
              >
                About
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === "about" ? "rotate-180 text-brand-blue" : "text-brand-gray"}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-2xl p-2.5 shadow-xl border border-brand-navy/10 z-50"
                  >
                    <div className="px-2 py-1 border-b border-brand-navy/5 mb-1 flex items-center justify-between">
                      <span className="font-display text-[10px] font-bold text-brand-blue uppercase tracking-wider">About Digee Tech</span>
                    </div>
                    {aboutMenuItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.path}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-brand-blue/5 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-brand-blue/10 shrink-0 mt-0.5 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <span className="font-display text-xs font-bold text-brand-navy group-hover:text-brand-blue transition-colors block">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-brand-gray leading-tight block mt-0.5 line-clamp-1">
                            {item.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. SERVICES (MEGA MENU) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-btn-services"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeDropdown === "services" || isRouteActive("/services")
                    ? "text-brand-blue bg-brand-blue/10 font-bold"
                    : "hover:text-brand-blue hover:bg-brand-navy/5"
                }`}
                aria-expanded={activeDropdown === "services"}
              >
                Services
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180 text-brand-blue" : "text-brand-gray"}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="fixed left-1/2 -translate-x-1/2 top-[88px] w-[960px] max-w-[95vw] bg-white rounded-3xl p-6 shadow-2xl border border-brand-navy/10 z-50 grid grid-cols-3 gap-6"
                  >
                    {servicesMegaCategories.map((cat) => (
                      <div key={cat.group} className="flex flex-col space-y-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue px-2 pb-1 border-b border-brand-navy/5">
                          {cat.group}
                        </span>
                        {cat.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-start gap-2.5 p-2 rounded-xl transition-all group ${
                              "highlight" in item && item.highlight ? "bg-brand-blue/10 hover:bg-brand-blue hover:text-white text-brand-blue font-bold mt-1" : "hover:bg-brand-navy/5"
                            }`}
                          >
                            <div className="p-1.5 rounded-lg bg-brand-blue/10 shrink-0 mt-0.5 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                              {item.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-display text-xs font-bold text-brand-navy group-hover:text-brand-blue transition-colors truncate">
                                  {item.name}
                                </span>
                                {"badge" in item && item.badge && (
                                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-brand-gray leading-tight block mt-0.5 line-clamp-1">
                                {item.desc}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. SOLUTIONS (MEGA MENU) */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("solutions")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-btn-solutions"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeDropdown === "solutions" || isRouteActive("/solutions")
                    ? "text-brand-blue bg-brand-blue/10 font-bold"
                    : "hover:text-brand-blue hover:bg-brand-navy/5"
                }`}
                aria-expanded={activeDropdown === "solutions"}
              >
                Solutions
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180 text-brand-blue" : "text-brand-gray"}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "solutions" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="fixed left-1/2 -translate-x-1/2 top-[88px] w-[960px] max-w-[95vw] bg-white rounded-3xl p-6 shadow-2xl border border-brand-navy/10 z-50 grid grid-cols-3 gap-6"
                  >
                    {solutionsMegaCategories.map((cat) => (
                      <div key={cat.group} className="flex flex-col space-y-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue px-2 pb-1 border-b border-brand-navy/5">
                          {cat.group}
                        </span>
                        {cat.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-start gap-2.5 p-2 rounded-xl transition-all group ${
                              "highlight" in item && item.highlight ? "bg-brand-blue/10 hover:bg-brand-blue hover:text-white text-brand-blue font-bold mt-1" : "hover:bg-brand-navy/5"
                            }`}
                          >
                            <div className="p-1.5 rounded-lg bg-brand-blue/10 shrink-0 mt-0.5 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                              {item.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="font-display text-xs font-bold text-brand-navy group-hover:text-brand-blue transition-colors block truncate">
                                {item.name}
                              </span>
                              <span className="text-[10px] text-brand-gray leading-tight block mt-0.5 line-clamp-1">
                                {item.desc}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 5. INDUSTRIES */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("industries")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-btn-industries"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeDropdown === "industries" || isRouteActive("/industries")
                    ? "text-brand-blue bg-brand-blue/10 font-bold"
                    : "hover:text-brand-blue hover:bg-brand-navy/5"
                }`}
                aria-expanded={activeDropdown === "industries"}
              >
                Industries
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === "industries" ? "rotate-180 text-brand-blue" : "text-brand-gray"}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "industries" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1.5 w-80 bg-white rounded-2xl p-3 shadow-xl border border-brand-navy/10 z-50"
                  >
                    <div className="px-2 py-1 border-b border-brand-navy/5 mb-1">
                      <span className="font-display text-[10px] font-bold text-brand-blue uppercase tracking-wider">Sectors We Empower</span>
                    </div>
                    <div className="space-y-1">
                      {industriesList.map((ind) => (
                        <Link
                          key={ind.name}
                          to={ind.path}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-brand-blue/5 transition-colors group"
                        >
                          <div className="p-1 rounded bg-brand-blue/10 text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white">
                            {ind.icon}
                          </div>
                          <span className="font-display text-xs font-semibold text-brand-navy group-hover:text-brand-blue transition-colors">
                            {ind.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 6. DIGITAL SOLUTIONS */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("digital")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-btn-digital"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeDropdown === "digital"
                    ? "text-brand-blue bg-brand-blue/10 font-bold"
                    : "hover:text-brand-blue hover:bg-brand-navy/5"
                }`}
                aria-expanded={activeDropdown === "digital"}
              >
                Digital Solutions
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === "digital" ? "rotate-180 text-brand-blue" : "text-brand-gray"}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "digital" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1.5 w-80 bg-white rounded-2xl p-3 shadow-xl border border-brand-navy/10 z-50"
                  >
                    <div className="px-2 py-1 border-b border-brand-navy/5 mb-1.5 flex items-center justify-between">
                      <span className="font-display text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                        Next-Gen Automation
                      </span>
                    </div>
                    {digitalSolutionsList.map((item) => (
                      <Link
                        key={item.title}
                        to={item.path}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-brand-blue/5 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 shrink-0 mt-0.5 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <span className="font-display text-xs font-bold text-brand-navy group-hover:text-brand-blue transition-colors block">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-brand-gray leading-tight block mt-0.5 line-clamp-1">
                            {item.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 7. PROJECTS / PORTFOLIO */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("projects")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-btn-projects"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeDropdown === "projects" || isRouteActive("/projects") || isRouteActive("/portfolio")
                    ? "text-brand-blue bg-brand-blue/10 font-bold"
                    : "hover:text-brand-blue hover:bg-brand-navy/5"
                }`}
                aria-expanded={activeDropdown === "projects"}
              >
                Projects
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === "projects" ? "rotate-180 text-brand-blue" : "text-brand-gray"}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "projects" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1.5 w-76 bg-white rounded-2xl p-2.5 shadow-xl border border-brand-navy/10 z-50"
                  >
                    <div className="px-2 py-1 border-b border-brand-navy/5 mb-1">
                      <span className="font-display text-[10px] font-bold text-brand-blue uppercase tracking-wider">Client Showcase</span>
                    </div>
                    {projectsMenuItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.path}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-brand-blue/5 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-brand-blue/10 shrink-0 mt-0.5 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <span className="font-display text-xs font-bold text-brand-navy group-hover:text-brand-blue transition-colors block">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-brand-gray leading-tight block mt-0.5 line-clamp-1">
                            {item.desc}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 8. PRICING */}
            <Link
              id="nav-link-pricing"
              to="/pricing"
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                isRouteActive("/pricing") ? "text-brand-blue bg-brand-blue/10 font-bold" : "hover:text-brand-blue hover:bg-brand-navy/5"
              }`}
            >
              Pricing
            </Link>

            {/* 9. RESOURCES */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id="nav-btn-resources"
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeDropdown === "resources" || isRouteActive("/insights") || isRouteActive("/research") || isRouteActive("/workshops") || isRouteActive("/internships") || isRouteActive("/verify-certificate")
                    ? "text-brand-blue bg-brand-blue/10 font-bold"
                    : "hover:text-brand-blue hover:bg-brand-navy/5"
                }`}
                aria-expanded={activeDropdown === "resources"}
              >
                Resources
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180 text-brand-blue" : "text-brand-gray"}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "resources" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1.5 w-[560px] bg-white rounded-3xl p-5 shadow-2xl border border-brand-navy/10 z-50 grid grid-cols-2 gap-5"
                  >
                    {resourcesMenuItems.map((col) => (
                      <div key={col.group} className="space-y-1.5">
                        <span className="font-display text-[10px] font-bold text-brand-blue uppercase tracking-wider block mb-1 px-1">
                          {col.group}
                        </span>
                        {col.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-start gap-2 p-2 rounded-xl hover:bg-brand-blue/5 transition-colors group"
                          >
                            <div className="p-1.5 rounded-lg bg-brand-blue/10 shrink-0 mt-0.5 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                              {item.icon}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-display text-xs font-bold text-brand-navy group-hover:text-brand-blue transition-colors truncate">
                                  {item.name}
                                </span>
                                {"badge" in item && item.badge && (
                                  <span className="text-[9px] font-bold text-brand-blue bg-brand-blue/10 px-1.5 py-0.2 rounded shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-brand-gray leading-tight block mt-0.5 line-clamp-1">
                                {item.desc}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 10. CONTACT */}
            <Link
              id="nav-link-contact"
              to="/contact"
              className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                isRouteActive("/contact") ? "text-brand-blue bg-brand-blue/10 font-bold" : "hover:text-brand-blue hover:bg-brand-navy/5"
              }`}
            >
              Contact
            </Link>

          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              id="nav-btn-start-project"
              to="/start-a-project"
              className="bg-brand-blue text-white hover:bg-brand-blue-dark px-4 py-2 rounded-full font-display text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Get a Free Consultation</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/start-a-project"
              className="bg-brand-blue text-white px-3 py-1.5 rounded-full text-xs font-bold font-display"
            >
              Quote
            </Link>
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-brand-navy/5 text-brand-navy hover:text-brand-blue transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-brand-navy/10 bg-white/98 backdrop-blur-xl max-h-[85vh] overflow-y-auto px-4 py-5 shadow-2xl"
          >
            <div className="flex flex-col space-y-2">
              
              {/* Home */}
              <Link
                to="/"
                className="px-3 py-2.5 rounded-xl font-display text-sm font-bold text-brand-navy hover:bg-brand-blue/5"
              >
                Home
              </Link>

              {/* About Accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === "about" ? null : "about")}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-display text-sm font-bold text-brand-navy hover:bg-brand-blue/5"
                >
                  About Digee Tech
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "about" ? "rotate-180 text-brand-blue" : ""}`} />
                </button>
                {mobileExpanded === "about" && (
                  <div className="pl-4 pr-2 py-2 flex flex-col gap-2 border-l-2 border-brand-blue/20 ml-3 mt-1">
                    {aboutMenuItems.map((item) => (
                      <Link key={item.title} to={item.path} className="text-xs font-semibold text-brand-navy/80 hover:text-brand-blue py-1">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-display text-sm font-bold text-brand-navy hover:bg-brand-blue/5"
                >
                  Services Directory (100+)
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "services" ? "rotate-180 text-brand-blue" : ""}`} />
                </button>
                {mobileExpanded === "services" && (
                  <div className="pl-4 pr-2 py-2 flex flex-col gap-3 border-l-2 border-brand-blue/20 ml-3 mt-1">
                    {servicesMegaCategories.map((cat) => (
                      <div key={cat.group} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{cat.group}</span>
                        {cat.items.map((item) => (
                          <Link key={item.name} to={item.path} className="text-xs font-semibold text-brand-navy/80 hover:text-brand-blue py-0.5">
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Solutions Accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === "solutions" ? null : "solutions")}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-display text-sm font-bold text-brand-navy hover:bg-brand-blue/5"
                >
                  Business Solutions & ERP
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "solutions" ? "rotate-180 text-brand-blue" : ""}`} />
                </button>
                {mobileExpanded === "solutions" && (
                  <div className="pl-4 pr-2 py-2 flex flex-col gap-3 border-l-2 border-brand-blue/20 ml-3 mt-1">
                    {solutionsMegaCategories.map((cat) => (
                      <div key={cat.group} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{cat.group}</span>
                        {cat.items.map((item) => (
                          <Link key={item.name} to={item.path} className="text-xs font-semibold text-brand-navy/80 hover:text-brand-blue py-0.5">
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Industries */}
              <Link
                to="/industries"
                className="px-3 py-2.5 rounded-xl font-display text-sm font-bold text-brand-navy hover:bg-brand-blue/5"
              >
                Industries
              </Link>

              {/* Projects */}
              <Link
                to="/projects"
                className="px-3 py-2.5 rounded-xl font-display text-sm font-bold text-brand-navy hover:bg-brand-blue/5"
              >
                Projects & Portfolio
              </Link>

              {/* Pricing */}
              <Link
                to="/pricing"
                className="px-3 py-2.5 rounded-xl font-display text-sm font-bold text-brand-navy hover:bg-brand-blue/5"
              >
                Pricing (SGD Packages)
              </Link>

              {/* Resources Accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === "resources" ? null : "resources")}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-display text-sm font-bold text-brand-navy hover:bg-brand-blue/5"
                >
                  Resources & Verification
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "resources" ? "rotate-180 text-brand-blue" : ""}`} />
                </button>
                {mobileExpanded === "resources" && (
                  <div className="pl-4 pr-2 py-2 flex flex-col gap-3 border-l-2 border-brand-blue/20 ml-3 mt-1">
                    {resourcesMenuItems.map((col) => (
                      <div key={col.group} className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{col.group}</span>
                        {col.items.map((item) => (
                          <Link key={item.name} to={item.path} className="text-xs font-semibold text-brand-navy/80 hover:text-brand-blue py-0.5">
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact */}
              <Link
                to="/contact"
                className="px-3 py-2.5 rounded-xl font-display text-sm font-bold text-brand-navy hover:bg-brand-blue/5"
              >
                Contact Us
              </Link>

              {/* Verify Certificate */}
              <Link
                to="/verify-certificate"
                className="px-3 py-2.5 rounded-xl font-display text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Verify Official Certificate</span>
              </Link>

              {/* Admin Portal Link */}
              <Link
                to="/admin/login"
                className="px-3 py-2.5 rounded-xl font-display text-xs font-semibold text-brand-gray hover:text-brand-navy flex items-center gap-1.5 pt-2 border-t border-brand-navy/10"
              >
                <Lock className="w-3.5 h-3.5" /> Staff & Admin Portal
              </Link>

              <div className="pt-3">
                <Link
                  to="/start-a-project"
                  className="w-full text-center bg-brand-blue text-white py-3 rounded-2xl font-display text-sm font-bold shadow-md block"
                >
                  Get a Free Consultation (SGD)
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
