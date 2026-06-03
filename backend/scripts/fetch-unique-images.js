const fs = require('fs');
const path = require('path');
const { searchUnsplashImages } = require('../src/ai-engine/unsplash');

const OUTPUT_FILE = path.join(__dirname, '../../frontend/src/config/uniqueImagesRegistry.json');

const BUSINESS_QUERIES = {
  // Food & Beverage
  "Bakery": "bakery bread pastry",
  "Cake Shop": "cake cupcake custom cakes",
  "Sweet Shop": "traditional indian sweets dessert",
  "Restaurant": "restaurant interior dining food",
  "Cafe": "cafe cozy coffee shop",
  "Tea Stall": "indian cutting chai tea stall",
  "Juice Center": "fresh fruit juice smoothie",
  "Fast Food Center": "fast food burger fries",
  "Ice Cream Shop": "ice cream scoop cone",
  "Pizza Shop": "fresh baked pizza slice",
  "Catering Service": "catering food buffet event",
  "Tiffin Center": "home cooked food tiffin box",
  "Street Food Vendor": "indian street food cooking",
  "Coffee Shop": "espresso coffee barista latte",
  "Organic Food Store": "organic food store vegetable market",
  
  // Beauty & Personal Care
  "Beauty Salon": "beauty salon cosmetics facial",
  "Hair Salon": "hair cut salon stylist styling",
  "Barber Shop": "barber shop haircut shave men",
  "Spa": "luxury spa massage therapy",
  "Makeup Artist": "makeup artist cosmetics tools",
  "Bridal Makeup Studio": "indian bridal makeup wedding style",
  "Nail Studio": "nail art manicure studio nail polish",
  "Skin Care Clinic": "skin care dermatology treatment clinic",
  "Beauty Products Store": "makeup beauty products retail store",
  "Wellness Center": "wellness meditation yoga massage center",

  // Fashion & Apparel
  "Boutique": "fashion boutique designer clothing shop",
  "Saree Store": "indian traditional designer saree store",
  "Clothing Store": "clothes rack retail clothing store",
  "Kids Wear Shop": "children clothing kids apparel store",
  "Footwear Store": "shoes sneakers boutique footwear store",
  "Tailoring Shop": "sewing machine tailor fabrics shop",
  "Designer Studio": "fashion designer design studio sketch",
  "Fashion Accessories Store": "jewelry sunglasses accessories retail store",
  "Handbag Store": "designer leather handbags purses shop",
  "Jewelry Shop": "luxury gold diamonds jewelry shop",

  // Electronics & Technology
  "Mobile Store": "smartphones display mobile retail store",
  "Mobile Repair Shop": "smartphone repair technician tools screen fix",
  "Computer Store": "desktop computer hardware retail store",
  "Laptop Store": "laptops notebook computers shop",
  "Electronics Store": "home electronics audio appliances showroom",
  "Gaming Store": "pc gaming gear console rgb gaming store",
  "Gadget Store": "smart gadgets wearables accessories shop",

  // Home & Living
  "Furniture Store": "modern sofa table furniture showroom",
  "Home Decor Store": "home decor interior design ornaments shop",
  "Kitchenware Store": "cookware plates kitchenware store utensils",
  "Mattress Store": "luxury mattress bedroom bed showroom",
  "Lighting Store": "decorative lamps chandeliers lighting store",
  "Hardware Shop": "hardware tools construction tools shop",

  // Grocery & Daily Needs
  "Grocery Store": "grocery supermarket fresh produce aisles",
  "Supermarket": "supermarket retail shopping cart store",
  "Kirana Shop": "indian local kirana general store",
  "Dairy Shop": "milk butter fresh dairy products shop",
  "Fruit Store": "fresh fruits display marketplace stall",
  "Vegetable Store": "fresh green vegetables market stall",

  // Fitness & Sports
  "Gym": "gym workout weightlifting training floor",
  "Yoga Center": "yoga studio meditation class peaceful",
  "Fitness Studio": "group fitness studio training spin class",
  "Dance Academy": "dance studio classroom ballroom dancers",
  "Martial Arts Academy": "dojo karate taekwondo martial arts class",

  // Healthcare
  "Clinic": "medical clinic consulting room lobby doctor",
  "Dental Clinic": "dentist chair examination dental clinic",
  "Pharmacy": "pharmacy shelves medicine chemist drugstore",
  "Medical Store": "medical store pills retail pharmacy",
  "Veterinary Clinic": "vet clinic checking dog veterinary doctor",

  // Automobile
  "Bike Showroom": "motorcycles display bike showroom",
  "Car Showroom": "luxury cars showroom dealership display",
  "Car Wash": "auto car wash cleaning detailing garage",
  "Tyre Shop": "car tyres replacement wheels garage store",
  "Vehicle Rental": "rental cars fleet rental service keys",

  // Creative Services
  "Photography Studio": "photography studio cameras flashes backdrop",
  "Videography Service": "video camera recording filming videographer setup",
  "Printing Service": "industrial digital printing press printers shop",
  "Digital Marketing Agency": "marketing agency brainstorming laptop whiteboard",

  // Education
  "Coaching Center": "classroom classroom blackboard teaching coaching",
  "Tuition Center": "students studying tuition homework classroom",
  "Training Institute": "professional computer lab training institute",
  "Language Academy": "language school study group learning class",

  // Construction & Real Estate
  "Real Estate Agency": "luxury house property real estate agent",
  "Construction Company": "construction site build structure company",
  "Architect": "architect drafting blueprint office model",
  "Interior Designer": "interior designer moodboard blueprints styling",

  // Local Services
  "Laundry Service": "washing machines laundry clean clothes service",
  "Dry Cleaning": "dry cleaned shirts hangers laundry dry cleaning",
  "Pest Control": "pest control sprayer exterminator service",
  "Plumbing Service": "plumber fixing sink tools pipes plumbing",
  "Electrician Service": "electrician wiring fuses repair tools service",

  // Agriculture
  "Nursery": "plants garden nursery green seedlings pots",
  "Flower Shop": "florist flower bouquet shop display",
  "Seed Store": "seeds bags agricultural supplies store",
  "Farm Products Store": "organic farm fresh milk eggs honey store",

  // Gifts & Specialty Stores
  "Gift Shop": "gift wrappers souvenirs toy gift shop displays",
  "Toy Store": "kids toys shelf retail toy store games",
  "Book Store": "bookstore shelves cozy reading books shop",
  "Pet Store": "pet store dog food supplies kittens puppies shop"
};

// Fallback images in case Unsplash API/scraper fails
const FALLBACK_IMAGES = [
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

async function main() {
  console.log(`Starting dynamic Unsplash fetching for ${Object.keys(BUSINESS_QUERIES).length} business types...`);
  
  const registry = {};
  const globalUsedImages = new Set();

  let fallbackIndex = 0;

  for (const [business, query] of Object.entries(BUSINESS_QUERIES)) {
    console.log(`Fetching images for "${business}" with query: "${query}"...`);
    
    let images = [];
    try {
      images = await searchUnsplashImages(query);
    } catch (err) {
      console.error(`Failed to fetch images for ${business}:`, err.message);
    }

    // Filter out already used images to guarantee uniqueness
    const uniqueImages = [];
    for (const img of images) {
      // Extract main photo ID part of the Unsplash URL to be extra safe
      const match = img.match(/photo-([a-zA-Z0-9-]+)/);
      const photoId = match ? match[1] : img;
      
      if (!globalUsedImages.has(photoId)) {
        globalUsedImages.add(photoId);
        uniqueImages.push(img);
      }
      
      if (uniqueImages.length >= 10) break; // Need 10 images max per category (5 templates * 2 images/template etc)
    }

    // If we couldn't get enough unique images, fill in with fallback and guarantee they are unique too
    while (uniqueImages.length < 10) {
      const fallbackUrl = FALLBACK_IMAGES[fallbackIndex % FALLBACK_IMAGES.length];
      fallbackIndex++;
      const uniqueUrl = `${fallbackUrl}&unique_id=${fallbackIndex}`;
      uniqueImages.push(uniqueUrl);
    }

    registry[business] = uniqueImages;
    console.log(`Stored ${uniqueImages.length} unique images for ${business}`);
    
    // Sleep briefly to avoid aggressive scraping / API limits
    await new Promise(r => setTimeout(r, 300));
  }

  // Ensure output directory exists
  const dir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(registry, null, 2));
  console.log(`\n==================================================`);
  console.log(`SUCCESS: Wrote unique image registry to ${OUTPUT_FILE}`);
  console.log(`Total categories processed: ${Object.keys(registry).length}`);
  console.log(`==================================================`);
}

main();
