import { clerkMiddleware } from "@clerk/express";
import * as Sentry from "@sentry/node";
import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import fs from "node:fs";
import path from "node:path";
import keepAliveCron from "./lib/cron";
import { getEnv } from "./lib/env";
import { sentryClerkUserMiddleware } from "./middlewares/sentryClerkUser";
import adminRouter from "./routes/adminRouter";
import checkoutRouter from "./routes/checkoutRouter";
import meRouter from "./routes/meRouter";
import productRouter from "./routes/productRouter";
import streamRouter from "./routes/streamRouter";
import { clerkWebhookHandler } from "./webhooks/clerk";
import { polarWebhookHandler } from "./webhooks/polar";

const app = express();
const env = getEnv();

const rawJson = express.raw({ type: "application/json", limit: "1mb" });

app.post("/webhooks/clerk", rawJson, (req, res) => {
  clerkWebhookHandler(req, res);
});
app.post("/webhooks/polar", rawJson, (req, res) => {
  polarWebhookHandler(req, res);
});

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
app.use(sentryClerkUserMiddleware);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/me", meRouter);
app.use("/api/products", productRouter);
app.use("/api/stream", streamRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/admin", adminRouter);

const publicDir = path.join(process.cwd(), "public");
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get("/{*any}", (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }

    if (req.path.startsWith("/api") || req.path.startsWith("/webhooks")) {
      next();
      return;
    }

    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

Sentry.setupExpressErrorHandler(app);
app.use((_err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const sentryId = (res as Response & { sentry?: string }).sentry;

  res.status(500).json({
    error: "Internal server error",
    ...(sentryId !== undefined && { sentryId }),
  });
});

app.listen(env.PORT, () => {
  console.log(`Server is running in port: ${env.PORT}`);
  if (env.NODE_ENV === "production") {
    keepAliveCron.start();
  }
});
