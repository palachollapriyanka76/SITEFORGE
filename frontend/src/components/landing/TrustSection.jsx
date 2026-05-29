"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp, Zap } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="py-24 bg-white border-t border-[#2F3E46]/12 relative">
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-[#84A98C]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="font-display text-sm font-semibold tracking-wider text-[#52796F] uppercase">
            Platform Trust
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2F3E46]">
            Built On Real Business Growth
          </p>
          <p className="text-[#354F52] text-sm sm:text-base">
            We help you bypass developers to launch a lightning-fast, high-converting digital storefront directly aligned with local searches.
          </p>
        </div>

        {/* 3-Column Trust Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Google Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[32px] border border-[#2F3E46]/12 bg-white p-8 space-y-6 shadow-sm hover:border-[#52796F]/30 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#52796F]/10 border border-[#52796F]/20 flex items-center justify-center text-[#52796F]">
                <Star className="h-5 w-5 fill-[#52796F]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2F3E46] uppercase tracking-wider">Google Reviews</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">5-Star Customer Rating</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-4xl font-black text-[#2F3E46]">4.9 / 5.0</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-[#52796F] text-[#52796F]" />
                ))}
              </div>
              <p className="text-xs text-[#354F52] leading-relaxed border-t border-[#2F3E46]/10 pt-4 italic">
                “SiteForge made it possible to set up our restaurant menu without typing a single line of code. Incredible support!”
              </p>
            </div>
          </motion.div>

          {/* Card 2: Customer Stories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[32px] border border-[#2F3E46]/12 bg-white p-8 space-y-6 shadow-sm hover:border-[#52796F]/30 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#52796F]/10 border border-[#52796F]/20 flex items-center justify-center text-[#52796F]">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2F3E46] uppercase tracking-wider">Growth Stories</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Online Revenue Gains</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-4xl font-black text-[#2F3E46]">+210%</p>
              <p className="text-xs text-[#354F52] font-bold">Sweet Delights Bakery, Jaipur</p>
              <p className="text-xs text-[#354F52] leading-relaxed border-t border-[#2F3E46]/10 pt-4">
                Increased order volumes threefold inside the first 30 days of replacing their standard Instagram catalog with a SiteForge checkout widget.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[32px] border border-[#2F3E46]/12 bg-white p-8 space-y-6 shadow-sm hover:border-[#52796F]/30 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#52796F]/10 border border-[#52796F]/20 flex items-center justify-center text-[#52796F]">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2F3E46] uppercase tracking-wider">Page Speed</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Core Web Vitals</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-4xl font-black text-[#2F3E46]">99 / 100</p>
              <p className="text-xs text-[#354F52] font-bold">Optimized for Mobile Conversion</p>
              <p className="text-xs text-[#354F52] leading-relaxed border-t border-[#2F3E46]/10 pt-4">
                Every generated site is hosted on a global CDN and receives serverless edge acceleration automatically, achieving sub-second load times.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
