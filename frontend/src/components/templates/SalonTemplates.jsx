import React from "react";
import { Star, Sparkles, Scissors, Heart, Calendar } from "lucide-react";

const getImg = (url) => url || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80";

// ==========================================
// 1. LUXURY SALON TEMPLATE
// ==========================================
export function LuxurySalonTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  const fontClass = "font-serif";

  return (
    <div className={`${fontClass} bg-stone-50 text-stone-900 min-h-screen relative selection:bg-amber-800 selection:text-white`}>
      <nav className="border-b border-amber-900/10 px-8 py-5 flex justify-between items-center bg-stone-50">
        <span className="text-xl tracking-widest uppercase text-stone-900">AURA MEDISPA</span>
        <div className="flex gap-8 text-[10px] tracking-widest uppercase text-stone-600 font-bold">
          <span className="hover:text-amber-800 cursor-pointer">Rituals</span>
          <span className="hover:text-amber-800 cursor-pointer">Wellness</span>
          <span className="hover:text-amber-800 cursor-pointer">Appointments</span>
        </div>
      </nav>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <header className="relative py-28 px-12 text-center bg-stone-900 text-white min-h-[500px]">
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <span className="text-[10px] tracking-widest uppercase text-amber-500 font-bold">AN OASIS OF TRANQUILITY</span>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Holistic Skincare <br />
                <span className="text-amber-500 italic">& Renewal Rituals</span>
              </h1>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Indulge in botanical facials, customized body treatments, and therapeutic massage rituals designed to restore inner balance.
              </p>
              <div className="pt-4">
                <button onClick={() => triggerToast("Appointment request initiated")} className="px-8 py-4 bg-transparent border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-stone-950 font-bold uppercase tracking-widest text-[10px] transition-all">Book Ritual</button>
              </div>
            </div>
            <div className="absolute inset-0 bg-stone-950/75 z-0" />
            <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${getImg("https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80")})` }} />
          </header>
        </>
      ) : null}

      {activeTab === "home" || activeTab === "services" ? (
        <>
          <section className="py-24 bg-stone-100">
            <div className="max-w-5xl mx-auto px-6 space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold">Signature Spa Rituals</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: "Himalayan Salt Therapy", price: "Rs. 2,400", time: "75 Mins", desc: "Warm stone pressure, therapeutic salt scrub, aromatherapy oils." },
                  { name: "Deep Oxygen Facial", price: "Rs. 3,800", time: "60 Mins", desc: "Pure oxygen mist infusion, micro-nutrient serum, lifting massage." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-amber-900/10 p-8 text-left rounded-3xl hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-stone-900">{item.name}</h3>
                      <span className="text-sm font-extrabold text-amber-800">{item.price}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 font-mono block mt-1">{item.time}</span>
                    <p className="text-xs text-stone-500 mt-4 leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      <footer className="py-12 bg-stone-950 text-stone-500 text-xs text-center border-t border-amber-900/10">
        <span>© 2026 Aura Medispa. Powered by SiteForge.</span>
      </footer>
    </div>
  );
}

// ==========================================
// 2. MODERN SALON TEMPLATE
// ==========================================
export function ModernSalonTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-sans bg-white text-slate-800 min-h-screen relative selection:bg-purple-500 selection:text-white">
      <nav className="sticky top-0 bg-white/90 backdrop-blur px-6 py-4 flex justify-between items-center border-b border-slate-100 z-20">
        <span className="font-black text-sm tracking-tight text-purple-600">STRETCH & STYLE</span>
        <button onClick={() => triggerToast("Book Appointment")} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-bold text-[10px] tracking-wider uppercase">Book Seat</button>
      </nav>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <header className="py-24 px-6 text-center bg-gradient-to-b from-purple-500/10 via-transparent to-transparent">
            <div className="max-w-2xl mx-auto space-y-6">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[10px] font-black uppercase tracking-wider">⚡ VIBRANT STYLE LAB</span>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none text-slate-900">
                TRENDSETTING <br />
                <span className="text-purple-600">HAIR DESIGN</span>
              </h1>
              <p className="text-slate-600 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                We break the rules. Bright pastels, sharp crops, and precision styling. Book your session to transform your look.
              </p>
            </div>
          </header>
        </>
      ) : null}

      <footer className="py-8 bg-slate-950 text-slate-600 text-xs text-center border-t border-slate-900">
        <span>© 2026 Stretch & Style. Designed with SiteForge.</span>
      </footer>
    </div>
  );
}

// ==========================================
// 3. VINTAGE SALON TEMPLATE
// ==========================================
export function VintageSalonTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-serif bg-[#F4EFE6] text-stone-900 min-h-screen border-4 border-stone-800 relative">
      <header className="border-b-2 border-stone-850 px-6 py-8 text-center bg-[#FAF6F0]">
        <h1 className="text-3xl font-black uppercase tracking-widest">OLD WHISKERS BARBERSHOP</h1>
        <p className="text-[10px] font-bold tracking-widest text-stone-650 mt-2">CLASSIC SHAVES & GENTLEMEN'S HAIRCUTS SINCE 1934</p>
      </header>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <section className="py-16 px-6 max-w-4xl mx-auto border-b border-stone-300 text-center space-y-6">
            <h2 className="text-3xl font-black uppercase">Traditional Shaving & Grooming</h2>
            <div className="w-12 h-0.5 bg-stone-800 mx-auto" />
            <p className="text-xs text-stone-650 leading-relaxed italic max-w-xl mx-auto">
              Step back into the chair. We specialize in hot towel straight-razor shaves, beard oils, and traditional pompadour trims using vintage grooming tonics.
            </p>
          </section>
        </>
      ) : null}

      <footer className="py-8 bg-stone-900 text-stone-100 text-center text-xs">
        <span>© 2026 Old Whiskers. A SiteForge Retro Barber Shop.</span>
      </footer>
    </div>
  );
}

// ==========================================
// 4. ARTISAN SALON TEMPLATE
// ==========================================
export function ArtisanSalonTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-sans bg-stone-55 text-stone-850 min-h-screen relative">
      <nav className="px-8 py-6 flex justify-between items-center max-w-6xl mx-auto">
        <span className="text-lg font-black tracking-wide text-green-900">Green Leaf Spa</span>
        <button onClick={() => triggerToast("View Rituals List")} className="text-xs font-bold text-green-900 border-b border-green-950">Apothecary</button>
      </nav>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <header className="py-20 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
            <div className="space-y-6">
              <span className="text-xs font-bold text-green-800 uppercase tracking-widest block">🌿 ORGANIC BEAUTY STUDIO</span>
              <h1 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
                Botanical Skincare <br />
                <span className="text-green-800">and Organic Care</span>
              </h1>
              <p className="text-sm text-stone-600 leading-relaxed">
                Handcrafted masks and organic botanical skincare. Pure botanical therapy matching plant-based standards.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-xl">
              <img src={getImg("https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80")} alt="Botanicals" className="w-full h-full object-cover" />
            </div>
          </header>
        </>
      ) : null}

      <footer className="py-8 bg-stone-900 text-stone-400 text-xs text-center mt-12">
        <span>© 2026 Green Leaf Spa. Handcrafted via SiteForge.</span>
      </footer>
    </div>
  );
}

// ==========================================
// 5. MINIMAL SALON TEMPLATE
// ==========================================
export function MinimalSalonTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-mono bg-white text-black min-h-screen p-8 text-left leading-normal selection:bg-black selection:text-white">
      <header className="border-b border-black pb-4 flex justify-between items-center">
        <span className="font-black text-sm uppercase">N A I L -- S T U D I O</span>
        <span className="text-[10px]">TRIAL DESIGNS ONLY</span>
      </header>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <section className="py-16 border-b border-black">
            <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6">
              EXPRESS SERVICE.<br />
              SOLID COLORING.<br />
              NO NAIL ART.
            </h1>
            <p className="text-xs text-zinc-650 max-w-md leading-relaxed">
              We focus on clean cuticles, protective oils, and single solid shades. Clean and simple.
            </p>
          </section>
        </>
      ) : null}

      <footer className="border-t border-black pt-8 text-[9px] text-zinc-400 mt-16 flex justify-between">
        <span>© 2026 NAIL STUDIO. ALL RIGHTS RESERVED.</span>
      </footer>
    </div>
  );
}
