import { Router, Request, Response } from "express";
import { prisma } from "@siteforge/database";
import axios from "axios";

const router = Router();
const AI_ENGINE_URL = process.env.AI_ENGINE_URL || "http://localhost:5001";

// High-quality stock photo keywords repository
const KEYWORD_IMAGES: Record<string, string> = {
  chocolate: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  velvet: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
  croissant: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
  sourdough: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
  bread: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
  pastry: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
  cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  cupcake: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
  
  paneer: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
  chicken: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  pasta: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
  cuisine: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  menu: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",

  styling: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
  hair: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
  bridal: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
  makeup: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
  color: "https://images.unsplash.com/photo-1620331702279-b7b0d2fe3576?auto=format&fit=crop&w=800&q=80",
  facial: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
  spa: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80",
  beauty: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80",

  membership: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  trainer: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
  coaching: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
  workout: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
  yoga: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
  zumba: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
  fitness: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",

  headphones: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  watch: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  laptop: "https://images.unsplash.com/photo-1496181130204-7552cc14ac1a?auto=format&fit=crop&w=800&q=80",
  phone: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
  mobile: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
  gadget: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
  device: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"
};

function getUnsplashImageForProduct(name: string, type: string): string {
  const cleanName = name.toLowerCase();
  for (const [key, url] of Object.entries(KEYWORD_IMAGES)) {
    if (cleanName.includes(key)) {
      return url;
    }
  }
  const cleanType = type.toLowerCase();
  if (cleanType.includes("bakery") || cleanType.includes("cake") || cleanType.includes("sweet")) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80";
  }
  if (cleanType.includes("rest") || cleanType.includes("cafe") || cleanType.includes("food") || cleanType.includes("dine")) {
    return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80";
  }
  if (cleanType.includes("salon") || cleanType.includes("spa") || cleanType.includes("hair") || cleanType.includes("beauty")) {
    return "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80";
  }
  if (cleanType.includes("elect") || cleanType.includes("phone") || cleanType.includes("shop") || cleanType.includes("gadg")) {
    return "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=800&q=80";
  }
  if (cleanType.includes("gym") || cleanType.includes("fit")) {
    return "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80";
  }
  if (cleanType.includes("cafe") || cleanType.includes("coffee") || cleanType.includes("tea")) {
    return "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80";
  }
  if (cleanType.includes("furniture") || cleanType.includes("decor") || cleanType.includes("sofa")) {
    return "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80";
  }
  if (cleanType.includes("footwear") || cleanType.includes("shoe") || cleanType.includes("sneaker")) {
    return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80";
  }
  if (cleanType.includes("jewel") || cleanType.includes("diamond") || cleanType.includes("gold")) {
    return "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80";
  }
  if (cleanType.includes("hospital") || cleanType.includes("clinic") || cleanType.includes("doctor")) {
    return "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80";
  }
  if (cleanType.includes("nursery") || cleanType.includes("plant") || cleanType.includes("flower")) {
    return "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80";
  }
  if (cleanType.includes("pharmacy") || cleanType.includes("medicine") || cleanType.includes("pill")) {
    return "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80";
  }
  return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
}

function generateDynamicLogoRouteTS(businessData: any, themeColors: any) {
  const name = (businessData?.name || "Brand").trim();
  const pattern = (businessData?.type || "Retail").trim();
  const primary = themeColors?.primaryColor || "#4F46E5";
  const secondary = themeColors?.secondaryColor || "#0F172A";
  const accent = themeColors?.accentColor || primary;
  
  const checkStr = `${name} ${businessData?.type || ""} ${businessData?.description || ""} ${pattern}`.toLowerCase();
  
  let exactCategory = pattern;
  let iconPath = `<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>`;
  let emojiChar = "🏷️";

  if (checkStr.includes("cafe") || checkStr.includes("coffee") || checkStr.includes("barista") || checkStr.includes("tea")) {
    exactCategory = "Cafe";
    emojiChar = "☕";
    iconPath = `<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>`;
  } else if (checkStr.includes("bakery") || checkStr.includes("cake") || checkStr.includes("pastry") || checkStr.includes("bread")) {
    exactCategory = "Bakery";
    emojiChar = "🥐";
    iconPath = `<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v2"/><path d="M12 8v2"/><path d="M17 8v2"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/>`;
  } else if (checkStr.includes("restaurant") || checkStr.includes("dining") || checkStr.includes("food") || checkStr.includes("bistro")) {
    exactCategory = "Restaurant";
    emojiChar = "🍽️";
    iconPath = `<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>`;
  } else if (checkStr.includes("furniture") || checkStr.includes("sofa") || checkStr.includes("decor") || checkStr.includes("interior")) {
    exactCategory = "Furniture";
    emojiChar = "🛋️";
    iconPath = `<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"/><path d="M4 18v2"/><path d="M20 18v2"/>`;
  } else if (checkStr.includes("footwear") || checkStr.includes("shoe") || checkStr.includes("sneaker") || checkStr.includes("boot")) {
    exactCategory = "Footwear";
    emojiChar = "👟";
    iconPath = `<path d="M4 16v-2.38C4 11.5 5.97 10.1 8 10h4.5a3.5 3.5 0 0 1 3.5 3.5V16"/><path d="M20 16v-2a4 4 0 0 0-4-4h-1"/><path d="M2 16h20v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4Z"/>`;
  } else if (checkStr.includes("jewel") || checkStr.includes("diamond") || checkStr.includes("gold") || checkStr.includes("silver")) {
    exactCategory = "Jewelry";
    emojiChar = "💎";
    iconPath = `<path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>`;
  } else if (checkStr.includes("electronic") || checkStr.includes("gadget") || checkStr.includes("computer") || checkStr.includes("laptop") || checkStr.includes("mobile")) {
    exactCategory = "Electronics";
    emojiChar = "💻";
    iconPath = `<rect width="18" height="12" x="3" y="4" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/>`;
  } else if (checkStr.includes("gym") || checkStr.includes("fitness") || checkStr.includes("sport") || checkStr.includes("workout")) {
    exactCategory = "Gym";
    emojiChar = "🏋️";
    iconPath = `<path d="M6.5 6.5H17.5V17.5H6.5z" transform="rotate(45 12 12)"/><path d="m3 3 18 18"/><path d="m18 6 3-3"/><path d="m6 18-3 3"/>`;
  } else if (checkStr.includes("hospital") || checkStr.includes("clinic") || checkStr.includes("medical") || checkStr.includes("doctor")) {
    exactCategory = "Hospital";
    emojiChar = "🏥";
    iconPath = `<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>`;
  } else if (checkStr.includes("nursery") || checkStr.includes("plant") || checkStr.includes("flower") || checkStr.includes("garden") || checkStr.includes("botanical")) {
    exactCategory = "Plant Nursery";
    emojiChar = "🌿";
    iconPath = `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>`;
  } else if (checkStr.includes("pharmacy") || checkStr.includes("drug") || checkStr.includes("medicine") || checkStr.includes("pill")) {
    exactCategory = "Pharmacy";
    emojiChar = "💊";
    iconPath = `<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>`;
  } else if (checkStr.includes("salon") || checkStr.includes("hair") || checkStr.includes("beauty") || checkStr.includes("spa")) {
    exactCategory = "Salon";
    emojiChar = "✂️";
    iconPath = `<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>`;
  } else if (checkStr.includes("hotel") || checkStr.includes("resort") || checkStr.includes("stay") || checkStr.includes("motel")) {
    exactCategory = "Hotel";
    emojiChar = "🏨";
    iconPath = `<path d="M10 22v-6.57"/><path d="M12 11h.01"/><path d="M12 7h.01"/><path d="M14 15.43V22"/><path d="M15 16a5 5 0 0 0-6 0"/><path d="M16 11h.01"/><path d="M16 7h.01"/><path d="M8 11h.01"/><path d="M8 7h.01"/><rect x="4" y="2" width="16" height="20" rx="2"/>`;
  } else if (checkStr.includes("real estate") || checkStr.includes("property") || checkStr.includes("housing") || checkStr.includes("realtor")) {
    exactCategory = "Real Estate";
    emojiChar = "🏠";
    iconPath = `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`;
  } else if (checkStr.includes("book") || checkStr.includes("library") || checkStr.includes("stationery") || checkStr.includes("education")) {
    exactCategory = "Book Store";
    emojiChar = "📚";
    iconPath = `<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-0-5H20"/>`;
  }

  const shortName = name.length > 24 ? name.substring(0, 24) + '...' : name;
  const initials = name.split(' ').map((w: string) => w[0]).join('').substring(0, 2).toUpperCase() || "SF";
  
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 54" width="100%" height="100%">
    <defs>
      <linearGradient id="brandGrad_${initials}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primary}" />
        <stop offset="100%" stop-color="${accent}" />
      </linearGradient>
    </defs>
    <g transform="translate(4, 7)">
      <rect width="40" height="40" rx="12" fill="url(#brandGrad_${initials})"/>
      <svg x="8" y="8" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
        ${iconPath}
      </svg>
    </g>
    <text x="56" y="34" font-family="system-ui, -apple-system, sans-serif" font-size="21" font-weight="900" fill="${secondary}" letter-spacing="-0.6">
      ${shortName}
    </text>
  </svg>`;
  
  const base64Svg = Buffer.from(svgString).toString('base64');
  const dataUri = `data:image/svg+xml;base64,${base64Svg}`;
  
  return {
    url: dataUri,
    svgString,
    type: "svg",
    icon: exactCategory,
    emoji: emojiChar,
    initials,
    text: name,
    primaryColor: primary,
    secondaryColor: secondary,
    layout: "horizontal"
  };
}

// Rich local industry mock generator for all core industries
// Acts as the robust fallback of STEP 9 when OpenAI / AI-Engine fails or is unconfigured.
function generateMockIndustryWebsite(businessData: any) {
  const name = businessData.name || "My Premium Shop";
  const rawType = (businessData.type || "retail").toLowerCase();
  const location = businessData.location || "Pune, Maharashtra";
  const audience = businessData.audience || "discerning patrons";
  const brandPersonality = businessData.brandPersonality || "welcoming and modern";
  
  let type = "Business";
  let description = `High-quality ${rawType} services and products in ${location}.`;
  let products: any[] = [];
  let services: any[] = [];
  let gallery: any[] = [];
  let faqs: any[] = [];
  let phone = businessData.whatsappNumber || "+91 98765 43210";
  let address = `${location}, India`;
  let heroImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";
  let colorPalette = {
    primaryColor: "#4F46E5",
    secondaryColor: "#0F172A",
    accentColor: "#10B981"
  };

  const userProducts = Array.isArray(businessData.products) ? businessData.products : [];
  const userServices = Array.isArray(businessData.services) ? businessData.services : [];

  if (rawType.includes("bakery") || rawType.includes("cake") || rawType.includes("sweet")) {
    type = "Bakery & Confectionery";
    colorPalette = { primaryColor: "#78350F", secondaryColor: "#FEF3C7", accentColor: "#D97706" }; // Warm bakery tones
    heroImage = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80";
    description = `Indulge in Pune's finest fresh, handcrafted cakes, pastries, and artisanal breads baked daily at ${name}.`;
    
    const defaultProducts = [
      { name: "Signature Belgian Chocolate Cake", price: "Rs. 599", description: "Rich Belgian chocolate layers with silky ganache overlay." },
      { name: "Fresh Red Velvet Pastry", price: "Rs. 120", description: "Classic crimson cake slices topped with sweet cream cheese frosting." },
      { name: "Oven-Fresh Butter Croissant", price: "Rs. 99", description: "Flaky, buttery layered French pastry baked fresh every morning." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 250",
        description: p.description || `Freshly baked ${prodName} made with organic butter and zero preservatives.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "Bespoke Designer Cakes", description: "Beautiful custom designer cakes tailored for birthdays, weddings, and celebrations.", icon: "Sparkles" },
      { name: "Same-Day Doorstep Delivery", description: "Oven-fresh items delivered right to your home in Pune within 2 hours.", icon: "Clock" },
      { name: "Premium Party Catering", description: "Bespoke menus and large-scale pastry platters for your corporate and family events.", icon: "Heart" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Specialized ${servName} designed for our valued guests.`,
        icon: s.icon || "Sparkles"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80", caption: "Our Baker's Oven" },
      { url: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=600&q=80", caption: "Handcrafted Cupcakes" },
      { url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80", caption: "Freshly Baked Breads" }
    ];
    faqs = [
      { question: "How early do I need to order custom celebration cakes?", answer: "We require at least 24 to 48 hours notice for custom designed cakes." },
      { question: "Do you offer eggless options for all bakery items?", answer: "Yes! 100% of our signature cakes, pastries, and breads can be made eggless upon request." }
    ];
  } else if (rawType.includes("rest") || rawType.includes("cafe") || rawType.includes("food") || rawType.includes("dine")) {
    type = "Fine Dining Restaurant";
    colorPalette = { primaryColor: "#991B1B", secondaryColor: "#1C1917", accentColor: "#FBBF24" }; // Deep red culinary
    heroImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80";
    description = `Savor authentic regional delicacies and modern culinary creations prepared by top chefs in ${location} at ${name}.`;

    const defaultProducts = [
      { name: "Paneer Tikka Masala", price: "Rs. 320", description: "Clay-oven grilled paneer cubes in rich spiced cashew tomato gravy." },
      { name: "Signature Butter Chicken", price: "Rs. 380", description: "Tender tandoori chicken shreds simmered in butter tomato velvet gravy." },
      { name: "Fragrant Dum Biryani", price: "Rs. 350", description: "Layers of premium basmati rice, aromatic spices, and traditional marinades." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 299",
        description: p.description || `Exquisite, flavor-rich ${prodName} prepared fresh with local herbs.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "Exquisite Dine-In Experience", description: "Elegant tables, custom ambient lighting, and stellar hospitality for private dining.", icon: "Utensils" },
      { name: "WhatsApp Express Takeaway", description: "Place orders directly via WhatsApp for swift curbside pickup or home delivery.", icon: "MessageSquare" },
      { name: "Exclusive Private Catering", description: "Bespoke live kitchen setups and curated menus for your intimate family celebrations.", icon: "Sparkles" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Luxury hospitality ${servName} designed for fine culinary experiences.`,
        icon: s.icon || "Utensils"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", caption: "Our Cozy Dining Room" },
      { url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80", caption: "Signature Fusion Dishes" },
      { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80", caption: "Fresh Local Ingredients" }
    ];
    faqs = [
      { question: "Do you accommodate gluten-free or vegan diets?", answer: "Yes, we feature extensive vegetarian, gluten-free, and vegan sections on our custom menus." },
      { question: "Can we book tables for private parties?", answer: "Absolutely! You can book half or all of our restaurant floor directly on WhatsApp." }
    ];
  } else if (rawType.includes("salon") || rawType.includes("spa") || rawType.includes("hair") || rawType.includes("beauty")) {
    type = "Luxury Hair & Beauty Salon";
    colorPalette = { primaryColor: "#EC4899", secondaryColor: "#0F172A", accentColor: "#F43F5E" }; // Elegant rose gold / charcoal
    heroImage = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80";
    description = `Pamper yourself with premium hair styling, customized botanical facials, and luxury spa therapies at ${name}.`;

    const defaultProducts = [
      { name: "Nourishing Hair Spa & Conditioning", price: "Rs. 1,200", description: "Deep hydration scalp therapy with herbal steam and deep scalp massage." },
      { name: "Premium HD Bridal Makeover", price: "Rs. 15,000", description: "Stunning professional high-definition makeup, hairstyle, and outfit draping." },
      { name: "Global Professional Hair Coloring", price: "Rs. 4,500", description: "Vibrant high-gloss ammonia-free global hair color by L'Oreal specialists." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 999",
        description: p.description || `Premium nourishing ${prodName} using organic, dermatologically tested products.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "Expert Creative Haircuts", description: "Stunning fashion cuts, texturing, and custom styling designed by leading artists.", icon: "Scissors" },
      { name: "Revitalizing Organic Facials", description: "Brightening and hydrating skin treatments incorporating local organic botanicals.", icon: "Sparkles" },
      { name: "Intricate Nail Styling & Extensions", description: "Durable extensions, custom gel nail art designs, and premium care.", icon: "Heart" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Elite styling and pampering ${servName} package.`,
        icon: s.icon || "Sparkles"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80", caption: "Our Modern Styling Stations" },
      { url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80", caption: "Premium Skin Care Suite" },
      { url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=600&q=80", caption: "Relaxing Pedicures" }
    ];
    faqs = [
      { question: "Is booking an appointment in advance required?", answer: "We accommodate walk-ins, but strongly advise booking ahead to ensure zero wait times." },
      { question: "What cosmetic and skin brands do you use?", answer: "We exclusively utilize premium, safe brands including L'Oreal Professional, Olaplex, and Dermalogica." }
    ];
  } else if (rawType.includes("elect") || rawType.includes("phone") || rawType.includes("shop") || rawType.includes("gadg")) {
    type = "Premium Electronics Store";
    colorPalette = { primaryColor: "#2563EB", secondaryColor: "#1E293B", accentColor: "#38BDF8" }; // Tech cyber blue
    heroImage = "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1200&q=80";
    description = `Explore standard-setting smart appliances, high-performance computing gadgets, and accessories at Pune's favorite shop, ${name}.`;

    const defaultProducts = [
      { name: "Pro Sound Active Noise-Cancelling Headphones", price: "Rs. 8,999", description: "Hi-Res wireless hybrid active noise-cancelling overhead headphones." },
      { name: "Forge AMOLED Smart Watch", price: "Rs. 3,499", description: "Curved visual display with continuous heart rate and fitness tracker." },
      { name: "Ultra Book 14-inch Laptop", price: "Rs. 62,999", description: "Sleek all-metal chassis, 16GB RAM, and 12th Gen high-performance processor." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 2,499",
        description: p.description || `Next-generation ${prodName} featuring industry-leading hardware specifications.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "Authorized Brand Warranty", description: "100% genuine guaranteed items directly with full manufacturer warranty cards.", icon: "ShieldCheck" },
      { name: "Complimentary Device Setup", description: "Zero-cost data migration, premium software setups, and personalized walk-throughs.", icon: "Cpu" },
      { name: "No-Cost Easy EMIs", description: "Zero downpayment options and flexible financing with all major credit providers.", icon: "CreditCard" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `State-of-the-art tech support and ${servName} configuration.`,
        icon: s.icon || "Cpu"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80", caption: "Our Tech Display Counter" },
      { url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80", caption: "Smart Home Demonstrations" },
      { url: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=600&q=80", caption: "Premium Accessories Area" }
    ];
    faqs = [
      { question: "Do you offer exchange programs for old gadgets?", answer: "Yes! We run direct cash-back trade-ins for all working laptops and smartphones." }
    ];
  } else if (rawType.includes("cafe") || rawType.includes("coffee") || rawType.includes("tea") || rawType.includes("barista")) {
    type = "Artisanal Cafe & Coffee House";
    colorPalette = { primaryColor: "#7C3F00", secondaryColor: "#1C1917", accentColor: "#D97706" }; // Warm coffee roaster tones
    heroImage = "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80";
    description = `Experience freshly roasted specialty coffee, handcrafted beverages, and delicious warm bites at ${name}.`;

    const defaultProducts = [
      { name: "Specialty Espresso Roast", price: "Rs. 220", description: "Rich, bold Arabica beans freshly ground for smooth espresso." },
      { name: "Caramel Macchiato", price: "Rs. 280", description: "Steamed milk infused with vanilla syrup, topped with espresso and caramel drizzle." },
      { name: "Fresh Butter Croissant", price: "Rs. 150", description: "Flaky, buttery French pastry freshly baked in-house every morning." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 250",
        description: p.description || `Handcrafted ${prodName} made with organic ingredients.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "Cozy Dine-In & Workspaces", description: "High-speed Wi-Fi, ambient seating, and quiet corners perfect for working or relaxing.", icon: "Coffee" },
      { name: "Private Event Bookings", description: "Host intimate meetups, book clubs, and celebrations in our dedicated lounge area.", icon: "Sparkles" },
      { name: "Curbside Pickup & Delivery", description: "Order ahead for quick pickup or get fresh brews delivered straight to your office.", icon: "Clock" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Specialized ${servName} designed for coffee lovers.`,
        icon: s.icon || "Coffee"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80", caption: "Our Barista Counter" },
      { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80", caption: "Freshly Brewed Coffee" },
      { url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80", caption: "Cozy Seating Space" }
    ];
    faqs = [
      { question: "Do you offer dairy alternatives?", answer: "Yes, we offer oat milk, almond milk, and soy milk options for all our beverages." },
      { question: "Is Wi-Fi available for customers?", answer: "We offer complimentary high-speed fiber Wi-Fi with every order." }
    ];
  } else if (rawType.includes("furniture") || rawType.includes("decor") || rawType.includes("sofa") || rawType.includes("interior")) {
    type = "Luxury Furniture & Home Decor";
    colorPalette = { primaryColor: "#4A3B32", secondaryColor: "#1C1917", accentColor: "#C29B38" };
    heroImage = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80";
    description = `Discover handcrafted designer furniture, modern living solutions, and bespoke interior styling at ${name}.`;

    const defaultProducts = [
      { name: "Nordic Three-Seater Sofa", price: "Rs. 45,000", description: "Ergonomic modern sofa with premium stain-resistant fabric and solid oak wood frame." },
      { name: "Artisanal Solid Wood Dining Table", price: "Rs. 62,000", description: "Handcrafted teak wood 6-seater dining table with natural grain finish." },
      { name: "Minimalist Lounge Accent Chair", price: "Rs. 18,500", description: "Contemporary accent armchair tailored for comfort and living room elegance." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 25,000",
        description: p.description || `Premium handcrafted ${prodName} built with enduring durability.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "Custom Space Consultation", description: "Our interior designers help curate bespoke furniture arrangements for your home.", icon: "Sparkles" },
      { name: "White-Glove Delivery & Installation", description: "Professional transport, assembly, and room setup by our expert carpentry team.", icon: "CheckCircle" },
      { name: "Bespoke Custom Orders", description: "Select your own upholstery fabrics, wood stains, and exact dimensions.", icon: "Tool" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Bespoke interior ${servName}.`,
        icon: s.icon || "Sparkles"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80", caption: "Modern Living Collection" },
      { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80", caption: "Designer Sofa Showroom" },
      { url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80", caption: "Handcrafted Dining Sets" }
    ];
    faqs = [
      { question: "Can we customize the fabric and dimensions?", answer: "Yes, over 80% of our furniture items can be custom ordered in your chosen finish." },
      { question: "What is the warranty period?", answer: "We provide a comprehensive 5-year warranty against any manufacturing or frame defects." }
    ];
  } else if (rawType.includes("footwear") || rawType.includes("shoe") || rawType.includes("sneaker") || rawType.includes("boot")) {
    type = "Premium Footwear & Shoes";
    colorPalette = { primaryColor: "#2563EB", secondaryColor: "#0F172A", accentColor: "#F59E0B" };
    heroImage = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80";
    description = `Step into unmatched comfort and cutting-edge style with premium athletic, formal, and casual footwear at ${name}.`;

    const defaultProducts = [
      { name: "Pro-Stride Running Sneakers", price: "Rs. 4,999", description: "Ultra-responsive foam cushioning engineered for daily distance runners and gym athletes." },
      { name: "Classic Genuine Leather Oxfords", price: "Rs. 6,499", description: "Timeless handcrafted full-grain leather formal shoes with cushioned arch support." },
      { name: "Urban Streetwear High-Tops", price: "Rs. 3,899", description: "Modern urban high-top sneakers with breathable mesh and durable rubber sole." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 3,499",
        description: p.description || `High-performance ${prodName} crafted for lasting comfort and style.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "Precision Gait Analysis", description: "In-store digital foot pressure and gait analysis to find your ideal shoe support.", icon: "Activity" },
      { name: "Shoe Care & Restoration", description: "Professional cleaning, sole replacement, and leather conditioning for your favorite footwear.", icon: "Shield" },
      { name: "Instant Size Exchange", description: "Hassle-free 14-day home size replacement to guarantee the perfect fit every time.", icon: "RefreshCw" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Specialized footwear ${servName}.`,
        icon: s.icon || "Activity"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80", caption: "Athletic Performance Series" },
      { url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80", caption: "Casual Urban Sneaker Wall" },
      { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80", caption: "Premium Leather Collection" }
    ];
    faqs = [
      { question: "How do I know which size is right for me?", answer: "Check our detailed size guide on each product page or visit our store for a free 3D foot scan." },
      { question: "Are these shoes suitable for orthotic inserts?", answer: "Yes, most of our performance and casual models feature removable contoured insoles." }
    ];
  } else if (rawType.includes("jewel") || rawType.includes("diamond") || rawType.includes("gold") || rawType.includes("silver")) {
    type = "Fine Jewelry & Diamond Studio";
    colorPalette = { primaryColor: "#9A3412", secondaryColor: "#1C1917", accentColor: "#F59E0B" };
    heroImage = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80";
    description = `Timeless certified diamond, gold, and fine handcrafted jewelry collections designed to celebrate life's finest moments at ${name}.`;

    const defaultProducts = [
      { name: "Solitaire Diamond Engagement Ring", price: "Rs. 1,25,000", description: "Brilliant-cut certified VVS diamond set in 18K hallmarked white gold." },
      { name: "Royal Heritage Gold Necklace", price: "Rs. 2,80,000", description: "Intricately carved 22K traditional gold choker studded with emeralds and rubies." },
      { name: "Contemporary Rose Gold Pendant", price: "Rs. 32,000", description: "Delicate minimalist diamond-studded pendant crafted in stunning 18K rose gold." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 45,000",
        description: p.description || `Certified hallmarked ${prodName} crafted with exquisite artistry.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "Bespoke Jewelry Customization", description: "Work directly with our master goldsmiths to sketch and create custom personalized jewelry.", icon: "Sparkles" },
      { name: "BIS Hallmarked & Certified Diamonds", description: "Every jewel comes with 100% certified purity certificates and international grading.", icon: "Award" },
      { name: "Lifetime Maintenance & Polishing", description: "Enjoy complimentary ultrasonic cleaning, stone tightening, and gold polishing.", icon: "ShieldCheck" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Exquisite jewelry ${servName}.`,
        icon: s.icon || "Sparkles"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80", caption: "Diamond Ring Showcase" },
      { url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80", caption: "Gold Bridal Suite" },
      { url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80", caption: "Bespoke Jewelry Design" }
    ];
    faqs = [
      { question: "Are your diamonds certified?", answer: "Yes, 100% of our diamonds are individually certified by IGI or GIA with complete laser inscription." },
      { question: "Do you accept old gold exchange?", answer: "We offer transparent, real-time market value exchanges for all hallmarked gold items." }
    ];
  } else if (rawType.includes("hospital") || rawType.includes("clinic") || rawType.includes("doctor") || rawType.includes("medical") || rawType.includes("health")) {
    type = "Multi-Specialty Healthcare Hospital & Clinic";
    colorPalette = { primaryColor: "#0284C7", secondaryColor: "#0F172A", accentColor: "#10B981" };
    heroImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80";
    description = `Compassionate patient-first medical care, advanced diagnostic technology, and leading expert physicians at ${name}.`;

    const defaultProducts = [
      { name: "Comprehensive Health Checkup Package", price: "Rs. 3,500", description: "Complete blood count, ECG, lipid profile, liver function, and specialist consultation." },
      { name: "Advanced Digital Diagnostics", price: "Rs. 1,200", description: "High-precision ultrasound, digital X-ray, and automated pathology lab screenings." },
      { name: "Specialist Physician Consultation", price: "Rs. 800", description: "One-on-one diagnostic consultation with experienced board-certified specialists." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 1,500",
        description: p.description || `High-standard medical ${prodName} conducted with patient care and precision.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "24/7 Emergency & Trauma Care", description: "Rapid response medical team, fully equipped ICU, and immediate emergency intervention.", icon: "Activity" },
      { name: "Multi-Specialty Outpatient Clinics", description: "Expert consultations across cardiology, orthopedics, pediatrics, and internal medicine.", icon: "Heart" },
      { name: "Online Video Consultations", description: "Consult our senior doctors remotely from the comfort of your home via secure video call.", icon: "Video" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Comprehensive clinical ${servName}.`,
        icon: s.icon || "Activity"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80", caption: "Modern Diagnostics Center" },
      { url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80", caption: "Patient Consultation Rooms" },
      { url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80", caption: "Advanced Medical Equipment" }
    ];
    faqs = [
      { question: "Do you accept health insurance and cashless claims?", answer: "Yes, we are empaneled with over 30 major health insurance providers for seamless cashless hospitalization." },
      { question: "How do we book an appointment with a specialist?", answer: "You can book instantly via WhatsApp or call our 24/7 reception desk directly." }
    ];
  } else if (rawType.includes("nursery") || rawType.includes("plant") || rawType.includes("flower") || rawType.includes("garden") || rawType.includes("botanical")) {
    type = "Botanical Sanctuary & Plant Nursery";
    colorPalette = { primaryColor: "#15803D", secondaryColor: "#1C1917", accentColor: "#84CC16" };
    heroImage = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80";
    description = `Bring vibrant greenery and calm into your home with healthy indoor plants, exotic succulents, and organic gardening essentials at ${name}.`;

    const defaultProducts = [
      { name: "Monstera Deliciosa (Swiss Cheese Plant)", price: "Rs. 850", description: "Lush tropical indoor statement plant in a self-watering ceramic pot." },
      { name: "Peace Lily & Air Purifier Fern Set", price: "Rs. 1,200", description: "Low-maintenance NASA-recommended indoor air purifying plants for bedroom air quality." },
      { name: "Organic Botanical Potting Mix & Fertilizer", price: "Rs. 350", description: "Nutrient-rich organic compost and vermicompost blend specifically formulated for root health." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 600",
        description: p.description || `Healthy, nursery-nurtured ${prodName} ready for your home garden.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "Expert Garden Landscaping", description: "Complete balcony, terrace, and lawn design transformations by certified horticulturists.", icon: "Sun" },
      { name: "Plant Doctor & Health Care Advice", description: "Personalized troubleshooting for yellowing leaves, pest control, and watering schedules.", icon: "Heart" },
      { name: "Doorstep Safe Plant Delivery", description: "Careful temperature-controlled plant transport ensuring zero leaf breakage.", icon: "Truck" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Professional botanical ${servName}.`,
        icon: s.icon || "Sun"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80", caption: "Our Green Nursery Glasshouse" },
      { url: "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=600&q=80", caption: "Indoor Air Purifying Plants" },
      { url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80", caption: "Succulent & Cactus Varieties" }
    ];
    faqs = [
      { question: "Are these indoor plants safe for pets?", answer: "We clearly label all pet-friendly non-toxic plant varieties in our store and catalog." },
      { question: "How often should indoor plants be watered?", answer: "Each plant order comes with a customized care tag detailing light and watering needs." }
    ];
  } else if (rawType.includes("pharmacy") || rawType.includes("drug") || rawType.includes("medicine") || rawType.includes("pill")) {
    type = "24/7 Trusted Pharmacy & Medical Store";
    colorPalette = { primaryColor: "#0D9488", secondaryColor: "#0F172A", accentColor: "#10B981" };
    heroImage = "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80";
    description = `Genuine prescription medicines, daily wellness supplements, and surgical essentials with express doorstep delivery at ${name}.`;

    const defaultProducts = [
      { name: "Daily Multivitamin & Omega-3 Pack", price: "Rs. 650", description: "High-absorption essential daily vitamins formulated for immunity and joint health." },
      { name: "Digital Blood Pressure & Pulse Monitor", price: "Rs. 2,100", description: "Automatic upper-arm digital BP checking device with clinical precision." },
      { name: "Ayurvedic Herbal Immunity Booster", price: "Rs. 420", description: "Natural Ashwagandha and Giloy extract drops for respiratory and immune vigor." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 350",
        description: p.description || `Authentic verified ${prodName} sourced directly from certified laboratories.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "Express 30-Minute Home Delivery", description: "Fast, temperature-controlled doorstep medicine delivery across all local neighborhoods.", icon: "Clock" },
      { name: "WhatsApp Prescription Upload", description: "Simply snap a photo of your doctor's prescription and send via WhatsApp for immediate packing.", icon: "MessageSquare" },
      { name: "Monthly Refill Reminder & Subscription", description: "Automated recurring refills for chronic care medications ensuring you never run out.", icon: "CheckCircle" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Reliable pharmacy ${servName}.`,
        icon: s.icon || "Clock"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80", caption: "Our Organized Pharmacy Shelves" },
      { url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80", caption: "Certified Supplements Section" },
      { url: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=600&q=80", caption: "Express Delivery Counter" }
    ];
    faqs = [
      { question: "Are all medications 100% genuine and batch-verified?", answer: "Yes, we procure directly from authorized pharmaceutical manufacturers with complete audit trails." },
      { question: "How do I order medicines using my prescription?", answer: "Simply click 'Chat on WhatsApp' on our site and attach your valid prescription photo." }
    ];
  } else if (rawType.includes("hotel") || rawType.includes("resort") || rawType.includes("stay")) {
    type = "Luxury Boutique Hotel & Resort";
    colorPalette = { primaryColor: "#1E3A8A", secondaryColor: "#0F172A", accentColor: "#F59E0B" };
    heroImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";
    description = `Immerse yourself in serenity, world-class hospitality, and elegant luxury accommodations at ${name}.`;

    const defaultProducts = [
      { name: "Executive Ocean View Suite", price: "Rs. 12,500/night", description: "Spacious private balcony suite with king-size bed, jacuzzi, and complimentary breakfast." },
      { name: "Deluxe Garden Pool Villa", price: "Rs. 24,000/night", description: "Private plunge pool villa surrounded by lush gardens and dedicated butler service." },
      { name: "Premium Business Stay Room", price: "Rs. 7,800/night", description: "Ergonomic work desk, high-speed Wi-Fi, executive lounge access, and express check-in." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 9,000/night",
        description: p.description || `Exquisite luxury ${prodName} designed for unparalleled comfort.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "24-Hour Concierge & Butler Service", description: "Our dedicated staff arranges airport transfers, local tours, and private dining requests.", icon: "Sparkles" },
      { name: "Rooftop Pool & Spa Therapies", description: "Relax by our infinity pool or rejuvenate at our luxury wellness spa center.", icon: "Sun" },
      { name: "Gourmet Multi-Cuisine Restaurants", description: "Experience authentic regional delicacies and international fine dining on-property.", icon: "Heart" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Premium resort ${servName}.`,
        icon: s.icon || "Sparkles"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80", caption: "Luxury Hotel Facade" },
      { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80", caption: "Executive Bedroom Suites" },
      { url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80", caption: "Infinity Pool Lounge" }
    ];
    faqs = [
      { question: "What are the check-in and check-out timings?", answer: "Standard check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in is available upon request." },
      { question: "Are airport transfers included?", answer: "We provide private chauffeur airport transfers upon prior reservation." }
    ];
  } else if (rawType.includes("real estate") || rawType.includes("property") || rawType.includes("realtor")) {
    type = "Premier Real Estate & Property Advisors";
    colorPalette = { primaryColor: "#0F766E", secondaryColor: "#0F172A", accentColor: "#FBBF24" };
    heroImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";
    description = `Discover your dream residence, prime commercial spaces, and high-yield real estate investments with ${name}.`;

    const defaultProducts = [
      { name: "Luxury 4 BHK Penthouse overlooking Skyline", price: "Rs. 3.5 Cr", description: "3,800 sq ft ultra-luxury penthouse with private terrace and smart home automation." },
      { name: "Premium 3 BHK Luxury Apartment", price: "Rs. 1.8 Cr", description: "Spacious family residence with modular kitchen, Italian marble, and clubhouse access." },
      { name: "Prime Commercial Office Suite", price: "Rs. 2.2 Cr", description: "Grade-A IT park commercial office space with high rental yield potential." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "On Request",
        description: p.description || `Prime verified ${prodName} in top location.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "Verified Property Title & Legal Advisory", description: "Complete documentation audit, RERA compliance check, and legal title verification.", icon: "ShieldCheck" },
      { name: "VIP Site Visits & Virtual Tours", description: "Schedule private chauffeur-driven property tours or interactive 3D virtual walkthroughs.", icon: "Eye" },
      { name: "End-to-End Home Loan & Documentation", description: "Seamless mortgage processing with leading banks at lowest interest rates.", icon: "FileText" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Specialized property ${servName}.`,
        icon: s.icon || "ShieldCheck"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80", caption: "Luxury Villa Exteriors" },
      { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", caption: "Modern Living Interiors" },
      { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80", caption: "Penthouse Balcony Views" }
    ];
    faqs = [
      { question: "Are all listed properties RERA registered?", answer: "Yes, 100% of our projects and listings are fully verified and RERA compliant." },
      { question: "How do we schedule a property site visit?", answer: "You can book a private site visit instantly via WhatsApp." }
    ];
  } else if (rawType.includes("book") || rawType.includes("library") || rawType.includes("stationery") || rawType.includes("education")) {
    type = "Artisanal Book Store & Literary Haven";
    colorPalette = { primaryColor: "#4338CA", secondaryColor: "#1E1B18", accentColor: "#D97706" };
    heroImage = "https://images.unsplash.com/photo-1507842229356-51c6150fe5a3?auto=format&fit=crop&w=1200&q=80";
    description = `Immerse yourself in curated bestsellers, rare classics, academic texts, and premium reading stationery at ${name}.`;

    const defaultProducts = [
      { name: "Curated Bestsellers Hardcover Collector's Box", price: "Rs. 2,499", description: "Special cloth-bound hardcover box set of modern award-winning fiction." },
      { name: "Premium Leather-Bound Journal & Fountain Pen", price: "Rs. 1,199", description: "Handmade archival paper journal paired with smooth German-nib fountain pen." },
      { name: "Comprehensive Competitive Exam Preparation Bundle", price: "Rs. 1,650", description: "Complete updated study guides, solved question banks, and reference texts." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 499",
        description: p.description || `Curated high-quality ${prodName} for discerning readers and students.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "Special Book Ordering & Imports", description: "Can't find a rare title? We order international editions and academic monographs directly.", icon: "BookOpen" },
      { name: "Literary Events & Author Signings", description: "Join our vibrant weekend book clubs, poetry readings, and exclusive author interaction sessions.", icon: "Sparkles" },
      { name: "Custom Institutional & Library Supplying", description: "Bulk educational supplying and library curation for schools, colleges, and corporate offices.", icon: "CheckCircle" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Literary service: ${servName}.`,
        icon: s.icon || "BookOpen"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1507842229356-51c6150fe5a3?auto=format&fit=crop&w=600&q=80", caption: "Our Cozy Book Avenues" },
      { url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80", caption: "Curated Hardcover Displays" },
      { url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80", caption: "Reading Lounge Corners" }
    ];
    faqs = [
      { question: "Can we order rare or out-of-print books through you?", answer: "Yes, we have direct publisher tie-ups and import channels for rare titles worldwide." },
      { question: "Do you offer student discounts?", answer: "We provide a flat 10% student discount on all academic textbooks and reference materials." }
    ];
  } else {
    // DEFAULT & GYM
    type = "Elite Fitness Gym & Wellness Studio";
    colorPalette = { primaryColor: "#18181B", secondaryColor: "#F4F4F5", accentColor: "#10B981" }; // Dark zinc / neon emerald
    heroImage = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80";
    description = `Transform your mind, body, and strength with professional certified trainers and elite bodybuilding equipment at ${name}.`;

    const defaultProducts = [
      { name: "Gold Yearly Gym Access Pass", price: "Rs. 14,999", description: "All-hours unlimited access to gym floor, group cardio classes, and luxury lockers." },
      { name: "One-on-One Elite Coaching Session", price: "Rs. 4,500/mo", description: "Bespoke bodybuilding coaching, certified diet charts, and bi-weekly tracking." },
      { name: "SiteForge High-Performance Pre-workout", price: "Rs. 2,199", description: "Sustain extreme focus and pumps with premium formulated active amino acids." }
    ];
    const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
    products = rawProds.map((p: any) => {
      const prodName = typeof p === "string" ? p : p.name;
      return {
        name: prodName,
        price: p.price || "Rs. 1,999",
        description: p.description || `Premium fitness ${prodName} formulated for maximum physical conditioning.`,
        image: getUnsplashImageForProduct(prodName, rawType)
      };
    });

    const defaultServices = [
      { name: "Elite Strength & Conditioning", description: "Advanced mechanical resistance platforms, Olympic free weights, and performance decks.", icon: "Dumbbell" },
      { name: "Cardio, Zumba & Yoga Classes", description: "Vibrant high-energy group workouts scheduled daily under expert licensed instructors.", icon: "Smile" },
      { name: "Certified Personal Nutritionist", description: "Thorough biometric evaluations and macro meal planning tailored for your metabolism.", icon: "Heart" }
    ];
    const rawServs = userServices.length > 0 ? userServices : defaultServices;
    services = rawServs.map((s: any) => {
      const servName = typeof s === "string" ? s : s.name;
      return {
        name: servName,
        description: s.description || `Professional certified ${servName} program.`,
        icon: s.icon || "Dumbbell"
      };
    });

    gallery = [
      { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80", caption: "Our Gym Floor" },
      { url: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=600&q=80", caption: "Group Cycling Arena" },
      { url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80", caption: "MMA & Boxing Ring" }
    ];
    faqs = [
      { question: "Is a trial session available for newcomers?", answer: "Yes! We offer a free 3-day full-access pass. Reach out via WhatsApp to register." },
      { question: "Are shower and locker rooms provided?", answer: "Yes, we feature clean modern change rooms, electronic keypad lockers, and hot showers." }
    ];
  }

  // Override colors if specific colorTheme preference is entered by vendor
  if (businessData.colorTheme && businessData.colorTheme.startsWith("#")) {
    colorPalette.primaryColor = businessData.colorTheme;
  }

  const dynamicLogo = generateDynamicLogoRouteTS(businessData, colorPalette);

  // Assemble full base Website JSON
  return {
    meta: {
      title: `${name} | ${location}'s Finest ${type}`,
      description: `${description} Crafted specifically for ${audience} in ${location}.`,
      favicon: dynamicLogo.url,
      keywords: [name.toLowerCase(), type.toLowerCase(), location.toLowerCase(), "local services"]
    },
    theme: {
      primaryColor: colorPalette.primaryColor,
      secondaryColor: colorPalette.secondaryColor,
      accentColor: colorPalette.accentColor,
      fontFamily: "Outfit",
      style: "modern",
      logo: dynamicLogo
    },
    logo: dynamicLogo,
    logoUrl: dynamicLogo.url,
    hero: {
      title: `Crafting the Ultimate ${type} Experience at ${name}`,
      subtitle: `Bespoke premium quality built meticulously for ${audience} seeking absolute perfection. Contact us and see what makes us local favorites.`,
      backgroundImage: heroImage
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
              title: `Crafting the Ultimate ${type} Experience at ${name}`,
              subtitle: `Bespoke premium quality built meticulously for ${audience} seeking absolute perfection. Contact us and see what makes us local favorites.`,
              ctaText: "Chat on WhatsApp",
              ctaLink: phone ? `https://wa.me/${phone.replace(/\D/g,"")}` : "#contact",
              backgroundImage: heroImage,
              image: heroImage
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
              title: `Setting New Standards at ${name}`,
              description: `At ${name}, we have combined elite craftsmanship with a ${brandPersonality} brand identity to serve ${audience} in our ${location} community. Our team is committed to standard-setting outcomes and personalized customer care.`,
              image: gallery[0]?.url || "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
              highlights: ["Premium Standard-Setting Quality", `Proudly Serving ${location}`, `${brandPersonality.toUpperCase()} Environment`]
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
              subtitle: `Discover custom professional options crafted to perfection in ${location}`,
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
              title: "Our Bestsellers & Showcase",
              subtitle: "Popular items loved by the community",
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
              title: "Exquisite Creations & Space Gallery",
              subtitle: "A visual peek into our dedication, craft, and premium customer smiles",
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
              faqs: faqs.length > 0 ? faqs : [
                { question: `What makes ${name} different?`, answer: `We combine standard-setting ingredients, elite training, and ${brandPersonality} services to deliver absolute excellence.` }
              ]
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
              title: "Connect with SiteForge Today",
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

// Visual variations factory — creates 3 completely unique website concepts (Modern, Luxury, Minimal) with different layouts and structures
function createVariations(baseJson: any) {
  const modern = JSON.parse(JSON.stringify(baseJson));
  const luxury = JSON.parse(JSON.stringify(baseJson));
  const minimal = JSON.parse(JSON.stringify(baseJson));

  const baseTitle = baseJson.meta?.title?.split("|")[0]?.trim() || "Brand";
  const rawSections = baseJson.pages?.[0]?.sections || [];

  const heroSec = rawSections.find((s: any) => s.type === "hero");
  const aboutSec = rawSections.find((s: any) => s.type === "about");
  const servicesSec = rawSections.find((s: any) => s.type === "services");
  const productsSec = rawSections.find((s: any) => s.type === "products");
  const gallerySec = rawSections.find((s: any) => s.type === "gallery");
  const testimonialsSec = rawSections.find((s: any) => s.type === "testimonials");
  const faqSec = rawSections.find((s: any) => s.type === "faq");
  const contactSec = rawSections.find((s: any) => s.type === "contact");
  const footerSec = rawSections.find((s: any) => s.type === "footer");

  // Ensure robust logo across all variations
  const activeLogo = baseJson.theme?.logo || baseJson.logo || (baseJson.logoUrl ? { url: baseJson.logoUrl, text: baseTitle, emoji: "✨" } : generateDynamicLogoRouteTS({ name: baseTitle, type: baseJson.meta?.keywords?.[1] || "Business" }, baseJson.theme || {}));
  const activeHero = baseJson.hero || {
    title: heroSec?.content?.title || baseTitle,
    subtitle: heroSec?.content?.subtitle || "Excellence Engineered for Your Success",
    backgroundImage: heroSec?.content?.backgroundImage || heroSec?.content?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
  };

  // 1. CONCEPT 1: MODERN PROFESSIONAL
  modern.theme = {
    primaryColor: baseJson.theme?.primaryColor || "#4F46E5",
    secondaryColor: "#0F172A",
    accentColor: "#10B981",
    fontFamily: "Outfit",
    style: "modern",
    logo: activeLogo
  };
  modern.logo = activeLogo;
  modern.logoUrl = activeLogo.url;
  modern.hero = activeHero;

  if (heroSec) {
    heroSec.content.title = `Experience the Future of ${baseJson.meta?.title?.split("|")[1]?.trim() || "Quality Services"} at ${baseTitle}`;
    heroSec.content.subtitle = `Next-generation solutions crafted with elite professional standards and personalized customer care. Discover standard-setting innovation today.`;
    heroSec.content.ctaText = "Get Started Now";
    if (!heroSec.content.backgroundImage && !heroSec.content.image) {
      heroSec.content.backgroundImage = activeHero.backgroundImage;
      heroSec.content.image = activeHero.backgroundImage;
    }
  }
  if (modern.pages?.[0]) {
    modern.pages[0].sections = [
      { ...heroSec, order: 0 },
      { ...aboutSec, order: 1 },
      { ...servicesSec, order: 2 },
      { ...productsSec, order: 3 },
      { ...testimonialsSec, order: 4 },
      { ...contactSec, order: 5 },
      { ...footerSec, order: 6 }
    ].filter(Boolean);
  }

  // 2. CONCEPT 2: LUXURY PREMIUM
  luxury.theme = {
    primaryColor: "#7F1D1D",
    secondaryColor: "#1C1917",
    accentColor: "#D97706",
    fontFamily: "Playfair Display",
    style: "luxury",
    logo: activeLogo
  };
  luxury.logo = activeLogo;
  luxury.logoUrl = activeLogo.url;
  luxury.hero = activeHero;

  if (heroSec && luxury.pages?.[0]) {
    const luxHero = JSON.parse(JSON.stringify(heroSec));
    luxHero.content.title = `The Absolute Pinnacle of Fine Craftsmanship & Heritage — ${baseTitle}`;
    luxHero.content.subtitle = `Indulge in sophisticated luxury, handcrafted details, and exemplary service tailored strictly for our most discerning patrons.`;
    luxHero.content.ctaText = "Reserve Exclusive Access";
    if (!luxHero.content.backgroundImage && !luxHero.content.image) {
      luxHero.content.backgroundImage = activeHero.backgroundImage;
      luxHero.content.image = activeHero.backgroundImage;
    }
    luxury.pages[0].sections = [
      { ...luxHero, order: 0 },
      { ...testimonialsSec, order: 1 },
      { ...productsSec, order: 2 },
      { ...aboutSec, order: 3 },
      { ...gallerySec, order: 4 },
      { ...contactSec, order: 5 },
      { ...footerSec, order: 6 }
    ].filter(Boolean);
  }

  // 3. CONCEPT 3: MINIMAL CLEAN
  minimal.theme = {
    primaryColor: "#18181B",
    secondaryColor: "#F4F4F5",
    accentColor: "#000000",
    fontFamily: "Inter",
    style: "minimal",
    logo: activeLogo
  };
  minimal.logo = activeLogo;
  minimal.logoUrl = activeLogo.url;
  minimal.hero = activeHero;

  if (heroSec && minimal.pages?.[0]) {
    const minHero = JSON.parse(JSON.stringify(heroSec));
    minHero.content.title = `Simply Perfect. Simply ${baseTitle}.`;
    minHero.content.subtitle = `No noise. Just pure dedication, high-quality offerings, and beautiful results.`;
    minHero.content.ctaText = "Get in Touch";
    if (!minHero.content.backgroundImage && !minHero.content.image) {
      minHero.content.backgroundImage = activeHero.backgroundImage;
      minHero.content.image = activeHero.backgroundImage;
    }
    minimal.pages[0].sections = [
      { ...minHero, order: 0 },
      { ...servicesSec, order: 1 },
      { ...contactSec, order: 2 },
      { ...footerSec, order: 3 }
    ].filter(Boolean);
  }

  return [
    {
      id: "modern",
      name: "Modern Professional",
      tagline: "Vibrant indigo theme, clean dynamic sections, and standard Outfit typography.",
      websiteJson: modern
    },
    {
      id: "luxury",
      name: "Luxury Premium",
      tagline: "Sophisticated Playfair Display serifs, deep rich crimson tones, and gold elements.",
      websiteJson: luxury
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      tagline: "Ultra-spaced Inter typography, high-contrast zinc layout, and precise messaging.",
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
  const id = req.params.id as string;

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
