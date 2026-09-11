import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../data";
import { SectionHeader } from "../components/SectionHeader";
import { ChevronRight, Filter } from "lucide-react";
import projectsShowcaseImg from "../assets/images/projects_showcase.jpg";
import aiDashboardImg from "../assets/images/ai_dashboard_1789130800720.jpg";
import cloudArchImg from "../assets/images/cloud_architecture_1789130783930.jpg";

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filters = ["All", "Web", "AI", "CRM"];

  const filteredProjects = activeFilter === "All" 
    ? projectsData 
    : projectsData.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div id="projects-listing-page" className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO */}
        <div id="projects-hero" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
              Our Work
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight mt-2">
              Recent Case Studies
            </h1>
            <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-4">
              Digee Tech delivers tailored technology without unverified claims or fake client reviews. Review our real-world, data-driven system architectures and workflow automations below.
            </p>
          </div>
          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-xl border border-brand-navy/10 group">
            <img
              src={projectsShowcaseImg}
              alt="Digee Tech Featured Case Study Showcase"
              referrerPolicy="no-referrer"
              className="w-full h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* FILTERS BAR */}
        <div id="projects-filters-bar" className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-brand-navy/10">
          <div className="flex items-center gap-1.5 text-xs text-brand-gray font-display font-semibold uppercase mr-2">
            <Filter className="w-3.5 h-3.5 text-brand-blue" /> Filter by:
          </div>
          {filters.map((f) => (
            <button
              id={`filter-btn-${f.toLowerCase()}`}
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-display font-bold transition-all cursor-pointer ${
                activeFilter === f
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15"
                  : "bg-brand-white border border-brand-navy/10 text-brand-navy/70 hover:text-brand-blue hover:bg-brand-blue/5"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* PROJECTS GRID */}
        {filteredProjects.length > 0 ? (
          <div id="filtered-projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                id={`project-card-full-${project.slug}`}
                key={project.slug}
                className="group flex flex-col bg-white rounded-2xl border border-brand-navy/5 overflow-hidden hover:border-brand-blue/30 hover:shadow-xl transition-all duration-300 shadow-md hover:-translate-y-1"
              >
                {/* Visual Image Block representing Project state */}
                <div className="h-48 relative overflow-hidden group">
                  <img
                    src={project.slug.includes("ai") ? aiDashboardImg : project.slug.includes("erp") || project.slug.includes("saas") ? cloudArchImg : projectsShowcaseImg}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent p-4 flex items-end">
                    <span className="text-[10px] font-bold tracking-widest text-white uppercase bg-brand-blue/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between grow gap-6">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-brand-gray leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {project.technology.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-sans text-brand-navy/70 bg-brand-white border border-brand-navy/5 rounded px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                    {project.technology.length > 3 && (
                      <span className="text-[10px] font-sans text-brand-gray/60 py-0.5">
                        +{project.technology.length - 3} more
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/projects/${project.slug}`}
                    className="font-display text-xs font-bold text-brand-blue hover:text-brand-blue transition-colors inline-flex items-center gap-1 border-t border-brand-navy/5 pt-4 mt-2"
                  >
                    View Case Study <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-brand-navy/10 rounded-2xl bg-brand-white/40">
            <span className="font-display text-sm text-brand-gray block">No case studies found in this category.</span>
          </div>
        )}

      </div>
    </div>
  );
};
