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
  Check
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
  { step: 2, label: "Products / Services" },
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
    nextPrompt: "Great! Next, what type of business is it? (Select from choices below or speak it)",
    type: "type_choice"
  },
  {
    step: 1,
    field: "type",
    nextPrompt: "Nice. What are the key products or services you offer? Separate them with commas.",
    type: "text"
  },
  {
    step: 2,
    field: "products",
    nextPrompt: "Got it! Who is your target audience? (e.g., 'families', 'young professionals', 'fitness enthusiasts')",
    type: "text"
  },
  {
    step: 3,
    field: "audience",
    nextPrompt: "Understood. Let's design the layout. Select a visual style for your website:",
    type: "style_choice"
  },
  {
    step: 4,
    field: "style",
    nextPrompt: "Superb choice! Now pick a color theme that matches your brand energy:",
    type: "color_choice"
  },
  {
    step: 5,
    field: "colorTheme",
    nextPrompt: "Looking fantastic! Upload your shop logo (optional):",
    type: "logo_upload"
  },
  {
    step: 6,
    field: "logoUrl",
    nextPrompt: "Almost there! Do you need online ordering enabled on your catalog?",
    type: "boolean_choice"
  },
  {
    step: 7,
    field: "ordering",
    nextPrompt: "Excellent! Do you want to connect a floating WhatsApp widget to receive customer orders in your inbox?",
    type: "whatsapp_input"
  },
  {
    step: 8,
    field: "whatsappEnabled",
    nextPrompt: "Perfect! Lastly, paste any social media links (optional):",
    type: "social_input"
  },
  {
    step: 9,
    field: "socialLinks",
    nextPrompt: "All details verified! Generating your website now...",
    type: "text"
  }
];

export default function OnboardingChat() {
  const { 
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
  const chatScrollRef = useRef(null);

  // Auto Scroll Chat
  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

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

    updateBusinessData(parsedData);
    
    // 3. Move to next step or complete onboarding
    setIsAiTyping(true);

    try {
      const nextStepIdx = currentStep + 1;
      const isLastStep = nextStepIdx >= QUESTIONS_CONFIG.length;

      // Request conversational acknowledgment from API backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api"}/onboarding/chat`, {
        messages: [...messages, userMsg],
        currentQuestionField: configStep.field,
        answer: answerText
      });

      const aiAckText = response.data.acknowledgment;
      
      if (isLastStep) {
        // Complete onboarding
        setGenerating(true);
        
        // Push final AI completion message
        addMessage({
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: "Dhanyavaad! 🙏 All details saved. Building your website, setup domains, and creating your local pages... Stand by!",
          timestamp: new Date().toISOString()
        });

        // Trigger database creation and generator
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api"}/onboarding/complete`, {
          businessData: {
            ...businessData,
            ...parsedData
          }
        });

        setTimeout(() => {
          setGenerating(false);
          setComplete(true);
          setStep(10);
        }, 4000);

      } else {
        // Post next question
        const nextQuestion = QUESTIONS_CONFIG[nextStepIdx];
        
        addMessage({
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: `${aiAckText}\n\n${nextQuestion.nextPrompt}`,
          timestamp: new Date().toISOString(),
          type: nextQuestion.type
        });

        setStep(nextStepIdx);
      }
    } catch (err) {
      console.error("AI chat error:", err);
      // Fallback in case of server failure
      const nextStepIdx = currentStep + 1;
      if (nextStepIdx < QUESTIONS_CONFIG.length) {
        const nextQuestion = QUESTIONS_CONFIG[nextStepIdx];
        addMessage({
          id: `ai-err-${Date.now()}`,
          sender: "ai",
          text: `Got it! Let's continue.\n\n${nextQuestion.nextPrompt}`,
          timestamp: new Date().toISOString(),
          type: nextQuestion.type
        });
        setStep(nextStepIdx);
      }
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleVoiceInput = (transcript) => {
    setInputVal(transcript);
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
            <p className="text-[10px] text-zinc-500 mt-1">Complete all steps to build your site</p>
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
            <h2 className="text-sm font-bold text-[#2F3E46] tracking-wide">AI Website Builder</h2>
          </div>
          {isComplete && (
            <Link href="/">
              <Button className="bg-[#52796F] hover:bg-[#354F52] text-white h-9 px-4 rounded-full text-xs font-bold shadow-sm">
                Go to Homepage
              </Button>
            </Link>
          )}
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

    </div>
  );
}
