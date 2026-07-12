"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Sparkles,
  Monitor,
  Tablet,
  Smartphone,
  ArrowLeft,
  ArrowUpRight,
  Settings,
  Grid,
  FileText,
  Flame,
  Dumbbell,
  Scissors,
  Activity,
  Utensils,
  GlassWater,
  ShoppingBag,
  Headphones,
  Cpu,
  ShieldCheck,
  Cake,
  Cookie,
  Check,
  Star,
  Phone,
  Mail,
  MapPin,
  User,
  Clock,
  Calendar,
  ChevronDown,
  Send,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { TEMPLATES_LIST, generateTemplateJson, DESIGN_PRESETS } from "../../../config/templatesRegistry";
import { getOptimizedImageUrl } from "../../../utils/imageOptimizer";

import { 
  LuxuryBakeryTemplate, 
  ModernBakeryTemplate, 
  VintageBakeryTemplate, 
  ArtisanBakeryTemplate, 
  MinimalBakeryTemplate 
} from "../../../components/templates/BakeryTemplates";

import { 
  LuxuryRestaurantTemplate, 
  ModernRestaurantTemplate, 
  VintageRestaurantTemplate, 
  ArtisanRestaurantTemplate, 
  MinimalRestaurantTemplate 
} from "../../../components/templates/RestaurantTemplates";

import { 
  LuxurySalonTemplate, 
  ModernSalonTemplate, 
  VintageSalonTemplate, 
  ArtisanSalonTemplate, 
  MinimalSalonTemplate 
} from "../../../components/templates/SalonTemplates";

import { 
  LuxuryElectronicsTemplate, 
  ModernElectronicsTemplate, 
  VintageElectronicsTemplate, 
  ArtisanElectronicsTemplate, 
  MinimalElectronicsTemplate 
} from "../../../components/templates/ElectronicsTemplates";

const TEMPLATE_COMPONENTS = {
  "bakery-luxury": LuxuryBakeryTemplate,
  "bakery-modern": ModernBakeryTemplate,
  "bakery-vintage": VintageBakeryTemplate,
  "bakery-artisan": ArtisanBakeryTemplate,
  "bakery-minimal": MinimalBakeryTemplate,

  "restaurant-luxury": LuxuryRestaurantTemplate,
  "restaurant-modern": ModernRestaurantTemplate,
  "restaurant-vintage": VintageRestaurantTemplate,
  "restaurant-artisan": ArtisanRestaurantTemplate,
  "restaurant-minimal": MinimalRestaurantTemplate,

  "beauty_salon-luxury": LuxurySalonTemplate,
  "beauty_salon-modern": ModernSalonTemplate,
  "beauty_salon-vintage": VintageSalonTemplate,
  "beauty_salon-artisan": ArtisanSalonTemplate,
  "beauty_salon-minimal": MinimalSalonTemplate,

  "electronics_store-luxury": LuxuryElectronicsTemplate,
  "electronics_store-modern": ModernElectronicsTemplate,
  "electronics_store-vintage": VintageElectronicsTemplate,
  "electronics_store-artisan": ArtisanElectronicsTemplate,
  "electronics_store-minimal": MinimalElectronicsTemplate,
};

const IconMap = {
  Sparkles, Flame, Dumbbell, Scissors, Activity, Utensils, GlassWater,
  ShoppingBag, Headphones, Cpu, ShieldCheck, Cake, Cookie, Check, Star,
  Phone, Mail, MapPin, User, Clock, Calendar
};

const SectionIcon = ({ name, className }) => {
  const IconComponent = IconMap[name] || Sparkles;
  return <IconComponent className={className} />;
};

export default function TemplatePreviewPage({ params }) {
  const { templateId } = params;
  const searchParams = useSearchParams();
  const isPlainMode = searchParams.get("plain") === "true";

  // Template config
  const templateMeta = useMemo(() => {
    return TEMPLATES_LIST.find(t => t.id === templateId) || TEMPLATES_LIST[0];
  }, [templateId]);

  // JSON schema representing the website state
  const [templateJson, setTemplateJson] = useState(null);
  const [activeTab, setActiveTab] = useState("home"); // home, about, services, contact
  const [viewportMode, setViewportMode] = useState("desktop"); // desktop, tablet, mobile
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLogs, setAiLogs] = useState([]);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  // Interaction States
  const [toastMessage, setToastMessage] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAnchorClick = (e, href) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Initialize
  useEffect(() => {
    if (templateMeta) {
      const generated = generateTemplateJson(templateMeta.categoryId, templateMeta.style, templateMeta.name);
      setTemplateJson(generated);
    }
  }, [templateMeta]);

  // Active theme & pages definitions
  const theme = templateJson?.theme || DESIGN_PRESETS.modern;
  const sectionsList = templateJson?.pages[0]?.sections || [];

  // Page Routing Simulation: Filters sections based on simulated subpages
  const activeSections = useMemo(() => {
    if (!sectionsList.length) return [];
    
    if (activeTab === "home") {
      return sectionsList; // Home page displays all sections
    }
    
    if (activeTab === "about") {
      // About Page: Hero, About, Gallery, Testimonials, Contact
      const allowedTypes = ["hero", "about", "gallery", "testimonials", "contact"];
      return sectionsList.filter(sec => allowedTypes.includes(sec.type)).map(sec => {
        if (sec.type === "hero") {
          return {
            ...sec,
            content: {
              ...sec.content,
              title: `About Our Journey`,
              subtitle: `Learn more about our standards, passion, and dedicated team in Pune.`
            }
          };
        }
        return sec;
      });
    }

    if (activeTab === "services") {
      // Services Page: Hero, Services, booking/menu/portfolio/memberships, testimonials, contact
      const allowedTypes = ["hero", "services", "menu", "booking", "memberships", "portfolio", "success-stories", "testimonials", "contact"];
      return sectionsList.filter(sec => allowedTypes.includes(sec.type)).map(sec => {
        if (sec.type === "hero") {
          return {
            ...sec,
            content: {
              ...sec.content,
              title: `Professional Offerings`,
              subtitle: `Browse our packages, catalog services, and tailored configurations.`
            }
          };
        }
        return sec;
      });
    }

    if (activeTab === "contact") {
      // Contact Page: Hero, Contact, FAQ
      const allowedTypes = ["hero", "contact", "faq"];
      return sectionsList.filter(sec => allowedTypes.includes(sec.type)).map(sec => {
        if (sec.type === "hero") {
          return {
            ...sec,
            content: {
              ...sec.content,
              title: `Connect With Us`,
              subtitle: `Reach out directly via phone, mail, or drop by our showroom in Koregaon Park.`
            }
          };
        }
        return sec;
      });
    }

    return sectionsList;
  }, [sectionsList, activeTab]);

  // AI Prompt Processor
  const handleAiPromptSubmit = (e) => {
    e.preventDefault();
    if (!aiPrompt.trim() || !templateJson) return;

    setIsAiProcessing(true);
    setAiLogs([]);

    const promptText = aiPrompt.toLowerCase();
    
    // Animate prompt processing steps
    const steps = [
      "Analyzing design request...",
      "Matching industry presets...",
      "Recalculating typography scales...",
      "Re-compiling layout elements...",
      "Finalizing design changes!"
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setAiLogs(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          applyAiCustomization(promptText);
        }
      }, (idx + 1) * 800);
    });
  };

  const applyAiCustomization = (promptText) => {
    const updated = JSON.parse(JSON.stringify(templateJson));
    const sections = updated.pages[0].sections;

    // Apply Style Changes
    if (promptText.includes("luxurious") || promptText.includes("luxury")) {
      updated.theme = DESIGN_PRESETS.luxury;
    } else if (promptText.includes("minimal") || promptText.includes("clean")) {
      updated.theme = DESIGN_PRESETS.minimal;
    } else if (promptText.includes("modern") || promptText.includes("gradient")) {
      updated.theme = DESIGN_PRESETS.modern;
    } else if (promptText.includes("vintage") || promptText.includes("retro")) {
      updated.theme = DESIGN_PRESETS.vintage;
    } else if (promptText.includes("artisan") || promptText.includes("earthy")) {
      updated.theme = DESIGN_PRESETS.artisan;
    }

    // Apply Color overrides
    if (promptText.includes("green") || promptText.includes("forest")) {
      updated.theme.primaryColor = "#064E3B"; // Forest Green
      updated.theme.accentColor = "#10B981";
    } else if (promptText.includes("blue") || promptText.includes("royal")) {
      updated.theme.primaryColor = "#1E3A8A"; // Royal Navy
      updated.theme.accentColor = "#60A5FA";
    } else if (promptText.includes("gold") || promptText.includes("yellow")) {
      updated.theme.primaryColor = "#1F2937"; // Charcoal
      updated.theme.accentColor = "#D97706"; // Gold
    } else if (promptText.includes("orange") || promptText.includes("terracotta")) {
      updated.theme.primaryColor = "#C2410C";
      updated.theme.accentColor = "#EA580C";
    }

    // Apply Fonts
    if (promptText.includes("font") || promptText.includes("typography")) {
      if (promptText.includes("serif")) {
        updated.theme.fontFamily = "Playfair Display";
      } else if (promptText.includes("mono")) {
        updated.theme.fontFamily = "JetBrains Mono";
      } else {
        updated.theme.fontFamily = "Inter";
      }
    }

    // Add Testimonials
    if (promptText.includes("testimonial") || promptText.includes("reviews") || promptText.includes("endorsements")) {
      const hasTest = sections.some(s => s.type === "testimonials");
      if (!hasTest) {
        sections.splice(sections.length - 2, 0, {
          id: "sec_ai_testimonials",
          type: "testimonials",
          content: {
            title: "Client Endorsements (Added by AI)",
            testimonials: [
              { name: "Suresh Kumar", role: "Elite Member", content: "AI successfully redesigned this segment. Visual layout matches expectations and has pristine spacing!", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
              { name: "Priya Patel", role: "Frequent Buyer", content: "Absolutely stellar spacing and dynamic loading triggers. Top tier experience!", rating: 5, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" }
            ]
          }
        });
      }
    }

    // Add Booking Form
    if (promptText.includes("booking") || promptText.includes("form") || promptText.includes("appointment") || promptText.includes("booking form")) {
      const hasBooking = sections.some(s => s.type === "booking");
      if (!hasBooking) {
        sections.splice(3, 0, {
          id: "sec_ai_booking",
          type: "booking",
          content: {
            title: "Schedule An Appointment (Added by AI)",
            subtitle: "BOOK A CONVENIENT TIME SLOT INSTANTLY",
            submitText: "Confirm Booking Reservation",
            fields: [
              { label: "Your Full Name", type: "text", placeholder: "E.g. Siddharth Mehta" },
              { label: "WhatsApp Contact", type: "tel", placeholder: "E.g. +91 98765 43210" },
              { label: "Preferred Action/Consultation", type: "select", options: ["General Inquiry Meeting", "Premium Catalog Audit", "Express Delivery Pickup"] }
            ]
          }
        });
      }
    }

    // Add Products Section
    if (promptText.includes("product") || promptText.includes("shop") || promptText.includes("store") || promptText.includes("sections")) {
      const hasProd = sections.some(s => s.type === "products");
      if (!hasProd) {
        sections.splice(2, 0, {
          id: "sec_ai_products",
          type: "products",
          content: {
            title: "Featured Catalog",
            subtitle: "HOT RELEASES HANDPICKED FOR YOU",
            products: [
              { name: "Premium Catalog Item", price: "Rs. 1,499", description: "Design tokens configured automatically by visual AI optimizer.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" }
            ]
          }
        });
      } else {
        // Double existing products
        const prodSec = sections.find(s => s.type === "products");
        if (prodSec && prodSec.content.products.length < 4) {
          prodSec.content.products.push({
            name: "AI Custom Recommendation",
            price: "Rs. 2,999",
            description: "High performance specifications matching luxury preferences.",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
          });
        }
      }
    }

    setTemplateJson(updated);
    setIsAiProcessing(false);
    setAiPrompt("");
  };

  // Launch / Use Template
  const handleDeployTemplate = async () => {
    setIsDeploying(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api"}/onboarding/complete`, {
        businessData: {
          name: templateMeta.name,
          type: templateMeta.category,
          whatsappEnabled: true,
          whatsappNumber: "+91 98765 43210"
        },
        websiteJson: templateJson,
        userId: localStorage.getItem("siteforge-auth-user") || "anonymous"
      });

      if (response.data && response.data.success) {
        const websiteId = response.data.data.id;
        window.location.href = `/editor/${websiteId}`;
      } else {
        throw new Error("Failed to deploy template");
      }
    } catch (err) {
      console.error("Template deployment failed:", err);
      alert("Failed to initialize template in editor. Please try again.");
      setIsDeploying(false);
    }
  };

  // If plain mode requested (e.g. Preview Live), render only the clean viewport canvas!
  if (isPlainMode) {
    if (!templateJson) return <div className="p-8 text-center font-mono">Compiling site...</div>;
    const SelectedTemplate = TEMPLATE_COMPONENTS[templateId] || ModernBakeryTemplate;
    return (
      <div className="bg-white min-h-screen relative" style={{ fontFamily: theme.fontFamily }}>
        {/* Style configurations in head */}
        <style jsx global>{`
          body {
            font-family: ${theme.fontFamily}, sans-serif !important;
          }
        `}</style>
        <SelectedTemplate
          theme={theme}
          activeTab={activeTab}
          onGalleryImageClick={setLightboxImage}
          triggerToast={triggerToast}
        />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-zinc-950/95 border border-zinc-800 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxImage(null)}
          >
            <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl border border-zinc-850">
              <img src={getOptimizedImageUrl(lightboxImage.url, 'full')} alt="Lightbox" className="max-w-full max-h-[85vh] object-contain" />
            </div>
            {lightboxImage.caption && (
              <span className="text-zinc-300 text-xs font-black mt-4 uppercase tracking-widest bg-zinc-950/80 px-5 py-2.5 rounded-full border border-zinc-800 backdrop-blur">
                {lightboxImage.caption}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-zinc-950 text-zinc-100 flex flex-col font-sans select-none">
      
      {/* Top Navbar */}
      <header className="h-16 border-b border-zinc-850 bg-zinc-900 px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <Link href="/templates" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
            <ArrowLeft className="h-4 w-4" /> Marketplace
          </Link>
          <span className="h-4 w-px bg-zinc-800" />
          <h1 className="text-sm font-extrabold text-white tracking-wide flex items-center gap-2">
            {templateMeta.name} 
            <span className="text-[10px] font-mono bg-zinc-950 text-[#84A98C] border border-zinc-800 px-2 py-0.5 rounded-full uppercase">
              {theme.style}
            </span>
          </h1>
        </div>

        {/* Dynamic page switching tabs */}
        <div className="hidden md:flex bg-zinc-950 border border-zinc-800 rounded-xl p-1 gap-1">
          {["home", "about", "services", "contact"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors ${
                activeTab === tab
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Viewport resizing toggles */}
        <div className="flex bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
          <button
            onClick={() => setViewportMode("desktop")}
            className={`p-1.5 rounded-md transition-colors ${viewportMode === "desktop" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            title="Desktop View"
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewportMode("tablet")}
            className={`p-1.5 rounded-md transition-colors ${viewportMode === "tablet" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            title="Tablet View"
          >
            <Tablet className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewportMode("mobile")}
            className={`p-1.5 rounded-md transition-colors ${viewportMode === "mobile" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
            title="Mobile View"
          >
            <Smartphone className="h-4 w-4" />
          </button>
        </div>

        {/* Global Save Actions */}
        <div className="flex items-center gap-3">
          <a
            href={`/templates/${templateId}?plain=true`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-[10px] font-black uppercase tracking-widest px-4 h-9 rounded-xl transition-all shadow-sm"
          >
            Preview Live <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={handleDeployTemplate}
            disabled={isDeploying}
            className="flex items-center justify-center gap-1.5 bg-[#52796F] hover:bg-[#354F52] text-white text-[10px] font-black uppercase tracking-widest px-4 h-9 rounded-xl transition-colors shadow-lg disabled:opacity-50"
          >
            {isDeploying ? "Launching..." : "Customize Template"}
          </button>
        </div>
      </header>

      {/* Editor Body Frame */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: AI Customizer Drawer */}
        <aside className="w-80 border-r border-zinc-850 bg-zinc-900 p-6 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-[#84A98C]" />
                <span>Customize With AI</span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1.5 leading-relaxed">
                Type instructions to dynamically change styling tokens, fonts, or append visual sections.
              </p>
            </div>

            <form onSubmit={handleAiPromptSubmit} className="space-y-4">
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Examples:
- Make it luxurious
- Add a booking form
- Change primary color to emerald green
- Change typography to serif"
                disabled={isAiProcessing}
                className="w-full h-32 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-[#52796F] placeholder-zinc-600 resize-none leading-relaxed"
              />
              <button
                type="submit"
                disabled={isAiProcessing || !aiPrompt.trim()}
                className="w-full flex items-center justify-center gap-2 bg-[#52796F] hover:bg-[#354F52] disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-[10px] font-black uppercase tracking-widest h-10 rounded-xl transition-all shadow-md"
              >
                {isAiProcessing ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Processing AI Customizer...
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" /> Apply AI Prompts
                  </>
                )}
              </button>
            </form>

            {/* AI compilation log tracker */}
            {aiLogs.length > 0 && (
              <div className="p-4 bg-zinc-950 border border-zinc-800/80 rounded-2xl space-y-2">
                <span className="text-[9px] font-black text-[#84A98C] uppercase tracking-wider block">AI Compiler Logs</span>
                <div className="space-y-1.5 font-mono text-[9px] text-zinc-400">
                  {aiLogs.map((log, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      {idx === aiLogs.length - 1 && isAiProcessing ? (
                        <RefreshCw className="h-2.5 w-2.5 animate-spin text-[#84A98C]" />
                      ) : (
                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
                      )}
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-zinc-950/40 border border-[#2F3E46]/10 rounded-xl space-y-1">
            <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">Template Specifications</span>
            <div className="text-[9.5px] text-zinc-500 space-y-1 leading-relaxed">
              <div><strong className="text-zinc-400">Industry:</strong> {templateMeta.category}</div>
              <div><strong className="text-zinc-400">Visual style:</strong> <span className="capitalize">{theme.style}</span></div>
              <div><strong className="text-zinc-400">Typography:</strong> {theme.fontFamily}</div>
            </div>
          </div>
        </aside>

        {/* Right Side: Viewport Canvas rendering */}
        <main className="flex-1 bg-zinc-950 p-6 sm:p-10 overflow-y-auto flex justify-center items-start">
          <div
            className="bg-white text-zinc-800 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col min-h-full border border-zinc-800 rounded-t-xl"
            style={{
              width: viewportMode === "mobile" ? "375px" : viewportMode === "tablet" ? "768px" : "100%",
              maxWidth: viewportMode === "mobile" ? "375px" : viewportMode === "tablet" ? "768px" : "1200px"
            }}
          >
            {/* Simple Top Browser Tab Bar */}
            <div className="h-8 bg-zinc-100 border-b border-zinc-200 flex items-center px-4 gap-1.5 select-none shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
              <span className="text-[8px] font-mono text-zinc-400 mx-auto pt-0.5">
                {templateMeta.id}.siteforge.app
              </span>
            </div>

            {/* Render Simulated Subpages Header if not Plain View */}
            <div className="md:hidden bg-zinc-900 p-2 flex justify-around border-b border-zinc-800">
              {["home", "about", "services", "contact"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[8.5px] font-bold uppercase tracking-wider ${activeTab === tab ? "text-white underline" : "text-zinc-500"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Template Page Contents Render */}
            <div className="flex-1 bg-white" style={{ fontFamily: theme.fontFamily }}>
              {(() => {
                const SelectedTemplate = TEMPLATE_COMPONENTS[templateId] || ModernBakeryTemplate;
                return (
                  <SelectedTemplate
                    theme={theme}
                    activeTab={activeTab}
                    onGalleryImageClick={setLightboxImage}
                    triggerToast={triggerToast}
                  />
                );
              })()}
            </div>
          </div>
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900/95 border border-zinc-800 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl border border-zinc-850">
            <img src={getOptimizedImageUrl(lightboxImage.url, 'full')} alt="Lightbox" className="max-w-full max-h-[85vh] object-contain" />
          </div>
          {lightboxImage.caption && (
            <span className="text-zinc-300 text-xs font-black mt-4 uppercase tracking-widest bg-zinc-950/80 px-5 py-2.5 rounded-full border border-zinc-800 backdrop-blur">
              {lightboxImage.caption}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// FAQ ACCORDION COMPONENT
function FaqAccordion({ faqs, theme }) {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <div className="space-y-4">
      {(faqs || []).map((faq, idx) => {
        const isOpen = activeIndex === idx;
        return (
          <div 
            key={idx} 
            className="p-5 transition-all text-left border border-zinc-100 bg-zinc-50/50 rounded-2xl cursor-pointer"
            onClick={() => setActiveIndex(isOpen ? null : idx)}
          >
            <div className="flex items-center justify-between font-bold text-xs text-zinc-900">
              <span>{faq.question}</span>
              <ChevronDown className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </div>
            {isOpen && (
              <p className="text-[10.5px] text-zinc-550 leading-relaxed pt-2.5 border-t border-zinc-200/40 mt-2.5 animate-fade-in">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// SECTION RENDER COMPONENT
function RenderSection({ sec, theme, onAnchorClick, triggerToast, onGalleryImageClick }) {
  const content = sec.content || {};

  const handleProductInquire = (productName) => {
    const target = document.getElementById("sec_booking") || document.getElementById("sec_contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (typeof triggerToast === "function") {
      triggerToast(`Inquiry initiated for "${productName}". Please complete the form.`);
    }
  };

  const handlePlanSelect = (planName) => {
    const target = document.getElementById("sec_booking") || document.getElementById("sec_contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (typeof triggerToast === "function") {
      triggerToast(`Selected plan: "${planName}". Please fill out your details.`);
    }
  };

  return (
    <div id={sec.id} className="relative group">
      {/* 1. HERO */}
      {sec.type === "hero" && (
        <section className="py-24 px-8 text-center text-white relative overflow-hidden bg-zinc-900" style={{ minHeight: "450px" }}>
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight tracking-tight">
              {content.title}
            </h2>
            <p className="text-xs md:text-sm text-zinc-300 text-center max-w-xl mx-auto leading-relaxed font-light">
              {content.subtitle}
            </p>
            <div className="pt-4 flex justify-center">
              <a
                href={content.ctaLink}
                onClick={(e) => onAnchorClick && onAnchorClick(e, content.ctaLink)}
                className={`text-center font-extrabold text-xs shadow-lg transition-all text-white inline-block ${theme.buttonStyle}`}
                style={{ 
                  backgroundColor: theme.primaryColor,
                  borderColor: theme.accentColor
                }}
              >
                {content.ctaText}
              </a>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/65 z-0" />
          <div className="absolute inset-0 z-[-1] bg-cover bg-center" style={{ backgroundImage: `url(${getOptimizedImageUrl(content.backgroundImage, 'full')})` }} />
        </section>
      )}

      {/* 2. ABOUT */}
      {sec.type === "about" && (
        <section className={`px-8 border-b border-zinc-100 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "minimal" ? "#ffffff" : "#fafafa" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900" style={{ color: theme.primaryColor }}>
                {content.title}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {content.description}
              </p>
              
              {content.highlights && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {content.highlights.map((hl, idx) => {
                    const hasEmoji = /^\p{Emoji}/u.test(hl);
                    return (
                      <div key={idx} className="flex items-center gap-2.5 text-[10.5px] text-zinc-800 font-bold bg-[#84A98C]/8 border border-[#84A98C]/15 px-3 py-2.5 rounded-2xl shadow-sm hover:shadow-md hover:bg-[#84A98C]/15 transition-all duration-200">
                        {!hasEmoji && (
                          <div className="h-4 w-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}>
                            <Check className="h-2.5 w-2.5" />
                          </div>
                        )}
                        <span>{hl}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className={`overflow-hidden aspect-square ${theme.imageStyle}`}>
              <img src={getOptimizedImageUrl(content.image, 'medium')} loading="lazy" className="w-full h-full object-cover" alt="about representation" />
            </div>
          </div>
        </section>
      )}

      {/* 3. SERVICES */}
      {sec.type === "services" && (
        <section className={`px-8 bg-white border-b border-zinc-100 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900">
                {content.title}
              </h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{content.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(content.services || []).map((srv, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 space-y-3.5 transition-all duration-300 text-left ${theme.cardStyle}`}
                >
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor}10`, color: theme.primaryColor }}>
                    <SectionIcon name={srv.icon} className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-zinc-900 block">{srv.name}</span>
                    <p className="text-[10.5px] text-zinc-500 leading-relaxed">{srv.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. PRODUCTS */}
      {sec.type === "products" && (
        <section className={`px-8 border-b border-zinc-100 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "luxury" ? "#faf9f6" : "#ffffff" }}>
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900">
                {content.title}
              </h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{content.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(content.products || []).map((prod, idx) => (
                <div 
                  key={idx} 
                  className={`overflow-hidden flex flex-col justify-between transition-all ${theme.cardStyle}`}
                >
                  <div className="aspect-[4/3] w-full bg-zinc-100 overflow-hidden relative">
                    <img src={getOptimizedImageUrl(prod.image, 'medium')} loading="lazy" className="w-full h-full object-cover" alt={prod.name} />
                    <span className="absolute top-3 right-3 text-[9px] font-black text-white px-2.5 py-1 rounded-full shadow" style={{ backgroundColor: theme.primaryColor }}>
                      {prod.price}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between gap-3 text-left">
                    <div className="space-y-1">
                      <span className="text-xs font-extrabold text-zinc-900 block">{prod.name}</span>
                      <p className="text-[10px] text-zinc-500 leading-relaxed">{prod.description}</p>
                    </div>
                    <button 
                      onClick={() => handleProductInquire(prod.name)}
                      className="w-full h-8 text-[9px] font-black tracking-wider uppercase border text-center transition-all bg-transparent hover:bg-zinc-50" 
                      style={{ 
                        borderColor: theme.primaryColor, 
                        color: theme.primaryColor,
                        borderRadius: theme.style === "minimal" ? "0px" : "8px"
                      }}
                    >
                      Inquire Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. GALLERY */}
      {sec.type === "gallery" && (
        <section className={`px-8 bg-zinc-50 border-b border-zinc-100 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900">
                {content.title}
              </h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{content.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {(content.images || []).map((img, idx) => (
                <div 
                  key={idx} 
                  className="space-y-1.5 group/img cursor-pointer"
                  onClick={() => onGalleryImageClick && onGalleryImageClick(img)}
                >
                  <div className={`aspect-square w-full bg-zinc-200 overflow-hidden relative ${theme.imageStyle}`}>
                    <img src={getOptimizedImageUrl(img.url, 'medium')} loading="lazy" className="w-full h-full object-cover group-hover/img:scale-103 transition-all duration-300" alt="gallery-item" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                      <span className="text-[9px] font-bold text-white leading-tight">{img.caption}</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-zinc-400 block truncate text-center mt-1">{img.caption}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. TESTIMONIALS */}
      {sec.type === "testimonials" && (
        <section className={`px-8 bg-white border-b border-zinc-100 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900">
                {content.title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(content.testimonials || []).map((test, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 space-y-4 flex flex-col justify-between text-left ${theme.cardStyle}`}
                >
                  <div className="space-y-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: test.rating || 5 }).map((_, sidx) => (
                        <Star key={sidx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-[10.5px] text-zinc-600 italic leading-relaxed">"{test.content}"</p>
                  </div>
                  <div className="flex items-center gap-3 border-t border-zinc-100 pt-3">
                    {test.avatar && (
                      <div className="h-7 w-7 rounded-full overflow-hidden bg-zinc-200">
                        <img src={getOptimizedImageUrl(test.avatar, 'micro')} loading="lazy" className="w-full h-full object-cover" alt="client avatar" />
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] font-black text-zinc-900 block">{test.name}</span>
                      <span className="text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">{test.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. FAQ */}
      {sec.type === "faq" && (
        <section className={`px-8 bg-white border-b border-zinc-100 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900">
                {content.title}
              </h3>
            </div>
            <FaqAccordion faqs={content.faqs} theme={theme} />
          </div>
        </section>
      )}

      {/* 8. CONTACT */}
      {sec.type === "contact" && (
        <section className={`px-8 border-b border-zinc-100 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "minimal" ? "#ffffff" : "#fafafa" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6 text-left">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900">
                {content.title}
              </h3>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor}10`, color: theme.primaryColor }}>
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[8.5px] font-bold text-zinc-400 block uppercase">Call or WhatsApp</span>
                    <span className="text-xs font-bold text-zinc-800">{content.phone}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor}10`, color: theme.primaryColor }}>
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[8.5px] font-bold text-zinc-400 block uppercase">Email Support</span>
                    <span className="text-xs font-bold text-zinc-800">{content.email}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor}10`, color: theme.primaryColor }}>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[8.5px] font-bold text-zinc-400 block uppercase">Our Location</span>
                    <span className="text-xs font-bold text-zinc-800 leading-normal block max-w-xs">{content.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className={`p-6 space-y-4 text-left ${theme.cardStyle}`}>
              <span className="text-xs font-black text-zinc-900 block border-b pb-2 mb-2 uppercase tracking-wide">Send Quick Message</span>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (typeof triggerToast === "function") {
                  triggerToast("Message sent! We will contact you back shortly.");
                }
              }} className="space-y-3">
                <input required type="text" placeholder="Your Name" className="w-full h-8 px-3 border border-zinc-200 text-[10px] focus:border-[#52796F] outline-none" style={{ borderRadius: theme.style === "minimal" ? "0px" : "6px" }} />
                <input required type="email" placeholder="Your Email" className="w-full h-8 px-3 border border-zinc-200 text-[10px] focus:border-[#52796F] outline-none" style={{ borderRadius: theme.style === "minimal" ? "0px" : "6px" }} />
                <textarea required placeholder="How can we help you?" className="w-full h-16 p-3 border border-zinc-200 text-[10px] focus:border-[#52796F] outline-none resize-none" style={{ borderRadius: theme.style === "minimal" ? "0px" : "6px" }} />
                <button type="submit" className="h-9 w-full text-[10px] font-black text-white uppercase tracking-widest shadow" style={{ 
                  backgroundColor: theme.primaryColor,
                  borderRadius: theme.style === "minimal" ? "0px" : "8px"
                }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* 9. BOOKING */}
      {sec.type === "booking" && (
        <section className={`px-8 bg-zinc-50 border-b border-zinc-100 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
          <div className="max-w-md mx-auto space-y-6 text-center">
            <div className="space-y-1.5">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900">{content.title}</h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{content.subtitle}</p>
            </div>
            
            <div className={`p-6 text-left space-y-4 shadow-xl ${theme.cardStyle}`}>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (typeof triggerToast === "function") {
                  triggerToast("Booking request received! We will confirm your slot via WhatsApp.");
                }
              }} className="space-y-4">
                {(content.fields || []).map((fld, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <label className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider block">{fld.label}</label>
                    {fld.type === "select" ? (
                      <select className="w-full h-9 px-3 border border-zinc-250 text-[10px] outline-none bg-zinc-50" style={{ borderRadius: theme.style === "minimal" ? "0px" : "8px" }}>
                        {(fld.options || []).map((opt, oidx) => (
                          <option key={oidx}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input required type={fld.type} placeholder={fld.placeholder} className="w-full h-9 px-3 border border-zinc-250 text-[10px] outline-none bg-white" style={{ borderRadius: theme.style === "minimal" ? "0px" : "8px" }} />
                    )}
                  </div>
                ))}
                <button type="submit" className="w-full h-10 text-[9.5px] font-black text-white tracking-widest uppercase shadow pt-0.5 mt-2" style={{ 
                  backgroundColor: theme.primaryColor,
                  borderRadius: theme.style === "minimal" ? "0px" : "10px"
                }}>
                  {content.submitText}
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* 10. MENU */}
      {sec.type === "menu" && (
        <section className={`px-8 bg-white border-b border-zinc-100 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900">{content.title}</h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{content.subtitle}</p>
            </div>

            <div className="space-y-8 text-left">
              {(content.categories || []).map((cat, idx) => (
                <div key={idx} className="space-y-4">
                  <span className="text-xs font-black text-zinc-900 block border-l-4 pl-3.5 uppercase tracking-widest" style={{ borderColor: theme.primaryColor }}>
                    {cat.name}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(cat.items || []).map((item, iidx) => (
                      <div 
                        key={iidx} 
                        className="p-4 flex flex-col justify-between gap-2.5 border border-zinc-100 bg-zinc-50/50 rounded-2xl cursor-pointer hover:shadow-md transition-all duration-300"
                        onClick={() => handleProductInquire(item.name)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-extrabold text-zinc-900">{item.name}</span>
                              {(item.tags || []).map((tg, tidx) => (
                                <span key={tidx} className="text-[7.5px] font-black tracking-wider uppercase px-2 py-0.5 rounded text-white bg-emerald-600">
                                  {tg}
                                </span>
                              ))}
                            </div>
                            <p className="text-[10px] text-zinc-500 leading-normal">{item.desc || item.description}</p>
                          </div>
                          <span className="text-xs font-black text-zinc-900 shrink-0" style={{ color: theme.primaryColor }}>
                            {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. MEMBERSHIPS */}
      {sec.type === "memberships" && (
        <section className={`px-8 border-b border-zinc-100 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "luxury" ? "#faf9f6" : "#ffffff" }}>
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900">{content.title}</h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{content.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(content.plans || []).map((plan, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 relative flex flex-col justify-between gap-6 transition-all border ${
                    plan.highlight && theme.style !== "minimal" ? "border-2 border-[#52796F] scale-102 shadow-2xl" : "border-zinc-150"
                  } ${theme.cardStyle}`}
                >
                  {plan.highlight && theme.style !== "minimal" && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-black tracking-widest uppercase bg-[#52796F] text-white px-3 py-0.5 rounded-full shadow">
                      Most Popular
                    </span>
                  )}
                  <div className="space-y-4 text-left">
                    <div className="space-y-1">
                      <span className="text-xs font-black text-zinc-900 block uppercase tracking-wider">{plan.name}</span>
                      <span className="text-xl font-black text-zinc-900 block">{plan.price}</span>
                      <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest block">{plan.duration}</span>
                    </div>
                    <div className="h-px bg-zinc-100" />
                    <div className="space-y-2">
                      {(plan.features || []).map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-2 text-[10px] text-zinc-650 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => handlePlanSelect(plan.name)}
                    className="w-full h-9 text-[9.5px] font-black tracking-widest uppercase transition-all shadow" 
                    style={{ 
                      backgroundColor: plan.highlight ? theme.primaryColor : "#f4f4f5",
                      color: plan.highlight ? "#ffffff" : "#18181b",
                      borderRadius: theme.style === "minimal" ? "0px" : "10px"
                    }}
                  >
                    Get Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. PORTFOLIO */}
      {sec.type === "portfolio" && (
        <section className={`px-8 bg-white border-b border-zinc-100 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900">{content.title}</h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{content.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(content.projects || []).map((proj, idx) => (
                <div 
                  key={idx} 
                  className={`overflow-hidden flex flex-col justify-between transition-all cursor-pointer ${theme.cardStyle}`}
                  onClick={() => onGalleryImageClick && onGalleryImageClick({ url: proj.image, caption: `${proj.name} - ${proj.category}` })}
                >
                  <div className="aspect-[4/3] w-full bg-zinc-100 overflow-hidden relative">
                    <img src={getOptimizedImageUrl(proj.image, 'medium')} loading="lazy" className="w-full h-full object-cover hover:scale-103 transition-transform duration-300" alt={proj.name} />
                  </div>
                  <div className="p-5 text-left space-y-1 bg-white">
                    <span className="text-[8px] font-bold block uppercase tracking-wider" style={{ color: theme.accentColor }}>{proj.category}</span>
                    <span className="text-xs font-extrabold text-zinc-900 block">{proj.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 13. SUCCESS STORIES */}
      {sec.type === "success-stories" && (
        <section className={`px-8 bg-zinc-50 border-b border-zinc-100 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900">{content.title}</h3>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{content.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {(content.stories || []).map((story, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 space-y-4 bg-white ${theme.cardStyle}`}
                >
                  <div className="flex justify-between items-start border-b pb-3 mb-2">
                    <div>
                      <span className="text-xs font-black text-zinc-900 block">{story.title}</span>
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{story.client}</span>
                    </div>
                    <span className="text-[8.5px] font-bold bg-[#84A98C]/15 border border-[#84A98C]/20 text-[#52796F] px-2 py-0.5 rounded uppercase">{story.period}</span>
                  </div>
                  <div className="space-y-2.5 text-[10.5px]">
                    <div>
                      <strong className="text-zinc-500 block uppercase text-[8px] tracking-wider">Before State:</strong>
                      <span className="text-zinc-600">{story.before}</span>
                    </div>
                    <div>
                      <strong className="text-zinc-500 block uppercase text-[8px] tracking-wider">Transformation & Result:</strong>
                      <span className="text-zinc-850 font-bold" style={{ color: theme.primaryColor }}>{story.result}</span>
                    </div>
                    <div>
                      <strong className="text-zinc-500 block uppercase text-[8px] tracking-wider">After State:</strong>
                      <span className="text-zinc-700">{story.after}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 14. FOOTER */}
      {sec.type === "footer" && (
        <footer className="py-12 px-8 bg-zinc-900 text-zinc-400 border-t border-zinc-800 mt-auto text-left">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-sm font-black text-white block">{content.businessName || "SiteForge Generated"}</span>
              <p className="text-[10px] text-zinc-550">{content.copyright || "© 2026 SiteForge App Builder. All layout structures fully isolated by user credentials."}</p>
            </div>
            {content.links && (
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
                {content.links.map((lnk, lidx) => (
                  <a 
                    key={lidx} 
                    href={lnk.href}
                    onClick={(e) => onAnchorClick && onAnchorClick(e, lnk.href)}
                    className="hover:text-white transition-colors"
                  >
                    {lnk.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
