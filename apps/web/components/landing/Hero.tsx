"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Sparkles, ChevronRight, Check } from "lucide-react";
import { Button } from "@siteforge/ui";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-zinc-950">
      {/* CSS-Only Premium Grid Background with Radial Fade */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

      {/* Decorative Radial Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 text-left space-y-8 max-w-2xl mx-auto lg:mx-0">
            {/* Top Micro-badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Version 2.0: Instant WhatsApp Integration is Live</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              Build Your Business Website{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                in Minutes
              </span>{" "}
              with AI
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-zinc-400 font-normal leading-relaxed"
            >
              SiteForge empowers local vendors, shops, and small businesses to generate 
              fully customized websites instantly. Just describe your store, and watch the AI do the work.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <Link href="/sign-up">
                <Button className="w-full sm:w-auto h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 rounded-xl shadow-[0_0_25px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2 group">
                  Start Free <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="#demo">
                <Button variant="outline" className="w-full sm:w-auto h-12 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 bg-zinc-950/40 backdrop-blur px-8 rounded-xl flex items-center justify-center gap-2">
                  <Play className="h-4 w-4 fill-zinc-300 text-zinc-300" /> Watch Demo
                </Button>
              </a>
            </motion.div>

            {/* Features checkmark list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-zinc-400"
            >
              {[
                "No credit card required",
                "Ready-to-use WhatsApp chat",
                "Fully editable by voice",
                "Custom domain mapping",
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Floating UI Previews (Right Side) */}
          <div className="lg:col-span-5 relative h-[450px] sm:h-[500px] w-full flex items-center justify-center lg:justify-end mt-10 lg:mt-0">
            {/* Base Glowing Grid / Circle */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-indigo-500/5 border border-indigo-500/10 pointer-events-none" />

            {/* floating Card 1: Sweet Shop Menu */}
            <motion.div
              initial={{ x: 60, y: 100, opacity: 0, rotate: 5 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: -3 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              animate-y={{
                y: [0, -10, 0],
                transition: { repeat: Infinity, duration: 6, ease: "easeInOut" },
              }}
              style={{ rotate: "-3deg" }}
              className="absolute left-4 top-12 z-20 w-64 sm:w-72 bg-zinc-900/90 backdrop-blur border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-indigo-500/40 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
                <span className="text-xs font-semibold text-indigo-400">Delicacies</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-medium">Open</span>
              </div>
              <p className="text-sm font-bold text-white">Sartaj Premium Sweets</p>
              <p className="text-[11px] text-zinc-500 mb-4">Traditional Indian Desserts since 1984</p>
              
              <div className="space-y-2">
                {[
                  { name: "Kaju Katli Special", price: "Rs. 950/kg", rating: "★ 4.9" },
                  { name: "Premium Dry Fruit Ladoo", price: "Rs. 1,200/kg", rating: "★ 4.8" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-[10px] text-zinc-400">{item.price}</p>
                    </div>
                    <span className="text-[10px] text-amber-400 font-bold">{item.rating}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* floating Card 2: Salon Mockup */}
            <motion.div
              initial={{ x: 120, y: -40, opacity: 0, rotate: -8 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 6 }}
              transition={{ duration: 0.8, delay: 0.35, type: "spring" }}
              style={{ rotate: "6deg" }}
              className="absolute right-0 sm:right-4 bottom-8 z-10 w-64 sm:w-72 bg-zinc-900/90 backdrop-blur border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-purple-500/40 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
                <span className="text-xs font-semibold text-purple-400">Salon & Spa</span>
                <span className="text-[10px] text-zinc-400">Bookings Open</span>
              </div>
              <p className="text-sm font-bold text-white">Glow Hair Lounge</p>
              <p className="text-[11px] text-zinc-500 mb-4">Elite grooming for ladies and gentlemen</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300">
                  <span>Hair Styling & Wash</span>
                  <span className="font-semibold">Rs. 450</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-zinc-800/40 text-zinc-300">
                  <span>Premium Facial & Scrub</span>
                  <span className="font-semibold">Rs. 899</span>
                </div>
              </div>
            </motion.div>

            {/* floating Card 3: Small Floating Stats Badge */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
              className="absolute left-1/3 bottom-24 z-30 bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 flex items-center gap-3 shadow-2xl"
            >
              <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Generated by AI</p>
                <p className="text-xs font-bold text-white">100% Mobile Ready</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
