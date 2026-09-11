export interface ServiceDetails {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  whoIsItFor?: string[];
  benefits?: string[];
  startingPrice: string;
  pricingNote?: string;
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
  startingPrice: string;
  benefits: string[];
  servicesIncluded: string[];
  ctaText: string;
}

export const servicesData: Record<string, ServiceDetails> = {
  "web-development": {
    slug: "web-development",
    title: "Website Development",
    category: "WEB & E-COMMERCE",
    tagline: "High-Performance Corporate & Business Websites Built for Singapore Companies",
    description: "We develop high-performance, mobile-responsive, and SEO-optimized websites that establish market authority and turn visitors into qualified leads. From corporate brand showcases to high-converting landing pages and dynamic customer portals, our web solutions are fast, secure, and easy to manage.",
    problem: "Many business websites in Singapore suffer from outdated templates, sluggish load times, clunky mobile experiences, and zero SEO visibility, causing potential clients to bounce directly to competitors.",
    solution: "Digee Tech engineers custom, ultra-fast web platforms using React, Next.js, and modern headless architectures. Every website features crisp typography, intuitive navigation, fast Singapore and Asia-Pacific CDN routing, and built-in lead capture flows.",
    whoIsItFor: [
      "Singapore SMEs looking to upgrade their corporate web presence",
      "Early-stage startups launching new products and needing high conversion",
      "Professional service firms (legal, accounting, consultancy, medical)",
      "Retailers and local brands expanding into modern digital channels"
    ],
    benefits: [
      "Sub-second load times with Core Web Vitals optimization",
      "100% mobile-responsive layout across all device screens",
      "Built-in technical SEO with structured Schema markup",
      "Intuitive CMS for effortless content updates without coding"
    ],
    startingPrice: "Starting from S$150+",
    pricingNote: "Starter websites from S$150+, Business packages from S$300+, Custom web apps from S$800+. Final pricing depends on project scope, features, and integrations.",
    capabilities: [
      "Corporate & Business Websites",
      "High-Converting Landing Pages",
      "E-commerce Storefronts & Shopify / WooCommerce Integration",
      "Customer & Client Self-Service Portals",
      "Core Web Vitals & Speed Optimization",
      "CMS & Headless Content Management",
      "Technical SEO & Schema.org Integration",
      "API & CRM Lead Synchronization"
    ],
    process: [
      { step: "01", title: "Discovery & Blueprint", description: "Analyzing brand positioning, target audience, layout architecture, and conversion goals." },
      { step: "02", title: "UI/UX & Prototyping", description: "Crafting modern, accessible wireframes and desktop/mobile interface layouts." },
      { step: "03", title: "Clean Engineering", description: "Building with type-safe, lightweight frontend code and scalable component libraries." },
      { step: "04", title: "SEO, Testing & Launch", description: "Rigorous cross-browser QA, mobile responsiveness audit, SEO setup, and live deployment." }
    ],
    technology: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vite", "Node.js", "GraphQL", "Headless CMS"],
    faqs: [
      { question: "Do you build custom websites or use generic templates?", answer: "We craft custom, modern web designs tailored specifically to your company's branding and business goals. We avoid bloated, slow off-the-shelf templates." },
      { question: "Will my website be mobile-friendly and optimized for Google Singapore?", answer: "Yes, 100%. Every site is engineered mobile-first and includes technical SEO best practices, meta tags, and local search optimization." },
      { question: "Can I easily update text, images, and blog posts myself?", answer: "Yes. We integrate user-friendly content management systems so your team can easily update content, publish articles, and edit copy without writing code." }
    ]
  },
  "app-development": {
    slug: "app-development",
    title: "Mobile App Development",
    category: "MOBILE & DIGITAL PRODUCTS",
    tagline: "Intuitive iOS & Android Mobile Applications Built for Engagement",
    description: "We build intuitive, high-performance mobile applications that deliver smooth user experiences. From native iOS/Android development to versatile cross-platform solutions (React Native & Flutter), Digee Tech brings your mobile concept to life efficiently.",
    problem: "Poorly developed mobile apps crash frequently, drain battery life, and feature sluggish user interfaces—resulting in immediate uninstalls and lost business opportunities.",
    solution: "Our engineering team designs lightweight, highly responsive mobile apps using modern architectures. We prioritize fluid micro-interactions, robust offline caching, secure authentication, and seamless backend API synchronization.",
    whoIsItFor: [
      "Startups building MVP mobile applications for iOS and Android",
      "Businesses wanting a dedicated mobile booking or customer loyalty app",
      "Enterprises requiring on-the-ground staff or field management tools",
      "E-commerce brands seeking higher repeat order rates via mobile"
    ],
    benefits: [
      "Dual-platform launch (iOS & Android) with unified codebase",
      "Fast, fluid native-feel animations and responsive gesture support",
      "Offline-first data caching and real-time push notification pipelines",
      "End-to-end Apple App Store and Google Play Store publishing support"
    ],
    startingPrice: "Starting from S$900+",
    pricingNote: "MVP apps from S$900+, Full-featured cross-platform apps from S$1,500+. Final pricing depends on screen count, backend complexity, and API integrations.",
    capabilities: [
      "Native iOS Development (Swift)",
      "Native Android Development (Kotlin)",
      "Cross-Platform Apps (React Native & Flutter)",
      "Secure RESTful & GraphQL API Gateways",
      "Real-Time Data Syncing & Push Notifications",
      "Biometric Login & Social Authentication",
      "In-App Purchases & Payment Gateways",
      "App Store & Google Play Store Publishing"
    ],
    process: [
      { step: "01", title: "User Journey Mapping", description: "Defining touch targets, screen navigation flows, and user onboarding steps." },
      { step: "02", title: "Interactive UI/UX", description: "Designing high-fidelity, clickable mobile prototypes for user testing." },
      { step: "03", title: "App Engineering", description: "Developing frontend screens and connecting to secure cloud API endpoints." },
      { step: "04", title: "Store Submission", description: "Device QA testing, store asset preparation, and handling the app approval process." }
    ],
    technology: ["React Native", "Flutter", "TypeScript", "Swift", "Kotlin", "Firebase", "App Store Connect", "Play Console"],
    faqs: [
      { question: "Should we build cross-platform or native apps?", answer: "For most business applications and MVPs, cross-platform frameworks like React Native or Flutter provide near-native performance while slashing development time and cost in half by maintaining a single codebase for both iOS and Android." },
      { question: "Do you assist with getting the app approved on the App Store?", answer: "Yes, we handle the complete deployment, metadata submission, privacy compliance, and store approval process for both Apple and Google." }
    ]
  },
  "ai-agents": {
    slug: "ai-agents",
    title: "AI Agents & Autonomous Solutions",
    category: "AI & AUTOMATION",
    tagline: "Cognitive AI Agents That Automate Complex Operational Workflows",
    description: "Move beyond basic chatbots. Digee Tech develops autonomous, task-oriented AI agents capable of reasoning, querying internal databases, triggering external APIs, and executing multi-step business operations 24/7 without manual intervention.",
    problem: "Traditional rule-based chatbots frustrate users with canned responses, while employees waste hundreds of hours manually handling routine inquiries, sorting data, and transferring information between software systems.",
    solution: "We build custom cognitive AI agents powered by state-of-the-art LLMs (Gemini, GPT). Our agents understand nuanced context, retrieve accurate data from your internal systems using RAG, and safely trigger real actions through API tool-calling.",
    whoIsItFor: [
      "Customer support teams needing 24/7 intelligent inquiry resolution",
      "Sales teams wanting automated lead qualification and CRM logging",
      "Operations teams handling repetitive document parsing and data entry",
      "Professional service firms seeking internal knowledge search assistants"
    ],
    benefits: [
      "24/7 instant response with zero customer queue times",
      "Accurate answers grounded in your business data (RAG architecture)",
      "Direct action execution: booking meetings, updating CRM records, looking up invoices",
      "Enterprise security guardrails ensuring your private data remains protected"
    ],
    startingPrice: "Starting from S$250+",
    pricingNote: "Smart chatbots from S$250+, Autonomous task agents from S$400+. Final pricing depends on tool integrations, database connections, and custom reasoning workflows.",
    capabilities: [
      "Autonomous 24/7 Customer Support Agents",
      "Intelligent Lead Qualification & Booking Agents",
      "Internal Knowledge Retrieval (RAG) Assistants",
      "Automated Document & Invoice Processing Agents",
      "Multi-Agent Collaborative Workflows",
      "Dynamic Tool-Use & Function Calling Integrations",
      "Custom Safety Guardrails & Compliance Filters"
    ],
    process: [
      { step: "01", title: "Knowledge & Scope Audit", description: "Mapping knowledge sources, FAQs, API endpoints, and operational boundary rules." },
      { step: "02", title: "Agent System Design", description: "Engineering prompt reasoning loops, context indexing, and function calling tools." },
      { step: "03", title: "API & System Integration", description: "Connecting the agent directly to your CRM, database, email, or messaging channels." },
      { step: "04", title: "Testing & Sandboxing", description: "Running edge-case conversational simulations and fine-tuning accuracy guardrails." }
    ],
    technology: ["@google/genai", "Gemini 2.5", "LangChain", "Node.js", "Python", "Vector Databases", "REST APIs", "Webhooks"],
    faqs: [
      { question: "How does an AI Agent differ from a simple chatbot?", answer: "A chatbot only provides pre-scripted text responses. An AI Agent has cognitive reasoning ability: it can understand complex user intent, fetch live records from your databases, decide which tools to call, and execute actions such as creating a booking or updating an invoice." },
      { question: "Is our proprietary business data secure?", answer: "Yes, absolutely. We use enterprise cloud endpoints with strict privacy policies. Your proprietary documents and customer interactions are never used to train public AI models." }
    ]
  },
  "ai-tools": {
    slug: "ai-tools",
    title: "AI Tools & Custom Utilities",
    category: "AI & AUTOMATION",
    tagline: "Tailor-Made Generative AI Utilities Designed for Your Business",
    description: "Accelerate your team's productivity by integrating custom generative AI tools directly into your daily operations. From smart report generators to automated RFP parsers and content engines, we turn AI into a concrete competitive advantage.",
    problem: "Generic public AI tools lack understanding of your unique company terminology, proprietary data formats, and internal templates, leading to manual reformatting overhead.",
    solution: "We build secure, custom web dashboards and internal AI tools calibrated with your company's guidelines, data templates, and specific output requirements.",
    whoIsItFor: [
      "Teams dealing with high-volume document reviews and summarization",
      "Marketing and sales departments generating personalized proposals",
      "Research and technical teams needing semantic search across vast files",
      "Managers requiring automated executive summaries from complex data"
    ],
    benefits: [
      "Save 10+ hours per employee every week on manual drafting and parsing",
      "Consistent output formatted exactly to your corporate templates",
      "Secure internal web interface accessible only to authorized staff",
      "Instant synthesis of multi-page PDFs, spreadsheets, and meeting transcripts"
    ],
    startingPrice: "Starting from S$350+",
    pricingNote: "Single-purpose AI tools from S$350+, Multi-feature AI dashboards from S$650+. Final pricing depends on data complexity and user controls.",
    capabilities: [
      "Custom Document & PDF Parsers",
      "Automated Proposal & Report Generators",
      "Brand-Aligned Content & Copywriting Engines",
      "Semantic Search Across Corporate Knowledge Bases",
      "Meeting Transcript Synthesis & Action Item Extractors",
      "Smart Data Categorization & Tagging Pipelines"
    ],
    process: [
      { step: "01", title: "Task Analysis", description: "Identifying high-friction manual tasks that can be automated with LLMs." },
      { step: "02", title: "Prompt & Format Tuning", description: "Crafting structured prompt architectures and output schema validators." },
      { step: "03", title: "Interface Development", description: "Creating a clean, intuitive web interface for your team to upload and export data." }
    ],
    technology: ["@google/genai", "Gemini Flash", "React", "TypeScript", "Node.js", "FastAPI", "Cloud Run"],
    faqs: [
      { question: "Can these tools process large multi-page PDFs and spreadsheets?", answer: "Yes. Leveraging modern Gemini models with massive context windows, we can analyze, synthesize, and extract structured data from hundreds of pages of documentation in seconds." }
    ]
  },
  "saas": {
    slug: "saas",
    title: "SaaS Product Development",
    category: "SOFTWARE DEVELOPMENT",
    tagline: "Scalable Multi-Tenant Software-as-a-Service Platforms",
    description: "We partner with founders and forward-thinking businesses to engineer robust, scalable Software-as-a-Service (SaaS) products. From MVP scoping to production-grade multi-tenant architecture, we build platforms that support high user volume securely.",
    problem: "Building a SaaS product requires intricate architectural decisions: tenant data isolation, secure authentication, recurring billing, role permissions, and API scalability. Poor early architecture leads to massive rewrite costs later.",
    solution: "We build enterprise-ready SaaS backends and intuitive frontends. Our standard architecture includes strict tenant isolation, Stripe billing integration, granular RBAC permissions, and comprehensive admin management dashboards.",
    whoIsItFor: [
      "Tech founders launching subscription software products (B2B / B2C)",
      "Established businesses turning internal tools into commercial SaaS",
      "Companies modernizing legacy software into cloud-based platforms"
    ],
    benefits: [
      "Rapid time-to-market with production-ready SaaS foundations",
      "Automated subscription management and recurring billing webhooks",
      "Role-based workspace isolation and team member invitation flows",
      "Cloud-native deployment ready to scale automatically as traffic grows"
    ],
    startingPrice: "Starting from S$1,000+",
    pricingNote: "SaaS MVPs from S$1,000+, Full-scale enterprise platforms from S$2,500+. Custom packages available for Singapore startups and SMEs.",
    capabilities: [
      "SaaS MVP Scoping & Core Feature Engineering",
      "Multi-Tenant Database & Workspace Isolation",
      "Stripe Subscription & Recurring Billing Integrations",
      "Role-Based Access Control (RBAC) & Team Management",
      "Executive Admin Dashboards & Analytics",
      "Public Developer APIs & Webhook Subscriptions",
      "Automated Cloud Backups & CI/CD Pipelines"
    ],
    process: [
      { step: "01", title: "Product Blueprint", description: "Defining data schemas, tenant routing, pricing tiers, and MVP boundaries." },
      { step: "02", title: "Dashboard UI/UX", description: "Designing an intuitive, responsive management interface for admins and users." },
      { step: "03", title: "Full-Stack Development", description: "Building secure APIs, auth flows, billing webhooks, and responsive frontend screens." },
      { step: "04", title: "Cloud Deployment", description: "Deploying to secure, autoscaling containerized environments with active monitoring." }
    ],
    technology: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Tailwind CSS", "Stripe API", "Docker"],
    faqs: [
      { question: "How long does it take to launch a SaaS MVP?", answer: "Typically, a functional SaaS MVP takes 4 to 8 weeks depending on the complexity of the core features, billing logic, and third-party integrations." }
    ]
  },
  "crm": {
    slug: "crm",
    title: "CRM Solutions & Business Portals",
    category: "BUSINESS SYSTEMS",
    tagline: "Custom Customer Relationship Management Systems You Fully Own",
    description: "Digee Tech engineers custom CRM solutions designed specifically around your sales workflows, pipeline stages, and client interactions. Stop paying steep monthly per-user licensing fees for off-the-shelf software filled with features you never use.",
    problem: "Off-the-shelf CRM platforms are expensive, complex to configure, and fail to integrate cleanly with your existing website, accounting, and marketing channels.",
    solution: "We build lean, fast, and custom CRM systems tailored to your exact business process. Your team gets a clean, intuitive interface to manage leads, track client communications, view deal stages, and generate sales reports.",
    whoIsItFor: [
      "Singapore SMEs with unique sales and service delivery pipelines",
      "Agencies, consultancies, and B2B companies tracking high-value deals",
      "Growing teams wanting to eliminate expensive per-seat software licenses",
      "Businesses needing custom client portals connected to their sales data"
    ],
    benefits: [
      "Zero per-user monthly subscription fees—you own the system 100%",
      "Custom visual kanban pipelines matching your actual sales stages",
      "Automatic lead capture from your website and social campaigns",
      "Integrated communication logs, follow-up reminders, and reporting charts"
    ],
    startingPrice: "Starting from S$700+",
    pricingNote: "Custom CRM systems from S$700+, Enterprise ERP modules from S$1,200+. Final pricing depends on data fields, automation rules, and portal features.",
    capabilities: [
      "Custom Sales Pipelines & Visual Deal Kanban Boards",
      "Automated Lead Ingestion & Distribution",
      "Customer Activity Timeline & Interaction Tracking",
      "Automated Follow-up Tasks & Notification Triggers",
      "Granular User Permissions & Role Management",
      "Custom Analytics Dashboards & Revenue Forecasting",
      "WhatsApp, Email & Phone Integration"
    ],
    process: [
      { step: "01", title: "Pipeline Audit", description: "Mapping your stages of lead capture, qualification, proposal, and deal closing." },
      { step: "02", title: "Database & Logic Design", description: "Structuring custom data models for contacts, deals, activities, and tasks." },
      { step: "03", title: "Interface & Automation", description: "Building responsive dashboards, drag-and-drop boards, and background notifications." }
    ],
    technology: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Firebase", "Recharts"],
    faqs: [
      { question: "Why choose a custom CRM over HubSpot or Salesforce?", answer: "A custom CRM is built around your exact operations, does not charge monthly per-user licensing fees, integrates seamlessly with your proprietary tools, and remains your proprietary intellectual property asset." }
    ]
  },
  "erp": {
    slug: "erp",
    title: "ERP & Integrated Operations",
    category: "BUSINESS SYSTEMS",
    tagline: "Centralized Enterprise Resource Planning for Growing Companies",
    description: "Unify your operations with a tailored ERP that connects finance, inventory, human resources, procurement, and client management into a single, cohesive source of truth.",
    problem: "Relying on scattered spreadsheets and disconnected apps leads to double-data entry, inventory mistakes, operational delays, and a lack of real-time business visibility.",
    solution: "We build integrated, modular ERP systems that eliminate departmental silos. Connect your order pipeline directly to inventory, billing, and staff rosters with instant synchronization.",
    whoIsItFor: [
      "Distributors, wholesalers, and retail businesses managing inventory",
      "Service and logistics companies coordinating staff rosters and jobs",
      "SMEs outgrowing basic accounting spreadsheets and isolated tools"
    ],
    benefits: [
      "Single source of operational truth across all departments",
      "Real-time inventory tracking and automated reorder alerts",
      "Streamlined invoicing, payment tracking, and financial ledgers",
      "Complete operational transparency with customizable executive reports"
    ],
    startingPrice: "Starting from S$1,200+",
    pricingNote: "Modular ERP solutions starting from S$1,200+. Scope-based pricing tailored for Singapore SMEs.",
    capabilities: [
      "Integrated Finance, Invoicing & Ledger Management",
      "Inventory Tracking & Multi-Location Stock Management",
      "Staff Scheduling, Attendance & Payroll Portals",
      "Purchase Orders & Vendor Management",
      "Executive KPI Dashboards & Real-Time Reports",
      "Role-Based Access Control & Activity Audit Logs"
    ],
    process: [
      { step: "01", title: "Workflow Audit", description: "Mapping data movement across finance, inventory, and operations." },
      { step: "02", title: "Architecture Blueprint", description: "Designing database tables and module integrations for smooth data flow." },
      { step: "03", title: "Phased Deployment", description: "Rolling out modules incrementally to ensure uninterrupted daily business operations." }
    ],
    technology: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker"],
    faqs: [
      { question: "Can we migrate our existing spreadsheet data into the new ERP?", answer: "Yes. We engineer data migration scripts to cleanly validate, format, and import your historical records into the new system." }
    ]
  },
  "management-portals": {
    slug: "management-portals",
    title: "Management & Customer Portals",
    category: "BUSINESS SYSTEMS",
    tagline: "Secure Self-Service Portals for Clients, Staff, and Partners",
    description: "Create secure web portals that facilitate self-service, seamless file transfers, project tracking, and communication for your clients, employees, students, or vendors.",
    problem: "Managing client requests and document sharing over scattered email threads is messy, insecure, and difficult to manage as your business scales.",
    solution: "We build modern, role-secured portals that centralize communication, document storage, appointment scheduling, and progress tracking with enterprise-level encryption.",
    whoIsItFor: [
      "Professional service providers needing secure client document exchange",
      "Companies wanting an employee onboarding and internal knowledge portal",
      "Training institutes managing course materials and student submissions",
      "Vendors and partners tracking orders and fulfillment status"
    ],
    benefits: [
      "24/7 client self-service reduces admin inquiries by up to 60%",
      "Encrypted, organized document repository with instant access controls",
      "Branded client experience that reinforces company professionalism",
      "Automated email notifications on status updates and new uploads"
    ],
    startingPrice: "Starting from S$600+",
    pricingNote: "Standard client portals from S$600+, Complex multi-role portals from S$1,000+. Final pricing depends on permissions and feature depth.",
    capabilities: [
      "Client Self-Service & Billing Dashboards",
      "Employee Hubs & Internal Knowledge Portals",
      "Student & Training Management Portals",
      "Secure Document Vault with Role-Based Access",
      "Project Milestones & Task Status Tracking",
      "Automated Status Notifications & Activity Feeds"
    ],
    process: [
      { step: "01", title: "Role Definition", description: "Defining permissions for administrators, staff, clients, and external guests." },
      { step: "02", title: "UX/UI Design", description: "Creating clean, intuitive dashboards optimized for easy file sharing and navigation." },
      { step: "03", title: "Security Hardening", description: "Implementing token authentication, session timeouts, and encrypted cloud storage." }
    ],
    technology: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Firebase Storage", "JWT Auth"],
    faqs: [
      { question: "How do you ensure files uploaded to the portal remain secure?", answer: "All uploads are stored in encrypted cloud storage with time-limited signed access URLs, ensuring only authorized authenticated users can view confidential documents." }
    ]
  },
  "automation": {
    slug: "automation",
    title: "Business Process & API Automation",
    category: "AI & AUTOMATION",
    tagline: "Connect Your Apps & Eliminate Repetitive Manual Workflows",
    description: "Connect your siloed business tools and eliminate tedious manual data entry. Digee Tech develops custom background scripts, API integrations, and webhook pipelines that keep your data moving seamlessly.",
    problem: "Employees spend valuable hours copying and pasting data between forms, spreadsheets, emails, and CRM systems, leading to costly errors and delayed follow-ups.",
    solution: "We build reliable, automated data bridges that sync information across your platforms in real time. From instant invoice generation to lead routing and inventory sync, we let software handle the repetitive tasks.",
    whoIsItFor: [
      "Businesses managing multiple disconnected software tools",
      "E-commerce stores needing automated order, invoice, and shipping sync",
      "Sales teams wanting instant WhatsApp/Email alerts for new incoming leads",
      "Operations teams requiring automated daily/weekly data reports"
    ],
    benefits: [
      "Eliminate human data entry errors and manual formatting mistakes",
      "Instant real-time data sync across all your tools and databases",
      "Free up your team to focus on revenue-generating business activities",
      "Reliable background execution with automatic error alerts"
    ],
    startingPrice: "Starting from S$400+",
    pricingNote: "Single-workflow automations from S$400+, Multi-system enterprise integrations from S$750+. Scope-based transparent pricing.",
    capabilities: [
      "Custom REST, GraphQL & Webhook API Integrations",
      "Automated Invoicing & PDF Generation Workflows",
      "Multi-Platform Data Sync (E-commerce to ERP, Ads to CRM)",
      "Automated Email & WhatsApp Notification Triggers",
      "Background Cron Jobs & Scheduled Data Scrapers",
      "Custom Zapier / Make / Cloud Function Integration"
    ],
    process: [
      { step: "01", title: "Workflow Mapping", description: "Identifying manual data touchpoints and mapping trigger-action data flows." },
      { step: "02", title: "Integration Architecture", description: "Designing secure API handlers, retry logic, and error-handling safeguards." },
      { step: "03", title: "Deployment & Monitoring", description: "Deploying lightweight cloud workers with real-time health logging." }
    ],
    technology: ["Node.js", "Express", "Python", "Cloud Functions", "REST APIs", "Webhooks", "Cron"],
    faqs: [
      { question: "Can you automate tools that don't have built-in Zapier integrations?", answer: "Yes. We build custom API bridges and webhooks directly between software platforms, even when standard third-party connectors are unavailable." }
    ]
  },
  "digital-marketing": {
    slug: "digital-marketing",
    title: "Digital Marketing & Growth",
    category: "DIGITAL GROWTH",
    tagline: "Result-Driven Digital Marketing Built for Singapore Businesses",
    description: "Grow your online presence and attract qualified business leads. Digee Tech designs data-backed digital marketing strategies across search engines, social media, and paid ad channels to drive tangible customer acquisition.",
    problem: "Most marketing agencies focus on vanity metrics like impressions and clicks rather than actual cost-per-lead, conversion rates, and revenue pipeline growth.",
    solution: "We align all marketing activities directly with your sales targets. We build high-converting landing pages, design compelling creative assets, manage targeted ad campaigns, and deliver transparent reporting.",
    whoIsItFor: [
      "Singapore SMEs looking for consistent, qualified inbound leads",
      "Startups wanting to build initial traction and acquire early users",
      "E-commerce brands seeking higher return on ad spend (ROAS)",
      "Local service businesses looking to dominate their local market"
    ],
    benefits: [
      "Transparent reporting focused on leads, conversions, and acquisition cost",
      "Cohesive multi-channel strategy across Google, Meta, and LinkedIn",
      "High-converting creative design and persuasive sales copywriting",
      "Continuous A/B testing to maximize every dollar of your ad budget"
    ],
    startingPrice: "Starting from S$200/month",
    pricingNote: "Growth packages starting from S$200/month. Custom management tiers for startups, SMEs, and international campaigns.",
    capabilities: [
      "Multi-Channel Digital Growth Strategy",
      "Lead Generation & High-Converting Sales Funnels",
      "Search Engine Marketing (Google Search & Display Ads)",
      "Social Media Advertising (Meta, Instagram, LinkedIn)",
      "Content Strategy & Social Media Creatives",
      "Conversion Rate Optimization (CRO) & A/B Testing",
      "Comprehensive Analytics & Lead Tracking"
    ],
    process: [
      { step: "01", title: "Audience & Market Research", description: "Analyzing target demographics, competitor positioning, and search intent." },
      { step: "02", title: "Funnel & Creative Setup", description: "Creating dedicated landing pages, compelling ad copy, and high-impact visuals." },
      { step: "03", title: "Campaign Optimization", description: "Monitoring performance daily, refining targeting, and scaling winning ad sets." }
    ],
    technology: ["Google Analytics 4", "Meta Pixel & CAPI", "Google Tag Manager", "Google Ads", "LinkedIn Insight"],
    faqs: [
      { question: "What budget do I need to start digital advertising?", answer: "We recommend a minimum monthly ad spend of S$300 to S$600 to gather statistically meaningful performance data, which we optimize and scale as campaigns prove profitable." }
    ]
  },
  "seo": {
    slug: "seo",
    title: "SEO Solutions & Search Optimization",
    category: "DIGITAL GROWTH",
    tagline: "Technical & Content SEO That Ranks Your Business on Google",
    description: "Rank for search terms that genuinely drive business revenue. We conduct deep technical audits, build keyword topic clusters, optimize Core Web Vitals, and implement structured data to earn long-term organic traffic.",
    problem: "Relying solely on paid ads means traffic stops the second you pause your spend, while outdated spammy SEO tactics risk Google search penalties.",
    solution: "We implement modern, user-first technical SEO: lightning-fast load speeds, semantic HTML structure, comprehensive schema markup, and high-quality local Singapore keyword optimization.",
    whoIsItFor: [
      "Singapore businesses wanting sustainable organic search traffic",
      "Companies launching new websites that need clean indexation",
      "Local service providers targeting Singapore geographical queries",
      "E-commerce stores wanting to rank product category pages"
    ],
    benefits: [
      "Long-term organic visibility that builds compounding business value",
      "Pristine technical health and Core Web Vitals performance scores",
      "Targeting high-intent search queries that convert into paying clients",
      "Transparent monthly keyword ranking and organic traffic reports"
    ],
    startingPrice: "Starting from S$200/month",
    pricingNote: "SEO audit packages from S$200 one-off, Ongoing monthly ranking packages from S$200/month. Custom scope for regional search.",
    capabilities: [
      "Comprehensive Technical SEO Audits",
      "Keyword Research & Search Intent Mapping",
      "On-Page Optimization & Semantic Meta Architectures",
      "Local Singapore SEO & Google Business Profile Setup",
      "Structured Schema.org & JSON-LD Markup",
      "Core Web Vitals & Page Speed Optimization",
      "Monthly Ranking & Organic Performance Reports"
    ],
    process: [
      { step: "01", title: "Technical Audit", description: "Crawling the site to fix broken links, indexation blockers, and speed bottlenecks." },
      { step: "02", title: "Keyword Strategy", description: "Identifying high-intent search queries with realistic ranking potential." },
      { step: "03", title: "On-Page & Schema Optimization", description: "Refining title tags, headings, content structure, and rich snippet schemas." }
    ],
    technology: ["Google Search Console", "Google Analytics 4", "SEMrush", "Screaming Frog", "Schema.org"],
    faqs: [
      { question: "How long does it take to see SEO results?", answer: "Technical fixes and indexing improvements typically take effect within 2 to 4 weeks. Meaningful organic traffic growth and top-page ranking for competitive terms generally takes 3 to 6 months of consistent optimization." }
    ]
  },
  "meta-ads": {
    slug: "meta-ads",
    title: "Meta & Social Advertising",
    category: "DIGITAL GROWTH",
    tagline: "High-Performance Paid Ads on Facebook & Instagram",
    description: "Reach your target audience where they spend their time. We create and manage high-converting Meta advertising campaigns focused on maximizing Return on Ad Spend (ROAS) and driving qualified inquiries.",
    problem: "Simply clicking 'Boost Post' wastes budget on low-intent clicks, while complex ad setups often fail due to improper pixel tracking, generic creative, and poor audience targeting.",
    solution: "We build structured Meta ad funnels: scroll-stopping visual creative, persuasive sales copy, proper Conversions API (CAPI) tracking, and structured A/B testing of audiences.",
    whoIsItFor: [
      "B2C and B2B businesses wanting predictable inbound inquiries",
      "E-commerce stores looking to scale product sales and retarget cart abandoners",
      "Service businesses launching new promotional offers"
    ],
    benefits: [
      "Laser-targeted audience segmentation by interest, industry, and behavior",
      "High-converting creative variations crafted specifically for mobile feeds",
      "Accurate server-side tracking with Meta Conversions API (CAPI)",
      "Structured retargeting funnels that convert warm website visitors"
    ],
    startingPrice: "Starting from S$250/month",
    pricingNote: "Meta ads campaign management from S$250/month. Ad spend paid directly to Meta.",
    capabilities: [
      "Campaign Setup & Account Structure Optimization",
      "Scroll-Stopping Visual Creatives & Motion Graphics",
      "Persuasive Direct-Response Ad Copywriting",
      "Meta Pixel & Conversions API (CAPI) Integration",
      "Custom Audience & Lookalike Audience Building",
      "Retargeting Funnel Architecture",
      "Weekly Performance Analytics & ROAS Tracking"
    ],
    process: [
      { step: "01", title: "Audience Profiling", description: "Defining cold prospecting, warm engagement, and custom customer lookalike lists." },
      { step: "02", title: "Creative Matrix", description: "Designing multiple hook-angle visuals and direct-response copy variations." },
      { step: "03", title: "Optimization & Scaling", description: "Scaling top-performing ad sets while reallocating budget away from underperformers." }
    ],
    technology: ["Meta Ads Manager", "Meta Conversions API", "Figma", "Google Tag Manager"],
    faqs: [
      { question: "Do you create the ad visuals and copywriting?", answer: "Yes. Our team handles everything from creative graphic design and motion banners to sales copywriting and audience targeting setup." }
    ]
  },
  "graphic-design": {
    slug: "graphic-design",
    title: "Graphic Design & Marketing Creatives",
    category: "CREATIVE & DESIGN",
    tagline: "Professional Visual Design Assets for Digital & Print",
    description: "Elevate your brand with clean, modern graphic design. We create social media creatives, brochures, corporate presentations, marketing collateral, and digital banners that capture attention and communicate quality.",
    problem: "Inconsistent graphics and amateurish social banners undermine brand credibility, making businesses look untrustworthy to potential clients.",
    solution: "Our design studio creates cohesive, beautifully balanced visual assets with crisp typography, thoughtful color harmony, and professional layout grids.",
    whoIsItFor: [
      "Businesses needing consistent monthly social media and ad designs",
      "Startups and executives pitching investors with pitch decks",
      "Companies preparing corporate brochures, flyers, or event banners"
    ],
    benefits: [
      "Consistent, polished visual presentation across all brand touchpoints",
      "Fast turnaround times with full vector and editable source files included",
      "Tailored formats optimized for digital platforms, mobile feeds, and print"
    ],
    startingPrice: "Starting from S$50+",
    pricingNote: "Single graphics / pitch deck slides from S$50+, Monthly design packs from S$200+. Transparent scope-based pricing.",
    capabilities: [
      "Social Media Ad Assets & Banner Packs",
      "Executive Pitch Decks & Corporate Presentations",
      "Brochures, Flyers & Company Profiles",
      "Custom Vector Illustrations & Infographics",
      "Website & Digital Product Visual Assets",
      "Print-Ready Marketing Materials"
    ],
    process: [
      { step: "01", title: "Brief & Moodboard", description: "Reviewing your brand guidelines, required dimensions, and visual style preferences." },
      { step: "02", title: "Design Drafting", description: "Creating balanced layout concepts with custom typography and imagery." },
      { step: "03", title: "Delivery & Revisions", description: "Refining based on your feedback and delivering export-ready assets with source files." }
    ],
    technology: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Canva Pro"],
    faqs: [
      { question: "Do I receive the editable source files?", answer: "Yes, 100%. All completed design projects include full editable source files (Figma, AI, or PSD) and high-resolution export files." }
    ]
  },
  "branding": {
    slug: "branding",
    title: "Brand Identity & Logo Design",
    category: "CREATIVE & DESIGN",
    tagline: "Distinctive Corporate Identity Systems Built to Last",
    description: "We build memorable corporate identities that resonate with your target market. Digee Tech crafts logos, color palettes, typography systems, and comprehensive brand books that define your company's visual language.",
    problem: "Without clear brand guidelines, marketing materials look fragmented, confusing potential clients and diluting market recognition.",
    solution: "We provide comprehensive Brand Style Guides that establish clear rules for your logo, typography hierarchy, primary and accent colors, and marketing templates.",
    whoIsItFor: [
      "New startups needing a complete, professional visual identity from day one",
      "Established companies rebranding to reflect business growth",
      "Businesses launching new product lines or subsidiary brands"
    ],
    benefits: [
      "Timeless, distinctive logo marks that scale cleanly across digital and print",
      "Comprehensive Brand Style Guide for consistent marketing execution",
      "Complete set of vector files, color codes (HEX, RGB, CMYK), and typography pairings"
    ],
    startingPrice: "Starting from S$150+",
    pricingNote: "Logo & starter identity from S$150+, Full corporate brand identity package from S$350+. Custom packages available.",
    capabilities: [
      "Custom Logo Design & Vector Wordmarks",
      "Comprehensive Brand Identity Guidelines (Brand Book)",
      "Corporate Color Palette Definition (HEX, RGB, CMYK)",
      "Typography Scaling & Font System Pairings",
      "Stationery & Business Card Design",
      "Digital Avatar, Favicon & Social Header Kit"
    ],
    process: [
      { step: "01", title: "Brand Discovery", description: "Understanding your company values, target demographic, and competitive landscape." },
      { step: "02", title: "Concept Exploration", description: "Drafting 3 distinct visual directions with varied conceptual approaches." },
      { step: "03", title: "Refinement & Packaging", description: "Polishing the chosen mark and compiling the complete Brand Guidelines book." }
    ],
    technology: ["Figma", "Adobe Illustrator", "Vector Crafting"],
    faqs: [
      { question: "How many logo concepts do you present?", answer: "We present 3 unique conceptual directions initially, followed by iterative refinement rounds on your chosen direction to achieve perfection." }
    ]
  },
  "ui-ux": {
    slug: "ui-ux",
    title: "UI/UX & Product Design",
    category: "CREATIVE & DESIGN",
    tagline: "Intuitive User Interfaces & Clickable Prototypes in Figma",
    description: "Design digital products that people love to use. We map seamless user journeys, craft wireframes, and design modern, high-fidelity UI screens in Figma that maximize conversion and eliminate user friction.",
    problem: "Cluttered layouts, confusing navigation, and poorly placed call-to-actions frustrate users, resulting in high bounce rates and abandoned checkouts.",
    solution: "We apply human-centered design principles: balanced white space, clear typography hierarchy, intuitive button placements, and accessible color contrasts.",
    whoIsItFor: [
      "Startups wanting clickable Figma prototypes before investing in code",
      "Software teams looking to modernize an existing clunky web or mobile UI",
      "E-commerce stores wanting to redesign checkout and product pages"
    ],
    benefits: [
      "Validate user flows and features with interactive prototypes before coding",
      "Consistent design system with reusable component libraries",
      "Smooth developer handoff with precise spacing, tokens, and style guides"
    ],
    startingPrice: "Starting from S$150+",
    pricingNote: "Landing page UI from S$150+, Multi-screen mobile/SaaS UI from S$400+. Scope-based pricing in Figma.",
    capabilities: [
      "User Journey Mapping & Information Architecture",
      "Wireframing & Low-Fidelity Layouts",
      "High-Fidelity UI Screen Design (Desktop & Mobile)",
      "Interactive Clickable Prototypes in Figma",
      "Design Systems & Reusable UI Component Libraries",
      "Developer Handoff Specifications & Asset Export"
    ],
    process: [
      { step: "01", title: "Flow Mapping", description: "Mapping every user step required to complete key actions seamlessly." },
      { step: "02", title: "Wireframes & Layouts", description: "Structuring information hierarchy and screen layout blueprints." },
      { step: "03", title: "High-Fidelity Prototype", description: "Applying polished visual styling and connecting screens for live user testing." }
    ],
    technology: ["Figma", "Design Systems", "Prototyping", "Tailwind Design Tokens"],
    faqs: [
      { question: "Can Digee Tech also build the code after the design is approved?", answer: "Yes! As a full-stack digital solutions company, our engineering team can directly convert your approved Figma designs into production-ready React or Mobile code." }
    ]
  },
  "research-documentation": {
    slug: "research-documentation",
    title: "Research, Documentation & Presentation Design",
    category: "RESEARCH & DOCUMENTATION",
    tagline: "Academic Research Consulting, Technical Documentation & Executive Decks",
    description: "We provide structured research consulting, technical documentation writing, academic paper publication support, and executive-ready presentation designs for researchers, students, institutions, and corporate teams.",
    problem: "Complex technical projects and academic papers often suffer from poor documentation, unstructured formatting, or uninspiring slide decks that fail to convey true project value.",
    solution: "Our technical writing and research team assists with rigorous paper structure, documentation compilation, LaTeX/Word formatting, and compelling visual slide design.",
    whoIsItFor: [
      "Researchers and academicians needing journal publication support",
      "Corporate teams requiring comprehensive technical architecture documentation",
      "Founders and students preparing high-stakes project presentations and defense slides"
    ],
    benefits: [
      "Clear, rigorous technical documentation structured to international standards",
      "Professional visual slide decks designed for clarity and impact",
      "Confidential, ethical research consulting and formatting assistance"
    ],
    startingPrice: "Starting from S$100+",
    pricingNote: "Presentation design from S$50+, Technical documentation from S$100+, Research consulting packages scoped individually.",
    capabilities: [
      "Technical Architecture & System Documentation",
      "Research Paper Structure & Formatting Support",
      "Journal Publication Assistance & Review Checks",
      "Executive PPT & Presentation Slide Design",
      "Project Case Studies & Whitepaper Compilation",
      "LaTeX & Academic Document Typesetting"
    ],
    process: [
      { step: "01", title: "Content Review", description: "Reviewing raw research data, project notes, or technical specifications." },
      { step: "02", title: "Structuring & Drafting", description: "Organizing information into clear, logical sections with precise diagrams." },
      { step: "03", title: "Formatting & Visual Polish", description: "Applying rigorous formatting, citations, and high-impact visual design." }
    ],
    technology: ["LaTeX", "Microsoft Word", "PowerPoint", "Figma", "Technical Diagrams"],
    faqs: [
      { question: "Do you design corporate and academic presentation slides?", answer: "Yes. We create clean, beautifully designed slide decks in PowerPoint, Google Slides, or Figma tailored for executive pitches, board meetings, and academic defenses." }
    ]
  }
};

export const projectsData: ProjectData[] = [
  {
    slug: "enterprise-portal-case-study",
    title: "Enterprise Document & Staff Workflow Portal",
    category: "Web / SaaS",
    shortDescription: "A secure document management and employee portal built for a regional logistics company.",
    description: "An end-to-end, highly encrypted employee portal designed to centralize internal operations, confidential file tracking, and workforce shift schedules for a fast-growing logistics provider.",
    clientRequirement: "The client needed a centralized, secure web portal to eliminate cluttered email attachments, protect sensitive transport documents, and coordinate staff shift schedules seamlessly.",
    challenge: "Developing a performant portal that allows bulk file uploads, enforces strict row-level security per employee role, and maintains fast speeds across mobile connections.",
    solution: "We engineered a modern React dashboard with a secure backend API, automated file parsing, and encrypted cloud storage with temporary session tokens.",
    technology: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS", "Firebase Auth", "Encrypted Cloud Storage"],
    features: [
      "Granular Role-Based Access Controls (RBAC)",
      "Instant Cloud File Upload with Antivirus Scanning",
      "Real-Time Shift Scheduling & Shift Swapping Boards",
      "Automated PDF Report & Invoice Generation",
      "Comprehensive Security Activity Audit Logs"
    ],
    process: [
      "Conducted deep operational discovery of daily scheduling and file workflows.",
      "Mapped user permissions matrices across Admin, Supervisor, and Team Member roles.",
      "Engineered secure cloud file ingestion modules with temporary session credentials.",
      "Delivered a fully mobile-responsive interface optimized for fast loading."
    ],
    results: [
      "Established a secure, single source of truth for all operational documents.",
      "Reduced scheduling communication time by over 50% across departments.",
      "Zero security incidents with strict role-based access controls."
    ]
  },
  {
    slug: "custom-crm-case-study",
    title: "Client Pipeline & Lead Management CRM",
    category: "CRM / Automation",
    shortDescription: "A custom sales pipeline and deal-tracking CRM engineered for a growing services agency.",
    description: "A fast, lightweight CRM built to track deal stages, capture website inquiries automatically, and coordinate follow-up activities without recurring per-user fees.",
    clientRequirement: "The client wanted to transition off bloated monthly CRM platforms and have a dedicated lead-tracking panel built specifically for their sales process.",
    challenge: "Integrating lead ingestion seamlessly from multiple web channels while providing sales reps with a clean, drag-and-drop opportunity board.",
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
      "Analyzed lead conversion stages and sales rep daily workflows.",
      "Created highly optimized PostgreSQL schemas mapping contacts, accounts, and deals.",
      "Engineered clean, pixel-perfect dashboard layouts utilizing responsive design principles."
    ],
    results: [
      "Eliminated expensive monthly per-seat licensing fees permanently.",
      "Centralized all lead documentation into a single searchable dashboard.",
      "Reduced rep admin logging effort by automating follow-up prompts."
    ]
  },
  {
    slug: "ai-support-agent-case-study",
    title: "Autonomous Customer Support AI Agent",
    category: "AI & Automation",
    shortDescription: "A cognitive AI agent integrated into a business messaging pipeline.",
    description: "A secure cognitive agent trained on product manuals to handle initial user queries, retrieve client order data, and update ticket statuses automatically.",
    clientRequirement: "A growing digital business needed 24/7 client support that could resolve common inquiries and safely escalate complex issues.",
    challenge: "Preventing model hallucination, ensuring accurate product information lookup, and connecting with real database systems safely.",
    solution: "We developed an AI Agent using the latest Gemini SDK with robust system prompting, RAG architectures, and secure API tool calling boundaries.",
    technology: ["@google/genai", "Gemini 2.5", "Node.js", "Express", "TypeScript", "Vector Database", "REST APIs"],
    features: [
      "Context-Rich Semantic Search and Document Retrieval (RAG)",
      "Dynamic API Tool Calling to Retrieve Live Statuses",
      "Safe Escalation Gateways to Human Representatives",
      "Multi-Language Support and Sentiment Tracking",
      "Strict System Prompting and Enterprise Compliance Guardrails"
    ],
    process: [
      "Synthesized internal product handbooks and help docs into a secure semantic index.",
      "Configured function calling limits so the agent could only trigger safe status APIs.",
      "Ran rigorous multi-turn conversational testing profiles to verify reasoning chains."
    ],
    results: [
      "Resolved over 70% of initial customer inquiries automatically with zero human wait time.",
      "Reduced support ticket queues significantly, freeing reps for complex tasks.",
      "Delivered reliable, verified, non-hallucinated product support responses."
    ]
  }
];

export const blogArticles: BlogArticle[] = [
  {
    slug: "future-of-business-ai-agents",
    title: "The Shift from Chatbots to Autonomous AI Agents for Businesses",
    category: "AI",
    date: "August 28, 2026",
    readTime: "5 min read",
    summary: "Why simple rule-based chat widgets are fading, and how cognitive, tool-using AI agents are transforming modern operations.",
    content: [
      "For years, customer-facing chat systems were frustrating. They relied on rigid decision trees, and if a customer deviated slightly from the script, the bot would loop endlessly or fail.",
      "Today, modern Large Language Models (LLMs) have enabled the rise of AI Agents—systems that do not just converse, but reason, plan, and take actions.",
      "An AI Agent operates with a cognitive loop. When given a complex goal like 'Help this customer change their shipping address', the agent doesn't just display a link. It breaks down the task: (1) Verify customer identity, (2) Look up the order in the CRM database, (3) Confirm if the order has left the warehouse, (4) Call the shipping API to update the address, and (5) Confirm the update with the user.",
      "By integrating tools, APIs, and enterprise databases directly with LLM reasoning, businesses can automate complex workflows safely. At Digee Tech, we design secure agents that focus purely on business utility, reducing operational drag while ensuring strict compliance guidelines."
    ],
    author: "Digee Tech Editorial Team"
  },
  {
    slug: "building-scalable-saas-architecture",
    title: "Key Architecture Pillars for Building Scalable SaaS Products",
    category: "SaaS",
    date: "August 15, 2026",
    readTime: "6 min read",
    summary: "A practical guide to structuring databases, handling multi-tenancy, and implementing secure subscription authentication.",
    content: [
      "Launching a Software-as-a-Service (SaaS) product is an exciting venture, but a poorly engineered foundation can doom a platform before it gains traction.",
      "When building a SaaS MVP, developers often focus entirely on user-facing features, leaving core architectural items like tenant isolation, secure authentication, and billing webhooks as afterthoughts.",
      "The first pillar of SaaS design is strict multi-tenancy. You must decide whether to use separate database instances per customer (ideal for enterprise compliance) or a shared database with row-level tenant security keys (ideal for cost efficiency and simple operations). For most MVPs, a shared database with strict software-level query filters provides the best balance.",
      "The second pillar is a highly secure, scalable authentication framework. Role-Based Access Control (RBAC) must be defined from day one to manage permissions for Workspace Admins, Managers, and Regular Users without code duplication.",
      "Finally, design your billing integration with webhooks in mind. Never rely solely on client-side state to unlock features; let secure backend serverless endpoints process Stripe events to safely toggle tenant status."
    ],
    author: "Digee Tech Engineering"
  },
  {
    slug: "importance-of-technical-seo",
    title: "Why Site Speed and Technical SEO Matter for Singapore Businesses",
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
    author: "Digee Tech SEO Specialist"
  }
];

export const solutionsData: SolutionPackage[] = [
  {
    id: "startups",
    title: "Startup Launch & MVP Suite",
    tagline: "From Visual Concept to Production-Grade Live Product",
    description: "Everything an early-stage startup needs to validate ideas, establish brand credibility, launch a fast MVP, and start acquiring paying users.",
    targetAudience: "Early-stage founders, bootstrapped entrepreneurs, and seed-funded ventures.",
    startingPrice: "Starting from S$800+",
    benefits: [
      "High-converting modern corporate website & landing pages",
      "Distinctive visual brand identity, logo mark, and design tokens",
      "Production-ready SaaS MVP or mobile application framework",
      "Integrated lead capture, analytics, and payment billing"
    ],
    servicesIncluded: ["Website Development", "Branding", "UI/UX Design", "SaaS Development", "MVP Prototyping"],
    ctaText: "Launch Your Startup"
  },
  {
    id: "business-growth",
    title: "SME Digital Transformation Suite",
    tagline: "Unify Systems, Automate Tasks, and Scale Operational Margins",
    description: "Designed for established Singapore SMEs looking to eliminate manual spreadsheets, streamline customer workflows, and build tailored business management portals.",
    targetAudience: "Established Singapore SMEs, professional service firms, and growing agencies.",
    startingPrice: "Starting from S$700+",
    benefits: [
      "Custom CRM with visual sales kanban boards—zero per-user monthly fees",
      "Secure client and employee self-service web portals",
      "Background API automation scripts connecting your software tools",
      "Custom real-time analytics charts for tracking operational margins"
    ],
    servicesIncluded: ["CRM Solutions", "Management Portals", "Automation Solutions", "Digital Marketing"],
    ctaText: "Transform Your Business"
  },
  {
    id: "ai-enterprise",
    title: "AI-First Operations Suite",
    tagline: "Empower Your Team with Autonomous Cognitive Workflows",
    description: "For forward-thinking companies looking to integrate custom language models, task agents, and automated knowledge retrieval directly into their daily systems.",
    targetAudience: "Enterprise businesses, high-volume support operations, and technology-forward companies.",
    startingPrice: "Starting from S$500+",
    benefits: [
      "Cognitive customer support agents with live RAG database lookup",
      "Custom internal AI tools for rapid document synthesis and report creation",
      "Automated lead triage and data routing pipelines with LLM classifiers",
      "Enterprise security guardrails ensuring strict data privacy"
    ],
    servicesIncluded: ["AI Agents", "AI Tools", "Automation Solutions", "API Integrations"],
    ctaText: "Integrate AI Solutions"
  }
];
