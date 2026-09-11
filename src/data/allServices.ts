import { ServiceItem, ServiceCategoryGroup } from "./servicesCatalog";
import { servicesSoftwareDevelopment } from "./servicesCatalog";
import { servicesWebDevelopment, servicesMobileAppDevelopment } from "./servicesWebMobile";
import { servicesAI, servicesAutomation } from "./servicesAIAutomation";
import { servicesCloudDevOps, servicesCybersecurity, servicesITInfrastructure } from "./servicesCloudCyberIT";
import { servicesDesign, servicesMarketing, servicesBranding } from "./servicesDesignMarketingBranding";
import { servicesDataBI, servicesIoT, servicesEcommerce } from "./servicesDataIoTDrench";
import { servicesResearchDocumentation, servicesPresentations } from "./servicesResearchPresentations";

// Consolidated 100+ Services array across all 16 disciplines
export const allServices: ServiceItem[] = [
  ...servicesSoftwareDevelopment,
  ...servicesWebDevelopment,
  ...servicesMobileAppDevelopment,
  ...servicesAI,
  ...servicesAutomation,
  ...servicesCloudDevOps,
  ...servicesCybersecurity,
  ...servicesITInfrastructure,
  ...servicesDesign,
  ...servicesMarketing,
  ...servicesBranding,
  ...servicesDataBI,
  ...servicesIoT,
  ...servicesEcommerce,
  ...servicesResearchDocumentation,
  ...servicesPresentations
];

// Complete 16 Category Groups
export const serviceCategoryGroups: ServiceCategoryGroup[] = [
  {
    key: "software-development",
    name: "Software Development",
    code: "CAT-A",
    description: "Enterprise software, custom web applications, SaaS platforms, ERP, CRM, and bespoke business systems.",
    icon: "Code2",
    services: servicesSoftwareDevelopment
  },
  {
    key: "web-development",
    name: "Web Development",
    code: "CAT-B",
    description: "Corporate web portals, fast landing pages, Headless CMS, Jamstack, and high-performance business websites.",
    icon: "Globe",
    services: servicesWebDevelopment
  },
  {
    key: "mobile-app-development",
    name: "Mobile App Development",
    code: "CAT-C",
    description: "Native iOS (Swift), Android (Kotlin), and cross-platform Flutter/React Native mobile applications.",
    icon: "Smartphone",
    services: servicesMobileAppDevelopment
  },
  {
    key: "ai-artificial-intelligence",
    name: "AI & Artificial Intelligence",
    code: "CAT-D",
    description: "Generative AI, autonomous agents, RAG enterprise knowledge search, multimodal OCR, and AI strategy.",
    icon: "Sparkles",
    services: servicesAI
  },
  {
    key: "automation-rpa",
    name: "Automation & RPA",
    code: "CAT-E",
    description: "End-to-end business process automation, robotic UI bots, CRM sync, invoice pipelines, and API integrations.",
    icon: "Zap",
    services: servicesAutomation
  },
  {
    key: "cloud-devops",
    name: "Cloud & DevOps",
    code: "CAT-F",
    description: "AWS, Azure & Google Cloud architecture, automated CI/CD pipelines, Docker/Kubernetes, and FinOps cost reduction.",
    icon: "Cloud",
    services: servicesCloudDevOps
  },
  {
    key: "cybersecurity",
    name: "Cybersecurity Solutions",
    code: "CAT-G",
    description: "Vulnerability assessments, penetration testing, WAF edge protection, and Singapore PDPA compliance support.",
    icon: "ShieldCheck",
    services: servicesCybersecurity
  },
  {
    key: "it-digital-infrastructure",
    name: "IT & Digital Infrastructure",
    code: "CAT-H",
    description: "Strategic IT consulting, system integrations, database administration, and corporate Google Workspace / M365.",
    icon: "Server",
    services: servicesITInfrastructure
  },
  {
    key: "ui-ux-product-design",
    name: "UI/UX & Product Design",
    code: "CAT-I",
    description: "Human-centered Figma wireframing, SaaS product dashboards, design systems, and clickable prototype testing.",
    icon: "Layout",
    services: servicesDesign
  },
  {
    key: "digital-marketing",
    name: "Digital Marketing & SEO",
    code: "CAT-J",
    description: "Google Singapore SEO, Local Map Pack optimization, Meta & Google Ads performance marketing, and B2B lead funnels.",
    icon: "TrendingUp",
    services: servicesMarketing
  },
  {
    key: "branding-creative-services",
    name: "Branding & Creative Services",
    code: "CAT-K",
    description: "Corporate logo marks, typography scales, brand identity guidelines, and digital sales collateral.",
    icon: "Palette",
    services: servicesBranding
  },
  {
    key: "data-business-intelligence",
    name: "Data & Business Intelligence",
    code: "CAT-L",
    description: "Executive KPI dashboards, real-time sales reporting, Looker Studio/Power BI pipelines, and database tuning.",
    icon: "BarChart4",
    services: servicesDataBI
  },
  {
    key: "iot-smart-technology",
    name: "IoT & Smart Technology",
    code: "CAT-M",
    description: "Hardware sensor telemetry, cold chain monitoring, live GPS fleet tracking, and automated threshold alerts.",
    icon: "Radio",
    services: servicesIoT
  },
  {
    key: "research-documentation",
    name: "Research & Documentation",
    code: "CAT-N",
    description: "Enterprise RFP proposal writing, market feasibility studies, technical SOPs, and authoritative whitepapers.",
    icon: "FileSignature",
    services: servicesResearchDocumentation
  },
  {
    key: "presentation-business-documents",
    name: "Presentation & Decks",
    code: "CAT-O",
    description: "Investor pitch decks, executive keynote slides, annual reports, and interactive digital PDF brochures.",
    icon: "Presentation",
    services: servicesPresentations
  },
  {
    key: "ecommerce-digital-commerce",
    name: "E-commerce & Digital Commerce",
    code: "CAT-P",
    description: "Singapore PayNow QR & credit card checkout, multi-vendor marketplaces, and headless storefronts.",
    icon: "CreditCard",
    services: servicesEcommerce
  }
];

// Lookup Map for O(1) slug resolution
export const serviceSlugMap = new Map<string, ServiceItem>(
  allServices.map(service => [service.slug, service])
);

// Helper to get service by slug or fallback
export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return serviceSlugMap.get(slug);
}

// Helper to search services across names, keywords, descriptions, and tags
export function searchServices(query: string, categoryFilter?: string): ServiceItem[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  return allServices.filter(service => {
    const matchesCategory = !categoryFilter || categoryFilter === "all" || service.categoryKey === categoryFilter;
    if (!matchesCategory) return false;
    
    if (!normalizedQuery) return true;

    const searchableText = [
      service.name,
      service.tagline,
      service.shortDescription,
      service.category,
      ...(service.technologies || []),
      ...(service.features || []),
      ...(service.industries || []),
      service.problem || "",
      service.solution || ""
    ].join(" ").toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

// Featured Services for Home Page and Mega Menus
export const featuredServices = allServices.filter(s => s.featured);
