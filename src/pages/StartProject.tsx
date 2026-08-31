import React, { useState } from "react";
import { Button } from "../components/Button";
import { CheckCircle2, FileText, Sparkles, Send } from "lucide-react";

export const StartProject: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "Website Development",
    currentWebsite: "",
    description: "",
    features: "",
    targetAudience: "",
    budget: "₹50,000 - ₹1,00,000",
    timeline: "1 - 2 Months",
    additionalInfo: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const projectTypes = [
    "Website Development",
    "Mobile App Development",
    "AI Agent Customization",
    "SaaS Platform Development",
    "CRM System Scoping",
    "ERP Solution Architecture",
    "Business Automation Workflows",
    "Full-Stack Custom Software",
    "Branding & Logo System",
    "UI/UX Visual Design"
  ];

  const budgets = [
    "Under ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹3,00,000",
    "₹3,00,000+"
  ];

  const timelines = [
    "Under 1 Month",
    "1 - 2 Months",
    "2 - 4 Months",
    "4+ Months"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Your name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Your email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please specify a valid email address.";
    }
    if (!formData.description.trim()) {
      tempErrors.description = "A brief project description is required to scope the project.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div id="start-project-page" className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Background glow highlights */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* HERO TITLE */}
        <div id="start-project-hero" className="text-center flex flex-col items-center gap-4 mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-brand-blue/10 border border-brand-blue/20 rounded-full px-4 py-1.5 text-xs text-brand-blue font-display font-medium">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Product Blueprint scoping
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-brand-navy leading-tight">
            Start a Project
          </h1>
          <p className="font-sans text-sm md:text-base text-brand-gray leading-relaxed">
            Provide details about your operational target, features, and timeline constraints. Our system architects will evaluate the parameters and schedule a planning call.
          </p>
        </div>

        {/* SCORING INTAKE FORM CONTAINER */}
        <div className="bg-brand-white/40 rounded-3xl p-8 border border-brand-navy/5 shadow-2xl relative">
          
          {submitted ? (
            <div id="scoping-success-state" className="py-16 text-center flex flex-col items-center gap-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
              <h3 className="font-display text-2xl font-bold text-brand-navy mt-2">
                Project Intake Scoped
              </h3>
              <p className="font-sans text-sm text-brand-gray max-w-md leading-relaxed">
                Thank you, your project requirements have been successfully logged. Our product planning leads will analyze your parameters and contact you to establish a detailed blueprint.
              </p>
              <Button id="btn-scoping-new" variant="outline" onClick={() => setSubmitted(false)} className="mt-8">
                Scope a New Concept
              </Button>
            </div>
          ) : (
            <form id="project-scoping-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* SECTION: BASIC COORDINATES */}
              <div className="border-b border-brand-navy/10 pb-4">
                <span className="font-display text-xs font-bold text-brand-blue uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <FileText className="w-4 h-4" /> 01 / Basic Coordinates
                </span>
                <span className="font-sans text-[10px] text-brand-gray">How should we address and contact your organization?</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="intake-name" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Your Name *
                  </label>
                  <input
                    id="intake-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="E.g., Sarah Jenkins"
                    className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                  {errors.name && <span className="text-[10px] text-red-500">{errors.name}</span>}
                </div>

                {/* Company */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="intake-company" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Company Name
                  </label>
                  <input
                    id="intake-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="E.g., Horizon Logistics"
                    className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="intake-email" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    id="intake-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E.g., sarah@horizon.com"
                    className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                  {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="intake-phone" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    id="intake-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="E.g., +91 99999 99999"
                    className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                </div>
              </div>

              {/* SECTION: PROJECT PARAMETERS */}
              <div className="border-b border-brand-navy/10 pb-4 mt-4">
                <span className="font-display text-xs font-bold text-brand-blue uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <FileText className="w-4 h-4" /> 02 / Project Parameters
                </span>
                <span className="font-sans text-[10px] text-brand-gray">Outline your engineering roadmap specifications.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Type */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="intake-project-type" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Primary Project Type
                  </label>
                  <select
                    id="intake-project-type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue appearance-none cursor-pointer"
                  >
                    {projectTypes.map(pt => (
                      <option key={pt} value={pt} className="bg-white text-brand-navy">
                        {pt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Current Website */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="intake-current-website" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Current Website (If Any)
                  </label>
                  <input
                    id="intake-current-website"
                    type="url"
                    name="currentWebsite"
                    value={formData.currentWebsite}
                    onChange={handleInputChange}
                    placeholder="E.g., https://horizon.com"
                    className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label htmlFor="intake-description" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                  Project Description *
                </label>
                <textarea
                  id="intake-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Outline what you are building. What operational block, core services, or automation flows are we targeting?"
                  rows={4}
                  className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue resize-none"
                />
                {errors.description && <span className="text-[10px] text-red-500">{errors.description}</span>}
              </div>

              {/* Required Features */}
              <div className="flex flex-col gap-2">
                <label htmlFor="intake-features" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                  Key Features Required
                  </label>
                <textarea
                  id="intake-features"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  placeholder="E.g., Multi-tenant isolation, PDF report parsing, Stripe billing webhooks, real-time sync with custom ERP CRM..."
                  rows={2}
                  className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue resize-none"
                />
              </div>

              {/* Target Audience */}
              <div className="flex flex-col gap-2">
                <label htmlFor="intake-target-audience" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                  Target Audience / End Users
                </label>
                <input
                  id="intake-target-audience"
                  type="text"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  placeholder="E.g., Internal sales agents, external retail customers, administrative operations teams..."
                  className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
              </div>

              {/* SECTION: BUDGETS & TIMELINES */}
              <div className="border-b border-brand-navy/10 pb-4 mt-4">
                <span className="font-display text-xs font-bold text-brand-blue uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <FileText className="w-4 h-4" /> 03 / Budgets & Timelines
                </span>
                <span className="font-sans text-[10px] text-brand-gray">Establish resource parameters for the scoping blueprint.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Budget */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="intake-budget" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Budget Range
                  </label>
                  <select
                    id="intake-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue appearance-none cursor-pointer"
                  >
                    {budgets.map(b => (
                      <option key={b} value={b} className="bg-white text-brand-navy">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="intake-timeline" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Expected Timeline
                  </label>
                  <select
                    id="intake-timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue appearance-none cursor-pointer"
                  >
                    {timelines.map(t => (
                      <option key={t} value={t} className="bg-white text-brand-navy">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Information */}
              <div className="flex flex-col gap-2">
                <label htmlFor="intake-additional-info" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                  Additional Information
                </label>
                <textarea
                  id="intake-additional-info"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  placeholder="Any extra infrastructure notes, existing databases, API documentation links, or references..."
                  rows={2}
                  className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue resize-none"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                id="btn-submit-scoping-form"
                type="submit"
                variant="primary"
                className="w-full mt-4 flex items-center justify-center gap-2"
              >
                Submit Project Request <Send className="w-4 h-4" />
              </Button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
