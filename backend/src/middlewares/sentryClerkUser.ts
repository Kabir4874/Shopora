import { getAuth } from "@clerk/express";
import * as Sentry from "@sentry/node";
import type { RequestHandler } from "express";

export const sentryClerkUserMiddleware: RequestHandler = (req, _res, next) => {
  const { userId } = getAuth(req);
  Sentry.getIsolationScope().setUser(userId ? { id: userId } : null);
  next();
};
