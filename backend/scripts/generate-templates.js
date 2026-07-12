const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../src/ai-engine/templates');

// Utility to create directory if not exists
function ensureDirSync(dirpath) {
  if (!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath, { recursive: true });
  }
}

const VARIANTS = ['modern', 'luxury', 'minimal', 'vibrant', 'elegant'];

const CATEGORIES = {
  FOOD_AND_BEVERAGE: {
    subs: ['Bakery', 'Cake Shop', 'Sweet Shop', 'Restaurant', 'Cafe', 'Tea Stall', 'Juice Center', 'Fast Food Center', 'Ice Cream Shop', 'Pizza Shop', 'Catering Service', 'Tiffin Center', 'Street Food Vendor', 'Coffee Shop', 'Organic Food Store'],
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1414235077428-338988a2e8c0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#EA580C", secondary: "#1C1917", accent: "#F97316" },
      { primary: "#7F1D1D", secondary: "#1C1917", accent: "#B91C1C" },
      { primary: "#16A34A", secondary: "#F0FDF4", accent: "#22C55E" }
    ]
  },
  BEAUTY_AND_PERSONAL_CARE: {
    subs: ['Beauty Salon', 'Hair Salon', 'Barber Shop', 'Spa', 'Makeup Artist', 'Bridal Makeup Studio', 'Nail Studio', 'Skin Care Clinic', 'Beauty Products Store', 'Wellness Center'],
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516975080661-46bfa20281ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#EC4899", secondary: "#FDF2F8", accent: "#F43F5E" },
      { primary: "#4C1D95", secondary: "#F5F3FF", accent: "#7C3AED" },
      { primary: "#BE185D", secondary: "#FFF1F2", accent: "#E11D48" }
    ]
  },
  FASHION_AND_APPAREL: {
    subs: ['Boutique', 'Saree Store', 'Clothing Store', 'Kids Wear Shop', 'Footwear Store', 'Tailoring Shop', 'Designer Studio', 'Fashion Accessories Store', 'Handbag Store', 'Jewelry Shop'],
    images: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#1E293B", secondary: "#F8FAFC", accent: "#475569" },
      { primary: "#9D174D", secondary: "#FCE7F3", accent: "#BE185D" },
      { primary: "#111827", secondary: "#F9FAFB", accent: "#374151" }
    ]
  },
  ELECTRONICS_AND_TECHNOLOGY: {
    subs: ['Mobile Store', 'Mobile Repair Shop', 'Computer Store', 'Laptop Store', 'Electronics Store', 'CCTV Installation', 'Printer Shop', 'Internet Cafe', 'Gaming Store', 'Gadget Store'],
    images: [
      "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550009158-9effb61970eb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531297422396-857c6b541334?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496181130204-7552cc145cdb?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#2563EB", secondary: "#EFF6FF", accent: "#3B82F6" },
      { primary: "#0F172A", secondary: "#F1F5F9", accent: "#1E293B" },
      { primary: "#0369A1", secondary: "#F0F9FF", accent: "#0EA5E9" }
    ]
  },
  HOME_AND_LIVING: {
    subs: ['Furniture Store', 'Home Decor', 'Kitchenware', 'Mattress Store', 'Lighting Store', 'Hardware Shop', 'Paint Store', 'Interior Design', 'Carpentry'],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#78350F", secondary: "#FFFBEB", accent: "#92400E" },
      { primary: "#3F6212", secondary: "#F7FEE7", accent: "#4D7C0F" },
      { primary: "#1C1917", secondary: "#FAFAF9", accent: "#44403C" }
    ]
  },
  GROCERY_AND_DAILY_NEEDS: {
    subs: ['Grocery Store', 'Supermarket', 'Kirana Shop', 'Organic Store', 'Dairy Shop', 'Fruit Store', 'General Store', 'Stationery Shop'],
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#15803D", secondary: "#F0FDF4", accent: "#16A34A" },
      { primary: "#B45309", secondary: "#FFFBEB", accent: "#D97706" },
      { primary: "#047857", secondary: "#ECFDF5", accent: "#059669" }
    ]
  },
  FITNESS_AND_SPORTS: {
    subs: ['Gym', 'Yoga Center', 'Fitness Studio', 'Sports Equipment', 'Dance Academy', 'Martial Arts', 'Personal Trainer'],
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#B91C1C", secondary: "#FEF2F2", accent: "#EF4444" },
      { primary: "#111827", secondary: "#F9FAFB", accent: "#374151" },
      { primary: "#0369A1", secondary: "#F0F9FF", accent: "#0EA5E9" }
    ]
  },
  HEALTHCARE: {
    subs: ['Clinic', 'Dental Clinic', 'Pharmacy', 'Medical Store', 'Diagnostic Center', 'Physiotherapy', 'Eye Care', 'Veterinary'],
    images: [
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#0F766E", secondary: "#F0FDFA", accent: "#14B8A6" },
      { primary: "#1D4ED8", secondary: "#EFF6FF", accent: "#2563EB" },
      { primary: "#0369A1", secondary: "#F0F9FF", accent: "#0EA5E9" }
    ]
  },
  AUTOMOBILE: {
    subs: ['Bike Showroom', 'Car Showroom', 'Repair Shop', 'Car Wash', 'Tyre Shop', 'Spare Parts', 'EV Charging', 'Vehicle Rental'],
    images: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503376712351-1c4b9b9a67a0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#B91C1C", secondary: "#FEF2F2", accent: "#DC2626" },
      { primary: "#1F2937", secondary: "#F3F4F6", accent: "#374151" },
      { primary: "#0F172A", secondary: "#F8FAFC", accent: "#334155" }
    ]
  },
  CREATIVE_SERVICES: {
    subs: ['Photography', 'Videography', 'Graphic Design', 'Printing Service', 'Marketing Agency', 'Freelancer', 'Event Management', 'Wedding Planner'],
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#6D28D9", secondary: "#F5F3FF", accent: "#8B5CF6" },
      { primary: "#BE185D", secondary: "#FDF2F8", accent: "#DB2777" },
      { primary: "#0F172A", secondary: "#F1F5F9", accent: "#1E293B" }
    ]
  },
  EDUCATION: {
    subs: ['Coaching Center', 'Tuition Center', 'Online Tutor', 'Training Institute', 'Language Academy', 'Computer Training', 'Skill Development'],
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9a27b1ce77?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#1D4ED8", secondary: "#EFF6FF", accent: "#2563EB" },
      { primary: "#0F766E", secondary: "#F0FDFA", accent: "#14B8A6" },
      { primary: "#4338CA", secondary: "#EEF2FF", accent: "#4F46E5" }
    ]
  },
  CONSTRUCTION_AND_REAL_ESTATE: {
    subs: ['Real Estate', 'Construction', 'Contractor', 'Architect', 'Interior Designer', 'Property Consultant'],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541888081622-19e34e5db894?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#1E3A8A", secondary: "#EFF6FF", accent: "#2563EB" },
      { primary: "#3F3F46", secondary: "#F4F4F5", accent: "#52525B" },
      { primary: "#9A3412", secondary: "#FFF7ED", accent: "#C2410C" }
    ]
  },
  LOCAL_SERVICES: {
    subs: ['Laundry', 'Dry Cleaning', 'Pest Control', 'House Cleaning', 'Plumbing', 'Electrician', 'AC Repair', 'Home Maintenance'],
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80" // Note: can diversify later
    ],
    themes: [
      { primary: "#0284C7", secondary: "#F0F9FF", accent: "#0EA5E9" },
      { primary: "#047857", secondary: "#ECFDF5", accent: "#10B981" },
      { primary: "#1E293B", secondary: "#F8FAFC", accent: "#475569" }
    ]
  },
  AGRICULTURE: {
    subs: ['Nursery', 'Flower Shop', 'Fertilizer Store', 'Seed Store', 'Farm Products', 'Dairy Farm', 'Poultry Farm'],
    images: [
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1530836369250-ef71a3a5e4b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#15803D", secondary: "#F0FDF4", accent: "#16A34A" },
      { primary: "#854D0E", secondary: "#FEFCE8", accent: "#A16207" },
      { primary: "#166534", secondary: "#F0FDF4", accent: "#22C55E" }
    ]
  },
  GIFTS_AND_SPECIALTY: {
    subs: ['Gift Shop', 'Toy Store', 'Handmade Crafts', 'Art Gallery', 'Religious Store', 'Book Store', 'Pet Store'],
    images: [
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501726058097-40899cc35c36?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=800&q=80"
    ],
    themes: [
      { primary: "#9333EA", secondary: "#FAF5FF", accent: "#A855F7" },
      { primary: "#BE185D", secondary: "#FDF2F8", accent: "#DB2777" },
      { primary: "#0F766E", secondary: "#F0FDFA", accent: "#14B8A6" }
    ]
  }
};

const FONT_OPTIONS = ['Outfit', 'Inter', 'Playfair Display', 'Plus Jakarta Sans', 'Satoshi', 'Cinzel'];

function generateTemplate(mainCategory, subcategory, variantIndex) {
  const catData = CATEGORIES[mainCategory];
  const variant = VARIANTS[variantIndex];
  const theme = catData.themes[variantIndex % catData.themes.length];
  const font = FONT_OPTIONS[Math.floor(Math.random() * FONT_OPTIONS.length)];

  const safeSub = subcategory;

  const template = {
    id: `${mainCategory.toLowerCase()}_${subcategory.replace(/\s+/g, '_').toLowerCase()}_${variant}`,
    name: `${variant.charAt(0).toUpperCase() + variant.slice(1)} ${safeSub} Template`,
    category: mainCategory,
    subcategory: safeSub,
    websiteJson: {
      theme: {
        primaryColor: theme.primary,
        secondaryColor: theme.secondary,
        accentColor: theme.accent,
        fontFamily: font,
        style: variant,
        spacing: "medium"
      },
      globalSettings: {
        whatsappNumber: "+919876543210",
        whatsappButton: true,
        businessName: `Elite ${safeSub}`
      },
      pages: [
        { name: "Home", slug: "/" },
        { name: "Services", slug: "/services" },
        { name: "Contact", slug: "/contact" }
      ],
      sections: [
        {
          id: "hero-1",
          type: "hero",
          content: {
            title: `Experience the Best ${safeSub} Services`,
            subtitle: `Premium quality, expert craftsmanship, and unmatched dedication tailored specifically for your needs.`,
            ctaText: "Explore Now",
            ctaLink: "#services",
            backgroundImage: catData.images[0]
          }
        },
        {
          id: "about-1",
          type: "about",
          content: {
            title: `About Our ${safeSub}`,
            description: `We are dedicated to setting standard-setting quality in our local community. Every service is crafted meticulously, naturally sourced, and delivered daily with absolute passion.`,
            image: catData.images[1],
            highlights: ["100% Genuine Care", "Elite Local Team", "Standard-Setting Dedication", "Customer First"]
          }
        },
        {
          id: "services-1",
          type: "services",
          content: {
            title: `Our Specialised ${safeSub} Offerings`,
            subtitle: "Prepared with maximum dedication and premium standards",
            services: [
              { name: "Premium Advisory", description: "Get direct support from industry leaders tailored to your exact goal.", icon: "Sparkles" },
              { name: "Local On-Demand Delivery", description: "Freshly packaged orders delivered direct to your home with complete safety.", icon: "Clock" },
              { name: "Customer-First Support", description: "Connect with our representative anytime on WhatsApp for support.", icon: "Heart" }
            ]
          }
        },
        {
          id: "gallery-1",
          type: "gallery",
          content: {
            title: "Visual Gallery",
            subtitle: `A walkthrough of our premium spaces and ${safeSub} products`,
            images: [
              { url: catData.images[2], caption: "Elegance in Detail" },
              { url: catData.images[3], caption: "Prepared Fresh" },
              { url: catData.images[4], caption: "Standard of Perfection" }
            ]
          }
        },
        {
          id: "testimonials-1",
          type: "testimonials",
          content: {
            title: "Loved by Our Community",
            testimonials: [
              { name: "Anjali Rao", role: "Local Guide", content: `Absolutely exceptional experience. Their service is always professional and product quality is standard-setting!`, rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
              { name: "Vikram Malhotra", role: "Regular Client", content: `The absolute best in terms of reliability and product standards. Clean staff, fast response, and elite environment!`, rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" }
            ]
          }
        }
      ]
    }
  };

  return template;
}

async function main() {
  console.log("Starting SITEFORGE TEMPLATE EXPANSION PROGRAM...");
  ensureDirSync(OUTPUT_DIR);

  let totalGenerated = 0;

  for (const [mainCategory, data] of Object.entries(CATEGORIES)) {
    const categoryDir = path.join(OUTPUT_DIR, mainCategory.toLowerCase());
    ensureDirSync(categoryDir);

    for (const subcategory of data.subs) {
      const subDir = path.join(categoryDir, subcategory.replace(/\s+/g, '_').toLowerCase());
      ensureDirSync(subDir);

      for (let i = 0; i < VARIANTS.length; i++) {
        const templateData = generateTemplate(mainCategory, subcategory, i);
        const fileName = `${VARIANTS[i]}.json`;
        const filePath = path.join(subDir, fileName);

        fs.writeFileSync(filePath, JSON.stringify(templateData, null, 2));
        totalGenerated++;
      }
    }
    console.log(`Generated ${data.subs.length * 5} templates for ${mainCategory}`);
  }

  console.log(`\n==================================================`);
  console.log(`SUCCESS: Generated ${totalGenerated} templates across ${Object.keys(CATEGORIES).length} main categories.`);
  console.log(`Saved to: ${OUTPUT_DIR}`);
  console.log(`==================================================`);
}

main();
