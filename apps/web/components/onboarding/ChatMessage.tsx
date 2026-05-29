"use client";

import { useState } from "react";
import { 
  Sparkles, 
  User, 
  Upload, 
  Check, 
  Instagram, 
  Facebook, 
  Twitter, 
  CheckSquare, 
  X,
  MessageSquare
} from "lucide-react";
import { Message, BusinessData, useOnboardingStore } from "../../src/store/onboarding.store";
import { Button } from "@siteforge/ui";

interface ChatMessageProps {
  message: Message;
  isLast: boolean;
  onAnswerSubmit: (answerText: string, updatedData?: Partial<BusinessData>) => void;
}

const presetColors = [
  { name: "Deep Indigo", value: "from-indigo-600 to-indigo-800", hex: "#6366F1", desc: "Trustworthy & Modern" },
  { name: "Emerald Green", value: "from-emerald-600 to-emerald-800", hex: "#10B981", desc: "Fresh & Organic" },
  { name: "Rose Pink", value: "from-rose-600 to-rose-800", hex: "#F43F5E", desc: "Warm & Elegant" },
  { name: "Sunset Amber", value: "from-amber-500 to-amber-700", hex: "#F59E0B", desc: "Energetic & Bold" },
  { name: "Ocean Blue", value: "from-blue-600 to-blue-800", hex: "#3B82F6", desc: "Clean & Professional" },
  { name: "Electric Violet", value: "from-violet-600 to-violet-800", hex: "#8B5CF6", desc: "Creative & Premium" },
  { name: "Crimson Red", value: "from-red-600 to-red-800", hex: "#EF4444", desc: "Vibrant & Dynamic" },
  { name: "Slate Minimal", value: "from-zinc-600 to-zinc-800", hex: "#71717A", desc: "Neutral & Sleek" }
];

const presetStyles = [
  { id: "modern", name: "Modern SaaS", desc: "Glassmorphism, rich gradients, dynamic layout", classes: "bg-gradient-to-br from-indigo-950/40 via-zinc-900 to-zinc-900 border-indigo-500/30" },
  { id: "classic", name: "Classic Elegant", desc: "Serif typography, clean lines, traditional look", classes: "bg-zinc-900 border-zinc-700 font-serif" },
  { id: "minimal", name: "Minimalist", desc: "Monochrome, spacious layouts, high contrast", classes: "bg-zinc-950 border-zinc-800" },
  { id: "bold", name: "Bold & Retro", desc: "Dark mode focus, vibrant colors, stark borders", classes: "bg-zinc-900 border-fuchsia-500/20" }
];

export default function ChatMessage({ message, isLast, onAnswerSubmit }: ChatMessageProps) {
  const { businessData } = useOnboardingStore();
  const isAI = message.sender === "ai";
  
  // Local widget states
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [whatsappVal, setWhatsappVal] = useState("");
  const [socialVal, setSocialVal] = useState({ instagram: "", facebook: "", twitter: "" });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultStr = reader.result as string;
        setLogoPreview(resultStr);
        onAnswerSubmit("Uploaded business logo", { logoUrl: resultStr });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkipLogo = () => {
    onAnswerSubmit("Skipped logo upload", { logoUrl: "" });
  };

  return (
    <div className={`flex gap-3.5 ${isAI ? "justify-start" : "justify-end"} mb-6`}>
      
      {/* AI Avatar */}
      {isAI && (
        <div className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
          <Sparkles className="h-4.5 w-4.5 animate-pulse" />
        </div>
      )}

      {/* Message Bubble wrapper */}
      <div className={`flex flex-col max-w-[85%] ${isAI ? "items-start" : "items-end"}`}>
        
        {/* Main Text Content */}
        <div className={`rounded-2xl px-4.5 py-3 text-sm leading-relaxed ${
          isAI 
            ? "bg-zinc-900 border border-zinc-800 text-zinc-100" 
            : "bg-indigo-600 text-white shadow-[0_5px_15px_rgba(99,102,241,0.2)]"
        }`}>
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>

        {/* Custom Interactive Onboarding Widgets (Visible ONLY on the latest message) */}
        {isAI && isLast && (
          <div className="mt-4 w-full min-w-[280px] sm:min-w-[400px] max-w-lg space-y-4">
            
            {/* Widget: Q2: Business Type choice */}
            {message.type === "type_choice" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {["Restaurant", "Shop / Store", "Salon & Spa", "Fitness Gym", "Other Services"].map((type) => (
                  <Button
                    key={type}
                    onClick={() => onAnswerSubmit(type, { type })}
                    className="bg-zinc-900/80 hover:bg-indigo-600 text-zinc-200 hover:text-white border border-zinc-800 hover:border-indigo-500 rounded-xl h-11 text-xs font-semibold transition-all duration-200"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            )}

            {/* Widget: Q5: Website Style cards */}
            {message.type === "style_choice" && (
              <div className="grid grid-cols-2 gap-3.5">
                {presetStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => onAnswerSubmit(style.name, { style: style.id })}
                    className={`flex flex-col justify-between p-4 border rounded-2xl text-left h-32 hover:scale-[1.02] transition-all duration-200 ${style.classes}`}
                  >
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{style.name}</span>
                    <span className="text-[10px] text-zinc-400 leading-normal">{style.desc}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Widget: Q6: Color Preset Selector */}
            {message.type === "color_choice" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {presetColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => onAnswerSubmit(color.name, { colorTheme: color.hex })}
                    className="group bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center flex flex-col items-center justify-between h-28 hover:border-indigo-500/40 hover:bg-zinc-900/60 transition-colors"
                  >
                    <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${color.value} border border-white/10 group-hover:scale-105 transition-transform shadow-inner`} />
                    <div>
                      <p className="text-[10px] font-bold text-zinc-200 truncate max-w-full">{color.name}</p>
                      <p className="text-[8px] text-zinc-500 mt-0.5">{color.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Widget: Q7: Logo Uploader */}
            {message.type === "logo_upload" && (
              <div className="bg-zinc-900/60 border border-zinc-800 border-dashed rounded-2xl p-6 text-center flex flex-col items-center gap-4">
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  <div className="h-11 w-11 rounded-full bg-zinc-800 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                    <Upload className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-zinc-300">Upload business logo</span>
                  <span className="text-[10px] text-zinc-500 font-mono">PNG, JPG up to 2MB</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>
                
                <div className="h-px bg-zinc-800 w-full" />
                
                <Button 
                  onClick={handleSkipLogo}
                  className="bg-transparent hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 font-semibold text-xs py-1.5 px-4 rounded-lg"
                >
                  I don&apos;t have a logo / Skip
                </Button>
              </div>
            )}

            {/* Widget: Q8: Boolean Yes/No buttons */}
            {message.type === "boolean_choice" && (
              <div className="flex gap-3 max-w-xs">
                <Button
                  onClick={() => onAnswerSubmit("Yes, online ordering is needed", { ordering: true })}
                  className="flex-1 bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:bg-indigo-600 text-white rounded-xl h-11 text-xs font-bold transition-all"
                >
                  Yes, enable ordering
                </Button>
                <Button
                  onClick={() => onAnswerSubmit("No online ordering, catalog only", { ordering: false })}
                  className="flex-1 bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:bg-indigo-600 text-white rounded-xl h-11 text-xs font-bold transition-all"
                >
                  No, catalog only
                </Button>
              </div>
            )}

            {/* Widget: Q9: WhatsApp configuration */}
            {message.type === "whatsapp_input" && (
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      // Set state directly
                      onAnswerSubmit("Yes, connect WhatsApp", { whatsappEnabled: true });
                    }}
                    className="flex-1 h-9 rounded-lg bg-zinc-800 hover:bg-emerald-600 border border-zinc-700 hover:border-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" /> Yes, connect WhatsApp
                  </button>
                  <button
                    onClick={() => onAnswerSubmit("No WhatsApp integration", { whatsappEnabled: false, whatsappNumber: "" })}
                    className="flex-1 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 hover:text-zinc-200 font-bold text-xs transition-colors"
                  >
                    No
                  </button>
                </div>

                {businessData.whatsappEnabled && (
                  <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                    <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Enter WhatsApp Number</label>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        placeholder="+91 99999 99999"
                        value={whatsappVal}
                        onChange={(e) => setWhatsappVal(e.target.value)}
                        className="flex-1 bg-zinc-950 border border-zinc-800 text-zinc-200 rounded-lg text-xs h-10 px-3.5 focus:border-indigo-500/80 focus:ring-0 outline-none"
                      />
                      <button
                        onClick={() => {
                          if (whatsappVal.trim()) {
                            onAnswerSubmit(`WhatsApp number: ${whatsappVal}`, { whatsappNumber: whatsappVal });
                          }
                        }}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 rounded-lg h-10 transition-colors"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Widget: Q10: Social handles configuration */}
            {message.type === "social_input" && (
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 space-y-3.5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-3 h-10 rounded-xl bg-zinc-950 border border-zinc-800">
                    <Instagram className="h-4 w-4 text-pink-500" />
                    <input
                      type="text"
                      placeholder="Instagram URL"
                      value={socialVal.instagram}
                      onChange={(e) => setSocialVal({ ...socialVal, instagram: e.target.value })}
                      className="flex-1 bg-transparent text-xs text-zinc-200 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-3 h-10 rounded-xl bg-zinc-950 border border-zinc-800">
                    <Facebook className="h-4 w-4 text-blue-500" />
                    <input
                      type="text"
                      placeholder="Facebook URL"
                      value={socialVal.facebook}
                      onChange={(e) => setSocialVal({ ...socialVal, facebook: e.target.value })}
                      className="flex-1 bg-transparent text-xs text-zinc-200 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-3 h-10 rounded-xl bg-zinc-950 border border-zinc-800">
                    <Twitter className="h-4 w-4 text-sky-400" />
                    <input
                      type="text"
                      placeholder="Twitter URL"
                      value={socialVal.twitter}
                      onChange={(e) => setSocialVal({ ...socialVal, twitter: e.target.value })}
                      className="flex-1 bg-transparent text-xs text-zinc-200 outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => {
                      onAnswerSubmit("Submitted social media links", {
                        socialLinks: {
                          instagram: socialVal.instagram,
                          facebook: socialVal.facebook,
                          twitter: socialVal.twitter
                        }
                      });
                    }}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl h-10 text-xs font-bold transition-all shadow-md"
                  >
                    Save & Generate Website
                  </Button>
                  <Button
                    onClick={() => {
                      onAnswerSubmit("Skipped social media links", {
                        socialLinks: { instagram: "", facebook: "", twitter: "" }
                      });
                    }}
                    className="bg-transparent hover:bg-zinc-850 text-zinc-500 hover:text-zinc-300 text-xs font-semibold px-4 rounded-xl h-10"
                  >
                    Skip
                  </Button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-md">
          <User className="h-4 w-4" />
        </div>
      )}

    </div>
  );
}
