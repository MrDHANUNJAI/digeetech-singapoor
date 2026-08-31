import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  id: number;
  companyName: string;
  projectType: string;
  feedback: string;
  author: string;
  role: string;
  rating: number;
}

const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    companyName: "TechLaunch Venture (Sample Case)",
    projectType: "SaaS MVP Development",
    feedback: "The development of our multi-tenant software was executed with absolute technical precision. The engineering team produced clean, scalable TypeScript code that immediately supported our initial active user base. Highly professional and responsive communication throughout the lifecycle.",
    author: "Sarah Jenkins",
    role: "Chief Technology Officer",
    rating: 5
  },
  {
    id: 2,
    companyName: "Global Operations Corp (Sample Case)",
    projectType: "Tailored ERP & Automation",
    feedback: "We replaced our complex background data-entry processes with custom automation scripts and an intuitive ERP interface designed by Digeetech. The team saved our staff over 30 hours of manual work weekly, ensuring complete data consistency across all databases.",
    author: "David Vance",
    role: "Director of Systems & Integration",
    rating: 5
  },
  {
    id: 3,
    companyName: "Apex Marketing Group (Sample Case)",
    projectType: "Corporate Platform & SEO",
    feedback: "Digeetech built a lightning-fast, pixel-perfect web application that serves as the foundation of our web presence. Their attention to Core Web Vitals, speed index, and technical search optimization raised our organic performance within weeks. A high-end experience.",
    author: "Elena Rostov",
    role: "VP of Digital Acquisition",
    rating: 5
  }
];

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SAMPLE_TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === SAMPLE_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = SAMPLE_TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials-section" className="py-24 bg-brand-white/40 border-y border-brand-navy/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
            Client Success
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-brand-navy max-w-2xl leading-tight">
            Trust Built on Performance
          </h2>
          <p className="font-sans text-base text-brand-gray max-w-xl mt-2 leading-relaxed">
            See how our client partners (modeled as illustrative sample cases) automate their operations and launch premium software.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative px-4 md:px-12">
          
          {/* Quote Accent Ornament */}
          <div className="absolute -top-10 -left-4 md:-left-8 text-brand-blue/10 pointer-events-none select-none">
            <Quote className="w-24 h-24 stroke-[1.5]" />
          </div>

          <div className="relative min-h-[380px] md:min-h-[320px] flex items-center justify-center bg-white border border-brand-navy/5 rounded-3xl p-8 md:p-12 shadow-xl shadow-brand-navy/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 w-full relative z-10"
              >
                {/* Rating & Project Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-navy/5 pb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <span className="font-display text-xs font-bold text-brand-blue bg-brand-blue/5 border border-brand-blue/10 rounded-full px-3 py-1">
                    {current.projectType}
                  </span>
                </div>

                {/* Feedback text */}
                <p className="font-sans text-base md:text-lg text-brand-navy/90 leading-relaxed italic">
                  "{current.feedback}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-12 h-12 bg-brand-navy text-white rounded-full flex items-center justify-center font-display font-bold text-sm">
                    {current.author.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-brand-navy">
                      {current.author}
                    </h4>
                    <p className="font-sans text-xs text-brand-gray">
                      {current.role} • <span className="font-medium text-brand-navy/70">{current.companyName}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-8 md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:-left-6 md:-right-6 w-full z-20 pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white border border-brand-navy/10 hover:border-brand-blue text-brand-navy hover:text-brand-blue flex items-center justify-center shadow-lg hover:shadow-brand-blue/10 transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white border border-brand-navy/10 hover:border-brand-blue text-brand-navy hover:text-brand-blue flex items-center justify-center shadow-lg hover:shadow-brand-blue/10 transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicators / Progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {SAMPLE_TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  activeIndex === i ? "bg-brand-blue w-6" : "bg-brand-navy/10 hover:bg-brand-navy/30"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
