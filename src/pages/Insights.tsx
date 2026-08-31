import React, { useState } from "react";
import { Link } from "react-router-dom";
import { blogArticles } from "../data";
import { SectionHeader } from "../components/SectionHeader";
import { Calendar, Clock, ChevronRight, BookOpen } from "lucide-react";

export const Insights: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "AI", "SaaS", "SEO"];

  const filteredArticles = activeCategory === "All"
    ? blogArticles
    : blogArticles.filter(art => art.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div id="insights-listing-page" className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Glow backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO */}
        <div id="insights-hero" className="max-w-3xl mb-12">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
            Technical Insights
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy leading-tight mt-2">
            Engineering & Growth Trends
          </h1>
          <p className="font-sans text-base md:text-lg text-brand-gray leading-relaxed mt-4">
            We publish clear, factual reviews of cognitive AI agent capabilities, full-stack database architectures, and search engine technical optimizations.
          </p>
        </div>

        {/* FILTERS */}
        <div id="insights-filters" className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-brand-navy/5">
          <div className="flex items-center gap-1.5 text-xs text-brand-gray font-display font-medium uppercase mr-2">
            <BookOpen className="w-3.5 h-3.5 text-brand-blue" /> Topics:
          </div>
          {categories.map((c) => (
            <button
              id={`blog-filter-${c.toLowerCase()}`}
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-display font-semibold transition-all cursor-pointer ${
                activeCategory === c
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/15"
                  : "bg-brand-white text-brand-gray hover:text-brand-navy border border-brand-navy/10 hover:bg-brand-blue/5"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* BLOG ARTICLES GRID */}
        {filteredArticles.length > 0 ? (
          <div id="insights-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <div
                id={`blog-card-${art.slug}`}
                key={art.slug}
                className="group flex flex-col bg-white rounded-2xl border border-brand-navy/5 overflow-hidden hover:border-brand-blue/30 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-6 flex flex-col justify-between grow gap-6">
                  <div className="flex flex-col gap-4">
                    
                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-xs text-brand-gray font-sans">
                      <span className="text-[10px] font-bold text-brand-blue uppercase bg-brand-blue/10 px-2.5 py-0.5 rounded border border-brand-blue/15">
                        {art.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {art.date}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {art.title}
                    </h3>
                    <p className="font-sans text-sm text-brand-gray leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-brand-navy/5 pt-4 mt-2">
                    <span className="flex items-center gap-1 font-sans text-xs text-brand-gray">
                      <Clock className="w-3.5 h-3.5" /> {art.readTime}
                    </span>
                    <Link
                      to={`/insights/${art.slug}`}
                      className="font-display text-xs font-semibold text-brand-blue hover:text-brand-blue/80 transition-colors inline-flex items-center gap-1"
                    >
                      Read Article <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-brand-navy/10 rounded-2xl bg-brand-white/40">
            <span className="font-display text-sm text-brand-gray block">No insights found under this topic.</span>
          </div>
        )}

      </div>
    </div>
  );
};
