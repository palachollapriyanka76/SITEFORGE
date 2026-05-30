"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Circle, 
  ArrowLeft,
  RotateCcw,
  Loader2,
  Check
} from "lucide-react";
import { Message, useOnboardingStore, BusinessData } from "../../src/store/onboarding.store";
import ChatMessage from "./ChatMessage";
import VoiceInput from "./VoiceInput";
import LivePreviewPanel from "./LivePreviewPanel";
import axios from "axios";
import Link from "next/link";
import { Button } from "@siteforge/ui";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

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
  const { user: clerkUser } = useUser();
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

  const router = useRouter();

  const [inputVal, setInputVal] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Sync Clerk User ID & Trigger reset if user has changed
  useEffect(() => {
    if (clerkUser?.id) {
      console.log("STEP 10: Onboarding Started - Clerk User ID: " + clerkUser.id);
      setUserId(clerkUser.id);
    }
  }, [clerkUser, setUserId]);

  // Auto Scroll Chat
  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  // Submit Answer
  const handleAnswerSubmit = async (answerText: string, updatedData?: Partial<BusinessData>) => {
    if (!answerText.trim()) return;

    // 1. Add User Message to log
    const userMsg: Message = {
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
      const response = await axios.post("/api/onboarding/chat", {
        messages: [...messages, userMsg],
        currentQuestionField: configStep.field,
        answer: answerText
      });

      const aiAckText = response.data.acknowledgment;
      if (isLastStep) {
        console.log("STEP 1: Onboarding completed successfully.");
        console.log("STEP 2: Preparing to send business data to the SiteForge Design Studio...");

        // Complete onboarding in store
        setComplete(true);
        setGenerating(true);

        // Push final AI completion message
        addMessage({
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: "Dhanyavaad! 🙏 All details saved. Sending you to the SiteForge Design Studio to watch your brand identity and templates build... Stand by!",
          timestamp: new Date().toISOString()
        });

        // STEP 1: Immediately redirect to /generating
        setTimeout(() => {
          router.push("/generating");
        }, 1500);

      } else {
        // Post next question
        const nextQuestion = QUESTIONS_CONFIG[nextStepIdx];
        
        addMessage({
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: `${aiAckText}\n\n${nextQuestion.nextPrompt}`,
          timestamp: new Date().toISOString(),
          type: nextQuestion.type as any
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
          type: nextQuestion.type as any
        });
        setStep(nextStepIdx);
      }
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleVoiceInput = (transcript: string) => {
    setInputVal(transcript);
  };

  const handleSendClick = () => {
    if (inputVal.trim()) {
      handleAnswerSubmit(inputVal);
    }
  };

  return (
    <div className="flex h-screen w-full bg-zinc-950 overflow-hidden relative">
      
      {/* Full-Screen site generator scanner */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-6"
          >
            <div className="relative">
              <Loader2 className="h-16 w-16 animate-spin text-indigo-500" />
              <Sparkles className="h-6 w-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold font-display text-white">Generating Website with AI...</h3>
              <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
                Writing content structure, choosing HSL color themes, and configuring custom pages in the database.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COLUMN 1: Progress Sidebar (Left) */}
      <div className="w-64 border-r border-zinc-900 bg-zinc-950 p-6 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-8">
          <div>
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Onboarding Progress</h2>
            <p className="text-[10px] text-zinc-600 mt-1">Complete all steps to build your site</p>
          </div>

          <nav className="space-y-3.5">
            {STEPS_CHECKLIST.map((item) => {
              const isPast = currentStep > item.step;
              const isActive = currentStep === item.step;
              return (
                <div 
                  key={item.step} 
                  className={`flex items-center gap-3 text-xs font-semibold ${
                    isActive ? "text-indigo-400" : isPast ? "text-zinc-400" : "text-zinc-650"
                  }`}
                >
                  {isPast ? (
                    <Check className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                  ) : isActive ? (
                    <div className="h-4.5 w-4.5 rounded-full border border-indigo-500 flex items-center justify-center shrink-0">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    </div>
                  ) : (
                    <Circle className="h-4.5 w-4.5 text-zinc-800 shrink-0" />
                  )}
                  <span className={isActive ? "font-bold text-white underline underline-offset-4 decoration-indigo-500/50" : ""}>{item.label}</span>
                </div>
              );
            })}
          </nav>
        </div>

        <button 
          onClick={resetOnboarding}
          className="flex items-center justify-center gap-1.5 h-10 w-full rounded-xl border border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors text-xs font-bold"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Restart Builder
        </button>
      </div>

      {/* COLUMN 2: Chat Box Panel (Center) */}
      <div className="flex-1 flex flex-col justify-between bg-zinc-950 h-full relative border-r border-zinc-900">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-950">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="text-zinc-500 hover:text-white transition-colors mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h2 className="text-sm font-bold text-white tracking-wide">AI Website Builder</h2>
          </div>
          {isComplete && (
            <Link href="/dashboard">
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white h-9 px-4 rounded-lg text-xs font-bold shadow-md shadow-indigo-600/20">
                Go to Dashboard
              </Button>
            </Link>
          )}
        </div>

        {/* Chat Log Logs */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
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
                <div className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Sparkles className="h-4.5 w-4.5 animate-spin" />
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4.5 py-3 text-xs text-zinc-500 flex items-center gap-1.5 font-mono shadow-sm">
                  <span>Assistant is thinking...</span>
                </div>
              </div>
            )}

            <div ref={chatScrollRef} />
          </div>
        </div>

        {/* Input Bar Footer */}
        <div className="p-6 border-t border-zinc-900 bg-zinc-950">
          <div className="mx-auto max-w-2xl flex items-center gap-3">
            
            {/* Voice Prompt trigger */}
            <VoiceInput onTranscript={handleVoiceInput} />

            {/* Main Text Input */}
            <div className="flex-1 relative flex items-center bg-zinc-900 border border-zinc-800 rounded-xl focus-within:border-zinc-700/80 transition-colors h-11 px-3">
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
                className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none pr-8 disabled:opacity-60"
              />
              
              <button
                onClick={handleSendClick}
                disabled={isComplete || isAiTyping || !inputVal.trim()}
                className="absolute right-3 text-zinc-500 hover:text-white transition-colors disabled:opacity-30"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* COLUMN 3: Live Website Preview Panel (Right) */}
      <div className="w-96 p-6 bg-zinc-950 hidden xl:block h-full shrink-0">
        <div className="h-full">
          <LivePreviewPanel />
        </div>
      </div>

    </div>
  );
}
