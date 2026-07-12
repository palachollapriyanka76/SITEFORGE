import React from "react";
import { Star, Monitor, Cpu, ShieldCheck, Zap } from "lucide-react";

const getImg = (url) => url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80";

// ==========================================
// 1. LUXURY ELECTRONICS TEMPLATE
// ==========================================
export function LuxuryElectronicsTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-serif bg-zinc-950 text-zinc-100 min-h-screen relative selection:bg-amber-600 selection:text-white">
      <nav className="border-b border-zinc-800 px-8 py-5 flex justify-between items-center bg-zinc-950">
        <span className="text-xl tracking-widest uppercase text-white font-extrabold">APEX AUDIO</span>
        <div className="flex gap-8 text-[10px] tracking-widest uppercase text-zinc-400 font-bold">
          <span className="hover:text-amber-500 cursor-pointer">Acoustics</span>
          <span className="hover:text-amber-500 cursor-pointer">Theater</span>
          <span className="hover:text-amber-500 cursor-pointer">Consultations</span>
        </div>
      </nav>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <header className="relative py-32 px-12 md:px-24 flex items-center justify-between text-left">
            <div className="max-w-2xl space-y-6 relative z-10">
              <span className="text-xs text-amber-500 uppercase tracking-widest block font-bold">★ BESPOKE HI-FI SYSTEM ARCHITECTURE</span>
              <h1 className="text-4xl md:text-6xl font-black leading-tight text-white">
                Bespoke Acoustic <br />
                <span className="text-amber-500 italic">Masterpieces</span>
              </h1>
              <p className="text-xs text-zinc-400 leading-relaxed font-light max-w-lg">
                Crafting luxury statement soundscapes. Apex Audio merges gold-accented materials with reference-grade smart home theaters.
              </p>
              <div className="pt-4">
                <button onClick={() => triggerToast("Acoustic consultation booked")} className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase text-[10px] tracking-widest transition-colors">Book Acoustics Design</button>
              </div>
            </div>
            <div className="hidden lg:block w-[400px] h-[500px] bg-zinc-900 p-2 shadow-2xl relative z-10 border border-zinc-800">
              <img src={getImg("https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80")} alt="Hi-Fi Speaker" className="w-full h-full object-cover" />
            </div>
          </header>
        </>
      ) : null}

      {activeTab === "home" || activeTab === "services" ? (
        <>
          <section className="py-24 bg-zinc-900">
            <div className="max-w-5xl mx-auto px-6 space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-white">Audiophile Configurations</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: "Reference Gold Tower Series", price: "Rs. 8,50,000", desc: "Solid timber cabinet, custom ribbon tweeter, reference crossover design." },
                  { name: "Apex Signature Monoblocks", price: "Rs. 6,20,000", desc: "Pure Class-A amplification, custom toroidal transformers, gold binding posts." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-zinc-950 border border-zinc-800 p-8 text-left rounded-3xl hover:border-amber-500/20 transition-all">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      <span className="text-sm font-extrabold text-amber-505">{item.price}</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      <footer className="py-12 bg-black text-zinc-600 text-xs text-center border-t border-zinc-900">
        <span>© 2026 Apex Audio. References built via SiteForge.</span>
      </footer>
    </div>
  );
}

// ==========================================
// 2. MODERN ELECTRONICS TEMPLATE
// ==========================================
export function ModernElectronicsTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-sans bg-slate-950 text-slate-100 min-h-screen relative selection:bg-cyan-500 selection:text-black">
      <nav className="px-8 py-5 flex justify-between items-center border-b border-slate-800 bg-slate-900">
        <span className="text-lg font-black tracking-tight text-cyan-400">GADGET LAB</span>
        <button onClick={() => triggerToast("View Cart")} className="px-4 py-2 bg-cyan-500 rounded-xl text-black font-black uppercase text-[10px] tracking-wider">Checkout</button>
      </nav>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <header className="py-24 px-6 text-center bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent">
            <div className="max-w-2xl mx-auto space-y-6">
              <span className="px-3 py-1 bg-slate-800 text-cyan-400 rounded-full text-[10px] font-black uppercase tracking-wider">🔥 RGB SMART SETUP</span>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none text-white">
                NEXT-GEN TECH <br />
                <span className="text-cyan-400">POWERING LABS</span>
              </h1>
              <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                Smart mechanical keypads, modular desks, and high-performance monitors configured for ultimate coder workspaces.
              </p>
            </div>
          </header>
        </>
      ) : null}

      <footer className="py-8 bg-slate-900 text-slate-600 text-xs text-center border-t border-slate-800">
        <span>© 2026 Gadget Lab. Powered by SiteForge.</span>
      </footer>
    </div>
  );
}

// ==========================================
// 3. VINTAGE ELECTRONICS TEMPLATE
// ==========================================
export function VintageElectronicsTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-serif bg-[#FBF9F3] text-stone-900 min-h-screen border-4 border-stone-800 relative">
      <header className="border-b-2 border-stone-850 px-6 py-8 text-center bg-[#FCFAF5]">
        <h1 className="text-3xl font-black uppercase tracking-widest">RETRO SOUND RECORDS</h1>
        <p className="text-[10px] font-bold tracking-widest text-stone-650 mt-2">CLASSIC HI-FI PHONOGRAPHS & RECORD REPAIR SINCE 1968</p>
      </header>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <section className="py-16 px-6 max-w-4xl mx-auto border-b border-stone-300 text-center space-y-6">
            <h2 className="text-3xl font-black uppercase">Vintage Tube Amplifiers & Turntables</h2>
            <div className="w-12 h-0.5 bg-stone-800 mx-auto" />
            <p className="text-xs text-stone-650 leading-relaxed italic max-w-xl mx-auto">
              Bring your records back to life. We restore tube audio setups, realign tonearms, and offer a hand-curated selection of vintage vinyl presses.
            </p>
          </section>
        </>
      ) : null}

      <footer className="py-8 bg-stone-900 text-stone-100 text-center text-xs">
        <span>© 2026 Retro Sound Records. SiteForge Vintage Audio.</span>
      </footer>
    </div>
  );
}

// ==========================================
// 4. ARTISAN ELECTRONICS TEMPLATE
// ==========================================
export function ArtisanElectronicsTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-sans bg-stone-55 text-stone-850 min-h-screen relative">
      <nav className="px-8 py-6 flex justify-between items-center max-w-6xl mx-auto">
        <span className="text-lg font-black tracking-wide text-amber-900">Custom Keebs</span>
        <button onClick={() => triggerToast("View Custom Cable Builder")} className="text-xs font-bold text-amber-900 border-b border-amber-950">Cable Builder</button>
      </nav>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <header className="py-20 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
            <div className="space-y-6">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">⌨ HANDMADE MECHANICAL KEYBOARDS</span>
              <h1 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
                Lubed Switches, <br />
                <span className="text-amber-850">Hand-Soldered Boards</span>
              </h1>
              <p className="text-sm text-stone-600 leading-relaxed">
                Tuned stabilizers, premium brass plates, and high-fidelity switches. The absolute finest tactile experience available.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-xl">
              <img src={getImg("https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80")} alt="Keyboards" className="w-full h-full object-cover" />
            </div>
          </header>
        </>
      ) : null}

      <footer className="py-8 bg-stone-900 text-stone-400 text-xs text-center mt-12">
        <span>© 2026 Custom Keebs. Handcrafted utilizing SiteForge.</span>
      </footer>
    </div>
  );
}

// ==========================================
// 5. MINIMAL ELECTRONICS TEMPLATE
// ==========================================
export function MinimalElectronicsTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-mono bg-white text-black min-h-screen p-8 text-left leading-normal selection:bg-black selection:text-white">
      <header className="border-b border-black pb-4 flex justify-between items-center">
        <span className="font-black text-sm uppercase">P O C K E T -- T E C H</span>
        <span className="text-[10px]">EDITION 01</span>
      </header>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <section className="py-16 border-b border-black">
            <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6">
              MINIMAL CHARGERS.<br />
              HIGH CURRENT.<br />
              PURE GLASS.
            </h1>
            <p className="text-xs text-zinc-650 max-w-md leading-relaxed">
              We design chargers that stay invisible. Raw gallium nitride chips, pure heat sink shells. Nothing more.
            </p>
          </section>
        </>
      ) : null}

      <footer className="border-t border-black pt-8 text-[9px] text-zinc-400 mt-16 flex justify-between">
        <span>© 2026 POCKET TECH. ALL RIGHTS PRESERVED.</span>
      </footer>
    </div>
  );
}
