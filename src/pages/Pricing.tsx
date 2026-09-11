import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  HelpCircle,
  Clock,
  Laptop,
  Smartphone,
  Server,
  TrendingUp,
  Cpu,
  Lock,
  Calculator,
  MessageSquare
} from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import servicesOverviewImg from "../assets/images/services_overview.jpg";
import cloudArchImg from "../assets/images/cloud_architecture_1789130783930.jpg";
import aiDashboardImg from "../assets/images/ai_dashboard_1789130800720.jpg";

interface PricingPlan {
  id: string;
  name: string;
  tier: "Starter" | "Business" | "Professional" | "Enterprise" | "Custom";
  startingPriceSGD: number;
  priceNote?: string;
  deliveryEstimate: string;
  summary: string;
  features: string[];
  recommendedFor: string;
  isPopular?: boolean;
}

interface CategoryPricing {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  plans: PricingPlan[];
}

export const Pricing: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("web");

  const pricingCategories: CategoryPricing[] = [
    {
      id: "web",
      title: "Website & Web Application Development",
      subtitle: "Ultra-fast, responsive, modern websites and custom web applications tailored for Singapore businesses.",
      icon: <Laptop className="w-5 h-5 text-brand-blue" />,
      plans: [
        {
          id: "web-starter",
          name: "Starter Website",
          tier: "Starter",
          startingPriceSGD: 800,
          deliveryEstimate: "5 - 7 Business Days",
          summary: "Essential high-conversion landing page or 3-5 page responsive site for new businesses and sole proprietorships.",
          features: [
            "Up to 5 Custom-Designed Responsive Pages",
            "Mobile & Tablet Optimized Layout",
            "Contact Form with Email & WhatsApp Integration",
            "Essential On-Page SEO & Fast Load Speed (<1s)",
            "100% Full Source Code & IP Ownership",
            "30 Days Post-Launch Technical Support"
          ],
          recommendedFor: "New Singapore Startups, Solopreneurs, Service Landing Pages"
        },
        {
          id: "web-business",
          name: "Business Website",
          tier: "Business",
          startingPriceSGD: 1800,
          deliveryEstimate: "2 - 3 Weeks",
          isPopular: true,
          summary: "Comprehensive corporate presence with custom UI, blog/news module, lead capture, and CMS management.",
          features: [
            "Up to 10 Custom Pages + Dynamic Blog / Portfolio",
            "Intuitive Admin CMS to update content independently",
            "Advanced Singapore Local SEO & Schema Markup",
            "Interactive Service / ROI Calculators",
            "Google Analytics 4 & Meta Pixel Setup",
            "60 Days Warranty & Technical Support"
          ],
          recommendedFor: "Growing SMEs, Consultancies, Professional Practices"
        },
        {
          id: "web-ecommerce",
          name: "E-Commerce Website",
          tier: "Professional",
          startingPriceSGD: 2800,
          deliveryEstimate: "3 - 5 Weeks",
          summary: "Feature-rich digital storefront with PayNow QR, credit card gateways, and live inventory sync.",
          features: [
            "Full Product Catalog & Variant Management",
            "Stripe & PayNow Singapore Payment Gateways",
            "Automated Invoicing & Shipping Rate Rules",
            "Customer Accounts & Order History Dashboard",
            "Abandoned Cart Recovery Emails",
            "90 Days Technical Maintenance & Training"
          ],
          recommendedFor: "Retailers, D2C Brands, Wholesale B2B Outlets"
        },
        {
          id: "web-custom-app",
          name: "Custom Web Application",
          tier: "Enterprise",
          startingPriceSGD: 4500,
          deliveryEstimate: "4 - 8 Weeks",
          summary: "Full-stack React 19/Node.js web application with user authentication, custom database, and role permissions.",
          features: [
            "Bespoke System Architecture & Database Design",
            "Role-Based Access Control (Admin, Staff, Customer)",
            "Real-time Dashboard & Reporting Charts",
            "REST / GraphQL API Endpoints & Third-Party Integrations",
            "Automated Cloud Run Deployment & Scalable Infrastructure",
            "6 Months Dedicated SLA & Bug-Free Warranty"
          ],
          recommendedFor: "SaaS Platforms, Client Portals, Internal Business Tools"
        }
      ]
    },
    {
      id: "mobile",
      title: "Mobile App Development (iOS, Android & Flutter)",
      subtitle: "Native-grade mobile applications with seamless user experience, biometric security, and offline support.",
      icon: <Smartphone className="w-5 h-5 text-cyan-600" />,
      plans: [
        {
          id: "app-cross",
          name: "Cross-Platform App",
          tier: "Starter",
          startingPriceSGD: 2500,
          deliveryEstimate: "3 - 5 Weeks",
          summary: "Single-codebase Flutter or React Native mobile app deployed to both Apple App Store and Google Play.",
          features: [
            "iOS & Android Compatible from Single Codebase",
            "Clean Custom UI/UX Design System",
            "User Authentication & Push Notifications",
            "REST API Backend Connectivity",
            "Apple & Google Developer Account Submission Assistance",
            "30 Days Post-Release Support"
          ],
          recommendedFor: "MVP Launches, Directory Apps, Community Portals"
        },
        {
          id: "app-business",
          name: "Business & Service App",
          tier: "Business",
          startingPriceSGD: 4500,
          deliveryEstimate: "6 - 8 Weeks",
          isPopular: true,
          summary: "Full-scale consumer or operational app with PayNow checkout, booking calendar, and live chat.",
          features: [
            "In-App PayNow & Credit Card Payments",
            "Real-Time Push Notifications & In-App Messaging",
            "Geo-Location & Map Pinning Integration",
            "Customer Profile & Booking / Order Management",
            "Web-Based Admin Dashboard for Operations",
            "90 Days Maintenance & App Store Updates"
          ],
          recommendedFor: "On-Demand Services, Booking Apps, Member Clubs"
        },
        {
          id: "app-custom",
          name: "Custom Mobile Platform",
          tier: "Enterprise",
          startingPriceSGD: 7500,
          deliveryEstimate: "8 - 12 Weeks",
          summary: "High-scale enterprise mobile architecture with biometric auth, offline synchronization, and hardware connectivity.",
          features: [
            "Biometric FaceID / Fingerprint Authentication",
            "Offline-First SQLite Cache & Real-Time Sync",
            "Bluetooth / Sensor / Camera Hardware Integration",
            "Enterprise Microservices Backend Architecture",
            "End-to-End Encryption & PDPA Security Hardening",
            "1-Year Enterprise Technical Support SLA"
          ],
          recommendedFor: "Fintech, Telehealth, Enterprise Logistics, Custom Hardware Apps"
        }
      ]
    },
    {
      id: "software",
      title: "Software Development & Business ERP/CRM",
      subtitle: "Bespoke operational software eliminating repetitive spreadsheets and expensive recurring SaaS fees.",
      icon: <Server className="w-5 h-5 text-indigo-600" />,
      plans: [
        {
          id: "soft-crm",
          name: "Custom CRM System",
          tier: "Starter",
          startingPriceSGD: 3500,
          deliveryEstimate: "4 - 6 Weeks",
          summary: "Tailor-fit CRM tracking sales pipeline, automated WhatsApp quotes, and client history.",
          features: [
            "Visual Kanban Pipeline & Lead Status Tracking",
            "Automated Quotation & Invoice PDF Generator",
            "WhatsApp & Email Auto-Responder Integration",
            "Staff Activity Logs & Commission Calculations",
            "Cloud Hosted with Automatic Daily Backups"
          ],
          recommendedFor: "B2B Agencies, Consultancies, Real Estate Agencies"
        },
        {
          id: "soft-erp",
          name: "Integrated ERP & Inventory",
          tier: "Business",
          startingPriceSGD: 6500,
          deliveryEstimate: "6 - 10 Weeks",
          isPopular: true,
          summary: "Complete operational hub uniting multi-warehouse stock, purchase orders, Singapore GST accounting, and supplier management.",
          features: [
            "Multi-Location Inventory with Barcode Scanning",
            "Purchase Order (PO) & Supplier Invoicing",
            "Singapore GST Reporting & Multi-Currency",
            "Staff Roster & HR Payroll Integration",
            "Custom Role Permissions & Security Audit Logs"
          ],
          recommendedFor: "Wholesale Distributors, F&B Chains, Manufacturing SMEs"
        },
        {
          id: "soft-saas",
          name: "Custom SaaS Platform",
          tier: "Enterprise",
          startingPriceSGD: 8500,
          deliveryEstimate: "8 - 14 Weeks",
          summary: "Commercial multi-tenant software ready to onboard paying subscribers with Stripe billing.",
          features: [
            "Multi-Tenant Isolation & Workspace Architecture",
            "Stripe Tiered Subscription & Usage Metering",
            "Self-Service Customer Onboarding & Team Invites",
            "Public API Documentation & Webhooks",
            "Continuous Delivery & Production Cloud Orchestration"
          ],
          recommendedFor: "Tech Founders, B2B SaaS Startups, Industry Innovators"
        }
      ]
    },
    {
      id: "ai",
      title: "AI Solutions & Workflow Automation",
      subtitle: "Autonomous multi-agent bots, document extraction, and zero-human-error automation.",
      icon: <Cpu className="w-5 h-5 text-purple-600" />,
      plans: [
        {
          id: "ai-chatbot",
          name: "AI Customer Support Bot",
          tier: "Starter",
          startingPriceSGD: 900,
          deliveryEstimate: "1 - 2 Weeks",
          summary: "24/7 intelligent conversational bot trained on your product docs and pricing to resolve inquiries instantly.",
          features: [
            "Trained on Your Website & PDF Knowledge Base",
            "Embeddable on Website & WhatsApp Business",
            "Human Agent Escalation when assistance is required",
            "Analytics Dashboard with Question Transcripts",
            "Multi-Language Support (English, Chinese, Malay)"
          ],
          recommendedFor: "E-Commerce Stores, Service Providers, Customer Support Teams"
        },
        {
          id: "ai-agent",
          name: "Autonomous AI Agent",
          tier: "Business",
          startingPriceSGD: 2200,
          deliveryEstimate: "2 - 4 Weeks",
          isPopular: true,
          summary: "Multi-step reasoning agent that performs live actions: queries databases, drafts proposals, and syncs CRMs.",
          features: [
            "Autonomous Tool Calling & Database Connectivity",
            "RAG (Retrieval-Augmented Generation) Vector Search",
            "Automated PDF Contract & Invoice Data Extraction",
            "Trigger Automated Workflows across Xero, Slack & CRM",
            "Zero Data Hallucination Guardrails"
          ],
          recommendedFor: "Logistics, Accounting, Financial Firms, Real Estate"
        },
        {
          id: "ai-custom-corp",
          name: "Enterprise AI & RPA Suite",
          tier: "Enterprise",
          startingPriceSGD: 4500,
          deliveryEstimate: "4 - 8 Weeks",
          summary: "End-to-end operational automation replacing hundreds of manual repetitive hours every month.",
          features: [
            "Custom LLM Fine-Tuning or Gemini 2.5 Multi-Agent System",
            "Internal Knowledge Base with Role-Based Privacy",
            "High-Volume Document & Receipt OCR Pipelines",
            "On-Premises or Private Singapore Cloud Data Isolation",
            "Executive AI Telemetry & Cost Optimization"
          ],
          recommendedFor: "Enterprises, Legal Practices, Healthcare Groups"
        }
      ]
    },
    {
      id: "marketing",
      title: "Digital Marketing & Singapore SEO",
      subtitle: "Data-driven organic search rankings and high-converting paid performance funnels.",
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      plans: [
        {
          id: "mkt-seo",
          name: "Singapore Local SEO",
          tier: "Starter",
          startingPriceSGD: 650,
          priceNote: "/ month",
          deliveryEstimate: "Ongoing Monthly",
          summary: "Rank on Page 1 of Google for high-intent Singapore search terms and Google Business Map pins.",
          features: [
            "Targeted Singapore Keyword Strategy (15-25 Keywords)",
            "Technical SEO Audit & Core Web Vitals Optimization",
            "Google Maps / Local Citation Building",
            "2 High-Quality Monthly Thought-Leadership Articles",
            "Transparent Monthly Ranking & Traffic Reports"
          ],
          recommendedFor: "Local Clinics, Law Firms, Trades, Service Businesses"
        },
        {
          id: "mkt-ads",
          name: "Performance Ads (Google & Meta)",
          tier: "Business",
          startingPriceSGD: 950,
          priceNote: "/ month",
          deliveryEstimate: "Ongoing Monthly",
          isPopular: true,
          summary: "High-ROI lead generation campaigns on Google Search, Instagram, and LinkedIn with continuous A/B testing.",
          features: [
            "Google Search & Display Campaign Setup",
            "Meta (Facebook & Instagram) Retargeting Funnels",
            "Conversion-Focused Ad Copy & Creative Design",
            "Landing Page Optimization & Heatmap Tracking",
            "Weekly Budget & Conversion Attribution Reviews"
          ],
          recommendedFor: "B2B Lead Generation, E-Commerce, Course Providers"
        }
      ]
    },
    {
      id: "cyber",
      title: "Cybersecurity & PDPA Audits",
      subtitle: "Protect your corporate assets, customer data, and brand reputation against modern vulnerabilities.",
      icon: <Lock className="w-5 h-5 text-rose-600" />,
      plans: [
        {
          id: "sec-audit",
          name: "Vulnerability Assessment",
          tier: "Starter",
          startingPriceSGD: 1200,
          deliveryEstimate: "1 - 2 Weeks",
          summary: "Comprehensive scan of web applications, APIs, and cloud infrastructure with actionable remediation steps.",
          features: [
            "OWASP Top 10 Application Vulnerability Scan",
            "API Security & Authentication Flow Testing",
            "SSL/TLS Configuration & DNS Security Audit",
            "Prioritized Risk Matrix Report for Developers",
            "Post-Remediation Verification Scan"
          ],
          recommendedFor: "Startups Launching Products, SME Web Portals"
        },
        {
          id: "sec-full",
          name: "Full Security Audit & PDPA Hardening",
          tier: "Business",
          startingPriceSGD: 2400,
          deliveryEstimate: "2 - 4 Weeks",
          isPopular: true,
          summary: "In-depth penetration testing, Singapore PDPA compliance review, and cloud infrastructure hardening.",
          features: [
            "Grey-Box Penetration Testing on Web & Mobile Apps",
            "Singapore PDPA Data Protection Compliance Checklist",
            "Database Encryption & Key Rotation Verification",
            "Executive Audit Summary & Official Attestation Letter",
            "Staff Cybersecurity Best Practices Guideline"
          ],
          recommendedFor: "Financial Firms, Healthcare Portals, High-Volume E-Commerce"
        }
      ]
    }
  ];

  const currentCategoryData = pricingCategories.find((c) => c.id === activeCategory) || pricingCategories[0];

  return (
    <div id="pricing-page" className="py-12 bg-white">
      {/* Top Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Transparent Singapore Dollar (SGD) Pricing
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight">
            Predictable, Value-Driven Technology Packages
          </h1>
          <p className="font-sans text-base sm:text-lg text-brand-gray mt-4 leading-relaxed">
            No hidden fees, no recurring license traps. Every project includes 100% full IP ownership, clean production code, and dedicated Singapore post-launch support.
          </p>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-brand-navy/80 bg-brand-navy/[0.02] border border-brand-navy/8 p-3 rounded-2xl">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Full Source Code Ownership</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-blue" /> Milestone-Based Payments</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-cyan-600" /> Guaranteed Timeline SLA</span>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl overflow-hidden border border-brand-navy/10 shadow-md group h-36">
              <img
                src={servicesOverviewImg}
                alt="Web Engineering Services"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-brand-navy/10 shadow-md group h-36">
              <img
                src={cloudArchImg}
                alt="Cloud ERP & SaaS Architecture"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-brand-navy/10 shadow-md group h-36">
              <img
                src={aiDashboardImg}
                alt="Cognitive AI Dashboard"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-10 flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2 scrollbar-none">
          {pricingCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-display text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 scale-[1.02]"
                  : "bg-brand-navy/5 text-brand-navy/80 hover:bg-brand-navy/10"
              }`}
            >
              {cat.icon}
              <span>{cat.title.split("&")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="border-b border-brand-navy/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-brand-navy">{currentCategoryData.title}</h2>
            <p className="text-xs sm:text-sm text-brand-gray mt-1">{currentCategoryData.subtitle}</p>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-brand-gray italic block">
              * Final pricing depends on project scope & customizations.
            </span>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCategoryData.plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl p-6 transition-all flex flex-col justify-between border ${
                plan.isPopular
                  ? "border-brand-blue shadow-xl ring-2 ring-brand-blue/20"
                  : "border-brand-navy/10 hover:border-brand-blue/40 shadow-xs hover:shadow-md"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-[10px] font-bold font-display uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue font-mono">
                    {plan.tier} Package
                  </span>
                  <span className="text-[11px] font-semibold text-brand-gray flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-600" /> {plan.deliveryEstimate}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-brand-navy">{plan.name}</h3>
                
                {/* Price Display */}
                <div className="mt-4 mb-4 pb-4 border-b border-brand-navy/8">
                  <span className="text-xs text-brand-gray block">Starting from</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-extrabold text-brand-navy">
                      S${plan.startingPriceSGD.toLocaleString()}
                    </span>
                    {plan.priceNote && (
                      <span className="text-xs text-brand-gray font-medium">{plan.priceNote}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-brand-gray mt-2 leading-relaxed">{plan.summary}</p>
                </div>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block">
                    What's Included:
                  </span>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-brand-navy/85">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-brand-navy/8 mt-2">
                <div className="mb-3">
                  <span className="text-[10px] text-brand-gray block leading-tight">
                    <strong className="text-brand-navy">Best for:</strong> {plan.recommendedFor}
                  </span>
                </div>
                <Link
                  to={`/start-a-project?package=${encodeURIComponent(plan.name)}&cat=${activeCategory}`}
                  className={`w-full py-2.5 px-4 rounded-xl font-display text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all ${
                    plan.isPopular
                      ? "bg-brand-blue text-white hover:bg-brand-blue-dark shadow-md"
                      : "bg-brand-navy/5 text-brand-navy hover:bg-brand-blue hover:text-white"
                  }`}
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Interactive Custom Quote Calculator Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-blue-light block mb-2">
                Need a Custom Solution or Enterprise Scope?
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Calculate Your Exact Project Estimate in 60 Seconds
              </h2>
              <p className="text-sm text-white/80 mt-2 max-w-2xl leading-relaxed">
                Use our interactive Singapore scope builder to select required modules, databases, AI agents, and integrations. Receive an itemized Singapore Dollar breakdown with zero sales pressure.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/start-a-project"
                className="bg-brand-blue text-white hover:bg-brand-blue-light px-6 py-3.5 rounded-2xl font-display text-sm font-bold shadow-lg text-center flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" /> Launch Scope Calculator
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-2xl font-display text-sm font-bold text-center border border-white/20 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <SectionHeader
          eyebrow="Frequently Asked Questions"
          title="Clear Answers About Pricing & Engagements"
          description="Everything you need to know about working with Digee Tech in Singapore."
          center
        />

        <div className="mt-8 space-y-4">
          <div className="bg-white border border-brand-navy/10 rounded-2xl p-5 shadow-xs">
            <h3 className="font-display text-base font-bold text-brand-navy">
              Are there any hidden costs or recurring monthly license fees?
            </h3>
            <p className="text-xs sm:text-sm text-brand-gray mt-2 leading-relaxed">
              No. Digee Tech operates on 100% transparent milestone-based contracts in Singapore Dollars (SGD). Once paid, you own full source code, IP rights, and database access. You are never held hostage by proprietary monthly software fees.
            </p>
          </div>

          <div className="bg-white border border-brand-navy/10 rounded-2xl p-5 shadow-xs">
            <h3 className="font-display text-base font-bold text-brand-navy">
              How does the milestone payment structure work?
            </h3>
            <p className="text-xs sm:text-sm text-brand-gray mt-2 leading-relaxed">
              Standard engagements are structured into milestones: 30% project kickoff & architecture, 40% functional beta delivery & review, and 30% final deployment, code handover, and warranty kickoff.
            </p>
          </div>

          <div className="bg-white border border-brand-navy/10 rounded-2xl p-5 shadow-xs">
            <h3 className="font-display text-base font-bold text-brand-navy">
              Do you provide post-launch warranties and maintenance?
            </h3>
            <p className="text-xs sm:text-sm text-brand-gray mt-2 leading-relaxed">
              Yes. Every project includes an explicit post-launch bug-free warranty (ranging from 30 days to 6 months depending on package tier) with guaranteed turnaround SLAs for any unforeseen issues.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
