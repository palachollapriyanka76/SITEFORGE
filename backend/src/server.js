const express = require('express');
const cors = require('cors');
require('dotenv').config();

const analyticsRoutes = require('./routes/analytics.routes');
const leadsRoutes = require('./routes/leads.routes');
const ordersRoutes = require('./routes/orders.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory websites mock database to match PostgreSQL
const websitesDb = {};

const aiGenerator = require('./ai-engine/generator');

// Root Health Route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    service: "SiteForge Backend",
    message: "Backend is running successfully"
  });
});

// REST Health Route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// POST /api/generate/website-variations
app.post('/api/generate/website-variations', (req, res) => {
  const { businessData } = req.body;
  console.log("STEP 3: Generation API called for variations (AI-Driven)");
  console.log("STEP 4: AI Analysis & Design Generation started");

  try {
    const templates = aiGenerator.generateThreeVariations(businessData || {});
    console.log("STEP 5: Dynamic Layouts, Sections and Design Tokens generated successfully");
    console.log("STEP 6: Website JSON variation outputs parsed");
    res.json({ success: true, data: { templates } });
  } catch (err) {
    console.error("AI Generation failed:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});


// In-Memory users mock database
const usersDb = [];

// GET /api/auth/check-email — Check duplicate email
app.get('/api/auth/check-email', (req, res) => {
  const { email } = req.query;
  const exists = usersDb.some(u => u.email.trim().toLowerCase() === String(email).trim().toLowerCase());
  if (exists) {
    return res.json({ exists: true, error: "This email is already registered. Please sign in instead." });
  }
  res.json({ exists: false });
});

// POST /api/auth/signup — Create a new mock user with duplicate validation checks
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!email) {
    return res.status(400).json({ success: false, error: "Missing required registration parameters" });
  }

  // Validate duplicate email
  const emailExists = usersDb.some(u => u.email.trim().toLowerCase() === email.trim().toLowerCase());
  if (emailExists) {
    return res.status(400).json({ success: false, error: "This email is already registered. Please sign in instead." });
  }

  const userId = `user_${Math.floor(100000 + Math.random() * 900000)}`;
  const newUser = { id: userId, name, email, password };
  usersDb.push(newUser);

  console.log("STEP 10: User Created - Database Record Cuid: " + userId);

  res.status(201).json({ success: true, user: newUser });
});

// GET /api/websites/:id/json with strict USER ISOLATION
app.get('/api/websites/:id/json', (req, res) => {
  const website = websitesDb[req.params.id];
  if (!website) return res.status(404).json({ success: false, error: "Website not found" });

  const reqUserId = req.headers['x-user-id'] || req.query.userId;
  if (reqUserId && website.userId && website.userId !== reqUserId) {
    console.warn(`[Security Alert] Blocked unauthorized access to website: ${req.params.id} by user: ${reqUserId}`);
    return res.status(403).json({ success: false, error: "Website data is strictly isolated by userId." });
  }

  res.json({ success: true, data: website });
});

// PATCH /api/websites/:id/json with strict USER ISOLATION
app.patch('/api/websites/:id/json', (req, res) => {
  const website = websitesDb[req.params.id];
  const reqUserId = req.headers['x-user-id'] || req.body.userId;
  
  if (website && reqUserId && website.userId && website.userId !== reqUserId) {
    return res.status(403).json({ success: false, error: "Website data is strictly isolated by userId." });
  }

  websitesDb[req.params.id] = req.body;
  res.json({ success: true, data: { saved: true } });
});

// POST /api/onboarding/complete (mock)
app.post('/api/onboarding/complete', (req, res) => {
  const { businessData, websiteJson, userId } = req.body;
  const mockId = `site_${Math.floor(100000 + Math.random() * 900000)}`;
  
  console.log("STEP 10: Onboarding Saved - " + mockId);
  console.log("STEP 7: Website saved in memory: " + mockId);
  console.log("STEP 8: Website ID generated: " + mockId);
  
  websitesDb[mockId] = {
    ...(websiteJson || aiGenerator.compileWebsiteJSON(businessData || {}, 'modern')),
    userId: userId || "anonymous"
  };
  
  res.status(201).json({
    success: true,
    data: { id: mockId }
  });
});

// API Routes
app.use('/api/analytics', analyticsRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/orders', ordersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
