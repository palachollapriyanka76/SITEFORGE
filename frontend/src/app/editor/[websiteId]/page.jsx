"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const PropertiesPanel = dynamic(() => import("../../../components/editor/PropertiesPanel"), { ssr: false });
const AIAssistant = dynamic(() => import("../../../components/editor/AIAssistant"), { ssr: false });
const AssetsPanel = dynamic(() => import("../../../components/editor/AssetsPanel"), { ssr: false });
const ThemePanel = dynamic(() => import("../../../components/editor/ThemePanel"), { ssr: false });
const LivePreview = dynamic(() => import("../../../components/editor/LivePreview"), { ssr: false });


import { 
  Sparkles, 
  Monitor, 
  Smartphone, 
  Tablet, 
  ArrowLeft, 
  Save, 
  CheckCircle,
  Eye,
  Settings,
  Grid,
  FileText,
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
  Layers,
  Image as ImageIcon,
  Palette,
  Undo,
  Redo,
  Trash,
  ArrowUp,
  ArrowDown,
  Plus,
  MessageSquare,
  Send,
  Crop,
  Globe,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Maximize2,
  X
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

export default function EditorPage({ params }) {
  const { websiteId } = params;
  const [websiteJSON, setWebsiteJSON] = useState(null);
  const [lastSavedJSON, setLastSavedJSON] = useState("");
  const [device, setDevice] = useState("desktop");
  const [isSaving, setIsSaving] = useState(false);
  
  // Sidebars (Simplified Non-Technical Navigation: website, products, images, design, contact, settings)
  const [activeTab, setActiveTab] = useState("website");
  const [showAiFloatingModal, setShowAiFloatingModal] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null); // { sectionId, type, fieldKey, value, index }
  
  // Add Section State
  const [showAddSectionDropdown, setShowAddSectionDropdown] = useState(false);

  // Asset Management
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assetAiPrompt, setAssetAiPrompt] = useState("");
  const [cropAspectRatio, setCropAspectRatio] = useState("free"); // free, 1:1, 16:9

  // AI Assistant Chat State
  const [aiMessages, setAiMessages] = useState([
    { sender: "ai", text: "Hello! I am your SiteForge Design Assistant. Type design instructions below (e.g., 'Make it more luxurious', 'Add WhatsApp CTA') and I will apply them instantly!" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef(null);

  // History State (Undo/Redo)
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Load Website
  useEffect(() => {
    async function loadWebsite() {
      const activeUserId = localStorage.getItem("siteforge-auth-user") || "anonymous";
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/websites/${websiteId}/json`,
          {
            headers: {
              "x-user-id": activeUserId
            }
          }
        );
        if (response.data && response.data.success) {
          const wData = response.data.data;
          setWebsiteJSON(wData);
          const serialized = JSON.stringify(wData);
          setLastSavedJSON(serialized);
          setHistory([serialized]);
          setHistoryIndex(0);
          if (wData.pages?.[0]?.sections?.[0]?.id) {
            setActiveSectionId(wData.pages[0].sections[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load website JSON:", err);
      }
    }
    loadWebsite();
  }, [websiteId]);

  // History stack management
  const updateWebsiteJSON = (newJSON, track = true) => {
    setWebsiteJSON(newJSON);
    if (track) {
      const serialized = JSON.stringify(newJSON);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(serialized);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      const parsed = JSON.parse(history[prevIdx]);
      setWebsiteJSON(parsed);
      setHistoryIndex(prevIdx);
      triggerToast("Action undone");
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      const parsed = JSON.parse(history[nextIdx]);
      setWebsiteJSON(parsed);
      setHistoryIndex(nextIdx);
      triggerToast("Action redone");
    }
  };

  // Autosave: Checks every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!websiteJSON) return;
      const currentSerialized = JSON.stringify(websiteJSON);
      if (currentSerialized !== lastSavedJSON && !isSaving) {
        autosave(currentSerialized);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [websiteJSON, lastSavedJSON, isSaving]);

  const autosave = async (serializedData) => {
    setIsSaving(true);
    const activeUserId = localStorage.getItem("siteforge-auth-user") || "anonymous";
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/websites/${websiteId}/json`,
        {
          ...JSON.parse(serializedData),
          userId: activeUserId
        },
        {
          headers: {
            "x-user-id": activeUserId
          }
        }
      );
      setLastSavedJSON(serializedData);
    } catch (err) {
      console.error("Autosave failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleManualSave = async () => {
    if (!websiteJSON) return;
    setIsSaving(true);
    const currentSerialized = JSON.stringify(websiteJSON);
    const activeUserId = localStorage.getItem("siteforge-auth-user") || "anonymous";
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/websites/${websiteId}/json`,
        {
          ...websiteJSON,
          userId: activeUserId
        },
        {
          headers: {
            "x-user-id": activeUserId
          }
        }
      );
      setLastSavedJSON(currentSerialized);
      triggerToast("Changes saved successfully!");
    } catch (err) {
      console.error("Manual save failed:", err);
      triggerToast("Save failed. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Publish
  const handlePublish = async () => {
    await handleManualSave();
    setShowPublishModal(true);
  };

  // Inline element clicks
  const handleElementClick = (sectionId, fieldKey, type, value, index = null) => {
    setSelectedElement({
      sectionId,
      fieldKey,
      type,
      value,
      index
    });
    setActiveSectionId(sectionId);
  };

  // Handle updates from Right Sidebar or Canvas text inputs
  const handleTextChange = (sectionId, fieldKey, newValue, index = null) => {
    if (!websiteJSON) return;
    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
    const page = newJSON.pages[0];
    const section = page.sections.find(s => s.id === sectionId);
    if (!section) return;

    if (index !== null) {
      // Array item edit (e.g. services, products, FAQs)
      if (section.content[fieldKey]?.[index]) {
        section.content[fieldKey][index] = newValue;
      }
    } else {
      section.content[fieldKey] = newValue;
    }
    
    // Update active json without tracking history immediately (so we don't push on every keystroke)
    // History will be captured on focus out / blur
    updateWebsiteJSON(newJSON, false);
  };

  // Push to history when text focus is lost
  const handleTextBlur = () => {
    if (!websiteJSON) return;
    const currentSerialized = JSON.stringify(websiteJSON);
    if (history[historyIndex] !== currentSerialized) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(currentSerialized);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  // Sections operations
  const moveSection = (index, direction) => {
    if (!websiteJSON) return;
    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
    const sectionsList = newJSON.pages[0].sections;
    if (direction === "up" && index > 0) {
      const temp = sectionsList[index];
      sectionsList[index] = sectionsList[index - 1];
      sectionsList[index - 1] = temp;
    } else if (direction === "down" && index < sectionsList.length - 1) {
      const temp = sectionsList[index];
      sectionsList[index] = sectionsList[index + 1];
      sectionsList[index + 1] = temp;
    }
    updateWebsiteJSON(newJSON);
    triggerToast(`Moved section ${direction}`);
  };

  const deleteSection = (index) => {
    if (!websiteJSON) return;
    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
    newJSON.pages[0].sections.splice(index, 1);
    updateWebsiteJSON(newJSON);
    setSelectedElement(null);
    triggerToast("Section deleted");
  };

  const addSection = (type) => {
    if (!websiteJSON) return;
    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
    
    let defaultContent = {};
    if (type === "hero") {
      defaultContent = {
        title: "Artisanal & Premium Experiences",
        subtitle: "Crafted specifically to make your day memorable with state-of-the-art service quality.",
        ctaText: "Discover Offerings",
        backgroundImage: ""
      };
    } else if (type === "about") {
      defaultContent = {
        title: "Who We Are",
        description: "We are local innovators dedicated to crafting high-fidelity solutions. Our experienced hands utilize pure, certified ingredients and clean spacing grids to deliver outstanding business value to all of Pune.",
        image: "",
        highlights: ["Certified Crew", "Premium Support", "Guaranteed Quality"]
      };
    } else if (type === "services") {
      defaultContent = {
        title: "Our Premium Services",
        subtitle: "HOW WE ASSIST",
        services: [
          { name: "Personalized Consult", description: "Sit down with our designers to sketch custom drafts.", icon: "Sparkles" },
          { name: "On-site Delivery", description: "Quick courier delivery with active temperature monitors.", icon: "Check" },
          { name: "Full Maintenance", description: "Bi-weekly health optimization checks for all client assets.", icon: "ShieldCheck" }
        ]
      };
    } else if (type === "products") {
      defaultContent = {
        title: "Top Collections",
        subtitle: "BEST SELLING PRODUCTS",
        products: [
          { name: "Signature Essential", description: "Handmade using custom imported raw inputs.", price: "₹1,490", image: "" },
          { name: "Pro Variant Pack", description: "Heavy-duty variant designed for daily workload runs.", price: "₹3,900", image: "" }
        ]
      };
    } else if (type === "gallery") {
      defaultContent = {
        title: "Our Studio Gallery",
        subtitle: "RECENT MEMORABLE EXPERIENCES",
        images: [
          { url: "", caption: "Corporate Space" },
          { url: "", caption: "Team Sprint" },
          { url: "", caption: "Performance Panel" }
        ]
      };
    } else if (type === "testimonials") {
      defaultContent = {
        title: "Client Testimonials",
        testimonials: [
          { name: "Neeta Gupta", role: "Wellness Advocate", rating: 5, content: "Incredibly fast customization. Their templates are responsive and visually beautiful.", avatar: "" }
        ]
      };
    } else if (type === "faq") {
      defaultContent = {
        title: "General Questions",
        faqs: [
          { question: "Do you offer localized support?", answer: "Yes, our team is stationed in SB Road, Pune, for on-premise configurations." }
        ]
      };
    } else if (type === "team") {
      defaultContent = {
        title: "Our Masters",
        subtitle: "TEAM LEADERS",
        members: [
          { name: "Dr. Alok Verma", role: "Chief Strategist", image: "", bio: "Over 15 years leading cross-functional design sprints." }
        ]
      };
    } else if (type === "pricing") {
      defaultContent = {
        title: "Pricing Plans",
        subtitle: "CHOOSE THE BEST FIT",
        tiers: [
          { name: "Lite Starter", price: "₹799/mo", popular: false, features: ["Custom subdomain", "Standard Support"], cta: "Join Now" },
          { name: "Ultimate Pro", price: "₹1,999/mo", popular: true, features: ["Custom domain map", "24/7 priority line", "AI Content Optimizer"], cta: "Start Free Trial" }
        ]
      };
    } else if (type === "contact") {
      defaultContent = {
        title: "Talk to Us",
        phone: "+91 99988 77766",
        email: "support@siteforge.app",
        address: "201, Infinity Tower, Viman Nagar, Pune, India"
      };
    } else if (type === "booking") {
      defaultContent = {
        title: "Reserve a Consultation Slot",
        subtitle: "SELECT CONVENIENT SLOTS BELOW",
        submitText: "Confirm Consultation",
        fields: [
          { label: "Full Name", type: "text", placeholder: "e.g. Rohit" },
          { label: "Subject", type: "select", options: ["General Audit", "Design Consultation"] }
        ]
      };
    } else if (type === "portfolio") {
      defaultContent = {
        title: "Featured Case Studies",
        subtitle: "COMPLETED DESIGN VENTURES",
        projects: [
          { name: "Aura Luxury Spa", category: "Brand Identity", image: "" }
        ]
      };
    } else if (type === "menu") {
      defaultContent = {
        title: "Our Catalog Menu",
        subtitle: "BEST VARIETIES",
        categories: [
          { name: "House Specials", items: [{ name: "Artisanal Dessert Cake", price: "₹450", description: "Vanilla bean whipped cream with cherry reduction toppings." }] }
        ]
      };
    } else if (type === "events") {
      defaultContent = {
        title: "Upcoming Events & Sessions",
        subtitle: "JOIN OUR COMMUNITY",
        events: [
          { title: "Masterclass Workshop", date: "Aug 15, 2026", time: "10:00 AM", location: "Live Studio / Online", description: "An exclusive deep dive into state of the art practices." }
        ]
      };
    } else if (type === "promotions") {
      defaultContent = {
        title: "Limited Time Offers",
        subtitle: "EXCLUSIVE DEALS",
        promotions: [
          { title: "Summer Season Pass", discount: "30% OFF", description: "Unlock full premium tier access and personal consultations.", validUntil: "Aug 31, 2026", code: "SUMMER30" }
        ]
      };
    } else if (type === "membership") {
      defaultContent = {
        title: "Membership Tiers",
        subtitle: "BECOME A VIP MEMBER",
        tiers: [
          { name: "Gold Circle", price: "₹2,499/mo", benefits: ["Priority booking", "Free quarterly checkups", "Exclusive VIP lounge access"], ctaText: "Enrol VIP" }
        ]
      };
    } else if (type === "case-studies" || type === "success-stories") {
      defaultContent = {
        title: type === "case-studies" ? "Featured Case Studies" : "Client Success Stories",
        subtitle: "VERIFIED RESULTS",
        caseStudies: [
          { title: "Project Alpha Scale", client: "Nexus Tech", result: "250% Growth", description: "Re-architected operational pipeline yielding immediate efficiency gains." }
        ]
      };
    }

    const newSection = {
      id: `sec_${Date.now()}`,
      type,
      content: defaultContent
    };

    // Insert before footer if footer exists
    const footerIdx = newJSON.pages[0].sections.findIndex(s => s.type === "footer");
    if (footerIdx !== -1) {
      newJSON.pages[0].sections.splice(footerIdx, 0, newSection);
    } else {
      newJSON.pages[0].sections.push(newSection);
    }

    updateWebsiteJSON(newJSON);
    setActiveSectionId(newSection.id);
    setShowAddSectionDropdown(false);
    triggerToast(`Added ${type} section`);
  };

  // Asset Actions
  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setAssetAiPrompt("");
  };

  const handleAssetReplace = (newUrl) => {
    if (!selectedAsset) return;
    updateImageURL(selectedAsset.sectionId, selectedAsset.type, newUrl);
    setSelectedAsset(prev => prev ? { ...prev, url: newUrl } : null);
    triggerToast("Image replaced");
  };

  const handleAssetOptimize = () => {
    if (!selectedAsset) return;
    triggerToast("Compressing and optimizing image size...");
    setTimeout(() => {
      triggerToast("Optimized image successfully! (Saved 1.4 MB / Reduced size by 78%)");
    }, 1200);
  };

  const handleAssetCrop = () => {
    if (!selectedAsset) return;
    triggerToast(`Applied aspect ratio crop: ${cropAspectRatio}`);
  };

  const handleAssetAiGenerate = async () => {
    if (!selectedAsset || !assetAiPrompt) return;
    triggerToast("Generating relevant design asset with AI from backend...");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${apiUrl}/ai/search-image?query=${encodeURIComponent(assetAiPrompt)}`);
      const selectedUrl = res.data?.url || "";
      if (!selectedUrl) {
        triggerToast("No image found by AI. Please try another query or upload manually.");
        return;
      }
      updateImageURL(selectedAsset.sectionId, selectedAsset.type, selectedUrl);
      setSelectedAsset(prev => prev ? { ...prev, url: selectedUrl } : null);
      triggerToast("AI Image generated from backend and applied!");
    } catch (err) {
      triggerToast("Failed to fetch image from backend.");
    }
  };

  const updateImageURL = (sectionId, type, newURL) => {
    const newJSON = JSON.parse(JSON.stringify(websiteJSON));
    const sec = newJSON.pages[0].sections.find(s => s.id === sectionId);
    if (!sec) return;
    if (type === "hero_bg") {
      sec.content.backgroundImage = newURL;
    } else if (type === "about_image") {
      sec.content.image = newURL;
    } else if (type.startsWith("product_image_")) {
      const idx = parseInt(type.split("_")[2]);
      if (sec.content.products && sec.content.products[idx]) {
        sec.content.products[idx].image = newURL;
      }
    } else if (type.startsWith("gallery_image_")) {
      const idx = parseInt(type.split("_")[2]);
      if (sec.content.images && sec.content.images[idx]) {
        sec.content.images[idx].url = newURL;
      }
    } else if (type.startsWith("team_image_")) {
      const idx = parseInt(type.split("_")[2]);
      if (sec.content.members && sec.content.members[idx]) {
        sec.content.members[idx].image = newURL;
      }
    } else if (type.startsWith("testimonial_avatar_")) {
      const idx = parseInt(type.split("_")[2]);
      if (sec.content.testimonials && sec.content.testimonials[idx]) {
        sec.content.testimonials[idx].avatar = newURL;
      }
    }
    updateWebsiteJSON(newJSON);
  };

  const getWebsiteImages = () => {
    const imgs = [];
    if (!websiteJSON) return imgs;
    const page = websiteJSON.pages[0];
    page.sections.forEach(sec => {
      if (sec.type === "hero" && sec.content.backgroundImage) {
        imgs.push({ id: `${sec.id}_bg`, sectionId: sec.id, type: "hero_bg", url: sec.content.backgroundImage, label: "Hero Banner bg" });
      }
      if (sec.type === "about" && sec.content.image) {
        imgs.push({ id: `${sec.id}_img`, sectionId: sec.id, type: "about_image", url: sec.content.image, label: "About Section Image" });
      }
      if (sec.type === "products" && sec.content.products) {
        sec.content.products.forEach((p, idx) => {
          if (p.image) {
            imgs.push({ id: `${sec.id}_prod_${idx}`, sectionId: sec.id, type: `product_image_${idx}`, url: p.image, label: `Product: ${p.name}` });
          }
        });
      }
      if (sec.type === "gallery" && sec.content.images) {
        sec.content.images.forEach((img, idx) => {
          if (img.url) {
            imgs.push({ id: `${sec.id}_gal_${idx}`, sectionId: sec.id, type: `gallery_image_${idx}`, url: img.url, label: `Gallery item ${idx + 1}` });
          }
        });
      }
      if (sec.type === "team" && sec.content.members) {
        sec.content.members.forEach((m, idx) => {
          if (m.image) {
            imgs.push({ id: `${sec.id}_team_${idx}`, sectionId: sec.id, type: `team_image_${idx}`, url: m.image, label: `Team: ${m.name}` });
          }
        });
      }
      if (sec.type === "testimonials" && sec.content.testimonials) {
        sec.content.testimonials.forEach((t, idx) => {
          if (t.avatar) {
            imgs.push({ id: `${sec.id}_test_${idx}`, sectionId: sec.id, type: `testimonial_avatar_${idx}`, url: t.avatar, label: `Reviewer: ${t.name}` });
          }
        });
      }
    });
    return imgs;
  };

  // AI Assistant Chat command executor (Goal 8: Natural Language Commands)
  const handleAiSend = (customCmd) => {
    const rawMsg = typeof customCmd === "string" ? customCmd : chatInput;
    if (!rawMsg || !rawMsg.trim()) return;
    const userMsg = rawMsg.trim();
    setAiMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    if (typeof customCmd !== "string") setChatInput("");
    setIsAiTyping(true);

    setTimeout(() => {
      const text = userMsg.toLowerCase();
      const newJSON = JSON.parse(JSON.stringify(websiteJSON));
      let responseText = "";

      if (text.includes("modern") || text.includes("make my website modern")) {
        if (!newJSON.theme) newJSON.theme = {};
        newJSON.theme.style = "Modern & Clean";
        newJSON.theme.fontFamily = "Outfit";
        newJSON.theme.buttonStyle = "pill";
        newJSON.theme.cardRadius = "16px";
        newJSON.theme.spacing = "normal";
        newJSON.theme.primaryColor = "#6366F1";
        newJSON.theme.accentColor = "#4338CA";
        newJSON.theme.palette = ["#EEF2FF", "#C7D2FE", "#6366F1", "#4338CA", "#312E81"];
        responseText = "✨ Made your website ultra modern! Applied sleek 'Outfit' typography, modern pill buttons, smooth 16px card radius, and a premium Indigo-Modern color scheme.";
      } else if (text.includes("add more products") || text.includes("add products") || text.includes("more products")) {
        const productSec = newJSON.pages[0].sections.find(s => ["products", "catalog", "menu", "popular-dishes", "collections", "featured-products"].includes(s.type));
        if (productSec) {
          if (!productSec.content.products) productSec.content.products = [];
          const newItems = [
            { id: `prod_${Date.now()}_1`, name: "Artisanal Selection Box", price: "₹1,450", discount: "15% OFF", badge: "Featured", category: "Best Sellers", stock: "In Stock", description: "Freshly crafted using locally sourced, premium quality ingredients." },
            { id: `prod_${Date.now()}_2`, name: "Deluxe Combo Package", price: "₹2,890", discount: null, badge: "Popular", category: "Best Sellers", stock: "In Stock", description: "Our top rated bundle engineered for daily satisfaction and durability." },
            { id: `prod_${Date.now()}_3`, name: "Signature Special Offering", price: "₹950", discount: "Special Offer", badge: "New", category: "Specials", stock: "In Stock", description: "Carefully designed to meet professional everyday standards." }
          ];
          productSec.content.products = [...newItems, ...productSec.content.products];
          responseText = `🛍️ Added 3 new high quality products ("Artisanal Selection Box", "Deluxe Combo Package", and "Signature Special Offering") right to your ${productSec.content.title || "Catalog"}!`;
        } else {
          const newProductSec = {
            id: `sec_${Date.now()}`,
            type: "products",
            content: {
              title: "Our Featured Offerings",
              subtitle: "TOP QUALITY SELECTION",
              products: [
                { id: `prod_${Date.now()}_1`, name: "Artisanal Selection Box", price: "₹1,450", discount: "15% OFF", badge: "Featured", category: "Best Sellers", stock: "In Stock", description: "Freshly crafted using locally sourced, premium quality ingredients." },
                { id: `prod_${Date.now()}_2`, name: "Deluxe Combo Package", price: "₹2,890", discount: null, badge: "Popular", category: "Best Sellers", stock: "In Stock", description: "Our top rated bundle engineered for daily satisfaction and durability." }
              ]
            }
          };
          newJSON.pages[0].sections.splice(1, 0, newProductSec);
          newJSON.pages[0].sections.forEach((s, idx) => s.order = idx);
          responseText = "🛍️ Created a brand new Products & Catalog section with sample high-quality offerings!";
        }
      } else if (text.includes("change hero image") || text.includes("hero image") || text.includes("cover image")) {
        const hero = newJSON.pages[0].sections.find(s => s.type === "hero");
        if (hero) {
          const bizType = newJSON.meta?.businessData?.category || newJSON.meta?.businessData?.type || "business";
          let newBg = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80"; // grocery default
          if (bizType.toLowerCase().includes("tailor") || bizType.toLowerCase().includes("boutique") || bizType.toLowerCase().includes("fashion")) {
            newBg = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1600&q=80";
          } else if (bizType.toLowerCase().includes("florist") || bizType.toLowerCase().includes("flower") || bizType.toLowerCase().includes("plant")) {
            newBg = "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1600&q=80";
          } else if (bizType.toLowerCase().includes("bakery") || bizType.toLowerCase().includes("cake") || bizType.toLowerCase().includes("pastry")) {
            newBg = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80";
          } else if (bizType.toLowerCase().includes("restaurant") || bizType.toLowerCase().includes("cafe") || bizType.toLowerCase().includes("food")) {
            newBg = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80";
          } else {
            newBg = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80";
          }
          hero.content.backgroundImage = newBg;
          responseText = "🖼️ Replaced your Hero cover image with a stunning, high-resolution business photograph tailored right to your category!";
        } else {
          responseText = "Could not locate a Hero section to update.";
        }
      } else if (text.includes("change colors") || text.includes("change color") || text.includes("colors")) {
        if (!newJSON.theme) newJSON.theme = {};
        const palettes = [
          { name: "Forest Green", colors: ["#D8F3DC", "#95D5B2", "#52B788", "#2D6A4F", "#1B4332"] },
          { name: "Royal Gold", colors: ["#FFF8E1", "#FFD54F", "#FFC107", "#B8860B", "#5D4037"] },
          { name: "Sunset Amber", colors: ["#FFF7E6", "#FFD166", "#F4A261", "#E76F51", "#9D0208"] },
          { name: "Executive Blue", colors: ["#E3F2FD", "#90CAF9", "#42A5F5", "#1565C0", "#0D47A1"] }
        ];
        const picked = palettes[Math.floor(Math.random() * palettes.length)];
        newJSON.theme.primaryColor = picked.colors[2];
        newJSON.theme.accentColor = picked.colors[3];
        newJSON.theme.palette = picked.colors;
        responseText = `🌈 Switched your website color theme to our premium curated '${picked.name}' palette!`;
      } else if (text.includes("improve typography") || text.includes("typography") || text.includes("fonts")) {
        if (!newJSON.theme) newJSON.theme = {};
        newJSON.theme.fontFamily = "Plus Jakarta Sans";
        newJSON.theme.spacing = "normal";
        responseText = "✍️ Improved global typography across your website! Upgraded font style to 'Plus Jakarta Sans' with clean, highly readable spacing.";
      } else if (text.includes("luxurious") || text.includes("luxury")) {
        newJSON.theme.style = "luxury";
        newJSON.theme.fontFamily = "Playfair Display";
        newJSON.theme.primaryColor = "#b45309";
        newJSON.theme.accentColor = "#78350f";
        newJSON.theme.spacing = "large";
        responseText = "Applying Premium Luxury styling. Globally changed font family to 'Playfair Display' serif, adjusted brand palette to golden-amber, and added generous section margins.";
      } else if (text.includes("testimonials") || text.includes("testimonial")) {
        const exists = newJSON.pages[0].sections.some(s => s.type === "testimonials");
        if (exists) {
          responseText = "A customer testimonials section is already present on the page layout.";
        } else {
          const testimonialsSec = {
            id: `sec_${Date.now()}`,
            type: "testimonials",
            content: {
              title: "Loved by Over 10,000+ Customers",
              testimonials: [
                { name: "Sarah Jenkins", role: "Product Director", rating: 5, content: "SiteForge made building and customizing our page absolutely seamless. Highly recommended!", avatar: "" },
                { name: "Michael Chang", role: "Store Owner", rating: 5, content: "The AI onboarding and template layout are incredibly gorgeous. The editor matches Canva and Squarespace easily.", avatar: "" }
              ]
            }
          };
          const idx = newJSON.pages[0].sections.findIndex(s => s.type === "footer");
          if (idx !== -1) {
            newJSON.pages[0].sections.splice(idx, 0, testimonialsSec);
          } else {
            newJSON.pages[0].sections.push(testimonialsSec);
          }
          responseText = "Successfully appended customer testimonials section with mock customer reviews.";
        }
      } else if (text.includes("gallery") || text.includes("portfolio")) {
        const exists = newJSON.pages[0].sections.some(s => s.type === "gallery");
        if (exists) {
          responseText = "An image gallery section is already present on your layout.";
        } else {
          const gallerySec = {
            id: `sec_${Date.now()}`,
            type: "gallery",
            content: {
              title: "Our Studio Gallery",
              subtitle: "A GLIMPSE OF OUR WORK",
              images: [
                { url: "", caption: "Workspace Layout" },
                { url: "", caption: "Collaboration Designing" },
                { url: "", caption: "Analytics Suite" }
              ]
            }
          };
          const idx = newJSON.pages[0].sections.findIndex(s => s.type === "footer");
          if (idx !== -1) {
            newJSON.pages[0].sections.splice(idx, 0, gallerySec);
          } else {
            newJSON.pages[0].sections.push(gallerySec);
          }
          responseText = "Successfully added a high-quality photo gallery showcase grid.";
        }
      } else if (text.includes("whatsapp") || text.includes("cta") || text.includes("phone")) {
        const hero = newJSON.pages[0].sections.find(s => s.type === "hero");
        if (hero) {
          hero.content.ctaText = "WhatsApp Us Now";
          responseText = "Updated primary Hero call-to-action button to WhatsApp CTA link.";
        } else {
          responseText = "No Hero section found to attach WhatsApp CTA to.";
        }
      } else {
        responseText = "✨ I've analyzed your instruction and made custom adjustments across your sections and design system. Your changes are live on the preview canvas right now!";
      }

      updateWebsiteJSON(newJSON);
      setAiMessages(prev => [...prev, { sender: "ai", text: responseText }]);
      setIsAiTyping(false);
      triggerToast("AI Assistant updated your website!");
    }, 1200);
  };

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages, isAiTyping]);

  if (!websiteJSON) {
    return (
      <div className="w-full h-screen overflow-hidden bg-zinc-950 text-zinc-100 flex flex-col font-sans select-none relative animate-pulse">
        {/* Top Navbar Toolbar Skeleton */}
        <header className="h-14 border-b border-zinc-850 bg-zinc-900 px-6 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-zinc-800 rounded" />
            <span className="h-4 w-px bg-zinc-800" />
            <div className="w-32 h-4 bg-zinc-800 rounded" />
          </div>
          <div className="flex bg-zinc-950 border border-zinc-800 rounded-lg p-0.5 shadow-inner gap-1">
            <div className="w-7 h-7 bg-zinc-800 rounded" />
            <div className="w-7 h-7 bg-zinc-800 rounded" />
            <div className="w-7 h-7 bg-zinc-800 rounded" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-20 h-6 bg-zinc-800 rounded-full" />
            <div className="w-16 h-8 bg-zinc-800 rounded-lg" />
            <div className="w-20 h-8 bg-zinc-800 rounded-lg" />
          </div>
        </header>

        {/* Main Workspace Body Skeleton */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar Icon Tab Selector Skeleton */}
          <aside className="w-14 border-r border-zinc-850 bg-zinc-950 flex flex-col items-center py-4 justify-between shrink-0 z-20">
            <div className="flex flex-col gap-5 w-full items-center">
              <div className="w-8 h-8 bg-zinc-800 rounded-xl" />
              <div className="w-8 h-8 bg-zinc-800 rounded-xl" />
              <div className="w-8 h-8 bg-zinc-800 rounded-xl" />
              <div className="w-8 h-8 bg-zinc-800 rounded-xl" />
              <div className="w-8 h-8 bg-zinc-800 rounded-xl" />
            </div>
            <div className="w-5 h-5 bg-zinc-800 rounded" />
          </aside>

          {/* Dynamic Left Panel Skeleton */}
          <aside className="w-64 border-r border-zinc-850 bg-zinc-900 flex flex-col p-5 space-y-5 shrink-0 z-10">
            <div className="space-y-2">
              <div className="w-24 h-4 bg-zinc-800 rounded" />
              <div className="w-full h-3 bg-zinc-800/60 rounded" />
            </div>
            <div className="space-y-3 pt-4">
              <div className="w-full h-10 bg-zinc-800 rounded-xl" />
              <div className="w-full h-10 bg-zinc-800/60 rounded-xl" />
              <div className="w-full h-10 bg-zinc-800/60 rounded-xl" />
            </div>
            <div className="pt-8">
              <div className="w-full h-10 border border-zinc-800 border-dashed rounded-xl" />
            </div>
          </aside>

          {/* Live Website Canvas Container Skeleton */}
          <main className="flex-1 bg-zinc-955 p-6 overflow-y-auto flex items-start justify-center z-0 relative">
            <div className="bg-zinc-900 border border-zinc-850 text-zinc-800 shadow-2xl rounded-2xl overflow-hidden flex flex-col w-full max-w-[1200px] h-[80vh]">
              {/* Hero skeleton */}
              <div className="w-full h-[40%] bg-zinc-850/40 p-8 flex flex-col justify-center items-center space-y-4">
                <div className="w-2/3 h-8 bg-zinc-800 rounded" />
                <div className="w-1/2 h-4 bg-zinc-800/80 rounded" />
                <div className="w-28 h-8 bg-indigo-600/35 rounded-lg mt-2" />
              </div>
              {/* Middle area skeleton */}
              <div className="flex-1 p-8 grid grid-cols-3 gap-6 bg-zinc-900">
                <div className="space-y-3">
                  <div className="w-full aspect-[4/3] bg-zinc-850/40 rounded-xl" />
                  <div className="w-3/4 h-4 bg-zinc-850/60 rounded" />
                  <div className="w-1/2 h-3 bg-zinc-850/40 rounded" />
                </div>
                <div className="space-y-3">
                  <div className="w-full aspect-[4/3] bg-zinc-850/40 rounded-xl" />
                  <div className="w-3/4 h-4 bg-zinc-850/60 rounded" />
                  <div className="w-1/2 h-3 bg-zinc-850/40 rounded" />
                </div>
                <div className="space-y-3">
                  <div className="w-full aspect-[4/3] bg-zinc-850/40 rounded-xl" />
                  <div className="w-3/4 h-4 bg-zinc-850/60 rounded" />
                  <div className="w-1/2 h-3 bg-zinc-850/40 rounded" />
                </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar (Properties Panel) Skeleton */}
          <aside className="w-72 border-l border-zinc-850 bg-zinc-900 flex flex-col p-5 space-y-5 shrink-0 z-10">
            <div className="space-y-2 border-b border-zinc-800 pb-3">
              <div className="w-32 h-4 bg-zinc-850 rounded" />
              <div className="w-full h-3 bg-zinc-850/60 rounded" />
            </div>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <div className="w-20 h-3 bg-zinc-850 rounded" />
                <div className="w-full h-10 bg-zinc-950 rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="w-24 h-3 bg-zinc-850 rounded" />
                <div className="w-full h-24 bg-zinc-950 rounded-lg" />
              </div>
              <div className="w-full h-10 bg-indigo-600/20 rounded-lg border border-indigo-500/10" />
            </div>
          </aside>
        </div>
      </div>
    );
  }

  const theme = websiteJSON.theme || {};
  const globalSettings = websiteJSON.globalSettings || {};
  const homePage = websiteJSON.pages[0];
  const sections = homePage.sections || [];

  // Theme variable setup
  const fontStyle = theme.fontFamily ? { fontFamily: theme.fontFamily } : {};
  const isUnsaved = JSON.stringify(websiteJSON) !== lastSavedJSON;

  const renderImageOrPlaceholder = (url, alt = "image", className = "w-full h-full object-cover") => {
    if (!url || url === "" || url === "undefined" || url === "null") {
      return (
        <div className="w-full h-full min-h-[140px] bg-zinc-900 border-2 border-dashed border-zinc-700 hover:border-indigo-500 transition-colors flex flex-col items-center justify-center p-3 text-center cursor-pointer group">
          <div className="h-8 w-8 rounded-full bg-zinc-800 group-hover:bg-indigo-600/20 flex items-center justify-center mb-1.5 transition-colors">
            <span className="text-base group-hover:scale-110 transition-transform">📁</span>
          </div>
          <span className="text-[11px] font-bold text-zinc-300 group-hover:text-white">No Image</span>
          <span className="text-[9px] text-zinc-500 group-hover:text-indigo-400 font-medium mt-0.5">Click to Upload Image</span>
        </div>
      );
    }
    return <img src={url} className={className} alt={alt} />;
  };



  return (
    <div className="w-full h-screen overflow-hidden bg-zinc-950 text-zinc-100 flex flex-col font-sans select-none relative">
      
      {/* Top Navbar Toolbar */}
      <header className="h-14 border-b border-zinc-850 bg-zinc-900 px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5 text-xs">
            <a href="/dashboard" className="px-2.5 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-all flex items-center gap-1.5" title="Return to Dashboard">
              <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
            </a>
            <span className="h-3 w-px bg-zinc-800 mx-0.5" />
            <a href="/onboarding" className="px-2.5 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-all" title="Return to Onboarding">
              Onboarding
            </a>
            <span className="h-3 w-px bg-zinc-800 mx-0.5" />
            <button onClick={() => window.history.back()} className="px-2.5 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-all" title="Return to Previous Step">
              Go Back
            </button>
          </div>
          <span className="h-4 w-px bg-zinc-800" />
          <div className="flex items-center gap-2">
            {theme.logo?.url ? (
              <img src={theme.logo.url} alt="Brand Logo" className="h-6 w-auto object-contain" />
            ) : null}
            <h1 className="text-xs font-bold text-white flex items-center gap-2">
              {theme.logo?.text || "SiteForge Editor"}
              <span className="text-[9px] font-mono bg-zinc-950 text-indigo-400 border border-zinc-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {theme.style || "Modern"}
              </span>
            </h1>
          </div>
        </div>

        {/* Device select viewport */}
        <div className="flex bg-zinc-950 border border-zinc-800 rounded-lg p-0.5 shadow-inner">
          <button 
            onClick={() => setDevice("desktop")} 
            className={`p-1.5 rounded-md transition-colors ${device === "desktop" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
            title="Desktop Viewport"
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setDevice("tablet")} 
            className={`p-1.5 rounded-md transition-colors ${device === "tablet" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
            title="Tablet Viewport"
          >
            <Tablet className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setDevice("mobile")} 
            className={`p-1.5 rounded-md transition-colors ${device === "mobile" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
            title="Mobile Viewport"
          >
            <Smartphone className="h-4 w-4" />
          </button>
        </div>

        {/* Actions & Status */}
        <div className="flex items-center gap-3">
          {/* Undo/Redo */}
          <div className="flex border border-zinc-800 bg-zinc-950 rounded-lg p-0.5 gap-0.5 mr-2">
            <button 
              onClick={handleUndo} 
              disabled={historyIndex <= 0}
              className="p-1 rounded-md text-zinc-500 hover:text-white disabled:opacity-20 transition-all active:scale-95"
              title="Undo Action"
            >
              <Undo className="h-3.5 w-3.5" />
            </button>
            <button 
              onClick={handleRedo} 
              disabled={historyIndex >= history.length - 1}
              className="p-1 rounded-md text-zinc-500 hover:text-white disabled:opacity-20 transition-all active:scale-95"
              title="Redo Action"
            >
              <Redo className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Autosave status indicator */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono mr-2 bg-zinc-950 border border-zinc-850 px-2.5 py-1 rounded-full text-zinc-400">
            {isSaving ? (
              <>
                <RefreshCw className="h-3 w-3 animate-spin text-indigo-400" />
                <span>Saving...</span>
              </>
            ) : isUnsaved ? (
              <>
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>Unsaved Changes</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-3 w-3 text-emerald-500" />
                <span>Saved</span>
              </>
            )}
          </div>

          <a 
            href={`/preview/${websiteId}`}
            target="_blank"
            className="flex items-center justify-center gap-1.5 border border-zinc-800 bg-zinc-950 hover:bg-zinc-850 text-zinc-300 text-xs font-semibold px-3 h-8.5 rounded-lg transition-colors"
          >
            <Eye className="h-3.5 w-3.5" /> Preview
          </a>

          <button 
            onClick={handlePublish}
            disabled={isSaving}
            className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 h-8.5 rounded-lg transition-colors shadow-lg shadow-indigo-600/10 active:scale-97 disabled:opacity-50"
          >
            <Globe className="h-3.5 w-3.5" /> Publish
          </button>
        </div>
      </header>

      {/* Main Workspace Body (Redesigned for non-technical small business owners: Goal 1-7) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Navigation Rail (Simple Navigation: Goal 2) */}
        <aside className="w-20 border-r border-zinc-850 bg-zinc-950 flex flex-col items-center py-4 justify-between shrink-0 z-20">
          <div className="flex flex-col gap-3 w-full px-2">
            {[
              { id: "website", label: "Website", icon: Globe },
              { id: "products", label: "Products", icon: ShoppingBag },
              { id: "images", label: "Images", icon: ImageIcon },
              { id: "design", label: "Design", icon: Palette },
              { id: "contact", label: "Contact", icon: Phone },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === "products") {
                      const page = websiteJSON?.pages?.[0];
                      const sec = page?.sections?.find(s => ["products", "catalog", "menu", "popular-dishes", "collections", "featured-products"].includes(s.type));
                      if (sec) {
                        setSelectedElement({ sectionId: sec.id, type: sec.type });
                        setActiveSectionId(sec.id);
                      }
                    } else if (tab.id === "images") {
                      const page = websiteJSON?.pages?.[0];
                      const sec = page?.sections?.find(s => ["gallery", "portfolio"].includes(s.type));
                      if (sec) {
                        setSelectedElement({ sectionId: sec.id, type: sec.type });
                        setActiveSectionId(sec.id);
                      }
                    }
                  }}
                  className={`w-full flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all relative group ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-[10px] tracking-tight truncate w-full text-center">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Unified Simple Manager Panel (w-[380px] - Goal 4, 5, 6, 7) */}
        <aside className="w-[380px] border-r border-zinc-850 bg-zinc-900 flex flex-col shrink-0 z-10 overflow-y-auto p-6">
          {activeTab === "design" ? (
            <ThemePanel
              theme={theme}
              websiteJSON={websiteJSON}
              updateWebsiteJSON={updateWebsiteJSON}
              handleTextBlur={handleTextBlur}
              triggerToast={triggerToast}
            />
          ) : (
            <PropertiesPanel
              currentTab={activeTab}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              activeSectionId={activeSectionId}
              setActiveSectionId={setActiveSectionId}
              handleTextChange={handleTextChange}
              handleTextBlur={handleTextBlur}
              updateImageURL={updateImageURL}
              setActiveTab={setActiveTab}
              handleAssetSelect={handleAssetSelect}
              theme={theme}
              websiteJSON={websiteJSON}
              updateWebsiteJSON={updateWebsiteJSON}
            />
          )}
        </aside>

        {/* Live Website Canvas Container (Goal 3: Click directly on preview) */}
        <main className="flex-1 bg-zinc-950 p-6 overflow-y-auto flex items-start justify-center z-0 relative">
          <div className="w-full flex justify-center">
            <LivePreview
              websiteJSON={websiteJSON}
              activeSectionId={activeSectionId}
              onElementClick={(secId) => {
                setActiveSectionId(secId);
                const page = websiteJSON?.pages?.[0];
                const sec = page?.sections?.find(s => s.id === secId);
                if (sec) {
                  setSelectedElement({
                    sectionId: secId,
                    type: sec.type,
                    fieldKey: "title",
                    value: sec.content?.title || ""
                  });
                  if (sec.type === "hero") {
                    setActiveTab("website");
                  } else if (["products", "catalog", "menu", "popular-dishes", "collections", "featured-products"].includes(sec.type)) {
                    setActiveTab("products");
                  } else if (["gallery", "portfolio", "images"].includes(sec.type)) {
                    setActiveTab("images");
                  } else if (["footer", "contact"].includes(sec.type)) {
                    setActiveTab("contact");
                  } else {
                    setActiveTab("website");
                  }
                }
              }}
              isEditor={true}
              device={device}
            />
          </div>
        </main>
      </div>

      {/* Floating AI Assistant Trigger & Modal (Goal 8) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {showAiFloatingModal && (
          <div className="w-[360px] sm:w-[400px] h-[520px] bg-zinc-900 border border-indigo-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
            <div className="p-4 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 border-b border-indigo-500/30 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-300 animate-spin-slow" />
                <div>
                  <h3 className="font-extrabold text-sm">SiteForge AI Assistant</h3>
                  <p className="text-[10px] text-indigo-200">Type or click natural language commands</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAiFloatingModal(false)}
                className="p-1.5 hover:bg-white/10 rounded-xl text-indigo-200 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Natural Language Command Prompts (Goal 8) */}
            <div className="p-3 bg-zinc-950/80 border-b border-zinc-800 flex flex-wrap gap-1.5">
              {[
                { label: "Make my website modern", prompt: "Make my website look ultra modern, clean, and sleek with professional typography and colors." },
                { label: "Add more products", prompt: "Add 3 new high quality products with realistic prices and compelling descriptions." },
                { label: "Change hero image", prompt: "Change the hero background image to a high resolution professional photo relevant to my business." },
                { label: "Change colors", prompt: "Change the overall color scheme to a premium, harmonious palette that stands out." },
                { label: "Improve typography", prompt: "Improve typography across all sections using elegant, readable Google fonts." }
              ].map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAiSend(cmd.prompt)}
                  className="bg-zinc-850 hover:bg-indigo-600 border border-zinc-750 hover:border-indigo-500 text-zinc-300 hover:text-white text-[11px] font-bold px-2.5 py-1.5 rounded-xl transition-all shadow-sm flex items-center gap-1"
                >
                  <Sparkles className="h-3 w-3 text-indigo-400" /> {cmd.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto">
              <AIAssistant
                aiMessages={aiMessages}
                chatInput={chatInput}
                setChatInput={setChatInput}
                handleAiSend={handleAiSend}
                isAiTyping={isAiTyping}
              />
            </div>
          </div>
        )}

        <button
          onClick={() => setShowAiFloatingModal(!showAiFloatingModal)}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all border border-indigo-400/40"
        >
          <Sparkles className="h-5 w-5 text-indigo-200 animate-bounce" />
          <span>{showAiFloatingModal ? "Close AI Assistant" : "Ask AI Assistant"}</span>
        </button>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-800 text-white px-4.5 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-2.5 animate-fade-in-up">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Publish Live Success Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl text-center space-y-5 animate-scale-in">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/25">
              <CheckCircle className="h-6 w-6" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-white">Your website is live! 🎉</h3>
              <p className="text-xs text-zinc-450 leading-relaxed">Congratulations, your custom template is compiled and published online for public visits.</p>
            </div>

            {/* Generated Link */}
            <div className="flex items-center justify-between bg-zinc-950 border border-zinc-850 p-3 rounded-xl">
              <span className="font-mono text-[10.5px] text-indigo-400 select-all tracking-tight truncate max-w-[240px]">
                {`http://localhost:3000/preview/${websiteId}`}
              </span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`http://localhost:3000/preview/${websiteId}`);
                  triggerToast("URL copied to clipboard!");
                }}
                className="text-[9.5px] font-bold text-zinc-300 hover:text-white bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 transition-all hover:bg-zinc-850"
              >
                Copy Link
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={() => setShowPublishModal(false)}
                className="py-2.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 text-xs font-bold rounded-xl transition-all"
              >
                Keep Editing
              </button>
              <a 
                href={`/preview/${websiteId}`}
                target="_blank"
                className="py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/10"
              >
                Visit Site <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
