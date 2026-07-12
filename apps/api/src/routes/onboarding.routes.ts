import { Router, Request, Response } from "express";
import { prisma } from "@siteforge/database";
import { requireAuth, getAuth } from "@clerk/express";
import OpenAI from "openai";

const router = Router();

// Lazy-initialized OpenAI client to prevent crashes without a key
let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
    });
  }
  return _openai;
}

// =========================================================================
// POST /api/onboarding/chat — Conversation acknowledgment from GPT-4o
// =========================================================================
router.post("/chat", async (req: Request, res: Response) => {
  const { currentQuestionField, answer } = req.body;

  if (!currentQuestionField || !answer) {
    return res.status(400).json({ error: "Missing currentQuestionField or answer details." });
  }

  try {
    const response = await getOpenAI().chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an encouraging, warm, and friendly digital advisor for small Indian business owners (like local shops, sweet vendors, salons, gyms).
The user is answering a 10-question sequence to compile details for building their website using AI.
The user just answered the question for the field: '${currentQuestionField}' with the answer: '${answer}'.

Write a short, friendly, and conversational validation acknowledging their answer. Keep it very brief—strictly under 2 sentences.
Use friendly, local Indian conversational styles where appropriate (e.g., using expressions like "Wah! That sounds great", "Superb choice", "Perfect!", "Aacha!", "Bhaiya", "Didi").
Be very supportive. Do NOT ask any new questions. Just acknowledge and validate.`
        },
        {
          role: "user",
          content: `Acknowledge: The field is '${currentQuestionField}' and the answer provided is '${answer}'.`
        }
      ],
      max_tokens: 60,
      temperature: 0.7,
    });

    const acknowledgment = response.choices[0]?.message?.content?.trim() || "Got it! Thanks for sharing.";
    return res.status(200).json({ acknowledgment });
  } catch (error: any) {
    console.error("❌ OpenAI onboarding chat error:", error.message);
    // Return a warm fallback acknowledgment in case API key is missing or fails
    const fallbacks: Record<string, string> = {
      name: "Wah! That's a beautiful name for your business.",
      type: "Perfect! Running a business in this sector is fantastic.",
      products: "Aacha, these products sound excellent! Customers will love them.",
      services: "Superb! Complementary service offerings will make your business stand out.",
      categories: "Great! Clean navigation categories will make your catalog very easy to browse.",
      audience: "Superb! Focus on your target customers is key.",
      style: "Wah! That layout style will make your site look extremely premium.",
      colorTheme: "Superb choice! These colors will give a very modern look to your brand.",
      logoUrl: "Got it! We have saved your logo preference.",
      ordering: "Perfect! Enabling these catalog options helps grow sales.",
      whatsappEnabled: "Bilkul! Receiving orders directly on WhatsApp is very popular in India.",
      socialLinks: "Excellent! Having your social profiles linked will help customers find you easily."
    };
    const acknowledgment = fallbacks[currentQuestionField] || "Perfect! Acknowledged and saved.";
    return res.status(200).json({ acknowledgment });
  }
});

// =========================================================================
// POST /api/onboarding/complete — Save details & create PostgreSQL website
// =========================================================================
router.post("/complete", requireAuth(), async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { businessData, websiteJson } = req.body;

  if (!businessData) {
    return res.status(400).json({ error: "Missing businessData payload." });
  }

  try {
    // 1. Fetch current user from local DB
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return res.status(404).json({ error: "User profile not found in local database." });
    }

    // 2. Generate slug for the website
    const slug = businessData.name
      ? businessData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + `-${Math.floor(100 + Math.random() * 900)}`
      : `shop-${Math.floor(10000 + Math.random() * 90000)}`;

    console.log("STEP 7: Website database transaction starting...");

    // 3. Create Website & Pages in a database transaction
    const transaction = await prisma.$transaction(async (tx) => {
      const theme = websiteJson?.theme || {};
      const meta = websiteJson?.meta || {};
      const globalSettings = websiteJson?.globalSettings || {};
      const pages = websiteJson?.pages || [];

      // Create Website record
      const website = await tx.website.create({
        data: {
          userId: user.id,
          name: businessData.name || "My Business Shop",
          slug,
          description: meta.description || (businessData.audience ? `Serving custom specialties to ${businessData.audience}` : "Local retail business."),
          config: {
            meta,
            theme,
            globalSettings
          },
          status: "DRAFT"
        }
      });

      // Create Page records
      if (pages.length > 0) {
        await Promise.all(
          pages.map((page: any, index: number) => {
            return tx.page.create({
              data: {
                websiteId: website.id,
                title: page.name,
                slug: page.slug === "/" ? "home" : page.slug.replace(/^\//, ""),
                description: page.name + " Page",
                isHomepage: page.slug === "/" || page.slug === "home",
                components: page.sections,
                order: index
              }
            });
          })
        );
      } else {
        // Fallback simple home page
        await tx.page.create({
          data: {
            websiteId: website.id,
            title: "Home",
            slug: "home",
            isHomepage: true,
            components: [],
          }
        });
      }

      return website;
    });

     console.log("STEP 7: Website saved successfully to database: " + transaction.id);
     console.log("STEP 10: Onboarding Saved - Website ID: " + transaction.id);
     console.log("STEP 10: Website ID Created - " + transaction.id);

     return res.status(201).json({
       success: true,
       message: "Website record scaffolded successfully in database.",
       data: transaction
     });

  } catch (error: any) {
    console.error("❌ Onboarding completion database error:", error.message);
    return res.status(550).json({ error: "Failed to generate website database records." });
  }
});

export default router;
