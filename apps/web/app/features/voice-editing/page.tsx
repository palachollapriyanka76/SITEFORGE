"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Mic, 
  Sparkles, 
  FileText, 
  DollarSign, 
  Image as ImageIcon, 
  ShoppingBag, 
  ArrowLeft, 
  ArrowRight,
  Play,
  CheckCircle,
  Volume2
} from "lucide-react";

const detailedFeatures = [
  {
    icon: Mic,
    title: "Natural Voice Commands",
    subtitle: "Speak naturally in your preferred language",
    description: "Our voice recognition model is custom-trained to decode conversational prompts. Tell SiteForge to perform updates just like you'd message a friend on WhatsApp. Full support for English, Hindi, Tamil, Telugu, and Kannada.",
    details: [
      "No typing or complex editor menus needed",
      "Decodes accents and casual phrasing effortlessly",
      "Instant translation to action configurations"
    ],
    color: "from-purple-500/10 to-teal-500/10",
    border: "hover:border-purple-500/30"
  },
  {
    icon: FileText,
    title: "Editing Website Content",
    subtitle: "Update descriptions and slogans instantly",
    description: "Modify text, add announcements, and alter descriptions hands-free. Just say: 'Change my about text to explain that we source fresh wheat' and watch the text block on your website update in real-time.",
    details: [
      "Rewrite slogans, greetings, and about sections",
      "Update shop operating times or address instructions",
      "Draft promotional highlights at a moment's notice"
    ],
    color: "from-blue-500/10 to-teal-500/10",
    border: "hover:border-blue-500/30"
  },
  {
    icon: DollarSign,
    title: "Updating Catalog Prices",
    subtitle: "Instant price changes for seasonal catalog items",
    description: "Prices fluctuate. Keep your store menu accurate without opening excel sheets or admin databases. Say: 'Change the price of Motiichoor Ladoo to 650 rupees' and your website reflects the new prices instantly.",
    details: [
      "Update single prices or modify categories at once",
      "Automated currency symbol placement and spacing",
      "Live sync to customer checkout totals"
    ],
    color: "from-green-500/10 to-teal-500/10",
    border: "hover:border-green-500/30"
  },
  {
    icon: ImageIcon,
    title: "Changing Layout Images",
    subtitle: "Swap banner graphics and product pictures",
    description: "Breathe new life into your website structure. Say: 'Change the top banner image to a cozy bakery background' or upload photos via voice prompt, and the builder automatically crops, scales, and aligns it.",
    details: [
      "Image cropping and resizing optimized for page speed",
      "Integrates with Unsplash library for high-definition stock files",
      "Voice-guided image uploads from mobile photo rolls"
    ],
    color: "from-sky-500/10 to-teal-500/10",
    border: "hover:border-sky-500/30"
  },
  {
    icon: ShoppingBag,
    title: "Managing Products",
    subtitle: "Add, delete, or hide products from the menu",
    description: "Manage product stock levels, delete discontinued options, and add newly arrived products instantly. Say: 'Add new product: Chocolate Muffin for 90 rupees' and watch a new product card render in seconds.",
    details: [
      "Add description and price tag automatically in one go",
      "Hide sold-out items from customer views instantly",
      "Reorder product catalog pages via voice preference"
    ],
    color: "from-indigo-500/10 to-teal-500/10",
    border: "hover:border-indigo-500/30"
  }
];

const mockTranscript = [
  { sender: "user", text: "Update price of Butter Croissant to Rs. 140 and add new item Chocolate Donut for Rs. 90" },
  { sender: "ai", text: "Analyzing voice prompt... Found 2 updates." },
  { sender: "ai", text: "✅ Changed price: 'Fresh Butter Croissant' is now Rs. 140." },
  { sender: "ai", text: "✅ Added catalog item: 'Chocolate Donut' listed for Rs. 90." },
  { sender: "user", text: "Awesome, change the header image to a nice bakery top banner" },
  { sender: "ai", text: "✅ Replacing background banner with optimized bakery graphic. Regenerating preview canvas..." }
];

export default function SmartVoiceEditingPage() {
  const [activeStep, setActiveStep] = useState(0);

  const nextPrompt = () => {
    setActiveStep((prev) => (prev + 1) % mockTranscript.length);
  };

  const resetPrompt = () => {
    setActiveStep(0);
  };

  return (
    <div className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Back navigation link */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#354F52] hover:text-[#2F3E46] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>

      {/* Hero section */}
      <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
        
        {/* Hero Copy Left */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#52796F]/30 bg-[#52796F]/10 px-4 py-1.5 text-xs font-bold text-[#52796F]">
            <Mic className="h-3.5 w-3.5" />
            <span>India's First Smart Voice Editor</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-[#2F3E46] leading-tight tracking-tight">
            Manage and Edit Your <br />
            Website Using Simple Voice Prompts
          </h1>
          <p className="text-base sm:text-lg text-[#354F52] leading-relaxed max-w-2xl">
            Tired of fiddling with complex administration panels and desktop interfaces? 
            With SiteForge, just tap the microphone on your phone and instruct your AI helper. 
            Update prices, add menu selections, and swap page banners using natural language.
          </p>
        </div>

        {/* Right Panel: Simulated Interactive Transcript */}
        <div className="lg:col-span-5 bg-white border border-[#2F3E46]/12 rounded-[32px] p-6 shadow-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2F3E46]/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#52796F] flex items-center justify-center text-white relative">
                  <span className="absolute inset-0 rounded-full bg-[#52796F] opacity-70 animate-ping" />
                  <Mic className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#2F3E46]">Voice Assistant Status</h3>
                  <p className="text-[9px] text-[#52796F] font-bold uppercase tracking-wider">Listening...</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={resetPrompt}
                  className="px-3 py-1.5 rounded-full bg-[#CAD2C5]/30 text-[#354F52] hover:bg-[#CAD2C5]/50 text-[9px] font-bold uppercase tracking-wider transition-all"
                >
                  Reset
                </button>
                <button 
                  onClick={nextPrompt}
                  className="px-3.5 py-1.5 rounded-full bg-[#52796F] text-white hover:bg-[#354F52] text-[9px] font-bold uppercase tracking-wider transition-all flex items-center gap-1"
                >
                  Next Prompt <Play className="h-2.5 w-2.5 fill-white text-white" />
                </button>
              </div>
            </div>

            {/* Transcript Area */}
            <div className="space-y-3.5 min-h-[220px] max-h-[260px] overflow-y-auto pr-1">
              {mockTranscript.slice(0, activeStep + 1).map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 max-w-[90%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}
                >
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 ${
                    msg.sender === "user" ? "bg-[#52796F] text-white" : "bg-[#84A98C] text-white"
                  }`}>
                    {msg.sender === "user" ? "ME" : "AI"}
                  </div>
                  <div className={`rounded-xl px-3.5 py-2 text-xs leading-relaxed ${
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
          
          <div className="border-t border-[#2F3E46]/10 pt-4 mt-4 flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
            <Volume2 className="h-4.5 w-4.5 text-[#52796F] animate-pulse" />
            <span>Interactive Voice Demonstration</span>
          </div>
        </div>

      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {detailedFeatures.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className={`rounded-[32px] border border-[#2F3E46]/12 bg-white/70 backdrop-blur-md p-8 flex flex-col justify-between shadow-sm transition-all duration-300 ${feat.border}`}
            >
              <div className="space-y-6">
                {/* Header Icon */}
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${feat.color} border border-[#2F3E46]/10 flex items-center justify-center text-[#52796F]`}>
                  <Icon className="h-6 w-6" />
                </div>
                
                {/* Text Title & Subtitle */}
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-[#2F3E46]">
                    {feat.title}
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                    {feat.subtitle}
                  </p>
                  <p className="text-xs text-[#354F52] leading-relaxed pt-2">
                    {feat.description}
                  </p>
                </div>

                <hr className="border-[#2F3E46]/10" />

                {/* Sublist details */}
                <ul className="space-y-3.5">
                  {feat.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-[11px] text-[#354F52] font-semibold">
                      <CheckCircle className="h-4 w-4 text-[#84A98C] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA container */}
      <div className="rounded-[40px] bg-[#2F3E46] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#52796F]/10 to-transparent" />
        
        <div className="relative z-10 max-w-2xl space-y-6 text-left">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Ready to test voice features?
          </h2>
          <p className="text-xs sm:text-sm text-[#CAD2C5] leading-relaxed">
            Create your account today, launch your storefront demo, and experience natural 
            voice prompts to adjust items, catalog pages, and themes instantly.
          </p>
          <div className="pt-2">
            <Link href="/sign-up">
              <button className="h-12 px-8 rounded-full bg-[#52796F] hover:bg-[#84A98C] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all duration-200">
                Start Free Sign-Up <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
