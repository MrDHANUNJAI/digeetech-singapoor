export interface ServiceDetails {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  capabilities: string[];
  process: { step: string; title: string; description: string }[];
  technology: string[];
  faqs: { question: string; answer: string }[];
}

export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  clientRequirement: string;
  challenge: string;
  solution: string;
  technology: string[];
  features: string[];
  process: string[];
  results: string[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  author: string;
}

export interface SolutionPackage {
  id: string;
  title: string;
  tagline: string;
  description: string;
  targetAudience: string;
  benefits: string[];
  servicesIncluded: string[];
  ctaText: string;
}

export const servicesData: Record<string, ServiceDetails> = {
  "web-development": {
    slug: "web-development",
    title: "Website Development",
    category: "DIGITAL DEVELOPMENT",
    tagline: "Corporate & Enterprise Websites Built for Business Growth",
    description: "We develop high-performance, responsive websites that serve as a strong digital foundation for your company. From standard corporate web presences to complex custom web portals, every site we build is optimized for Speed, Security, and SEO.",
    problem: "Most business websites look generic, load slowly, and fail to convert visitors. They are often built on rigid, outdated frameworks that are difficult to scale, unoptimized for mobile screens, and vulnerable to security threads.",
    solution: "Digeetech engineers custom web solutions utilizing cutting-edge frontend architectures like React and Next.js paired with clean, accessible styling. We deliver pixel-perfect designs, lightning-fast load times, solid security layers, and an intuitive content editor experience.",
    capabilities: [
      "Custom Corporate Websites",
      "E-commerce Platforms & Custom Storefronts",
      "High-Converting Landing Pages",
      "Customer & Client Portals",
      "Performance & Core Web Vitals Optimization",
      "CMS (Content Management System) Integrations",
      "SEO-Ready Technical Architectures",
      "API & CRM Data Synchronizations"
    ],
    process: [
      { step: "01", title: "Technical Blueprinting", description: "Analyzing information architecture, layout schemas, and custom API specifications." },
      { step: "02", title: "Visual & UX Architecting", description: "Mapping user journeys, high-fidelity responsive wireframes, and interface styling." },
      { step: "03", title: "Clean-Code Engineering", description: "Writing structured, semantic code with optimized modern frontend components." },
      { step: "04", title: "Performance Tuning", description: "Core Web Vitals auditing, asset optimization, security hardening, and SEO readiness." }
    ],
    technology: ["React", "TypeScript", "Vite", "Tailwind CSS", "Next.js", "Node.js", "GraphQL", "Headless CMS"],
    faqs: [
      { question: "Do you build custom designs or use standard templates?", answer: "We build completely custom layouts tailored specifically to your brand architecture. We do not use bloated off-the-shelf templates." },
      { question: "Will the website be mobile-responsive and SEO-friendly?", answer: "Yes, 100%. Responsive design is baked into our core layout structure. We also implement technical SEO parameters (schema, semantic HTML, metadata, and fast loading speeds)." }
    ]
  },
  "app-development": {
    slug: "app-development",
    title: "App Development",
    category: "DIGITAL DEVELOPMENT",
    tagline: "Premium Mobile Applications for iOS and Android",
    description: "We build intuitive, high-performance mobile applications that keep users engaged. From native iOS/Android development to powerful cross-platform hybrid apps, Digeetech ensures a seamless native user experience.",
    problem: "Poorly optimized apps crash, load slowly, drain batteries, and have clunky interfaces. These engineering defects result in high uninstall rates and negative user feedback.",
    solution: "Our engineering team designs lightweight, highly responsive mobile apps using modern architectures. We prioritize fluid micro-interactions, robust offline data caching, and secure API gateways to deliver an elite app store presence.",
    capabilities: [
      "Native iOS Development (Swift & UIKit)",
      "Native Android Development (Kotlin & Jetpack Compose)",
      "Cross-Platform App Development (React Native & Flutter)",
      "Secure RESTful & GraphQL API Gateways",
      "Real-Time Data Syncing & Push Notifications",
      "Biometric & Social Auth Integrations",
      "Offline-First Database Design",
      "App Store & Google Play Deployment"
    ],
    process: [
      { step: "01", title: "UX Discovery", description: "Mapping out touch-target interactions and screen transitions." },
      { step: "02", title: "UI/UX Prototyping", description: "Creating clickable app wireframes to visualize key app states." },
      { step: "03", title: "Native & Hybrid Build", description: "Building front-facing screens and connecting them with back-facing services." },
      { step: "04", title: "Beta Testing", description: "Thorough testing on various real devices, screen ratios, and operating systems." }
    ],
    technology: ["React Native", "TypeScript", "Swift", "Kotlin", "Flutter", "Firebase", "App Store Connect", "Play Console"],
    faqs: [
      { question: "Should we build native or hybrid apps?", answer: "It depends on your business goals and budget. Hybrid frameworks like React Native allow you to launch on both iOS and Android simultaneously, saving time and costs, while native is ideal for intensive on-device hardware access." },
      { question: "Do you handle the App Store publishing process?", answer: "Yes. We manage the entire submission, review, and deployment cycle for both Apple App Store and Google Play Store." }
    ]
  },
  "ai-agents": {
    slug: "ai-agents",
    title: "AI Agents",
    category: "AI & AUTOMATION",
    tagline: "Autonomous AI Agents That Automate Complex Business Operations",
    description: "Go beyond simple chatbots. Digeetech builds autonomous, task-oriented AI agents capable of reasoning, calling external APIs, executing complex workflows, and interacting with your databases and enterprise business systems.",
    problem: "Traditional chatbots are rigid, rule-based, and fail when conversations deviate slightly. Businesses waste countless hours on repetitive manual operations like sorting emails, answering inquiries, and qualifying leads.",
    solution: "We build advanced cognitive agents powered by modern LLMs. Our agents understand user intent, break down complex goals into sequential sub-tasks, retrieve structured context from your internal databases, and take real-world actions via APIs.",
    capabilities: [
      "Autonomous Customer Support Agents",
      "Intelligent Sales & Lead Qualification Agents",
      "Data Research & Synthesis Agents",
      "Internal Document & Knowledge Retrieval Agents",
      "Multi-Agent Collaborative Workflows",
      "Dynamic Tool-Use & Function Calling Integrations",
      "Continuous Learning & Execution Auditing"
    ],
    process: [
      { step: "01", title: "Knowledge Scoping", description: "Defining agent guidelines, input formats, boundary safety rules, and context databases." },
      { step: "02", title: "Cognitive Engineering", description: "System prompting, fine-tuning cognitive templates, and building safety guardrails." },
      { step: "03", title: "Tool & API Bindings", description: "Connecting the agent to internal databases, CRM pipelines, calendar bookings, and custom APIs." },
      { step: "04", title: "Simulated Sandboxing", description: "Testing agent outputs against hundreds of user conversational variations to verify reasoning." }
    ],
    technology: ["@google/genai", "Gemini 2.5", "LangChain", "LlamaIndex", "Node.js", "Python", "Vector Databases", "REST APIs"],
    faqs: [
      { question: "What is the difference between a chatbot and an AI Agent?", answer: "A chatbot responds to user input with static pre-configured replies. An AI Agent has a reasoning loop; it can break down a goal, choose which tools or APIs to call, fetch live database records, make decisions, and execute steps to complete the goal." },
      { question: "Is our business data secure when using AI Agents?", answer: "Absolutely. We enforce strict data privacy guardrails, use enterprise-grade cloud endpoints, and ensure your private data is never used to train public models." }
    ]
  },
  "ai-tools": {
    slug: "ai-tools",
    title: "AI Tools",
    category: "AI & AUTOMATION",
    tagline: "Custom Generative AI Tools Tailored to Your Workflows",
    description: "Accelerate your team's output by integrating tailor-made generative AI utilities into your daily operations. From smart content parsers to automated report writers, we construct solutions that turn AI into a core competitive advantage.",
    problem: "Generic public AI tools lack understanding of your unique brand voice, internal formats, and specialized business datasets, leading to generic outputs and manual formatting overhead.",
    solution: "We construct secure, custom AI-powered dashboards and tools programmed with your brand blueprints, proprietary data, and exact templates.",
    capabilities: [
      "Custom Document & PDF Parsers",
      "Automated Report & Proposal Creators",
      "Brand-Aligned Content Generation Engines",
      "Intelligent Image & Creative Asset Generators",
      "Semantic Search & Smart Tagging Systems",
      "Speech-to-Text & Transcript Analyzers"
    ],
    process: [
      { step: "01", title: "Requirements Mapping", description: "Identifying precise manual tasks suitable for AI-driven acceleration." },
      { step: "02", title: "Prompt & Model Tuning", description: "Optimizing prompts, establishing context windows, and refining formatting instructions." },
      { step: "03", title: "Frontend Integration", description: "Creating simple, elegant interfaces for uploading documents, adjusting outputs, and copying results." }
    ],
    technology: ["@google/genai", "Gemini Flash", "Vite", "React", "Node.js", "FastAPI", "Cloud Functions"],
    faqs: [
      { question: "Can the AI tools handle large enterprise documents?", answer: "Yes. Leveraging the massive context windows of advanced LLMs like Gemini (up to 1M+ tokens), we can parse, analyze, and synthesize extremely large books, technical manuals, and multi-page spreadsheets in seconds." }
    ]
  },
  "saas": {
    slug: "saas",
    title: "SaaS Development",
    category: "DIGITAL DEVELOPMENT",
    tagline: "End-to-End SaaS Product Development",
    description: "We partner with visionary founders and established enterprises to engineer robust, scalable Software-as-a-Service (SaaS) products. From initial MVP scoping to multi-tenant architectures, we build platforms that scale.",
    problem: "SaaS development is complex, requiring secure authentication, multi-tenant database isolation, subscription systems, custom integrations, and intuitive admin dashboards. Sloppy architecture early on makes scaling impossible later.",
    solution: "We build enterprise-ready SaaS backends and visually stunning frontends. Our templates ensure strict data security, flexible billing models (Stripe/PayPal), highly optimized database queries, and structured admin portals.",
    capabilities: [
      "SaaS MVP Design & Core Feature Development",
      "Multi-Tenant Database & Workspace Isolation",
      "Stripe Subscription & Recurring Billing Integrations",
      "Role-Based Access Controls (RBAC)",
      "Comprehensive Admin Dashboards & Analytics",
      "Public Developer APIs & Webhooks",
      "Automated Database Backups & High Availability"
    ],
    process: [
      { step: "01", title: "Product Blueprinting", description: "Defining data schemas, tenant routing, user workspaces, and MVP boundaries." },
      { step: "02", title: "UI/UX Dashboard Design", description: "Designing an intuitive, responsive interface for workspace admins and regular users." },
      { step: "03", title: "Full-Stack Development", description: "Engineering the API, authentication, tenant isolation, and third-party webhooks." },
      { step: "04", title: "Deployment & Scaling Plan", description: "Deploying to secure cloud containers with active monitoring, auto-scaling, and logging." }
    ],
    technology: ["Node.js", "Express", "React", "TypeScript", "Vite", "Tailwind CSS", "PostgreSQL", "Prisma/Drizzle", "Stripe API"],
    faqs: [
      { question: "How long does it take to launch a SaaS MVP?", answer: "Typically, a fully functional SaaS MVP takes 6 to 12 weeks depending on the complexity of the core workflow, billing models, and required integrations." }
    ]
  },
  "crm": {
    slug: "crm",
    title: "CRM Solutions",
    category: "BUSINESS SYSTEMS",
    tagline: "Custom Customer Relationship Management Systems",
    description: "Digeetech engineers custom CRM solutions designed to map your precise sales process, pipeline flows, and client communications. Stop paying expensive per-user licenses for features you do not use.",
    problem: "Off-the-shelf CRMs are bloated, expensive, difficult to customize, and often fail to integrate nicely with your existing software and marketing channels.",
    solution: "We develop custom CRM systems that are lean, highly tailored, and seamlessly integrated. Every team member gets exactly the interface they need to log leads, close opportunities, track follow-ups, and generate executive-ready reports.",
    capabilities: [
      "Custom Sales Pipelines & Visual Deal Boards",
      "Lead Capture, Enrichment, & Routing",
      "Customer Activity Timeline & Interaction Tracking",
      "Automated Follow-ups & Task Reminders",
      "Role-Based Permissions & Data Protection",
      "AI-Powered Opportunity Forecasting & Summary Reports",
      "Seamless Telephony, Email, & WhatsApp Integrations"
    ],
    process: [
      { step: "01", title: "Pipeline Mapping", description: "Analyzing your exact stages of sales, customer acquisition, and reporting metrics." },
      { step: "02", title: "Database Architecture", description: "Setting up relationship tables for contacts, deals, companies, activities, and tasks." },
      { step: "03", title: "Interactive Interface Design", description: "Creating beautiful drag-and-drop kanban boards, rich client profile pages, and analytical charts." }
    ],
    technology: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Node.js", "PostgreSQL", "Firebase"],
    faqs: [
      { question: "Why should we build a custom CRM instead of buying Salesforce or HubSpot?", answer: "A custom CRM is highly optimized for your exact operations, does not charge monthly per-user licensing fees, integrates seamlessly with proprietary internal APIs, and belongs entirely to you as a valuable IP asset." }
    ]
  },
  "erp": {
    slug: "erp",
    title: "ERP Solutions",
    category: "BUSINESS SYSTEMS",
    tagline: "Tailor-Made Enterprise Resource Planning Systems",
    description: "Unify your operations with an ERP customized to your organizational workflow. Digeetech consolidates finance, inventory, human resources, procurement, and projects into a single, cohesive source of truth.",
    problem: "Disconnected systems lead to double-data entry, inventory discrepancies, manual operational bottlenecks, and an inability to make accurate, data-driven executive decisions.",
    solution: "We build integrated ERP ecosystems that break down internal departmental silos. Connect your supply chain to your accounting ledger, and your HR rosters to payroll dashboards, with instant sync across modules.",
    capabilities: [
      "Integrated Finance & Ledger Accounting",
      "HR Management, Roster Scheduling, & Payroll",
      "Inventory Management & Automated Purchase Reorders",
      "Sales, Quoting, & Customer Invoice Generation",
      "Procurement & Vendor Relationship Control",
      "Enterprise-Grade Role Auditing & Activity Logs"
    ],
    process: [
      { step: "01", title: "Operational Audit", description: "Mapping data movement across departments (Finance, HR, Inventory, Operations)." },
      { step: "02", title: "Ecosystem Design", description: "Architecting modules that cleanly share data on a unified modern database." },
      { step: "03", title: "Modular Implementation", description: "Rolling out individual modules incrementally to ensure minimal disruption to daily operations." }
    ],
    technology: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Node.js", "PostgreSQL", "Prisma", "Docker"],
    faqs: [
      { question: "Can we migrate our existing historical spreadsheet data?", answer: "Yes. We design custom data pipelines to safely clean, format, and migrate your legacy spreadsheet or database records into your new custom ERP." }
    ]
  },
  "management-portals": {
    slug: "management-portals",
    title: "Management Portals",
    category: "BUSINESS SYSTEMS",
    tagline: "Secure Portals for Employees, Clients, Students, and Vendors",
    description: "Create secure, localized hubs for your internal teams and external stakeholders. We engineer customized portals that facilitate self-service, secure document exchange, tracking, and streamlined collaboration.",
    problem: "Sending PDF documents back and forth via email is messy, insecure, and extremely hard to track at scale.",
    solution: "We develop highly secure, intuitive portals that centralize communication, file transfers, scheduling, status updates, and reports, protecting your operations with enterprise encryption.",
    capabilities: [
      "Secure Client Self-Service Portals",
      "Internal Employee Knowledge Hubs & Activity Logs",
      "Student & Institution Educational Portals",
      "Vendor & Purchase Order Fulfillment Management",
      "Highly Encrypted PDF & Document Sharing",
      "Interactive Project & Assignment Dashboards"
    ],
    process: [
      { step: "01", title: "Access Profiling", description: "Defining target roles (e.g., student vs. teacher, client vs. advisor) and permission boundaries." },
      { step: "02", title: "Interface Tuning", description: "Designing visual panels matching user access and keeping file management extremely simple." },
      { step: "03", title: "Security Hardening", description: "Implementing SSL, secure tokens, file upload filters, and end-to-end data encryption." }
    ],
    technology: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Firebase Storage", "JWT Auth"],
    faqs: [
      { question: "How do you guarantee document and file security?", answer: "All uploads pass through strict antivirus check blocks, are stored in encrypted cloud bucket environments, and are served using temporary, signed, expire-on-access URL tokens." }
    ]
  },
  "automation": {
    slug: "automation",
    title: "Automation Solutions",
    category: "AI & AUTOMATION",
    tagline: "Custom Business & API Automation Workflows",
    description: "Connect your siloed tools and eliminate manual, repetitive digital tasks. Digeetech builds seamless integrations and customized background workers that keep your data moving without human errors.",
    problem: "Employees spend hours copying information between different platforms, resulting in data lag, fat-finger mistakes, and slow operational responses.",
    solution: "We build automated data pipelines and API-first background sync engines. We integrate legacy systems, modern cloud tools, and custom scripts to handle heavy data lifting automatically.",
    capabilities: [
      "Custom REST, SOAP, & GraphQL API Integrations",
      "Automated Invoice & Document Generation Pipelines",
      "Multi-App Synchronization (e.g., Shopify to ERP, Meta to CRM)",
      "Background Workers, Cron Jobs, & Database Schedulers",
      "Custom Webhook Ingestion & Form Processing Engines"
    ],
    process: [
      { step: "01", title: "Silo Mapping", description: "Analyzing which applications hold key data and where data transfers block operations." },
      { step: "02", title: "Trigger-Action Architecture", description: "Designing data transformation pipelines, retry mechanisms, and fallback safety rules." },
      { step: "03", title: "Automation Deployment", description: "Deploying lightweight background scripts or serverless workflows that execute automatically." }
    ],
    technology: ["Node.js", "Express", "Cloud Functions", "Zapier Developer API", "Make API", "Cron Scheduling"],
    faqs: [
      { question: "Can you automate legacy software that doesn't have an API?", answer: "Yes. We can design custom data scrapers or robotic process automation (RPA) scripts to safely extract and input data from systems lacking modern API interfaces." }
    ]
  },
  "digital-marketing": {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "DIGITAL GROWTH",
    tagline: "Result-Driven Digital Marketing Campaigns",
    description: "Grow your online presence and attract high-quality business leads. Digeetech architects data-backed marketing strategies across social platforms, search engines, and content funnels to turn traffic into pipeline revenue.",
    problem: "Most marketing efforts focus on empty vanity metrics like likes or impressions instead of cost-per-lead, actual customer conversion rates, and sales pipeline growth.",
    solution: "We align all marketing activities with your concrete sales targets. We create structured content engines, design high-converting visual ad assets, and construct intelligent lead funnels.",
    capabilities: [
      "Comprehensive Digital Growth Strategy",
      "Multi-Channel Campaign Optimization",
      "Lead Generation & Acquisition Funnels",
      "Social Media Content Strategy & Planning",
      "Detailed Marketing Analytics & Conversion Tracking"
    ],
    process: [
      { step: "01", title: "Audience Profiling", description: "Analyzing target demographics, pain points, and content consumption behaviors." },
      { step: "02", title: "Funnel Engineering", description: "Creating landing pages, lead magnets, and automated email nurturing sequences." },
      { step: "03", title: "Campaign Launch", description: "Publishing creative copy, optimizing bid levels, and continuous conversion rate optimization (CRO)." }
    ],
    technology: ["Google Analytics 4", "Meta Pixel", "LinkedIn Insight", "HubSpot", "Mailchimp", "Search Console"],
    faqs: [
      { question: "Do you guarantee specific sales or revenue increases?", answer: "We do not offer artificial, unverified guarantees as any ethical marketer should. Instead, we guarantee rigorous testing, clean analytics, transparent cost-per-acquisition reporting, and iterative funnel optimization to maximize your budget efficiency." }
    ]
  },
  "seo": {
    slug: "seo",
    title: "SEO Solutions",
    category: "DIGITAL GROWTH",
    tagline: "Technical & Content SEO That Drives High-Intent Traffic",
    description: "Rank for keywords that actually impact your bottom line. We perform deep technical audits, build structural link equity, and write semantic, educational content that satisfies search engines and answers human queries.",
    problem: "Most SEO tactics rely on outdated keyword stuffing and low-quality spam backlink schemes, which lead to search engine search penalties and temporary traffic spikes that never convert.",
    solution: "We focus on a modern, user-first SEO blueprint: pristine site speed, crawlable semantic HTML code, clean canonical structure, thorough schema markup, and robust topical-authority content hubs.",
    capabilities: [
      "Comprehensive Technical SEO Audits",
      "On-Page Content Architecture & Topic Clusters",
      "Local SEO Optimization & Google Business Control",
      "Competitor Keyword Gap & Intent Mapping",
      "Structured Schema & JSON-LD Implementation"
    ],
    process: [
      { step: "01", title: "Technical Crawling", description: "Locating indexation obstacles, speed blocks, and redirect loops." },
      { step: "02", title: "Topic Mapping", description: "Discovering high-intent search terms that align directly with your services." },
      { step: "03", title: "On-Page Optimization", description: "Structuring page layout tags, heading hierarchies, meta snippets, and asset compression." }
    ],
    technology: ["Screaming Frog", "SEMrush", "Google Search Console", "Google Analytics 4", "Schema.org Markup"],
    faqs: [
      { question: "How long does it take to see results from SEO?", answer: "Typically, technical fixes show small improvements within 2-4 weeks, but comprehensive topical authority ranking and substantial organic pipeline growth require 3 to 6 months of consistent strategy." }
    ]
  },
  "meta-ads": {
    slug: "meta-ads",
    title: "Meta Ads",
    category: "DIGITAL GROWTH",
    tagline: "High-Performance Paid Campaigns on Facebook & Instagram",
    description: "We design, write, and manage target campaigns on Meta's advertising platform. Our focus is lowering your Cost Per Acquisition (CPA) and acquiring warm leads and active buyers.",
    problem: "Boosting social media posts simply wastes budgets on un-targeted clicks, while complex ad setups often fail due to bad pixel tracking, boring creative, and poor target selection.",
    solution: "We construct pixel-perfect Meta campaigns. We design eye-catching ad graphics, write persuasive sales copy, establish multi-layered audience targeting, and run rigorous creative testing matrices.",
    capabilities: [
      "Custom Campaign Architecture (CBO & ABO Setup)",
      "High-Converting Visual Ad Creatives & Motion Graphics",
      "Persuasive Sales Copywriting & Hook Testing",
      "Meta Pixel & Conversions API (CAPI) Configuration",
      "A/B Creative & Headline Matrix Testing",
      "Retargeting Funnels & Custom Audience Lookalikes"
    ],
    process: [
      { step: "01", title: "Audience Mapping", description: "Constructing cold, warm, and custom retargeting lists." },
      { step: "02", title: "Creative Matrix", description: "Writing 3-5 hook variations and matching them with multiple scroll-stopping visuals." },
      { step: "03", title: "Optimization & Scaling", description: "Scaling winning ad sets vertically and horizontally while shutting down poor performers." }
    ],
    technology: ["Meta Ads Manager", "Meta conversions API", "Canva Pro", "Figma", "Google Tag Manager"],
    faqs: [
      { question: "What is a recommended starting ad spend budget?", answer: "We suggest starting with at least ₹15,000 to ₹30,000 per month on ad channels to gather enough data for pixel optimization and testing. We scale this budget as the campaigns prove profitable." }
    ]
  },
  "graphic-design": {
    slug: "graphic-design",
    title: "Graphic Design",
    category: "CREATIVE",
    tagline: "Stunning Graphic Designs & Commercial Marketing Assets",
    description: "Communicate your brand message with powerful visual designs. We craft social media templates, brochures, posters, sales pitch deck designs, and ad assets that convey professionalism and capture interest.",
    problem: "Inconsistent, poorly aligned social posts and low-quality sales decks make a business look amateurish, eroding consumer trust.",
    solution: "Our design studio establishes strict grid structures, typography rules, and custom visual elements to make every piece of content you release feel high-end, cohesive, and intentional.",
    capabilities: [
      "Social Media Ad Assets & Banner Packs",
      "Professional Pitch Decks & Corporate Slides",
      "Brochures, Catalogues, & Marketing Collateral",
      "Custom Illustrations & Technical Infographics",
      "High-Converting Website Asset Assets"
    ],
    process: [
      { step: "01", title: "Visual Discovery", description: "Evaluating your brand guidelines, typography preferences, and design references." },
      { step: "02", title: "Moodboard Pitching", description: "Sharing initial style guidelines and grid architectures for feedback." },
      { step: "03", title: "Asset Generation", description: "Rendering pristine, export-ready visual outputs suited for physical or screen use." }
    ],
    technology: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Canva Enterprise"],
    faqs: [
      { question: "Do you hand over the source files?", answer: "Yes, absolutely. Upon completion and final approval, we package and deliver all editable source files (Figma, Illustrator vector, or high-res layers) directly to you." }
    ]
  },
  "branding": {
    slug: "branding",
    title: "Branding",
    category: "CREATIVE",
    tagline: "Corporate Brand Identity & Visual Guidelines",
    description: "We shape corporate identities that leave a lasting mark. Digeetech crafts logos, color schemes, typography guides, and messaging templates that tell your company's story clearly and align with your vision.",
    problem: "Many brands lack visual guidelines, causing inconsistent marketing designs, split brand messaging, and weak audience recall.",
    solution: "We deliver comprehensive Brand Book guidelines mapping your logo constraints, color codes, typographic scales, tone of voice rules, and digital templates.",
    capabilities: [
      "Custom Logo Design & Vector Marks",
      "Comprehensive Brand Style Guides & Layout Rules",
      "Corporate Color Palette Selection (Primary, Secondary, Accent)",
      "Typography Scaling & System Font Pairings",
      "Visual Brand Assets & Template Packaging"
    ],
    process: [
      { step: "01", title: "Brand Discovery", description: "Digging deep into company values, user personas, and competitor styles." },
      { step: "02", title: "Concept Brainstorming", description: "Drafting multiple unique logo and typographical directions." },
      { step: "03", title: "Visual Formulation", description: "Testing visual marks in high contrast (light vs dark) and across various materials." }
    ],
    technology: ["Figma", "Adobe Illustrator", "Brand Guideline Blueprinting"],
    faqs: [
      { question: "How many logo iterations do you provide?", answer: "We initially present 3 distinct visual directions, then refine the chosen direction through up to 3 rounds of targeted adjustments to ensure perfection." }
    ]
  },
  "ui-ux": {
    slug: "ui-ux",
    title: "UI/UX Design",
    category: "CREATIVE",
    tagline: "Interactive User Journeys & High-Fidelity UI Designs",
    description: "Design apps and websites that are pleasant to use. We map intuitive user pathways, model mock wireframes, and design rich, modern interfaces that reduce user fatigue and increase conversion rates.",
    problem: "Cluttered interfaces, confusing workflows, and hidden buttons frustrate users, leading to abandoned carts and high bounce rates.",
    solution: "We focus on human-centered design principles: clear headings, balanced spacing, visible buttons, easy navigation, and consistent visual layouts.",
    capabilities: [
      "User Journey Mapping & Experience Audits",
      "Interactive High-Fidelity Clickable Prototypes",
      "SaaS, Dashboard, & Mobile Screen Design",
      "Consistent Design Systems & Component Libraries",
      "Visual Interface Styling & Dynamic Micro-interactions"
    ],
    process: [
      { step: "01", title: "User Flow Mapping", description: "Determining every button click and page navigation required to complete core user goals." },
      { step: "02", title: "High-Fidelity UI Creation", description: "Designing elegant screen interfaces with beautiful color contrasts and balanced grid lines." },
      { step: "03", title: "Clickable Prototyping", description: "Interlinking screens in Figma to simulate genuine app usage prior to development." }
    ],
    technology: ["Figma", "Adobe XD", "User Flow Diagrams"],
    faqs: [
      { question: "Do you write the frontend code as part of UI/UX?", answer: "UI/UX focuses purely on visual templates, wireframes, and prototypes in Figma. However, since Digeetech is an end-to-end agency, our engineering team can seamlessly build your approved designs into production-ready React or Mobile code." }
    ]
  }
};

export const projectsData: ProjectData[] = [
  {
    slug: "enterprise-portal-case-study",
    title: "Enterprise Document & Workflow System",
    category: "Web",
    shortDescription: "A highly secure document management and employee portal built for a logistics client.",
    description: "An end-to-end, highly encrypted employee portal designed to centralize internal operations, file tracking, and workforce schedules for a major regional logistics firm.",
    clientRequirement: "The client needed a centralized portal to replace multi-threaded emails, protect confidential transport files, and manage workforce shift assignments seamlessly.",
    challenge: "Developing a performant portal that allows bulk file uploads, enforces strict row-level security per employee role, and maintains lightning-fast speeds over standard mobile connections.",
    solution: "We designed a customized React-based dashboard with a secure Node.js background and robust document parsing automation, storing files in encrypted cloud environments with temporal access keys.",
    technology: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS", "Firebase Auth", "Firebase Storage"],
    features: [
      "Dynamic Row-Level Employee Permissions",
      "Instant Cloud File Upload with Antivirus Scanning",
      "Real-time Shift Scheduling & Shift Swapping Boards",
      "Custom Reporting Export (Excel, PDF)",
      "Secure Activity Auditing Log"
    ],
    process: [
      "Conducted 3-day deep operational discovery of scheduling workflows.",
      "Mapped user permissions matrices across Admin, Supervisor, and Team Member roles.",
      "Engineered secure cloud file ingestion modules with temporary session credentials.",
      "Delivered mobile-responsive interface with optimized Core Web Vitals."
    ],
    results: [
      "Established a secure, single source of truth for all employee documents.",
      "Improved operational communication speeds by centralizing notifications.",
      "Ensured zero documentation security breaches through robust auth gateways."
    ]
  },
  {
    slug: "custom-crm-case-study",
    title: "Client Pipeline & Lead Management CRM",
    category: "CRM",
    shortDescription: "A tailormade pipeline and activity tracking CRM engineered for a growing services agency.",
    description: "A fast, lightweight, and custom CRM built to track deal stages, capture organic website leads automatically, and coordinate sales pipeline activities.",
    clientRequirement: "The client wanted to transition off bloated monthly CRM platforms and have a dedicated lead-tracking panel built specifically for their internal sales process.",
    challenge: "Integrating lead ingestion seamlessly from multiple landing page platforms while providing sales reps with clean, drag-and-drop opportunity boards.",
    solution: "We built a custom React dashboard highlighting a visual sales kanban board, automated email reminder workers, and comprehensive reporting metrics.",
    technology: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Node.js", "Express", "PostgreSQL"],
    features: [
      "Drag-and-Drop Sales Kanban Board",
      "Automatic Lead Capture and Round-Robin Assignment",
      "Unified Activity History Timeline for Deals",
      "Sales Forecasting & Revenue Metric Charts",
      "Automated Follow-up Email Workers"
    ],
    process: [
      "Analyzed historical lead conversion hurdles and rep daily workflows.",
      "Created highly optimized PostgreSQL schemas mapping contacts, accounts, and deals.",
      "Engineered clean, pixel-perfect dashboard layouts utilizing responsive design principles."
    ],
    results: [
      "Eliminated recurring monthly licensing fees for features the team didn't need.",
      "Centralized all lead documentation into a single searchable dashboard.",
      "Reduced rep admin logging efforts by automating follow-up prompts."
    ]
  },
  {
    slug: "ai-support-agent-case-study",
    title: "Autonomous Customer Support AI Agent",
    category: "AI",
    shortDescription: "A reasoning AI agent integrated into a client's internal messaging pipeline.",
    description: "A secure cognitive agent trained on product manuals to handle initial user queries, retrieve client order data, and update ticket statuses automatically.",
    clientRequirement: "A growing digital shop needed 24/7 client support that could resolve common order tracking issues and safely escalate complex issues.",
    challenge: "Preventing model hallucination, ensuring accurate product information lookup, and connecting with real database systems safely.",
    solution: "We developed an AI Agent using the latest Gemini SDK with robust system prompting, RAG (Retrieval-Augmented Generation) architectures, and API tool call boundaries.",
    technology: ["@google/genai", "Node.js", "Express", "TypeScript", "Vector Database", "REST APIs"],
    features: [
      "Context-Rich Semantic Search and Document Retrieval",
      "Dynamic API Tool Calling to Retrieve Live Statuses",
      "Safe Escalation Gateways to Human Representatives",
      "Automatic Language Translation and Sentiment Tracking",
      "Secure System Prompting and Compliance Boundaries"
    ],
    process: [
      "Synthesized internal product handbooks and help docs into a secure semantic index.",
      "Configured function calling limits so the agent could only trigger safe status APIs.",
      "Ran rigorous multi-turn conversational testing profiles to verify reasoning chains."
    ],
    results: [
      "Successfully resolved initial client order tracking inquiries with zero human touch.",
      "Reduced support ticket queues significantly, freeing reps for complex tasks.",
      "Delivered reliable, verified, non-hallucinated product support responses."
    ]
  }
];

export const blogArticles: BlogArticle[] = [
  {
    slug: "future-of-business-ai-agents",
    title: "The Shift from Chatbots to Autonomous AI Agents",
    category: "AI",
    date: "August 28, 2026",
    readTime: "5 min read",
    summary: "Why simple rule-based chat modules are fading, and how cognitive, tool-using agents are changing operations.",
    content: [
      "For years, customer-facing chat systems were frustrating. They relied on rigid decision trees, and if a customer deviated slightly from the script, the bot would loop endlessly or fail.",
      "Today, we are witnessing a massive technical shift. Modern Large Language Models (LLMs) have enabled the rise of AI Agents—systems that do not just converse, but reason, plan, and take actions.",
      "An AI Agent operates with a cognitive loop. When given a complex goal like 'Help this customer change their shipping address', the agent doesn't just display a link. It breaks down the task: (1) Verify customer identity, (2) Look up the order in the CRM database, (3) Confirm if the order has left the warehouse, (4) Call the shipping API to update the address, and (5) Confirm the update with the user.",
      "By integrating tools, APIs, and enterprise databases directly with LLM reasoning, businesses can automate complex workflows safely. At Digeetech, we design secure agents that focus purely on business utility, reducing operational drag while ensuring strict compliance guidelines."
    ],
    author: "Digeetech Editorial Team"
  },
  {
    slug: "building-scalable-saas-architecture",
    title: "Key Architecture Pillars for SaaS MVPs in 2026",
    category: "SaaS",
    date: "August 15, 2026",
    readTime: "6 min read",
    summary: "A practical guide to structuring databases, handling multi-tenancy, and implementing secure authentication.",
    content: [
      "Launching a Software-as-a-Service (SaaS) product is an exciting venture, but a poorly engineered foundation can doom a platform before it gains traction.",
      "When building a SaaS MVP, developers often focus entirely on user-facing features, leaving core architectural items like tenant isolation, secure authentication, and billing webhooks as afterthoughts.",
      "The first pillar of SaaS design is strict multi-tenancy. You must decide whether to use separate database instances per customer (ideal for enterprise compliance) or a shared database with row-level tenant security keys (ideal for cost efficiency and simple operations). For most MVPs, a shared database with strict software-level query filters provides the best balance.",
      "The second pillar is a highly secure, scalable authentication framework. Role-Based Access Control (RBAC) must be defined from day one to manage permissions for Workspace Admins, Managers, and Regular Users without code duplication.",
      "Finally, design your billing integration with webhooks in mind. Never rely solely on client-side state to unlock features; let secure backend serverless endpoints process Stripe events to safely toggle tenant status."
    ],
    author: "Digeetech Engineering"
  },
  {
    slug: "importance-of-technical-seo",
    title: "Why Site Speed and Technical SEO Matter More Than Ever",
    category: "SEO",
    date: "August 04, 2026",
    readTime: "4 min read",
    summary: "How search engines evaluate performance, and why slow load times cost you organic business rankings.",
    content: [
      "Many business owners believe SEO is strictly about writing keyword-filled blog posts and acquiring backlink lists.",
      "However, search engine algorithms have evolved. Today, user experience indicators—specifically Core Web Vitals—play a critical role in determining search engine results page rankings.",
      "If your site takes more than 3 seconds to load, bounce rates skyrocket. Search engines recognize that users are leaving your page frustrated and will lower your ranking accordingly.",
      "Technical SEO starts with code optimization: using semantic HTML tags, compressing images, deferring non-essential scripts, utilizing browser caching, and implementing structured Schema.org JSON-LD data. By ensuring search engine bots can easily crawl and index your clean React or Next.js code, you lay the foundation for organic business visibility."
    ],
    author: "Digeetech SEO Specialist"
  }
];

export const solutionsData: SolutionPackage[] = [
  {
    id: "startups",
    title: "Startup Acceleration Package",
    tagline: "From Visual Concept to Live Product",
    description: "Everything a new startup needs to establish market credibility, launch their product, and start acquiring customers.",
    targetAudience: "Early-stage founders, bootstrapped teams, and seed-funded ventures.",
    benefits: [
      "High-converting corporate web presence",
      "Visual brand book and custom vector logo",
      "Custom SaaS MVP or app prototype framework",
      "Ready-to-run digital lead capture forms"
    ],
    servicesIncluded: ["Website Development", "Branding", "UI/UX Design", "SaaS Development"],
    ctaText: "Launch Your Startup"
  },
  {
    id: "business-growth",
    title: "Growing Business Suite",
    tagline: "Unify Systems, Automate Tasks, and Scale Operations",
    description: "Designed for mid-sized operations looking to eliminate manual work, streamline lead workflows, and build custom administration portals.",
    targetAudience: "Established services agencies, local suppliers, and expanding businesses.",
    benefits: [
      "Centralized customized CRM with visual deal boards",
      "Lightweight, secure client or employee portals",
      "Background automation scripts connecting current tools",
      "Custom analytics charts for tracking operational margins"
    ],
    servicesIncluded: ["CRM Solutions", "Management Portals", "Automation Solutions", "Digital Marketing"],
    ctaText: "Optimize Your Business"
  },
  {
    id: "ai-enterprise",
    title: "AI-First Operations",
    tagline: "Transform Operations with Autonomous Workflows",
    description: "For forward-thinking organizations looking to integrate custom language models and self-directed agents directly into their daily work systems.",
    targetAudience: "Enterprise businesses, high-volume support centers, and tech-forward organizations.",
    benefits: [
      "Cognitive customer support agents with RAG databases",
      "Custom generative AI tools for document synthesis",
      "Automatic data routing pipelines with LLM classifiers",
      "Strict data compliance policies with enterprise safety grids"
    ],
    servicesIncluded: ["AI Agents", "AI Tools", "Automation Solutions"],
    ctaText: "Integrate AI Solutions"
  }
];
