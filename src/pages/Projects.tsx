import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projectsData } from "../data";
import { SectionHeader } from "../components/SectionHeader";
import { ChevronRight, Filter } from "lucide-react";

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
        <div id="projects-hero" className="max-w-3xl mb-12">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
            Our Work
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight mt-2">
            Recent Case Studies
          </h1>
          <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-4">
            Digeetech delivers tailored technology without unverified claims or fake client reviews. Review our real-world, data-driven system architectures and workflow automations below.
          </p>
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
                {/* Mock Visual Drawing Block representing Project state */}
                <div className="h-48 bg-brand-white/40 border-b border-brand-navy/5 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute right-2 bottom-2 text-brand-navy/3 text-[90px] font-display font-extrabold select-none">
                    {project.category}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-brand-blue uppercase bg-white border border-brand-blue/15 rounded-full px-2.5 py-1 w-fit shadow-sm">
                    {project.category}
                  </span>
                  
                  {/* Decorative abstract screen rendering lines */}
                  <div className="flex flex-col gap-2 opacity-30 mt-6">
                    <div className="h-1 bg-brand-navy/10 rounded w-1/3" />
                    <div className="h-1 bg-brand-navy/10 rounded w-2/3" />
                    <div className="h-1 bg-brand-blue/30 rounded w-1/2" />
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
