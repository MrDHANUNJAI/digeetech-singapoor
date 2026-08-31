import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Calendar, Users, Cpu, FileCode, CheckCircle, ArrowRight, Settings2, ShieldAlert 
} from "lucide-react";

type ProjectType = "website" | "saas" | "mobile" | "ai" | "automation";
type ProjectScale = "small" | "medium" | "large";
type DesignFidelity = "standard" | "premium";

export const ProjectEstimator: React.FC = () => {
  const [type, setType] = useState<ProjectType>("saas");
  const [scale, setScale] = useState<ProjectScale>("medium");
  const [fidelity, setFidelity] = useState<DesignFidelity>("premium");

  const [estimation, setEstimation] = useState({
    timeline: "",
    team: [] as string[],
    milestones: [] as string[],
    recommendedPlatform: ""
  });

  // Calculate scope metrics on dependency changes
  useEffect(() => {
    let timelineWeeksMin = 4;
    let timelineWeeksMax = 6;
    let team: string[] = ["1 Frontend Developer", "1 Product Architect"];
    let milestones: string[] = ["Discovery Mapping & Wireframing", "Custom Coding & Core Databases", "Responsive Audits & Delivery"];
    let recommendedPlatform = "";

    // Base adjustments on Type
    if (type === "website") {
      timelineWeeksMin = 3;
      timelineWeeksMax = 5;
      team = ["1 UX/UI Specialist", "1 Frontend Engineer"];
      milestones = ["Information Architecture Mapping", "Sleek Custom React Styling", "Technical SEO Clustering & Metadata"];
      recommendedPlatform = "React / Vite / Tailwind CSS";
    } else if (type === "saas") {
      timelineWeeksMin = 8;
      timelineWeeksMax = 12;
      team = ["1 Full-Stack Engineer", "1 Product Designer", "1 Systems Lead"];
      milestones = ["Database Schema & Workspace Setup", "Authentication & Stripe Integration", "Multi-Tenant Control Panel Tests"];
      recommendedPlatform = "Node.js / Express / React / PostgreSQL";
    } else if (type === "mobile") {
      timelineWeeksMin = 10;
      timelineWeeksMax = 14;
      team = ["1 Native Mobile Developer", "1 API Engineer", "1 QA Specialist"];
      milestones = ["Sleek Screens Wireframing", "Token Auth & Core API Gateway Setup", "App Stores Compliance Verification"];
      recommendedPlatform = "React Native or Flutter / Node.js";
    } else if (type === "ai") {
      timelineWeeksMin = 6;
      timelineWeeksMax = 10;
      team = ["1 LLM Specialist", "1 Backend Engineer", "1 Solutions Lead"];
      milestones = ["Cognitive Prompt Flow Blueprinting", "RAG Document Indexing Setup", "API & ERP Connection Pipeline Tests"];
      recommendedPlatform = "Python / FastAPI / Vector Databases / Gemini SDK";
    } else if (type === "automation") {
      timelineWeeksMin = 4;
      timelineWeeksMax = 7;
      team = ["1 Systems Integrator", "1 Backend Engineer"];
      milestones = ["Manual Operations Flow Auditing", "Trigger & Background Cron Configuration", "API Bridge Error-Handling Setup"];
      recommendedPlatform = "Node.js / Express / Background Workers";
    }

    // Scale multipliers
    if (scale === "small") {
      timelineWeeksMin = Math.max(2, Math.round(timelineWeeksMin * 0.75));
      timelineWeeksMax = Math.max(3, Math.round(timelineWeeksMax * 0.75));
    } else if (scale === "large") {
      timelineWeeksMin = Math.round(timelineWeeksMin * 1.4);
      timelineWeeksMax = Math.round(timelineWeeksMax * 1.5);
      team.push("1 Additional Senior Engineer");
      milestones.push("Continuous Integration & Scaling Stress Tests");
    }

    // Design fidelity adjustments
    if (fidelity === "premium") {
      timelineWeeksMax += 1;
      if (!team.includes("1 UI/UX Specialist") && !team.includes("1 Product Designer")) {
        team.unshift("1 Dedicated UI/UX Designer");
      }
      milestones.unshift("High-Fidelity Interactive Figma Prototype Crafting");
    }

    setEstimation({
      timeline: `${timelineWeeksMin} - ${timelineWeeksMax} Weeks`,
      team,
      milestones,
      recommendedPlatform
    });
  }, [type, scale, fidelity]);

  const typeLabels: Record<ProjectType, string> = {
    website: "Custom Corporate Web presence",
    saas: "SaaS & Web App Platforms",
    mobile: "Native / Cross-Platform Apps",
    ai: "Cognitive AI Agents & Tools",
    automation: "Workflow & CRM Automation"
  };

  return (
    <div id="project-estimator-root" className="w-full bg-white border border-brand-navy/5 rounded-3xl p-6 md:p-8 shadow-xl shadow-brand-navy/5 relative overflow-hidden">
      
      {/* Background Ornament */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none" />

      {/* Title Header bar */}
      <div className="flex items-center gap-3 border-b border-brand-navy/5 pb-4 mb-6">
        <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
          <Settings2 className="w-4 h-4" />
        </div>
        <div>
          <span className="font-display text-[10px] font-extrabold tracking-widest text-brand-blue uppercase">Resources Blueprint</span>
          <h3 className="font-display text-base font-bold text-brand-navy">Interactive Project Scope Estimator</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Select Type */}
          <div>
            <label className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider block mb-3">
              1. Project Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(typeLabels) as ProjectType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-2.5 rounded-xl border font-sans text-xs font-medium text-left transition-all cursor-pointer ${
                    type === t
                      ? "bg-brand-blue/5 border-brand-blue text-brand-blue shadow-sm shadow-brand-blue/5"
                      : "bg-white border-brand-navy/5 text-brand-navy hover:bg-brand-white/20"
                  }`}
                >
                  {typeLabels[t]}
                </button>
              ))}
            </div>
          </div>

          {/* Select Scale */}
          <div>
            <label className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider block mb-3">
              2. Feature Volume & Scale
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "small", label: "Core MVP / Simple", desc: "Up to 5 features / pages" },
                { id: "medium", label: "Growth / Medium", desc: "Up to 15 features / pages" },
                { id: "large", label: "Enterprise / Large", desc: "Unlimited scale & databases" }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setScale(s.id as ProjectScale)}
                  className={`p-3 rounded-xl border font-sans text-left transition-all cursor-pointer flex flex-col gap-1 ${
                    scale === s.id
                      ? "bg-brand-blue/5 border-brand-blue text-brand-blue shadow-sm"
                      : "bg-white border-brand-navy/5 text-brand-navy hover:bg-brand-white/20"
                  }`}
                >
                  <span className="font-display text-xs font-bold block">{s.label}</span>
                  <span className="text-[10px] text-brand-gray block leading-tight">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Select Fidelity */}
          <div>
            <label className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider block mb-3">
              3. Visual Design Fidelity
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "standard", label: "Tailored Styling Layouts", desc: "Clean modular UI design matching design codes" },
                { id: "premium", label: "High-Fidelity UI/UX Figma Drafts", desc: "Bespoke screen-by-screen prototype crafting" }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFidelity(f.id as DesignFidelity)}
                  className={`p-3 rounded-xl border font-sans text-left transition-all cursor-pointer flex flex-col gap-1 ${
                    fidelity === f.id
                      ? "bg-brand-blue/5 border-brand-blue text-brand-blue shadow-sm"
                      : "bg-white border-brand-navy/5 text-brand-navy hover:bg-brand-white/20"
                  }`}
                >
                  <span className="font-display text-xs font-bold block">{f.label}</span>
                  <span className="text-[10px] text-brand-gray block leading-tight">{f.desc}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Column */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-brand-white/50 border border-brand-navy/5 flex flex-col gap-6 shadow-inner relative">
            
            {/* Timeline Estimate card */}
            <div className="flex items-start gap-3.5 border-b border-brand-navy/5 pb-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-brand-navy/5 flex items-center justify-center shrink-0 text-brand-blue shadow-sm">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display text-[9px] font-bold text-brand-gray uppercase tracking-widest">Estimated Schedule</span>
                <div className="font-display text-xl font-black text-brand-navy mt-0.5">
                  {estimation.timeline}
                </div>
              </div>
            </div>

            {/* Suggested Team Allocation */}
            <div className="flex flex-col gap-2">
              <span className="font-display text-[9px] font-bold text-brand-gray uppercase tracking-widest flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-brand-blue" /> Recommended Team Configuration
              </span>
              <ul className="flex flex-col gap-1.5 mt-1">
                {estimation.team.map((member) => (
                  <li key={member} className="font-sans text-xs text-brand-navy/85 flex items-center gap-1.5 pl-0.5">
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
                    {member}
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Deliverable Milestones */}
            <div className="flex flex-col gap-2 border-t border-brand-navy/5 pt-4">
              <span className="font-display text-[9px] font-bold text-brand-gray uppercase tracking-widest flex items-center gap-1">
                <FileCode className="w-3.5 h-3.5 text-brand-blue" /> Execution Phases
              </span>
              <ul className="flex flex-col gap-2.5 mt-2">
                {estimation.milestones.map((milestone, idx) => (
                  <li key={milestone} className="flex items-start gap-2 text-xs text-brand-navy/80">
                    <CheckCircle className="w-4 h-4 text-brand-blue shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>
                      <strong className="font-display text-brand-navy">Phase 0{idx + 1}:</strong> {milestone}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Stack recommended */}
            <div className="border-t border-brand-navy/5 pt-4">
              <span className="font-sans text-[10px] text-brand-gray block">Engine Platform Recommendation:</span>
              <span className="font-display text-xs font-bold text-brand-navy block mt-0.5 bg-white border border-brand-navy/5 rounded-lg px-3 py-1.5 w-fit shadow-sm">
                {estimation.recommendedPlatform}
              </span>
            </div>

            {/* Non pricing warning */}
            <div className="flex items-start gap-1.5 text-[10px] text-amber-800 bg-amber-50/50 border border-amber-500/10 rounded-lg p-2.5">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-600 mt-0.5" />
              <p className="font-sans leading-relaxed">
                This is a resource blueprint estimation. No pricing is included. All solutions are custom-scoped.
              </p>
            </div>

            {/* Start project link */}
            <Link
              to="/start-a-project"
              className="inline-flex items-center justify-center font-display text-xs font-bold bg-brand-blue hover:bg-[#0070a6] text-white rounded-full py-3 shadow-md hover:shadow-brand-blue/10 transition-all w-full mt-2"
            >
              Get Custom Proposal <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>

          </div>
        </div>

      </div>

    </div>
  );
};
