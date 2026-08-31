import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { Globe, Cpu, Briefcase, TrendingUp, Palette, ChevronRight, Check } from "lucide-react";

export const Services: React.FC = () => {
  const categories = [
    {
      title: "DIGITAL DEVELOPMENT",
      icon: <Globe className="w-6 h-6 text-brand-blue" />,
      desc: "Pixel-perfect visual design paired with robust full-stack engineering, building solid digital assets that scale with your customer volume.",
      items: [
        { name: "Website Development", path: "/services/web-development" },
        { name: "App Development", path: "/services/app-development" },
        { name: "SaaS Development", path: "/services/saas" },
        { name: "Custom Software", path: "/services/saas" }
      ]
    },
    {
      title: "AI & AUTOMATION",
      icon: <Cpu className="w-6 h-6 text-brand-blue" />,
      desc: "Integrate reasoning Large Language Models, cognitive agents, and custom workflow automations directly into your internal systems.",
      items: [
        { name: "AI Agents", path: "/services/ai-agents" },
        { name: "AI Tools", path: "/services/ai-tools" },
        { name: "AI Automation", path: "/services/automation" },
        { name: "API Integrations", path: "/services/automation" }
      ]
    },
    {
      title: "BUSINESS SYSTEMS",
      icon: <Briefcase className="w-6 h-6 text-brand-blue" />,
      desc: "Unify spreadsheets and fragmented workflows into custom, localized administrative dashboards, ledgers, and secure client hubs.",
      items: [
        { name: "CRM Solutions", path: "/services/crm" },
        { name: "ERP Solutions", path: "/services/erp" },
        { name: "Management Portals", path: "/services/management-portals" },
        { name: "Business Automation", path: "/services/automation" }
      ]
    },
    {
      title: "DIGITAL GROWTH",
      icon: <TrendingUp className="w-6 h-6 text-brand-blue" />,
      desc: "Data-backed search engine visibility audits and strategic social performance ad campaigns designed to lower your lead acquisition costs.",
      items: [
        { name: "Digital Marketing", path: "/services/digital-marketing" },
        { name: "SEO Optimization", path: "/services/seo" },
        { name: "Meta Ads Campaigns", path: "/services/meta-ads" }
      ]
    },
    {
      title: "CREATIVE & BRANDING",
      icon: <Palette className="w-6 h-6 text-brand-blue" />,
      desc: "Stunning visual corporate assets, logo marks, typography scales, and interactive screen wireframes modeled strictly in Figma.",
      items: [
        { name: "Graphic Design", path: "/services/graphic-design" },
        { name: "Branding Design", path: "/services/branding" },
        { name: "UI/UX Design", path: "/services/ui-ux" }
      ]
    }
  ];

  return (
    <div id="services-overview-page" className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Decorative background grids */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/5 via-white to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO */}
        <div id="services-hero" className="max-w-3xl mb-16">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
            Our Offerings
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight mt-2">
            Everything You Need To Build Your Digital Future.
          </h1>
          <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-4">
            Digeetech provides a cohesive digital technology ecosystem. We combine elegant user-focused aesthetics with bulletproof type-safe backends, autonomous AI agents, operations automation, and strategic growth campaigns.
          </p>
        </div>

        {/* SERVICES CATEGORIES LISTING */}
        <div id="services-categories-list" className="flex flex-col gap-16">
          {categories.map((cat, index) => (
            <div
              id={`service-cat-row-${index}`}
              key={cat.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 border-t border-brand-navy/10 pt-12"
            >
              
              {/* Category Info */}
              <div className="lg:col-span-5 flex flex-col items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-2">
                  {cat.icon}
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-navy tracking-tight">
                  {cat.title}
                </h2>
                <p className="font-sans text-sm text-brand-gray leading-relaxed max-w-md">
                  {cat.desc}
                </p>
              </div>

              {/* Sub-Service Card Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="p-6 rounded-xl border border-brand-navy/5 bg-white shadow-sm hover:bg-brand-blue/5 hover:border-brand-blue/30 hover:shadow-md transition-all group flex flex-col justify-between h-[150px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-base font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                        {item.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-brand-gray/40 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div className="flex items-center gap-1.5 font-sans text-xs text-brand-gray/60 mt-4 group-hover:text-brand-blue transition-colors">
                      <Check className="w-3.5 h-3.5 text-brand-blue" /> Custom Engineering
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* BOTTOM METRIC BOX (STATIC FOR VISUAL PROPORTION) */}
        <div id="services-cta-block" className="mt-24 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[#EEF7FB] to-[#F2F8FC] border border-brand-navy/5 text-center flex flex-col items-center gap-6 max-w-4xl mx-auto shadow-md">
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-brand-navy">
            Have a Specific Architectural Need?
          </h3>
          <p className="font-sans text-sm text-brand-gray leading-relaxed max-w-xl">
            We specialize in designing specialized API bridges, custom CRM platforms, multi-tenant databases, and cognitive agents matching precise, custom constraints.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Button id="services-cta-start" variant="primary" to="/start-a-project">
              Start a Project
            </Button>
            <Button id="services-cta-contact" variant="outline" to="/contact">
              Talk to Our Team
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
