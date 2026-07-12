import OpenAI from "openai";
import { WebsiteJSON, WebsiteJSONSection, WebsiteJSONPage } from "@siteforge/types";
import { buildWebsitePrompt } from "../prompts/website.prompt.js";
import { generateColorPalette } from "./color.generator.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
});

const PRODUCT_QUERY_RULES = [
  { pattern: /\bfruit\s*tart\b/i, query: "fruit tart" },
  { pattern: /\bchocolate\s*cake\b/i, query: "chocolate cake" },
  { pattern: /\bred\s*velvet\b/i, query: "red velvet cake" },
  { pattern: /\bplum\s*cake\b/i, query: "plum cake" },
  { pattern: /\bcupcake/i, query: "cupcakes" },
  { pattern: /\bcookie/i, query: "cookies" },
  { pattern: /\bbrownie/i, query: "brownies" },
  { pattern: /\bcroissant\b/i, query: "butter croissant" },
  { pattern: /\bdonut|\bdoughnut/i, query: "donuts" },
  { pattern: /\bpastry|\bpastries\b/i, query: "bakery pastry dessert" },
  { pattern: /\bcake\b/i, query: "delicious bakery cake" },
  { pattern: /\bpizza\b/i, query: "pepperoni pizza" },
  { pattern: /\bburger\b/i, query: "beef burger" },
  { pattern: /\bpasta\b|\bnoodle/i, query: "creamy pasta" },
  { pattern: /\brunning\s*shoe/i, query: "running shoes" },
  { pattern: /\bsneaker/i, query: "casual sneakers" },
  { pattern: /\bboot/i, query: "leather boots" },
  { pattern: /\bsandal/i, query: "men sandals" },
  { pattern: /\bformal\s*shoe|\boxford|\bloafer/i, query: "black formal shoes" },
  { pattern: /\bdining\s*table/i, query: "wooden dining table" },
  { pattern: /\bsofa|\bcouch|\bsectional/i, query: "modern fabric sofa" },
  { pattern: /\bwardrobe|\bcloset/i, query: "wood wardrobe" },
  { pattern: /\bgold\s*ring/i, query: "gold ring jewelry" },
  { pattern: /\bdiamond\s*necklace/i, query: "diamond necklace" }
];

const PRODUCT_IMAGE_DATABASE: Record<string, string[]> = {
  "fruit tart": [
    "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80"
  ],
  "chocolate cake": [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80"
  ],
  "red velvet cake": [
    "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=800&q=80"
  ],
  "plum cake": [
    "https://images.unsplash.com/photo-1607920592419-be960c15d18b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"
  ],
  "cupcakes": [
    "https://images.unsplash.com/photo-1576618148400-46de339d7516?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80"
  ],
  "cookies": [
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80"
  ],
  "brownies": [
    "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
  ],
  "butter croissant": [
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
  ],
  "donuts": [
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80"
  ],
  "cake": [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80"
  ],
  "running shoes": [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
  ],
  "casual sneakers": [
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80"
  ],
  "leather boots": [
    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
  ],
  "men sandals": [
    "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=800&q=80"
  ],
  "black formal shoes": [
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80"
  ],
  "wooden dining table": [
    "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80"
  ],
  "modern fabric sofa": [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80"
  ],
  "wood wardrobe": [
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558997519-83ea9252ded8?auto=format&fit=crop&w=800&q=80"
  ],
  "gold ring jewelry": [
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1598560917505-59a3655c1592?auto=format&fit=crop&w=800&q=80"
  ],
  "diamond necklace": [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
  ],
  "pepperoni pizza": [
    "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
  ],
  "beef burger": [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
  ],
  "creamy pasta": [
    "https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
  ]
};

function generateProductImageQueryTS(productName: string): string {
  if (!productName || typeof productName !== 'string') return "product item";
  for (const rule of PRODUCT_QUERY_RULES) {
    if (rule.pattern.test(productName)) return rule.query;
  }
  return productName.replace(/-\s*(Pro Series|Essential Edition|Deluxe Model|Signature Line|Classic Edition|Ultra Performance|Premium Select|Custom Crafted|Everyday Edition|Professional Grade|Luxury Collection|Compact Edition|Advanced Series|Executive Choice|Masterwork Edition|Standard Edition|Limited Edition|Special Edition)/gi, "").trim() || productName;
}

function fetchProductImageTS(imageQuery: string, usedUrls = new Set<string>()): string {
  const queryKey = (imageQuery || "").toLowerCase().trim();
  for (const [dbKey, imgList] of Object.entries(PRODUCT_IMAGE_DATABASE)) {
    if (queryKey === dbKey || queryKey.includes(dbKey) || dbKey.includes(queryKey)) {
      for (const url of imgList) {
        if (!usedUrls.has(url)) {
          usedUrls.add(url);
          return url;
        }
      }
    }
  }
  const fallbackUrl = `https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80&query=${encodeURIComponent(queryKey)}`;
  if (!usedUrls.has(fallbackUrl)) {
    usedUrls.add(fallbackUrl);
    return fallbackUrl;
  }
  const saltedUrl = `${fallbackUrl}&sig=${Math.random()}`;
  usedUrls.add(saltedUrl);
  return saltedUrl;
}

function assignAllProductImagesTS(website: WebsiteJSON) {
  const usedUrls = new Set<string>();
  if (website.pages) {
    website.pages.forEach((page: any) => {
      if (page.sections) {
        page.sections.forEach((sec: any) => {
          if (sec.content && Array.isArray(sec.content.products)) {
            sec.content.products.forEach((p: any, idx: number) => {
              const pName = typeof p === 'string' ? p : (p.name || p.title || `Product ${idx + 1}`);
              if (typeof p === 'object') {
                p.title = p.title || pName;
                p.name = p.name || p.title;
                p.imageQuery = generateProductImageQueryTS(pName);
                p.image = fetchProductImageTS(p.imageQuery, usedUrls);
              }
            });
          }
          if (sec.content && Array.isArray(sec.content.services)) {
            sec.content.services.forEach((s: any, idx: number) => {
              const sName = typeof s === 'string' ? s : (s.name || s.title || `Service ${idx + 1}`);
              if (typeof s === 'object') {
                s.title = s.title || sName;
                s.name = s.name || s.title;
                s.imageQuery = generateProductImageQueryTS(sName);
              }
            });
          }
        });
      }
    });
  }
}

function generateDynamicLogoTS(businessData: any, themeColors: any) {
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

function assignHeroAndLogoTS(websiteJson: any, businessData: any, themeColors: any) {
  const logo = generateDynamicLogoTS(businessData, themeColors);
  if (!websiteJson.theme) websiteJson.theme = {};
  websiteJson.theme.logo = logo;
  websiteJson.logo = logo;
  websiteJson.logoUrl = logo.url;

  const checkStr = `${businessData?.name || ""} ${businessData?.type || ""} ${businessData?.category || ""} ${businessData?.businessType || ""} ${businessData?.businessCategory || ""} ${businessData?.description || ""}`.toLowerCase();
  let heroImg = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80";
  if (checkStr.includes("nursery") || checkStr.includes("plant") || checkStr.includes("flower") || checkStr.includes("garden")) {
    heroImg = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80";
  } else if (checkStr.includes("cafe") || checkStr.includes("coffee") || checkStr.includes("barista")) {
    heroImg = "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80";
  } else if (checkStr.includes("bakery") || checkStr.includes("cake") || checkStr.includes("pastry") || checkStr.includes("bread")) {
    heroImg = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80";
  } else if (checkStr.includes("jewel") || checkStr.includes("diamond") || checkStr.includes("gold")) {
    heroImg = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80";
  } else if (checkStr.includes("salon") || checkStr.includes("hair") || checkStr.includes("beauty") || checkStr.includes("spa")) {
    heroImg = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80";
  } else if (checkStr.includes("hotel") || checkStr.includes("resort") || checkStr.includes("stay")) {
    heroImg = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";
  } else if (checkStr.includes("book") || checkStr.includes("library") || checkStr.includes("stationery")) {
    heroImg = "https://images.unsplash.com/photo-1507842229356-51c6150fe5a3?auto=format&fit=crop&w=1200&q=80";
  } else if (checkStr.includes("electronic") || checkStr.includes("gadget") || checkStr.includes("tech")) {
    heroImg = "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80";
  } else if (checkStr.includes("footwear") || checkStr.includes("shoe") || checkStr.includes("sneaker")) {
    heroImg = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80";
  } else if (checkStr.includes("grocery") || checkStr.includes("supermarket") || checkStr.includes("food")) {
    heroImg = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80";
  } else if (checkStr.includes("furniture") || checkStr.includes("decor") || checkStr.includes("home")) {
    heroImg = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80";
  } else if (checkStr.includes("hospital") || checkStr.includes("health") || checkStr.includes("clinic") || checkStr.includes("medical") || checkStr.includes("doctor") || checkStr.includes("pharmacy") || checkStr.includes("medicine") || checkStr.includes("pill")) {
    heroImg = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80";
  } else if (checkStr.includes("sport") || checkStr.includes("gym") || checkStr.includes("fitness") || checkStr.includes("fit") || checkStr.includes("workout") || checkStr.includes("train")) {
    heroImg = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80";
  } else if (checkStr.includes("real estate") || checkStr.includes("property")) {
    heroImg = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";
  }

  let heroSec: any = null;
  if (websiteJson.pages && Array.isArray(websiteJson.pages)) {
    websiteJson.pages.forEach((p: any) => {
      if (p.sections && Array.isArray(p.sections)) {
        p.sections.forEach((s: any) => {
          if (s.type === "hero") {
            heroSec = s;
            s.content = s.content || {};
            if (!s.content.backgroundImage && !s.content.image) {
              s.content.backgroundImage = heroImg;
              s.content.image = heroImg;
            }
          }
        });
      }
    });
  }

  websiteJson.hero = {
    title: heroSec?.content?.title || businessData?.name || "Our Business",
    subtitle: heroSec?.content?.subtitle || "Excellence Engineered for Your Success",
    backgroundImage: heroSec?.content?.backgroundImage || heroSec?.content?.image || heroImg
  };
}

export const generateLocalMockWebsite = (businessData: any): WebsiteJSON => {
  const name = businessData.name || "My Business Shop";
  const type = businessData.type || "Retail Shop";
  const audience = businessData.audience || "valued customers";
  const productsList = businessData.products && businessData.products.length > 0 
    ? businessData.products 
    : ["Premium Product A", "Premium Product B", "Custom Services"];

  const themePreference = businessData.colorTheme || businessData.themePreference;
  const palette = generateColorPalette(themePreference, type);

  const mockJSON: WebsiteJSON = {
    meta: {
      title: `${name} | Pune's Finest ${type}`,
      description: `Welcome to ${name}. We offer high-quality ${type.toLowerCase()} specialties tailored for ${audience} in Pune, Maharashtra.`,
      keywords: [name, type, "Pune", "Maharashtra", "Local Shop"]
    },
    theme: {
      primaryColor: palette.primaryColor,
      secondaryColor: palette.secondaryColor,
      accentColor: palette.accentColor,
      fontHeading: "Outfit",
      fontBody: "Inter"
    },
    pages: [
      {
        id: "page_home_mock",
        name: "Home",
        path: "/",
        sections: [
          {
            id: "sec_hero_mock",
            type: "hero",
            order: 0,
            visible: true,
            content: {
              title: `Crafting Excellence in Every Detail at ${name}`,
              subtitle: `Discover Pune’s most loved ${type.toLowerCase()}. Designed specifically for ${audience} who appreciate uncompromising quality.`,
              ctaText: "Explore Collection",
              ctaLink: "#products"
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_products_mock",
            type: "products",
            order: 1,
            visible: true,
            content: {
              title: "Our Handpicked Selection",
              subtitle: "Carefully curated choices guaranteed to delight",
              products: productsList.map((prod: string, idx: number) => ({
                name: prod,
                title: prod,
                price: `Rs. ${(idx + 1) * 350}`,
                description: `Fresh, top-tier ${prod} prepared with exceptional craftsmanship and genuine passion.`
              }))
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_services_mock",
            type: "services",
            order: 2,
            visible: true,
            content: {
              title: "What We Offer Fresh Daily",
              subtitle: "Signature local Pune specialties prepared daily with maximum care",
              services: productsList.map((prod: string, idx: number) => ({
                name: prod,
                title: prod,
                description: `Handcrafted ${prod} made with fresh organic ingredients and traditional techniques.`,
                icon: idx % 3 === 0 ? "Sparkles" : idx % 3 === 1 ? "Clock" : "Heart"
              }))
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_testimonials_mock",
            type: "testimonials",
            order: 3,
            visible: true,
            content: {
              title: "Words of Delight from Our Patrons",
              testimonials: [
                {
                  name: "Priya Sharma",
                  role: "Koregaon Park Resident",
                  content: `The quality from ${name} is unmatched in Pune. Every single item we ordered exceeded our expectations!`,
                  rating: 5
                },
                {
                  name: "Vikram Deshmukh",
                  role: "Regular Client",
                  content: "Absolutely fantastic customer care and authentic taste. Highly recommended to everyone looking for quality.",
                  rating: 5
                }
              ]
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_contact_mock",
            type: "contact",
            order: 4,
            visible: true,
            content: {
              title: "Visit Our Store or Order Today",
              address: "Shop No. 4, MG Road, Camp, Pune, Maharashtra 411001",
              phone: "+91 98765 43210",
              email: `contact@${name.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_faq_mock",
            type: "faq",
            order: 5,
            visible: true,
            content: {
              title: "Frequently Asked Questions",
              faqs: [
                {
                  question: "Do you offer home delivery across Pune?",
                  answer: "Yes, we provide same-day doorstep delivery across Pune including Viman Nagar, Kothrud, Baner, and Kalyani Nagar."
                },
                {
                  question: "Can we customize our orders?",
                  answer: "Certainly! Get in touch with our team via WhatsApp or phone at least 24 hours in advance for custom bulk or special occasion orders."
                }
              ]
            },
            styles: {},
            animations: {}
          },
          {
            id: "sec_footer_mock",
            type: "footer",
            order: 6,
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
  assignAllProductImagesTS(mockJSON);
  assignHeroAndLogoTS(mockJSON, businessData, palette);
  return mockJSON;
};

export const generateWebsite = async (businessData: any): Promise<WebsiteJSON> => {
  const hasRealKey = process.env.OPENAI_API_KEY && 
                     !process.env.OPENAI_API_KEY.includes("placeholder") && 
                     process.env.OPENAI_API_KEY.startsWith("sk-");

  if (!hasRealKey) {
    console.warn("[AI Engine] OpenAI API Key is missing or placeholder. Running fallback mockup website generation locally...");
    return generateLocalMockWebsite(businessData);
  }

  const prompt = buildWebsitePrompt(businessData);
  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      console.log(`[AI Engine] Generating website for ${businessData.name} (Attempt ${attempt + 1}/${MAX_RETRIES})`);
      
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant that only responds in valid JSON format without markdown code blocks." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 8000,
      });

      const responseContent = completion.choices[0].message.content;
      
      if (!responseContent) {
        throw new Error("Received empty response from OpenAI");
      }

      // Clean markdown if OpenAI accidentally included it despite instructions
      let cleanedContent = responseContent.trim();
      if (cleanedContent.startsWith("```json")) {
        cleanedContent = cleanedContent.replace(/^```json\n/, "").replace(/\n```$/, "");
      } else if (cleanedContent.startsWith("```")) {
        cleanedContent = cleanedContent.replace(/^```\n/, "").replace(/\n```$/, "");
      }

      let parsedJSON: any;
      try {
        parsedJSON = JSON.parse(cleanedContent);
      } catch (err: any) {
        throw new Error(`Failed to parse response content as JSON: ${err.message}`);
      }

      // 1. TOP LEVEL VALIDATION & DEFAULT FALLBACKS
      if (!parsedJSON.meta) parsedJSON.meta = {};
      parsedJSON.meta.title = parsedJSON.meta.title || `${businessData.name || "My Business"} | Premium Services`;
      parsedJSON.meta.description = parsedJSON.meta.description || `Welcome to ${businessData.name || "our website"}. We offer the highest quality services and products.`;
      parsedJSON.meta.favicon = parsedJSON.meta.favicon || "🌐";
      parsedJSON.meta.keywords = Array.isArray(parsedJSON.meta.keywords) ? parsedJSON.meta.keywords : [businessData.name || "business", "services", "products"];

      if (!parsedJSON.theme) parsedJSON.theme = {};
      parsedJSON.theme.primaryColor = parsedJSON.theme.primaryColor || "#0F172A";
      parsedJSON.theme.secondaryColor = parsedJSON.theme.secondaryColor || "#334155";
      parsedJSON.theme.accentColor = parsedJSON.theme.accentColor || "#38BDF8";
      parsedJSON.theme.fontFamily = parsedJSON.theme.fontFamily || "Inter";
      parsedJSON.theme.style = parsedJSON.theme.style || "modern";

      if (!parsedJSON.globalSettings) parsedJSON.globalSettings = {};
      parsedJSON.globalSettings.navbarStyle = parsedJSON.globalSettings.navbarStyle || "glass";
      parsedJSON.globalSettings.footerStyle = parsedJSON.globalSettings.footerStyle || "simple";
      parsedJSON.globalSettings.whatsappButton = parsedJSON.globalSettings.whatsappButton !== undefined ? parsedJSON.globalSettings.whatsappButton : true;
      parsedJSON.globalSettings.whatsappNumber = parsedJSON.globalSettings.whatsappNumber || businessData.whatsappNumber || null;

      // 2. PAGES VALIDATION
      if (!parsedJSON.pages || !Array.isArray(parsedJSON.pages) || parsedJSON.pages.length === 0) {
        // Fallback: Generate home page
        parsedJSON.pages = [
          {
            name: "Home",
            slug: "/",
            sections: []
          }
        ];
      }

      // 3. SECTION VALIDATION, ID DE-DUPLICATION, & ORDERING
      const usedIds = new Set<string>();
      let sectionCounter = 1;

      parsedJSON.pages.forEach((page: any, pIndex: number) => {
        if (!page.name) page.name = pIndex === 0 ? "Home" : `Page ${pIndex + 1}`;
        if (!page.slug) page.slug = pIndex === 0 ? "/" : `/${page.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        
        if (!page.sections || !Array.isArray(page.sections) || page.sections.length === 0) {
          // Generate default sections for a home page as fallback
          page.sections = [
            {
              id: `sec_fallback_hero_${Math.random().toString(36).substring(2, 5)}`,
              type: "hero",
              order: 0,
              visible: true,
              content: {
                title: `Welcome to ${businessData.name || "Our Business"}`,
                subtitle: `High-quality ${businessData.type || "services"} tailored to your exact needs.`,
                ctaText: "Get in Touch",
                ctaLink: "#contact",
                backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
              },
              styles: {},
              animations: {}
            },
            {
              id: `sec_fallback_about_${Math.random().toString(36).substring(2, 5)}`,
              type: "about",
              order: 1,
              visible: true,
              content: {
                title: "About Us",
                description: `We are proud to serve our community with standard-setting dedication and craftsmanship. Our focus is delivering top tier quality.`,
                image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
                highlights: ["High Quality", "Professional Staff", "Customer First"]
              },
              styles: {},
              animations: {}
            },
            {
              id: `sec_fallback_contact_${Math.random().toString(36).substring(2, 5)}`,
              type: "contact",
              order: 2,
              visible: true,
              content: {
                title: "Contact Us",
                phone: businessData.whatsappNumber || "+91 99999 99999",
                email: "info@business.com",
                address: "Pune, Maharashtra, India"
              },
              styles: {},
              animations: {}
            },
            {
              id: `sec_fallback_footer_${Math.random().toString(36).substring(2, 5)}`,
              type: "footer",
              order: 3,
              visible: true,
              content: {
                businessName: businessData.name || "Our Business",
                copyright: `© ${new Date().getFullYear()} ${businessData.name || "Our Business"}. All Rights Reserved.`,
                links: [{ label: "Home", href: "/" }]
              },
              styles: {},
              animations: {}
            }
          ];
        }

        page.sections.forEach((section: any, sIndex: number) => {
          // Verify required fields
          section.order = typeof section.order === "number" ? section.order : sIndex;
          section.visible = section.visible !== undefined ? section.visible : true;
          section.styles = section.styles || {};
          section.animations = section.animations || {};
          
          // Fix or generate ID
          if (!section.id || usedIds.has(section.id)) {
            section.id = `sec_${section.type || "comp"}_${sectionCounter++}_${Math.random().toString(36).substring(2, 5)}`;
          }
          usedIds.add(section.id);

          // Standardize section type
          const allowedTypes = ["hero", "about", "services", "products", "gallery", "testimonials", "faq", "contact", "footer"];
          if (!section.type || !allowedTypes.includes(section.type)) {
            section.type = "about"; // Safe fallback
          }

          // Verify or generate standard content based on section type
          if (!section.content || typeof section.content !== "object") {
            section.content = {};
          }

          switch (section.type) {
            case "hero":
              section.content.title = section.content.title || `Welcome to ${businessData.name || "Our Shop"}`;
              section.content.subtitle = section.content.subtitle || `Serving the best products and experiences in town.`;
              section.content.ctaText = section.content.ctaText || "Learn More";
              section.content.ctaLink = section.content.ctaLink || "#about";
              section.content.backgroundImage = section.content.backgroundImage || "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80";
              break;
            case "about":
              section.content.title = section.content.title || "Our Journey & Story";
              section.content.description = section.content.description || `Dedicated to excellence since our establishment, we work tirelessly to create beautiful products and premium customer care.`;
              section.content.image = section.content.image || "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80";
              section.content.highlights = Array.isArray(section.content.highlights) ? section.content.highlights : ["Premium Quality", "Customer First", "Handcrafted Craftsmanship"];
              break;
            case "services":
              section.content.title = section.content.title || "Our Signature Services";
              section.content.subtitle = section.content.subtitle || "Premium services designed specifically for you";
              section.content.services = Array.isArray(section.content.services) ? section.content.services : [
                { name: "Premium Consultation", description: "Get direct support from industry experts tailored to your goals.", icon: "Sparkles" },
                { name: "Fast & Reliable Delivery", description: "Get items delivered straight to your doorstep on demand.", icon: "Clock" }
              ];
              break;
            case "products":
              section.content.title = section.content.title || "Our Bestsellers";
              section.content.subtitle = section.content.subtitle || "Popular choices you'll fall in love with";
              section.content.products = Array.isArray(section.content.products) ? section.content.products : [
                { name: "Signature Collection Item", price: "Rs. 499", description: "Crafted meticulously with premium local ingredients.", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80" }
              ];
              break;
            case "gallery":
              section.content.title = section.content.title || "Moments & Creations";
              section.content.images = Array.isArray(section.content.images) ? section.content.images : [
                { url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", caption: "Premium Quality" }
              ];
              break;
            case "testimonials":
              section.content.title = section.content.title || "What Our Clients Say";
              section.content.testimonials = Array.isArray(section.content.testimonials) ? section.content.testimonials : [
                { name: "Aarav Mehta", role: "Loyal Customer", content: "Absolutely wonderful experience. Extremely professional staff and exceptional results!", rating: 5 }
              ];
              break;
            case "faq":
              section.content.title = section.content.title || "Frequently Asked Questions";
              section.content.faqs = Array.isArray(section.content.faqs) ? section.content.faqs : [
                { question: "What are your operating hours?", answer: "We are open from 9:00 AM to 8:00 PM, Monday through Saturday." }
              ];
              break;
            case "contact":
              section.content.title = section.content.title || "Get in Touch Today";
              section.content.phone = section.content.phone || businessData.whatsappNumber || "+91 98765 43210";
              section.content.email = section.content.email || "hello@business.com";
              section.content.address = section.content.address || "Pune, Maharashtra, India";
              break;
            case "footer":
              section.content.businessName = section.content.businessName || businessData.name || "My Business";
              section.content.copyright = section.content.copyright || `© ${new Date().getFullYear()} ${businessData.name || "My Business"}. All Rights Reserved.`;
              section.content.links = Array.isArray(section.content.links) ? section.content.links : [
                { label: "Home", href: "/" }
              ];
              break;
          }
        });
      });

      // Override colors if preference is provided in business data, otherwise rely on AI or color generator
      if (businessData.colorTheme || businessData.themePreference) {
        const palette = generateColorPalette(businessData.colorTheme || businessData.themePreference, businessData.type || "");
        parsedJSON.theme.primaryColor = palette.primaryColor;
        parsedJSON.theme.secondaryColor = palette.secondaryColor;
        parsedJSON.theme.accentColor = palette.accentColor;
      }

      const validatedJSON = parsedJSON as WebsiteJSON;
      assignAllProductImagesTS(validatedJSON);
      assignHeroAndLogoTS(validatedJSON, businessData, {
        primaryColor: validatedJSON.theme?.primaryColor,
        secondaryColor: validatedJSON.theme?.secondaryColor,
        accentColor: validatedJSON.theme?.accentColor
      });
      return validatedJSON;

    } catch (error) {
      console.error(`[AI Engine] Attempt ${attempt + 1} failed:`, error);
      attempt++;
      if (attempt >= MAX_RETRIES) {
        throw new Error(`Failed to generate valid website JSON after ${MAX_RETRIES} attempts. Error: ${error instanceof Error ? error.message : "Unknown"}`);
      }
    }
  }
  
  throw new Error("Unexpected error in generateWebsite");
};
