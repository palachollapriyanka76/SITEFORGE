"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  Terminal, 
  Palette, 
  ArrowRight, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Check, 
  RefreshCw, 
  Layout, 
  ChevronRight,
  Eye
} from "lucide-react";
import axios from "axios";
import { useOnboardingStore } from "../../store/onboarding.store";


// Unified High-Fidelity Section Renderer for Generating Page Live Device Preview
const PreviewSectionRenderer = ({ sec, theme }) => {
  const primaryColor = theme.primaryColor || "#4f46e5";
  const style = theme.style || "modern";
  const isMinimal = style === "minimal";
  const isLuxury = style === "luxury";

  switch (sec.type) {
    case "hero":
      return (
        <section className="py-16 px-6 text-center text-white relative overflow-hidden bg-zinc-900" style={{ minHeight: "260px" }}>
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <h1 className="text-xl md:text-3xl font-black leading-tight text-white">{sec.content.title}</h1>
            <p className="text-[10px] md:text-xs text-zinc-300 leading-relaxed font-light">{sec.content.subtitle}</p>
            <div className="pt-2">
              <span className="inline-block text-[10px] font-black text-white px-5 py-2" style={{ 
                backgroundColor: primaryColor,
                borderRadius: isMinimal || isLuxury ? "0px" : "8px"
              }}>
                {sec.content.ctaText}
              </span>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="absolute inset-0 z-[-1] bg-cover bg-center animate-pulse" style={{ backgroundImage: `url(${sec.content.backgroundImage})` }} />
        </section>
      );

    case "about":
    case "team":
      return (
        <section className="py-12 px-6 border-b border-zinc-100" style={{ backgroundColor: isMinimal ? "#ffffff" : "#fafafa" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h2 className="text-sm font-black text-zinc-950">{sec.content.title}</h2>
              <p className="text-[10px] text-zinc-600 leading-relaxed">{sec.content.description}</p>
              {sec.content.highlights && (
                <div className="grid grid-cols-2 gap-2 pt-1.5">
                  {sec.content.highlights.slice(0, 4).map((hl, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[9px] text-zinc-655 font-bold">
                      <span className="text-[8px]" style={{ color: primaryColor }}>✓</span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={`overflow-hidden aspect-[4/3] ${isMinimal ? "" : isLuxury ? "rounded-2xl shadow-md" : "rounded-xl shadow"}`}>
              <img src={sec.content.image} className="w-full h-full object-cover" alt="about" />
            </div>
          </div>
        </section>
      );    case "services":
    case "programs":
    case "consultation":
      return (
        <section className="py-12 px-6 bg-white border-b border-zinc-100">
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-sm font-black text-zinc-950">{sec.content.title}</h2>
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest">{sec.content.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(sec.content.services || []).map((srv, idx) => (
                <div key={idx} className={`p-4 space-y-2 text-left ${theme.cardStyle || `border border-zinc-100 ${isMinimal ? "" : "rounded-xl"} bg-zinc-50`}`}>
                  <span className="text-[10px] font-black text-zinc-900 block">{srv.name}</span>
                  <p className="text-[9px] text-zinc-550 leading-relaxed">{srv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "products":
    case "collections":
    case "catalog":
    case "inventory":
    case "featured-products":
    case "menu":
      return (
        <section className="py-12 px-6 bg-white border-b border-zinc-100">
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-sm font-black text-zinc-955">{sec.content.title}</h2>
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest">{sec.content.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(sec.content.products || []).map((prod, idx) => (
                <div key={idx} className={`overflow-hidden flex flex-col text-left ${theme.cardStyle || `border border-zinc-100 ${isMinimal ? "" : "rounded-xl"} bg-white shadow-sm`}`}>
                  <div className="aspect-[4/3] bg-zinc-50 relative overflow-hidden">
                    <img src={prod.image} className="w-full h-full object-cover" alt={prod.name} />
                    <span className="absolute top-2 right-2 text-[8px] font-black text-white px-2 py-0.5 shadow" style={{ backgroundColor: primaryColor, borderRadius: theme.style === 'minimal' ? '0px' : '9999px' }}>
                      {prod.price}
                    </span>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold text-zinc-900 block">{prod.name}</span>
                      <p className="text-[9px] text-zinc-500 leading-normal">{prod.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "gallery":
    case "showcase":
    case "portfolio":
      return (
        <section className="py-12 px-6 bg-zinc-50 border-b border-zinc-100">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-sm font-black text-zinc-950">{sec.content.title}</h2>
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest">{sec.content.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {(sec.content.images || []).map((img, idx) => (
                <div key={idx} className={`aspect-square w-full bg-zinc-100 overflow-hidden relative ${theme.imageStyle || (isMinimal ? "" : "rounded-lg")}`}>
                  <img src={img.url} className="w-full h-full object-cover" alt="gallery" />
                </div>
              ))}
            </div>
          </div>
        </section>
      );



    case "pricing":
      return (
        <section className="py-12 px-6 bg-white border-b border-zinc-100">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-sm font-black text-zinc-950">{sec.content.title}</h2>
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest">{sec.content.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(sec.content.tiers || []).map((tier, idx) => (
                <div key={idx} className={`p-4 flex flex-col justify-between gap-4 text-left ${theme.cardStyle || `border border-zinc-150 ${isMinimal ? "" : "rounded-xl"} bg-white`}`}>
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-zinc-900 block uppercase">{tier.name}</span>
                    <span className="text-lg font-black text-zinc-955 block">{tier.price}</span>
                    <div className="space-y-1.5">
                      {(tier.features || []).slice(0, 3).map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-medium">
                          <span className="text-emerald-500">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className={`w-full h-7 text-[8px] font-black tracking-widest uppercase text-white shadow ${theme.buttonStyle}`} style={{ backgroundColor: primaryColor }}>
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      );      case "testimonials":
    case "reviews":
    case "case-studies":
      return (
        <section className="py-12 px-6 bg-zinc-50 border-b border-zinc-100">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-sm font-black text-zinc-955">{sec.content.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(sec.content.testimonials || []).map((test, idx) => (
                <div key={idx} className={`p-4 space-y-3 text-left ${theme.cardStyle || `border border-zinc-100 bg-white ${isMinimal ? "" : "rounded-xl"}`}`}>
                  <p className="text-[10px] text-zinc-600 italic">"{test.content}"</p>
                  <div className="flex items-center gap-2 border-t pt-2">
                    <div>
                      <span className="text-[9px] font-black text-zinc-900 block">{test.name}</span>
                      <span className="text-[7.5px] font-bold text-zinc-400 block uppercase">{test.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "faq":
      return (
        <section className="py-12 px-6 bg-white border-b border-zinc-100">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-sm font-black text-zinc-955">{sec.content.title}</h2>
            </div>
            <div className="space-y-2.5">
              {(sec.content.faqs || []).map((faq, idx) => (
                <div key={idx} className={`p-4 text-left ${theme.cardStyle || `border border-zinc-100 ${isMinimal ? "" : "rounded-xl"} bg-zinc-50`}`}>
                  <span className="text-[10px] font-bold text-zinc-900 block">{faq.question}</span>
                  <p className="text-[9px] text-zinc-500 mt-1.5 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "contact":
    case "booking":
    case "locations":
      return (
        <section className="py-12 px-6 bg-zinc-50 border-b border-zinc-100 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h2 className="text-sm font-black text-zinc-950">{sec.content.title}</h2>
              <div className="space-y-2 text-[9px] font-bold text-zinc-600">
                <p>📞 Phone: {sec.content.phone}</p>
                <p>✉️ Email: {sec.content.email}</p>
                <p>📍 Location: {sec.content.address}</p>
              </div>
            </div>
            <div className={`p-4 space-y-2 ${theme.cardStyle || `border border-zinc-150 bg-white ${isMinimal ? "" : "rounded-xl"}`}`}>
              <input type="text" placeholder="Name" className="w-full h-7 px-2 border text-[9px] outline-none" style={{ borderRadius: isMinimal ? "0px" : "4px" }} />
              <textarea placeholder="Message" className="w-full h-10 p-2 border text-[9px] outline-none resize-none" style={{ borderRadius: isMinimal ? "0px" : "4px" }} />
              <button className={`w-full h-7 text-[8px] font-black text-white uppercase tracking-widest ${theme.buttonStyle}`} style={{ backgroundColor: primaryColor }}>Send</button>
            </div>
          </div>
        </section>
      );



    case "success-stories":
      return (
        <section className="py-12 px-6 bg-white border-b border-zinc-100">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-sm font-black text-zinc-955">{sec.content.title}</h2>
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest">{sec.content.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(sec.content.stories || []).map((story, idx) => (
                <div key={idx} className={`p-4 text-left space-y-2 ${theme.cardStyle || `border border-zinc-100 ${isMinimal ? "" : "rounded-xl"} bg-zinc-50/50`}`}>
                  <div className="flex justify-between items-center text-[10px] font-black">
                    <span>{story.title}</span>
                    <span className="text-[7.5px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded">{story.period}</span>
                  </div>
                  <span className="text-[9px] font-extrabold text-emerald-600 block">Result: {story.result}</span>
                  <div className="grid grid-cols-2 gap-2 border-t pt-2 text-[8.5px] leading-relaxed">
                    <div>
                      <span className="text-[7.5px] text-zinc-450 font-bold block uppercase">Before</span>
                      <p>{story.before}</p>
                    </div>
                    <div className="border-l pl-2">
                      <span className="text-[7.5px] text-emerald-500 font-bold block uppercase">After</span>
                      <p className="font-bold">{story.after}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "memberships":
      return (
        <section className="py-12 px-6 bg-white border-b border-zinc-100">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-sm font-black text-zinc-955">{sec.content.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(sec.content.plans || []).map((plan, idx) => (
                <div key={idx} className={`p-4 flex flex-col justify-between gap-4 text-left ${theme.cardStyle || `border border-zinc-150 ${isMinimal ? "" : "rounded-xl"} bg-white`}`}>
                  <div className="space-y-2">
                    <span className="text-[8px] font-black uppercase text-indigo-500 block">{plan.duration}</span>
                    <span className="text-[10px] font-black text-zinc-900 block uppercase">{plan.name}</span>
                    <span className="text-lg font-black text-zinc-955 block">{plan.price}</span>
                  </div>
                  <button className={`w-full h-7 text-[8px] font-black tracking-widest uppercase text-white shadow ${theme.buttonStyle}`} style={{ backgroundColor: primaryColor }}>
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "promotions":
      return (
        <section className="py-12 px-6 bg-zinc-50 border-b border-zinc-100">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-sm font-black text-zinc-955">{sec.content.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(sec.content.offers || []).map((ofr, idx) => (
                <div key={idx} className={`p-4 border-2 border-dashed border-indigo-200 bg-white text-left space-y-2 ${theme.cardStyle || 'rounded-xl bg-white shadow-sm'}`}>
                  <div className="flex justify-between items-center text-[10px] font-black">
                    <span>{ofr.title}</span>
                    <span className="text-[7.5px] bg-indigo-600 text-white px-2 py-0.5 rounded shadow">{ofr.value}</span>
                  </div>
                  <p className="text-[9px] text-zinc-500">{ofr.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "events":
      return (
        <section className="py-12 px-6 bg-white border-b border-zinc-100">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-sm font-black text-zinc-950">{sec.content.title}</h2>
            </div>
            <div className="space-y-2.5">
              {(sec.content.list || []).map((ev, idx) => (
                <div key={idx} className={`p-4 border border-zinc-100 rounded-xl bg-zinc-50 flex justify-between items-center gap-4 text-left ${theme.cardStyle || 'rounded-xl'}`}>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-zinc-900 block">{ev.title}</span>
                    <span className="text-[7.5px] text-indigo-600 block uppercase font-bold">{ev.date} • {ev.time}</span>
                  </div>
                  <p className="text-[9px] text-zinc-500 max-w-xs">{ev.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "footer":
      return (
        <footer className="py-8 px-6 bg-zinc-905 text-zinc-400 text-center text-[9px] space-y-2">
          <span className="block font-black text-white" style={{ color: primaryColor }}>{sec.content.businessName}</span>
          <p className="font-mono text-[8px] text-zinc-600">{sec.content.copyright}</p>
        </footer>
      );

    default:
      return null;
  }
};



// 9 required premium checklist items as requested
const CHECKLIST_STEPS = [
  { label: "Analyzing Business Profiles...", estimatedTime: 1.0 },
  { label: "Creating HSL Brand Identities...", estimatedTime: 1.2 },
  { label: "Generating Multi-Page Website Structures...", estimatedTime: 1.5 },
  { label: "Writing Premium SEO Optimized Copy...", estimatedTime: 1.2 },
  { label: "Building Dynamic Services Sections...", estimatedTime: 1.0 },
  { label: "Creating Local Testimonials Profiles...", estimatedTime: 1.0 },
  { label: "Optimizing Mobile Layout Spacings...", estimatedTime: 1.0 },
  { label: "Generating Keywords & Search Schemas...", estimatedTime: 0.8 },
  { label: "Assembling Final Production Bundles...", estimatedTime: 0.8 }
];

export default function GeneratingPage() {
  const { businessData } = useOnboardingStore();

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(12);
  const [logs, setLogs] = useState([]);
  const [templates, setTemplates] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState("modern");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState("loading");
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [seedOffset, setSeedOffset] = useState(0);

  // Step 10 Logs
  useEffect(() => {
    console.log("STEP 10: Onboarding Complete");
    console.log("STEP 10: Generation Started");
    
    addLog(`[System] Initializing SiteForge Design Studio...`);
    addLog(`[System] Business Profile detected: "${businessData.name || "My Business"}"`);
    addLog(`[System] Domain configuration: "${(businessData.name || "shop").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.siteforge.app"`);
    addLog(`[AI Engine] Contact details synchronized: ${businessData.whatsappNumber || "WhatsApp Enabled"}`);
  }, []);

  const addLog = (msg) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`].slice(-6));
  };

  // variations API
  const fetchVariations = async (customSeed = 0, isRefresh = false) => {
    try {
      setError(null);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/generate/website-variations`, {
        businessData,
        seedOffset: customSeed,
        refresh: isRefresh
      });
      
      if (response.data && response.data.success) {
        setTemplates(response.data.data.templates);
        addLog("[AI Engine] Successfully generated 3 visual website variations!");
      } else {
        throw new Error("Invalid variations response structure");
      }
    } catch (err) {
      console.error("Variations fetch failed:", err);
      // STEP 7 Error Handling
      setError("AI Generation failed to respond in time. Click 'Use Template Instead' for fallback or retry.");
    }
  };

  useEffect(() => {
    fetchVariations(seedOffset, false);
  }, [businessData]);

  // Dynamically load Google Fonts when templates update
  useEffect(() => {
    if (!templates) return;
    const fontNames = templates.map(t => t.websiteJson?.theme?.fontFamily).filter(Boolean);
    const uniqueFonts = [...new Set(fontNames)];
    if (uniqueFonts.length === 0) return;

    const fontLink = document.getElementById("dynamic-google-fonts");
    if (fontLink) {
      fontLink.remove();
    }

    const link = document.createElement("link");
    link.id = "dynamic-google-fonts";
    link.rel = "stylesheet";
    const fontQuery = uniqueFonts.map(f => f.replace(/\s+/g, "+")).join("|");
    link.href = `https://fonts.googleapis.com/css?family=${fontQuery}:300,400,600,700,900&display=swap`;
    document.head.appendChild(link);
  }, [templates]);

  // Progress Bar Ticker
  useEffect(() => {
    if (progress >= 100) {
      if (templates) {
        setStage("success");
        console.log("STEP 10: Generation Success");
      }
      return;
    }

    const currentStep = CHECKLIST_STEPS[activeStepIndex];
    if (!currentStep) return;

    const intervalTime = (currentStep.estimatedTime * 1000) / 10;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }

        const stepThreshold = Math.min(Math.floor((next / 100) * CHECKLIST_STEPS.length), CHECKLIST_STEPS.length - 1);
        if (stepThreshold > activeStepIndex) {
          setActiveStepIndex(stepThreshold);
          const milestoneLogs = [
            `[Brand Engine] Designing HSL palettes with accent colors...`,
            `[Generator] Standardizing pages to custom grid modules...`,
            `[SEO Engine] Embedding meta title matching target audience...`,
            `[AI Writer] Generating description copy without placeholders...`,
            `[Builder] Creating Hero, Services, Products, Contact components...`,
            `[Engine] Calibrating fluid touch viewport queries...`
          ];
          addLog(milestoneLogs[stepThreshold % milestoneLogs.length]);
        }

        return next;
      });

      setTimeLeft(prev => Math.max(prev - 0.12, 0));
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeStepIndex, progress, templates]);

  // Restart generation (Tertiary action)
  const handleGenerateNewVersion = () => {
    const nextSeed = seedOffset + 3;
    setSeedOffset(nextSeed);
    setProgress(0);
    setActiveStepIndex(0);
    setTimeLeft(12);
    setTemplates(null);
    setStage("loading");
    fetchVariations(nextSeed, true);
  };

  // Instant fallback to mock template
  const handleUseTemplateInstead = async () => {
    try {
      setIsSaving(true);
      setError(null);
      addLog("[System] Launching instant fallback industry template...");
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/generate/website-variations`, {
        businessData: { ...businessData, useFallbackOnly: true }
      });
      
      if (response.data && response.data.success) {
        setTemplates(response.data.data.templates);
        setStage("success");
        setIsSaving(false);
      } else {
        throw new Error("Fallback failed");
      }
    } catch (err) {
      setError("Failed to fetch fallback. Please check backend connection.");
      setIsSaving(false);
    }
  };

  // Confirm selection and launch editor
  const handleSaveSelection = async () => {
    if (!templates) return;
    
    const chosen = templates.find(t => t.id === selectedTemplateId);
    if (!chosen) return;

    setIsSaving(true);
    addLog(`[Database] Saving chosen template configuration "${chosen.name}"...`);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/onboarding/complete`, {
        businessData,
        websiteJson: chosen.websiteJson,
        userId: localStorage.getItem("siteforge-auth-user") || "anonymous"
      });

      if (response.data && response.data.success) {
        const websiteId = response.data.data.id;
        console.log("STEP 10: Database Saved");
        addLog(`[Database] Website ID generated: ${websiteId}`);
        addLog(`[System] Redirecting to visual editor page...`);
        
        setTimeout(() => {
          window.location.href = `/editor/${websiteId}`;
        }, 800);
      } else {
        throw new Error("Onboarding complete endpoint failed");
      }
    } catch (err) {
      console.error("Failed to complete onboarding:", err);
      setError("Failed to create database records. Please try again.");
      setIsSaving(false);
    }
  };

  const activeTemplate = templates?.find(t => t.id === selectedTemplateId);
  const previewTheme = activeTemplate?.websiteJson?.theme || {};
  const previewPages = activeTemplate?.websiteJson?.pages || [];
  const previewSections = previewPages[0]?.sections || [];
  const previewHero = previewSections.find((s) => s.type === "hero");
  const previewAbout = previewSections.find((s) => s.type === "about");
  const previewServices = previewSections.find((s) => s.type === "services");

  return (
    <div className={`flex flex-col justify-center items-center min-h-screen bg-zinc-955 text-zinc-100 p-3 sm:p-4 md:p-8 selection:bg-indigo-600 selection:text-white font-sans relative ${stage === "loading" ? "overflow-hidden fixed inset-0 w-full h-full z-50" : "overflow-x-hidden"}`}>
      
      {/* Background ambient glowing nodes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-3xl -z-10 animate-pulse" />

      {/* Confetti Animation Effect */}
      {stage === "success" && (
        <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
          {Array.from({ length: 45 }).map((_, i) => {
            const colors = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#EC4899", "#3B82F6"];
            const randomColor = colors[i % colors.length];
            const randomX = Math.random() * 100;
            const randomDelay = Math.random() * 2;
            const randomDuration = Math.random() * 3 + 2.5;
            const randomSize = Math.random() * 8 + 5;
            return (
              <motion.div
                key={i}
                className="absolute top-[-20px] rounded-full"
                style={{
                  left: `${randomX}%`,
                  backgroundColor: randomColor,
                  width: randomSize,
                  height: randomSize
                }}
                animate={{
                  y: ["0vh", "105vh"],
                  x: [0, Math.sin(i) * 60],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: randomDuration,
                  repeat: Infinity,
                  delay: randomDelay,
                  ease: "linear"
                }}
              />
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        {stage === "loading" ? (
          // STAGE 1: Real-time progress tracker (Viewport bounded modal)
          <motion.div 
            key="generating-stage"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            style={{ maxHeight: "90vh", height: "auto" }}
            className="w-full max-w-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Fixed Header */}
            <div className="p-4 sm:p-5 md:p-6 border-b border-zinc-800/80 shrink-0 flex items-center justify-between bg-zinc-900/90">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                  <Sparkles className="h-4 sm:h-5 w-4 sm:w-5 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-sm sm:text-base md:text-lg font-extrabold text-white tracking-wide">SiteForge Design Studio</h1>
                  <p className="text-[10px] sm:text-xs text-zinc-400">Transforming your answers into an elite digital brand</p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-2">
                <span className="text-xs sm:text-sm font-mono font-bold text-indigo-400">ETA: {Math.ceil(timeLeft)}s</span>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="p-4 sm:p-5 md:p-6 space-y-3.5 sm:space-y-4 md:space-y-5 overflow-y-auto flex-1">
              {/* Checklist items list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 bg-zinc-950/50 border border-zinc-800/80 p-3.5 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shrink-0">
                {CHECKLIST_STEPS.map((step, idx) => {
                  const isDone = progress >= 100 || activeStepIndex > idx;
                  const isActive = activeStepIndex === idx && progress < 100;
                  
                  return (
                    <div 
                      key={step.label}
                      className={`flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs transition-all duration-300 ${
                        isDone ? "text-zinc-300 font-semibold" : isActive ? "text-indigo-400 font-bold" : "text-zinc-600"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      ) : isActive ? (
                        <Loader2 className="h-4 w-4 animate-spin text-indigo-400 shrink-0" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-zinc-800 shrink-0" />
                      )}
                      <span className="truncate">{step.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar container */}
              <div className="space-y-1.5 sm:space-y-2 shrink-0">
                <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono font-bold text-zinc-400 px-1">
                  <span>SYSTEM PROGRESS</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2.5 sm:h-3 bg-zinc-950 border border-zinc-800 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 shadow-md"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Terminal Live logs */}
              <div className="bg-zinc-950/90 border border-zinc-800/80 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl font-mono text-[9px] sm:text-[10px] text-emerald-400/90 space-y-1.5 sm:space-y-2 shadow-inner shrink-0">
                <div className="flex items-center gap-2 text-zinc-500 border-b border-zinc-900 pb-1.5 mb-1.5 font-bold text-[9px] uppercase tracking-wider">
                  <Terminal className="h-3 w-3" /> Live Generation Logs
                </div>
                {logs.map((log, i) => (
                  <div key={i} className="truncate select-none">{log}</div>
                ))}
              </div>

              {/* Fail Safe Controls */}
              {error && (
                <div className="p-4 sm:p-5 bg-red-950/20 border border-red-500/20 rounded-xl sm:rounded-2xl space-y-3 shrink-0">
                  <p className="text-xs text-red-300 leading-relaxed text-center font-bold">⚠️ {error}</p>
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    <button 
                      onClick={handleGenerateNewVersion}
                      className="flex items-center gap-1.5 px-3.5 h-8 sm:h-9 bg-red-900 hover:bg-red-800 text-white rounded-lg text-xs font-extrabold transition-colors shadow"
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Retry Generation
                    </button>
                    <button 
                      onClick={handleUseTemplateInstead}
                      className="flex items-center gap-1.5 px-3.5 h-8 sm:h-9 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg text-xs font-extrabold transition-colors"
                    >
                      <Layout className="h-3.5 w-3.5" /> Use Template Instead
                    </button>
                    <button 
                      onClick={() => window.location.href = "/onboarding"}
                      className="px-3.5 h-8 sm:h-9 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 border border-zinc-850 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Return to Onboarding
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          // STAGE 2: Upgraded visual design, interactive viewports, checklists, summary card
          <motion.div 
            key="success-stage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10"
          >
            {/* LEFT COLUMN */}
            <div className="lg:col-span-5 space-y-6">
              {/* Success Badge */}
              <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-lg shrink-0">
                    <Check className="h-5 w-5 font-bold" />
                  </div>
                  <div>
                    <h1 className="text-lg font-black text-white tracking-tight">Choose Your Preferred Website</h1>
                    <p className="text-xs text-zinc-400 mt-0.5">Select a layout variation below to customize in the visual editor.</p>
                  </div>
                </div>
              </div>

              {/* AI Brand Profile Analysis */}
              {activeTemplate && activeTemplate.analysis && (
                <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-md">
                  <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                    <Sparkles className="h-4 w-4" /> AI Brand Profile Analysis
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-zinc-950/40 border border-zinc-850 rounded-xl space-y-1">
                      <span className="text-[9px] text-zinc-500 font-bold uppercase block">Business Sector</span>
                      <span className="text-xs font-extrabold text-white capitalize">{activeTemplate.analysis.businessType}</span>
                    </div>
                    <div className="p-3 bg-zinc-950/40 border border-zinc-850 rounded-xl space-y-1">
                      <span className="text-[9px] text-zinc-500 font-bold uppercase block">Brand Personality</span>
                      <span className="text-xs font-extrabold text-white">{activeTemplate.analysis.brandPersonality}</span>
                    </div>
                    <div className="p-3 bg-zinc-950/40 border border-zinc-850 rounded-xl space-y-1">
                      <span className="text-[9px] text-zinc-500 font-bold uppercase block">Target Customers</span>
                      <span className="text-xs font-medium text-zinc-300 leading-normal block">{activeTemplate.analysis.customerType}</span>
                    </div>
                    <div className="p-3 bg-zinc-950/40 border border-zinc-850 rounded-xl space-y-1">
                      <span className="text-[9px] text-zinc-500 font-bold uppercase block">Primary Conversion Goal</span>
                      <span className="text-xs font-semibold text-zinc-300 leading-normal block">{activeTemplate.analysis.conversionGoal}</span>
                    </div>
                    <div className="p-3 bg-indigo-950/20 border border-indigo-900/30 rounded-xl space-y-1">
                      <span className="text-[9px] text-indigo-400 font-bold uppercase block">AI Design Recommendation</span>
                      <span className="text-xs font-semibold text-indigo-200 leading-relaxed block">{activeTemplate.analysis.designRecommendation}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Side-by-side Visual Variant Cards */}
              <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-805 p-6 rounded-3xl space-y-4">
                <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest">Select Variant</h3>
                <div className="space-y-3">
                  {templates.map((temp) => {
                    const isSelected = selectedTemplateId === temp.id;
                    const palette = temp.websiteJson.theme;
                    
                    return (
                      <div 
                        key={temp.id}
                        onClick={() => setSelectedTemplateId(temp.id)}
                        className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected 
                            ? "bg-indigo-600/10 border-indigo-500 shadow-md" 
                            : "bg-zinc-950/30 border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-white">{temp.name}</span>
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full border border-zinc-800" style={{ backgroundColor: palette.primaryColor }} />
                            <span className="w-2.5 h-2.5 rounded-full border border-zinc-800" style={{ backgroundColor: palette.accentColor }} />
                          </div>
                        </div>
                        <p className="text-[10px] text-zinc-450 mt-1 leading-relaxed">{temp.tagline}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3.5 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-6 rounded-3xl shadow-lg">
                <button 
                  onClick={handleSaveSelection}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs h-11 w-full rounded-xl transition-all duration-300 shadow shadow-indigo-600/15 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" /> Launching SiteForge...
                    </>
                  ) : (
                    <>
                      Open Website Editor <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setStage("fullscreen-preview")}
                    className="flex items-center justify-center gap-1.5 h-10 border border-zinc-850 hover:bg-zinc-850 text-zinc-300 font-extrabold text-[11px] rounded-xl transition-all"
                  >
                    <Eye className="h-3.5 w-3.5" /> Preview Website
                  </button>
                  <button 
                    onClick={handleGenerateNewVersion}
                    className="flex items-center justify-center gap-1.5 h-10 border border-zinc-850 hover:bg-zinc-850 text-zinc-300 font-extrabold text-[11px] rounded-xl transition-all"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Generate New Designs
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-7 h-full flex flex-col items-center">
              
              {/* Device Viewport Toggle panel */}
              <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-xl mb-4 shrink-0 shadow">
                <button 
                  onClick={() => setPreviewDevice("desktop")} 
                  className={`flex items-center gap-1.5 px-4.5 py-2 rounded-lg text-xs font-black transition-all ${
                    previewDevice === "desktop" ? "bg-indigo-600 text-white shadow" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" /> Desktop
                </button>
                <button 
                  onClick={() => setPreviewDevice("tablet")} 
                  className={`flex items-center gap-1.5 px-4.5 py-2 rounded-lg text-xs font-black transition-all ${
                    previewDevice === "tablet" ? "bg-indigo-600 text-white shadow" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Tablet className="h-3.5 w-3.5" /> Tablet
                </button>
                <button 
                  onClick={() => setPreviewDevice("mobile")} 
                  className={`flex items-center gap-1.5 px-4.5 py-2 rounded-lg text-xs font-black transition-all ${
                    previewDevice === "mobile" ? "bg-indigo-600 text-white shadow" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" /> Mobile
                </button>
              </div>

              {/* Scrollable Device mock frame */}
              <div 
                className="w-full flex justify-center bg-zinc-950 border border-zinc-850 p-6 rounded-3xl overflow-hidden shadow-inner flex-1"
                style={{ minHeight: "680px" }}
              >
                <div 
                  className="bg-white text-zinc-850 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-zinc-200 rounded-2xl"
                  style={{
                    width: previewDevice === "mobile" ? "375px" : previewDevice === "tablet" ? "768px" : "100%",
                    maxWidth: previewDevice === "mobile" ? "375px" : previewDevice === "tablet" ? "768px" : "100%",
                    height: "640px",
                    fontFamily: previewTheme.fontFamily || "Outfit"
                  }}
                >
                  {/* Mock browser navbar */}
                  <div className="h-9 px-4 bg-zinc-100 border-b border-zinc-200 flex items-center justify-between shrink-0">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-zinc-300" />
                      <span className="w-2 h-2 rounded-full bg-zinc-300" />
                      <span className="w-2 h-2 rounded-full bg-zinc-300" />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 select-none">{businessData.name || "shop"}.siteforge.app</span>
                    <span className="w-4 h-4" />
                  </div>

                  {/* Scrollable homepage frame */}
                  <div className="flex-1 overflow-y-auto pr-0.5 select-text">
                    
                    {/* Header Nav */}
                    <header className="px-6 py-4 bg-white border-b border-zinc-100 flex items-center justify-between">
                      <span className="text-sm font-extrabold text-zinc-900" style={{ color: previewTheme.primaryColor }}>{businessData.name || "My Business"}</span>
                      <nav className="flex gap-3 text-[10px] font-bold text-zinc-500">
                        <span>Home</span>
                        <span>Services</span>
                        <span>Contact</span>
                      </nav>
                    </header>

                    {previewSections.map((sec) => (
                      <PreviewSectionRenderer key={sec.id} sec={sec} theme={previewTheme} />
                    ))}

                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Preview modal */}
      <AnimatePresence>
        {stage === "fullscreen-preview" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/98 z-50 flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-900">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Fullscreen Site Preview</h2>
                <p className="text-xs text-zinc-455 mt-0.5">Style: {activeTemplate?.name}</p>
              </div>
              <button 
                onClick={() => setStage("success")}
                className="px-5 h-9 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-black shadow transition-all"
              >
                Back to Selection
              </button>
            </div>
            
            <div className="flex-1 w-full bg-white rounded-2xl overflow-y-auto pr-0.5 text-zinc-850">
              <header className="px-8 py-5 bg-white border-b border-zinc-100 flex items-center justify-between">
                <span className="text-lg font-black text-zinc-900" style={{ color: previewTheme.primaryColor }}>{businessData.name}</span>
                <nav className="flex gap-4 text-xs font-bold text-zinc-550">
                  <span>Home</span>
                  <span>Services</span>
                  <span>Contact</span>
                </nav>
              </header>

              {previewSections.map((sec) => (
                <PreviewSectionRenderer key={sec.id} sec={sec} theme={previewTheme} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
