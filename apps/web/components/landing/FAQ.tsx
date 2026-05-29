"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the AI builder work?",
    answer: "You simply enter your business name, choose your industry, and write a short prompt describing your business (e.g., 'A local sweet shop in Jaipur selling traditional sweets and doing home delivery'). Our system processes your prompt with OpenAI GPT-4o, determines the necessary sections, writes custom marketing copy, chooses a matching color theme, and outputs a fully structured website."
  },
  {
    question: "Can I connect my own custom domain?",
    answer: "Yes! While all accounts get a free siteforge.app subdomain (e.g., myshop.siteforge.app), you can easily map your own custom domain (e.g., www.myshop.com) in our Pro and Business plans. We automatically generate a free SSL certificate for you and configure our global CDN for ultra-fast load times."
  },
  {
    question: "What payment methods do you support?",
    answer: "We support all major payment methods, including UPI (Google Pay, PhonePe, Paytm), Netbanking, and Credit/Debit Cards. Checkout sessions are securely processed via Stripe."
  },
  {
    question: "How does the WhatsApp Integration function?",
    answer: "SiteForge embeds a WhatsApp chat widget on your website. When visitors click the button, it opens a WhatsApp chat with your pre-configured phone number. For Business tier users, we support customized catalog buttons, where customers can compile products on your site and send a pre-filled order list directly to your WhatsApp inbox in one tap."
  },
  {
    question: "Can I edit my site after it has been created?",
    answer: "Absolutely! SiteForge comes with a full-featured visual editor. You can drag and drop components, rewrite headings, change images, and edit prices at any time. You can also use voice commands to edit your site (e.g., saying 'change the background color to soft cream' or 'add a new product named Butter Naan for 100 rupees')."
  },
  {
    question: "Is my website SEO friendly?",
    answer: "Yes, every website built with SiteForge is fully optimized for search engines. We auto-generate semantic HTML5 tags, meta titles, descriptions, and sitemaps. The landing pages are compiled as lightweight, static-first builds, guaranteeing high Google PageSpeed scores, which help your local business rank higher on search engines."
  },
  {
    question: "Are there any hidden transaction or hosting fees?",
    answer: "No hidden fees. Hosting, SSL security, and CDN services are fully included in all of our packages, including the Free plan. For paid subscriptions, the price you see (Rs.999/mo or Rs.2499/mo) is exactly what you pay."
  },
  {
    question: "Do you provide support in regional Indian languages?",
    answer: "Yes! SiteForge supports multi-lingual website generation. You can generate websites in Hindi, Marathi, Bengali, Tamil, Kannada, Telugu, Gujarati, and English. Our support team is also available to help you via chat in multiple languages."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      {/* Decorative background glow */}
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="font-display text-sm font-semibold tracking-wider text-indigo-400 uppercase">
            Frequently Asked Questions
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Got Questions? We Have Answers
          </p>
          <p className="text-zinc-400 text-sm sm:text-base">
            Find quick answers to common questions about SiteForge, billing, domain setups, and AI editing.
          </p>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-sm overflow-hidden transition-colors hover:border-zinc-700/60"
              >
                {/* Accordion Trigger button */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-white focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold pr-4 flex items-center gap-3">
                    <HelpCircle className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-zinc-400 shrink-0"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </button>

                {/* Accordion Expandable Content wrapper */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed pl-[38px] border-t border-zinc-800/40">
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
