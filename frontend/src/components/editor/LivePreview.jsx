"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, Flame, Dumbbell, Scissors, Activity, Utensils, GlassWater,
  ShoppingBag, Headphones, Cpu, ShieldCheck, Cake, Cookie, Check, Star,
  Phone, Mail, MapPin, User, Clock, Calendar, ChevronDown, ChevronUp,
  ExternalLink, ShoppingCart, X, Plus, Minus, Heart, Eye, ArrowRight,
  CheckCircle, MessageSquare, Tag, Send, AlertCircle
} from "lucide-react";
import { useCartStore } from "../../store/onboarding.store";

const IconMap = {
  Sparkles, Flame, Dumbbell, Scissors, Activity, Utensils, GlassWater,
  ShoppingBag, Headphones, Cpu, ShieldCheck, Cake, Cookie, Check, Star,
  Phone, Mail, MapPin, User, Clock, Calendar, CheckCircle, Shield: ShieldCheck
};

const SectionIcon = ({ name, className }) => {
  const IconComponent = IconMap[name] || Sparkles;
  return <IconComponent className={className} />;
};

export default function LivePreview({ 
  websiteJSON, 
  activeSectionId = null, 
  onElementClick = () => {}, 
  isEditor = false, 
  device = "desktop" 
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quickViewQty, setQuickViewQty] = useState(1);
  const [quickViewTab, setQuickViewTab] = useState("desc");
  const [wishlistIds, setWishlistIds] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  // Cart store
  const cartItems = useCartStore((state) => state.items);
  const isCartOpen = useCartStore((state) => state.isOpen);
  const setCartOpen = useCartStore((state) => state.setOpen);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  useEffect(() => {
    if (!websiteJSON) return;
    const faviconUrl = websiteJSON.theme?.logo?.url || websiteJSON.meta?.favicon;
    if (faviconUrl) {
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    }
    if (websiteJSON.meta?.title && !isEditor) {
      document.title = websiteJSON.meta.title;
    }
  }, [websiteJSON, isEditor]);

  if (!websiteJSON || !websiteJSON.pages || websiteJSON.pages.length === 0) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-zinc-900 text-zinc-400 font-sans p-6 rounded-2xl border border-zinc-800">
        <Sparkles className="h-10 w-10 text-indigo-500 animate-pulse mb-3" />
        <span className="font-bold text-white text-lg">Initializing Website Blueprint...</span>
        <span className="text-xs text-zinc-500 mt-1">Generating custom layout structure & content</span>
      </div>
    );
  }

  const theme = websiteJSON.theme || {};
  const globalSettings = websiteJSON.globalSettings || {};
  const homePage = websiteJSON.pages[0];
  const sections = homePage.sections || [];

  const primaryColor = theme.primaryColor || "#4F46E5";
  const secondaryColor = theme.secondaryColor || "#0F172A";
  const accentColor = theme.accentColor || "#10B981";
  const backgroundColor = theme.backgroundColor || "#FFFFFF";
  const textColor = theme.textColor || "#0F172A";
  const fontFamily = theme.fontFamily || "Outfit, sans-serif";

  // Device width wrapper
  const deviceStyles = {
    desktop: "w-full max-w-full",
    tablet: "max-w-[768px] mx-auto border-x border-zinc-200 shadow-2xl",
    mobile: "max-w-[390px] mx-auto border-x border-zinc-200 shadow-2xl rounded-3xl overflow-hidden"
  }[device] || "w-full";

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => {
    const numPrice = parseFloat((item.price || "0").replace(/[^0-9.]/g, '')) || 0;
    return acc + numPrice * item.quantity;
  }, 0);

  const handleOpenQuickView = (prod) => {
    setSelectedProduct(prod);
    setSelectedVariant(prod.variants && prod.variants.length > 0 ? prod.variants[0] : "Standard Configuration");
    setQuickViewQty(1);
    setQuickViewTab("desc");
  };

  const handleCheckoutWhatsApp = () => {
    const phone = (globalSettings.whatsappNumber || "+91 98765 43210").replace(/\D/g, '');
    let msg = `Hello ${websiteJSON.meta?.title || "Team"},\nI would like to place an order from your website:\n\n`;
    cartItems.forEach((it, idx) => {
      msg += `${idx + 1}. ${it.name} (${it.selectedVariant || "Standard"}) - Qty: ${it.quantity} @ ${it.price}\n`;
    });
    msg += `\n*Total Estimate: $${cartSubtotal.toFixed(2)}*\n\nPlease let me know payment and delivery instructions.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div 
      className={`min-h-screen bg-white text-zinc-800 transition-all duration-300 relative ${deviceStyles}`}
      style={{ fontFamily }}
    >
      {/* TOAST NOTIFICATION */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-[100] bg-zinc-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-zinc-700 flex items-center gap-3 animate-fade-up">
          <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* QUICK VIEW / PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-zoom-in">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="md:w-1/2 bg-zinc-100 p-6 flex items-center justify-center relative min-h-[280px]">
              {selectedProduct.image ? (
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover rounded-2xl shadow-lg max-h-[350px]" />
              ) : (
                <div className="w-full h-64 bg-zinc-200 rounded-2xl flex items-center justify-center text-zinc-400 font-medium">No Image Available</div>
              )}
              {selectedProduct.badge && (
                <span className="absolute top-8 left-8 bg-indigo-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase">
                  {selectedProduct.badge}
                </span>
              )}
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{selectedProduct.category || "Featured"}</span>
                  <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    {selectedProduct.availability || "In Stock"}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 mb-2">{selectedProduct.name}</h3>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-2xl font-extrabold text-indigo-600">{selectedProduct.price}</span>
                  {selectedProduct.discount && (
                    <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">{selectedProduct.discount}</span>
                  )}
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6">{selectedProduct.description || "Premium quality item crafted for long-lasting performance and satisfaction."}</p>

                {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Select Variant</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.variants.map((v) => (
                        <button
                          key={v}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            selectedVariant === v ? "bg-zinc-900 text-white border-zinc-900 shadow-md" : "bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProduct.features && (
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Key Features</label>
                    <ul className="space-y-1.5">
                      {selectedProduct.features.map((feat, i) => (
                        <li key={i} className="text-xs text-zinc-600 flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-zinc-100">
                <button
                  onClick={() => {
                    addToCart(selectedProduct, 1, selectedVariant);
                    triggerToast(`Added "${selectedProduct.name}" to cart!`);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    const target = document.getElementById("sec_booking") || document.getElementById("sec_contact");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 py-3.5 px-5 rounded-2xl font-bold text-sm transition-all"
                >
                  Inquire
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="Enlarged view" className="max-w-4xl max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-zinc-800" />
        </div>
      )}

      {/* CART DRAWER / SLIDE-OVER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-in">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-zinc-900 text-lg">Your Shopping Cart</h3>
                  <span className="text-xs text-zinc-500">{totalCartCount} items selected</span>
                </div>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 text-zinc-400 hover:text-zinc-700 rounded-full hover:bg-zinc-100 transition-all">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400 gap-3 py-12">
                  <ShoppingBag className="h-14 w-14 text-zinc-200 stroke-[1.5]" />
                  <span className="font-bold text-zinc-600 text-base">Your cart is empty</span>
                  <span className="text-xs max-w-xs text-zinc-400">Browse our catalog and select items to see them here.</span>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={`${item.id}-${item.selectedVariant}-${idx}`} className="flex gap-4 p-3.5 rounded-2xl border border-zinc-100 bg-zinc-50/50 relative group">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-zinc-900 text-sm truncate">{item.name}</h4>
                      <span className="text-xs font-semibold text-indigo-600 block mt-0.5">{item.selectedVariant || "Standard"}</span>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="font-extrabold text-zinc-900 text-sm">{item.price}</span>
                        <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-lg px-2 py-1 shadow-sm">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedVariant)} className="text-zinc-500 hover:text-zinc-900">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold px-1">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedVariant)} className="text-zinc-500 hover:text-zinc-900">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedVariant)}
                      className="absolute top-2.5 right-2.5 text-zinc-300 hover:text-rose-500 p-1 rounded transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-zinc-100 bg-zinc-50/80 space-y-4">
                <div className="flex justify-between items-center text-sm font-medium text-zinc-600">
                  <span>Subtotal Estimate</span>
                  <span className="font-extrabold text-zinc-900 text-lg">${cartSubtotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Order Direct via WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    const target = document.getElementById("sec_booking") || document.getElementById("sec_contact");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 px-6 rounded-2xl font-bold text-xs transition-all"
                >
                  Proceed to Order Form
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* HEADER / NAVIGATION BAR */}
      <header className={`w-full z-40 transition-all border-b border-zinc-100 ${
        globalSettings.headerConfig?.sticky ? "sticky top-0 bg-white/90 backdrop-blur-md shadow-sm" : "relative bg-white"
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          {/* BRAND LOGO */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {(theme.logo?.url || websiteJSON.logo?.url || (typeof websiteJSON.logoUrl === 'string' && websiteJSON.logoUrl)) ? (
              <div className="h-11 w-48 max-w-[210px] flex items-center">
                <img src={theme.logo?.url || websiteJSON.logo?.url || websiteJSON.logoUrl} alt={theme.logo?.text || "Brand Logo"} className="h-full w-auto object-contain" />
              </div>
            ) : (theme.logo?.svgString || websiteJSON.logo?.svgString) ? (
              <div className="h-11 w-48 max-w-[210px] flex items-center" dangerouslySetInnerHTML={{ __html: theme.logo?.svgString || websiteJSON.logo?.svgString }} />
            ) : (
              <div className="flex items-center gap-2.5">
                <div 
                  className="h-10 w-10 rounded-xl flex items-center justify-center font-extrabold text-white shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  {theme.logo?.initials || (websiteJSON.meta?.title ? websiteJSON.meta.title.substring(0,2).toUpperCase() : "SF")}
                </div>
                <span className="font-black text-xl tracking-tight text-zinc-900">
                  {theme.logo?.text || (typeof theme.logo === 'string' ? theme.logo : null) || websiteJSON.meta?.title || "My Business"}
                </span>
              </div>
            )}
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-zinc-600">
            {sections.filter(s => s.visible !== false && s.type !== "hero" && s.type !== "footer").map((sec) => (
              <a
                key={`nav_${sec.id}`}
                href={`#${sec.id}`}
                className="hover:text-indigo-600 transition-colors capitalize"
              >
                {sec.content?.title ? sec.content.title.split(' ')[0] : sec.type}
              </a>
            ))}
          </nav>

          {/* ACTIONS: WHATSAPP + CART */}
          <div className="flex items-center gap-3">
            {globalSettings.whatsappButton && globalSettings.whatsappNumber && (
              <a
                href={`https://wa.me/${globalSettings.whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-md transition-all"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
            )}

            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-zinc-100 hover:bg-zinc-200 text-zinc-800 p-2.5 rounded-full transition-all flex items-center justify-center"
              title="Open Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-extrabold h-5 w-5 rounded-full flex items-center justify-center shadow">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* SECTIONS LIST */}
      <main className="w-full divide-y divide-zinc-100">
        {sections.filter(sec => sec.visible !== false && sec.type !== "footer").map((sec) => {
          const isSelected = isEditor && activeSectionId === sec.id;
          return (
            <section
              id={sec.id}
              key={sec.id}
              onClick={(e) => {
                if (isEditor) {
                  e.stopPropagation();
                  onElementClick(sec.id);
                }
              }}
              className={`relative transition-all ${
                isEditor ? "cursor-pointer hover:outline hover:outline-2 hover:outline-indigo-400 hover:outline-offset-[-2px]" : ""
              } ${isSelected ? "outline outline-4 outline-indigo-600 outline-offset-[-4px] z-10" : ""}`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 z-30 bg-indigo-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                  Editing: {sec.type}
                </div>
              )}

              {/* RENDER BY SECTION TYPE */}
              {sec.type === "hero" && (() => {
                const heroBg = sec.content?.backgroundImage || sec.content?.image || sec.content?.bgImage || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80";
                return (
                  <div className="relative overflow-hidden py-24 md:py-36 px-4 md:px-8 flex items-center justify-center min-h-[580px]" style={{ backgroundColor: heroBg ? "#09090b" : backgroundColor }}>
                    {heroBg && (
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <img src={heroBg} alt="Hero cover image" className="w-full h-full object-cover brightness-[0.62] scale-105 transition-transform duration-1000 group-hover:scale-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
                      </div>
                    )}
                    <div className={`relative z-10 max-w-5xl mx-auto ${
                      sec.content?.alignment === "left" ? "text-left" : (sec.content?.alignment === "right" ? "text-right ml-auto" : "text-center")
                    }`}>
                      <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-bold text-xs tracking-wider uppercase mb-6 backdrop-blur-md shadow-sm">
                        ✨ Premier Professional Solutions
                      </span>
                      <h1 className={`text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6 ${heroBg ? "text-white drop-shadow-md" : "text-zinc-900"}`}>
                        {sec.content?.title || "Excellence Engineered for Your Success"}
                      </h1>
                      <p className={`text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed mb-10 ${heroBg ? "text-zinc-200 drop-shadow" : "text-zinc-600"}`}>
                        {sec.content?.subtitle || "Delivering uncompromising quality and tailored solutions crafted precisely around your expectations."}
                      </p>
                      <div className={`flex flex-wrap items-center gap-4 ${
                        sec.content?.alignment === "left" ? "justify-start" : (sec.content?.alignment === "right" ? "justify-end" : "justify-center")
                      }`}>
                        <a
                          href={sec.content?.ctaLink || "#products"}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-indigo-600/25 transition-all text-sm flex items-center gap-2 active:scale-95"
                        >
                          <span>{sec.content?.ctaText || "Explore Catalog"}</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                        {sec.content?.secondaryCtaText && (
                          <a
                            href={sec.content?.secondaryCtaLink || "#about"}
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-full transition-all text-sm backdrop-blur-md"
                          >
                            {sec.content.secondaryCtaText}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {["about", "team", "agents"].includes(sec.type) && (
                <div className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 block">Who We Are</span>
                      <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight mb-6">
                        {sec.content?.title || `About ${websiteJSON.meta?.title || "Our Business"}`}
                      </h2>
                      <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-8">
                        {sec.content?.description || "We are dedicated specialists committed to delivering highest-tier products and services with unwavering precision."}
                      </p>
                      {sec.content?.highlights && (
                        <div className="grid grid-cols-2 gap-4">
                          {sec.content.highlights.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100">
                              <CheckCircle className="h-5 w-5 text-indigo-600 shrink-0" />
                              <span className="text-xs font-bold text-zinc-800">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {sec.content?.image && (
                      <div className="relative">
                        <img src={sec.content.image} alt="About showcase" className="w-full h-[400px] md:h-[480px] object-cover rounded-3xl shadow-2xl border border-zinc-100" />
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-zinc-100 hidden sm:block">
                          <span className="text-3xl font-black text-indigo-600 block">100%</span>
                          <span className="text-xs font-bold text-zinc-600 uppercase">Quality Verified</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {["products", "collections", "catalog", "inventory", "featured-products", "menu", "popular-dishes", "properties"].includes(sec.type) && (
                <div className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
                  {isEditor && (
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        onElementClick(sec.id);
                      }}
                      className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:scale-[1.01] transition-all border border-indigo-400/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
                          <ShoppingBag className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm md:text-base leading-tight">Editing Products, Prices & Offerings</h4>
                          <p className="text-xs text-indigo-100 mt-0.5">Click here or on any item below to Add, Modify Prices, Edit Description, or Delete products inside the inspector panel.</p>
                        </div>
                      </div>
                      <button className="bg-white text-indigo-900 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md hover:bg-indigo-50 transition-colors shrink-0 flex items-center gap-1.5">
                        <Plus className="h-4 w-4 text-indigo-600" /> Open Product Manager
                      </button>
                    </div>
                  )}

                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Our Catalog</span>
                    <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight mb-4">
                      {sec.content?.title || "Featured Selections"}
                    </h2>
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                      {sec.content?.subtitle || "Explore our engineered items tailored precisely to your standards."}
                    </p>
                  </div>

                  {/* PRODUCTS GRID */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${
                    sec.content?.layoutStyle === "grid-4" ? "lg:grid-cols-4" : "lg:grid-cols-3"
                  } gap-6 md:gap-8`}>
                    {(sec.content?.products || []).map((prod, idx) => (
                      <div 
                        key={prod.id || idx} 
                        className="bg-white rounded-3xl border border-zinc-100 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
                      >
                        {isEditor && (
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              onElementClick(sec.id);
                            }}
                            className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-indigo-600/95 hover:bg-indigo-700 text-white text-[11px] font-extrabold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer border border-indigo-300/40"
                            title="Click to Edit this product or modify price"
                          >
                            <span>✏️ Edit Price & Details</span>
                          </div>
                        )}
                        <div 
                          className="aspect-[4/3] relative overflow-hidden bg-zinc-100 cursor-pointer"
                          onClick={() => handleOpenQuickView(prod)}
                        >
                          {prod.image ? (
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-400 font-medium text-xs">No Image Available</div>
                          )}
                          {prod.badge && (
                            <span className="absolute top-4 left-4 bg-zinc-900/90 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                              {prod.badge}
                            </span>
                          )}
                          {prod.discount && (
                            <span className="absolute top-4 right-4 bg-rose-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                              {prod.discount}
                            </span>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <span className="bg-white text-zinc-900 font-bold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 hover:scale-105 transition-transform">
                              <Eye className="h-3.5 w-3.5 text-indigo-600" />
                              <span>Quick View & Details</span>
                            </span>
                          </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">{prod.category || "Featured"}</span>
                            <h3 
                              className="font-extrabold text-zinc-900 text-base mb-2 cursor-pointer hover:text-indigo-600 transition-colors"
                              onClick={() => handleOpenQuickView(prod)}
                            >
                              {prod.name}
                            </h3>
                            <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed mb-4">{prod.description}</p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                            <span className="text-xl font-black text-zinc-900">{prod.price}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(prod, 1);
                                triggerToast(`Added "${prod.name}" to cart!`);
                              }}
                              className="bg-zinc-900 hover:bg-indigo-600 text-white px-4 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 active:scale-95"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {["services", "programs", "consultation"].includes(sec.type) && (
                <div className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto bg-zinc-50/70">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Our Capabilities</span>
                    <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight mb-4">
                      {sec.content?.title || "Professional Services"}
                    </h2>
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                      {sec.content?.subtitle || "Tailored solutions designed to guarantee long-term value and absolute client assurance."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(sec.content?.services || []).map((serv, idx) => (
                      <div key={serv.id || idx} className="bg-white rounded-3xl border border-zinc-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group">
                        {serv.image && (
                          <div className="h-48 w-full relative overflow-hidden bg-zinc-100 shrink-0">
                            <img src={serv.image} alt={serv.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        )}
                        <div className="p-8 flex flex-col justify-between flex-1">
                          <div>
                            <div className="h-14 w-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                              <SectionIcon name={serv.icon || "Star"} className="h-7 w-7" />
                            </div>
                            <h3 className="font-extrabold text-zinc-900 text-lg mb-3">{serv.name}</h3>
                            <p className="text-zinc-600 text-sm leading-relaxed mb-6">{serv.description}</p>
                            {serv.features && (
                              <ul className="space-y-2 mb-6">
                                {serv.features.map((f, i) => (
                                  <li key={i} className="text-xs text-zinc-500 flex items-center gap-2">
                                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="pt-6 border-t border-zinc-100 flex items-center justify-between mt-auto">
                            <span className="font-extrabold text-zinc-900 text-base">{serv.price || "Custom Quote"}</span>
                            <a href="#booking" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                              <span>Inquire Now</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {["gallery", "showcase", "portfolio"].includes(sec.type) && (
                <div className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Visual Showcase</span>
                    <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight mb-4">
                      {sec.content?.title || "Project Portfolio"}
                    </h2>
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
                      {sec.content?.subtitle || "Explore our verified execution highlights and craftsmanship."}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(sec.content?.images || []).map((img, i) => (
                      <div 
                        key={i} 
                        className="relative h-60 md:h-72 rounded-2xl overflow-hidden cursor-pointer group shadow-md"
                        onClick={() => setLightboxImg(img.url)}
                      >
                        <img src={img.url} alt={`Highlight ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {["promotions", "offers"].includes(sec.type) && (
                <div className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                  <div className="bg-gradient-to-r from-indigo-900 via-zinc-900 to-indigo-950 rounded-3xl p-8 md:p-14 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl z-10">
                      <span className="bg-rose-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-4 shadow">
                        Limited Time Special
                      </span>
                      <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">{sec.content?.title || "Exclusive Member Offer"}</h2>
                      <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6">{sec.content?.subtitle || "Save up to 25% on our premier catalog items."}</p>
                      {sec.content?.code && (
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
                          <Tag className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs text-zinc-300">Use Promo Code:</span>
                          <span className="font-mono font-black text-white tracking-widest">{sec.content.code}</span>
                        </div>
                      )}
                    </div>
                    <a href={sec.content?.ctaLink || "#products"} className="bg-white hover:bg-zinc-100 text-zinc-900 font-extrabold px-8 py-4 rounded-2xl shadow-xl transition-all shrink-0 z-10 text-sm">
                      {sec.content?.ctaText || "Claim Discount"}
                    </a>
                  </div>
                </div>
              )}

              {["pricing", "memberships"].includes(sec.type) && (
                <div className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Investment Tiers</span>
                    <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight mb-4">{sec.content?.title || "Transparent Pricing"}</h2>
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">{sec.content?.subtitle || "Select the engagement plan aligned with your scale and goals."}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {(sec.content?.plans || []).map((plan, idx) => (
                      <div key={idx} className={`p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                        plan.isPopular ? "bg-zinc-900 text-white border-zinc-900 shadow-2xl scale-105 relative z-10" : "bg-white text-zinc-800 border-zinc-200 shadow-md"
                      }`}>
                        {plan.isPopular && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                            Most Popular
                          </span>
                        )}
                        <div>
                          <h3 className={`font-extrabold text-xl mb-2 ${plan.isPopular ? "text-white" : "text-zinc-900"}`}>{plan.name}</h3>
                          <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-black">{plan.price}</span>
                            <span className={`text-xs ${plan.isPopular ? "text-zinc-400" : "text-zinc-500"}`}>{plan.period}</span>
                          </div>
                          <ul className="space-y-3 mb-8">
                            {(plan.features || []).map((f, i) => (
                              <li key={i} className="text-xs flex items-center gap-2.5">
                                <Check className={`h-4 w-4 shrink-0 ${plan.isPopular ? "text-emerald-400" : "text-emerald-600"}`} />
                                <span className={plan.isPopular ? "text-zinc-300" : "text-zinc-600"}>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <a href="#booking" className={`w-full py-3.5 px-6 rounded-2xl font-bold text-center text-xs transition-all ${
                          plan.isPopular ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg" : "bg-zinc-100 hover:bg-zinc-200 text-zinc-900"
                        }`}>
                          Select Plan
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {["reviews", "testimonials", "case-studies", "success-stories"].includes(sec.type) && (
                <div className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto bg-zinc-50/70">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Social Proof</span>
                    <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight mb-4">{sec.content?.title || "Client Endorsements"}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(sec.content?.testimonials || []).map((item, i) => (
                      <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex gap-1 mb-4 text-amber-500">
                            {[...Array(item.rating || 5)].map((_, idx) => (
                              <Star key={idx} className="h-4 w-4 fill-amber-500" />
                            ))}
                          </div>
                          <p className="text-zinc-600 text-sm leading-relaxed italic mb-6">"{item.content}"</p>
                        </div>
                        <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                          {item.avatar && <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />}
                          <div>
                            <h4 className="font-bold text-zinc-900 text-xs">{item.name}</h4>
                            <span className="text-[11px] text-zinc-500 block">{item.role}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sec.type === "faq" && (
                <div className="py-20 md:py-28 px-4 md:px-8 max-w-4xl mx-auto">
                  <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Got Questions?</span>
                    <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight">{sec.content?.title || "Frequently Asked Questions"}</h2>
                  </div>
                  <div className="space-y-4">
                    {(sec.content?.faqs || []).map((faq, i) => {
                      const isOpen = openFaq === i;
                      return (
                        <div key={i} className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                          <button 
                            onClick={() => setOpenFaq(isOpen ? null : i)}
                            className="w-full p-6 text-left font-bold text-zinc-900 flex justify-between items-center text-sm md:text-base hover:bg-zinc-50 transition-colors"
                          >
                            <span>{faq.question}</span>
                            {isOpen ? <ChevronUp className="h-5 w-5 text-indigo-600" /> : <ChevronDown className="h-5 w-5 text-zinc-400" />}
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-6 pt-2 text-zinc-600 text-xs md:text-sm leading-relaxed border-t border-zinc-100">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {["contact", "booking", "locations"].includes(sec.type) && (
                <div className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-zinc-900 text-white rounded-3xl p-8 md:p-14 shadow-2xl">
                    <div>
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 block">Direct Assistance</span>
                      <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">{sec.content?.title || "Connect With Our Team"}</h2>
                      <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
                        {sec.content?.subtitle || "Have inquiries or want to schedule a private consultation? Reach out directly below."}
                      </p>

                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-white/10 rounded-2xl text-indigo-400 shrink-0">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-zinc-400 uppercase block">Headquarters</span>
                            <span className="text-sm font-semibold text-white">{sec.content?.address || "Prime Commercial District, Central Avenue"}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-white/10 rounded-2xl text-indigo-400 shrink-0">
                            <Mail className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-zinc-400 uppercase block">Email Address</span>
                            <span className="text-sm font-semibold text-white">{sec.content?.email || "contact@business.com"}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-white/10 rounded-2xl text-indigo-400 shrink-0">
                            <Phone className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-zinc-400 uppercase block">Phone / WhatsApp</span>
                            <span className="text-sm font-semibold text-white">{sec.content?.phone || "+91 98765 43210"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        triggerToast("Thank you! Your inquiry has been submitted successfully.");
                        e.target.reset();
                      }}
                      className="bg-white text-zinc-800 p-8 rounded-3xl shadow-xl flex flex-col gap-4 justify-between"
                    >
                      <h3 className="font-extrabold text-zinc-900 text-xl mb-2">Send Inquiry / Schedule</h3>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">Full Name</label>
                        <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-indigo-600" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">Email Address</label>
                        <input required type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-indigo-600" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">Message / Requirements</label>
                        <textarea required rows="4" placeholder="Describe what you need..." className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-indigo-600"></textarea>
                      </div>
                      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-600/20 transition-all text-sm mt-2 flex items-center justify-center gap-2">
                        <Send className="h-4 w-4" />
                        <span>Submit Inquiry</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </main>

      {/* FOOTER */}
      {(sections.find(s => s.type === "footer") || true) && (
        <footer className="bg-zinc-950 text-white py-16 px-4 md:px-8 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              {(theme.logo?.url || websiteJSON.logo?.url || websiteJSON.logoUrl) ? (
                <div className="h-12 max-w-[220px] mb-4 flex items-center">
                  <img src={theme.logo?.url || websiteJSON.logo?.url || websiteJSON.logoUrl} alt={theme.logo?.text || "Brand Logo"} className="h-full w-auto object-contain" />
                </div>
              ) : (
                <span className="font-black text-2xl tracking-tight text-white mb-3 block">
                  {theme.logo?.text || websiteJSON.meta?.title || "My Business"}
                </span>
              )}
              <p className="text-zinc-400 text-xs md:text-sm max-w-sm leading-relaxed mb-6">
                {websiteJSON.meta?.description || "Authoritative online presence and premier domain standards tailored around your commercial expectations."}
              </p>
              <div className="flex items-center gap-3">
                {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((net) => (
                  <a key={net} href="#" className="h-9 w-9 rounded-xl bg-zinc-900 hover:bg-indigo-600 border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300 hover:text-white transition-all">
                    {net[0]}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-sm text-white uppercase tracking-wider block mb-4">Quick Navigation</span>
              <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
                {sections.filter(s => s.visible !== false && s.type !== "hero" && s.type !== "footer").map((sec) => (
                  <li key={`foot_${sec.id}`}>
                    <a href={`#${sec.id}`} className="hover:text-white transition-colors capitalize">
                      {sec.content?.title || sec.type}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold text-sm text-white uppercase tracking-wider block mb-4">Stay Informed</span>
              <p className="text-xs text-zinc-400 mb-3">Subscribe to receive exclusive insights and updates.</p>
              <form onSubmit={(e) => { e.preventDefault(); triggerToast("Successfully subscribed to newsletter!"); e.target.reset(); }} className="flex gap-2">
                <input required type="email" placeholder="Your email..." className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-600" />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all">Join</button>
              </form>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <span>© {new Date().getFullYear()} {theme.logo?.text || websiteJSON.meta?.title || "Brand"}. All rights reserved.</span>
            <div className="flex items-center gap-2">
              <span>Engineered with</span>
              <span className="font-bold text-zinc-400">SITEFORGE AI</span>
            </div>
          </div>
        </footer>
      )}

      {/* --- PRODUCT DETAILS & QUICK VIEW MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-zinc-200 shadow-2xl relative text-zinc-900 flex flex-col md:flex-row overflow-hidden">
            
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 z-20 h-10 w-10 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-full flex items-center justify-center transition-all shadow-md"
              title="Close Product Modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Column: Product Gallery Showcase */}
            <div className="md:w-1/2 bg-zinc-100 p-6 md:p-8 flex flex-col justify-between relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-inner mb-4">
                {selectedProduct.image ? (
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400 font-medium text-sm">No Image Available</div>
                )}
                {selectedProduct.badge && (
                  <span className="absolute top-3 left-3 bg-zinc-900 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    {selectedProduct.badge}
                  </span>
                )}
                {selectedProduct.discount && (
                  <span className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                    {selectedProduct.discount}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-emerald-600" /> {selectedProduct.availability || "In Stock"} ({selectedProduct.stock || "24"} units)</span>
                <span className="font-mono text-[11px]">SKU: {selectedProduct.sku || "SF-8842"}</span>
              </div>
            </div>

            {/* Right Column: Product Information & Action Controls */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{selectedProduct.category || "Featured Selection"}</span>
                  <button
                    onClick={() => {
                      const isWished = wishlistIds.includes(selectedProduct.id);
                      if (isWished) {
                        setWishlistIds(wishlistIds.filter(id => id !== selectedProduct.id));
                        triggerToast(`Removed "${selectedProduct.name}" from wishlist`);
                      } else {
                        setWishlistIds([...wishlistIds, selectedProduct.id]);
                        triggerToast(`Added "${selectedProduct.name}" to wishlist! ❤️`);
                      }
                    }}
                    className={`p-2 rounded-full border transition-all ${
                      wishlistIds.includes(selectedProduct.id)
                        ? "bg-rose-50 border-rose-200 text-rose-600"
                        : "bg-zinc-50 border-zinc-200 text-zinc-400 hover:text-rose-500"
                    }`}
                    title="Add to Wishlist"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight mb-2 leading-tight">
                  {selectedProduct.name}
                </h2>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-black text-indigo-600">{selectedProduct.price}</span>
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-xs font-bold">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>4.9 (48 reviews)</span>
                  </div>
                </div>

                {/* Tab Switcher (Description / Specs / Reviews) */}
                <div className="flex border-b border-zinc-200 mb-4 gap-4 text-xs font-bold">
                  <button
                    onClick={() => setQuickViewTab("desc")}
                    className={`py-2 border-b-2 transition-colors ${quickViewTab === "desc" ? "border-indigo-600 text-indigo-600" : "border-transparent text-zinc-400 hover:text-zinc-700"}`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setQuickViewTab("specs")}
                    className={`py-2 border-b-2 transition-colors ${quickViewTab === "specs" ? "border-indigo-600 text-indigo-600" : "border-transparent text-zinc-400 hover:text-zinc-700"}`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setQuickViewTab("reviews")}
                    className={`py-2 border-b-2 transition-colors ${quickViewTab === "reviews" ? "border-indigo-600 text-indigo-600" : "border-transparent text-zinc-400 hover:text-zinc-700"}`}
                  >
                    Customer Reviews
                  </button>
                </div>

                {quickViewTab === "desc" && (
                  <p className="text-zinc-600 text-xs md:text-sm leading-relaxed mb-4">
                    {selectedProduct.description || "Crafted from high-grade verified components and engineered specifically to exceed professional demands with lasting structural integrity."}
                  </p>
                )}

                {quickViewTab === "specs" && (
                  <div className="space-y-2 mb-4 text-xs">
                    {(selectedProduct.features || [
                      "Verified for reliability and high performance",
                      "Premium finish with lasting structural durability",
                      "Includes priority technical and client assistance",
                      "Engineered specifically for daily professional demands"
                    ]).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-zinc-600">
                        <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {quickViewTab === "reviews" && (
                  <div className="space-y-3 mb-4 text-xs max-h-36 overflow-y-auto pr-1">
                    <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 space-y-1">
                      <div className="flex items-center justify-between font-bold text-zinc-800">
                        <span>David M. (Verified Buyer)</span>
                        <span className="text-amber-500">★★★★★</span>
                      </div>
                      <p className="text-zinc-600">"Exceptional quality! Exceeded my expectations right out of the box. Highly recommend for any business professional."</p>
                    </div>
                    <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 space-y-1">
                      <div className="flex items-center justify-between font-bold text-zinc-800">
                        <span>Priyanka S. (Verified Buyer)</span>
                        <span className="text-amber-500">★★★★★</span>
                      </div>
                      <p className="text-zinc-600">"The best in its class. Exactly what our company needed for our daily operations."</p>
                    </div>
                  </div>
                )}

                {/* Variant Configuration Selector */}
                <div className="space-y-2 mb-6">
                  <label className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider block">Select Configuration / Variant:</label>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProduct.variants || ["Standard Configuration", "Performance Package", "Deluxe Edition"]).map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          selectedVariant === v
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                            : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:border-zinc-300"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity Selector + Add to Cart + Buy Now Controls */}
              <div className="space-y-3 pt-4 border-t border-zinc-100">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center border border-zinc-200 rounded-2xl bg-zinc-50 p-1 shrink-0">
                    <button
                      onClick={() => setQuickViewQty(Math.max(1, quickViewQty - 1))}
                      className="h-9 w-9 rounded-xl bg-white hover:bg-zinc-100 text-zinc-700 font-bold flex items-center justify-center shadow-sm transition-all"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-zinc-900">{quickViewQty}</span>
                    <button
                      onClick={() => setQuickViewQty(quickViewQty + 1)}
                      className="h-9 w-9 rounded-xl bg-white hover:bg-zinc-100 text-zinc-700 font-bold flex items-center justify-center shadow-sm transition-all"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart({ ...selectedProduct, selectedVariant }, quickViewQty);
                      triggerToast(`Added ${quickViewQty} × "${selectedProduct.name}" to cart!`);
                    }}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 px-4 rounded-2xl font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart({ ...selectedProduct, selectedVariant }, quickViewQty);
                    setSelectedProduct(null);
                    setCartOpen(true);
                  }}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3.5 rounded-2xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Buy Now — Instant Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Related Products Switcher */}
              <div className="pt-4 border-t border-zinc-100">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">Related Items</span>
                <div className="grid grid-cols-3 gap-2">
                  {(sections.find(s => ["products", "collections", "catalog", "featured-products"].includes(s.type))?.content?.products || [])
                    .filter(p => p.id !== selectedProduct.id)
                    .slice(0, 3)
                    .map((rel, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleOpenQuickView(rel)}
                        className="p-1.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-indigo-50/50 cursor-pointer transition-all flex items-center gap-2 group"
                      >
                        {rel.image && <img src={rel.image} alt={rel.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />}
                        <div className="overflow-hidden">
                          <p className="text-[10px] font-bold text-zinc-800 truncate group-hover:text-indigo-600">{rel.name}</p>
                          <span className="text-[9px] text-zinc-500 font-mono block">{rel.price}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
