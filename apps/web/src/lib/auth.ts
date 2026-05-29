import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

/**
 * Returns the current Clerk User object (server-side context)
 */
export async function getCurrentUser() {
  try {
    const user = await currentUser();
    return user;
  } catch (error) {
    console.error("❌ Error fetching current Clerk user:", error);
    return null;
  }
}

/**
 * Requires authentication and returns the clerkId,
 * otherwise redirects the client to /sign-in
 */
export async function requireAuth() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return userId;
}
