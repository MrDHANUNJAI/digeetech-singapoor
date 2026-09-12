import express from "express";
import { apiRouter } from "../server/routes";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Route handlers for Vercel Serverless Function
app.use("/api", apiRouter);
app.use("/", apiRouter);

export default app;
