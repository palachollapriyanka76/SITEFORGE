import { Router } from "express";
import { requireAuth, getAuth } from "@clerk/express";
import { prisma } from "@siteforge/database";
import axios from "axios";
import OpenAI from "openai";
const router = Router();
// Lazy-initialized OpenAI client to prevent crashes without a key
let _openai = null;
function getOpenAI() {
    if (!_openai) {
        _openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
        });
    }
    return _openai;
}
// POST /api/ai/generate-website — Send AI generation request
router.post("/generate-website", requireAuth(), async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId)
            return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user)
            return res.status(404).json({ success: false, error: { code: "USER_NOT_FOUND", message: "User not found" } });
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
    }
    catch (error) {
        console.error("AI generate error:", error);
        return res.status(500).json({ success: false, error: { code: "AI_ERROR", message: "Failed to start generation" } });
    }
});
// GET /api/ai/jobs/:id — Check AI job status
router.get("/jobs/:id", requireAuth(), async (req, res) => {
    try {
        const job = await prisma.aIJob.findUnique({ where: { id: req.params.id } });
        if (!job)
            return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Job not found" } });
        return res.json({ success: true, data: job });
    }
    catch (error) {
        console.error("Job fetch error:", error);
        return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch job" } });
    }
});
// POST /api/ai/edit — Apply visual and copy modifications instantly to WebsiteJSON
router.post("/edit", requireAuth(), async (req, res) => {
    try {
        const { websiteJSON, prompt } = req.body;
        if (!websiteJSON || !prompt) {
            return res.status(400).json({ success: false, error: "Missing websiteJSON or prompt" });
        }
        const hasRealKey = process.env.OPENAI_API_KEY &&
            !process.env.OPENAI_API_KEY.includes("placeholder") &&
            process.env.OPENAI_API_KEY.startsWith("sk-");
        if (hasRealKey) {
            console.log(`[AI Editor] Processing real-time AI edit request via OpenAI: "${prompt}"`);
            const openai = getOpenAI();
            const completion = await openai.chat.completions.create({
                model: process.env.OPENAI_MODEL || "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert web developer and copywriter. You take a WebsiteJSON structure and modify it based on the user's design instructions (such as layout spacing, premium adjustments, adding specific galleries, color swaps). Return ONLY a valid, modified WebsiteJSON object. Keep existing IDs and structure intact unless explicitly asked to modify them. Do NOT return markdown block wrappers, strictly valid JSON."
                    },
                    {
                        role: "user",
                        content: `WebsiteJSON:\n${JSON.stringify(websiteJSON)}\n\nUser Instruction: "${prompt}"`
                    }
                ],
                response_format: { type: "json_object" },
                temperature: 0.7,
            });
            const responseContent = completion.choices[0].message.content;
            if (responseContent) {
                let cleaned = responseContent.trim();
                if (cleaned.startsWith("```json"))
                    cleaned = cleaned.replace(/^```json\n/, "").replace(/\n```$/, "");
                else if (cleaned.startsWith("```"))
                    cleaned = cleaned.replace(/^```\n/, "").replace(/\n```$/, "");
                const parsed = JSON.parse(cleaned);
                return res.json({ success: true, websiteJSON: parsed });
            }
        }
        // LOCAL ROBUST RULES-BASED AI ENGINE FALLBACK
        console.log(`[AI Editor] Running local responsive rules engine for prompt: "${prompt}"`);
        const modified = JSON.parse(JSON.stringify(websiteJSON));
        const cleanPrompt = prompt.toLowerCase();
        // 1. Premium / Luxury adjustments
        if (cleanPrompt.includes("premium") || cleanPrompt.includes("luxury") || cleanPrompt.includes("classy") || cleanPrompt.includes("sophisticated")) {
            modified.theme.fontFamily = "Playfair Display";
            modified.theme.style = "luxury";
            modified.theme.primaryColor = "#7F1D1D"; // Elegant crimson/burgundy
            modified.theme.accentColor = "#D97706"; // Gold
            const heroSection = modified.pages[0].sections.find((s) => s.type === "hero");
            if (heroSection) {
                heroSection.content.title = `The Pinnacle of Elite Quality & Bespoke Craftsmanship`;
                heroSection.content.subtitle = `Indulge in sophisticated design, meticulous attention to detail, and standard-setting customer care built exclusively for our distinguished guests.`;
                heroSection.content.ctaText = "Experience Luxury Now";
            }
        }
        // 2. Add Cake Gallery / Add Gallery
        else if (cleanPrompt.includes("gallery") || cleanPrompt.includes("images") || cleanPrompt.includes("photos")) {
            const page = modified.pages[0];
            const hasGallery = page.sections.some((s) => s.type === "gallery");
            if (!hasGallery) {
                const isBakery = cleanPrompt.includes("cake") || modified.meta.title.toLowerCase().includes("bakery") || modified.meta.title.toLowerCase().includes("cake");
                const galleryImages = isBakery ? [
                    { url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80", caption: "Premium Chocolate Celebration Cake" },
                    { url: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80", caption: "Red Velvet Masterpieces" },
                    { url: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=600&q=80", caption: "Oven-Fresh Gourmet Cupcakes" }
                ] : [
                    { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", caption: "Our Premium Ambience" },
                    { url: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80", caption: "Signature Services in Action" },
                    { url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80", caption: "Handcrafted Local Details" }
                ];
                const newGallerySection = {
                    id: `sec_gallery_ai_${Math.random().toString(36).substring(2, 5)}`,
                    type: "gallery",
                    order: page.sections.length - 2 > 0 ? page.sections.length - 2 : 1,
                    visible: true,
                    content: {
                        title: isBakery ? "Our Celebration Cake Gallery" : "Exquisite Visual Gallery",
                        subtitle: isBakery ? "Explore our masterfully baked custom cakes and artisanal pastries" : "A visual peek into our dedication, craftsmanship, and customer smiles",
                        images: galleryImages
                    },
                    styles: {},
                    animations: {}
                };
                page.sections.splice(page.sections.length - 2, 0, newGallerySection);
                // Re-calculate orders
                page.sections.forEach((sec, idx) => {
                    sec.order = idx;
                });
            }
        }
        // 3. Warm Tones
        else if (cleanPrompt.includes("warm") || cleanPrompt.includes("amber") || cleanPrompt.includes("brown") || cleanPrompt.includes("gold")) {
            modified.theme.primaryColor = "#78350F"; // Amber brown
            modified.theme.secondaryColor = "#FEF3C7"; // Warm cream
            modified.theme.accentColor = "#F59E0B"; // Amber gold
        }
        // 4. Cool Tones / Blue
        else if (cleanPrompt.includes("cool") || cleanPrompt.includes("blue") || cleanPrompt.includes("teal") || cleanPrompt.includes("cyan")) {
            modified.theme.primaryColor = "#1E3A8A"; // Deep Navy Blue
            modified.theme.secondaryColor = "#EFF6FF"; // Ice Blue
            modified.theme.accentColor = "#3B82F6"; // Sky Blue
        }
        // 5. Add customer testimonials
        else if (cleanPrompt.includes("testimonial") || cleanPrompt.includes("review") || cleanPrompt.includes("customer")) {
            const page = modified.pages[0];
            const hasTestimonials = page.sections.some((s) => s.type === "testimonials");
            if (!hasTestimonials) {
                const newTestimonialsSection = {
                    id: `sec_testimonials_ai_${Math.random().toString(36).substring(2, 5)}`,
                    type: "testimonials",
                    order: page.sections.length - 2 > 0 ? page.sections.length - 2 : 1,
                    visible: true,
                    content: {
                        title: "What Our Patrons Say",
                        testimonials: [
                            { name: "Priyanka Sharma", role: "Local Food Critic", content: "Absolutely stellar experience! Their outstanding craftsmanship, pristine space, and professional staff exceed all expectations.", rating: 5 },
                            { name: "Rohan Deshmukh", role: "Regular Customer", content: "The absolute best in Koregaon Park. Exquisite detailing, great pricing, and warm welcoming service!", rating: 5 },
                            { name: "Aditi Joshi", role: "Client", content: "High quality and beautiful outcomes. They truly understand their customer goals.", rating: 5 }
                        ]
                    },
                    styles: {},
                    animations: {}
                };
                page.sections.splice(page.sections.length - 2, 0, newTestimonialsSection);
                page.sections.forEach((sec, idx) => {
                    sec.order = idx;
                });
            }
        }
        // 6. Generic Text Improvement / Improve hero copy
        else {
            // General fallbacks: change primaryColor to a classy brand indigo
            modified.theme.primaryColor = "#4F46E5";
            modified.theme.accentColor = "#10B981";
            const heroSection = modified.pages[0].sections.find((s) => s.type === "hero");
            if (heroSection) {
                heroSection.content.title = `Standard-Setting Quality & Customer Care Built For You`;
                heroSection.content.subtitle = `Experience standard-setting dedication and pristine craftsmanship tailored to meet your requirements perfectly.`;
            }
        }
        return res.json({ success: true, websiteJSON: modified });
    }
    catch (error) {
        console.error("❌ AI edit error:", error.message);
        return res.status(500).json({ success: false, error: error.message || "Failed to process AI edit request" });
    }
});
export default router;
//# sourceMappingURL=ai.js.map