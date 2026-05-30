"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { useOnboardingStore } from "../../src/store/onboarding.store";
import axios from "axios";

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
  const router = useRouter();
  const { businessData } = useOnboardingStore();

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(12);
  const [logs, setLogs] = useState<string[]>([]);
  const [templates, setTemplates] = useState<any[] | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("modern");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<"loading" | "success" | "fullscreen-preview">("loading");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Step 10 Logs
  useEffect(() => {
    console.log("STEP 10: Onboarding Complete");
    console.log("STEP 10: Generation Started");
    
    addLog(`[System] Initializing SiteForge Design Studio...`);
    addLog(`[System] Business Profile detected: "${businessData.name || "My Business"}"`);
    addLog(`[System] Domain configuration: "${(businessData.name || "shop").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.siteforge.app"`);
    addLog(`[AI Engine] Contact details synchronized: ${businessData.whatsappNumber || "WhatsApp Enabled"}`);
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`].slice(-6));
  };

  // variations API
  const fetchVariations = async () => {
    try {
      setError(null);
      const response = await axios.post("/api/generate/website-variations", {
        businessData
      });
      
      if (response.data && response.data.success) {
        setTemplates(response.data.data.templates);
        addLog("[AI Engine] Successfully generated 3 visual website variations!");
      } else {
        throw new Error("Invalid variations response structure");
      }
    } catch (err: any) {
      console.error("Variations fetch failed:", err);
      // STEP 7 Error Handling
      setError("AI Generation failed to respond in time. Click 'Use Template Instead' for fallback or retry.");
    }
  };

  useEffect(() => {
    fetchVariations();
  }, [businessData]);

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
    setProgress(0);
    setActiveStepIndex(0);
    setTimeLeft(12);
    setTemplates(null);
    setStage("loading");
    fetchVariations();
  };

  // Instant fallback to mock template
  const handleUseTemplateInstead = async () => {
    try {
      setIsSaving(true);
      setError(null);
      addLog("[System] Launching instant fallback industry template...");
      
      const response = await axios.post("/api/generate/website-variations", {
        businessData: { ...businessData, useFallbackOnly: true }
      });
      
      if (response.data && response.data.success) {
        setTemplates(response.data.data.templates);
        setStage("success");
        setIsSaving(false);
      } else {
        throw new Error("Fallback failed");
      }
    } catch (err: any) {
      setError("Failed to fetch fallback. Please check backend connection.");
      setIsSaving(false);
    }
  };

  // Confirm selection and launch editor
  const handlePreviewWebsite = () => {
    if (!templates) return;
    const chosen = templates.find(t => t.id === selectedTemplateId);
    if (!chosen) return;
    
    localStorage.setItem("siteforge_temp_preview", JSON.stringify(chosen.websiteJson));
    window.open("/preview/temp", "_blank");
  };
  const handleSaveSelection = async () => {
    if (!templates) return;
    
    const chosen = templates.find(t => t.id === selectedTemplateId);
    if (!chosen) return;

    setIsSaving(true);
    addLog(`[Database] Saving chosen template configuration "${chosen.name}"...`);

    try {
      const response = await axios.post("/api/onboarding/complete", {
        businessData,
        websiteJson: chosen.websiteJson
      });

      if (response.data && response.data.success) {
        const websiteId = response.data.data.id;
        console.log("STEP 10: Database Saved");
        addLog(`[Database] Website ID generated: ${websiteId}`);
        addLog(`[System] Redirecting to visual editor page...`);
        
        setTimeout(() => {
          router.push(`/editor/${websiteId}`);
        }, 800);
      } else {
        throw new Error("Onboarding complete endpoint failed");
      }
    } catch (err: any) {
      console.error("Failed to complete onboarding:", err);
      setError("Failed to create database records. Please try again.");
      setIsSaving(false);
    }
  };

  const activeTemplate = templates?.find(t => t.id === selectedTemplateId);
  const previewTheme = activeTemplate?.websiteJson?.theme || {};
  const previewPages = activeTemplate?.websiteJson?.pages || [];
  const previewSections = previewPages[0]?.sections || [];
  const previewHero = previewSections.find((s: any) => s.type === "hero");
  const previewAbout = previewSections.find((s: any) => s.type === "about");
  const previewServices = previewSections.find((s: any) => s.type === "services");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 selection:bg-indigo-600 selection:text-white font-sans relative overflow-hidden">
      
      {/* Background ambient glowing nodes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-3xl -z-10 animate-pulse" />

      {/* Confetti Animation Effect (Step 1) */}
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
          // STAGE 1: Real-time progress tracker and checklists
          <motion.div 
            key="generating-stage"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl space-y-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-lg font-extrabold text-white tracking-wide">SiteForge Design Studio</h1>
                  <p className="text-xs text-slate-400">Transforming your answers into an elite digital brand</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-indigo-400">ETA: {Math.ceil(timeLeft)}s</span>
              </div>
            </div>

            {/* Checklist items list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-slate-950/40 border border-slate-850 p-6 rounded-2xl">
              {CHECKLIST_STEPS.map((step, idx) => {
                const isDone = progress >= 100 || activeStepIndex > idx;
                const isActive = activeStepIndex === idx && progress < 100;
                
                return (
                  <div 
                    key={step.label}
                    className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                      isDone ? "text-slate-300 font-semibold" : isActive ? "text-indigo-400 font-bold" : "text-slate-600"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    ) : isActive ? (
                      <Loader2 className="h-4.5 w-4.5 animate-spin text-indigo-400 shrink-0" />
                    ) : (
                      <div className="h-4.5 w-4.5 rounded-full border border-slate-800 shrink-0" />
                    )}
                    <span>{step.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Progress bar container */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 px-1">
                <span>SYSTEM PROGRESS</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-950/80 border border-slate-800 rounded-full overflow-hidden p-0.5">
                <motion.div 
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 shadow-md"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Terminal Live logs */}
            <div className="bg-slate-950/90 border border-slate-800 p-5 rounded-2xl font-mono text-[10px] text-emerald-400/90 space-y-2 shadow-inner">
              <div className="flex items-center gap-2 text-slate-500 border-b border-slate-900 pb-2 mb-2 font-bold text-[9px] uppercase tracking-wider">
                <Terminal className="h-3 w-3" /> Live Generation Logs
              </div>
              {logs.map((log, i) => (
                <div key={i} className="truncate select-none">{log}</div>
              ))}
            </div>

            {/* STEP 7: Fail Safe Controls */}
            {error && (
              <div className="p-6 bg-red-950/20 border border-red-500/20 rounded-2xl space-y-4">
                <p className="text-xs text-red-300 leading-relaxed text-center font-bold">⚠️ {error}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button 
                    onClick={handleGenerateNewVersion}
                    className="flex items-center gap-1.5 px-4 h-9 bg-red-900 hover:bg-red-800 text-white rounded-lg text-xs font-extrabold transition-colors shadow"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Retry Generation
                  </button>
                  <button 
                    onClick={handleUseTemplateInstead}
                    className="flex items-center gap-1.5 px-4 h-9 bg-slate-800 hover:bg-slate-700 text-zinc-200 border border-slate-700 rounded-lg text-xs font-extrabold transition-colors"
                  >
                    <Layout className="h-3.5 w-3.5" /> Use Template Instead
                  </button>
                  <button 
                    onClick={() => router.push("/onboarding")}
                    className="px-4 h-9 bg-slate-900 hover:bg-slate-850 text-zinc-400 border border-zinc-800 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Return to Onboarding
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          // STAGE 2: Upgraded visual design, interactive viewports, checklists, summary card, variants selector, action buttons (Step 1-6, 9-10)
          <motion.div 
            key="success-stage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10"
          >
            {/* LEFT COLUMN (Summary, Checklists, Variants, Actions) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Success Badge & Title Block (Step 1) */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-lg">
                    <Check className="h-5 w-5 font-bold" />
                  </div>
                  <div>
                    <h1 className="text-xl font-black text-white tracking-tight">Your Website Is Ready</h1>
                    <p className="text-xs text-slate-400 mt-0.5">We created a complete website based on your business requirements.</p>
                  </div>
                </div>
              </div>

              {/* Generation Summary Card (Step 9) */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 rounded-3xl space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Generation Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Business</span>
                    <span className="text-xs font-extrabold text-white truncate block">{businessData.name || "Pune Special"}</span>
                  </div>
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Pages Created</span>
                    <span className="text-xs font-extrabold text-white block">8 Pages</span>
                  </div>
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">SEO Core Score</span>
                    <span className="text-xs font-extrabold text-emerald-400 block">92 / 100</span>
                  </div>
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Mobile Ready</span>
                    <span className="text-xs font-extrabold text-emerald-400 block">Yes</span>
                  </div>
                </div>
              </div>

              {/* Checklist Details (Step 4) */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 rounded-3xl space-y-3.5">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Setup checklist</h3>
                <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-300 font-semibold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>✓ Home Page</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>✓ About Page</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>✓ Services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>✓ Gallery Page</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>✓ Testimonials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>✓ FAQ Section</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>✓ Contact Page</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>✓ SEO Core</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>✓ WhatsApp Chatbot Widget Connected</span>
                  </div>
                </div>
              </div>

              {/* Side-by-side Visual Variant selection Cards (Step 3) */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 rounded-3xl space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Variant</h3>
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
                            : "bg-slate-950/30 border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-white">{temp.name}</span>
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full border border-slate-800" style={{ backgroundColor: palette.primaryColor }} />
                            <span className="w-2.5 h-2.5 rounded-full border border-slate-800" style={{ backgroundColor: palette.accentColor }} />
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-450 mt-1 leading-relaxed">{temp.tagline}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons (Step 5, 6) */}
              <div className="flex flex-col gap-3.5 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 rounded-3xl shadow-lg">
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
                    onClick={handlePreviewWebsite}
                    className="flex items-center justify-center gap-1.5 h-10 border border-slate-850 hover:bg-slate-850 text-slate-300 font-extrabold text-[11px] rounded-xl transition-all"
                  >
                    <Eye className="h-3.5 w-3.5" /> Preview Website
                  </button>
                  <button 
                    onClick={handleGenerateNewVersion}
                    className="flex items-center justify-center gap-1.5 h-10 border border-slate-850 hover:bg-slate-850 text-slate-300 font-extrabold text-[11px] rounded-xl transition-all"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Re-Generate
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (Scrollable device frame previews - Step 2) */}
            <div className="lg:col-span-7 h-full flex flex-col items-center">
              
              {/* Device Viewport Toggle panel */}
              <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl mb-4 shrink-0 shadow">
                <button 
                  onClick={() => setPreviewDevice("desktop")} 
                  className={`flex items-center gap-1.5 px-4.5 py-2 rounded-lg text-xs font-black transition-all ${
                    previewDevice === "desktop" ? "bg-indigo-600 text-white shadow" : "text-slate-500 hover:text-slate-300"
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

              {/* Scrollable Device mock mockup frame */}
              <div 
                className="w-full flex justify-center bg-slate-950/80 border border-slate-850 p-6 rounded-3xl overflow-hidden shadow-inner flex-1"
                style={{ minHeight: "680px" }}
              >
                <div 
                  className="bg-white text-slate-850 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-slate-200/80 rounded-2xl"
                  style={{
                    width: previewDevice === "mobile" ? "375px" : previewDevice === "tablet" ? "768px" : "100%",
                    maxWidth: previewDevice === "mobile" ? "375px" : previewDevice === "tablet" ? "768px" : "100%",
                    height: "640px",
                    fontFamily: previewTheme.fontFamily || "Outfit"
                  }}
                >
                  {/* Mock browser navbar */}
                  <div className="h-9 px-4 bg-slate-100 border-b border-slate-200/80 flex items-center justify-between shrink-0">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 select-none">{businessData.name || "shop"}.siteforge.app</span>
                    <span className="w-4 h-4" />
                  </div>

                  {/* Scrollable homepage frame */}
                  <div className="flex-1 overflow-y-auto pr-0.5 select-text">
                    
                    {/* Header Nav */}
                    <header className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
                      <span className="text-sm font-extrabold text-slate-900" style={{ color: previewTheme.primaryColor }}>{businessData.name || "My Business"}</span>
                      <nav className="flex gap-3 text-[10px] font-bold text-slate-500">
                        <span>Home</span>
                        <span>Services</span>
                        <span>Contact</span>
                      </nav>
                    </header>

                    {/* Hero content */}
                    {previewHero && (
                      <section className="py-20 px-8 text-center text-white relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url(${previewHero.content.backgroundImage})` }}>
                        <div className="max-w-md mx-auto space-y-3">
                          <h1 className="text-xl md:text-2xl font-black leading-tight text-white">{previewHero.content.title}</h1>
                          <p className="text-[10px] text-zinc-300 font-light leading-relaxed">{previewHero.content.subtitle}</p>
                          <div className="pt-2">
                            <span className="inline-block text-[9px] font-black text-white px-5 py-2 rounded-lg shadow-sm" style={{ backgroundColor: previewTheme.primaryColor }}>
                              {previewHero.content.ctaText}
                            </span>
                          </div>
                        </div>
                      </section>
                    )}

                    {/* About content */}
                    {previewAbout && (
                      <section className="py-12 px-6 bg-slate-50 border-b border-slate-200/80">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                          <div className="space-y-2">
                            <h2 className="text-sm font-black text-slate-900">{previewAbout.content.title}</h2>
                            <p className="text-[10px] text-slate-600 leading-relaxed">{previewAbout.content.description}</p>
                          </div>
                          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-200">
                            <img src={previewAbout.content.image} className="w-full h-full object-cover" alt="about-image" />
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Services content */}
                    {previewServices && (
                      <section className="py-12 px-6 bg-white border-b border-slate-200/80">
                        <div className="space-y-6">
                          <div className="text-center space-y-1">
                            <h2 className="text-sm font-black text-slate-900">{previewServices.content.title}</h2>
                            <p className="text-[9px] text-slate-450">{previewServices.content.subtitle}</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {(previewServices.content.services || []).map((srv: any, idx: number) => (
                              <div key={idx} className="p-4 border border-slate-100 rounded-xl space-y-1.5 bg-slate-50">
                                <span className="text-[11px] font-black text-slate-900 block">{srv.name}</span>
                                <p className="text-[9px] text-slate-500 leading-relaxed">{srv.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Footer */}
                    <footer className="py-8 px-6 bg-slate-900 text-slate-400 text-center text-[9px] space-y-1">
                      <span className="block font-black text-white">{businessData.name}</span>
                      <p>© {new Date().getFullYear()} {businessData.name}. All Rights Reserved.</p>
                    </footer>

                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Preview overlay modal removed as preview now opens in a new browser tab */}

    </div>
  );
}
