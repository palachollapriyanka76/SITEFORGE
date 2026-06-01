import { Router } from "express";
const router = Router();
// POST /api/publish/:id
// Validates JSON, generates subdomain slug, checks availability, saves publishedUrl
router.post("/:id", (req, res) => {
    const { id } = req.params;
    const { websiteJSON, requestedSubdomain } = req.body;
    if (!websiteJSON) {
        return res.status(400).json({ error: "Missing websiteJSON payload." });
    }
    // Mock checking availability and generating slug
    const subdomain = requestedSubdomain
        ? requestedSubdomain.toLowerCase().replace(/[^a-z0-9-]/g, '')
        : `site-${Math.floor(Math.random() * 10000)}`;
    const publishedUrl = `https://${subdomain}.siteforge.app`;
    // Mock saving to DB
    console.log(`[Publish API] Publishing website ${id} to ${subdomain}`);
    return res.status(200).json({
        success: true,
        data: {
            url: publishedUrl,
            subdomain,
            publishedAt: new Date().toISOString()
        }
    });
});
// GET /api/publish/:id/status
router.get("/:id/status", (req, res) => {
    const { id } = req.params;
    // Mock status
    return res.status(200).json({
        status: "published",
        url: "https://mock-site.siteforge.app",
        lastPublishedAt: new Date().toISOString()
    });
});
// POST /api/publish/:id/unpublish
router.post("/:id/unpublish", (req, res) => {
    const { id } = req.params;
    console.log(`[Publish API] Unpublishing website ${id}`);
    return res.status(200).json({
        success: true,
        message: "Website unpublished successfully."
    });
});
export default router;
//# sourceMappingURL=publish.routes.js.map