"use client";

import { useOnboardingStore } from "../../src/store/onboarding.store";
import { 
  Globe, 
  MessageSquare, 
  Instagram, 
  Facebook, 
  Twitter, 
  Phone,
  Compass,
  ArrowRight,
  Heart
} from "lucide-react";

const HERO_IMAGES: Record<string, string> = {
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

export function getHeroImageForPreview(type = "", name = ""): string {
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
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-white/10 shadow-sm bg-zinc-900">
      <span className="text-sm">{emojiChar}</span>
      <span className="text-xs font-black tracking-tight" style={{ color: activeColor }}>{name || "My Business"}</span>
    </div>
  );
}

const ITEM_PREVIEW_DATABASE: Record<string, string> = {
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

function getItemPreviewImage(itemName: string): string {
  if (!itemName || typeof itemName !== 'string') return "";
  const key = itemName.toLowerCase().trim();
  for (const [dbKey, url] of Object.entries(ITEM_PREVIEW_DATABASE)) {
    if (key === dbKey || key.includes(dbKey) || dbKey.includes(key)) {
      return url;
    }
  }
  return `https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=75&query=${encodeURIComponent(key)}`;
}

export default function LivePreviewPanel() {
  const { businessData } = useOnboardingStore();

  // Parse font family based on style choice
  const getFontClasses = () => {
    switch (businessData.style) {
      case "classic":
        return { sans: "font-serif", display: "font-serif" };
      case "minimal":
        return { sans: "font-sans tracking-tight", display: "font-mono font-bold" };
      case "bold":
        return { sans: "font-sans font-medium", display: "font-sans font-black tracking-tighter" };
      default:
        return { sans: "font-sans", display: "font-sans font-extrabold" };
    }
  };

  const fonts = getFontClasses();
  const activeColor = businessData.colorTheme || "#6366F1"; // Default Indigo
  const heroImg = getHeroImageForPreview(businessData.type, businessData.name);

  return (
    <div className="flex flex-col h-full bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      
      {/* Browser Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-900">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
        </div>
        <div className="h-5 px-3 rounded-md bg-zinc-950 border border-zinc-800 flex items-center text-[9px] text-zinc-500 font-mono gap-1 select-none w-56 truncate justify-center">
          <Globe className="h-2.5 w-2.5 text-zinc-600" />
          <span>{businessData.name ? `${businessData.name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.siteforge.app` : "yoursite.siteforge.app"}</span>
        </div>
        <div className="w-8" />
      </div>

      {/* Preview Viewport */}
      <div className={`flex-1 overflow-y-auto p-5 bg-zinc-950 text-zinc-100 ${fonts.sans} scrollbar-thin`}>
        
        {/* Mock Navigation Header */}
        <header className="flex items-center justify-between pb-4 border-b border-zinc-900">
          <div className="flex items-center gap-1.5">
            {businessData.logoUrl ? (
              <img src={businessData.logoUrl} alt="Logo" className="h-6 w-auto rounded-md object-contain border border-white/10" />
            ) : (
              getPreviewLogoBadge(businessData.name, businessData.type, activeColor)
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-zinc-400 font-medium">Home</span>
            <span className="text-[10px] text-zinc-500">Products</span>
            {businessData.ordering && (
              <button 
                className="h-6 px-3 rounded text-[9px] font-bold text-white shadow-sm transition-all"
                style={{ backgroundColor: activeColor }}
              >
                Order
              </button>
            )}
          </div>
        </header>

        {/* Preview Sections Container */}
        <div className="space-y-10 py-6">
          
          {/* Section 1: Hero Block */}
          <section className="relative overflow-hidden rounded-2xl border border-zinc-800/80">
            {heroImg ? (
              <div className="relative h-52 w-full">
                <img 
                  src={heroImg} 
                  alt={businessData.type || "Business"} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                  <h1 
                    className={`text-2xl tracking-tight leading-tight text-white ${fonts.display}`}
                    style={{ color: businessData.style === "bold" ? activeColor : "#FFFFFF" }}
                  >
                    Welcome to {businessData.name || "Your Business"}
                  </h1>
                  
                  <p className="text-xs text-zinc-300 leading-relaxed max-w-lg">
                    {businessData.type ? `We are your premium local ${businessData.type.toLowerCase()} in town.` : "We build a personalized experience optimized for your local search ranking."}
                    {businessData.audience && ` Serving the best selection to ${businessData.audience}.`}
                  </p>

                  <div className="flex gap-2.5 pt-1">
                    {businessData.whatsappEnabled && businessData.whatsappNumber ? (
                      <button className="h-8 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1.5 shadow-sm transition-colors">
                        <MessageSquare className="h-3.5 w-3.5" /> Order on WhatsApp
                      </button>
                    ) : (
                      <button 
                        className="h-8 px-4 rounded-lg text-white font-bold text-[10px] flex items-center gap-1 shadow-sm transition-colors"
                        style={{ backgroundColor: activeColor }}
                      >
                        Learn More <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                    {businessData.socialLinks.instagram && (
                      <a href={businessData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                        <Instagram className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Hero Skeleton
              <div className="space-y-3.5 animate-pulse p-5">
                <div className="h-6 w-3/4 bg-zinc-900 border border-zinc-800/60 rounded" />
                <div className="space-y-1.5">
                  <div className="h-3 w-full bg-zinc-900/50 border border-zinc-800/40 rounded" />
                  <div className="h-3 w-5/6 bg-zinc-900/50 border border-zinc-800/40 rounded" />
                </div>
                <div className="h-8 w-32 bg-zinc-900 border border-zinc-800/60 rounded-lg" />
              </div>
            )}
          </section>

          {/* Section 2: About / Services Skeleton */}
          <section className="space-y-4 pt-4 border-t border-zinc-900/60">
            <h3 className={`text-xs font-extrabold uppercase tracking-wider text-zinc-500 ${fonts.display}`}>
              Our Offerings & Specialties
            </h3>

            {businessData.products && businessData.products.length > 0 ? (
              <div className="grid grid-cols-2 gap-3.5">
                {businessData.products.map((item, idx) => (
                  <div key={idx} className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/20 transition-all overflow-hidden">
                    <img 
                      src={getItemPreviewImage(item)} 
                      alt={item} 
                      className="w-full h-20 object-cover rounded-xl mb-2 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-zinc-200 truncate">{item}</span>
                      <span className="text-[9px] font-semibold" style={{ color: activeColor }}>
                        Available Now
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Services Skeletons
              <div className="grid grid-cols-2 gap-3 animate-pulse">
                <div className="h-16 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl" />
                <div className="h-16 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl" />
              </div>
            )}
          </section>

          {/* Section 2.1: Services Grid */}
          {businessData.services && businessData.services.length > 0 && (
            <section className="space-y-3 pt-4 border-t border-zinc-900/60">
              <h3 className={`text-xs font-extrabold uppercase tracking-wider text-zinc-500 ${fonts.display}`}>
                Our Services
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {businessData.services.map((srv, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-900 text-[11px] font-semibold text-zinc-200">
                    <span className="truncate flex-1">✓ {srv}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-indigo-400">Featured</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 2.2: Categories Tags */}
          {businessData.categories && businessData.categories.length > 0 && (
            <section className="space-y-3 pt-4 border-t border-zinc-900/60">
              <h3 className={`text-xs font-extrabold uppercase tracking-wider text-zinc-500 ${fonts.display}`}>
                Catalog Navigation
              </h3>
              <div className="flex flex-wrap gap-2">
                {businessData.categories.map((cat, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {cat}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Section 3: Contact & Info Block */}
          <section className="space-y-4 pt-4 border-t border-zinc-900/60 bg-zinc-950">
            <h3 className={`text-xs font-extrabold uppercase tracking-wider text-zinc-500 ${fonts.display}`}>
              Contact Details
            </h3>
            
            <div className="space-y-2 text-[11px] text-zinc-400">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                <span>{businessData.whatsappNumber || "+91 (No WhatsApp connected yet)"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
                <span>Locally based business ready to serve.</span>
              </div>
            </div>

            {/* Social media active capsules */}
            {(businessData.socialLinks.instagram || businessData.socialLinks.facebook || businessData.socialLinks.twitter) ? (
              <div className="flex items-center gap-2.5 pt-2">
                {businessData.socialLinks.instagram && (
                  <span className="inline-flex items-center gap-1 text-[9px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md">
                    <Instagram className="h-3 w-3 text-pink-500" /> Instagram
                  </span>
                )}
                {businessData.socialLinks.facebook && (
                  <span className="inline-flex items-center gap-1 text-[9px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md">
                    <Facebook className="h-3 w-3 text-blue-500" /> Facebook
                  </span>
                )}
                {businessData.socialLinks.twitter && (
                  <span className="inline-flex items-center gap-1 text-[9px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md">
                    <Twitter className="h-3 w-3 text-sky-400" /> Twitter
                  </span>
                )}
              </div>
            ) : (
              // Social placeholder
              <div className="h-4 w-32 bg-zinc-900/40 border border-zinc-800/40 rounded animate-pulse" />
            )}
          </section>

        </div>

        {/* Mock Footer */}
        <footer className="mt-8 pt-4 border-t border-zinc-900 flex items-center justify-between text-[9px] text-zinc-600 font-mono">
          <span>Hosted by SiteForge</span>
          <span className="flex items-center gap-0.5">Built with <Heart className="h-2.5 w-2.5 text-red-500 fill-red-500" /></span>
        </footer>

      </div>

    </div>
  );
}
