export interface ClientLogEntry {
  id: string;
  timestamp: string;
  type: "API_500" | "API_404" | "NETWORK_ERROR" | "ROUTE_CHANGE" | "HASH_ROUTER_WARNING" | "UNHANDLED_ERROR";
  severity: "error" | "warning" | "info";
  path: string;
  details: string;
  meta?: any;
}

const STORAGE_KEY = "digeetech_tracer_logs_v1";
const maxLogs = 100;

class DiagnosticLogger {
  private logs: ClientLogEntry[] = [];

  constructor() {
    this.loadFromStorage();
    this.setupGlobalErrorListeners();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch {
      this.logs = [];
    }
  }

  private persist() {
    try {
      if (this.logs.length > maxLogs) {
        this.logs = this.logs.slice(-maxLogs);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.logs));
    } catch {}
  }

  public log(
    type: ClientLogEntry["type"],
    severity: ClientLogEntry["severity"],
    path: string,
    details: string,
    meta?: any
  ) {
    const entry: ClientLogEntry = {
      id: "log-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      type,
      severity,
      path,
      details,
      meta,
    };

    this.logs.unshift(entry);
    this.persist();

    const prefix = `[Vercel Client Tracer ${severity.toUpperCase()}]`;
    if (severity === "error") {
      console.error(prefix, path, details, meta);
    } else if (severity === "warning") {
      console.warn(prefix, path, details, meta);
    } else {
      console.log(prefix, path, details);
    }
  }

  public logApiError(status: number, url: string, statusText: string, errorBody?: any) {
    const type = status === 404 ? "API_404" : status === 500 ? "API_500" : "NETWORK_ERROR";
    const severity = status >= 500 ? "error" : "warning";
    this.log(
      type,
      severity,
      url,
      `HTTP ${status} ${statusText}: ${typeof errorBody === "object" ? JSON.stringify(errorBody) : errorBody || "No response body"}`,
      { status, statusText, errorBody }
    );
  }

  public logRouteChange(from: string, to: string, isHashRouter: boolean) {
    this.log(
      "ROUTE_CHANGE",
      "info",
      to,
      `Navigated from "${from}" to "${to}" (Router mode: ${isHashRouter ? "HashRouter (#)" : "BrowserRouter"})`,
      { from, to, isHashRouter }
    );
  }

  public logHashRouterIssue(hashPath: string, realPath: string) {
    this.log(
      "HASH_ROUTER_WARNING",
      "warning",
      realPath,
      `Hash path mismatch detected! Hash is "${hashPath}", pathname is "${realPath}". Standardizing navigation to prevent Vercel 404.`,
      { hashPath, realPath }
    );
  }

  public getLogs(): ClientLogEntry[] {
    return [...this.logs];
  }

  public clearLogs() {
    this.logs = [];
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  private setupGlobalErrorListeners() {
    if (typeof window === "undefined") return;

    window.addEventListener("error", (event) => {
      this.log(
        "UNHANDLED_ERROR",
        "error",
        window.location.pathname,
        `Unhandled error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`,
        { error: event.error?.stack }
      );
    });

    window.addEventListener("unhandledrejection", (event) => {
      this.log(
        "UNHANDLED_ERROR",
        "error",
        window.location.pathname,
        `Unhandled Promise Rejection: ${event.reason?.message || event.reason}`,
        { reason: event.reason }
      );
    });

    // Attach global helper to window for easy debugging in production browser console
    (window as any).__DIGEE_TRACE_LOGS__ = () => {
      console.table(this.logs);
      return this.logs;
    };
  }
}

export const logger = new DiagnosticLogger();
