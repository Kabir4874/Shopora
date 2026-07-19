import { eq } from "drizzle-orm";
import { createClerkClient } from "@clerk/backend";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { getEnv } from "./env.js";

const clerkClient = createClerkClient({ secretKey: getEnv().CLERK_SECRET_KEY });

export async function getLocalUser(clerkUserId: string) {
  const [row] = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkUserId))
    .limit(1);
  return row;
}

export async function ensureLocalUser(clerkUserId: string) {
  const existing = await getLocalUser(clerkUserId);
  if (existing) return existing;

  const clerkUser = await clerkClient.users.getUser(clerkUserId);

  const email =
    clerkUser.emailAddresses?.find(
      (e) => e.id === clerkUser.primaryEmailAddressId,
    )?.emailAddress ??
    clerkUser.emailAddresses?.[0]?.emailAddress ??
    null;

  const displayName =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
    clerkUser.username ||
    null;

  const role =
    clerkUser.publicMetadata?.role === "support" ||
    clerkUser.publicMetadata?.role === "admin"
      ? clerkUser.publicMetadata.role
      : "customer";

  const [row] = await db
    .insert(users)
    .values({
      clerkUserId: clerkUser.id,
      email,
      displayName,
      role,
    })
    .onConflictDoUpdate({
      target: users.clerkUserId,
      set: { email, displayName, role, updatedAt: new Date() },
    })
    .returning();

  return row;
}
