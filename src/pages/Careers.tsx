import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Send } from "lucide-react";
import aboutCompanyImg from "../assets/images/about_company.jpg";
import teamMeetingImg from "../assets/images/team_meeting_1789130815215.jpg";
import internshipLearningImg from "../assets/images/internship_learning.jpg";

export const Careers: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Full Stack Engineer",
    experience: "2-4 years",
    portfolio: "",
    message: ""
  });

  const openPositions = [
    {
      title: "Senior Full-Stack Engineer",
      dept: "Engineering",
      location: "Remote / Hybrid",
      type: "Full-Time",
      desc: "Looking for an expert React, TypeScript, and Node.js engineer to build scalable SaaS products and complex business systems."
    },
    {
      title: "AI & Machine Learning Engineer",
      dept: "Artificial Intelligence",
      location: "Remote / Hybrid",
      type: "Full-Time",
      desc: "Build autonomous AI agents, fine-tune LLM prompt architectures, and integrate secure RAG vector databases."
    },
    {
      title: "UI/UX Product Designer",
      dept: "Design",
      location: "Remote",
      type: "Full-Time",
      desc: "Design clean, high-fidelity user journeys, responsive interfaces, and comprehensive design systems in Figma."
    },
    {
      title: "Technical Content & Research Writer",
      dept: "Research & Marketing",
      location: "Remote",
      type: "Full-Time / Freelance",
      desc: "Draft technical whitepapers, research articles, and high-quality documentation for emerging technologies."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="careers-page" className="w-full relative overflow-x-hidden pt-32 pb-24 bg-white text-brand-navy">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 mb-20">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 rounded-full px-4 py-1.5 text-xs text-brand-blue font-display font-bold tracking-wide mx-auto">
            Careers at Digee Tech
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy tracking-tight">
            Build the Future <span className="text-gradient-blue">With Us</span>
          </h1>
          <p className="font-sans text-lg text-brand-gray leading-relaxed">
            Join a forward-thinking team of engineers, designers, AI researchers, and digital growth experts dedicated to building intelligent technology that creates genuine impact.
          </p>

          <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-brand-navy/10 group h-64">
              <img
                src={aboutCompanyImg}
                alt="Digee Tech Engineering Team Collaboration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-brand-navy/10 group h-64">
              <img
                src={teamMeetingImg}
                alt="Product Strategy & Sprint Reviews"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-brand-navy/10 group h-64">
              <img
                src={internshipLearningImg}
                alt="Engineering Mentorship & Mentoring"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="flex flex-col gap-6 mb-24 max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-extrabold text-brand-navy mb-2">
            Open Positions
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {openPositions.map((pos, idx) => (
              <div 
                key={idx}
                className="glass-panel p-8 rounded-3xl border border-brand-navy/5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xs font-bold text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full">
                      {pos.dept}
                    </span>
                    <span className="font-sans text-xs text-brand-gray flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-blue" /> {pos.location}
                    </span>
                    <span className="font-sans text-xs text-brand-gray flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-blue" /> {pos.type}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand-navy">
                    {pos.title}
                  </h3>
                  <p className="font-sans text-sm text-brand-gray max-w-2xl leading-relaxed">
                    {pos.desc}
                  </p>
                </div>

                <div className="shrink-0">
                  <Button variant="primary" size="md" to="#apply-form" onClick={() => {
                    const el = document.getElementById("apply-form");
                    el?.scrollIntoView({ behavior: "smooth" });
                    setFormData(prev => ({ ...prev, role: pos.title }));
                  }}>
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form Section */}
        <div id="apply-form" className="max-w-3xl mx-auto glass-panel p-10 sm:p-12 rounded-3xl border border-brand-navy/10 shadow-2xl bg-white">
          <div className="flex flex-col gap-3 text-center mb-10">
            <h3 className="font-display text-3xl font-extrabold text-brand-navy">
              Submit Your Application
            </h3>
            <p className="font-sans text-sm text-brand-gray">
              Don't see your exact role listed? Send us your CV and portfolio anyway—we are always looking for exceptional talent.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-display text-2xl font-bold text-brand-navy">
                Application Received!
              </h4>
              <p className="font-sans text-sm text-brand-gray max-w-md leading-relaxed">
                Thank you for applying to Digee Tech. Our HR and technical leads will review your portfolio and get back to you shortly.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>
                Submit Another Application
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-[#fafafa] focus:outline-none focus:border-brand-blue transition-colors text-sm font-sans text-brand-navy"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-[#fafafa] focus:outline-none focus:border-brand-blue transition-colors text-sm font-sans text-brand-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+65 8123 4567"
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-[#fafafa] focus:outline-none focus:border-brand-blue transition-colors text-sm font-sans text-brand-navy"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy">Position *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-[#fafafa] focus:outline-none focus:border-brand-blue transition-colors text-sm font-sans text-brand-navy"
                  >
                    <option value="Senior Full-Stack Engineer">Senior Full-Stack Engineer</option>
                    <option value="AI & Machine Learning Engineer">AI & Machine Learning Engineer</option>
                    <option value="UI/UX Product Designer">UI/UX Product Designer</option>
                    <option value="Technical Content & Research Writer">Technical Content & Research Writer</option>
                    <option value="General Open Application">General Open Application</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy">Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-[#fafafa] focus:outline-none focus:border-brand-blue transition-colors text-sm font-sans text-brand-navy"
                  >
                    <option value="0-1 years">0-1 years (Junior)</option>
                    <option value="2-4 years">2-4 years (Mid-Level)</option>
                    <option value="5+ years">5+ years (Senior / Lead)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy">Portfolio / LinkedIn / GitHub URL *</label>
                <input
                  type="url"
                  required
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  placeholder="https://github.com/yourname or https://linkedin.com/in/yourname"
                  className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-[#fafafa] focus:outline-none focus:border-brand-blue transition-colors text-sm font-sans text-brand-navy"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy">Cover Note / Introduction</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us briefly about your technical background and why you want to join Digee Tech..."
                  className="w-full px-4 py-3 rounded-xl border border-brand-navy/15 bg-[#fafafa] focus:outline-none focus:border-brand-blue transition-colors text-sm font-sans text-brand-navy"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
                Submit Application <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
