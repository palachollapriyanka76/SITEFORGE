import { Router } from "express";
import { requireAuth, getAuth } from "@clerk/express";
import { prisma } from "@siteforge/database";
import { z } from "zod";
const router = Router();
// Validation schemas
const createWebsiteSchema = z.object({
    name: z.string().min(1).max(100),
    slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
    description: z.string().max(500).optional(),
    templateId: z.string().optional(),
});
const updateWebsiteSchema = z.object({
    name: z.string().min(1).max(100).optional(),
    slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/).optional(),
    description: z.string().max(500).optional(),
    config: z.record(z.unknown()).optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});
// GET /api/websites — List user's websites
router.get("/", requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId)
            return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user)
            return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });
        const websites = await prisma.website.findMany({
            where: { userId: user.id },
            include: { pages: { select: { id: true, title: true, slug: true } } },
            orderBy: { updatedAt: "desc" },
        });
        return res.json({ success: true, data: websites });
    }
    catch (error) {
        console.error("Error fetching websites:", error);
        return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch websites" } });
    }
});
// POST /api/websites — Create a new website
router.post("/", requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId)
            return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
        const parsed = createWebsiteSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Invalid input", details: parsed.error.flatten() } });
        }
        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user)
            return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });
        const website = await prisma.website.create({
            data: {
                ...parsed.data,
                userId: user.id,
            },
        });
        // Create default homepage
        await prisma.page.create({
            data: {
                websiteId: website.id,
                title: "Home",
                slug: "home",
                isHomepage: true,
                components: [],
            },
        });
        return res.status(201).json({ success: true, data: website });
    }
    catch (error) {
        console.error("Error creating website:", error);
        return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to create website" } });
    }
});
// GET /api/websites/:id — Get a single website
router.get("/:id", requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId)
            return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user)
            return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });
        const website = await prisma.website.findFirst({
            where: { id: req.params.id, userId: user.id },
            include: { pages: true },
        });
        if (!website)
            return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Website not found" } });
        return res.json({ success: true, data: website });
    }
    catch (error) {
        console.error("Error fetching website:", error);
        return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch website" } });
    }
});
// PATCH /api/websites/:id — Update a website
router.patch("/:id", requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId)
            return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
        const parsed = updateWebsiteSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Invalid input", details: parsed.error.flatten() } });
        }
        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user)
            return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });
        const website = await prisma.website.updateMany({
            where: { id: req.params.id, userId: user.id },
            data: {
                name: parsed.data.name,
                slug: parsed.data.slug,
                description: parsed.data.description,
                status: parsed.data.status,
                config: parsed.data.config,
                ...(parsed.data.status === "PUBLISHED" ? { publishedAt: new Date() } : {}),
            },
        });
        if (website.count === 0)
            return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Website not found" } });
        return res.json({ success: true, data: { updated: true } });
    }
    catch (error) {
        console.error("Error updating website:", error);
        return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to update website" } });
    }
});
// DELETE /api/websites/:id — Delete a website
router.delete("/:id", requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId)
            return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user)
            return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });
        const result = await prisma.website.deleteMany({
            where: { id: req.params.id, userId: user.id },
        });
        if (result.count === 0)
            return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Website not found" } });
        return res.json({ success: true, data: { deleted: true } });
    }
    catch (error) {
        console.error("Error deleting website:", error);
        return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to delete website" } });
    }
});
// GET /api/websites/:id/json — Get website in WebsiteJSON format
router.get("/:id/json", requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId)
            return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user)
            return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });
        const website = await prisma.website.findFirst({
            where: { id: req.params.id, userId: user.id },
            include: { pages: true },
        });
        if (!website)
            return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Website not found" } });
        const config = website.config || {};
        const result = {
            meta: config.meta || {
                title: website.name,
                description: website.description || "",
                favicon: website.faviconUrl || "🌐",
                keywords: []
            },
            theme: config.theme || {
                primaryColor: config.colorTheme || "#0f172a",
                secondaryColor: "#334155",
                accentColor: "#3b82f6",
                fontFamily: "Inter",
                style: config.style || "modern"
            },
            globalSettings: config.globalSettings || {
                navbarStyle: "glass",
                footerStyle: "simple",
                whatsappButton: config.whatsappEnabled !== undefined ? config.whatsappEnabled : true,
                whatsappNumber: config.whatsappNumber || null
            },
            pages: website.pages.sort((a, b) => a.order - b.order).map(page => ({
                name: page.title,
                slug: page.slug === "home" ? "/" : `/${page.slug}`,
                sections: page.components || []
            }))
        };
        return res.json({ success: true, data: result });
    }
    catch (error) {
        console.error("Error fetching website JSON:", error);
        return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch website JSON" } });
    }
});
// PATCH /api/websites/:id/json — Save website config and pages
router.patch("/:id/json", requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId)
            return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user)
            return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });
        const websiteId = req.params.id;
        const website = await prisma.website.findFirst({
            where: { id: websiteId, userId: user.id }
        });
        if (!website)
            return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Website not found" } });
        const websiteJson = req.body;
        if (!websiteJson || !websiteJson.pages || !websiteJson.theme || !websiteJson.meta) {
            return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Invalid WebsiteJSON structure" } });
        }
        const { meta, theme, globalSettings, pages } = websiteJson;
        await prisma.$transaction([
            prisma.website.update({
                where: { id: websiteId },
                data: {
                    description: meta.description || website.description,
                    config: {
                        meta,
                        theme,
                        globalSettings
                    }
                }
            }),
            prisma.page.deleteMany({
                where: { websiteId: websiteId }
            }),
            ...pages.map((page, index) => {
                return prisma.page.create({
                    data: {
                        websiteId: websiteId,
                        title: page.name,
                        slug: page.slug === "/" ? "home" : page.slug.replace(/^\//, ""),
                        description: page.name + " Page",
                        isHomepage: page.slug === "/" || page.slug === "home",
                        components: page.sections,
                        order: index
                    }
                });
            })
        ]);
        return res.json({ success: true, data: { saved: true } });
    }
    catch (error) {
        console.error("Error saving website JSON:", error);
        return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to save website JSON" } });
    }
});
export default router;
//# sourceMappingURL=websites.js.map