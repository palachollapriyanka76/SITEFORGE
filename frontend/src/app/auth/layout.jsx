"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, MessageSquare, Mic } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-[#CAD2C5] text-[#354F52] font-sans antialiased overflow-hidden selection:bg-[#52796F] selection:text-white">
      
      {/* Left Panel: Auth Form (White background) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 z-10 bg-white border-r border-[#2F3E46]/12">
        
        {/* Header Logo */}
        <div className="flex justify-start">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#84A98C] to-[#52796F] shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-[#2F3E46]">
              SiteForge
            </span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center lg:text-left text-[11px] text-[#354F52]/60">
          <p>© {new Date().getFullYear()} SiteForge. All rights reserved. GST invoicing available.</p>
        </div>

      </div>

      {/* Right Panel: Showcase (Dark Section: #2F3E46) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#2F3E46] flex-col justify-between p-12 relative overflow-hidden text-[#CAD2C5]">
        
        {/* Background gradient layout */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2F3E46] to-[#354F52] opacity-90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#84A98C]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#84A98C] bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            SiteForge Platform
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white leading-tight">
            Launch Your Shop in Seconds. <br />
            Manage It Effortlessly.
          </h2>
          <p className="text-[#CAD2C5]/80 text-sm max-w-md">
            Join thousands of small business owners and local vendors who use our AI generator to launch custom product lists, collect bookings, and chat with customers.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="relative z-10 grid gap-5 max-w-md">
          {[
            {
              icon: Sparkles,
              title: "AI Website Generation",
              desc: "Just input a business name and description to get a complete custom shop structure automatically."
            },
            {
              icon: MessageSquare,
              title: "WhatsApp Shop Integration",
              desc: "Close sales directly. Customer clicks compile orders and transfer details cleanly into a WhatsApp message."
            },
            {
              icon: Mic,
              title: "Smart Voice Editing",
              desc: "Update prices, add menu items, or change themes by talking directly to your helper assistant."
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="group flex gap-4 p-4.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/10"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-[#84A98C] group-hover:text-white transition-all">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white transition-colors">{item.title}</h4>
                  <p className="text-[11px] text-[#CAD2C5]/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="relative z-10 flex justify-between items-center text-[10px] text-[#CAD2C5]/50 uppercase tracking-widest font-mono">
          <span>Verified by Stripe Security</span>
          <span>100% India Hosting</span>
        </div>

      </div>

    </div>
  );
}
