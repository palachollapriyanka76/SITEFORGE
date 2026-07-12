import { WebsiteJSON } from "@siteforge/types";

export const IMAGE_CATEGORIES: Record<string, string> = {
  // Bakery
  "photo-1509440159596-0249088772ff": "bread",
  "photo-1549931319-a545dcf3bc73": "bread",
  "photo-1578985545062-69928b1d9587": "cake",
  "photo-1555507036-ab1f4038808a": "croissant",
  "photo-1517433456452-f9633a875f6f": "cupcake",
  "photo-1581349485608-550f7f90533f": "cake",
  "photo-1563729784474-d77dbb933a9e": "pastry",
  "photo-1486427944299-d1955d23e317": "cookies",
  "photo-1511018556340-d16986a1c194": "pastry",
  "photo-1505253716362-afaea1d3d1af": "cake",
  "photo-1488477181946-6428a0291777": "cake",
  // Restaurant
  "photo-1517248135467-4c7edcad34c4": "restaurant",
  "photo-1414235077428-338989a2e8c0": "restaurant",
  "photo-1565557623262-b51c2513a641": "paneer",
  "photo-1603894584373-5ac82b2ae398": "chicken",
  "photo-1563379091339-03b21ab4a4f8": "biryani",
  "photo-1550966871-3ed3cdb5ed0c": "pizza",
  "photo-1504674900247-0877df9cc836": "restaurant",
  "photo-1513104890138-7c749659a591": "pizza",
  "photo-1568901346375-23c9450c58cd": "burger",
  "photo-1540189549336-e6e99c3679fe": "restaurant",
  "photo-1565299624946-b28f40a0ae38": "pizza",
  "photo-1559715745-e1b34a270d88": "dessert",
  // Salon
  "photo-1560066984-138dadb4c035": "salon",
  "photo-1522337360788-8b13dee7a37e": "makeup",
  "photo-1607779097040-26e80aa78e66": "spa",
  "photo-1562322140-8baeececf3df": "hair",
  "photo-1487412720507-e7ab37603c6f": "makeup",
  "photo-1620331702279-b7b0d2fe3576": "nail",
  "photo-1519415510236-8fa5952c26bd": "spa",
  "photo-1522337094156-80b54b2b23a9": "hair",
  "photo-1596178065887-1198b6148b2b": "spa",
  "photo-1616394584738-fc6e612e71b9": "hair",
  "photo-1500840216050-6ffa99d7cd76": "hair",
  "photo-1633681926022-84c23e8cb2d6": "nail",
  // Fashion
  "photo-1490481651871-ab68de25d43d": "fashion",
  "photo-1469334031218-e382a71b716b": "fashion",
  "photo-1441986300917-64674bd600d8": "fashion",
  "photo-1539109136881-3be0616acf4b": "fashion",
  "photo-1583391733956-3750e0ff4e8b": "suit",
  "photo-1525507119028-ed4c629a60a3": "sewing",
  "photo-1483985988355-763728e1935b": "fashion",
  "photo-1509631179647-0177331693ae": "fashion",
  "photo-1492707892479-7bc8d5a4ee93": "shoes",
  "photo-1512436991641-6745cdb1723f": "accessories",
  "photo-1558769132-cb1aea458c5e": "fashion",
  "photo-1537838979607-a53bc2db1a86": "fashion",
  // Electronics
  "photo-1531297484001-80022131f5a1": "electronics",
  "photo-1542751371-adc38448a05e": "monitor",
  "photo-1468495244123-6c6c332eeece": "electronics",
  "photo-1505740420928-5e560c06d30e": "headphones",
  "photo-1523275335684-37898b6baf30": "watch",
  "photo-1496181130204-7552cc14ac1a": "laptop",
  "photo-1511707171634-5f897ff02aa9": "phone",
  "photo-1527689368864-3a821dbccc34": "electronics",
  "photo-1588508065123-287b28e013da": "electronics",
  "photo-1544244015-0df4b3ffc6b0": "tablet",
  "photo-1593642632823-8f785ba67e45": "laptop",
  "photo-1591799264318-7e6ef8ddb7ea": "electronics",
  // Gym
  "photo-1534438327276-14e5300c3a48": "weights",
  "photo-1540206395-68808572332f": "treadmill",
  "photo-1517838277536-f5f99be501cd": "weights",
  "photo-1571019614242-c5c5dee9f50b": "weights",
  "photo-1518611012118-696072aa579a": "yoga",
  "photo-1541534741688-6078c6bfb5c5": "workout",
  "photo-1574680096145-d05b474e2155": "weights",
  "photo-1593079831268-3381b0db4a77": "workout",
  "photo-1526506118085-60ce8714f8c5": "weights",
  "photo-1599058917212-d750089bc07e": "workout",
  // Medical
  "photo-1629909613654-28e377c37b09": "medical",
  "photo-1576091160550-2173dba999ef": "medical",
  "photo-1622253692010-333f2da6031d": "stethoscope",
  "photo-1579684385127-1ef15d508118": "dentist",
  "photo-1581595220892-b0739db3ba87": "medical",
  "photo-1559839734-2b71ea197ec2": "medical",
  "photo-1584515979956-d9f6e5d09982": "medical",
  "photo-1606811971618-4486d14f3f99": "medical",
  "photo-1583324113626-70df0f4deaab": "medical",
  "photo-1579156492015-60de56ddf58e": "medical",
  "photo-1631815589968-fdb09a223b1e": "medical"
};

export const INDUSTRY_ALLOWED_KEYWORDS: Record<string, string[]> = {
  bakery: ["cake", "cupcake", "pastry", "croissant", "cookie", "donut", "bread", "muffin", "gateau", "sweet", "pastries", "cookies", "donuts", "muffins"],
  restaurant: ["paneer", "chicken", "biryani", "pizza", "burger", "pasta", "salad", "soup", "rice", "curry", "kebab", "tikka", "gourmet", "cuisine", "drink", "beverage", "food", "dine", "dessert", "bistro", "cafe", "eatery"],
  salon: ["hair", "makeup", "facial", "spa", "manicure", "pedicure", "salon", "massage", "bridal", "makeover", "coloring", "styling", "cut", "skin", "nail", "beauty"],
  fashion: ["dress", "suit", "jacket", "coat", "shoes", "bag", "handbag", "clothing", "saree", "kurti", "tailoring", "accessories", "wear", "apparel", "boutique", "lookbook"],
  electronics: ["laptop", "computer", "keyboard", "monitor", "phone", "mobile", "headphone", "headphones", "smartwatch", "watch", "tablet", "ipad", "speaker", "device", "gadget", "gadgets", "electronics"],
  gym: ["gym", "fitness", "workout", "training", "exercise", "yoga", "zumba", "crossfit", "cardio", "barbell", "dumbbell", "weight", "weights", "strength", "conditioning"],
  medical: ["medical", "clinic", "doctor", "health", "stethoscope", "dentist", "dental", "scan", "checkup", "lab", "test", "diagnostic", "family health", "chambers"]
};

// Strict Disallowed Industry Keywords (disallowed on other categories)
export const INDUSTRY_DISALLOWED_KEYWORDS: Record<string, string[]> = {
  bakery: ["keyboard", "monitor", "phone", "headphones", "laptop", "tablet", "salon", "spa", "makeup", "haircut", "gym", "workout", "fitness", "stethoscope", "medical", "clinic"],
  restaurant: ["keyboard", "monitor", "phone", "headphones", "laptop", "tablet", "salon", "spa", "makeup", "haircut", "gym", "workout", "fitness", "stethoscope", "medical", "clinic"],
  salon: ["keyboard", "monitor", "phone", "headphones", "laptop", "tablet", "cake", "cupcake", "croissant", "donut", "bread", "gym", "workout", "fitness", "stethoscope", "medical", "clinic"],
  fashion: ["keyboard", "monitor", "phone", "headphones", "laptop", "tablet", "cake", "cupcake", "croissant", "donut", "bread", "gym", "workout", "fitness", "stethoscope", "medical", "clinic"],
  electronics: ["cake", "cupcake", "croissant", "donut", "bread", "salon", "spa", "makeup", "haircut", "gym", "workout", "fitness", "stethoscope", "medical", "clinic"],
  gym: ["keyboard", "monitor", "phone", "headphones", "laptop", "tablet", "cake", "cupcake", "croissant", "donut", "bread", "salon", "spa", "makeup", "haircut", "stethoscope", "medical", "clinic"],
  medical: ["keyboard", "monitor", "phone", "headphones", "laptop", "tablet", "cake", "cupcake", "croissant", "donut", "bread", "salon", "spa", "makeup", "haircut", "gym", "workout", "fitness"]
};

export const PRODUCT_PRICE_RANGES: Record<string, { min: number; max: number }> = {
  // Bakery
  cupcake: { min: 60, max: 180 },
  croissant: { min: 80, max: 250 },
  cookies: { min: 50, max: 300 },
  cookie: { min: 50, max: 300 },
  cake: { min: 400, max: 1500 },
  gateau: { min: 400, max: 1500 },
  bread: { min: 40, max: 200 },
  pastry: { min: 60, max: 300 },
  donut: { min: 50, max: 200 },
  muffin: { min: 50, max: 200 },
  // Electronics
  keyboard: { min: 500, max: 10000 },
  monitor: { min: 5000, max: 50000 },
  phone: { min: 5000, max: 150000 },
  mobile: { min: 5000, max: 150000 },
  headphones: { min: 1000, max: 30000 },
  headphone: { min: 1000, max: 30000 },
  watch: { min: 1000, max: 50000 },
  laptop: { min: 20000, max: 200000 },
  tablet: { min: 5000, max: 100000 },
  // Restaurant
  pizza: { min: 150, max: 1000 },
  burger: { min: 100, max: 600 },
  biryani: { min: 150, max: 800 },
  paneer: { min: 150, max: 600 },
  chicken: { min: 150, max: 800 },
  // Salon
  hair: { min: 150, max: 5000 },
  makeup: { min: 500, max: 20000 },
  spa: { min: 500, max: 10000 },
  nail: { min: 200, max: 3000 },
  facial: { min: 300, max: 5000 },
  // Fashion
  dress: { min: 500, max: 15000 },
  suit: { min: 2000, max: 40000 },
  // Gym
  gym: { min: 1000, max: 30000 },
  workout: { min: 500, max: 10000 },
  training: { min: 1000, max: 20000 },
  // Medical
  medical: { min: 500, max: 10000 },
  dentist: { min: 500, max: 15000 }
};

export function getImageIdFromUrl(url: string): string {
  const match = url.match(/photo-([a-zA-Z0-9-]+)/);
  return match ? match[0] : "";
}

export function getImageCategory(url: string): string {
  const id = getImageIdFromUrl(url);
  return IMAGE_CATEGORIES[id] || "unknown";
}

export function getProductCategory(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("cupcake")) return "cupcake";
  if (n.includes("croissant")) return "croissant";
  if (n.includes("cookie")) return "cookies";
  if (n.includes("cake") || n.includes("gateau")) return "cake";
  if (n.includes("bread") || n.includes("sourdough")) return "bread";
  if (n.includes("pastry") || n.includes("pastries")) return "pastry";
  if (n.includes("donut") || n.includes("donuts")) return "donut";
  if (n.includes("muffin") || n.includes("muffins")) return "muffin";

  if (n.includes("pizza")) return "pizza";
  if (n.includes("burger")) return "burger";
  if (n.includes("biryani")) return "biryani";
  if (n.includes("paneer")) return "paneer";
  if (n.includes("chicken") || n.includes("tikka") || n.includes("kabab")) return "chicken";

  if (n.includes("hair")) return "hair";
  if (n.includes("makeup") || n.includes("bridal") || n.includes("makeover")) return "makeup";
  if (n.includes("nail")) return "nail";
  if (n.includes("spa") || n.includes("massage")) return "spa";
  if (n.includes("facial")) return "facial";

  if (n.includes("keyboard")) return "keyboard";
  if (n.includes("monitor")) return "monitor";
  if (n.includes("phone") || n.includes("mobile")) return "phone";
  if (n.includes("headphone") || n.includes("audio") || n.includes("anc")) return "headphones";
  if (n.includes("watch")) return "watch";
  if (n.includes("laptop")) return "laptop";
  if (n.includes("tablet") || n.includes("ipad")) return "tablet";

  if (n.includes("weight") || n.includes("barbell") || n.includes("dumbbell") || n.includes("plates")) return "weights";
  if (n.includes("treadmill") || n.includes("running")) return "treadmill";
  if (n.includes("yoga")) return "yoga";

  if (n.includes("stethoscope")) return "stethoscope";
  if (n.includes("dentist") || n.includes("dental") || n.includes("teeth") || n.includes("tooth")) return "dentist";

  if (n.includes("suit")) return "suit";
  if (n.includes("sew") || n.includes("stitching") || n.includes("tailor")) return "sewing";

  return "other";
}

export function extractPriceNumber(priceStr: string): number {
  const clean = priceStr.replace(/[^0-9]/g, "");
  return parseInt(clean, 10) || 0;
}

export interface AuditResult {
  imageMatchScore: number;
  productMatchScore: number;
  duplicateScore: number;
  visualScore: number;
  valid: boolean;
  logs: string[];
}

export function runQualityAudit(websiteJson: WebsiteJSON, businessData: any): AuditResult {
  const logs: string[] = [];
  const rawType = businessData.type || "Retail Shop";
  
  // Detect mock category
  const type = rawType.toLowerCase();
  let industry = "generic";
  if (type.includes("bakery") || type.includes("cake") || type.includes("sweet")) industry = "bakery";
  else if (type.includes("rest") || type.includes("cafe") || type.includes("food") || type.includes("dine")) industry = "restaurant";
  else if (type.includes("salon") || type.includes("spa") || type.includes("hair") || type.includes("beauty")) industry = "salon";
  else if (type.includes("fashion") || type.includes("clothing") || type.includes("boutique") || type.includes("wear")) industry = "fashion";
  else if (type.includes("elect") || type.includes("phone") || type.includes("gadg")) industry = "electronics";
  else if (type.includes("gym") || type.includes("fit")) industry = "gym";
  else if (type.includes("clinic") || type.includes("medical") || type.includes("doctor") || type.includes("health")) industry = "medical";

  // 1. Check Image matches & log failures
  let imageChecked = 0;
  let imagePassed = 0;

  // 2. Check Product allowed locks & disallowed list
  let productsChecked = 0;
  let productsPassed = 0;

  // 3. Duplicate checks
  const imageUrls: string[] = [];

  // 4. Visual checks (placeholders, unique titles/descriptions/prices, boilerplates)
  let placeholderCount = 0;
  const titlesList: string[] = [];
  const descriptionsList: string[] = [];
  const pricesList: string[] = [];
  let boilerplateCount = 0;

  const placeholderRegex = /lorem|ipsum|dolor|sit|amet|placeholder|coming\s+soon|dummy|insert\s+description/i;

  // Process sections
  websiteJson.pages.forEach((page) => {
    page.sections.forEach((sec) => {
      // Background and visual images duplicate count
      if (sec.content) {
        if (sec.content.backgroundImage) {
          imageUrls.push(sec.content.backgroundImage);
        }
        if (sec.content.image) {
          imageUrls.push(sec.content.image);
        }
        if (Array.isArray(sec.content.images)) {
          sec.content.images.forEach((img: any) => {
            const url = typeof img === "string" ? img : img?.url;
            if (url) imageUrls.push(url);
          });
        }

        // Placeholders on text elements
        Object.entries(sec.content).forEach(([key, val]) => {
          if (typeof val === "string") {
            if (placeholderRegex.test(val)) placeholderCount++;
            if (val.toLowerCase().includes("premium quality sourced from")) boilerplateCount++;
          }
        });

        // Validate products/services cards
        const cardsList = sec.content.products || sec.content.services || [];
        if (Array.isArray(cardsList)) {
          cardsList.forEach((prod: any) => {
            if (!prod || typeof prod !== "object") return;
            
            const prodName = prod.name || "";
            const prodDesc = prod.description || "";
            const prodPrice = prod.price || "";
            const prodImage = prod.image || "";

            if (prodImage) imageUrls.push(prodImage);

            // Text placeholders
            if (placeholderRegex.test(prodName) || placeholderRegex.test(prodDesc) || placeholderRegex.test(prodPrice)) {
              placeholderCount++;
            }
            if (prodDesc.toLowerCase().includes("premium quality sourced from")) {
              boilerplateCount++;
            }

            // Uniqueness checklists
            if (prodName) titlesList.push(prodName.trim().toLowerCase());
            if (prodDesc) descriptionsList.push(prodDesc.trim().toLowerCase());
            if (prodPrice) pricesList.push(prodPrice.trim().toLowerCase());

            // 1. PRODUCT ↔ IMAGE VALIDATION (RULE 1)
            if (prodName && prodImage) {
              const prodCat = getProductCategory(prodName);
              const imgCat = getImageCategory(prodImage);
              
              imageChecked++;
              // If product belongs to one of strict mapped categories (e.g. cupcake), image category must match
              const strictCategories = ["cake", "cupcake", "croissant", "keyboard", "monitor", "phone", "headphones", "bread", "pastry", "cookies", "pizza", "burger", "biryani", "paneer", "chicken", "hair", "makeup", "nail", "spa", "facial", "weights", "treadmill", "yoga", "stethoscope", "dentist", "suit", "sewing"];
              
              if (strictCategories.includes(prodCat)) {
                if (prodCat === imgCat) {
                  imagePassed++;
                } else {
                  logs.push(`${prodName}\nImage Category: ${imgCat ? imgCat.charAt(0).toUpperCase() + imgCat.slice(1) : "Unknown"}\n\nFAILED\n\nRegenerating...`);
                  console.log(`${prodName}\nImage Category: ${imgCat ? imgCat.charAt(0).toUpperCase() + imgCat.slice(1) : "Unknown"}\n\nFAILED\n\nRegenerating...`);
                }
              } else {
                imagePassed++; // general non-strict mapping pass
              }
            }

            // 2. INDUSTRY LOCKING (RULE 2)
            if (prodName && industry !== "generic") {
              productsChecked++;
              const prodNameLower = prodName.toLowerCase();
              
              // Lock rules check
              const disallowed = INDUSTRY_DISALLOWED_KEYWORDS[industry] || [];
              const containsDisallowed = disallowed.some(keyword => prodNameLower.includes(keyword));
              
              if (containsDisallowed) {
                logs.push(`Product "${prodName}" contains disallowed terms for industry "${industry}".`);
                console.log(`Product "${prodName}" contains disallowed terms for industry "${industry}".`);
              } else {
                productsPassed++;
              }

              // Rule 5: Realistic pricing constraints check
              if (prodPrice) {
                const numericPrice = extractPriceNumber(prodPrice);
                const prodCat = getProductCategory(prodName);
                const limits = PRODUCT_PRICE_RANGES[prodCat];
                if (limits) {
                  if (numericPrice < limits.min || numericPrice > limits.max) {
                    logs.push(`Unrealistic price rejected for "${prodName}": ${prodPrice} (expected ₹${limits.min}-₹${limits.max}).`);
                    console.log(`Unrealistic price rejected for "${prodName}": ${prodPrice} (expected ₹${limits.min}-₹${limits.max}).`);
                    // Force failure by deducting from visual/product score
                    placeholderCount++; 
                  }
                }
              }
            }
          });
        }
      }
    });
  });

  // Calculate Image Match Score
  const imageMatchScore = imageChecked === 0 ? 100 : Math.round((imagePassed / imageChecked) * 100);

  // Calculate Product Match Score
  const productMatchScore = productsChecked === 0 ? 100 : Math.round((productsPassed / productsChecked) * 100);

  // Calculate Duplicate Score (Rule 3)
  const imageSet = new Set<string>();
  let duplicateCount = 0;
  imageUrls.forEach((url) => {
    if (imageSet.has(url)) duplicateCount++;
    imageSet.add(url);
  });
  const duplicateScore = imageUrls.length === 0 ? 100 : Math.round(((imageUrls.length - duplicateCount) / imageUrls.length) * 100);

  // Calculate Uniqueness deductions
  const uniqueTitles = new Set(titlesList).size;
  const uniqueDescs = new Set(descriptionsList).size;
  const uniquePrices = new Set(pricesList).size;

  let uniquenessDeductions = 0;
  if (titlesList.length > uniqueTitles) uniquenessDeductions += 20;
  if (descriptionsList.length > uniqueDescs) uniquenessDeductions += 20;
  if (pricesList.length > uniquePrices) uniquenessDeductions += 20;

  // Calculate Visual Score
  let visualScore = 100;
  if (placeholderCount > 0) visualScore -= 30;
  if (boilerplateCount > 0) visualScore -= 20;
  visualScore -= uniquenessDeductions;
  if (visualScore < 0) visualScore = 0;

  // Industry Recognition check (Rule 10)
  const industryPerfect = passesIndustryRecognitionTest(websiteJson, industry);
  if (!industryPerfect) {
    logs.push("Industry recognition test failed: Industry keywords not prominent enough.");
    console.log("Industry recognition test failed: Industry keywords not prominent enough.");
  }

  // Combined validation status
  const valid = imageMatchScore >= 95 && 
                productMatchScore >= 95 && 
                duplicateScore >= 95 && 
                visualScore >= 95 && 
                industryPerfect;

  return {
    imageMatchScore,
    productMatchScore,
    duplicateScore,
    visualScore,
    valid,
    logs
  };
}

export function passesIndustryRecognitionTest(websiteJson: WebsiteJSON, industry: string): boolean {
  const allowed = INDUSTRY_ALLOWED_KEYWORDS[industry] || [];
  if (allowed.length === 0) return true; // generic/unknown passes by default
  
  const textPool = [
    websiteJson.meta?.title,
    websiteJson.meta?.description,
    ...(websiteJson.meta?.keywords || []),
    ...websiteJson.pages.flatMap(p => p.sections.flatMap(s => {
      const parts: string[] = [];
      if (s.content) {
        if (s.content.title) parts.push(s.content.title);
        if (s.content.subtitle) parts.push(s.content.subtitle);
      }
      return parts;
    }))
  ].join(" ").toLowerCase();
  
  const matchCount = allowed.filter(keyword => textPool.includes(keyword)).length;
  return matchCount >= 3; // At least 3 industry keywords must be represented
}
