import { Router, Request, Response } from "express";
import { requireAuth, getAuth } from "@clerk/express";
import { prisma } from "@siteforge/database";
import axios from "axios";

const router = Router();

// POST /api/ai/generate-website — Send AI generation request
router.post("/generate-website", requireAuth(), async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });

    const { businessName, businessType, description, style, colorPreference, pages } = req.body;

    // Create AI job record
    const job = await prisma.aIJob.create({
      data: {
        userId: user.id,
        type: "GENERATE_WEBSITE",
        status: "PENDING",
        prompt: JSON.stringify({ businessName, businessType, description, style, colorPreference, pages }),
        context: { businessName, businessType },
      },
    });

    // Forward to AI engine asynchronously
    const aiEngineUrl = process.env.NEXT_PUBLIC_AI_ENGINE_URL || "http://localhost:5001";
    axios.post(`${aiEngineUrl}/api/jobs/process`, {
      jobId: job.id,
      type: "GENERATE_WEBSITE",
      prompt: { businessName, businessType, description, style, colorPreference, pages },
    }).catch((err) => console.error("AI engine request failed:", err.message));

    return res.status(202).json({ success: true, data: { jobId: job.id, status: "PENDING" } });
  } catch (error) {
    console.error("AI generate error:", error);
    return res.status(500).json({ success: false, error: { code: "AI_ERROR", message: "Failed to start generation" } });
  }
});

// GET /api/ai/jobs/:id — Check AI job status
router.get("/jobs/:id", requireAuth(), async (req: Request, res: Response) => {
  try {
    const job = await prisma.aIJob.findUnique({ where: { id: req.params.id as string } });
    if (!job) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Job not found" } });

    return res.json({ success: true, data: job });
  } catch (error) {
    console.error("Job fetch error:", error);
    return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch job" } });
  }
});

export default router;
