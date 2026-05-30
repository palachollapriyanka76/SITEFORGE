"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the AI website builder work?",
    answer: "It's simple. You enter your business name, pick your store category, and write a one-sentence description of what you sell. Our AI immediately designs custom structures, writes copy, picks professional color themes, selects placeholder pictures, and mounts a contact form. You can then edit it by talking to the AI or using our editor."
  },
  {
    question: "How do customers place orders on my website?",
    answer: "SiteForge features a direct WhatsApp Shop integration. Customers browse your products, add items to their digital shopping cart, and tap 'Send Order'. A formatted message with their order details, total cost, and delivery address is instantly compiled and sent directly to your WhatsApp number."
  },
  {
    question: "Can I connect my custom domain (e.g. www.mybakery.com)?",
    answer: "Yes! While all accounts get a free siteforge.app address, Pro Vendor users can connect their custom domain name. We handle all DNS mapping, supply a secure SSL certificate, and host your files on a global CDN at no extra charge."
  },
  {
    question: "Do I need coding skills or web development experience?",
    answer: "Not at all. If you can send a message on WhatsApp or talk to a voice assistant, you can manage your SiteForge website. The AI handles 100% of the styling, servers, page speed optimization, and responsive mobile sizing automatically."
  },
  {
    question: "Can the AI generate my website in regional Indian languages?",
    answer: "Absolutely. Our AI engine is trained to write copy and menus in Hindi, Kannada, Tamil, Telugu, Marathi, Bengali, and English. Simply specify your preferred language in the onboarding conversation."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-[#2F3E46]/12 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2F3E46]/12 bg-[#CAD2C5]/30 px-3 py-1 text-xs font-semibold text-[#52796F]">
            <HelpCircle className="h-3.5 w-3.5 text-[#52796F]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2F3E46]">
            Frequently Asked Questions
          </h2>
          <p className="text-[#354F52] text-sm sm:text-base">
            Everything you need to know about setting up your storefront and receiving orders.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#2F3E46]/12 bg-white overflow-hidden transition-all hover:border-[#52796F]/30 shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-[#2F3E46] text-sm sm:text-base pr-4">{faq.question}</span>
                  <div className="h-6 w-6 rounded-lg bg-[#CAD2C5]/30 border border-[#2F3E46]/12 flex items-center justify-center text-[#354F52] shrink-0">
                    {isOpen ? <Minus className="h-3.5 w-3.5 text-[#52796F]" /> : <Plus className="h-3.5 w-3.5 text-[#52796F]" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#354F52] border-t border-[#2F3E46]/10 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
