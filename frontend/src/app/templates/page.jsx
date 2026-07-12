"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { 
  Sparkles, 
  Search, 
  Star, 
  ArrowLeft, 
  ArrowUpRight, 
  Layers, 
  Compass, 
  Flame, 
  SlidersHorizontal,
  LayoutGrid,
  ChevronDown,
  Check
} from "lucide-react";
import { CATEGORIES, STYLES, TEMPLATES_LIST, generateTemplateJson } from "../../config/templatesRegistry";
import { getOptimizedImageUrl } from "../../utils/imageOptimizer";
import SkeletonCard from "../../components/loaders/SkeletonCard";

export default function TemplatesMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStyle, setActiveStyle] = useState("All");
  const [isDeploying, setIsDeploying] = useState(null);

  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = useRef(null);

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  const activeCategories = useMemo(() => {
    return CATEGORIES.filter(cat => {
      const count = TEMPLATES_LIST.filter(t => t.categoryId === cat.id).length;
      return count > 0;
    });
  }, []);

  // Reset visibleCount when active filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, activeCategory, activeStyle]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return TEMPLATES_LIST.filter(tpl => {
      const queryLower = searchQuery.toLowerCase();
      const matchesSearch = 
        tpl.name.toLowerCase().includes(queryLower) ||
        tpl.tagline.toLowerCase().includes(queryLower) ||
        tpl.category.toLowerCase().includes(queryLower) || // matches subcategory, e.g. "Bakery"
        tpl.mainCategory.toLowerCase().includes(queryLower) || // matches main category / industry, e.g. "Food & Beverage"
        tpl.style.toLowerCase().includes(queryLower); // matches style / layout type

      const matchesCategory = activeCategory === "All" || tpl.categoryId === activeCategory;
      const matchesStyle = activeStyle === "All" || tpl.style === activeStyle;

      return matchesSearch && matchesCategory && matchesStyle;
    });
  }, [searchQuery, activeCategory, activeStyle]);

  // Infinite Scroll Observer hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 6, filteredTemplates.length));
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [filteredTemplates.length]);

  const visibleTemplates = useMemo(() => {
    return filteredTemplates.slice(0, visibleCount);
  }, [filteredTemplates, visibleCount]);

  // Handle direct "Use Template" action
  const handleUseTemplate = async (e, tpl) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDeploying(tpl.id);
    
    try {
      const websiteJson = generateTemplateJson(tpl.categoryId, tpl.style, tpl.name);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api"}/onboarding/complete`, {
        businessData: {
          name: tpl.name,
          type: tpl.category,
          whatsappEnabled: true,
          whatsappNumber: "+91 98765 43210"
        },
        websiteJson,
        userId: localStorage.getItem("siteforge-auth-user") || "anonymous"
      });

      if (response.data && response.data.success) {
        const websiteId = response.data.data.id;
        window.location.href = `/editor/${websiteId}`;
      } else {
        throw new Error("Failed to deploy template");
      }
    } catch (err) {
      console.error("Direct template deployment failed:", err);
      alert("Failed to initialize template in editor. Please try again.");
      setIsDeploying(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#CAD2C5] via-[#EAF4EA] to-[#F8FAF8] min-h-screen text-[#354F52] font-sans selection:bg-[#52796F] selection:text-white pb-20 relative overflow-hidden">
      {/* Premium blurred gradient decorative orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#84A98C]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[25%] right-[-10%] w-[550px] h-[550px] bg-[#52796F]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[600px] h-[600px] bg-[#354F52]/6 rounded-full blur-[160px] pointer-events-none" />

      {/* Header Area */}
      <header className="sticky top-0 bg-white/40 backdrop-blur-md border-b border-[#2F3E46]/10 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#354F52] hover:text-[#2F3E46] transition-colors py-2">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <span className="h-4 w-px bg-[#2F3E46]/10" />
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#84A98C] to-[#52796F] text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-display text-base font-extrabold tracking-tight text-[#2F3E46]">
                SiteForge
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono bg-white/70 border border-[#2F3E46]/12 text-[#52796F] px-3 py-1 rounded-full font-black uppercase tracking-wider">
              {TEMPLATES_LIST.length} Ready Themes
            </span>
          </div>
        </div>
      </header>

      {/* Main Hero Jumbotron */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#84A98C]/30 bg-[#84A98C]/10 px-4 py-1.5 text-xs font-bold text-[#52796F] mb-6">
          <Compass className="h-4 w-4 animate-spin" style={{ animationDuration: "12s" }} />
          <span>Complete Website Presets</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-[#2F3E46] leading-tight mb-6">
          SaaS Template Marketplace
        </h1>
        <p className="text-[#52796F] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Browse {TEMPLATES_LIST.length} premium website layouts tailored across {activeCategories.length} distinct industries. 
          Preview complete page hierarchies (Home, About, Services, Contact), customize style tokens with AI, and launch instantly.
        </p>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="sticky top-16 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 space-y-6">
        <div className="bg-white/80 border border-[#84A98C]/15 backdrop-blur-md shadow-lg rounded-[28px] p-6 md:p-8 flex flex-col gap-6">
          {/* Search bar & active style tabs */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#354F52]/60" />
              <input
                type="text"
                placeholder="Search templates (e.g. Luxury Bakery, Spa)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#EAF4EA]/20 border border-[#84A98C]/20 rounded-2xl py-3.5 pl-11 pr-4 text-xs outline-none focus:border-[#52796F] text-[#2F3E46] placeholder-[#354F52]/50 transition-colors"
              />
            </div>
            
            {/* Style Filters */}
            <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
              <span className="text-[10px] font-black uppercase text-[#354F52]/60 mr-2 flex items-center gap-1">
                <SlidersHorizontal className="h-3 w-3" /> Style:
              </span>
              {["All", ...STYLES.map(s => s.id)].map((styleId) => {
                const styleName = styleId === "All" ? "All Styles" : STYLES.find(s => s.id === styleId)?.name;
                return (
                  <button
                    key={styleId}
                    onClick={() => setActiveStyle(styleId)}
                    className={`px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                      activeStyle === styleId
                        ? "bg-[#52796F] text-white shadow-sm"
                        : "bg-white/60 text-[#52796F] border border-[#84A98C]/20 hover:bg-white"
                    }`}
                  >
                    {styleName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Flat Category Scroll Tabs */}
          <div className="border-t border-[#84A98C]/15 pt-6">
            <span className="text-[10px] font-black uppercase text-[#354F52]/60 mb-3 block flex items-center gap-1">
              <LayoutGrid className="h-3 w-3" /> Business Categories:
            </span>

            {/* Mobile searchable dropdown */}
            <div className="relative md:hidden w-full">
              <button
                type="button"
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                className="w-full flex items-center justify-between bg-[#EAF4EA]/30 border border-[#84A98C]/20 rounded-xl px-4 py-3 text-xs font-bold text-[#52796F] outline-none shadow-sm"
              >
                <span>{activeCategory === "All" ? `All Categories (${TEMPLATES_LIST.length})` : `${activeCategories.find(c => c.id === activeCategory)?.name || activeCategory} (${TEMPLATES_LIST.filter(t => t.categoryId === activeCategory).length})`}</span>
                <ChevronDown className={`h-4 w-4 text-[#52796F] transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-[#84A98C]/20 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto p-2 space-y-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#354F52]/50" />
                    <input
                      type="text"
                      placeholder="Search category..."
                      value={mobileSearchQuery}
                      onChange={(e) => setMobileSearchQuery(e.target.value)}
                      className="w-full bg-[#EAF4EA]/20 border border-[#84A98C]/20 rounded-lg py-2 pl-8 pr-3 text-xs text-[#2F3E46] outline-none focus:border-[#52796F]"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory("All");
                        setMobileDropdownOpen(false);
                        setMobileSearchQuery("");
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                        activeCategory === "All" ? "bg-[#52796F] text-white" : "hover:bg-[#EAF4EA]/40 text-[#52796F]"
                      }`}
                    >
                      <span>All Categories ({TEMPLATES_LIST.length})</span>
                      {activeCategory === "All" && <Check className="h-3.5 w-3.5" />}
                    </button>
                    {activeCategories.filter(cat => cat.name.toLowerCase().includes(mobileSearchQuery.toLowerCase())).map((cat) => {
                      const count = TEMPLATES_LIST.filter(t => t.categoryId === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          type="button;`"
                          onClick={() => {
                            setActiveCategory(cat.id);
                            setMobileDropdownOpen(false);
                            setMobileSearchQuery("");
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                            activeCategory === cat.id ? "bg-[#52796F] text-white" : "hover:bg-[#EAF4EA]/40 text-[#52796F]"
                          }`}
                        >
                          <span>{cat.name} ({count})</span>
                          {activeCategory === cat.id && <Check className="h-3.5 w-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop category chips wrapper */}
            <div className="hidden md:block">
              <div className="flex flex-wrap gap-1.5 p-4 rounded-2xl bg-[#EAF4EA]/10 border border-[#84A98C]/10">
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeCategory === "All"
                      ? "bg-[#52796F] text-white shadow-md shadow-[#52796F]/15"
                      : "bg-[#84A98C]/10 text-[#52796F] border border-[#84A98C]/15 hover:bg-[#84A98C]/20"
                  }`}
                >
                  All Categories ({TEMPLATES_LIST.length})
                </button>
                {(showAllCategories ? activeCategories : activeCategories.slice(0, 20)).map((cat) => {
                  const count = TEMPLATES_LIST.filter(t => t.categoryId === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        activeCategory === cat.id
                          ? "bg-[#52796F] text-white shadow-md shadow-[#52796F]/15"
                          : "bg-[#84A98C]/10 text-[#52796F] border border-[#84A98C]/15 hover:bg-[#84A98C]/20"
                      }`}
                    >
                      {cat.name} ({count})
                    </button>
                  );
                })}
              </div>

              {activeCategories.length > 20 && (
                <div className="mt-3 flex justify-center">
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="text-xs font-bold text-[#52796F] hover:text-[#354F52] px-4 py-2 rounded-xl bg-white border border-[#84A98C]/20 hover:bg-[#EAF4EA]/20 transition-all uppercase tracking-wider"
                  >
                    {showAllCategories ? "Show Less Categories" : "Show More Categories"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Template Grid Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-20 bg-white/40 border border-[#84A98C]/20 rounded-3xl space-y-3">
            <Layers className="h-8 w-8 text-[#354F52]/40 mx-auto" />
            <h3 className="font-extrabold text-sm text-[#2F3E46]">No Templates Found</h3>
            <p className="text-xs text-[#354F52]/70">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTemplates.map((tpl) => {
              // Decide Premium Gold Accent Badges
              let goldTag = null;
              if (tpl.style === "luxury") goldTag = "Editor's Choice";
              else if (tpl.style === "modern") goldTag = "Trending";
              else if (tpl.style === "minimal") goldTag = "Most Popular";

              return (
                <div
                  key={tpl.id}
                  className="group bg-white border border-[#84A98C]/15 rounded-[28px] p-4 flex flex-col justify-between shadow-[0_20px_60px_rgba(47,62,70,0.12)] hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-[0_30px_70px_rgba(47,62,70,0.18)] transition-all duration-300 ease-out"
                >
                  <div className="space-y-4">
                    {/* Mockup Display */}
                    <div className="relative aspect-[4/3] rounded-2xl bg-zinc-50 border border-[#84A98C]/15 overflow-hidden">
                      {/* Premium Gold Tag Floating */}
                      {goldTag && (
                        <span className="absolute top-9 left-3 bg-[#F4B942] text-white shadow-md border border-amber-500/20 px-2.5 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider z-20">
                          {goldTag}
                        </span>
                      )}

                      {/* Optimized simulated image */}
                      <img
                        src={getOptimizedImageUrl(tpl.image, "thumbnail")}
                        alt={tpl.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                      <div className="absolute inset-0 bg-[#354F52]/3 z-10" />

                      {/* Fake Browser Top Chrome */}
                      <div className="absolute top-0 left-0 right-0 h-6 bg-white/90 backdrop-blur-sm border-b border-[#84A98C]/12 z-20 flex items-center px-4 gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                        <span className="text-[7.5px] font-mono text-zinc-400 mx-auto select-none pt-0.5">
                          {tpl.id}.siteforge.app
                        </span>
                      </div>

                      {/* Interactive Action Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#2F3E46]/20 via-[#2F3E46]/85 to-[#2F3E46]/98 opacity-0 group-hover:opacity-100 z-30 transition-all duration-300 flex flex-col items-center justify-center gap-3.5 p-6 rounded-2xl">
                        <span className="text-[10px] font-black text-[#84A98C] tracking-widest uppercase flex items-center gap-1.5">
                          <Flame className="h-3.5 w-3.5 text-[#84A98C] animate-pulse" /> Complete website preset
                        </span>
                        <h4 className="text-center font-display text-sm font-extrabold text-white leading-tight px-4 mb-2">
                          {tpl.name}
                        </h4>
                        <p className="text-center text-[10px] text-zinc-300 leading-relaxed mb-2 px-3">
                          Includes: Hero, About, Services, Products, Gallery, Testimonials, FAQ, Contact, and custom widgets.
                        </p>

                        <div className="flex flex-col gap-2 w-full max-w-[200px]">
                          <Link
                            href={`/templates/${tpl.id}`}
                            target="_blank"
                            className="w-full py-2.5 rounded-xl bg-[#52796F] hover:bg-[#354F52] text-white text-[10px] font-black uppercase tracking-widest text-center shadow-md flex items-center justify-center gap-1.5 transition-all duration-200"
                          >
                            Preview Live <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                          <button
                            onClick={(e) => handleUseTemplate(e, tpl)}
                            disabled={isDeploying !== null}
                            className="w-full py-2.5 rounded-xl bg-white border border-[#84A98C] text-[#52796F] hover:bg-zinc-50 text-[10px] font-black uppercase tracking-widest text-center transition-all duration-200 disabled:opacity-50"
                          >
                            {isDeploying === tpl.id ? "Deploying Site..." : "Use Template"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Template Meta Details */}
                    <div className="px-1.5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black bg-[#84A98C]/20 text-[#52796F] px-2.5 py-0.5 rounded-full uppercase tracking-wider">{tpl.category}</span>
                          <span className="text-[9px] font-extrabold text-[#52796F] uppercase tracking-wider">{tpl.style}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-[#D97706]">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-[10px] font-black">{tpl.rating}</span>
                          <span className="text-[8px] text-zinc-400 font-medium">({tpl.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="font-display font-extrabold text-base text-[#2F3E46] leading-tight">
                        {tpl.name}
                      </h3>
                      <p className="text-[10.5px] text-[#52796F] leading-relaxed truncate">
                        {tpl.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-[#84A98C]/15 pt-4 flex items-center justify-between px-1">
                    <span className="text-[8px] font-black bg-gradient-to-r from-[#84A98C] to-[#52796F] text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_12px_rgba(82,121,111,0.45)]">
                      Production Ready
                    </span>
                    <Link href={`/templates/${tpl.id}`} target="_blank" className="text-[10px] font-black text-[#52796F] hover:text-[#354F52] flex items-center gap-0.5 transition-colors uppercase tracking-wider">
                      Full Preview <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
            
            {/* Pulsing skeleton cards for lazy load scrolling state */}
            {visibleCount < filteredTemplates.length && (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}
          </div>
        )}

        {/* Scroll observer target anchor */}
        {visibleCount < filteredTemplates.length && (
          <div ref={loaderRef} className="h-20 w-full flex items-center justify-center mt-8">
            <div className="w-5 h-5 border-2 border-[#52796F] border-t-transparent rounded-full animate-spin mr-2" />
            <span className="text-[10px] font-mono text-[#52796F] font-bold uppercase tracking-widest">Loading templates...</span>
          </div>
        )}
      </section>
    </div>
  );
}
