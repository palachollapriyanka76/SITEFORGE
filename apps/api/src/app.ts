import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { clerkMiddleware } from "@clerk/express";

// Route imports
import authRoutes from "./routes/auth.routes.js";
import websiteRoutes from "./routes/websites.js";
import paymentRoutes from "./routes/payments.js";
import aiRoutes from "./routes/ai.js";
import uploadRoutes from "./routes/uploads.js";
import healthRoutes from "./routes/health.js";
import onboardingRoutes from "./routes/onboarding.routes.js";
import generationRoutes from "./routes/generation.routes.js";
import publishRoutes from "./routes/publish.routes.js";
import domainRoutes from "./routes/domain.routes.js";
import dbCrudRoutes from "./routes/dbCrud.routes.js";

const app = express();

// ---- Middleware ----
app.use(helmet());
app.use(cors({
  origin: [
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001",
  ],
  credentials: true,
}));
app.use(morgan("dev"));

// Stripe webhooks need raw body — mount BEFORE express.json()
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

// ---- Routes ----
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/websites", websiteRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/generate", generationRoutes);
app.use("/api/publish", publishRoutes);
app.use("/api/domains", domainRoutes);
app.use("/api", dbCrudRoutes);

// ---- Error Handler ----
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : err.message,
    },
  });
});

export default app;
