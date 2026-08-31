import React, { useState } from "react";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { Award, BookOpen, Clock, CheckCircle2, ChevronRight, GraduationCap } from "lucide-react";

export const Internships: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", domain: "Full-Stack Web Development", qualification: "", duration: "3 Months" });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.qualification.trim()) {
      setError("Please fill out your name, email, and current qualification.");
      return;
    }
    setSubmitted(true);
  };

  const programs = [
    {
      title: "Full-Stack Web Development",
      duration: "3 - 6 Months",
      learning: ["React 19 & TypeScript compilation setups", "Tailwind CSS v4 visual layout models", "Node.js & Express server structures", "PostgreSQL database relational querying"]
    },
    {
      title: "Cognitive AI Implementations",
      duration: "3 - 6 Months",
      learning: ["@google/genai SDK integration processes", "Structured prompting & LLM system instructions", "Vector embedding indexing & RAG setups", "Dynamic API tool calling limits"]
    }
  ];

  return (
    <div id="internships-page" className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO */}
        <div id="internships-hero" className="max-w-3xl mb-16">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
            Careers & Training
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight mt-2">
            Technical Internships
          </h1>
          <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-4">
            Digeetech hosts structured practical training and internship programs for tech-forward students and engineers. Learn following strict type-safe guidelines and collaborate on real blueprints.
          </p>
        </div>

        {/* SPLIT GRID */}
        <div id="internships-main-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left - Programs list */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h3 className="font-display text-xl font-bold text-brand-navy border-b border-brand-navy/10 pb-3">
              Available Internship Programs
            </h3>

            {programs.map((prog, idx) => (
              <div
                key={prog.title}
                className="p-8 rounded-2xl border border-brand-navy/5 bg-white shadow-md hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300 flex flex-col gap-5"
              >
                <div className="flex flex-col gap-1">
                  <h4 className="font-display text-lg font-bold text-brand-navy">{prog.title}</h4>
                  <span className="font-sans text-xs text-brand-blue flex items-center gap-1.5 mt-1">
                    <Clock className="w-3.5 h-3.5" /> Duration: {prog.duration}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">Learning Outcomes:</span>
                  <ul className="flex flex-col gap-2 pl-1">
                    {prog.learning.map((learn) => (
                      <li key={learn} className="flex items-start gap-2.5 text-xs text-brand-gray">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <span>{learn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-brand-white/40 border border-brand-navy/5 shadow-md relative">
              
              {submitted ? (
                <div id="internship-success" className="py-12 text-center flex flex-col items-center gap-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                  <h4 className="font-display text-xl font-bold text-brand-navy mt-2">
                    Application Logged
                  </h4>
                  <p className="font-sans text-xs text-brand-gray max-w-sm leading-relaxed">
                    Thank you! We have logged your internship coordinates. Our system developers will review your credentials and qualification indices and contact you.
                  </p>
                  <Button id="btn-intern-reset" variant="outline" onClick={() => setSubmitted(false)} className="mt-6">
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                <form id="internship-form" onSubmit={handleApply} className="flex flex-col gap-5">
                  <div className="border-b border-brand-navy/10 pb-3">
                    <h4 className="font-display text-sm font-bold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-brand-blue" /> Internship Application
                    </h4>
                    <span className="font-sans text-[10px] text-brand-gray">Apply to join our upcoming training and coding cohort.</span>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-400/10 border border-red-400/20 rounded text-xs text-red-500">
                      {error}
                    </div>
                  )}

                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="int-name" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      id="int-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="E.g., Alex Johnson"
                      className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="int-email" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      id="int-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="E.g., alex@university.edu"
                      className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none"
                    />
                  </div>

                  {/* Domain */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="int-domain" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Target Domain
                    </label>
                    <select
                      id="int-domain"
                      name="domain"
                      value={formData.domain}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy focus:border-brand-blue focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                      <option value="Cognitive AI Implementations">Cognitive AI Implementations</option>
                    </select>
                  </div>

                  {/* Qualification */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="int-qualification" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Current Qualification *
                    </label>
                    <input
                      id="int-qualification"
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      placeholder="E.g., B.Tech Computer Science (3rd Year)"
                      className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none"
                    />
                  </div>

                  {/* Duration */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="int-duration" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Internship Duration
                    </label>
                    <select
                      id="int-duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy focus:border-brand-blue focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="3 Months">3 Months (Part-Time / Full-Time)</option>
                      <option value="6 Months">6 Months (Semester Placement)</option>
                    </select>
                  </div>

                  <Button id="btn-submit-intern-form" type="submit" variant="primary" className="w-full mt-2 flex items-center justify-center gap-1">
                    Apply For Internship <ChevronRight className="w-4 h-4 text-white" />
                  </Button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
