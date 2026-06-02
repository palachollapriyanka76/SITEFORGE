"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  MapPin
} from "lucide-react";

const analyticsFeatures = [
  {
    icon: Users,
    title: "Visitor Traffic Logs",
    desc: "Track daily, weekly, and monthly visit counts. See when your website experiences peak user activity so you can plan store offers accordingly."
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Checkout Click Tracking",
    desc: "Understand exactly how many visitors are clicking your floating WhatsApp widgets and ordering products. Measure catalog interest directly."
  },
  {
    icon: TrendingUp,
    title: "Conversion Rate Funnels",
    desc: "Analyze the path customers take from viewing products to adding to order drawers, helping you see where customer interest drops off."
  }
];

export default function AnalyticsDetailPage() {
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
          <BarChart3 className="h-3.5 w-3.5" />
          <span>Analytics Dashboard</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-[#2F3E46] leading-tight tracking-tight">
          Track Your Business Performance
        </h1>
        <p className="text-base sm:text-lg text-[#354F52] max-w-2xl leading-relaxed">
          SiteForge integrates basic analytics tools designed for local business vendors. 
          Stop guessing your popularity; analyze page views, click rates, and order counts.
        </p>
      </div>

      {/* Features breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {analyticsFeatures.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <div key={i} className="bg-white/60 backdrop-blur-md border border-[#2F3E46]/12 rounded-3xl p-6 space-y-4">
              <div className="h-10 w-10 bg-[#52796F]/10 border border-[#52796F]/20 rounded-xl flex items-center justify-center text-[#52796F]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-[#2F3E46]">{feat.title}</h3>
              <p className="text-xs text-[#354F52] leading-relaxed">{feat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Mock Analytics Panel visual */}
      <div className="bg-white border border-[#2F3E46]/12 rounded-[32px] p-6 md:p-8 shadow-sm mb-16 space-y-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#52796F]" />
          <h3 className="font-display text-xs font-black uppercase tracking-wider text-[#2F3E46]">Real-time Event Analytics Feed</h3>
        </div>

        <div className="border border-[#2F3E46]/10 rounded-2xl overflow-hidden text-xs text-[#354F52]">
          <div className="grid grid-cols-12 bg-[#CAD2C5]/20 font-bold p-3 border-b border-[#2F3E46]/10 uppercase tracking-wider text-[10px]">
            <div className="col-span-3">Time</div>
            <div className="col-span-4">Event Description</div>
            <div className="col-span-3">Source Channel</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          {[
            { time: "Just Now", desc: "Customer checkout drawer clicked", src: "WhatsApp Widget", status: "Redirected", color: "text-emerald-600" },
            { time: "10 mins ago", desc: "Menu item Kaju Katli viewed", src: "Organic Search", status: "Completed", color: "text-slate-500" },
            { time: "42 mins ago", desc: "New lead captured: Grace Salon", src: "Bookings Form", status: "Active", color: "text-blue-600" },
            { time: "2 hours ago", desc: "Custom domain connection set", src: "DNS Serverless", status: "Success", color: "text-green-600" }
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-12 p-3 border-b border-[#2F3E46]/6 items-center">
              <div className="col-span-3 text-zinc-400 font-mono text-[10px]">{row.time}</div>
              <div className="col-span-4 font-bold text-[#2F3E46]">{row.desc}</div>
              <div className="col-span-3 text-zinc-500">{row.src}</div>
              <div className={`col-span-2 text-right font-black uppercase text-[10px] ${row.color}`}>{row.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-[40px] bg-[#2F3E46] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#52796F]/10 to-transparent" />
        
        <div className="relative z-10 max-w-2xl space-y-6 text-left">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Access Live Dashboard Metrics
          </h2>
          <p className="text-xs sm:text-sm text-[#CAD2C5] leading-relaxed">
            Upgrade your store to a Pro Vendor plan, connect your business name sitemaps, 
            and see your organic search impressions grow day-over-day.
          </p>
          <div className="pt-2">
            <Link href="/auth/signup">
              <button className="h-12 px-8 rounded-full bg-[#52796F] hover:bg-[#84A98C] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
