import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { blogArticles } from "../data";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  return (
    <div id={`blog-detail-${slug}`} className="w-full relative overflow-x-hidden pt-28 pb-20 bg-white text-brand-navy">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* BACK BUTTON */}
        <Link
          id="back-to-insights-link"
          to="/insights"
          className="inline-flex items-center gap-1 text-xs text-brand-gray hover:text-brand-blue transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Insights
        </Link>

        {/* HEADER BLOCK */}
        <div id="blog-header" className="flex flex-col gap-4 mb-10 pb-8 border-b border-brand-navy/10">
          <span className="text-[10px] font-bold text-brand-blue uppercase bg-brand-blue/10 px-3 py-1 rounded border border-brand-blue/15 w-fit">
            {article.category}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-xs text-brand-gray font-sans mt-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-blue" /> {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-blue" /> {article.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-blue" /> {article.author}
            </span>
          </div>
        </div>

        {/* ARTICLE PARAGRAPHS */}
        <article id="blog-body" className="flex flex-col gap-6 font-sans text-sm md:text-base text-brand-navy/90 leading-relaxed">
          {article.content.map((paragraph, index) => (
            <p key={index} className="indent-0">
              {paragraph}
            </p>
          ))}
        </article>

        {/* ARTICLE DISCLAIMER */}
        <div id="blog-disclaimer" className="mt-16 p-6 rounded-xl bg-brand-white/40 border border-brand-navy/5 font-sans text-xs text-brand-gray italic shadow-sm">
          * This article is published for educational and analytical purposes by the Digeetech Editorial and Engineering Teams. All views expressed are centered on standard industry practices and factual technology structures.
        </div>

      </div>
    </div>
  );
};
