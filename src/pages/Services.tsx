import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";
import { allServices, serviceCategoryGroups, searchServices } from "../data/allServices";
import { ServiceItem } from "../data/servicesCatalog";
import {
  Search,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Code2,
  Globe,
  Smartphone,
  Zap,
  Cloud,
  ShieldCheck,
  Server,
  Layout,
  TrendingUp,
  Palette,
  BarChart4,
  Radio,
  FileSignature,
  Presentation,
  CreditCard,
  Laptop,
  CheckCircle2,
  Coins,
  Shield,
  Layers,
  Filter,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import servicesOverviewImg from "../assets/images/services_overview.jpg";
import aiAgentsImg from "../assets/images/ai_agents_tech.jpg";
import cloudArchImg from "../assets/images/cloud_architecture_1789130783930.jpg";
import techStackImg from "../assets/images/tech_stack.jpg";

export const Services: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleCategorySelect = (key: string) => {
    setSelectedCategory(key);
    if (key === "all") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: key });
    }
  };

  const filteredServices: ServiceItem[] = useMemo(() => {
    return searchServices(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const activeCategoryGroup = serviceCategoryGroups.find(c => c.key === selectedCategory);

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case "software-development": return <Code2 className="w-4 h-4" />;
      case "web-development": return <Globe className="w-4 h-4" />;
      case "mobile-app-development": return <Smartphone className="w-4 h-4" />;
      case "ai-artificial-intelligence": return <Sparkles className="w-4 h-4" />;
      case "automation-rpa": return <Zap className="w-4 h-4" />;
      case "cloud-devops": return <Cloud className="w-4 h-4" />;
      case "cybersecurity": return <ShieldCheck className="w-4 h-4" />;
      case "it-digital-infrastructure": return <Server className="w-4 h-4" />;
      case "ui-ux-product-design": return <Layout className="w-4 h-4" />;
      case "digital-marketing": return <TrendingUp className="w-4 h-4" />;
      case "branding-creative-services": return <Palette className="w-4 h-4" />;
      case "data-business-intelligence": return <BarChart4 className="w-4 h-4" />;
      case "iot-smart-technology": return <Radio className="w-4 h-4" />;
      case "research-documentation": return <FileSignature className="w-4 h-4" />;
      case "presentation-business-documents": return <Presentation className="w-4 h-4" />;
      case "ecommerce-digital-commerce": return <CreditCard className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div id="services-ecosystem-page" className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/5 via-white to-transparent -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO */}
        <div id="services-hero" className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 rounded-full px-3.5 py-1 text-xs text-brand-blue font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SINGAPORE DIGITAL SERVICES ECOSYSTEM</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight">
            100+ Digital Solutions. <br />
            <span className="text-brand-blue">One Technology Partner.</span>
          </h1>
          
          <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-4 max-w-3xl">
            Explore our comprehensive catalog across 16 core technology disciplines. From full-stack enterprise software and AI agents to cybersecurity, cloud infrastructure, and Singapore local SEO.
          </p>

          <div className="mt-6 rounded-2xl overflow-hidden shadow-xl border border-brand-navy/10 group">
            <img
              src={servicesOverviewImg}
              alt="Digee Tech Services Overview"
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-brand-navy/10">
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy">100+</div>
              <div className="text-xs text-brand-gray mt-0.5">Specialized Capabilities</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-brand-blue">16</div>
              <div className="text-xs text-brand-gray mt-0.5">Core Tech Disciplines</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-600">SGD</div>
              <div className="text-xs text-brand-gray mt-0.5">Transparent Pricing</div>
            </div>
            <div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-brand-navy">100%</div>
              <div className="text-xs text-brand-gray mt-0.5">Code & IP Ownership</div>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div id="services-search-filter-section" className="mb-10 bg-brand-navy/[0.02] border border-brand-navy/10 rounded-3xl p-6 sm:p-8">
          
          {/* Live Search Input */}
          <div className="relative max-w-2xl mb-6">
            <Search className="w-5 h-5 text-brand-gray/60 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="service-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by capability, keyword, technology (e.g. 'PayNow', 'AI Agent', 'CRM', 'Kotlin', 'SEO')..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-brand-navy/15 bg-white text-sm text-brand-navy placeholder:text-brand-gray/60 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-brand-gray hover:text-brand-navy"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-bold font-display uppercase tracking-wider text-brand-navy">
              Filter by Discipline ({serviceCategoryGroups.length} Categories)
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategorySelect("all")}
              className={`px-3.5 py-2 rounded-xl text-xs font-display font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === "all"
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 font-bold"
                  : "bg-white text-brand-navy/80 hover:bg-brand-blue/10 border border-brand-navy/10"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              All Solutions ({allServices.length})
            </button>

            {serviceCategoryGroups.map((group) => {
              const isSelected = selectedCategory === group.key;
              return (
                <button
                  key={group.key}
                  onClick={() => handleCategorySelect(group.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-display font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 font-bold"
                      : "bg-white text-brand-navy/80 hover:bg-brand-blue/10 border border-brand-navy/10"
                  }`}
                >
                  {getCategoryIcon(group.key)}
                  <span>{group.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-brand-navy/5 text-brand-gray"}`}>
                    {group.services.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Description Bar */}
          {activeCategoryGroup && selectedCategory !== "all" && (
            <div className="mt-6 pt-4 border-t border-brand-navy/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-display text-sm font-bold text-brand-navy flex items-center gap-2">
                  <span className="text-brand-blue">{activeCategoryGroup.code}</span>
                  <span>{activeCategoryGroup.name}</span>
                </div>
                <p className="text-xs text-brand-gray mt-0.5 max-w-2xl leading-relaxed">
                  {activeCategoryGroup.description}
                </p>
              </div>
              <button
                onClick={() => handleCategorySelect("all")}
                className="text-xs font-semibold text-brand-blue hover:underline shrink-0"
              >
                Clear Filter ✕
              </button>
            </div>
          )}
        </div>

        {/* RESULTS COUNT & STATUS */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="text-xs text-brand-gray">
            Showing <strong className="text-brand-navy">{filteredServices.length}</strong> solutions
            {selectedCategory !== "all" && <span> in <strong className="text-brand-blue">{activeCategoryGroup?.name}</strong></span>}
            {searchQuery && <span> matching "<strong className="text-brand-navy">{searchQuery}</strong>"</span>}
          </div>

          {(searchQuery || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                handleCategorySelect("all");
              }}
              className="text-xs font-semibold text-brand-blue hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* SERVICES CARD GRID */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                id={`card-service-${service.slug}`}
                className="group p-6 rounded-2xl border border-brand-navy/10 bg-white hover:border-brand-blue/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Category Pill & Starting Price */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/5 px-2.5 py-1 rounded-md">
                      {getCategoryIcon(service.categoryKey)}
                      <span className="truncate max-w-[150px]">{service.category}</span>
                    </span>
                    <span className="font-display text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                      {service.startingPrice}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-base sm:text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                    {service.name}
                  </h3>

                  {/* Tagline / Subtitle */}
                  {service.tagline && (
                    <p className="text-xs font-semibold text-brand-navy/70 mt-1 line-clamp-1">
                      {service.tagline}
                    </p>
                  )}

                  {/* Short Description */}
                  <p className="font-sans text-xs text-brand-gray leading-relaxed mt-2.5 line-clamp-3">
                    {service.shortDescription || service.description}
                  </p>

                  {/* Key Features Bullet highlights */}
                  {service.features && service.features.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-brand-navy/5 flex flex-col gap-1.5">
                      {service.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-brand-navy/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Tech tags + Link */}
                <div className="mt-5 pt-4 border-t border-brand-navy/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1 max-w-[70%]">
                    {(service.technologies || []).slice(0, 2).map(tech => (
                      <span key={tech} className="text-[10px] font-mono text-brand-navy/60 bg-brand-navy/5 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <span className="text-xs font-bold text-brand-blue group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl border border-brand-navy/10 bg-brand-navy/[0.02] text-center max-w-xl mx-auto my-12">
            <Search className="w-10 h-10 text-brand-gray/40 mx-auto mb-4" />
            <h3 className="font-display text-lg font-bold text-brand-navy">
              No matching capabilities found
            </h3>
            <p className="text-xs text-brand-gray mt-2 leading-relaxed">
              We engineer custom digital solutions beyond standard catalog entries. Contact our team directly with your specific specifications.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-brand-navy bg-white border border-brand-navy/15 hover:bg-brand-navy/5"
              >
                Clear Search
              </button>
              <Button variant="primary" size="sm" to="/contact">
                Request Custom Solution
              </Button>
            </div>
          </div>
        )}

        {/* FEATURED CATEGORIES IMAGE HIGHLIGHTS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden border border-brand-navy/10 shadow-lg relative group">
            <img
              src={aiAgentsImg}
              alt="Autonomous AI Agents & Reasoning Engines"
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="font-display text-xs font-bold text-cyan-400 uppercase tracking-wider">AI & Cognitive Tools</span>
              <h4 className="font-display text-xl font-bold">Autonomous Reasoning & Tool-Calling Agents</h4>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-brand-navy/10 shadow-lg relative group">
            <img
              src={cloudArchImg}
              alt="Enterprise Cloud Infrastructure & SaaS"
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="font-display text-xs font-bold text-cyan-400 uppercase tracking-wider">Cloud & ERP Systems</span>
              <h4 className="font-display text-xl font-bold">Scalable Multi-Tenant Cloud Architecture</h4>
            </div>
          </div>
        </div>

        {/* BOTTOM CALLOUT / CONSULTATION PROPOSAL */}
        <div id="services-bottom-cta" className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-navy to-[#102B4E] text-white text-center flex flex-col items-center gap-6 shadow-xl">
          <span className="font-display text-xs font-bold text-cyan-400 uppercase tracking-widest">
            CUSTOM SOFTWARE & ARCHITECTURE
          </span>
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white max-w-2xl leading-tight">
            Have a Specific Technology Requirement?
          </h3>
          <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
            We specialize in bespoke API bridges, multi-tenant SaaS architectures, autonomous AI workflows, and custom enterprise databases built to your exact operational parameters.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Button id="services-cta-start" variant="primary" to="/start-a-project" className="bg-brand-blue hover:bg-brand-blue-dark text-white shadow-lg shadow-brand-blue/30">
              Start a Project
            </Button>
            <Button id="services-cta-contact" variant="outline" to="/contact" className="border-white/20 text-white hover:bg-white/10">
              Schedule Free Scoping Call
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
