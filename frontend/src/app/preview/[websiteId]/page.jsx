"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import UniversalNavbar from "../../../components/templates/UniversalNavbar";
import { 
  Sparkles, 
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
  ExternalLink
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

export default function PreviewPage({ params }) {
  const { websiteId } = params;
  const [websiteJSON, setWebsiteJSON] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleProductInquire = (productName) => {
    const target = document.getElementById("sec_booking") || document.getElementById("sec_contact") || document.getElementById("contact") || document.getElementById("booking");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    triggerToast(`Inquiry initiated for "${productName}". Please fill out the form below.`);
  };

  const handlePlanSelect = (planName) => {
    const target = document.getElementById("sec_booking") || document.getElementById("sec_contact") || document.getElementById("contact") || document.getElementById("booking");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    triggerToast(`Selected plan: "${planName}". Please fill out your details.`);
  };

  useEffect(() => {
    async function loadWebsite() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api"}/websites/${websiteId}/json`
        );
        if (response.data && response.data.success) {
          setWebsiteJSON(response.data.data);
        }
      } catch (err) {
        console.error("Failed to load website JSON for preview:", err);
      } finally {
        setLoading(false);
      }
    }
    loadWebsite();
  }, [websiteId]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-950 text-white font-mono gap-3">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <span>Loading Live Preview...</span>
      </div>
    );
  }

  if (!websiteJSON) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-950 text-white font-mono gap-3 text-center p-6">
        <span className="text-rose-500 text-lg font-bold">404 - Website Not Found</span>
        <span className="text-zinc-500 text-sm max-w-md">The website configuration may not exist or has been deleted.</span>
        <a href="/dashboard" className="mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold transition-all shadow-lg">Back to Dashboard</a>
      </div>
    );
  }

  const theme = websiteJSON.theme || {};
  const homePage = websiteJSON.pages[0];
  const sections = homePage.sections || [];

  // Theme variable setup
  const fontStyle = theme.fontFamily ? { fontFamily: theme.fontFamily } : {};
  const primaryBgStyle = theme.primaryColor ? { backgroundColor: theme.primaryColor } : {};
  const primaryTextColor = theme.primaryColor ? { color: theme.primaryColor } : {};

  return (
    <div className="w-full min-h-screen bg-white text-zinc-800" style={fontStyle}>
      <UniversalNavbar
        businessName={websiteJSON.meta?.title?.split("|")[0].trim() || "My Business"}
        logo={websiteJSON.meta?.logo}
        sections={sections}
        whatsappNumber={websiteJSON.globalSettings?.whatsappNumber}
        primaryCTA="Contact Us"
        theme={theme}
      />
      <div className="pt-[80px]">
        {/* Published badge banner */}
        <div className="fixed bottom-4 left-4 z-50 bg-zinc-900/90 border border-zinc-800 hover:bg-zinc-900 text-white px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-[11px] font-bold transition-all cursor-pointer" onClick={() => window.open(`http://localhost:3000/editor/${websiteId}`, "_self")}>
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Site Forge Preview</span>
          <ExternalLink className="h-3 w-3 text-zinc-450" />
        </div>

        {sections.map((sec) => {
        return (
          <div id={sec.id} key={sec.id} className="relative">
            {/* HERO SECTION */}
            {sec.type === "hero" && (
              <section className="py-24 px-8 text-center text-white relative overflow-hidden bg-zinc-900 flex flex-col items-center justify-center" style={{ minHeight: "550px" }}>
                <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight" style={fontStyle}>
                    {sec.content.title}
                  </h1>
                  <p className="text-sm md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light">
                    {sec.content.subtitle}
                  </p>
                  <div className="pt-4 flex justify-center">
                    <button
                      onClick={() => {
                        const target = document.getElementById("sec_booking") || document.getElementById("sec_contact") || document.getElementById("contact") || document.getElementById("booking");
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="font-extrabold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all text-white"
                      style={{ 
                        backgroundColor: theme.primaryColor || "#4f46e5",
                        borderRadius: theme.style === "minimal" ? "0px" : theme.style === "luxury" ? "0px" : "16px",
                        padding: theme.style === "luxury" ? "14px 32px" : "12px 28px"
                      }}
                    >
                      {sec.content.ctaText || "Get Started"}
                    </button>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/65 z-0" />
                <div className="absolute inset-0 z-[-1] bg-cover bg-center" style={{ backgroundImage: `url(${sec.content.backgroundImage})` }} />
              </section>
            )}

            {/* ABOUT SECTION */}
            {sec.type === "about" && (
              <section className={`px-8 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "minimal" ? "#ffffff" : "#fafafa" }}>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>
                      {sec.content.title}
                    </h2>
                    <p className="text-sm text-zinc-650 leading-relaxed font-light whitespace-pre-line">
                      {sec.content.description}
                    </p>
                    
                    {sec.content.highlights && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {sec.content.highlights.map((hl, idx) => {
                          const hasEmoji = /^\p{Emoji}/u.test(hl);
                          return (
                            <div key={idx} className="flex items-center gap-2.5 text-[11px] text-zinc-800 font-bold bg-[#84A98C]/8 border border-[#84A98C]/15 px-3.5 py-2.5 rounded-2xl shadow-sm hover:shadow-md hover:bg-[#84A98C]/15 transition-all duration-200">
                              {!hasEmoji && (
                                <div className="h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor || "#4f46e5"}15`, color: theme.primaryColor || "#4f46e5" }}>
                                  <Check className="h-3 w-3" />
                                </div>
                              )}
                              <span>{hl}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className={`overflow-hidden aspect-square ${theme.style === "minimal" ? "" : theme.style === "luxury" ? "rounded-3xl shadow-2xl border border-amber-950/10" : "rounded-2xl shadow-lg"}`}>
                    <img src={sec.content.image} className="w-full h-full object-cover hover:scale-102 transition-transform duration-500" alt="about" />
                  </div>
                </div>
              </section>
            )}

            {/* SERVICES SECTION */}
            {sec.type === "services" && (
              <section className={`px-8 bg-white border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                <div className="max-w-5xl mx-auto space-y-10">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                    {sec.content.subtitle && <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>}
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
                              : "rounded-2xl border border-zinc-100 shadow bg-white hover:-translate-y-1 hover:shadow-md"
                        }`}
                      >
                        <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor || "#4f46e5"}10`, color: theme.primaryColor || "#4f46e5" }}>
                          <SectionIcon name={srv.icon} className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm font-extrabold text-zinc-900 block">{srv.name}</span>
                          <p className="text-xs text-zinc-550 leading-relaxed font-light">{srv.description}</p>
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
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                    {sec.content.subtitle && <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(sec.content.products || []).map((prod, idx) => (
                      <div 
                        key={idx} 
                        className={`overflow-hidden flex flex-col transition-all ${
                          theme.style === "minimal" 
                            ? "border border-zinc-200 bg-white" 
                            : theme.style === "luxury" 
                              ? "rounded-3xl border border-amber-900/5 shadow-xl bg-white" 
                              : "rounded-2xl border border-slate-100 shadow-md bg-white hover:shadow-lg"
                        }`}
                      >
                        <div className="aspect-[4/3] w-full bg-zinc-100 overflow-hidden relative">
                          <img src={prod.image} className="w-full h-full object-cover" alt={prod.name} />
                          <span className="absolute top-3 right-3 text-[10px] font-black text-white px-3 py-1.5 rounded-full shadow" style={primaryBgStyle}>
                            {prod.price}
                          </span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-sm font-extrabold text-zinc-900 block">{prod.name}</span>
                            <p className="text-xs text-zinc-550 leading-relaxed font-light">{prod.description}</p>
                          </div>
                          <button 
                            onClick={() => handleProductInquire(prod.name)}
                            className="w-full h-9 text-[10px] font-black tracking-wider uppercase border text-center transition-all hover:bg-zinc-50 active:scale-97" 
                            style={{ 
                              borderColor: theme.primaryColor || "#4f46e5", 
                              color: theme.primaryColor || "#4f46e5",
                              borderRadius: theme.style === "minimal" ? "0px" : "8px"
                            }}
                          >
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
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                    {sec.content.subtitle && <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {(sec.content.images || []).map((img, idx) => (
                      <div 
                        key={idx} 
                        className="space-y-1.5 group/img cursor-zoom-in"
                        onClick={() => setLightboxImage(img)}
                      >
                        <div className={`aspect-square w-full bg-zinc-200 overflow-hidden relative ${
                          theme.style === "minimal" ? "" : theme.style === "luxury" ? "rounded-3xl shadow border border-stone-200" : "rounded-xl shadow-sm"
                        }`}>
                          <img src={img.url} className="w-full h-full object-cover group-hover/img:scale-105 transition-all duration-300" alt="gallery-item" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                            <span className="text-[10px] font-bold text-white leading-tight">{img.caption}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-450 block truncate text-center mt-1">{img.caption}</span>
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
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                    {sec.content.subtitle && <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>}
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
                              : "rounded-2xl border border-zinc-100 shadow bg-white hover:shadow-md"
                        }`}
                      >
                        <div className="h-16 w-16 rounded-full mx-auto overflow-hidden bg-zinc-100 shadow border-2" style={{ borderColor: theme.primaryColor || "#4f46e5" }}>
                          <img src={mem.image} className="w-full h-full object-cover" alt={mem.name} />
                        </div>
                        <div className="space-y-1">
                          <span className="text-sm font-black text-zinc-900 block">{mem.name}</span>
                          <span className="text-[10px] font-bold block uppercase tracking-widest" style={{ color: theme.accentColor || "#e11d48" }}>{mem.role}</span>
                          <p className="text-xs text-zinc-500 leading-relaxed pt-1.5 font-light">{mem.bio}</p>
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
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                    {sec.content.subtitle && <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>}
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
                              <div key={fidx} className="flex items-center gap-2 text-xs text-zinc-650 font-medium">
                                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button 
                          onClick={() => handlePlanSelect(tier.name)}
                          className="w-full h-9 text-[10px] font-black tracking-widest uppercase transition-all shadow hover:opacity-90" 
                          style={{ 
                            backgroundColor: tier.popular ? (theme.primaryColor || "#4f46e5") : "#f4f4f5",
                            color: tier.popular ? "#ffffff" : "#18181b",
                            borderRadius: theme.style === "minimal" ? "0px" : "10px"
                          }}
                        >
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
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
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
                              : "rounded-2xl border border-zinc-100 shadow bg-white hover:shadow-md"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex gap-0.5">
                            {Array.from({ length: test.rating || 5 }).map((_, sidx) => (
                              <Star key={sidx} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="text-xs text-zinc-650 italic leading-relaxed">"{test.content}"</p>
                        </div>
                        <div className="flex items-center gap-3 border-t border-zinc-100 pt-3">
                          {test.avatar && (
                            <div className="h-8 w-8 rounded-full overflow-hidden bg-zinc-200">
                              <img src={test.avatar} className="w-full h-full object-cover" alt="client avatar" />
                            </div>
                          )}
                          <div>
                            <span className="text-xs font-black text-zinc-900 block">{test.name}</span>
                            <span className="text-[9px] font-bold text-zinc-400 block uppercase tracking-wider">{test.role}</span>
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
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                  </div>
                  <div className="space-y-4">
                    <FaqAccordion faqs={sec.content.faqs} theme={theme} />
                  </div>
                </div>
              </section>
            )}

            {/* CONTACT SECTION */}
            {sec.type === "contact" && (
              <section className={`px-8 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "minimal" ? "#ffffff" : "#fafafa" }}>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>
                      {sec.content.title}
                    </h2>
                    
                    <div className="space-y-4 pt-2">
                      {sec.content.phone && (
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor || "#4f46e5"}10`, color: theme.primaryColor || "#4f46e5" }}>
                            <Phone className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-zinc-400 block uppercase">Call or WhatsApp</span>
                            <span className="text-xs font-bold text-zinc-800">{sec.content.phone}</span>
                          </div>
                        </div>
                      )}
                      
                      {sec.content.email && (
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor || "#4f46e5"}10`, color: theme.primaryColor || "#4f46e5" }}>
                            <Mail className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-zinc-400 block uppercase">Email Support</span>
                            <span className="text-xs font-bold text-zinc-800">{sec.content.email}</span>
                          </div>
                        </div>
                      )}
                      
                      {sec.content.address && (
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor || "#4f46e5"}10`, color: theme.primaryColor || "#4f46e5" }}>
                            <MapPin className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-zinc-400 block uppercase">Our Location</span>
                            <span className="text-xs font-bold text-zinc-800 leading-normal block max-w-xs">{sec.content.address}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`p-6 space-y-4 shadow ${
                    theme.style === "minimal" 
                      ? "border border-zinc-200 bg-white" 
                      : theme.style === "luxury" 
                        ? "rounded-3xl border border-amber-900/10 bg-white" 
                        : "rounded-2xl border border-zinc-100 bg-white"
                  }`}>
                    <span className="text-xs font-black text-zinc-900 block border-b pb-2 mb-2 uppercase tracking-wide">Send Quick Message</span>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      triggerToast("Message sent! We will contact you back shortly.");
                      e.target.reset();
                    }} className="space-y-3">
                      <input required type="text" placeholder="Your Name" className="w-full h-9 px-3 border border-zinc-200 text-xs focus:border-indigo-500 outline-none" style={{ borderRadius: theme.style === "minimal" ? "0px" : "6px" }} />
                      <input required type="email" placeholder="Your Email" className="w-full h-9 px-3 border border-zinc-200 text-xs focus:border-indigo-500 outline-none" style={{ borderRadius: theme.style === "minimal" ? "0px" : "6px" }} />
                      <textarea required placeholder="How can we help you?" className="w-full h-20 p-3 border border-zinc-200 text-xs focus:border-indigo-500 outline-none resize-none" style={{ borderRadius: theme.style === "minimal" ? "0px" : "6px" }} />
                      <button type="submit" className="h-9 w-full text-xs font-black text-white uppercase tracking-widest shadow hover:opacity-95 transition-all" style={{ 
                        backgroundColor: theme.primaryColor || "#4f46e5",
                        borderRadius: theme.style === "minimal" ? "0px" : "8px"
                      }}>
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </section>
            )}

            {/* BOOKING SECTION */}
            {sec.type === "booking" && (
              <section className={`px-8 bg-zinc-50 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                <div className="max-w-md mx-auto space-y-6 text-center">
                  <div className="space-y-1.5">
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                    {sec.content.subtitle && <p className="text-[10px] text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>}
                  </div>
                  
                  <div className={`p-6 text-left space-y-4 shadow-xl ${
                    theme.style === "minimal" 
                      ? "border border-zinc-200 bg-white" 
                      : theme.style === "luxury" 
                        ? "rounded-3xl border border-amber-900/10 bg-white" 
                        : "rounded-2xl border border-zinc-100 bg-white"
                  }`}>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      triggerToast("Booking request received! We will confirm your slot via WhatsApp.");
                      e.target.reset();
                    }} className="space-y-4">
                      {(sec.content.fields || []).map((fld, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">{fld.label}</label>
                          {fld.type === "select" ? (
                            <select className="w-full h-9 px-3 border border-zinc-250 text-xs outline-none bg-zinc-50" style={{ borderRadius: theme.style === "minimal" ? "0px" : "8px" }}>
                              {(fld.options || []).map((opt, oidx) => (
                                <option key={opt}>{opt}</option>
                              ))}
                            </select>
                          ) : (
                            <input required type={fld.type} placeholder={fld.placeholder} className="w-full h-9 px-3 border border-zinc-250 text-xs outline-none bg-white" style={{ borderRadius: theme.style === "minimal" ? "0px" : "8px" }} />
                          )}
                        </div>
                      ))}
                      <button type="submit" className="w-full h-10 text-[10px] font-black text-white tracking-widest uppercase shadow pt-0.5 mt-2 hover:opacity-95" style={{ 
                        backgroundColor: theme.primaryColor || "#4f46e5",
                        borderRadius: theme.style === "minimal" ? "0px" : "10px"
                      }}>
                        {sec.content.submitText || "Confirm Booking"}
                      </button>
                    </form>
                  </div>
                </div>
              </section>
            )}

            {/* MENU SECTION */}
            {sec.type === "menu" && (
              <section className={`px-8 bg-white border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                <div className="max-w-4xl mx-auto space-y-10">
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                    {sec.content.subtitle && <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>}
                  </div>

                  <div className="space-y-8">
                    {(sec.content.categories || []).map((cat, idx) => (
                      <div key={idx} className="space-y-4">
                        <span className="text-sm font-black text-zinc-900 block border-l-4 pl-3.5 uppercase tracking-widest" style={{ borderColor: theme.primaryColor || "#4f46e5" }}>
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
                                    <span className="text-sm font-extrabold text-zinc-900">{item.name}</span>
                                    {(item.tags || []).map((tg, tidx) => (
                                      <span key={tidx} className="text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded text-white bg-emerald-600">
                                        {tg}
                                      </span>
                                    ))}
                                  </div>
                                  <p className="text-xs text-zinc-500 leading-normal font-light">{item.desc || item.description}</p>
                                </div>
                                <span className="text-sm font-black text-zinc-955 shrink-0">{item.price}</span>
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
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                    {sec.content.subtitle && <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(sec.content.projects || []).map((proj, idx) => (
                      <div 
                        key={idx} 
                        className={`overflow-hidden cursor-pointer group/proj transition-all ${
                          theme.style === "minimal" 
                            ? "border border-zinc-200" 
                            : "rounded-2xl border border-zinc-100 shadow bg-white hover:shadow-md"
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
                          <span className="text-sm font-extrabold text-zinc-900 block">{proj.name}</span>
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
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                    {sec.content.subtitle && <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>}
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
                            <span className="text-sm font-black text-zinc-900">{story.title}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{story.period}</span>
                          </div>
                          <span className="text-xs font-extrabold text-emerald-600 block">Result: {story.result}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-100 py-3 text-xs">
                          <div className="space-y-0.5">
                            <span className="font-bold text-zinc-400 uppercase tracking-wider block text-[8px]">Before</span>
                            <p className="text-zinc-650 font-medium leading-relaxed font-light">{story.before}</p>
                          </div>
                          <div className="space-y-0.5 border-l border-zinc-100 pl-3">
                            <span className="font-bold text-emerald-500 uppercase tracking-wider block text-[8px]">After</span>
                            <p className="text-zinc-800 font-bold leading-relaxed">{story.after}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-zinc-450 block text-right">Client: {story.client}</span>
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
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                    {sec.content.subtitle && <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>}
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
                              <div key={fidx} className="flex items-center gap-2 text-xs text-zinc-650 font-medium">
                                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button 
                          onClick={() => handlePlanSelect(plan.name)}
                          className="w-full h-9 text-[10px] font-black tracking-widest uppercase transition-all shadow hover:opacity-90" 
                          style={{ 
                            backgroundColor: plan.highlight ? (theme.primaryColor || "#4f46e5") : "#f4f4f5",
                            color: plan.highlight ? "#ffffff" : "#18181b",
                            borderRadius: theme.style === "minimal" ? "0px" : "10px"
                          }}
                        >
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
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-955" style={fontStyle}>{sec.content.title}</h2>
                    {sec.content.subtitle && <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>}
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
                            <span className="text-sm font-black text-zinc-900">{ofr.title}</span>
                            <span className="text-[10px] font-black uppercase text-white bg-indigo-600 px-2 py-0.5 rounded shadow">{ofr.value}</span>
                          </div>
                          <p className="text-xs text-zinc-550 leading-relaxed font-light">{ofr.desc}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-zinc-100 pt-3 text-[10px] font-bold">
                          <span className="text-zinc-450">COUPON CODE:</span>
                          <span className="px-3.5 py-1 bg-zinc-950 text-white rounded font-mono select-all select-text cursor-pointer hover:bg-zinc-900 transition-colors" onClick={() => { navigator.clipboard.writeText(ofr.code); triggerToast(`Code "${ofr.code}" copied to clipboard!`); }}>{ofr.code}</span>
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
                    <h2 className="text-2xl md:text-3xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                    {sec.content.subtitle && <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>}
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
                          <div className="h-12 w-12 rounded-xl flex flex-col justify-center items-center font-bold text-center shrink-0 border bg-indigo-50/10" style={{ borderColor: `${theme.primaryColor || "#4f46e5"}15`, color: theme.primaryColor || "#4f46e5" }}>
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-sm font-black text-zinc-900 block">{ev.title}</span>
                            <div className="flex items-center gap-3 text-[10px] text-zinc-400 font-bold">
                              <span className="text-indigo-650 block uppercase tracking-wider font-extrabold">{ev.date}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {ev.time}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-550 max-w-sm sm:text-right font-light leading-relaxed">{ev.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* FOOTER SECTION */}
            {sec.type === "footer" && (
              <footer className="py-16 px-8 bg-zinc-950 text-zinc-400 text-center text-xs space-y-4 relative overflow-hidden border-t border-zinc-800">
                <div className="max-w-2xl mx-auto space-y-4">
                  <span className="block text-lg font-black tracking-wide uppercase" style={primaryTextColor}>{sec.content.businessName}</span>
                  
                  {sec.content.links && (
                    <div className="flex justify-center gap-6 text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">
                      {sec.content.links.map((lnk, lidx) => (
                        <a key={lidx} href={lnk.href} className="hover:text-white transition-colors">{lnk.label}</a>
                      ))}
                    </div>
                  )}
                  
                  <div className="h-px bg-zinc-900 max-w-md mx-auto" />
                  <p className="font-mono text-[10px] text-zinc-650">{sec.content.copyright}</p>
                </div>
              </footer>
            )}
          </div>
        );
      })}
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900/95 border border-zinc-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-fade-in-up">
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
            <img src={lightboxImage.url} alt="Lightbox" className="max-w-full max-h-[85vh] object-contain" />
          </div>
          {lightboxImage.caption && (
            <span className="text-zinc-350 text-xs font-black mt-4 uppercase tracking-widest bg-zinc-950/80 px-5 py-2.5 rounded-full border border-zinc-800 backdrop-blur">
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
            className="p-5 transition-all text-left border border-zinc-150 bg-zinc-50/40 rounded-2xl cursor-pointer hover:bg-zinc-50/70"
            onClick={() => setActiveIndex(isOpen ? null : idx)}
          >
            <div className="flex items-center justify-between font-bold text-xs text-zinc-900">
              <span>{faq.question}</span>
              <ChevronDown className={`h-4.5 w-4.5 text-zinc-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </div>
            {isOpen && (
              <p className="text-xs text-zinc-550 leading-relaxed pt-2.5 border-t border-zinc-200/40 mt-2.5 whitespace-pre-line font-light">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
