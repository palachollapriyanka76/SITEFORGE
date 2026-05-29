"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";

const proFeatures = [
  "Unlimited AI Generations & Edits",
  "Voice Prompt Customization Widget",
  "Custom Domain Mapping + Free SSL",
  "WhatsApp Shop & Orders Integration",
  "Premium Fast loading CDN Hosting",
  "Real-time Analytics Dashboard",
  "Priority 24/7 WhatsApp Support"
];

const freeFeatures = [
  "1 Generated Website",
  "SiteForge Subdomain Hosting",
  "Basic Page Customization",
  "Email Support"
];

const enterpriseFeatures = [
  "Up to 10 Websites",
  "White-label Branding Removal",
  "Dedicated Developer Support",
  "API Access for Catalog sync",
  "Advanced Custom SEO Tools"
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#CAD2C5]/30 border-t border-[#2F3E46]/12 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="font-display text-sm font-semibold tracking-wider text-[#52796F] uppercase">
            Pricing Plans
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2F3E46]">
            Simple, Transparent Pricing
          </p>
          <p className="text-[#354F52] text-sm sm:text-base">
            No complex contracts or hidden fees. Start free and scale as your shop grows.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Card 1: Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="rounded-[32px] border border-[#2F3E46]/12 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="space-y-6">
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#2F3E46] tracking-tight">Free Starter</h3>
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Perfect for testing the AI</p>
              </div>

              <div className="flex items-baseline text-[#2F3E46]">
                <span className="text-3xl font-black">Rs. 0</span>
                <span className="text-xs text-[#354F52] font-bold ml-1.5">/ month</span>
              </div>

              <hr className="border-[#2F3E46]/10" />

              <ul className="space-y-3">
                {freeFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-[#354F52] font-medium">
                    <Check className="h-4 w-4 text-[#84A98C] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link href="/auth/signup">
                <Button variant="outline" className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Pro Plan (Middle Highlighted Glow) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-[32px] bg-[#52796F] hover:bg-[#354F52] p-8 sm:p-10 flex flex-col justify-between relative shadow-[0_15px_30px_rgba(82,121,111,0.25)] transition-colors duration-300 text-white"
          >
            {/* Top highlight badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-white px-4 py-1 text-[9px] font-black uppercase tracking-wider text-[#52796F] shadow-md border border-[#52796F]/10">
              <Sparkles className="h-3 w-3 text-[#52796F]" />
              <span>Recommended Choice</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-1.5 text-center">
                <h3 className="text-xl font-extrabold text-white tracking-tight">Pro Vendor Plan</h3>
                <p className="text-xs text-[#CAD2C5] font-bold uppercase tracking-wider">Deploy and scale your sales</p>
              </div>

              <div className="flex items-baseline justify-center text-white">
                <span className="text-4xl font-black tracking-tight">Rs. 999</span>
                <span className="text-xs text-[#CAD2C5] font-bold ml-1.5">/ month</span>
              </div>

              <hr className="border-white/20" />

              <ul className="space-y-3.5">
                {proFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#CAD2C5] font-semibold">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-white mt-0.5 shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 space-y-3">
              <Link href="/auth/signup">
                <button
                  className="w-full h-12 rounded-full bg-white text-[#52796F] hover:bg-[#CAD2C5] hover:text-[#354F52] font-extrabold text-xs uppercase tracking-wider shadow-md transition-all duration-200"
                >
                  Upgrade to Pro
                </button>
              </Link>
              <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#CAD2C5] font-bold">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>14-day money-back guarantee</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="rounded-[32px] border border-[#2F3E46]/12 bg-white p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="space-y-6">
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#2F3E46] tracking-tight">Agency Premium</h3>
                <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">For multi-store creators</p>
              </div>

              <div className="flex items-baseline text-[#2F3E46]">
                <span className="text-3xl font-black">Rs. 4,999</span>
                <span className="text-xs text-[#354F52] font-bold ml-1.5">/ month</span>
              </div>

              <hr className="border-[#2F3E46]/10" />

              <ul className="space-y-3">
                {enterpriseFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-[#354F52] font-medium">
                    <Check className="h-4 w-4 text-[#84A98C] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link href="/auth/signup">
                <Button variant="outline" className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
