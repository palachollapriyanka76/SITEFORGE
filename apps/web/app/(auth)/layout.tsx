"use client";

import Link from "next/link";
import { Sparkles, CheckCircle2, MessageSquare, Mic } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-zinc-950 text-white font-sans antialiased overflow-hidden">
      
      {/* Left Panel: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 z-10 bg-zinc-950">
        
        {/* Header Logo */}
        <div className="flex justify-start">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white transition-colors group-hover:text-indigo-400">
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
        <div className="text-center lg:text-left text-[11px] text-zinc-600">
          <p>© {new Date().getFullYear()} SiteForge. All rights reserved. GST invoicing available.</p>
        </div>

      </div>

      {/* Right Panel: Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-black border-l border-zinc-900 flex-col justify-between p-12 relative overflow-hidden">
        
        {/* Animated Grid lines backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#161622_1px,transparent_1px),linear-gradient(to_bottom,#161622_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            SiteForge Platform
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white leading-tight">
            Launch Your Shop in Seconds. <br />
            Manage It Effortlessly.
          </h2>
          <p className="text-zinc-400 text-sm max-w-md">
            Join thousands of small business owners and local vendors who use our AI generator to launch custom product lists, collect bookings, and chat with customers.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="relative z-10 grid gap-5 max-w-md">
          {[
            {
              icon: Sparkles,
              title: "AI Generation",
              desc: "Just input a business name and description to get a complete custom shop structure automatically.",
              borderGlow: "group-hover:border-indigo-500/30"
            },
            {
              icon: MessageSquare,
              title: "WhatsApp Shop Integration",
              desc: "Close sales directly. Customer clicks compile orders and transfer details cleanly into a WhatsApp message.",
              borderGlow: "group-hover:border-emerald-500/30"
            },
            {
              icon: Mic,
              title: "Smart Voice Editing",
              desc: "Update prices, add menu items, or change themes by talking directly to your helper assistant.",
              borderGlow: "group-hover:border-purple-500/30"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="group flex gap-4 p-4.5 bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/80 rounded-2xl transition-all duration-300 hover:bg-zinc-900"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 border border-white/5 text-zinc-300 group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">{item.title}</h4>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner stats */}
        <div className="relative z-10 flex justify-between items-center text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
          <span>Verified by Stripe Security</span>
          <span>100% India Hosting</span>
        </div>

      </div>

    </div>
  );
}
