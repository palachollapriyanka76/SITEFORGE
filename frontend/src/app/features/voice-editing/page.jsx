"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Mic, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  HelpCircle,
  Volume2,
  Play,
  Settings,
  Image,
  DollarSign
} from "lucide-react";

const commands = [
  { action: "Modify Text", example: "“Change the primary heading to Welcome to Golden Bakery”", icon: Sparkles },
  { action: "Update Prices", example: "“Change the price of Kaju Katli to 950 rupees”", icon: DollarSign },
  { action: "Replace Graphics", example: "“Replace top hero image with a fresh pastry banner”", icon: Image },
  { action: "Configure Options", example: "“Enable WhatsApp direct ordering on my store”", icon: Settings }
];

const mockTranscript = [
  { sender: "user", text: "Change tagline to Jaipur's finest sourdough bakery" },
  { sender: "ai", text: "Analyzing speech pattern... Detected update: Tagline" },
  { sender: "ai", text: "✅ Slogan updated to: \"Jaipur's finest sourdough bakery\" in real-time preview." },
  { sender: "user", text: "Set Garlic Sourdough price to 120 rupees" },
  { sender: "ai", text: "✅ Price Updated: 'Fresh Garlic Sourdough' is now Rs. 120." },
  { sender: "user", text: "Remove chocolate donut from catalog" },
  { sender: "ai", text: "✅ Removed catalog item: 'Chocolate Donut' successfully." }
];

export default function VoiceEditingDetailPage() {
  const [activeStep, setActiveStep] = useState(0);

  const nextPrompt = () => {
    setActiveStep((prev) => (prev + 1) % mockTranscript.length);
  };

  const resetPrompt = () => {
    setActiveStep(0);
  };

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

      {/* Hero Header & Transcript Grid */}
      <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
        
        {/* Left Column - Hero */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#52796F]/30 bg-[#52796F]/10 px-4 py-1.5 text-xs font-bold text-[#52796F]">
            <Mic className="h-3.5 w-3.5" />
            <span>Voice Editing Interface</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-[#2F3E46] leading-tight tracking-tight">
            Speak to Edit Your Storefront
          </h1>
          <p className="text-base sm:text-lg text-[#354F52] max-w-2xl leading-relaxed">
            SiteForge features India's first voice-guided editing assistant. By converting verbal 
            prompts into layout configurations, we help small shop owners update menus, adjust prices, 
            and swap photos without opening desktop tools.
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="font-extrabold text-sm text-[#2F3E46] uppercase tracking-wider">Supported Languages</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {["English", "Hindi (हिंदी)", "Kannada (ಕನ್ನಡ)", "Tamil (தமிழ்)", "Telugu (తెలుగు)", "Marathi (मराठी)"].map((lang, idx) => (
                <span key={idx} className="bg-white border border-[#2F3E46]/10 px-3 py-1 rounded-full text-[#354F52] font-semibold">{lang}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Simulated Terminal transcript */}
        <div className="lg:col-span-5 bg-white border border-[#2F3E46]/12 rounded-[32px] p-6 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2F3E46]/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-[#52796F] flex items-center justify-center text-white relative">
                  <span className="absolute inset-0 rounded-full bg-[#52796F] opacity-75 animate-ping" />
                  <Mic className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2F3E46]">SiteForge Voice Assistant</h4>
                  <p className="text-[8px] text-[#52796F] font-bold uppercase tracking-wider">Active Capture</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={resetPrompt}
                  className="px-2.5 py-1 rounded-lg bg-[#CAD2C5]/30 text-[#354F52] hover:bg-[#CAD2C5]/50 text-[9px] font-bold uppercase"
                >
                  Reset
                </button>
                <button 
                  onClick={nextPrompt}
                  className="px-3 py-1.5 rounded-lg bg-[#52796F] text-white hover:bg-[#354F52] text-[9px] font-bold uppercase flex items-center gap-1"
                >
                  Next <Play className="h-2 w-2 fill-white text-white" />
                </button>
              </div>
            </div>

            {/* Transcript Lines */}
            <div className="space-y-3 min-h-[200px] max-h-[240px] overflow-y-auto pr-1">
              {mockTranscript.slice(0, activeStep + 1).map((msg, i) => (
                <div key={i} className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}>
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[8px] font-black shrink-0 ${
                    msg.sender === "user" ? "bg-[#52796F] text-white" : "bg-[#84A98C] text-white"
                  }`}>
                    {msg.sender === "user" ? "ME" : "AI"}
                  </div>
                  <div className={`rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-[#52796F] text-white rounded-tr-none" 
                      : "bg-[#84A98C]/15 border border-[#84A98C]/25 text-[#2F3E46] rounded-tl-none font-mono text-[10px]"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#2F3E46]/10 pt-4 mt-4 flex items-center gap-2 text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
            <Volume2 className="h-4 w-4 text-[#52796F] animate-pulse" />
            <span>Click &apos;Next&apos; to simulate voice updates</span>
          </div>
        </div>

      </div>

      {/* Commands Grid */}
      <h3 className="font-display text-lg font-bold text-[#2F3E46] uppercase tracking-wider mb-6">Supported Voice Operations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {commands.map((cmd, i) => {
          const Icon = cmd.icon;
          return (
            <div key={i} className="bg-white/60 backdrop-blur-md border border-[#2F3E46]/12 rounded-3xl p-6 space-y-4">
              <div className="h-9 w-9 bg-[#52796F]/10 border border-[#52796F]/20 rounded-lg flex items-center justify-center text-[#52796F]">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#2F3E46]">{cmd.action}</h4>
              <p className="text-xs text-[#354F52] leading-relaxed italic">{cmd.example}</p>
            </div>
          );
        })}
      </div>

      {/* Use Cases Section */}
      <div className="bg-white/60 backdrop-blur-md border border-[#2F3E46]/12 rounded-[32px] p-6 md:p-8 space-y-6 mb-16">
        <h3 className="font-display text-lg font-bold text-[#2F3E46] uppercase tracking-wider border-b border-[#2F3E46]/10 pb-4">Example Use Cases</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#354F52]">
          <div className="space-y-2">
            <h4 className="font-bold text-[#2F3E46] flex items-center gap-1.5">🧁 Bakery Owner</h4>
            <p className="leading-relaxed">
              Updating daily stock levels or price changes. Say: “Mark Mango Cheesecake as out of stock” 
              or “Change the price of sourdough bread to 140 rupees”.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#2F3E46] flex items-center gap-1.5">💅 Salon Manager</h4>
            <p className="leading-relaxed">
              Adding new special combos. Say: “Add a new service package: Premium Bridal Hair and Makeup 
              for 4999 rupees”.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#2F3E46] flex items-center gap-1.5">🍛 Family Diner</h4>
            <p className="leading-relaxed">
              Adding seasonal items to the menu. Say: “Add new specialty item: Mango Lassi for 110 rupees 
              in the drinks section”.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-[40px] bg-[#2F3E46] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#52796F]/10 to-transparent" />
        
        <div className="relative z-10 max-w-2xl space-y-6 text-left">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Experience Voice Management
          </h2>
          <p className="text-xs sm:text-sm text-[#CAD2C5] leading-relaxed">
            Create a mock storefront in seconds and start updating your menu items, product tags, 
            and theme styling using simple verbal instructions.
          </p>
          <div className="pt-2">
            <Link href="/auth/signup">
              <button className="h-12 px-8 rounded-full bg-[#52796F] hover:bg-[#84A98C] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all">
                Try Smart Onboarding <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
