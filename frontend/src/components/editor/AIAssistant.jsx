import React from "react";
import { Sparkles, Send } from "lucide-react";

export default function AIAssistant({
  aiMessages,
  chatInput,
  setChatInput,
  handleAiSend,
  isAiTyping,
  chatEndRef
}) {
  return (
    <div className="flex flex-col justify-between h-[calc(100vh-14px-56px)]">
      {/* Chat Feed */}
      <div className="p-4 space-y-3.5 overflow-y-auto flex-1 text-xs">
        <div className="space-y-1 bg-zinc-950/40 p-3 border border-zinc-850 rounded-xl">
          <div className="flex items-center gap-1.5 font-bold text-indigo-400">
            <Sparkles className="h-3.5 w-3.5" /> AI Layout Assistant
          </div>
          <p className="text-[10px] text-zinc-400 leading-normal">
            Tell the AI to customize the page layout or rewrite sections instantly.
          </p>
        </div>

        {/* Messages log */}
        <div className="space-y-2.5">
          {aiMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl max-w-[85%] leading-normal ${
                msg.sender === "ai"
                  ? "bg-zinc-950 border border-zinc-850 text-zinc-200 rounded-tl-none"
                  : "bg-indigo-600 text-white ml-auto rounded-tr-none font-bold"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isAiTyping && (
            <div className="bg-zinc-950 border border-zinc-850 text-zinc-400 p-3 rounded-2xl rounded-tl-none w-16 text-center animate-pulse font-bold">
              ...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* suggestions & Input */}
      <div className="p-3 border-t border-zinc-850 bg-zinc-950/60 space-y-2.5 shrink-0">
        {/* quick buttons */}
        <div className="flex flex-wrap gap-1">
          {[
            "Make it more luxurious",
            "Add customer testimonials",
            "Create a gallery",
            "Add WhatsApp CTA",
            "Use modern fonts",
            "Increase conversions"
          ].map((btn) => (
            <button
              key={btn}
              onClick={() => {
                setChatInput(btn);
                // Trigger send with direct value to avoid state lag
                setTimeout(() => handleAiSend(btn), 50);
              }}
              className="text-[9.5px] bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white px-2 py-1 rounded-full transition-colors"
            >
              {btn}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 border border-zinc-850 bg-zinc-950 rounded-xl p-1.5">
          <input
            type="text"
            placeholder="Ask AI to customize..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAiSend();
            }}
            className="flex-1 bg-transparent border-0 text-xs px-2 focus:outline-none focus:ring-0 text-white placeholder-zinc-550"
          />
          <button
            onClick={() => handleAiSend()}
            className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-lg text-white transition-all"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
