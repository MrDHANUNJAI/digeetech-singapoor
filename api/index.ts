import express from "express";
import { apiRouter } from "../server/routes";
import { serverLoggerMiddleware, serverNotFoundHandler, serverErrorHandler } from "../server/logger";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Attach logging tracer middleware
app.use(serverLoggerMiddleware);

// Route handlers for Vercel Serverless Function
app.use("/api", apiRouter);
app.use("/", apiRouter);

// Attach 404 and 500 tracing handlers
app.use(serverNotFoundHandler);
app.use(serverErrorHandler);

export default app;
