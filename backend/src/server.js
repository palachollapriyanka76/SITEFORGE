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

const variationsCache = new Map();

// POST /api/generate/website-variations
app.post('/api/generate/website-variations', async (req, res) => {
  const { businessData } = req.body;
  console.log("STEP 3: Generation API called for variations (AI-Driven)");
  console.log("STEP 4: AI Analysis & Design Generation started");

  // AUDIT LOG ONBOARDING STATE
  console.log("=== WEBSITE GENERATION ENGINE AUDIT LOG ===");
  console.log(`businessName:   ${businessData?.name ? `"${businessData.name}"` : "MISSING"}`);
  console.log(`industry:       ${businessData?.type ? `"${businessData.type}"` : "MISSING"}`);
  console.log(`products:       ${businessData?.products && businessData.products.length ? JSON.stringify(businessData.products) : "MISSING"}`);
  console.log(`targetAudience: ${businessData?.audience ? `"${businessData.audience}"` : "MISSING"}`);
  console.log(`style:          ${businessData?.style ? `"${businessData.style}"` : "MISSING"}`);
  console.log(`colors:         ${businessData?.colorTheme ? `"${businessData.colorTheme}"` : "MISSING"}`);
  console.log(`logo:           ${businessData?.logoUrl ? "PRESENT" : "MISSING"}`);
  console.log(`whatsapp:       Enabled: ${businessData?.whatsappEnabled}, Number: ${businessData?.whatsappNumber || "MISSING"}`);
  console.log(`socialLinks:    ${businessData?.socialLinks ? JSON.stringify(businessData.socialLinks) : "MISSING"}`);
  console.log("==========================================");

  // Validate values
  const missing = [];
  if (!businessData?.name) missing.push("businessName");
  if (!businessData?.type) missing.push("industry");
  if (!businessData?.products || !businessData.products.length) missing.push("products");
  if (!businessData?.audience) missing.push("targetAudience");
  if (!businessData?.style) missing.push("style");
  if (!businessData?.colorTheme) missing.push("colors");
  if (missing.length > 0) {
    console.warn(`[WARNING] Some onboarding inputs are missing: ${missing.join(", ")}`);
  } else {
    console.log("[SUCCESS] All core onboarding inputs are present!");
  }

  const cacheKey = JSON.stringify(businessData || {});
  let templates;

  if (variationsCache.has(cacheKey)) {
    console.log("[Cache Hit] Returning cached website variations from memory cache");
    templates = variationsCache.get(cacheKey);
  } else {
    try {
      templates = await aiGenerator.generateThreeVariations(businessData || {});
      console.log("STEP 5: Dynamic Layouts, Sections and Design Tokens generated successfully");
      console.log("STEP 6: Website JSON variation outputs parsed");
      
      // Save to cache
      variationsCache.set(cacheKey, templates);
    } catch (err) {
      console.error("AI Generation failed:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // VERIFY WEBSITE JSON DETAILS
  console.log("=== GENERATED WEBSITE JSON VERIFICATION ===");
  templates.forEach((variant) => {
    console.log(`\n--- Variant: ${variant.name} (${variant.id}) ---`);
    const websiteJson = variant.websiteJson;
    console.log(`- Theme Style:   ${websiteJson?.theme?.style || "MISSING"}`);
    console.log(`- Typography:    ${websiteJson?.theme?.fontFamily || "MISSING"}`);
    console.log(`- Colors:        Primary=${websiteJson?.theme?.primaryColor}, Accent=${websiteJson?.theme?.accentColor}`);
    console.log(`- Global Settings Navigation/WhatsApp: Number=${websiteJson?.globalSettings?.whatsappNumber}, Enabled=${websiteJson?.globalSettings?.whatsappButton}`);
    console.log(`- Pages:         ${JSON.stringify(websiteJson?.pages?.map(p => ({ name: p.name, slug: p.slug })))}`);
    console.log(`- Sections:      ${JSON.stringify(websiteJson?.sections?.map(s => s.type))}`);
    
    // Check if sections have images
    const sectionsWithImages = websiteJson?.sections?.filter(s => s.content?.backgroundImage || s.content?.image || s.content?.products?.some(p => p.image) || s.content?.images?.length);
    console.log(`- Sections containing imagery: ${JSON.stringify(sectionsWithImages?.map(s => s.type))}`);
  });
  console.log("\n==========================================");

  // Print full JSON payload of Variant A (Modern)
  console.log("\n=== FULL GENERATED JSON PAYLOAD (VARIANT A: MODERN) ===");
  console.log(JSON.stringify(templates[0].websiteJson, null, 2));
  console.log("======================================================");

  res.json({ success: true, data: { templates } });
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
app.post('/api/onboarding/complete', async (req, res) => {
  const { businessData, websiteJson, userId } = req.body;
  const mockId = `site_${Math.floor(100000 + Math.random() * 900000)}`;
  
  console.log("STEP 10: Onboarding Saved - " + mockId);
  console.log("STEP 7: Website saved in memory: " + mockId);
  console.log("STEP 8: Website ID generated: " + mockId);
  
  const finalJson = websiteJson || await aiGenerator.compileWebsiteJSON(businessData || {}, 'modern');
  
  websitesDb[mockId] = {
    ...finalJson,
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
