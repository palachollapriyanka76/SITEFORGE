import { Router, Request, Response } from "express";
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
router.get("/", requireAuth(), async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });

    const websites = await prisma.website.findMany({
      where: { userId: user.id },
      include: { pages: { select: { id: true, title: true, slug: true } } },
      orderBy: { updatedAt: "desc" },
    });

    return res.json({ success: true, data: websites });
  } catch (error) {
    console.error("Error fetching websites:", error);
    return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch websites" } });
  }
});

// POST /api/websites — Create a new website
router.post("/", requireAuth(), async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });

    const parsed = createWebsiteSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Invalid input", details: parsed.error.flatten() } });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });

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
  } catch (error) {
    console.error("Error creating website:", error);
    return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to create website" } });
  }
});

// GET /api/websites/:id — Get a single website
router.get("/:id", requireAuth(), async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });

    const website = await prisma.website.findFirst({
      where: { id: req.params.id as string, userId: user.id },
      include: { pages: true },
    });

    if (!website) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Website not found" } });

    return res.json({ success: true, data: website });
  } catch (error) {
    console.error("Error fetching website:", error);
    return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch website" } });
  }
});

// PATCH /api/websites/:id — Update a website
router.patch("/:id", requireAuth(), async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });

    const parsed = updateWebsiteSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Invalid input", details: parsed.error.flatten() } });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });

    const website = await prisma.website.updateMany({
      where: { id: req.params.id as string, userId: user.id },
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description,
        status: parsed.data.status,
        config: parsed.data.config as any,
        ...(parsed.data.status === "PUBLISHED" ? { publishedAt: new Date() } : {}),
      },
    });

    if (website.count === 0) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Website not found" } });

    return res.json({ success: true, data: { updated: true } });
  } catch (error) {
    console.error("Error updating website:", error);
    return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to update website" } });
  }
});

// DELETE /api/websites/:id — Delete a website
router.delete("/:id", requireAuth(), async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });

    const result = await prisma.website.deleteMany({
      where: { id: req.params.id as string, userId: user.id },
    });

    if (result.count === 0) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Website not found" } });

    return res.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error("Error deleting website:", error);
    return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to delete website" } });
  }
});

export default router;
