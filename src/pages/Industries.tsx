import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { 
  Building2, GraduationCap, HeartPulse, ShoppingBag, Home, Factory, 
  Landmark, Briefcase, Microscope, Users, ArrowRight, CheckCircle2 
} from "lucide-react";

export const Industries: React.FC = () => {
  const industriesList = [
    {
      id: "startups",
      title: "Startups & Scale-ups",
      icon: <Users className="w-8 h-8 text-brand-blue" />,
      tagline: "Agile MVP Development & Venture Scaling",
      description: "We partner with visionary founders to build scalable SaaS MVPs, robust product architectures, and high-conversion go-to-market web presences that attract investors and users.",
      solutions: ["SaaS MVP Engineering", "Product UI/UX Design", "Pitch Decks & Branding", "Growth & SEO Funnels"]
    },
    {
      id: "education",
      title: "Education & EdTech",
      icon: <GraduationCap className="w-8 h-8 text-brand-blue" />,
      tagline: "Smart Learning Portals & Institutional Systems",
      description: "Empowering universities, schools, and edtech platforms with secure student management portals, e-learning applications, and interactive educational automation workflows.",
      solutions: ["Student & Teacher Portals", "LMS Integration", "Interactive Learning Apps", "Administrative ERP"]
    },
    {
      id: "healthcare",
      title: "Healthcare & Life Sciences",
      icon: <HeartPulse className="w-8 h-8 text-brand-blue" />,
      tagline: "Secure Patient Systems & Practice Management",
      description: "Developing HIPAA-compliant patient management portals, secure appointment booking flows, telemedicine applications, and automated clinic data processing pipelines.",
      solutions: ["Patient Portals", "Telehealth App Development", "Practice Management Systems", "Data Encryption & Compliance"]
    },
    {
      id: "ecommerce",
      title: "E-Commerce & Retail",
      icon: <ShoppingBag className="w-8 h-8 text-brand-blue" />,
      tagline: "High-Performance Online Storefronts",
      description: "Building lightning-fast custom e-commerce web applications, inventory synchronization pipelines, automated customer remarketing, and secure checkout gateways.",
      solutions: ["Custom Headless Storefronts", "ERP & Inventory Sync", "Meta Ads & Growth Funnels", "AI Recommendation Tools"]
    },
    {
      id: "real-estate",
      title: "Real Estate & Property",
      icon: <Home className="w-8 h-8 text-brand-blue" />,
      tagline: "Property Portals & CRM Pipelines",
      description: "Connecting buyers, agents, and developers with modern property listing portals, virtual tour integrations, and dedicated real estate lead management CRM systems.",
      solutions: ["Property Listing Portals", "Agent CRM Systems", "Document Management Portals", "Lead Capture Automation"]
    },
    {
      id: "manufacturing",
      title: "Manufacturing & Supply Chain",
      icon: <Factory className="w-8 h-8 text-brand-blue" />,
      tagline: "Operations ERP & Inventory Tracking",
      description: "Streamlining complex manufacturing operations with tailored ERP systems, warehouse tracking portals, automated procurement reorders, and vendor portals.",
      solutions: ["Inventory ERP Systems", "Vendor & Supplier Portals", "Supply Chain Automation", "Logistics Dashboards"]
    },
    {
      id: "finance",
      title: "Finance & Fintech",
      icon: <Landmark className="w-8 h-8 text-brand-blue" />,
      tagline: "Secure Financial Dashboards & Ledgers",
      description: "Engineering secure financial technology platforms, automated accounting ledgers, transaction reporting dashboards, and encrypted client portals.",
      solutions: ["Financial Ledgers", "Secure Client Portals", "Automated Reporting Tools", "API Payment Gateways"]
    },
    {
      id: "research",
      title: "Research & Academia",
      icon: <Microscope className="w-8 h-8 text-brand-blue" />,
      tagline: "Technical Research & Publication Support",
      description: "Providing comprehensive documentation support, literature review assistance, technical formatting, and computational tools for academic and industrial researchers.",
      solutions: ["Research Paper Formatting", "Literature Review Support", "Technical Documentation", "Data Presentation PPTs"]
    },
    {
      id: "enterprise",
      title: "Corporate Enterprises",
      icon: <Building2 className="w-8 h-8 text-brand-blue" />,
      tagline: "Enterprise Digital Transformation",
      description: "Modernizing legacy infrastructure, integrating autonomous AI agents, unifying internal databases, and scaling secure multi-tenant enterprise software.",
      solutions: ["Legacy System Modernization", "AI Agent Integration", "Enterprise CRM/ERP", "Custom Security Audits"]
    }
  ];

  return (
    <div id="industries-page" className="w-full relative overflow-x-hidden pt-32 pb-24 bg-white text-brand-navy">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 mb-20">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 rounded-full px-4 py-1.5 text-xs text-brand-blue font-display font-bold tracking-wide mx-auto">
            Industry Expertise
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy tracking-tight">
            Tailored Technology for <span className="text-gradient-blue">Every Industry</span>
          </h1>
          <p className="font-sans text-lg text-brand-gray leading-relaxed">
            Digee Tech engineers industry-specific digital solutions, intelligent automation workflows, and secure software platforms tailored to your sector's regulatory and operational demands.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {industriesList.map((ind) => (
            <div 
              key={ind.id}
              className="glass-panel p-8 rounded-3xl border border-brand-navy/5 flex flex-col justify-between hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300 group"
            >
              <div className="flex flex-col gap-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                  {React.cloneElement(ind.icon, { className: "w-8 h-8 text-brand-blue group-hover:text-white transition-colors" })}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl font-bold text-brand-navy">
                    {ind.title}
                  </h3>
                  <span className="font-display text-xs font-bold text-brand-blue uppercase tracking-wider">
                    {ind.tagline}
                  </span>
                  <p className="font-sans text-sm text-brand-gray mt-2 leading-relaxed">
                    {ind.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-navy/5 flex flex-col gap-3">
                <span className="font-display text-xs font-bold text-brand-navy uppercase tracking-wider">
                  Key Capabilities:
                </span>
                <ul className="flex flex-col gap-2">
                  {ind.solutions.map((sol, i) => (
                    <li key={i} className="flex items-center gap-2 font-sans text-xs text-brand-navy/85">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                      {sol}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="glass-panel rounded-3xl p-12 border border-brand-blue/20 bg-gradient-to-br from-brand-navy/5 to-brand-blue/10 flex flex-col items-center text-center gap-6">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-navy">
            Have a Specific Industry Challenge?
          </h2>
          <p className="font-sans text-base text-brand-gray max-w-2xl leading-relaxed">
            Our technical architects work closely with your team to design custom software solutions tailored precisely to your operational environment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Button variant="primary" size="lg" to="/start-a-project">
              Consult Our Engineers
            </Button>
            <Button variant="outline" size="lg" to="/contact">
              Get in Touch
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
