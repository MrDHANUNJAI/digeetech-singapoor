import React from "react";
import { SectionHeader } from "../components/SectionHeader";
import { Button } from "../components/Button";
import { Search, Map, Paintbrush, Code, ShieldCheck, Rocket, HeartHandshake, TrendingUp } from "lucide-react";

export const Process: React.FC = () => {
  const steps = [
    {
      num: "01",
      name: "Discover",
      icon: <Search className="w-5 h-5 text-brand-blue" />,
      tagline: "Understand the business and requirements",
      desc: "We analyze your operational friction, user journeys, and systems integration specifications. We conduct detailed scoping interviews to verify expectations before writing any blueprints."
    },
    {
      num: "02",
      name: "Plan & Strategize",
      icon: <Map className="w-5 h-5 text-brand-blue" />,
      tagline: "Define the right technology and digital strategy",
      desc: "We design a comprehensive Technical Blueprint, selecting the database schemas, server architectures, API channels, and design grids. We outline a strict Scope of Work (SOW)."
    },
    {
      num: "03",
      name: "Design & UX System",
      icon: <Paintbrush className="w-5 h-5 text-brand-blue" />,
      tagline: "Create the user experience and visual system",
      desc: "We map clickable wireframes and visually stunning templates in Figma. We focus on balanced margins, accessible color contrast, legible typographies, and responsive touchscreen targets."
    },
    {
      num: "04",
      name: "Develop & Build",
      icon: <Code className="w-5 h-5 text-brand-blue" />,
      tagline: "Develop the digital solution",
      desc: "Our engineering team compiles the solution. We write clean, type-safe TypeScript code, structure modular React components, build secure auth gateways, and optimize API connections."
    },
    {
      num: "05",
      name: "Test & Validate",
      icon: <ShieldCheck className="w-5 h-5 text-brand-blue" />,
      tagline: "Validate quality, performance and functionality",
      desc: "We run technical audits covering core performance, database schema transactions, responsive browser scales, form validation boundaries, and server container latency profiles."
    },
    {
      num: "06",
      name: "Launch & Deploy",
      icon: <Rocket className="w-5 h-5 text-brand-blue" />,
      tagline: "Deploy the product",
      desc: "We configure secure, containerized server routes, compile static assets, set SSL certificates, audit DNS records, and deploy the application live into production with zero downtime."
    },
    {
      num: "07",
      name: "Support & Maintain",
      icon: <HeartHandshake className="w-5 h-5 text-brand-blue" />,
      tagline: "Optimize and maintain standard operations",
      desc: "We provide active support blocks. We monitor container health, check security parameters, verify backup schedules, and resolve transient operational errors quickly."
    },
    {
      num: "08",
      name: "Grow & Scale",
      icon: <TrendingUp className="w-5 h-5 text-brand-blue" />,
      tagline: "Optimize, maintain, and scale technical capacity",
      desc: "We assist with continuous SEO topical ranking audits, structured ad campaign optimizations, and incremental database expansions to adapt seamlessly as user volumes grow."
    }
  ];

  return (
    <div id="process-detailed-page" className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO */}
        <div id="process-hero" className="max-w-3xl mb-16">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
            Our Methods
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight mt-2">
            From Idea To Impact
          </h1>
          <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-4">
            A successful digital technology project requires deliberate engineering. We combine creative flexibility with a rigid, structured milestones delivery process to complete projects on time, on budget, and with zero wasted effort.
          </p>
        </div>

        {/* DETAILED PROCESS CARDS TIMELINE */}
        <div id="process-cards-timeline" className="flex flex-col gap-12 relative pl-6 border-l border-brand-navy/10">
          {steps.map((step, idx) => (
            <div
              id={`process-detailed-step-${step.num}`}
              key={step.num}
              className="relative group bg-white border border-brand-navy/5 p-8 rounded-2xl flex flex-col md:flex-row gap-6 hover:border-brand-blue/30 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {/* Timeline Connector Dot */}
              <div className="absolute -left-[35px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-white border-2 border-brand-blue group-hover:bg-brand-blue transition-colors duration-300" />
              
              {/* Number and Icon Block */}
              <div className="flex items-start md:items-center gap-4 md:col-span-3 shrink-0">
                <span className="font-display text-4xl font-extrabold text-brand-blue/20 group-hover:text-brand-blue transition-colors duration-300">
                  {step.num}
                </span>
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  {step.icon}
                </div>
              </div>

              {/* Text copy */}
              <div className="flex flex-col gap-2 grow">
                <h3 className="font-display text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                  {step.name}
                </h3>
                <span className="font-display italic text-xs text-brand-blue/80 font-medium">
                  "{step.tagline}"
                </span>
                <p className="font-sans text-sm text-brand-gray leading-relaxed mt-1">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* BOTTOM FINAL PROCESS CTA */}
        <div id="process-final-cta" className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[#EEF7FB] to-[#F2F8FC] border border-brand-navy/5 text-center flex flex-col items-center gap-6 max-w-4xl mx-auto mt-20 shadow-md">
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-brand-navy">
            Ready to Scope Your Digital Project?
          </h3>
          <p className="font-sans text-sm text-brand-gray leading-relaxed max-w-xl">
            We offer complimentary discovery sessions for complex business systems and custom applications. Schedule a call with our technical planners today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Button id="proc-cta-start" variant="primary" to="/start-a-project">
              Start a Project
            </Button>
            <Button id="proc-cta-contact" variant="outline" to="/contact">
              Talk to Our Team
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
