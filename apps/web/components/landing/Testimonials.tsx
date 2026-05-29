"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Owner, Sweet Oven Bakery",
    location: "Pune, Maharashtra",
    image: "AM",
    avatarBg: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    rating: 5,
    quote: "I had no idea how to make a website and developers were quoting Rs.15,000. With SiteForge, I typed what I wanted and had a beautiful digital menu running in minutes. My customers now pre-order on WhatsApp directly!"
  },
  {
    name: "Priya Sharma",
    role: "Designer, Thread Craft Boutique",
    location: "Bengaluru, Karnataka",
    image: "PS",
    avatarBg: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    rating: 5,
    quote: "The templates are modern and look very premium. I love that I can change the catalogue items just by talking to the builder. 'Change price of Silk Saree to 2500' — and it happens! Absolutely magical."
  },
  {
    name: "Vikram Malhotra",
    role: "Founder, Classic Scissors Salon",
    location: "Mumbai, Maharashtra",
    image: "VM",
    avatarBg: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    rating: 5,
    quote: "Having an online booking schedule has saved me hours of phone calls. SiteForge built my salon website with custom slots, and the page is so fast that our Google ranking improved in just two weeks."
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="font-display text-sm font-semibold tracking-wider text-indigo-400 uppercase">
            Success Stories
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Loved by Local Vendors Across India
          </p>
          <p className="text-zinc-400 text-sm sm:text-base">
            See how small business owners are building their web presence, saving thousands in development fees, and increasing sales using SiteForge.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-8 flex flex-col justify-between relative group hover:border-indigo-500/30 transition-all duration-300"
            >
              {/* Quote Mark Decoration */}
              <Quote className="absolute top-6 right-8 h-8 w-8 text-zinc-800 opacity-30 group-hover:text-indigo-500/10 group-hover:opacity-100 transition-colors" />

              <div className="space-y-6">
                {/* Rating stars */}
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Content */}
                <p className="text-zinc-300 text-sm leading-relaxed font-normal italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* User Bio */}
              <div className="mt-8 flex items-center gap-3.5 pt-6 border-t border-zinc-800/60">
                <div className={`h-11 w-11 rounded-full border flex items-center justify-center font-bold text-sm ${t.avatarBg}`}>
                  {t.image}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-[11px] text-zinc-400 font-medium">{t.role}</p>
                  <p className="text-[10px] text-zinc-500">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
