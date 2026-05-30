"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Heart, Sparkles } from "lucide-react";

const stats = [
  {
    value: "10,000+",
    label: "Websites Created",
    desc: "Active storefronts and local shops running smoothly.",
    icon: CheckCircle,
    color: "text-[#52796F]"
  },
  {
    value: "95%",
    label: "Customer Satisfaction",
    desc: "Business owners who found SiteForge incredibly simple.",
    icon: Heart,
    color: "text-[#52796F]"
  },
  {
    value: "500K+",
    label: "Monthly Visitors",
    desc: "Customers browsing menu lists and catalogs daily.",
    icon: Sparkles,
    color: "text-[#52796F]"
  }
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-[#CAD2C5] border-t border-[#2F3E46]/12 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-[32px] border border-[#2F3E46]/12 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <p className="text-4xl sm:text-5xl font-black tracking-tight text-[#2F3E46] flex items-baseline gap-1">
                      {stat.value}
                    </p>
                    <div>
                      <h3 className="text-sm font-bold text-[#2F3E46] uppercase tracking-wider">{stat.label}</h3>
                      <p className="text-xs text-[#354F52] mt-1 leading-relaxed">{stat.desc}</p>
                    </div>
                  </div>

                  <div className={`p-3 rounded-2xl bg-[#CAD2C5]/20 border border-[#2F3E46]/12 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
