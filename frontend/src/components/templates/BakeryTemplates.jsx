import React from "react";
import { Star, Phone, Mail, MapPin, ChevronRight, Play } from "lucide-react";

// Helper to optimize image urls if needed
const getImg = (url) => url || "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80";

// ==========================================
// 1. LUXURY BAKERY TEMPLATE
// ==========================================
export function LuxuryBakeryTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  const primaryColor = theme?.primaryColor || "#7F1D1D";
  const accentColor = theme?.accentColor || "#D97706";
  const fontClass = "font-serif";

  return (
    <div className={`${fontClass} bg-stone-50 text-stone-900 min-h-screen relative`}>
      {/* Unique Navigation Header */}
      <nav className="border-b border-amber-900/10 px-8 py-5 flex justify-between items-center bg-stone-50">
        <span className="text-xl font-bold tracking-widest uppercase text-stone-900" style={{ color: primaryColor }}>
          L'Étoile Boulangerie
        </span>
        <div className="flex gap-8 text-xs font-semibold tracking-widest uppercase text-stone-600">
          <span className="hover:text-amber-800 cursor-pointer">Heritage</span>
          <span className="hover:text-amber-800 cursor-pointer">Menu</span>
          <span className="hover:text-amber-800 cursor-pointer">Reservations</span>
        </div>
      </nav>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          {/* Unique Hero Design: Left-aligned with luxury gold borders */}
          <header className="relative py-28 px-12 md:px-24 flex items-center justify-between bg-stone-950 text-white min-h-[500px] border-b border-amber-800/20">
            <div className="max-w-xl space-y-6 relative z-10 text-left">
              <span className="text-[10px] tracking-widest uppercase text-amber-500 font-bold">ESTABLISHED 1928</span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Crafting French <br />
                <span className="text-amber-500">Artisanal Pâtisserie</span>
              </h1>
              <p className="text-sm text-stone-300 leading-relaxed font-light">
                Indulge in premium gold-accented pastries, freshly stone-baked sourdoughs, and masterfully crafted dessert collections.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => triggerToast("Reservation initiated!")}
                  className="px-8 py-4 bg-transparent border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-stone-950 font-bold uppercase tracking-widest text-[10px] transition-all"
                >
                  Book Private Tasting
                </button>
              </div>
            </div>
            <div className="hidden md:block w-96 h-96 border-4 border-amber-500 p-3 rounded-none relative z-10">
              <img
                src={getImg("https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80")}
                alt="Luxury Croissant"
                className="w-full h-full object-cover rounded-none"
              />
            </div>
            <div className="absolute inset-0 bg-stone-950/80 z-0" />
            <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${getImg("https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80")})` }} />
          </header>

          {/* Unique About section */}
          <section className="py-24 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-left">
              <span className="text-xs text-amber-600 font-bold tracking-widest uppercase">THE GRAND HERITAGE</span>
              <h2 className="text-3xl font-extrabold" style={{ color: primaryColor }}>Time-Honored Baking Techniques</h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                For four generations, L'Étoile has preserved the refined methods of Parisian masters. We source ancient wheat grains, implement 48-hour slow fermentation, and bake in dynamic stone deck ovens to ensure absolute perfection in every bite.
              </p>
            </div>
            <div className="aspect-[4/5] bg-stone-200 border border-amber-900/10 shadow-2xl p-4">
              <img
                src={getImg("https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80")}
                alt="Baker shaping dough"
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        </>
      ) : null}

      {activeTab === "home" || activeTab === "services" ? (
        <>
          {/* Unique Card Layouts for Menu */}
          <section className="py-24 px-8 bg-stone-100 border-y border-stone-200">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-2">
                <span className="text-xs text-amber-600 font-black tracking-widest uppercase">THE SIGNATURE MENU</span>
                <h2 className="text-3xl font-extrabold">Exquisite Pâtisserie Offerings</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Gold-Leaf Croissant", price: "Rs. 450", desc: "Flaky, multi-layered butter pastry infused with organic honey and edible 24k gold leaf." },
                  { name: "Pistachio Raspberry Tart", price: "Rs. 620", desc: "Crisp sweet pastry base, roasted pistachio creme, fresh organic raspberries." },
                  { name: "Madagascar Vanilla Eclair", price: "Rs. 390", desc: "Classic choux pastry filled with authentic Madagascar bourbon vanilla bean custard." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-stone-50 border border-amber-900/10 p-8 flex flex-col justify-between text-left hover:shadow-2xl transition-all duration-300">
                    <div className="space-y-4">
                      <span className="text-stone-400 text-xs font-mono">0{idx + 1} // SIGNATURE</span>
                      <h3 className="text-lg font-bold text-stone-900">{item.name}</h3>
                      <p className="text-xs text-stone-500 leading-relaxed font-light">{item.desc}</p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-amber-900/5 flex justify-between items-center">
                      <span className="text-sm font-extrabold text-amber-700">{item.price}</span>
                      <button onClick={() => triggerToast(`Ordered ${item.name}`)} className="text-[10px] tracking-wider uppercase font-extrabold hover:text-amber-800 transition-colors">Select Item</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      {activeTab === "home" || activeTab === "about" ? (
        <>
          {/* Unique Gallery Layout: Luxury asymmetrical grid */}
          <section className="py-24 px-8 max-w-5xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-stone-950">Visual Showcase</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 aspect-[16/10] bg-stone-200 overflow-hidden cursor-pointer" onClick={() => onGalleryImageClick({ url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a" })}>
                <img src={getImg("https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80")} alt="Gallery 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-[1/1] bg-stone-200 overflow-hidden cursor-pointer" onClick={() => onGalleryImageClick({ url: "https://images.unsplash.com/photo-1509440159596-0249088772ff" })}>
                <img src={getImg("https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80")} alt="Gallery 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </section>
        </>
      ) : null}

      {activeTab === "home" || activeTab === "contact" ? (
        <>
          {/* Unique Contact & CTA Design */}
          <section className="py-24 px-8 bg-stone-900 text-stone-200">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-extrabold text-white">Experience French Elegance</h2>
              <p className="text-stone-400 text-sm max-w-xl mx-auto leading-relaxed">
                Connect with our concierge to arrange custom orders, luxury wedding dessert bars, or private dining sessions.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button onClick={() => triggerToast("Calling Concierge")} className="px-8 py-3.5 bg-amber-500 text-stone-950 font-black uppercase text-[10px] tracking-widest hover:bg-amber-400 transition-colors">Call Concierge</button>
                <button onClick={() => triggerToast("Inquiry form opened")} className="px-8 py-3.5 bg-transparent border border-stone-600 text-white font-black uppercase text-[10px] tracking-widest hover:border-white transition-all">Submit Order Inquiry</button>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {/* Unique luxury footer */}
      <footer className="bg-stone-950 text-stone-400 py-12 px-8 border-t border-amber-900/10 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span>© 2026 L'Étoile Boulangerie. All Rights Reserved.</span>
          <div className="flex gap-8 uppercase font-bold tracking-widest text-[10px] text-amber-500/80">
            <span>Paris</span>
            <span>Pune</span>
            <span>Mumbai</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// 2. MODERN BAKERY TEMPLATE
// ==========================================
export function ModernBakeryTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  const primaryColor = theme?.primaryColor || "#4F46E5";
  const accentColor = theme?.accentColor || "#10B981";
  const fontClass = "font-sans";

  return (
    <div className={`${fontClass} bg-white text-slate-800 min-h-screen relative`}>
      {/* Modern Header: Transparent/Blurry sticky */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center z-20 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-white font-extrabold text-xs">B</div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900">BakeLab Co.</span>
        </div>
        <button onClick={() => triggerToast("Order Now")} className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold">Order Live</button>
      </nav>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          {/* Unique Hero: Vibrant, centered with animated gradients */}
          <header className="py-24 px-6 text-center bg-gradient-to-b from-amber-500/5 via-pink-500/5 to-transparent relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-amber-500/10 text-amber-700">
                ⚡ CRAFTED DAILY IN PUNE
              </span>
              <h1 className="text-5xl sm:text-7xl font-black text-slate-900 leading-tight">
                Bread, Re-imagined <br />
                <span className="bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent">For The Modern Era</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                Discover pastry science. Our wild-yeast sourdoughs and customized vegan pastries represent high-fidelity baking.
              </p>
              <div className="flex justify-center gap-3">
                <button onClick={() => triggerToast("Going to menu")} className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 hover:opacity-90 text-white text-[11px] font-black uppercase tracking-wider shadow-lg shadow-pink-500/15">Explore Menu</button>
                <button onClick={() => triggerToast("Playing story video")} className="px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-black uppercase tracking-wider flex items-center gap-2"><Play className="h-3 w-3 fill-slate-700 text-slate-700" /> Watch Story</button>
              </div>
            </div>
          </header>

          {/* Unique About section */}
          <section className="py-20 px-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center text-left">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-black text-slate-900 leading-tight">Innovation In Every Oven Rotation</h2>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                BakeLab bridges biological science and artisanal tradition. We trace every flour batch back to organic farms, maintain live culture starters under precise digital diagnostics, and deliver zero-preservative pastries across town.
              </p>
            </div>
            <div className="flex-1 w-full aspect-video rounded-3xl bg-slate-100 overflow-hidden shadow-2xl relative">
              <img src={getImg("https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80")} alt="Modern bread catalog" className="w-full h-full object-cover" />
            </div>
          </section>
        </>
      ) : null}

      {activeTab === "home" || activeTab === "services" ? (
        <>
          {/* Unique Card Layouts */}
          <section className="py-20 px-6 bg-slate-50 border-y border-slate-100">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900">Lab Experiments</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">WEEKLY SIGNATURE RELEASES</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: "Sourdough Croissant Hub", category: "WILD-YEAST", price: "Rs. 220", img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73" },
                  { name: "Charcoal Lavender Loaf", category: "SLOW FERMENT", price: "Rs. 350", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl flex flex-col sm:flex-row hover:shadow-2xl transition-all duration-300">
                    <div className="w-full sm:w-48 aspect-square sm:aspect-auto bg-slate-100 overflow-hidden relative">
                      <img src={getImg(item.img)} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between text-left">
                      <div className="space-y-2">
                        <span className="text-[9px] font-black tracking-widest text-pink-500 uppercase">{item.category}</span>
                        <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                        <p className="text-xs text-slate-500">Perfect hydration crumb structure with dynamic notes of herbs.</p>
                      </div>
                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
                        <span className="text-sm font-black text-slate-950">{item.price}</span>
                        <button onClick={() => triggerToast(`Added ${item.name}`)} className="px-4 py-2 bg-slate-950 text-white rounded-full text-[10px] font-extrabold tracking-wider uppercase">Add To Cart</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      {activeTab === "home" || activeTab === "contact" ? (
        <>
          {/* Unique CTA */}
          <section className="py-20 px-6 max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-black text-slate-900 leading-tight">Freshly Baked Alerts</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Drop your number to receive live alerts the second our ovens finish rotating batches of sourdough!
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
              <input type="tel" placeholder="WhatsApp Number" className="flex-1 px-4 py-3 rounded-full border border-slate-200 text-xs focus:outline-none focus:border-pink-500" />
              <button onClick={() => triggerToast("Registered for updates")} className="px-6 py-3 rounded-full bg-slate-950 text-white text-xs font-bold uppercase tracking-widest">Alert Me</button>
            </div>
          </section>
        </>
      ) : null}

      {/* Modern minimal footer */}
      <footer className="bg-slate-950 text-slate-500 py-12 px-6 border-t border-slate-900 text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <span>© 2026 BakeLab Co. Powered by SiteForge.</span>
          <div className="flex gap-6 font-bold uppercase text-[9px] tracking-widest text-slate-400">
            <span>Instagram</span>
            <span>WhatsApp</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// 3. VINTAGE BAKERY TEMPLATE
// ==========================================
export function VintageBakeryTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  const primaryColor = theme?.primaryColor || "#7C2D12";
  const accentColor = theme?.accentColor || "#059669";
  const fontClass = "font-serif";

  return (
    <div className={`${fontClass} bg-[#FDFBF7] text-stone-850 min-h-screen border-8 border-stone-800 relative`}>
      {/* Vintage Header: Double borders */}
      <nav className="border-b-4 border-double border-stone-800 px-6 py-6 text-center">
        <h1 className="text-3xl font-black uppercase tracking-wider text-stone-900">THE OLD TOWN HEARTH</h1>
        <div className="text-[10px] tracking-widest uppercase font-bold text-stone-600 mt-2">Bakers & Flour Millers Since 1884</div>
      </nav>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          {/* Unique Hero: Vintage typography with wooden-toned overlays */}
          <header className="py-24 px-6 text-center max-w-4xl mx-auto border-b border-stone-300">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-stone-900 leading-none">
                STONE-GROUND <br />
                WOOD-FIRED BREADS
              </h2>
              <div className="w-16 h-0.5 bg-stone-800 mx-auto" />
              <p className="text-xs md:text-sm text-stone-650 max-w-xl mx-auto leading-relaxed italic">
                Baked in century-old wood ovens fueled by selected cherrywood and oak, using purely local wheat stone-milled in the early hours of morning.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => triggerToast("Viewing today's fresh catalog")}
                  className="px-8 py-3.5 border-2 border-stone-900 hover:bg-stone-900 hover:text-[#FDFBF7] text-stone-900 font-extrabold uppercase text-xs tracking-widest transition-all"
                >
                  View Today's Ovens
                </button>
              </div>
            </div>
          </header>

          {/* Unique About: Newspaper style layout */}
          <section className="py-16 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-stone-300 items-center">
            <div className="aspect-[4/3] bg-stone-100 border border-stone-300 p-2">
              <img src={getImg("https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80")} alt="Vintage bakers" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4 text-left">
              <h3 className="text-2xl font-black uppercase text-stone-900">THE MILLING STANDARD</h3>
              <p className="text-xs text-stone-650 leading-relaxed">
                Our millstone rotates slowly, keeping the grain cool to preserve delicate nutrients. We do not bleach, enrich, or chemically speed up fermentation. We let organic dough ferment in wicker baskets according to historical schedules.
              </p>
            </div>
          </section>
        </>
      ) : null}

      {activeTab === "home" || activeTab === "services" ? (
        <>
          {/* Unique Menu Layout: Newspaper-style catalog */}
          <section className="py-20 px-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2 mb-12">
              <h2 className="text-3xl font-black uppercase">Daily Bread Ledger</h2>
              <span className="text-[10px] font-bold tracking-widest text-stone-500 uppercase">SUBJECT TO AVAILABILITY DAILY</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { name: "Rustic Hearth Sourdough", price: "Rs. 180", desc: "Our signature dark, blistered crust crusty loaf baked directly over hot ash." },
                { name: "Braided Raisin Challlah", price: "Rs. 240", desc: "Enriched egg dough braided with golden raisins, baked golden amber." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2 text-left pb-6 border-b border-dashed border-stone-300">
                  <div className="flex justify-between items-baseline font-black text-sm text-stone-900">
                    <span>{item.name}</span>
                    <span className="border-b border-dotted border-stone-400 flex-1 mx-2" />
                    <span>{item.price}</span>
                  </div>
                  <p className="text-xs text-stone-650 leading-relaxed font-light italic">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}

      {/* Vintage Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-6 text-center border-t border-stone-800 text-[10px]">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-stone-300 font-extrabold uppercase tracking-widest">THE OLD TOWN HEARTH</div>
          <span>ESTABLISHED 1884 // PUNE, INDIA. BAKE OFFICIALLY COMPLETED WITH SITEFORGE.</span>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// 4. ARTISAN BAKERY TEMPLATE
// ==========================================
export function ArtisanBakeryTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  const primaryColor = theme?.primaryColor || "#C2410C";
  const accentColor = theme?.accentColor || "#B45309";

  return (
    <div className="font-sans bg-stone-50 text-stone-850 min-h-screen relative">
      <nav className="px-8 py-6 flex justify-between items-center max-w-6xl mx-auto">
        <span className="text-lg font-black tracking-wide text-amber-900">Hearth & Harvest</span>
        <button onClick={() => triggerToast("Contact Artisan")} className="text-xs font-bold text-amber-900 border-b-2 border-amber-950 pb-0.5">Contact Artisan</button>
      </nav>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          {/* Unique Hero: Organic terracotta backgrounds, soft serif look */}
          <header className="py-20 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-black text-amber-950 leading-tight">
                Freshly Baked <br />
                <span className="text-orange-700">Artisan Hearth</span> Goods
              </h1>
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                Warm pastries crafted by hand, made with stone-ground flour and slow fermented wild cultures. Pure and wholesome.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => triggerToast("Opening Reservation")}
                  className="px-6 py-3 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-extrabold text-xs uppercase tracking-wide shadow-md"
                >
                  Reserve Today's Batch
                </button>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-xl">
              <img src={getImg("https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80")} alt="Artisan Croissants" className="w-full h-full object-cover" />
            </div>
          </header>
        </>
      ) : null}

      {activeTab === "home" || activeTab === "services" ? (
        <>
          {/* Unique Cards for Artisan goods */}
          <section className="py-16 bg-amber-50">
            <div className="max-w-5xl mx-auto px-6 space-y-12">
              <h2 className="text-2xl font-black text-center text-amber-950">Baked and Fermented Goods</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Cinnamon Twist Scone", desc: "Warm cinnamon glaze over a crumbly scone pastry." },
                  { name: "Spelt Flour Loaf", desc: "Nutty crumb structure, slow fermented for high digestibility." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-md text-left border border-amber-900/5">
                    <h3 className="text-base font-bold text-amber-950">{item.name}</h3>
                    <p className="text-xs text-stone-500 mt-2 leading-relaxed">{item.desc}</p>
                    <button onClick={() => triggerToast(`Reserved ${item.name}`)} className="text-[10px] font-bold text-orange-700 mt-4 block">Inquire Item &rarr;</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      <footer className="py-8 bg-stone-900 text-stone-400 text-xs text-center mt-12">
        <span>© 2026 Hearth & Harvest. Handcrafted utilizing SiteForge.</span>
      </footer>
    </div>
  );
}

// ==========================================
// 5. MINIMAL BAKERY TEMPLATE
// ==========================================
export function MinimalBakeryTemplate({ theme, activeTab, onGalleryImageClick, triggerToast }) {
  return (
    <div className="font-mono bg-white text-black min-h-screen p-8 text-left leading-normal selection:bg-black selection:text-white">
      <header className="border-b border-black pb-4 flex justify-between items-center">
        <span className="font-black text-sm uppercase">K R U M B -- B A K E R Y</span>
        <span className="text-[10px]">OPEN DAILY // 07:00 - 15:00</span>
      </header>

      {activeTab === "home" || activeTab === "about" ? (
        <>
          <section className="py-16 border-b border-black">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
              RUSTIC GRAIN.<br />
              WILD FERMENTATION.<br />
              ONLY CRUST.
            </h1>
            <p className="text-xs text-zinc-650 max-w-md leading-relaxed">
              Minimal ingredients. Flour. Water. Sea salt. Long fermentation time. Baked extremely dark. No fillers, no preservatives.
            </p>
            <div className="mt-8">
              <button onClick={() => triggerToast("Subscribed")} className="px-6 py-2.5 bg-black text-white hover:bg-zinc-800 text-[10px] font-black uppercase">Newsletter Signup</button>
            </div>
          </section>
        </>
      ) : null}

      {activeTab === "home" || activeTab === "services" ? (
        <>
          <section className="py-16">
            <h2 className="text-xs font-black uppercase tracking-widest mb-8">// MENU LEDGER</h2>
            <div className="space-y-4">
              {[
                { name: "01. Country Loaf", price: "Rs. 150" },
                { name: "02. Olive & Herb Baguette", price: "Rs. 180" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-zinc-100 text-xs">
                  <span>{item.name}</span>
                  <span className="font-bold">{item.price}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}

      <footer className="border-t border-black pt-8 text-[9px] text-zinc-400 mt-16 flex justify-between">
        <span>© 2026 KRUMB. ALL CODES SECURED.</span>
        <span>SITEFORGE MINIMAL ENGINE V1.0</span>
      </footer>
    </div>
  );
}
