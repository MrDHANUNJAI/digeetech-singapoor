import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: "superadmin" | "admin" | "editor";
  createdAt: string;
  lastLogin?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  jobTitle: string;
  department: string;
  bio: string;
  skills: string[];
  experience: string;
  email: string;
  linkedin: string;
  avatar: string;
  status: "active" | "inactive";
  order: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryName: string;
  shortDesc: string;
  fullDesc: string;
  startingPriceSGD: number;
  deliveryEstimate: string;
  features: string[];
  deliverables: string[];
  isFeatured?: boolean;
  status: "active" | "archived";
}

export interface SolutionItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  keyBenefits: string[];
  targetAudience: string;
  startingPriceSGD: number;
  timeline: string;
  icon: string;
  status: "active" | "archived";
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  category: string;
  summary: string;
  description: string;
  techStack: string[];
  impactMetrics: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  featured: boolean;
  status: "published" | "draft";
}

export interface ClientReview {
  id: string;
  clientName: string;
  company: string;
  role: string;
  review: string;
  rating: number;
  project: string;
  verified: boolean;
  date: string;
  status: "published" | "pending" | "hidden";
}

export interface InternshipProgram {
  id: string;
  title: string;
  department: string;
  description: string;
  duration: string;
  mode: "On-site" | "Hybrid" | "Remote";
  location: string;
  skills: string[];
  eligibility: string;
  deadline: string;
  stipend: string;
  status: "active" | "closed";
}

export interface InternshipApplicant {
  id: string;
  programId: string;
  programTitle: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  degree: string;
  graduationYear: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  coverNote: string;
  appliedAt: string;
  status: "Applied" | "Under Review" | "Selected" | "Active" | "Completed" | "Rejected";
}

export interface WorkshopItem {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  trainer: string;
  mode: "Virtual Masterclass" | "Singapore On-Site" | "Corporate In-House";
  location: string;
  priceSGD: number;
  maxParticipants: number;
  registeredCount: number;
  curriculum: string[];
  status: "Upcoming" | "Completed" | "Cancelled";
}

export interface WorkshopParticipant {
  id: string;
  workshopId: string;
  workshopTitle: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  jobRole: string;
  registeredAt: string;
  certificateIssued: boolean;
  status: "Registered" | "Attended" | "Cancelled";
}

export interface CertificateRecord {
  id: string; // e.g., "DT-2025-ENG-0891"
  verificationId: string; // secure hash ID for public verification
  recipientName: string;
  recipientEmail: string;
  program: string;
  category: "Internship" | "Workshop" | "Corporate Training" | "Project Completion" | "Technical Advisory";
  organization: string;
  issueDate: string;
  completionDate: string;
  gradeScore?: string;
  skillsAcquired: string[];
  status: "Active" | "Revoked";
  revokedReason?: string;
  issuedBy: string;
  verificationUrl: string;
}

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budgetSGD: string;
  message: string;
  source: string;
  createdAt: string;
  status: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won" | "Lost";
  notes?: string;
}

export interface QuoteRequestItem {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  serviceCategory: string;
  projectType: string;
  estimatedBudgetSGD: string;
  timeline: string;
  requirements: string;
  deliverablesSelected: string[];
  createdAt: string;
  status: "New" | "Reviewing" | "Quotation Sent" | "In Discussion" | "Approved" | "Closed";
  quoteAmountSGD?: number;
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  authorRole: string;
  summary: string;
  content: string;
  tags: string[];
  featured: boolean;
  status: "published" | "draft";
}

export interface AuditLogItem {
  id: string;
  user: string;
  action: string;
  details: string;
  ip: string;
  timestamp: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  uen: string;
  email: string;
  salesEmail: string;
  phone: string;
  whatsapp: string;
  address: string;
  country: string;
  currency: string;
  announcementBar: {
    enabled: boolean;
    text: string;
    link: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

export interface KnowledgeBaseItem {
  id: string;
  title: string;
  category: "Company Profile" | "Services" | "Solutions" | "Pricing" | "FAQ" | "Policies" | "Portfolio" | "Careers" | "Custom";
  content: string;
  sourceUrl?: string;
  tags?: string[];
  lastUpdated: string;
  isCustom?: boolean;
}

export interface ChatbotSettings {
  companyName: string;
  botName: string;
  welcomeGreeting: string;
  whatsappNumber: string;
  whatsappMessage: string;
  fallbackEmail: string;
  enabled: boolean;
  strictRAGMode: boolean;
  voiceEnabledDefault: boolean;
}

export interface DatabaseSchema {
  users: AdminUser[];
  staff: StaffMember[];
  services: ServiceItem[];
  solutions: SolutionItem[];
  projects: ProjectItem[];
  testimonials: ClientReview[];
  internships: InternshipProgram[];
  applicants: InternshipApplicant[];
  workshops: WorkshopItem[];
  participants: WorkshopParticipant[];
  certificates: CertificateRecord[];
  leads: LeadItem[];
  quoteRequests: QuoteRequestItem[];
  blogPosts: BlogPostItem[];
  auditLogs: AuditLogItem[];
  settings: SiteSettings;
  knowledgeBase: KnowledgeBaseItem[];
  chatbotSettings: ChatbotSettings;
  visitorStats: {
    totalViews: number;
    uniqueVisitors: number;
    history: { date: string; views: number; leads: number }[];
  };
}

import os from "os";

function getStoragePath(): string {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    return path.join(dataDir, "store.json");
  } catch (err) {
    const tmpDir = path.join(os.tmpdir(), "digeetech_data");
    try {
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
    } catch {}
    return path.join(tmpDir, "store.json");
  }
}

const DB_FILE = getStoragePath();

// Initial Database Seeding with real Singapore-oriented content and secure initial credentials
function getInitialSeedData(): DatabaseSchema {
  // Password hashes
  const salt = bcrypt.genSaltSync(10);
  const initialPasswordHash = bcrypt.hashSync("dhanu123@P", salt);
  const adminPasswordHash = bcrypt.hashSync("admin123", salt);

  return {
    users: [
      {
        id: "admin-01",
        email: "ceo@digeetech.com",
        passwordHash: initialPasswordHash,
        name: "Chief Executive Officer",
        role: "superadmin",
        createdAt: "2025-01-10T00:00:00.000Z",
      },
      {
        id: "admin-02",
        email: "admin@digeetech.com",
        passwordHash: adminPasswordHash,
        name: "Executive Administrator",
        role: "superadmin",
        createdAt: "2025-01-10T00:00:00.000Z",
      },
      {
        id: "admin-03",
        email: "admin",
        passwordHash: adminPasswordHash,
        name: "System Admin",
        role: "superadmin",
        createdAt: "2025-01-10T00:00:00.000Z",
      },
    ],
    settings: {
      companyName: "DIGEE TECH",
      tagline: "Digital Technology & Business Solutions Partner",
      uen: "202119842M",
      email: "contact@digeetech.com",
      salesEmail: "sales@digeetech.com",
      phone: "+65 6980 3411",
      whatsapp: "+65 8921 4402",
      address: "10 Marina Boulevard, Marina Bay Financial Centre Tower 2, Singapore 018983",
      country: "Singapore",
      currency: "SGD (S$)",
      announcementBar: {
        enabled: true,
        text: "🇸🇬 Partner with Digee Tech: Government & Enterprise Ready Software, AI Agents & Cloud Engineering in Singapore",
        link: "/start-a-project",
      },
      seo: {
        metaTitle: "Digee Tech | Singapore Technology, AI & Digital Solutions Partner",
        metaDescription: "Singapore's trusted technology partner providing web development, mobile apps, AI automation, custom ERP/CRM software, cybersecurity, and digital growth solutions.",
        keywords: "software development Singapore, web development Singapore, mobile app development Singapore, AI solutions Singapore, digital transformation Singapore, business automation Singapore",
      },
    },
    staff: [
      {
        id: "staff-1",
        name: "Dhanush K.",
        jobTitle: "Founder & Chief Technology Architect",
        department: "Executive & Engineering",
        bio: "Specializing in distributed cloud infrastructure, microservices, enterprise AI architectures, and scalable full-stack applications across Singapore & APAC.",
        skills: ["Cloud Architecture", "Enterprise AI", "Node.js/TypeScript", "Cybersecurity", "System Design"],
        experience: "9+ Years in Enterprise Tech",
        email: "ceo@digeetech.com",
        linkedin: "https://linkedin.com/company/digee-tech",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
        status: "active",
        order: 1,
      },
      {
        id: "staff-2",
        name: "Marcus Tan",
        jobTitle: "Head of AI & Machine Learning Systems",
        department: "AI & Data Solutions",
        bio: "Directing multi-agent LLM pipelines, autonomous retrieval-augmented generation (RAG), and industrial automation for high-growth enterprises.",
        skills: ["LLM Agents", "Python", "PyTorch", "RAG Systems", "MLOps"],
        experience: "7+ Years AI Research & Ops",
        email: "marcus.tan@digeetech.com",
        linkedin: "https://linkedin.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
        status: "active",
        order: 2,
      },
      {
        id: "staff-3",
        name: "Valerie Lim",
        jobTitle: "VP of Product Engineering & UX",
        department: "Product & UI/UX",
        bio: "Crafting frictionless, conversion-focused enterprise web, mobile, and SaaS platforms that pass rigorous usability and accessibility standards.",
        skills: ["Design Systems", "React/Next.js", "Human-Centered Design", "SaaS Strategy"],
        experience: "8+ Years Product Design",
        email: "valerie.lim@digeetech.com",
        linkedin: "https://linkedin.com",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
        status: "active",
        order: 3,
      },
      {
        id: "staff-4",
        name: "Karthik Subramanian",
        jobTitle: "Lead Cloud DevOps & Security Specialist",
        department: "Cloud & Infrastructure",
        bio: "Managing zero-downtime Kubernetes deployments, SOC compliance, automated CI/CD pipelines, and multi-region AWS/GCP cloud environments.",
        skills: ["Kubernetes", "Terraform", "GCP/AWS", "DevSecOps", "Penetration Testing"],
        experience: "6+ Years DevOps Engineering",
        email: "karthik.s@digeetech.com",
        linkedin: "https://linkedin.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
        status: "active",
        order: 4,
      },
    ],
    services: [
      {
        id: "srv-web-dev",
        title: "Website & Custom Web Application Development",
        slug: "web-development",
        category: "Web & Software",
        categoryName: "Software & Web Engineering",
        shortDesc: "High-performance, SEO-optimized corporate websites, interactive web applications, and customer portals built with modern React/TypeScript.",
        fullDesc: "We build enterprise-grade, lightning-fast web applications designed for Singapore SMEs, corporate leaders, and startups. From custom dashboards to high-conversion corporate landing portals with full headless CMS integration.",
        startingPriceSGD: 800,
        deliveryEstimate: "2 - 4 Weeks",
        features: ["Ultra-fast Page Speed (<1s load)", "Mobile-First Responsive Layout", "SEO Structure & Schema Markup", "Full 100% IP Ownership & Clean Code"],
        deliverables: ["Production-ready Source Code", "Admin CMS Panel", "Deployment on Cloud Run / Vercel", "1-Year Warranty & Technical Support"],
        isFeatured: true,
        status: "active",
      },
      {
        id: "srv-mobile-app",
        title: "Mobile App Development (iOS, Android & Flutter)",
        slug: "app-development",
        category: "Mobile",
        categoryName: "Mobile Engineering",
        shortDesc: "Native and cross-platform Flutter/React Native mobile applications with smooth offline sync, biometric security, and PayNow/Stripe integration.",
        fullDesc: "End-to-end mobile app development from wireframes and prototyping to Apple App Store & Google Play Store submission and post-launch maintenance.",
        startingPriceSGD: 2500,
        deliveryEstimate: "4 - 8 Weeks",
        features: ["Cross-Platform iOS & Android Codebase", "Biometric Authentication & Push Notifications", "PayNow & Credit Card Gateway Support", "Offline Data Sync & Realtime WebSockets"],
        deliverables: ["iOS & Android App Store Builds", "Backend API & Database Architecture", "Admin Dashboard", "Complete Source Code"],
        isFeatured: true,
        status: "active",
      },
      {
        id: "srv-ai-agents",
        title: "AI Agents & Autonomous Workflow Bots",
        slug: "ai-agents",
        category: "AI",
        categoryName: "Artificial Intelligence",
        shortDesc: "Custom multi-agent workflows, autonomous 24/7 customer support bots, and internal document search agents powered by Gemini & OpenAI.",
        fullDesc: "Transform manual operational overhead into automated AI workflows. We engineer specialized AI agents that answer inquiries, draft quotes, extract invoice data, and trigger CRM updates autonomously.",
        startingPriceSGD: 900,
        deliveryEstimate: "1 - 3 Weeks",
        features: ["RAG with Proprietary Business Documents", "WhatsApp, Telegram & Web Widget Integration", "Automated CRM & ERP Data Sync", "Human-in-the-loop Escalation"],
        deliverables: ["Trained AI Model / Agent Endpoint", "Embedded Chat Interface", "Admin Telemetry Dashboard", "API Documentation"],
        isFeatured: true,
        status: "active",
      },
      {
        id: "srv-crm-erp",
        title: "Custom CRM & ERP Business Automation",
        slug: "crm-erp-solutions",
        category: "Business Solutions",
        categoryName: "Enterprise Software",
        shortDesc: "Tailor-made ERP, inventory, HRMS, and CRM software configured specifically for your unique business workflows without recurring license bloat.",
        fullDesc: "Eliminate repetitive spreadsheets and disjointed tools with a unified corporate platform connecting invoicing, inventory tracking, staff schedules, and client communication.",
        startingPriceSGD: 3500,
        deliveryEstimate: "4 - 8 Weeks",
        features: ["Role-Based Access Control (RBAC)", "Automated Quotations & Invoice Generation", "Singapore GST & Multi-Currency Accounting", "Automated Email & WhatsApp Notifications"],
        deliverables: ["Custom Deployed Software Suite", "Staff Training Sessions & User Manuals", "Cloud Backup & Disaster Recovery", "12 Months Free Updates"],
        isFeatured: true,
        status: "active",
      },
      {
        id: "srv-cybersecurity",
        title: "Cybersecurity Consulting & Vulnerability Audits",
        slug: "cybersecurity-services",
        category: "Cybersecurity",
        categoryName: "Security & Compliance",
        shortDesc: "Comprehensive vulnerability assessments, penetration testing, Singapore PDPA compliance checks, and proactive SOC monitoring.",
        fullDesc: "Safeguard your corporate data, web applications, and customer databases against sophisticated cyber threats with certified security engineers.",
        startingPriceSGD: 1200,
        deliveryEstimate: "1 - 2 Weeks",
        features: ["OWASP Top 10 Security Audit", "Network & API Penetration Testing", "Singapore PDPA Compliance Verification", "Detailed Remediation Roadmap"],
        deliverables: ["Formal Audit Report with Risk Matrix", "Developer Remediation Code Snippets", "Security Certificate of Assessment", "Executive Presentation"],
        isFeatured: true,
        status: "active",
      },
      {
        id: "srv-digital-marketing",
        title: "High-ROI Digital Marketing & SEO Growth",
        slug: "digital-marketing",
        category: "Digital Marketing",
        categoryName: "Growth & Marketing",
        shortDesc: "Singapore local SEO ranking, precision Google Ads / Meta performance funnels, and conversion rate optimization (CRO).",
        fullDesc: "Data-driven growth strategies that generate qualified, high-intent B2B and B2C sales leads for Singapore businesses and SMEs.",
        startingPriceSGD: 650,
        deliveryEstimate: "Monthly Ongoing",
        features: ["Local Singapore Keywords & Google Maps Optimization", "High-Converting Ad Creatives & Copy", "Weekly Transparent Performance Dashboard", "A/B Conversion Landing Pages"],
        deliverables: ["Monthly Lead Generation Reports", "Targeted Campaign Assets", "Direct Attribution Analytics", "Dedicated Campaign Strategist"],
        isFeatured: true,
        status: "active",
      },
    ],
    solutions: [
      {
        id: "sol-1",
        title: "Business Process Automation & RPA",
        slug: "business-automation",
        category: "Digital Transformation",
        description: "Automate repetitive invoice processing, CRM lead routing, document generation, and multi-app data synchronization.",
        keyBenefits: ["Save 15+ staff hours weekly", "Zero data entry human error", "Seamless integration with Xero & WhatsApp"],
        targetAudience: "SMEs, Logistics, Real Estate, Professional Services",
        startingPriceSGD: 1800,
        timeline: "2 - 3 Weeks",
        icon: "Zap",
        status: "active",
      },
      {
        id: "sol-2",
        title: "Custom CRM & Sales Pipeline Portal",
        slug: "crm-solutions",
        category: "Enterprise Software",
        description: "Centralized client relationship management with automated follow-ups, contract generation, and deal tracking.",
        keyBenefits: ["35% faster proposal closing", "Real-time pipeline analytics", "Customizable role-based permissions"],
        targetAudience: "B2B Companies, Agencies, Consultancies",
        startingPriceSGD: 3200,
        timeline: "3 - 5 Weeks",
        icon: "Users",
        status: "active",
      },
      {
        id: "sol-3",
        title: "Integrated POS & Inventory Suite",
        slug: "pos-inventory-systems",
        category: "Retail & F&B",
        description: "Cloud-connected Point-of-Sale with barcode scanning, live multi-outlet stock tracking, and PayNow QR integration.",
        keyBenefits: ["Real-time multi-location sync", "Offline billing capability", "Automated low-stock supplier alerts"],
        targetAudience: "Retail Stores, F&B Chains, Wholesalers",
        startingPriceSGD: 2900,
        timeline: "3 - 4 Weeks",
        icon: "ShoppingBag",
        status: "active",
      },
    ],
    projects: [
      {
        id: "proj-1",
        title: "LogiFlow: Enterprise AI Freight & Warehouse Optimization",
        slug: "logiflow-singapore-freight",
        client: "Apex Freight Global (Singapore)",
        industry: "Logistics & Supply Chain",
        category: "AI & Custom Software",
        summary: "Automated route dispatching and container tracking platform handling 4,000+ daily freight movements across Southeast Asia.",
        description: "Apex Freight required a modernized operational portal to replace legacy Excel tracking. We built a reactive cloud dashboard with real-time GPS integration, automated bill-of-lading PDF parsing via LLM, and instant WhatsApp status updates for shippers.",
        techStack: ["React 19", "TypeScript", "Node.js Microservices", "PostgreSQL", "Google Cloud Run", "Gemini 2.5 Flash"],
        impactMetrics: ["42% reduction in manual dispatching time", "S$180,000 annual operational savings", "99.98% system uptime during peak logistics seasons"],
        testimonial: {
          quote: "Digee Tech delivered a world-class platform on time and within budget. Our operations team adopted the software within 48 hours.",
          author: "Raymond Goh",
          role: "Chief Operating Officer, Apex Freight",
        },
        featured: true,
        status: "published",
      },
      {
        id: "proj-2",
        title: "CareSync: Multi-Clinic Telehealth & Appointment Booking",
        slug: "caresync-telehealth-portal",
        client: "CareSync Medical Group",
        industry: "Healthcare & Wellness",
        category: "Web & Mobile App",
        summary: "Secure HIPAA/PDPA compliant patient appointment, electronic health records (EHR), and video consultation platform.",
        description: "Engineered a high-security patient portal with PayNow payments, Singpass integration support, automated SMS reminders, and encrypted medical records storage.",
        techStack: ["Flutter", "React", "Node.js", "Redis", "Cloud Firestore", "WebRTC"],
        impactMetrics: ["15,000+ booked appointments in month 1", "78% reduction in patient no-show rates", "100% PDPA data privacy compliance certified"],
        testimonial: {
          quote: "The reliability and visual elegance of CareSync made patient adoption effortless. Outstanding technical execution by Digee Tech.",
          author: "Dr. Evelyn Chan",
          role: "Medical Director, CareSync Singapore",
        },
        featured: true,
        status: "published",
      },
      {
        id: "proj-3",
        title: "OmniRetail: AI-Powered B2B E-Commerce & Wholesale Hub",
        slug: "omniretail-wholesale-platform",
        client: "Vanguard Wholesale Distribution",
        industry: "E-Commerce & Wholesale",
        category: "E-Commerce & Automation",
        summary: "Multi-currency wholesale ordering portal with customized tier pricing, bulk purchasing discounts, and ERP synchronization.",
        description: "Built a high-volume B2B e-commerce platform processing over S$2.5M in monthly transaction volume with instant automated invoice generation and PayNow settlement.",
        techStack: ["Next.js", "TypeScript", "Stripe Multi-Currency", "Xero Accounting API", "AWS"],
        impactMetrics: ["S$3.2M processed in Q1", "3.4x faster wholesale order fulfillment", "Zero discrepancies with accounting ledger"],
        featured: true,
        status: "published",
      },
    ],
    testimonials: [
      {
        id: "test-1",
        clientName: "Kenneth Wong",
        company: "Ascend Capital Advisors",
        role: "Managing Director",
        review: "Digee Tech revamped our corporate web portal and automated our client onboarding workflow. What previously took 3 days is now completed in 15 minutes. Truly a partner of choice for Singapore businesses.",
        rating: 5,
        project: "Corporate Fintech Web App & Onboarding Automation",
        verified: true,
        date: "2025-02-15",
        status: "published",
      },
      {
        id: "test-2",
        clientName: "Sarah Chew",
        company: "UrbanNest Real Estate Group",
        role: "Head of Digital Strategy",
        review: "The custom CRM and automated WhatsApp lead responder built by Digee Tech boosted our property consultation bookings by over 140%. Transparent SGD quotes and zero hidden fees.",
        rating: 5,
        project: "Real Estate Lead Funnel & CRM Portal",
        verified: true,
        date: "2025-01-28",
        status: "published",
      },
      {
        id: "test-3",
        clientName: "David Teo",
        company: "NextGen Logistics Pte Ltd",
        role: "Founder & CEO",
        review: "Outstanding engineering team. Their attention to cloud reliability, security, and UI precision makes them stand out among tech agencies across APAC.",
        rating: 5,
        project: "Cloud DevOps & Fleet Tracking App",
        verified: true,
        date: "2025-02-02",
        status: "published",
      },
    ],
    internships: [
      {
        id: "intern-1",
        title: "Full-Stack Software Engineering Fellowship",
        department: "Engineering & Cloud",
        description: "Work directly on production React 19, Node.js, and Cloud Run applications. Learn clean code architectures, testing, CI/CD, and system design.",
        duration: "3 - 6 Months",
        mode: "Hybrid",
        location: "Marina Bay, Singapore / Remote Option",
        skills: ["TypeScript", "React", "Node.js", "SQL/NoSQL", "Git", "REST/GraphQL"],
        eligibility: "Computer Science, Software Engineering, or related technical diploma/degree students with fundamental coding proficiency.",
        deadline: "2025-05-30",
        stipend: "S$1,000 - S$1,500 / month",
        status: "active",
      },
      {
        id: "intern-2",
        title: "AI & Autonomous Agent Systems Internship",
        department: "AI & Data Solutions",
        description: "Build generative AI agents, vector search pipelines, RAG systems, and automated workflow orchestrations using modern AI APIs.",
        duration: "3 - 6 Months",
        mode: "Hybrid",
        location: "Singapore HQ / Hybrid",
        skills: ["Python", "Prompt Engineering", "RAG Systems", "Vector Databases", "TypeScript"],
        eligibility: "Students with strong math, algorithms, or ML/AI project background.",
        deadline: "2025-05-15",
        stipend: "S$1,200 - S$1,600 / month",
        status: "active",
      },
    ],
    applicants: [
      {
        id: "app-01",
        programId: "intern-1",
        programTitle: "Full-Stack Software Engineering Fellowship",
        name: "Bryan Tan",
        email: "bryan.tan@u.nus.edu",
        phone: "+65 9123 4567",
        university: "National University of Singapore (NUS)",
        degree: "B.Comp in Computer Science",
        graduationYear: "2026",
        coverNote: "Passionate about full-stack web architectures and high-performance frontend engineering. Experienced with TypeScript, React, and Express.",
        appliedAt: "2025-02-18T10:30:00.000Z",
        status: "Selected",
      },
      {
        id: "app-02",
        programId: "intern-2",
        programTitle: "AI & Autonomous Agent Systems Internship",
        name: "Chloe Lee",
        email: "chloe.lee@ntu.edu.sg",
        phone: "+65 8234 5678",
        university: "Nanyang Technological University (NTU)",
        degree: "B.Eng in Data Science & AI",
        graduationYear: "2025",
        coverNote: "Experienced in building RAG applications and LLM orchestration with LangChain and Python.",
        appliedAt: "2025-02-20T14:15:00.000Z",
        status: "Under Review",
      },
    ],
    workshops: [
      {
        id: "ws-1",
        title: "Enterprise AI Agents & LLM Workflow Masterclass",
        description: "A hands-on intensive workshop for developers and technical leaders on building production-ready multi-agent AI systems, vector search, and secure tool calling.",
        date: "2025-04-12",
        duration: "Full-Day (9:00 AM - 5:30 PM SGT)",
        trainer: "Marcus Tan (Head of AI, Digee Tech)",
        mode: "Singapore On-Site",
        location: "Marina Bay Financial Centre, Singapore",
        priceSGD: 350,
        maxParticipants: 30,
        registeredCount: 24,
        curriculum: [
          "Architecture of Autonomous LLM Agents",
          "Production RAG with Hybrid Vector Search",
          "Function Calling, Structured Outputs & Tool Orchestration",
          "Deployment, Token Economics & Latency Optimization",
        ],
        status: "Upcoming",
      },
      {
        id: "ws-2",
        title: "Modern Full-Stack Microservices with TypeScript & Cloud Run",
        description: "Master modern containerized web applications, automated CI/CD pipelines, and zero-downtime scaling.",
        date: "2025-05-10",
        duration: "Full-Day (9:00 AM - 5:00 PM SGT)",
        trainer: "Dhanush K. (Chief Technology Architect)",
        mode: "Virtual Masterclass",
        location: "Interactive Live Streaming + Lab Sandbox",
        priceSGD: 250,
        maxParticipants: 50,
        registeredCount: 38,
        curriculum: [
          "React 19 & TypeScript Strict Architecture",
          "Express/Node.js Resilient REST & WebSocket APIs",
          "Docker Containerization & GCP Cloud Run Deployments",
          "Automated Testing & Security Hardening",
        ],
        status: "Upcoming",
      },
    ],
    participants: [
      {
        id: "part-01",
        workshopId: "ws-1",
        workshopTitle: "Enterprise AI Agents & LLM Workflow Masterclass",
        name: "Nicholas Wee",
        email: "n.wee@vertex-holdings.sg",
        phone: "+65 9876 5432",
        company: "Vertex Holdings",
        jobRole: "Senior Software Engineer",
        registeredAt: "2025-02-22T08:00:00.000Z",
        certificateIssued: false,
        status: "Registered",
      },
    ],
    certificates: [
      {
        id: "DT-2025-ENG-0891",
        verificationId: "v-e89a2b1c-99f4-4d23",
        recipientName: "Jonathan Tan Wei Ming",
        recipientEmail: "jonathan.tan@alumni.nus.edu.sg",
        program: "Full-Stack Software Engineering Fellowship",
        category: "Internship",
        organization: "DIGEE TECH (Singapore)",
        issueDate: "2025-01-31",
        completionDate: "2025-01-30",
        gradeScore: "Distinction (Grade A+)",
        skillsAcquired: ["React 19", "TypeScript", "Node.js Microservices", "Cloud Run DevOps", "System Architecture"],
        status: "Active",
        issuedBy: "Dhanush K. (Chief Technology Architect)",
        verificationUrl: "/verify-certificate/DT-2025-ENG-0891",
      },
      {
        id: "DT-2025-AI-0412",
        verificationId: "v-4a7b9c2d-11e8-4f56",
        recipientName: "Mei Ling Stephanie Koh",
        recipientEmail: "stephanie.koh@innovate-tech.sg",
        program: "Enterprise AI & Multi-Agent Systems Masterclass",
        category: "Workshop",
        organization: "DIGEE TECH (Singapore)",
        issueDate: "2025-02-15",
        completionDate: "2025-02-15",
        gradeScore: "Certified Specialist",
        skillsAcquired: ["LLM Agents", "Vector Search RAG", "Prompt Engineering", "MLOps Automation"],
        status: "Active",
        issuedBy: "Marcus Tan (Head of AI)",
        verificationUrl: "/verify-certificate/DT-2025-AI-0412",
      },
    ],
    leads: [
      {
        id: "lead-01",
        name: "Terence Foo",
        email: "terence@nexus-retail.sg",
        phone: "+65 9234 5678",
        company: "Nexus Retail Holdings Pte Ltd",
        service: "E-Commerce & Custom POS Development",
        budgetSGD: "S$5,000 - S$10,000",
        message: "We need a multi-outlet POS and inventory management system integrated with Shopify and PayNow for our 4 outlets in Orchard and Bugis.",
        source: "Website Contact Form",
        createdAt: "2025-02-27T04:20:00.000Z",
        status: "Proposal Sent",
        notes: "Drafted preliminary technical architecture proposal. Follow-up meeting scheduled for Thursday 2 PM.",
      },
      {
        id: "lead-02",
        name: "Audrey Ng",
        email: "audrey.ng@lumina-consulting.com",
        phone: "+65 8345 6789",
        company: "Lumina Strategic Consulting",
        service: "AI Customer Support Agent",
        budgetSGD: "S$2,000 - S$5,000",
        message: "Looking for an autonomous AI support assistant trained on our 200-page consulting methodology to answer prospective client questions.",
        source: "Service Finder Widget",
        createdAt: "2025-03-01T08:15:00.000Z",
        status: "New",
        notes: "High intent lead. Interested in Singapore-hosted data privacy.",
      },
    ],
    quoteRequests: [
      {
        id: "quote-01",
        name: "Desmond Chan",
        company: "Pinnacle Asset Partners",
        email: "desmond.chan@pinnacle-asset.sg",
        phone: "+65 9456 7890",
        country: "Singapore",
        serviceCategory: "Custom Software & Web Portal",
        projectType: "Investor Reporting & Analytics Portal",
        estimatedBudgetSGD: "S$10,000 - S$25,000",
        timeline: "6 - 8 Weeks",
        requirements: "We need a secure investor dashboard where accredited clients can view portfolio NAVs, download audited tax statements, and receive instant quarterly performance updates.",
        deliverablesSelected: ["Role-Based Investor Dashboard", "Two-Factor Biometric Auth", "Automated PDF Report Generator", "Singapore Cloud Deployment"],
        createdAt: "2025-02-28T09:45:00.000Z",
        status: "In Discussion",
        quoteAmountSGD: 14500,
      },
    ],
    blogPosts: [
      {
        id: "post-1",
        title: "How Singapore SMEs Are Cutting 20+ Hours Weekly with Autonomous AI Agents",
        slug: "singapore-sme-ai-agents-automation",
        category: "AI & Automation",
        readTime: "5 min read",
        publishDate: "2025-02-20",
        author: "Marcus Tan",
        authorRole: "Head of AI",
        summary: "A practical breakdown of how local businesses are automating customer inquiries, invoice extraction, and CRM updates with zero human error.",
        content: `As business costs and manpower constraints continue to challenge Singapore SMEs, proactive founders are turning to autonomous AI agent workflows to scale operations efficiently.

In this guide, we analyze real-world case studies across logistics, accounting, and retail in Singapore, detailing how multi-agent architectures achieve rapid ROI within 30 days.

### 1. The Real Cost of Repetitive Operational Bottlenecks
Most businesses lose between 15 to 25 hours per employee each week to manual data re-entry, customer status checks, and quotation generation.

### 2. Multi-Agent Workflows vs Traditional Chatbots
Unlike simple script-based chatbots, modern AI agents possess reasoning capabilities, tool calling, and live database integrations...`,
        tags: ["AI Agents", "Singapore SME", "Automation", "Gemini 2.5"],
        featured: true,
        status: "published",
      },
      {
        id: "post-2",
        title: "The 2025 Guide to Web Application Architecture for High-Growth Startups",
        slug: "2025-web-application-architecture-guide",
        category: "Software Engineering",
        readTime: "7 min read",
        publishDate: "2025-02-10",
        author: "Dhanush K.",
        authorRole: "Chief Technology Architect",
        summary: "Best practices for building lightning-fast, scalable React 19, TypeScript, and serverless container microservices that scale seamlessly.",
        content: `Designing scalable digital products requires picking the right architectural primitives from Day 1. In this engineering deep dive, we explore state synchronization, microservice modularity, and zero-downtime deployment patterns.`,
        tags: ["React 19", "TypeScript", "Microservices", "Cloud Run"],
        featured: true,
        status: "published",
      },
    ],
    auditLogs: [
      {
        id: "log-1",
        user: "ceo@digeetech.com",
        action: "System Initialized",
        details: "Digee Tech enterprise database seeded with initial security credentials and services catalog.",
        ip: "127.0.0.1",
        timestamp: "2025-01-10T00:00:00.000Z",
      },
      {
        id: "log-2",
        user: "ceo@digeetech.com",
        action: "Certificate Issued",
        details: "Issued verified certificate DT-2025-ENG-0891 to Jonathan Tan Wei Ming",
        ip: "127.0.0.1",
        timestamp: "2025-01-31T14:30:00.000Z",
      },
    ],
    visitorStats: {
      totalViews: 14820,
      uniqueVisitors: 4180,
      history: [
        { date: "2025-02-24", views: 420, leads: 3 },
        { date: "2025-02-25", views: 510, leads: 5 },
        { date: "2025-02-26", views: 630, leads: 4 },
        { date: "2025-02-27", views: 590, leads: 6 },
        { date: "2025-02-28", views: 720, leads: 8 },
        { date: "2025-03-01", views: 810, leads: 7 },
      ],
    },
    chatbotSettings: {
      companyName: "Digee Tech",
      botName: "Digee Tech AI Assistant",
      welcomeGreeting: "Welcome to Digee Tech, how can I help you today?",
      whatsappNumber: "+65 8123 4567",
      whatsappMessage: "Hello Digee Tech team, I would like to inquire about your software and AI solutions.",
      fallbackEmail: "contact@digeetech.com",
      enabled: true,
      strictRAGMode: true,
      voiceEnabledDefault: false,
    },
    knowledgeBase: [
      {
        id: "kb-company-1",
        title: "Company Overview & Profile",
        category: "Company Profile",
        content: "Digee Tech is a premier digital engineering agency based in Singapore (UEN: 202412345K, HQ: Marina Bay Sands Financial Centre, Singapore). Digee Tech specializes in full-stack web and mobile application development, enterprise AI agents, cognitive automation pipelines, cloud architecture on Cloud Run and GCP, custom ERP/CRM systems, and local Singapore SEO. Digee Tech operates strictly on transparent milestone pricing with zero hidden fees and 100% intellectual property ownership transferred to clients upon completion.",
        tags: ["company", "location", "singapore", "profile", "uen"],
        lastUpdated: "2025-03-01",
        isCustom: false,
      },
      {
        id: "kb-contact-1",
        title: "Official Contact Details & WhatsApp",
        category: "Company Profile",
        content: "Contact Digee Tech: Email: contact@digeetech.com | Sales Email: sales@digeetech.com | Phone: +65 6789 0123 | WhatsApp: +65 8123 4567 | Address: Level 28, Marina Bay Financial Centre Tower 2, 10 Marina Boulevard, Singapore 018983. Office Working Hours: Monday to Friday, 9:00 AM - 6:00 PM SGT.",
        tags: ["contact", "email", "phone", "whatsapp", "address", "hours"],
        lastUpdated: "2025-03-01",
        isCustom: false,
      },
      {
        id: "kb-pricing-1",
        title: "Published Service Pricing & Quotation Policy",
        category: "Pricing",
        content: "Digee Tech published starting prices in Singapore Dollars (SGD):\n- Web & Software Development: Starting from S$500\n- Enterprise AI Agents & Cognitive Systems: Starting from S$1,500\n- Cloud Architecture & DevOps: Starting from S$1,200\n- Custom ERP & CRM Systems: Starting from S$2,500\n- Singapore Local SEO & Digital Growth: Starting from S$800/month\n- Technical Masterclass Workshops: S$199 per participant\n- Technical Internships: S$1,000 - S$1,500/month stipend\n\nFor custom scope, enterprise multi-tenant platforms, or unlisted requirements, exact pricing is provided via a free formal SGD quotation upon project review. Contact sales@digeetech.com or click 'Chat on WhatsApp'.",
        tags: ["pricing", "cost", "sgd", "quote", "charges", "rates"],
        lastUpdated: "2025-03-01",
        isCustom: false,
      },
      {
        id: "kb-faq-1",
        title: "Frequently Asked Questions (FAQs)",
        category: "FAQ",
        content: "Q: How fast can Digee Tech start my project?\nA: Typically within 3 to 5 business days following requirement discovery and contract signature.\n\nQ: Who owns the intellectual property (IP) and source code?\nA: Clients retain 100% full intellectual property and source code ownership upon final payment.\n\nQ: Do you offer post-launch support and maintenance?\nA: Yes, all projects include 30 days of free bug-fix warranty and optional ongoing SLA maintenance packages.\n\nQ: Does Digee Tech build AI chatbots and agents?\nA: Yes, Digee Tech builds production-grade autonomous AI agents powered by Gemini, vector search RAG, and custom database integrations.",
        tags: ["faq", "ip", "timeline", "support", "ai agents"],
        lastUpdated: "2025-03-01",
        isCustom: false,
      },
      {
        id: "kb-policy-1",
        title: "Privacy Policy & Security Guarantees",
        category: "Policies",
        content: "Digee Tech enforces strict PDPA compliance, data encryption at rest (AES-256) and in transit (TLS 1.3), non-disclosure agreements (NDAs) before discovery, and secure Singapore Cloud Run container hosting. We never sell or expose client data.",
        tags: ["privacy", "security", "pdpa", "nda", "terms"],
        lastUpdated: "2025-03-01",
        isCustom: false,
      },
    ],
  };
}

class DatabaseManager {
  private data: DatabaseSchema;
  private isSaving: boolean = false;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        const initial = getInitialSeedData();
        return {
          ...initial,
          ...parsed,
          chatbotSettings: { ...initial.chatbotSettings, ...(parsed.chatbotSettings || {}) },
          knowledgeBase: Array.isArray(parsed.knowledgeBase) && parsed.knowledgeBase.length > 0 ? parsed.knowledgeBase : initial.knowledgeBase,
        };
      }
    } catch (err) {
      console.error("[DB] Error loading db file, re-initializing:", err);
    }
    const initial = getInitialSeedData();
    this.saveDataDirect(initial);
    return initial;
  }

  private saveDataDirect(data: DatabaseSchema) {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
      console.warn("[DB] Could not write store.json to disk (read-only environment):", err);
    }
  }

  public save() {
    if (this.isSaving) return;
    this.isSaving = true;
    setTimeout(() => {
      this.saveDataDirect(this.data);
      this.isSaving = false;
    }, 50);
  }

  public get(): DatabaseSchema {
    return this.data;
  }

  public logAudit(user: string, action: string, details: string, ip: string = "127.0.0.1") {
    const log: AuditLogItem = {
      id: "log-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      user,
      action,
      details,
      ip,
      timestamp: new Date().toISOString(),
    };
    this.data.auditLogs.unshift(log);
    if (this.data.auditLogs.length > 500) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 500);
    }
    this.save();
  }
}

export const db = new DatabaseManager();
