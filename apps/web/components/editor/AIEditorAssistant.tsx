"use client";

import { useState } from "react";
import { Sparkles, X, Send, ChevronUp, ChevronDown } from "lucide-react";
import { useEditorStore } from "@/store/editor.store";
import axios from "axios";

export function AIEditorAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { websiteJSON, setWebsite } = useEditorStore();

  const PRESETS = [
    "Make it more modern",
    "Change colors to blue",
    "Add a gallery section",
    "Improve hero text",
    "Make it mobile-friendly",
    "Add WhatsApp button"
  ];

  const handlePresetClick = (p: string) => {
    setPrompt(p);
    handleSubmit(p);
  };

  const handleSubmit = async (overridePrompt?: string) => {
    const finalPrompt = overridePrompt || prompt;
    if (!finalPrompt.trim() || !websiteJSON) return;

    setIsProcessing(true);
    try {
      console.log("Submitting AI edit request:", finalPrompt);
      const res = await axios.post("/api/ai/edit", { websiteJSON, prompt: finalPrompt });
      if (res.data && res.data.success && res.data.websiteJSON) {
        setWebsite(res.data.websiteJSON);
        console.log("Visual canvas updated instantly with AI edit!");
      } else {
        throw new Error("Failed to process AI edit request");
      }
    } catch (e) {
      console.error("AI edit failed:", e);
    } finally {
      setIsProcessing(false);
      if (!overridePrompt) setPrompt("");
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 font-medium z-50 border border-indigo-400/30"
      >
        <Sparkles size={18} />
        Ask AI
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[380px] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden z-50 flex flex-col shadow-[0_0_40px_rgba(79,70,229,0.15)]">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-2 text-indigo-400 font-medium">
          <Sparkles size={18} />
          SiteForge AI Assistant
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
          <ChevronDown size={20} />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto max-h-[400px]">
        <div className="mb-4 text-sm text-slate-300">
          I can help you redesign sections, rewrite copy, or change the theme instantly. What would you like to do?
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => handlePresetClick(p)}
              disabled={isProcessing}
              className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-900/50 text-slate-300 hover:text-indigo-300 text-xs rounded-full border border-slate-700 hover:border-indigo-500/50 transition-colors disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-slate-700 bg-slate-950">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Tell AI what to change..."
            disabled={isProcessing}
            className="w-full bg-slate-900 border border-slate-700 rounded-full py-2.5 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
          />
          <button
            onClick={() => handleSubmit()}
            disabled={isProcessing || !prompt.trim()}
            className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors disabled:opacity-50"
          >
            {isProcessing ? <Sparkles size={16} className="animate-pulse" /> : <Send size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
