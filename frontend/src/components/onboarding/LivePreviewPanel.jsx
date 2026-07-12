"use client";

import React, { useState, useEffect } from "react";
import { useOnboardingStore } from "../../store/onboarding.store";
import { getOptimizedImageUrl } from "../../utils/imageOptimizer";
import { 
  Globe, 
  MessageSquare, 
  Instagram, 
  Facebook, 
  Twitter, 
  Phone,
  Compass,
  ArrowRight,
  Heart,
  ShoppingBag,
  Star,
  MapPin
} from "lucide-react";

// Category-specific hero images from Unsplash (free, high-quality)
const HERO_IMAGES = {
  "Bakery": "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80",
  "Restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  "Cafe": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
  "Salon & Spa": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
  "Salon": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
  "Electronics": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  "Fashion": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  "Fitness Gym": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  "Gym": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  "Furniture": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  "Footwear": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  "Jewelry": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
  "Hospital": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  "Healthcare": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  "Plant Nursery": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
  "Pharmacy": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80",
  "Hotel": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "Real Estate": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "Book Store": "https://images.unsplash.com/photo-1507842229356-51c6150fe5a3?w=800&q=80",
  "Other Services": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
};

export function getHeroImageForPreview(type = "", name = "") {
  if (HERO_IMAGES[type]) return HERO_IMAGES[type];
  const checkStr = `${type} ${name}`.toLowerCase();
  if (checkStr.includes("cafe") || checkStr.includes("coffee") || checkStr.includes("tea")) return HERO_IMAGES["Cafe"];
  if (checkStr.includes("bakery") || checkStr.includes("cake") || checkStr.includes("pastry")) return HERO_IMAGES["Bakery"];
  if (checkStr.includes("restaurant") || checkStr.includes("dining") || checkStr.includes("food")) return HERO_IMAGES["Restaurant"];
  if (checkStr.includes("furniture") || checkStr.includes("sofa") || checkStr.includes("decor")) return HERO_IMAGES["Furniture"];
  if (checkStr.includes("shoe") || checkStr.includes("footwear") || checkStr.includes("sneaker")) return HERO_IMAGES["Footwear"];
  if (checkStr.includes("jewel") || checkStr.includes("diamond") || checkStr.includes("gold")) return HERO_IMAGES["Jewelry"];
  if (checkStr.includes("gym") || checkStr.includes("fitness") || checkStr.includes("sport")) return HERO_IMAGES["Gym"];
  if (checkStr.includes("salon") || checkStr.includes("hair") || checkStr.includes("beauty") || checkStr.includes("spa")) return HERO_IMAGES["Salon"];
  if (checkStr.includes("electronic") || checkStr.includes("gadget") || checkStr.includes("tech")) return HERO_IMAGES["Electronics"];
  if (checkStr.includes("nursery") || checkStr.includes("plant") || checkStr.includes("flower")) return HERO_IMAGES["Plant Nursery"];
  if (checkStr.includes("hospital") || checkStr.includes("clinic") || checkStr.includes("doctor") || checkStr.includes("health")) return HERO_IMAGES["Hospital"];
  if (checkStr.includes("pharmacy") || checkStr.includes("medicine") || checkStr.includes("pill")) return HERO_IMAGES["Pharmacy"];
  if (checkStr.includes("hotel") || checkStr.includes("resort") || checkStr.includes("stay")) return HERO_IMAGES["Hotel"];
  if (checkStr.includes("real estate") || checkStr.includes("property")) return HERO_IMAGES["Real Estate"];
  if (checkStr.includes("book") || checkStr.includes("library")) return HERO_IMAGES["Book Store"];
  return HERO_IMAGES["Other Services"];
}

export function getPreviewLogoBadge(name = "Brand", type = "", activeColor = "#52796F") {
  const checkStr = `${name} ${type}`.toLowerCase();
  let emojiChar = "🏷️";
  if (checkStr.includes("cafe") || checkStr.includes("coffee") || checkStr.includes("tea")) emojiChar = "☕";
  else if (checkStr.includes("bakery") || checkStr.includes("cake") || checkStr.includes("pastry")) emojiChar = "🥐";
  else if (checkStr.includes("restaurant") || checkStr.includes("dining") || checkStr.includes("food")) emojiChar = "🍽️";
  else if (checkStr.includes("furniture") || checkStr.includes("sofa") || checkStr.includes("decor")) emojiChar = "🛋️";
  else if (checkStr.includes("shoe") || checkStr.includes("footwear") || checkStr.includes("sneaker")) emojiChar = "👟";
  else if (checkStr.includes("jewel") || checkStr.includes("diamond") || checkStr.includes("gold")) emojiChar = "💎";
  else if (checkStr.includes("gym") || checkStr.includes("fitness") || checkStr.includes("sport")) emojiChar = "🏋️";
  else if (checkStr.includes("salon") || checkStr.includes("hair") || checkStr.includes("beauty")) emojiChar = "✂️";
  else if (checkStr.includes("electronic") || checkStr.includes("gadget") || checkStr.includes("tech")) emojiChar = "💻";
  else if (checkStr.includes("nursery") || checkStr.includes("plant") || checkStr.includes("flower")) emojiChar = "🌿";
  else if (checkStr.includes("hospital") || checkStr.includes("clinic") || checkStr.includes("doctor")) emojiChar = "🏥";
  else if (checkStr.includes("pharmacy") || checkStr.includes("medicine")) emojiChar = "💊";
  else if (checkStr.includes("hotel") || checkStr.includes("resort")) emojiChar = "🏨";
  else if (checkStr.includes("real estate") || checkStr.includes("property")) emojiChar = "🏠";
  else if (checkStr.includes("book") || checkStr.includes("library")) emojiChar = "📚";

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-[#2F3E46]/10 shadow-sm bg-white">
      <span className="text-sm">{emojiChar}</span>
      <span className="text-xs font-black tracking-tight" style={{ color: activeColor }}>{name || "My Business"}</span>
    </div>
  );
}

// Category-specific product images
const PRODUCT_IMAGES = {
  "Bakery": [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=75",
    "https://images.unsplash.com/photo-1486427944544-d2c246c4d280?w=400&q=75",
    "https://images.unsplash.com/photo-1558301211-0d8c8ddee5e5?w=400&q=75",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=75",
  ],
  "Restaurant": [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=75",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=75",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=75",
  ],
  "Salon & Spa": [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=75",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=75",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=75",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&q=75",
  ],
  "Electronics": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=75",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=75",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=75",
    "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&q=75",
  ],
  "Fashion": [
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=75",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=75",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=75",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=75",
  ],
  "Fitness Gym": [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=75",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=75",
    "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&q=75",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=75",
  ],
  "Other Services": [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=75",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&q=75",
    "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=400&q=75",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=75",
  ],
};

const TAGLINES = {
  "Bakery": "Freshly baked, made with love.",
  "Restaurant": "Flavors that tell a story.",
  "Salon & Spa": "Where beauty meets relaxation.",
  "Electronics": "Tech that empowers your life.",
  "Fashion": "Style redefined, trends reimagined.",
  "Fitness Gym": "Transform your body. Elevate your life.",
  "Other Services": "Professional solutions, personal touch.",
};

const ITEM_PREVIEW_DATABASE = {
  "fruit tart": "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=400&q=75",
  "chocolate cake": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=75",
  "red velvet cake": "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=400&q=75",
  "plum cake": "https://images.unsplash.com/photo-1607920592419-be960c15d18b?auto=format&fit=crop&w=400&q=75",
  "cupcakes": "https://images.unsplash.com/photo-1576618148400-46de339d7516?auto=format&fit=crop&w=400&q=75",
  "cookies": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=75",
  "brownies": "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=400&q=75",
  "croissant": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=75",
  "donuts": "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=75",
  "running shoes": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=75",
  "casual sneakers": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=75",
  "leather boots": "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=400&q=75",
  "men sandals": "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?auto=format&fit=crop&w=400&q=75",
  "black formal shoes": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=400&q=75",
  "wooden dining table": "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=400&q=75",
  "modern fabric sofa": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=75",
  "wood wardrobe": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=75",
  "gold ring jewelry": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=75",
  "diamond necklace": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=75",
  "pepperoni pizza": "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=75",
  "beef burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=75",
  "creamy pasta": "https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=400&q=75"
};

function getItemPreviewImage(itemName, fallbackList = [], idx = 0) {
  if (!itemName || typeof itemName !== 'string') return fallbackList[idx] || null;
  const key = itemName.toLowerCase().trim();
  for (const [dbKey, url] of Object.entries(ITEM_PREVIEW_DATABASE)) {
    if (key === dbKey || key.includes(dbKey) || dbKey.includes(key)) {
      return url;
    }
  }
  return `https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=75&query=${encodeURIComponent(key)}`;
}

export default function LivePreviewPanel() {
  const { businessData: rawBusinessData } = useOnboardingStore();
  const [businessData, setBusinessData] = useState(rawBusinessData);

  useEffect(() => {
    const handler = setTimeout(() => {
      setBusinessData(rawBusinessData);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [rawBusinessData]);

  const getFontClasses = () => {
    switch (businessData.style) {
      case "luxury":
        return { sans: "font-serif", display: "font-serif italic" };
      case "classic":
        return { sans: "font-serif", display: "font-serif" };
      case "minimal":
        return { sans: "font-sans tracking-tight", display: "font-mono font-bold" };
      default:
        return { sans: "font-sans", display: "font-sans font-extrabold" };
    }
  };

  const fonts = getFontClasses();
  const activeColor = businessData.colorTheme || "#52796F";
  const heroImg = getHeroImageForPreview(businessData.type, businessData.name);
  const productImgs = PRODUCT_IMAGES[businessData.type] || [];
  const tagline = TAGLINES[businessData.type] || "Your premium local business.";

  return (
    <div className="flex flex-col h-full bg-white border border-[#2F3E46]/12 rounded-[24px] overflow-hidden shadow-md">
      
      {/* Browser Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#CAD2C5]/30 border-b border-[#2F3E46]/10">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <div className="h-5 px-3 rounded-md bg-white border border-[#2F3E46]/10 flex items-center text-[9px] text-[#354F52] font-mono gap-1 select-none w-56 truncate justify-center">
          <Globe className="h-2.5 w-2.5 text-zinc-400" />
          <span>{businessData.name ? `${businessData.name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.siteforge.app` : "yoursite.siteforge.app"}</span>
        </div>
        <div className="w-8" />
      </div>

      {/* Preview Viewport */}
      <div className={`flex-1 overflow-y-auto bg-white text-[#354F52] ${fonts.sans} scrollbar-thin`}>
        
        {/* Mock Navigation Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-[#2F3E46]/10 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
          <div className="flex items-center gap-1.5">
            {businessData.logoUrl ? (
              <img src={businessData.logoUrl} alt="Logo" className="h-6 w-auto rounded-md object-contain border border-[#2F3E46]/10" />
            ) : (
              getPreviewLogoBadge(businessData.name, businessData.type, activeColor)
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#354F52] font-semibold">Home</span>
            <span className="text-[10px] text-zinc-400">Menu</span>
            <span className="text-[10px] text-zinc-400">Contact</span>
            {businessData.ordering && (
              <button 
                className="h-5 px-2.5 rounded text-[8px] font-bold text-white shadow-sm"
                style={{ backgroundColor: activeColor }}
              >
                Order
              </button>
            )}
          </div>
        </header>

        {/* Content Sections */}
        <div className="space-y-0">
          
          {/* Section 1: Hero Banner */}
          <section className="relative overflow-hidden">
            {heroImg ? (
              <div className="relative h-44">
                <img 
                  src={getOptimizedImageUrl(heroImg, 'medium')} 
                  alt={businessData.type || "Business"} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white space-y-1.5">
                  <h1 className={`text-lg leading-tight ${fonts.display}`}>
                    {businessData.name || "Your Business"}
                  </h1>
                  <p className="text-[10px] opacity-90 leading-relaxed">{tagline}</p>
                  <div className="flex gap-2 pt-1">
                    {businessData.whatsappEnabled && businessData.whatsappNumber ? (
                      <button className="h-7 px-3 rounded-full bg-emerald-600 text-white font-bold text-[9px] flex items-center gap-1 shadow-sm">
                        <MessageSquare className="h-3 w-3" /> WhatsApp
                      </button>
                    ) : (
                      <button 
                        className="h-7 px-3 rounded-full text-white font-bold text-[9px] flex items-center gap-1 shadow-sm"
                        style={{ backgroundColor: activeColor }}
                      >
                        Explore <ArrowRight className="h-2.5 w-2.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Skeleton Hero */
              <div className="p-5 space-y-3 animate-pulse">
                <div className="h-28 w-full bg-gradient-to-br from-[#CAD2C5]/30 to-[#84A98C]/10 rounded-2xl border border-[#2F3E46]/10 flex items-center justify-center">
                  <span className="text-zinc-300 text-xs font-mono">Select category for preview</span>
                </div>
                <div className="h-5 w-3/4 bg-[#CAD2C5]/20 rounded" />
                <div className="h-3 w-full bg-[#CAD2C5]/10 rounded" />
                <div className="h-7 w-28 bg-[#CAD2C5]/20 rounded-full" />
              </div>
            )}
          </section>

          {/* Section 2: Stats Bar */}
          {businessData.type && (
            <div className="flex items-center justify-around py-3 border-y border-[#2F3E46]/8 bg-[#CAD2C5]/10 px-4">
              <div className="text-center">
                <p className="text-xs font-black text-[#2F3E46]">500+</p>
                <p className="text-[8px] text-zinc-400 font-semibold">Happy Clients</p>
              </div>
              <div className="h-5 w-px bg-[#2F3E46]/10" />
              <div className="text-center">
                <p className="text-xs font-black text-[#2F3E46]">4.9 ★</p>
                <p className="text-[8px] text-zinc-400 font-semibold">Rating</p>
              </div>
              <div className="h-5 w-px bg-[#2F3E46]/10" />
              <div className="text-center">
                <p className="text-xs font-black text-[#2F3E46]">5+</p>
                <p className="text-[8px] text-zinc-400 font-semibold">Years</p>
              </div>
            </div>
          )}

          {/* Section 3: Products / Offerings Grid */}
          <section className="px-4 py-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className={`text-[11px] font-extrabold uppercase tracking-wider text-[#2F3E46] ${fonts.display}`}>
                {businessData.type === "Restaurant" ? "Our Menu" 
                  : businessData.type === "Salon & Spa" ? "Our Services" 
                  : businessData.type === "Fitness Gym" ? "Programs" 
                  : "Our Offerings"}
              </h3>
              <span className="text-[9px] font-bold" style={{ color: activeColor }}>View All →</span>
            </div>

            {businessData.products && businessData.products.length > 0 ? (
              <div className="grid grid-cols-2 gap-2.5">
                {businessData.products.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-[#2F3E46]/8 bg-white group hover:shadow-md transition-all">
                    {getItemPreviewImage(item, productImgs, idx) && (
                      <img 
                        src={getOptimizedImageUrl(getItemPreviewImage(item, productImgs, idx), 'micro')} 
                        alt={item} 
                        className="w-full h-16 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    )}
                    <div className="p-2 space-y-0.5">
                      <p className="text-[10px] font-bold text-[#2F3E46] truncate">{item}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] flex items-center gap-0.5 text-amber-500">
                          <Star className="h-2 w-2 fill-amber-500" /> 4.8
                        </span>
                        <span className="text-[8px] font-bold" style={{ color: activeColor }}>
                          {businessData.ordering ? "Order" : "View"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Product Skeletons */
              <div className="grid grid-cols-2 gap-2.5 animate-pulse">
                <div className="h-24 bg-[#CAD2C5]/10 border border-[#2F3E46]/8 rounded-xl" />
                <div className="h-24 bg-[#CAD2C5]/10 border border-[#2F3E46]/8 rounded-xl" />
              </div>
            )}
          </section>

          {/* Section 3.1: Services Grid */}
          {businessData.services && businessData.services.length > 0 && (
            <section className="px-4 py-3 space-y-2.5 border-t border-[#2F3E46]/8">
              <h3 className={`text-[11px] font-extrabold uppercase tracking-wider text-[#2F3E46] ${fonts.display}`}>
                Our Services
              </h3>
              <div className="grid grid-cols-1 gap-1.5">
                {businessData.services.slice(0, 4).map((srv, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#CAD2C5]/15 border border-[#2F3E46]/8 text-[10px] font-semibold text-[#2F3E46]">
                    <span className="truncate flex-1">✓ {srv}</span>
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-white text-[#52796F]">Featured</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 3.2: Categories Tags */}
          {businessData.categories && businessData.categories.length > 0 && (
            <section className="px-4 py-3 space-y-2 border-t border-[#2F3E46]/8">
              <h3 className={`text-[10px] font-extrabold uppercase tracking-wider text-[#2F3E46] ${fonts.display}`}>
                Catalog Navigation
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {businessData.categories.slice(0, 6).map((cat, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-full text-[9px] font-bold bg-white border border-[#2F3E46]/15 text-[#354F52]">
                    {cat}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Section 4: Testimonial */}
          {businessData.audience && (
            <section className="mx-4 p-3.5 rounded-2xl border border-[#2F3E46]/8 bg-gradient-to-br from-[#CAD2C5]/10 to-white">
              <div className="flex items-start gap-2">
                <div className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{ backgroundColor: activeColor }}>
                  {businessData.audience === "Families" ? "👨" : businessData.audience === "Students" ? "🎓" : businessData.audience === "Professionals" ? "💼" : "🌍"}
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] text-[#354F52]/80 italic leading-relaxed">
                    &ldquo;Absolutely love this place! Best {businessData.type ? businessData.type.toLowerCase() : "service"} experience in town. Highly recommended for {businessData.audience ? businessData.audience.toLowerCase() : "everyone"}.&rdquo;
                  </p>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="h-2 w-2 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[8px] text-zinc-400 ml-1">Verified Customer</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section 5: Location / Contact */}
          <section className="px-4 py-5 space-y-3">
            <h3 className={`text-[11px] font-extrabold uppercase tracking-wider text-[#2F3E46] ${fonts.display}`}>
              Find Us
            </h3>
            
            <div className="space-y-2 text-[10px] text-[#354F52]/80">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 shrink-0" style={{ color: activeColor }} />
                <span>123 Main Street, Your City</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3 shrink-0" style={{ color: activeColor }} />
                <span>{businessData.whatsappNumber || "+91 XXXXX XXXXX"}</span>
              </div>
            </div>

            {/* Social Media */}
            {(businessData.socialLinks?.instagram || businessData.socialLinks?.facebook || businessData.socialLinks?.twitter) && (
              <div className="flex items-center gap-2 pt-1">
                {businessData.socialLinks.instagram && (
                  <span className="inline-flex items-center gap-1 text-[8px] text-[#354F52] bg-[#CAD2C5]/10 border border-[#2F3E46]/8 px-2 py-1 rounded-md">
                    <Instagram className="h-2.5 w-2.5" style={{ color: activeColor }} /> Instagram
                  </span>
                )}
                {businessData.socialLinks.facebook && (
                  <span className="inline-flex items-center gap-1 text-[8px] text-[#354F52] bg-[#CAD2C5]/10 border border-[#2F3E46]/8 px-2 py-1 rounded-md">
                    <Facebook className="h-2.5 w-2.5" style={{ color: activeColor }} /> Facebook
                  </span>
                )}
                {businessData.socialLinks.twitter && (
                  <span className="inline-flex items-center gap-1 text-[8px] text-[#354F52] bg-[#CAD2C5]/10 border border-[#2F3E46]/8 px-2 py-1 rounded-md">
                    <Twitter className="h-2.5 w-2.5" style={{ color: activeColor }} /> Twitter
                  </span>
                )}
              </div>
            )}
          </section>

        </div>

        {/* Footer */}
        <footer className="px-4 py-3 border-t border-[#2F3E46]/10 flex items-center justify-between text-[8px] text-zinc-400 font-mono">
          <span>© {new Date().getFullYear()} {businessData.name || "My Business"}</span>
          <span className="flex items-center gap-0.5">Built with <Heart className="h-2 w-2 text-red-500 fill-red-500 mx-0.5" /> SiteForge</span>
        </footer>

      </div>

    </div>
  );
}
