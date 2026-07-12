"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  Sparkles, 
  User, 
  Upload, 
  Check, 
  Instagram, 
  Facebook, 
  Twitter, 
  CheckSquare, 
  X,
  MessageSquare
} from "lucide-react";
import { Message, BusinessData, useOnboardingStore } from "../../src/store/onboarding.store";
import { Button } from "@siteforge/ui";

interface ChatMessageProps {
  message: Message;
  isLast: boolean;
  onAnswerSubmit: (answerText: string, updatedData?: Partial<BusinessData>) => void;
}

const presetColors = [
  { name: "Deep Indigo", value: "from-indigo-600 to-indigo-800", hex: "#6366F1", desc: "Trustworthy & Modern" },
  { name: "Emerald Green", value: "from-emerald-600 to-emerald-800", hex: "#10B981", desc: "Fresh & Organic" },
  { name: "Rose Pink", value: "from-rose-600 to-rose-800", hex: "#F43F5E", desc: "Warm & Elegant" },
  { name: "Sunset Amber", value: "from-amber-500 to-amber-700", hex: "#F59E0B", desc: "Energetic & Bold" },
  { name: "Ocean Blue", value: "from-blue-600 to-blue-800", hex: "#3B82F6", desc: "Clean & Professional" },
  { name: "Electric Violet", value: "from-violet-600 to-violet-800", hex: "#8B5CF6", desc: "Creative & Premium" },
  { name: "Crimson Red", value: "from-red-600 to-red-800", hex: "#EF4444", desc: "Vibrant & Dynamic" },
  { name: "Slate Minimal", value: "from-zinc-600 to-zinc-800", hex: "#71717A", desc: "Neutral & Sleek" }
];

const presetStyles = [
  { id: "modern", name: "Modern SaaS", desc: "Glassmorphism, rich gradients, dynamic layout", classes: "bg-gradient-to-br from-indigo-950/40 via-zinc-900 to-zinc-900 border-indigo-500/30" },
  { id: "classic", name: "Classic Elegant", desc: "Serif typography, clean lines, traditional look", classes: "bg-zinc-900 border-zinc-700 font-serif" },
  { id: "minimal", name: "Minimalist", desc: "Monochrome, spacious layouts, high contrast", classes: "bg-zinc-950 border-zinc-800" },
  { id: "bold", name: "Bold & Retro", desc: "Dark mode focus, vibrant colors, stark borders", classes: "bg-zinc-900 border-fuchsia-500/20" }
];

const AI_CONSULTANT_DATASET: Record<string, Record<string, string[]>> = {
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

function getIntelligentSuggestions(typeStr = "", nameStr = "", kind = "products"): string[] {
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

interface SuggestionItem {
  id: string;
  name: string;
  selected: boolean;
  editing: boolean;
  editVal: string;
}

function InteractiveSuggestionsWidget({ type, businessData, onAnswerSubmit }: {
  type?: string;
  businessData: BusinessData;
  onAnswerSubmit: (answerText: string, updatedData?: Partial<BusinessData>) => void;
}) {
  const kind = type === "products_suggestions" ? "products"
             : type === "services_suggestions" ? "services"
             : "categories";

  const initialSuggestions = useMemo(() => {
    return getIntelligentSuggestions(businessData.type || "", businessData.name || "", kind);
  }, [businessData.type, businessData.name, kind]);

  const [items, setItems] = useState<SuggestionItem[]>(() => 
    initialSuggestions.map((name, idx) => ({
      id: `item_${Date.now()}_${idx}`,
      name,
      selected: true,
      editing: false,
      editVal: name
    }))
  );
  const [newItemText, setNewItemText] = useState("");

  useEffect(() => {
    const fresh = getIntelligentSuggestions(businessData.type || "", businessData.name || "", kind);
    setItems(fresh.map((name, idx) => ({
      id: `item_${Date.now()}_${idx}`,
      name,
      selected: true,
      editing: false,
      editVal: name
    })));
  }, [businessData.type, businessData.name, kind]);

  const handleToggleSelect = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const handleSelectAll = (selectStatus: boolean) => {
    setItems(prev => prev.map(item => ({ ...item, selected: selectStatus })));
  };

  const handleRemove = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleStartEdit = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, editing: true, editVal: item.name } : item));
  };

  const handleSaveEdit = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, name: item.editVal.trim() || item.name, editing: false } : item));
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
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
    onAnswerSubmit(selectedNames.join(", "), { [kind]: selectedNames } as Partial<BusinessData>);
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl text-zinc-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
            AI Consultant {kind === "products" ? "Product Catalog" : kind === "services" ? "Service Offerings" : "Catalog Categories"} ({selectedCount} Selected)
          </h4>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <button
            onClick={() => handleSelectAll(true)}
            className="text-indigo-400 hover:underline px-2 py-1 rounded bg-zinc-800/80 border border-zinc-700 shadow-sm"
          >
            Keep All Suggestions
          </button>
          <button
            onClick={() => handleSelectAll(false)}
            className="text-rose-400 hover:underline px-2 py-1 rounded bg-zinc-800/80 border border-zinc-700 shadow-sm"
          >
            Clear Selection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
        {items.map((item) => (
          <div
            key={item.id}
            className={`group flex items-center justify-between gap-2 p-3 rounded-xl border transition-all duration-200 ${
              item.selected
                ? "bg-zinc-800/90 border-indigo-500 shadow-sm text-zinc-100"
                : "bg-zinc-900/50 border-zinc-800 text-zinc-500 opacity-60 hover:opacity-100"
            }`}
          >
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => handleToggleSelect(item.id)}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-indigo-500 focus:ring-indigo-500 cursor-pointer shrink-0"
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
                  className="w-full bg-zinc-950 border border-indigo-500 rounded px-2 py-1 text-xs text-zinc-100 outline-none"
                />
              ) : (
                <span
                  onClick={() => handleToggleSelect(item.id)}
                  className={`text-xs font-semibold truncate cursor-pointer select-none ${
                    item.selected ? "text-zinc-100" : "line-through text-zinc-500"
                  }`}
                  title={item.name}
                >
                  {item.name}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {item.editing ? (
                <button
                  onClick={() => handleSaveEdit(item.id)}
                  className="text-indigo-400 hover:bg-indigo-500/20 p-1.5 rounded text-[10px] font-bold"
                  title="Save Name"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleStartEdit(item.id)}
                  className="opacity-60 group-hover:opacity-100 text-zinc-400 hover:text-indigo-400 hover:bg-zinc-800 p-1 rounded transition-opacity"
                  title="Edit Name"
                >
                  ✎
                </button>
              )}
              <button
                onClick={() => handleRemove(item.id)}
                className="opacity-60 group-hover:opacity-100 text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 p-1 rounded transition-opacity"
                title="Remove Item"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddCustom} className="flex gap-2 pt-1 border-t border-zinc-800">
        <input
          type="text"
          placeholder={`+ Add a custom ${kind === "products" ? "product" : kind === "services" ? "service" : "category"}...`}
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          className="flex-1 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 rounded-xl text-xs h-10 px-3.5 focus:border-indigo-500 outline-none shadow-inner"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 rounded-xl h-10 transition-colors shadow-sm flex items-center gap-1"
        >
          <span>Add</span>
        </button>
      </form>

      <div className="pt-2">
        <button
          onClick={handleConfirmSubmit}
          disabled={selectedCount === 0}
          className={`w-full rounded-xl h-11 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
            selectedCount > 0
              ? "bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-lg cursor-pointer scale-[1.01]"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-60"
          }`}
        >
          <span>Confirm {selectedCount} {kind === "products" ? "Products" : kind === "services" ? "Services" : "Categories"} & Continue →</span>
        </button>
      </div>
    </div>
  );
}

export default function ChatMessage({ message, isLast, onAnswerSubmit }: ChatMessageProps) {
  const { businessData } = useOnboardingStore();
  const isAI = message.sender === "ai";
  
  // Local widget states
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [whatsappVal, setWhatsappVal] = useState("");
  const [socialVal, setSocialVal] = useState({ instagram: "", facebook: "", twitter: "" });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultStr = reader.result as string;
        setLogoPreview(resultStr);
        onAnswerSubmit("Uploaded business logo", { logoUrl: resultStr });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkipLogo = () => {
    onAnswerSubmit("Skipped logo upload", { logoUrl: "" });
  };

  return (
    <div className={`flex gap-3.5 ${isAI ? "justify-start" : "justify-end"} mb-6`}>
      
      {/* AI Avatar */}
      {isAI && (
        <div className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
          <Sparkles className="h-4.5 w-4.5 animate-pulse" />
        </div>
      )}

      {/* Message Bubble wrapper */}
      <div className={`flex flex-col max-w-[85%] ${isAI ? "items-start" : "items-end"}`}>
        
        {/* Main Text Content */}
        <div className={`rounded-2xl px-4.5 py-3 text-sm leading-relaxed ${
          isAI 
            ? "bg-zinc-900 border border-zinc-800 text-zinc-100" 
            : "bg-indigo-600 text-white shadow-[0_5px_15px_rgba(99,102,241,0.2)]"
        }`}>
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>

        {/* Custom Interactive Onboarding Widgets (Visible ONLY on the latest message) */}
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
                      className="bg-zinc-900/80 hover:bg-indigo-600 text-zinc-200 hover:text-white border border-zinc-800 hover:border-indigo-500 rounded-xl h-10 px-3 text-xs font-semibold transition-all duration-200 truncate text-center"
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
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        onAnswerSubmit(e.currentTarget.value.trim(), { type: e.currentTarget.value.trim() });
                      }
                    }}
                    className="flex-1 bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 rounded-xl text-xs h-10 px-4 focus:border-indigo-500 outline-none shadow-inner"
                    id="custom-business-type-web"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('custom-business-type-web') as HTMLInputElement;
                      if (input && input.value.trim()) {
                        onAnswerSubmit(input.value.trim(), { type: input.value.trim() });
                      }
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 rounded-xl h-10 transition-colors shadow-sm"
                  >
                    Confirm →
                  </button>
                </div>
              </div>
            )}

            {/* Widget: AI Consultant Suggestions (Products / Services / Categories) */}
            {(message.type === "products_suggestions" || message.type === "services_suggestions" || message.type === "categories_suggestions" || (message.type as string) === "products_tags") && (
              <InteractiveSuggestionsWidget
                type={message.type === "products_tags" ? "products_suggestions" : message.type}
                businessData={businessData}
                onAnswerSubmit={onAnswerSubmit}
              />
            )}

            {/* Widget: Q5: Website Style cards */}
            {message.type === "style_choice" && (
              <div className="grid grid-cols-2 gap-3.5">
                {presetStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => onAnswerSubmit(style.name, { style: style.id })}
                    className={`flex flex-col justify-between p-4 border rounded-2xl text-left h-32 hover:scale-[1.02] transition-all duration-200 ${style.classes}`}
                  >
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{style.name}</span>
                    <span className="text-[10px] text-zinc-400 leading-normal">{style.desc}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Widget: Q6: Color Preset Selector */}
            {message.type === "color_choice" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {presetColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => onAnswerSubmit(color.name, { colorTheme: color.hex })}
                    className="group bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center flex flex-col items-center justify-between h-28 hover:border-indigo-500/40 hover:bg-zinc-900/60 transition-colors"
                  >
                    <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${color.value} border border-white/10 group-hover:scale-105 transition-transform shadow-inner`} />
                    <div>
                      <p className="text-[10px] font-bold text-zinc-200 truncate max-w-full">{color.name}</p>
                      <p className="text-[8px] text-zinc-500 mt-0.5">{color.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Widget: Q7: Logo Uploader */}
            {message.type === "logo_upload" && (
              <div className="bg-zinc-900/60 border border-zinc-800 border-dashed rounded-2xl p-6 text-center flex flex-col items-center gap-4">
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  <div className="h-11 w-11 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                    <Upload className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-300">Upload business logo</span>
                  <span className="text-[10px] text-zinc-500 font-mono">PNG, JPG up to 2MB</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>
                
                <div className="h-px bg-zinc-800 w-full" />
                
                <Button 
                  onClick={handleSkipLogo}
                  className="bg-transparent hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 font-semibold text-xs py-1.5 px-4 rounded-lg"
                >
                  I don&apos;t have a logo / Skip
                </Button>
              </div>
            )}

            {/* Widget: Q8: Boolean Yes/No buttons */}
            {message.type === "boolean_choice" && (
              <div className="flex gap-3 max-w-xs">
                <Button
                  onClick={() => onAnswerSubmit("Yes, online ordering is needed", { ordering: true })}
                  className="flex-1 bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:bg-indigo-600 text-white rounded-xl h-11 text-xs font-bold transition-all"
                >
                  Yes, enable ordering
                </Button>
                <Button
                  onClick={() => onAnswerSubmit("No online ordering, catalog only", { ordering: false })}
                  className="flex-1 bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:bg-indigo-600 text-white rounded-xl h-11 text-xs font-bold transition-all"
                >
                  No, catalog only
                </Button>
              </div>
            )}

            {/* Widget: Q9: WhatsApp configuration */}
            {message.type === "whatsapp_input" && (
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      // Set state directly
                      onAnswerSubmit("Yes, connect WhatsApp", { whatsappEnabled: true });
                    }}
                    className="flex-1 h-9 rounded-lg bg-zinc-800 hover:bg-emerald-600 border border-zinc-700 hover:border-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" /> Yes, connect WhatsApp
                  </button>
                  <button
                    onClick={() => onAnswerSubmit("No WhatsApp integration", { whatsappEnabled: false, whatsappNumber: "" })}
                    className="flex-1 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 hover:text-zinc-200 font-bold text-xs transition-colors"
                  >
                    No
                  </button>
                </div>

                {businessData.whatsappEnabled && (
                  <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                    <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Enter WhatsApp Number</label>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        placeholder="+91 99999 99999"
                        value={whatsappVal}
                        onChange={(e) => setWhatsappVal(e.target.value)}
                        className="flex-1 bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-lg text-xs h-10 px-3.5 focus:border-indigo-500/80 focus:ring-0 outline-none"
                      />
                      <button
                        onClick={() => {
                          if (whatsappVal.trim()) {
                            onAnswerSubmit(`WhatsApp number: ${whatsappVal}`, { whatsappNumber: whatsappVal });
                          }
                        }}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 rounded-lg h-10 transition-colors"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Widget: Q10: Social handles configuration */}
            {message.type === "social_input" && (
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-3.5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-3 h-10 rounded-xl bg-zinc-950 border border-zinc-800">
                    <Instagram className="h-4 w-4 text-pink-500" />
                    <input
                      type="text"
                      placeholder="Instagram URL"
                      value={socialVal.instagram}
                      onChange={(e) => setSocialVal({ ...socialVal, instagram: e.target.value })}
                      className="flex-1 bg-transparent text-xs text-zinc-200 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-3 h-10 rounded-xl bg-zinc-950 border border-zinc-800">
                    <Facebook className="h-4 w-4 text-blue-500" />
                    <input
                      type="text"
                      placeholder="Facebook URL"
                      value={socialVal.facebook}
                      onChange={(e) => setSocialVal({ ...socialVal, facebook: e.target.value })}
                      className="flex-1 bg-transparent text-xs text-zinc-200 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-3 h-10 rounded-xl bg-zinc-950 border border-zinc-800">
                    <Twitter className="h-4 w-4 text-sky-400" />
                    <input
                      type="text"
                      placeholder="Twitter URL"
                      value={socialVal.twitter}
                      onChange={(e) => setSocialVal({ ...socialVal, twitter: e.target.value })}
                      className="flex-1 bg-transparent text-xs text-zinc-200 outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => {
                      onAnswerSubmit("Submitted social media links", {
                        socialLinks: {
                          instagram: socialVal.instagram,
                          facebook: socialVal.facebook,
                          twitter: socialVal.twitter
                        }
                      });
                    }}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl h-10 text-xs font-bold transition-all shadow-md"
                  >
                    Save & Generate Website
                  </Button>
                  <Button
                    onClick={() => {
                      onAnswerSubmit("Skipped social media links", {
                        socialLinks: { instagram: "", facebook: "", twitter: "" }
                      });
                    }}
                    className="bg-transparent hover:bg-zinc-850 text-zinc-500 hover:text-zinc-300 text-xs font-semibold px-4 rounded-xl h-10"
                  >
                    Skip
                  </Button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-md">
          <User className="h-4 w-4" />
        </div>
      )}

    </div>
  );
}
