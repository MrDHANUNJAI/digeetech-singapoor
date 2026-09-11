import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { servicesData, projectsData } from "../data";
import { 
  Laptop, Phone, Cpu, Settings, Briefcase, BarChart, FileCode, CheckCircle, 
  ArrowRight, Zap, Database, Network, ChevronRight, MessageSquare, Award, ShieldCheck
} from "lucide-react";
import { motion } from "motion/react";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { SmartServiceFinder } from "../components/SmartServiceFinder";
import { ProjectEstimator } from "../components/ProjectEstimator";
import { LiveStatsSection } from "../components/LiveStatsSection";

// Page Assets
import homeHeroImg from "../assets/images/home_hero.jpg";
import servicesOverviewImg from "../assets/images/services_overview.jpg";
import techStackImg from "../assets/images/tech_stack.jpg";
import aiAgentsImg from "../assets/images/ai_agents_tech.jpg";
import projectsShowcaseImg from "../assets/images/projects_showcase.jpg";

// 3D Interactive & Scroll Animation Components
import { Card3D } from "../components/3d/Card3D";
import { ScrollReveal3D } from "../components/3d/ScrollReveal3D";
import { Floating3DBackground } from "../components/3d/Floating3DBackground";

export const Home: React.FC = () => {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(1);

  const capabilities = [
    { title: "Digital Presence", desc: "Elite visual identities and high-performance business corporate websites optimized for serious brand authority.", icon: <Laptop className="w-5 h-5 text-brand-blue" /> },
    { title: "Software Development", desc: "Robust custom web apps, mobile apps, and multi-tenant SaaS products built with strict TypeScript code.", icon: <FileCode className="w-5 h-5 text-brand-blue" /> },
    { title: "AI Integrations", desc: "Intelligent cognitive reasoning systems, semantic search retrieval, and custom generative prompt loops.", icon: <Cpu className="w-5 h-5 text-brand-blue" /> },
    { title: "Operations Automation", desc: "Replacing tedious background manual spreadsheet entries with robust custom automation scripts.", icon: <Zap className="w-5 h-5 text-brand-blue" /> },
    { title: "Business Systems", desc: "Centralized tailored CRMs and ERP software ledgers that perfectly align with your current team workflows.", icon: <Briefcase className="w-5 h-5 text-brand-blue" /> },
    { title: "Digital Growth", desc: "Data-backed technical SEO site architecture and high-conversion Meta/Google advertising campaign setups.", icon: <BarChart className="w-5 h-5 text-brand-blue" /> }
  ];

  const serviceCategories = [
    {
      title: "Digital Development",
      desc: "Pixel-perfect websites, responsive mobile apps, and robust SaaS architectures built to scale on secure cloud runtimes.",
      list: ["Website Development", "App Development", "SaaS Platforms", "Custom Software"],
      link: "/services/web-development",
      icon: <Laptop className="w-6 h-6 text-brand-blue" />
    },
    {
      title: "AI & Automation",
      desc: "Intelligent cognitive agents, semantic retrieval indexers, prompt engines, and silent background data workers.",
      list: ["AI Agents", "AI Generative Tools", "API Workflows", "Custom Automations"],
      link: "/services/ai-agents",
      icon: <Cpu className="w-6 h-6 text-brand-blue" />
    },
    {
      title: "Business Systems",
      desc: "Integrated operational interfaces, central ledgers, and secure databases engineered for supreme internal efficiency.",
      list: ["Custom CRM Systems", "Tailored ERP Systems", "Management Portals", "Task Automations"],
      link: "/services/crm",
      icon: <Briefcase className="w-6 h-6 text-brand-blue" />
    },
    {
      title: "Digital Growth",
      desc: "Topical SEO directory structure mapping and performance marketing lead funnels engineered for acquisition efficiency.",
      list: ["Search Optimization", "Meta Campaigns", "Lead Funnels", "Growth Strategy"],
      link: "/services/digital-marketing",
      icon: <BarChart className="w-6 h-6 text-brand-blue" />
    }
  ];

  const featuredServices = [
    { title: "Website Development", desc: "High-performance custom corporate web platforms optimized for fast speed indexes, semantic layout, and clear search indexing.", link: "/services/web-development", icon: <Laptop /> },
    { title: "App Development", desc: "Native & hybrid mobile applications crafted with seamless view transitions and robust offline-first local data caching.", link: "/services/app-development", icon: <Phone /> },
    { title: "AI Agent Development", desc: "Custom cognitive agents capable of analyzing customer intent, calling secure APIs, and executing back-end workflows.", link: "/services/ai-agents", icon: <Cpu /> },
    { title: "SaaS Development", desc: "End-to-end multi-tenant subscription software engineering with secure JWT authentication, team workspaces, and billing.", link: "/services/saas", icon: <FileCode /> },
    { title: "CRM Solutions", desc: "Tailormade customer management dashboards and lead tracking channels without expensive recurring monthly per-user fees.", link: "/services/crm", icon: <Briefcase /> },
    { title: "Business Automation", desc: "Robust API sync workers and automatic background bridges that completely eliminate manual entry errors.", link: "/services/automation", icon: <Zap /> }
  ];

  const aiWorkflow = [
    { id: 1, label: "Business Requirement", detail: "Customer submits an inquiry regarding the live status of shipping dispatch #4029." },
    { id: 2, label: "AI Agent Cognitive Loop", detail: "LLM analyzes natural text, parses intent parameters, and designs an autonomous resolution plan." },
    { id: 3, label: "Reasoning & Plan", detail: "Determines it must fetch shipping data from the company's internal carrier API gateway." },
    { id: 4, label: "API & Tool Calling", detail: "Triggers the secure API tool with the verified dispatch tracking ID parameters." },
    { id: 5, label: "CRM / Database Lookup", detail: "Retrieves dispatch date, current carrier coordinates, and Estimated Time of Arrival." },
    { id: 6, label: "Execution & Response", detail: "Formulates a friendly email response, logs the record in the CRM system, and flags the staff dashboard." }
  ];

  const timeline = [
    { num: "01", name: "Discover", desc: "We conduct exhaustive workshops to map out your user journeys and core system goals." },
    { num: "02", name: "Strategize", desc: "We model the database layout, technical stack blueprints, and compile a clear Scope of Work." },
    { num: "03", name: "Design", desc: "We design clean, high-fidelity responsive interface layouts and wireframe flow maps in Figma." },
    { num: "04", name: "Build", desc: "Our engineering squad writes pristine, modular, fully commented TypeScript code." },
    { num: "05", name: "Test", desc: "We run rigid technical SEO checks, database transaction audits, and cross-browser responsiveness tests." },
    { num: "06", name: "Launch", desc: "We deploy the compiled code securely into fast, containerized cloud instances on Google Cloud." },
    { num: "07", name: "Grow", desc: "We optimize continuous search positioning and provide continuous system maintenance support." }
  ];

  const techCategories = [
    { title: "Frontend Frameworks", techs: ["React", "TypeScript", "Next.js", "Vite", "Tailwind CSS"] },
    { title: "Backend Systems", techs: ["Node.js", "Express", "Python", "FastAPI", "Go Lang"] },
    { title: "Mobile Technologies", techs: ["React Native", "Flutter", "Swift (iOS)", "Kotlin (Android)"] },
    { title: "AI Integrations", techs: ["@google/genai", "Gemini Models", "Vector Databases", "LangChain"] },
    { title: "Database Systems", techs: ["PostgreSQL", "MongoDB", "Firestore", "Prisma", "Drizzle"] },
    { title: "Cloud Deployment", techs: ["Google Cloud", "Docker Containers", "Cloud Run", "CI/CD Actions"] }
  ];

  const whyDigeeTech = [
    { title: "Elite Engineering Standards", desc: "We do not use bloated templates. Every system is custom-written in modern, secure TypeScript for long-term maintainability.", icon: <FileCode className="text-brand-blue" /> },
    { title: "Transparent Blueprinting", desc: "No opaque promises. You receive precise visual templates in Figma and clear technical mapping before a single line of code is produced.", icon: <Settings className="text-brand-blue" /> },
    { title: "AI-First Architectures", desc: "We design with modern cognitive workflows in mind, creating database schemas and API endpoints ready for seamless AI interactions.", icon: <Cpu className="text-brand-blue" /> },
    { title: "No Recurring Per-User Licensing", desc: "We build systems you own. Enjoy bespoke CRM and ERP dashboards without paying expensive per-seat monthly subscription taxes.", icon: <Award className="text-brand-blue" /> }
  ];

  return (
    <div id="home-page" className="w-full relative overflow-x-hidden pt-20 bg-white text-brand-navy">
      
      {/* 3D Ambient Particles Canvas Background */}
      <Floating3DBackground />

      {/* Premium Hero Background Grid */}
      <div id="hero-backdrop" className="absolute top-0 left-0 w-full h-[950px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/10 via-white to-transparent -z-10" />
      
      {/* 1. HERO SECTION */}
      <section id="hero-section" className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 lg:pt-32 pb-24 flex flex-col items-center text-center relative z-10">
        <ScrollReveal3D direction="up" className="flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 rounded-full px-4 py-1.5 text-xs text-brand-blue font-display font-bold tracking-wide shadow-sm">
            <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-ping" />
            Engineering Intelligent Digital Futures
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-brand-navy">
            Creating What's <span className="text-gradient-blue">Next...</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-brand-gray leading-relaxed max-w-2xl mx-auto">
            We build high-performance custom software, secure internal business tools, intelligent AI agents, and technical acquisition funnels to propel enterprises forward.
          </p>
          <div className="font-display text-xs text-brand-blue font-bold tracking-wider uppercase border-t border-brand-navy/10 pt-4 w-full max-w-xl mx-auto">
            Websites • Apps • AI Agents • SaaS • CRM • ERP • Automations • SEO
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button id="hero-cta-start" variant="primary" size="lg" to="/start-a-project">
              Start a Project
            </Button>
            <Button id="hero-cta-explore" variant="outline" size="lg" to="/services">
              Explore Our Services
            </Button>
          </div>

          {/* Hero Feature Showcase Image */}
          <div className="w-full max-w-4xl mt-8 rounded-2xl overflow-hidden border border-brand-navy/10 shadow-2xl relative group">
            <img
              src={homeHeroImg}
              alt="Digee Tech Enterprise Software Ecosystem"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white text-xs font-display">
              <span className="bg-brand-blue/80 backdrop-blur-md px-3 py-1 rounded-full font-bold">
                Enterprise Cloud Architecture
              </span>
              <span className="hidden sm:inline font-mono opacity-90">
                Type-Safe • Autonomous • Scalable
              </span>
            </div>
          </div>
        </ScrollReveal3D>
      </section>

      {/* LIVE ANIMATED STATS & IMPACT SHOWCASE */}
      <LiveStatsSection />

      {/* 2. TRUST & VALUE CAPABILITIES */}
      <section id="trust-capabilities" className="bg-brand-white/40 py-24 border-y border-brand-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal3D direction="up">
            <SectionHeader
              id="capabilities-header"
              eyebrow="Capabilities Blueprint"
              title="One Technology Partner. Complete Systems Execution."
              description="We eliminate the friction of coordinating multiple agencies by delivering seamless integration across all business technology nodes."
              center
            />
          </ScrollReveal3D>
          <div id="capabilities-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => (
              <ScrollReveal3D key={cap.title} direction="up" delay={0.1 * idx}>
                <Card3D id={`cap-card-${idx}`} className="h-full">
                  <div className="p-8 rounded-3xl border border-brand-navy/5 bg-white flex flex-col h-full justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-6 text-brand-blue">
                        {cap.icon}
                      </div>
                      <h3 className="font-display text-lg font-bold text-brand-navy mb-3">
                        {cap.title}
                      </h3>
                      <p className="font-sans text-sm text-brand-gray leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                </Card3D>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMPREHENSIVE SERVICE CATEGORIES */}
      <section id="service-categories" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal3D direction="up">
            <SectionHeader
              id="categories-header-main"
              eyebrow="Solutions Blueprint"
              title="Everything You Need To Build Your Digital Future"
              description="We map custom software architectures, workflow integrations, and continuous growth channels to target your primary organizational goals."
            />
          </ScrollReveal3D>

          {/* Services Visual Showcase Banner */}
          <div className="my-8 rounded-3xl overflow-hidden border border-brand-navy/10 shadow-xl relative group">
            <img
              src={servicesOverviewImg}
              alt="Digee Tech Full-Stack Services Suite"
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/40 to-transparent flex items-center p-8">
              <div className="max-w-md text-white space-y-2">
                <span className="bg-brand-blue font-bold text-xs uppercase px-3 py-1 rounded-full text-white inline-block">
                  Custom Engineering & AI
                </span>
                <h3 className="font-display text-2xl font-bold">100+ Production-Ready Capabilities</h3>
                <p className="text-xs text-brand-gray-light leading-relaxed">
                  From high-conversion web apps to autonomous AI workflows, explore our end-to-end digital services.
                </p>
              </div>
            </div>
          </div>
          <div id="categories-grid-container" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {serviceCategories.map((cat, idx) => (
              <ScrollReveal3D key={cat.title} direction="up" delay={0.15 * idx}>
                <Card3D id={`cat-card-detailed-${idx}`} className="h-full">
                  <div className="p-8 rounded-3xl border border-brand-navy/5 bg-white flex flex-col md:flex-row gap-6 h-full justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0 text-brand-blue shadow-sm">
                      {cat.icon}
                    </div>
                    <div className="flex flex-col justify-between gap-6 grow">
                      <div className="flex flex-col gap-3">
                        <h3 className="font-display text-xl font-bold text-brand-navy">{cat.title}</h3>
                        <p className="font-sans text-sm text-brand-gray leading-relaxed">{cat.desc}</p>
                        
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                          {cat.list.map((item) => (
                            <li key={item} className="flex items-center gap-1.5 text-xs text-brand-navy/80">
                              <CheckCircle className="w-3.5 h-3.5 text-brand-blue shrink-0 stroke-[2.5]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link
                        to={cat.link}
                        className="inline-flex items-center gap-1 font-display text-xs font-bold text-brand-blue hover:text-[#0070a6] transition-colors"
                      >
                        Explore Services <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </Card3D>
              </ScrollReveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SERVICE FINDER WIDGET SECTION */}
      <section id="interactive-finder-section" className="py-24 bg-brand-white/40 border-y border-brand-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
                Tailored Matching
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight text-brand-navy">
                Find the Perfect Tech Solution.
              </h2>
              <p className="font-sans text-base text-brand-gray leading-relaxed">
                Answer three simple operational questions and our interactive matching algorithm will immediately outline the precise service alignment that matches your organizational objectives.
              </p>
              <div className="flex flex-col gap-2 mt-4 border-l-2 border-brand-blue pl-4 py-1">
                <span className="font-sans text-xs text-brand-blue uppercase tracking-wider font-bold">Frictionless Discovery</span>
                <span className="font-display text-sm font-bold text-brand-navy">No email wall. Get instant layout match and recommended tech configurations.</span>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <SmartServiceFinder />
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY DIGEE TECH SECTION (Digital Ecosystem & Principles) */}
      <section id="why-digeetech-section" className="py-24 bg-brand-white/40 border-y border-brand-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            id="why-hdr"
            eyebrow="Our Engineering DNA"
            title="Why Serious Businesses Choose Digee Tech"
            description="We bridge the gap between pixel-perfect aesthetics and robust background database architectures to produce absolute scale."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyDigeeTech.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-brand-navy/5 bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-5 text-brand-blue">
                  {React.cloneElement(item.icon, { className: "w-5 h-5 text-brand-blue" })}
                </div>
                <h3 className="font-display text-base font-bold text-brand-navy mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-brand-gray leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROJECT ESTIMATOR WIDGET SECTION */}
      <section id="project-estimator-section" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
                Resource Architecting
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight text-brand-navy">
                Design Your System Scope.
              </h2>
              <p className="font-sans text-base text-brand-gray leading-relaxed">
                Estimate the necessary engineering timelines, developer staffing configurations, and core database platform recommendation based on your desired project scale and visual requirements.
              </p>
              <div className="flex flex-col gap-1.5 mt-2 bg-brand-white/30 border border-brand-navy/5 rounded-2xl p-4">
                <span className="font-display text-xs font-bold text-brand-navy">No Estimation Fluctuations</span>
                <span className="font-sans text-xs text-brand-gray">We focus on clean visual maps, robust TypeScript dependencies, and precise database ledgers for zero engineering drift.</span>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <ProjectEstimator />
            </div>
          </div>
        </div>
      </section>

      {/* 8. TARGET BUSINESS SOLUTIONS SECTIONS */}
      <section id="business-solutions" className="bg-brand-white/40 py-24 border-y border-brand-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            id="solutions-hdr"
            eyebrow="Lifecycle Packages"
            title="Tailored Solutions Packages"
            description="We bundle tailored digital technologies based on your organizational maturity and priority operations."
            center
          />
          <div id="solutions-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Startup card */}
            <div className="p-6 rounded-3xl border border-brand-navy/5 bg-white shadow-md flex flex-col justify-between min-h-[300px]">
              <div className="flex flex-col gap-4">
                <span className="font-display text-[10px] font-bold tracking-widest text-brand-blue uppercase">STARTUPS</span>
                <h3 className="font-display text-lg font-bold text-brand-navy">Visuals & Launch</h3>
                <ul className="flex flex-col gap-2 font-sans text-xs text-brand-gray border-t border-brand-navy/5 pt-3">
                  <li>• Custom Corporate Website</li>
                  <li>• High-Performance React MVP</li>
                  <li>• Complete Branding Assets</li>
                  <li>• Capturing Lead Pages</li>
                </ul>
              </div>
              <Button id="sol-cta-startup" variant="outline" size="sm" to="/solutions" className="mt-6 w-full">
                Get Startup Package
              </Button>
            </div>

            {/* Growing Business card */}
            <div className="p-6 rounded-3xl border border-brand-navy/5 bg-white shadow-md flex flex-col justify-between min-h-[300px]">
              <div className="flex flex-col gap-4">
                <span className="font-display text-[10px] font-bold tracking-widest text-brand-blue uppercase">GROWING BUSINESSES</span>
                <h3 className="font-display text-lg font-bold text-brand-navy">Unify & Control</h3>
                <ul className="flex flex-col gap-2 font-sans text-xs text-brand-gray border-t border-brand-navy/5 pt-3">
                  <li>• Tailor-Made CRM Dashboards</li>
                  <li>• Tailored ERP Ledger Tracking</li>
                  <li>• Secure Partner & Client Portals</li>
                  <li>• Automatic API Background Workers</li>
                </ul>
              </div>
              <Button id="sol-cta-growth" variant="outline" size="sm" to="/solutions" className="mt-6 w-full">
                Get Growth Suite
              </Button>
            </div>

            {/* AI Operations card */}
            <div className="p-6 rounded-3xl border border-brand-navy/5 bg-white shadow-md flex flex-col justify-between min-h-[300px]">
              <div className="flex flex-col gap-4">
                <span className="font-display text-[10px] font-bold tracking-widest text-brand-blue uppercase">AI-DRIVEN TEAMS</span>
                <h3 className="font-display text-lg font-bold text-brand-navy">Automate & Reason</h3>
                <ul className="flex flex-col gap-2 font-sans text-xs text-brand-gray border-t border-brand-navy/5 pt-3">
                  <li>• Autonomous AI Agent Loops</li>
                  <li>• PDF & Spreadsheet AI Parsers</li>
                  <li>• Custom LLM Integrations</li>
                  <li>• continuous Transaction Logs</li>
                </ul>
              </div>
              <Button id="sol-cta-ai" variant="outline" size="sm" to="/solutions" className="mt-6 w-full">
                Explore AI Solutions
              </Button>
            </div>

            {/* Marketers card */}
            <div className="p-6 rounded-3xl border border-brand-navy/5 bg-white shadow-md flex flex-col justify-between min-h-[300px]">
              <div className="flex flex-col gap-4">
                <span className="font-display text-[10px] font-bold tracking-widest text-brand-blue uppercase">BRANDS & MARKETERS</span>
                <h3 className="font-display text-lg font-bold text-brand-navy">Acquire & Scale</h3>
                <ul className="flex flex-col gap-2 font-sans text-xs text-brand-gray border-t border-brand-navy/5 pt-3">
                  <li>• Ultra-Fast Landing Pages</li>
                  <li>• High-Intent SEO Architectures</li>
                  <li>• Structured Paid Ad Funnels</li>
                  <li>• Bespoke Graphic UI Templates</li>
                </ul>
              </div>
              <Button id="sol-cta-brand" variant="outline" size="sm" to="/solutions" className="mt-6 w-full">
                Get Branding Package
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FEATURED CASE STUDIES / PROJECTS */}
      <section id="featured-projects" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <SectionHeader
              id="projects-feat-hdr"
              eyebrow="Case Studies"
              title="Recent Technical Solutions"
              description="Review select custom database, portal, and generative AI systems deployed securely for our clients."
            />
            <Button id="btn-see-all-projects" variant="outline" to="/projects" className="shrink-0">
              View All Case Studies <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <div
                key={project.slug}
                className="group flex flex-col bg-white rounded-3xl border border-brand-navy/5 overflow-hidden hover:border-brand-blue/30 transition-all duration-300 shadow-lg hover:-translate-y-1"
              >
                {/* Visual block representation */}
                <div className="h-44 bg-brand-white/40 border-b border-brand-navy/5 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute right-2 bottom-2 text-brand-navy/3 text-[90px] font-display font-black select-none uppercase">
                    {project.category.split(" ")[0]}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-brand-blue uppercase bg-white border border-brand-blue/15 rounded-full px-2.5 py-1 w-fit shadow-sm">
                    {project.category}
                  </span>
                  
                  {/* Decorative abstract lines */}
                  <div className="flex flex-col gap-2 opacity-30">
                    <div className="h-1 bg-brand-navy rounded w-1/2" />
                    <div className="h-1 bg-brand-navy rounded w-3/4" />
                    <div className="h-1 bg-brand-blue rounded w-2/3" />
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between grow gap-6">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-brand-gray leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="font-display text-xs font-bold text-brand-blue hover:text-[#0070a6] transition-colors inline-flex items-center gap-1 mt-2"
                  >
                    Read Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CLIENT TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* 11. PROCESS TIMELINE SECTION */}
      <section id="process-section" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            id="process-heading-main"
            eyebrow="Implementation Roadmap"
            title="From Idea to Scaled Deployment"
            description="Our structured, modular seven-step engineering framework guarantees zero operational waste, secure code, and perfect delivery."
            center
          />

          {/* Interactive timeline map */}
          <div id="process-timeline" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mt-12">
            {timeline.map((step) => (
              <div
                key={step.num}
                className="relative flex flex-col gap-4 p-5 rounded-2xl border border-brand-navy/5 bg-white hover:bg-brand-white/40 transition-all duration-300 group shadow-md"
              >
                <div className="font-display text-4xl font-extrabold text-brand-blue/15 group-hover:text-brand-blue transition-colors">
                  {step.num}
                </div>
                <h4 className="font-display text-sm font-bold text-brand-navy">
                  {step.name}
                </h4>
                <p className="font-sans text-xs text-brand-gray leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. DETAILED TECH STACK GRID */}
      <section id="home-tech-section" className="py-24 bg-brand-white/40 border-y border-brand-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            id="home-tech-hdr"
            eyebrow="Modern Stack"
            title="Performant Systems Ecosystem"
            description="We build exclusively with secure, modern, and universally trusted open-source technology standards to protect database integrity."
            center
          />
          <div id="tech-categories-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {techCategories.map((cat) => (
              <div
                key={cat.title}
                className="p-6 rounded-3xl border border-brand-navy/5 bg-white shadow-md hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300"
              >
                <h4 className="font-display text-xs font-bold text-brand-blue uppercase tracking-widest border-b border-brand-navy/5 pb-2.5 mb-4">
                  {cat.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.techs.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-sans text-brand-navy/80 bg-brand-white/60 border border-brand-navy/5 rounded-full px-3 py-1 hover:border-brand-blue hover:text-brand-blue transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FINAL CALL TO ACTION */}
      <section id="final-cta-section" className="py-24 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand-blue/10 via-white to-transparent border-t border-brand-navy/5">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-8">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue bg-brand-blue/10 rounded-full px-4 py-1">
            Let's Collaborate
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-brand-navy leading-tight">
            Have An Idea? Let's Build What's Next.
          </h2>
          <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed max-w-2xl">
            Tell us what you are building. Digee Tech solutions engineers will analyze your roadmap, plan database architectures, and draft proposals.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Button id="final-cta-btn-start" variant="primary" size="lg" to="/start-a-project">
              Start a Project
            </Button>
            <Button id="final-cta-btn-talk" variant="secondary" size="lg" to="/contact">
              Talk To Us
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};
