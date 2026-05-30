import { Router, Request, Response } from "express";
import { prisma } from "@siteforge/database";
import { generateWebsite } from "../generators/website.generator.js";

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
    let result: Record<string, unknown> = {};
    let tokensUsed = 0;

    switch (type) {
      case "GENERATE_WEBSITE":
        const websiteJson = await generateWebsite(prompt);
        result = websiteJson as any;
        tokensUsed = 4500; // estimated average token count
        break;
      default:
        throw new Error(`Unsupported job type: ${type}`);
    }

    const processingTimeMs = Date.now() - startTime;

    // Fetch the job to get its websiteId
    const jobRecord = await prisma.aIJob.findUnique({
      where: { id: jobId }
    });
    const websiteId = jobRecord?.websiteId;

    if (websiteId && type === "GENERATE_WEBSITE") {
      console.log(`[AI Engine] Saving generated website structure to DB for websiteId: ${websiteId}`);
      
      const theme = (result as any).theme || {};
      const meta = (result as any).meta || {};
      const globalSettings = (result as any).globalSettings || {};
      const pages = (result as any).pages || [];

      // Update Website in a transaction with Page deletions and creations
      await prisma.$transaction([
        prisma.website.update({
          where: { id: websiteId },
          data: {
            description: meta.description || "AI Generated website",
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
        ...pages.map((page: any, index: number) => {
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
      console.log(`[AI Engine] Saved website and pages successfully for websiteId: ${websiteId}`);
    }

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

// POST /api/jobs/generate-sync — Synchronously process website generation
router.post("/generate-sync", async (req: Request, res: Response) => {
  const { businessData } = req.body;

  if (!businessData) {
    return res.status(400).json({ success: false, error: "Missing businessData" });
  }

  try {
    console.log(`[AI Engine] Starting synchronous generation for: ${businessData.name}`);
    const websiteJson = await generateWebsite(businessData);
    return res.json({ success: true, data: websiteJson });
  } catch (error: any) {
    console.error(`[AI Engine] Sync generation failed:`, error);
    return res.status(500).json({ success: false, error: error.message || "Sync generation failed" });
  }
});

// GET /api/jobs/:id — Get job status
router.get("/:id", async (req: Request, res: Response) => {
  const job = await prisma.aIJob.findUnique({ where: { id: req.params.id } });
  if (!job) return res.status(404).json({ success: false, error: "Job not found" });
  return res.json({ success: true, data: job });
});

export default router;

