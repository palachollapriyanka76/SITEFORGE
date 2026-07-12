import React from "react";
import { Star, Clock, MapPin, Award, Check } from "lucide-react";

const getImg = (url) => url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80";

// ==========================================
// 1. LUXURY RESTAURANT TEMPLATE
// ==========================================
export function LuxuryRestaurantTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  const primaryColor = theme?.primaryColor || "#7F1D1D";
  const fontClass = "font-serif";

  return (
    <div className={`${fontClass} bg-stone-950 text-stone-200 min-h-screen relative selection:bg-amber-700 selection:text-white`}>
      {/* Elegantly spaced navbar */}
      <nav className="border-b border-stone-800 px-12 py-6 flex justify-between items-center bg-stone-950">
        <span className="text-lg tracking-widest uppercase font-extrabold text-amber-500">Maison De L'Amour</span>
        <div className="flex gap-8 text-[10px] tracking-widest uppercase text-stone-400 font-bold">
          <span className="hover:text-amber-500 cursor-pointer">Cuisine</span>
          <span className="hover:text-amber-500 cursor-pointer">Cellar</span>
          <span className="hover:text-amber-500 cursor-pointer">Reservations</span>
        </div>
      </nav>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          {/* Asymmetrical luxury layout */}
          <header className="relative py-32 px-12 md:px-24 flex items-center justify-between text-left border-b border-stone-900">
            <div className="max-w-2xl space-y-6 relative z-10">
              <span className="text-xs text-amber-500 uppercase tracking-widest block font-bold">★ THREE MICHELIN STARS</span>
              <h1 className="text-4xl md:text-6xl font-black leading-tight text-white">
                Symphony of <br />
                <span className="text-amber-500 italic">Exquisite Flavors</span>
              </h1>
              <p className="text-xs text-stone-400 leading-relaxed font-light max-w-lg">
                Experience high gastronomy curated by Chef Damien Roux. Modern French techniques meet hand-harvested ingredients in an atmosphere of candlelit luxury.
              </p>
              <div className="pt-4">
                <button onClick={() => triggerToast("Table booking opened")} className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black uppercase text-[10px] tracking-widest transition-colors">Request Reservation</button>
              </div>
            </div>
            <div className="hidden lg:block w-[400px] h-[500px] bg-stone-900 p-2 shadow-2xl relative z-10 border border-stone-800">
              <img src={getImg("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80")} alt="Fine Dining Dish" className="w-full h-full object-cover" />
            </div>
          </header>

          <section className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center text-left">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-extrabold text-white">The Culinary Ethos</h2>
              <p className="text-xs text-stone-400 leading-relaxed">
                Maison De L'Amour celebrates the pure soul of ingredients. Chef Roux crafts an ever-evolving menu that honors the seasonal micro-farms of Pune, with each plate meticulously balanced for texture, temperature, and visual grace.
              </p>
            </div>
            <div className="flex-1 aspect-[4/3] bg-stone-900 overflow-hidden relative">
              <img src={getImg("https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80")} alt="Dining hall" className="w-full h-full object-cover opacity-80" />
            </div>
          </section>
        </>
      ) : null}

      {activeTab === "home" || activeTab === "services" ? (
        <>
          {/* Elegant Cellar/Menu display */}
          <section className="py-24 px-8 bg-stone-900/40 border-y border-stone-900">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-2">
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">GASTRONOMIC SELECTIONS</span>
                <h2 className="text-3xl font-extrabold text-white">Le Menu Dégustation</h2>
              </div>
              <div className="space-y-6">
                {[
                  { name: "Pan-Seared Foie Gras", price: "Rs. 1,800", desc: "Served with spiced plum compote, toasted artisanal brioche, and aged balsamic reduction." },
                  { name: "Butter-Poached Lobster Tail", price: "Rs. 2,900", desc: "Saffron-infused fennel purée, wild mushroom confit, and organic micro-herbs." }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b border-stone-850 pb-6 text-left">
                    <div className="space-y-2">
                      <span className="text-[9px] text-amber-500 uppercase tracking-widest font-bold">COURSE // 0{idx + 1}</span>
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      <p className="text-xs text-stone-400 font-light leading-relaxed">{item.desc}</p>
                    </div>
                    <span className="text-sm font-extrabold text-amber-500 shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      <footer className="py-12 bg-black text-stone-600 text-xs text-center border-t border-stone-900">
        <div className="max-w-4xl mx-auto space-y-4">
          <p>© 2026 Maison De L'Amour. Michelin Starred. Powered by SiteForge.</p>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// 2. MODERN RESTAURANT TEMPLATE
// ==========================================
export function ModernRestaurantTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-sans bg-slate-900 text-slate-100 min-h-screen relative selection:bg-cyan-500 selection:text-black">
      <nav className="px-8 py-5 flex justify-between items-center border-b border-slate-800 bg-slate-950">
        <span className="text-lg font-black tracking-tight bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">NEON KITCHEN</span>
        <button onClick={() => triggerToast("QR Code Menu")} className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl text-black font-black uppercase text-[10px] tracking-wider">Scan Menu</button>
      </nav>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <header className="py-24 px-6 text-center bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent relative">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="px-3 py-1 bg-slate-800 text-cyan-400 rounded-full text-[10px] font-black uppercase tracking-wider">🔥 FAST CASUAL, HIGH VIBE</span>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-white">
                BOLD STREET FOOD <br />
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">INFUSED WITH SOUL</span>
              </h1>
              <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
                We design explosive flavor bombs. Fresh tacos, loaded fries, and craft sodas delivered with neon aesthetics.
              </p>
            </div>
          </header>
        </>
      ) : null}

      {activeTab === "home" || activeTab === "services" ? (
        <>
          <section className="py-16 bg-slate-950">
            <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: "Dynamite Tacos", price: "Rs. 320", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80" },
                { name: "Volcano Loaded Fries", price: "Rs. 280", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80" }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex hover:border-cyan-500/30 transition-all">
                  <div className="w-32 bg-slate-800 overflow-hidden relative">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 text-left flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-black text-white">{item.name}</h3>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">Spiced beef, fresh jalapeño rings, lime drizzle.</p>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-xs font-black text-cyan-400">{item.price}</span>
                      <button onClick={() => triggerToast(`Added ${item.name}`)} className="text-[10px] font-black uppercase text-emerald-400">Add Item</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}

      <footer className="py-8 bg-slate-950 text-slate-600 text-xs text-center border-t border-slate-900">
        <span>© 2026 Neon Kitchen. Designed with SiteForge.</span>
      </footer>
    </div>
  );
}

// ==========================================
// 3. VINTAGE RESTAURANT TEMPLATE
// ==========================================
export function VintageRestaurantTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-serif bg-[#FAF5EC] text-amber-950 min-h-screen border-4 border-amber-900 relative">
      <header className="border-b-2 border-amber-900 px-6 py-8 text-center bg-[#FDF9F2]">
        <h1 className="text-3xl font-black uppercase tracking-widest text-amber-950">CORNERSTONE DINER</h1>
        <p className="text-[10px] font-bold tracking-widest text-amber-800 mt-2">CLASSIC BLUE PLATE SPECIALS SINCE 1952</p>
      </header>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <section className="py-16 px-6 max-w-4xl mx-auto border-b border-amber-900/30 text-center space-y-6">
            <h2 className="text-3xl font-black uppercase">Homestyle Cooking at Its Best</h2>
            <div className="w-12 h-0.5 bg-amber-900 mx-auto" />
            <p className="text-xs text-amber-900 leading-relaxed italic max-w-xl mx-auto">
              Welcome back to the table. Our family recipes have remained untouched for over 70 years, serving hand-carved ham, homemade cherry pies, and endless cups of fresh drip coffee.
            </p>
          </section>
        </>
      ) : null}

      <footer className="py-8 bg-amber-950 text-amber-100 text-center text-xs">
        <span>© 2026 Cornerstone Diner. A SiteForge Retro Classic.</span>
      </footer>
    </div>
  );
}

// ==========================================
// 4. ARTISAN RESTAURANT TEMPLATE
// ==========================================
export function ArtisanRestaurantTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-sans bg-stone-55 text-stone-850 min-h-screen relative">
      <nav className="px-8 py-6 flex justify-between items-center max-w-6xl mx-auto">
        <span className="text-lg font-black tracking-wide text-stone-900">Roots & Shoots</span>
        <button onClick={() => triggerToast("View Farms Map")} className="text-xs font-bold text-stone-900 border-b border-stone-950">Farmer Network</button>
      </nav>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <header className="py-20 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
            <div className="space-y-6">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">🌱 FARM-TO-TABLE ESTABLISHMENT</span>
              <h1 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
                Honest Ingredients, <br />
                <span className="text-emerald-800">Sown and Harvested</span>
              </h1>
              <p className="text-sm text-stone-600 leading-relaxed">
                We follow the soil. Every element in our daily menus originates from certified sustainable, bio-diverse organic plots in the Western Ghats.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-xl">
              <img src={getImg("https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80")} alt="Fresh salad" className="w-full h-full object-cover" />
            </div>
          </header>
        </>
      ) : null}

      <footer className="py-8 bg-stone-900 text-stone-400 text-xs text-center mt-12">
        <span>© 2026 Roots & Shoots. Handcrafted via SiteForge.</span>
      </footer>
    </div>
  );
}

// ==========================================
// 5. MINIMAL RESTAURANT TEMPLATE
// ==========================================
export function MinimalRestaurantTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-mono bg-white text-black min-h-screen p-8 text-left leading-normal selection:bg-black selection:text-white">
      <header className="border-b border-black pb-4 flex justify-between items-center">
        <span className="font-black text-sm uppercase">S U S H I -- B A R</span>
        <span className="text-[10px]">TRIAL MENU ONLY</span>
      </header>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <section className="py-16 border-b border-black">
            <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6">
              RAW INGREDIENTS.<br />
              NO SAUCES.<br />
              SEASONS ONLY.
            </h1>
            <p className="text-xs text-zinc-650 max-w-md leading-relaxed">
              We focus purely on bluefin tuna, sea urchin, and aged rice vinegar. Absolutely minimal preparation.
            </p>
          </section>
        </>
      ) : null}

      <footer className="border-t border-black pt-8 text-[9px] text-zinc-400 mt-16 flex justify-between">
        <span>© 2026 SUSHI BAR. ALL RIGHTS RESERVED.</span>
      </footer>
    </div>
  );
}
