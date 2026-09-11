import React from "react";
import { SectionHeader } from "../components/SectionHeader";
import { Button } from "../components/Button";
import { Laptop, Cpu, Database, Server, Smartphone, BarChart } from "lucide-react";

import techStackImg from "../assets/images/tech_stack.jpg";
import cloudArchImg from "../assets/images/cloud_architecture_1789130783930.jpg";
import aiAgentsImg from "../assets/images/ai_agents_tech.jpg";
import { Card3D } from "../components/3d/Card3D";
import { ScrollReveal3D } from "../components/3d/ScrollReveal3D";
import { Floating3DBackground } from "../components/3d/Floating3DBackground";

export const Technology: React.FC = () => {
  const categories = [
    {
      title: "Frontend Engineering",
      icon: <Laptop className="w-5 h-5 text-brand-blue" />,
      desc: "For user-facing interfaces, we build lightweight, modular, and dynamic Single-Page Applications (SPAs) or server-rendered layouts.",
      techs: ["React 19", "TypeScript", "Vite", "Next.js", "Tailwind CSS", "HTML5/Semantic CSS"]
    },
    {
      title: "Backend & System APIs",
      icon: <Server className="w-5 h-5 text-brand-blue" />,
      desc: "Our backends prioritize type-safe RESTful or GraphQL endpoints, proper JWT session handling, and low-latency response times.",
      techs: ["Node.js", "Express", "Python", "FastAPI", "Go", "JSON-REST / GraphQL"]
    },
    {
      title: "Cognitive AI Integration",
      icon: <Cpu className="w-5 h-5 text-brand-blue" />,
      desc: "We connect systems with reasoning Large Language Models, configuring context databases, tool calling limits, and safety boundaries.",
      techs: ["@google/genai", "Gemini 2.5 Pro/Flash", "LangChain", "Vector Indexes", "Semantic Embeddings"]
    },
    {
      title: "Database Architectures",
      icon: <Database className="w-5 h-5 text-brand-blue" />,
      desc: "We model robust relational structures with optimized indexes, transactions, and secure isolation rules.",
      techs: ["PostgreSQL", "MongoDB", "Firestore", "Prisma ORM", "Drizzle Kit", "Redis Caching"]
    },
    {
      title: "Mobile App Platforms",
      icon: <Smartphone className="w-5 h-5 text-brand-blue" />,
      desc: "We develop responsive native Swift and Kotlin applications or compile high-performance hybrid assets.",
      techs: ["React Native", "Flutter", "Swift (iOS)", "Kotlin (Android)", "Jetpack Compose"]
    },
    {
      title: "Cloud Containers & DevOps",
      icon: <Cpu className="w-5 h-5 text-brand-blue" />,
      desc: "We package builds in secure Docker containers, coordinating scaling metrics and active logging monitors.",
      techs: ["Google Cloud Run", "Docker Containers", "GitHub Actions CI/CD", "SSL Gateways", "Cloud Storage"]
    }
  ];

  return (
    <div id="technology-page" className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      <Floating3DBackground />

      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HERO */}
        <ScrollReveal3D direction="up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
              Our Stack
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight mt-2">
              Engineered For Stability
            </h1>
            <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-4">
              We avoid experimental, unvetted frameworks. We select technologies that feature substantial community support, robust security, and optimal execution speeds, guaranteeing that your proprietary code is a long-term business asset.
            </p>
          </div>
          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-xl border border-brand-navy/10 group">
            <img
              src={techStackImg}
              alt="Digee Tech Technology Infrastructure Architecture"
              referrerPolicy="no-referrer"
              className="w-full h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </ScrollReveal3D>

        {/* TECH CATEGORIES GRID */}
        <div id="tech-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <ScrollReveal3D key={cat.title} direction="up" delay={0.1 * idx}>
              <Card3D id={`tech-cat-card-${idx}`} className="h-full">
                <div className="p-8 rounded-2xl border border-brand-navy/5 bg-white flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                      {cat.icon}
                    </div>
                    <h3 className="font-display text-lg font-bold text-brand-navy">
                      {cat.title}
                    </h3>
                    <p className="font-sans text-sm text-brand-gray leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-8 border-t border-brand-navy/5 pt-4">
                    {cat.techs.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-sans text-brand-blue bg-brand-blue/5 border border-brand-blue/15 rounded px-2.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Card3D>
            </ScrollReveal3D>
          ))}
        </div>

        {/* VISUAL INFRASTRUCTURE & COGNITIVE AI SHOWCASE */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden border border-brand-navy/10 shadow-lg relative group">
            <img
              src={cloudArchImg}
              alt="High Availability Cloud Data Center"
              referrerPolicy="no-referrer"
              className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="font-display text-xs font-bold text-cyan-400 uppercase tracking-wider">Cloud Infrastructure</span>
              <h4 className="font-display text-lg font-bold">Google Cloud & Containerized Deployments</h4>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-brand-navy/10 shadow-lg relative group">
            <img
              src={aiAgentsImg}
              alt="AI Cognitive Agent Framework"
              referrerPolicy="no-referrer"
              className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="font-display text-xs font-bold text-cyan-400 uppercase tracking-wider">AI Integration</span>
              <h4 className="font-display text-lg font-bold">Cognitive LLMs & Vector Search Indexing</h4>
            </div>
          </div>
        </div>

        {/* BOTTOM PHILOSOPHY CALLOUT */}
        <div id="tech-philosophy-callout" className="mt-20 p-8 rounded-2xl bg-brand-white/40 border border-brand-navy/5 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
          <div className="max-w-xl">
            <h4 className="font-display text-base font-bold text-brand-navy mb-2">
              Our Security & Code Handover Policy
            </h4>
            <p className="font-sans text-xs text-brand-gray leading-relaxed">
              We compile code following strict industry security standards (form parameter filtering, encrypted cloud storage buckets, and secure environment keys). Upon project completion and final approvals, we hand over 100% of the editable source repositories and system documentation.
            </p>
          </div>
          <Button id="tech-cta-start" variant="primary" to="/start-a-project" className="shrink-0">
            Start Your Project
          </Button>
        </div>

      </div>
    </div>
  );
};
