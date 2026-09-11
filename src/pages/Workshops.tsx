import React, { useState } from "react";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { Calendar, Clock, MapPin, CheckCircle2, Award, Zap } from "lucide-react";
import internshipLearningImg from "../assets/images/internship_learning.jpg";
import techStackImg from "../assets/images/tech_stack.jpg";
import teamMeetingImg from "../assets/images/team_meeting_1789130815215.jpg";

export const Workshops: React.FC = () => {
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", experience: "Intermediate" });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please fill out your name and email address.");
      return;
    }
    setRegistered(true);
  };

  const upcomingWorkshops = [
    {
      title: "Building Corporate Websites with Custom AI Agents",
      date: "September 24, 2026",
      time: "2:00 PM - 5:00 PM IST",
      location: "Live Interactive Webinar (Google Meet)",
      desc: "Learn to design custom semantic prompts, bind database APIs, configure tool usage boundaries, and deploy cognitive agents that automate corporate customer-support lines.",
      price: "Complimentary for Partners"
    }
  ];

  return (
    <div id="workshops-page" className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO */}
        <div id="workshops-hero" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
              Technical Education
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight mt-2">
              Technical Workshops
            </h1>
            <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-4">
              We host specialized training blocks covering full-stack compilation, RAG databases, cognitive agents workflows, and optimized SEO pipelines for our business clients and development community.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl overflow-hidden border border-brand-navy/10 shadow-md group h-48">
              <img
                src={internshipLearningImg}
                alt="Interactive Workshop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="rounded-xl overflow-hidden border border-brand-navy/10 shadow-md group h-48">
              <img
                src={techStackImg}
                alt="Hands-on Code Training"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="rounded-xl overflow-hidden border border-brand-navy/10 shadow-md group h-48">
              <img
                src={teamMeetingImg}
                alt="Mentorship & Certification"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* MAIN SPLIT GRID */}
        <div id="workshops-main-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left - Workshop listings */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h3 className="font-display text-xl font-bold text-brand-navy border-b border-brand-navy/10 pb-3">
              Upcoming Workshops
            </h3>

            {upcomingWorkshops.map((w) => (
              <div
                key={w.title}
                className="p-8 rounded-2xl border border-brand-navy/5 bg-white shadow-md hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300 flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-brand-blue uppercase bg-brand-blue/10 rounded-full px-2.5 py-1 w-fit border border-brand-blue/15">
                    Live Workshop
                  </span>
                  <h4 className="font-display text-xl font-bold text-brand-navy leading-snug mt-1">
                    {w.title}
                  </h4>
                  <p className="font-sans text-sm text-brand-gray leading-relaxed mt-2">
                    {w.desc}
                  </p>
                </div>

                <div className="flex flex-col gap-3 font-sans text-xs text-brand-gray border-t border-brand-navy/5 pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-blue" />
                    <span><strong>Date:</strong> {w.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-blue" />
                    <span><strong>Time:</strong> {w.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-blue" />
                    <span><strong>Location:</strong> {w.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-brand-navy/5 pt-4 text-xs font-display font-bold">
                  <span className="text-brand-blue uppercase tracking-wider">{w.price}</span>
                  <span className="text-brand-gray font-normal font-sans">Certificate of Attendance Included</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Registration form */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-brand-white/40 border border-brand-navy/5 shadow-md relative">
              
              {registered ? (
                <div id="workshop-reg-success" className="py-12 text-center flex flex-col items-center gap-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                  <h4 className="font-display text-xl font-bold text-brand-navy mt-2">
                    Registration Confirmed
                  </h4>
                  <p className="font-sans text-xs text-brand-gray max-w-sm leading-relaxed">
                    Thank you! We have registered your coordinates. We will dispatch the Google Meet link, preparation directives, and agenda templates to your email prior to the webinar.
                  </p>
                  <Button id="btn-reg-reset" variant="outline" onClick={() => setRegistered(false)} className="mt-6">
                    Register Another User
                  </Button>
                </div>
              ) : (
                <form id="workshop-registration-form" onSubmit={handleRegister} className="flex flex-col gap-5">
                  <div className="border-b border-brand-navy/10 pb-3">
                    <h4 className="font-display text-sm font-bold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-brand-blue" /> Seat Reservation
                    </h4>
                    <span className="font-sans text-[10px] text-brand-gray">Secure your entry coordinates for our live technical webinar.</span>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-400/10 border border-red-400/20 rounded text-xs text-red-500">
                      {error}
                    </div>
                  )}

                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reg-name" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      id="reg-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Austin"
                      className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reg-email" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@company.com"
                      className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reg-phone" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      id="reg-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+65 8123 4567"
                      className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy placeholder-brand-gray/30 focus:border-brand-blue focus:outline-none"
                    />
                  </div>

                  {/* Experience */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="reg-experience" className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Coding Experience
                    </label>
                    <select
                      id="reg-experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-brand-navy/10 rounded-lg px-4 py-3 text-sm text-brand-navy focus:border-brand-blue focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="Beginner">Beginner / Non-technical</option>
                      <option value="Intermediate">Intermediate Developer / Architect</option>
                      <option value="Advanced">Advanced Systems Engineer</option>
                    </select>
                  </div>

                  <Button id="btn-submit-reg-form" type="submit" variant="primary" className="w-full mt-2 flex items-center justify-center gap-1.5">
                    Register For Workshop <Zap className="w-4 h-4 text-white" />
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
