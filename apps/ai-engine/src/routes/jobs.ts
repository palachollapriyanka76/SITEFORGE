import { Router, Request, Response } from "express";
import { prisma } from "@siteforge/database";
import { generateWebsite } from "../services/openai.js";

const router = Router();

// POST /api/jobs/process — Process an AI generation job
router.post("/process", async (req: Request, res: Response) => {
  const { jobId, type, prompt } = req.body;

  if (!jobId || !type || !prompt) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  // Acknowledge immediately, process asynchronously
  res.status(202).json({ success: true, data: { jobId, status: "PROCESSING" } });

  // Process in background
  try {
    // Update job status
    await prisma.aIJob.update({
      where: { id: jobId },
      data: { status: "PROCESSING" },
    });

    const startTime = Date.now();
    let result: Record<string, unknown>;
    let tokensUsed = 0;

    switch (type) {
      case "GENERATE_WEBSITE":
        const generation = await generateWebsite(prompt);
        result = generation.data;
        tokensUsed = generation.tokensUsed;
        break;
      default:
        throw new Error(`Unsupported job type: ${type}`);
    }

    const processingTimeMs = Date.now() - startTime;

    // Update job with results
    await prisma.aIJob.update({
      where: { id: jobId },
      data: {
        status: "COMPLETED",
        result,
        tokensUsed,
        processingTimeMs,
        completedAt: new Date(),
      },
    });

    console.log(`✅ Job ${jobId} completed in ${processingTimeMs}ms (${tokensUsed} tokens)`);
  } catch (error) {
    console.error(`❌ Job ${jobId} failed:`, error);
    await prisma.aIJob.update({
      where: { id: jobId },
      data: {
        status: "FAILED",
        error: error instanceof Error ? error.message : "Unknown error",
        completedAt: new Date(),
      },
    });
  }
});

// GET /api/jobs/:id — Get job status
router.get("/:id", async (req: Request, res: Response) => {
  const job = await prisma.aIJob.findUnique({ where: { id: req.params.id } });
  if (!job) return res.status(404).json({ success: false, error: "Job not found" });
  return res.json({ success: true, data: job });
});

export default router;
