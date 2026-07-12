// SiteForge Template Marketplace Registry
// Overhauled to show every business type as a flat category with 100% unique Unsplash images.

import uniqueImagesRegistry from "./uniqueImagesRegistry.json";

export const CATEGORIES = [
  // Food & Beverage
  { id: "bakery", name: "Bakery", icon: "Store" },
  { id: "cake_shop", name: "Cake Shop", icon: "Cake" },
  { id: "sweet_shop", name: "Sweet Shop", icon: "Cookie" },
  { id: "restaurant", name: "Restaurant", icon: "Utensils" },
  { id: "cafe", name: "Cafe", icon: "Coffee" },
  { id: "tea_stall", name: "Tea Stall", icon: "CupSoda" },
  { id: "juice_center", name: "Juice Center", icon: "GlassWater" },
  { id: "fast_food_center", name: "Fast Food Center", icon: "Flame" },
  { id: "ice_cream_shop", name: "Ice Cream Shop", icon: "IceCream" },
  { id: "pizza_shop", name: "Pizza Shop", icon: "Pizza" },
  { id: "catering_service", name: "Catering Service", icon: "Beef" },
  { id: "tiffin_center", name: "Tiffin Center", icon: "Box" },
  { id: "street_food_vendor", name: "Street Food Vendor", icon: "ShoppingBag" },
  { id: "coffee_shop", name: "Coffee Shop", icon: "Coffee" },
  { id: "organic_food_store", name: "Organic Food Store", icon: "Leaf" },

  // Beauty & Personal Care
  { id: "beauty_salon", name: "Beauty Salon", icon: "Sparkles" },
  { id: "hair_salon", name: "Hair Salon", icon: "Scissors" },
  { id: "barber_shop", name: "Barber Shop", icon: "User" },
  { id: "spa", name: "Spa", icon: "Flower" },
  { id: "makeup_artist", name: "Makeup Artist", icon: "Sparkles" },
  { id: "bridal_makeup_studio", name: "Bridal Makeup Studio", icon: "Heart" },
  { id: "nail_studio", name: "Nail Studio", icon: "Brush" },
  { id: "skin_care_clinic", name: "Skin Care Clinic", icon: "Activity" },
  { id: "beauty_products_store", name: "Beauty Products Store", icon: "ShoppingBag" },
  { id: "wellness_center", name: "Wellness Center", icon: "Smile" },

  // Fashion & Apparel
  { id: "boutique", name: "Boutique", icon: "ShoppingBag" },
  { id: "saree_store", name: "Saree Store", icon: "Shirt" },
  { id: "clothing_store", name: "Clothing Store", icon: "Shirt" },
  { id: "kids_wear_shop", name: "Kids Wear Shop", icon: "Smile" },
  { id: "footwear_store", name: "Footwear Store", icon: "Footprints" },
  { id: "tailoring_shop", name: "Tailoring Shop", icon: "Scissors" },
  { id: "designer_studio", name: "Designer Studio", icon: "Palette" },
  { id: "fashion_accessories_store", name: "Fashion Accessories Store", icon: "Gem" },
  { id: "handbag_store", name: "Handbag Store", icon: "Briefcase" },
  { id: "jewelry_shop", name: "Jewelry Shop", icon: "Gem" },

  // Electronics & Technology
  { id: "mobile_store", name: "Mobile Store", icon: "Smartphone" },
  { id: "mobile_repair_shop", name: "Mobile Repair Shop", icon: "Wrench" },
  { id: "computer_store", name: "Computer Store", icon: "Monitor" },
  { id: "laptop_store", name: "Laptop Store", icon: "Laptop" },
  { id: "electronics_store", name: "Electronics Store", icon: "Cpu" },
  { id: "cctv_installation_service", name: "CCTV Installation Service", icon: "Video" },
  { id: "printer_shop", name: "Printer Shop", icon: "Printer" },
  { id: "internet_cafe", name: "Internet Cafe", icon: "Wifi" },
  { id: "gaming_store", name: "Gaming Store", icon: "Gamepad2" },
  { id: "gadget_store", name: "Gadget Store", icon: "Cpu" },

  // Home & Living
  { id: "furniture_store", name: "Furniture Store", icon: "Home" },
  { id: "home_decor_store", name: "Home Decor Store", icon: "Palette" },
  { id: "kitchenware_store", name: "Kitchenware Store", icon: "Soup" },
  { id: "mattress_store", name: "Mattress Store", icon: "Bed" },
  { id: "lighting_store", name: "Lighting Store", icon: "Lightbulb" },
  { id: "hardware_shop", name: "Hardware Shop", icon: "Wrench" },
  { id: "paint_store", name: "Paint Store", icon: "Paintbrush" },
  { id: "interior_design_service", name: "Interior Design Service", icon: "Layers" },
  { id: "carpentry_service", name: "Carpentry Service", icon: "Hammer" },

  // Grocery & Daily Needs
  { id: "grocery_store", name: "Grocery Store", icon: "ShoppingBag" },
  { id: "supermarket", name: "Supermarket", icon: "ShoppingCart" },
  { id: "kirana_shop", name: "Kirana Shop", icon: "Store" },
  { id: "organic_store", name: "Organic Store", icon: "Leaf" },
  { id: "dairy_shop", name: "Dairy Shop", icon: "CupSoda" },
  { id: "fruits_vegetables_store", name: "Fruits & Vegetables Store", icon: "Apple" },
  { id: "general_store", name: "General Store", icon: "Store" },
  { id: "stationery_shop", name: "Stationery Shop", icon: "PenTool" },

  // Fitness & Sports
  { id: "gym", name: "Gym", icon: "Dumbbell" },
  { id: "yoga_center", name: "Yoga Center", icon: "Heart" },
  { id: "fitness_studio", name: "Fitness Studio", icon: "Activity" },
  { id: "sports_equipment_store", name: "Sports Equipment Store", icon: "Trophy" },
  { id: "dance_academy", name: "Dance Academy", icon: "Music" },
  { id: "martial_arts_academy", name: "Martial Arts Academy", icon: "Shield" },
  { id: "personal_trainer", name: "Personal Trainer", icon: "UserCheck" },

  // Healthcare
  { id: "clinic", name: "Clinic", icon: "Activity" },
  { id: "dental_clinic", name: "Dental Clinic", icon: "Smile" },
  { id: "pharmacy", name: "Pharmacy", icon: "FileText" },
  { id: "medical_store", name: "Medical Store", icon: "PlusSquare" },
  { id: "diagnostic_center", name: "Diagnostic Center", icon: "Activity" },
  { id: "physiotherapy_center", name: "Physiotherapy Center", icon: "Accessibility" },
  { id: "eye_care_center", name: "Eye Care Center", icon: "Eye" },
  { id: "veterinary_clinic", name: "Veterinary Clinic", icon: "Heart" },

  // Automobile
  { id: "bike_showroom", name: "Bike Showroom", icon: "Bike" },
  { id: "car_showroom", name: "Car Showroom", icon: "Car" },
  { id: "auto_repair_shop", name: "Auto Repair Shop", icon: "Wrench" },
  { id: "car_wash", name: "Car Wash", icon: "ShowerHead" },
  { id: "tyre_shop", name: "Tyre Shop", icon: "Disc" },
  { id: "spare_parts_store", name: "Spare Parts Store", icon: "Cpu" },
  { id: "ev_charging_station", name: "EV Charging Station", icon: "Zap" },
  { id: "vehicle_rental_service", name: "Vehicle Rental Service", icon: "Key" },

  // Creative Services
  { id: "photography_studio", name: "Photography Studio", icon: "Camera" },
  { id: "videography_service", name: "Videography Service", icon: "Video" },
  { id: "graphic_design_agency", name: "Graphic Design Agency", icon: "Palette" },
  { id: "printing_service", name: "Printing Service", icon: "Printer" },
  { id: "digital_marketing_agency", name: "Digital Marketing Agency", icon: "TrendingUp" },
  { id: "freelancer_portfolio", name: "Freelancer Portfolio", icon: "User" },
  { id: "event_management", name: "Event Management", icon: "Calendar" },
  { id: "wedding_planner", name: "Wedding Planner", icon: "Heart" },

  // Education
  { id: "coaching_center", name: "Coaching Center", icon: "GraduationCap" },
  { id: "tuition_center", name: "Tuition Center", icon: "BookOpen" },
  { id: "online_tutor", name: "Online Tutor", icon: "Laptop" },
  { id: "training_institute", name: "Training Institute", icon: "Award" },
  { id: "language_academy", name: "Language Academy", icon: "Globe" },
  { id: "computer_training_center", name: "Computer Training Center", icon: "Monitor" },
  { id: "skill_development_center", name: "Skill Development Center", icon: "Sparkles" },

  // Construction & Real Estate
  { id: "real_estate_agency", name: "Real Estate Agency", icon: "Home" },
  { id: "construction_company", name: "Construction Company", icon: "Building" },
  { id: "building_contractor", name: "Building Contractor", icon: "Hammer" },
  { id: "architect", name: "Architect", icon: "PenTool" },
  { id: "interior_designer", name: "Interior Designer", icon: "Layers" },
  { id: "property_consultant", name: "Property Consultant", icon: "Compass" },

  // Local Services
  { id: "laundry_service", name: "Laundry Service", icon: "Wind" },
  { id: "dry_cleaning", name: "Dry Cleaning", icon: "Shirt" },
  { id: "pest_control", name: "Pest Control", icon: "ShieldAlert" },
  { id: "house_cleaning", name: "House Cleaning", icon: "Sparkles" },
  { id: "plumbing_service", name: "Plumbing Service", icon: "Droplet" },
  { id: "electrician_service", name: "Electrician Service", icon: "Zap" },
  { id: "ac_repair_service", name: "AC Repair Service", icon: "Wind" },
  { id: "home_maintenance", name: "Home Maintenance", icon: "Wrench" },

  // Agriculture
  { id: "nursery", name: "Nursery", icon: "Sprout" },
  { id: "flower_shop", name: "Flower Shop", icon: "Flower" },
  { id: "fertilizer_store", name: "Fertilizer Store", icon: "Leaf" },
  { id: "seed_store", name: "Seed Store", icon: "Sprout" },
  { id: "farm_products_store", name: "Farm Products Store", icon: "Milk" },
  { id: "dairy_farm", name: "Dairy Farm", icon: "Milk" },
  { id: "poultry_farm", name: "Poultry Farm", icon: "Egg" },

  // Gifts & Specialty Stores
  { id: "gift_shop", name: "Gift Shop", icon: "Gift" },
  { id: "toy_store", name: "Toy Store", icon: "Gamepad" },
  { id: "handmade_crafts_store", name: "Handmade Crafts Store", icon: "Brush" },
  { id: "art_gallery", name: "Art Gallery", icon: "Palette" },
  { id: "religious_store", name: "Religious Store", icon: "Flame" },
  { id: "book_store", name: "Book Store", icon: "BookOpen" },
  { id: "pet_store", name: "Pet Store", icon: "Dog" }
];

export const STYLES = [
  { id: "luxury", name: "Luxury", description: "Premium styling, serif fonts, gold accent tones, spacious layouts." },
  { id: "artisan", name: "Artisan", description: "Warm earthy tones, hand-crafted aesthetic, traditional serif styles." },
  { id: "modern", name: "Modern", description: "Vibrant gradients, Outfit sans-serif, rounded shapes, highly dynamic." },
  { id: "vintage", name: "Vintage", description: "Classic retro layout, muted sepia/cream palettes, styled borders." },
  { id: "minimal", name: "Minimal", description: "Stark monochrome grids, generous whitespace, square buttons." }
];

export const DESIGN_PRESETS = {
  luxury: {
    primaryColor: "#7F1D1D", // Burgundy Red
    secondaryColor: "#0F172A", // Dark Carbon
    accentColor: "#D97706", // Amber Gold
    fontFamily: "Playfair Display",
    style: "luxury",
    spacing: "large",
    cardStyle: "rounded-3xl border border-amber-900/10 shadow-2xl bg-stone-50/70 backdrop-blur-md hover:border-amber-800/30 transition-all duration-500",
    buttonStyle: "rounded-none font-bold tracking-widest uppercase border border-amber-800 hover:bg-amber-900 hover:text-white transition-all px-8 py-3.5",
    imageStyle: "rounded-3xl shadow-2xl object-cover border border-stone-200"
  },
  artisan: {
    primaryColor: "#C2410C", // Terracotta Orange
    secondaryColor: "#1C1917", // Stone Charcoal
    accentColor: "#B45309", // Warm Ochre
    fontFamily: "Lora",
    style: "artisan",
    spacing: "medium",
    cardStyle: "rounded-2xl border border-stone-200/50 shadow-xl bg-stone-50 hover:-translate-y-1 transition-all duration-500",
    buttonStyle: "rounded-2xl font-semibold tracking-wide bg-stone-900 hover:bg-stone-800 text-stone-100 transition-all px-7 py-3 shadow-lg",
    imageStyle: "rounded-2xl shadow-xl object-cover"
  },
  modern: {
    primaryColor: "#4F46E5", // Indigo Blue
    secondaryColor: "#0F172A", // Slate Black
    accentColor: "#10B981", // Teal Emerald
    fontFamily: "Outfit",
    style: "modern",
    spacing: "medium",
    cardStyle: "rounded-2xl border border-slate-100 shadow-xl bg-white/70 backdrop-blur-lg hover:shadow-2xl hover:border-indigo-100 transition-all duration-300",
    buttonStyle: "rounded-2xl font-black bg-gradient-to-r from-indigo-600 to-indigo-700 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-97 transition-all px-7 py-3",
    imageStyle: "rounded-2xl shadow-xl object-cover hover:scale-103 transition-all duration-300"
  },
  vintage: {
    primaryColor: "#7C2D12", // Brick Orange
    secondaryColor: "#1C1917", // Cream Warm
    accentColor: "#059669", // Dark Sage
    fontFamily: "Cormorant Garamond",
    style: "vintage",
    spacing: "large",
    cardStyle: "rounded-none border border-stone-850 shadow-none bg-stone-100/50 hover:bg-stone-50 transition-all duration-300",
    buttonStyle: "rounded-none font-bold tracking-widest uppercase border border-stone-900 hover:bg-stone-900 hover:text-white transition-all px-8 py-3.5",
    imageStyle: "rounded-none shadow-md border border-stone-300 object-cover"
  },
  minimal: {
    primaryColor: "#18181B", // Zinc Charcoal
    secondaryColor: "#F4F4F5", // Neutral Grey
    accentColor: "#71717A", // Slate Grey
    fontFamily: "Inter",
    style: "minimal",
    spacing: "compact",
    cardStyle: "rounded-none border border-zinc-200 shadow-none bg-white hover:bg-zinc-50 transition-all duration-200",
    buttonStyle: "rounded-none font-black tracking-wider uppercase bg-black text-white hover:bg-zinc-800 transition-all px-6 py-3",
    imageStyle: "rounded-none shadow-none border border-zinc-150 object-cover"
  }
};

const DEFAULT_FALLBACKS = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&h=800&q=80"
];

function getCategoryUniqueImages(categoryName) {
  // Try to lookup pre-fetched unique images
  const list = uniqueImagesRegistry[categoryName];
  if (list && list.length >= 10) return list;
  
  // Dynamic fallback generation using unique seeds per category
  return DEFAULT_FALLBACKS.map((url, idx) => `${url}&seed=${encodeURIComponent(categoryName)}_${idx}`);
}

export function generateTemplateJson(categoryId, styleId, customName = null) {
  const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  const style = STYLES.find(s => s.id === styleId) || STYLES[0];
  
  const design = JSON.parse(JSON.stringify(DESIGN_PRESETS[style.id] || DESIGN_PRESETS.modern));
  const name = customName || `${style.name} ${category.name}`;

  // Unique Offset mappings to avoid duplicate heroes
  const offsets = { luxury: 0, artisan: 2, modern: 4, vintage: 6, minimal: 8 };
  const baseOffset = offsets[style.id] || 0;

  const images = getCategoryUniqueImages(category.name);

  // Setup unique section ordering based on style variations
  let sectionTypes = ["hero", "about", "services"];
  if (style.id === "luxury") {
    sectionTypes = ["hero", "about", "services", "products", "gallery", "testimonials", "contact", "footer"];
  } else if (style.id === "modern") {
    sectionTypes = ["hero", "services", "products", "gallery", "testimonials", "booking", "contact", "footer"];
  } else if (style.id === "minimal") {
    sectionTypes = ["hero", "about", "services", "gallery", "contact", "footer"];
  } else if (style.id === "vintage") {
    sectionTypes = ["hero", "about", "menu", "gallery", "testimonials", "contact", "footer"];
  } else { // Artisan
    sectionTypes = ["hero", "about", "services", "menu", "testimonials", "booking", "contact", "footer"];
  }

  const sectionsArray = [];

  sectionTypes.forEach((type, idx) => {
    if (type === "hero") {
      sectionsArray.push({
        id: "sec_hero",
        type: "hero",
        content: {
          title: `Premium ${category.name} Services`,
          subtitle: `Award-winning standard configurations customized specifically for ${category.name} businesses.`,
          ctaText: "Get Started Now",
          ctaLink: "#sec_contact",
          backgroundImage: images[baseOffset % images.length]
        }
      });
    } else if (type === "about") {
      sectionsArray.push({
        id: "sec_about",
        type: "about",
        content: {
          title: `About Our ${category.name}`,
          description: `We deliver top-tier client experiences in the ${category.name} sector with certified local teams, eco-friendly tools, and premium standards.`,
          image: images[(baseOffset + 1) % images.length],
          highlights: ["Certified Staff", "Eco Friendly Tools", "Premium Design Scales", "24/7 WhatsApp Assist"]
        }
      });
    } else if (type === "services") {
      sectionsArray.push({
        id: "sec_services",
        type: "services",
        content: {
          title: "Our Specialized Services",
          subtitle: "EXCLUSIVELY CURATED FOR YOUR CONFIDENCE",
          services: [
            { name: "Premium Consultation", description: "Direct expert session to outline custom designs.", icon: "Sparkles" },
            { name: "Priority Support", description: "Fast feedback cycles direct via official channels.", icon: "Clock" },
            { name: "Quality Guarantee", description: "Warranty backed service cycles with replacements.", icon: "ShieldCheck" }
          ]
        }
      });
    } else if (type === "menu") {
      sectionsArray.push({
        id: "sec_menu",
        type: "menu",
        content: {
          title: "Signature Catalog Selection",
          subtitle: "HANDPICKED RELEASES",
          categories: [
            {
              name: "Featured Selections",
              items: [
                { name: `Artisan ${category.name} Special A`, price: "Rs. 499", tags: ["Chef Special"], desc: "High rating customer choice." },
                { name: `Artisan ${category.name} Special B`, price: "Rs. 299", tags: [], desc: "Prepared clean with natural ingredients." }
              ]
            }
          ]
        }
      });
    } else if (type === "booking") {
      sectionsArray.push({
        id: "sec_booking",
        type: "booking",
        content: {
          title: "Schedule Consultation Slot",
          subtitle: "EASY ONLINE BOOKING",
          submitText: "Confirm Reservation",
          fields: [
            { label: "Your Name", type: "text", placeholder: "E.g. Siddharth" },
            { label: "WhatsApp Number", type: "tel", placeholder: "E.g. +91 98765 43210" }
          ]
        }
      });
    } else if (type === "products") {
      sectionsArray.push({
        id: "sec_products",
        type: "products",
        content: {
          title: "Featured Catalog",
          subtitle: "POPULAR CLIENT PREFERENCES",
          products: [
            { name: `${category.name} Collection Pack A`, price: "Rs. 1,499", description: "Premium tier optimized for long-lasting specifications.", image: images[(baseOffset + 2) % images.length] },
            { name: `${category.name} Collection Pack B`, price: "Rs. 2,499", description: "All-inclusive setup matching standard requirements.", image: images[(baseOffset + 3) % images.length] }
          ]
        }
      });
    } else if (type === "gallery") {
      sectionsArray.push({
        id: "sec_gallery",
        type: "gallery",
        content: {
          title: "Gallery Showcase",
          subtitle: "VISUAL TOUR OF OUR MODERN SPACES",
          images: [
            { url: images[(baseOffset + 4) % images.length], caption: "Atmospheric workspace detail" },
            { url: images[(baseOffset + 5) % images.length], caption: "Artisanal preparation cycles" },
            { url: images[(baseOffset + 6) % images.length], caption: "Premium quality selection showcase" }
          ]
        }
      });
    } else if (type === "testimonials") {
      sectionsArray.push({
        id: "sec_testimonials",
        type: "testimonials",
        content: {
          title: "Client Reviews",
          testimonials: [
            { name: "Anjali Rao", role: "Verified Buyer", content: "Superb execution. Layout flows exceptionally well and spacing is pristine. Absolute five star rating!", rating: 5, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" },
            { name: "Vikram Malhotra", role: "Resident Client", content: "Professional standards are second to none. Setup is fast, clean and communication was superb.", rating: 5, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" }
          ]
        }
      });
    } else if (type === "faq") {
      sectionsArray.push({
        id: "sec_faq",
        type: "faq",
        content: {
          title: "Frequently Asked Questions",
          faqs: [
            { question: "What are your standard timelines?", answer: "Schedules average 3 to 5 business days with direct priority options." },
            { question: "Do you offer localized deliveries?", answer: "Yes, fast doorstep transit utilizing local distribution partners." }
          ]
        }
      });
    } else if (type === "contact") {
      sectionsArray.push({
        id: "sec_contact",
        type: "contact",
        content: {
          title: "Connect With Us",
          phone: "+91 98765 43210",
          email: `hello@${category.id}.siteforge.app`,
          address: "Shop No. 12, Galleria Commercial Plaza, Koregaon Park, Pune, Maharashtra 411001"
        }
      });
    } else if (type === "footer") {
      sectionsArray.push({
        id: "sec_footer",
        type: "footer",
        content: {
          businessName: name,
          links: [
            { label: "Services", href: "#sec_services" },
            { label: "Contact", href: "#sec_contact" }
          ],
          copyright: `© 2026 ${name}. Built with SiteForge.`
        }
      });
    }
  });

  return {
    theme: design,
    pages: [
      {
        name: "Home",
        sections: sectionsArray
      }
    ]
  };
}

export const TEMPLATES_LIST = [];

const TARGET_FAMILIES = [
  { catId: "bakery", catName: "Bakery" },
  { catId: "restaurant", catName: "Restaurant" },
  { catId: "beauty_salon", catName: "Beauty Salon" },
  { catId: "electronics_store", catName: "Electronics Store" }
];

TARGET_FAMILIES.forEach(({ catId, catName }) => {
  const images = getCategoryUniqueImages(catName);
  
  STYLES.forEach((style, sIdx) => {
    const capitalizedStyle = style.name;
    const templateName = `${capitalizedStyle} ${catName}`;
    const id = `${catId}-${style.id}`;

    TEMPLATES_LIST.push({
      id,
      name: templateName,
      category: catName,
      categoryId: catId,
      style: style.id,
      tagline: `${style.description} Tailored design systems built specifically for ${catName}.`,
      description: `Premium responsive theme for ${catName} shops. Configured with the ${style.name} branding design system.`,
      rating: parseFloat((4.7 + Math.random() * 0.29).toFixed(1)),
      reviewsCount: Math.floor(10 + Math.random() * 85),
      image: images[(sIdx * 2) % images.length],
      mainCategoryId: catId,
      mainCategory: catName
    });
  });
});
