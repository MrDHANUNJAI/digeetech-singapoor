import React from "react";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { ShieldCheck, Heart, Users, Target, Rocket, Eye, Compass, Cpu } from "lucide-react";
import aboutCompanyImg from "../assets/images/about_company.jpg";
import teamMeetingImg from "../assets/images/team_meeting_1789130815215.jpg";
import cloudArchImg from "../assets/images/cloud_architecture_1789130783930.jpg";
import techStackImg from "../assets/images/tech_stack.jpg";

export const About: React.FC = () => {
  const capabilitiesList = [
    "Full-Stack Website & Custom Portal Engineering",
    "Cross-Platform & Native Mobile Applications",
    "Cognitive AI Agents & Prompt Workflows",
    "Generative AI Document Synthesis Tools",
    "SaaS Architecture & Tenant Billing Systems",
    "Centralized Custom CRM & Core ERP Systems",
    "API Integrations & Operations Automation Background Scripts",
    "Technical SEO Auditing & Conversion Meta Campaigns",
    "Visual Corporate Branding Guidelines & UI/UX Figma Design"
  ];

  return (
    <div id="about-page" className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO SECTION */}
        <div id="about-hero" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
              Our Identity
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight">
              Creating What's <span className="text-gradient-blue">Next...</span>
            </h1>
            <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-2">
              Digee Tech is a premium digital technology and digital solutions company. We specialize in building custom-crafted software, autonomous AI systems, optimized business structures, and conversion-ready growth campaigns to empower forward-thinking organizations.
            </p>
          </div>
          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-xl border border-brand-navy/10 group">
            <img
              src={aboutCompanyImg}
              alt="Digee Tech Singapore Office Team"
              referrerPolicy="no-referrer"
              className="w-full h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* WHO WE ARE & WHAT WE DO */}
        <div id="about-intro-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-brand-navy/10 pt-12 mb-20 items-center">
          <div id="intro-who-we-are" className="flex flex-col gap-4">
            <h3 className="font-display text-xl font-bold text-brand-navy flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-blue" /> Who We Are & Our Culture
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              We are an engineering-driven team of software developers, system architects, UI/UX designers, AI implementation experts, and digital growth strategists. Rather than forcing clients into rigid off-the-shelf templates, we craft deliberate, tailormade digital solutions.
            </p>
            <p className="font-sans text-sm text-brand-gray leading-relaxed mt-1">
              At Digee Tech, we believe that visual beauty and robust, type-safe clean code must go hand-in-hand. Every project we undertake is modeled from the ground up to achieve high scalability, optimal performance, and strict client security.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-brand-navy/10 group">
            <img
              src={teamMeetingImg}
              alt="Digee Tech Engineering Team Collaboration"
              referrerPolicy="no-referrer"
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* MISSION & VISION */}
        <div id="about-mission-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-2xl border border-brand-navy/5 bg-white shadow-md flex flex-col gap-4">
            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-brand-navy">Our Mission</h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              To engineer deliberate, secure, and highly optimized digital technologies that turn business ideas into high-impact operational software, removing friction and enabling real corporate scaling.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-brand-navy/5 bg-white shadow-md flex flex-col gap-4">
            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-brand-navy">Our Vision</h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              To be the trusted, single-point technological partner for growing organizations, recognized for pristine design systems, type-safe architectures, and practical cognitive AI integrations.
            </p>
          </div>
        </div>

        {/* OUR APPROACH */}
        <section id="our-approach" className="mb-20">
          <SectionHeader
            eyebrow="Methodology"
            title="Our Operating Approach"
            description="We focus strictly on deliberate planning, continuous engineering audits, and client transparency."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-brand-navy/5 bg-brand-white/40">
              <span className="font-display text-xs font-bold text-brand-blue block mb-2 uppercase">01 / Pure Customization</span>
              <p className="font-sans text-sm text-brand-gray leading-relaxed">
                We design and build from scratch. Your custom CRM, web application, or ERP is engineered to model your exact business steps and team parameters, eliminating software bloat.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-brand-navy/5 bg-brand-white/40">
              <span className="font-display text-xs font-bold text-brand-blue block mb-2 uppercase">02 / Pristine Technical Standards</span>
              <p className="font-sans text-sm text-brand-gray leading-relaxed">
                We implement type-safe models, enforce clean modular components, and build strictly for optimized speed, security, and responsive touch-target consistency.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-brand-navy/5 bg-brand-white/40">
              <span className="font-display text-xs font-bold text-brand-blue block mb-2 uppercase">03 / Deliberate Transparency</span>
              <p className="font-sans text-sm text-brand-gray leading-relaxed">
                No complex technical jargon or exaggerated marketing claims. We outline clear deliverables, coordinate milestones, and hand over source assets upon final approvals.
              </p>
            </div>
          </div>
        </section>

        {/* CAPABILITIES LIST */}
        <section id="our-capabilities" className="mb-20 bg-brand-white/30 p-8 md:p-12 rounded-3xl border border-brand-navy/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
              System Capabilities
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mt-2 mb-6">
              Core Technical Capabilities
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed mb-8">
              We maintain continuous training across frontend compilation, relational schema design, LLM tool bindings, API structures, and indexing vectors.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {capabilitiesList.map((cap, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-brand-navy/80">
                  <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5 shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-brand-navy/10 shadow-lg group">
            <img
              src={techStackImg}
              alt="Digee Tech System Architecture & Technologies"
              referrerPolicy="no-referrer"
              className="w-full h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </section>

        {/* CLOUD INFRASTRUCTURE & SECURITY SHOWCASE */}
        <div className="mb-20 rounded-3xl overflow-hidden border border-brand-navy/10 shadow-xl relative group">
          <img
            src={cloudArchImg}
            alt="Enterprise Cloud Infrastructure & Security"
            referrerPolicy="no-referrer"
            className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent flex items-end p-8">
            <div className="text-white space-y-2">
              <span className="bg-emerald-500 text-white font-bold text-xs uppercase px-3 py-1 rounded-full inline-block">
                Singapore Data Center Compliance
              </span>
              <h3 className="font-display text-2xl font-bold">Cloud Infrastructure & High-Availability Servers</h3>
              <p className="text-xs text-brand-gray-light max-w-xl">
                Deploying containerized Cloud Run instances with automated SSL termination, type-safe Postgres databases, and 99.9% uptime SLAs.
              </p>
            </div>
          </div>
        </div>

        {/* WHY DIGEE TECH & TECHNOLOGY PHILOSOPHY */}
        <div id="why-philosophy-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div id="why-digeetech" className="flex flex-col gap-4">
            <h3 className="font-display text-xl font-bold text-brand-navy flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-blue" /> Why Digee Tech
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              We stand apart because we do not treat digital development as a simple commodity task. We serve as a strategic partner. We analyze your workflows to identify where automation will save human capital, and where customized dashboards will drive growth.
            </p>
            <p className="font-sans text-sm text-brand-gray leading-relaxed mt-1">
              When you work with us, you own your assets entirely. Your custom code is a proprietary IP asset that builds equity for your business, rather than locking you into expensive per-user pricing plans.
            </p>
          </div>
          <div id="technology-philosophy" className="flex flex-col gap-4">
            <h3 className="font-display text-xl font-bold text-brand-navy flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-blue" /> Technology Philosophy
            </h3>
            <p className="font-sans text-sm text-brand-gray leading-relaxed">
              We prioritize technologies that have deep industry backing and excellent documentation. We write clean modern TypeScript, use robust relational databases, and configure serverless container routing.
            </p>
            <p className="font-sans text-sm text-brand-gray leading-relaxed mt-1">
              Our codebases are built modularly, making them easy to read, refactor, and update as your business grows. We build for longevity and compliance, ensuring type safety and thorough error boundaries.
            </p>
          </div>
        </div>

        {/* FINAL CTA */}
        <div id="about-final-cta" className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[#EEF7FB] to-[#F2F8FC] border border-brand-navy/5 text-center flex flex-col items-center gap-6 max-w-4xl mx-auto shadow-md">
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-brand-navy">
            Let's Collaborate on What's Next.
          </h3>
          <p className="font-sans text-sm text-brand-gray leading-relaxed max-w-xl">
            Coordinate with our product architects today to outline a structured technical blueprint for your application, automation, or custom CRM.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Button id="about-cta-start" variant="primary" to="/start-a-project">
              Start a Project
            </Button>
            <Button id="about-cta-contact" variant="outline" to="/contact">
              Contact Our Team
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
