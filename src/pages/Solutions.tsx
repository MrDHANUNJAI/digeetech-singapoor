import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { solutionsData } from "../data";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { Check, ShieldCheck, Zap, Laptop, Cpu, Workflow, ChevronRight } from "lucide-react";

export const Solutions: React.FC = () => {
  const { hash } = useLocation();

  // Handle scroll to anchor if URL hash is present
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  const icons: Record<string, React.ReactNode> = {
    "startups": <Laptop className="w-6 h-6 text-brand-blue" />,
    "business-growth": <Workflow className="w-6 h-6 text-brand-blue" />,
    "ai-enterprise": <Cpu className="w-6 h-6 text-brand-blue" />
  };

  return (
    <div id="solutions-page" className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO */}
        <div id="solutions-hero" className="max-w-3xl mb-16">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
            Our Strategy
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight mt-2">
            Targeted Digital Solutions
          </h1>
          <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-4">
            We organize complex software engineering, cognitive AI reasoning, and high-performance marketing into clear, life-cycle-based packages designed to map directly to your organizational goals.
          </p>
        </div>

        {/* SOLUTIONS GRID */}
        <div id="solutions-packages-list" className="flex flex-col gap-16">
          {solutionsData.map((pkg, index) => (
            <div
              id={pkg.id}
              key={pkg.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-brand-navy/10 pt-12 ${
                hash === `#${pkg.id}` ? "border-brand-blue/35 bg-brand-blue/5 rounded-xl p-6" : ""
              }`}
            >
              
              {/* Package Meta */}
              <div className="lg:col-span-5 flex flex-col items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-2">
                  {icons[pkg.id] || <Laptop className="w-6 h-6 text-brand-blue" />}
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy">
                  {pkg.title}
                </h2>
                <span className="font-display italic text-sm text-brand-blue font-medium">
                  "{pkg.tagline}"
                </span>
                <p className="font-sans text-sm text-brand-gray leading-relaxed max-w-sm mt-2">
                  {pkg.description}
                </p>
                <div className="mt-4 p-4 rounded-lg bg-brand-white border border-brand-navy/5 w-full max-w-sm">
                  <span className="font-sans text-[10px] font-bold text-brand-blue uppercase tracking-wider block mb-1">
                    Ideal For:
                  </span>
                  <span className="font-sans text-xs text-brand-navy font-semibold">
                    {pkg.targetAudience}
                  </span>
                </div>
              </div>

              {/* Package Details */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-8 bg-brand-white rounded-2xl p-8 border border-brand-navy/5 shadow-md">
                <div className="flex flex-col gap-6">
                  
                  {/* Benefits */}
                  <div>
                    <h4 className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider mb-3">
                      Core Strategic Outcomes
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      {pkg.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-xs text-brand-gray">
                          <ShieldCheck className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Services Included */}
                  <div>
                    <h4 className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider mb-2.5">
                      Included Tech Frameworks
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.servicesIncluded.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] font-sans text-brand-blue bg-brand-blue/5 border border-brand-blue/15 rounded-full px-3 py-1"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                <Button id={`solutions-cta-btn-${pkg.id}`} variant="primary" to="/start-a-project" className="w-full sm:w-auto self-start mt-4">
                  {pkg.ctaText}
                </Button>
              </div>

            </div>
          ))}
        </div>

        {/* CUSTOM INQUIRY BOX */}
        <div id="solutions-custom" className="mt-24 p-8 md:p-12 rounded-2xl bg-brand-white/40 border border-brand-navy/5 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
          <div className="max-w-md">
            <h3 className="font-display text-xl font-bold text-brand-navy mb-2">
              Need a Customized Enterprise Setup?
            </h3>
            <p className="font-sans text-xs text-brand-gray leading-relaxed">
              If your operations require complex API integrations, multi-tenant database designs, or localized employee/client portals, we can construct a completely custom technical plan tailored to your team.
            </p>
          </div>
          <Button id="solutions-custom-cta" variant="outline" to="/start-a-project" className="shrink-0 w-full md:w-auto">
            Design Custom Solution <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

      </div>
    </div>
  );
};
