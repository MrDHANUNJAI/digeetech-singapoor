import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { servicesData } from "../data";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { ChevronDown, CheckCircle2, ChevronRight, HelpCircle, ArrowLeft, Cpu, Laptop, Workflow, BarChart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!slug || !servicesData[slug]) {
    return <Navigate to="/services" replace />;
  }

  const service = servicesData[slug];

  const categoryIcons: Record<string, React.ReactNode> = {
    "DIGITAL DEVELOPMENT": <Laptop className="w-5 h-5 text-brand-blue" />,
    "AI & AUTOMATION": <Cpu className="w-5 h-5 text-brand-blue" />,
    "BUSINESS SYSTEMS": <Workflow className="w-5 h-5 text-brand-blue" />,
    "DIGITAL GROWTH": <BarChart className="w-5 h-5 text-brand-blue" />
  };

  const getCategoryIcon = (cat: string) => {
    return categoryIcons[cat] || <Laptop className="w-5 h-5 text-brand-blue" />;
  };

  return (
    <div id={`service-detail-${slug}`} className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Dynamic Glow Accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* BACK NAVIGATION */}
        <Link
          id="back-to-services-link"
          to="/services"
          className="inline-flex items-center gap-1 text-xs text-brand-gray hover:text-brand-blue transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Services
        </Link>

        {/* HERO */}
        <div id="service-detail-hero" className="flex flex-col items-start gap-4 mb-16 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/15 rounded-full px-4 py-1.5 text-xs text-brand-blue">
            {getCategoryIcon(service.category)}
            <span className="font-display font-bold uppercase tracking-wider">{service.category}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight">
            {service.title}
          </h1>
          <span className="font-display italic text-lg text-brand-blue font-semibold block">
            "{service.tagline}"
          </span>
          <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed max-w-3xl mt-4">
            {service.description}
          </p>
        </div>

        {/* SPECIAL VISUAL GRAPHIC FOR AI AGENTS */}
        {slug === "ai-agents" && (
          <div id="ai-agents-visual-schema" className="mb-20 p-8 rounded-2xl border border-brand-navy/5 bg-brand-white/40 relative overflow-hidden shadow-md max-w-4xl">
            <div className="absolute top-2 right-2 font-display text-[9px] text-brand-blue font-bold tracking-widest bg-white px-2 py-0.5 rounded border border-brand-navy/5">
              SYSTEM MAP
            </div>
            <h3 className="font-display text-xs font-bold text-brand-blue tracking-widest uppercase mb-6">
              AI Agent Reasoning Architecture
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 relative">
              <div className="p-3 rounded-lg border border-brand-navy/5 bg-white text-center font-display text-xs font-bold text-brand-navy/80 w-full md:w-[12%] shrink-0 shadow-sm">
                USER
              </div>
              <ChevronRight className="w-4 h-4 text-brand-blue rotate-90 md:rotate-0" />
              <div className="p-3 rounded-lg border border-brand-blue/30 bg-brand-blue text-center font-display text-xs font-bold text-white w-full md:w-[15%] shrink-0 shadow-lg shadow-brand-blue/10">
                AI AGENT
              </div>
              <ChevronRight className="w-4 h-4 text-brand-blue rotate-90 md:rotate-0" />
              <div className="p-3 rounded-lg border border-brand-navy/5 bg-white text-center font-display text-xs font-bold text-brand-navy/80 w-full md:w-[14%] shrink-0 shadow-sm">
                REASONING
              </div>
              <ChevronRight className="w-4 h-4 text-brand-blue rotate-90 md:rotate-0" />
              <div className="p-3 rounded-lg border border-brand-navy/5 bg-white text-center font-display text-xs font-bold text-brand-navy/80 w-full md:w-[12%] shrink-0 shadow-sm">
                TOOLS
              </div>
              <ChevronRight className="w-4 h-4 text-brand-blue rotate-90 md:rotate-0" />
              <div className="p-3 rounded-lg border border-brand-navy/5 bg-white text-center font-display text-xs font-bold text-brand-navy/80 w-full md:w-[12%] shrink-0 shadow-sm">
                API
              </div>
              <ChevronRight className="w-4 h-4 text-brand-blue rotate-90 md:rotate-0" />
              <div className="p-3 rounded-lg border border-brand-navy/5 bg-white text-center font-display text-xs font-bold text-brand-navy/80 w-full md:w-[15%] shrink-0 shadow-sm">
                DATABASE
              </div>
              <ChevronRight className="w-4 h-4 text-brand-blue rotate-90 md:rotate-0" />
              <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-50 text-center font-display text-xs font-bold text-emerald-700 w-full md:w-[12%] shrink-0 shadow-sm">
                ACTION
              </div>
            </div>
            
            <p className="font-sans text-xs text-brand-gray mt-6 leading-relaxed max-w-2xl">
              Unlike a simple keyword chatbot, our custom AI Agent architecture manages a complete cognitive loop: analyzing your instructions, verifying parameters, choosing dynamic tools, querying live databases, and taking real-time programmatic actions.
            </p>
          </div>
        )}

        {/* PROBLEM & SOLUTION BLOCKS */}
        <div id="service-problem-solution-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-brand-navy/10 pt-12 mb-20">
          <div id="service-problem" className="flex flex-col gap-4">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-brand-blue">
              The Operational Problem
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              {service.problem}
            </p>
          </div>
          <div id="service-solution" className="flex flex-col gap-4 border-l border-brand-navy/10 lg:pl-12">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-brand-blue">
              The Digeetech Solution
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              {service.solution}
            </p>
          </div>
        </div>

        {/* SERVICE CAPABILITIES */}
        <section id="service-capabilities" className="mb-20 bg-brand-white/40 p-8 md:p-12 rounded-3xl border border-brand-navy/5 shadow-md">
          <div className="max-w-3xl">
            <h3 className="font-display text-2xl font-bold text-brand-navy mb-6">
              Core Deliverables & Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.capabilities.map((cap) => (
                <div key={cap} className="flex items-start gap-3 text-xs text-brand-gray">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENGINEERING PROCESS TIMELINE */}
        <section id="service-process" className="mb-20">
          <SectionHeader
            id="service-process-header"
            eyebrow="Milestones"
            title="Our Delivery Framework"
            description="We build systematically, validating code and requirements transparently at every operational phase."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((p) => (
              <div
                key={p.step}
                className="p-6 rounded-xl border border-brand-navy/5 bg-white flex flex-col gap-3 group shadow-sm hover:shadow-md hover:border-brand-blue/35 transition-all duration-300"
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

        {/* CUSTOM TECHNOLOGIES LIST */}
        <section id="service-tech-stack" className="mb-20 border-t border-brand-navy/10 pt-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
                Tech Stack Specifications
              </h3>
              <p className="font-sans text-xs text-brand-gray max-w-md">
                We design and support this service utilizing reliable, industry-vetted programming tools.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:max-w-xl">
              {service.technology.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-sans text-brand-blue bg-brand-blue/5 border border-brand-blue/15 rounded-full px-4 py-1.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE FAQS (ACCORDION) */}
        <section id="service-faqs" className="mb-20 max-w-4xl border-t border-brand-navy/10 pt-16">
          <SectionHeader
            id="service-faqs-hdr"
            eyebrow="Inquiries"
            title="Common Questions"
            center
          />
          <div className="flex flex-col gap-3 mt-8">
            {service.faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-brand-navy/5 rounded-xl bg-brand-white/40 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-display text-sm font-semibold text-brand-navy hover:bg-brand-blue/5 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-blue" />
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-brand-gray/30 transition-transform ${openFaqIndex === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-5 pt-0 font-sans text-xs text-brand-gray leading-relaxed border-t border-brand-navy/5 bg-white">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICE FINAL CTA */}
        <div id="service-final-cta" className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[#EEF7FB] to-[#F2F8FC] border border-brand-navy/5 text-center flex flex-col items-center gap-6 max-w-4xl mx-auto shadow-md">
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-brand-navy">
            Ready to Implement {service.title}?
          </h3>
          <p className="font-sans text-sm text-brand-gray leading-relaxed max-w-xl">
            Coordinate with our product architects today to receive a transparent milestone budget and clear scope definitions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Button id="srv-cta-start" variant="primary" to="/start-a-project">
              Start a Project
            </Button>
            <Button id="srv-cta-contact" variant="outline" to="/contact">
              Talk to Our Team
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
