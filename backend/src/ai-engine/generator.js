/**
 * SiteForge - True AI Website Generation Engine
 * Performs business profiling analysis, dynamic section flow selection, design token generation,
 * and compiles 3 completely distinct visual variations (Modern, Luxury, Minimal).
 */

const UNSPLASH_IMAGES = {
  bakery: [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", // artisanal bread
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80", // chocolate cake
    "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80", // red velvet cup cake
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80", // baking pastries
    "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80"  // sourdough loaf
  ],
  restaurant: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", // warm dining room
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", // paneer tikka masala
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80", // butter chicken
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", // chef plating
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"  // cozy cafe table
  ],
  salon: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80", // styling hair chair
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80", // beauty makeup HD
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80", // facial spa therapy
    "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80", // hair transformation blowout
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80"  // luxury styling mirror
  ],
  gym: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80", // fitness gears floor
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80", // coach personal trainer
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80", // athletic dumbbell lifting
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80", // active intense group running
    "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80"  // strength rig workout
  ],
  electronics: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", // high-end ANC headphones
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", // sleek curve smartwatch
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80", // voice control smart speaker
    "https://images.unsplash.com/photo-1496181130204-7552cc145cdb?auto=format&fit=crop&w=800&q=80", // minimal laptop setups
    "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80"  // wireless soundbar and TV
  ],
  generic: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", // premium office glass tower
    "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80", // design meeting notes
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", // charts consulting
    "https://images.unsplash.com/photo-1521737711867-e3b90473bd58?auto=format&fit=crop&w=800&q=80", // friendly customer services
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"  // premium business desk room
  ]
};

// Clean categories helpers
function parseBusinessCategory(rawType) {
  const type = (rawType || "").toLowerCase();
  if (type.includes("bakery") || type.includes("cake") || type.includes("pastry") || type.includes("sweet")) return "bakery";
  if (type.includes("rest") || type.includes("cafe") || type.includes("food") || type.includes("dine") || type.includes("bistro")) return "restaurant";
  if (type.includes("salon") || type.includes("spa") || type.includes("hair") || type.includes("beauty") || type.includes("nail")) return "salon";
  if (type.includes("gym") || type.includes("fit") || type.includes("crossfit") || type.includes("wellness")) return "gym";
  if (type.includes("elect") || type.includes("phone") || type.includes("gadg") || type.includes("store") || type.includes("tech")) return "electronics";
  return "generic";
}

// AI Analysis Phase builder
function runAIAnalysis(businessData, style) {
  const name = businessData.name || "Elite Business";
  const category = parseBusinessCategory(businessData.type);
  const rawType = businessData.type || "Retail Shop";
  const targetAudience = businessData.audience || "valuable customers";

  let brandPersonality = "Warm Family & Traditional Artisanal";
  let customerType = `Valued community of ${targetAudience} seeking high-quality execution in Pune.`;
  let conversionGoal = "Generate direct WhatsApp bookings and phone leads";
  let designRecommendation = "Structured Grid Layout with Warm Accent Gradients";

  if (category === "bakery") {
    brandPersonality = style === "luxury" ? "Premium Artisanal Luxury Confectionery" : style === "minimal" ? "Sleek Modern Minimal Bakehouse" : "Warm Organic Local Bakery";
    customerType = `Dessert lovers, party planners, and families seeking custom cakes in Pune.`;
    conversionGoal = "Increase custom WhatsApp cake orders and walk-in footfall";
    designRecommendation = "Warm sensory layout, Playfair Display serif typography, gold-toned amber HSL borders, and generous breathing margins.";
  } else if (category === "restaurant") {
    brandPersonality = style === "luxury" ? "Fine Dining Heritage & Gastronomy" : style === "minimal" ? "Stark Avant-Garde Modern Bistro" : "Vibrant Contemporary Fusion Eatery";
    customerType = `Food enthusiasts, local families, and corporate groups seeking ambient dining in Pune.`;
    conversionGoal = "Sustain instant clay oven dining reservations and WhatsApp takeaway checkouts";
    designRecommendation = "Dark-mode immersive culinary flow, Outfit typography, electric crimson gradients, and glassmorphic card overlays.";
  } else if (category === "salon") {
    brandPersonality = style === "luxury" ? "High-End Pampering & Beauty Retreat" : style === "minimal" ? "Organic Stark Aesthetic Hair Studio" : "Chic Trendy Contemporary Salon";
    customerType = `Style-conscious professionals and brides-to-be seeking customized treatments.`;
    conversionGoal = "Drive instant salon slot bookings and showcase HD hair/makeup conversions";
    designRecommendation = "Glamour transformation split layouts, Inter sans-serif font, neutral carbon tones, and seamless inline booking forms.";
  } else if (category === "gym") {
    brandPersonality = style === "luxury" ? "Elite Performance Athletic Club" : style === "minimal" ? "Focus-Oriented Stark Strength Vault" : "Dynamic High-Energy Community Fitness";
    customerType = `Athletes, working professionals, and fitness enthusiasts targeting body transformations.`;
    conversionGoal = "Drive recurring gym memberships signups and personal coach consultations";
    designRecommendation = "High-octane energetic sections, Satoshi typography, forest green or vibrant orange colors, and thick shadowed transformation cards.";
  } else if (category === "electronics") {
    brandPersonality = style === "luxury" ? "Authorized Premium Tech Boutique" : style === "minimal" ? "Minimalist Smart Lab & Gadget Hub" : "Multi-Brand Digital Outpost";
    customerType = `Tech adopters, audiophiles, and smart home enthusiasts seeking official brand warranties.`;
    conversionGoal = "Promote current product offers, easy finance approvals, and technical support";
    designRecommendation = "Tech-specification sharp grids, Stark carbon grey colors, clean sans-serif layouts, and high-contrast call-to-actions.";
  }

  return {
    businessType: category,
    brandPersonality,
    customerType,
    conversionGoal,
    designRecommendation
  };
}

// Generate image suggestions based on industry
function getUnsplashImages(category) {
  return UNSPLASH_IMAGES[category] || UNSPLASH_IMAGES.generic;
}

// Generate design tokens (colors, font, margins, cards, buttons)
function generateDesignTokens(style, colorThemePreference) {
  const fonts = {
    modern: ["Outfit", "Plus Jakarta Sans", "Syne", "Cabinet Grotesk", "Satoshi"],
    luxury: ["Playfair Display", "Cormorant Garamond", "Cinzel", "Bodoni Moda", "Lora"],
    minimal: ["Inter", "DM Sans", "Manrope", "Space Grotesk", "Satoshi"]
  };

  const modernPalettes = [
    { primary: "#4F46E5", secondary: "#0F172A", accent: "#10B981" },
    { primary: "#7C3AED", secondary: "#1E1B4B", accent: "#F43F5E" },
    { primary: "#2563EB", secondary: "#0F172A", accent: "#06B6D4" },
    { primary: "#EC4899", secondary: "#111827", accent: "#8B5CF6" },
    { primary: "#EA580C", secondary: "#1C1917", accent: "#84CC16" }
  ];

  const luxuryPalettes = [
    { primary: "#7F1D1D", secondary: "#1C1917", accent: "#D97706" },
    { primary: "#064E3B", secondary: "#0B0F19", accent: "#FBBF24" },
    { primary: "#1E3A8A", secondary: "#0F172A", accent: "#EAB308" },
    { primary: "#1F2937", secondary: "#030712", accent: "#D97706" }
  ];

  const minimalPalettes = [
    { primary: "#18181B", secondary: "#F4F4F5", accent: "#71717A" },
    { primary: "#292524", secondary: "#FAF9F6", accent: "#78716C" },
    { primary: "#27272A", secondary: "#FAFAFA", accent: "#A1A1AA" }
  ];

  const spacingOptions = ["compact", "medium", "large"];
  const spacing = spacingOptions[Math.floor(Math.random() * spacingOptions.length)];

  const fontFamily = fonts[style] ? fonts[style][Math.floor(Math.random() * fonts[style].length)] : "Outfit";

  let selectedPalette;
  if (style === "luxury") {
    selectedPalette = luxuryPalettes[Math.floor(Math.random() * luxuryPalettes.length)];
  } else if (style === "minimal") {
    selectedPalette = minimalPalettes[Math.floor(Math.random() * minimalPalettes.length)];
  } else {
    selectedPalette = modernPalettes[Math.floor(Math.random() * modernPalettes.length)];
  }

  const primaryColor = colorThemePreference || selectedPalette.primary;
  const secondaryColor = selectedPalette.secondary;
  const accentColor = selectedPalette.accent;

  let cardStyle = "rounded-2xl border border-zinc-150 shadow-sm hover:shadow-lg transition-all duration-300 bg-white";
  let buttonStyle = "rounded-xl font-bold tracking-wide shadow-md hover:scale-103 active:scale-98 transition-all px-6 py-2.5";
  let imageStyle = "rounded-2xl shadow-md object-cover";

  if (style === "luxury") {
    const cardOptions = [
      "rounded-3xl border border-amber-900/10 shadow-2xl bg-stone-50/70 backdrop-blur-md hover:border-amber-800/30 transition-all duration-500",
      "rounded-2xl border border-stone-200/50 shadow-xl bg-stone-50 hover:-translate-y-1 transition-all duration-500",
      "rounded-none border-t border-b border-stone-850 shadow-none bg-stone-100/50 hover:bg-stone-50 transition-all duration-300"
    ];
    const buttonOptions = [
      "rounded-none font-bold tracking-widest uppercase border border-amber-800 hover:bg-amber-900 hover:text-white transition-all px-8 py-3.5",
      "rounded-3xl font-semibold tracking-wide bg-amber-900 hover:bg-amber-800 text-white transition-all px-7 py-3 shadow-lg"
    ];
    cardStyle = cardOptions[Math.floor(Math.random() * cardOptions.length)];
    buttonStyle = buttonOptions[Math.floor(Math.random() * buttonOptions.length)];
    imageStyle = "rounded-3xl shadow-2xl object-cover hover:scale-102 transition-all duration-500 border border-stone-250";
  } else if (style === "minimal") {
    const cardOptions = [
      "rounded-none border border-zinc-200 shadow-none bg-white hover:bg-zinc-50 transition-all duration-200",
      "rounded-none border-2 border-black shadow-none bg-white hover:-translate-y-0.5 transition-all duration-350",
      "rounded-none border border-transparent bg-zinc-100 hover:bg-zinc-200 transition-all duration-200"
    ];
    const buttonOptions = [
      "rounded-none font-black tracking-wider uppercase bg-black text-white hover:bg-zinc-800 transition-all px-6 py-3",
      "rounded-none font-medium border border-zinc-900 text-zinc-950 hover:bg-zinc-950 hover:text-white transition-all px-6 py-3"
    ];
    cardStyle = cardOptions[Math.floor(Math.random() * cardOptions.length)];
    buttonStyle = buttonOptions[Math.floor(Math.random() * buttonOptions.length)];
    imageStyle = "rounded-none shadow-none border border-zinc-150 object-cover";
  } else {
    // Modern Professional options
    const cardOptions = [
      "rounded-2xl border border-slate-100 shadow-xl bg-white/70 backdrop-blur-lg hover:shadow-2xl hover:border-indigo-100 transition-all duration-300",
      "rounded-3xl border border-slate-200 shadow-lg bg-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300",
      "rounded-xl border border-slate-150 shadow bg-zinc-50 hover:bg-white hover:shadow-md transition-all duration-300"
    ];
    const buttonOptions = [
      "rounded-2xl font-black bg-gradient-to-r from-indigo-600 to-indigo-700 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-97 transition-all px-7 py-3",
      "rounded-full font-extrabold bg-gradient-to-r from-indigo-600 to-emerald-500 hover:opacity-90 text-white shadow-md transition-all px-6 py-2.5"
    ];
    cardStyle = cardOptions[Math.floor(Math.random() * cardOptions.length)];
    buttonStyle = buttonOptions[Math.floor(Math.random() * buttonOptions.length)];
    imageStyle = "rounded-2xl shadow-xl hover:shadow-2xl hover:scale-103 transition-all duration-300 object-cover";
  }

  return {
    primaryColor,
    secondaryColor,
    accentColor,
    fontFamily,
    style,
    spacing,
    cardStyle,
    buttonStyle,
    imageStyle
  };
}

// Generate highly custom section details
function generateSectionContent(businessData, style, sectionType) {
  const name = businessData.name || "Premium Shop";
  const rawType = businessData.type || "Retail";
  const category = parseBusinessCategory(rawType);
  const images = getUnsplashImages(category);

  switch (sectionType) {
    case "hero":
      let heroTitle = `Experience the Ultimate ${rawType} at ${name}`;
      let heroSubtitle = `Discover standard-setting craftsmanship and dedicated quality crafted specifically for you in Pune.`;
      let ctaText = businessData.whatsappEnabled ? "Order on WhatsApp" : "Get in Touch";
      let ctaLink = businessData.whatsappEnabled && businessData.whatsappNumber ? `https://wa.me/${businessData.whatsappNumber.replace(/\D/g,'')}` : "#contact";

      if (category === "bakery") {
        heroTitle = `Artisanal Warmth & Oven-Fresh Cakes at ${name}`;
        heroSubtitle = `Indulge in French-inspired sourdough breads, buttery-rich croissants, and custom celebration cakes baked fresh daily in Pune using pure organic local ingredients.`;
      } else if (category === "restaurant") {
        heroTitle = `Exquisite Culinary Masterpieces & Fine Dining at ${name}`;
        heroSubtitle = `Savor authentic regional delicacies and modern fusion cuisine prepared in our live kitchen by top Pune culinary chefs. Experience real taste, ambient seating, and warm hospitality.`;
      } else if (category === "salon") {
        heroTitle = `Reveal Your Ultimate Confidence at ${name} Luxury Salon`;
        heroSubtitle = `Pamper yourself with premium hair styling, personalized skin facials, high-definition bridal makeovers, and soothing beauty therapies curated by master stylist experts.`;
      } else if (category === "gym") {
        heroTitle = `Unleash Your Absolute Peak Strength at ${name}`;
        heroSubtitle = `Transform your mind and body with elite certified trainers, state-of-the-art strength gear decks, customized calorie diets, and high-energy workout group programs in Pune.`;
      } else if (category === "electronics") {
        heroTitle = `Smart Living & Premium Gadget Innovation at ${name}`;
        heroSubtitle = `Explore authorized smart home solutions, Hybrid ANC headphones, OLED curved display watches, and elite laptops at the best prices with instant zero-downpayment EMIs.`;
      }

      return {
        title: heroTitle,
        subtitle: heroSubtitle,
        ctaText,
        ctaLink,
        backgroundImage: images[0]
      };

    case "about":
      let aboutTitle = `Our Passion for Perfect Execution`;
      let aboutDesc = `At ${name}, we are dedicated to setting standard-setting quality in our local community. Every item and support service is crafted meticulously, naturally sourced, and delivered daily with absolute passion.`;
      let highlights = ["100% Genuine Care", "Elite Local Team", "Standard-Setting Dedication", "Customer First"];

      if (category === "bakery") {
        aboutTitle = `Our Journey of Butter, Flour & Natural Sourdough`;
        aboutDesc = `At ${name}, we believe bread is the soul of every dining table. For over a decade, we have combined slow French natural fermentation with local Pune organic ingredients. We strictly use zero preservatives, chemicals, or raising agents—crafting pure artisan pastries and celebration cakes handcrafted with pure organic butter.`;
        highlights = ["100% Natural Organic Flours", "Naturally Fermented Sourdough", "Pure Organic Cream & Butter", "No Chemical Additives"];
      } else if (category === "restaurant") {
        aboutTitle = `Crafting Culinary Legends with Chef Passion`;
        aboutDesc = `Welcome to the home of authentic dining. In our kitchen, every dish is an artwork. We slow-simmer clay-oven paneer and tender tandoori chicken to golden tenderness, extracting natural flavors using organic spices and cold-pressed oils. Our chefs unite modern cooking techniques with rich culinary secrets to delight Pune.`;
        highlights = ["Live Glass Oven Kitchen", "Strictly Fresh Local Sourcing", "Artisanal Chef Formulations", "Hygienic Organic Ingredients"];
      } else if (category === "salon") {
        aboutTitle = `Bespoke Beauty Curated by Luxury Specialists`;
        aboutDesc = `At ${name}, your beauty is our creative science. We merge advanced European style trends with organic skin formulations to give your skin a natural glowing revitalize. Our team consists of highly certified scalp therapists and fashion artists committed to providing a relaxing, deeply pampering session.`;
        highlights = ["Internationally Certified Pros", "Premium Imported Brands Only", "Advanced Hygienic Scalp Care", "Bespoke Bridal Consultations"];
      } else if (category === "gym") {
        aboutTitle = `Built for Iron, Steel & Healthy Mindset Goals`;
        aboutDesc = `We don't offer memberships; we deliver body transformations. ${name} represents Pune's absolute premium fitness biome. Our facility showcases Olympic-tier mechanical strength frames, expansive free weight floors, and a dedicated team of nutrition counselors charting out calorie macros designed for your body type.`;
        highlights = ["Olympic Strength Rig Platforms", "Certified Personal Coaches", "Custom Macro Meal Charts", "Continuous Bi-Weekly Tracking"];
      } else if (category === "electronics") {
        aboutTitle = `Leading Pune's Smart Gadget Revolutions`;
        aboutDesc = `Since our launch, ${name} has stood as the go-to smart lab for technology fans. We bridge the gap between innovation and accessibility. As authorized dealers, we guarantee 100% authentic brand warranty cards, zero-downpayment Easy EMIs, and a dedicated post-sales tech support desk to help resolve issues.`;
        highlights = ["100% Authorized Products", "Official Brand Warranty Cards", "Zero Downpayment Easy EMIs", "Expert Technical Support Desk"];
      }

      return {
        title: aboutTitle,
        description: aboutDesc,
        image: images[1],
        highlights
      };

    case "services":
      let servTitle = "Our Elite Service Offerings";
      let servSubtitle = "Prepared with maximum dedication and premium standards";
      let services = [
        { name: "Premium Advisory", description: "Get direct support from industry leaders tailored to your exact goal.", icon: "Sparkles" },
        { name: "Local On-Demand Delivery", description: "Freshly packaged orders delivered direct to your home with complete safety.", icon: "Clock" },
        { name: "Customer-First Support", description: "Connect with our representative anytime on WhatsApp for support.", icon: "Heart" }
      ];

      if (category === "bakery") {
        servTitle = "Artisanal Bakehouse Specialties";
        servSubtitle = "Freshly pulled from our ovens in Koregaon Park every morning";
        services = [
          { name: "Designer Birthday Cakes", description: "Personalized multi-tier fondant cake designs matching your special celebration themes.", icon: "Cake" },
          { name: "Flaky Sourdough & Crusts", description: "Wild-yeast naturally fermented crusty breads, baguettes, and soft dinner brioche.", icon: "Flame" },
          { name: "French Gourmet Pastries", description: "Warm butter croissants, lemon custard tarts, and Belgian dark chocolate eclairs.", icon: "Cookie" }
        ];
      } else if (category === "restaurant") {
        servTitle = "Exquisite Dining Specialties";
        servSubtitle = "Indulge in a premium gastronomic journey prepared fresh";
        services = [
          { name: "Aromatic Clay Oven Grill", description: "Smoky paneer tikka, grilled button mushrooms, and tender herb skewers.", icon: "Flame" },
          { name: "Ambient Dine-In Luxury", description: "Beautiful, temperature-regulated acoustics and private family cabins.", icon: "GlassWater" },
          { name: "WhatsApp Counter Takeaway", description: "Place your order directly online and pick up hot at our counter in 15 mins.", icon: "ShoppingBag" }
        ];
      } else if (category === "salon") {
        servTitle = "Premium Styling & Makeovers";
        servSubtitle = "Advanced professional services using premium imported brands";
        services = [
          { name: "Precision Trends Haircuts", description: "Custom structural crops, highlights, balayage, and botanical hair spa therapy.", icon: "Scissors" },
          { name: "Revitalizing Skin Facials", description: "Deep dermis hydration, organic peel-offs, and micro-current lifting glow.", icon: "Sparkles" },
          { name: "HD Bridal Makeup Packages", description: "Complete airbrush coverage styling, saree draping, and customized nail art.", icon: "Heart" }
        ];
      } else if (category === "gym") {
        servTitle = "Elite Physical Programs";
        servSubtitle = "Customized goals backed by sports sciences and certified coaching";
        services = [
          { name: "Strength & Hypertrophy", description: "Structural mechanical compound lifts, free weights, and athletic kettlebell drill.", icon: "Dumbbell" },
          { name: "High Intensity Cardio/HIIT", description: "Endurance boxing pads, metabolic rowers, and functional stamina circuits.", icon: "Activity" },
          { name: "Nutrition & Diet Counseling", description: "Personalized macros meal schedules, protein profiling, and weekly caliper check.", icon: "Utensils" }
        ];
      } else if (category === "electronics") {
        servTitle = "Authorized Tech Solutions";
        servSubtitle = "Discover advanced smart ecosystems with premium warranties";
        services = [
          { name: "Personal Audio Consultation", description: "Audition the latest Hybrid ANC audio rigs, noise cancel setups, and soundbars.", icon: "Headphones" },
          { name: "Smart Home Integration", description: "Continuous security cameras, voice smart speakers, and automated accent lighting.", icon: "Cpu" },
          { name: "Post-Purchase Technical Care", description: "Complete official manufacturer claim handlings, replacement, and firmware updates.", icon: "ShieldCheck" }
        ];
      }

      return {
        title: servTitle,
        subtitle: servSubtitle,
        services
      };

    case "products":
      let prodTitle = "Bestselling Collections";
      let prodSubtitle = "Handpicked selections highly recommended for you";
      let products = [
        { name: "Premium Signature Selection", price: "Rs. 999", description: "Crafted meticulously with premium local inputs.", image: images[2] }
      ];

      if (category === "bakery") {
        prodTitle = "Bakehouse Bestsellers";
        prodSubtitle = "Beloved local Pune favorites baked in limited batches daily";
        products = [
          { name: "Signature Dark Truffle Cake", price: "Rs. 649", description: "Rich Belgian chocolate layers with silky ganache overlay.", image: images[2] },
          { name: "Almond Butter Croissant", price: "Rs. 140", description: "Twice-baked flaky croissant stuffed with rich organic almond paste.", image: images[3] },
          { name: "Artisanal Sourdough Boule", price: "Rs. 180", description: "Naturally fermented for 24 hours with an airy crumb and crispy crust.", image: images[4] }
        ];
      } else if (category === "restaurant") {
        prodTitle = "Chef's Signature Dishes";
        prodSubtitle = "Exquisite culinary creations that highlight our kitchen legacy";
        products = [
          { name: "Kasturi Paneer Tikka Masala", price: "Rs. 340", description: "Clay-oven grilled paneer cubes in rich spiced cashew tomato gravy.", image: images[2] },
          { name: "Forge Butter Chicken Special", price: "Rs. 399", description: "Tender tandoori chicken shreds simmered in butter tomato velvet gravy.", image: images[3] },
          { name: "Artisanal Awadhi Veg Biryani", price: "Rs. 290", description: "Long-grain basmati layers with saffron, organic spices, and seasonal veggies.", image: images[4] }
        ];
      } else if (category === "salon") {
        prodTitle = "Professional Self-Care Products";
        prodSubtitle = "Take the luxury salon feeling home with organic brand formulations";
        products = [
          { name: "Keratin Infusion Deep Mask", price: "Rs. 1,499", description: "Sulfate-free hydration mask for damaged, chemically treated hair.", image: images[2] },
          { name: "Glowing Botanicals Vitamin C Serum", price: "Rs. 899", description: "100% organic active fruit extract serum for vibrant morning skin.", image: images[3] }
        ];
      } else if (category === "gym") {
        prodTitle = "Elite Supplement Gear";
        prodSubtitle = "Fuel your body with 100% verified authentic nutrition packs";
        products = [
          { name: "Forge Premium Whey Isolate (1kg)", price: "Rs. 4,299", description: "27g ultra-pure grass-fed whey isolate with zero sugar and fast digestion.", image: images[2] },
          { name: "Sports Performance Shaker Bottle", price: "Rs. 499", description: "Leak-proof, BPA-free plastic shaker with steel spiral mixing ball.", image: images[3] }
        ];
      } else if (category === "electronics") {
        prodTitle = "Bestselling Smart Gadgets";
        prodSubtitle = "Get premium features at standard price with authorized warranty";
        products = [
          { name: "Pro Sound ANC Wireless Headphones", price: "Rs. 7,499", description: "Wireless hybrid active noise-cancelling overhead headphones with 40h battery.", image: images[2] },
          { name: "Forge Lite Amoled Smartwatch", price: "Rs. 3,499", description: "AMOLED curved display with continuous heart and blood oxygen monitor.", image: images[3] },
          { name: "Smart Sync Voice Speaker", price: "Rs. 4,999", description: "Full-range 360 sound smart assistant speaker with direct Spotify connect.", image: images[4] }
        ];
      }

      return {
        title: prodTitle,
        subtitle: prodSubtitle,
        products
      };

    case "gallery":
      return {
        title: category === "bakery" ? "Cake Gallery" : "Visual Gallery",
        subtitle: category === "bakery" ? "A showcase of our hand-crafted cakes and desserts" : "A walkthrough of our premium spaces and products",
        images: [
          { url: images[0], caption: "Elegance in Detail" },
          { url: images[1], caption: "Our Cozy Atmosphere" },
          { url: images[2], caption: "Handcrafted Specialties" },
          { url: images[3], caption: "Prepared Fresh Daily" },
          { url: images[4], caption: "Standard of Perfection" }
        ]
      };

    case "team":
      return {
        title: "Meet Our Elite Team",
        subtitle: "Highly certified and experienced specialists ready to assist you",
        members: [
          { name: "Siddharth Mehta", role: "Founder & Lead Director", bio: "15+ years of strategic leadership and standard-setting vision.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
          { name: "Priya Nair", role: "Operations Specialist", bio: "Committed to delivering seamless experiences and premium client care.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
          { name: "Rohan Deshmukh", role: "Head of Craftsmanship", bio: "Meticulous expert charting new heights in product execution.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" }
        ]
      };

    case "pricing":
      return {
        title: "Simple & Transparent Pricing",
        subtitle: "Choose a package tailored directly to your requirements",
        tiers: [
          { name: "Standard Session", price: "Rs. 1,499", features: ["1x Premium Service Consultation", "Basic Custom Recommendations", "WhatsApp Support Access"], popular: false, cta: "Book Session" },
          { name: "Premium Forge Pack", price: "Rs. 3,999", features: ["3x Complete Specialty Services", "Customized Macro / Style Profiling", "Priority 24/7 WhatsApp Support", "Free Local Quick Delivery"], popular: true, cta: "Choose Premium" },
          { name: "Ultimate Elite Membership", price: "Rs. 9,999", features: ["Unlimited Premium Services", "Direct Personal Coach Access", "100% Custom Product Batches", "Exclusive VIP Lounge Entry"], popular: false, cta: "Go Elite" }
        ]
      };

    case "testimonials":
      let testTitle = "Loved by Our Pune Community";
      let testimonials = [
        { name: "Anjali Rao", role: "Local Guide", content: `Absolutely exceptional experience at ${name}. Their service is always professional and product quality is standard-setting!`, rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
        { name: "Vikram Malhotra", role: "Koregaon Park Resident", content: `The absolute best in terms of reliability and product standards. Clean staff, fast response, and elite environment!`, rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" }
      ];

      if (category === "bakery") {
        testimonials = [
          { name: "Shruti Kulkarni", role: "Cake Enthusiast", content: `We ordered a custom 3-tier chocolate ganache cake for my daughter's birthday. It was exceptionally stunning and tasted absolutely rich, moist, and delicious!`, rating: 5, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" },
          { name: "Kabir Joshi", role: "Regular Customer", content: `Their natural sourdough is Pune's finest. The almond butter croissants are flaky, soft, and buttery perfection!`, rating: 5, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" }
        ];
      } else if (category === "restaurant") {
        testimonials = [
          { name: "Sanjay Shah", role: "Food Critic", content: `The Kasturi Paneer Tikka is an absolute masterpiece—perfect smoky char, velvety gravy, and melt-in-the-mouth texture. Outstanding dine-in music!`, rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
          { name: "Meera Deshpande", role: "Weekend Diner", content: `Direct WhatsApp takeaway works beautifully. Placed the butter chicken order, picked it up hot in 15 mins. Exceptional hygiene!`, rating: 5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" }
        ];
      } else if (category === "salon") {
        testimonials = [
          { name: "Neha Sharma", role: "Bridal Client", content: `SiteForge Salon did my HD bridal makeovers and hair styling. Absolute dream! The makeup stayed fresh, HD photos came out brilliant!`, rating: 5, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" },
          { name: "Rahul Varma", role: "Regular Client", content: `Excellent haircut trends and organic scalp facials. Extremely premium imported products. Highly recommended for hair treatments!`, rating: 5, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" }
        ];
      } else if (category === "gym") {
        testimonials = [
          { name: "Aditya Patil", role: "Powerlifter", content: `The personal coaching here completely transformed my compound lifting form. Gained 8kg lean mass in 4 months. State-of-the-art strength gear decks!`, rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
          { name: "Tanvi Sawant", role: "Fitness Member", content: `Absolutely love their nutrition macros consult. Complete meal setups made healthy eating simple and sustainable. Certified gym indeed!`, rating: 5, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" }
        ];
      } else if (category === "electronics") {
        testimonials = [
          { name: "Arjun Gawde", role: "Audiophile", content: `Tried the Pro Sound hybrid noise cancel headphones. Incredible audio quality, seamless easy EMIs setup. Friendly staff assistance!`, rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
          { name: "Sheetal Joshi", role: "Smart Home Owner", content: `Installed continuous cameras and voice smart sync in my flat. Complete authorized manufacturer warranty, solid technical support. Very reliable!`, rating: 5, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" }
        ];
      }

      return {
        title: testTitle,
        testimonials
      };

    case "faq":
      let faqTitle = "Frequently Asked Questions";
      let faqs = [
        { question: "What are your operating hours?", answer: "We are open from 9:30 AM to 8:30 PM, Monday through Saturday. Closed on select bank holidays." },
        { question: "Do you offer doorstep shipping across Pune?", answer: "Yes! We coordinate quick doorstep shipping using premium delivery riders across the city." }
      ];

      if (category === "bakery") {
        faqs = [
          { question: "Do you bake completely eggless cakes?", answer: "Absolutely! 80% of our daily menu, including all customized designer party cakes, are prepared strictly eggless upon request." },
          { question: "How much advance notice is needed for custom cakes?", answer: "For bespoke designer fondant cakes, we require booking at least 24 hours in advance to guarantee meticulous detail." }
        ];
      } else if (category === "restaurant") {
        faqs = [
          { question: "Do you cater for private family celebrations?", answer: "Yes, we specialize in corporate dinners and private family celebrations. We have elegant cabins and customized menus." },
          { question: "Is your food prepared 100% fresh?", answer: "Yes, we prioritize health. We strictly use organic cold-pressed oils, zero additives, and prepare all delicacies fresh upon order." }
        ];
      } else if (category === "salon") {
        faqs = [
          { question: "Do I need to book slot appointments in advance?", answer: "While we accept walk-in clients, booking a slot online via WhatsApp guarantees zero waiting time and direct service." },
          { question: "What professional hair brands do you use?", answer: "We strictly use authorized imported premium hair formulas (L'Oreal Professionnel, Olaplex) to protect hair bonds." }
        ];
      } else if (category === "gym") {
        faqs = [
          { question: "Is a diet plan included in my basic membership?", answer: "Yes! Every standard membership includes a basic macro calorie consult and baseline physical caliper tracking." },
          { question: "What are the hours of the personal training coaches?", answer: "Our certified personal coaches are available on the floor from 6:00 AM to 10:00 PM to fit your working schedules." }
        ];
      } else if (category === "electronics") {
        faqs = [
          { question: "What documents are required for zero-downpayment EMIs?", answer: "You only need basic digital identity proofs (Aadhar, PAN card) for instant, paperless financing approvals at our counter." },
          { question: "How does the authorized warranty process work?", answer: "Every product includes an official manufacturer warranty card. If issues occur, bring it back and we handle direct brand replacements." }
        ];
      }

      return {
        title: faqTitle,
        faqs
      };

    case "contact":
      return {
        title: category === "bakery" ? "Location & Contact" : "Say Hello or Drop By!",
        phone: businessData.whatsappNumber || "+91 98765 43210",
        email: `hello@${(name || "shop").toLowerCase().replace(/[^a-z0-9]+/g, "")}.in`,
        address: "Shop No. 15, Galleria Commercial Plaza, Koregaon Park, Pune, Maharashtra 411001"
      };

    case "booking":
      let bookingTitle = "Schedule Your Styling Appointment";
      let bookingSub = "Choose your preferred specialist and time slot instantly";
      let fields = [
        { label: "Full Name", type: "text", placeholder: "E.g. Shruti Rao" },
        { label: "WhatsApp Number", type: "tel", placeholder: "E.g. +91 98765 43210" },
        { label: "Select Service Category", type: "select", options: ["Precision Haircut", "Revitalizing Glow Facial", "HD Makeup Bridal Consult", "Keratin Smoothing Therapy"] }
      ];
      let submitText = "Confirm Booking Slot";

      if (category === "restaurant") {
        bookingTitle = "Reserve a Premium Dine-In Table";
        bookingSub = "Secure your ambient dine-in spot for family or business dinners";
        fields = [
          { label: "Your Name", type: "text", placeholder: "E.g. Vikram Shah" },
          { label: "Guests Number", type: "number", placeholder: "E.g. 4 Guests" },
          { label: "Select Dining Zone", type: "select", options: ["Ambient Main Hall", "Acoustic Family Cabin", "Open Air Sky Terrace"] }
        ];
        submitText = "Confirm Table Reservation";
      }

      return {
        title: bookingTitle,
        subtitle: bookingSub,
        fields,
        submitText
      };

    case "menu":
      let menuTitle = "Our Culinary Bakehouse Menu";
      let menuSubtitle = "Handcrafted specialties baked fresh using pure organic cream";
      let categories = [
        {
          name: "Oven Fresh Breads",
          items: [
            { name: "Naturally Fermented Sourdough", price: "Rs. 180", tags: ["Veg", "Bestseller"], desc: "Rustic golden crust with a beautiful sour airy crumb." },
            { name: "French Garlic Baguette", price: "Rs. 120", tags: ["Veg"], desc: "Loaded with fresh herbs, organic garlic, and dairy butter." }
          ]
        },
        {
          name: "Designer Cakes & Pastries",
          items: [
            { name: "Red Velvet Cream Cheese Slice", price: "Rs. 140", tags: ["Eggless", "Bestseller"], desc: "Classic crimson cake slice topped with sweet premium cream cheese." },
            { name: "Double Belgian Fudge Cake", price: "Rs. 699", description: "Layers of dense chocolate sponge with rich dark ganache." }
          ]
        }
      ];

      if (category === "restaurant") {
        menuTitle = "Exquisite Culinary Dine-In Menu";
        menuSubtitle = "Indulge in organic spices and authentic regional delicacies";
        categories = [
          {
            name: "Clay Oven Tandoor App",
            items: [
              { name: "Kasturi Paneer Tikka", price: "Rs. 320", tags: ["Veg", "Chef Special"], desc: "Marinated in cream, Cashew paste, and golden roasted fenugreek." },
              { name: "Tandoori Stuffed Mushrooms", price: "Rs. 280", tags: ["Veg"], desc: "Oven-roasted button mushrooms stuffed with spiced cottage cheese." }
            ]
          },
          {
            name: "Signature Main Course",
            items: [
              { name: "Forge Butter Chicken Masala", price: "Rs. 390", tags: ["Non-Veg", "Bestseller"], desc: "Tender shredded tandoori chicken in butter tomato velvet cream." },
              { name: "Dal Bukhara Slow-Simmered", price: "Rs. 260", tags: ["Veg"], desc: "Black lentils slow-cooked overnight with cream and fresh butter." }
            ]
          }
        ];
      }

      return {
        title: menuTitle,
        subtitle: menuSubtitle,
        categories
      };

    case "portfolio":
      return {
        title: "Our Creative Portfolio",
        subtitle: "A professional showcase of customized client masterpieces",
        projects: [
          { name: "Corporate Launch Setup", category: "Commercial Events", image: images[0] },
          { name: "Artisanal Wedding Designing", category: "Designer Themes", image: images[1] },
          { name: "Bespoke Product Showcase", category: "Custom Collections", image: images[2] }
        ]
      };

    case "success-stories":
      let successTitle = "Client Success & Makeovers";
      let successSub = "Real structural results and visual transformations from Pune";
      let stories = [
        { title: "Complete Hydration Makeover", period: "1 Session", result: "From extremely dry frizzy scalp to high-gloss smooth texture.", before: "Dull, tangled, high damage hair locks.", after: "Rich, smooth, highly reflective structural glaze.", client: "Pooja Deshmukh" },
        { title: "HD Saree Draping Glamour", period: "Bridal Consult", result: "Elegant flawless makeup look staying intact for 14 hours.", before: "Acne prone uneven skin tone.", after: "Smooth HD airbrushed glowing complexion.", client: "Sneha Nair" }
      ];

      if (category === "gym") {
        successTitle = "Client Transformations";
        successSub = "Incredible physical records backed by calorie macros and tracking";
        stories = [
          { title: "Lean Muscle Reconstruction", period: "16 Weeks", result: "+6.5kg Lean Mass & -4% Body Fat.", before: "Ectomorph physique, low muscular strength, low energy.", after: "High compound lift PRs, defined athletic shoulders.", client: "Vikram Jadhav" },
          { title: "Sustainable Body Fat Shred", period: "12 Weeks", result: "-11kg Weight Loss & High Endurance.", before: "High visceral fat, sluggish cardio stamina.", after: "Active stamina, lean waist, robust cardiovascular rows.", client: "Anjali Gore" }
        ];
      }

      return {
        title: successTitle,
        subtitle: successSub,
        stories
      };

    case "memberships":
      return {
        title: "Gym Membership Tiers",
        subtitle: "Invest in physical transformation with zero signup fees",
        plans: [
          { name: "Gold Monthly Deck", price: "Rs. 2,499", duration: "1 Month", features: ["Full access to Gym Floor", "1x Fitness Assessment", "Locker & Shower Access"], highlight: false },
          { name: "Elite Platinum Pack", price: "Rs. 6,499", duration: "3 Months", features: ["All Gym Floor Access", "Custom Diet Macro Charts", "3x Personal Coach Sessions", "Free Boxing Group Class"], highlight: true },
          { name: "Ultimate VIP Iron Forge", price: "Rs. 18,999", duration: "12 Months", features: ["24/7 Unlimited Access", "Dedicated Personal Coach", "Custom Protein Shake Bar", "Continuous Physical Tracking"], highlight: false }
        ]
      };

    case "promotions":
      return {
        title: "Limited Time Smart Offers",
        subtitle: "Exclusive authorized digital promotions for our local clients",
        offers: [
          { title: "Zero Downpayment Easy EMIs", code: "TECHFINANCE", value: "Instant Approvals", desc: "Buy any smart watch or ANC wireless headphone today with Aadhar PAN card." },
          { title: "Free Premium Brand Soundbar", code: "SOUNDGIFT", value: "Worth Rs. 2,999", desc: "Get a free wireless soundbar on purchase of any high-definition smart TV." }
        ]
      };

    case "events":
      return {
        title: "Upcoming Community Events",
        subtitle: "Join our exclusive workshops and special local masterclasses",
        list: [
          { title: "Artisanal Baking Masterclass", date: "June 15", time: "10:00 AM - 1:00 PM", desc: "Learn sourdough natural fermentation and crust folding from our master chef." },
          { title: "Chocolate Ganache Designer Cakes", date: "June 22", time: "2:00 PM - 5:00 PM", desc: "Meticulous fondant frosting and Belgian chocolate glazing structural techniques." }
        ]
      };

    case "footer":
      return {
        businessName: name,
        copyright: `© ${new Date().getFullYear()} ${name}. All Rights Reserved.`,
        links: [
          { label: "Home", href: "/" },
          { label: "Services", href: "#services" },
          { label: "Contact Us", href: "#contact" }
        ]
      };

    default:
      return {};
  }
}

// Select customized layouts based on industry and theme variation
function selectLayoutAndSections(businessData, style) {
  const category = parseBusinessCategory(businessData.type);

  let sectionsList = [];

  if (category === "bakery") {
    // Hero, Best Sellers (products), Cake Gallery (gallery), Customer Reviews (testimonials), Location (contact)
    sectionsList = ["hero", "products", "gallery", "testimonials", "contact"];
  } else if (category === "restaurant") {
    // Hero, Menu, Chef Story (about), Reservation (booking), Reviews (testimonials), Contact
    sectionsList = ["hero", "menu", "about", "booking", "testimonials", "contact"];
  } else if (category === "salon") {
    // Hero, Services, Before & After Gallery (success-stories), Pricing, Reviews (testimonials), Appointment Booking (booking), Contact
    sectionsList = ["hero", "services", "success-stories", "pricing", "testimonials", "booking", "contact"];
  } else if (category === "gym") {
    // Hero, Membership Plans (memberships), Trainers (team), Transformations (success-stories), Programs (services), Contact
    sectionsList = ["hero", "memberships", "team", "success-stories", "services", "contact"];
  } else if (category === "electronics") {
    // Hero, Product Categories (services), Featured Products (products), Offers (promotions), Reviews (testimonials), Support (faq), Contact
    sectionsList = ["hero", "services", "products", "promotions", "testimonials", "faq", "contact"];
  } else {
    // Default
    sectionsList = ["hero", "about", "services", "gallery", "testimonials", "faq", "contact"];
  }

  // Shuffle middle sections to create a truly unique layout arrangement upon every generation
  if (sectionsList.length > 2) {
    const hero = sectionsList[0];
    const contact = sectionsList[sectionsList.length - 1];
    const middle = sectionsList.slice(1, -1);

    // Dynamic random shuffle
    for (let i = middle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [middle[i], middle[j]] = [middle[j], middle[i]];
    }

    sectionsList = [hero, ...middle, contact];
  }

  return sectionsList;
}

// Main compiler: Creates a complete Website JSON representing true AI schema
function compileWebsiteJSON(businessData, style, colorThemePreference) {
  const name = businessData.name || "My Business";
  const rawType = businessData.type || "Retail Shop";
  const category = parseBusinessCategory(rawType);

  const themeTokens = generateDesignTokens(style, colorThemePreference);
  const sectionsList = selectLayoutAndSections(businessData, style);

  // 1. Build Pages and Sections
  const sectionsArray = [];
  const contentMap = {};

  sectionsList.forEach((type, idx) => {
    const id = `sec_${type}_${Math.random().toString(36).substring(2, 6)}`;
    const content = generateSectionContent(businessData, style, type);
    contentMap[type] = content;

    sectionsArray.push({
      id,
      type,
      order: idx,
      visible: true,
      content,
      styles: {
        spacingValue: themeTokens.spacing,
        cardStyle: themeTokens.cardStyle,
        buttonStyle: themeTokens.buttonStyle,
        imageStyle: themeTokens.imageStyle
      }
    });
  });

  // Always append footer
  const footerId = `sec_footer_${Math.random().toString(36).substring(2, 6)}`;
  const footerContent = generateSectionContent(businessData, style, "footer");
  contentMap["footer"] = footerContent;
  sectionsArray.push({
    id: footerId,
    type: "footer",
    order: sectionsArray.length,
    visible: true,
    content: footerContent,
    styles: {}
  });

  // 2. Build SEO Meta
  const seo = {
    title: `${name} | Pune's Premium ${rawType}`,
    description: `Welcome to ${name}. Discover standard-setting ${rawType.toLowerCase()} crafted meticulously for you in Pune.`,
    favicon: category === "bakery" ? "🧁" : category === "restaurant" ? "🍽️" : category === "salon" ? "💇‍♀️" : category === "gym" ? "💪" : category === "electronics" ? "🔌" : "✨",
    keywords: [name.toLowerCase(), category, "Pune's finest", "premium quality", "local shop"]
  };

  const pages = [
    {
      name: "Home",
      slug: "/",
      sections: sectionsArray
    }
  ];

  return {
    meta: seo, // for frontend fallback compatibility
    theme: {
      primaryColor: themeTokens.primaryColor,
      secondaryColor: themeTokens.secondaryColor,
      accentColor: themeTokens.accentColor,
      fontFamily: themeTokens.fontFamily,
      style: themeTokens.style,
      spacing: themeTokens.spacing,
      cardStyle: themeTokens.cardStyle,
      buttonStyle: themeTokens.buttonStyle,
      imageStyle: themeTokens.imageStyle
    },
    globalSettings: {
      navbarStyle: style === "minimal" ? "solid" : "glass",
      footerStyle: style === "luxury" ? "complex" : "simple",
      whatsappButton: businessData.whatsappEnabled !== undefined ? businessData.whatsappEnabled : true,
      whatsappNumber: businessData.whatsappNumber || "+91 98765 43210"
    },
    pages,
    sections: sectionsArray, // root-level as requested by schema
    seo, // root-level as requested by schema
    content: contentMap // root-level as requested by schema
  };
}

// Generate Variation A (Modern), B (Luxury), C (Minimal)
function generateThreeVariations(businessData) {
  const name = businessData.name || "Elite Business";
  const userColor = businessData.colorTheme || null;

  const modernBase = compileWebsiteJSON(businessData, "modern", userColor);
  const luxuryBase = compileWebsiteJSON(businessData, "luxury", userColor);
  const minimalBase = compileWebsiteJSON(businessData, "minimal", userColor);

  return [
    {
      id: "modern",
      name: "Version A: Modern Professional",
      tagline: "Vibrant high-contrast layouts, clean rounded card shapes, elegant and dynamic sans-serif typography.",
      analysis: runAIAnalysis(businessData, "modern"),
      websiteJson: modernBase
    },
    {
      id: "luxury",
      name: "Version B: Premium Luxury",
      tagline: "Sophisticated premium styling, breathing grid margins, gold highlights, and luxury serif typography.",
      analysis: runAIAnalysis(businessData, "luxury"),
      websiteJson: luxuryBase
    },
    {
      id: "minimal",
      name: "Version C: Minimal Clean",
      tagline: "Stark monochrome grids, generous whitespace, raw outline borders, and direct sans-serif typography.",
      analysis: runAIAnalysis(businessData, "minimal"),
      websiteJson: minimalBase
    }
  ];
}

module.exports = {
  compileWebsiteJSON,
  generateThreeVariations
};
