"use client";

import Link from "next/link";
import { Sparkles, Twitter, Github, Linkedin, MessageSquare, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid section */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 pb-16 border-b border-zinc-900">
          
          {/* Logo & Bio Column */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                SiteForge
              </span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
              SiteForge is an AI-powered SaaS builder empowering small business owners, local shops, and vendors across India to launch professional, high-performance websites instantly.
            </p>

            {/* Premium Made in India Badge */}
            <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-semibold text-zinc-400 shadow-sm">
              <span className="flex items-center gap-0.5">
                <span className="h-2 w-3 bg-[#FF9933] inline-block rounded-xs" />
                <span className="h-2 w-3 bg-[#FFFFFF] inline-block rounded-xs" />
                <span className="h-2 w-3 bg-[#138808] inline-block rounded-xs" />
              </span>
              <span>Made in India</span>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="col-span-1 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">Templates</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">AI Engine</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="col-span-1 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">WhatsApp Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="col-span-1 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div className="col-span-1 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5 text-xs text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Socials */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-zinc-600">
          <p>© {new Date().getFullYear()} SiteForge. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
              <Github className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="WhatsApp Support">
              <MessageSquare className="h-4.5 w-4.5" />
            </a>
          </div>

          <p className="flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 fill-red-500/80 text-red-500/80" /> for Indian Businesses.
          </p>
        </div>

      </div>
    </footer>
  );
}
