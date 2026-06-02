"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Mic, 
  MousePointer, 
  MessageSquareCode, 
  ShoppingCart, 
  BarChart3,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Website Generation",
    description: "Describe your shop in simple words. Our AI instantly writes copy, selects color palettes, and arranges custom page layouts in seconds.",
    glowColor: "rgba(82, 121, 111, 0.08)",
    badge: "Magical",
    span: "md:col-span-2",
    href: "/features/ai-website-builder",
    illustration: (
      <div className="relative w-full h-36 bg-[#CAD2C5]/30 rounded-2xl border border-[#2F3E46]/12 overflow-hidden flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#84A98C]/20 rounded-full blur-[40px] animate-pulse" />
        <div className="relative z-10 w-4/5 space-y-3 font-mono text-[9px] text-[#354F52] p-4">
          <div className="flex items-center justify-between border-b border-[#2F3E46]/10 pb-2 text-[10px]">
            <span className="font-extrabold text-[#2F3E46]">✨ Generating Shop...</span>
            <span className="text-[#52796F] font-bold">100% complete</span>
          </div>
          <div className="h-3 w-5/6 bg-[#52796F]/10 border border-[#52796F]/25 rounded flex items-center px-2 text-[#52796F] font-bold">
            Selected theme: Soft Sage Cafe
          </div>
          <div className="h-3 w-full bg-white border border-[#2F3E46]/10 rounded flex items-center px-2">
            Loading products: Sourdough Bread, Butter Croissant...
          </div>
        </div>
      </div>
    )
  },
  {
    icon: Mic,
    title: "Smart Voice Editing",
    description: "Talk to your website helper. Use simple voice commands to edit pricing, swap photos, or add new catalog items instantly.",
    glowColor: "rgba(132, 169, 140, 0.08)",
    badge: "India's First",
    span: "md:col-span-1",
    href: "/features/voice-editing",
    illustration: (
      <div className="relative w-full h-36 bg-[#CAD2C5]/30 rounded-2xl border border-[#2F3E46]/12 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#84A98C]/10 to-transparent" />
        <div className="flex items-end justify-center gap-1.5 h-10">
          {[1.2, 2.2, 1.4, 2.8, 1.6, 2.0, 1.0].map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: ["20%", "90%", "20%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
              className="w-1.5 bg-[#52796F] rounded-full"
              style={{ height: "40%" }}
            />
          ))}
        </div>
      </div>
    )
  },
  {
    icon: MousePointer,
    title: "Drag & Drop Builder",
    description: "Need to make quick tweaks? Use our ultra-simple visual editor. Swap text blocks, upload files, and publish with a single tap.",
    glowColor: "rgba(82, 121, 111, 0.08)",
    span: "md:col-span-1",
    href: "/features/ai-website-builder",
    illustration: (
      <div className="relative w-full h-36 bg-[#CAD2C5]/30 rounded-2xl border border-[#2F3E46]/12 overflow-hidden flex items-center justify-center p-4">
        <div className="w-full h-full bg-white border border-[#2F3E46]/10 rounded-xl flex items-center justify-between px-4 relative">
          <div className="h-10 w-20 rounded-lg bg-[#52796F]/10 border border-[#52796F]/30 flex items-center justify-center text-[#52796F] font-bold text-[9px] uppercase tracking-wider">
            Menu Item
          </div>
          <div className="h-6 w-6 rounded-full bg-[#52796F] flex items-center justify-center text-[10px] text-white font-bold shadow-md animate-bounce">
            ☝️
          </div>
          <div className="h-10 w-20 rounded-lg bg-[#CAD2C5]/20 border border-[#2F3E46]/10 flex items-center justify-center text-zinc-400 text-[9px] uppercase tracking-wider">
            Pricing
          </div>
        </div>
      </div>
    )
  },
  {
    icon: MessageSquareCode,
    title: "WhatsApp Integration",
    description: "Connect your WhatsApp Business number. A floating widget links site visitors directly to your chat log.",
    glowColor: "rgba(16, 185, 129, 0.08)",
    badge: "Popular",
    span: "md:col-span-2",
    href: "/features/ai-website-builder",
    illustration: (
      <div className="relative w-full h-36 bg-[#CAD2C5]/30 rounded-2xl border border-[#2F3E46]/12 overflow-hidden flex items-center justify-center p-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#84A98C]/15 rounded-full blur-[40px] pointer-events-none" />
        <div className="relative z-10 w-full max-w-sm bg-white border border-[#2F3E46]/12 rounded-xl p-3 flex items-center gap-3 shadow-sm">
          <div className="h-10 w-10 rounded-full bg-[#84A98C] flex items-center justify-center text-white font-extrabold text-sm shrink-0">
            💬
          </div>
          <div className="truncate flex-1">
            <p className="font-extrabold text-[#2F3E46] text-[11px]">Chat with Owner</p>
            <p className="text-[9px] text-[#354F52] truncate">“Hi! I want to order the custom wedding cake...”</p>
          </div>
          <span className="text-[8px] bg-[#84A98C]/15 border border-[#84A98C]/20 text-[#52796F] font-bold px-2 py-0.5 rounded-full shrink-0">Online</span>
        </div>
      </div>
    )
  },
  {
    icon: ShoppingCart,
    title: "Online Orders Drawer",
    description: "Let customers select products and checkout. Items are grouped automatically and sent as a neat receipt to your WhatsApp.",
    glowColor: "rgba(245, 158, 11, 0.08)",
    span: "md:col-span-2",
    href: "/features/voice-editing",
    illustration: (
      <div className="relative w-full h-36 bg-[#CAD2C5]/30 rounded-2xl border border-[#2F3E46]/12 overflow-hidden flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-[#2F3E46]/12 rounded-xl p-3 space-y-2 shadow-sm">
          <div className="flex justify-between items-center text-[10px] text-[#354F52] border-b border-[#2F3E46]/10 pb-2 font-bold uppercase tracking-wider">
            <span>Your Order Drawer</span>
            <span className="text-[#52796F]">Total: Rs. 1,070</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-[#2F3E46]">1x Premium Sweet Box</span>
            <span className="text-[#354F52] font-semibold">Rs. 950</span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="font-bold text-[#2F3E46]">1x Garlic Sourdough</span>
            <span className="text-[#354F52] font-semibold">Rs. 120</span>
          </div>
        </div>
      </div>
    )
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track page views, customer locations, and WhatsApp clicks easily. See how your business is growing daily.",
    glowColor: "rgba(82, 121, 111, 0.08)",
    badge: "Real-time",
    span: "md:col-span-1",
    href: "/features/voice-editing",
    illustration: (
      <div className="relative w-full h-36 bg-[#CAD2C5]/30 rounded-2xl border border-[#2F3E46]/12 overflow-hidden flex items-center justify-center p-4">
        <div className="w-full h-full bg-white border border-[#2F3E46]/12 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-center text-[8px] text-[#354F52] uppercase tracking-widest font-bold">
            <span>Weekly Sales</span>
            <span className="text-[#84A98C] font-extrabold">+18.4%</span>
          </div>
          <div className="flex items-end justify-between h-14 pt-2">
            {[40, 60, 45, 80, 55, 95, 75].map((val, idx) => (
              <div key={idx} className="w-2.5 bg-[#CAD2C5]/40 rounded-t-sm relative h-full">
                <div className="absolute bottom-0 left-0 right-0 bg-[#52796F] rounded-t-sm" style={{ height: `${val}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white border-t border-[#2F3E46]/12 relative">
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#84A98C]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="font-display text-sm font-semibold tracking-wider text-[#52796F] uppercase">
            Powerful Features
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2F3E46]">
            Everything You Need To Grow Online
          </p>
          <p className="text-[#354F52] text-sm sm:text-base">
            SiteForge replaces expensive developer agencies and complex tools with single-click AI features designed specifically for store owners.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className={`relative overflow-hidden rounded-[32px] border border-[#2F3E46]/12 bg-white p-8 flex flex-col justify-between group transition-all duration-300 shadow-sm hover:shadow-md ${feat.span}`}
              >
                {/* Custom glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 250px at center, ${feat.glowColor}, transparent)`
                  }}
                />

                {/* Illustration block (Top) */}
                <div className="mb-6 relative z-10">
                  {feat.illustration}
                </div>

                <div className="space-y-4 relative z-10 flex-1 flex flex-col justify-end">
                  {/* Icon and Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#CAD2C5]/20 border border-[#2F3E46]/12 text-[#52796F] group-hover:scale-110 group-hover:bg-[#52796F]/10 transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    {feat.badge && (
                      <span className="text-[9px] uppercase font-black tracking-widest px-3 py-1 rounded-full bg-[#CAD2C5]/30 border border-[#2F3E46]/12 text-[#354F52]">
                        {feat.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold text-[#2F3E46] group-hover:text-[#52796F] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#354F52] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>

                {/* Bottom link decoration */}
                <Link
                  href={feat.href}
                  className="mt-6 pt-4 border-t border-[#2F3E46]/10 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#354F52] hover:text-[#52796F] transition-colors duration-200 cursor-pointer group/btn w-fit relative z-20 pointer-events-auto"
                >
                  <span>Learn more</span>
                  <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/btn:translate-x-1.5 group-hover:translate-x-1.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
