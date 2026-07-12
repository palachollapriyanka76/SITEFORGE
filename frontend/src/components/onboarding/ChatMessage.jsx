"use client";

import React, { useState } from "react";
import {
  Sparkles,
  User,
  Upload,
  Instagram,
  Facebook,
  Twitter,
  MessageSquare
} from "lucide-react";
import { useOnboardingStore } from "../../store/onboarding.store";
import { Button } from "../ui/Button";
 
const presetColors = [
  { name: "Deep Sage", value: "from-[#84A98C] to-[#52796F]", hex: "#52796F", desc: "Trustworthy" },
  { name: "Forest Green", value: "from-[#52796F] to-[#2F3E46]", hex: "#2F3E46", desc: "Organic" },
  { name: "Sunset Amber", value: "from-amber-400 to-amber-700", hex: "#D97706", desc: "Energetic" },
  { name: "Deep Teal", value: "from-[#354F52] to-[#2F3E46]", hex: "#354F52", desc: "Professional" },
  { name: "Rose Pink", value: "from-rose-400 to-rose-600", hex: "#e11d48", desc: "Vibrant" },
  { name: "Indigo", value: "from-indigo-500 to-indigo-700", hex: "#4f46e5", desc: "Modern" }
];

const presetStyles = [
  { id: "luxury", name: "✨ Luxury", desc: "Serif fonts, golden tones, premium feel" },
  { id: "modern", name: "🎨 Modern", desc: "Clean lines, vibrant gradients" },
  { id: "minimal", name: "🌿 Minimal", desc: "Black & white, lots of whitespace" },
  { id: "classic", name: "🏛 Classic", desc: "Serif type, traditional layouts" }
];


const audienceOptions = [
  { id: "Families", emoji: "👨‍👩‍👧", label: "Families" },
  { id: "Students", emoji: "🎓", label: "Students" },
  { id: "Professionals", emoji: "💼", label: "Professionals" },
  { id: "Everyone", emoji: "🌍", label: "Everyone" }
];

const productTagsByCategory = {
  "Bakery": ["Cakes", "Pastries", "Bread", "Croissants", "Cookies", "Custom Orders", "Cupcakes", "Donuts"],
  "Restaurant": ["Biryani", "Tandoori", "Chinese", "South Indian", "Thali", "Desserts", "Drinks", "Appetizers"],
  "Salon & Spa": ["Haircut", "Facial", "Bridal Makeover", "Massage", "Manicure", "Hair Color", "Waxing", "Skin Care"],
  "Electronics": ["Smartphones", "Laptops", "Headphones", "Smartwatches", "Tablets", "Speakers", "Cameras", "Accessories"],
  "Fashion": ["Sarees", "Kurtis", "Western Wear", "Ethnic Wear", "Footwear", "Accessories", "Bags", "Jewelry"],
  "Fitness Gym": ["Personal Training", "CrossFit", "Yoga", "Zumba", "Strength Training", "Cardio", "Diet Plans", "Group Classes"],
  "Other Services": ["Consulting", "Repairs", "Cleaning", "Tutoring", "Photography", "Catering", "Design", "Delivery"]
};

const AI_CONSULTANT_DATASET = {
  "Footwear Store": {
    products: [
      "Running Shoes", "Sneakers", "Sandals", "Formal Shoes", "Boots",
      "Sports Shoes", "Loafers", "Slippers", "School Shoes", "Flip Flops",
      "Socks", "Accessories", "Walking Shoes", "Trekking Boots", "Casual Slip-Ons"
    ],
    services: [
      "Custom Shoe Fitting & Ergonomic Advice", "Footwear Repair & Sole Restoration",
      "Orthopedic Insole Consultation", "Sneaker Deep Cleaning & Waterproofing",
      "Express Home Delivery & Try-At-Home", "Wholesale & Bulk Institutional Orders",
      "30-Day Easy Exchange Guarantee"
    ],
    categories: [
      "Men's Footwear", "Women's Footwear", "Kids & School Shoes",
      "Sports & Running Collection", "Formal & Office Wear", "Sandals & Slippers", "Shoe Care & Accessories"
    ]
  },
  "Toys & Games": {
    products: [
      "Educational Toys", "Building Blocks", "Action Figures", "Dolls",
      "Board Games", "Puzzles", "Remote Control Cars", "Stuffed Animals",
      "Science Kits", "Baby Toys", "Outdoor Toys", "Toy Vehicles",
      "Musical Instruments for Kids", "Art & Craft Sets", "STEM Learning Kits"
    ],
    services: [
      "Personalized Gift Wrapping & Custom Greeting Cards", "Birthday Party Return Gift Packages",
      "Toy Assembly & Battery Setup", "Educational Toy Guidance by Age Group",
      "Same-Day Birthday Surprise Delivery", "Bulk School & Daycare Supply Orders"
    ],
    categories: [
      "Educational & STEM Toys", "Action Figures & Dolls", "Board Games & Puzzles",
      "Toddler & Baby Care", "Outdoor & Active Play", "Arts, Crafts & Music"
    ]
  },
  "Grocery Store": {
    products: [
      "Rice", "Wheat Flour", "Cooking Oil", "Milk", "Eggs", "Bread",
      "Vegetables", "Fruits", "Soft Drinks", "Snacks", "Biscuits", "Spices",
      "Pulses & Lentils", "Organic Honey", "Cold-Pressed Juices"
    ],
    services: [
      "Free 30-Minute Doorstep Delivery", "Monthly Staples Subscription & Auto-Refill",
      "Fresh Farm Produce Quality Guarantee", "Custom Festival & Gift Baskets",
      "Contactless Curbside Pickup", "Wholesale Pricing for Restaurants & Caterers"
    ],
    categories: [
      "Daily Staples & Grains", "Fresh Fruits & Vegetables", "Dairy & Bakery",
      "Snacks, Beverages & Biscuits", "Spices, Oils & Condiments", "Household & Personal Care"
    ]
  },
  "Bakery": {
    products: [
      "Custom Birthday Cakes", "Artisan Sourdough Bread", "Chocolate Truffle Pastries",
      "Butter Croissants", "Blueberry Muffins", "Garlic & Herb Bread",
      "Assorted Gourmet Cookies", "Red Velvet Cupcakes", "Cheese Straws",
      "Fruit Tarts", "Sponge Cakes", "Plum Cakes", "Brownies & Blondies", "Donuts"
    ],
    services: [
      "Custom Theme Cake Designing", "Same-Day Midnight Celebration Delivery",
      "Wedding & Anniversary Dessert Tables", "Corporate Event Snack Boxes",
      "Eggless & Gluten-Free Custom Baking", "Bulk Party Catering"
    ],
    categories: [
      "Signature Celebration Cakes", "Fresh Breads & Croissants", "Pastries & Cupcakes",
      "Cookies & Brownies", "Savoury Bakes & Snacks", "Gift Hampers & Specials"
    ]
  },
  "Restaurant": {
    products: [
      "Truffle Mushroom Burger", "Wood-Fired Margherita Pizza", "Paneer Butter Masala",
      "Dal Makhani with Butter Naan", "Grilled Chicken Caesar Salad", "Szechuan Noodles & Manchurian",
      "Crispy Garlic Prawns", "Loaded Nachos Platter", "Loaded BBQ Chicken Wings",
      "Cold Brew Nitro Coffee", "Belgian Chocolate Fondant", "Fresh Fruit Mocktails"
    ],
    services: [
      "Instant Online Table Reservation", "Private Dining & Family Celebrations",
      "Express 30-Minute Home Delivery", "Custom Outdoor Banquet & Catering",
      "Chef's Special Tasting Menu Experience", "Corporate Lunch Box Subscriptions"
    ],
    categories: [
      "Chef's Signature Specials", "Starters & Appetizers", "Main Course & Breads",
      "Wood-Fired Pizzas & Pastas", "Refreshing Mocktails & Beverages", "Gourmet Desserts"
    ]
  },
  "Salon & Spa": {
    products: [
      "Organic Keratin Hair Serum", "Moroccan Argan Oil Hair Mask", "Sulfate-Free Botanical Shampoo",
      "Vitamin C Brightening Facial Kit", "Herbal Hair Growth Oil", "Matte Finish Sunscreen SPF 50",
      "Nourishing Body Scrub", "Luxury Beard Grooming Kit", "Organic Lip Balm & Scrub",
      "Professional Ceramic Hair Dryer", "Detangling Paddle Brush", "Aromatherapy Essential Oil Blend"
    ],
    services: [
      "Precision Haircut & Custom Styling", "Organic Keratin & Smoothing Therapy",
      "Deep Tissue & Swedish Spa Massage", "Bridal & Groom Complete Makeover Suite",
      "Advanced Glow & Anti-Aging Facial", "Relaxing Pedicure & Manicure Spa",
      "Scalp Treatment & Hair Fall Control"
    ],
    categories: [
      "Hair Styling & Treatments", "Facials & Skin Rejuvenation", "Relaxing Massage & Spa",
      "Bridal & Special Occasion Makeup", "Nail Studio & Care", "Premium Salon Products"
    ]
  },
  "Fitness Gym": {
    products: [
      "Whey Protein Isolate (5lb Tub)", "Post-Workout BCAA Recovery Powder", "Pre-Workout Energy Booster",
      "High-Density Non-Slip Yoga Mat Pro", "Adjustable Dumbbell Set (2.5 - 24kg)",
      "Heavy-Duty Resistance Bands 5-Pack", "Professional Neoprene Lifting Belt",
      "Insulated Stainless Steel Gym Shaker", "Weighted Jump Rope Pro", "Foam Roller & Muscle Reliever",
      "Wrist Wraps & Lifting Grips", "Athletic Compression Gym Wear"
    ],
    services: [
      "1-on-1 Certified Personal Training", "Customized Weight Loss & Muscle Gain Programs",
      "Personalized Sports Nutrition & Meal Prep Guidance", "Group Zumba, HIIT & CrossFit Classes",
      "Body Composition & Metabolic Health Testing", "Physiotherapy & Sports Injury Recovery"
    ],
    categories: [
      "Gym Memberships & Passes", "Personal Training & Consultation", "Sports Nutrition & Supplements",
      "Fitness Equipment & Accessories", "Group Training & Classes", "Apparel & Gear"
    ]
  },
  "Electronics": {
    products: [
      "Ultra-HD 4K Smart TV (55-Inch)", "Noise-Canceling Wireless Headphones Pro", "Mechanical RGB Gaming Keyboard",
      "Next-Gen Core i7 Laptop (16GB RAM, 512GB SSD)", "Smart Fitness & Heart Monitoring Watch",
      "Fast-Charge Power Bank 20,000mAh", "True Wireless Active Earbuds Pro", "4K Action Studio Camera",
      "Ergonomic Bluetooth Wireless Mouse", "USB-C 10-in-1 Multi-Port Docking Station",
      "High-Speed Wi-Fi 6 Mesh Router System", "Portable Bluetooth Waterproof Speaker"
    ],
    services: [
      "Free Express Same-Day Delivery & Installation", "Extended 3-Year Accidental Damage Protection",
      "Expert Hardware & Software Repair Diagnostics", "Old Device Exchange & Instant Trade-In Bonus",
      "Smart Home Automation Setup & Guidance", "24/7 Priority Remote Technical Support"
    ],
    categories: [
      "Smartphones & Tablets", "Laptops & Computers", "Audio, Headphones & Speakers",
      "Smart TVs & Home Entertainment", "Smart Home & Wearables", "Gaming & Accessories"
    ]
  },
  "Plant Nursery": {
    products: [
      "Monstera Deliciosa Indoor Plant", "Fiddle Leaf Fig Tree", "Areca Palm Air-Purifying Set",
      "Succulent Trio Terrarium Pack", "Organic Potting Soil Mix (20kg)", "Golden Pothos Hanging Basket",
      "Sansevieria Snake Plant", "Handmade Terracotta Planter Set", "Organic Liquid Plant Fertilizer",
      "Bonsai Starter Kit with Trimming Tools", "Heavy-Duty Pruning Shears", "Ceramic Self-Watering Planters"
    ],
    services: [
      "Home & Balcony Garden Designing", "Monthly Plant Maintenance & Pruning",
      "Indoor Plant Health Assessment & Repotting", "Landscaping & Lawn Setup Consultation",
      "Direct Nursery-to-Home Delivery", "Custom Corporate Green Gifting Solutions"
    ],
    categories: [
      "Air-Purifying Indoor Plants", "Outdoor & Balcony Plants", "Succulents & Bonsai",
      "Planters & Pots", "Organic Soil & Fertilizers", "Gardening Tools & Kits"
    ]
  },
  "Medical Clinic": {
    products: [
      "Comprehensive Blood Profile Screening Test", "Full-Body Preventive Health Checkup Package",
      "Digital Blood Pressure Monitor Pro", "Infrared Non-Contact Thermometer",
      "Pulse Oximeter & Respiratory Kit", "First-Aid Emergency Medical Box",
      "Vitamin D3 & B12 Immunity Boosting Supplements", "Orthopedic Lumbar Support Cushion",
      "Glucometer with 50 Test Strips", "Nebulizer Machine for Home Care",
      "Daily Multivitamin & Mineral Pack", "Herbal Ayurvedic Immunity Syrup"
    ],
    services: [
      "Expert Specialist Doctor Consultation", "Online Video Health Teleconsultation",
      "Home Sample Collection for Lab Tests", "Post-Surgical & Elderly Home Care Guidance",
      "Annual Executive Cardiac Risk Screening", "Personalized Diet & Preventive Lifestyle Guidance"
    ],
    categories: [
      "Doctor Consultations", "Preventive Health Checkups", "Diagnostic & Lab Tests",
      "Medical Devices & Monitors", "Daily Wellness & Supplements", "Specialized Care Programs"
    ]
  },
  "Fashion Boutique": {
    products: [
      "Handcrafted Silk Zari Saree", "Tailored Designer Anarkali Suit", "Embroidered Cotton Kurti Set",
      "Classic Denim Slim-Fit Jacket", "Floral Summer Chiffon Maxi Dress", "Traditional Banarasi Dupatta",
      "High-Waisted Pleated Trousers", "Artisan Block-Printed Kaftan", "Full-Grain Leather Everyday Tote Bag",
      "Statement Polki & Kundan Necklace Set", "Velvet Embroidered Festive Potli Bag", "Hand-Stitched Leather Kolhapuri Wedges"
    ],
    services: [
      "Bespoke Custom Tailoring & Fitting Service", "Personal Bridal & Trousseau Styling Session",
      "Same-Day Express Alterations & Hemming", "Wardrobe Consultation & Color Profiling",
      "At-Home Private Trial & Measurement", "Complimentary Designer Gift Packaging"
    ],
    categories: [
      "Designer Sarees & Lehengas", "Kurtis & Ethnic Sets", "Western & Casual Wear",
      "Bridal & Festive Trousseau", "Handbags & Potlis", "Statement Jewelry & Footwear"
    ]
  },
  "Furniture Store": {
    products: [
      "Solid Sheesham Wood Dining Table (6-Seater)", "Ergonomic High-Back Executive Mesh Chair", "Velvet Modular L-Shape Sectional Sofa",
      "Minimalist King Size Platform Bed Frame", "Handcrafted Solid Teak Mid-Century Bookshelf", "Genuine Leather Recliner Lounge Chair",
      "Natural Marble Top Round Coffee Table", "Electric Dual-Motor Height-Adjustable Standing Desk", "Industrial Reclaimed Wood & Steel Console",
      "Fluted Wooden Bedside Nightstand Set", "Hand-Woven Natural Jute Area Rug (8x10 ft)", "Artisan Brass & Ceramic Table Lamp Set"
    ],
    services: [
      "Free Complete White-Glove Home Assembly", "3D Interior Layout & Space Planning Consultation",
      "Custom Wood & Fabric Polish Customization", "Old Furniture Exchange & Trade-In Program",
      "Comprehensive 5-Year Structural Warranty Protection", "Dedicated Post-Purchase Maintenance & Care"
    ],
    categories: [
      "Living Room Sofas & Seating", "Dining Sets & Tables", "Bedroom Beds & Wardrobes",
      "Office Ergonomic Workspace", "Home Decor & Rugs", "Custom Woodwork & Storage"
    ]
  },
  "Shop / Store": {
    products: [
      "Signature Premium Collection Item", "Deluxe Handcrafted Showcase Unit", "Best-Selling Everyday Essential",
      "Special Edition Artisan Pack", "Pro-Grade Utility Bundle", "Luxury Gift Hamper Box",
      "Executive Choice Selection", "Compact Travel Edition", "Custom Engraved Keepsake",
      "Organic Eco-Friendly Starter Set", "Limited Edition Heritage Piece", "Modern Lifestyle Accessory Set"
    ],
    services: [
      "Personalized Shopping & Styling Advice", "Gift Wrapping & Custom Engraving Service",
      "Same-Day Express Local Delivery", "Hassle-Free 14-Day Returns & Exchange",
      "Loyalty Rewards & VIP Member Discount Club", "Custom Order & Sourcing Assistance"
    ],
    categories: [
      "Featured Collection", "New Arrivals", "Best Sellers & Top Rated",
      "Special Offers & Bundles", "Everyday Essentials", "Gifting & Accessories"
    ]
  }
};

function getIntelligentSuggestions(typeStr = "", nameStr = "", kind = "products") {
  const t = (typeStr || "").toLowerCase();
  const n = (nameStr || "").toLowerCase();
  const combined = `${t} ${n}`;

  let matchedCategory = "Shop / Store";
  if (combined.includes("footwear") || combined.includes("shoe") || combined.includes("sneaker") || combined.includes("sandal") || combined.includes("boot")) {
    matchedCategory = "Footwear Store";
  } else if (combined.includes("toy") || combined.includes("game") || combined.includes("kid") || combined.includes("baby") || combined.includes("doll") || combined.includes("lego")) {
    matchedCategory = "Toys & Games";
  } else if (combined.includes("grocery") || combined.includes("supermarket") || combined.includes("kirana") || combined.includes("staple") || combined.includes("provision") || combined.includes("mart")) {
    matchedCategory = "Grocery Store";
  } else if (combined.includes("baker") || combined.includes("cake") || combined.includes("pastry") || combined.includes("bread") || combined.includes("sweet")) {
    matchedCategory = "Bakery";
  } else if (combined.includes("restaurant") || combined.includes("cafe") || combined.includes("coffee") || combined.includes("bistro") || combined.includes("eatery") || combined.includes("diner") || combined.includes("pizza") || combined.includes("burger")) {
    matchedCategory = "Restaurant";
  } else if (combined.includes("salon") || combined.includes("spa") || combined.includes("beauty") || combined.includes("hair") || combined.includes("makeup") || combined.includes("nail") || combined.includes("grooming")) {
    matchedCategory = "Salon & Spa";
  } else if (combined.includes("gym") || combined.includes("fitness") || combined.includes("workout") || combined.includes("crossfit") || combined.includes("yoga") || combined.includes("pilates")) {
    matchedCategory = "Fitness Gym";
  } else if (combined.includes("electronic") || combined.includes("gadget") || combined.includes("computer") || combined.includes("laptop") || combined.includes("mobile") || combined.includes("tech") || combined.includes("appliance")) {
    matchedCategory = "Electronics";
  } else if (combined.includes("nursery") || combined.includes("plant") || combined.includes("garden") || combined.includes("botanical") || combined.includes("flower")) {
    matchedCategory = "Plant Nursery";
  } else if (combined.includes("clinic") || combined.includes("medical") || combined.includes("hospital") || combined.includes("dental") || combined.includes("doctor") || combined.includes("health") || combined.includes("pharmacy")) {
    matchedCategory = "Medical Clinic";
  } else if (combined.includes("fashion") || combined.includes("clothing") || combined.includes("apparel") || combined.includes("boutique") || combined.includes("dress") || combined.includes("saree") || combined.includes("wear")) {
    matchedCategory = "Fashion Boutique";
  } else if (combined.includes("furniture") || combined.includes("decor") || combined.includes("interior") || combined.includes("sofa") || combined.includes("table") || combined.includes("wood")) {
    matchedCategory = "Furniture Store";
  } else if (AI_CONSULTANT_DATASET[typeStr]) {
    matchedCategory = typeStr;
  }

  const dataset = AI_CONSULTANT_DATASET[matchedCategory] || AI_CONSULTANT_DATASET["Shop / Store"];
  const list = dataset[kind] || dataset["products"];

  // If fallback to generic store, interpolate the user's specific business category name into the items
  if (matchedCategory === "Shop / Store" && typeStr && typeStr !== "Shop / Store" && typeStr !== "Other Services") {
    const cleanType = typeStr.charAt(0).toUpperCase() + typeStr.slice(1);
    if (kind === "products") {
      return [
        `Signature ${cleanType} Package`, `Professional ${cleanType} Bundle`, `Deluxe ${cleanType} Edition`,
        `Custom ${cleanType} Solution`, `Premium ${cleanType} Kit`, `Executive ${cleanType} Unit`,
        `Everyday Essential ${cleanType}`, `Artisan Crafted ${cleanType}`, `High-Performance ${cleanType}`,
        `Specialized ${cleanType} Set`, `Compact ${cleanType} Option`, `Masterwork ${cleanType} Selection`
      ];
    } else if (kind === "services") {
      return [
        `Expert ${cleanType} Consultation`, `Complete Setup & Installation Service`,
        `Dedicated Post-Sales Support & Maintenance`, `Customized ${cleanType} Planning & Strategy`,
        `Fast Priority Home Delivery`, `VIP Client Guarantee & Comprehensive Audit`
      ];
    } else {
      return [
        `Featured ${cleanType} Collection`, `Best-Selling ${cleanType}`, `New Arrivals & Specials`,
        `Professional Solutions`, `Essential Accessories`, `Premium Offerings`
      ];
    }
  }

  return list;
}

function InteractiveSuggestionsWidget({ type, businessData, onAnswerSubmit }) {
  const kind = type === "products_suggestions" ? "products"
             : type === "services_suggestions" ? "services"
             : "categories";

  const initialSuggestions = React.useMemo(() => {
    return getIntelligentSuggestions(businessData.type || "", businessData.name || "", kind);
  }, [businessData.type, businessData.name, kind]);

  const [items, setItems] = useState(() => 
    initialSuggestions.map((name, idx) => ({
      id: `item_${Date.now()}_${idx}`,
      name,
      selected: true,
      editing: false,
      editVal: name
    }))
  );
  const [newItemText, setNewItemText] = useState("");

  // Sync when suggestions change
  React.useEffect(() => {
    const fresh = getIntelligentSuggestions(businessData.type || "", businessData.name || "", kind);
    setItems(fresh.map((name, idx) => ({
      id: `item_${Date.now()}_${idx}`,
      name,
      selected: true,
      editing: false,
      editVal: name
    })));
  }, [businessData.type, businessData.name, kind]);

  const handleToggleSelect = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const handleSelectAll = (selectStatus) => {
    setItems(prev => prev.map(item => ({ ...item, selected: selectStatus })));
  };

  const handleRemove = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleStartEdit = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, editing: true, editVal: item.name } : item));
  };

  const handleSaveEdit = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, name: item.editVal.trim() || item.name, editing: false } : item));
  };

  const handleAddCustom = (e) => {
    if (e) e.preventDefault();
    if (!newItemText.trim()) return;
    setItems(prev => [
      ...prev,
      {
        id: `item_custom_${Date.now()}_${prev.length}`,
        name: newItemText.trim(),
        selected: true,
        editing: false,
        editVal: newItemText.trim()
      }
    ]);
    setNewItemText("");
  };

  const selectedCount = items.filter(i => i.selected && i.name.trim()).length;

  const handleConfirmSubmit = () => {
    const selectedNames = items.filter(i => i.selected && i.name.trim()).map(i => i.name.trim());
    if (selectedNames.length === 0) {
      alert(`Please select or add at least one ${kind === "products" ? "product" : kind === "services" ? "service" : "category"} before continuing.`);
      return;
    }
    onAnswerSubmit(selectedNames.join(", "), { [kind]: selectedNames });
  };

  return (
    <div className="bg-[#CAD2C5]/25 border border-[#2F3E46]/15 rounded-2xl p-5 space-y-4 shadow-md text-[#2F3E46]">
      {/* Header with AI Consultant Badge and Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2F3E46]/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#52796F] animate-pulse" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2F3E46]">
            AI Consultant {kind === "products" ? "Product Catalog" : kind === "services" ? "Service Offerings" : "Catalog Categories"} ({selectedCount} Selected)
          </h4>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <button
            onClick={() => handleSelectAll(true)}
            className="text-[#52796F] hover:underline px-2 py-1 rounded bg-white/60 border border-[#2F3E46]/10 shadow-sm"
          >
            Keep All Suggestions
          </button>
          <button
            onClick={() => handleSelectAll(false)}
            className="text-rose-600 hover:underline px-2 py-1 rounded bg-white/60 border border-[#2F3E46]/10 shadow-sm"
          >
            Clear Selection
          </button>
        </div>
      </div>

      {/* Suggestions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
        {items.map((item) => (
          <div
            key={item.id}
            className={`group flex items-center justify-between gap-2 p-3 rounded-xl border transition-all duration-200 ${
              item.selected
                ? "bg-white border-[#52796F] shadow-sm text-[#2F3E46]"
                : "bg-white/40 border-[#2F3E46]/10 text-zinc-400 opacity-70 hover:opacity-100"
            }`}
          >
            {/* Left: Checkbox and Name */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => handleToggleSelect(item.id)}
                className="h-4 w-4 rounded border-[#2F3E46]/30 text-[#52796F] focus:ring-[#52796F] cursor-pointer shrink-0"
              />
              {item.editing ? (
                <input
                  type="text"
                  value={item.editVal}
                  onChange={(e) => setItems(prev => prev.map(i => i.id === item.id ? { ...i, editVal: e.target.value } : i))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit(item.id);
                  }}
                  autoFocus
                  className="w-full bg-zinc-100 border border-[#52796F] rounded px-2 py-1 text-xs text-[#2F3E46] outline-none"
                />
              ) : (
                <span
                  onClick={() => handleToggleSelect(item.id)}
                  className={`text-xs font-semibold truncate cursor-pointer select-none ${
                    item.selected ? "text-[#2F3E46]" : "line-through text-zinc-400"
                  }`}
                  title={item.name}
                >
                  {item.name}
                </span>
              )}
            </div>

            {/* Right: Edit and Remove Buttons */}
            <div className="flex items-center gap-1 shrink-0">
              {item.editing ? (
                <button
                  onClick={() => handleSaveEdit(item.id)}
                  className="text-[#52796F] hover:bg-[#52796F]/10 p-1.5 rounded text-[10px] font-bold"
                  title="Save Name"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleStartEdit(item.id)}
                  className="opacity-60 group-hover:opacity-100 text-[#354F52] hover:text-[#52796F] hover:bg-black/5 p-1 rounded transition-opacity"
                  title="Edit Name"
                >
                  ✎
                </button>
              )}
              <button
                onClick={() => handleRemove(item.id)}
                className="opacity-60 group-hover:opacity-100 text-rose-500 hover:text-rose-700 hover:bg-rose-500/10 p-1 rounded transition-opacity"
                title="Remove Item"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={handleAddCustom} className="flex gap-2 pt-1 border-t border-[#2F3E46]/10">
        <input
          type="text"
          placeholder={`+ Add a custom ${kind === "products" ? "product" : kind === "services" ? "service" : "category"}...`}
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          className="flex-1 bg-white border border-[#2F3E46]/15 text-[#2F3E46] placeholder:text-zinc-400 rounded-xl text-xs h-10 px-3.5 focus:border-[#52796F] outline-none shadow-inner"
        />
        <button
          type="submit"
          className="bg-[#52796F] hover:bg-[#354F52] text-white font-bold text-xs px-4 rounded-xl h-10 transition-colors shadow-sm flex items-center gap-1"
        >
          <span>Add</span>
        </button>
      </form>

      {/* Confirm & Continue Button */}
      <div className="pt-2">
        <button
          onClick={handleConfirmSubmit}
          disabled={selectedCount === 0}
          className={`w-full rounded-xl h-11 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
            selectedCount > 0
              ? "bg-[#52796F] hover:bg-[#354F52] text-white hover:shadow-lg cursor-pointer scale-[1.01]"
              : "bg-zinc-400 text-white cursor-not-allowed opacity-60"
          }`}
        >
          <span>Confirm {selectedCount} {kind === "products" ? "Products" : kind === "services" ? "Services" : "Categories"} & Continue →</span>
        </button>
      </div>
    </div>
  );
}

export default function ChatMessage({ message, isLast, onAnswerSubmit }) {
  const { businessData } = useOnboardingStore();
  const isAI = message.sender === "ai";

  const [logoPreview, setLogoPreview] = useState(null);
  const [whatsappVal, setWhatsappVal] = useState("");
  const [socialVal, setSocialVal] = useState({ instagram: "", facebook: "", twitter: "" });
  const [selectedTags, setSelectedTags] = useState([]);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultStr = reader.result;
        setLogoPreview(resultStr);
        onAnswerSubmit("Uploaded business logo", { logoUrl: resultStr });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkipLogo = () => {
    onAnswerSubmit("Skipped logo upload", { logoUrl: "" });
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) return prev.filter(t => t !== tag);
      return [...prev, tag];
    });
  };

  const submitTags = () => {
    if (selectedTags.length > 0) {
      onAnswerSubmit(selectedTags.join(", "), { products: selectedTags });
    }
  };

  return (
    <div className={`flex gap-3.5 ${isAI ? "justify-start" : "justify-end"} mb-6`}>

      {/* AI Avatar */}
      {isAI && (
        <div className="h-8 w-8 rounded-full bg-[#84A98C]/20 border border-[#84A98C]/30 flex items-center justify-center text-[#52796F] shrink-0 mt-0.5 shadow-sm">
          <Sparkles className="h-4.5 w-4.5" />
        </div>
      )}

      {/* Message Bubble wrapper */}
      <div className={`flex flex-col max-w-[85%] ${isAI ? "items-start" : "items-end"}`}>

        {/* Main Text Content */}
        <div className={`rounded-2xl px-4.5 py-3 text-sm leading-relaxed ${isAI
            ? "bg-[#84A98C] text-white border border-[#2F3E46]/10 shadow-sm"
            : "bg-[#52796F] text-white shadow-md"
          }`}>
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>

        {/* Custom Interactive Onboarding Widgets */}
        {isAI && isLast && (
          <div className="mt-4 w-full min-w-[280px] sm:min-w-[400px] max-w-lg space-y-4">

            {/* Widget: Business Type Choice & Custom Input */}
            {message.type === "type_choice" && (
              <div className="space-y-3.5 w-full max-w-lg">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Footwear Store", "Toys & Games", "Grocery Store", "Bakery", "Salon & Spa", "Restaurant", "Fitness Gym", "Electronics", "Fashion Boutique"].map((presetType) => (
                    <button
                      key={presetType}
                      onClick={() => onAnswerSubmit(presetType, { type: presetType })}
                      className="bg-white hover:bg-[#52796F] text-[#354F52] hover:text-white border border-[#2F3E46]/12 hover:border-[#52796F] rounded-xl h-10 px-3 text-xs font-bold transition-all shadow-sm truncate text-center"
                    >
                      {presetType}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 w-full">
                  <input
                    type="text"
                    placeholder="Or type custom business (e.g. Scuba Dive Shop, Medical Clinic)..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        onAnswerSubmit(e.target.value.trim(), { type: e.target.value.trim() });
                      }
                    }}
                    className="flex-1 bg-white border border-[#2F3E46]/15 text-[#2F3E46] placeholder:text-zinc-400 rounded-xl text-xs h-10 px-4 focus:border-[#52796F] outline-none shadow-inner"
                    id="custom-business-type"
                  />
                  <button
                    onClick={() => {
                      const val = document.getElementById('custom-business-type').value;
                      if (val.trim()) {
                        onAnswerSubmit(val.trim(), { type: val.trim() });
                      }
                    }}
                    className="bg-[#52796F] hover:bg-[#354F52] text-white font-bold text-xs px-5 rounded-xl h-10 transition-colors shadow-sm"
                  >
                    Confirm →
                  </button>
                </div>
              </div>
            )}

            {/* Widget: AI Consultant Suggestions (Products / Services / Categories) */}
            {(message.type === "products_suggestions" || message.type === "services_suggestions" || message.type === "categories_suggestions" || message.type === "products_tags") && (
              <InteractiveSuggestionsWidget
                type={message.type === "products_tags" ? "products_suggestions" : message.type}
                businessData={businessData}
                onAnswerSubmit={onAnswerSubmit}
              />
            )}

            {/* Widget: Audience Choice Cards */}
            {message.type === "audience_choice" && (
              <div className="grid grid-cols-2 gap-2.5">
                {audienceOptions.map((aud) => (
                  <button
                    key={aud.id}
                    onClick={() => onAnswerSubmit(aud.id, { audience: aud.id })}
                    className="bg-white hover:bg-[#52796F] text-[#354F52] hover:text-white border border-[#2F3E46]/12 hover:border-[#52796F] rounded-2xl h-20 text-xs font-bold transition-all duration-200 shadow-sm flex flex-col items-center justify-center gap-1.5 hover:scale-105 active:scale-95"
                  >
                    <span className="text-2xl">{aud.emoji}</span>
                    <span>{aud.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Widget: Website Style cards */}
            {message.type === "style_choice" && (
              <div className="grid grid-cols-2 gap-3">
                {presetStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => onAnswerSubmit(style.name, { style: style.id })}
                    className="flex flex-col justify-between p-4 border border-[#2F3E46]/12 rounded-2xl text-left h-28 bg-white hover:scale-[1.03] hover:border-[#52796F] hover:shadow-lg transition-all duration-200 shadow-sm"
                  >
                    <span className="text-sm font-bold text-[#2F3E46]">{style.name}</span>
                    <span className="text-[10px] text-zinc-500 leading-normal">{style.desc}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Widget: Color Preset Selector */}
            {message.type === "color_choice" && (
              <div className="grid grid-cols-3 gap-2.5">
                {presetColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => onAnswerSubmit(color.name, { colorTheme: color.hex })}
                    className="group bg-white border border-[#2F3E46]/12 rounded-2xl p-3 text-center flex flex-col items-center justify-center gap-2 h-24 hover:border-[#52796F]/40 hover:bg-[#CAD2C5]/10 hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${color.value} border border-white/20 group-hover:scale-110 transition-transform shadow-inner`} />
                    <div>
                      <p className="text-[10px] font-bold text-[#2F3E46]">{color.name}</p>
                      <p className="text-[8px] text-zinc-400">{color.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Widget: Logo Uploader */}
            {message.type === "logo_upload" && (
              <div className="bg-white border border-[#2F3E46]/12 border-dashed rounded-2xl p-6 text-center flex flex-col items-center gap-4 shadow-sm">
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  <div className="h-11 w-11 rounded-full bg-[#CAD2C5]/20 border border-[#2F3E46]/10 flex items-center justify-center text-[#52796F] hover:bg-[#CAD2C5]/40 transition-colors">
                    <Upload className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-[#2F3E46]">Upload business logo</span>
                  <span className="text-[10px] text-[#354F52] font-mono">PNG, JPG up to 2MB</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>

                <div className="h-px bg-[#2F3E46]/10 w-full" />

                <button
                  onClick={handleSkipLogo}
                  className="bg-transparent hover:bg-zinc-550/10 text-zinc-400 hover:text-zinc-650 font-bold text-xs py-1.5 px-4 rounded-full"
                >
                  I don&apos;t have a logo / Skip
                </button>
              </div>
            )}

            {/* Widget: Boolean Yes/No */}
            {message.type === "boolean_choice" && (
              <div className="flex gap-3 max-w-xs">
                <button
                  onClick={() => onAnswerSubmit("Yes, enable ordering", { ordering: true })}
                  className="flex-1 bg-white border border-[#2F3E46]/12 hover:border-[#52796F] hover:bg-[#52796F] hover:text-white text-[#354F52] rounded-2xl h-14 text-xs font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-0.5 hover:scale-105"
                >
                  <span className="text-lg">🛒</span>
                  <span>Yes, enable</span>
                </button>
                <button
                  onClick={() => onAnswerSubmit("No, catalog only", { ordering: false })}
                  className="flex-1 bg-white border border-[#2F3E46]/12 hover:border-[#52796F] hover:bg-[#52796F] hover:text-white text-[#354F52] rounded-2xl h-14 text-xs font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-0.5 hover:scale-105"
                >
                  <span className="text-lg">📋</span>
                  <span>Catalog only</span>
                </button>
              </div>
            )}

            {/* Widget: WhatsApp config */}
            {message.type === "whatsapp_input" && (
              <div className="bg-white border border-[#2F3E46]/12 rounded-2xl p-5 space-y-4 shadow-sm text-[#354F52]">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onAnswerSubmit("Yes, connect WhatsApp", { whatsappEnabled: true });
                    }}
                    className="flex-1 h-9 rounded-full bg-[#CAD2C5]/20 hover:bg-[#52796F] border border-[#2F3E46]/12 text-[#2F3E46] hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" /> Yes, connect
                  </button>
                  <button
                    onClick={() => onAnswerSubmit("No WhatsApp", { whatsappEnabled: false, whatsappNumber: "" })}
                    className="flex-1 h-9 rounded-full bg-[#CAD2C5]/20 hover:bg-zinc-100 border border-[#2F3E46]/12 text-zinc-400 hover:text-zinc-600 font-bold text-xs transition-colors"
                  >
                    No
                  </button>
                </div>

                {businessData.whatsappEnabled && (
                  <div className="space-y-2 pt-2 border-t border-[#2F3E46]/10">
                    <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Enter WhatsApp Number</label>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        placeholder="+91 99999 99999"
                        value={whatsappVal}
                        onChange={(e) => setWhatsappVal(e.target.value)}
                        className="flex-1 bg-white border border-[#2F3E46]/12 text-[#2F3E46] rounded-full text-xs h-10 px-3.5 focus:border-[#52796F] outline-none"
                      />
                      <button
                        onClick={() => {
                          if (whatsappVal.trim()) {
                            onAnswerSubmit(`WhatsApp: ${whatsappVal}`, { whatsappNumber: whatsappVal });
                          }
                        }}
                        className="bg-[#52796F] hover:bg-[#354F52] text-white font-bold text-xs px-4 rounded-full h-10 transition-colors"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Widget: Social handles */}
            {message.type === "social_input" && (
              <div className="bg-white border border-[#2F3E46]/12 rounded-2xl p-5 space-y-3.5 shadow-sm text-[#354F52]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-3 h-10 rounded-full bg-white border border-[#2F3E46]/12">
                    <Instagram className="h-4 w-4 text-[#52796F]" />
                    <input
                      type="text"
                      placeholder="Instagram URL"
                      value={socialVal.instagram}
                      onChange={(e) => setSocialVal({ ...socialVal, instagram: e.target.value })}
                      className="flex-1 bg-transparent text-xs text-[#2F3E46] outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-3 h-10 rounded-full bg-white border border-[#2F3E46]/12">
                    <Facebook className="h-4 w-4 text-[#52796F]" />
                    <input
                      type="text"
                      placeholder="Facebook URL"
                      value={socialVal.facebook}
                      onChange={(e) => setSocialVal({ ...socialVal, facebook: e.target.value })}
                      className="flex-1 bg-transparent text-xs text-[#2F3E46] outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-3 h-10 rounded-full bg-white border border-[#2F3E46]/12">
                    <Twitter className="h-4 w-4 text-[#52796F]" />
                    <input
                      type="text"
                      placeholder="Twitter URL"
                      value={socialVal.twitter}
                      onChange={(e) => setSocialVal({ ...socialVal, twitter: e.target.value })}
                      className="flex-1 bg-transparent text-xs text-[#2F3E46] outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      onAnswerSubmit("Submitted social media links", {
                        socialLinks: {
                          instagram: socialVal.instagram,
                          facebook: socialVal.facebook,
                          twitter: socialVal.twitter
                        }
                      });
                    }}
                    className="flex-1 bg-[#52796F] hover:bg-[#354F52] text-white rounded-full h-10 text-xs font-bold transition-all shadow-md"
                  >
                    Save & Generate Website
                  </button>
                  <button
                    onClick={() => {
                      onAnswerSubmit("Skipped social media links", {
                        socialLinks: { instagram: "", facebook: "", twitter: "" }
                      });
                    }}
                    className="bg-transparent hover:bg-zinc-550/10 text-zinc-400 hover:text-zinc-650 text-xs font-bold px-4 rounded-full h-10"
                  >
                    Skip
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="h-8 w-8 rounded-full bg-[#52796F] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 shadow-sm">
          ME
        </div>
      )}

    </div>
  );
}
