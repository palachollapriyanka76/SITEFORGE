const axios = require('axios');

// --- 1. Business Pattern Intelligence Classifier ---
function classifyBusinessPattern(businessData) {
  const text = `${businessData.name || ""} ${businessData.type || ""} ${businessData.category || ""} ${businessData.businessType || ""} ${businessData.businessCategory || ""} ${businessData.description || ""}`.toLowerCase();
  
  // Helper to match whole words or exact phrases safely without false positives (e.g., "care" will not match "car")
  const matchesKeyword = (kw) => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    return regex.test(text);
  };

  // Ordered by specificity (most specific first, generic last)
  const patterns = [
    { name: "Sports & Fitness", subType: "gym", keywords: ["fitness", "fit", "gym", "crossfit", "fitness arena", "sports hub", "workout", "yoga", "pilates", "personal training", "trainer", "training", "athletic", "zumba", "adventure gear", "bicycle", "bike world", "sports"] },
    { name: "Agriculture", subType: "nursery", keywords: ["nursery", "plant nursery", "plants", "plant", "garden", "gardening", "seeds", "fertilizers", "indoor plants", "outdoor plants", "botanical", "flowers", "greenhouse", "agriculture", "farm fresh", "organic basket", "crop"] },
    { name: "Restaurant", keywords: ["restaurant", "bistro", "diner", "eatery", "buffet", "steakhouse", "seafood market", "bar & grill", "pizzeria", "dining"] },
    { name: "Cafe", keywords: ["cafe", "coffee", "roasters", "espresso", "latte", "crossants", "cakes", "sweet treats", "ice cream", "juices", "tea", "waffles", "pastry", "bakery"] },
    { name: "Healthcare", keywords: ["clinic", "hospital", "doctor", "dental", "dentist", "pharmacy", "medicare", "health", "wellness clinic", "optical", "therapy", "pediatric"] },
    { name: "Education", keywords: ["school", "academy", "learning", "college", "university", "institute", "coaching", "tutoring"] },
    { name: "Technology", keywords: ["software", "it solutions", "digital", "laptop care", "computer", "ai", "cybersecurity", "cloud", "electronics", "gadgets", "tech store", "smartphones", "laptops"] },
    { name: "Real Estate", keywords: ["real estate", "realty", "properties", "homes", "villas", "apartments", "dream homes", "housing", "land", "realtor"] },
    { name: "Beauty & Wellness", keywords: ["salon", "spa", "beauty bliss", "cosmetics", "makeup", "skincare", "hair", "wellness", "massage", "grooming"] },
    { name: "Automotive", keywords: ["automotive", "auto zone", "car", "cars", "garage", "motor", "vehicle", "repair", "tires", "mechanic", "dealership", "auto"] },
    { name: "Travel", keywords: ["travel explorer", "agency", "tour", "holiday", "cruise", "adventure trips", "resort", "hotel", "vacation"] },
    { name: "Entertainment", keywords: ["game zone", "gaming", "music corner", "entertainment", "cinema", "event", "dj", "party", "vr"] },
    { name: "Home Services", keywords: ["plumbing", "roofing", "electrician", "hvac", "solar solutions", "cleaning", "pest control", "moving", "interior concepts", "furniture", "home decor"] },
    { name: "Professional Services", keywords: ["consulting", "law firm", "legal", "accounting", "tax", "marketing", "creative studio", "photography", "drone vision"] },
    { name: "Manufacturing", keywords: ["manufacturing", "factory", "industrial", "furniture factory", "production", "assembly", "fabrication"] },
    { name: "Retail", keywords: ["store", "shop", "mart", "hub", "boutique", "palace", "corner", "world", "studio", "retail", "market", "footwear", "toys", "books", "pets", "grocery", "stationery", "printing", "aquarium", "art", "wedding", "watches", "shoes"] }
  ];

  for (const pat of patterns) {
    const matchedKw = pat.keywords.find(kw => matchesKeyword(kw));
    if (matchedKw) {
      return { 
        pattern: pat.name, 
        subType: pat.subType || pat.name.toLowerCase(), 
        matchedKeyword: matchedKw 
      };
    }
  }
  return { pattern: "Retail", subType: "retail", matchedKeyword: "store" };
}

// --- 2. NLP Extractor ---
function extractBusinessKeywords(businessData) {
  const name = (businessData.name || "").toLowerCase();
  const type = (businessData.type || "").toLowerCase();
  const audience = (businessData.audience || "").toLowerCase();
  const desc = (businessData.description || "").toLowerCase();
  
  const stopWords = new Set(["and", "the", "a", "an", "for", "in", "on", "with", "to", "of", "business", "store", "shop", "service", "services", "company", "inc", "ltd", "we", "are", "is", "our", "your"]);
  
  function tokenize(txt) {
    if (!txt) return [];
    return txt.split(/[\s,.-]+/).filter(w => w.length > 2 && !stopWords.has(w));
  }
  
  const primaryKeywords = Array.from(new Set([...tokenize(name), ...tokenize(type)]));
  const secondaryKeywords = Array.from(new Set([...tokenize(desc), ...tokenize(audience)]));
  
  let productKeywords = [];
  if (businessData.products && businessData.products.length > 0) {
    businessData.products.forEach(p => {
      const pName = typeof p === 'string' ? p : p.name;
      if (pName) productKeywords.push(...tokenize(pName.toLowerCase()));
    });
  }
  productKeywords = Array.from(new Set(productKeywords));
  
  let serviceKeywords = [];
  if (businessData.services && businessData.services.length > 0) {
    businessData.services.forEach(s => {
      const sName = typeof s === 'string' ? s : s.name;
      if (sName) serviceKeywords.push(...tokenize(sName.toLowerCase()));
    });
  }
  serviceKeywords = Array.from(new Set(serviceKeywords));

  return {
    primaryKeywords,
    secondaryKeywords,
    productKeywords,
    serviceKeywords,
    businessType: type,
    businessName: name
  };
}

// --- 2.5. Dedicated Product Image Query & Image Assignment Engine ---
const PRODUCT_QUERY_RULES = [
  // Bakery & Desserts
  { pattern: /\bfruit\s*tart\b/i, query: "fruit tart" },
  { pattern: /\bchocolate\s*cake\b/i, query: "chocolate cake" },
  { pattern: /\bred\s*velvet\b/i, query: "red velvet cake" },
  { pattern: /\bplum\s*cake\b/i, query: "plum cake" },
  { pattern: /\bcupcake/i, query: "cupcakes" },
  { pattern: /\bcookie/i, query: "cookies" },
  { pattern: /\bbrownie/i, query: "brownies" },
  { pattern: /\bcroissant\b/i, query: "butter croissant" },
  { pattern: /\bdonut|\bdoughnut/i, query: "donuts" },
  { pattern: /\bmacaron/i, query: "french macarons" },
  { pattern: /\bpastry|\bpastries\b/i, query: "bakery pastry dessert" },
  { pattern: /\bcake\b/i, query: "delicious bakery cake" },
  // Restaurant & Cafe
  { pattern: /\bpizza\b/i, query: "pepperoni pizza" },
  { pattern: /\bburger\b/i, query: "beef burger" },
  { pattern: /\bpasta\b|\bnoodle/i, query: "creamy pasta" },
  { pattern: /\bsteak\b/i, query: "grilled ribeye steak" },
  { pattern: /\bsalad\b/i, query: "fresh organic vegetable salad" },
  { pattern: /\bespresso\b|\bcoffee\b/i, query: "specialty coffee cup" },
  { pattern: /\bmatcha\b|\btea\b/i, query: "green tea latte" },
  { pattern: /\bwaffle/i, query: "belgian waffles berries" },
  { pattern: /\bgelato|\bice\s*cream/i, query: "artisan gelato ice cream" },
  // Footwear Store
  { pattern: /\brunning\s*shoe/i, query: "running shoes" },
  { pattern: /\bsneaker/i, query: "casual sneakers" },
  { pattern: /\bboot/i, query: "leather boots" },
  { pattern: /\bsandal/i, query: "men sandals" },
  { pattern: /\bformal\s*shoe|\boxford|\bloafer/i, query: "black formal shoes" },
  { pattern: /\bshoe/i, query: "stylish shoes" },
  // Furniture Store
  { pattern: /\bdining\s*table/i, query: "wooden dining table" },
  { pattern: /\bsofa|\bcouch|\bsectional/i, query: "modern fabric sofa" },
  { pattern: /\bwardrobe|\bcloset/i, query: "wood wardrobe" },
  { pattern: /\bchair|\bseating/i, query: "ergonomic modern chair" },
  { pattern: /\bbed\b|\bplatform\s*bed/i, query: "modern king size bed" },
  { pattern: /\bbookcase|\bshelv/i, query: "modern wooden bookcase" },
  { pattern: /\blamp|\blighting/i, query: "modern table lamp" },
  // Jewelry
  { pattern: /\bgold\s*ring/i, query: "gold ring jewelry" },
  { pattern: /\bdiamond\s*necklace/i, query: "diamond necklace" },
  { pattern: /\bring\b/i, query: "gold ring jewelry" },
  { pattern: /\bnecklace\b/i, query: "diamond necklace" },
  { pattern: /\bearring/i, query: "diamond earrings" },
  { pattern: /\bbracelet/i, query: "gold bracelet jewelry" },
  // Plants & Nursery
  { pattern: /\bmonstera/i, query: "monstera deliciosa indoor plant" },
  { pattern: /\bfiddle\s*leaf/i, query: "fiddle leaf fig tree" },
  { pattern: /\bsucculent|\bterrarium/i, query: "succulent plant terrarium" },
  { pattern: /\bsansevieria|\bsnake\s*plant/i, query: "sansevieria snake plant" },
  { pattern: /\bpothos/i, query: "pothos hanging plant" },
  { pattern: /\bpeace\s*lily/i, query: "peace lily indoor plant" },
  { pattern: /\bbonsai/i, query: "bonsai tree pot" },
  { pattern: /\bsoil|\bpotting/i, query: "organic potting soil bags" },
  { pattern: /\bshear|\bprun/i, query: "gardening pruning shears tools" },
  { pattern: /\bplanter|\bpot\b/i, query: "ceramic plant pots" },
  { pattern: /\bfertilizer/i, query: "plant organic fertilizer" },
  // Electronics & Tech
  { pattern: /\bsmart\s*tv|\btv\b/i, query: "smart 4k television screen" },
  { pattern: /\bheadphone/i, query: "wireless noise canceling headphones" },
  { pattern: /\bearbud/i, query: "true wireless earbuds" },
  { pattern: /\bkeyboard/i, query: "mechanical rgb keyboard" },
  { pattern: /\bmouse/i, query: "wireless ergonomic mouse" },
  { pattern: /\blaptop/i, query: "modern slim laptop computer" },
  { pattern: /\bcamera/i, query: "4k action digital camera" },
  { pattern: /\bsmartwatch|\bwatch/i, query: "smart fitness watch" }
];

function generateProductImageQuery(productName) {
  if (!productName || typeof productName !== 'string') return "product item";
  
  // First check exact keyword override patterns
  for (const rule of PRODUCT_QUERY_RULES) {
    if (rule.pattern.test(productName)) {
      return rule.query;
    }
  }
  
  // Otherwise clean out generic promotional modifiers to keep ONLY the product noun
  const genericModifiers = [
    /-\s*(Pro Series|Essential Edition|Deluxe Model|Signature Line|Classic Edition|Ultra Performance|Premium Select|Custom Crafted|Everyday Edition|Professional Grade|Luxury Collection|Compact Edition|Advanced Series|Executive Choice|Masterwork Edition|Standard Edition|Limited Edition|Special Edition)/gi,
    /\b(Pro Series|Essential Edition|Deluxe Model|Signature Line|Classic Edition|Ultra Performance|Premium Select|Custom Crafted|Everyday Edition|Professional Grade|Luxury Collection|Compact Edition|Advanced Series|Executive Choice|Masterwork Edition|Standard Edition|Limited Edition|Special Edition)\b/gi
  ];
  let cleaned = productName;
  genericModifiers.forEach(regex => {
    cleaned = cleaned.replace(regex, "");
  });
  cleaned = cleaned.replace(/[^a-zA-Z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  
  return cleaned || productName;
}

const PRODUCT_IMAGE_DATABASE = {
  // Bakery & Desserts
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
    "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80"
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
  // Footwear
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
  // Furniture
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
  // Jewelry
  "gold ring jewelry": [
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1598560917505-59a3655c1592?auto=format&fit=crop&w=800&q=80"
  ],
  "diamond necklace": [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
  ],
  // Restaurant & Cafe
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

async function fetchProductImage(imageQuery, usedUrls = new Set()) {
  const queryKey = (imageQuery || "").toLowerCase().trim();
  
  // 1. Try Pexels specifically for THIS product query if online & API key configured
  const apiKey = process.env.PEXELS_API_KEY;
  if (apiKey && !apiKey.includes("placeholder")) {
    try {
      const res = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(queryKey)}&per_page=15&orientation=landscape`, {
        headers: { 'Authorization': apiKey }
      });
      const photos = res.data.photos || [];
      for (const p of photos) {
        const url = p.src?.large2x || p.src?.large || p.src?.medium;
        if (url && !usedUrls.has(url)) {
          usedUrls.add(url);
          return url;
        }
      }
    } catch (err) {
      // Fall through to database/fallback
    }
  }
  
  // 2. Check exact or partial match in PRODUCT_IMAGE_DATABASE
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
  
  // 3. Fallback specifically tailored to the exact product query using Unsplash CDN
  const fallbackUrl = `https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80&query=${encodeURIComponent(queryKey)}`;
  if (!usedUrls.has(fallbackUrl)) {
    usedUrls.add(fallbackUrl);
    return fallbackUrl;
  }
  const saltedUrl = `${fallbackUrl}&sig=${Math.random()}`;
  usedUrls.add(saltedUrl);
  return saltedUrl;
}

async function assignProductImages(expandedProducts) {
  if (!expandedProducts || !Array.isArray(expandedProducts)) return;
  const usedUrls = new Set();
  for (const p of expandedProducts) {
    const rawName = typeof p === 'string' ? p : (p.name || p.title || "Product");
    if (typeof p === 'object') {
      p.title = p.title || rawName;
      p.name = p.name || p.title;
      p.imageQuery = generateProductImageQuery(rawName);
      p.image = await fetchProductImage(p.imageQuery, usedUrls);
    }
  }
}

async function assignServiceImages(expandedServices) {
  if (!expandedServices || !Array.isArray(expandedServices)) return;
  const usedUrls = new Set();
  for (const s of expandedServices) {
    const rawName = typeof s === 'string' ? s : (s.name || s.title || "Service");
    if (typeof s === 'object') {
      s.title = s.title || rawName;
      s.name = s.name || s.title;
      s.imageQuery = generateProductImageQuery(rawName);
      s.image = await fetchProductImage(s.imageQuery, usedUrls);
    }
  }
}

// --- 3. Intelligent Product & Service Expansion ---
function expandProductsAndServices(businessData, patternInfo) {
  const rawProducts = businessData.products && businessData.products.length > 0
    ? businessData.products.map(p => typeof p === 'string' ? p.trim() : (p.name || "")).filter(Boolean)
    : [];

  const rawServices = businessData.services && businessData.services.length > 0
    ? businessData.services.map(s => typeof s === 'string' ? s.trim() : (s.name || "")).filter(Boolean)
    : [];

  const bType = (businessData.type || businessData.name || patternInfo.pattern).trim();
  
  // Dynamic Product Expansion (12-15 items, NO placeholders)
  const expandedProducts = [];
  const modifiers = [
    "Pro Series", "Essential Edition", "Deluxe Model", "Signature Line", "Classic Edition", 
    "Ultra Performance", "Premium Select", "Custom Crafted", "Everyday Edition", 
    "Professional Grade", "Luxury Collection", "Compact Edition", "Advanced Series", "Executive Choice", "Masterwork Edition"
  ];

  const genericForbidden = new Set([
    "product 1", "product a", "premium package", "standard package", "basic service", 
    "item 1", "service 1", "package 1", "sample product", "test product", "default package"
  ]);

  if (rawProducts.length > 0) {
    rawProducts.forEach((p, idx) => {
      if (!genericForbidden.has(p.toLowerCase())) {
        expandedProducts.push({
          id: `prod_${Math.random().toString(36).substring(2, 7)}_${idx}`,
          name: p,
          title: p,
          price: `$${(29 + idx * 15 + (idx % 3) * 5.99).toFixed(2)}`,
          description: `Engineered for excellence. The ${p} provides unmatched quality, durability, and performance tailored for ${patternInfo.pattern.toLowerCase()} enthusiasts.`,
          imageQuery: generateProductImageQuery(p),
          category: idx % 2 === 0 ? "Best Sellers" : "Featured Collection",
          badge: idx === 0 ? "Best Seller" : (idx === 2 ? "New Arrival" : null),
          discount: idx === 1 ? "10% OFF" : null,
          stock: 15 + (idx * 6) % 45,
          sku: `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          availability: "In Stock",
          tags: [patternInfo.pattern, idx % 2 === 0 ? "Featured" : "Popular", bType],
          features: ["High-grade materials & precision craftsmanship", "Certified durability tested to industry standards", "Full 1-year manufacturer warranty & support", "Express dispatch available"],
          variants: ["Standard Edition", "Pro Grade Variant", "Deluxe Package"]
        });
      }
    });

    // Expand natural variants from supplied products to guarantee 12-15 items
    let mIdx = 0;
    while (expandedProducts.length < 15 && rawProducts.length > 0) {
      const baseItem = rawProducts[expandedProducts.length % rawProducts.length];
      const mod = modifiers[mIdx % modifiers.length];
      const newName = `${baseItem} - ${mod}`;
      if (!expandedProducts.some(ep => ep.name.toLowerCase() === newName.toLowerCase()) && !genericForbidden.has(newName.toLowerCase())) {
        const pLen = expandedProducts.length;
        expandedProducts.push({
          id: `prod_${Math.random().toString(36).substring(2, 7)}_${pLen}`,
          name: newName,
          title: newName,
          price: `$${(39 + pLen * 12 + 0.99).toFixed(2)}`,
          description: `Our upgraded ${mod} of the popular ${baseItem}. Specifically designed for superior satisfaction and reliability.`,
          imageQuery: generateProductImageQuery(baseItem),
          category: pLen % 3 === 0 ? "Premium Selection" : "New Arrivals",
          badge: pLen === 5 ? "Limited Edition" : null,
          discount: pLen === 7 ? "15% OFF" : null,
          stock: 10 + (pLen * 4) % 35,
          sku: `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          availability: "In Stock",
          tags: [patternInfo.pattern, "Special Edition", bType],
          features: ["Upgraded performance components", "Ergonomic & optimized design build", "Backed by premium client assurance", "Fast fulfillment nationwide"],
          variants: ["Standard Variant", "Performance Variant", "Ultra Edition"]
        });
      }
      mIdx++;
      if (mIdx > 30) break;
    }
  } else {
    // Zero-input synthesis based on Business Type & Pattern (12-15 realistic items)
    let baseNames = [
      `Signature ${bType}`, `Professional ${bType}`, `Executive ${bType}`,
      `Custom ${bType} Kit`, `Advanced ${bType}`, `Premium ${bType} Set`,
      `Essential ${bType}`, `Artisan ${bType}`, `Modern ${bType} Collection`,
      `Ultra ${bType}`, `Deluxe ${bType} Edition`, `Compact ${bType}`,
      `Masterwork ${bType}`, `Precision ${bType}`, `Elite ${bType} Bundle`
    ];

    const lowerDesc = `${businessData?.name || ""} ${bType} ${businessData?.description || ""}`.toLowerCase();
    if (lowerDesc.includes("nursery") || lowerDesc.includes("plant") || lowerDesc.includes("flower") || lowerDesc.includes("garden")) {
      baseNames = [
        "Monstera Deliciosa Indoor Plant", "Fiddle Leaf Fig Tree", "Organic Potting Soil Mix (20L)",
        "Succulent Trio Terrarium Pack", "Heavy-Duty Pruning Shears", "Bonsai Starter Kit with Trimming Tools",
        "Areca Palm Outdoor Air-Purifying Set", "Organic Liquid Fertilizer (1 Liter)", "Handmade Terracotta Planter Set (3-Pack)",
        "Peace Lily Rejuvenation Pack", "Golden Pothos Hanging Basket", "Sansevieria Snake Plant (Medium)",
        "Organic Vegetable Seed Collection (12 Varieties)", "Self-Watering Ceramic Planter (Large)", "Heirloom Tomato Plant Seedlings"
      ];
    } else if (lowerDesc.includes("electronic") || lowerDesc.includes("gadget") || lowerDesc.includes("tech")) {
      baseNames = [
        "Ultra-HD 4K Smart TV (55-Inch)", "Noise-Canceling Wireless Headphones Pro", "Mechanical RGB Gaming Keyboard",
        "Next-Gen Core Laptop (16GB RAM, 512GB SSD)", "Smart Fitness & Health Monitoring Watch", "Fast-Charge Power Bank 20,000mAh",
        "True Wireless Active Earbuds Pro", "4K Action Studio Camera with Stabilizer", "Ergonomic Bluetooth Wireless Mouse",
        "USB-C Multi-Port Docking Station", "High-Speed Wi-Fi 6 Mesh Router System", "Portable Bluetooth Waterproof Speaker"
      ];
    } else if (lowerDesc.includes("footwear") || lowerDesc.includes("shoe") || lowerDesc.includes("sneaker")) {
      baseNames = [
        "Air Velocity Ultra Running Shoes", "Classic Italian Leather Loafers", "Pro Court High-Top Basketball Sneakers",
        "Cloud Cushion Slip-On Walkers", "All-Weather Waterproof Trekking Boots", "Marathon Elite Performance Trainers",
        "Urban Street Suede Casual Sneakers", "Lightweight Breathable Summer Sandals", "Orthopedic Arch-Support Walkers",
        "Formal Oxford Classic Dress Shoes", "Minimalist Canvas Everyday Sneakers", "High-Grip Trail Hiking Shoes"
      ];
    } else if (lowerDesc.includes("grocery") || lowerDesc.includes("supermarket") || lowerDesc.includes("food")) {
      baseNames = [
        "Organic Extra Virgin Cold-Pressed Olive Oil (500ml)", "Fresh Artisan Sourdough Bread Loaf", "Raw Organic Honeycomb Glass Jar (400g)",
        "Cold-Pressed Unsweetened Almond Milk (1L)", "Farm Fresh Organic Berry Mix (250g)", "Artisan Dark Sea Salt Chocolate Bar (85% Cacao)",
        "Free-Range Pasture-Raised Organic Eggs (12-Pack)", "Premium Himalayan Pink Crystal Salt (500g)", "Roasted Unsalted Whole Cashews (400g)",
        "Pure Organic Canadian Maple Syrup (250ml)", "Fresh Cold-Pressed Orange Juice (1L)", "Gluten-Free Organic Rolled Oats (1kg)"
      ];
    } else if (lowerDesc.includes("clinic") || lowerDesc.includes("medical") || lowerDesc.includes("doctor") || lowerDesc.includes("health")) {
      baseNames = [
        "Comprehensive Health Checkup & Screening Package", "Advanced Cardiac Risk Assessment Consultation", "Complete Diagnostic Blood Profile Test",
        "Full-Body Physical Evaluation & Wellness Plan", "Expert Specialist Diagnostic Consultation", "Preventive Cancer Screening Diagnostic Package",
        "Metabolic & Thyroid Comprehensive Panel", "Digital X-Ray & Ultrasound Diagnostic Service", "Personalized Nutritional Therapy & Diet Plan",
        "Executive Annual Medical Screening Suite", "Pediatric Preventive Care Examination", "Senior Citizen Joint & Bone Density Assessment"
      ];
    } else if (lowerDesc.includes("gym") || lowerDesc.includes("fitness") || lowerDesc.includes("sport")) {
      baseNames = [
        "Gold All-Access Gym Membership (Monthly Pass)", "VIP Personal Training Package (10 Guided Sessions)", "Whey Protein Isolate Powder (5lb Tub, Chocolate)",
        "Adjustable Dumbbell Set (5 to 52 lbs per Dumbbell)", "High-Density Non-Slip Yoga & Pilates Mat Pro", "Post-Workout Recovery BCAA Complex (30 Servings)",
        "CrossFit Competition Kettlebell (24kg Cast Iron)", "Heavy-Duty Resistance Bands 5-Pack with Handles", "Professional Neoprene Weightlifting Belt",
        "Personalized Sports Nutrition & Meal Prep Plan", "Agility Ladder & Speed Cone Training Kit", "Foam Roller & Deep-Tissue Massage Stick Set"
      ];
    } else if (lowerDesc.includes("restaurant") || lowerDesc.includes("cafe") || lowerDesc.includes("coffee") || lowerDesc.includes("dining")) {
      baseNames = [
        "Truffle & Forest Mushroom Artisan Burger", "Wood-Fired Neapolitan Margherita Pizza", "Cold Brew Nitro Infused Specialty Espresso",
        "Fresh Smashed Avocado & Poached Egg Toast", "Grilled Wild Alaskan Salmon Grain Bowl", "Handcrafted Pistachio Gelato (Double Scoop)",
        "Signature Ceremonial Grade Matcha Green Tea Latte", "Slow-Cooked BBQ Beef Ribs with Truffle Fries", "Vegan Roasted Vegetable Buddha Bowl",
        "Belgian Brussels Waffle with Fresh Berries & Cream", "Artisan Charcuterie & Aged Cheese Board", "House Special Pan-Seared Ribeye Steak (12oz)"
      ];
    } else if (lowerDesc.includes("furniture") || lowerDesc.includes("decor") || lowerDesc.includes("home")) {
      baseNames = [
        "Scandinavian Solid Oak Dining Table (6-Seater)", "Ergonomic Mesh High-Back Executive Office Chair", "Velvet Modular L-Shape Sectional Sofa",
        "Minimalist King Size Platform Bed Frame", "Handcrafted Solid Walnut Mid-Century Bookcase", "Genuine Leather Lounge Armchair with Ottoman",
        "Natural Marble Top Round Coffee Table", "Electric Height-Adjustable Dual-Motor Standing Desk", "Industrial Steel & Reclaimed Wood Shelving Unit",
        "Modernist Fluted Wooden Bedside Nightstand Set", "Hand-Woven Natural Jute Area Rug (8x10 ft)", "Artisan Ceramic & Brass Table Lamp Set"
      ];
    } else if (lowerDesc.includes("fashion") || lowerDesc.includes("clothing") || lowerDesc.includes("apparel") || lowerDesc.includes("boutique")) {
      baseNames = [
        "Tailored Italian Merino Wool Double-Breasted Blazer", "Heavyweight Organic Cotton Oversized Crew Tee", "Classic Japanese Selvedge Slim-Fit Denim Jeans",
        "Silk Satin Cowl-Neck Evening Slip Dress", "Handcrafted Full-Grain Leather Everyday Tote Bag", "Linen Summer Relaxed Button-Down Shirt",
        "All-Weather Belted Double-Breasted Trench Coat", "100% Mongolian Cashmere Crewneck Sweater", "Pleated High-Waisted A-Line Midi Skirt",
        "Polarized Acetate Frame Designer Sunglasses", "Hand-Stitched Leather Belt with Solid Brass Buckle", "Silk Printed Geometric Silk Scarf"
      ];
    }

    baseNames.forEach((name, idx) => {
      expandedProducts.push({
        id: `prod_${Math.random().toString(36).substring(2, 7)}_${idx}`,
        name: name,
        title: name,
        price: `$${(29 + idx * 15 + 0.99).toFixed(2)}`,
        description: `Top-tier ${name.toLowerCase()} crafted to exact professional specifications for superior satisfaction and reliability.`,
        imageQuery: generateProductImageQuery(name),
        category: idx < 4 ? "Best Sellers" : (idx < 8 ? "Featured Collection" : "New Arrivals"),
        badge: idx === 0 ? "Best Seller" : (idx === 3 ? "New Arrival" : null),
        discount: idx === 2 ? "15% OFF" : (idx === 6 ? "20% OFF" : null),
        stock: 15 + (idx * 5) % 40,
        sku: `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        availability: "In Stock",
        tags: [patternInfo.pattern, idx < 4 ? "Top Rated" : "Core", bType],
        features: [
          "Crafted from high-grade verified components",
          "Engineered for daily professional endurance and enjoyment",
          "Tested for structural integrity and reliability",
          "Backed by comprehensive client satisfaction guarantee"
        ],
        variants: ["Standard Configuration", "Premium Package", "Deluxe Edition"]
      });
    });
  }

  // Dynamic Service Expansion (6-8 complementary services without placeholders)
  const expandedServices = [];
  if (rawServices.length > 0) {
    rawServices.forEach((s, idx) => {
      if (!genericForbidden.has(s.toLowerCase())) {
        expandedServices.push({
          id: `serv_${Math.random().toString(36).substring(2, 7)}_${idx}`,
          name: s,
          description: `Complete, end-to-end ${s.toLowerCase()} delivered by certified specialists with guaranteed results.`,
          icon: "Star",
          price: `$${(89 + idx * 40).toFixed(2)} / engagement`,
          duration: "45 - 90 Mins",
          features: ["Dedicated expert consultant", "Comprehensive initial assessment", "Customized implementation strategy"]
        });
      }
    });
  }
  const defaultServiceNames = [
    `Custom ${bType} Consultation`, `Professional Maintenance & Support`,
    `Rapid Delivery & Installation`, `Dedicated Account Management`,
    `Comprehensive Quality Audit`, `24/7 Priority Customer Assistance`,
    `Specialized System Diagnostics`, `Custom Solution Design`
  ];
  let sIdx = 0;
  while (expandedServices.length < 8) {
    const sName = defaultServiceNames[sIdx % defaultServiceNames.length];
    if (!expandedServices.some(es => es.name === sName)) {
      expandedServices.push({
        id: `serv_${Math.random().toString(36).substring(2, 7)}_${expandedServices.length}`,
        name: sName,
        description: `Tailored service designed to maximize the value and longevity of your ${bType.toLowerCase()} investments.`,
        icon: sIdx % 2 === 0 ? "CheckCircle" : "Shield",
        price: `$${(99 + sIdx * 35).toFixed(2)} / session`,
        duration: "1 - 2 Hours",
        features: ["Tailored specifically to your goals", "Fast scheduling & execution", "Guaranteed client satisfaction"]
      });
    }
    sIdx++;
    if (sIdx > 20) break;
  }

  return { 
    expandedProducts: expandedProducts.slice(0, 15), 
    expandedServices: expandedServices.slice(0, 8) 
  };
}

// --- 4. Dynamic Category & Collection Generation ---
function generateCategoriesAndCollections(businessData, patternInfo, products) {
  const pattern = patternInfo.pattern;
  let categories = ["All Offerings", "Best Sellers", "New Arrivals"];
  let collections = [];

  const lowerNameDesc = `${businessData?.name || ""} ${businessData?.type || ""} ${businessData?.description || ""}`.toLowerCase();

  if (lowerNameDesc.includes("nursery") || lowerNameDesc.includes("plant") || lowerNameDesc.includes("flower") || lowerNameDesc.includes("garden")) {
    categories = ["Plant Nursery", "Indoor Plants", "Outdoor Plants", "Seeds", "Gardening Tools", "Fertilizers", "Flower Collections", "Care Guides"];
    collections = ["Spring Botanicals", "Low-Light Indoor Favorites", "Rare Exotic Species"];
  } else if (lowerNameDesc.includes("electronic") || lowerNameDesc.includes("gadget") || lowerNameDesc.includes("tech")) {
    categories = ["Smartphones & Laptops", "Home Audio & Visual", "Smart Home Tech", "Wearables & Watches", "Gaming & Accessories"];
    collections = ["Next-Gen Tech Line", "Smart Workplace Kit", "Pro Audio Showcase"];
  } else if (lowerNameDesc.includes("footwear") || lowerNameDesc.includes("shoe") || lowerNameDesc.includes("sneaker")) {
    categories = ["Sneakers & Athletic", "Formal & Leather", "Casual & Slip-Ons", "All-Weather Boots", "Limited Editions"];
    collections = ["Marathon Pro Series", "Italian Leather Heritage", "Urban Streetwear Selection"];
  } else if (lowerNameDesc.includes("grocery") || lowerNameDesc.includes("supermarket") || lowerNameDesc.includes("food")) {
    categories = ["Fresh Produce & Organics", "Dairy & Bakery", "Pantry Staples", "Artisan Oils & Honeys", "Household Essentials"];
    collections = ["Farm to Table Organics", "Daily Breakfast Staples", "Artisan Pantry Box"];
  } else if (lowerNameDesc.includes("clinic") || lowerNameDesc.includes("medical") || lowerNameDesc.includes("doctor") || lowerNameDesc.includes("health")) {
    categories = ["General Consultation", "Preventive Screening", "Diagnostic Tests", "Specialized Therapies", "Pediatric & Family Care"];
    collections = ["Complete Annual Checkup", "Executive Cardiac Screen", "Rejuvenation & Wellness"];
  } else if (lowerNameDesc.includes("furniture") || pattern === "Manufacturing") {
    categories = ["Living Room Sets", "Bedroom Collections", "Ergonomic Office", "Custom Woodwork", "Artisan Seating"];
    collections = ["Modern Minimalist Home", "Executive Workspace Line", "Handcrafted Heritage"];
  } else if (pattern === "Sports & Fitness" || lowerNameDesc.includes("gym") || lowerNameDesc.includes("fitness")) {
    categories = ["Strength & Conditioning", "Cardio Systems", "Personal Training Tiers", "Nutrition & Recovery"];
    collections = ["Total Transformation Pack", "Athlete Prep Bundle"];
  } else if (pattern === "Real Estate") {
    categories = ["Luxury Villas", "Prime Commercial", "Urban Apartments", "Exclusive Penthouses"];
    collections = ["Waterfront Estates", "Downtown High-Rises"];
  } else if (pattern === "Retail" || lowerNameDesc.includes("fashion") || lowerNameDesc.includes("clothing")) {
    categories = ["Featured Collection", "New Arrivals", "Best Sellers", "Premium Selection", "Essential Accessories"];
    collections = ["Summer Collection", "Executive Selection", "Limited Edition Line"];
  } else if (pattern === "Restaurant" || pattern === "Cafe") {
    categories = ["Chef's Specials", "Main Offerings", "Fresh & Organic", "Signature Beverages", "House Desserts"];
    collections = ["Weekend Brunch Special", "Chef's Tasting Menu"];
  } else {
    categories = ["Core Products", "Specialized Equipment", "Premium Solutions", "Accessories"];
    collections = ["Seasonal Showcase", "Professional Choice"];
  }

  return { categories, collections };
}

// --- 5. Enhanced Business Understanding Engine ---
function generateBusinessUnderstanding(businessData, keywords, patternInfo, expandedData) {
  const type = (businessData.type || "").toLowerCase().trim() || "business";
  const pattern = patternInfo.pattern;

  const goalsMap = {
    "Retail": "Maximize product conversion and high-velocity e-commerce checkouts",
    "Restaurant": "Drive table reservations and online dining orders",
    "Cafe": "Boost foot traffic and repeat order frequency",
    "Healthcare": "Establish clinical trust and secure patient appointments",
    "Real Estate": "Generate high-intent property buyer leads",
    "Technology": "Demonstrate technical superiority and software subscriptions",
    "Sports & Fitness": "Convert visitors into active gym memberships",
    "Professional Services": "Schedule executive consultations and proposals"
  };

  const goal = goalsMap[pattern] || `Deliver authoritative brand value and generate direct client inquiries for ${type}`;
  const isProductHeavy = ["Retail", "Cafe", "Restaurant", "Automotive", "Agriculture", "Manufacturing"].includes(pattern);

  const industryConcepts = [type, pattern.toLowerCase()];
  const productConcepts = expandedData.expandedProducts.slice(0, 4).map(p => p.imageQuery);
  const activityConcepts = expandedData.expandedServices.slice(0, 3).map(s => s.name);
  const environmentConcepts = [
    `${type} interior`, `${pattern.toLowerCase()} store`, `${type} showroom`, `modern ${pattern.toLowerCase()} facility`
  ];
  const customerConcepts = [
    `customer shopping at ${type}`, `happy client enjoying ${pattern.toLowerCase()}`, `professional working in ${type}`
  ];

  return {
    pattern,
    goal,
    intent: `Seeking top-rated ${type} offerings with immediate reliability`,
    productFocus: isProductHeavy,
    industryConcepts,
    productConcepts,
    activityConcepts,
    environmentConcepts,
    customerConcepts
  };
}

// --- 6. Dynamic Business Logo Generator ---
function generateDynamicLogo(businessData, themeColors, patternInfo) {
  const name = (businessData.name || "Brand").trim();
  const pattern = (patternInfo?.pattern || "Retail").trim();
  const primary = themeColors.primaryColor || "#4F46E5";
  const secondary = themeColors.secondaryColor || "#0F172A";
  const accent = themeColors.accentColor || primary;
  
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
  const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || "SF";
  
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

// --- 7. Website Strategy Intelligence (Pattern & Variation Driven Blueprints) ---
function generateWebsiteBlueprint(businessData, keywords, understanding, variationIndex = 0) {
  const pattern = understanding.pattern;
  let sections = ["hero"];
  let layoutType = `Pattern: ${pattern} Optimized`;
  let contentStrategy = "Conversion-Driven Authority";

  // Rich distinct section order variations (Genuinely different layouts per variation)
  const retailLayouts = [
    ["hero", "collections", "featured-products", "products", "promotions", "reviews", "faq", "contact"],
    ["hero", "promotions", "categories", "products", "collections", "testimonials", "contact", "faq"],
    ["hero", "featured-products", "products", "collections", "promotions", "reviews", "faq", "contact"],
    ["hero", "products", "promotions", "collections", "reviews", "faq", "contact"],
    ["hero", "collections", "products", "promotions", "testimonials", "contact", "faq"],
    ["hero", "promotions", "featured-products", "collections", "products", "reviews", "faq", "contact"]
  ];

  const restaurantLayouts = [
    ["hero", "menu", "featured-products", "gallery", "reviews", "booking", "contact"],
    ["hero", "popular-dishes", "menu", "booking", "gallery", "testimonials", "contact"],
    ["hero", "gallery", "menu", "popular-dishes", "reviews", "booking", "contact"],
    ["hero", "menu", "gallery", "booking", "reviews", "contact"],
    ["hero", "popular-dishes", "gallery", "menu", "testimonials", "booking", "contact"],
    ["hero", "menu", "reviews", "gallery", "booking", "contact"]
  ];

  const healthcareLayouts = [
    ["hero", "team", "services", "consultation", "booking", "reviews", "faq", "contact"],
    ["hero", "services", "team", "consultation", "testimonials", "gallery", "faq", "booking"],
    ["hero", "consultation", "services", "team", "gallery", "reviews", "faq", "contact"],
    ["hero", "services", "consultation", "about", "testimonials", "faq", "booking"],
    ["hero", "consultation", "about", "services", "reviews", "gallery", "faq", "contact"],
    ["hero", "services", "about", "testimonials", "gallery", "consultation", "faq", "booking"]
  ];

  const sportsLayouts = [
    ["hero", "memberships", "programs", "team", "gallery", "pricing", "contact"],
    ["hero", "programs", "memberships", "team", "pricing", "gallery", "testimonials", "contact"],
    ["hero", "team", "programs", "memberships", "gallery", "pricing", "reviews", "contact"],
    ["hero", "programs", "pricing", "memberships", "team", "gallery", "contact"]
  ];

  const furnitureLayouts = [
    ["hero", "collections", "featured-products", "consultation", "gallery", "testimonials", "contact"],
    ["hero", "featured-products", "collections", "gallery", "consultation", "reviews", "contact"],
    ["hero", "collections", "products", "consultation", "gallery", "faq", "contact"],
    ["hero", "products", "collections", "featured-products", "gallery", "consultation", "contact"]
  ];

  const techLayouts = [
    ["hero", "services", "about", "case-studies", "consultation", "faq", "contact"],
    ["hero", "case-studies", "services", "about", "testimonials", "faq", "contact"],
    ["hero", "about", "services", "consultation", "case-studies", "faq", "contact"],
    ["hero", "services", "case-studies", "about", "consultation", "testimonials", "faq", "contact"],
    ["hero", "case-studies", "about", "services", "testimonials", "consultation", "faq", "contact"],
    ["hero", "services", "about", "testimonials", "case-studies", "faq", "contact"]
  ];

  const realEstateLayouts = [
    ["hero", "featured-products", "gallery", "services", "reviews", "booking", "contact"],
    ["hero", "properties", "services", "gallery", "agents", "testimonials", "contact"],
    ["hero", "gallery", "featured-products", "services", "reviews", "booking", "contact"],
    ["hero", "properties", "gallery", "services", "reviews", "booking", "contact"],
    ["hero", "featured-products", "services", "gallery", "agents", "testimonials", "contact"],
    ["hero", "gallery", "properties", "services", "reviews", "booking", "contact"]
  ];

  const defaultLayouts = [
    ["hero", "products", "services", "about", "gallery", "reviews", "contact"],
    ["hero", "services", "products", "about", "testimonials", "gallery", "contact"],
    ["hero", "about", "services", "products", "gallery", "reviews", "contact"],
    ["hero", "products", "about", "services", "gallery", "testimonials", "contact"],
    ["hero", "services", "about", "products", "gallery", "reviews", "contact"],
    ["hero", "about", "products", "services", "testimonials", "gallery", "contact"]
  ];

  const nurseryLayouts = [
    ["hero", "about", "products", "collections", "services", "gallery", "testimonials", "faq", "contact"],
    ["hero", "collections", "products", "services", "gallery", "reviews", "faq", "contact"],
    ["hero", "products", "collections", "about", "services", "testimonials", "gallery", "contact"],
    ["hero", "services", "products", "collections", "gallery", "reviews", "faq", "contact"]
  ];

  const electronicsLayouts = [
    ["hero", "featured-products", "collections", "products", "services", "faq", "reviews", "contact"],
    ["hero", "collections", "products", "featured-products", "services", "testimonials", "faq", "contact"],
    ["hero", "products", "services", "collections", "reviews", "faq", "contact"],
    ["hero", "promotions", "featured-products", "products", "collections", "faq", "contact"]
  ];

  const footwearLayouts = [
    ["hero", "collections", "featured-products", "products", "promotions", "gallery", "reviews", "contact"],
    ["hero", "promotions", "products", "collections", "gallery", "testimonials", "contact"],
    ["hero", "featured-products", "products", "collections", "reviews", "faq", "contact"],
    ["hero", "collections", "promotions", "products", "gallery", "reviews", "contact"]
  ];

  const groceryLayouts = [
    ["hero", "featured-products", "products", "collections", "promotions", "reviews", "faq", "contact"],
    ["hero", "promotions", "products", "featured-products", "collections", "testimonials", "contact"],
    ["hero", "products", "collections", "promotions", "reviews", "faq", "contact"],
    ["hero", "collections", "featured-products", "products", "faq", "contact"]
  ];

  const clinicLayouts = [
    ["hero", "services", "team", "consultation", "booking", "reviews", "faq", "contact"],
    ["hero", "consultation", "services", "team", "testimonials", "gallery", "faq", "booking"],
    ["hero", "team", "services", "consultation", "gallery", "reviews", "faq", "contact"],
    ["hero", "services", "consultation", "about", "testimonials", "faq", "booking"]
  ];

  let chosenLayouts = defaultLayouts;
  const lowerDesc = `${businessData?.name || ""} ${businessData?.type || ""} ${businessData?.description || ""}`.toLowerCase();
  
  if (lowerDesc.includes("nursery") || lowerDesc.includes("plant") || lowerDesc.includes("flower") || lowerDesc.includes("garden")) chosenLayouts = nurseryLayouts;
  else if (lowerDesc.includes("electronic") || lowerDesc.includes("gadget") || lowerDesc.includes("tech")) chosenLayouts = electronicsLayouts;
  else if (lowerDesc.includes("footwear") || lowerDesc.includes("shoe") || lowerDesc.includes("sneaker")) chosenLayouts = footwearLayouts;
  else if (lowerDesc.includes("grocery") || lowerDesc.includes("supermarket") || lowerDesc.includes("food")) chosenLayouts = groceryLayouts;
  else if (lowerDesc.includes("clinic") || lowerDesc.includes("medical") || lowerDesc.includes("doctor") || pattern === "Healthcare") chosenLayouts = clinicLayouts;
  else if (lowerDesc.includes("furniture") || pattern === "Manufacturing") chosenLayouts = furnitureLayouts;
  else if (pattern === "Sports & Fitness" || lowerDesc.includes("gym") || lowerDesc.includes("fitness")) chosenLayouts = sportsLayouts;
  else if (pattern === "Retail" || lowerDesc.includes("fashion") || lowerDesc.includes("clothing")) chosenLayouts = retailLayouts;
  else if (pattern === "Restaurant" || pattern === "Cafe" || lowerDesc.includes("restaurant") || lowerDesc.includes("cafe") || lowerDesc.includes("coffee")) chosenLayouts = restaurantLayouts;
  else if (pattern === "Technology" || pattern === "Professional Services") chosenLayouts = techLayouts;
  else if (pattern === "Real Estate") chosenLayouts = realEstateLayouts;

  sections = chosenLayouts[variationIndex % chosenLayouts.length];

  return {
    sections: Array.from(new Set(sections)),
    layoutType: `${pattern} Style #${(variationIndex % chosenLayouts.length) + 1}`,
    contentStrategy,
    visualStrategy: "Structured responsive hierarchy tailored to business pattern",
    imageStrategy: "High-precision Pexels contextual segmentation"
  };
}

// --- 8. Concept Query Builder (Strictly Relevant, No Generic Queries) ---
function generateImageQueries(blueprint, concepts, expandedItems) {
  const queries = {};
  const getConcept = (arr, index = 0) => arr.length > index ? arr[index] : arr[0];

  blueprint.sections.forEach(section => {
    let q = [];
    if (section === "hero") {
      q.push(getConcept(concepts.environmentConcepts, 0));
      q.push(`${getConcept(concepts.industryConcepts)} ${getConcept(concepts.environmentConcepts, 1)}`);
      if (expandedItems.expandedProducts[0]) q.push(expandedItems.expandedProducts[0].imageQuery);
    } else if (["products", "collections", "catalog", "inventory", "featured-products", "menu", "popular-dishes", "properties"].includes(section)) {
      expandedItems.expandedProducts.slice(0, 6).forEach(p => q.push(p.imageQuery));
      q.push(`${getConcept(concepts.industryConcepts)} item`);
    } else if (["services", "programs", "consultation"].includes(section)) {
      expandedItems.expandedServices.slice(0, 4).forEach(s => q.push(`${s.name} ${concepts.pattern}`));
      q.push(`${getConcept(concepts.industryConcepts)} service`);
    } else if (["gallery", "showcase", "portfolio"].includes(section)) {
      q.push(getConcept(concepts.environmentConcepts, 0));
      q.push(`${getConcept(concepts.industryConcepts)} showcase`);
      expandedItems.expandedProducts.slice(0, 3).forEach(p => q.push(p.imageQuery));
    } else if (["team", "about", "agents"].includes(section)) {
      q.push(`${getConcept(concepts.industryConcepts)} specialist`);
      q.push(getConcept(concepts.environmentConcepts, 0));
    } else if (["reviews", "testimonials", "case-studies"].includes(section)) {
      q.push(`${getConcept(concepts.industryConcepts)} client`);
    } else {
      q.push(getConcept(concepts.industryConcepts, 0));
    }
    queries[section] = Array.from(new Set(q.filter(x => x && x.trim() !== "")));
  });

  return queries;
}

// --- 9. Pexels Fetcher & Relevance Scorer (With Distinct Image Pool Generation) ---
function scoreImageRelevance(photo, keywordsObj) {
  if (!photo || !photo.alt) return 0;
  const altText = photo.alt.toLowerCase();
  
  const matchesIndustry = keywordsObj.primaryKeywords.some(kw => altText.includes(kw.toLowerCase()));
  const matchesProduct = keywordsObj.productKeywords.some(kw => altText.includes(kw.toLowerCase()));
  const matchesService = keywordsObj.serviceKeywords.some(kw => altText.includes(kw.toLowerCase()));
  
  let score = 0;
  if (matchesIndustry) score += 3;
  if (matchesProduct) score += 4;
  if (matchesService) score += 3;
  
  return score;
}

async function queryPexels(query, customApiKey = null) {
  const apiKey = customApiKey || process.env.PEXELS_API_KEY;
  if (!apiKey || apiKey.includes("placeholder")) {
    return [];
  }
  try {
    const res = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=30&orientation=landscape`, {
      headers: { 'Authorization': apiKey }
    });
    return res.data.photos || [];
  } catch (err) {
    return [];
  }
}

async function fetchImagesFromPexelsSegmented(sectionQueriesMap, keywordsObj, businessData) {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey || apiKey.includes("placeholder")) {
    console.warn("[AI Engine] Missing Pexels API Key.");
    return {};
  }

  const resultImages = {};
  const usedUrls = new Set();
  const bType = (businessData.type || "business").toLowerCase();
  const isCorporateAllowed = bType.includes("office") || bType.includes("consult") || bType.includes("corporate") || bType.includes("tech") || bType.includes("software");
  const blacklist = ["office", "meeting", "conference", "corporate", "workspace", "business people", "boardroom", "generic"];

  function applyFilters(photos) {
    return photos.filter(p => {
      const alt = (p.alt || "").toLowerCase();
      if (!isCorporateAllowed && blacklist.some(term => alt.includes(term))) return false;
      const url = p.src?.large2x || p.src?.large;
      if (usedUrls.has(url)) return false;
      return true;
    });
  }

  for (const [section, queries] of Object.entries(sectionQueriesMap)) {
    resultImages[section] = [];
    for (const query of queries) {
      let photos = await queryPexels(query);
      let validPhotos = applyFilters(photos);
      if (validPhotos.length === 0) validPhotos = photos.filter(p => !usedUrls.has(p.src?.large2x || p.src?.large));

      if (validPhotos.length > 0) {
        const scoredPhotos = validPhotos.map(p => ({ photo: p, score: scoreImageRelevance(p, keywordsObj) }));
        scoredPhotos.sort((a, b) => b.score - a.score);
        let finalPhotos = scoredPhotos.filter(p => p.score > 0);
        if (finalPhotos.length === 0) finalPhotos = scoredPhotos;

        // Take up to 10 photos into the section pool so different variations can select different photos!
        const pool = finalPhotos.slice(0, 10).map(p => {
          const url = p.photo.src?.large2x || p.photo.src?.large;
          usedUrls.add(url);
          return url;
        });
        resultImages[section].push(...pool);
      }
    }
    if (resultImages[section].length === 0) {
      const rec = await queryPexels(bType || "business");
      if (rec.length > 0) {
        rec.slice(0, 5).forEach(r => {
          const u = r.src?.large2x || r.src?.large;
          if (u) resultImages[section].push(u);
        });
      }
    }
  }
  return resultImages;
}

// --- 10. Dynamic Content Generator ---
function generateDynamicSectionContent(sectionType, businessData, keywords, sectionImagePool, understanding, expandedItems, catAndColl, variationIndex = 0) {
  const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
  const name = businessData.name || "Our Business";
  const core = keywords.primaryKeywords[0] ? capitalize(keywords.primaryKeywords[0]) : "Excellence";
  
  // Helper to get distinct images per variation from the pool
  const getImages = (count, offset = 0) => {
    let imgs = sectionImagePool || [];
    if (imgs.length === 0) {
      const patternKey = (understanding.pattern || "Retail").toLowerCase();
      const secKey = (sectionType || "hero").toLowerCase();
      const fallbackPools = {
        restaurant: [
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80"
        ],
        healthcare: [
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80"
        ],
        technology: [
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
        ],
        sports: [
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80"
        ],
        realestate: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
        ],
        retail: [
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1513094735237-8f2a62d03533?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
        ],
        nursery: [
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=1200&q=80"
        ],
        electronics: [
          "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80"
        ],
        footwear: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1460353581641-37b5ab3f2316?auto=format&fit=crop&w=1200&q=80"
        ],
        grocery: [
          "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80"
        ],
        furniture: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
        ],
        cafe: [
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80"
        ],
        bakery: [
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=1200&q=80"
        ],
        jewelry: [
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80"
        ],
        salon: [
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80"
        ],
        hotel: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
        ],
        bookstore: [
          "https://images.unsplash.com/photo-1507842229356-51c6150fe5a3?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80"
        ]
      };
      const checkStr = `${patternKey} ${businessData?.name || ""} ${businessData?.type || ""} ${businessData?.category || ""} ${businessData?.businessType || ""} ${businessData?.businessCategory || ""} ${businessData?.description || ""}`.toLowerCase();
      let matchPool = fallbackPools.retail;
      if (checkStr.includes("nursery") || checkStr.includes("plant") || checkStr.includes("flower") || checkStr.includes("garden")) matchPool = fallbackPools.nursery;
      else if (checkStr.includes("cafe") || checkStr.includes("coffee") || checkStr.includes("barista")) matchPool = fallbackPools.cafe;
      else if (checkStr.includes("bakery") || checkStr.includes("cake") || checkStr.includes("pastry") || checkStr.includes("bread")) matchPool = fallbackPools.bakery;
      else if (checkStr.includes("jewel") || checkStr.includes("diamond") || checkStr.includes("gold")) matchPool = fallbackPools.jewelry;
      else if (checkStr.includes("salon") || checkStr.includes("hair") || checkStr.includes("beauty") || checkStr.includes("spa")) matchPool = fallbackPools.salon;
      else if (checkStr.includes("hotel") || checkStr.includes("resort") || checkStr.includes("stay")) matchPool = fallbackPools.hotel;
      else if (checkStr.includes("book") || checkStr.includes("library") || checkStr.includes("stationery")) matchPool = fallbackPools.bookstore;
      else if (checkStr.includes("electronic") || checkStr.includes("gadget") || checkStr.includes("tech")) matchPool = fallbackPools.electronics;
      else if (checkStr.includes("footwear") || checkStr.includes("shoe") || checkStr.includes("sneaker")) matchPool = fallbackPools.footwear;
      else if (checkStr.includes("grocery") || checkStr.includes("supermarket") || checkStr.includes("food")) matchPool = fallbackPools.grocery;
      else if (checkStr.includes("furniture") || checkStr.includes("decor") || checkStr.includes("home")) matchPool = fallbackPools.furniture;
      else if (checkStr.includes("restaurant") || checkStr.includes("dining")) matchPool = fallbackPools.restaurant;
      else if (checkStr.includes("hospital") || checkStr.includes("health") || checkStr.includes("clinic") || checkStr.includes("medical") || checkStr.includes("doctor") || checkStr.includes("pharmacy") || checkStr.includes("medicine") || checkStr.includes("pill")) matchPool = fallbackPools.healthcare;
      else if (checkStr.includes("software")) matchPool = fallbackPools.technology;
      else if (checkStr.includes("sport") || checkStr.includes("gym") || checkStr.includes("fitness") || checkStr.includes("workout") || checkStr.includes("train")) matchPool = fallbackPools.sports;
      else if (checkStr.includes("real estate") || checkStr.includes("property")) matchPool = fallbackPools.realestate;
      
      imgs = matchPool;
    }
    const result = [];
    for (let i = 0; i < count; i++) {
      const idx = (i + offset + variationIndex * 3 + Math.abs(sectionType.charCodeAt(0))) % imgs.length;
      result.push(imgs[idx]);
    }
    return result;
  };

  const isNursery = (understanding.pattern || "").toLowerCase() === "agriculture" || (businessData.type || "").toLowerCase().includes("nursery");
  const isFitness = (understanding.pattern || "").toLowerCase().includes("fitness") || (understanding.pattern || "").toLowerCase().includes("sport") || (businessData.category || "").toLowerCase().includes("gym") || (businessData.category || "").toLowerCase().includes("fitness") || (businessData.name || "").toLowerCase().includes("fit");

  switch (sectionType) {
    case "hero":
      const heroHeadlines = isNursery ? [
        `${name}: Premier Botanical Sanctuary & Plant Nursery`,
        `Bring Your Space to Life with Lush Plants from ${name}`,
        `Cultivating Green Spaces: Indoor & Outdoor Nursery Stock`,
        `${name}: Expert Care Guides, Seeds & Gardening Tools`,
        `Thrive Naturally with Curated Plant Nursery Collections`
      ] : isFitness ? [
        `${name}: Engineered for Peak Physical Performance`,
        `Transform Your Body & Mind with ${name}`,
        `Elite Fitness, Certified Trainers, & Proven Results at ${name}`,
        `Step Into Your Strongest Self with ${name}`,
        `The Premier High-Performance Fitness Destination`
      ] : [
        `${name}: Benchmark of ${understanding.pattern} Quality`,
        `Experience Exceptional ${businessData.type || core} with ${name}`,
        `Redefining Excellence in ${understanding.pattern} Solutions`,
        `Precision ${understanding.pattern} Engineered for High Performance`,
        `The Premier Destination for ${businessData.type || core} Specialists`
      ];

      const heroSubtitles = isNursery ? [
        `Explore our healthy indoor and outdoor plants, organic seeds, professional gardening tools, and step-by-step care guides designed to help your garden flourish.`,
        `From rare indoor foliage to robust outdoor botanicals, we provide premium nursery plants, natural fertilizers, and expert guidance for every plant parent.`,
        `Sustainable plants, organic fertilizers, and comprehensive botanical care guides crafted specifically to bring nature right to your doorstep.`
      ] : isFitness ? [
        `Specialized high-performance programs, elite coaching, and state-of-the-art facilities engineered to push your boundaries and deliver guaranteed results.`,
        `Uncompromising standards, modern training protocols, and personalized nutrition guidance designed specifically to elevate your fitness journey.`,
        `From certified 1-on-1 personal training to dynamic group classes, we provide complete, end-to-end fitness excellence tailored around your goals.`
      ] : [
        `Delivering superior ${businessData.type || core.toLowerCase()} solutions crafted precisely around your expectations and standards.`,
        `Uncompromising standards, modern design, and tailored quality engineered specifically to elevate your executive experience.`
      ];

      return {
        title: heroHeadlines[variationIndex % heroHeadlines.length],
        subtitle: heroSubtitles[variationIndex % heroSubtitles.length],
        ctaText: isNursery ? "Explore Nursery Plants" : (businessData.whatsappEnabled ? "Connect on WhatsApp" : "Explore Collection"),
        ctaLink: businessData.whatsappEnabled && businessData.whatsappNumber ? `https://wa.me/${businessData.whatsappNumber.replace(/\D/g, '')}` : "#products",
        secondaryCtaText: isNursery ? "Plant Care Guides" : "Learn More",
        secondaryCtaLink: isNursery ? "#faq" : "#about",
        backgroundImage: getImages(1, variationIndex)[0],
        alignment: variationIndex % 3 === 0 ? "center" : (variationIndex % 3 === 1 ? "left" : "right"),
        heroStyle: variationIndex % 4 === 0 ? "centered" : (variationIndex % 4 === 1 ? "split-right" : (variationIndex % 4 === 2 ? "split-left" : "overlay"))
      };
    
    case "about":
    case "team":
    case "agents":
      return {
        title: sectionType === 'team' || sectionType === 'agents' ? `The Specialists Behind ${name}` : (isNursery ? "Our Botanical Roots & Mission" : `About ${name}`),
        description: isNursery ? 
          `${name} is a dedicated plant nursery passionate about cultivating healthy indoor and outdoor plants, organic seeds, and sustainable gardening tools. Guided by deep botanical knowledge and eco-friendly practices, we equip plant lovers with everything needed for vibrant, long-lasting green spaces.` : 
          `${name} stands at the forefront of the ${understanding.pattern.toLowerCase()} sector. Guided by uncompromising standards and professional integrity, we serve clients who demand superior quality and consistent reliability.`,
        image: getImages(1, 1)[0],
        highlights: isNursery ? 
          ["100% Healthy Nursery Stock", "Step-by-Step Care Guides", "Eco-Friendly Fertilizers", "Precision Gardening Tools"] : 
          ["Industry Benchmark", "Customer-Centric Assurance", "Proven Expertise", "Certified Excellence"]
      };

    case "products":
    case "collections":
    case "catalog":
    case "inventory":
    case "featured-products":
    case "menu":
    case "popular-dishes":
    case "properties":
      const prods = expandedItems.expandedProducts.slice(0, 12).map((p, idx) => ({
        id: p.id || `prod_${idx}`,
        name: p.name,
        title: p.title || p.name,
        price: p.price,
        discount: p.discount || null,
        badge: p.badge || null,
        category: p.category || (isNursery ? (idx % 3 === 0 ? "Indoor Plants" : (idx % 3 === 1 ? "Outdoor Plants & Seeds" : "Gardening Tools & Care")) : "Best Sellers"),
        stock: p.stock !== undefined ? p.stock : 24,
        sku: p.sku || `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        availability: p.availability || "In Stock",
        tags: p.tags || ["Featured", p.category || (isNursery ? "Botanical" : "General")],
        features: p.features || (isNursery ? ["Healthy root system guaranteed", "Includes detailed care instructions", "Fast eco-safe delivery"] : ["Certified quality & performance", "Backed by comprehensive guarantee", "Fast nationwide delivery"]),
        variants: p.variants || (isNursery ? ["Small (4 inch pot)", "Medium (6 inch pot)", "Large (8 inch planter)"] : ["Standard Edition", "Pro Variant", "Deluxe Option"]),
        description: p.description,
        imageQuery: p.imageQuery || generateProductImageQuery(p.name || p.title),
        image: p.image || getImages(12, 2)[idx] || null
      }));
      return {
        title: sectionType === 'menu' || sectionType === 'popular-dishes' ? "Our Chef's Menu" : (sectionType === 'properties' ? "Featured Properties" : (sectionType === 'collections' ? (isNursery ? "Plant Collections & Seeds" : "Curated Collections") : (isNursery ? "Nursery Plant Catalog" : "Featured Catalog"))),
        subtitle: isNursery ? 
          "Explore our healthy plants, organic seeds, and gardening tools chosen for exceptional vitality and ease of care." : 
          `Explore our specialized ${understanding.pattern.toLowerCase()} selections engineered for complete satisfaction.`,
        categories: catAndColl.categories,
        collections: catAndColl.collections,
        products: prods,
        layoutStyle: variationIndex % 3 === 0 ? "grid-4" : (variationIndex % 3 === 1 ? "grid-3" : "carousel")
      };

    case "services":
    case "programs":
    case "consultation":
      const servs = expandedItems.expandedServices.slice(0, 6).map((s, idx) => ({
        id: s.id || `serv_${idx}`,
        name: s.name,
        description: s.description,
        icon: s.icon || "Star",
        price: s.price || (isNursery ? `$${(29 + idx * 15).toFixed(2)} / session` : `$${(99 + idx * 30).toFixed(2)} / session`),
        duration: s.duration || "45 - 60 Mins",
        imageQuery: s.imageQuery || generateProductImageQuery(s.name),
        image: s.image || getImages(6, 4)[idx] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
        features: s.features || (isNursery ? ["Step-by-step care roadmap", "Personalized soil & lighting diagnostics", "Guaranteed plant vitality"] : ["Dedicated specialist consultant", "Customized action roadmap", "Guaranteed client satisfaction"])
      }));
      return {
        title: sectionType === 'programs' ? "Specialized Programs" : (isNursery ? "Plant Care & Gardening Services" : `Our Professional Services`),
        subtitle: isNursery ? 
          "From expert care consultations and soil testing to custom landscaping guidance, our botanists are here to help your plants thrive." : 
          "Built to deliver measurable value and absolute peace of mind across every engagement.",
        services: servs,
        cardStyle: variationIndex % 2 === 0 ? "elevated" : "bordered"
      };

    case "gallery":
    case "showcase":
    case "portfolio":
      return {
        title: sectionType === 'portfolio' ? "Our Project Portfolio" : (isNursery ? "Greenhouse & Garden Showroom" : "Visual Showcase"),
        subtitle: isNursery ? `Take a visual tour through our lush greenhouse and thriving botanical collections.` : `Step inside the ${name} experience.`,
        images: getImages(8, 3).map((url, i) => ({ id: `img_${i}`, url, caption: `${name} Highlight ${i+1}` })),
        galleryStyle: variationIndex % 3 === 0 ? "grid-4" : (variationIndex % 3 === 1 ? "masonry" : "grid-3")
      };

    case "promotions":
    case "offers":
      return {
        title: isNursery ? "Seasonal Botanical Exclusives" : "Limited-Time Member Exclusives",
        subtitle: isNursery ? "Enjoy special savings on our seasonal plant starter bundles, organic seeds, and gardening kits." : "Unlock exceptional savings on our most popular packages and signature collections.",
        bannerText: isNursery ? "Save Up To 20% On Your First Nursery Order" : "Save Up To 25% On Your First Order",
        code: isNursery ? "GREEN20" : "WELCOME25",
        ctaText: isNursery ? "Shop Nursery Bundles" : "Claim Discount Now",
        ctaLink: "#products",
        image: getImages(1, 4)[0]
      };

    case "pricing":
    case "memberships":
      return {
        title: sectionType === 'memberships' ? "Membership Packages" : "Transparent Pricing Tiers",
        subtitle: "Select the engagement level tailored to your personal or commercial scale.",
        plans: [
          { name: "Starter Tier", price: "$49", period: "/ month", features: ["Essential support & access", "Standard processing speed", "Community knowledgebase", "Monthly check-in"], isPopular: false },
          { name: "Professional Tier", price: "$129", period: "/ month", features: ["Priority 24/7 dedicated assistance", "Rapid turnaround fulfillment", "Custom configuration setup", "Quarterly strategy audit"], isPopular: true },
          { name: "Enterprise Suite", price: "$299", period: "/ month", features: ["Dedicated account director", "Custom API & integration access", "Custom SLA guarantee", "Unlimited on-demand consultations"], isPopular: false }
        ]
      };

    case "events":
    case "workshops":
      return {
        title: "Upcoming Events & Workshops",
        subtitle: `Join our specialists for hands-on masterclasses in ${understanding.pattern}.`,
        eventsList: [
          { date: "Oct 15, 2026", title: `${core} Masterclass Summit`, location: "Live Virtual Experience", time: "2:00 PM EST" },
          { date: "Nov 04, 2026", title: "Quarterly Client Showcase & Q&A", location: "Central Hub / Hybrid", time: "11:00 AM EST" }
        ]
      };

    case "contact":
    case "booking":
    case "locations":
      return {
        title: sectionType === 'booking' ? "Schedule Your Appointment" : "Connect With Us",
        subtitle: "Our advisory team is ready to discuss your specific requirements.",
        address: businessData.address || "Prime Commercial District, Central Avenue",
        email: `contact@${(businessData.name || "business").replace(/\s+/g, '').toLowerCase()}.com`,
        phone: businessData.whatsappNumber || "+91 98765 43210",
        hours: "Mon-Sat: 9AM - 7PM",
        showForm: true
      };

    case "footer":
      return {
        businessName: name,
        copyright: `© ${new Date().getFullYear()} ${name}. Powered by SITEFORGE AI Builder.`,
        quickLinks: [
          { label: "Home", href: "#hero" },
          { label: "Catalog", href: "#products" },
          { label: "Services", href: "#services" },
          { label: "About Us", href: "#about" },
          { label: "Contact", href: "#contact" }
        ],
        socialIcons: {
          facebook: "https://facebook.com",
          instagram: "https://instagram.com",
          twitter: "https://twitter.com",
          linkedin: "https://linkedin.com"
        },
        contactInfo: {
          phone: businessData.whatsappNumber || "+91 98765 43210",
          email: `contact@${(businessData.name || "business").replace(/\s+/g, '').toLowerCase()}.com`,
          address: businessData.address || "Prime Commercial District, Central Avenue"
        },
        newsletter: {
          enabled: true,
          title: "Subscribe to Our Newsletter",
          subtitle: "Get the latest updates and exclusive offers directly in your inbox."
        }
      };

    default:
      return { title: capitalize(sectionType) };
  }
}

// --- 11. Design Tokens across 14 Design Vectors ---
function generateDesignTokens(style, colorThemePreference, variationIndex = 0) {
  const fontCombinations = [
    { family: "Outfit", headingSize: "text-4xl md:text-6xl", bodySize: "text-sm", letterSpacing: "tracking-tight", lineHeight: "leading-relaxed" },
    { family: "Playfair Display", headingSize: "text-4xl md:text-5xl", bodySize: "text-base", letterSpacing: "tracking-normal", lineHeight: "leading-loose" },
    { family: "Inter", headingSize: "text-3xl md:text-5xl", bodySize: "text-sm", letterSpacing: "tracking-wide", lineHeight: "leading-normal" },
    { family: "Space Grotesk", headingSize: "text-4xl md:text-6xl", bodySize: "text-sm", letterSpacing: "tracking-tighter", lineHeight: "leading-relaxed" },
    { family: "Plus Jakarta Sans", headingSize: "text-4xl md:text-6xl", bodySize: "text-sm", letterSpacing: "tracking-tight", lineHeight: "leading-normal" },
    { family: "Syne", headingSize: "text-4xl md:text-6xl", bodySize: "text-sm", letterSpacing: "tracking-tighter", lineHeight: "leading-tight" },
    { family: "Cinzel", headingSize: "text-3xl md:text-5xl", bodySize: "text-base", letterSpacing: "tracking-widest", lineHeight: "leading-relaxed" },
    { family: "DM Sans", headingSize: "text-4xl md:text-5xl", bodySize: "text-sm", letterSpacing: "tracking-normal", lineHeight: "leading-relaxed" }
  ];

  const palettes = [
    { primary: "#4F46E5", secondary: "#0F172A", accent: "#10B981", bg: "#FFFFFF", buttonBg: "#4F46E5", text: "#0F172A", gradient: "from-indigo-900 via-slate-900 to-indigo-950" },
    { primary: "#B8860B", secondary: "#1A1A1A", accent: "#D4AF37", bg: "#FAF9F6", buttonBg: "#1A1A1A", text: "#1A1A1A", gradient: "from-amber-950 via-stone-900 to-black" },
    { primary: "#059669", secondary: "#064E3B", accent: "#34D399", bg: "#F2F8F5", buttonBg: "#059669", text: "#064E3B", gradient: "from-emerald-950 via-teal-900 to-slate-950" },
    { primary: "#E11D48", secondary: "#1E1B18", accent: "#FB7185", bg: "#FFFDFD", buttonBg: "#E11D48", text: "#1E1B18", gradient: "from-rose-950 via-red-900 to-slate-950" },
    { primary: "#2563EB", secondary: "#0F172A", accent: "#38BDF8", bg: "#F8FAFC", buttonBg: "#2563EB", text: "#0F172A", gradient: "from-blue-950 via-indigo-900 to-slate-900" },
    { primary: "#7C3AED", secondary: "#1E1B4B", accent: "#A78BFA", bg: "#FCFAFF", buttonBg: "#7C3AED", text: "#1E1B4B", gradient: "from-violet-950 via-purple-900 to-indigo-950" },
    { primary: "#D97706", secondary: "#1C1917", accent: "#F59E0B", bg: "#FFFEFA", buttonBg: "#D97706", text: "#1C1917", gradient: "from-amber-950 via-orange-900 to-stone-950" },
    { primary: "#0D9488", secondary: "#042F2E", accent: "#2DD4BF", bg: "#F0FDFA", buttonBg: "#0D9488", text: "#042F2E", gradient: "from-teal-950 via-cyan-900 to-slate-950" },
    { primary: "#BE123C", secondary: "#1C1917", accent: "#F43F5E", bg: "#FFF8F8", buttonBg: "#BE123C", text: "#1C1917", gradient: "from-rose-950 via-stone-900 to-black" },
    { primary: "#0369A1", secondary: "#0C4A6E", accent: "#38BDF8", bg: "#F0F9FF", buttonBg: "#0369A1", text: "#0C4A6E", gradient: "from-sky-950 via-blue-900 to-slate-950" }
  ];

  const cardStyles = [
    "rounded-2xl border border-zinc-100 shadow-lg bg-white hover:-translate-y-1 transition-all duration-300",
    "rounded-3xl border border-amber-900/10 shadow-xl bg-stone-50/80 backdrop-blur-sm hover:shadow-2xl transition-all",
    "rounded-none border-2 border-zinc-900 shadow-none bg-white hover:bg-zinc-50 transition-all",
    "rounded-xl border border-slate-200/60 shadow-md bg-white/90 backdrop-blur-md hover:shadow-xl transition-all",
    "rounded-2xl border border-indigo-500/15 shadow-2xl shadow-indigo-500/5 bg-gradient-to-b from-white to-indigo-50/20 hover:scale-[1.01] transition-all",
    "rounded-3xl border border-emerald-900/10 shadow-lg bg-white/95 hover:border-emerald-500/30 transition-all",
    "rounded-lg border border-zinc-200 shadow-sm bg-white hover:shadow-md transition-all"
  ];

  const buttonStyles = [
    "rounded-full font-bold bg-indigo-600 text-white px-8 py-3.5 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95",
    "rounded-none font-black bg-zinc-900 text-white px-8 py-4 border-2 border-zinc-900 hover:bg-white hover:text-zinc-900 transition-all",
    "rounded-xl font-semibold bg-emerald-600 text-white px-7 py-3 hover:bg-emerald-500 transition-all shadow-md active:scale-95",
    "rounded-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 hover:opacity-90 transition-all shadow-lg",
    "rounded-full font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-9 py-4 shadow-xl shadow-fuchsia-500/20 active:scale-95 transition-all",
    "rounded-2xl font-bold bg-amber-600 text-white px-8 py-3.5 hover:bg-amber-500 shadow-lg shadow-amber-600/20 transition-all",
    "rounded-md font-semibold bg-teal-600 text-white px-8 py-3.5 hover:bg-teal-500 shadow transition-all"
  ];

  const spacings = ["normal", "spacious", "compact", "relaxed"];
  const animations = ["fade-up", "zoom-in", "slide-in", "smooth"];
  const headerStyles = [
    { sticky: true, transparent: false, logoPosition: "left", navPosition: "right", menuStyle: "standard" },
    { sticky: true, transparent: true, logoPosition: "center", navPosition: "center", menuStyle: "minimal" },
    { sticky: false, transparent: false, logoPosition: "left", navPosition: "right", menuStyle: "bold" },
    { sticky: true, transparent: false, logoPosition: "left", navPosition: "center", menuStyle: "centered-nav" },
    { sticky: true, transparent: true, logoPosition: "left", navPosition: "right", menuStyle: "floating" }
  ];
  const footerStyles = ["newsletter-focused", "complex", "simple", "split-dark", "minimal-bordered"];

  const fontConfig = fontCombinations[variationIndex % fontCombinations.length];
  const selectedPalette = palettes[variationIndex % palettes.length];
  const primaryColor = colorThemePreference || selectedPalette.primary;

  return {
    primaryColor,
    secondaryColor: selectedPalette.secondary,
    accentColor: selectedPalette.accent,
    backgroundColor: selectedPalette.bg,
    buttonColor: selectedPalette.buttonBg,
    textColor: selectedPalette.text,
    gradient: selectedPalette.gradient,
    fontFamily: fontConfig.family,
    headingSize: fontConfig.headingSize,
    bodySize: fontConfig.bodySize,
    letterSpacing: fontConfig.letterSpacing,
    lineHeight: fontConfig.lineHeight,
    style,
    spacing: spacings[variationIndex % spacings.length],
    cardStyle: cardStyles[variationIndex % cardStyles.length],
    buttonStyle: buttonStyles[variationIndex % buttonStyles.length],
    imageStyle: variationIndex % 2 === 0 ? "rounded-2xl shadow-xl object-cover" : "rounded-3xl shadow-lg object-cover",
    animation: animations[variationIndex % animations.length],
    headerConfig: headerStyles[variationIndex % headerStyles.length],
    footerStyle: footerStyles[variationIndex % footerStyles.length]
  };
}

// --- 12. Compile Final JSON ---
async function compileWebsiteJSON(businessData, style, colorThemePreference, keywords, blueprint, segmentedImages, understanding, expandedItems, catAndColl, variationIndex = 0) {
  const patternInfo = classifyBusinessPattern(businessData || {});
  if (!keywords) keywords = extractBusinessKeywords(businessData || {});
  if (!expandedItems) expandedItems = expandProductsAndServices(businessData || {}, patternInfo);
  await assignProductImages(expandedItems.expandedProducts);
  await assignServiceImages(expandedItems.expandedServices);
  if (!catAndColl) catAndColl = generateCategoriesAndCollections(businessData || {}, patternInfo, expandedItems.expandedProducts);
  if (!understanding) understanding = generateBusinessUnderstanding(businessData || {}, keywords, patternInfo, expandedItems);
  if (!blueprint) blueprint = generateWebsiteBlueprint(businessData || {}, keywords, understanding, variationIndex);
  if (!segmentedImages) segmentedImages = {};

  const themeTokens = generateDesignTokens(style, colorThemePreference, variationIndex);
  const dynamicLogo = generateDynamicLogo(businessData, themeTokens, understanding);

  const contentMap = {};
  blueprint.sections.forEach(type => {
    contentMap[type] = generateDynamicSectionContent(type, businessData, keywords, segmentedImages[type], understanding, expandedItems, catAndColl, variationIndex);
  });
  contentMap["footer"] = generateDynamicSectionContent("footer", businessData, keywords, [], understanding, expandedItems, catAndColl, variationIndex);

  const sectionsArray = [];
  blueprint.sections.forEach((type, idx) => {
    sectionsArray.push({
      id: `sec_${type}_${Math.random().toString(36).substring(2, 6)}`,
      type,
      order: idx,
      visible: true,
      content: contentMap[type] || {},
      styles: {
        spacingValue: themeTokens.spacing,
        cardStyle: themeTokens.cardStyle,
        buttonStyle: themeTokens.buttonStyle,
        imageStyle: themeTokens.imageStyle,
        animation: themeTokens.animation
      }
    });
  });

  sectionsArray.push({
    id: `sec_footer_${Math.random().toString(36).substring(2, 6)}`,
    type: "footer",
    order: sectionsArray.length,
    visible: true,
    content: contentMap["footer"],
    styles: {}
  });

  return {
    meta: {
      title: `${businessData.name || "My Business"} | Professional ${understanding.pattern} Solutions`,
      description: `Authoritative online presence for ${businessData.name}.`,
      favicon: dynamicLogo.url,
      keywords: keywords.primaryKeywords,
      understanding: {
        businessName: businessData.name || "My Business",
        businessType: businessData.type || understanding.pattern,
        description: businessData.description || "",
        audience: businessData.audience || "General consumers and industry professionals",
        goals: understanding.goal,
        brandTone: businessData.style || "Authoritative & Professional",
        visualStyle: themeTokens.style || "Modern structured layout"
      }
    },
    theme: { 
      ...themeTokens,
      logo: dynamicLogo
    },
    logo: dynamicLogo,
    logoUrl: dynamicLogo.url,
    hero: {
      title: contentMap["hero"]?.title || businessData.name || "Our Business",
      subtitle: contentMap["hero"]?.subtitle || "Excellence Engineered for Your Success",
      backgroundImage: contentMap["hero"]?.backgroundImage || contentMap["hero"]?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
    },
    globalSettings: {
      layoutStrategy: blueprint.layoutType,
      headerConfig: themeTokens.headerConfig,
      footerStyle: themeTokens.footerStyle,
      whatsappButton: businessData.whatsappEnabled !== undefined ? businessData.whatsappEnabled : true,
      whatsappNumber: businessData.whatsappNumber || "+91 98765 43210"
    },
    pages: [{ name: "Home", slug: "/", sections: sectionsArray }],
    sections: sectionsArray,
    content: contentMap
  };
}

// --- 13. Main Orchestrator (Genuinely Different Variations & Design Regeneration) ---
async function generateThreeVariations(businessData, seedOffset = 0) {
  const userColor = businessData.colorTheme || null;

  console.log("=== STARTING BUSINESS PATTERN INTELLIGENCE GENERATION (WITH 14 DESIGN VECTORS) ===");

  const patternInfo = classifyBusinessPattern(businessData);
  console.log(`[PATTERN INTELLIGENCE] Classified Pattern: ${patternInfo.pattern} (Matched: ${patternInfo.matchedKeyword})`);

  const keywords = extractBusinessKeywords(businessData);
  const expandedItems = expandProductsAndServices(businessData, patternInfo);
  await assignProductImages(expandedItems.expandedProducts);
  await assignServiceImages(expandedItems.expandedServices);
  console.log(`[CATALOG EXPANSION] Expanded ${expandedItems.expandedProducts.length} Products & ${expandedItems.expandedServices.length} Services without placeholders.`);

  const catAndColl = generateCategoriesAndCollections(businessData, patternInfo, expandedItems.expandedProducts);
  const understanding = generateBusinessUnderstanding(businessData, keywords, patternInfo, expandedItems);

  // Use variation indices offset by seedOffset so "Generate New Designs" always creates fresh layouts!
  const varIdxA = (0 + seedOffset) % 10;
  const varIdxB = (1 + seedOffset) % 10;
  const varIdxC = (2 + seedOffset) % 10;

  const modernBlueprint = generateWebsiteBlueprint(businessData, keywords, understanding, varIdxA);
  const luxuryBlueprint = generateWebsiteBlueprint(businessData, keywords, understanding, varIdxB);
  const minimalBlueprint = generateWebsiteBlueprint(businessData, keywords, understanding, varIdxC);

  const allUniqueSections = Array.from(new Set([
    ...modernBlueprint.sections,
    ...luxuryBlueprint.sections,
    ...minimalBlueprint.sections
  ]));
  const mergedBlueprint = { sections: allUniqueSections };

  const imageQueries = generateImageQueries(mergedBlueprint, understanding, expandedItems);
  const segmentedImages = await fetchImagesFromPexelsSegmented(imageQueries, keywords, businessData);

  const [modernBase, luxuryBase, minimalBase] = await Promise.all([
    compileWebsiteJSON(businessData, "modern", userColor, keywords, modernBlueprint, segmentedImages, understanding, expandedItems, catAndColl, varIdxA),
    compileWebsiteJSON(businessData, "luxury", userColor, keywords, luxuryBlueprint, segmentedImages, understanding, expandedItems, catAndColl, varIdxB),
    compileWebsiteJSON(businessData, "minimal", userColor, keywords, minimalBlueprint, segmentedImages, understanding, expandedItems, catAndColl, varIdxC)
  ]);

  console.log("=== BUSINESS PATTERN GENERATION COMPLETE ===\n");

  return [
    {
      id: "modern",
      name: "Version A: " + modernBlueprint.layoutType,
      tagline: `Modern ${understanding.pattern} architecture engineered for ${understanding.goal}.`,
      websiteJson: modernBase
    },
    {
      id: "luxury",
      name: "Version B: Premium " + understanding.pattern,
      tagline: `Refined presentation emphasizing executive quality and brand trust.`,
      websiteJson: luxuryBase
    },
    {
      id: "minimal",
      name: "Version C: Essential " + understanding.pattern,
      tagline: `Clean, high-impact structure prioritizing direct customer action.`,
      websiteJson: minimalBase
    }
  ];
}

module.exports = {
  compileWebsiteJSON,
  generateThreeVariations,
  classifyBusinessPattern,
  expandProductsAndServices,
  generateDynamicLogo,
  queryPexels
};
