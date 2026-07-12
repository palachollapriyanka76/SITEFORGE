"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, MessageSquare, ArrowRight } from "lucide-react";

export interface UniversalNavbarProps {
  businessName: string;
  logo?: string;
  sections: Array<{ id: string; type: string; content?: any }>;
  whatsappNumber?: string | null;
  primaryCTA?: string;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    fontFamily?: string;
    style?: string;
  };
}

const SECTION_LABELS: Record<string, string> = {
  hero: "Home",
  about: "About",
  services: "Services",
  products: "Products",
  gallery: "Gallery",
  testimonials: "Testimonials",
  faq: "FAQ",
  contact: "Contact",
  booking: "Bookings",
  pricing: "Pricing",
  team: "Team",
  portfolio: "Portfolio",
  menu: "Menu"
};

function getBusinessEmoji(name: string, category: string): string {
  const n = (name || "").toLowerCase();
  const c = (category || "").toLowerCase();
  
  if (c.includes("bakery") || n.includes("bakery") || n.includes("cake") || n.includes("bread")) return "🥐";
  if (c.includes("restaurant") || n.includes("restaurant") || n.includes("dine") || n.includes("food") || n.includes("cuisine")) return "🍽️";
  if (c.includes("cafe") || n.includes("cafe") || n.includes("coffee") || n.includes("brew")) return "☕";
  if (c.includes("food truck") || n.includes("truck")) return "🚚";
  if (c.includes("jewelry") || n.includes("jewelry") || n.includes("jewel") || n.includes("gold") || n.includes("silver")) return "💍";
  if (c.includes("salon") || c.includes("parlour") || n.includes("salon") || n.includes("hair") || n.includes("barber")) return "✂️";
  if (c.includes("spa") || n.includes("spa") || n.includes("wellness")) return "🧴";
  if (c.includes("gym") || c.includes("fitness") || n.includes("gym") || n.includes("fit") || n.includes("workout")) return "🏋️";
  if (c.includes("clinic") || c.includes("medical") || n.includes("clinic") || n.includes("doctor") || n.includes("dentist")) return "🏥";
  if (c.includes("electronics") || c.includes("mobile") || c.includes("computer") || n.includes("tech") || n.includes("mobile") || n.includes("phone")) return "📱";
  if (c.includes("flower") || n.includes("flower") || n.includes("florist")) return "💐";
  if (c.includes("toy") || n.includes("toy") || n.includes("kid")) return "🧸";
  if (c.includes("gift") || n.includes("gift")) return "🎁";
  if (c.includes("book") || n.includes("book") || n.includes("read")) return "📚";
  if (c.includes("photo") || n.includes("photo") || n.includes("studio") || n.includes("camera")) return "📷";
  if (c.includes("real estate") || n.includes("estate") || n.includes("home") || n.includes("house")) return "🏠";
  if (c.includes("furniture") || n.includes("furniture") || n.includes("sofa") || n.includes("wood")) return "🪑";
  if (c.includes("hardware") || n.includes("tool")) return "🔧";
  if (c.includes("automobile") || c.includes("car") || n.includes("auto") || n.includes("car") || n.includes("garage")) return "🚗";
  if (c.includes("travel") || n.includes("travel") || n.includes("tour") || n.includes("trip")) return "✈️";
  if (c.includes("educational") || c.includes("school") || n.includes("academy") || n.includes("edu") || n.includes("college")) return "🎓";
  if (c.includes("handicraft") || n.includes("handicraft") || n.includes("craft")) return "🏺";
  if (c.includes("pet") || n.includes("pet") || n.includes("dog") || n.includes("cat")) return "🐾";
  if (c.includes("agriculture") || n.includes("farm") || n.includes("agri")) return "🌾";
  if (c.includes("retail") || n.includes("store") || n.includes("shop") || n.includes("grocer")) return "🛒";
  
  return "✨";
}

export default function UniversalNavbar({
  businessName,
  logo,
  sections = [],
  whatsappNumber,
  primaryCTA = "Contact Us",
  theme = {}
}: UniversalNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const primaryColor = theme.primaryColor || "#52796F";
  const accentColor = theme.accentColor || "#84A98C";
  const isMinimal = theme.style === "minimal";
  const isLuxury = theme.style === "luxury" || theme.style === "elegant";

  // Filter sections that are actually present to build links
  const menuItems = React.useMemo(() => {
    const items: Array<{ label: string; href: string; type: string }> = [];
    const seenTypes = new Set<string>();

    (sections || []).forEach(sec => {
      if (sec.visible === false || seenTypes.has(sec.type) || sec.type === "footer") return;
      
      const label = SECTION_LABELS[sec.type];
      if (label) {
        items.push({
          label,
          href: `#${sec.id}`,
          type: sec.type
        });
        seenTypes.add(sec.type);
      }
    });

    // Sort order: Hero (Home) always first
    return items.sort((a, b) => {
      if (a.type === "hero") return -1;
      if (b.type === "hero") return 1;
      return 0;
    });
  }, [sections]);

  // Handle Scroll behavior to add shadow & active highlights
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for tracking active section
  useEffect(() => {
    if (menuItems.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    menuItems.forEach(item => {
      const element = document.getElementById(item.href.replace("#", ""));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [menuItems]);

  const handleScrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
      setActiveSection(href);
    }
  };

  const detectedEmoji = React.useMemo(() => {
    const firstSectionType = sections?.[0]?.type || "";
    return getBusinessEmoji(businessName, firstSectionType);
  }, [businessName, sections]);

  const borderRadius = isMinimal || isLuxury ? "rounded-none" : "rounded-2xl";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full px-4 sm:px-8 py-3 sm:py-4 bg-transparent`}
    >
      <div
        className={`max-w-[1400px] mx-auto h-[80px] px-6 py-4 flex items-center justify-between transition-all duration-300 ${borderRadius} ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg border border-slate-200/50" 
            : "bg-white border border-transparent shadow-sm"
        }`}
        style={{ fontFamily: theme.fontFamily || "Outfit, sans-serif" }}
      >
        {/* LOGO AREA */}
        <div className="flex items-center gap-2.5 shrink-0 select-none">
          {logo ? (
            <img src={logo} alt={businessName} className="h-9 w-auto object-contain" />
          ) : (
            <span className="text-xl sm:text-2xl flex items-center gap-2">
              <span className="shrink-0">{detectedEmoji}</span>
              <span className="font-extrabold tracking-tight text-[#2F3E46] text-base sm:text-lg">
                {businessName}
              </span>
            </span>
          )}
        </div>

        {/* DESKTOP NAVIGATION LINKS */}
        <div className="hidden lg:flex items-center gap-7">
          {menuItems.map(item => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                className={`text-[13px] font-black uppercase tracking-widest transition-all duration-200 hover:-translate-y-0.5`}
                style={{ color: isActive ? accentColor : "#2F3E46" }}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* CTA ACTION BUTTONS */}
        <div className="hidden sm:flex items-center gap-3.5 shrink-0">
          {/* Phone (Contact Us) */}
          <button
            onClick={(e) => {
              const contactSec = sections.find(s => s.type === "contact");
              if (contactSec) {
                handleScrollToSection(e, `#${contactSec.id}`);
              } else {
                handleScrollToSection(e, "#contact");
              }
            }}
            className="flex items-center justify-center gap-1.5 px-4.5 py-2.5 text-xs font-black uppercase tracking-wider text-[#2F3E46] hover:text-[#52796F] transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{primaryCTA}</span>
          </button>

          {/* WhatsApp Secondary CTA */}
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-4.5 py-2.5 border border-slate-200 hover:border-slate-350 bg-white shadow-sm hover:shadow text-xs font-black uppercase tracking-wider text-[#2F3E46] transition-all"
              style={{ borderRadius: isMinimal ? "0px" : "10px" }}
            >
              <MessageSquare className="h-3.5 w-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          )}

          {/* Primary Action Button */}
          <button
            onClick={(e) => {
              const contactSec = sections.find(s => s.type === "contact" || s.type === "booking");
              if (contactSec) {
                handleScrollToSection(e, `#${contactSec.id}`);
              }
            }}
            className="flex items-center justify-center gap-1.5 text-white shadow-md hover:scale-102 transition-all text-xs font-black uppercase tracking-widest px-5 py-3"
            style={{ 
              backgroundColor: primaryColor,
              borderRadius: isMinimal ? "0px" : "10px"
            }}
          >
            <span>Inquire Live</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#2F3E46] hover:text-[#52796F] transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION SLIDE-IN DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Menu panel */}
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl p-6 flex flex-col justify-between border-l border-slate-100 z-50 animate-slide-in">
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-extrabold text-[#2F3E46] text-base">{businessName}</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="p-1.5 text-slate-400 hover:text-slate-700"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Menu List */}
              <div className="flex flex-col gap-5 text-left">
                {menuItems.map(item => {
                  const isActive = activeSection === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleScrollToSection(e, item.href)}
                      className="text-sm font-black uppercase tracking-widest block transition-all"
                      style={{ color: isActive ? accentColor : "#2F3E46" }}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Mobile Actions block */}
            <div className="space-y-3.5 border-t border-slate-100 pt-6">
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-slate-200 bg-white text-xs font-black uppercase tracking-wider text-[#2F3E46] rounded-xl shadow-sm"
                >
                  <MessageSquare className="h-4 w-4 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              )}
              
              <button
                onClick={(e) => {
                  const contactSec = sections.find(s => s.type === "contact" || s.type === "booking");
                  if (contactSec) {
                    handleScrollToSection(e, `#${contactSec.id}`);
                  }
                }}
                className="flex items-center justify-center gap-2 w-full text-white font-black text-xs uppercase tracking-widest py-3.5 shadow-md"
                style={{ 
                  backgroundColor: primaryColor,
                  borderRadius: isMinimal ? "0px" : "12px"
                }}
              >
                <span>{primaryCTA}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
