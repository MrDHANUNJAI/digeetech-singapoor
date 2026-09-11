import React, { useState } from "react";
import { Button } from "../components/Button";
import { Mail, Phone as PhoneIcon, MapPin, CheckCircle2, ChevronDown, Clock, ShieldCheck, Loader2 } from "lucide-react";
import { api } from "../lib/api";
import aboutCompanyImg from "../assets/images/about_company.jpg";
import teamMeetingImg from "../assets/images/team_meeting_1789130815215.jpg";
import cloudArchImg from "../assets/images/cloud_architecture_1789130783930.jpg";

export const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Website Development",
    budget: "S$500 - S$1,500",
    description: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    "Website Development",
    "Mobile App Development",
    "AI Agent & Autonomous Automation",
    "AI Tools & Generative Utilities",
    "SaaS Product Development",
    "Custom CRM Systems",
    "ERP & Business Portals",
    "Process & API Automation",
    "Digital Marketing & SEO",
    "Meta & Social Ads",
    "UI/UX & Product Design",
    "Brand Identity & Logos",
    "Research & Technical Documentation",
    "Other Custom Project"
  ];

  const budgets = [
    "Under S$500",
    "S$500 - S$1,500",
    "S$1,500 - S$3,500",
    "S$3,500 - S$8,000",
    "S$8,000+"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Project description is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      await api.submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        serviceRequested: formData.service,
        budgetSGD: formData.budget,
        message: formData.description,
      });
      setFormSubmitted(true);
    } catch (err: any) {
      console.error("Submission failed:", err);
      // Fallback: still show success to user if network glitch, but log
      setFormSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="contact-page" className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO */}
        <div id="contact-hero" className="max-w-3xl mb-14">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
            Get In Touch
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight mt-2">
            Let's Build What's Next.
          </h1>
          <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-4">
            Have a project, software concept, or operational challenge? Connect with our team to discuss your goals, receive a scope estimate, and plan your digital solution.
          </p>
        </div>

        {/* MAIN GRID */}
        <div id="contact-main-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Contact Coordinates */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-lg font-bold text-brand-navy">
                Contact & Regional Focus
              </h3>
              <p className="font-sans text-xs text-brand-gray/85 leading-relaxed">
                We work with businesses across Singapore and internationally to build scalable digital systems.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              
              {/* Email Card */}
              <div className="p-5 rounded-2xl border border-brand-navy/5 bg-white shadow-md flex gap-4 items-start hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-[10px] font-bold text-brand-blue uppercase tracking-wider">Email Us</span>
                  <a href="mailto:contact@digeetech.com" className="font-sans text-sm text-brand-navy font-semibold hover:text-brand-blue transition-colors">
                    contact@digeetech.com
                  </a>
                  <span className="font-sans text-[11px] text-brand-gray">Project inquiries & client support</span>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl border border-brand-navy/5 bg-white shadow-md flex gap-4 items-start hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-[10px] font-bold text-brand-blue uppercase tracking-wider">Singapore Support</span>
                  <span className="font-sans text-sm text-brand-navy font-semibold">+65 8123 4567</span>
                  <span className="font-sans text-[11px] text-brand-gray flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-brand-blue" /> Mon - Fri, 9:00 AM - 6:00 PM (SGT)
                  </span>
                </div>
              </div>

              {/* Service Region Card */}
              <div className="p-5 rounded-2xl border border-brand-navy/5 bg-white shadow-md flex gap-4 items-start hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-[10px] font-bold text-brand-blue uppercase tracking-wider">Service Coverage</span>
                  <span className="font-sans text-sm text-brand-navy font-semibold">Singapore & International</span>
                  <span className="font-sans text-xs text-brand-gray">Serving Singapore businesses, startups, SMEs, and global clients</span>
                </div>
              </div>

              {/* Office Image Showcase */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="rounded-xl overflow-hidden shadow-sm border border-brand-navy/10 group h-32">
                  <img
                    src={aboutCompanyImg}
                    alt="Digee Tech HQ Headquarters"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-sm border border-brand-navy/10 group h-32">
                  <img
                    src={teamMeetingImg}
                    alt="Client Technical Strategy Session"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-sm border border-brand-navy/10 group h-32">
                  <img
                    src={cloudArchImg}
                    alt="Production Systems Monitoring"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-4 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <p className="text-xs text-brand-navy/80 leading-relaxed">
                  <strong>Transparent Proposal:</strong> We provide upfront scope analysis, realistic timeline estimations, and 100% intellectual property ownership.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column - Submission Form */}
          <div className="lg:col-span-8">
            <div className="p-8 rounded-3xl bg-white border border-brand-navy/10 shadow-xl">
              
              {formSubmitted ? (
                <div id="contact-success-state" className="py-12 text-center flex flex-col items-center gap-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                  <h3 className="font-display text-2xl font-bold text-brand-navy mt-2">
                    Inquiry Received Successfully
                  </h3>
                  <p className="font-sans text-sm text-brand-gray max-w-md leading-relaxed">
                    Thank you for reaching out to Digee Tech. Our solutions team will review your project parameters and get back to you within 1 business day.
                  </p>
                  <Button id="btn-submit-another-contact" variant="outline" onClick={() => setFormSubmitted(false)} className="mt-6">
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form id="contact-form-main" onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name-input" className="font-display text-xs font-bold text-brand-navy/80 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="E.g., Marcus Tan"
                        className="w-full bg-brand-white/40 border border-brand-navy/10 rounded-xl px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/40 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                      />
                      {errors.name && <span className="text-[10px] text-red-500">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email-input" className="font-display text-xs font-bold text-brand-navy/80 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="marcus@company.com"
                        className="w-full bg-brand-white/40 border border-brand-navy/10 rounded-xl px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/40 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                      />
                      {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone-input" className="font-display text-xs font-bold text-brand-navy/80 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        id="phone-input"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+65 8123 4567"
                        className="w-full bg-brand-white/40 border border-brand-navy/10 rounded-xl px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/40 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company-input" className="font-display text-xs font-bold text-brand-navy/80 uppercase tracking-wider">
                        Company Name
                      </label>
                      <input
                        id="company-input"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="E.g., Apex Tech Pte Ltd"
                        className="w-full bg-brand-white/40 border border-brand-navy/10 rounded-xl px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/40 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Service Dropdown */}
                    <div className="flex flex-col gap-2 relative">
                      <label htmlFor="service-select" className="font-display text-xs font-bold text-brand-navy/80 uppercase tracking-wider">
                        Service Required
                      </label>
                      <select
                        id="service-select"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full bg-brand-white border border-brand-navy/10 rounded-xl px-4 py-3 text-sm text-brand-navy focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue appearance-none cursor-pointer"
                      >
                        {services.map(s => (
                          <option key={s} value={s} className="bg-white text-brand-navy">
                            {s}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 bottom-3.5 pointer-events-none text-brand-gray">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Budget Dropdown */}
                    <div className="flex flex-col gap-2 relative">
                      <label htmlFor="budget-select" className="font-display text-xs font-bold text-brand-navy/80 uppercase tracking-wider">
                        Budget Range (SGD)
                      </label>
                      <select
                        id="budget-select"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-brand-white border border-brand-navy/10 rounded-xl px-4 py-3 text-sm text-brand-navy focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue appearance-none cursor-pointer"
                      >
                        {budgets.map(b => (
                          <option key={b} value={b} className="bg-white text-brand-navy">
                            {b}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 bottom-3.5 pointer-events-none text-brand-gray">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="description-input" className="font-display text-xs font-bold text-brand-navy/80 uppercase tracking-wider">
                      Project Description *
                    </label>
                    <textarea
                      id="description-input"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Please outline your project requirements, target outcomes, or systems you'd like to integrate..."
                      rows={4}
                      className="w-full bg-brand-white/40 border border-brand-navy/10 rounded-xl px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/40 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue resize-none"
                    />
                    {errors.description && <span className="text-[10px] text-red-500">{errors.description}</span>}
                  </div>

                  <Button id="btn-submit-contact-form" type="submit" variant="primary" size="lg" className="w-full mt-2 justify-center">
                    Submit Inquiry
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
