"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  User, 
  Upload, 
  Instagram, 
  Facebook, 
  Twitter, 
  MessageSquare
} from "lucide-react";
import { useOnboardingStore } from "../../store/onboarding.store";
import { Button } from "../ui/Button";

const presetColors = [
  { name: "Deep Sage", value: "from-[#84A98C] to-[#52796F]", hex: "#52796F", desc: "Trustworthy" },
  { name: "Forest Green", value: "from-[#52796F] to-[#2F3E46]", hex: "#2F3E46", desc: "Organic" },
  { name: "Sunset Amber", value: "from-amber-400 to-amber-700", hex: "#D97706", desc: "Energetic" },
  { name: "Deep Teal", value: "from-[#354F52] to-[#2F3E46]", hex: "#354F52", desc: "Professional" },
  { name: "Rose Pink", value: "from-rose-400 to-rose-600", hex: "#e11d48", desc: "Vibrant" },
  { name: "Indigo", value: "from-indigo-500 to-indigo-700", hex: "#4f46e5", desc: "Modern" }
];

const presetStyles = [
  { id: "luxury", name: "✨ Luxury", desc: "Serif fonts, golden tones, premium feel" },
  { id: "modern", name: "🎨 Modern", desc: "Clean lines, vibrant gradients" },
  { id: "minimal", name: "🌿 Minimal", desc: "Black & white, lots of whitespace" },
  { id: "classic", name: "🏛 Classic", desc: "Serif type, traditional layouts" }
];


const audienceOptions = [
  { id: "Families", emoji: "👨‍👩‍👧", label: "Families" },
  { id: "Students", emoji: "🎓", label: "Students" },
  { id: "Professionals", emoji: "💼", label: "Professionals" },
  { id: "Everyone", emoji: "🌍", label: "Everyone" }
];

const productTagsByCategory = {
  "Bakery": ["Cakes", "Pastries", "Bread", "Croissants", "Cookies", "Custom Orders", "Cupcakes", "Donuts"],
  "Restaurant": ["Biryani", "Tandoori", "Chinese", "South Indian", "Thali", "Desserts", "Drinks", "Appetizers"],
  "Salon & Spa": ["Haircut", "Facial", "Bridal Makeover", "Massage", "Manicure", "Hair Color", "Waxing", "Skin Care"],
  "Electronics": ["Smartphones", "Laptops", "Headphones", "Smartwatches", "Tablets", "Speakers", "Cameras", "Accessories"],
  "Fashion": ["Sarees", "Kurtis", "Western Wear", "Ethnic Wear", "Footwear", "Accessories", "Bags", "Jewelry"],
  "Fitness Gym": ["Personal Training", "CrossFit", "Yoga", "Zumba", "Strength Training", "Cardio", "Diet Plans", "Group Classes"],
  "Other Services": ["Consulting", "Repairs", "Cleaning", "Tutoring", "Photography", "Catering", "Design", "Delivery"]
};

export default function ChatMessage({ message, isLast, onAnswerSubmit }) {
  const { businessData } = useOnboardingStore();
  const isAI = message.sender === "ai";
  
  const [logoPreview, setLogoPreview] = useState(null);
  const [whatsappVal, setWhatsappVal] = useState("");
  const [socialVal, setSocialVal] = useState({ instagram: "", facebook: "", twitter: "" });
  const [selectedTags, setSelectedTags] = useState([]);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultStr = reader.result;
        setLogoPreview(resultStr);
        onAnswerSubmit("Uploaded business logo", { logoUrl: resultStr });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkipLogo = () => {
    onAnswerSubmit("Skipped logo upload", { logoUrl: "" });
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) return prev.filter(t => t !== tag);
      return [...prev, tag];
    });
  };

  const submitTags = () => {
    if (selectedTags.length > 0) {
      onAnswerSubmit(selectedTags.join(", "), { products: selectedTags });
    }
  };

  return (
    <div className={`flex gap-3.5 ${isAI ? "justify-start" : "justify-end"} mb-6`}>
      
      {/* AI Avatar */}
      {isAI && (
        <div className="h-8 w-8 rounded-full bg-[#84A98C]/20 border border-[#84A98C]/30 flex items-center justify-center text-[#52796F] shrink-0 mt-0.5 shadow-sm">
          <Sparkles className="h-4.5 w-4.5" />
        </div>
      )}

      {/* Message Bubble wrapper */}
      <div className={`flex flex-col max-w-[85%] ${isAI ? "items-start" : "items-end"}`}>
        
        {/* Main Text Content */}
        <div className={`rounded-2xl px-4.5 py-3 text-sm leading-relaxed ${
          isAI 
            ? "bg-[#84A98C] text-white border border-[#2F3E46]/10 shadow-sm" 
            : "bg-[#52796F] text-white shadow-md"
        }`}>
          <p className="whitespace-pre-wrap">{message.text}</p>
        </div>

        {/* Custom Interactive Onboarding Widgets */}
        {isAI && isLast && (
          <div className="mt-4 w-full min-w-[280px] sm:min-w-[400px] max-w-lg space-y-4">
            
            {/* Widget: Business Type Custom Input */}
            {message.type === "type_choice" && (
              <div className="flex gap-2 w-full max-w-sm">
                <input
                  type="text"
                  placeholder="e.g. Scuba Dive Shop, Custom Blacksmith"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      onAnswerSubmit(e.target.value, { type: e.target.value });
                    }
                  }}
                  className="flex-1 bg-white border border-[#2F3E46]/12 text-[#2F3E46] rounded-full text-xs h-10 px-4 focus:border-[#52796F] outline-none"
                  id="custom-business-type"
                />
                <button
                  onClick={() => {
                    const val = document.getElementById('custom-business-type').value;
                    if (val.trim()) {
                      onAnswerSubmit(val, { type: val });
                    }
                  }}
                  className="bg-[#52796F] hover:bg-[#354F52] text-white font-bold text-xs px-5 rounded-full h-10 transition-colors shadow-sm"
                >
                  Confirm
                </button>
              </div>
            )}

            {/* Widget: Products / Services Tags */}
            {message.type === "products_tags" && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {(productTagsByCategory[businessData.type] || productTagsByCategory["Other Services"]).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold border transition-all duration-200 ${
                        selectedTags.includes(tag)
                          ? "bg-[#52796F] text-white border-[#52796F] shadow-md scale-105"
                          : "bg-white text-[#354F52] border-[#2F3E46]/15 hover:border-[#52796F]/50 hover:bg-[#CAD2C5]/10"
                      }`}
                    >
                      {selectedTags.includes(tag) ? "✓ " : ""}{tag}
                    </button>
                  ))}
                </div>
                {selectedTags.length > 0 && (
                  <button
                    onClick={submitTags}
                    className="w-full bg-[#52796F] hover:bg-[#354F52] text-white rounded-full h-10 text-xs font-bold transition-all shadow-md"
                  >
                    Confirm {selectedTags.length} item{selectedTags.length > 1 ? "s" : ""} →
                  </button>
                )}
              </div>
            )}

            {/* Widget: Audience Choice Cards */}
            {message.type === "audience_choice" && (
              <div className="grid grid-cols-2 gap-2.5">
                {audienceOptions.map((aud) => (
                  <button
                    key={aud.id}
                    onClick={() => onAnswerSubmit(aud.id, { audience: aud.id })}
                    className="bg-white hover:bg-[#52796F] text-[#354F52] hover:text-white border border-[#2F3E46]/12 hover:border-[#52796F] rounded-2xl h-20 text-xs font-bold transition-all duration-200 shadow-sm flex flex-col items-center justify-center gap-1.5 hover:scale-105 active:scale-95"
                  >
                    <span className="text-2xl">{aud.emoji}</span>
                    <span>{aud.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Widget: Website Style cards */}
            {message.type === "style_choice" && (
              <div className="grid grid-cols-2 gap-3">
                {presetStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => onAnswerSubmit(style.name, { style: style.id })}
                    className="flex flex-col justify-between p-4 border border-[#2F3E46]/12 rounded-2xl text-left h-28 bg-white hover:scale-[1.03] hover:border-[#52796F] hover:shadow-lg transition-all duration-200 shadow-sm"
                  >
                    <span className="text-sm font-bold text-[#2F3E46]">{style.name}</span>
                    <span className="text-[10px] text-zinc-500 leading-normal">{style.desc}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Widget: Color Preset Selector */}
            {message.type === "color_choice" && (
              <div className="grid grid-cols-3 gap-2.5">
                {presetColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => onAnswerSubmit(color.name, { colorTheme: color.hex })}
                    className="group bg-white border border-[#2F3E46]/12 rounded-2xl p-3 text-center flex flex-col items-center justify-center gap-2 h-24 hover:border-[#52796F]/40 hover:bg-[#CAD2C5]/10 hover:scale-105 transition-all duration-200 shadow-sm"
                  >
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${color.value} border border-white/20 group-hover:scale-110 transition-transform shadow-inner`} />
                    <div>
                      <p className="text-[10px] font-bold text-[#2F3E46]">{color.name}</p>
                      <p className="text-[8px] text-zinc-400">{color.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Widget: Logo Uploader */}
            {message.type === "logo_upload" && (
              <div className="bg-white border border-[#2F3E46]/12 border-dashed rounded-2xl p-6 text-center flex flex-col items-center gap-4 shadow-sm">
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  <div className="h-11 w-11 rounded-full bg-[#CAD2C5]/20 border border-[#2F3E46]/10 flex items-center justify-center text-[#52796F] hover:bg-[#CAD2C5]/40 transition-colors">
                    <Upload className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-[#2F3E46]">Upload business logo</span>
                  <span className="text-[10px] text-[#354F52] font-mono">PNG, JPG up to 2MB</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>
                
                <div className="h-px bg-[#2F3E46]/10 w-full" />
                
                <button 
                  onClick={handleSkipLogo}
                  className="bg-transparent hover:bg-zinc-550/10 text-zinc-400 hover:text-zinc-650 font-bold text-xs py-1.5 px-4 rounded-full"
                >
                  I don&apos;t have a logo / Skip
                </button>
              </div>
            )}

            {/* Widget: Boolean Yes/No */}
            {message.type === "boolean_choice" && (
              <div className="flex gap-3 max-w-xs">
                <button
                  onClick={() => onAnswerSubmit("Yes, enable ordering", { ordering: true })}
                  className="flex-1 bg-white border border-[#2F3E46]/12 hover:border-[#52796F] hover:bg-[#52796F] hover:text-white text-[#354F52] rounded-2xl h-14 text-xs font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-0.5 hover:scale-105"
                >
                  <span className="text-lg">🛒</span>
                  <span>Yes, enable</span>
                </button>
                <button
                  onClick={() => onAnswerSubmit("No, catalog only", { ordering: false })}
                  className="flex-1 bg-white border border-[#2F3E46]/12 hover:border-[#52796F] hover:bg-[#52796F] hover:text-white text-[#354F52] rounded-2xl h-14 text-xs font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-0.5 hover:scale-105"
                >
                  <span className="text-lg">📋</span>
                  <span>Catalog only</span>
                </button>
              </div>
            )}

            {/* Widget: WhatsApp config */}
            {message.type === "whatsapp_input" && (
              <div className="bg-white border border-[#2F3E46]/12 rounded-2xl p-5 space-y-4 shadow-sm text-[#354F52]">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onAnswerSubmit("Yes, connect WhatsApp", { whatsappEnabled: true });
                    }}
                    className="flex-1 h-9 rounded-full bg-[#CAD2C5]/20 hover:bg-[#52796F] border border-[#2F3E46]/12 text-[#2F3E46] hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" /> Yes, connect
                  </button>
                  <button
                    onClick={() => onAnswerSubmit("No WhatsApp", { whatsappEnabled: false, whatsappNumber: "" })}
                    className="flex-1 h-9 rounded-full bg-[#CAD2C5]/20 hover:bg-zinc-100 border border-[#2F3E46]/12 text-zinc-400 hover:text-zinc-600 font-bold text-xs transition-colors"
                  >
                    No
                  </button>
                </div>

                {businessData.whatsappEnabled && (
                  <div className="space-y-2 pt-2 border-t border-[#2F3E46]/10">
                    <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Enter WhatsApp Number</label>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        placeholder="+91 99999 99999"
                        value={whatsappVal}
                        onChange={(e) => setWhatsappVal(e.target.value)}
                        className="flex-1 bg-white border border-[#2F3E46]/12 text-[#2F3E46] rounded-full text-xs h-10 px-3.5 focus:border-[#52796F] outline-none"
                      />
                      <button
                        onClick={() => {
                          if (whatsappVal.trim()) {
                            onAnswerSubmit(`WhatsApp: ${whatsappVal}`, { whatsappNumber: whatsappVal });
                          }
                        }}
                        className="bg-[#52796F] hover:bg-[#354F52] text-white font-bold text-xs px-4 rounded-full h-10 transition-colors"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Widget: Social handles */}
            {message.type === "social_input" && (
              <div className="bg-white border border-[#2F3E46]/12 rounded-2xl p-5 space-y-3.5 shadow-sm text-[#354F52]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-3 h-10 rounded-full bg-white border border-[#2F3E46]/12">
                    <Instagram className="h-4 w-4 text-[#52796F]" />
                    <input
                      type="text"
                      placeholder="Instagram URL"
                      value={socialVal.instagram}
                      onChange={(e) => setSocialVal({ ...socialVal, instagram: e.target.value })}
                      className="flex-1 bg-transparent text-xs text-[#2F3E46] outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-3 h-10 rounded-full bg-white border border-[#2F3E46]/12">
                    <Facebook className="h-4 w-4 text-[#52796F]" />
                    <input
                      type="text"
                      placeholder="Facebook URL"
                      value={socialVal.facebook}
                      onChange={(e) => setSocialVal({ ...socialVal, facebook: e.target.value })}
                      className="flex-1 bg-transparent text-xs text-[#2F3E46] outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-3 h-10 rounded-full bg-white border border-[#2F3E46]/12">
                    <Twitter className="h-4 w-4 text-[#52796F]" />
                    <input
                      type="text"
                      placeholder="Twitter URL"
                      value={socialVal.twitter}
                      onChange={(e) => setSocialVal({ ...socialVal, twitter: e.target.value })}
                      className="flex-1 bg-transparent text-xs text-[#2F3E46] outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      onAnswerSubmit("Submitted social media links", {
                        socialLinks: {
                          instagram: socialVal.instagram,
                          facebook: socialVal.facebook,
                          twitter: socialVal.twitter
                        }
                      });
                    }}
                    className="flex-1 bg-[#52796F] hover:bg-[#354F52] text-white rounded-full h-10 text-xs font-bold transition-all shadow-md"
                  >
                    Save & Generate Website
                  </button>
                  <button
                    onClick={() => {
                      onAnswerSubmit("Skipped social media links", {
                        socialLinks: { instagram: "", facebook: "", twitter: "" }
                      });
                    }}
                    className="bg-transparent hover:bg-zinc-550/10 text-zinc-400 hover:text-zinc-650 text-xs font-bold px-4 rounded-full h-10"
                  >
                    Skip
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="h-8 w-8 rounded-full bg-[#52796F] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 shadow-sm">
          ME
        </div>
      )}

    </div>
  );
}
