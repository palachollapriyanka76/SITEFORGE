import { Router } from "express";
const router = Router();
router.get("/", (_req, res) => {
    res.json({
        success: true,
        data: {
            service: "SiteForge API",
            version: "0.1.0",
            status: "healthy",
            timestamp: new Date().toISOString(),
        },
    });
});
export default router;
//# sourceMappingURL=health.js.map