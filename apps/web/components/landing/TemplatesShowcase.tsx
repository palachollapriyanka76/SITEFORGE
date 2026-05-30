"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Store, Scissors, Smartphone, Apple, Shirt } from "lucide-react";
import { Button } from "../ui/Button";

const templates = [
  {
    id: "bakery",
    name: "Sartaj Sweets & Bakery",
    category: "Bakery",
    icon: Store,
    color: "from-[#84A98C]/20 to-[#52796F]/20",
    borderColor: "group-hover:border-[#52796F]/30",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    menu: [
      { item: "Premium Motiichoor Ladoo", price: "Rs. 600/kg" },
      { item: "Kaju Katli Special", price: "Rs. 950/kg" }
    ],
    themeColor: "text-[#52796F]"
  },
  {
    id: "restaurant",
    name: "Spice Route Dine-In",
    category: "Restaurant",
    icon: Store,
    color: "from-[#84A98C]/20 to-[#52796F]/20",
    borderColor: "group-hover:border-[#52796F]/30",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
    menu: [
      { item: "Paneer Tikka Kebab", price: "Rs. 310" },
      { item: "Veg Dum Biryani", price: "Rs. 280" }
    ],
    themeColor: "text-[#52796F]"
  },
  {
    id: "salon",
    name: "Grace Hair Lounge",
    category: "Salon",
    icon: Scissors,
    color: "from-[#84A98C]/20 to-[#52796F]/20",
    borderColor: "group-hover:border-[#52796F]/30",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop",
    menu: [
      { item: "Hair Styling & Wash", price: "Rs. 450" },
      { item: "Premium Herbal Facial", price: "Rs. 999" }
    ],
    themeColor: "text-[#52796F]"
  },
  {
    id: "electronics",
    name: "Digital Hub Tech",
    category: "Electronics",
    icon: Smartphone,
    color: "from-[#84A98C]/20 to-[#52796F]/20",
    borderColor: "group-hover:border-[#52796F]/30",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
    menu: [
      { item: "Noise Cancel Wireless Earbuds", price: "Rs. 1,899" },
      { item: "Smart Watch Active 2", price: "Rs. 2,499" }
    ],
    themeColor: "text-[#52796F]"
  },
  {
    id: "grocery",
    name: "Apna Bazaar Organics",
    category: "Grocery",
    icon: Apple,
    color: "from-[#84A98C]/20 to-[#52796F]/20",
    borderColor: "group-hover:border-[#52796F]/30",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop",
    menu: [
      { item: "Organic Kashmir Apples", price: "Rs. 220/kg" },
      { item: "Premium Basmati Rice", price: "Rs. 140/kg" }
    ],
    themeColor: "text-[#52796F]"
  },
  {
    id: "fashion",
    name: "Urban Thread Boutique",
    category: "Fashion",
    icon: Shirt,
    color: "from-[#84A98C]/20 to-[#52796F]/20",
    borderColor: "group-hover:border-[#52796F]/30",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop",
    menu: [
      { item: "Designer Georgette Saree", price: "Rs. 3,500" },
      { item: "Silk Kurta Combo Set", price: "Rs. 1,800" }
    ],
    themeColor: "text-[#52796F]"
  }
];

export default function TemplatesShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Bakery", "Restaurant", "Salon", "Electronics", "Grocery", "Fashion"];

  const filteredTemplates = activeCategory === "All"
    ? templates
    : templates.filter(t => t.category === activeCategory);

  return (
    <section id="templates" className="py-24 bg-[#CAD2C5]/30 border-t border-[#2F3E46]/12 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#52796F]/30 bg-[#52796F]/10 px-3.5 py-1 text-xs font-semibold text-[#52796F]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Realistic Storefront Layouts</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2F3E46]">
              Launch With Professional Templates
            </h2>
            <p className="text-[#354F52] text-sm sm:text-base">
              Choose your industry, and watch the AI assemble product catalogs, booking features, 
              and local marketing assets customized to your business name.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-250 ${
                  activeCategory === cat
                    ? "bg-[#52796F] text-white shadow-md shadow-[#52796F]/25"
                    : "bg-white text-[#354F52] border border-[#2F3E46]/12 hover:text-[#2F3E46] hover:bg-zinc-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((tpl, idx) => {
            const Icon = tpl.icon;
            return (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-[32px] border border-[#2F3E46]/12 bg-white p-4 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* Template Mockup Display */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100 border border-[#2F3E46]/10">
                  <div className={`absolute inset-0 bg-gradient-to-br ${tpl.color} opacity-40 z-10 transition-opacity group-hover:opacity-60`} />
                  
                  {/* Fake Browser Chrome */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-white/90 backdrop-blur border-b border-[#2F3E46]/10 z-20 flex items-center px-4 gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                    <div className="h-3.5 w-32 rounded bg-[#CAD2C5]/30 mx-auto text-[7px] text-center text-[#354F52] flex items-center justify-center font-mono select-none">
                      {tpl.id}.siteforge.app
                    </div>
                  </div>

                  {/* Simulated Image */}
                  <img
                    src={tpl.image}
                    alt={tpl.name}
                    className="h-full w-full object-cover pt-6 transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Hover Action Overlay */}
                  <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 z-30 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-4">
                    <span className="text-[#2F3E46] font-extrabold text-xs tracking-widest uppercase">Live Generated Shop</span>
                    
                    {/* Simulated live menu mockup on hover */}
                    <div className="w-full space-y-2 bg-[#CAD2C5]/10 border border-[#2F3E46]/10 p-3 rounded-xl text-[9px] text-[#354F52]">
                      <p className="font-extrabold text-[#2F3E46] text-center pb-1.5 border-b border-[#2F3E46]/10">{tpl.name}</p>
                      {tpl.menu.map((item, mIdx) => (
                        <div key={mIdx} className="flex justify-between items-center">
                          <span>{item.item}</span>
                          <span className={`font-black ${tpl.themeColor}`}>{item.price}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="rounded-full flex items-center gap-1.5 px-5 py-2 text-[10px] uppercase font-black tracking-widest shadow-md">
                      Select Theme <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Info Area */}
                <div className="mt-4 px-2 flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-[#CAD2C5]/20 border border-[#2F3E46]/12 text-[#52796F]">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{tpl.category}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#2F3E46] tracking-tight">{tpl.name}</h3>
                  </div>
                  
                  <span className="text-[8px] bg-[#84A98C]/15 border border-[#84A98C]/20 text-[#52796F] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Ready
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
