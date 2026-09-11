// API Client for Digee Tech Singapore

const API_BASE = "/api";

export interface ApiResponse<T = any> {
  success?: boolean;
  error?: string;
  data?: T;
}

export function getAuthToken(): string | null {
  return localStorage.getItem("digee_auth_token");
}

export function setAuthToken(token: string) {
  localStorage.setItem("digee_auth_token", token);
}

export function removeAuthToken() {
  localStorage.removeItem("digee_auth_token");
  localStorage.removeItem("digee_admin_user");
}

export function getStoredAdminUser() {
  const user = localStorage.getItem("digee_admin_user");
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

export function setStoredAdminUser(user: any) {
  localStorage.setItem("digee_admin_user", JSON.stringify(user));
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `HTTP error ${response.status}`);
  }

  return data;
}

export const api = {
  // Public Telemetry
  recordVisit: () => request<{ status: string }>("/telemetry/visit", { method: "POST" }).catch(() => {}),

  // Auth
  login: (credentials: { email: string; password: string }) =>
    request<{ success: boolean; token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  getMe: () => request<{ user: any }>("/auth/me"),
  changePassword: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) =>
    request<{ success: boolean; message: string }>("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  logout: () => request<{ success: boolean }>("/auth/logout", { method: "POST" }),

  // Dashboard & Stats
  getDashboardStats: () => request<any>("/stats/dashboard"),

  // CMS Settings
  getSettings: () => request<any>("/cms/settings"),
  updateSettings: (settings: any) =>
    request<any>("/cms/settings", { method: "PUT", body: JSON.stringify(settings) }),

  // Services
  getServices: () => request<any[]>("/services"),
  getService: (idOrSlug: string) => request<any>(`/services/${idOrSlug}`),
  createService: (service: any) =>
    request<any>("/services", { method: "POST", body: JSON.stringify(service) }),
  updateService: (id: string, service: any) =>
    request<any>(`/services/${id}`, { method: "PUT", body: JSON.stringify(service) }),
  deleteService: (id: string) => request<any>(`/services/${id}`, { method: "DELETE" }),

  // Solutions
  getSolutions: () => request<any[]>("/solutions"),
  createSolution: (solution: any) =>
    request<any>("/solutions", { method: "POST", body: JSON.stringify(solution) }),
  updateSolution: (id: string, solution: any) =>
    request<any>(`/solutions/${id}`, { method: "PUT", body: JSON.stringify(solution) }),
  deleteSolution: (id: string) => request<any>(`/solutions/${id}`, { method: "DELETE" }),

  // Projects
  getProjects: () => request<any[]>("/projects"),
  getProject: (idOrSlug: string) => request<any>(`/projects/${idOrSlug}`),
  createProject: (project: any) =>
    request<any>("/projects", { method: "POST", body: JSON.stringify(project) }),
  updateProject: (id: string, project: any) =>
    request<any>(`/projects/${id}`, { method: "PUT", body: JSON.stringify(project) }),
  deleteProject: (id: string) => request<any>(`/projects/${id}`, { method: "DELETE" }),

  // Testimonials
  getTestimonials: () => request<any[]>("/testimonials"),
  createTestimonial: (test: any) =>
    request<any>("/testimonials", { method: "POST", body: JSON.stringify(test) }),
  updateTestimonial: (id: string, test: any) =>
    request<any>(`/testimonials/${id}`, { method: "PUT", body: JSON.stringify(test) }),
  deleteTestimonial: (id: string) => request<any>(`/testimonials/${id}`, { method: "DELETE" }),

  // Staff
  getStaff: () => request<any[]>("/staff"),
  createStaff: (staff: any) =>
    request<any>("/staff", { method: "POST", body: JSON.stringify(staff) }),
  updateStaff: (id: string, staff: any) =>
    request<any>(`/staff/${id}`, { method: "PUT", body: JSON.stringify(staff) }),
  deleteStaff: (id: string) => request<any>(`/staff/${id}`, { method: "DELETE" }),

  // Internships
  getInternships: () => request<any[]>("/internships"),
  createInternship: (intern: any) =>
    request<any>("/internships", { method: "POST", body: JSON.stringify(intern) }),
  updateInternship: (id: string, intern: any) =>
    request<any>(`/internships/${id}`, { method: "PUT", body: JSON.stringify(intern) }),
  deleteInternship: (id: string) => request<any>(`/internships/${id}`, { method: "DELETE" }),
  applyInternship: (application: any) =>
    request<{ success: boolean; message: string; applicationId: string }>("/internships/apply", {
      method: "POST",
      body: JSON.stringify(application),
    }),
  getApplicants: () => request<any[]>("/internships/applicants"),
  updateApplicantStatus: (id: string, status: string) =>
    request<any>(`/internships/applicants/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),

  // Workshops
  getWorkshops: () => request<any[]>("/workshops"),
  createWorkshop: (ws: any) =>
    request<any>("/workshops", { method: "POST", body: JSON.stringify(ws) }),
  updateWorkshop: (id: string, ws: any) =>
    request<any>(`/workshops/${id}`, { method: "PUT", body: JSON.stringify(ws) }),
  deleteWorkshop: (id: string) => request<any>(`/workshops/${id}`, { method: "DELETE" }),
  registerWorkshop: (data: any) =>
    request<{ success: boolean; message: string; participantId: string }>("/workshops/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getWorkshopParticipants: () => request<any[]>("/workshops/participants"),

  // Certificates & Verification
  verifyCertificate: (idOrHash: string) =>
    request<{ valid: boolean; certificate?: any; error?: string }>(`/certificates/verify/${encodeURIComponent(idOrHash)}`),
  getCertificates: () => request<any[]>("/certificates"),
  issueCertificate: (cert: any) =>
    request<any>("/certificates/issue", { method: "POST", body: JSON.stringify(cert) }),
  revokeCertificate: (id: string, reason: string) =>
    request<any>(`/certificates/${id}/revoke`, { method: "PUT", body: JSON.stringify({ reason }) }),
  deleteCertificate: (id: string) => request<any>(`/certificates/${id}`, { method: "DELETE" }),

  // Leads
  submitContactLead: (lead: any) =>
    request<{ success: boolean; message: string; leadId: string }>("/leads/contact", {
      method: "POST",
      body: JSON.stringify(lead),
    }),
  submitContactForm: (lead: any) =>
    request<{ success: boolean; message: string; leadId: string }>("/leads/contact", {
      method: "POST",
      body: JSON.stringify(lead),
    }),
  getLeads: () => request<any[]>("/leads"),
  updateLeadStatus: (id: string, status: string, notes?: string) =>
    request<any>(`/leads/${id}/status`, { method: "PUT", body: JSON.stringify({ status, notes }) }),
  deleteLead: (id: string) => request<any>(`/leads/${id}`, { method: "DELETE" }),

  // Quote Requests
  submitQuoteRequest: (quote: any) =>
    request<{ success: boolean; message: string; quoteId: string }>("/leads/quote", {
      method: "POST",
      body: JSON.stringify(quote),
    }),
  getQuotes: () => request<any[]>("/leads/quotes"),
  updateQuote: (id: string, data: { status?: string; quoteAmountSGD?: number }) =>
    request<any>(`/leads/quotes/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteQuote: (id: string) => request<any>(`/leads/quotes/${id}`, { method: "DELETE" }),

  // Blog
  getBlogPosts: () => request<any[]>("/blog"),
  getBlogPost: (slugOrId: string) => request<any>(`/blog/${slugOrId}`),
  createBlogPost: (post: any) =>
    request<any>("/blog", { method: "POST", body: JSON.stringify(post) }),
  updateBlogPost: (id: string, post: any) =>
    request<any>(`/blog/${id}`, { method: "PUT", body: JSON.stringify(post) }),
  deleteBlogPost: (id: string) => request<any>(`/blog/${id}`, { method: "DELETE" }),

  // Audit Logs
  getAuditLogs: () => request<any[]>("/audit-logs"),

  // Chatbot & Knowledge Base
  askChatbot: (query: string, history?: { role: string; content: string }[]) =>
    request<{
      answer: string;
      sources: { title: string; category: string }[];
      showWhatsAppButton?: boolean;
      whatsappUrl?: string;
      suggestedAction?: string;
    }>("/chatbot/ask", {
      method: "POST",
      body: JSON.stringify({ query, history }),
    }),
  getChatbotSettings: () => request<any>("/chatbot/settings"),
  updateChatbotSettings: (settings: any) =>
    request<any>("/chatbot/settings", { method: "PUT", body: JSON.stringify(settings) }),
  getKnowledgeBase: () =>
    request<{
      totalIndexedChunks: number;
      customKbItems: any[];
      indexedSources: { name: string; count: number }[];
    }>("/chatbot/knowledge"),
  addKbItem: (item: any) =>
    request<any>("/chatbot/knowledge", { method: "POST", body: JSON.stringify(item) }),
  updateKbItem: (id: string, item: any) =>
    request<any>(`/chatbot/knowledge/${id}`, { method: "PUT", body: JSON.stringify(item) }),
  deleteKbItem: (id: string) => request<any>(`/chatbot/knowledge/${id}`, { method: "DELETE" }),
  reindexKb: () => request<any>("/chatbot/reindex", { method: "POST" }),
};
