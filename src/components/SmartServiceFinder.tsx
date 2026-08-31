import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, Check, RefreshCw, Cpu, Laptop, Briefcase, TrendingUp, HelpCircle, AlertCircle 
} from "lucide-react";

interface Option {
  id: string;
  label: string;
  description: string;
  icon?: React.ReactNode;
}

interface Recommendation {
  title: string;
  category: string;
  description: string;
  capabilities: string[];
  link: string;
  icon: React.ReactNode;
}

export const SmartServiceFinder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    goal: "",
    platform: "",
    stage: ""
  });

  const goals: Option[] = [
    { id: "development", label: "Launch a Web/App Product", description: "Build custom high-performance websites, mobile apps, or multi-tenant SaaS products.", icon: <Laptop className="w-5 h-5 text-brand-blue" /> },
    { id: "automation", label: "Automate Workflows & Systems", description: "Streamline operations, replace manual spreadsheet tasks, or integrate ERP/CRMs.", icon: <Briefcase className="w-5 h-5 text-[#00b4d8]" /> },
    { id: "ai", label: "Implement AI & Intelligent Agents", description: "Integrate Large Language Models, reasoning cognitive loops, or semantic search.", icon: <Cpu className="w-5 h-5 text-[#0096c7]" /> },
    { id: "growth", label: "Drive Traffic & Performance Marketing", description: "Increase acquisition, optimize SEO architectures, or scale lead campaigns.", icon: <TrendingUp className="w-5 h-5 text-[#0077b6]" /> }
  ];

  const subOptions: Record<string, Option[]> = {
    development: [
      { id: "website", label: "Business Corporate Website", description: "Professional visual presence tailored for serious leads, conversion, and SEO." },
      { id: "saas", label: "SaaS or Custom Web App", description: "Multi-tenant software architectures, dashboards, and secure payment integrations." },
      { id: "mobile", label: "Mobile Application (iOS/Android)", description: "Premium native or hybrid app built with fluid screen transitions." }
    ],
    automation: [
      { id: "crm", label: "Custom CRM / ERP Platform", description: "Centralized internal dashboards to track workflows without per-user license fees." },
      { id: "api", label: "Database Sync & APIs", description: "Automated background connectors that link custom scripts to current platforms." }
    ],
    ai: [
      { id: "agent", label: "Cognitive AI Assistant / Agent", description: "Intelligent systems that parse data, use APIs, and automate customer responses." },
      { id: "tools", label: "Custom Generative AI Tools", description: "Incorporate semantic parsers, prompt engines, and document readers." }
    ],
    growth: [
      { id: "seo", label: "Technical & Topical SEO", description: "Long-term search visibility structures backed by fast Core Web Vitals." },
      { id: "meta", label: "Performance Lead Campaigns", description: "Structured social ads and custom landing funnels optimized for acquisition." }
    ]
  };

  const stages: Option[] = [
    { id: "startup", label: "Early-Stage Startup", description: "Focusing on speed-to-market, core features, and launch MVP." },
    { id: "growth", label: "Established SME / Growth", description: "Expanding operations, scaling databases, and requiring automated security." },
    { id: "enterprise", label: "Large Enterprise", description: "Tailoring complex workflows, centralized CRM systems, and serious security." }
  ];

  const getRecommendation = (): Recommendation => {
    const { goal, platform, stage } = selections;

    if (goal === "ai") {
      if (platform === "agent") {
        return {
          title: "AI Agent Development",
          category: "AI & AUTOMATION",
          description: "We build advanced autonomous agents that analyze customer intent, parse system databases, query third-party APIs, and execute high-fidelity business operations without manual delays.",
          capabilities: ["Cognitive reasoning loops", "Database & API connectors", "Continuous workflow execution", "Audit log and fallback protocols"],
          link: "/services/ai-agents",
          icon: <Cpu className="w-10 h-10 text-brand-blue" />
        };
      } else {
        return {
          title: "Custom AI Tools",
          category: "AI & AUTOMATION",
          description: "Incorporate intelligent document search, PDF parsers, prompt chains, or image recognition directly into your existing business interfaces or software platforms.",
          capabilities: ["Semantic search indexes", "RAG document reading", "Structured CSV/PDF parsers", "Secure processing pipelines"],
          link: "/services/ai-tools",
          icon: <Cpu className="w-10 h-10 text-[#00b4d8]" />
        };
      }
    }

    if (goal === "automation") {
      if (platform === "crm") {
        return {
          title: "Custom CRM & ERP Systems",
          category: "BUSINESS SYSTEMS",
          description: "Centralized internal dashboards built specifically to track your orders, customers, and operations without paying expensive recurring per-user license fees.",
          capabilities: ["No recurring per-seat fees", "Centralized operational ledgers", "Employee and partner portals", "Responsive real-time reporting"],
          link: "/services/crm",
          icon: <Briefcase className="w-10 h-10 text-brand-blue" />
        };
      } else {
        return {
          title: "Business Automation Services",
          category: "AI & AUTOMATION",
          description: "We deploy solid background scripts and API connectors that sync databases and automatically trigger actions when orders are placed or status shifts.",
          capabilities: ["Background data synchronization", "Third-party API bridges", "Manual entry elimination", "Triggered notifications"],
          link: "/services/automation",
          icon: <RefreshCw className="w-10 h-10 text-[#00b4d8]" />
        };
      }
    }

    if (goal === "growth") {
      if (platform === "seo") {
        return {
          title: "Topical SEO Architecture",
          category: "DIGITAL GROWTH",
          description: "High-intent semantic search optimization focusing on high-speed technical page layout, clear content clusters, and indexing setup.",
          capabilities: ["Core Web Vitals tuning", "Topical cluster mapping", "Structured Schema markup", "Continuous rank monitoring"],
          link: "/services/seo",
          icon: <TrendingUp className="w-10 h-10 text-brand-blue" />
        };
      } else {
        return {
          title: "Meta Lead Campaigns & Funnels",
          category: "DIGITAL GROWTH",
          description: "Structured high-performance social media marketing funnel systems paired with custom high-speed landing pages built exclusively to capture and qualify leads.",
          capabilities: ["A/B landing page testing", "High-qualification form funnels", "Conversion API setup", "Audience cohort optimization"],
          link: "/services/meta-ads",
          icon: <TrendingUp className="w-10 h-10 text-[#00b4d8]" />
        };
      }
    }

    // Default to Development Recommendations
    if (platform === "website") {
      return {
        title: "Website Development",
        category: "DIGITAL DEVELOPMENT",
        description: "Pixel-perfect, ultra-fast custom corporate platforms designed to display your offerings, capture leads, and load instantly on mobile devices.",
        capabilities: ["Custom React / Next.js builds", "Elegant responsive layouts", "SEO-optimized markup", "Intuitive layout editor config"],
        link: "/services/web-development",
        icon: <Laptop className="w-10 h-10 text-brand-blue" />
      };
    } else if (platform === "saas") {
      return {
        title: "SaaS Platform Development",
        category: "DIGITAL DEVELOPMENT",
        description: "Scale your business logic into a multi-tenant subscription software platform complete with secure authentication, multi-tenant work areas, and Stripe billing integrations.",
        capabilities: ["Multi-tenant space architecture", "Secure Auth & workspace settings", "Stripe payment engines", "High-performance data queries"],
        link: "/services/saas",
        icon: <Laptop className="w-10 h-10 text-[#00b4d8]" />
      };
    } else {
      return {
        title: "App Development",
        category: "DIGITAL DEVELOPMENT",
        description: "Native Swift and Kotlin or cross-platform React Native and Flutter mobile systems with robust data caching, secure token auth, and offline handling.",
        capabilities: ["Cross-platform app stores setup", "Smooth view transitions", "Offline local caching", "Secure token authentication"],
        link: "/services/app-development",
        icon: <Laptop className="w-10 h-10 text-[#0096c7]" />
      };
    }
  };

  const handleSelectGoal = (id: string) => {
    setSelections({ ...selections, goal: id });
    setStep(2);
  };

  const handleSelectPlatform = (id: string) => {
    setSelections({ ...selections, platform: id });
    setStep(3);
  };

  const handleSelectStage = (id: string) => {
    setSelections({ ...selections, stage: id });
    setStep(4);
  };

  const resetFinder = () => {
    setSelections({ goal: "", platform: "", stage: "" });
    setStep(1);
  };

  const currentRecommendation = getRecommendation();

  return (
    <div id="smart-service-finder-container" className="w-full bg-white border border-brand-navy/5 rounded-3xl p-6 md:p-8 shadow-xl shadow-brand-navy/5 relative overflow-hidden">
      
      {/* Dynamic Background Ornament */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />

      {/* Title Header bar */}
      <div className="flex items-center gap-3 border-b border-brand-navy/5 pb-4 mb-6">
        <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <span className="font-display text-[10px] font-extrabold tracking-widest text-brand-blue uppercase">Smart Match</span>
          <h3 className="font-display text-base font-bold text-brand-navy">Interactive Service Finder</h3>
        </div>
        
        {step > 1 && (
          <button 
            onClick={resetFinder} 
            className="ml-auto font-sans text-xs text-brand-gray hover:text-brand-blue transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Progress Line */}
      <div className="w-full h-1.5 bg-brand-navy/5 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-brand-blue transition-all duration-300" 
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h4 className="font-display text-sm font-bold text-brand-navy mb-1">
              Step 1: What is your primary objective or bottleneck?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleSelectGoal(g.id)}
                  className="p-4 rounded-2xl border border-brand-navy/5 bg-brand-white/25 hover:bg-brand-blue/5 hover:border-brand-blue/40 text-left transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-white border border-brand-navy/5 flex items-center justify-center mb-3">
                    {g.icon}
                  </div>
                  <h5 className="font-display text-sm font-bold text-brand-navy mb-1 group-hover:text-brand-blue transition-colors">
                    {g.label}
                  </h5>
                  <p className="font-sans text-xs text-brand-gray leading-relaxed">
                    {g.description}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h4 className="font-display text-sm font-bold text-brand-navy mb-1">
              Step 2: Choose the specific platform focus:
            </h4>
            <div className="flex flex-col gap-3">
              {(subOptions[selections.goal] || []).map((so) => (
                <button
                  key={so.id}
                  onClick={() => handleSelectPlatform(so.id)}
                  className="p-4 rounded-xl border border-brand-navy/5 bg-white hover:bg-brand-blue/5 hover:border-brand-blue/30 text-left transition-all duration-200 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-display text-sm font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {so.label}
                    </span>
                    <span className="font-sans text-xs text-brand-gray leading-relaxed">
                      {so.description}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-gray group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h4 className="font-display text-sm font-bold text-brand-navy mb-1">
              Step 3: What is the current scale of your organization?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stages.map((st) => (
                <button
                  key={st.id}
                  onClick={() => handleSelectStage(st.id)}
                  className="p-4 rounded-xl border border-brand-navy/5 bg-white hover:bg-brand-blue/5 hover:border-brand-blue/30 text-left transition-all duration-200 flex flex-col justify-between min-h-[140px] group cursor-pointer"
                >
                  <div>
                    <h5 className="font-display text-sm font-bold text-brand-navy mb-1 group-hover:text-brand-blue transition-colors">
                      {st.label}
                    </h5>
                    <p className="font-sans text-xs text-brand-gray leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                  <span className="font-display text-[10px] font-bold text-brand-blue uppercase tracking-widest mt-4 group-hover:underline">
                    Select Stage →
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-2xl bg-brand-white/40 border border-brand-blue/15"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white border border-brand-navy/5 flex items-center justify-center shrink-0 shadow-md">
                {currentRecommendation.icon}
              </div>
              <div className="flex flex-col justify-between grow gap-6">
                <div>
                  <span className="font-display text-[10px] font-extrabold text-brand-blue tracking-widest uppercase">
                    {currentRecommendation.category}
                  </span>
                  <h4 className="font-display text-xl font-bold text-brand-navy mt-1">
                    Recommended: {currentRecommendation.title}
                  </h4>
                  <p className="font-sans text-xs text-brand-gray mt-2 leading-relaxed">
                    {currentRecommendation.description}
                  </p>

                  <h5 className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider mt-4 mb-2">
                    Key Features Included:
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentRecommendation.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-1.5 text-xs text-brand-navy/80">
                        <Check className="w-3.5 h-3.5 text-brand-blue shrink-0 stroke-[3]" />
                        <span className="truncate">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 mt-2">
                  <Link
                    to={currentRecommendation.link}
                    className="inline-flex items-center justify-center font-display text-xs font-bold bg-brand-blue hover:bg-[#0070a6] text-white rounded-full px-5 py-2.5 shadow-md hover:shadow-brand-blue/10 transition-all"
                  >
                    View Service Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                  <button
                    onClick={resetFinder}
                    className="inline-flex items-center justify-center font-display text-xs font-bold border border-brand-navy/15 hover:border-brand-blue text-brand-navy hover:text-brand-blue bg-white rounded-full px-5 py-2.5 transition-all cursor-pointer"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
