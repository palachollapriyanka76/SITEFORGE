"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Sparkles, 
  Monitor, 
  Smartphone, 
  Tablet, 
  ArrowLeft, 
  Save, 
  CheckCircle,
  Eye,
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
  ChevronDown
} from "lucide-react";

const IconMap = {
  Sparkles, Flame, Dumbbell, Scissors, Activity, Utensils, GlassWater,
  ShoppingBag, Headphones, Cpu, ShieldCheck, Cake, Cookie, Check, Star,
  Phone, Mail, MapPin, User, Clock, Calendar
};

const SectionIcon = ({ name, className }) => {
  const IconComponent = IconMap[name] || Sparkles;
  return <IconComponent className={className} />;
};

export default function EditorPage({ params }) {
  const { websiteId } = params;
  const [websiteJSON, setWebsiteJSON] = useState(null);
  const [device, setDevice] = useState("desktop");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [activeSectionId, setActiveSectionId] = useState(null);

  useEffect(() => {
    console.log("STEP 10: Editor Opened for websiteId: " + websiteId);
    async function loadWebsite() {
      const activeUserId = localStorage.getItem("siteforge-auth-user") || "anonymous";
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/websites/${websiteId}/json`,
          {
            headers: {
              "x-user-id": activeUserId
            }
          }
        );
        if (response.data && response.data.success) {
          setWebsiteJSON(response.data.data);
        }
      } catch (err) {
        console.error("Failed to load website JSON:", err);
      }
    }
    loadWebsite();
  }, [websiteId]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("Saving...");
    const activeUserId = localStorage.getItem("siteforge-auth-user") || "anonymous";
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/websites/${websiteId}/json`,
        {
          ...websiteJSON,
          userId: activeUserId
        },
        {
          headers: {
            "x-user-id": activeUserId
          }
        }
      );
      setSaveStatus("Saved successfully!");
      setTimeout(() => setSaveStatus(""), 2000);
    } catch (err) {
      console.error("Manual save failed:", err);
      setSaveStatus("Failed to save.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSectionTextChange = (sectionId, fieldKey, newValue) => {
    if (!websiteJSON) return;
    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
    const page = newJSON.pages[0];
    const section = page.sections.find(s => s.id === sectionId);
    if (section && section.content) {
      section.content[fieldKey] = newValue;
      setWebsiteJSON(newJSON);
    }
  };

  if (!websiteJSON) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950 text-white font-mono gap-3">
        <Loader className="animate-spin text-indigo-500 h-5 w-5" />
        <span>Syncing SiteForge Visual Editor...</span>
      </div>
    );
  }

  const theme = websiteJSON.theme || {};
  const homePage = websiteJSON.pages[0];
  const sections = homePage.sections || [];

  return (
    <div className="w-full h-screen overflow-hidden bg-zinc-950 text-zinc-100 flex flex-col font-sans select-none">
      
      {/* Top Navbar */}
      <header className="h-14 border-b border-zinc-850 bg-zinc-900 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <a href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </a>
          <span className="h-4 w-px bg-zinc-800" />
          <h1 className="text-sm font-extrabold text-white tracking-wide flex items-center gap-2">
            SiteForge Editor <span className="text-[10px] font-mono bg-zinc-950 text-indigo-400 border border-zinc-800 px-2 py-0.5 rounded-full">{websiteJSON.theme.style.toUpperCase()}</span>
          </h1>
        </div>

        {/* Device select viewport */}
        <div className="flex bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
          <button 
            onClick={() => setDevice("desktop")} 
            className={`p-1.5 rounded-md transition-colors ${device === "desktop" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setDevice("tablet")} 
            className={`p-1.5 rounded-md transition-colors ${device === "tablet" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <Tablet className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setDevice("mobile")} 
            className={`p-1.5 rounded-md transition-colors ${device === "mobile" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <Smartphone className="h-4 w-4" />
          </button>
        </div>

        {/* Save actions */}
        <div className="flex items-center gap-3.5">
          {saveStatus && <span className="text-xs font-mono text-zinc-400 animate-pulse">{saveStatus}</span>}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold px-4 h-9 rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" /> Save Changes
          </button>
        </div>
      </header>

      {/* Editor Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar panels */}
        <aside className="w-64 border-r border-zinc-850 bg-zinc-900 p-6 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div>
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Page Sections</h2>
              <p className="text-[10px] text-zinc-550 mt-1">Select sections to edit inline</p>
            </div>

            <nav className="space-y-2">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`w-full flex items-center justify-between text-left text-xs px-3 py-2.5 rounded-xl border transition-all ${
                    activeSectionId === sec.id
                      ? "bg-indigo-600/10 border-indigo-500/30 text-white font-bold"
                      : "border-transparent text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200"
                  }`}
                >
                  <span className="capitalize">{sec.type} Section</span>
                  <Grid className="h-3.5 w-3.5 text-zinc-500" />
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 bg-zinc-950/40 border border-zinc-800 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" /> AI Assistant
            </div>
            <p className="text-[10px] text-zinc-550 leading-relaxed">Talk to our assistant to rewrite copy, tweak layout spacing or swap icons instantly.</p>
          </div>
        </aside>

        {/* Viewport Canvas container */}
        <main className="flex-1 bg-zinc-950 p-8 overflow-y-auto flex justify-center">
          <div 
            className="bg-white text-zinc-800 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            style={{
              width: device === "mobile" ? "375px" : device === "tablet" ? "768px" : "100%",
              maxWidth: device === "mobile" ? "375px" : device === "tablet" ? "768px" : "1200px"
            }}
          >
            {/* Embedded site sections renderer */}
            {sections.map((sec) => {
              const isSectionActive = activeSectionId === sec.id;
              
              return (
                <div 
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`relative group border-2 ${
                    isSectionActive ? "border-indigo-500" : "border-transparent hover:border-indigo-500/30"
                  }`}
                >
                  {/* Inline editors popup label */}
                  {isSectionActive && (
                    <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm z-30 capitalize">
                      Active: {sec.type}
                    </div>
                  )}

                  {/* Section Renderers */}
                  
                  {/* HERO SECTION */}
                  {sec.type === "hero" && (
                    <section className="py-24 px-8 text-center text-white relative overflow-hidden bg-zinc-900" style={{ minHeight: "450px" }}>
                      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                        <input
                          type="text"
                          value={sec.content.title}
                          onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                          className="bg-transparent text-3xl md:text-5xl font-black text-white text-center border-b border-transparent focus:border-indigo-500 outline-none w-full leading-tight"
                          style={{ fontFamily: theme.fontFamily }}
                        />
                        <textarea
                          value={sec.content.subtitle}
                          onChange={(e) => handleSectionTextChange(sec.id, "subtitle", e.target.value)}
                          className="bg-transparent text-xs md:text-sm text-zinc-300 text-center border border-transparent focus:border-indigo-500 outline-none w-full resize-none h-20 leading-relaxed font-light"
                        />
                        <div className="pt-4 flex justify-center">
                          <input
                            type="text"
                            value={sec.content.ctaText}
                            onChange={(e) => handleSectionTextChange(sec.id, "ctaText", e.target.value)}
                            className="text-center font-extrabold text-xs shadow-lg outline-none cursor-pointer border border-transparent focus:border-white transition-all text-white"
                            style={{ 
                              backgroundColor: theme.primaryColor,
                              borderRadius: theme.style === "minimal" ? "0px" : theme.style === "luxury" ? "0px" : "16px",
                              padding: theme.style === "luxury" ? "14px 32px" : "12px 28px"
                            }}
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/65 z-0" />
                      <div className="absolute inset-0 z-[-1] bg-cover bg-center animate-pulse" style={{ backgroundImage: `url(${sec.content.backgroundImage})`, animationDuration: "8s" }} />
                    </section>
                  )}

                  {/* ABOUT SECTION */}
                  {sec.type === "about" && (
                    <section className={`px-8 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "minimal" ? "#ffffff" : "#fafafa" }}>
                      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          <textarea
                            value={sec.content.description}
                            onChange={(e) => handleSectionTextChange(sec.id, "description", e.target.value)}
                            className="bg-transparent text-xs text-zinc-600 border border-transparent focus:border-indigo-500 outline-none w-full resize-none h-28 leading-relaxed"
                          />
                          
                          {sec.content.highlights && (
                            <div className="grid grid-cols-2 gap-3 pt-2">
                              {sec.content.highlights.map((hl, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-[10px] text-zinc-700 font-bold">
                                  <div className="h-4 w-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}>
                                    <Check className="h-2.5 w-2.5" />
                                  </div>
                                  <span>{hl}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className={`overflow-hidden aspect-square ${theme.style === "minimal" ? "" : theme.style === "luxury" ? "rounded-3xl shadow-2xl" : "rounded-2xl shadow-lg"}`}>
                          <img src={sec.content.image} className="w-full h-full object-cover" alt="about" />
                        </div>
                      </div>
                    </section>
                  )}

                  {/* SERVICES SECTION */}
                  {sec.type === "services" && (
                    <section className={`px-8 bg-white border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {(sec.content.services || []).map((srv, idx) => (
                            <div 
                              key={idx} 
                              className={`p-6 space-y-3.5 transition-all duration-300 ${
                                theme.style === "minimal" 
                                  ? "border border-zinc-200" 
                                  : theme.style === "luxury" 
                                    ? "rounded-3xl border border-amber-900/10 shadow-lg bg-stone-50" 
                                    : "rounded-2xl border border-zinc-100 shadow bg-white hover:-translate-y-1"
                              }`}
                            >
                              <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor}10`, color: theme.primaryColor }}>
                                <SectionIcon name={srv.icon} className="h-4.5 w-4.5" />
                              </div>
                              <div className="space-y-1">
                                <span className="text-xs font-extrabold text-zinc-900 block">{srv.name}</span>
                                <p className="text-[10px] text-zinc-550 leading-relaxed">{srv.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* PRODUCTS SECTION */}
                  {sec.type === "products" && (
                    <section className={`px-8 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "luxury" ? "#faf9f6" : "#ffffff" }}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {(sec.content.products || []).map((prod, idx) => (
                            <div 
                              key={idx} 
                              className={`overflow-hidden flex flex-col transition-all ${
                                theme.style === "minimal" 
                                  ? "border border-zinc-200" 
                                  : theme.style === "luxury" 
                                    ? "rounded-3xl border border-amber-900/5 shadow-xl bg-white" 
                                    : "rounded-2xl border border-slate-100 shadow-md bg-white hover:shadow-lg"
                              }`}
                            >
                              <div className="aspect-[4/3] w-full bg-zinc-100 overflow-hidden relative">
                                <img src={prod.image} className="w-full h-full object-cover" alt={prod.name} />
                                <span className="absolute top-3 right-3 text-[10px] font-black text-white px-3 py-1 rounded-full shadow" style={{ backgroundColor: theme.primaryColor }}>
                                  {prod.price}
                                </span>
                              </div>
                              <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                                <div className="space-y-1">
                                  <span className="text-xs font-extrabold text-zinc-900 block">{prod.name}</span>
                                  <p className="text-[10px] text-zinc-555 leading-relaxed">{prod.description}</p>
                                </div>
                                <button className="w-full h-8 text-[10px] font-black tracking-wider uppercase border text-center transition-all" style={{ 
                                  borderColor: theme.primaryColor, 
                                  color: theme.primaryColor,
                                  borderRadius: theme.style === "minimal" ? "0px" : "8px"
                                }}>
                                  Inquire Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* GALLERY SECTION */}
                  {sec.type === "gallery" && (
                    <section className={`px-8 bg-zinc-50 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          {(sec.content.images || []).map((img, idx) => (
                            <div key={idx} className="space-y-1.5 group/img cursor-pointer">
                              <div className={`aspect-square w-full bg-zinc-200 overflow-hidden relative ${
                                theme.style === "minimal" ? "" : theme.style === "luxury" ? "rounded-3xl shadow" : "rounded-xl shadow-sm"
                              }`}>
                                <img src={img.url} className="w-full h-full object-cover group-hover/img:scale-105 transition-all duration-300" alt="gallery-item" />
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

                  {/* TEAM SECTION */}
                  {sec.type === "team" && (
                    <section className={`px-8 bg-white border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {(sec.content.members || []).map((mem, idx) => (
                            <div 
                              key={idx} 
                              className={`p-6 text-center space-y-4 transition-all ${
                                theme.style === "minimal" 
                                  ? "border border-zinc-200" 
                                  : theme.style === "luxury" 
                                    ? "rounded-3xl border border-amber-900/10 shadow-lg bg-stone-50" 
                                    : "rounded-2xl border border-zinc-100 shadow bg-white"
                              }`}
                            >
                              <div className="h-16 w-16 rounded-full mx-auto overflow-hidden bg-zinc-100 shadow border-2" style={{ borderColor: theme.primaryColor }}>
                                <img src={mem.image} className="w-full h-full object-cover" alt={mem.name} />
                              </div>
                              <div className="space-y-1">
                                <span className="text-xs font-black text-zinc-900 block">{mem.name}</span>
                                <span className="text-[9px] font-bold block uppercase tracking-widest" style={{ color: theme.accentColor }}>{mem.role}</span>
                                <p className="text-[10px] text-zinc-500 leading-relaxed pt-1.5">{mem.bio}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* PRICING SECTION */}
                  {sec.type === "pricing" && (
                    <section className={`px-8 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "luxury" ? "#faf9f6" : "#ffffff" }}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {(sec.content.tiers || []).map((tier, idx) => (
                            <div 
                              key={idx} 
                              className={`p-6 relative flex flex-col justify-between gap-6 transition-all ${
                                tier.popular && theme.style !== "minimal"
                                  ? "border-2 border-indigo-500 scale-102 shadow-2xl" 
                                  : "border border-zinc-150"
                              } ${
                                theme.style === "minimal" 
                                  ? "rounded-none bg-white" 
                                  : theme.style === "luxury" 
                                    ? "rounded-3xl shadow-lg bg-white" 
                                    : "rounded-2xl shadow bg-white hover:-translate-y-1"
                              }`}
                            >
                              {tier.popular && theme.style !== "minimal" && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-black tracking-widest uppercase bg-indigo-600 text-white px-3.5 py-1 rounded-full shadow">
                                  Most Popular
                                </span>
                              )}
                              <div className="space-y-4">
                                <div className="space-y-1.5">
                                  <span className="text-xs font-black text-zinc-900 block uppercase tracking-wider">{tier.name}</span>
                                  <span className="text-2xl font-black text-zinc-950 block">{tier.price}</span>
                                </div>
                                <div className="h-px bg-zinc-100" />
                                <div className="space-y-2.5">
                                  {(tier.features || []).map((feat, fidx) => (
                                    <div key={fidx} className="flex items-center gap-2 text-[10px] text-zinc-650 font-medium">
                                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                      <span>{feat}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <button className="w-full h-9 text-[10px] font-black tracking-widest uppercase transition-all shadow" style={{ 
                                backgroundColor: tier.popular ? theme.primaryColor : "#f4f4f5",
                                color: tier.popular ? "#ffffff" : "#18181b",
                                borderRadius: theme.style === "minimal" ? "0px" : "10px"
                              }}>
                                {tier.cta}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* TESTIMONIALS SECTION */}
                  {sec.type === "testimonials" && (
                    <section className={`px-8 bg-zinc-50 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {(sec.content.testimonials || []).map((test, idx) => (
                            <div 
                              key={idx} 
                              className={`p-6 space-y-4 flex flex-col justify-between transition-all ${
                                theme.style === "minimal" 
                                  ? "border border-zinc-200 bg-white" 
                                  : theme.style === "luxury" 
                                    ? "rounded-3xl border border-amber-900/10 shadow-lg bg-white" 
                                    : "rounded-2xl border border-zinc-100 shadow bg-white"
                              }`}
                            >
                              <div className="space-y-3">
                                <div className="flex gap-0.5">
                                  {Array.from({ length: test.rating || 5 }).map((_, sidx) => (
                                    <Star key={sidx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                  ))}
                                </div>
                                <p className="text-[11px] text-zinc-650 italic leading-relaxed">"{test.content}"</p>
                              </div>
                              <div className="flex items-center gap-3 border-t border-zinc-100 pt-3">
                                {test.avatar && (
                                  <div className="h-7 w-7 rounded-full overflow-hidden bg-zinc-250">
                                    <img src={test.avatar} className="w-full h-full object-cover" alt="client avatar" />
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

                  {/* FAQ SECTION */}
                  {sec.type === "faq" && (
                    <section className={`px-8 bg-white border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-4xl mx-auto space-y-10">
                        <div className="text-center">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                        </div>
                        <div className="space-y-4">
                          {(sec.content.faqs || []).map((faq, idx) => (
                            <div 
                              key={idx} 
                              className={`p-5 transition-all text-left ${
                                theme.style === "minimal" 
                                  ? "border border-zinc-200" 
                                  : "rounded-2xl border border-zinc-100 bg-zinc-50"
                              }`}
                            >
                              <div className="flex items-center justify-between font-bold text-xs text-zinc-900 cursor-pointer">
                                <span>{faq.question}</span>
                                <ChevronDown className="h-4 w-4 text-zinc-400 shrink-0" />
                              </div>
                              <p className="text-[10px] text-zinc-550 leading-relaxed pt-2.5 border-t border-zinc-150/40 mt-2.5">
                                {faq.answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* CONTACT SECTION */}
                  {sec.type === "contact" && (
                    <section className={`px-8 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "minimal" ? "#ffffff" : "#fafafa" }}>
                      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          
                          <div className="space-y-4 pt-2">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor}10`, color: theme.primaryColor }}>
                                <Phone className="h-4 w-4" />
                              </div>
                              <div>
                                <span className="text-[9px] font-bold text-zinc-400 block uppercase">Call or WhatsApp</span>
                                <span className="text-xs font-bold text-zinc-800">{sec.content.phone}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor}10`, color: theme.primaryColor }}>
                                <Mail className="h-4 w-4" />
                              </div>
                              <div>
                                <span className="text-[9px] font-bold text-zinc-400 block uppercase">Email Support</span>
                                <span className="text-xs font-bold text-zinc-800">{sec.content.email}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor}10`, color: theme.primaryColor }}>
                                <MapPin className="h-4 w-4" />
                              </div>
                              <div>
                                <span className="text-[9px] font-bold text-zinc-400 block uppercase">Our Location</span>
                                <span className="text-xs font-bold text-zinc-800 leading-normal block max-w-xs">{sec.content.address}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Direct contact message form */}
                        <div className={`p-6 space-y-4 shadow ${
                          theme.style === "minimal" 
                            ? "border border-zinc-200 bg-white" 
                            : theme.style === "luxury" 
                              ? "rounded-3xl border border-amber-900/10 bg-white" 
                              : "rounded-2xl border border-zinc-100 bg-white"
                        }`}>
                          <span className="text-xs font-black text-zinc-900 block border-b pb-2 mb-2 uppercase tracking-wide">Send Quick Message</span>
                          <div className="space-y-3">
                            <input type="text" placeholder="Your Name" className="w-full h-8 px-3 border border-zinc-200 text-[10px] focus:border-indigo-500 outline-none" style={{ borderRadius: theme.style === "minimal" ? "0px" : "6px" }} />
                            <input type="email" placeholder="Your Email" className="w-full h-8 px-3 border border-zinc-200 text-[10px] focus:border-indigo-500 outline-none" style={{ borderRadius: theme.style === "minimal" ? "0px" : "6px" }} />
                            <textarea placeholder="How can we help you?" className="w-full h-16 p-3 border border-zinc-200 text-[10px] focus:border-indigo-500 outline-none resize-none" style={{ borderRadius: theme.style === "minimal" ? "0px" : "6px" }} />
                          </div>
                          <button className="h-9 w-full text-[10px] font-black text-white uppercase tracking-widest shadow" style={{ 
                            backgroundColor: theme.primaryColor,
                            borderRadius: theme.style === "minimal" ? "0px" : "8px"
                          }}>
                            Send Message
                          </button>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* BOOKING SECTION */}
                  {sec.type === "booking" && (
                    <section className={`px-8 bg-zinc-50 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-md mx-auto space-y-6 text-center">
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          <p className="text-[10px] text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>
                        </div>
                        
                        <div className={`p-6 text-left space-y-4 shadow-xl ${
                          theme.style === "minimal" 
                            ? "border border-zinc-200 bg-white" 
                            : theme.style === "luxury" 
                              ? "rounded-3xl border border-amber-900/10 bg-white" 
                              : "rounded-2xl border border-zinc-100 bg-white"
                        }`}>
                          {(sec.content.fields || []).map((fld, idx) => (
                            <div key={idx} className="space-y-1.5">
                              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">{fld.label}</label>
                              {fld.type === "select" ? (
                                <select className="w-full h-9 px-3 border border-zinc-250 text-[10px] outline-none bg-zinc-50" style={{ borderRadius: theme.style === "minimal" ? "0px" : "8px" }}>
                                  {(fld.options || []).map((opt, oidx) => (
                                    <option key={oidx}>{opt}</option>
                                  ))}
                                </select>
                              ) : (
                                <input type={fld.type} placeholder={fld.placeholder} className="w-full h-9 px-3 border border-zinc-250 text-[10px] outline-none" style={{ borderRadius: theme.style === "minimal" ? "0px" : "8px" }} />
                              )}
                            </div>
                          ))}
                          <button className="w-full h-10 text-[10px] font-black text-white tracking-widest uppercase shadow pt-0.5 mt-2" style={{ 
                            backgroundColor: theme.primaryColor,
                            borderRadius: theme.style === "minimal" ? "0px" : "10px"
                          }}>
                            {sec.content.submitText}
                          </button>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* MENU SECTION */}
                  {sec.type === "menu" && (
                    <section className={`px-8 bg-white border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-4xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>
                        </div>

                        <div className="space-y-8">
                          {(sec.content.categories || []).map((cat, idx) => (
                            <div key={idx} className="space-y-4">
                              <span className="text-xs font-black text-zinc-900 block border-l-4 pl-3.5 uppercase tracking-widest" style={{ borderColor: theme.primaryColor }}>
                                {cat.name}
                              </span>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {(cat.items || []).map((item, iidx) => (
                                  <div 
                                    key={iidx} 
                                    className={`p-4 flex flex-col justify-between gap-2.5 transition-all ${
                                      theme.style === "minimal" 
                                        ? "border-b border-zinc-200" 
                                        : "rounded-2xl border border-zinc-100 hover:border-zinc-200 bg-zinc-50/50"
                                    }`}
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
                                      <span className="text-xs font-black text-zinc-950 shrink-0">{item.price}</span>
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

                  {/* PORTFOLIO SECTION */}
                  {sec.type === "portfolio" && (
                    <section className={`px-8 bg-zinc-50 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {(sec.content.projects || []).map((proj, idx) => (
                            <div 
                              key={idx} 
                              className={`overflow-hidden cursor-pointer group/proj transition-all ${
                                theme.style === "minimal" 
                                  ? "border border-zinc-200" 
                                  : "rounded-2xl border border-zinc-100 shadow bg-white"
                              }`}
                            >
                              <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100 relative">
                                <img src={proj.image} className="w-full h-full object-cover group-hover/proj:scale-105 transition-all duration-300" alt={proj.name} />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/proj:opacity-100 transition-opacity flex flex-col justify-end p-4 text-left">
                                  <span className="text-[8px] font-black tracking-widest uppercase text-white/80">{proj.category}</span>
                                  <span className="text-xs font-black text-white mt-0.5">{proj.name}</span>
                                </div>
                              </div>
                              <div className="p-4 border-t border-zinc-50">
                                <span className="text-xs font-extrabold text-zinc-900 block">{proj.name}</span>
                                <span className="text-[9px] font-bold text-zinc-400 block mt-0.5">{proj.category}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* SUCCESS STORIES SECTION */}
                  {sec.type === "success-stories" && (
                    <section className={`px-8 bg-white border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {(sec.content.stories || []).map((story, idx) => (
                            <div 
                              key={idx} 
                              className={`p-6 space-y-4 flex flex-col justify-between transition-all ${
                                theme.style === "minimal" 
                                  ? "border border-zinc-200" 
                                  : "rounded-3xl border border-zinc-100 shadow bg-zinc-50/50"
                              }`}
                            >
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-black text-zinc-900">{story.title}</span>
                                  <span className="text-[8px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{story.period}</span>
                                </div>
                                <span className="text-[10px] font-extrabold text-emerald-600 block">Result: {story.result}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-100 py-3 text-[10px]">
                                <div className="space-y-0.5">
                                  <span className="font-bold text-zinc-400 uppercase tracking-wider block text-[8px]">Before</span>
                                  <p className="text-zinc-600 font-medium leading-relaxed">{story.before}</p>
                                </div>
                                <div className="space-y-0.5 border-l border-zinc-100 pl-3">
                                  <span className="font-bold text-emerald-500 uppercase tracking-wider block text-[8px]">After</span>
                                  <p className="text-zinc-800 font-bold leading-relaxed">{story.after}</p>
                                </div>
                              </div>
                              <span className="text-[9px] font-bold text-zinc-450 block text-right">Client: {story.client}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* MEMBERSHIPS SECTION */}
                  {sec.type === "memberships" && (
                    <section className={`px-8 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "luxury" ? "#faf9f6" : "#ffffff" }}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {(sec.content.plans || []).map((plan, idx) => (
                            <div 
                              key={idx} 
                              className={`p-6 relative flex flex-col justify-between gap-6 transition-all ${
                                plan.highlight && theme.style !== "minimal"
                                  ? "border-2 border-indigo-500 scale-102 shadow-2xl" 
                                  : "border border-zinc-150"
                              } ${
                                theme.style === "minimal" 
                                  ? "rounded-none bg-white" 
                                  : "rounded-2xl shadow bg-white"
                              }`}
                            >
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 block">{plan.duration}</span>
                                  <span className="text-xs font-black text-zinc-900 block uppercase tracking-wider">{plan.name}</span>
                                  <span className="text-2xl font-black text-zinc-950 block">{plan.price}</span>
                                </div>
                                <div className="h-px bg-zinc-100" />
                                <div className="space-y-2.5">
                                  {(plan.features || []).map((feat, fidx) => (
                                    <div key={fidx} className="flex items-center gap-2 text-[10px] text-zinc-650 font-medium">
                                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                      <span>{feat}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <button className="w-full h-9 text-[10px] font-black tracking-widest uppercase transition-all shadow" style={{ 
                                backgroundColor: plan.highlight ? theme.primaryColor : "#f4f4f5",
                                color: plan.highlight ? "#ffffff" : "#18181b",
                                borderRadius: theme.style === "minimal" ? "0px" : "10px"
                              }}>
                                Choose Plan
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* PROMOTIONS SECTION */}
                  {sec.type === "promotions" && (
                    <section className={`px-8 bg-zinc-50 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-4xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {(sec.content.offers || []).map((ofr, idx) => (
                            <div 
                              key={idx} 
                              className={`p-6 border-2 border-dashed border-indigo-300 bg-white flex flex-col justify-between gap-4 transition-all shadow-md ${
                                theme.style === "minimal" ? "rounded-none" : "rounded-2xl"
                              }`}
                            >
                              <div className="space-y-2 text-left">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-black text-zinc-900">{ofr.title}</span>
                                  <span className="text-[9px] font-black uppercase text-white bg-indigo-600 px-2 py-0.5 rounded shadow">{ofr.value}</span>
                                </div>
                                <p className="text-[10px] text-zinc-550 leading-relaxed">{ofr.desc}</p>
                              </div>
                              <div className="flex items-center justify-between border-t border-zinc-100 pt-3 text-[9px] font-bold">
                                <span className="text-zinc-450">COUPON CODE:</span>
                                <span className="px-3.5 py-1 bg-zinc-950 text-white rounded font-mono select-all select-text">{ofr.code}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* EVENTS SECTION */}
                  {sec.type === "events" && (
                    <section className={`px-8 bg-white border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-4xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <input
                            type="text"
                            value={sec.content.title}
                            onChange={(e) => handleSectionTextChange(sec.id, "title", e.target.value)}
                            className="bg-transparent text-xl md:text-2xl font-black text-zinc-950 text-center border-b border-transparent focus:border-indigo-500 outline-none w-full"
                            style={{ fontFamily: theme.fontFamily }}
                          />
                          <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>
                        </div>
                        <div className="space-y-4">
                          {(sec.content.list || []).map((ev, idx) => (
                            <div 
                              key={idx} 
                              className={`p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all text-left ${
                                theme.style === "minimal" 
                                  ? "border border-zinc-200 bg-white" 
                                  : "rounded-2xl border border-zinc-100 bg-zinc-50 hover:bg-zinc-100/70"
                              }`}
                            >
                              <div className="flex gap-4 items-center">
                                <div className="h-12 w-12 rounded-xl flex flex-col justify-center items-center font-bold text-center shrink-0 border" style={{ backgroundColor: `${theme.primaryColor}08`, borderColor: `${theme.primaryColor}15`, color: theme.primaryColor }}>
                                  <Calendar className="h-4.5 w-4.5" />
                                </div>
                                <div className="space-y-1">
                                  <span className="text-xs font-black text-zinc-900 block">{ev.title}</span>
                                  <div className="flex items-center gap-3 text-[9px] text-zinc-400 font-bold">
                                    <span className="text-indigo-600 block uppercase tracking-wider">{ev.date}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {ev.time}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-[10px] text-zinc-550 max-w-sm sm:text-right">{ev.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* FOOTER SECTION */}
                  {sec.type === "footer" && (
                    <footer className="py-12 px-8 bg-zinc-955 text-zinc-400 text-center text-[10px] space-y-3.5 relative overflow-hidden">
                      <div className="max-w-2xl mx-auto space-y-4">
                        <span className="block text-sm font-extrabold tracking-wide uppercase text-white" style={{ color: theme.primaryColor }}>{sec.content.businessName}</span>
                        
                        {sec.content.links && (
                          <div className="flex justify-center gap-4 text-[9px] font-extrabold text-zinc-500 uppercase tracking-widest">
                            {sec.content.links.map((lnk, lidx) => (
                              <a key={lidx} href={lnk.href} className="hover:text-white transition-colors">{lnk.label}</a>
                            ))}
                          </div>
                        )}
                        
                        <div className="h-px bg-zinc-900 max-w-md mx-auto" />
                        <p className="font-mono text-[9px] text-zinc-600 leading-normal">{sec.content.copyright}</p>
                      </div>
                    </footer>
                  )}

                </div>
              );
            })}
          </div>
        </main>

      </div>
    </div>
  );
}

// Simple loader helper
function Loader({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}
