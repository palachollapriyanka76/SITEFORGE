"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Laptop, RotateCw } from "lucide-react";
import { Button } from "../ui/Button";

const conversationalSteps = [
  {
    chat: [
      { sender: "user", text: "I own a bakery named Sweet Delights." },
      { sender: "ai", text: "Generating bakery website for Sweet Delights..." }
    ],
    preview: {
      status: "Selecting Palette & Grid",
      title: "Sweet Delights",
      colors: { accent: "text-[#52796F]", bg: "bg-white" },
      banner: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop",
      items: [],
      whatsapp: false
    }
  },
  {
    chat: [
      { sender: "user", text: "I own a bakery named Sweet Delights." },
      { sender: "ai", text: "Generating bakery website for Sweet Delights..." },
      { sender: "ai", text: "Creating menu section... Added: Butter Croissant, Choco Muffin, Apple Pie." }
    ],
    preview: {
      status: "Populating Store Catalog",
      title: "Sweet Delights",
      colors: { accent: "text-[#52796F]", bg: "bg-white" },
      banner: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop",
      items: [
        { name: "Fresh Butter Croissant", price: "Rs. 90" },
        { name: "Double Choco Muffin", price: "Rs. 110" },
        { name: "Classic Apple Pie", price: "Rs. 180" }
      ],
      whatsapp: false
    }
  },
  {
    chat: [
      { sender: "user", text: "I own a bakery named Sweet Delights." },
      { sender: "ai", text: "Generating bakery website for Sweet Delights..." },
      { sender: "ai", text: "Creating menu section... Added: Butter Croissant, Choco Muffin, Apple Pie." },
      { sender: "ai", text: "Adding WhatsApp orders... Setting up instant checkouts." }
    ],
    preview: {
      status: "WhatsApp Setup Completed",
      title: "Sweet Delights",
      colors: { accent: "text-[#52796F]", bg: "bg-white" },
      banner: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop",
      items: [
        { name: "Fresh Butter Croissant", price: "Rs. 90" },
        { name: "Double Choco Muffin", price: "Rs. 110" },
        { name: "Classic Apple Pie", price: "Rs. 180" }
      ],
      whatsapp: true
    }
  }
];

export default function AIDemoSection() {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIdx((prev) => (prev + 1) % conversationalSteps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeStep = conversationalSteps[stepIdx];

  return (
    <section id="demo" className="py-24 bg-white border-t border-[#2F3E46]/12 relative">
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-[#84A98C]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#52796F]/30 bg-[#52796F]/10 px-3.5 py-1 text-xs font-semibold text-[#52796F]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive AI Builder Demo</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2F3E46]">
            Watch the AI Design Live
          </h2>
          <p className="text-[#354F52] text-sm sm:text-base">
            No complex designer editors. Describe your store, products, and location, 
            and see your custom page take shape automatically.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Panel: ChatGPT style conversation */}
          <div className="lg:col-span-5 flex flex-col rounded-[32px] border border-[#2F3E46]/12 bg-white overflow-hidden shadow-md backdrop-blur-md">
            
            {/* Chat Header */}
            <div className="px-5 py-4 border-b border-[#2F3E46]/10 bg-[#CAD2C5]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-[#84A98C] to-[#52796F] flex items-center justify-center text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2F3E46]">SiteForge Assistant</p>
                  <p className="text-[9px] text-[#52796F] font-bold uppercase tracking-wider">Active Generation</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-350" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-350" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-350" />
              </div>
            </div>

            {/* Chat Bubbles */}
            <div className="flex-1 p-5 space-y-4 min-h-[300px] max-h-[360px] overflow-y-auto scrollbar-thin">
              <AnimatePresence mode="popLayout">
                {activeStep.chat.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
                  >
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                      msg.sender === "user" ? "bg-[#52796F] text-white" : "bg-[#84A98C] text-white"
                    }`}>
                      {msg.sender === "user" ? "ME" : "AI"}
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      msg.sender === "user" 
                        ? "bg-[#52796F] text-white rounded-tr-none" 
                        : "bg-[#84A98C]/15 border border-[#84A98C]/20 text-[#2F3E46] rounded-tl-none"
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#2F3E46]/10 bg-[#CAD2C5]/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="I own a bakery..."
                disabled
                className="w-full bg-[#CAD2C5]/10 border border-[#2F3E46]/12 text-xs text-zinc-400 rounded-full py-2.5 px-4 outline-none cursor-not-allowed"
              />
            </div>
          </div>

          {/* Right Panel: Live generated website preview */}
          <div className="lg:col-span-7 flex flex-col rounded-[32px] border border-[#2F3E46]/12 bg-[#CAD2C5]/30 overflow-hidden shadow-md relative min-h-[400px]">
            
            {/* Preview Browser Header */}
            <div className="px-5 py-3.5 border-b border-[#2F3E46]/10 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <Laptop className="h-4 w-4 text-[#354F52]" />
                <span className="text-[9px] font-black text-[#354F52] uppercase tracking-widest">Live Mockup Canvas</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#52796F] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#52796F]"></span>
                </span>
                <span className="text-[9px] font-bold text-[#52796F] tracking-wider font-mono">{activeStep.preview.status}</span>
              </div>
            </div>

            {/* Generated Page Canvas */}
            <div className="flex-1 p-6 flex flex-col justify-center">
              <motion.div
                layout
                className="w-full max-w-md mx-auto bg-white border border-[#2F3E46]/10 rounded-2xl overflow-hidden shadow-md"
              >
                {/* Header */}
                <div className="p-3 border-b border-[#2F3E46]/10 flex items-center justify-between text-[9px] text-[#354F52]">
                  <span className="font-extrabold text-[#2F3E46] tracking-wide">{activeStep.preview.title} Bakery</span>
                  <div className="flex gap-2.5 font-semibold">
                    <span>Menu</span>
                    <span>Order</span>
                  </div>
                </div>

                {/* Hero Banner */}
                <div className="relative p-5 text-center border-b border-[#2F3E46]/10 overflow-hidden">
                  <img
                    src={activeStep.preview.banner}
                    alt="coffee hero"
                    className="absolute inset-0 w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                  <div className="relative z-10 space-y-1 py-3 text-[#354F52]">
                    <h3 className="text-sm font-black text-[#2F3E46]">{activeStep.preview.title}</h3>
                    <p className={`text-[8px] uppercase font-black tracking-widest ${activeStep.preview.colors.accent}`}>
                      Fresh Baked Daily Since 1995
                    </p>
                  </div>
                </div>

                {/* Products Menu */}
                {activeStep.preview.items.length > 0 ? (
                  <div className="p-4 space-y-2">
                    <h4 className="text-[8px] uppercase font-black text-zinc-400 tracking-widest mb-1.5">Fresh Catalog</h4>
                    {activeStep.preview.items.map((item, idx) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={idx}
                        className="flex items-center justify-between text-[10px] p-2 rounded-lg bg-[#CAD2C5]/10 border border-[#2F3E46]/10 text-[#354F52]"
                      >
                        <div>
                          <p className="font-bold text-[#2F3E46]">{item.name}</p>
                          <p className="text-[8px] text-zinc-400">Delicious sweet treats</p>
                        </div>
                        <span className={`font-black ${activeStep.preview.colors.accent}`}>{item.price}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center text-[10px] text-zinc-400 font-medium">
                    <RotateCw className="h-4.5 w-4.5 animate-spin mx-auto mb-2 text-zinc-400" />
                    Assembling layout structure...
                  </div>
                )}

                {/* Floating WhatsApp Widget */}
                {activeStep.preview.whatsapp && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2.5 bg-white border-t border-[#2F3E46]/10 flex items-center justify-between text-[8px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px]">
                        💬
                      </div>
                      <span className="text-[#354F52] font-bold">Direct orders sent to WhatsApp</span>
                    </div>
                    <span className="text-[7px] bg-emerald-500/10 text-emerald-400 font-black px-2 py-0.5 rounded-full uppercase">Enabled</span>
                  </motion.div>
                )}
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
