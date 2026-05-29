"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@siteforge/ui";

const plans = [
  {
    name: "Free",
    price: "Rs. 0",
    period: "forever",
    description: "Perfect for testing the AI generation and launching a basic store.",
    cta: "Get Started Free",
    ctaLink: "/sign-up",
    isPopular: false,
    features: [
      "1 AI-Generated Website",
      "Free siteforge.app Subdomain",
      "Standard Web Editor",
      "Basic SEO Metadata",
      "Community Email Support",
    ],
  },
  {
    name: "Pro",
    price: "Rs. 999",
    period: "month",
    description: "Perfect for growing retail stores, local shops, and active salons.",
    cta: "Get Started Pro",
    // In a real application, this triggers our Stripe checkout session endpoint
    ctaLink: "/api/checkout/session?plan=pro",
    isPopular: true,
    features: [
      "3 AI-Generated Websites",
      "Custom Domain Mapping (e.g., yourshop.com)",
      "Standard WhatsApp Widget",
      "Advanced Web Editor",
      "Automated Daily Backups",
      "Full SEO Optimization Suite",
      "Priority Email Support (24h response)",
    ],
  },
  {
    name: "Business",
    price: "Rs. 2,499",
    period: "month",
    description: "Best for multi-branch outlets, restaurants with ordering, and advanced users.",
    cta: "Get Started Business",
    ctaLink: "/api/checkout/session?plan=business",
    isPopular: false,
    features: [
      "Unlimited AI-Generated Websites",
      "Custom Domain Mapping + SSL",
      "Smart Voice Editing (Voice Prompt Builder)",
      "Custom Order forms with Catalogs",
      "WhatsApp Automated Chatbots & Ordering",
      "Advanced Lead Analytics Dashboard",
      "24/7 Phone & WhatsApp Support",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      {/* Background glow behind featured card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="font-display text-sm font-semibold tracking-wider text-indigo-400 uppercase">
            Flexible Pricing
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Transparent Pricing for Local Businesses
          </p>
          <p className="text-zinc-400 text-sm sm:text-base">
            No hidden fees. Scale, upgrade, or cancel your subscription at any time. Start building for free today.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-3xl border flex flex-col justify-between p-8 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 ${
                plan.isPopular 
                  ? "border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.15)] md:scale-105 z-10" 
                  : "border-zinc-800/80 hover:border-zinc-700/80"
              }`}
            >
              {/* Popular floating badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-extrabold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-lg border border-indigo-400/20">
                  Most Popular
                </div>
              )}

              <div>
                {/* Plan Meta */}
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">{plan.description}</p>
                </div>

                {/* Pricing Display */}
                <div className="my-8 flex items-baseline gap-1">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-zinc-500 text-sm">/ {plan.period}</span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 border-t border-zinc-800/80 pt-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs text-zinc-300">
                      <div className="h-4.5 w-4.5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-zinc-800/60">
                <Link href={plan.ctaLink}>
                  <Button 
                    className={`w-full h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      plan.isPopular
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]"
                        : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700/50"
                    }`}
                  >
                    {plan.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-1 mt-3.5 text-[10px] text-zinc-500">
                  <HelpCircle className="h-3 w-3" />
                  <span>GST invoicing available</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
