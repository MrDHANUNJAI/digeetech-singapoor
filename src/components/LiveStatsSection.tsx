import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Users, 
  TrendingUp, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  Zap, 
  CheckCircle2, 
  Award,
  Globe2,
  Clock
} from "lucide-react";
import { motion, useInView } from "motion/react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, suffix = "", prefix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const stepTime = 20;
    const steps = Math.ceil(duration / stepTime);
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-display font-extrabold tracking-tight">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export const LiveStatsSection: React.FC = () => {
  const [activeTickerIndex, setActiveTickerIndex] = useState(0);

  const liveEvents = [
    { text: "AI Support Agent deployed for Singapore eCommerce client", tag: "AI Automation", time: "Just now" },
    { text: "1,000+ Happy Clients milestone achieved across Singapore & APAC", tag: "Client Success", time: "2m ago" },
    { text: "100,000+ (1L+) High-Intent Leads Generated for enterprise clients", tag: "Growth Engine", time: "4m ago" },
    { text: "Full 100+ Digital Services Directory catalog active & available", tag: "Engineering", time: "6m ago" },
    { text: "Zero-Downtime PayNow & Stripe multi-currency bridge deployed", tag: "Fintech", time: "8m ago" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTickerIndex((prev) => (prev + 1) % liveEvents.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [liveEvents.length]);

  return (
    <section 
      id="live-impact-stats-section" 
      className="relative w-full py-16 md:py-20 bg-gradient-to-b from-white via-brand-navy/[0.02] to-white border-y border-brand-navy/8 overflow-hidden"
    >
      {/* Decorative Grid Lines & Ambient Blur */}
      <div className="absolute inset-0 bg-[radial-gradient(#008bce_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* TOP STATUS TICKER: LIVE RADAR BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md border border-brand-navy/10 rounded-2xl p-3 sm:px-5 mb-10 shadow-xs">
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider font-bold">LIVE TELEMETRY</span>
            </div>
            
            {/* Animated Event Ticker */}
            <div className="overflow-hidden h-6 relative flex items-center">
              <motion.div
                key={activeTickerIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 text-xs text-brand-navy/85 font-medium truncate"
              >
                <span className="font-bold text-brand-blue truncate max-w-[120px] sm:max-w-none">
                  [{liveEvents[activeTickerIndex].tag}]
                </span>
                <span className="truncate">{liveEvents[activeTickerIndex].text}</span>
              </motion.div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-brand-gray shrink-0 pl-1 sm:pl-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-brand-navy/5">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-brand-blue" />
              <span>Singapore HQ: 24/7 Operations</span>
            </span>
          </div>
        </div>

        {/* 4 PRIMARY ANIMATED STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          
          {/* STAT 1: 100+ SERVICES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group relative p-6 sm:p-7 rounded-3xl bg-white border border-brand-navy/10 hover:border-brand-blue/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-brand-blue/5 rounded-bl-full pointer-events-none group-hover:bg-brand-blue/10 transition-colors" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all shadow-xs">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-2.5 py-0.5 rounded-full">
                  16 Disciplines
                </span>
              </div>

              <div className="text-3xl sm:text-4xl lg:text-5xl text-brand-navy flex items-baseline gap-1">
                <AnimatedCounter end={100} suffix="+" />
              </div>
              
              <h3 className="font-display text-base font-bold text-brand-navy mt-2 group-hover:text-brand-blue transition-colors">
                Digital Services & Solutions
              </h3>
              
              <p className="font-sans text-xs text-brand-gray mt-1.5 leading-relaxed">
                Full-spectrum engineering across Web, Mobile, AI Agents, Cloud DevOps, Cybersecurity, CRM, and SEO.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-brand-navy/5 flex items-center justify-between text-xs">
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fixed SGD Quotes
              </span>
              <Link to="/services" className="font-bold text-brand-blue group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Catalog <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>

          {/* STAT 2: 1,000+ HAPPY CLIENTS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="group relative p-6 sm:p-7 rounded-3xl bg-white border border-brand-navy/10 hover:border-brand-blue/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  99.8% CSAT
                </span>
              </div>

              <div className="text-3xl sm:text-4xl lg:text-5xl text-brand-navy flex items-baseline gap-1">
                <AnimatedCounter end={1000} suffix="+" />
              </div>
              
              <h3 className="font-display text-base font-bold text-brand-navy mt-2 group-hover:text-emerald-700 transition-colors">
                Happy Clients & Partners
              </h3>
              
              <p className="font-sans text-xs text-brand-gray mt-1.5 leading-relaxed">
                Empowering high-growth startups, Singapore SMEs, government contractors, and enterprise leaders.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-brand-navy/5 flex items-center justify-between text-xs">
              <span className="text-brand-navy/80 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-blue" /> 100% IP Ownership
              </span>
              <Link to="/about" className="font-bold text-brand-blue group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Reviews <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>

          {/* STAT 3: 1L+ (100,000+) LEADS GENERATED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="group relative p-6 sm:p-7 rounded-3xl bg-white border border-brand-navy/10 hover:border-brand-blue/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all shadow-xs">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  High-Conversion
                </span>
              </div>

              <div className="text-3xl sm:text-4xl lg:text-5xl text-brand-navy flex items-baseline gap-1">
                <AnimatedCounter end={100} suffix="K+ (1L+)" />
              </div>
              
              <h3 className="font-display text-base font-bold text-brand-navy mt-2 group-hover:text-amber-600 transition-colors">
                Qualified Leads Generated
              </h3>
              
              <p className="font-sans text-xs text-brand-gray mt-1.5 leading-relaxed">
                Powered by targeted SEO directory structures, performance ad architectures, and automated CRM funnels.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-brand-navy/5 flex items-center justify-between text-xs">
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> S$48M+ Pipeline
              </span>
              <Link to="/services/digital-marketing" className="font-bold text-brand-blue group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Growth <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>

          {/* STAT 4: 99.9% UPTIME & SPEED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="group relative p-6 sm:p-7 rounded-3xl bg-white border border-brand-navy/10 hover:border-brand-blue/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/5 rounded-bl-full pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                  Zero-Downtime
                </span>
              </div>

              <div className="text-3xl sm:text-4xl lg:text-5xl text-brand-navy flex items-baseline gap-1">
                <AnimatedCounter end={99} suffix=".9%" />
              </div>
              
              <h3 className="font-display text-base font-bold text-brand-navy mt-2 group-hover:text-indigo-600 transition-colors">
                Cloud Reliability & Uptime
              </h3>
              
              <p className="font-sans text-xs text-brand-gray mt-1.5 leading-relaxed">
                Containerized microservices, automated CI/CD pipelines, and high-speed Singapore regional caching.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-brand-navy/5 flex items-center justify-between text-xs">
              <span className="text-brand-navy/80 font-medium flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-brand-blue" /> Cloud Run / GCP
              </span>
              <Link to="/process" className="font-bold text-brand-blue group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Process <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>

        </div>

        {/* BOTTOM IMPACT FOOTNOTE BANNER */}
        <div className="mt-8 pt-6 border-t border-brand-navy/8 flex flex-wrap items-center justify-between gap-4 text-xs text-brand-gray">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-blue shrink-0" />
            <span>
              <strong>Proven Singapore Delivery Track Record:</strong> Trusted by founders, CTOs, and marketing teams for end-to-end digital excellence.
            </span>
          </div>
          <Link
            to="/start-a-project"
            className="font-display text-xs font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 underline underline-offset-4"
          >
            Calculate Your Project Scope in 60 Seconds →
          </Link>
        </div>

      </div>
    </section>
  );
};
