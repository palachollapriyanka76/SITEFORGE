import React, { useState } from "react";
import {
  Plus, Trash2, Copy, ArrowUp, ArrowDown, Eye, EyeOff, Layers, Sparkles,
  Image as ImageIcon, Tag, DollarSign, Percent, Box, Check, X, Edit3, Grid,
  Layout, Sliders, Type, AlignLeft, AlignCenter, AlignRight, Phone, Mail,
  MapPin, Globe, Shield, Star, RefreshCw, FolderPlus, List, ChevronDown, ChevronRight
} from "lucide-react";

export default function PropertiesPanel({
  currentTab = "website",
  selectedElement,
  setSelectedElement,
  activeSectionId,
  setActiveSectionId,
  handleTextChange,
  handleTextBlur,
  updateImageURL,
  setActiveTab,
  handleAssetSelect,
  theme = {},
  websiteJSON,
  updateWebsiteJSON,
}) {
  const [activeAccordion, setActiveAccordion] = useState("content"); // content, layout, items
  const [editingIndex, setEditingIndex] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [imageSearch, setImageSearch] = useState("");

  if (!websiteJSON || !websiteJSON.pages || !websiteJSON.pages[0]) {
    return (
      <div className="text-center py-10 text-zinc-500 text-xs">
        Loading properties...
      </div>
    );
  }

  const sections = websiteJSON.pages[0].sections || [];
  const activeSection = selectedElement ? sections.find(s => s.id === selectedElement.sectionId) : null;
  const globalSettings = websiteJSON.globalSettings || {};

  // Helper to save section changes
  const updateSectionContent = (sectionId, newContent, newStyles = null) => {
    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
    const sec = newJSON.pages[0].sections.find(s => s.id === sectionId);
    if (sec) {
      if (newContent) sec.content = { ...sec.content, ...newContent };
      if (newStyles) sec.styles = { ...sec.styles, ...newStyles };
      updateWebsiteJSON(newJSON);
    }
  };

  // Helper for section actions (Move Up/Down, Duplicate, Delete, Hide/Show)
  const handleSectionAction = (sectionId, action) => {
    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
    const secList = newJSON.pages[0].sections;
    const idx = secList.findIndex(s => s.id === sectionId);
    if (idx === -1) return;

    if (action === "up" && idx > 0) {
      const temp = secList[idx];
      secList[idx] = secList[idx - 1];
      secList[idx - 1] = temp;
    } else if (action === "down" && idx < secList.length - 1 && secList[idx + 1].type !== "footer") {
      const temp = secList[idx];
      secList[idx] = secList[idx + 1];
      secList[idx + 1] = temp;
    } else if (action === "duplicate") {
      const copy = JSON.parse(JSON.stringify(secList[idx]));
      copy.id = `sec_${copy.type}_${Math.random().toString(36).substring(2, 6)}`;
      secList.splice(idx + 1, 0, copy);
    } else if (action === "delete") {
      if (secList[idx].type === "hero" || secList[idx].type === "footer") {
        alert("Hero and Footer sections cannot be deleted.");
        return;
      }
      secList.splice(idx, 1);
      setSelectedElement(null);
    } else if (action === "toggle_visible") {
      secList[idx].visible = !secList[idx].visible;
    }

    // Reindex order
    secList.forEach((s, i) => s.order = i);
    updateWebsiteJSON(newJSON);
  };

  // --- PRODUCT CRUD HANDLERS ---
  const handleAddProduct = (sec) => {
    const prods = sec.content.products || [];
    const newProd = {
      id: `prod_${Date.now()}`,
      name: "New Custom Product",
      price: "$49.99",
      discount: null,
      badge: "New Arrival",
      category: sec.content.categories?.[0] || "Featured",
      stock: "In Stock",
      description: "High quality custom product tailored for exceptional performance.",
      image: ""
    };
    updateSectionContent(sec.id, { products: [newProd, ...prods] });
    setEditingIndex(0);
  };

  const handleUpdateProduct = (sec, idx, updatedFields) => {
    const prods = [...(sec.content.products || [])];
    if (prods[idx]) {
      prods[idx] = { ...prods[idx], ...updatedFields };
      updateSectionContent(sec.id, { products: prods });
    }
  };

  const handleDeleteProduct = (sec, idx) => {
    const prods = [...(sec.content.products || [])];
    prods.splice(idx, 1);
    updateSectionContent(sec.id, { products: prods });
    if (editingIndex === idx) setEditingIndex(null);
  };

  const handleDuplicateProduct = (sec, idx) => {
    const prods = [...(sec.content.products || [])];
    if (prods[idx]) {
      const copy = { ...prods[idx], id: `prod_${Date.now()}`, name: `${prods[idx].name} (Copy)` };
      prods.splice(idx + 1, 0, copy);
      updateSectionContent(sec.id, { products: prods });
    }
  };

  // --- CATEGORY CRUD HANDLERS ---
  const handleAddCategory = (sec) => {
    if (!newCategoryName.trim()) return;
    const cats = Array.from(new Set([...(sec.content.categories || []), newCategoryName.trim()]));
    updateSectionContent(sec.id, { categories: cats });
    setNewCategoryName("");
  };

  const handleDeleteCategory = (sec, catName) => {
    const cats = (sec.content.categories || []).filter(c => c !== catName);
    updateSectionContent(sec.id, { categories: cats });
  };

  // --- GALLERY CRUD HANDLERS ---
  const handleAddGalleryImage = (sec) => {
    const imgs = sec.content.images || [];
    const newImg = {
      id: `img_${Date.now()}`,
      url: "",
      caption: "New Gallery Highlight"
    };
    updateSectionContent(sec.id, { images: [newImg, ...imgs] });
  };

  const handleUpdateGalleryImage = (sec, idx, updatedFields) => {
    const imgs = [...(sec.content.images || [])];
    if (imgs[idx]) {
      imgs[idx] = { ...imgs[idx], ...updatedFields };
      updateSectionContent(sec.id, { images: imgs });
    }
  };

  const handleDeleteGalleryImage = (sec, idx) => {
    const imgs = [...(sec.content.images || [])];
    imgs.splice(idx, 1);
    updateSectionContent(sec.id, { images: imgs });
  };

  // --- HEADER & FOOTER HANDLERS ---
  const handleUpdateHeaderConfig = (updatedFields) => {
    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
    newJSON.globalSettings.headerConfig = { ...newJSON.globalSettings.headerConfig, ...updatedFields };
    updateWebsiteJSON(newJSON);
  };

  const handleUpdateFooter = (updatedFields) => {
    const footerSec = sections.find(s => s.type === "footer");
    if (footerSec) {
      updateSectionContent(footerSec.id, updatedFields);
    }
  };

  return (
    <div className="space-y-6 text-xs text-zinc-300 pb-10">

      {/* Top Header (Redesigned: Goal 1 - Remove technical terminology like Inspector/Layer Management) */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-indigo-400" />
          <span className="font-extrabold text-white text-sm tracking-wide">
            {currentTab === "products" ? "Products & Catalog" :
              currentTab === "images" ? "Images & Media" :
                currentTab === "contact" ? "Contact & Footer" :
                  currentTab === "settings" ? "Website Settings" :
                    selectedElement ? (selectedElement.type === "header" ? "Navigation Bar" : (selectedElement.type === "footer" ? "Footer Settings" : `${activeSection?.content?.title || activeSection?.type || selectedElement.type} Settings`)) :
                      "Website Sections"}
          </span>
        </div>
        {selectedElement && (
          <button
            onClick={() => setSelectedElement(null)}
            className="text-xs font-bold text-zinc-400 hover:text-white transition-colors bg-zinc-800/80 px-2.5 py-1 rounded-lg border border-zinc-750"
          >
            ← Back to list
          </button>
        )}
      </div>

      {/* DEDICATED PRODUCTS MANAGER (Goal 5: add, edit, duplicate, delete, search, reorder) */}
      {!selectedElement && currentTab === "products" && (
        <div className="space-y-6">
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2">
            <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
              <Box className="h-4 w-4 text-indigo-400" /> Catalog Inventory
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Manage your products, pricing, badges, and inventory. Click "Edit Details" on any card to update specifications.
            </p>
          </div>

          {(() => {
            const productSec = sections.find(s => ["products", "catalog", "menu", "popular-dishes", "collections", "featured-products"].includes(s.type));
            if (!productSec) {
              return (
                <div className="text-center py-8 bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-4">
                  <p className="text-xs text-zinc-400">No product catalog section found on this page.</p>
                  <button
                    onClick={() => {
                      const newJSON = JSON.parse(JSON.stringify(websiteJSON));
                      const newSec = {
                        id: `sec_${Date.now()}`,
                        type: "products",
                        content: {
                          title: "Top Offerings",
                          subtitle: "OUR POPULAR SELECTION",
                          products: [
                            { id: `prod_${Date.now()}_1`, name: "Signature Combo", price: "₹1,490", discount: "Save 10%", badge: "Popular", category: "Featured", stock: "In Stock", description: "Artisanal quality crafted with genuine ingredients.", image: "" },
                            { id: `prod_${Date.now()}_2`, name: "Premium Variant", price: "₹2,900", discount: null, badge: "New Arrival", category: "Featured", stock: "In Stock", description: "Heavy duty reliable build for professional use.", image: "" }
                          ]
                        }
                      };
                      newJSON.pages[0].sections.splice(1, 0, newSec);
                      updateWebsiteJSON(newJSON);
                    }}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all"
                  >
                    + Create Products Catalog Section
                  </button>
                </div>
              );
            }

            const prods = productSec.content?.products || [];
            const filteredProds = prods.filter(p => p.name?.toLowerCase().includes(productSearch.toLowerCase()) || p.category?.toLowerCase().includes(productSearch.toLowerCase()));

            return (
              <div className="space-y-4">
                {/* Search Bar & Add Button */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleAddProduct(productSec)}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all active:scale-97"
                  >
                    <Plus className="h-4 w-4" /> + Add New Product
                  </button>

                  <input
                    type="text"
                    placeholder="🔍 Search products by name or category..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Product Cards List */}
                <div className="space-y-3">
                  {filteredProds.map((prod, idx) => {
                    const originalIdx = prods.findIndex(p => p.id === prod.id || p.name === prod.name);
                    const isEditingThis = editingIndex === originalIdx;

                    return (
                      <div key={prod.id || idx} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-md hover:border-zinc-700 transition-all">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                              {prod.image ? (
                                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                              ) : (
                                <Box className="h-5 w-5 text-zinc-600" />
                              )}
                            </div>
                            <div>
                              <h5 className="font-bold text-sm text-white">{prod.name || "Unnamed Product"}</h5>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-mono text-indigo-400 font-bold text-xs">{prod.price || "₹0"}</span>
                                {prod.badge && <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/20">{prod.badge}</span>}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => setEditingIndex(isEditingThis ? null : originalIdx)}
                            className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-lg border border-zinc-750 text-xs flex items-center gap-1.5 transition-colors"
                          >
                            <Edit3 className="h-3.5 w-3.5 text-indigo-400" /> {isEditingThis ? "Done" : "Edit"}
                          </button>
                        </div>

                        {/* Expandable Simple Edit Form for non-technical users */}
                        {isEditingThis && (
                          <div className="pt-3 border-t border-zinc-850 space-y-3 animate-fade-in">
                            <div className="grid grid-cols-2 gap-2.5">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-zinc-400">Product Name</label>
                                <input
                                  type="text"
                                  value={prod.name || ""}
                                  onChange={(e) => handleUpdateProduct(productSec, originalIdx, { name: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-zinc-400">Price (e.g. ₹1,490)</label>
                                <input
                                  type="text"
                                  value={prod.price || ""}
                                  onChange={(e) => handleUpdateProduct(productSec, originalIdx, { price: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-zinc-400">Badge (Optional)</label>
                                <input
                                  type="text"
                                  placeholder="e.g. Best Seller / 20% OFF"
                                  value={prod.badge || ""}
                                  onChange={(e) => handleUpdateProduct(productSec, originalIdx, { badge: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-zinc-400">Category</label>
                                <input
                                  type="text"
                                  value={prod.category || ""}
                                  onChange={(e) => handleUpdateProduct(productSec, originalIdx, { category: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-zinc-400">Short Description</label>
                              <textarea
                                rows="2"
                                value={prod.description || ""}
                                onChange={(e) => handleUpdateProduct(productSec, originalIdx, { description: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-zinc-400">Image URL</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="https://..."
                                  value={prod.image || ""}
                                  onChange={(e) => handleUpdateProduct(productSec, originalIdx, { image: e.target.value })}
                                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                                />
                                <button
                                  onClick={() => handleAssetSelect(productSec.id, originalIdx, "product")}
                                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-xl text-xs font-bold"
                                >
                                  Pick
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Large Quick Actions: Move Up / Move Down / Duplicate / Delete */}
                        <div className="flex items-center justify-between pt-2 border-t border-zinc-850">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                if (originalIdx > 0) {
                                  const list = [...prods];
                                  const tmp = list[originalIdx];
                                  list[originalIdx] = list[originalIdx - 1];
                                  list[originalIdx - 1] = tmp;
                                  updateSectionContent(productSec.id, { products: list });
                                }
                              }}
                              disabled={originalIdx === 0}
                              className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg text-[11px] font-semibold disabled:opacity-30 border border-zinc-800"
                            >
                              ↑ Move Up
                            </button>
                            <button
                              onClick={() => {
                                if (originalIdx < prods.length - 1) {
                                  const list = [...prods];
                                  const tmp = list[originalIdx];
                                  list[originalIdx] = list[originalIdx + 1];
                                  list[originalIdx + 1] = tmp;
                                  updateSectionContent(productSec.id, { products: list });
                                }
                              }}
                              disabled={originalIdx === prods.length - 1}
                              className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg text-[11px] font-semibold disabled:opacity-30 border border-zinc-800"
                            >
                              ↓ Move Down
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleDuplicateProduct(productSec, originalIdx)}
                              className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-indigo-300 hover:text-white rounded-lg text-[11px] font-semibold border border-zinc-800"
                            >
                              Duplicate
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(productSec, originalIdx)}
                              className="px-2.5 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-white rounded-lg text-[11px] font-semibold border border-rose-900/40"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* DEDICATED IMAGES MANAGER (Goal 6: centralized upload/replace for logo, hero, products, gallery) */}
      {!selectedElement && currentTab === "images" && (
        <div className="space-y-6">
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2">
            <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-indigo-400" /> Website Images & Media
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Centralized hub to change your Brand Logo, Hero Cover Banner, and Gallery photos with a single click.
            </p>
          </div>

          <div className="space-y-4">
            {/* Quick Card 1: Brand Logo */}
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center p-1.5 overflow-hidden shrink-0">
                  {globalSettings?.headerConfig?.logoUrl ? (
                    <img src={globalSettings.headerConfig.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-indigo-400" />
                  )}
                </div>
                <div>
                  <h5 className="font-bold text-xs text-white">Brand Logo Image</h5>
                  <p className="text-[10px] text-zinc-400">Appears in navbar, footer & favicon</p>
                </div>
              </div>
              <button
                onClick={() => handleAssetSelect("header", null, "headerLogo")}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow transition-all"
              >
                Replace Logo
              </button>
            </div>

            {/* Quick Card 2: Hero Cover Image */}
            {(() => {
              const heroSec = sections.find(s => s.type === "hero");
              if (heroSec) {
                return (
                  <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h5 className="font-bold text-xs text-white">Hero Cover Background</h5>
                        <p className="text-[10px] text-zinc-400">Primary visual banner for first impressions</p>
                      </div>
                      <button
                        onClick={() => handleAssetSelect(heroSec.id, null, "heroBg")}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow transition-all"
                      >
                        Change Cover
                      </button>
                    </div>
                    {heroSec.content?.backgroundImage && (
                      <div className="w-full h-24 rounded-xl overflow-hidden border border-zinc-800 relative group">
                        <img src={heroSec.content.backgroundImage} alt="Hero" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => updateSectionContent(heroSec.id, { backgroundImage: "" })}
                            className="px-3 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-lg shadow"
                          >
                            Remove Image
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })()}

            {/* Gallery Section Images */}
            {(() => {
              const gallerySec = sections.find(s => ["gallery", "portfolio"].includes(s.type));
              if (!gallerySec) return null;
              const imgs = gallerySec.content?.images || [];

              return (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-extrabold text-xs text-zinc-300 uppercase tracking-wider">Photo Gallery Grid ({imgs.length})</h5>
                    <button
                      onClick={() => handleAddGalleryImage(gallerySec)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl border border-zinc-700"
                    >
                      + Add Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {imgs.map((img, idx) => (
                      <div key={img.id || idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between gap-3 shadow-sm">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-12 h-12 bg-zinc-900 rounded-lg overflow-hidden shrink-0 border border-zinc-800">
                            {img.url ? <img src={img.url} alt="Gal" className="w-full h-full object-cover" /> : <ImageIcon className="h-5 w-5 text-zinc-600 m-auto mt-3" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <input
                              type="text"
                              placeholder="Photo Caption..."
                              value={img.caption || ""}
                              onChange={(e) => handleUpdateGalleryImage(gallerySec, idx, { caption: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white font-medium focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleAssetSelect(gallerySec.id, idx, "gallery")}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow"
                          >
                            Replace
                          </button>
                          <button
                            onClick={() => handleDeleteGalleryImage(gallerySec, idx)}
                            className="p-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded-lg border border-rose-900/40"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* CONTACT & FOOTER MANAGER (Goal 4: simple forms with large buttons and clear labels) */}
      {!selectedElement && currentTab === "contact" && (
        <div className="space-y-6">
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2">
            <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
              <Phone className="h-4 w-4 text-indigo-400" /> Contact & Business Info
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Keep your contact numbers, address, email, and social media links accurate so customers can reach out instantly.
            </p>
          </div>

          <div className="space-y-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 shadow-sm">
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-zinc-300">Company / Brand Name</label>
              <input
                type="text"
                value={globalSettings?.headerConfig?.companyName || ""}
                onChange={(e) => handleUpdateHeaderConfig({ companyName: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-zinc-300">Business Tagline or Short Bio</label>
              <input
                type="text"
                value={sections.find(s => s.type === "footer")?.content?.tagline || ""}
                onChange={(e) => handleUpdateFooter({ tagline: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-zinc-300">Contact Phone</label>
                <input
                  type="text"
                  placeholder="e.g. +91 98765 43210"
                  value={sections.find(s => s.type === "footer")?.content?.phone || ""}
                  onChange={(e) => handleUpdateFooter({ phone: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-zinc-300">Email Address</label>
                <input
                  type="text"
                  placeholder="e.g. info@business.com"
                  value={sections.find(s => s.type === "footer")?.content?.email || ""}
                  onChange={(e) => handleUpdateFooter({ email: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-zinc-300">Physical Location Address</label>
              <input
                type="text"
                placeholder="e.g. MG Road, Pune, Maharashtra"
                value={sections.find(s => s.type === "footer")?.content?.address || ""}
                onChange={(e) => handleUpdateFooter({ address: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <button
              onClick={() => alert("Contact & Business Info updated successfully across your website!")}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all mt-2"
            >
              ✓ Save Contact Changes
            </button>
          </div>
        </div>
      )}

      {/* WEBSITE SETTINGS & SEO (Goal 4) */}
      {!selectedElement && currentTab === "settings" && (
        <div className="space-y-6">
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2">
            <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
              <Sliders className="h-4 w-4 text-indigo-400" /> General Website Settings & SEO
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Configure your page metadata and SEO ranking tags for Google search.
            </p>
          </div>

          <div className="space-y-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 shadow-sm">
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-zinc-300">Page SEO Title</label>
              <input
                type="text"
                value={websiteJSON?.meta?.title || globalSettings?.headerConfig?.companyName || ""}
                onChange={(e) => {
                  const newJSON = JSON.parse(JSON.stringify(websiteJSON));
                  if (!newJSON.meta) newJSON.meta = {};
                  newJSON.meta.title = e.target.value;
                  updateWebsiteJSON(newJSON);
                }}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-extrabold text-zinc-300">Page SEO Description</label>
              <textarea
                rows="3"
                placeholder="A brief summary of your business for search engines..."
                value={websiteJSON?.meta?.description || ""}
                onChange={(e) => {
                  const newJSON = JSON.parse(JSON.stringify(websiteJSON));
                  if (!newJSON.meta) newJSON.meta = {};
                  newJSON.meta.description = e.target.value;
                  updateWebsiteJSON(newJSON);
                }}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <button
              onClick={() => alert("SEO settings and metadata saved successfully!")}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all mt-2"
            >
              ✓ Save Website Settings
            </button>
          </div>
        </div>
      )}

      {/* WEBSITE TAB: CLICK TO EDIT GUIDE & SECTION ORDER (Goal 3 & 4) */}
      {!selectedElement && currentTab === "website" && (
        <div className="space-y-5">
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3 shadow-sm">
            <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" /> Click-to-Edit Mode Active
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Click directly on the Hero banner, Products grid, Gallery, or Footer right on your preview canvas to open exact settings instantly!
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-zinc-300 uppercase tracking-wider">Sections On Your Page</h4>
            <div className="space-y-2.5">
              {sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  onClick={() => {
                    setSelectedElement({ sectionId: sec.id, type: sec.type, fieldKey: "title", value: sec.content?.title || "" });
                    setActiveSectionId(sec.id);
                  }}
                  className="flex items-center justify-between p-3.5 bg-zinc-950 border border-zinc-800 hover:border-indigo-500/80 rounded-2xl cursor-pointer transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3 capitalize font-bold text-zinc-200">
                    <span className="w-6 h-6 rounded-lg bg-zinc-900 text-xs text-indigo-400 flex items-center justify-center font-mono font-extrabold border border-zinc-800">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-xs block text-white">{sec.content?.title || `${sec.type} Section`}</span>
                      <span className="text-[10px] font-normal text-zinc-500 block">{sec.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSectionAction(sec.id, "up"); }}
                      disabled={idx === 0}
                      className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white disabled:opacity-20"
                      title="Move Up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSectionAction(sec.id, "down"); }}
                      disabled={idx === sections.length - 1}
                      className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white disabled:opacity-20"
                      title="Move Down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- HEADER INSPECTOR --- */}
      {selectedElement?.type === "header" && (
        <div className="space-y-5">
          {/* Brand Logo Inspector */}
          <div className="space-y-3 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" /> Brand Logo & Identity
            </h4>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-450 uppercase block">Brand Name / Logo Text</label>
              <input
                type="text"
                value={theme.logo?.text || websiteJSON.meta?.title || ""}
                onChange={(e) => {
                  const newJSON = JSON.parse(JSON.stringify(websiteJSON));
                  if (!newJSON.theme.logo) newJSON.theme.logo = {};
                  newJSON.theme.logo.text = e.target.value;
                  if (!newJSON.meta) newJSON.meta = {};
                  newJSON.meta.title = e.target.value;
                  updateWebsiteJSON(newJSON);
                }}
                placeholder="Brand Name"
                className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2.5 rounded-lg text-white font-semibold outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5 pt-2 border-t border-zinc-850">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-zinc-450 uppercase block">Dynamic SVG / Logo Image URL</label>
                <button
                  onClick={() => {
                    if (theme.logo?.url) {
                      const newJSON = JSON.parse(JSON.stringify(websiteJSON));
                      delete newJSON.theme.logo.url;
                      updateWebsiteJSON(newJSON);
                    }
                  }}
                  className="text-[9px] text-rose-400 hover:underline"
                >
                  {theme.logo?.url ? "Switch to Text Logo" : ""}
                </button>
              </div>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={theme.logo?.url || ""}
                  onChange={(e) => {
                    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
                    if (!newJSON.theme.logo) newJSON.theme.logo = {};
                    newJSON.theme.logo.url = e.target.value;
                    if (!newJSON.meta) newJSON.meta = {};
                    newJSON.meta.favicon = e.target.value;
                    updateWebsiteJSON(newJSON);
                  }}
                  placeholder="SVG Data URI or Image URL..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 text-[10px] p-2 rounded-lg text-zinc-300 font-mono overflow-hidden truncate outline-none focus:border-indigo-500"
                />
              </div>
              {theme.logo?.url && (
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center justify-center max-h-16 overflow-hidden">
                  <img src={theme.logo.url} alt="Logo Preview" className="h-10 w-auto object-contain" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Header & Navigation</h4>

            {/* Sticky Header Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-850">
              <span className="text-zinc-300">Sticky Navbar (Fix to Top)</span>
              <input
                type="checkbox"
                checked={globalSettings.headerConfig?.sticky !== false}
                onChange={(e) => handleUpdateHeaderConfig({ sticky: e.target.checked })}
                className="rounded bg-zinc-900 border-zinc-700 text-indigo-600 focus:ring-0 h-4 w-4 cursor-pointer"
              />
            </div>

            {/* Transparent Header Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-850">
              <span className="text-zinc-300">Glass / Transparent Blur</span>
              <input
                type="checkbox"
                checked={!!globalSettings.headerConfig?.transparent}
                onChange={(e) => handleUpdateHeaderConfig({ transparent: e.target.checked })}
                className="rounded bg-zinc-900 border-zinc-700 text-indigo-600 focus:ring-0 h-4 w-4 cursor-pointer"
              />
            </div>

            {/* Navigation Position */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-850">
              <label className="text-[10px] font-bold text-zinc-450 uppercase block">Menu Alignment</label>
              <div className="grid grid-cols-2 bg-zinc-900 p-1 border border-zinc-800 rounded-lg text-center">
                <button
                  onClick={() => handleUpdateHeaderConfig({ navPosition: "right" })}
                  className={`p-1.5 rounded transition-all ${globalSettings.headerConfig?.navPosition !== "center" ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-white"}`}
                >
                  Right Aligned
                </button>
                <button
                  onClick={() => handleUpdateHeaderConfig({ navPosition: "center" })}
                  className={`p-1.5 rounded transition-all ${globalSettings.headerConfig?.navPosition === "center" ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-white"}`}
                >
                  Centered
                </button>
              </div>
            </div>

            {/* WhatsApp CTA Toggle */}
            <div className="space-y-2 pt-2 border-t border-zinc-850">
              <div className="flex items-center justify-between">
                <span className="text-zinc-300">WhatsApp Button</span>
                <input
                  type="checkbox"
                  checked={globalSettings.whatsappButton !== false}
                  onChange={(e) => {
                    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
                    newJSON.globalSettings.whatsappButton = e.target.checked;
                    updateWebsiteJSON(newJSON);
                  }}
                  className="rounded bg-zinc-900 border-zinc-700 text-emerald-600 focus:ring-0 h-4 w-4 cursor-pointer"
                />
              </div>
              {globalSettings.whatsappButton !== false && (
                <input
                  type="text"
                  value={globalSettings.whatsappNumber || ""}
                  onChange={(e) => {
                    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
                    newJSON.globalSettings.whatsappNumber = e.target.value;
                    updateWebsiteJSON(newJSON);
                  }}
                  placeholder="+91 98765 43210"
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2.5 rounded-lg text-white font-mono"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER INSPECTOR --- */}
      {selectedElement?.type === "footer" && (
        <div className="space-y-5">
          <div className="space-y-4 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Footer Settings</h4>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-450 uppercase block">Business Name / Title</label>
              <input
                type="text"
                value={activeSection?.content?.businessName || ""}
                onChange={(e) => handleUpdateFooter({ businessName: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2.5 rounded-lg text-white font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-450 uppercase block">Copyright Text</label>
              <input
                type="text"
                value={activeSection?.content?.copyright || ""}
                onChange={(e) => handleUpdateFooter({ copyright: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2.5 rounded-lg text-white font-mono text-[11px]"
              />
            </div>

            {/* Contact Info Editing */}
            <div className="space-y-2 pt-3 border-t border-zinc-850">
              <h5 className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider">Contact Info Display</h5>
              <div className="space-y-2">
                <input
                  type="text"
                  value={activeSection?.content?.contactInfo?.phone || activeSection?.content?.phone || ""}
                  onChange={(e) => handleUpdateFooter({ contactInfo: { ...(activeSection?.content?.contactInfo || {}), phone: e.target.value } })}
                  placeholder="Phone Number"
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2 rounded text-white"
                />
                <input
                  type="text"
                  value={activeSection?.content?.contactInfo?.email || activeSection?.content?.email || ""}
                  onChange={(e) => handleUpdateFooter({ contactInfo: { ...(activeSection?.content?.contactInfo || {}), email: e.target.value } })}
                  placeholder="Email Address"
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2 rounded text-white"
                />
                <input
                  type="text"
                  value={activeSection?.content?.contactInfo?.address || activeSection?.content?.address || ""}
                  onChange={(e) => handleUpdateFooter({ contactInfo: { ...(activeSection?.content?.contactInfo || {}), address: e.target.value } })}
                  placeholder="Physical Address"
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2 rounded text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- SECTION / COMPONENT INSPECTOR --- */}
      {activeSection && selectedElement?.type !== "header" && selectedElement?.type !== "footer" && (
        <div className="space-y-5">

          {/* Section Management Toolbar (Up, Down, Duplicate, Delete) */}
          <div className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
            <span className="font-bold text-white capitalize">{activeSection.type} Section</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleSectionAction(activeSection.id, "up")}
                className="p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-all"
                title="Move Section Up"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handleSectionAction(activeSection.id, "down")}
                className="p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-all"
                title="Move Section Down"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handleSectionAction(activeSection.id, "duplicate")}
                className="p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-all"
                title="Duplicate Section"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handleSectionAction(activeSection.id, "delete")}
                className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                title="Delete Section"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Section Level Title & Subtitle Editing */}
          <div className="space-y-3 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <h4 className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider">Section Heading & Subtitle</h4>
            <div className="space-y-2">
              <input
                type="text"
                value={activeSection.content?.title || ""}
                onChange={(e) => updateSectionContent(activeSection.id, { title: e.target.value })}
                placeholder="Section Title"
                className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2.5 rounded-lg text-white font-bold"
              />
              {activeSection.content?.subtitle !== undefined && (
                <textarea
                  value={activeSection.content.subtitle || ""}
                  onChange={(e) => updateSectionContent(activeSection.id, { subtitle: e.target.value })}
                  placeholder="Section Subtitle"
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2.5 rounded-lg text-white h-16 resize-none leading-relaxed"
                />
              )}
            </div>
          </div>

          {/* --- HERO SECTION EDITOR --- */}
          {activeSection.type === "hero" && (
            <div className="space-y-4 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <h4 className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider">Hero Banner Settings</h4>

              <div className="space-y-2">
                <label className="text-[10px] text-zinc-400 block">Primary CTA Button</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={activeSection.content?.ctaText || ""}
                    onChange={(e) => updateSectionContent(activeSection.id, { ctaText: e.target.value })}
                    placeholder="Button Text"
                    className="bg-zinc-900 border border-zinc-800 p-2 rounded text-xs text-white"
                  />
                  <input
                    type="text"
                    value={activeSection.content?.ctaLink || ""}
                    onChange={(e) => updateSectionContent(activeSection.id, { ctaLink: e.target.value })}
                    placeholder="#contact or URL"
                    className="bg-zinc-900 border border-zinc-800 p-2 rounded text-xs text-white font-mono text-[10px]"
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-zinc-850">
                <label className="text-[10px] text-zinc-400 block">Hero Background Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={activeSection.content?.backgroundImage || ""}
                    onChange={(e) => updateSectionContent(activeSection.id, { backgroundImage: e.target.value })}
                    className="flex-1 bg-zinc-900 border border-zinc-800 p-2 rounded text-[10px] text-white font-mono"
                  />
                  <button
                    onClick={() => {
                      setActiveTab("assets");
                      handleAssetSelect({
                        sectionId: activeSection.id,
                        type: "hero_bg",
                        url: activeSection.content?.backgroundImage,
                        label: "Hero Background Image"
                      });
                    }}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-bold text-xs shrink-0"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- PRODUCT MANAGEMENT (Products, Catalog, Menu, Collections) --- */}
          {(activeSection.type === "products" || activeSection.type === "catalog" || activeSection.type === "menu" || activeSection.type === "collections" || activeSection.type === "featured-products" || activeSection.type === "popular-dishes" || activeSection.type === "properties") && (
            <div className="space-y-5">

              {/* Category Management Block */}
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
                <h4 className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider flex items-center justify-between">
                  <span>Categories & Tags</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(activeSection.content?.categories || []).map((cat, idx) => (
                    <span key={idx} className="bg-zinc-900 border border-zinc-800 text-white px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5">
                      {cat}
                      <button onClick={() => handleDeleteCategory(activeSection, cat)} className="text-zinc-500 hover:text-red-400">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="New Category Name..."
                    className="flex-1 bg-zinc-900 border border-zinc-800 p-2 rounded-lg text-xs text-white"
                  />
                  <button
                    onClick={() => handleAddCategory(activeSection)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg font-bold text-xs"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Product List Management */}
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Products ({activeSection.content?.products?.length || 0})
                  </h4>
                  <button
                    onClick={() => handleAddProduct(activeSection)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Product
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                  {(activeSection.content?.products || []).map((prod, idx) => {
                    const isEditing = editingIndex === idx;
                    return (
                      <div key={prod.id || idx} className="bg-zinc-900/90 border border-zinc-800/80 rounded-xl p-3 space-y-3 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            {prod.image && (
                              <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded object-cover border border-zinc-700 shrink-0" />
                            )}
                            <div>
                              <p className="font-bold text-white text-xs leading-tight">{prod.name}</p>
                              <span className="text-[10px] text-emerald-400 font-mono">{prod.price}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEditingIndex(isEditing ? null : idx)}
                              className={`p-1.5 rounded-lg transition-all ${isEditing ? "bg-indigo-600 text-white font-bold" : "bg-zinc-800 text-zinc-400 hover:text-white"}`}
                              title="Edit Details"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDuplicateProduct(activeSection, idx)}
                              className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all"
                              title="Duplicate"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(activeSection, idx)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Expandable Product Inspector */}
                        {isEditing && (
                          <div className="pt-3 border-t border-zinc-800 space-y-3 animate-fade-in">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[9px] text-zinc-450 block mb-1 uppercase font-bold">Product Name</label>
                                <input
                                  type="text"
                                  value={prod.name || ""}
                                  onChange={(e) => handleUpdateProduct(activeSection, idx, { name: e.target.value })}
                                  className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-white"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] text-zinc-450 block mb-1 uppercase font-bold">Price</label>
                                <input
                                  type="text"
                                  value={prod.price || ""}
                                  onChange={(e) => handleUpdateProduct(activeSection, idx, { price: e.target.value })}
                                  className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-white font-mono"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[9px] text-zinc-450 block mb-1 uppercase font-bold">Discount / Offer</label>
                                <input
                                  type="text"
                                  value={prod.discount || ""}
                                  placeholder="e.g. 20% OFF"
                                  onChange={(e) => handleUpdateProduct(activeSection, idx, { discount: e.target.value })}
                                  className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-white font-mono"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] text-zinc-450 block mb-1 uppercase font-bold">Badge</label>
                                <input
                                  type="text"
                                  value={prod.badge || ""}
                                  placeholder="e.g. Best Seller"
                                  onChange={(e) => handleUpdateProduct(activeSection, idx, { badge: e.target.value })}
                                  className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[9px] text-zinc-450 block mb-1 uppercase font-bold">Description</label>
                              <textarea
                                value={prod.description || ""}
                                onChange={(e) => handleUpdateProduct(activeSection, idx, { description: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-white h-16 resize-none leading-relaxed"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[9px] text-zinc-450 block mb-1 uppercase font-bold">Category</label>
                                <select
                                  value={prod.category || ""}
                                  onChange={(e) => handleUpdateProduct(activeSection, idx, { category: e.target.value })}
                                  className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-white"
                                >
                                  <option value="All Offerings">All Offerings</option>
                                  {(activeSection.content?.categories || ["Best Sellers", "New Arrivals", "Featured"]).map((c, ci) => (
                                    <option key={ci} value={c}>{c}</option>
                                  ))}
                                  <option value="Custom">Custom / Other</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-[9px] text-zinc-450 block mb-1 uppercase font-bold">Stock Status</label>
                                <select
                                  value={prod.availability || prod.stock || "In Stock"}
                                  onChange={(e) => handleUpdateProduct(activeSection, idx, { availability: e.target.value, stock: e.target.value })}
                                  className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-white font-semibold"
                                >
                                  <option value="In Stock">In Stock (Ready to Ship)</option>
                                  <option value="Limited Stock">Limited Stock (Only few left)</option>
                                  <option value="Pre-Order">Pre-Order Now</option>
                                  <option value="Out of Stock">Out of Stock</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="text-[9px] text-zinc-450 block mb-1 uppercase font-bold">Image URL / Asset</label>
                              <div className="flex gap-1.5">
                                <input
                                  type="text"
                                  value={prod.image || ""}
                                  placeholder="https://..."
                                  onChange={(e) => handleUpdateProduct(activeSection, idx, { image: e.target.value })}
                                  className="flex-1 bg-zinc-950 border border-zinc-800 p-2 rounded text-[10px] text-white font-mono truncate"
                                />
                                <button
                                  onClick={() => {
                                    setActiveTab("assets");
                                    handleAssetSelect({
                                      sectionId: activeSection.id,
                                      type: `product_image_${idx}`,
                                      url: prod.image,
                                      label: `${prod.name} Image`
                                    });
                                  }}
                                  className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-bold text-[10px] shrink-0 flex items-center gap-1"
                                  title="Replace Image from Assets"
                                >
                                  <RefreshCw className="h-3 w-3" />
                                  <span>Replace</span>
                                </button>
                                <button
                                  onClick={() => handleUpdateProduct(activeSection, idx, { image: "" })}
                                  className="px-2.5 py-1.5 bg-rose-600/20 hover:bg-rose-600 border border-rose-500/30 text-rose-300 hover:text-white rounded font-bold text-[10px] shrink-0 flex items-center justify-center transition-colors"
                                  title="Delete Image"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* --- GALLERY MANAGEMENT (Gallery, Showcase, Portfolio) --- */}
          {(activeSection.type === "gallery" || activeSection.type === "showcase" || activeSection.type === "portfolio") && (
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Gallery Images ({activeSection.content?.images?.length || 0})
                </h4>
                <button
                  onClick={() => handleAddGalleryImage(activeSection)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Image
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
                {(activeSection.content?.images || []).map((img, idx) => (
                  <div key={img.id || idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 space-y-2 relative group">
                    <div className="relative h-28 w-full rounded-lg overflow-hidden bg-zinc-950">
                      <img src={img.url} alt={img.caption || `Image ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setActiveTab("assets");
                            handleAssetSelect({
                              sectionId: activeSection.id,
                              type: `gallery_image_${idx}`,
                              url: img.url,
                              label: `Gallery Image #${idx + 1}`
                            });
                          }}
                          className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
                          title="Replace Image"
                        >
                          Replace
                        </button>
                        <button
                          onClick={() => handleDeleteGalleryImage(activeSection, idx)}
                          className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs"
                          title="Delete Image"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={img.caption || ""}
                      onChange={(e) => handleUpdateGalleryImage(activeSection, idx, { caption: e.target.value })}
                      placeholder="Image Caption..."
                      className="w-full bg-zinc-950 border border-zinc-800/80 p-1.5 rounded text-[11px] text-white text-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- SERVICES / PROGRAMS MANAGEMENT --- */}
          {(activeSection.type === "services" || activeSection.type === "programs" || activeSection.type === "consultation") && (
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Services ({activeSection.content?.services?.length || 0})
                </h4>
                <button
                  onClick={() => {
                    const servs = activeSection.content.services || [];
                    const newServ = { name: "New Professional Service", description: "Comprehensive service tailored to deliver superior results.", icon: "Star" };
                    updateSectionContent(activeSection.id, { services: [newServ, ...servs] });
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Service
                </button>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {(activeSection.content?.services || []).map((serv, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={serv.name || ""}
                        onChange={(e) => {
                          const servs = [...activeSection.content.services];
                          servs[idx].name = e.target.value;
                          updateSectionContent(activeSection.id, { services: servs });
                        }}
                        className="font-bold bg-zinc-950 border border-zinc-800 p-1.5 rounded text-xs text-white w-2/3"
                      />
                      <button
                        onClick={() => {
                          const servs = [...activeSection.content.services];
                          servs.splice(idx, 1);
                          updateSectionContent(activeSection.id, { services: servs });
                        }}
                        className="text-zinc-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <textarea
                      value={serv.description || ""}
                      onChange={(e) => {
                        const servs = [...activeSection.content.services];
                        servs[idx].description = e.target.value;
                        updateSectionContent(activeSection.id, { services: servs });
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-zinc-300 h-14 resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section Row Styling (Spacing & Padding) */}
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
            <h4 className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider">Row Spacing & Padding</h4>
            <select
              value={activeSection.styles?.spacingValue || theme.spacing || "normal"}
              onChange={(e) => updateSectionContent(activeSection.id, null, { spacingValue: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2.5 rounded-lg text-white outline-none"
            >
              <option value="compact">Compact (Py-8)</option>
              <option value="normal">Standard (Py-16)</option>
              <option value="spacious">Spacious (Py-24)</option>
              <option value="relaxed">Relaxed (Py-32)</option>
            </select>
          </div>

        </div>
      )}

      {/* --- ELEMENT SPECIFIC OVERRIDE INSPECTOR (Text, Button, Image) --- */}
      {selectedElement && selectedElement.type !== "section" && selectedElement.type !== "header" && selectedElement.type !== "footer" && (
        <div className="space-y-4 p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between border-b border-zinc-850 pb-2">
            <span>Direct Element Override ({selectedElement.type})</span>
          </h4>

          {selectedElement.type === "text" && (
            <div className="space-y-2">
              <label className="text-[10px] text-zinc-400 block font-bold uppercase">Text Content</label>
              <textarea
                value={selectedElement.value || ""}
                onChange={(e) => {
                  setSelectedElement(prev => ({ ...prev, value: e.target.value }));
                  handleTextChange(selectedElement.sectionId, selectedElement.fieldKey, e.target.value, selectedElement.index);
                }}
                onBlur={handleTextBlur}
                className="w-full bg-zinc-900 border border-zinc-800 text-xs p-3 rounded-lg text-white h-24 resize-none leading-relaxed"
              />
            </div>
          )}

          {selectedElement.type === "button" && (
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-zinc-400 block font-bold uppercase mb-1">Button Text</label>
                <input
                  type="text"
                  value={selectedElement.value || ""}
                  onChange={(e) => {
                    setSelectedElement(prev => ({ ...prev, value: e.target.value }));
                    handleTextChange(selectedElement.sectionId, selectedElement.fieldKey, e.target.value, selectedElement.index);
                  }}
                  onBlur={handleTextBlur}
                  className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2.5 rounded-lg text-white font-bold"
                />
              </div>
            </div>
          )}

          {selectedElement.type === "image" && (
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-zinc-400 block font-bold uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={selectedElement.value || ""}
                  onChange={(e) => {
                    setSelectedElement(prev => ({ ...prev, value: e.target.value }));
                    updateImageURL(selectedElement.sectionId, selectedElement.fieldKey, e.target.value);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono p-2.5 rounded-lg text-white"
                />
              </div>
              <button
                onClick={() => {
                  setActiveTab("assets");
                  handleAssetSelect({
                    sectionId: selectedElement.sectionId,
                    type: selectedElement.fieldKey,
                    url: selectedElement.value,
                    label: "Selected Image"
                  });
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs shadow-md"
              >
                Open Image Editor Tools
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
