"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Cpu,
  Layers,
  Zap,
  Globe
} from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Instant Assembly",
    desc: "Bypass months of back-and-forth mockups with designers. Your site is assembled and published in under 30 seconds."
  },
  {
    icon: Cpu,
    title: "AI-Powered Copywriting",
    desc: "Struggling to write headings? Our copywriting engine writes descriptions, product details, and headlines automatically."
  },
  {
    icon: TrendingUp,
    title: "Optimized for Local SEO",
    desc: "Every site features automatic JSON-LD markup and metadata designed to rank your business locally on Google search."
  }
];

const categories = [
  { name: "Bakery", icon: "🥐", desc: "Showcase sweets, sourdough, and pastry catalogs with simple pricing lists." },
  { name: "Restaurant", icon: "🍲", desc: "Display full dine-in menus, specialties, and take online order receipts." },
  { name: "Salon & Spa", icon: "✂️", desc: "List styling packages, treatments, and accept booking leads." },
  { name: "Electronics", icon: "🔌", desc: "Display devices, model listings, and custom specification sheets." },
  { name: "Grocery", icon: "🍎", desc: "List organic produce, spices, and bulk grains for WhatsApp checkouts." },
  { name: "Fashion Boutique", icon: "👗", desc: "Showcase seasonal styles, clothing catalogs, and size sheets." }
];

const exampleSites = [
  { name: "Golden Crust Bakery", category: "Bakery", domain: "goldencrust.siteforge.app", rating: "4.9 ★" },
  { name: "Grace Hair Lounge", category: "Salon & Spa", domain: "gracesalon.siteforge.app", rating: "4.8 ★" },
  { name: "Spice Route Dine-In", category: "Restaurant", domain: "spiceroute.siteforge.app", rating: "4.9 ★" }
];

export default function AIWebsiteGenerationPage() {
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
          <Sparkles className="h-3.5 w-3.5" />
          <span>Core AI Engine Features</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-[#2F3E46] leading-tight tracking-tight">
          How AI Website Generation Works
        </h1>
        <p className="text-base sm:text-lg text-[#354F52] max-w-2xl leading-relaxed">
          SiteForge builds your digital storefront dynamically by combining advanced language models 
          with responsive, custom CSS layout components. Learn about our generation pipeline below.
        </p>
      </div>

      {/* SVG Workflow Diagram Section */}
      <div className="bg-white border border-[#2F3E46]/12 rounded-[32px] p-6 md:p-10 shadow-sm mb-16 space-y-8">
        <div className="flex items-center gap-2.5">
          <Layers className="h-5 w-5 text-[#52796F]" />
          <h3 className="font-display text-lg font-bold text-[#2F3E46] uppercase tracking-wider">AI Generation Pipeline Diagram</h3>
        </div>

        {/* SVG Diagram - Responsive */}
        <div className="w-full overflow-x-auto py-4">
          <svg className="w-full min-w-[700px] h-32" viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Step 1: Input */}
            <rect x="10" y="10" width="160" height="80" rx="16" fill="#52796F" fillOpacity="0.08" stroke="#52796F" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="90" y="45" textAnchor="middle" fill="#2F3E46" fontSize="11" fontWeight="bold">1. Input Description</text>
            <text x="90" y="65" textAnchor="middle" fill="#52796F" fontSize="9" fontWeight="semibold">Analyze shop prompt</text>
            
            {/* Arrow 1 */}
            <path d="M185 50 H210 M210 50 L204 46 M210 50 L204 54" stroke="#52796F" strokeWidth="1.5" />

            {/* Step 2: Content Assembly */}
            <rect x="220" y="10" width="160" height="80" rx="16" fill="#52796F" fillOpacity="0.08" stroke="#52796F" strokeWidth="1.5" />
            <text x="300" y="45" textAnchor="middle" fill="#2F3E46" fontSize="11" fontWeight="bold">2. Content Assembly</text>
            <text x="300" y="65" textAnchor="middle" fill="#52796F" fontSize="9" fontWeight="semibold">Generate menus & copy</text>

            {/* Arrow 2 */}
            <path d="M395 50 H420 M420 50 L414 46 M420 50 L414 54" stroke="#52796F" strokeWidth="1.5" />

            {/* Step 3: Design Generation */}
            <rect x="430" y="10" width="160" height="80" rx="16" fill="#52796F" fillOpacity="0.08" stroke="#52796F" strokeWidth="1.5" />
            <text x="510" y="45" textAnchor="middle" fill="#2F3E46" fontSize="11" fontWeight="bold">3. Design Selection</text>
            <text x="510" y="65" textAnchor="middle" fill="#52796F" fontSize="9" fontWeight="semibold">Assign colors & fonts</text>

            {/* Arrow 3 */}
            <path d="M605 50 H630 M630 50 L624 46 M630 50 L624 54" stroke="#52796F" strokeWidth="1.5" />

            {/* Step 4: Hosting Deploy */}
            <rect x="640" y="10" width="150" height="80" rx="16" fill="#52796F" fillOpacity="0.15" stroke="#52796F" strokeWidth="2" />
            <text x="715" y="45" textAnchor="middle" fill="#2F3E46" fontSize="11" fontWeight="bold">4. Live Deployment</text>
            <text x="715" y="65" textAnchor="middle" fill="#52796F" fontSize="9" fontWeight="bold">Edge CDN Hosting</text>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#2F3E46]/10 text-xs text-[#354F52]">
          <div className="space-y-2">
            <h4 className="font-extrabold text-[#2F3E46]">Natural Language Understanding</h4>
            <p className="leading-relaxed">
              When you submit a text description (e.g. “A cozy home bakery that uses organic butter in Mumbai”), 
              our parser extracts entities, locations, specialties, and styles to map out appropriate layout structures.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-extrabold text-[#2F3E46]">Automatic Component Assembly</h4>
            <p className="leading-relaxed">
              Once parsed, the system selects responsive modular components (Hero banners, Grid catalogs, 
              WhatsApp float links, FAQ accordions) and populates them with AI-written headlines, reviews, and catalog cards.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <h3 className="font-display text-lg font-bold text-[#2F3E46] uppercase tracking-wider mb-6">Key Platform Benefits</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <div key={i} className="bg-white/60 backdrop-blur-md border border-[#2F3E46]/12 rounded-3xl p-6 space-y-4">
              <div className="h-10 w-10 bg-[#52796F]/10 border border-[#52796F]/20 rounded-xl flex items-center justify-center text-[#52796F]">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-[#2F3E46]">{b.title}</h4>
              <p className="text-xs text-[#354F52] leading-relaxed">{b.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Business Verticals and Examples */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Categories (7 cols) */}
        <div className="lg:col-span-7 bg-white/60 backdrop-blur-md border border-[#2F3E46]/12 rounded-[32px] p-6 md:p-8 space-y-6">
          <h3 className="font-display text-lg font-bold text-[#2F3E46] uppercase tracking-wider border-b border-[#2F3E46]/10 pb-4">Supported Business Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((c, i) => (
              <div key={i} className="flex gap-3 items-start p-2 hover:bg-[#CAD2C5]/20 rounded-xl transition-colors">
                <span className="text-xl bg-white border border-[#2F3E46]/10 h-10 w-10 rounded-xl flex items-center justify-center shadow-sm shrink-0">{c.icon}</span>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs text-[#2F3E46]">{c.name}</h4>
                  <p className="text-[10px] text-[#354F52] leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Example Websites (5 cols) */}
        <div className="lg:col-span-5 bg-[#2F3E46] text-[#CAD2C5] rounded-[32px] p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider border-b border-white/10 pb-4">Example Generated Sites</h3>
            <div className="space-y-3.5">
              {exampleSites.map((site, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white text-xs">{site.name}</h4>
                    <p className="text-[9px] text-[#84A98C] font-semibold">{site.category}</p>
                    <p className="text-[10px] text-zinc-400 font-mono pt-1 flex items-center gap-1"><Globe className="h-3 w-3" /> {site.domain}</p>
                  </div>
                  <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">{site.rating}</span>
                </div>
              ))}
            </div>
          </div>

          <Link href="/auth/signup" className="block pt-4">
            <button className="w-full h-11 rounded-full bg-[#52796F] hover:bg-[#84A98C] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all">
              Create Your Website <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}
