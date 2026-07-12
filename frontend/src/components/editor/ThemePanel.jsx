import React, { useState, useEffect } from "react";
import { Heart, Search, Sparkles, Plus, Trash, Palette, Check, RefreshCw } from "lucide-react";
import axios from "axios";

const CATEGORIES = {
  FAVORITES: { name: "Saved Favorites", icon: "⭐" },
  NATURAL: { name: "Natural & Organic", icon: "🌿" },
  CORPORATE: { name: "Professional & Corporate", icon: "💼" },
  LUXURY: { name: "Luxury & Premium", icon: "✨" },
  MODERN: { name: "Modern & Startup", icon: "🎨" },
  FASHION: { name: "Fashion & Beauty", icon: "💖" },
  FOOD: { name: "Food & Restaurants", icon: "🍔" },
  RETAIL: { name: "Retail & Ecommerce", icon: "🛒" },
  CUSTOM: { name: "Your Custom Palettes", icon: "🛠" }
};

const DEFAULT_PALETTES = [
  // NATURAL & ORGANIC
  { id: "sage", name: "Deep Sage", category: "NATURAL", colors: ["#CAD2C5", "#84A98C", "#52796F", "#354F52", "#2F3E46"] },
  { id: "forest", name: "Forest Green", category: "NATURAL", colors: ["#D8F3DC", "#95D5B2", "#52B788", "#2D6A4F", "#1B4332"] },
  { id: "clay", name: "Earthy Clay", category: "NATURAL", colors: ["#E9D8A6", "#D4A373", "#BC6C25", "#7F5539", "#5C3D2E"] },
  // PROFESSIONAL & CORPORATE
  { id: "navy", name: "Navy Professional", category: "CORPORATE", colors: ["#F8F9FA", "#DEE2E6", "#6C757D", "#495057", "#212529"] },
  { id: "executive", name: "Executive Blue", category: "CORPORATE", colors: ["#E3F2FD", "#90CAF9", "#42A5F5", "#1565C0", "#0D47A1"] },
  { id: "teal", name: "Deep Teal", category: "CORPORATE", colors: ["#E0FBFC", "#98C1D9", "#3D5A80", "#293241", "#1F2937"] },
  // LUXURY & PREMIUM
  { id: "gold", name: "Royal Gold", category: "LUXURY", colors: ["#FFF8E1", "#FFD54F", "#FFC107", "#B8860B", "#5D4037"] },
  { id: "blackgold", name: "Black Gold", category: "LUXURY", colors: ["#F5F5F5", "#D4AF37", "#B8860B", "#1A1A1A", "#000000"] },
  { id: "purple", name: "Luxury Purple", category: "LUXURY", colors: ["#F3E8FF", "#D8B4FE", "#A855F7", "#6B21A8", "#3B0764"] },
  // MODERN & STARTUP
  { id: "indigo", name: "Indigo Modern", category: "MODERN", colors: ["#EEF2FF", "#C7D2FE", "#6366F1", "#4338CA", "#312E81"] },
  { id: "ocean", name: "Ocean Blue", category: "MODERN", colors: ["#E0F7FA", "#80DEEA", "#26C6DA", "#00838F", "#004D40"] },
  { id: "cyber", name: "Cyber Tech", category: "MODERN", colors: ["#E2E8F0", "#94A3B8", "#475569", "#1E293B", "#0F172A"] },
  // FASHION & BEAUTY
  { id: "rose", name: "Rose Pink", category: "FASHION", colors: ["#FFF1F2", "#FDA4AF", "#FB7185", "#E11D48", "#9F1239"] },
  { id: "nude", name: "Blush Nude", category: "FASHION", colors: ["#FFF7F3", "#FCD5CE", "#F8B4A9", "#D68C7A", "#9C6644"] },
  { id: "peach", name: "Elegant Peach", category: "FASHION", colors: ["#FFF3E6", "#FFD6A5", "#FFB4A2", "#E5989B", "#6D6875"] },
  // FOOD & RESTAURANTS
  { id: "sunset", name: "Sunset Amber", category: "FOOD", colors: ["#FFF7E6", "#FFD166", "#F4A261", "#E76F51", "#9D0208"] },
  { id: "coffee", name: "Coffee House", category: "FOOD", colors: ["#F5EBE0", "#DDBEA9", "#B08968", "#7F5539", "#432818"] },
  { id: "citrus", name: "Fresh Citrus", category: "FOOD", colors: ["#F7F7E8", "#D9ED92", "#99D98C", "#52B788", "#2D6A4F"] },
  // RETAIL & ECOMMERCE
  { id: "orange", name: "Vibrant Orange", category: "RETAIL", colors: ["#FFF4E6", "#FFD8A8", "#FFA94D", "#F76707", "#D9480F"] },
  { id: "marketplace", name: "Marketplace Green", category: "RETAIL", colors: ["#E9F5DB", "#CFE1B9", "#97C1A9", "#4F772D", "#31572C"] }
];

export default function ThemePanel({
  theme,
  websiteJSON,
  updateWebsiteJSON,
  handleTextBlur,
  triggerToast
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [customPalettes, setCustomPalettes] = useState([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customColors, setCustomColors] = useState(["#CAD2C5", "#84A98C", "#52796F", "#354F52", "#2F3E46"]);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  // Load from local storage
  useEffect(() => {
    try {
      const favs = localStorage.getItem("siteforge-favorite-palettes");
      if (favs) setFavorites(JSON.parse(favs));
      const custom = localStorage.getItem("siteforge-custom-palettes");
      if (custom) setCustomPalettes(JSON.parse(custom));
    } catch (e) {
      console.error("Local storage load error", e);
    }
  }, []);

  const saveFavorites = (newFavs) => {
    setFavorites(newFavs);
    localStorage.setItem("siteforge-favorite-palettes", JSON.stringify(newFavs));
  };

  const saveCustom = (newCustom) => {
    setCustomPalettes(newCustom);
    localStorage.setItem("siteforge-custom-palettes", JSON.stringify(newCustom));
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      saveFavorites(favorites.filter(favId => favId !== id));
      triggerToast("Removed from favorites");
    } else {
      saveFavorites([...favorites, id]);
      triggerToast("Added to favorites!");
    }
  };

  // Combine Default & Custom
  const allPalettes = [...DEFAULT_PALETTES, ...customPalettes];

  // Apply palette to site JSON
  const selectPalette = (palette) => {
    if (!websiteJSON) return;
    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
    newJSON.theme.primaryColor = palette.colors[2] || palette.colors[0];
    newJSON.theme.accentColor = palette.colors[3] || palette.colors[1];
    newJSON.theme.palette = palette.colors;
    updateWebsiteJSON(newJSON);
    triggerToast(`Applied ${palette.name} theme!`);
  };

  // Delete Custom
  const deleteCustomPalette = (id, e) => {
    e.stopPropagation();
    const updated = customPalettes.filter(p => p.id !== id);
    saveCustom(updated);
    saveFavorites(favorites.filter(favId => favId !== id));
    triggerToast("Custom palette deleted");
  };

  // Handle Custom creation
  const handleCreateCustom = (e) => {
    e.preventDefault();
    if (!customName.trim()) {
      triggerToast("Please enter a name");
      return;
    }
    const newPalette = {
      id: `custom_${Date.now()}`,
      name: customName.trim(),
      category: "CUSTOM",
      colors: [...customColors]
    };
    saveCustom([...customPalettes, newPalette]);
    selectPalette(newPalette);
    setCustomName("");
    setShowCustomForm(false);
    triggerToast("Custom palette created!");
  };

  // Generate AI Palette
  const generateAiPalette = () => {
    setIsGeneratingAi(true);
    triggerToast("AI Engine is compiling color harmonies...");

    setTimeout(() => {
      // Curated styles depending on keyword
      const prompt = aiPrompt.toLowerCase();
      let selectedColors = [];
      let name = "AI Magic Theme";

      if (prompt.includes("sunset") || prompt.includes("warm") || prompt.includes("fire")) {
        selectedColors = ["#FFF2E6", "#FED7AA", "#FB923C", "#EA580C", "#9A3412"];
        name = "AI Sunset Glow";
      } else if (prompt.includes("ocean") || prompt.includes("cool") || prompt.includes("water")) {
        selectedColors = ["#F0F9FF", "#BAE6FD", "#38BDF8", "#0284C7", "#0C4A6E"];
        name = "AI Blue Lagoon";
      } else if (prompt.includes("cyberpunk") || prompt.includes("neon") || prompt.includes("cyber")) {
        selectedColors = ["#FDF2F8", "#FBCFE8", "#F472B6", "#EC4899", "#831843"];
        name = "AI Cyber Orchid";
      } else if (prompt.includes("vintage") || prompt.includes("retro") || prompt.includes("nostalgia")) {
        selectedColors = ["#FEFDFB", "#F5E6D3", "#D9A05B", "#B87D4B", "#6E452C"];
        name = "AI Retro Velvet";
      } else if (prompt.includes("pastel") || prompt.includes("soft") || prompt.includes("cute")) {
        selectedColors = ["#FAF5FF", "#E9D5FF", "#C084FC", "#A855F7", "#581C87"];
        name = "AI Soft Lavender";
      } else {
        // Procedurally generated high-end palette
        const randomHues = [
          ["#F9FAF8", "#E6F0EA", "#A8DADC", "#457B9D", "#1D3557"],
          ["#FAF9F6", "#F3EAD3", "#E07A5F", "#3D405B", "#81B29A"],
          ["#F4F1DE", "#E07A5F", "#3D405B", "#F2CC8F", "#81B29A"],
          ["#F5F5F7", "#D2D2D7", "#0071E3", "#1D1D1F", "#000000"]
        ];
        const randomChoice = randomHues[Math.floor(Math.random() * randomHues.length)];
        selectedColors = randomChoice;
        name = `AI Design Mode #${Math.floor(Math.random() * 900 + 100)}`;
      }

      const newPalette = {
        id: `ai_${Date.now()}`,
        name: name,
        category: "CUSTOM",
        colors: selectedColors
      };

      saveCustom([...customPalettes, newPalette]);
      selectPalette(newPalette);
      setAiPrompt("");
      setIsGeneratingAi(false);
      triggerToast("AI Palette generated and applied!");
    }, 1500);
  };

  // Filter list
  const filteredPalettes = allPalettes.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          CATEGORIES[p.category]?.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Group by category
  const grouped = {};
  filteredPalettes.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  // Add Favorites category at the top
  const favoritePalettes = allPalettes.filter(p => favorites.includes(p.id));
  const hasFavorites = favoritePalettes.length > 0 && searchQuery === "";

  const handleGenerateNewDesign = async () => {
    if (!websiteJSON) return;
    triggerToast("AI Engine is generating a completely fresh architecture and design structure...");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await axios.post(`${apiUrl}/generate/regenerate-design`, {
        businessData: websiteJSON.meta?.businessData || {},
        currentJson: websiteJSON,
        seedOffset: Math.floor(Math.random() * 90 + 10)
      });
      if (response.data?.success && response.data?.data) {
        updateWebsiteJSON(response.data.data);
        triggerToast("Successfully generated & applied brand new design architecture!");
      } else {
        throw new Error("Failed to generate design");
      }
    } catch (e) {
      console.error("AI Regeneration error, falling back to local design permutation:", e);
      const newJSON = JSON.parse(JSON.stringify(websiteJSON));
      const randomPalette = allPalettes[Math.floor(Math.random() * allPalettes.length)];
      newJSON.theme.primaryColor = randomPalette.colors[2] || randomPalette.colors[0];
      newJSON.theme.accentColor = randomPalette.colors[3] || randomPalette.colors[1];
      newJSON.theme.palette = randomPalette.colors;

      const fonts = ["Inter", "Outfit", "Playfair Display", "Space Grotesk", "Plus Jakarta Sans", "Poppins", "Montserrat", "Syne"];
      const spacings = ["compact", "normal", "large"];
      const radii = ["0px", "8px", "16px", "24px"];
      const btnStyles = ["solid", "outline", "pill", "glass"];

      newJSON.theme.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
      newJSON.theme.spacing = spacings[Math.floor(Math.random() * spacings.length)];
      newJSON.theme.cardRadius = radii[Math.floor(Math.random() * radii.length)];
      newJSON.theme.buttonStyle = btnStyles[Math.floor(Math.random() * btnStyles.length)];

      const secList = newJSON.pages[0].sections;
      if (secList && secList.length > 3) {
        const middle = secList.slice(1, -1);
        for (let i = middle.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [middle[i], middle[j]] = [middle[j], middle[i]];
        }
        newJSON.pages[0].sections = [secList[0], ...middle, secList[secList.length - 1]];
        newJSON.pages[0].sections.forEach((s, idx) => s.order = idx);
      }

      updateWebsiteJSON(newJSON);
      triggerToast(`Generated fresh design variation (${randomPalette.name})!`);
    }
  };


  const handleSwitchVariation = (versionIdx) => {
    if (!websiteJSON) return;
    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
    
    const versionPalettes = [allPalettes[0], allPalettes[3], allPalettes[6]];
    const pal = versionPalettes[versionIdx % versionPalettes.length] || allPalettes[0];
    
    newJSON.theme.primaryColor = pal.colors[2] || pal.colors[0];
    newJSON.theme.accentColor = pal.colors[3] || pal.colors[1];
    newJSON.theme.palette = pal.colors;
    
    const versionFonts = ["Inter", "Outfit", "Playfair Display"];
    const versionRadii = ["8px", "16px", "0px"];
    
    newJSON.theme.fontFamily = versionFonts[versionIdx % versionFonts.length];
    newJSON.theme.cardRadius = versionRadii[versionIdx % versionRadii.length];
    newJSON.theme.style = `Version ${versionIdx + 1}`;

    updateWebsiteJSON(newJSON);
    triggerToast(`Switched to Design Version ${versionIdx + 1}!`);
  };

  return (
    <div className="p-5 space-y-6">
      
      {/* GENERATE NEW DESIGNS BANNER */}
      <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-indigo-500/30 p-4 rounded-2xl space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-white flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="h-4 w-4 text-indigo-400 animate-spin-slow" /> Design Variations
          </span>
          <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
            No Data Reset
          </span>
        </div>
        <p className="text-[10px] text-zinc-300 leading-normal">
          Regenerate layout strategies, typography, and color vectors instantly while keeping all your business text and products intact!
        </p>
        <div className="flex flex-col gap-2 pt-1">
          <button 
            onClick={handleGenerateNewDesign}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Generate New Design
          </button>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <button onClick={() => handleSwitchVariation(0)} className="py-1.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-750 rounded-lg text-[10px] font-bold text-zinc-300 hover:text-white transition-all">
              Version 1
            </button>
            <button onClick={() => handleSwitchVariation(1)} className="py-1.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-750 rounded-lg text-[10px] font-bold text-zinc-300 hover:text-white transition-all">
              Version 2
            </button>
            <button onClick={() => handleSwitchVariation(2)} className="py-1.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-750 rounded-lg text-[10px] font-bold text-zinc-300 hover:text-white transition-all">
              Version 3
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Global Color System</h3>
        <p className="text-[10px] text-zinc-500">Pick or create professional color themes.</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
        <input
          type="text"
          placeholder="Search themes, styles, categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2 pl-9 pr-4 text-xs text-white outline-none focus:border-indigo-500 placeholder-zinc-600 transition-all"
        />
      </div>

      {/* AI Palette Generator Tool */}
      <div className="bg-gradient-to-br from-indigo-950/40 to-zinc-900 border border-indigo-500/10 p-3.5 rounded-2xl space-y-3 shadow-md">
        <span className="text-[10px] font-extrabold text-indigo-400 flex items-center gap-1.5 uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" /> AI Palette Designer
        </span>
        <div className="flex gap-1.5">
          <input
            type="text"
            placeholder="e.g. vintage warm coffee, retro sunset"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            disabled={isGeneratingAi}
            className="flex-1 bg-zinc-950 border border-zinc-850 text-[10px] p-2 rounded-xl text-white outline-none focus:border-indigo-500 disabled:opacity-50"
          />
          <button
            onClick={generateAiPalette}
            disabled={isGeneratingAi}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 disabled:opacity-50 shadow-lg shadow-indigo-600/10 active:scale-95 shrink-0"
          >
            {isGeneratingAi ? (
              <RefreshCw className="h-3 w-3 animate-spin" />
            ) : (
              <Sparkles className="h-3 w-3" />
            )}
            Generate
          </button>
        </div>
      </div>

      {/* Quick Custom Palette Selector */}
      <div className="border border-zinc-850 p-3 rounded-2xl bg-zinc-900/30 space-y-3">
        <button
          onClick={() => setShowCustomForm(!showCustomForm)}
          className="w-full flex items-center justify-between text-[10px] font-bold text-zinc-300 hover:text-white"
        >
          <span className="flex items-center gap-1.5"><Plus className="h-3.5 w-3.5 text-emerald-400" /> Create Custom Palette</span>
          <span className="text-[9px] text-zinc-500">{showCustomForm ? "Hide" : "Expand"}</span>
        </button>

        {showCustomForm && (
          <form onSubmit={handleCreateCustom} className="space-y-3 pt-1 border-t border-zinc-850">
            <input
              type="text"
              placeholder="Palette name (e.g. Luxe Gold)"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-[10px] p-2.5 rounded-lg text-white outline-none focus:border-indigo-500"
            />
            <div className="flex justify-between items-center bg-zinc-950 p-2 rounded-lg border border-zinc-800">
              <span className="text-[9px] text-zinc-500 font-medium">Select 5 colors:</span>
              <div className="flex gap-1.5">
                {customColors.map((color, idx) => (
                  <input
                    key={idx}
                    type="color"
                    value={color}
                    onChange={(e) => {
                      const updated = [...customColors];
                      updated[idx] = e.target.value;
                      setCustomColors(updated);
                    }}
                    className="w-5 h-5 bg-transparent border-0 cursor-pointer p-0"
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-1.5 text-[9.5px] font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors shadow"
            >
              Add to Library & Apply
            </button>
          </form>
        )}
      </div>

      {/* Grid List Container */}
      <div className="space-y-5 max-h-[50vh] overflow-y-auto pr-1">
        {/* Render Favorites */}
        {hasFavorites && (
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-zinc-400 flex items-center gap-1 uppercase tracking-wider sticky top-0 bg-zinc-900 py-1.5 z-10">
              <span>{CATEGORIES.FAVORITES.icon}</span> {CATEGORIES.FAVORITES.name}
            </div>
            <div className="grid grid-cols-1 gap-2">
              {favoritePalettes.map(palette => (
                <PaletteStripCard
                  key={palette.id}
                  palette={palette}
                  selected={websiteJSON?.theme?.palette?.join(",") === palette.colors.join(",")}
                  onSelect={selectPalette}
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                  custom={palette.category === "CUSTOM"}
                  onDelete={deleteCustomPalette}
                />
              ))}
            </div>
          </div>
        )}

        {/* Group lists */}
        {Object.keys(CATEGORIES)
          .filter(cat => cat !== "FAVORITES" && grouped[cat]?.length > 0)
          .map(catKey => (
            <div key={catKey} className="space-y-2">
              <div className="text-[10px] font-bold text-zinc-400 flex items-center gap-1 uppercase tracking-wider sticky top-0 bg-zinc-900 py-1.5 z-10">
                <span>{CATEGORIES[catKey].icon}</span> {CATEGORIES[catKey].name}
              </div>
              <div className="grid grid-cols-1 gap-2">
                {grouped[catKey].map(palette => (
                  <PaletteStripCard
                    key={palette.id}
                    palette={palette}
                    selected={websiteJSON?.theme?.palette?.join(",") === palette.colors.join(",")}
                    onSelect={selectPalette}
                    isFavorite={favorites.includes(palette.id)}
                    onToggleFavorite={toggleFavorite}
                    custom={catKey === "CUSTOM"}
                    onDelete={deleteCustomPalette}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Presets and details details (Fonts, Spacing, Card Radius, Button Style) */}
      <div className="border-t border-zinc-850 pt-4 space-y-4">
        {/* Brand Theme Inputs */}
        <div className="space-y-2.5">
          <span className="text-[9px] font-bold text-zinc-450 uppercase tracking-wider block">Palette Details</span>
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Primary Accent Color</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] text-zinc-500">{theme.primaryColor}</span>
              <input
                type="color"
                value={theme.primaryColor || "#000000"}
                onChange={(e) => {
                  const newJSON = JSON.parse(JSON.stringify(websiteJSON));
                  newJSON.theme.primaryColor = e.target.value;
                  updateWebsiteJSON(newJSON, false);
                }}
                onBlur={handleTextBlur}
                className="w-5 h-5 bg-transparent border-0 cursor-pointer p-0"
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Secondary Accent Color</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] text-zinc-500">{theme.accentColor}</span>
              <input
                type="color"
                value={theme.accentColor || "#000000"}
                onChange={(e) => {
                  const newJSON = JSON.parse(JSON.stringify(websiteJSON));
                  newJSON.theme.accentColor = e.target.value;
                  updateWebsiteJSON(newJSON, false);
                }}
                onBlur={handleTextBlur}
                className="w-5 h-5 bg-transparent border-0 cursor-pointer p-0"
              />
            </div>
          </div>
        </div>

        {/* Font Select */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold text-zinc-450 uppercase block">Global Typography</span>
          <select
            value={theme.fontFamily || "Inter"}
            onChange={(e) => {
              const newJSON = JSON.parse(JSON.stringify(websiteJSON));
              newJSON.theme.fontFamily = e.target.value;
              updateWebsiteJSON(newJSON);
            }}
            className="w-full bg-zinc-950 border border-zinc-800 text-xs p-2 rounded text-white outline-none"
          >
            <option value="Inter">Inter (Clean Sans)</option>
            <option value="Outfit">Outfit (Dynamic Modern)</option>
            <option value="Playfair Display">Playfair Display (Luxury Serif)</option>
            <option value="Space Grotesk">Space Grotesk (Tech & Bold)</option>
            <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Professional)</option>
            <option value="Poppins">Poppins (Friendly Sans)</option>
            <option value="Montserrat">Montserrat (Classic Geometric)</option>
            <option value="Syne">Syne (Artistic & Avant-Garde)</option>
            <option value="Roboto">Roboto (Classic Sans)</option>
            <option value="monospace">Courier Mono (Industrial)</option>
          </select>
        </div>

        {/* Spacing Select */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold text-zinc-450 uppercase block">Global Spacing</span>
          <select
            value={theme.spacing || "normal"}
            onChange={(e) => {
              const newJSON = JSON.parse(JSON.stringify(websiteJSON));
              newJSON.theme.spacing = e.target.value;
              updateWebsiteJSON(newJSON);
            }}
            className="w-full bg-zinc-950 border border-zinc-800 text-xs p-2 rounded text-white outline-none"
          >
            <option value="compact">Compact Spacing</option>
            <option value="normal">Normal Spacing</option>
            <option value="large">Spacious Margins</option>
          </select>
        </div>

        {/* Card Radius Select */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold text-zinc-450 uppercase block">Card Border Radius</span>
          <select
            value={theme.cardRadius || "16px"}
            onChange={(e) => {
              const newJSON = JSON.parse(JSON.stringify(websiteJSON));
              newJSON.theme.cardRadius = e.target.value;
              updateWebsiteJSON(newJSON);
            }}
            className="w-full bg-zinc-950 border border-zinc-800 text-xs p-2 rounded text-white outline-none"
          >
            <option value="0px">Sharp (0px)</option>
            <option value="8px">Subtle Rounded (8px)</option>
            <option value="16px">Modern Pill (16px)</option>
            <option value="24px">Soft & Playful (24px)</option>
          </select>
        </div>

        {/* Button Style Select */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-bold text-zinc-450 uppercase block">Button Style</span>
          <select
            value={theme.buttonStyle || "solid"}
            onChange={(e) => {
              const newJSON = JSON.parse(JSON.stringify(websiteJSON));
              newJSON.theme.buttonStyle = e.target.value;
              updateWebsiteJSON(newJSON);
            }}
            className="w-full bg-zinc-950 border border-zinc-800 text-xs p-2 rounded text-white outline-none"
          >
            <option value="solid">Solid Accent Fill</option>
            <option value="outline">Modern Outline</option>
            <option value="pill">Soft Pill CTA</option>
            <option value="glass">Glassmorphism Blur</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// Subcomponent PaletteStripCard
function PaletteStripCard({
  palette,
  selected,
  onSelect,
  isFavorite,
  onToggleFavorite,
  custom,
  onDelete
}) {
  return (
    <div
      onClick={() => onSelect(palette)}
      className={`p-2.5 rounded-xl bg-zinc-950 border transition-all cursor-pointer hover:border-zinc-700 hover:bg-zinc-900 group relative flex flex-col gap-2 ${
        selected ? "border-indigo-500 shadow-indigo-600/10 shadow-lg" : "border-zinc-850"
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-extrabold text-zinc-200 group-hover:text-white transition-colors truncate max-w-[120px]">
          {palette.name}
        </span>
        <div className="flex items-center gap-1">
          {custom && (
            <button
              onClick={(e) => onDelete(palette.id, e)}
              className="p-1 rounded hover:bg-zinc-800 text-zinc-500 hover:text-rose-400 transition-colors"
              title="Delete Custom Palette"
            >
              <Trash className="h-3 w-3" />
            </button>
          )}
          <button
            onClick={(e) => onToggleFavorite(palette.id, e)}
            className="p-1 rounded hover:bg-zinc-800 transition-colors"
            title={isFavorite ? "Remove Favorite" : "Add Favorite"}
          >
            <Heart
              className={`h-3 w-3 transition-colors ${
                isFavorite ? "fill-rose-500 text-rose-500 animate-scale" : "text-zinc-500 hover:text-rose-400"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 5-Color preview strip */}
      <div className="h-6 w-full flex rounded-lg overflow-hidden border border-zinc-900 shadow-inner">
        {palette.colors.map((color, idx) => (
          <div
            key={idx}
            className="flex-1 h-full relative group/color"
            style={{ backgroundColor: color }}
            title={color}
          >
            {/* Hex tooltip on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/color:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[7px] font-bold font-mono text-white leading-none tracking-tighter uppercase select-all">
                {color}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="absolute top-[-5px] right-[-5px] bg-indigo-600 border-2 border-zinc-950 p-0.5 rounded-full shadow-md">
          <Check className="h-2 w-2 text-white" />
        </div>
      )}
    </div>
  );
}
