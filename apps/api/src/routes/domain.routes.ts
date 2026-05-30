import { Router } from "express";

const router = Router();

// POST /api/domains/add
// Save domain and return CNAME target
router.post("/add", (req, res) => {
  const { websiteId, customDomain } = req.body;

  if (!customDomain) {
    return res.status(400).json({ error: "Missing customDomain." });
  }

  // Basic validation
  if (!customDomain.includes(".")) {
    return res.status(400).json({ error: "Invalid domain format." });
  }

  console.log(`[Domain API] Adding custom domain ${customDomain} for website ${websiteId}`);

  return res.status(200).json({
    success: true,
    data: {
      domain: customDomain,
      cnameTarget: "cname.siteforge.app",
      status: "pending_verification"
    }
  });
});

// GET /api/domains/verify/:id
// Check DNS propagation
router.get("/verify/:id", (req, res) => {
  const { id } = req.params;
  
  // Mock DNS verification (randomly succeed or stay pending for realism)
  const isVerified = Math.random() > 0.5;
  
  console.log(`[Domain API] Verifying domain ${id}... Result: ${isVerified}`);
  
  return res.status(200).json({
    success: true,
    data: {
      id,
      status: isVerified ? "active" : "pending_verification",
      verifiedAt: isVerified ? new Date().toISOString() : null
    }
  });
});

export default router;
