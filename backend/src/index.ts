import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { getEnv } from "./lib/env";
import { clerkWebhookHandler } from "./webhooks/clerk";

const app = express();
const env = getEnv();

const rawJson = express.raw({ type: "application/json", limit: "1mb" });

app.post("/webhooks/clerk", rawJson, (req, res) => {
  clerkWebhookHandler(req, res);
});

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.listen(env.PORT, () =>
  console.log(`Server is running in port: ${env.PORT}`),
);
