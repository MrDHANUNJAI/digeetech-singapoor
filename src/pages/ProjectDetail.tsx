import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { projectsData } from "../data";
import { Button } from "../components/Button";
import { ArrowLeft, CheckCircle, ShieldAlert, Cpu, Laptop, Workflow, BarChart } from "lucide-react";

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const project = projectsData.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div id={`project-detail-${slug}`} className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Glow backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* BACK TO PROJECTS */}
        <Link
          id="back-to-projects-link"
          to="/projects"
          className="inline-flex items-center gap-1 text-xs text-brand-gray hover:text-brand-blue transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Projects
        </Link>

        {/* HERO TITLE */}
        <div id="project-detail-hero" className="max-w-4xl mb-16">
          <span className="text-[10px] font-bold tracking-widest text-brand-blue uppercase bg-brand-blue/10 rounded-full px-3 py-1 border border-brand-blue/15 block w-fit mb-4">
            Case Study: {project.category}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-navy leading-tight">
            {project.title}
          </h1>
          <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-4 max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* PROJECT STRUCTURE BLOCKS */}
        <div id="project-case-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-brand-navy/10 pt-12">
          
          {/* Main Case Body */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Client Requirement */}
            <div id="case-client-requirement" className="flex flex-col gap-3">
              <h3 className="font-display text-lg font-bold text-brand-navy border-l-2 border-brand-blue pl-3">
                Client Requirement
              </h3>
              <p className="font-sans text-sm text-brand-gray leading-relaxed">
                {project.clientRequirement}
              </p>
            </div>

            {/* Challenge */}
            <div id="case-challenge" className="flex flex-col gap-3">
              <h3 className="font-display text-lg font-bold text-brand-navy border-l-2 border-brand-blue pl-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-brand-blue" /> Technical Challenge
              </h3>
              <p className="font-sans text-sm text-brand-gray leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div id="case-solution" className="flex flex-col gap-3">
              <h3 className="font-display text-lg font-bold text-brand-navy border-l-2 border-brand-blue pl-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-brand-blue" /> Integrated Solution
              </h3>
              <p className="font-sans text-sm text-brand-gray leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Screenshots / Mock visual designs */}
            <div id="case-screenshots" className="flex flex-col gap-4 mt-4">
              <h3 className="font-display text-xs font-bold text-brand-blue uppercase tracking-widest">
                System Wireframe Visuals
              </h3>
              
              {/* Custom SVG/CSS Drawing Representation of a system screen mockup */}
              <div className="border border-brand-navy/10 bg-brand-white/40 rounded-2xl p-6 min-h-[220px] flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-brand-navy/10 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="font-sans text-[10px] text-brand-navy/50 ml-2">secure_gateway_terminal.log</span>
                  </div>
                  <span className="text-[9px] font-mono text-brand-blue uppercase tracking-wider bg-brand-blue/10 rounded px-1.5 py-0.5 border border-brand-blue/20">SSL SECURE</span>
                </div>
                
                <div className="flex flex-col gap-2 font-mono text-[10px] text-brand-navy/60">
                  <p className="text-emerald-600 font-semibold">&gt; npm run init_secure_handshake --env=prod</p>
                  <p>&gt; [auth] loading workspace row-level certificates...</p>
                  <p>&gt; [sync] indexing RAG database directories...</p>
                  <p className="text-brand-blue font-semibold">&gt; [api] gateway listening on secure port 3000</p>
                </div>

                <div className="border-t border-brand-navy/10 pt-4 text-[10px] font-sans text-brand-gray leading-relaxed text-center italic">
                  * Proprietary Client System View (Stylized Terminal Representation)
                </div>
              </div>
            </div>

            {/* Development Process */}
            <div id="case-process" className="flex flex-col gap-4">
              <h3 className="font-display text-lg font-bold text-brand-navy border-l-2 border-brand-blue pl-3">
                Development Process
              </h3>
              <div className="flex flex-col gap-3 pl-3">
                {project.process.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs text-brand-gray">
                    <span className="w-5 h-5 rounded bg-brand-blue/10 flex items-center justify-center font-display font-semibold text-brand-blue shrink-0">
                      {index + 1}
                    </span>
                    <p className="leading-relaxed mt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Specifications */}
          <div className="lg:col-span-4 flex flex-col gap-8 lg:border-l lg:border-brand-navy/10 lg:pl-8">
            
            {/* Tech stack specification */}
            <div id="case-spec-tech">
              <h4 className="font-display text-xs font-bold text-brand-blue uppercase tracking-widest border-b border-brand-navy/10 pb-2.5 mb-4">
                Core Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technology.map((t) => (
                  <span key={t} className="text-xs font-sans text-brand-navy bg-brand-white border border-brand-navy/5 rounded px-2.5 py-1 shadow-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Built Features list */}
            <div id="case-spec-features">
              <h4 className="font-display text-xs font-bold text-brand-blue uppercase tracking-widest border-b border-brand-navy/10 pb-2.5 mb-4">
                Engineered Features
              </h4>
              <ul className="flex flex-col gap-2 text-xs text-brand-gray pl-1">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Factual results */}
            <div id="case-spec-results">
              <h4 className="font-display text-xs font-bold text-emerald-600 uppercase tracking-widest border-b border-brand-navy/10 pb-2.5 mb-4">
                Factual Outcomes
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-emerald-700">
                {project.results.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* BOTTOM METRIC DISCLAIMER */}
        <p className="text-[10px] text-brand-gray/50 font-sans mt-16 italic text-center max-w-xl mx-auto">
          * Factual performance summaries. We do not claim arbitrary revenue growth percentages, unverified client references, or awards without audited certificates.
        </p>

        {/* BOTTOM PROJECT CTA */}
        <div id="project-detail-cta" className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[#EEF7FB] to-[#F2F8FC] border border-brand-navy/5 text-center flex flex-col items-center gap-6 max-w-4xl mx-auto mt-20 shadow-md">
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-brand-navy">
            Building a Similar Custom System?
          </h3>
          <p className="font-sans text-sm text-brand-gray leading-relaxed max-w-xl">
            Coordinate with our system engineering leads today to scope your exact operational layers and receive a detailed roadmap.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Button id="project-cta-start" variant="primary" to="/start-a-project">
              Start a Project
            </Button>
            <Button id="project-cta-contact" variant="outline" to="/contact">
              Talk to Our Team
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
