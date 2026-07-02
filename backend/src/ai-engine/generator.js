const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, 'templates');

// Helper to sanitize strings for folder matching
function sanitizeString(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Map keywords to specific mainCategory and subcategory folder paths
const CATEGORY_MAP = {
  // Food & Beverage
  bakery: { cat: 'food_and_beverage', sub: 'bakery' },
  cake: { cat: 'food_and_beverage', sub: 'cake_shop' },
  sweet: { cat: 'food_and_beverage', sub: 'sweet_shop' },
  restaurant: { cat: 'food_and_beverage', sub: 'restaurant' },
  cafe: { cat: 'food_and_beverage', sub: 'cafe' },
  tea: { cat: 'food_and_beverage', sub: 'tea_stall' },
  juice: { cat: 'food_and_beverage', sub: 'juice_center' },
  fastfood: { cat: 'food_and_beverage', sub: 'fast_food_center' },
  icecream: { cat: 'food_and_beverage', sub: 'ice_cream_shop' },
  pizza: { cat: 'food_and_beverage', sub: 'pizza_shop' },
  catering: { cat: 'food_and_beverage', sub: 'catering_service' },
  tiffin: { cat: 'food_and_beverage', sub: 'tiffin_center' },
  coffee: { cat: 'food_and_beverage', sub: 'coffee_shop' },
  
  // Beauty & Personal Care
  beautysalon: { cat: 'beauty_and_personal_care', sub: 'beauty_salon' },
  hairsalon: { cat: 'beauty_and_personal_care', sub: 'hair_salon' },
  barber: { cat: 'beauty_and_personal_care', sub: 'barber_shop' },
  spa: { cat: 'beauty_and_personal_care', sub: 'spa' },
  makeup: { cat: 'beauty_and_personal_care', sub: 'makeup_artist' },
  bridal: { cat: 'beauty_and_personal_care', sub: 'bridal_makeup_studio' },
  nail: { cat: 'beauty_and_personal_care', sub: 'nail_studio' },
  skincare: { cat: 'beauty_and_personal_care', sub: 'skin_care_clinic' },

  // Fashion & Apparel
  boutique: { cat: 'fashion_and_apparel', sub: 'boutique' },
  saree: { cat: 'fashion_and_apparel', sub: 'saree_store' },
  clothing: { cat: 'fashion_and_apparel', sub: 'clothing_store' },
  kidswear: { cat: 'fashion_and_apparel', sub: 'kids_wear_shop' },
  footwear: { cat: 'fashion_and_apparel', sub: 'footwear_store' },
  tailor: { cat: 'fashion_and_apparel', sub: 'tailoring_shop' },
  jewel: { cat: 'fashion_and_apparel', sub: 'jewelry_shop' },
  
  // Electronics
  mobile: { cat: 'electronics_and_technology', sub: 'mobile_store' },
  mobilerepair: { cat: 'electronics_and_technology', sub: 'mobile_repair_shop' },
  computer: { cat: 'electronics_and_technology', sub: 'computer_store' },
  laptop: { cat: 'electronics_and_technology', sub: 'laptop_store' },
  electronic: { cat: 'electronics_and_technology', sub: 'electronics_store' },
  gaming: { cat: 'electronics_and_technology', sub: 'gaming_store' },

  // Home & Living
  furniture: { cat: 'home_and_living', sub: 'furniture_store' },
  homedecor: { cat: 'home_and_living', sub: 'home_decor' },
  kitchen: { cat: 'home_and_living', sub: 'kitchenware' },
  hardware: { cat: 'home_and_living', sub: 'hardware_shop' },
  paint: { cat: 'home_and_living', sub: 'paint_store' },
  interior: { cat: 'home_and_living', sub: 'interior_design' },

  // Gym & Fitness
  gym: { cat: 'fitness_and_sports', sub: 'gym' },
  yoga: { cat: 'fitness_and_sports', sub: 'yoga_center' },
  fitness: { cat: 'fitness_and_sports', sub: 'fitness_studio' },
  dance: { cat: 'fitness_and_sports', sub: 'dance_academy' },
  
  // Real Estate
  realestate: { cat: 'construction_and_real_estate', sub: 'real_estate' },
  construction: { cat: 'construction_and_real_estate', sub: 'construction' },
  architect: { cat: 'construction_and_real_estate', sub: 'architect' }
};

function identifyTemplatePath(businessType) {
  const sanitizedType = sanitizeString(businessType);
  
  // First, check exact matches
  for (const [key, val] of Object.entries(CATEGORY_MAP)) {
    if (sanitizedType.includes(key)) {
      return val;
    }
  }

  // Fallback to a generic default if no match is found
  return { cat: 'creative_services', sub: 'freelancer' };
}

function loadVariantJSON(cat, sub, variantName) {
  try {
    const filePath = path.join(TEMPLATES_DIR, cat, sub, `${variantName}.json`);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Failed to load template ${variantName} for ${cat}/${sub}:`, err);
  }
  return null;
}

// Recursive placeholder replacer for content customization based on user's category
function customizeTemplateContent(obj, businessType, subcategoryName) {
  if (typeof obj === 'string') {
    let customized = obj;
    if (subcategoryName) {
      const subRegex = new RegExp(subcategoryName, 'gi');
      customized = customized.replace(subRegex, businessType);
    }
    customized = customized.replace(/Freelancer/gi, businessType);
    return customized;
  } else if (Array.isArray(obj)) {
    return obj.map(item => customizeTemplateContent(item, businessType, subcategoryName));
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const [key, val] of Object.entries(obj)) {
      newObj[key] = customizeTemplateContent(val, businessType, subcategoryName);
    }
    return newObj;
  }
  return obj;
}

async function generateThreeVariations(businessData) {
  const businessType = businessData.type || "Retail Shop";
  
  console.log(`[Template Engine] Identifying template category for business type: "${businessType}"`);
  const match = identifyTemplatePath(businessType);
  console.log(`[Template Engine] Matched category: ${match.cat}, subcategory: ${match.sub}`);

  const variants = ['modern', 'luxury', 'minimal'];
  
  const results = [];
  
  for (const variant of variants) {
    // Load pre-generated static JSON from the 640 templates library
    let loadedJson = loadVariantJSON(match.cat, match.sub, variant);
    
    // If not found, use our creative fallback
    if (!loadedJson) {
      console.warn(`[Template Engine] Variant ${variant} not found. Falling back.`);
      loadedJson = loadVariantJSON('creative_services', 'freelancer', variant);
    }

    // Deep clone before customizing to avoid mutating cache
    let websiteJson = JSON.parse(JSON.stringify(loadedJson));

    // Customize template copy with user's business type
    const subName = match.sub ? match.sub.replace(/_/g, ' ') : '';
    websiteJson = customizeTemplateContent(websiteJson, businessType, subName);

    // Dynamic injections - override generic template strings with user's specific inputs
    if (websiteJson && websiteJson.globalSettings) {
      websiteJson.globalSettings.businessName = businessData.name || websiteJson.globalSettings.businessName;
      if (businessData.whatsappEnabled !== undefined) {
        websiteJson.globalSettings.whatsappButton = businessData.whatsappEnabled;
      }
      if (businessData.whatsappNumber) {
        websiteJson.globalSettings.whatsappNumber = businessData.whatsappNumber;
      }
    }

    // Create the required meta format for the API response
    results.push({
      id: variant,
      name: `Version ${results.length + 1}: ${variant.charAt(0).toUpperCase() + variant.slice(1)} Aesthetic`,
      tagline: `A beautifully crafted template optimized for ${businessType}.`,
      websiteJson: websiteJson.websiteJson ? websiteJson.websiteJson : websiteJson
    });
  }

  return results;
}

module.exports = {
  generateThreeVariations
};
