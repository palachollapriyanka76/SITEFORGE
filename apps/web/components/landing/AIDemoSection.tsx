"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Sparkles, 
  Terminal, 
  Globe, 
  RefreshCw, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  MessageSquare,
  Cake,
  Phone
} from "lucide-react";

const DEMO_STEPS = [
  {
    prompt: "Build a website for my bakery 'Sweet Oven' in Pune. We make fresh cakes, artisanal breads, and accept party orders.",
    responses: [
      { text: "Got it! Designing a cozy, warm brand system for 'Sweet Oven'...", delay: 1000 },
      { text: "Scaffolding page layout & catalog sections...", delay: 2200 },
      { text: "Writing local-focused SEO copy for Pune bakery searches...", delay: 3500 },
      { text: "Done! Site created in 4.2 seconds.", delay: 4800 },
    ],
    showPreviewAfter: 4800,
    previewState: "bakery"
  },
  {
    prompt: "Can you add a chocolate theme and write an announcement for our upcoming Sunday croissant discount?",
    responses: [
      { text: "Updating brand palette to chocolate tones...", delay: 1000 },
      { text: "Adding banner: 'Croissant Sunday: 20% off all butter croissants!'...", delay: 2500 },
      { text: "Deploying changes to sweetoven.siteforge.app...", delay: 3800 },
      { text: "Website successfully updated!", delay: 4600 },
    ],
    showPreviewAfter: 4600,
    previewState: "bakery_dark"
  }
];

export default function AIDemoSection() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [isTypingPrompt, setIsTypingPrompt] = useState(true);
  const [showWebsite, setShowWebsite] = useState(false);
  const [subState, setSubState] = useState<"skeleton" | "ready">("skeleton");

  const currentStep = DEMO_STEPS[currentStepIdx];

  // Typing effect loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let charIdx = 0;
    const promptStr = currentStep.prompt;
    
    // Reset states for the current step
    setIsTypingPrompt(true);
    setTypedPrompt("");
    setActiveLogs([]);
    setShowWebsite(false);
    setSubState("skeleton");

    const typeChar = () => {
      if (charIdx < promptStr.length) {
        setTypedPrompt((prev) => prev + promptStr.charAt(charIdx));
        charIdx++;
        timer = setTimeout(typeChar, 30);
      } else {
        // Finished typing the user prompt. Start AI log simulation.
        setIsTypingPrompt(false);
        triggerAIResponses();
      }
    };

    timer = setTimeout(typeChar, 1000);

    return () => clearTimeout(timer);
  }, [currentStepIdx]);

  const triggerAIResponses = () => {
    // Add logs step-by-step
    currentStep.responses.forEach((resp) => {
      setTimeout(() => {
        setActiveLogs((prev) => [...prev, resp.text]);
      }, resp.delay);
    });

    // Animate website loading
    setTimeout(() => {
      setShowWebsite(true);
      // Wait another second before replacing skeleton with ready site
      setTimeout(() => {
        setSubState("ready");
      }, 1000);
    }, currentStep.showPreviewAfter - 1000);

    // Loop transition to next step after showing the final result for a bit
    setTimeout(() => {
      setCurrentStepIdx((prev) => (prev + 1) % DEMO_STEPS.length);
    }, currentStep.showPreviewAfter + 6500);
  };

  return (
    <section id="demo" className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="font-display text-sm font-semibold tracking-wider text-indigo-400 uppercase">
            Live AI Generation
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Watch SiteForge Build a Shop Live
          </p>
          <p className="text-zinc-400 text-sm sm:text-base">
            Type natural instructions, chat with the assistant, and see your customized website spin up instantly. No code, no layouts to worry about.
          </p>
        </div>

        {/* Dynamic Split Mockup Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Conversational Chat UI */}
          <div className="lg:col-span-5 flex flex-col bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl min-h-[480px]">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900/60">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">SiteForge Assistant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
                <span className="text-[10px] text-zinc-500 font-medium">Online</span>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-5 space-y-5 overflow-y-auto font-mono text-[12px] leading-relaxed">
              
              {/* Previous History Label if on step 2 */}
              {currentStepIdx > 0 && (
                <div className="text-[10px] text-zinc-600 text-center border-b border-zinc-800/50 pb-2 mb-2">
                  — Previous edits deployed successfully —
                </div>
              )}

              {/* User Prompt (Typing) */}
              <div className="flex gap-3">
                <div className="h-6 w-6 shrink-0 rounded-full bg-zinc-800 text-[10px] font-bold text-zinc-400 flex items-center justify-center">U</div>
                <div className="bg-zinc-800/50 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-200 max-w-[85%] font-sans text-xs">
                  {typedPrompt}
                  {isTypingPrompt && <span className="inline-block h-3.5 w-1 bg-indigo-400 ml-0.5 animate-pulse" />}
                </div>
              </div>

              {/* AI Responses */}
              {activeLogs.map((log, index) => {
                const isDone = index === currentStep.responses.length - 1;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    key={index}
                    className="flex gap-3"
                  >
                    <div className="h-6 w-6 shrink-0 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <div className={`rounded-xl px-3.5 py-2.5 max-w-[85%] font-sans text-xs flex items-start gap-2 ${
                      isDone 
                        ? "bg-indigo-950/20 border border-indigo-500/30 text-indigo-200" 
                        : "bg-zinc-900 border border-zinc-800 text-zinc-300"
                    }`}>
                      {!isDone && <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-500 mt-0.5 shrink-0" />}
                      {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />}
                      <span>{log}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/30 flex items-center gap-3">
              <div className="flex-1 h-10 px-4 rounded-xl bg-zinc-950/60 border border-zinc-800 text-zinc-500 flex items-center text-xs select-none">
                {isTypingPrompt ? "Typing instruction..." : "Waiting for deployment..."}
              </div>
              <button className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-500 flex items-center justify-center">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* RIGHT: Live Website Preview Mockup */}
          <div className="lg:col-span-7 flex flex-col bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl min-h-[480px]">
            {/* Browser Header bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-zinc-950/80">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                </div>
                <div className="h-5 px-3 rounded-md bg-zinc-900 border border-zinc-800/80 flex items-center text-[10px] text-zinc-500 font-mono gap-1 select-none">
                  <Globe className="h-3 w-3 text-zinc-600" /> sweetoven.siteforge.app
                </div>
              </div>
              <RefreshCw className="h-3 w-3 text-zinc-600 animate-spin" />
            </div>

            {/* Preview Canvas */}
            <div className="flex-1 bg-zinc-900 p-5 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                {!showWebsite && (
                  <motion.div 
                    key="skeleton"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full space-y-4"
                  >
                    {/* Skeleton Layout Loader */}
                    <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                      <div className="h-5 w-24 bg-zinc-800 rounded animate-pulse" />
                      <div className="flex gap-2">
                        <div className="h-4 w-8 bg-zinc-800 rounded animate-pulse" />
                        <div className="h-4 w-8 bg-zinc-800 rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="h-32 rounded-xl bg-zinc-800/60 border border-zinc-800 flex items-center justify-center animate-pulse">
                      <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Scaffolding assets...</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-zinc-800/40 border border-zinc-800/50 rounded-lg animate-pulse" />
                      <div className="h-20 bg-zinc-800/40 border border-zinc-800/50 rounded-lg animate-pulse" />
                    </div>
                  </motion.div>
                )}

                {showWebsite && subState === "skeleton" && (
                  <motion.div 
                    key="scanner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-3 text-indigo-400 font-mono text-xs"
                  >
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span>Rendering layouts...</span>
                  </motion.div>
                )}

                {showWebsite && subState === "ready" && (
                  <motion.div
                    key={currentStep.previewState}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`w-full h-full rounded-xl p-5 border flex flex-col justify-between transition-all duration-500 ${
                      currentStep.previewState === "bakery_dark" 
                        ? "bg-amber-950/20 border-amber-900/50 text-amber-100" 
                        : "bg-orange-50 border-orange-100 text-zinc-900"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-3" 
                      style={{ borderColor: currentStep.previewState === "bakery_dark" ? "rgba(251, 191, 36, 0.1)" : "rgba(244, 63, 94, 0.1)" }}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        <Cake className={`h-4.5 w-4.5 ${currentStep.previewState === "bakery_dark" ? "text-amber-400" : "text-orange-600"}`} />
                        <span className="text-sm font-display">Sweet Oven</span>
                      </div>
                      <div className="flex gap-4 text-xs font-semibold select-none opacity-80">
                        <span>Menu</span>
                        <span>Preorder</span>
                      </div>
                    </div>

                    {/* Announcement Banner (Chocolate Step Only) */}
                    {currentStep.previewState === "bakery_dark" && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 bg-amber-400 text-black text-[10px] font-bold text-center py-1.5 rounded-lg shadow-sm"
                      >
                        🔥 Croissant Sunday: 20% off all butter croissants!
                      </motion.div>
                    )}

                    {/* Content Section */}
                    <div className="my-5 space-y-3">
                      <h4 className="text-lg font-extrabold font-display leading-tight">
                        {currentStep.previewState === "bakery_dark" 
                          ? "Decadent Delights & Breads in Pune" 
                          : "Oven-Fresh Cakes & Breads Daily"}
                      </h4>
                      <p className="text-xs leading-relaxed opacity-75">
                        We bake with premium, local ingredients. Order our signature cakes, organic croissants, and special desserts online.
                      </p>
                      
                      {/* Products Grid */}
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className={`p-2.5 rounded-xl border flex flex-col justify-between ${
                          currentStep.previewState === "bakery_dark" 
                            ? "bg-zinc-900/60 border-zinc-800" 
                            : "bg-white border-zinc-100 shadow-sm"
                        }`}>
                          <span className="text-xs font-bold">Butter Croissant</span>
                          <span className={`text-[10px] font-bold mt-1 ${currentStep.previewState === "bakery_dark" ? "text-amber-400" : "text-orange-600"}`}>Rs.99 / pc</span>
                        </div>
                        <div className={`p-2.5 rounded-xl border flex flex-col justify-between ${
                          currentStep.previewState === "bakery_dark" 
                            ? "bg-zinc-900/60 border-zinc-800" 
                            : "bg-white border-zinc-100 shadow-sm"
                        }`}>
                          <span className="text-xs font-bold">Chocolate Fudge Cake</span>
                          <span className={`text-[10px] font-bold mt-1 ${currentStep.previewState === "bakery_dark" ? "text-amber-400" : "text-orange-600"}`}>Rs.650 / half kg</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer / CTA Widget */}
                    <div className="flex gap-2 items-center">
                      <button className={`flex-1 h-9 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 text-white ${
                        currentStep.previewState === "bakery_dark" ? "bg-amber-600 hover:bg-amber-500" : "bg-orange-600 hover:bg-orange-500"
                      }`}>
                        <Phone className="h-3.5 w-3.5" /> Book Party Order
                      </button>
                      <button className="h-9 w-9 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center">
                        <MessageSquare className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
