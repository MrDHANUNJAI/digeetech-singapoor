import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { 
  BookOpen, FileText, CheckCircle2, AlertTriangle, Award, 
  Search, ShieldCheck, ArrowRight, Download, Presentation 
} from "lucide-react";
import researchPaperImg from "../assets/images/research_paper.jpg";
import techStackImg from "../assets/images/tech_stack.jpg";
import aiAgentsImg from "../assets/images/ai_agents_tech.jpg";

export const Research: React.FC = () => {
  const researchServices = [
    {
      title: "Research Paper Writing & Drafting",
      desc: "Assisting researchers, scholars, and industry innovators in synthesizing empirical findings into clear, rigorous, and publication-ready academic manuscripts.",
      icon: <FileText className="w-6 h-6 text-brand-blue" />
    },
    {
      title: "Literature Review & Synthesis",
      desc: "Comprehensive analysis of existing literature, identifying research gaps, summarizing methodologies, and structuring theoretical frameworks.",
      icon: <Search className="w-6 h-6 text-brand-blue" />
    },
    {
      title: "Technical & Project Documentation",
      desc: "Drafting rigorous technical specification documents, system architecture whitepapers, software documentation, and R&D reports.",
      icon: <BookOpen className="w-6 h-6 text-brand-blue" />
    },
    {
      title: "Formatting & Journal Submission Support",
      desc: "Formatting manuscripts according to specific IEEE, Springer, Elsevier, ACM, or university guidelines and preparing response-to-reviewer drafts.",
      icon: <CheckCircle2 className="w-6 h-6 text-brand-blue" />
    },
    {
      title: "Research Presentations & PPT Creation",
      desc: "Designing professional academic slide decks, visual data charts, and conference presentation materials that clearly communicate complex findings.",
      icon: <Presentation className="w-6 h-6 text-brand-blue" />
    },
    {
      title: "Thesis & Dissertation Structuring",
      desc: "Guidance on chapter organization, methodology alignment, mathematical proof formatting, statistical analysis interpretation, and citation management.",
      icon: <Award className="w-6 h-6 text-brand-blue" />
    }
  ];

  return (
    <div id="research-page" className="w-full relative overflow-x-hidden pt-32 pb-24 bg-white text-brand-navy">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 mb-20">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 rounded-full px-4 py-1.5 text-xs text-brand-blue font-display font-bold tracking-wide mx-auto">
            Research & Academic Support
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy tracking-tight">
            Advancing Knowledge Through <span className="text-gradient-blue">Technical Research</span>
          </h1>
          <p className="font-sans text-lg text-brand-gray leading-relaxed">
            Digee Tech supports academic researchers, university students, and R&D divisions with rigorous technical documentation, paper drafting, literature reviews, and publication preparation.
          </p>

          <div className="w-full mt-4 rounded-2xl overflow-hidden shadow-xl border border-brand-navy/10 group">
            <img
              src={researchPaperImg}
              alt="Digee Tech Research & Academic Paper Consulting"
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Academic Disclaimer Notice */}
        <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 bg-amber-50/50 flex items-start gap-4 mb-20 max-w-4xl mx-auto">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <h4 className="font-display text-sm font-bold text-brand-navy">
              Important Academic & Publication Support Disclaimer
            </h4>
            <p className="font-sans text-xs text-brand-gray leading-relaxed">
              Research and publication support provided by Digee Tech does not guarantee acceptance by any journal, conference, publisher, or academic institution. Peer-review decisions rest entirely with respective editors and review committees.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {researchServices.map((srv, idx) => (
            <div 
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-brand-navy/5 flex flex-col justify-between hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300 group"
            >
              <div className="flex flex-col gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                  {srv.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-xl font-bold text-brand-navy">
                    {srv.title}
                  </h3>
                  <p className="font-sans text-sm text-brand-gray leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Section */}
        <div className="glass-panel rounded-3xl p-12 border border-brand-navy/5 bg-brand-white/40 mb-24 flex flex-col gap-12">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="font-display text-xs font-bold text-brand-blue uppercase tracking-widest">
              Structured Process
            </span>
            <h2 className="font-display text-3xl font-extrabold text-brand-navy">
              How We Support Your Research
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Scope & Objective", desc: "Defining research questions, target journal guidelines, and structural requirements." },
              { step: "02", title: "Review & Analysis", desc: "Conducting thorough literature synthesis, methodology structuring, and data organization." },
              { step: "03", title: "Drafting & Formatting", desc: "Writing clear academic prose, equations, figures, and formatting citations." },
              { step: "04", title: "Review & Submission", desc: "Final proofreading, plagiarism checks, and compiling final camera-ready packages." }
            ].map((p, i) => (
              <div key={i} className="flex flex-col gap-3 p-6 rounded-2xl bg-white border border-brand-navy/5">
                <span className="font-display text-2xl font-extrabold text-brand-blue">{p.step}</span>
                <h4 className="font-display text-base font-bold text-brand-navy">{p.title}</h4>
                <p className="font-sans text-xs text-brand-gray leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* VISUAL RESEARCH & COMPUTATIONAL SHOWCASE */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden border border-brand-navy/10 shadow-lg relative group">
            <img
              src={techStackImg}
              alt="Rigorous Data Analysis and Empirical Documentation"
              referrerPolicy="no-referrer"
              className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="font-display text-xs font-bold text-cyan-400 uppercase tracking-wider">Methodology & Code</span>
              <h4 className="font-display text-lg font-bold">Empirical Verification & Code Documentation</h4>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-brand-navy/10 shadow-lg relative group">
            <img
              src={aiAgentsImg}
              alt="AI Systems Research & Literature Synthesis"
              referrerPolicy="no-referrer"
              className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="font-display text-xs font-bold text-cyan-400 uppercase tracking-wider">Literature & RAG</span>
              <h4 className="font-display text-lg font-bold">Semantic Literature Synthesis & IEEE Formatting</h4>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-panel rounded-3xl p-12 border border-brand-blue/20 bg-gradient-to-br from-brand-navy/5 to-brand-blue/10 flex flex-col items-center text-center gap-6">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-navy">
            Ready to Accelerate Your Research?
          </h2>
          <p className="font-sans text-base text-brand-gray max-w-2xl leading-relaxed">
            Collaborate with our R&D specialists to structure, format, and polish your research papers and technical documentation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Button variant="primary" size="lg" to="/start-a-project">
              Request Research Support
            </Button>
            <Button variant="outline" size="lg" to="/contact">
              Contact Research Team
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
