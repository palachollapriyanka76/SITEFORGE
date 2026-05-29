"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  MousePointer, 
  Mic, 
  Globe, 
  BarChart3, 
  MessageSquareCode,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Website Generation",
    description: "Describe your business in plain words. Our advanced AI model generates customized structures, copy, images, and brand palettes in seconds.",
    className: "md:col-span-2 bg-gradient-to-br from-indigo-950/40 via-zinc-900/50 to-zinc-900/50 border-indigo-500/20",
    glowColor: "rgba(99, 102, 241, 0.15)",
    badge: "Most Advanced"
  },
  {
    icon: MousePointer,
    title: "Intuitive Drag & Drop",
    description: "Fine-tune and arrange elements with absolute ease. Our visual editor requires zero training.",
    className: "md:col-span-1 bg-zinc-900/50 border-white/5",
    glowColor: "rgba(168, 85, 247, 0.1)"
  },
  {
    icon: Mic,
    title: "Smart Voice Editing",
    description: "Don't feel like typing? Talk to SiteForge. Use simple voice prompts to modify text, swap images, or update pricing.",
    className: "md:col-span-1 bg-zinc-900/50 border-white/5",
    glowColor: "rgba(236, 72, 153, 0.1)",
    badge: "Beta"
  },
  {
    icon: MessageSquareCode,
    title: "WhatsApp Shop Integration",
    description: "Receive orders and inquiries directly in your WhatsApp inbox. Convert site visitors into conversations and sales with a floating WhatsApp chat widget.",
    className: "md:col-span-2 bg-gradient-to-br from-emerald-950/20 via-zinc-900/50 to-zinc-900/50 border-emerald-500/10",
    glowColor: "rgba(16, 185, 129, 0.12)",
    badge: "Highly Popular"
  },
  {
    icon: Globe,
    title: "One-Click Publish",
    description: "Host on a free siteforge.app domain or map your custom domain instantly. SSL security, hosting, and CDN are all handled for you.",
    className: "md:col-span-1 bg-zinc-900/50 border-white/5",
    glowColor: "rgba(59, 130, 246, 0.1)"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "See where your visitors are coming from. Track page views, call clicks, and product clicks directly from your vendor dashboard.",
    className: "md:col-span-2 bg-zinc-900/50 border-white/5",
    glowColor: "rgba(245, 158, 11, 0.1)"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="font-display text-sm font-semibold tracking-wider text-indigo-400 uppercase">
            Powerful Features
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Everything You Need to Sell Online
          </p>
          <p className="text-zinc-400 text-base sm:text-lg">
            SiteForge replaces expensive developer fees and complex tools with single-click AI features designed specifically for vendors.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className={`relative overflow-hidden rounded-3xl border p-8 flex flex-col justify-between group transition-all duration-300 ${feature.className}`}
                style={{
                  boxShadow: `0 0 0px transparent`
                }}
              >
                {/* Custom glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 250px at center, ${feature.glowColor}, transparent)`
                  }}
                />

                <div className="space-y-6 relative z-10">
                  {/* Top Header Row with Icon and Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800/80 border border-white/10 text-white group-hover:scale-110 group-hover:border-indigo-400/30 group-hover:bg-indigo-600/10 group-hover:text-indigo-400 transition-all duration-300">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    {feature.badge && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Bottom link decoration */}
                <div className="mt-8 flex items-center gap-1.5 text-xs font-semibold text-zinc-500 group-hover:text-indigo-400 transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
