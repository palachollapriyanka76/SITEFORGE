import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import jobRoutes from "./routes/jobs.js";
const app = express();
const PORT = process.env.AI_ENGINE_PORT || 5001;
app.use(helmet());
app.use(cors({
    origin: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    credentials: true,
}));
app.use(express.json({ limit: "50mb" }));
// Routes
app.use("/api/jobs", jobRoutes);
// Health check
app.get("/health", (_req, res) => {
    res.json({
        success: true,
        data: {
            service: "SiteForge AI Engine",
            version: "0.1.0",
            status: "healthy",
            model: process.env.OPENAI_MODEL || "gpt-4o",
        },
    });
});
// Error handler
app.use((err, _req, res, _next) => {
    console.error("❌ AI Engine error:", err);
    res.status(500).json({
        success: false,
        error: { code: "AI_ENGINE_ERROR", message: err.message },
    });
});
app.listen(PORT, () => {
    console.log(`🧠 SiteForge AI Engine running on http://localhost:${PORT}`);
    console.log(`🤖 Using model: ${process.env.OPENAI_MODEL || "gpt-4o"}`);
});
export default app;
//# sourceMappingURL=server.js.map