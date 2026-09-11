import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { servicesData } from "../data";
import { allServices, getServiceBySlug } from "../data/allServices";
import { ServiceItem } from "../data/servicesCatalog";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import {
  ChevronDown,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  ArrowLeft,
  Cpu,
  Laptop,
  Workflow,
  BarChart,
  Code2,
  Globe,
  Smartphone,
  Sparkles,
  Zap,
  Cloud,
  ShieldCheck,
  Server,
  Layout,
  TrendingUp,
  Palette,
  BarChart4,
  Radio,
  FileSignature,
  Presentation,
  CreditCard,
  Building,
  ArrowRight,
  Layers,
  Clock,
  Shield,
  Coins
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import servicesOverviewImg from "../assets/images/services_overview.jpg";
import techStackImg from "../assets/images/tech_stack.jpg";
import aiAgentsImg from "../assets/images/ai_agents_tech.jpg";

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!slug) {
    return <Navigate to="/services" replace />;
  }

  // 1. Check in modern 100+ services catalog
  const catalogService: ServiceItem | undefined = getServiceBySlug(slug);

  // 2. Check in legacy servicesData dictionary as fallback
  const legacyService = servicesData[slug];

  if (!catalogService && !legacyService) {
    return <Navigate to="/services" replace />;
  }

  // Standardize model fields
  const title = catalogService?.name || legacyService?.title || "";
  const tagline = catalogService?.tagline || legacyService?.tagline || "";
  const category = catalogService?.category || legacyService?.category || "Digital Solutions";
  const shortDescription = catalogService?.shortDescription || "";
  const description = catalogService?.description || legacyService?.description || "";
  const problem = catalogService?.problem || legacyService?.problem || "Legacy manual processes create operational bottlenecks, slow delivery cycles, and inconsistent outcomes.";
  const solution = catalogService?.solution || legacyService?.solution || "Digee Tech engineers a streamlined, modern software architecture custom-calibrated to eliminate friction.";
  const capabilities = catalogService?.features || legacyService?.capabilities || [];
  const benefits = catalogService?.benefits || legacyService?.benefits || [];
  const technologies = catalogService?.technologies || legacyService?.technology || ["TypeScript", "React", "Node.js", "Cloud Services"];
  const startingPrice = catalogService?.startingPrice || legacyService?.startingPrice || "Custom Quoted";
  const pricingNote = catalogService?.pricingNote || legacyService?.pricingNote;
  const industries = catalogService?.industries || [];
  const useCases = catalogService?.useCases || [];
  const faqs = catalogService?.faqs || legacyService?.faqs || [
    { question: "How quickly can Digee Tech begin implementation?", answer: "We initiate discovery, requirement mapping, and prototype architecture within 3 to 5 business days." },
    { question: "Do we retain full code and intellectual property ownership?", answer: "Yes. Upon project milestone sign-off, you receive 100% full intellectual property rights, repository access, and design assets." }
  ];

  // Default delivery framework steps if not present
  const defaultProcess = [
    { step: "01", title: "Discovery & Architecture", description: "Deep-dive mapping of business requirements, technical dependencies, user personas, and milestone deliverables." },
    { step: "02", title: "Prototyping & Specs", description: "Clickable Figma interface models, data schema definitions, and API contract validations before code is written." },
    { step: "03", title: "Agile Implementation", description: "Type-safe engineering sprints with weekly staging demo builds and continuous automated test verification." },
    { step: "04", title: "Deployment & Handover", description: "Zero-downtime cloud release, security hardening, staff walkthroughs, documentation, and warranty support." }
  ];

  const processSteps = legacyService?.process || defaultProcess;

  // Resolve related services
  const relatedServicesList: ServiceItem[] = (catalogService?.relatedServices || [])
    .map(relSlug => getServiceBySlug(relSlug))
    .filter((s): s is ServiceItem => Boolean(s));

  // If no explicit related services, fetch 3 other services from same category
  const fallbackRelated = catalogService 
    ? allServices.filter(s => s.categoryKey === catalogService.categoryKey && s.slug !== catalogService.slug).slice(0, 3)
    : allServices.slice(0, 3);

  const finalRelated = relatedServicesList.length > 0 ? relatedServicesList : fallbackRelated;

  const getCategoryIcon = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes("software") || c.includes("saas")) return <Code2 className="w-4 h-4 text-brand-blue" />;
    if (c.includes("web")) return <Globe className="w-4 h-4 text-brand-blue" />;
    if (c.includes("mobile") || c.includes("app")) return <Smartphone className="w-4 h-4 text-brand-blue" />;
    if (c.includes("ai") || c.includes("intelligence")) return <Sparkles className="w-4 h-4 text-cyan-600" />;
    if (c.includes("automation") || c.includes("rpa")) return <Zap className="w-4 h-4 text-amber-500" />;
    if (c.includes("cloud") || c.includes("devops")) return <Cloud className="w-4 h-4 text-sky-600" />;
    if (c.includes("cyber") || c.includes("security")) return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
    if (c.includes("it") || c.includes("infrastructure")) return <Server className="w-4 h-4 text-indigo-600" />;
    if (c.includes("design") || c.includes("ui")) return <Layout className="w-4 h-4 text-purple-600" />;
    if (c.includes("marketing") || c.includes("seo")) return <TrendingUp className="w-4 h-4 text-emerald-600" />;
    if (c.includes("branding") || c.includes("creative")) return <Palette className="w-4 h-4 text-pink-600" />;
    if (c.includes("data") || c.includes("bi")) return <BarChart4 className="w-4 h-4 text-blue-600" />;
    if (c.includes("iot") || c.includes("smart")) return <Radio className="w-4 h-4 text-orange-600" />;
    if (c.includes("research") || c.includes("documentation")) return <FileSignature className="w-4 h-4 text-brand-navy" />;
    if (c.includes("presentation") || c.includes("deck")) return <Presentation className="w-4 h-4 text-amber-600" />;
    if (c.includes("ecommerce") || c.includes("commerce")) return <CreditCard className="w-4 h-4 text-teal-600" />;
    return <Laptop className="w-4 h-4 text-brand-blue" />;
  };

  return (
    <div id={`service-detail-${slug}`} className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Dynamic Glow Accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-96 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB NAVIGATION */}
        <div className="flex items-center gap-2 text-xs text-brand-gray mb-8">
          <Link to="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-gray/50" />
          <Link to="/services" className="hover:text-brand-blue transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5 text-brand-gray/50" />
          <span className="text-brand-navy font-medium truncate max-w-[200px] sm:max-w-none">{title}</span>
        </div>

        {/* HERO SECTION */}
        <div id="service-detail-hero" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-8 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 rounded-full px-3.5 py-1 text-xs text-brand-blue font-semibold">
              {getCategoryIcon(category)}
              <span className="font-display uppercase tracking-wider">{category}</span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy leading-tight">
              {title}
            </h1>
            
            {tagline && (
              <p className="font-display text-base sm:text-lg text-brand-blue font-medium leading-snug">
                {tagline}
              </p>
            )}

            <p className="font-sans text-sm sm:text-base text-brand-gray leading-relaxed max-w-3xl mt-1">
              {description}
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-brand-navy/10 w-full">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy bg-brand-navy/5 px-3 py-1.5 rounded-lg">
                <Coins className="w-4 h-4 text-emerald-600" />
                <span>{startingPrice}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy bg-brand-navy/5 px-3 py-1.5 rounded-lg">
                <Shield className="w-4 h-4 text-brand-blue" />
                <span>100% Code & IP Ownership</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy bg-brand-navy/5 px-3 py-1.5 rounded-lg">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Rapid Delivery Sprints</span>
              </div>
            </div>
          </div>

          {/* Quick Quote / CTA Card */}
          <div className="lg:col-span-4 bg-gradient-to-br from-brand-navy/[0.03] to-brand-blue/[0.06] border border-brand-navy/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="mb-4 rounded-xl overflow-hidden border border-brand-navy/10 shadow-xs">
              <img
                src={servicesOverviewImg}
                alt={title}
                referrerPolicy="no-referrer"
                className="w-full h-36 object-cover"
              />
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-navy/10">
              <span className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                Investment Guide
              </span>
              <span className="font-display text-sm font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                {startingPrice}
              </span>
            </div>
            {pricingNote && (
              <p className="text-[11px] text-brand-gray mt-2 leading-relaxed">
                {pricingNote}
              </p>
            )}
            <div className="my-5 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs text-brand-navy/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fixed-scope transparent quote</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-navy/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero recurring licensing lock-ins</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-brand-navy/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dedicated Singapore technical lead</span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <Button id="hero-btn-start" variant="primary" to="/start-a-project" className="w-full justify-center">
                Start This Project
              </Button>
              <Button id="hero-btn-contact" variant="outline" to="/contact" className="w-full justify-center">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* COGNITIVE ARCHITECTURE MAP (FOR AI & AUTOMATION SERVICES) */}
        {(slug.includes("ai") || slug.includes("agent") || slug.includes("automation")) && (
          <div id="ai-cognitive-schema" className="mb-16 p-6 sm:p-8 rounded-2xl border border-brand-blue/20 bg-gradient-to-r from-brand-blue/[0.03] to-cyan-500/[0.04] relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-[11px] font-bold text-brand-blue tracking-widest uppercase">
                Intelligent Execution Architecture
              </span>
              <span className="text-[10px] font-mono font-bold bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded">
                DIGEE AI CORE
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 my-4">
              <div className="p-3 rounded-xl bg-white border border-brand-navy/10 text-center shadow-xs">
                <span className="text-[10px] font-bold text-brand-gray uppercase block">01 Input</span>
                <span className="font-display text-xs font-bold text-brand-navy mt-1 block">Context Ingestion</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-brand-navy/10 text-center shadow-xs">
                <span className="text-[10px] font-bold text-brand-gray uppercase block">02 Cognitive</span>
                <span className="font-display text-xs font-bold text-brand-blue mt-1 block">LLM Reasoning</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-brand-navy/10 text-center shadow-xs">
                <span className="text-[10px] font-bold text-brand-gray uppercase block">03 Grounding</span>
                <span className="font-display text-xs font-bold text-brand-navy mt-1 block">RAG Vector Data</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-brand-navy/10 text-center shadow-xs">
                <span className="text-[10px] font-bold text-brand-gray uppercase block">04 Function</span>
                <span className="font-display text-xs font-bold text-brand-navy mt-1 block">Dynamic Tools</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-brand-navy/10 text-center shadow-xs">
                <span className="text-[10px] font-bold text-brand-gray uppercase block">05 Validation</span>
                <span className="font-display text-xs font-bold text-brand-navy mt-1 block">Safety Guardrails</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center shadow-xs">
                <span className="text-[10px] font-bold text-emerald-700 uppercase block">06 Action</span>
                <span className="font-display text-xs font-bold text-emerald-800 mt-1 block">API Execution</span>
              </div>
            </div>
            
            <p className="font-sans text-xs text-brand-gray leading-relaxed max-w-3xl">
              Unlike generic public chatbots, Digee Tech constructs deterministic, private cognitive pipelines with strict safety filters, tool-use execution, and zero data leakage to public model training pools.
            </p>
          </div>
        )}

        {/* PROBLEM & SOLUTION SECTION */}
        <div id="service-problem-solution-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 border-t border-brand-navy/10 pt-12 mb-16">
          <div id="service-problem" className="flex flex-col gap-3 p-6 rounded-2xl bg-rose-50/50 border border-rose-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <h3 className="font-display text-xs font-extrabold uppercase tracking-wider text-rose-800">
                The Operational Bottleneck
              </h3>
            </div>
            <p className="font-sans text-sm text-brand-navy/85 leading-relaxed">
              {problem}
            </p>
          </div>

          <div id="service-solution" className="flex flex-col gap-3 p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <h3 className="font-display text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                The Digee Tech Engineering Solution
              </h3>
            </div>
            <p className="font-sans text-sm text-brand-navy/85 leading-relaxed">
              {solution}
            </p>
          </div>
        </div>

        {/* CORE FEATURES & CAPABILITIES */}
        {capabilities.length > 0 && (
          <section id="service-capabilities" className="mb-16 bg-brand-navy/[0.02] p-8 md:p-10 rounded-3xl border border-brand-navy/8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="font-display text-xs font-bold text-brand-blue uppercase tracking-wider">
                Specification
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mt-1 mb-6">
                Key Features & Deliverables
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-brand-navy/5 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    <span className="font-sans text-xs sm:text-sm text-brand-navy font-medium">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-brand-navy/10 shadow-md group">
                <img
                  src={techStackImg}
                  alt="Technical Code & Architecture"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-brand-navy/10 shadow-md group">
                <img
                  src={aiAgentsImg}
                  alt="Enterprise AI & Automation Engine"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </section>
        )}

        {/* BUSINESS BENEFITS */}
        {benefits.length > 0 && (
          <section id="service-benefits" className="mb-16">
            <SectionHeader
              id="benefits-hdr"
              eyebrow="ROI & Impact"
              title="Measurable Business Advantages"
              description="How this capability translates directly to revenue growth, risk reduction, and operational velocity."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-brand-navy/10 bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-display font-bold text-sm mb-4">
                      0{idx + 1}
                    </div>
                    <p className="font-display text-sm font-bold text-brand-navy leading-snug">
                      {benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* INDUSTRIES & USE CASES (IF AVAILABLE) */}
        {(industries.length > 0 || useCases.length > 0) && (
          <section id="service-industries-usecases" className="mb-16 border-t border-brand-navy/10 pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {industries.length > 0 && (
                <div>
                  <h4 className="font-display text-sm font-bold text-brand-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Building className="w-4 h-4 text-brand-blue" />
                    Relevant Industry Verticals
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {industries.map((ind) => (
                      <span key={ind} className="text-xs font-semibold text-brand-navy bg-brand-navy/5 border border-brand-navy/10 px-3.5 py-1.5 rounded-full">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {useCases.length > 0 && (
                <div>
                  <h4 className="font-display text-sm font-bold text-brand-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-600" />
                    Real-World Implementation Scenario
                  </h4>
                  <div className="p-4 rounded-xl bg-brand-blue/[0.04] border border-brand-blue/15 text-xs text-brand-navy leading-relaxed">
                    {useCases[0]}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* DELIVERY FRAMEWORK PROCESS */}
        <section id="service-process" className="mb-16 border-t border-brand-navy/10 pt-12">
          <SectionHeader
            id="service-process-header"
            eyebrow="Milestones"
            title="Our Delivery Framework"
            description="We build systematically, validating code and requirements transparently at every operational phase."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {processSteps.map((p) => (
              <div
                key={p.step}
                className="p-6 rounded-2xl border border-brand-navy/8 bg-white flex flex-col gap-3 group shadow-xs hover:shadow-md hover:border-brand-blue/30 transition-all duration-300"
              >
                <div className="font-display text-3xl font-extrabold text-brand-blue/30 group-hover:text-brand-blue transition-colors">
                  {p.step}
                </div>
                <h4 className="font-display text-base font-bold text-brand-navy">
                  {p.title}
                </h4>
                <p className="font-sans text-xs text-brand-gray leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TECH STACK */}
        <section id="service-tech-stack" className="mb-16 border-t border-brand-navy/10 pt-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-1">
                Technology Specifications
              </h3>
              <p className="font-sans text-xs text-brand-gray max-w-md">
                Engineered with industry-standard, high-performance modern frameworks.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:max-w-xl">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono font-medium text-brand-blue bg-brand-blue/5 border border-brand-blue/20 rounded-lg px-3 py-1.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQS (ACCORDION) */}
        <section id="service-faqs" className="mb-16 max-w-3xl mx-auto border-t border-brand-navy/10 pt-12">
          <SectionHeader
            id="service-faqs-hdr"
            eyebrow="Questions"
            title="Frequently Asked Questions"
            center
          />
          <div className="flex flex-col gap-3 mt-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-brand-navy/10 rounded-2xl bg-white overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-display text-sm font-semibold text-brand-navy hover:bg-brand-blue/5 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 pr-4">
                    <HelpCircle className="w-4 h-4 text-brand-blue shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-brand-gray/50 shrink-0 transition-transform ${openFaqIndex === index ? "rotate-180 text-brand-blue" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4 sm:p-5 pt-0 font-sans text-xs text-brand-gray leading-relaxed border-t border-brand-navy/5 bg-brand-navy/[0.01]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED SERVICES CAROUSEL / GRID */}
        {finalRelated.length > 0 && (
          <section id="related-services" className="mb-16 border-t border-brand-navy/10 pt-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold text-brand-navy">
                Related & Complementary Capabilities
              </h3>
              <Link to="/services" className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1">
                View All 100+ Services <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {finalRelated.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/services/${rel.slug}`}
                  className="p-6 rounded-2xl border border-brand-navy/10 bg-white hover:border-brand-blue/40 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="font-display text-base font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-brand-gray mt-2 line-clamp-2 leading-relaxed">
                      {rel.shortDescription || rel.tagline}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-brand-navy/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600">{rel.startingPrice}</span>
                    <span className="text-xs font-semibold text-brand-blue flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Learn More <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FINAL PROJECT LAUNCH CTA */}
        <div id="service-final-cta" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-navy to-[#102B4E] text-white text-center flex flex-col items-center gap-6 max-w-4xl mx-auto shadow-xl">
          <span className="font-display text-xs font-bold text-cyan-400 uppercase tracking-widest">
            DIGEE TECH SINGAPORE
          </span>
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white max-w-2xl leading-tight">
            Ready to Build {title}?
          </h3>
          <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
            Schedule a scoping session with our senior engineers today. Receive a fixed-price milestone quote with guaranteed delivery timelines.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Button id="srv-cta-start" variant="primary" to="/start-a-project" className="bg-brand-blue hover:bg-brand-blue-dark text-white shadow-lg shadow-brand-blue/30">
              Start a Project
            </Button>
            <Button id="srv-cta-contact" variant="outline" to="/contact" className="border-white/20 text-white hover:bg-white/10">
              Talk to Our Team
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
