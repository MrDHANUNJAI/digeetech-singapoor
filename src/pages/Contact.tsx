import React, { useState } from "react";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { Mail, Phone as PhoneIcon, MapPin, CheckCircle2, ChevronDown } from "lucide-react";

export const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Website",
    budget: "₹50,000 - ₹1,00,000",
    description: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    "Website", "App", "AI Agent", "AI Tool", "SaaS", "CRM", "ERP", 
    "Management Portal", "Automation", "Digital Marketing", "SEO", 
    "Meta Ads", "Graphic Design", "Branding", "Other"
  ];

  const budgets = [
    "Under ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹3,00,000",
    "₹3,00,000+"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
    }
  };

  return (
    <div id="contact-page" className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO */}
        <div id="contact-hero" className="max-w-3xl mb-16">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
            Inquiries
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight mt-2">
            Let's Build What's Next.
          </h1>
          <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-4">
            Have a project, software concept, or operational bottleneck? Fill out the inquiry form below, and our engineering leads will coordinate a feedback roadmap.
          </p>
        </div>

        {/* MAIN GRID */}
        <div id="contact-main-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Contact Coordinates */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="font-display text-lg font-bold text-brand-navy">
                Contact Coordinates
              </h3>
              <p className="font-sans text-xs text-brand-gray/85 leading-relaxed">
                Connect with our product and engineering team directly through our official channels.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              
              {/* Email Card */}
              <div className="p-5 rounded-xl border border-brand-navy/5 bg-white shadow-md flex gap-4 items-start hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-xs font-bold text-brand-blue uppercase tracking-wider">Email Us</span>
                  <span className="font-sans text-sm text-brand-navy font-semibold">contact@digeetech.com</span>
                  <span className="font-sans text-[10px] text-brand-gray">General & sales support</span>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-xl border border-brand-navy/5 bg-white shadow-md flex gap-4 items-start hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-xs font-bold text-brand-blue uppercase tracking-wider">Call Us</span>
                  <span className="font-sans text-sm text-brand-navy font-semibold">+91 (120) 000-0000</span>
                  <span className="font-sans text-[10px] text-brand-gray">Mon - Fri, 9am - 6pm IST</span>
                </div>
              </div>

              {/* Address Card */}
              <div className="p-5 rounded-xl border border-brand-navy/5 bg-white shadow-md flex gap-4 items-start hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-xs font-bold text-brand-blue uppercase tracking-wider">Office Location</span>
                  <span className="font-sans text-sm text-brand-navy font-semibold">Technical Park Block 4A</span>
                  <span className="font-sans text-xs text-brand-gray">Noida, Uttar Pradesh, India</span>
                  <span className="font-sans text-[10px] text-brand-gray">Visits by appointment only</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Submission Form */}
          <div className="lg:col-span-8">
            <div className="p-8 rounded-2xl bg-white border border-brand-navy/5 shadow-xl">
              
              {formSubmitted ? (
                <div id="contact-success-state" className="py-12 text-center flex flex-col items-center gap-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                  <h3 className="font-display text-2xl font-bold text-brand-navy mt-2">
                    Inquiry Received Successfully
                  </h3>
                  <p className="font-sans text-sm text-brand-gray max-w-md leading-relaxed">
                    Thank you for contacting Digeetech. Our product design and engineering leads will review your parameters and coordinate a feedback roadmap.
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
                        placeholder="John Doe"
                        className="w-full bg-brand-white/40 border border-[#D9E5EC] rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-[#737373] focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
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
                        placeholder="john@company.com"
                        className="w-full bg-brand-white/40 border border-[#D9E5EC] rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-[#737373] focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
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
                        placeholder="+91 99999 99999"
                        className="w-full bg-brand-white/40 border border-[#D9E5EC] rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-[#737373] focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
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
                        placeholder="Acme Corp"
                        className="w-full bg-brand-white/40 border border-[#D9E5EC] rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-[#737373] focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
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
                        className="w-full bg-brand-white border border-[#D9E5EC] rounded-lg px-4 py-3 text-sm text-brand-navy focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue appearance-none cursor-pointer"
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
                        Budget Range
                      </label>
                      <select
                        id="budget-select"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-brand-white border border-[#D9E5EC] rounded-lg px-4 py-3 text-sm text-brand-navy focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue appearance-none cursor-pointer"
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
                      placeholder="Please outline your general requirements, target goals, or background systems you'd like to integrate..."
                      rows={5}
                      className="w-full bg-brand-white/40 border border-[#D9E5EC] rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-[#737373] focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue resize-none"
                    />
                    {errors.description && <span className="text-[10px] text-red-500">{errors.description}</span>}
                  </div>

                  <Button id="btn-submit-contact-form" type="submit" variant="primary" className="w-full mt-2">
                    Submit Inquiry Form
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
