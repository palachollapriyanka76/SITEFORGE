import { Router, Request, Response } from "express";
import { prisma } from "@siteforge/database";
import axios from "axios";

const router = Router();
const AI_ENGINE_URL = process.env.AI_ENGINE_URL || "http://localhost:5001";

// Rich local industry mock generator for 5 core industries (Bakery, Restaurant, Salon, Electronics, Gym)
// Acts as the robust fallback of STEP 9 when OpenAI / AI-Engine fails or is unconfigured.
function generateMockIndustryWebsite(businessData: any) {
  const name = businessData.name || "My Premium Shop";
  const rawType = (businessData.type || "retail").toLowerCase();
  
  let type = "Business";
  let description = "Quality products and services tailored for you.";
  let products: any[] = [];
  let services: any[] = [];
  let gallery: any[] = [];
  let faqs: any[] = [];
  let phone = businessData.whatsappNumber || "+91 98765 43210";
  let address = "Pune, Maharashtra, India";
  
  if (rawType.includes("bakery") || rawType.includes("cake") || rawType.includes("sweet")) {
    type = "Bakery & Confectionery";
    description = "Indulge in fresh, handcrafted cakes, pastries, and artisanal breads baked fresh in Pune.";
    products = [
      { name: "Signature Truffle Cake", price: "Rs. 599", description: "Rich Belgian chocolate layers with silky ganache overlay.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80" },
      { name: "Red Velvet Pastry", price: "Rs. 120", description: "Classic crimson cake slices topped with sweet cream cheese frosting.", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80" },
      { name: "Butter Croissant", price: "Rs. 99", description: "Flaky, buttery layered French pastry baked fresh every morning.", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80" }
    ];
    services = [
      { name: "Custom Celebration Cakes", description: "Bespoke designer cakes tailored for birthdays, weddings, and anniversaries.", icon: "Sparkles" },
      { name: "Doorstep Local Delivery", description: "Freshly baked items delivered right to your home in Pune within 2 hours.", icon: "Clock" },
      { name: "Bulk Party Orders", description: "Catering large-scale events, corporate parties, and family gatherings.", icon: "Heart" }
    ];
    gallery = [
      { url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80", caption: "Our Baker's Oven" },
      { url: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=600&q=80", caption: "Handcrafted Cupcakes" },
      { url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80", caption: "Freshly Baked Breads" }
    ];
    faqs = [
      { question: "How early do I need to order custom designer cakes?", answer: "We require at least 24 to 48 hours notice for bespoke designer cakes." },
      { question: "Do you offer eggless options for all items?", answer: "Yes! 100% of our cakes and pastries can be made eggless upon request." }
    ];
  } else if (rawType.includes("rest") || rawType.includes("cafe") || rawType.includes("food") || rawType.includes("dine") || rawType.includes("bak")) {
    type = "Fine Dining Restaurant";
    description = "Savor authentic regional delicacies and modern fusion cuisine prepared by top chefs in Koregaon Park.";
    products = [
      { name: "Paneer Tikka Masala", price: "Rs. 320", description: "Clay-oven grilled paneer cubes in rich spiced cashew tomato gravy.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80" },
      { name: "Signature Butter Chicken", price: "Rs. 380", description: "Tender tandoori chicken shreds simmered in butter tomato velvet gravy.", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80" },
      { name: "Awadhi Dum Biryani", price: "Rs. 350", description: "Fragrant basmati rice layered with saffron, fresh herbs, and tender marinades.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80" }
    ];
    services = [
      { name: "Exquisite Dine-In Experience", description: "Elegant, ambient seating with exceptional table service and soft acoustics.", icon: "Utensils" },
      { name: "Convenient WhatsApp Takeaway", description: "Order directly online and pick up fresh at our Pune counter or request express delivery.", icon: "MessageSquare" },
      { name: "Private Event Catering", description: "Reserve candle-lit corners or family halls for intimate get-togethers.", icon: "Sparkles" }
    ];
    gallery = [
      { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", caption: "Our Cozy Dining Room" },
      { url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80", caption: "Signature Fusion Dishes" },
      { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80", caption: "Fresh Local Ingredients" }
    ];
    faqs = [
      { question: "Do you offer pure vegetarian or vegan food options?", answer: "Yes, we feature extensive vegetarian and vegan-friendly sections on our menu." },
      { question: "What are your operating hours?", answer: "We are open from 11:30 AM to 11:00 PM, seven days a week." }
    ];
  } else if (rawType.includes("salon") || rawType.includes("spa") || rawType.includes("hair") || rawType.includes("beauty")) {
    type = "Luxury Hair & Beauty Salon";
    description = "Pamper yourself with premium hair styling, customized facials, and luxury spa treatments.";
    products = [
      { name: "Hair Spa & Conditioning", price: "Rs. 1,200", description: "Deep hydration scalp therapy with herbal steam and a soothing head massage.", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80" },
      { name: "Premium Bridal Makeover", price: "Rs. 15,000", description: "Bespoke high-definition makeup, hair design, and saree draping package.", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80" },
      { name: "Global Hair Coloring", price: "Rs. 4,500", description: "Vibrant high-gloss ammonia-free global color by L'Oreal professionals.", image: "https://images.unsplash.com/photo-1620331702279-b7b0d2fe3576?auto=format&fit=crop&w=600&q=80" }
    ];
    services = [
      { name: "Expert Hair Styling", description: "Precision haircuts, blowouts, and trends curated by leading Pune stylists.", icon: "Scissors" },
      { name: "Organic Skin Facials", description: "Revitalizing skin treatments using organic botanicals and natural extracts.", icon: "Sparkles" },
      { name: "Nail Art & Extensions", description: "Intricate custom gel nail art designs and durable extensions.", icon: "Heart" }
    ];
    gallery = [
      { url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80", caption: "Our Styling Station" },
      { url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80", caption: "Premium Skin Care" },
      { url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=600&q=80", caption: "Luxury Spa Pedicures" }
    ];
    faqs = [
      { question: "Is booking an appointment mandatory?", answer: "Walk-ins are welcome, but we highly recommend booking in advance to avoid waiting." },
      { question: "What premium skin and hair brands do you use?", answer: "We exclusively use L'Oreal Professional, Olaplex, Dermalogica, and Estee Lauder." }
    ];
  } else if (rawType.includes("elect") || rawType.includes("phone") || rawType.includes("shop") || rawType.includes("gadg")) {
    type = "Premium Electronics Store";
    description = "Discover the latest smartphones, premium laptops, and smart home gadgets at the best prices in Pune.";
    products = [
      { name: "Pro Sound ANC Headphones", price: "Rs. 8,999", description: "Wireless hybrid active noise-cancelling overhead headphones.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" },
      { name: "Forge Lite Smart Watch", price: "Rs. 3,499", description: "AMOLED curved display with continuous heart and blood oxygen monitor.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" },
      { name: "Ultra Book 14-inch Laptop", price: "Rs. 62,999", description: "Intel Core i5 powered, sleek all-metal chassis, 16GB RAM laptop.", image: "https://images.unsplash.com/photo-1496181130204-7552cc14ac1a?auto=format&fit=crop&w=600&q=80" }
    ];
    services = [
      { name: "Authorized Brand Warranty", description: "100% genuine products directly from brands with official warranty cards.", icon: "ShieldCheck" },
      { name: "Immediate Device Setup", description: "Complimentary setup, software installation, and data transfer for your devices.", icon: "Cpu" },
      { name: "Easy Financing & EMIs", description: "Flexible payment options with low interest and zero downpayment plans.", icon: "CreditCard" }
    ];
    gallery = [
      { url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80", caption: "Our Tech Display Counter" },
      { url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80", caption: "Smart Home Demonstrations" },
      { url: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=600&q=80", caption: "Premium Accessories Area" }
    ];
    faqs = [
      { question: "Do you offer exchange offers on old laptops or phones?", answer: "Yes! We run direct cash-back exchange programs for all working old gadgets." },
      { question: "What is your return/replacement policy?", answer: "We offer a 7-day direct replacement policy on any manufacturing defects." }
    ];
  } else {
    // DEFAULT & GYM
    type = "Elite Fitness Gym & Wellness Studio";
    description = "Transform your fitness journey with certified personal trainers and state-of-the-art strength gear.";
    products = [
      { name: "Gold Yearly Gym Membership", price: "Rs. 14,999", description: "All-hours unlimited access to gym floor, group classes, and locker access.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" },
      { name: "Personal Coaching Package", price: "Rs. 4,500/mo", description: "One-on-one sessions with certified trainers, custom diets, and bi-weekly tracking.", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80" },
      { name: "Forge Pre-Workout Booster", price: "Rs. 2,199", description: "Premium focus and pump booster formulated with active amino acids.", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80" }
    ];
    services = [
      { name: "Certified Strength Training", description: "Modern mechanical strength rigs, extensive free weights, and cardio decks.", icon: "Dumbbell" },
      { name: "Zumba & Yoga Group Classes", description: "Vibrant community classes scheduled daily led by licensed instructors.", icon: "Smile" },
      { name: "Diet & Nutrition Consultant", description: "Custom healthy calorie and macro meal mapping suited to your body goals.", icon: "Heart" }
    ];
    gallery = [
      { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80", caption: "Our Strength Training Floor" },
      { url: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=600&q=80", caption: "Vibrant Spin Classes Area" },
      { url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80", caption: "Custom Boxing Ring" }
    ];
    faqs = [
      { question: "Is a trial pass available for new members?", answer: "Yes! We offer a free 3-day guest trial pass. Register with WhatsApp today." },
      { question: "Are showers, change rooms, and lockers available?", answer: "Yes, we feature pristine modern locker facilities, secure keypads, and hot showers." }
    ];
  }

  return {
    meta: {
      title: `${name} | Pune's Premium ${type}`,
      description: `Welcome to ${name}. We offer high-quality specialties tailored for ${businessData.audience || "valued customers"} in Pune, Maharashtra.`,
      favicon: "✨",
      keywords: [name.toLowerCase(), type.toLowerCase(), "Pune services", "local business"]
    },
    theme: {
      primaryColor: "#4F46E5",
      secondaryColor: "#0F172A",
      accentColor: "#10B981",
      fontFamily: "Outfit",
      style: "modern"
    },
    globalSettings: {
      navbarStyle: "glass",
      footerStyle: "simple",
      whatsappButton: businessData.whatsappEnabled !== undefined ? businessData.whatsappEnabled : true,
      whatsappNumber: businessData.whatsappNumber || phone
    },
    pages: [
      {
        name: "Home",
        slug: "/",
        sections: [
          {
            id: "sec_hero",
            type: "hero",
            order: 0,
            visible: true,
            content: {
              title: `Experience the Ultimate ${type} at ${name}`,
              subtitle: `Handcrafted premium quality tailored specifically for ${businessData.audience || "those who appreciate perfection"}. Order fresh and enjoy local delivery.`,
              ctaText: "Order on WhatsApp",
              ctaLink: businessData.whatsappNumber ? `https://wa.me/${businessData.whatsappNumber}` : "#contact",
              backgroundImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_about",
            type: "about",
            order: 1,
            visible: true,
            content: {
              title: "Our Story of Passion",
              description: `At ${name}, we are dedicated to setting standard-setting quality in our community. Every selection is prepared naturally, handcrafted with elite ingredients, and delivered fresh daily with maximum care.`,
              image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
              highlights: ["100% Premium Quality", "Local Pune Craftsmanship", "Customer-First Care"]
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_services",
            type: "services",
            order: 2,
            visible: true,
            content: {
              title: "Our Signature Services",
              subtitle: "Signature local Pune specialties prepared daily with maximum care",
              services: services
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_products",
            type: "products",
            order: 3,
            visible: true,
            content: {
              title: "Our Bestsellers & Selections",
              subtitle: "Popular choices our customers absolutely adore",
              products: products
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_gallery",
            type: "gallery",
            order: 4,
            visible: true,
            content: {
              title: "A Peek Inside SiteForge",
              subtitle: "Moments of beauty, craftsmanship, and local community smiles",
              images: gallery
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_testimonials",
            type: "testimonials",
            order: 5,
            visible: true,
            content: {
              title: "Loved by the Community",
              testimonials: [
                { name: "Priyanka Sharma", role: "Local Guide", content: `Absolutely exceptional experience at ${name}. Their service is always professional and product quality is outstanding!`, rating: 5 },
                { name: "Rohan Deshmukh", role: "Regular Client", content: `The absolute best in Koregaon Park. Warm staff, great pricing, and pristine cleanliness!`, rating: 5 }
              ]
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_faq",
            type: "faq",
            order: 6,
            visible: true,
            content: {
              title: "Frequently Asked Questions",
              faqs: faqs
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_contact",
            type: "contact",
            order: 7,
            visible: true,
            content: {
              title: "Get in Touch Today",
              phone: phone,
              email: `hello@${name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com`,
              address: address
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_footer",
            type: "footer",
            order: 8,
            visible: true,
            content: {
              businessName: name,
              copyright: `© ${new Date().getFullYear()} ${name}. All Rights Reserved.`,
              links: [{ label: "Home", href: "/" }]
            },
            styles: {},
            animations: {}
          }
        ]
      }
    ]
  };
}

// Visual variations factory — creates 3 distinct designs (Modern, Luxury, Minimal) from a base website JSON structure
function createVariations(baseJson: any) {
  const modern = JSON.parse(JSON.stringify(baseJson));
  const luxury = JSON.parse(JSON.stringify(baseJson));
  const minimal = JSON.parse(JSON.stringify(baseJson));

  // 1. MODERN PROFESSIONAL (Outfit font, bold blue/emerald colors)
  modern.theme = {
    primaryColor: "#4F46E5", // Indigo
    secondaryColor: "#0F172A", // Slate 900
    accentColor: "#10B981", // Emerald
    fontFamily: "Outfit",
    style: "modern"
  };

  // 2. LUXURY PREMIUM (Playfair Display serif, deep burgundy, amber/gold)
  luxury.theme = {
    primaryColor: "#7F1D1D", // Crimson
    secondaryColor: "#1C1917", // Stone 900
    accentColor: "#D97706", // Gold
    fontFamily: "Playfair Display",
    style: "luxury"
  };

  // 3. MINIMAL CLEAN (Inter sans-serif, monochrome zinc/charcoal)
  minimal.theme = {
    primaryColor: "#18181B", // Zinc 900
    secondaryColor: "#F4F4F5", // Zinc 100
    accentColor: "#000000", // Black
    fontFamily: "Inter",
    style: "minimal"
  };

  return [
    {
      id: "modern",
      name: "Modern Professional",
      tagline: "Vibrant indigo primary, Outfit typography, and glowing borders.",
      websiteJson: modern
    },
    {
      id: "luxury",
      name: "Luxury Premium",
      tagline: "Sophisticated Playfair Display serif, rich burgundy tones, and gold accents.",
      websiteJson: luxury
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      tagline: "Ultra clean Inter sans-serif, heavy spacing, and high-contrast monochrome design.",
      websiteJson: minimal
    }
  ];
}

// POST /api/generate/website — Trigger generation and save to DB (Legacy, async job runner)
router.post("/website", async (req: Request, res: Response) => {
  try {
    const { businessData, userId, websiteId } = req.body;

    if (!businessData) {
      return res.status(400).json({ success: false, error: "Missing businessData" });
    }

    console.log("STEP 3: Generation API called (Legacy background job)");

    // Create a new AI Job in the database
    const job = await prisma.aIJob.create({
      data: {
        userId: userId || "anonymous",
        type: "GENERATE_WEBSITE",
        status: "PENDING",
        prompt: JSON.stringify(businessData),
        websiteId: websiteId || null,
      },
    });

    // Trigger AI Engine asynchronously (fire and forget)
    axios.post(`${AI_ENGINE_URL}/api/jobs/process`, {
      jobId: job.id,
      type: "GENERATE_WEBSITE",
      prompt: businessData,
    }).catch(err => console.error("Failed to trigger AI engine:", err.message));

    // Respond immediately with the job ID
    res.status(202).json({
      success: true,
      data: { jobId: job.id, websiteId: websiteId, status: "PENDING" }
    });

  } catch (error) {
    console.error("Failed to start website generation:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// POST /api/generate/website-variations — Synchronously fetch 3 distinct template variations (Modern, Luxury, Minimal)
router.post("/website-variations", async (req: Request, res: Response) => {
  const { businessData } = req.body;
  if (!businessData) {
    return res.status(400).json({ success: false, error: "Missing businessData" });
  }

  console.log("STEP 3: Generation API called for variations");
  console.log("STEP 4: OpenAI request started");

  try {
    // Attempt synchronous generation from AI-engine
    const response = await axios.post(`${AI_ENGINE_URL}/api/jobs/generate-sync`, {
      businessData
    }, { timeout: 35000 }); // 35 seconds timeout

    if (response.data && response.data.success) {
      console.log("STEP 5: OpenAI response received successfully");
      const baseWebsiteJson = response.data.data;
      console.log("STEP 6: Website JSON parsed from AI engine");
      
      const templates = createVariations(baseWebsiteJson);
      return res.json({ success: true, data: { templates } });
    } else {
      throw new Error("AI engine failed to process sync generation");
    }
  } catch (err: any) {
    console.warn("⚠️ AI Generation failed or timed out. Falling back to industry-specific mock templates instantly...", err.message);
    
    // STEP 9: Strict fallback to industry-specific templates (Bakery, Restaurant, Salon, Electronics, Gym)
    const baseFallbackJson = generateMockIndustryWebsite(businessData);
    console.log("STEP 5: Local industry fallback loaded");
    console.log("STEP 6: Local website JSON parsed");
    
    const templates = createVariations(baseFallbackJson);
    return res.json({ success: true, data: { templates, fallbackUsed: true } });
  }
});

// POST /api/generate/test-bakery — Direct self-contained test route to generate bakery without AI
router.post("/test-bakery", async (req: Request, res: Response) => {
  const { websiteId } = req.body;
  if (!websiteId) {
    return res.status(400).json({ success: false, error: "Missing websiteId" });
  }

  try {
    console.log("[Test Route] Manually generating Pune Bakery mockup...");
    const mockBakery = generateMockIndustryWebsite({
      name: "Pune Bakery Specialists",
      type: "Bakery",
      audience: "families and cake lovers",
      whatsappNumber: "+91 98765 43210"
    });

    const theme = mockBakery.theme;
    const meta = mockBakery.meta;
    const globalSettings = mockBakery.globalSettings;
    const pages = mockBakery.pages;

    await prisma.$transaction([
      prisma.website.update({
        where: { id: websiteId },
        data: {
          description: meta.description || " Pune Bakery Shop",
          config: { meta, theme, globalSettings }
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

    return res.json({ success: true, message: " Pune Bakery generated successfully in test route!" });
  } catch (error: any) {
    console.error("Test bakery creation failed:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/generate/status/:id — SSE progress stream
router.get("/status/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  res.write(`data: ${JSON.stringify({ status: "CONNECTED", message: "Analyzing..." })}\n\n`);

  let isClosed = false;

  req.on("close", () => {
    isClosed = true;
  });

  const interval = setInterval(async () => {
    if (isClosed) {
      clearInterval(interval);
      return;
    }

    try {
      const job = await prisma.aIJob.findUnique({
        where: { id },
      });

      if (!job) {
        res.write(`data: ${JSON.stringify({ status: "ERROR", message: "Job not found" })}\n\n`);
        clearInterval(interval);
        res.end();
        return;
      }

      let message = "Designing...";
      if (job.status === "COMPLETED") message = "Done!";
      else if (job.status === "FAILED") message = "Error!";
      else if (job.status === "PROCESSING") {
        message = "Writing...";
      }

      res.write(`data: ${JSON.stringify({ 
        status: job.status, 
        message, 
        result: job.status === "COMPLETED" ? job.result : null,
        error: job.error 
      })}\n\n`);

      if (job.status === "COMPLETED" || job.status === "FAILED") {
        clearInterval(interval);
        res.end();
      }
    } catch (error) {
      console.error("SSE Poll Error:", error);
      res.write(`data: ${JSON.stringify({ status: "ERROR", message: "Internal Error" })}\n\n`);
      clearInterval(interval);
      res.end();
    }
  }, 1500);
});

export default router;
