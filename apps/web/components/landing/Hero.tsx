"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Sparkles, ChevronRight, Check, Users, MessageSquare, TrendingUp, Calendar } from "lucide-react";
import { Button } from "../ui/Button";

// Screen mockup content config
const mockScreens = [
  {
    id: "bakery",
    title: "Golden Crust Bakery",
    subtitle: "Artisanal breads & premium sweets in Jaipur",
    banner: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop",
    colors: { theme: "text-[#52796F]", button: "bg-[#52796F] hover:bg-[#354F52]" },
    menu: [
      { name: "Kaju Katli Special", price: "Rs. 950/kg" },
      { name: "Fresh Garlic Sourdough", price: "Rs. 120/pc" }
    ]
  },
  {
    id: "restaurant",
    title: "Saffron Spices Dine-in",
    subtitle: "Authentic North Indian cuisines in Delhi",
    banner: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=400&auto=format&fit=crop",
    colors: { theme: "text-[#52796F]", button: "bg-[#52796F] hover:bg-[#354F52]" },
    menu: [
      { name: "Butter Chicken Special", price: "Rs. 380" },
      { name: "Paneer Tikka Kebab", price: "Rs. 320" }
    ]
  },
  {
    id: "salon",
    title: "Glow & Style Lounge",
    subtitle: "Premium hair styling and salon in Bangalore",
    banner: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=400&auto=format&fit=crop",
    colors: { theme: "text-[#52796F]", button: "bg-[#52796F] hover:bg-[#354F52]" },
    menu: [
      { name: "Hair Styling & Spa", price: "Rs. 650" },
      { name: "Bridal Facials", price: "Rs. 2,499" }
    ]
  }
];

export default function Hero() {
  const [screenIndex, setScreenIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setScreenIndex((prev) => (prev + 1) % mockScreens.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeScreen = mockScreens[screenIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#CAD2C5] via-[#CAD2C5] to-[#84A98C]/40 pt-24 pb-12">
      {/* Decorative Radial Glowing Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#84A98C]/15 rounded-full blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#52796F]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-6rem)]">
          
          {/* Left Panel: 55% spacing */}
          <div className="lg:col-span-7 space-y-8 text-left max-w-2xl mx-auto lg:mx-0">
            {/* Top Micro-badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#52796F]/30 bg-[#52796F]/10 px-4 py-1.5 text-xs font-semibold text-[#354F52]"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#52796F]" />
              <span>Trusted by 10,000+ Local Businesses</span>
            </motion.div>

            {/* Huge Headline (3 lines target) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight text-[#2F3E46] leading-[1.05] space-y-2"
            >
              <span className="block">Build Your Business</span>
              <span className="block">Website In Minutes</span>
              <span className="text-[#52796F] drop-shadow-[0_0_20px_rgba(82,121,111,0.15)]">
                With AI
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-[#354F52] font-semibold leading-relaxed"
            >
              Describe your business. Our AI designs, writes, and launches your website instantly.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link href="/sign-up">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto h-14 px-8 rounded-full bg-[#52796F] hover:bg-[#354F52] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors duration-200"
                >
                  Start Free <ChevronRight className="h-4.5 w-4.5" />
                </motion.button>
              </Link>
              <a href="#demo">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="w-full sm:w-auto h-14 px-8 rounded-full border-2 border-[#52796F] bg-transparent text-[#52796F] font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#52796F]/10 transition-colors"
                >
                  <Play className="h-4.5 w-4.5 fill-[#52796F] text-[#52796F]" /> Watch Demo
                </motion.button>
              </a>
            </motion.div>

            {/* Benefit checkmarks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-bold text-[#354F52] uppercase tracking-wider pt-4"
            >
              {[
                "No credit card needed",
                "Instant WhatsApp Chat Widget",
                "Update easily by voice prompts",
                "Free domain included"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#52796F]/10 text-[#52796F] shrink-0">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Panel: 45% spacing (Laptop Mockup) */}
          <div className="lg:col-span-5 relative h-[500px] w-full flex items-center justify-center mt-12 lg:mt-0">
            
            {/* Ambient Screen Shadow Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#52796F]/10 via-[#84A98C]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

            {/* Laptop Frame */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-[420px] aspect-[14/10] bg-white border border-[#2F3E46]/12 rounded-2xl p-2.5 shadow-2xl relative z-10 flex flex-col overflow-hidden"
            >
              {/* Chrome Top Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-[#2F3E46]/10 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-zinc-300" />
                  <span className="h-2 w-2 rounded-full bg-zinc-300" />
                  <span className="h-2 w-2 rounded-full bg-zinc-300" />
                </div>
                <div className="h-4 px-4 bg-[#CAD2C5]/20 rounded text-[8px] text-[#354F52] font-mono flex items-center justify-center w-40 truncate">
                  siteforge.app/preview/{activeScreen.id}
                </div>
                <div className="w-8" />
              </div>

              {/* Screen Web canvas */}
              <div className="flex-1 bg-white rounded-lg overflow-hidden flex flex-col relative text-[10px] text-[#354F52] border border-[#2F3E46]/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col p-3 space-y-3.5"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-[#2F3E46]/10 pb-2">
                      <span className="font-extrabold text-[#2F3E46]">{activeScreen.title}</span>
                      <div className="flex gap-2 text-[8px] text-zinc-400 font-medium">
                        <span>Menu</span>
                        <span>Photos</span>
                        <span>Location</span>
                      </div>
                    </div>

                    {/* Banner Card Graphic */}
                    <div className="relative h-20 w-full rounded-lg overflow-hidden border border-[#2F3E46]/10">
                      <img src={activeScreen.banner} alt="mockup banner" className="h-full w-full object-cover opacity-85" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                      <div className="absolute bottom-2 left-2">
                        <p className="font-black text-[#2F3E46] leading-tight">{activeScreen.title}</p>
                        <p className="text-[7px] text-[#354F52] font-semibold">{activeScreen.subtitle}</p>
                      </div>
                    </div>

                    {/* Catalog Menu lists */}
                    <div className="space-y-1.5">
                      {activeScreen.menu.map((m, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 rounded-md bg-[#CAD2C5]/10 border border-[#2F3E46]/10">
                          <span className="font-bold text-[#354F52]">{m.name}</span>
                          <span className={`font-black ${activeScreen.colors.theme}`}>{m.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-1 border-t border-[#2F3E46]/10 text-[8px] text-[#354F52]">
                      <span className="text-[#354F52] font-mono">Powered by SiteForge</span>
                      <button className={`px-2.5 py-1 rounded-full text-white font-extrabold text-[7px] ${activeScreen.colors.button} transition-colors`}>
                        Order Now
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Laptop Base */}
            <div className="absolute bottom-[44px] w-[460px] h-3 bg-zinc-200 border-t border-white rounded-b-xl z-20 shadow-2xl" />

            {/* 4 Floating Analytics Cards - WHITE background with soft shadows & green accents */}
            {/* Card 1: Visitor Count */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 z-30 bg-white border border-[#2F3E46]/12 rounded-[24px] p-3.5 flex items-center gap-3 shadow-xl"
            >
              <div className="h-9 w-9 rounded-xl bg-[#52796F]/10 flex items-center justify-center text-[#52796F]">
                <Users className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[9px] text-[#354F52] uppercase font-bold tracking-wider">Live Visitors</p>
                <p className="text-xs font-black text-[#2F3E46]">+1,240 Today</p>
              </div>
            </motion.div>

            {/* Card 2: WhatsApp Orders */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-10 right-6 z-30 bg-white border border-[#2F3E46]/12 rounded-[24px] p-3.5 flex items-center gap-3 shadow-xl max-w-[210px]"
            >
              <div className="h-9 w-9 rounded-xl bg-[#84A98C]/10 flex items-center justify-center text-[#52796F] shrink-0">
                <MessageSquare className="h-4.5 w-4.5" />
              </div>
              <div className="truncate">
                <p className="text-[9px] text-[#354F52] uppercase font-bold tracking-wider">WhatsApp Order</p>
                <p className="text-xs font-black text-[#2F3E46] truncate">2x Cakes Ordered!</p>
              </div>
            </motion.div>

            {/* Card 3: Revenue */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-2 -right-8 z-30 bg-white border border-[#2F3E46]/12 rounded-[24px] p-3.5 flex items-center gap-3 shadow-xl"
            >
              <div className="h-9 w-9 rounded-xl bg-[#84A98C]/15 flex items-center justify-center text-[#52796F]">
                <TrendingUp className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[9px] text-[#354F52] uppercase font-bold tracking-wider">Store Revenue</p>
                <p className="text-xs font-black text-[#2F3E46]">Rs. 18,450</p>
              </div>
            </motion.div>

            {/* Card 4: New Lead */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-12 -left-8 z-30 bg-white border border-[#2F3E46]/12 rounded-[24px] p-3.5 flex items-center gap-3 shadow-xl"
            >
              <div className="h-9 w-9 rounded-xl bg-[#52796F]/10 flex items-center justify-center text-[#52796F]">
                <Calendar className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[9px] text-[#354F52] uppercase font-bold tracking-wider">Bookings</p>
                <p className="text-xs font-black text-[#2F3E46]">New Lead at 4 PM</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
