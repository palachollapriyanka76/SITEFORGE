"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Heart, Twitter, Instagram, Facebook, Youtube, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#2F3E46] border-t border-[#2F3E46] py-20 relative overflow-hidden text-[#CAD2C5]">
      {/* Ambient bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#84A98C]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#84A98C] to-[#52796F] text-white shadow-md">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                SiteForge
              </span>
            </Link>
            <p className="text-[#CAD2C5]/80 text-xs sm:text-sm max-w-sm leading-relaxed">
              Empowering local shops, small stores, and regional vendors to instantly launch 
              beautiful storefronts, display catalogs, and receive direct WhatsApp checkouts.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: "#", color: "hover:text-white" },
                { icon: Instagram, href: "#", color: "hover:text-white" },
                { icon: Facebook, href: "#", color: "hover:text-white" },
                { icon: Youtube, href: "#", color: "hover:text-white" }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    className={`h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#84A98C] transition-colors ${item.color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Product (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Product</h4>
            <ul className="space-y-3 text-xs text-[#84A98C]">
              <li><a href="#features" className="hover:text-white transition-colors">AI Features</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">Catalog Templates</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Live Simulation</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Column 3: Support (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Support & Legal</h4>
            <ul className="space-y-3 text-xs text-[#84A98C]">
              <li><Link href="/contact" className="hover:text-white transition-colors">Guides & Support</Link></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Refund Policy</span></li>
            </ul>
          </div>

          {/* Column 4: Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Stay Updated</h4>
            <p className="text-xs text-[#CAD2C5]/80 max-w-sm leading-relaxed">
              Subscribe to get free guides on how to grow your local shop's online foot traffic.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                required
                type="email"
                placeholder="bhaiya@store.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 text-xs text-white placeholder-[#CAD2C5]/50 rounded-xl px-4 h-11 outline-none focus:border-[#84A98C] transition-colors"
              />
              <button
                type="submit"
                className="h-11 w-11 rounded-xl bg-[#52796F] hover:bg-[#354F52] border border-white/10 flex items-center justify-center text-white transition-all shadow-md shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            {subscribed && (
              <p className="text-[10px] text-[#84A98C] font-bold animate-pulse">
                Dhanyavaad! 🙏 You have successfully subscribed.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#CAD2C5]/70 font-bold uppercase tracking-wider font-mono">
          <p>© {new Date().getFullYear()} SiteForge Inc. All rights reserved.</p>
          
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-white">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 fill-[#84A98C] text-[#84A98C]" />
            <span>in India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
