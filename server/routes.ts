import { Router, Request, Response } from "express";
import { db, ServiceItem, SolutionItem, ProjectItem, StaffMember, InternshipProgram, InternshipApplicant, WorkshopItem, WorkshopParticipant, CertificateRecord, LeadItem, QuoteRequestItem, BlogPostItem, ClientReview, KnowledgeBaseItem } from "./db";
import { loginHandler, changePasswordHandler, authMiddleware, AuthRequest } from "./auth";
import { answerWithRAG, getFullIndexedKnowledge } from "./ragEngine";

export const apiRouter = Router();

// ==========================================
// 1. AUTHENTICATION & ADMIN PROFILE
// ==========================================
apiRouter.post("/auth/login", loginHandler);
apiRouter.post("/auth/change-password", authMiddleware, changePasswordHandler);

apiRouter.get("/auth/me", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const user = state.users.find((u) => u.email === req.user?.email);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      lastLogin: user.lastLogin,
    },
  });
});

apiRouter.post("/auth/logout", authMiddleware, (req: AuthRequest, res: Response) => {
  db.logAudit(req.user?.email || "admin", "Admin Logout", "User signed out", req.ip || "127.0.0.1");
  res.json({ success: true, message: "Logged out successfully" });
});

// ==========================================
// 2. DASHBOARD & TELEMETRY
// ==========================================
apiRouter.post("/telemetry/visit", (req: Request, res: Response) => {
  const state = db.get();
  state.visitorStats.totalViews += 1;
  const today = new Date().toISOString().split("T")[0];
  const historyDay = state.visitorStats.history.find((h) => h.date === today);
  if (historyDay) {
    historyDay.views += 1;
  } else {
    state.visitorStats.history.push({ date: today, views: 1, leads: 0 });
    if (state.visitorStats.history.length > 30) {
      state.visitorStats.history = state.visitorStats.history.slice(-30);
    }
  }
  db.save();
  res.json({ status: "recorded" });
});

apiRouter.get("/stats/dashboard", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const pendingLeads = state.leads.filter((l) => l.status === "New").length;
  const activeQuotes = state.quoteRequests.filter((q) => q.status === "New" || q.status === "Reviewing").length;
  const activeInternApplicants = state.applicants.filter((a) => a.status === "Applied" || a.status === "Under Review").length;
  const activeCertificates = state.certificates.filter((c) => c.status === "Active").length;

  res.json({
    metrics: {
      totalVisitors: state.visitorStats.totalViews,
      totalLeads: state.leads.length,
      pendingLeads,
      totalQuoteRequests: state.quoteRequests.length,
      activeQuotes,
      totalServices: state.services.length,
      totalProjects: state.projects.length,
      totalStaff: state.staff.length,
      totalInternships: state.internships.length,
      internApplicants: state.applicants.length,
      pendingInternApplicants: activeInternApplicants,
      totalWorkshops: state.workshops.length,
      totalCertificates: state.certificates.length,
      activeCertificates,
      totalBlogPosts: state.blogPosts.length,
      totalTestimonials: state.testimonials.length,
    },
    visitorHistory: state.visitorStats.history,
    recentActivity: state.auditLogs.slice(0, 10),
    recentLeads: state.leads.slice(0, 5),
    recentQuotes: state.quoteRequests.slice(0, 5),
  });
});

// ==========================================
// 3. CMS & SITE SETTINGS
// ==========================================
apiRouter.get("/cms/settings", (req: Request, res: Response) => {
  const state = db.get();
  res.json(state.settings);
});

apiRouter.put("/cms/settings", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  state.settings = { ...state.settings, ...req.body };
  db.save();
  db.logAudit(req.user?.email || "admin", "Settings Updated", "Updated company profile / site configuration", req.ip || "127.0.0.1");
  res.json({ success: true, settings: state.settings });
});

// ==========================================
// 4. SERVICES API
// ==========================================
apiRouter.get("/services", (req: Request, res: Response) => {
  const state = db.get();
  res.json(state.services);
});

apiRouter.get("/services/:idOrSlug", (req: Request, res: Response) => {
  const state = db.get();
  const item = state.services.find(
    (s) => s.id === req.params.idOrSlug || s.slug === req.params.idOrSlug
  );
  if (!item) return res.status(404).json({ error: "Service not found" });
  res.json(item);
});

apiRouter.post("/services", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const newService: ServiceItem = {
    id: "srv-" + Date.now(),
    title: req.body.title || "Untitled Service",
    slug: (req.body.title || "service").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    category: req.body.category || "Web & Software",
    categoryName: req.body.categoryName || "Digital Engineering",
    shortDesc: req.body.shortDesc || "",
    fullDesc: req.body.fullDesc || "",
    startingPriceSGD: Number(req.body.startingPriceSGD) || 500,
    deliveryEstimate: req.body.deliveryEstimate || "2 - 4 Weeks",
    features: req.body.features || [],
    deliverables: req.body.deliverables || [],
    isFeatured: Boolean(req.body.isFeatured),
    status: req.body.status || "active",
  };
  state.services.push(newService);
  db.save();
  db.logAudit(req.user?.email || "admin", "Service Created", `Created service: ${newService.title}`, req.ip || "127.0.0.1");
  res.status(201).json(newService);
});

apiRouter.put("/services/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.services.findIndex((s) => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Service not found" });

  state.services[index] = { ...state.services[index], ...req.body };
  db.save();
  db.logAudit(req.user?.email || "admin", "Service Updated", `Updated service: ${state.services[index].title}`, req.ip || "127.0.0.1");
  res.json(state.services[index]);
});

apiRouter.delete("/services/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.services.findIndex((s) => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Service not found" });

  const title = state.services[index].title;
  state.services.splice(index, 1);
  db.save();
  db.logAudit(req.user?.email || "admin", "Service Deleted", `Deleted service: ${title}`, req.ip || "127.0.0.1");
  res.json({ success: true, message: "Service removed" });
});

// ==========================================
// 5. SOLUTIONS API
// ==========================================
apiRouter.get("/solutions", (req: Request, res: Response) => {
  const state = db.get();
  res.json(state.solutions);
});

apiRouter.post("/solutions", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const newSol: SolutionItem = {
    id: "sol-" + Date.now(),
    title: req.body.title || "Untitled Solution",
    slug: (req.body.title || "solution").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    category: req.body.category || "Enterprise Software",
    description: req.body.description || "",
    keyBenefits: req.body.keyBenefits || [],
    targetAudience: req.body.targetAudience || "SMEs and Startups",
    startingPriceSGD: Number(req.body.startingPriceSGD) || 1500,
    timeline: req.body.timeline || "2 - 4 Weeks",
    icon: req.body.icon || "Zap",
    status: req.body.status || "active",
  };
  state.solutions.push(newSol);
  db.save();
  db.logAudit(req.user?.email || "admin", "Solution Created", `Created solution: ${newSol.title}`, req.ip || "127.0.0.1");
  res.status(201).json(newSol);
});

apiRouter.put("/solutions/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.solutions.findIndex((s) => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Solution not found" });

  state.solutions[index] = { ...state.solutions[index], ...req.body };
  db.save();
  db.logAudit(req.user?.email || "admin", "Solution Updated", `Updated solution: ${state.solutions[index].title}`, req.ip || "127.0.0.1");
  res.json(state.solutions[index]);
});

apiRouter.delete("/solutions/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.solutions.findIndex((s) => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Solution not found" });

  const title = state.solutions[index].title;
  state.solutions.splice(index, 1);
  db.save();
  db.logAudit(req.user?.email || "admin", "Solution Deleted", `Deleted solution: ${title}`, req.ip || "127.0.0.1");
  res.json({ success: true, message: "Solution removed" });
});

// ==========================================
// 6. PROJECTS / PORTFOLIO API
// ==========================================
apiRouter.get("/projects", (req: Request, res: Response) => {
  const state = db.get();
  res.json(state.projects);
});

apiRouter.get("/projects/:idOrSlug", (req: Request, res: Response) => {
  const state = db.get();
  const item = state.projects.find(
    (p) => p.id === req.params.idOrSlug || p.slug === req.params.idOrSlug
  );
  if (!item) return res.status(404).json({ error: "Project not found" });
  res.json(item);
});

apiRouter.post("/projects", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const newProj: ProjectItem = {
    id: "proj-" + Date.now(),
    title: req.body.title || "New Project",
    slug: (req.body.title || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    client: req.body.client || "Singapore Client",
    industry: req.body.industry || "Technology",
    category: req.body.category || "Web & Mobile App",
    summary: req.body.summary || "",
    description: req.body.description || "",
    techStack: req.body.techStack || [],
    impactMetrics: req.body.impactMetrics || [],
    testimonial: req.body.testimonial,
    featured: Boolean(req.body.featured),
    status: req.body.status || "published",
  };
  state.projects.push(newProj);
  db.save();
  db.logAudit(req.user?.email || "admin", "Project Created", `Added project: ${newProj.title}`, req.ip || "127.0.0.1");
  res.status(201).json(newProj);
});

apiRouter.put("/projects/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.projects.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Project not found" });

  state.projects[index] = { ...state.projects[index], ...req.body };
  db.save();
  db.logAudit(req.user?.email || "admin", "Project Updated", `Updated project: ${state.projects[index].title}`, req.ip || "127.0.0.1");
  res.json(state.projects[index]);
});

apiRouter.delete("/projects/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.projects.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Project not found" });

  const title = state.projects[index].title;
  state.projects.splice(index, 1);
  db.save();
  db.logAudit(req.user?.email || "admin", "Project Deleted", `Deleted project: ${title}`, req.ip || "127.0.0.1");
  res.json({ success: true, message: "Project deleted" });
});

// ==========================================
// 7. TESTIMONIALS API
// ==========================================
apiRouter.get("/testimonials", (req: Request, res: Response) => {
  const state = db.get();
  res.json(state.testimonials);
});

apiRouter.post("/testimonials", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const item: ClientReview = {
    id: "test-" + Date.now(),
    clientName: req.body.clientName || "Client",
    company: req.body.company || "Company",
    role: req.body.role || "Executive",
    review: req.body.review || "",
    rating: Number(req.body.rating) || 5,
    project: req.body.project || "Digital Solution",
    verified: Boolean(req.body.verified !== false),
    date: req.body.date || new Date().toISOString().split("T")[0],
    status: req.body.status || "published",
  };
  state.testimonials.push(item);
  db.save();
  db.logAudit(req.user?.email || "admin", "Testimonial Added", `Added testimonial from ${item.clientName}`, req.ip || "127.0.0.1");
  res.status(201).json(item);
});

apiRouter.put("/testimonials/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.testimonials.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Testimonial not found" });

  state.testimonials[index] = { ...state.testimonials[index], ...req.body };
  db.save();
  res.json(state.testimonials[index]);
});

apiRouter.delete("/testimonials/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.testimonials.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Testimonial not found" });

  state.testimonials.splice(index, 1);
  db.save();
  res.json({ success: true });
});

// ==========================================
// 8. STAFF MANAGEMENT API
// ==========================================
apiRouter.get("/staff", (req: Request, res: Response) => {
  const state = db.get();
  // Return all for admin, or filter active for public
  res.json(state.staff);
});

apiRouter.post("/staff", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const newStaff: StaffMember = {
    id: "staff-" + Date.now(),
    name: req.body.name || "Staff Member",
    jobTitle: req.body.jobTitle || "Engineer",
    department: req.body.department || "Engineering",
    bio: req.body.bio || "",
    skills: req.body.skills || [],
    experience: req.body.experience || "1+ Years",
    email: req.body.email || "",
    linkedin: req.body.linkedin || "",
    avatar: req.body.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    status: req.body.status || "active",
    order: state.staff.length + 1,
  };
  state.staff.push(newStaff);
  db.save();
  db.logAudit(req.user?.email || "admin", "Staff Created", `Added staff member: ${newStaff.name}`, req.ip || "127.0.0.1");
  res.status(201).json(newStaff);
});

apiRouter.put("/staff/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.staff.findIndex((s) => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Staff member not found" });

  state.staff[index] = { ...state.staff[index], ...req.body };
  db.save();
  db.logAudit(req.user?.email || "admin", "Staff Updated", `Updated staff: ${state.staff[index].name}`, req.ip || "127.0.0.1");
  res.json(state.staff[index]);
});

apiRouter.delete("/staff/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.staff.findIndex((s) => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Staff member not found" });

  const name = state.staff[index].name;
  state.staff.splice(index, 1);
  db.save();
  db.logAudit(req.user?.email || "admin", "Staff Removed", `Removed staff member: ${name}`, req.ip || "127.0.0.1");
  res.json({ success: true, message: "Staff removed" });
});

// ==========================================
// 9. INTERNSHIPS & APPLICANTS API
// ==========================================
apiRouter.get("/internships", (req: Request, res: Response) => {
  const state = db.get();
  res.json(state.internships);
});

apiRouter.post("/internships", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const prog: InternshipProgram = {
    id: "intern-" + Date.now(),
    title: req.body.title || "Internship Program",
    department: req.body.department || "Engineering",
    description: req.body.description || "",
    duration: req.body.duration || "3 - 6 Months",
    mode: req.body.mode || "Hybrid",
    location: req.body.location || "Singapore HQ",
    skills: req.body.skills || [],
    eligibility: req.body.eligibility || "University / Polytechnic students",
    deadline: req.body.deadline || "2025-12-31",
    stipend: req.body.stipend || "S$1,000 - S$1,500/month",
    status: req.body.status || "active",
  };
  state.internships.push(prog);
  db.save();
  db.logAudit(req.user?.email || "admin", "Internship Created", `Created program: ${prog.title}`, req.ip || "127.0.0.1");
  res.status(201).json(prog);
});

apiRouter.put("/internships/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.internships.findIndex((i) => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Internship program not found" });

  state.internships[index] = { ...state.internships[index], ...req.body };
  db.save();
  res.json(state.internships[index]);
});

apiRouter.delete("/internships/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.internships.findIndex((i) => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Internship not found" });

  state.internships.splice(index, 1);
  db.save();
  res.json({ success: true });
});

// Public Internship Application
apiRouter.post("/internships/apply", (req: Request, res: Response) => {
  const state = db.get();
  const { programId, name, email, phone, university, degree, graduationYear, coverNote, resumeUrl, portfolioUrl } = req.body;

  if (!name || !email || !university) {
    return res.status(400).json({ error: "Name, email, and university are required." });
  }

  const prog = state.internships.find((p) => p.id === programId);
  const applicant: InternshipApplicant = {
    id: "app-" + Date.now(),
    programId: programId || "general",
    programTitle: prog ? prog.title : "General Engineering Fellowship",
    name,
    email,
    phone: phone || "",
    university,
    degree: degree || "",
    graduationYear: graduationYear || "2026",
    resumeUrl: resumeUrl || "",
    portfolioUrl: portfolioUrl || "",
    coverNote: coverNote || "",
    appliedAt: new Date().toISOString(),
    status: "Applied",
  };

  state.applicants.unshift(applicant);
  db.save();
  db.logAudit("Public Candidate", "Internship Applied", `New applicant: ${name} for ${applicant.programTitle}`, req.ip || "127.0.0.1");

  res.status(201).json({
    success: true,
    message: "Your internship application has been successfully submitted to Digee Tech Singapore.",
    applicationId: applicant.id,
  });
});

apiRouter.get("/internships/applicants", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  res.json(state.applicants);
});

apiRouter.put("/internships/applicants/:id/status", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const app = state.applicants.find((a) => a.id === req.params.id);
  if (!app) return res.status(404).json({ error: "Applicant record not found" });

  const oldStatus = app.status;
  app.status = req.body.status;
  db.save();
  db.logAudit(req.user?.email || "admin", "Applicant Status Updated", `Updated applicant ${app.name} from ${oldStatus} to ${app.status}`, req.ip || "127.0.0.1");
  res.json({ success: true, applicant: app });
});

// ==========================================
// 10. WORKSHOPS & PARTICIPANTS API
// ==========================================
apiRouter.get("/workshops", (req: Request, res: Response) => {
  const state = db.get();
  res.json(state.workshops);
});

apiRouter.post("/workshops", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const ws: WorkshopItem = {
    id: "ws-" + Date.now(),
    title: req.body.title || "New Masterclass",
    description: req.body.description || "",
    date: req.body.date || new Date().toISOString().split("T")[0],
    duration: req.body.duration || "Full-Day",
    trainer: req.body.trainer || "Digee Tech Specialist",
    mode: req.body.mode || "Singapore On-Site",
    location: req.body.location || "Marina Bay, Singapore",
    priceSGD: Number(req.body.priceSGD) || 199,
    maxParticipants: Number(req.body.maxParticipants) || 30,
    registeredCount: 0,
    curriculum: req.body.curriculum || [],
    status: req.body.status || "Upcoming",
  };
  state.workshops.push(ws);
  db.save();
  db.logAudit(req.user?.email || "admin", "Workshop Created", `Created workshop: ${ws.title}`, req.ip || "127.0.0.1");
  res.status(201).json(ws);
});

apiRouter.put("/workshops/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.workshops.findIndex((w) => w.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Workshop not found" });

  state.workshops[index] = { ...state.workshops[index], ...req.body };
  db.save();
  res.json(state.workshops[index]);
});

apiRouter.delete("/workshops/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.workshops.findIndex((w) => w.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Workshop not found" });

  state.workshops.splice(index, 1);
  db.save();
  res.json({ success: true });
});

// Public Workshop Registration
apiRouter.post("/workshops/register", (req: Request, res: Response) => {
  const state = db.get();
  const { workshopId, name, email, phone, company, jobRole } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const ws = state.workshops.find((w) => w.id === workshopId);
  const part: WorkshopParticipant = {
    id: "part-" + Date.now(),
    workshopId: workshopId || "ws-general",
    workshopTitle: ws ? ws.title : "Tech Masterclass",
    name,
    email,
    phone: phone || "",
    company: company || "Independent",
    jobRole: jobRole || "Developer",
    registeredAt: new Date().toISOString(),
    certificateIssued: false,
    status: "Registered",
  };

  if (ws) {
    ws.registeredCount = (ws.registeredCount || 0) + 1;
  }

  state.participants.unshift(part);
  db.save();
  db.logAudit("Public Participant", "Workshop Registered", `${name} registered for ${part.workshopTitle}`, req.ip || "127.0.0.1");

  res.status(201).json({
    success: true,
    message: "Registration confirmed. You will receive email instructions and calendar invite.",
    participantId: part.id,
  });
});

apiRouter.get("/workshops/participants", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  res.json(state.participants);
});

// ==========================================
// 11. CERTIFICATES & VERIFICATION API
// ==========================================
// Public Verification Endpoint
apiRouter.get("/certificates/verify/:idOrHash", (req: Request, res: Response) => {
  const state = db.get();
  const query = req.params.idOrHash.trim().toUpperCase();
  const cert = state.certificates.find(
    (c) => c.id.toUpperCase() === query || c.verificationId.toUpperCase() === query
  );

  if (!cert) {
    return res.status(404).json({
      valid: false,
      error: "Certificate record not found in Digee Tech official registry.",
    });
  }

  res.json({
    valid: cert.status === "Active",
    certificate: cert,
  });
});

apiRouter.get("/certificates", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  res.json(state.certificates);
});

apiRouter.post("/certificates/issue", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  const prefix = req.body.category === "Internship" ? "ENG" : req.body.category === "Workshop" ? "AI" : "PRO";
  const customId = req.body.id || `DT-${year}-${prefix}-${randomSuffix}`;
  const verificationHash = "v-" + Math.random().toString(36).substring(2, 10) + "-" + Math.random().toString(36).substring(2, 6);

  const cert: CertificateRecord = {
    id: customId,
    verificationId: verificationHash,
    recipientName: req.body.recipientName,
    recipientEmail: req.body.recipientEmail || "",
    program: req.body.program || "Digital Engineering Masterclass",
    category: req.body.category || "Workshop",
    organization: "DIGEE TECH (Singapore)",
    issueDate: req.body.issueDate || new Date().toISOString().split("T")[0],
    completionDate: req.body.completionDate || new Date().toISOString().split("T")[0],
    gradeScore: req.body.gradeScore || "Distinction",
    skillsAcquired: req.body.skillsAcquired || ["Software Engineering", "Full-Stack Development"],
    status: "Active",
    issuedBy: req.body.issuedBy || (req.user?.name ? `${req.user.name} (Digee Tech)` : "Chief Technology Architect"),
    verificationUrl: `/verify-certificate/${customId}`,
  };

  state.certificates.unshift(cert);
  db.save();
  db.logAudit(req.user?.email || "admin", "Certificate Issued", `Issued certificate ${cert.id} to ${cert.recipientName}`, req.ip || "127.0.0.1");

  res.status(201).json(cert);
});

apiRouter.put("/certificates/:id/revoke", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const cert = state.certificates.find((c) => c.id === req.params.id);
  if (!cert) return res.status(404).json({ error: "Certificate not found" });

  cert.status = "Revoked";
  cert.revokedReason = req.body.reason || "Revoked by administrator";
  db.save();
  db.logAudit(req.user?.email || "admin", "Certificate Revoked", `Revoked certificate ${cert.id}: ${cert.revokedReason}`, req.ip || "127.0.0.1");
  res.json({ success: true, certificate: cert });
});

apiRouter.delete("/certificates/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.certificates.findIndex((c) => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Certificate not found" });

  const id = state.certificates[index].id;
  state.certificates.splice(index, 1);
  db.save();
  db.logAudit(req.user?.email || "admin", "Certificate Deleted", `Deleted certificate ${id}`, req.ip || "127.0.0.1");
  res.json({ success: true });
});

// ==========================================
// 12. LEADS & CONTACT ENQUIRIES API
// ==========================================
apiRouter.post("/leads/contact", (req: Request, res: Response) => {
  const state = db.get();
  const { name, email, phone, company, service, budgetSGD, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const lead: LeadItem = {
    id: "lead-" + Date.now(),
    name,
    email,
    phone: phone || "",
    company: company || "Independent",
    service: service || "General Enquiry",
    budgetSGD: budgetSGD || "Under S$2,000",
    message: message || "",
    source: "Website Contact Form",
    createdAt: new Date().toISOString(),
    status: "New",
  };

  state.leads.unshift(lead);

  // Update day telemetry
  const today = new Date().toISOString().split("T")[0];
  const historyDay = state.visitorStats.history.find((h) => h.date === today);
  if (historyDay) historyDay.leads += 1;

  db.save();
  db.logAudit("Public User", "New Lead Generated", `Contact enquiry from ${name} (${company || "N/A"})`, req.ip || "127.0.0.1");

  res.status(201).json({
    success: true,
    message: "Thank you for contacting Digee Tech Singapore. Our team will review your inquiry and respond within 4 business hours.",
    leadId: lead.id,
  });
});

apiRouter.get("/leads", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  res.json(state.leads);
});

apiRouter.put("/leads/:id/status", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const lead = state.leads.find((l) => l.id === req.params.id);
  if (!lead) return res.status(404).json({ error: "Lead not found" });

  lead.status = req.body.status;
  if (req.body.notes) lead.notes = req.body.notes;
  db.save();
  db.logAudit(req.user?.email || "admin", "Lead Status Updated", `Lead ${lead.name} marked as ${lead.status}`, req.ip || "127.0.0.1");
  res.json({ success: true, lead });
});

apiRouter.delete("/leads/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.leads.findIndex((l) => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Lead not found" });

  state.leads.splice(index, 1);
  db.save();
  res.json({ success: true });
});

// ==========================================
// 13. QUOTE REQUESTS & ESTIMATOR API
// ==========================================
apiRouter.post("/leads/quote", (req: Request, res: Response) => {
  const state = db.get();
  const { name, company, email, phone, country, serviceCategory, projectType, estimatedBudgetSGD, timeline, requirements, deliverablesSelected } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const quote: QuoteRequestItem = {
    id: "quote-" + Date.now(),
    name,
    company: company || "N/A",
    email,
    phone: phone || "",
    country: country || "Singapore",
    serviceCategory: serviceCategory || "Custom Web & Software",
    projectType: projectType || "Business Application",
    estimatedBudgetSGD: estimatedBudgetSGD || "S$3,000 - S$8,000",
    timeline: timeline || "1 - 2 Months",
    requirements: requirements || "",
    deliverablesSelected: deliverablesSelected || [],
    createdAt: new Date().toISOString(),
    status: "New",
  };

  state.quoteRequests.unshift(quote);
  db.save();
  db.logAudit("Public User", "Quote Requested", `Quote request from ${name} (${company}) for ${quote.serviceCategory}`, req.ip || "127.0.0.1");

  res.status(201).json({
    success: true,
    message: "Your project scope has been successfully received. A Digee Tech solutions architect will prepare a formal Singapore Dollar estimate within 24 hours.",
    quoteId: quote.id,
  });
});

apiRouter.get("/leads/quotes", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  res.json(state.quoteRequests);
});

apiRouter.put("/leads/quotes/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const quote = state.quoteRequests.find((q) => q.id === req.params.id);
  if (!quote) return res.status(404).json({ error: "Quote request not found" });

  if (req.body.status) quote.status = req.body.status;
  if (req.body.quoteAmountSGD !== undefined) quote.quoteAmountSGD = Number(req.body.quoteAmountSGD);
  db.save();
  db.logAudit(req.user?.email || "admin", "Quote Updated", `Updated quote ${quote.id} to ${quote.status}`, req.ip || "127.0.0.1");
  res.json({ success: true, quote });
});

apiRouter.delete("/leads/quotes/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.quoteRequests.findIndex((q) => q.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Quote not found" });

  state.quoteRequests.splice(index, 1);
  db.save();
  res.json({ success: true });
});

// ==========================================
// 14. BLOG & TECH INSIGHTS API
// ==========================================
apiRouter.get("/blog", (req: Request, res: Response) => {
  const state = db.get();
  res.json(state.blogPosts);
});

apiRouter.get("/blog/:slugOrId", (req: Request, res: Response) => {
  const state = db.get();
  const post = state.blogPosts.find((p) => p.slug === req.params.slugOrId || p.id === req.params.slugOrId);
  if (!post) return res.status(404).json({ error: "Article not found" });
  res.json(post);
});

apiRouter.post("/blog", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const post: BlogPostItem = {
    id: "post-" + Date.now(),
    title: req.body.title || "New Article",
    slug: (req.body.title || "article").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    category: req.body.category || "AI & Automation",
    readTime: req.body.readTime || "5 min read",
    publishDate: req.body.publishDate || new Date().toISOString().split("T")[0],
    author: req.body.author || "Digee Tech Editorial",
    authorRole: req.body.authorRole || "Technical Team",
    summary: req.body.summary || "",
    content: req.body.content || "",
    tags: req.body.tags || [],
    featured: Boolean(req.body.featured),
    status: req.body.status || "published",
  };
  state.blogPosts.unshift(post);
  db.save();
  db.logAudit(req.user?.email || "admin", "Blog Post Created", `Published article: ${post.title}`, req.ip || "127.0.0.1");
  res.status(201).json(post);
});

apiRouter.put("/blog/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.blogPosts.findIndex((b) => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Article not found" });

  state.blogPosts[index] = { ...state.blogPosts[index], ...req.body };
  db.save();
  res.json(state.blogPosts[index]);
});

apiRouter.delete("/blog/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  const index = state.blogPosts.findIndex((b) => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Article not found" });

  state.blogPosts.splice(index, 1);
  db.save();
  res.json({ success: true });
});

// ==========================================
// 15. AUDIT LOGS API
// ==========================================
apiRouter.get("/audit-logs", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  res.json(state.auditLogs);
});

// ==========================================
// 16. WEBSITE KNOWLEDGE-BASED AI CHATBOT API
// ==========================================
// Public Chatbot Query Endpoint (RAG)
apiRouter.post("/chatbot/ask", async (req: Request, res: Response) => {
  try {
    const { query, history } = req.body;
    if (!query || typeof query !== "string" || !query.trim()) {
      return res.status(400).json({ error: "Query parameter is required." });
    }

    const response = await answerWithRAG(query.trim(), Array.isArray(history) ? history : []);
    res.json(response);
  } catch (err: any) {
    console.error("[Chatbot API] Error processing question:", err);
    res.status(500).json({
      answer: "Sorry, I'm having trouble accessing our website information right now. Please try again shortly or contact our team directly.",
      sources: [],
      showWhatsAppButton: true,
      whatsappUrl: `https://wa.me/6581234567?text=${encodeURIComponent("Hello Digee Tech team, I have an inquiry.")}`,
    });
  }
});

// Public / Admin Chatbot Settings
apiRouter.get("/chatbot/settings", (req: Request, res: Response) => {
  const state = db.get();
  res.json(state.chatbotSettings);
});

apiRouter.put("/chatbot/settings", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  state.chatbotSettings = { ...state.chatbotSettings, ...req.body };
  db.save();
  db.logAudit(req.user?.email || "admin", "Chatbot Settings Updated", "Updated AI Chatbot configuration and greetings", req.ip || "127.0.0.1");
  res.json({ success: true, settings: state.chatbotSettings });
});

// Knowledge Base Management API (Admin & RAG Index Stats)
apiRouter.get("/chatbot/knowledge", (req: Request, res: Response) => {
  const state = db.get();
  const allChunks = getFullIndexedKnowledge();

  res.json({
    totalIndexedChunks: allChunks.length,
    customKbItems: state.knowledgeBase || [],
    indexedSources: [
      { name: "Services Catalog", count: state.services.length },
      { name: "Solutions Architectures", count: state.solutions.length },
      { name: "Case Studies / Portfolio", count: state.projects.length },
      { name: "Blog Posts & Research", count: state.blogPosts.length },
      { name: "Team Members", count: state.staff.length },
      { name: "Internships & Workshops", count: state.internships.length + state.workshops.length },
      { name: "Custom FAQs & KB Entries", count: (state.knowledgeBase || []).length },
    ],
  });
});

apiRouter.post("/chatbot/knowledge", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  if (!state.knowledgeBase) state.knowledgeBase = [];

  const newItem: KnowledgeBaseItem = {
    id: "kb-custom-" + Date.now(),
    title: req.body.title || "Custom FAQ / KB Entry",
    category: req.body.category || "FAQ",
    content: req.body.content || "",
    tags: Array.isArray(req.body.tags) ? req.body.tags : (req.body.tags || "").split(",").map((t: string) => t.trim()),
    lastUpdated: new Date().toISOString().split("T")[0],
    isCustom: true,
  };

  state.knowledgeBase.unshift(newItem);
  db.save();
  db.logAudit(req.user?.email || "admin", "KB Item Added", `Added Knowledge Base entry: ${newItem.title}`, req.ip || "127.0.0.1");
  res.status(201).json(newItem);
});

apiRouter.put("/chatbot/knowledge/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  if (!state.knowledgeBase) state.knowledgeBase = [];

  const index = state.knowledgeBase.findIndex((k) => k.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Knowledge Base item not found" });

  state.knowledgeBase[index] = {
    ...state.knowledgeBase[index],
    ...req.body,
    lastUpdated: new Date().toISOString().split("T")[0],
  };
  db.save();
  db.logAudit(req.user?.email || "admin", "KB Item Updated", `Updated KB item: ${state.knowledgeBase[index].title}`, req.ip || "127.0.0.1");
  res.json(state.knowledgeBase[index]);
});

apiRouter.delete("/chatbot/knowledge/:id", authMiddleware, (req: AuthRequest, res: Response) => {
  const state = db.get();
  if (!state.knowledgeBase) state.knowledgeBase = [];

  const index = state.knowledgeBase.findIndex((k) => k.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Knowledge Base item not found" });

  const title = state.knowledgeBase[index].title;
  state.knowledgeBase.splice(index, 1);
  db.save();
  db.logAudit(req.user?.email || "admin", "KB Item Deleted", `Deleted KB item: ${title}`, req.ip || "127.0.0.1");
  res.json({ success: true });
});

apiRouter.post("/chatbot/reindex", authMiddleware, (req: AuthRequest, res: Response) => {
  const allChunks = getFullIndexedKnowledge();
  db.logAudit(req.user?.email || "admin", "Website Re-Indexed", `Re-indexed ${allChunks.length} website knowledge chunks across all pages and databases`, req.ip || "127.0.0.1");
  res.json({
    success: true,
    message: `Successfully re-indexed ${allChunks.length} knowledge chunks from live website data.`,
    totalChunks: allChunks.length,
    timestamp: new Date().toISOString(),
  });
});
