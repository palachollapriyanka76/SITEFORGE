import { Router } from "express";
import { prisma } from "@siteforge/database";
import { clerkClient } from "@clerk/express";
import { Webhook } from "svix";
import { verifyClerkToken } from "../middleware/auth.middleware.js";
const router = Router();
// GET /api/auth/check-email — Check if email already exists in local DB before Clerk creation
router.get("/check-email", async (req, res) => {
    const { email } = req.query;
    if (!email)
        return res.status(400).json({ exists: false, error: "Missing email parameter" });
    try {
        const user = await prisma.user.findFirst({
            where: { email: String(email).trim().toLowerCase() }
        });
        if (user) {
            return res.status(200).json({ exists: true, error: "This email is already registered. Please sign in instead." });
        }
        return res.status(200).json({ exists: false });
    }
    catch (error) {
        console.error("Check email database error:", error.message);
        return res.status(500).json({ exists: false, error: "Database query failed" });
    }
});
// =========================================================================
// POST /api/auth/sync-user — Sync authenticated Clerk user with local DB
// =========================================================================
router.post("/sync-user", verifyClerkToken, async (req, res) => {
    const clerkId = req.user?.clerkId;
    if (!clerkId) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    try {
        // Query Clerk API directly to fetch fresh profile properties
        const clerkUser = await clerkClient.users.getUser(clerkId);
        const email = clerkUser.emailAddresses[0]?.emailAddress || "";
        const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || null;
        const avatarUrl = clerkUser.imageUrl || null;
        const user = await prisma.user.upsert({
            where: { clerkId },
            update: {
                email,
                name,
                avatarUrl,
            },
            create: {
                clerkId,
                email,
                name,
                avatarUrl,
                plan: "FREE",
            },
        });
        return res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.error("❌ Error syncing user with local database:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to synchronize Clerk profile with local database."
        });
    }
});
// =========================================================================
// GET /api/auth/me — Retrieve authenticated user profile from local DB
// =========================================================================
router.get("/me", verifyClerkToken, async (req, res) => {
    const clerkId = req.user?.clerkId;
    if (!clerkId) {
        return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { clerkId },
            include: {
                subscription: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User profile not found in local database. Please trigger /sync-user."
            });
        }
        return res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.error("❌ Error fetching current user context:", error);
        return res.status(500).json({ success: false, error: "Database search failed." });
    }
});
// =========================================================================
// POST /api/auth/webhook — Clerk Event Webhook Handler
// =========================================================================
router.post("/webhook", async (req, res) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        console.error("❌ Missing CLERK_WEBHOOK_SECRET environment variable");
        return res.status(500).json({ error: "Server misconfigured" });
    }
    const svixId = req.headers["svix-id"];
    const svixTimestamp = req.headers["svix-timestamp"];
    const svixSignature = req.headers["svix-signature"];
    if (!svixId || !svixTimestamp || !svixSignature) {
        return res.status(400).json({ error: "Missing svix verification headers" });
    }
    try {
        const wh = new Webhook(WEBHOOK_SECRET);
        const evt = wh.verify(JSON.stringify(req.body), {
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature,
        });
        const eventType = evt.type;
        if (eventType === "user.created") {
            const { id, email_addresses, first_name, last_name, image_url } = evt.data;
            const newUser = await prisma.user.create({
                data: {
                    clerkId: id,
                    email: email_addresses[0]?.email_address || "",
                    name: `${first_name || ""} ${last_name || ""}`.trim() || null,
                    avatarUrl: image_url || null,
                    plan: "FREE",
                },
            });
            console.log("STEP 10: User Created - Database Record Cuid: " + newUser.id + ", Clerk ID: " + id);
            console.log(`✅ Webhook: User record generated for clerkId: ${id}`);
        }
        if (eventType === "user.updated") {
            const { id, email_addresses, first_name, last_name, image_url } = evt.data;
            await prisma.user.update({
                where: { clerkId: id },
                data: {
                    email: email_addresses[0]?.email_address,
                    name: `${first_name || ""} ${last_name || ""}`.trim() || null,
                    avatarUrl: image_url || null,
                },
            });
            console.log(`✅ Webhook: User record updated for clerkId: ${id}`);
        }
        if (eventType === "user.deleted") {
            const { id } = evt.data;
            await prisma.user.delete({
                where: { clerkId: id },
            });
            console.log(`✅ Webhook: User record deleted for clerkId: ${id}`);
        }
        return res.status(200).json({ received: true });
    }
    catch (err) {
        console.error("❌ Webhook processing error:", err);
        return res.status(400).json({ error: "Webhook verification failed" });
    }
});
export default router;
//# sourceMappingURL=auth.routes.js.map