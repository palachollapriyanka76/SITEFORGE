"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Send, 
  Circle, 
  ArrowLeft,
  RotateCcw,
  Loader2,
  Check,
  Volume2,
  VolumeX
} from "lucide-react";
import { useOnboardingStore } from "../../store/onboarding.store";
import ChatMessage from "./ChatMessage";
import VoiceInput from "./VoiceInput";
import LivePreviewPanel from "./LivePreviewPanel";
import axios from "axios";
import Link from "next/link";
import { Button } from "../ui/Button";

const STEPS_CHECKLIST = [
  { step: 0, label: "Business Name" },
  { step: 1, label: "Industry Category" },
  { step: 2, label: "Products & Services" },
  { step: 3, label: "Target Audience" },
  { step: 4, label: "Visual Style" },
  { step: 5, label: "Color Palette" },
  { step: 6, label: "Business Logo" },
  { step: 7, label: "Online Ordering" },
  { step: 8, label: "WhatsApp Chat" },
  { step: 9, label: "Social Networks" }
];

const QUESTIONS_CONFIG = [
  {
    step: 0,
    field: "name",
    nextPrompt: "🏪 Business Category?",
    type: "type_choice"
  },
  {
    step: 1,
    field: "type",
    nextPrompt: "🍰 What offerings or specialties would you like to showcase? (Select tags below or list custom items separated by commas)",
    type: "products_tags"
  },
  {
    step: 2,
    field: "products",
    nextPrompt: "🎯 Target Audience?",
    type: "audience_choice"
  },
  {
    step: 3,
    field: "audience",
    nextPrompt: "🎨 Select Visual Style Layout:",
    type: "style_choice"
  },
  {
    step: 4,
    field: "style",
    nextPrompt: "🌈 Pick Color Theme Palette:",
    type: "color_choice"
  },
  {
    step: 5,
    field: "colorTheme",
    nextPrompt: "📷 Upload logo:",
    type: "logo_upload"
  },
  {
    step: 6,
    field: "logoUrl",
    nextPrompt: "🛒 Enable online orders?",
    type: "boolean_choice"
  },
  {
    step: 7,
    field: "ordering",
    nextPrompt: "📱 Add a WhatsApp widget for direct orders?",
    type: "whatsapp_input"
  },
  {
    step: 8,
    field: "whatsappEnabled",
    nextPrompt: "🌐 Add social handles?",
    type: "social_input"
  },
  {
    step: 9,
    field: "socialLinks",
    nextPrompt: "✨ Creating your site...",
    type: "text"
  }
];

export default function OnboardingChat() {
  const { 
    setUserId,
    businessData, 
    messages, 
    currentStep, 
    isComplete, 
    isGenerating, 
    updateBusinessData, 
    addMessage, 
    setStep, 
    setComplete, 
    setGenerating,
    resetOnboarding 
  } = useOnboardingStore();

  const [inputVal, setInputVal] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  
  const chatScrollRef = useRef(null);

  // Sync Logged In User ID & trigger session isolation checks
  useEffect(() => {
    let activeUserId = localStorage.getItem("siteforge-auth-user");
    if (!activeUserId) {
      activeUserId = `user_${Math.floor(100000 + Math.random() * 900000)}`;
      localStorage.setItem("siteforge-auth-user", activeUserId);
    }
    setUserId(activeUserId);
  }, [setUserId]);

  // Voice synthesis: speak AI prompts aloud
  const speakText = (text) => {
    if (!voiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    // Clean string: strip formatting/emojis
    const clean = text.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, '').replace(/\*+/g, '');
    const utterance = new SpeechSynthesisUtterance(clean);
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes("en") || v.lang.includes("IN"));
    if (preferredVoice) utterance.voice = preferredVoice;
    
    window.speechSynthesis.speak(utterance);
  };

  // Speak welcome message on load
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === "welcome-ai") {
      speakText(messages[0].text);
    }
  }, [messages]);

  // Auto Scroll Chat
  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  const triggerLocalToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Submit Answer
  const handleAnswerSubmit = async (answerText, updatedData) => {
    if (!answerText.trim()) return;

    // 1. Add User Message to log
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: answerText,
      timestamp: new Date().toISOString()
    };
    addMessage(userMsg);
    setInputVal("");
    triggerLocalToast("✓ Website Updated");

    // 2. Update local state store
    const configStep = QUESTIONS_CONFIG[currentStep];
    let parsedData = updatedData || {};
    
    // Fallback if user typed text instead of clicking a widget choice
    if (!updatedData) {
      if (configStep.field === "products") {
        parsedData = { products: answerText.split(",").map(p => p.trim()).filter(Boolean) };
      } else if (configStep.field === "ordering") {
        parsedData = { ordering: answerText.toLowerCase().includes("yes") };
      } else if (configStep.field === "whatsappEnabled") {
        parsedData = { whatsappEnabled: answerText.toLowerCase().includes("yes") };
      } else {
        parsedData = { [configStep.field]: answerText };
      }
    }

    // Special behavior for Other Services custom category flow
    if (configStep.field === "type" && answerText === "Other Services") {
      updateBusinessData({ type: "Other Services" });
      setIsAiTyping(true);
      setTimeout(() => {
        const customPrompt = "I couldn't find your business category in the list. Please specify your business category.";
        addMessage({
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: customPrompt,
          timestamp: new Date().toISOString(),
          type: "custom_category_input"
        });
        setIsAiTyping(false);
        speakText(customPrompt);
      }, 500);
      return;
    }

    updateBusinessData(parsedData);
    
    // 3. Move to next step or complete onboarding
    setIsAiTyping(true);
    try {
      const nextStepIdx = currentStep + 1;
      const isLastStep = nextStepIdx >= QUESTIONS_CONFIG.length;

      // Snappy, concise client-side acknowledgments (70% text reduction)
      const fallbacks = {
        name: "Great name! Let's keep building.",
        type: "Category saved. Moving forward.",
        products: "Excellent list. Added to preview.",
        audience: "Audience noted.",
        style: "Beautiful style choice applied.",
        colorTheme: "Gradients loaded.",
        logoUrl: "Logo processed.",
        ordering: "Catalog settings updated.",
        whatsappEnabled: "WhatsApp widget enabled.",
        socialLinks: "All set!"
      };
      
      let aiAckText = fallbacks[configStep.field] || "Perfect. Saved.";

      if (configStep.field === "type") {
        aiAckText = `Great! I've saved your business category as ${answerText}.`;
      }
      
      if (isLastStep) {
        setComplete(true);
        setGenerating(true);
        
        const endMsg = "All details saved! Watch your site compile in the editor... Stand by!";
        addMessage({
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: endMsg,
          timestamp: new Date().toISOString()
        });
        speakText(endMsg);

        setTimeout(() => {
          window.location.href = "/generating";
        }, 1500);

      } else {
        const nextPrompt = `${aiAckText}\n\n${configStep.nextPrompt}`;
        
        addMessage({
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: nextPrompt,
          timestamp: new Date().toISOString(),
          type: configStep.type
        });

        setStep(nextStepIdx);
        speakText(nextPrompt);
      }
    } catch (err) {
      console.error("AI chat error:", err);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleVoiceInput = (transcript) => {
    setInputVal(transcript);
    // Submit answer automatically
    handleAnswerSubmit(transcript);
  };

  const handleSendClick = () => {
    if (inputVal.trim()) {
      handleAnswerSubmit(inputVal);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#CAD2C5] overflow-hidden relative selection:bg-[#52796F] selection:text-white text-[#354F52]">
      
      {/* Full-Screen site generator scanner */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-6"
          >
            <div className="relative">
              <Loader2 className="h-16 w-16 animate-spin text-[#52796F]" />
              <Sparkles className="h-6 w-6 text-[#84A98C] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold font-display text-[#2F3E46]">Generating Website with AI...</h3>
              <p className="text-sm text-[#354F52]/70 max-w-xs leading-relaxed">
                Writing content structure, choosing themes, and configuring custom pages in the database.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COLUMN 1: Progress Sidebar (Left) */}
      <div className="w-64 border-r border-[#2F3E46]/12 bg-[#CAD2C5]/45 p-6 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-8">
          <div>
            <h2 className="text-xs font-bold text-[#2F3E46] uppercase tracking-widest">Onboarding Progress</h2>
            <p className="text-[10px] text-zinc-550 mt-1">Complete all steps to build your site</p>
          </div>

          <nav className="space-y-3.5">
            {STEPS_CHECKLIST.map((item) => {
              const isPast = currentStep > item.step;
              const isActive = currentStep === item.step;
              return (
                <div 
                  key={item.step} 
                  className={`flex items-center gap-3 text-xs font-semibold ${
                    isActive ? "text-[#52796F]" : isPast ? "text-[#354F52]/80" : "text-[#354F52]/40"
                  }`}
                >
                  {isPast ? (
                    <Check className="h-4.5 w-4.5 text-[#52796F] shrink-0 font-bold" />
                  ) : isActive ? (
                    <div className="h-4.5 w-4.5 rounded-full border-2 border-[#52796F] flex items-center justify-center shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#52796F]" />
                    </div>
                  ) : (
                    <Circle className="h-4.5 w-4.5 text-[#354F52]/30 shrink-0" />
                  )}
                  <span className={isActive ? "font-bold text-[#2F3E46] underline underline-offset-4 decoration-[#52796F]/50" : ""}>{item.label}</span>
                </div>
              );
            })}
          </nav>
        </div>

        <button 
          onClick={resetOnboarding}
          className="flex items-center justify-center gap-1.5 h-10 w-full rounded-full border border-[#2F3E46]/12 bg-white text-[#354F52] hover:text-[#2F3E46] hover:bg-zinc-50 transition-colors text-xs font-bold shadow-sm"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Restart Builder
        </button>
      </div>

      {/* COLUMN 2: Chat Box Panel (Center) */}
      <div className="flex-1 flex flex-col justify-between bg-white h-full relative border-r border-[#2F3E46]/12">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2F3E46]/12 bg-white">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-[#354F52]/60 hover:text-[#2F3E46] transition-colors mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h2 className="text-sm font-bold text-[#2F3E46] tracking-wide flex items-center gap-1.5">
              SiteForge Design Studio
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Voice toggle */}
            <button 
              onClick={() => {
                setVoiceEnabled(!voiceEnabled);
                triggerLocalToast(voiceEnabled ? "Voice Assistant muted" : "Voice Assistant active");
              }} 
              className={`p-2 rounded-full border transition-all ${voiceEnabled ? "bg-indigo-50 border-indigo-200 text-indigo-600" : "bg-zinc-50 border-zinc-200 text-zinc-400"}`}
              title="Toggle Voice Assistant"
            >
              {voiceEnabled ? <Volume2 className="h-4.5 w-4.5 animate-pulse" /> : <VolumeX className="h-4.5 w-4.5" />}
            </button>

            {isComplete && (
              <Link href="/">
                <Button className="bg-[#52796F] hover:bg-[#354F52] text-white h-9 px-4 rounded-full text-xs font-bold shadow-sm">
                  Go to Homepage
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Chat Log Logs */}
        <div className="flex-1 overflow-y-auto px-6 py-8 bg-[#CAD2C5]/10">
          <div className="mx-auto max-w-2xl space-y-4">
            
            {messages.map((msg, index) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isLast={index === messages.length - 1}
                onAnswerSubmit={handleAnswerSubmit}
              />
            ))}

            {/* AI Typing Indicator */}
            {isAiTyping && (
              <div className="flex gap-3.5 justify-start mb-6">
                <div className="h-8 w-8 rounded-full bg-[#84A98C]/20 border border-[#84A98C]/30 flex items-center justify-center text-[#52796F] shrink-0">
                  <Sparkles className="h-4.5 w-4.5 animate-spin" />
                </div>
                <div className="bg-white border border-[#2F3E46]/12 rounded-2xl px-4.5 py-3 text-xs text-[#354F52]/60 flex items-center gap-1.5 shadow-sm">
                  <span>Assistant is thinking...</span>
                </div>
              </div>
            )}

            <div ref={chatScrollRef} />
          </div>
        </div>

        {/* Input Bar Footer */}
        <div className="p-6 border-t border-[#2F3E46]/10 bg-white">
          <div className="mx-auto max-w-2xl flex items-center gap-3">
            
            {/* Voice Prompt trigger */}
            <VoiceInput onTranscript={handleVoiceInput} />

            {/* Main Text Input */}
            <div className="flex-1 relative flex items-center bg-white border border-[#2F3E46]/12 rounded-full focus-within:border-[#52796F] transition-colors h-11 px-4">
              <input
                type="text"
                placeholder={
                  isComplete 
                    ? "Onboarding completed successfully!" 
                    : "Type your answer here..."
                }
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendClick()}
                disabled={isComplete || isAiTyping}
                className="w-full bg-transparent text-sm text-[#2F3E46] placeholder-zinc-400 outline-none pr-8 disabled:opacity-60"
              />
              
              <button
                onClick={handleSendClick}
                disabled={isComplete || isAiTyping || !inputVal.trim()}
                className="absolute right-4 text-[#52796F] hover:text-[#354F52] transition-colors disabled:opacity-30"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* COLUMN 3: Live Website Preview Panel (Right) */}
      <div className="w-96 p-6 bg-[#CAD2C5]/20 hidden xl:block h-full shrink-0">
        <div className="h-full">
          <LivePreviewPanel />
        </div>
      </div>

      {/* Floating local toast notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#2F3E46] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-[#354F52] animate-bounce">
          <Check className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
