"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Utensils, 
  Cake, 
  Scissors, 
  Shirt, 
  Smartphone, 
  Apple, 
  Dumbbell, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@siteforge/ui";

const templates = [
  {
    id: "restaurant",
    type: "Restaurant",
    icon: Utensils,
    themeColor: "from-orange-500/20 to-amber-500/20 border-orange-500/30",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    textColor: "text-orange-400",
    mockUp: (
      <div className="w-full h-full flex flex-col justify-between p-3.5 bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-white">Curry Palace</span>
          <span className="text-[7px] text-zinc-500">Menu</span>
        </div>
        <div className="space-y-1.5 my-2">
          <div className="h-6 rounded bg-zinc-800 flex items-center justify-between px-2 text-[8px] text-zinc-300">
            <span>Butter Chicken Special</span>
            <span className="font-bold text-orange-400">Rs.350</span>
          </div>
          <div className="h-6 rounded bg-zinc-800 flex items-center justify-between px-2 text-[8px] text-zinc-300">
            <span>Garlic Naan Combo</span>
            <span className="font-bold text-orange-400">Rs.120</span>
          </div>
        </div>
        <div className="h-4 rounded bg-orange-600 flex items-center justify-center text-[7px] font-bold text-white uppercase tracking-wider">
          Order Online
        </div>
      </div>
    )
  },
  {
    id: "bakery",
    type: "Bakery & Cafe",
    icon: Cake,
    themeColor: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    textColor: "text-pink-400",
    mockUp: (
      <div className="w-full h-full flex flex-col justify-between p-3.5 bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-white">Sweet Crumbs</span>
          <span className="text-[7px] text-zinc-500">Cakes</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 my-2">
          <div className="h-10 rounded bg-zinc-800/80 p-1 flex flex-col justify-between">
            <div className="h-4 w-full bg-pink-500/20 rounded-sm" />
            <span className="text-[7px] text-zinc-300 scale-95 origin-left">Cupcakes</span>
          </div>
          <div className="h-10 rounded bg-zinc-800/80 p-1 flex flex-col justify-between">
            <div className="h-4 w-full bg-rose-500/20 rounded-sm" />
            <span className="text-[7px] text-zinc-300 scale-95 origin-left">Croissants</span>
          </div>
        </div>
        <div className="h-4 rounded bg-pink-600 flex items-center justify-center text-[7px] font-bold text-white">
          Book Custom Cake
        </div>
      </div>
    )
  },
  {
    id: "salon",
    type: "Salon & Spa",
    icon: Scissors,
    themeColor: "from-purple-500/20 to-indigo-500/20 border-purple-500/30",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    textColor: "text-purple-400",
    mockUp: (
      <div className="w-full h-full flex flex-col justify-between p-3.5 bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-white">Classic Scissors</span>
          <span className="text-[8px] text-purple-400 font-bold">★ 4.9</span>
        </div>
        <div className="space-y-1.5 my-2">
          <div className="flex justify-between text-[7px] text-zinc-400">
            <span>Next Available Slot:</span>
            <span className="text-white font-bold">Today, 4:00 PM</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <span className="text-[7px] text-center bg-zinc-800 rounded py-0.5 text-zinc-300 border border-zinc-700">4:00 PM</span>
            <span className="text-[7px] text-center bg-purple-600/20 rounded py-0.5 text-purple-300 border border-purple-500/30">4:30 PM</span>
            <span className="text-[7px] text-center bg-zinc-800 rounded py-0.5 text-zinc-300 border border-zinc-700">5:00 PM</span>
          </div>
        </div>
        <div className="h-4 rounded bg-purple-600 flex items-center justify-center text-[7px] font-bold text-white">
          Book Appointment
        </div>
      </div>
    )
  },
  {
    id: "fashion",
    type: "Fashion & Boutique",
    icon: Shirt,
    themeColor: "from-teal-500/20 to-emerald-500/20 border-teal-500/30",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    textColor: "text-teal-400",
    mockUp: (
      <div className="w-full h-full flex flex-col justify-between p-3.5 bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-white">Thread Craft</span>
          <span className="text-[7px] bg-teal-500/20 text-teal-400 px-1 rounded-sm">Sale</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 my-2">
          <div className="bg-zinc-800/80 rounded p-1 text-[7px] flex flex-col gap-0.5 text-zinc-300">
            <div className="aspect-[4/3] bg-teal-500/10 rounded-sm" />
            <span className="truncate">Saree Collection</span>
          </div>
          <div className="bg-zinc-800/80 rounded p-1 text-[7px] flex flex-col gap-0.5 text-zinc-300">
            <div className="aspect-[4/3] bg-emerald-500/10 rounded-sm" />
            <span className="truncate">Kurtis & Tops</span>
          </div>
        </div>
        <div className="h-4 rounded bg-teal-600 flex items-center justify-center text-[7px] font-bold text-white">
          Explore Collection
        </div>
      </div>
    )
  },
  {
    id: "electronics",
    type: "Electronics Store",
    icon: Smartphone,
    themeColor: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    textColor: "text-blue-400",
    mockUp: (
      <div className="w-full h-full flex flex-col justify-between p-3.5 bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-white">Electro Hub</span>
          <span className="text-[7px] text-zinc-500 font-medium">Cart (0)</span>
        </div>
        <div className="space-y-1.5 my-2">
          <div className="flex items-center gap-2 p-1 bg-zinc-800 rounded">
            <div className="h-6 w-6 bg-blue-500/20 rounded flex items-center justify-center text-[8px]">📱</div>
            <div className="flex-1 flex flex-col">
              <span className="text-[7px] text-white truncate">Redmi Note 12</span>
              <span className="text-[6px] text-blue-400 font-bold">Rs.14,999</span>
            </div>
          </div>
        </div>
        <div className="h-4 rounded bg-blue-600 flex items-center justify-center text-[7px] font-bold text-white">
          Buy Now
        </div>
      </div>
    )
  },
  {
    id: "grocery",
    type: "Grocery & Organic",
    icon: Apple,
    themeColor: "from-emerald-500/20 to-green-500/20 border-emerald-500/30",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    textColor: "text-emerald-400",
    mockUp: (
      <div className="w-full h-full flex flex-col justify-between p-3.5 bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-white">Green Grocers</span>
          <span className="text-[7px] text-emerald-400 font-semibold">100% Organic</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 my-2">
          <div className="h-10 bg-zinc-800/80 rounded p-1 flex flex-col justify-between text-[7px]">
            <span className="text-[8px]">🍎</span>
            <div className="flex justify-between text-zinc-400 scale-95 origin-left">
              <span>Apple</span>
              <span className="font-bold text-emerald-400">Rs.180/kg</span>
            </div>
          </div>
          <div className="h-10 bg-zinc-800/80 rounded p-1 flex flex-col justify-between text-[7px]">
            <span className="text-[8px]">🥑</span>
            <div className="flex justify-between text-zinc-400 scale-95 origin-left">
              <span>Avocado</span>
              <span className="font-bold text-emerald-400">Rs.290/kg</span>
            </div>
          </div>
        </div>
        <div className="h-4 rounded bg-emerald-600 flex items-center justify-center text-[7px] font-bold text-white">
          Add to Cart
        </div>
      </div>
    )
  },
  {
    id: "gym",
    type: "Fitness & Gym",
    icon: Dumbbell,
    themeColor: "from-red-500/20 to-orange-500/20 border-red-500/30",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    textColor: "text-red-400",
    mockUp: (
      <div className="w-full h-full flex flex-col justify-between p-3.5 bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-white">Iron Peak Gym</span>
          <span className="text-[7px] text-zinc-500">Classes</span>
        </div>
        <div className="space-y-1.5 my-2">
          <div className="bg-zinc-800 p-1.5 rounded flex justify-between items-center">
            <span className="text-[7px] text-zinc-300">Monthly Pass</span>
            <span className="text-[7px] font-bold text-red-400">Rs.1,499</span>
          </div>
          <div className="bg-zinc-800 p-1.5 rounded flex justify-between items-center">
            <span className="text-[7px] text-zinc-300">Yearly Pro</span>
            <span className="text-[7px] font-bold text-red-400">Rs.9,999</span>
          </div>
        </div>
        <div className="h-4 rounded bg-red-600 flex items-center justify-center text-[7px] font-bold text-white">
          Join Memberships
        </div>
      </div>
    )
  }
];

export default function TemplatesShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="templates" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-display text-sm font-semibold tracking-wider text-indigo-400 uppercase">
              Proven Layouts
            </h2>
            <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Tailored for Every Business Type
            </p>
            <p className="text-zinc-400 text-sm sm:text-base">
              Don&apos;t start from scratch. Browse our ready-to-customize layouts optimized for speed, search engines, and conversions. Select one and watch our AI populate it with your shop&apos;s details.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll panel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 select-none"
          style={{ scrollbarWidth: "none" }}
        >
          {templates.map((template) => {
            const IconComponent = template.icon;
            return (
              <motion.div
                key={template.id}
                className="w-[280px] sm:w-[325px] shrink-0 snap-start bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between group hover:border-indigo-500/20 transition-all duration-300"
              >
                <div>
                  {/* Top Preview Container */}
                  <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${template.themeColor} border p-3 flex items-center justify-center mb-5 group-hover:scale-[1.02] transition-transform duration-300`}>
                    {template.mockUp}
                  </div>

                  {/* Template Meta */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-800 border border-white/5">
                      <IconComponent className={`h-3.5 w-3.5 ${template.textColor}`} />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${template.badgeColor}`}>
                      {template.type}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {template.type} Blueprint
                    </h3>
                    <p className="text-[13px] text-zinc-500 mt-1">
                      Ready with automated catalogs, bookings, and regional language translations.
                    </p>
                  </div>

                  <Link href="/sign-up" className="block">
                    <Button className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 py-2.5 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all group-hover:bg-indigo-600 group-hover:border-indigo-500 group-hover:text-white">
                      Use Template <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
