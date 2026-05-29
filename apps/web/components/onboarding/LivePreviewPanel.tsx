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
              <img src={businessData.logoUrl} alt="Logo" className="h-6 w-6 rounded-md object-cover border border-white/10" />
            ) : (
              <div className="h-5 w-5 rounded bg-zinc-800 border border-white/5 flex items-center justify-center text-[10px] font-bold text-zinc-400">
                L
              </div>
            )}
            <span className={`text-xs font-bold text-white ${fonts.display}`}>
              {businessData.name || "My Business"}
            </span>
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
          <section className="space-y-4">
            {businessData.name ? (
              <div className="space-y-3">
                <h1 
                  className={`text-2xl tracking-tight leading-tight text-white ${fonts.display}`}
                  style={{ color: businessData.style === "bold" ? activeColor : "#FFFFFF" }}
                >
                  Welcome to {businessData.name}
                </h1>
                
                <p className="text-xs text-zinc-400 leading-relaxed">
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
            ) : (
              // Hero Skeleton
              <div className="space-y-3.5 animate-pulse">
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
                  <div key={idx} className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-2xl flex flex-col justify-between h-20 group hover:border-indigo-500/20 transition-all">
                    <span className="text-[11px] font-bold text-zinc-200">{item}</span>
                    <span className="text-[9px] font-semibold" style={{ color: activeColor }}>
                      Available Now
                    </span>
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
