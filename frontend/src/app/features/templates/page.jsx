"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Layout, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  Layers,
  Smartphone,
  Palette
} from "lucide-react";

const stylePresets = [
  {
    name: "Minimalist Style",
    description: "Highly focused text and spacing. Perfect for boutiques, creative writers, and tech portfolios that prioritize clean design.",
    tag: "Clean & Simple"
  },
  {
    name: "Modern retail",
    description: "Curated grids, round borders, and vibrant badge colors. Designed to make bakery boxes, restaurants, and clothing stand out.",
    tag: "Trending Choice"
  },
  {
    name: "Luxury branding",
    description: "Serif typography, dark background themes, and gold border highlights. Ideal for premium spas, boutiques, and dine-in spaces.",
    tag: "Elegant Theme"
  }
];

export default function TemplatesDetailPage() {
  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Back Link */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#354F52] hover:text-[#2F3E46] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="max-w-3xl mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#52796F]/30 bg-[#52796F]/10 px-4 py-1.5 text-xs font-bold text-[#52796F]">
          <Layout className="h-3.5 w-3.5" />
          <span>Website Preset Templates</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-[#2F3E46] leading-tight tracking-tight">
          Ready-to-Use Storefront Presets
        </h1>
        <p className="text-base sm:text-lg text-[#354F52] max-w-2xl leading-relaxed">
          SiteForge features ready-to-use template styles tailored specifically for local businesses. 
          Our AI customizes each theme with colors, sitemaps, and images.
        </p>
      </div>

      {/* Style Presets */}
      <h3 className="font-display text-lg font-bold text-[#2F3E46] uppercase tracking-wider mb-6">Visual Theme Styles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {stylePresets.map((preset, i) => (
          <div key={i} className="bg-white/60 backdrop-blur-md border border-[#2F3E46]/12 rounded-3xl p-6 space-y-4">
            <span className="text-[8.5px] font-black uppercase tracking-wider text-[#52796F] bg-[#52796F]/10 border border-[#52796F]/20 px-2.5 py-0.5 rounded-full">{preset.tag}</span>
            <h4 className="font-bold text-sm text-[#2F3E46]">{preset.name}</h4>
            <p className="text-xs text-[#354F52] leading-relaxed">{preset.description}</p>
          </div>
        ))}
      </div>

      {/* Layout Blocks */}
      <div className="bg-white/60 backdrop-blur-md border border-[#2F3E46]/12 rounded-[32px] p-6 md:p-8 space-y-6 mb-16">
        <h3 className="font-display text-lg font-bold text-[#2F3E46] uppercase tracking-wider border-b border-[#2F3E46]/10 pb-4">Standard Page Layout Blocks</h3>
        <p className="text-xs text-[#354F52] max-w-2xl leading-relaxed">
          Every website created includes these vital components designed to boost user engagement and collect order receipts:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-[#354F52]">
          <div className="p-4 bg-white border border-[#2F3E46]/10 rounded-xl space-y-1">
            <span className="text-base">🚀</span>
            <h4 className="font-bold text-[#2F3E46]">Hero Banner</h4>
            <p className="text-[10px] text-zinc-500">Engaging tagline & primary CTA button.</p>
          </div>
          <div className="p-4 bg-white border border-[#2F3E46]/10 rounded-xl space-y-1">
            <span className="text-base">📋</span>
            <h4 className="font-bold text-[#2F3E46]">Catalog Grid</h4>
            <p className="text-[10px] text-zinc-500">Menu products listed with pricing tags.</p>
          </div>
          <div className="p-4 bg-white border border-[#2F3E46]/10 rounded-xl space-y-1">
            <span className="text-base">💬</span>
            <h4 className="font-bold text-[#2F3E46]">WhatsApp Chat</h4>
            <p className="text-[10px] text-zinc-500">Floating widget for customer chats.</p>
          </div>
          <div className="p-4 bg-white border border-[#2F3E46]/10 rounded-xl space-y-1">
            <span className="text-base">🗺️</span>
            <h4 className="font-bold text-[#2F3E46]">Contact Info</h4>
            <p className="text-[10px] text-zinc-500">Phone lines, address maps, and links.</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-[40px] bg-[#2F3E46] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#52796F]/10 to-transparent" />
        
        <div className="relative z-10 max-w-2xl space-y-6 text-left">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Explore 50+ Custom Themes
          </h2>
          <p className="text-xs sm:text-sm text-[#CAD2C5] leading-relaxed">
            Browse our full template marketplace to select complete designs for local retail, 
            e-commerce, and services. Customize layouts dynamically.
          </p>
          <div className="flex gap-4 pt-2">
            <Link href="/templates">
              <button className="h-12 px-6 rounded-full bg-[#52796F] hover:bg-[#84A98C] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all">
                Browse Marketplace
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="h-12 px-6 rounded-full border border-white text-white hover:bg-white/10 font-extrabold text-xs uppercase tracking-wider transition-all">
                Sign Up Free
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
