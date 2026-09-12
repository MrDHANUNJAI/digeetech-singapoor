import { Request, Response, NextFunction } from "express";

export interface LogEntry {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  method: string;
  url: string;
  status?: number;
  durationMs?: number;
  message?: string;
  stack?: string;
  ip?: string;
  userAgent?: string;
}

const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV;

export function serverLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
  const originalEnd = res.end;

  // Intercept completion to log duration and status
  res.end = function (...args: any[]) {
    const durationMs = Date.now() - startTime;
    const statusCode = res.statusCode;

    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: statusCode >= 500 ? "ERROR" : statusCode >= 400 ? "WARN" : "INFO",
      method: req.method,
      url: req.originalUrl || req.url,
      status: statusCode,
      durationMs,
      ip: (req.headers["x-forwarded-for"] as string) || req.ip || "127.0.0.1",
      userAgent: req.headers["user-agent"] || "unknown",
    };

    if (statusCode >= 400) {
      console.warn(`[VERCEL TRACER ${logEntry.level}] ${logEntry.method} ${logEntry.url} (${logEntry.status}) - ${durationMs}ms`);
    } else {
      console.log(`[VERCEL TRACER INFO] ${logEntry.method} ${logEntry.url} (${logEntry.status}) - ${durationMs}ms`);
    }

    return (originalEnd as any).apply(res, args);
  };

  next();
}

export function serverNotFoundHandler(req: Request, res: Response) {
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    level: "WARN",
    method: req.method,
    url: req.originalUrl || req.url,
    status: 404,
    message: `API Route Not Found on Vercel: ${req.method} ${req.url}`,
    ip: (req.headers["x-forwarded-for"] as string) || req.ip || "127.0.0.1",
  };

  console.warn(`[VERCEL TRACER 404] Route not found: ${req.method} ${req.originalUrl || req.url}`);

  return res.status(404).json({
    error: "API Endpoint Not Found",
    status: 404,
    path: req.originalUrl || req.url,
    timestamp: logEntry.timestamp,
    environment: isVercel ? "Vercel Serverless" : "Standard Express",
    suggestion: "Verify path mapping in vercel.json rewrites or server/routes.ts",
  });
}

export function serverErrorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    level: "ERROR",
    method: req.method,
    url: req.originalUrl || req.url,
    status: 500,
    message: err?.message || "Unhandled Internal Server Error",
    stack: err?.stack,
    ip: (req.headers["x-forwarded-for"] as string) || req.ip || "127.0.0.1",
  };

  console.error(`[VERCEL TRACER 500 ERROR] Exception on ${req.method} ${req.url}:`, err);

  return res.status(500).json({
    error: "Internal Server Error",
    status: 500,
    message: err?.message || "An unexpected error occurred",
    path: req.originalUrl || req.url,
    timestamp: logEntry.timestamp,
    environment: isVercel ? "Vercel Serverless" : "Standard Express",
    stack: process.env.NODE_ENV === "development" ? err?.stack : undefined,
  });
}
