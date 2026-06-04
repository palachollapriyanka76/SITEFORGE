const axios = require('axios');

// NLP Extractor
function extractBusinessKeywords(businessData) {
  const name = (businessData.name || "").toLowerCase();
  const type = (businessData.type || "").toLowerCase();
  const audience = (businessData.audience || "").toLowerCase();
  const desc = (businessData.description || "").toLowerCase();
  
  const stopWords = new Set(["and", "the", "a", "an", "for", "in", "on", "with", "to", "of", "business", "store", "shop", "service", "services", "company", "inc", "ltd", "we", "are", "is", "our", "your"]);
  
  function tokenize(text) {
    if (!text) return [];
    return text.split(/[\s,.-]+/).filter(w => w.length > 2 && !stopWords.has(w));
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

// 1. Blueprint Generator
function generateWebsiteBlueprint(businessData, keywords) {
  const isProductHeavy = keywords.productKeywords.length > keywords.serviceKeywords.length;
  const isServiceHeavy = keywords.serviceKeywords.length > keywords.productKeywords.length;
  const isLocal = businessData.type && (businessData.type.toLowerCase().includes('cafe') || businessData.type.toLowerCase().includes('restaurant') || businessData.type.toLowerCase().includes('salon') || businessData.type.toLowerCase().includes('gym') || businessData.type.toLowerCase().includes('clinic'));

  let layoutType = "Variation A";
  let contentStrategy = "Balanced";
  let sections = ["hero"];

  const randomize = (arr) => arr[Math.floor(Math.random() * arr.length)];

  if (isLocal) {
    layoutType = randomize(["Variation A: Local Featured", "Variation E: Minimal Landing"]);
    contentStrategy = "Community & Experience";
    sections.push(randomize(["menu", "catalog", "featured-products"]));
    sections.push(randomize(["showcase", "gallery", "portfolio"]));
    sections.push(randomize(["reviews", "testimonials"]));
  } else if (isProductHeavy) {
    layoutType = randomize(["Variation B: Product-First", "Variation D: Catalog-Driven"]);
    contentStrategy = "Conversion & Features";
    sections.push(randomize(["collections", "inventory", "products"]));
    sections.push(randomize(["featured-products", "promotions"]));
    if (Math.random() > 0.5) sections.push("reviews");
  } else if (isServiceHeavy) {
    layoutType = randomize(["Variation C: Service-Focused", "Variation A: Classic Split"]);
    contentStrategy = "Trust & Authority";
    sections.push(randomize(["services", "programs", "consultation"]));
    sections.push(randomize(["case-studies", "portfolio", "showcase"]));
    sections.push(randomize(["team", "about"]));
    sections.push("faq");
  } else {
    layoutType = randomize(["Variation A", "Variation E"]);
    contentStrategy = "Brand Story";
    sections.push(randomize(["services", "products", "collections"]));
    sections.push("about");
    sections.push(randomize(["gallery", "showcase"]));
  }

  sections.push(randomize(["contact", "booking", "locations"]));
  sections = Array.from(new Set(sections));

  return {
    sections,
    layoutType,
    contentStrategy,
    visualStrategy: randomize(["Masonry grids", "Sparse layouts", "Bold typography", "Split views"]),
    imageStrategy: "Contextual per section"
  };
}

// 2. Business Understanding Engine
function generateBusinessUnderstanding(businessData, keywords) {
  const type = (businessData.type || "").toLowerCase().trim() || "business";
  
  // Industry Concepts
  const industryConcepts = [type];
  if (type.includes("store") || type.includes("shop")) industryConcepts.push("retail " + type);
  else if (type.includes("agency") || type.includes("consult")) industryConcepts.push("consulting");
  else if (type.includes("tech") || type.includes("software")) industryConcepts.push("software technology");

  // Product Concepts
  let productConcepts = [];
  if (keywords.productKeywords && keywords.productKeywords.length > 0) {
    // Reconstruct phrases from the raw product list rather than single words if possible, but we use the tokenizer output for now, combined.
    // Actually, let's use the raw product array if it exists.
    if (businessData.products && businessData.products.length > 0) {
      productConcepts = businessData.products.map(p => typeof p === 'string' ? p : p.name).filter(Boolean);
    } else {
      productConcepts = keywords.productKeywords.slice(0, 3).map(k => `${k}`);
    }
  } else {
    productConcepts = [`${type} products`, `${type} collection`];
  }

  // Activity Concepts
  let activityConcepts = [];
  if (businessData.services && businessData.services.length > 0) {
    activityConcepts = businessData.services.map(s => typeof s === 'string' ? s : s.name).filter(Boolean);
  } else {
    activityConcepts = [`${type} services`, `working in ${type}`];
  }

  // Environment Concepts
  let environmentConcepts = [
    `${type} interior`,
    `${type} store`,
    `${type} facility`
  ];
  if (type.includes("cafe") || type.includes("restaurant")) environmentConcepts.push("dining area", "coffee shop interior");
  if (type.includes("furniture") || type.includes("real estate")) environmentConcepts.push("showroom", "living room interior", "modern home");

  // Customer Concepts
  let customerConcepts = [
    `customer at ${type}`,
    `happy client`
  ];
  if (type.includes("cafe") || type.includes("restaurant")) customerConcepts.push("enjoying meal", "drinking coffee");
  if (type.includes("store") || type.includes("shop")) customerConcepts.push("shopping");
  if (type.includes("gym") || type.includes("fitness")) customerConcepts.push("working out", "fitness training");

  return {
    industryConcepts,
    productConcepts,
    activityConcepts,
    environmentConcepts,
    customerConcepts
  };
}

// 3. Concept Query Builder
function generateImageQueries(blueprint, concepts) {
  const queries = {};
  
  const getConcept = (arr, index = 0) => arr.length > index ? arr[index] : arr[0];

  blueprint.sections.forEach(section => {
    let q = [];
    
    // Combine concepts based on section strategy
    if (section === "hero") {
      // Hero: Environment focused
      q.push(getConcept(concepts.environmentConcepts, 0));
      q.push(`${getConcept(concepts.industryConcepts)} ${getConcept(concepts.environmentConcepts, 1)}`);
    } else if (["products", "collections", "catalog", "inventory", "featured-products", "menu"].includes(section)) {
      // Products: Product focused
      concepts.productConcepts.forEach(p => q.push(p));
      q.push(`${getConcept(concepts.industryConcepts)} ${getConcept(concepts.productConcepts)}`);
    } else if (["services", "programs", "consultation"].includes(section)) {
      // Services: Activity focused
      concepts.activityConcepts.forEach(a => q.push(a));
      q.push(`${getConcept(concepts.industryConcepts)} ${getConcept(concepts.activityConcepts)}`);
    } else if (["gallery", "showcase", "portfolio"].includes(section)) {
      // Gallery: Environment + Customer
      q.push(getConcept(concepts.environmentConcepts, 0));
      q.push(getConcept(concepts.customerConcepts, 0));
      q.push(`${getConcept(concepts.industryConcepts)} ${getConcept(concepts.customerConcepts, 1)}`);
    } else if (["team", "about"].includes(section)) {
      q.push(getConcept(concepts.activityConcepts, 0));
      q.push(`${getConcept(concepts.industryConcepts)} facility`);
    } else if (["reviews", "testimonials", "case-studies"].includes(section)) {
      q.push(getConcept(concepts.customerConcepts, 0));
    } else {
      q.push(getConcept(concepts.industryConcepts, 0));
    }
    
    // Clean and filter duplicates
    queries[section] = Array.from(new Set(q.filter(x => x && x.trim() !== "")));
  });

  return queries;
}

// Relevance Scorer
function scoreImageRelevance(photo, keywordsObj) {
  if (!photo || !photo.alt) return 0;
  const altText = photo.alt.toLowerCase();
  
  // Verify image matches business, products, or services
  const matchesIndustry = keywordsObj.primaryKeywords.some(kw => altText.includes(kw.toLowerCase()));
  const matchesProduct = keywordsObj.productKeywords.some(kw => altText.includes(kw.toLowerCase()));
  const matchesService = keywordsObj.serviceKeywords.some(kw => altText.includes(kw.toLowerCase()));
  
  let score = 0;
  if (matchesIndustry) score += 2;
  if (matchesProduct) score += 3;
  if (matchesService) score += 3;
  
  return score; // 0 means rejected
}

async function fetchImagesFromPexelsSegmented(sectionQueriesMap, keywordsObj, businessData) {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey || apiKey.includes("placeholder")) {
    console.warn("[AI Engine] Missing Pexels API Key.");
    return {};
  }

  const resultImages = {};
  const allKws = [...keywordsObj.primaryKeywords, ...keywordsObj.productKeywords, ...keywordsObj.serviceKeywords];
  
  const usedUrls = new Set();
  const usedPhotographers = new Set();
  
  const bType = (businessData.type || "business").toLowerCase();
  const isCorporateAllowed = bType.includes("office") || bType.includes("consult") || bType.includes("corporate") || bType.includes("tech") || bType.includes("software") || bType.includes("b2b");
  
  const blacklist = ["office", "meeting", "conference", "corporate", "workspace", "business people", "boardroom", "office building", "teamwork", "startup office"];

  console.log("\n[IMAGE DIVERSITY ENGINE] Starting Image Fetch...");

  async function queryPexels(query) {
    try {
      const res = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=40&orientation=landscape`, {
        headers: { 'Authorization': apiKey }
      });
      return res.data.photos || [];
    } catch (err) {
      console.error(`Pexels API Error for "${query}":`, err.message);
      return [];
    }
  }

  function applyFilters(photos, strictPhotographer) {
    return photos.filter(p => {
      const alt = (p.alt || "").toLowerCase();
      if (!isCorporateAllowed && blacklist.some(term => alt.includes(term))) return false;
      const url = p.src?.large2x || p.src?.large;
      if (usedUrls.has(url)) return false;
      if (strictPhotographer && usedPhotographers.has(p.photographer_id)) return false;
      return true;
    });
  }

  for (const [section, queries] of Object.entries(sectionQueriesMap)) {
    resultImages[section] = [];
    
    for (const query of queries) {
      console.log(`\n--- PEXELS REQUEST [${section}] ---`);
      
      let photos = await queryPexels(query);
      
      // Stage 1: Strict Filtering
      let validPhotos = applyFilters(photos, true);
      let acceptedCount = validPhotos.length;
      console.log(`Primary Query: "${query}" | Accepted Count: ${acceptedCount}`);

      // Stage 2: Relax Photographer Restrictions
      if (acceptedCount === 0) {
        console.log(`  [Stage 2] Relaxing photographer restrictions...`);
        validPhotos = applyFilters(photos, false);
        acceptedCount = validPhotos.length;
        console.log(`Primary Query: "${query}" | Accepted Count (Relaxed): ${acceptedCount}`);
      }

      // Stage 3: Secondary Pexels Query
      if (acceptedCount === 0) {
        const secondaryQuery = bType; // e.g., "dog grooming"
        console.log(`  [Stage 3] Secondary query triggered.`);
        photos = await queryPexels(secondaryQuery);
        validPhotos = applyFilters(photos, false);
        acceptedCount = validPhotos.length;
        console.log(`Fallback Query: "${secondaryQuery}" | Accepted Count: ${acceptedCount}`);
      }
      
      // Absolute Safety Net: Dynamic Recovery (Ignore usedUrls if completely exhausted)
      if (acceptedCount === 0) {
        console.log(`  [Safety Net] Dynamic recovery triggered.`);
        photos = await queryPexels("business " + bType);
        validPhotos = photos; 
        acceptedCount = validPhotos.length;
      }

      if (validPhotos.length > 0) {
        // Apply Strict Relevance Scoring
        const scoredPhotos = validPhotos.map(p => ({ photo: p, score: scoreImageRelevance(p, keywordsObj) }));
        scoredPhotos.sort((a, b) => b.score - a.score);
        
        let finalPhotos = scoredPhotos.filter(p => p.score > 0);
        
        // Only select if strictly relevant
        if (finalPhotos.length > 0) {
          const poolSize = Math.min(5, finalPhotos.length);
          const randomIdx = Math.floor(Math.random() * poolSize);
          const selectedPhoto = finalPhotos[randomIdx].photo;
          const selectedUrl = selectedPhoto.src?.large2x || selectedPhoto.src?.large;
          
          usedUrls.add(selectedUrl);
          usedPhotographers.add(selectedPhoto.photographer_id);
          
          resultImages[section].push(selectedUrl);
          console.log(`Final Selected URLs: [${selectedUrl}] (Score: ${finalPhotos[randomIdx].score})`);
        } else {
          console.log(`  [Rejected] All ${validPhotos.length} images failed relevance scoring.`);
        }
      }
    }
    
    // Ensure section has at least one image to prevent nulls
    if (resultImages[section].length === 0) {
       console.log(`[WARNING] Section ${section} still empty. Applying dynamic ultimate recovery...`);
       const recoveryPhotos = await queryPexels(bType || "business");
       if (recoveryPhotos.length > 0) {
         const fallbackUrl = recoveryPhotos[0].src?.large2x || recoveryPhotos[0].src?.large;
         resultImages[section].push(fallbackUrl);
         console.log(`Final Selected URLs: [${fallbackUrl}]`);
       }
    }
  }
  return resultImages;
}

// Dynamic Content Generator
function generateDynamicSectionContent(sectionType, businessData, keywords, sectionImages) {
  const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
  const name = businessData.name || "Our Business";
  const core = keywords.primaryKeywords[0] ? capitalize(keywords.primaryKeywords[0]) : "Our Offerings";
  
  const getImages = (count) => {
    let imgs = sectionImages || [];
    if (imgs.length === 0) return Array(count).fill(null);
    while (imgs.length < count && imgs.length > 0) imgs = [...imgs, ...imgs];
    return imgs.slice(0, count);
  };

  switch (sectionType) {
    case "hero":
      return {
        title: `${core} Tailored Exactly For You`,
        subtitle: `Welcome to ${name}. We craft specialized experiences around ${keywords.primaryKeywords.join(" ") || businessData.type}.`,
        ctaText: businessData.whatsappEnabled ? "Connect on WhatsApp" : "Discover More",
        ctaLink: businessData.whatsappEnabled && businessData.whatsappNumber ? `https://wa.me/${businessData.whatsappNumber.replace(/\D/g, '')}` : "#contact",
        backgroundImage: getImages(1)[0]
      };
    
    case "about":
    case "team":
      return {
        title: sectionType === 'team' ? `The Faces Behind ${name}` : `The Story of ${name}`,
        description: `We built ${name} to bring exceptional experiences to our community. Our focus is purely on your satisfaction.`,
        image: getImages(1)[0],
        highlights: [`Authentic ${core}`, "Community First", "Dedicated Specialists"]
      };

    case "products":
    case "collections":
    case "catalog":
    case "inventory":
    case "featured-products":
    case "menu":
      const pSrc = keywords.productKeywords.length > 0 ? keywords.productKeywords : keywords.primaryKeywords;
      const prods = pSrc.slice(0, 3).map((kw, i) => ({
        name: `${capitalize(kw)} Selection`,
        price: "Contact Us",
        description: `A carefully curated ${kw} experience.`,
        image: getImages(3)[i] || null
      }));
      if (prods.length === 0) prods.push({ name: "Featured Item", description: "Our best offering." });
      return {
        title: sectionType === 'menu' ? "Our Menu" : `Featured Collections`,
        subtitle: `Explore our specialized offerings tailored for your needs.`,
        products: prods
      };

    case "services":
    case "programs":
    case "consultation":
      const sSrc = keywords.serviceKeywords.length > 0 ? keywords.serviceKeywords : keywords.primaryKeywords;
      const servs = sSrc.slice(0, 3).map((kw) => ({
        name: `${capitalize(kw)} Expertise`,
        description: `Specialized ${kw} support and execution.`,
        icon: "Star"
      }));
      if (servs.length === 0) servs.push({ name: "Core Service", description: "Expertise you can rely on." });
      return {
        title: sectionType === 'programs' ? "Specialized Programs" : `Our Services`,
        subtitle: "Built to deliver maximum impact.",
        services: servs
      };

    case "gallery":
    case "showcase":
    case "portfolio":
      return {
        title: sectionType === 'portfolio' ? "Our Work Portfolio" : "Visual Showcase",
        subtitle: `A glimpse into the ${name} experience.`,
        images: getImages(4).map((url, i) => ({ url, caption: `Showcase ${i+1}` }))
      };

    case "reviews":
    case "testimonials":
    case "case-studies":
      return {
        title: sectionType === 'case-studies' ? "Client Success Stories" : "What They Say",
        testimonials: [
          { name: "Local Client", role: "Verified Customer", content: `Incredible experience with ${name}. Their approach to ${core.toLowerCase()} is unmatched!`, rating: 5, avatar: getImages(2)[0] },
          { name: "Partner", role: "Long-time Client", content: `They consistently deliver amazing results. Highly recommended.`, rating: 5, avatar: getImages(2)[1] }
        ]
      };

    case "faq":
      return {
        title: "Questions You Might Have",
        faqs: [
          { question: `What makes your approach different?`, answer: "We focus on authenticity and complete client satisfaction." },
          { question: "How can I reach you quickly?", answer: "Use the contact button or WhatsApp integration on this page." }
        ]
      };

    case "contact":
    case "booking":
    case "locations":
      return {
        title: sectionType === 'booking' ? "Secure Your Booking" : "Reach Out Today",
        subtitle: "We are ready to assist you.",
        address: "Find us in the heart of the city.",
        email: `hello@${(businessData.name || "business").replace(/\s+/g, '').toLowerCase()}.com`,
        phone: businessData.whatsappNumber || "+91 98765 43210",
        hours: "Mon-Sat: 9AM - 6PM"
      };

    case "footer":
      return {
        businessName: name,
        copyright: `© ${new Date().getFullYear()} ${name}. Built independently.`,
        links: [
          { label: "Home", href: "/" },
          { label: "Contact Us", href: "#contact" }
        ]
      };

    default:
      return { title: capitalize(sectionType) };
  }
}

// 4. Design Tokens (Randomized Layer)
function generateDesignTokens(style, colorThemePreference, blueprint) {
  const fonts = {
    modern: ["Outfit", "Syne", "Cabinet Grotesk", "Satoshi"],
    luxury: ["Playfair Display", "Cormorant Garamond", "Cinzel", "Bodoni Moda"],
    minimal: ["Inter", "DM Sans", "Space Grotesk", "Satoshi"]
  };
  const palettes = {
    modern: [{ primary: "#4F46E5", secondary: "#0F172A", accent: "#10B981" }, { primary: "#EC4899", secondary: "#111827", accent: "#8B5CF6" }],
    luxury: [{ primary: "#7F1D1D", secondary: "#1C1917", accent: "#D97706" }, { primary: "#064E3B", secondary: "#0B0F19", accent: "#FBBF24" }],
    minimal: [{ primary: "#18181B", secondary: "#F4F4F5", accent: "#71717A" }, { primary: "#292524", secondary: "#FAF9F6", accent: "#78716C" }]
  };

  const fontFamily = fonts[style] ? fonts[style][Math.floor(Math.random() * fonts[style].length)] : "Outfit";
  const selectedPalette = palettes[style] ? palettes[style][Math.floor(Math.random() * palettes[style].length)] : palettes.modern[0];
  
  const primaryColor = colorThemePreference || selectedPalette.primary;

  const cardStyles = [
    "rounded-3xl border border-zinc-100 shadow-xl bg-white hover:-translate-y-1 transition-all",
    "rounded-none border-2 border-black bg-white hover:bg-zinc-50 transition-all",
    "rounded-2xl border-none shadow-md bg-stone-50 hover:shadow-lg transition-all"
  ];
  
  const buttonStyles = [
    "rounded-full font-bold bg-gradient-to-r from-zinc-800 to-black text-white px-8 py-3 hover:opacity-90",
    "rounded-none font-black uppercase border-2 border-black text-black hover:bg-black hover:text-white px-6 py-3",
    "rounded-xl font-semibold bg-blue-600 text-white shadow-lg shadow-blue-600/20 px-7 py-3 hover:bg-blue-700"
  ];

  return {
    primaryColor,
    secondaryColor: selectedPalette.secondary,
    accentColor: selectedPalette.accent,
    fontFamily,
    style,
    spacing: ["compact", "medium", "large"][Math.floor(Math.random() * 3)],
    cardStyle: cardStyles[Math.floor(Math.random() * cardStyles.length)],
    buttonStyle: buttonStyles[Math.floor(Math.random() * buttonStyles.length)],
    imageStyle: "rounded-xl shadow-md object-cover"
  };
}

// 5. Compile Final JSON
async function compileWebsiteJSON(businessData, style, colorThemePreference, keywords, blueprint, segmentedImages) {
  const contentMap = {};
  blueprint.sections.forEach(type => {
    contentMap[type] = generateDynamicSectionContent(type, businessData, keywords, segmentedImages[type]);
  });
  contentMap["footer"] = generateDynamicSectionContent("footer", businessData, keywords, []);

  const themeTokens = generateDesignTokens(style, colorThemePreference, blueprint);

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
        imageStyle: themeTokens.imageStyle
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
      title: `${businessData.name || "My Business"} | ${keywords.primaryKeywords.join(" ")}`,
      description: `Welcome to ${businessData.name}.`,
      favicon: "✨",
      keywords: keywords.primaryKeywords
    },
    theme: { ...themeTokens },
    globalSettings: {
      layoutStrategy: blueprint.layoutType,
      navbarStyle: style === "minimal" ? "solid" : "glass",
      footerStyle: style === "luxury" ? "complex" : "simple",
      whatsappButton: businessData.whatsappEnabled !== undefined ? businessData.whatsappEnabled : true,
      whatsappNumber: businessData.whatsappNumber || "+91 98765 43210"
    },
    pages: [{ name: "Home", slug: "/", sections: sectionsArray }],
    sections: sectionsArray,
    content: contentMap
  };
}

// Main Orchestrator
async function generateThreeVariations(businessData) {
  const userColor = businessData.colorTheme || null;

  console.log("=== STARTING DYNAMIC AI WEBSITE GENERATION ===");

  // 1. Keyword Extraction
  console.log("[1/4] Extracting NLP Keywords...");
  const keywords = extractBusinessKeywords(businessData);
  console.log("   - Primary:", keywords.primaryKeywords.join(", "));
  
  const concepts = generateBusinessUnderstanding(businessData, keywords);
  console.log("\n[BUSINESS UNDERSTANDING ENGINE] Extracted Domains:");
  console.log("   - Industry:", concepts.industryConcepts.join(" | "));
  console.log("   - Products:", concepts.productConcepts.join(" | "));
  console.log("   - Activities:", concepts.activityConcepts.join(" | "));
  console.log("   - Environments:", concepts.environmentConcepts.join(" | "));
  console.log("   - Customers:", concepts.customerConcepts.join(" | "));

  // 2. Blueprint Generation
  console.log("\n[2/5] Synthesizing Dynamic Blueprints...");
  const modernBlueprint = generateWebsiteBlueprint(businessData, keywords);
  const luxuryBlueprint = generateWebsiteBlueprint(businessData, keywords);
  const minimalBlueprint = generateWebsiteBlueprint(businessData, keywords);
  
  const allUniqueSections = Array.from(new Set([
    ...modernBlueprint.sections,
    ...luxuryBlueprint.sections,
    ...minimalBlueprint.sections
  ]));
  const mergedBlueprint = { sections: allUniqueSections };

  // 3. Segmented Image Fetching
  console.log("\n[3/4] Fetching Segmented Imagery from Pexels...");
  
  const imageQueries = generateImageQueries(mergedBlueprint, concepts);
  
  console.log("\n[QUERY ENGINE] Generated Targeted Queries:");
  Object.keys(imageQueries).forEach(sec => {
    console.log(`   - [${sec}]: ${imageQueries[sec].join(", ")}`);
  });

  const segmentedImages = await fetchImagesFromPexelsSegmented(imageQueries, keywords, businessData);

  // 4. Compile Variations
  console.log("\n[4/4] Compiling Unique Website Structures...");
  const [modernBase, luxuryBase, minimalBase] = await Promise.all([
    compileWebsiteJSON(businessData, "modern", userColor, keywords, modernBlueprint, segmentedImages),
    compileWebsiteJSON(businessData, "luxury", userColor, keywords, luxuryBlueprint, segmentedImages),
    compileWebsiteJSON(businessData, "minimal", userColor, keywords, minimalBlueprint, segmentedImages)
  ]);

  console.log("=== DYNAMIC GENERATION COMPLETE ===\n");

  return [
    {
      id: "modern",
      name: "Version A: " + modernBlueprint.layoutType,
      tagline: `A dynamic ${modernBlueprint.contentStrategy} layout featuring ${modernBlueprint.visualStrategy}.`,
      websiteJson: modernBase
    },
    {
      id: "luxury",
      name: "Version B: " + luxuryBlueprint.layoutType,
      tagline: `A premium approach focusing on ${luxuryBlueprint.contentStrategy}.`,
      websiteJson: luxuryBase
    },
    {
      id: "minimal",
      name: "Version C: " + minimalBlueprint.layoutType,
      tagline: `Stark, minimal delivery prioritizing ${minimalBlueprint.contentStrategy}.`,
      websiteJson: minimalBase
    }
  ];
}

module.exports = {
  compileWebsiteJSON,
  generateThreeVariations
};
