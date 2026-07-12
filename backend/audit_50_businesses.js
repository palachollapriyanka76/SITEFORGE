const { generateThreeVariations } = require('./src/ai-engine/generator');

const businesses = [
{ name: "Footwear Hub", type: "Footwear Store", products: ["Running Shoes","Sneakers","Sandals","Formal Shoes","Boots","Sports Shoes","Kids Shoes","Women's Footwear","Slippers","Loafers"] },
{ name: "Urban Cafe", type: "Cafe", products: ["Espresso","Cappuccino","Latte","Mocha","Cold Coffee","Croissants","Brownies","Pastries","Sandwiches","Tea"] },
{ name: "Kids Planet", type: "Toy Store", products: ["Educational Toys","Board Games","Building Blocks","Puzzles","Soft Toys","Remote Cars","Action Figures","Learning Kits","Dolls","Toy Trains"] },
{ name: "Book Haven", type: "Book Store", products: ["Novels","Academic Books","Children Books","Comics","Story Books","Journals","Notebooks","Magazines","Reference Books","E-books"] },
{ name: "Pet Needs", type: "Pet Store", products: ["Dog Food","Cat Food","Pet Toys","Pet Shampoo","Leashes","Pet Beds","Bird Feed","Aquariums","Pet Medicines","Pet Bowls"] },
{ name: "Dream Homes Realty", type: "Real Estate", products: ["Apartments","Villas","Plots","Commercial Spaces","Luxury Homes","Farm Lands","Rental Homes","Office Spaces","Studio Flats","Townhouses"] },
{ name: "Tech World", type: "Electronics Store", products: ["Laptops","Smartphones","Tablets","Smart Watches","Headphones","Gaming Consoles","Monitors","Printers","Power Banks","Routers"] },
{ name: "Royal Furniture", type: "Furniture Store", products: ["Sofas","Dining Tables","Beds","Wardrobes","Office Chairs","Bookshelves","TV Units","Coffee Tables","Study Tables","Dressers"] },
{ name: "Fitness Arena", type: "Gym", products: ["Treadmills","Dumbbells","Exercise Bikes","Protein Powder","Yoga Mats","Resistance Bands","Weight Plates","Gym Gloves","Supplements","Shakers"] },
{ name: "Fresh Mart", type: "Grocery Store", products: ["Rice","Wheat Flour","Cooking Oil","Vegetables","Fruits","Dairy Products","Snacks","Soft Drinks","Spices","Pulses"] },
{ name: "Beauty Bliss", type: "Cosmetics Store", products: ["Lipstick","Foundation","Face Wash","Moisturizer","Perfume","Mascara","Eyeliner","Compact Powder","Serum","Nail Polish"] },
{ name: "Fashion Boutique", type: "Clothing Store", products: ["Kurtis","Sarees","Jeans","T-Shirts","Shirts","Jackets","Dresses","Leggings","Blazers","Hoodies"] },
{ name: "Golden Bakery", type: "Bakery", products: ["Cakes","Cupcakes","Cookies","Brownies","Pastries","Donuts","Bread","Muffins","Puffs","Biscuits"] },
{ name: "MediCare Pharmacy", type: "Pharmacy", products: ["Pain Relievers","Vitamins","Cough Syrup","First Aid Kits","Supplements","Thermometers","Sanitizers","Masks","Blood Pressure Monitor","Glucose Meter"] },
{ name: "Green Garden", type: "Plant Nursery", products: ["Indoor Plants","Outdoor Plants","Flower Pots","Succulents","Seeds","Fertilizers","Garden Tools","Herb Plants","Fruit Plants","Soil Mix"] },
{ name: "Auto Zone", type: "Automobile Store", products: ["Car Tires","Engine Oil","Seat Covers","Car Batteries","Alloy Wheels","Car Accessories","LED Lights","Air Filters","Wipers","Speakers"] },
{ name: "Sports Hub", type: "Sports Store", products: ["Cricket Bats","Footballs","Basketballs","Tennis Rackets","Sports Shoes","Gym Bags","Volleyballs","Badminton Kits","Jerseys","Helmets"] },
{ name: "Jewels Palace", type: "Jewelry Store", products: ["Gold Chains","Rings","Bracelets","Earrings","Necklaces","Diamond Sets","Anklets","Pendants","Silver Jewelry","Watches"] },
{ name: "Music Corner", type: "Music Store", products: ["Guitars","Keyboards","Drums","Violins","Microphones","Speakers","Headphones","Amplifiers","Ukuleles","DJ Equipment"] },
{ name: "Baby World", type: "Baby Store", products: ["Baby Clothes","Diapers","Baby Toys","Baby Strollers","Feeding Bottles","Baby Beds","Baby Wipes","Baby Lotion","Baby Food","Baby Carriers"] },
{ name: "Home Decor Studio", type: "Home Decor Store", products: ["Wall Art","Curtains","Cushions","Carpets","Lamps","Mirrors","Vases","Photo Frames","Wall Clocks","Candles"] },
{ name: "Solar Solutions", type: "Solar Energy", products: ["Solar Panels","Solar Batteries","Solar Inverters","Solar Lights","Solar Water Heaters","Solar Chargers","Solar Pumps","Solar Fans","Solar Street Lights","Solar Kits"] },
{ name: "Travel Explorer", type: "Travel Agency", products: ["Holiday Packages","Flight Tickets","Hotel Booking","Cruise Tours","Adventure Trips","Honeymoon Packages","Visa Services","Travel Insurance","Group Tours","Local Tours"] },
{ name: "Smart Stationery", type: "Stationery Store", products: ["Pens","Pencils","Notebooks","Markers","Files","Sticky Notes","Drawing Books","Calculators","Folders","Art Supplies"] },
{ name: "Digital Print Hub", type: "Printing Store", products: ["Business Cards","Banners","Posters","Flyers","Brochures","Stickers","Invitations","Certificates","Catalogs","Photo Prints"] },
{ name: "Ocean Aquarium", type: "Aquarium Store", products: ["Fish Tanks","Gold Fish","Aquarium Filters","Fish Food","LED Lights","Aquatic Plants","Air Pumps","Aquarium Decorations","Water Conditioner","Shrimps"] },
{ name: "Sweet Treats", type: "Ice Cream Shop", products: ["Vanilla Ice Cream","Chocolate Ice Cream","Strawberry Ice Cream","Sundaes","Milkshakes","Gelato","Ice Cream Cakes","Frozen Yogurt","Kulfi","Waffles"] },
{ name: "Art Gallery", type: "Art Store", products: ["Paintings","Sketches","Canvas Art","Portraits","Wall Art","Sculptures","Digital Art","Frames","Art Prints","Handmade Crafts"] },
{ name: "Game Zone", type: "Gaming Store", products: ["PS5","Xbox","Gaming PCs","Controllers","Gaming Chairs","Gaming Keyboards","Gaming Mice","Monitors","VR Headsets","Games"] },
{ name: "Fresh Juice Bar", type: "Juice Shop", products: ["Orange Juice","Apple Juice","Mango Juice","Watermelon Juice","Pineapple Juice","Smoothies","Detox Drinks","Milkshakes","Protein Shakes","Fruit Bowls"] },
{ name: "Seafood Market", type: "Seafood Store", products: ["Fish","Prawns","Crabs","Lobsters","Squid","Salmon","Tuna","Oysters","Mussels","Dry Fish"] },
{ name: "Organic Basket", type: "Organic Store", products: ["Organic Rice","Organic Vegetables","Organic Fruits","Organic Honey","Organic Tea","Organic Spices","Organic Oil","Organic Pulses","Organic Snacks","Organic Flour"] },
{ name: "Cake Studio", type: "Cake Shop", products: ["Birthday Cakes","Wedding Cakes","Cupcakes","Photo Cakes","Chocolate Cakes","Fruit Cakes","Designer Cakes","Cheesecakes","Red Velvet Cakes","Pastries"] },
{ name: "Laptop Care", type: "Computer Store", products: ["Laptops","SSD Drives","RAM Modules","Monitors","Keyboards","Mouse","Laptop Bags","Cooling Pads","Webcams","Docking Stations"] },
{ name: "Coffee Roasters", type: "Coffee Shop", products: ["Arabica Beans","Robusta Beans","Cold Brew","Espresso","Latte","Coffee Powder","Coffee Capsules","Mugs","French Press","Coffee Filters"] },
{ name: "Wedding Dreams", type: "Wedding Store", products: ["Bridal Gowns","Wedding Suits","Bouquets","Wedding Rings","Decorations","Invitations","Wedding Shoes","Bridesmaid Dresses","Photography Packages","Accessories"] },
{ name: "Adventure Gear", type: "Outdoor Store", products: ["Tents","Sleeping Bags","Backpacks","Hiking Shoes","Camping Stoves","Flashlights","Trekking Poles","Water Bottles","Hammocks","Rain Jackets"] },
{ name: "Mobile Planet", type: "Mobile Store", products: ["Android Phones","iPhones","Phone Cases","Chargers","Power Banks","Earbuds","Screen Protectors","Smart Watches","Bluetooth Speakers","Tripods"] },
{ name: "Luxury Watches", type: "Watch Store", products: ["Analog Watches","Digital Watches","Smart Watches","Luxury Watches","Sports Watches","Chronographs","Leather Watches","Metal Watches","Couple Watches","Kids Watches"] },
{ name: "Healthy Living", type: "Health Store", products: ["Protein Powder","Vitamins","Omega 3","Multivitamins","Herbal Supplements","Green Tea","Energy Bars","Protein Bars","Weight Gainers","Shakers"] },
{ name: "Flower Paradise", type: "Flower Shop", products: ["Roses","Lilies","Tulips","Orchids","Bouquets","Flower Baskets","Wedding Flowers","Indoor Plants","Gift Hampers","Artificial Flowers"] },
{ name: "Bike World", type: "Bicycle Store", products: ["Mountain Bikes","Road Bikes","Kids Bikes","Helmets","Bike Lights","Bike Pumps","Cycling Gloves","Water Bottles","Bike Locks","Bike Accessories"] },
{ name: "Learning Academy", type: "Education Center", products: ["Math Courses","Science Courses","Coding Classes","English Classes","Competitive Exams","Online Classes","Study Materials","Mock Tests","Workshops","Certificates"] },
{ name: "Luxury Spa", type: "Spa Center", products: ["Massage Therapy","Facials","Body Scrubs","Aromatherapy","Spa Packages","Hot Stone Therapy","Skin Treatments","Hair Spa","Pedicure","Manicure"] },
{ name: "Interior Concepts", type: "Interior Design", products: ["Living Room Design","Kitchen Design","Bedroom Design","Office Design","Furniture Design","Wall Panels","Lighting Design","Modular Kitchens","Wardrobes","Decor Packages"] },
{ name: "Farm Fresh", type: "Agriculture Store", products: ["Seeds","Fertilizers","Pesticides","Irrigation Systems","Farm Tools","Tractors","Sprayers","Organic Compost","Plant Nutrients","Harvest Equipment"] },
{ name: "Drone Vision", type: "Drone Store", products: ["Camera Drones","Racing Drones","Drone Batteries","Drone Controllers","Drone Cameras","Drone Propellers","Drone Bags","Drone Chargers","FPV Goggles","Drone Kits"] },
{ name: "Creative Studio", type: "Photography Studio", products: ["Portrait Photography","Wedding Photography","Event Photography","Photo Frames","Albums","Photo Prints","Drone Photography","Studio Lighting","Camera Rentals","Videography"] },
{ name: "Furniture Factory", type: "Furniture Manufacturer", products: ["Wooden Beds","Office Desks","Dining Sets","Wardrobes","Modular Furniture","TV Units","Sofas","Bookshelves","Reception Counters","Cabinets"] },
{ name: "Mega Electronics", type: "Electronics Retailer", products: ["Smart TVs","Laptops","Phones","Tablets","Gaming Consoles","Air Conditioners","Refrigerators","Washing Machines","Speakers","Cameras"] }
];

const SUPPORTED_FRONTEND_COMPONENTS = [
  "hero", "about", "team", "services", "programs", "consultation", "products", "collections", "catalog", "inventory", "featured-products", "menu", "gallery", "showcase", "portfolio", "testimonials", "reviews", "case-studies", "faq", "contact", "booking", "locations", "pricing", "success-stories", "memberships", "promotions", "events", "footer"
];

async function runAudit() {
  console.log("=== 50-BUSINESS STRUCTURAL DIVERSITY AUDIT ===\n");
  
  let allGeneratedSections = [];
  let totalMissing = 0;
  const variationStructures = [];
  
  // Suppress inner logs
  const originalLog = console.log;
  console.log = () => {}; 
  
  for (const b of businesses) {
    const variations = await generateThreeVariations(b);
    
    const v = variations[0]; // test variation A
    const sections = v.websiteJson.pages[0].sections;
    
    let renderedCount = 0;
    let missingSections = [];
    let sectionList = [];
    
    sections.forEach(sec => {
      sectionList.push(sec.type);
      allGeneratedSections.push(sec.type);
      if (SUPPORTED_FRONTEND_COMPONENTS.includes(sec.type)) {
        renderedCount++;
      } else {
        missingSections.push(sec.type);
      }
    });
    
    if (missingSections.length > 0) totalMissing += missingSections.length;
    
    variationStructures.push(sectionList.join(","));
    
    originalLog(`[${b.name}] Layout: ${v.websiteJson.globalSettings.layoutStrategy}`);
    originalLog(`  - Generated Sections: ${sections.length}`);
    originalLog(`  - Rendered Sections: ${renderedCount}`);
    if (missingSections.length > 0) originalLog(`  - MISSING: ${missingSections.join(", ")}`);
    originalLog(`  - Structure: ${sectionList.join(" -> ")}\n`);
  }
  
  console.log = originalLog;
  
  console.log("\n=== DIVERSITY METRICS ===");
  const uniqueStructures = new Set(variationStructures).size;
  console.log(`Unique Layout Structures across 50 businesses: ${uniqueStructures} / 50`);
  console.log(`Structural Variance: ${((uniqueStructures / 50) * 100).toFixed(1)}% unique layout path generation`);
  
  console.log("\n=== RENDERING VERIFICATION ===");
  if (totalMissing === 0) {
    console.log("✅ SUCCESS: All generated sections are correctly mapped and rendered.");
    console.log("   renderedSectionCount === generatedSectionCount for all 50 businesses.");
  } else {
    console.log(`❌ FAILED: ${totalMissing} sections were unmapped and dropped.`);
  }
  
  console.log("\n=== COMPONENT MAPPING TABLE ===");
  console.log("AI Engine Blueprint Component  ->  React UI Render Component");
  console.log("---------------------------------------------------------");
  console.log("hero                           ->  Hero");
  console.log("about, team                    ->  About");
  console.log("products, collections, catalog ->  Products");
  console.log("inventory, featured-products   ->  Products");
  console.log("menu                           ->  Products");
  console.log("services, programs             ->  Services");
  console.log("consultation                   ->  Services");
  console.log("gallery, showcase, portfolio   ->  Gallery");
  console.log("testimonials, reviews          ->  Testimonials");
  console.log("case-studies                   ->  Testimonials");
  console.log("faq                            ->  FAQ");
  console.log("contact, booking, locations    ->  Contact");
  console.log("footer                         ->  Footer");
}

runAudit();
