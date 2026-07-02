"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const PropertiesPanel = dynamic(() => import("../../../components/editor/PropertiesPanel"), { ssr: false });
const AIAssistant = dynamic(() => import("../../../components/editor/AIAssistant"), { ssr: false });
const AssetsPanel = dynamic(() => import("../../../components/editor/AssetsPanel"), { ssr: false });
const ThemePanel = dynamic(() => import("../../../components/editor/ThemePanel"), { ssr: false });
import UniversalNavbar from "../../../components/templates/UniversalNavbar";

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
  Maximize2
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
  
  // Sidebars
  const [activeTab, setActiveTab] = useState("sections"); // sections, pages, assets, templates, ai
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
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api"}/websites/${websiteId}/json`,
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
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api"}/websites/${websiteId}/json`,
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
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api"}/websites/${websiteId}/json`,
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
        backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
      };
    } else if (type === "about") {
      defaultContent = {
        title: "Who We Are",
        description: "We are local innovators dedicated to crafting high-fidelity solutions. Our experienced hands utilize pure, certified ingredients and clean spacing grids to deliver outstanding business value to all of Pune.",
        image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
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
          { name: "Signature Essential", description: "Handmade using custom imported raw inputs.", price: "₹1,490", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" },
          { name: "Pro Variant Pack", description: "Heavy-duty variant designed for daily workload runs.", price: "₹3,900", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" }
        ]
      };
    } else if (type === "gallery") {
      defaultContent = {
        title: "Our Studio Gallery",
        subtitle: "RECENT MEMORABLE EXPERIENCES",
        images: [
          { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", caption: "Corporate Space" },
          { url: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80", caption: "Team Sprint" },
          { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", caption: "Performance Panel" }
        ]
      };
    } else if (type === "testimonials") {
      defaultContent = {
        title: "Client Testimonials",
        testimonials: [
          { name: "Neeta Gupta", role: "Wellness Advocate", rating: 5, content: "Incredibly fast customization. Their templates are responsive and visually beautiful.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" }
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
          { name: "Dr. Alok Verma", role: "Chief Strategist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", bio: "Over 15 years leading cross-functional design sprints." }
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
          { name: "Aura Luxury Spa", category: "Brand Identity", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80" }
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

  const handleAssetAiGenerate = () => {
    if (!selectedAsset || !assetAiPrompt) return;
    triggerToast("Generating relevant design asset with AI...");
    
    // Simulating AI Image search from Unsplash based on keywords
    setTimeout(() => {
      const keywords = assetAiPrompt.toLowerCase();
      let selectedUrl = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"; // fallback
      
      if (keywords.includes("cake") || keywords.includes("bakery") || keywords.includes("bread")) {
        selectedUrl = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80";
      } else if (keywords.includes("salon") || keywords.includes("spa") || keywords.includes("hair")) {
        selectedUrl = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80";
      } else if (keywords.includes("gym") || keywords.includes("workout") || keywords.includes("fitness")) {
        selectedUrl = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80";
      } else if (keywords.includes("tech") || keywords.includes("phone") || keywords.includes("gadget")) {
        selectedUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80";
      } else if (keywords.includes("fashion") || keywords.includes("clothes") || keywords.includes("dress")) {
        selectedUrl = "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80";
      } else if (keywords.includes("food") || keywords.includes("restaurant") || keywords.includes("dine")) {
        selectedUrl = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80";
      }
      
      updateImageURL(selectedAsset.sectionId, selectedAsset.type, selectedUrl);
      setSelectedAsset(prev => prev ? { ...prev, url: selectedUrl } : null);
      triggerToast("AI Image generated and applied!");
    }, 1500);
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

  // AI Assistant Chat command executor
  const handleAiSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setAiMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setIsAiTyping(true);

    setTimeout(() => {
      const text = userMsg.toLowerCase();
      const newJSON = JSON.parse(JSON.stringify(websiteJSON));
      let responseText = "";

      if (text.includes("luxurious") || text.includes("luxury")) {
        newJSON.theme.style = "luxury";
        newJSON.theme.fontFamily = "Playfair Display";
        newJSON.theme.primaryColor = "#b45309"; // gold/amber
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
                { name: "Sarah Jenkins", role: "Product Director", rating: 5, content: "SiteForge made building and customizing our page absolutely seamless. Highly recommended!", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" },
                { name: "Michael Chang", role: "Store Owner", rating: 5, content: "The AI onboarding and template layout are incredibly gorgeous. The editor matches Canva and Squarespace easily.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" }
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
      } else if (text.includes("gallery") || text.includes("images") || text.includes("portfolio")) {
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
                { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", caption: "Workspace Layout" },
                { url: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80", caption: "Collaboration Designing" },
                { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", caption: "Analytics Suite" }
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
      } else if (text.includes("fonts") || text.includes("typography") || text.includes("font")) {
        newJSON.theme.fontFamily = "Outfit";
        responseText = "Font updated to Outfit (Premium Sans-Serif). Spacing updated globally.";
      } else if (text.includes("conversions") || text.includes("conversion") || text.includes("leads")) {
        const hasBooking = newJSON.pages[0].sections.some(s => s.type === "booking");
        if (!hasBooking) {
          const bookingSec = {
            id: `sec_${Date.now()}`,
            type: "booking",
            content: {
              title: "Schedule a Session",
              subtitle: "SECURE YOUR PREFERRED SLOT INSTANTLY",
              submitText: "Request Session",
              fields: [
                { label: "Full Name", type: "text", placeholder: "e.g. Rohan" },
                { label: "Service Request", type: "select", options: ["General Consult", "Premium Styling"] }
              ]
            }
          };
          const idx = newJSON.pages[0].sections.findIndex(s => s.type === "footer");
          if (idx !== -1) {
            newJSON.pages[0].sections.splice(idx, 0, bookingSec);
          } else {
            newJSON.pages[0].sections.push(bookingSec);
          }
        }
        const pricing = newJSON.pages[0].sections.find(s => s.type === "pricing");
        if (pricing && pricing.content.tiers) {
          pricing.content.tiers.forEach((t, i) => { t.popular = (i === 1); });
        }
        responseText = "Optimized for conversions. Added booking schedule forms and highlighted popular plans to double vendor lead generation.";
      } else {
        responseText = "I've analyzed your instruction and made custom layout tweaks to matching styles and sections in your design system. Let me know if you want other specific additions!";
      }

      updateWebsiteJSON(newJSON);
      setAiMessages(prev => [...prev, { sender: "ai", text: responseText }]);
      setIsAiTyping(false);
      triggerToast("AI Assistant updated layout");
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
  const homePage = websiteJSON.pages[0];
  const sections = homePage.sections || [];

  // Theme variable setup
  const fontStyle = theme.fontFamily ? { fontFamily: theme.fontFamily } : {};
  const isUnsaved = JSON.stringify(websiteJSON) !== lastSavedJSON;

  // Curated Preset Unsplash Photos
  const presetPhotos = [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <div className="w-full h-screen overflow-hidden bg-zinc-950 text-zinc-100 flex flex-col font-sans select-none relative">
      
      {/* Top Navbar Toolbar */}
      <header className="h-14 border-b border-zinc-850 bg-zinc-900 px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <a href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </a>
          <span className="h-4 w-px bg-zinc-800" />
          <h1 className="text-xs font-bold text-white flex items-center gap-2">
            SiteForge Editor 
            <span className="text-[9px] font-mono bg-zinc-950 text-indigo-400 border border-zinc-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {theme.style}
            </span>
          </h1>
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

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar Icon Tab Selector */}
        <aside className="w-14 border-r border-zinc-850 bg-zinc-950 flex flex-col items-center py-4 justify-between shrink-0 z-20">
          <div className="flex flex-col gap-5 w-full items-center">
            <button 
              onClick={() => setActiveTab("pages")} 
              className={`p-2 rounded-xl transition-all relative ${activeTab === "pages" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15" : "text-zinc-500 hover:text-zinc-350"}`}
              title="Pages"
            >
              <FileText className="h-4.5 w-4.5" />
            </button>
            <button 
              onClick={() => setActiveTab("sections")} 
              className={`p-2 rounded-xl transition-all relative ${activeTab === "sections" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15" : "text-zinc-500 hover:text-zinc-350"}`}
              title="Sections Manager"
            >
              <Layers className="h-4.5 w-4.5" />
            </button>
            <button 
              onClick={() => setActiveTab("assets")} 
              className={`p-2 rounded-xl transition-all relative ${activeTab === "assets" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15" : "text-zinc-500 hover:text-zinc-350"}`}
              title="Asset Management"
            >
              <ImageIcon className="h-4.5 w-4.5" />
            </button>
            <button 
              onClick={() => setActiveTab("templates")} 
              className={`p-2 rounded-xl transition-all relative ${activeTab === "templates" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15" : "text-zinc-500 hover:text-zinc-350"}`}
              title="Global Theme Presets"
            >
              <Palette className="h-4.5 w-4.5" />
            </button>
            <button 
              onClick={() => setActiveTab("ai")} 
              className={`p-2 rounded-xl transition-all relative ${activeTab === "ai" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/15" : "text-zinc-500 hover:text-zinc-350"}`}
              title="AI Assistant Chat"
            >
              <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
            </button>
          </div>
          <div className="text-zinc-650 hover:text-zinc-400 transition-colors cursor-pointer">
            <Settings className="h-4 w-4" />
          </div>
        </aside>

        {/* Dynamic Left Panel (based on activeTab) */}
        <aside className="w-64 border-r border-zinc-850 bg-zinc-900 flex flex-col shrink-0 z-10 overflow-y-auto">
          
          {/* PAGES TAB */}
          {activeTab === "pages" && (
            <div className="p-5 space-y-5">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Website Pages</h3>
                <p className="text-[10px] text-zinc-500 leading-normal">Manage site navigation links and routes.</p>
              </div>
              <div className="space-y-1.5">
                <button className="w-full flex items-center justify-between text-left text-xs px-3.5 py-2.5 rounded-xl border border-indigo-500/20 bg-indigo-600/10 text-white font-bold">
                  <span className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-indigo-400" /> Home Page
                  </span>
                  <span className="text-[8px] bg-indigo-500 text-white px-1.5 py-0.5 rounded uppercase font-mono">index</span>
                </button>
                <button onClick={() => triggerToast("Additional routing page simulated (Draft Mode)")} className="w-full flex items-center justify-between text-left text-xs px-3.5 py-2.5 rounded-xl border border-transparent text-zinc-500 hover:bg-zinc-850 hover:text-zinc-300">
                  <span className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5" /> About Us
                  </span>
                  <span className="text-[8px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded uppercase font-mono">draft</span>
                </button>
                <button onClick={() => triggerToast("Additional routing page simulated (Draft Mode)")} className="w-full flex items-center justify-between text-left text-xs px-3.5 py-2.5 rounded-xl border border-transparent text-zinc-500 hover:bg-zinc-850 hover:text-zinc-300">
                  <span className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5" /> Contact
                  </span>
                  <span className="text-[8px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded uppercase font-mono">draft</span>
                </button>
              </div>
              <button 
                onClick={() => triggerToast("Simulated Page Creation. Under construction in trial plan.")}
                className="w-full flex items-center justify-center gap-2 border border-zinc-800 border-dashed hover:border-zinc-700 bg-zinc-950/40 hover:bg-zinc-950 text-zinc-400 hover:text-white text-xs py-2.5 rounded-xl transition-all"
              >
                <Plus className="h-3.5 w-3.5" /> Add New Page
              </button>
            </div>
          )}

          {/* SECTIONS TAB */}
          {activeTab === "sections" && (
            <div className="p-5 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Page Sections</h3>
                  <p className="text-[10px] text-zinc-500">Reorder visually or append sections</p>
                </div>
                <div className="space-y-1.5">
                  {sections.map((sec, idx) => (
                    <div 
                      key={sec.id}
                      onClick={() => {
                        setActiveSectionId(sec.id);
                        document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={`group w-full flex items-center justify-between text-xs px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                        activeSectionId === sec.id
                          ? "bg-indigo-600/10 border-indigo-500/30 text-white font-bold"
                          : "border-transparent text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200"
                      }`}
                    >
                      <span className="capitalize truncate max-w-[100px]">{sec.type} section</span>
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); moveSection(idx, "up"); }}
                          disabled={idx === 0}
                          className="p-1 text-zinc-500 hover:text-white disabled:opacity-20"
                        >
                          <ArrowUp className="h-3 w-3" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); moveSection(idx, "down"); }}
                          disabled={idx === sections.length - 1}
                          className="p-1 text-zinc-500 hover:text-white disabled:opacity-20"
                        >
                          <ArrowDown className="h-3 w-3" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteSection(idx); }}
                          className="p-1 text-zinc-500 hover:text-rose-400"
                        >
                          <Trash className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 relative">
                <button 
                  onClick={() => setShowAddSectionDropdown(!showAddSectionDropdown)}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow"
                >
                  <Plus className="h-3.5 w-3.5 text-indigo-400" /> Add Section
                </button>

                {showAddSectionDropdown && (
                  <div className="absolute bottom-12 left-0 right-0 bg-zinc-900 border border-zinc-850 rounded-2xl shadow-2xl p-2.5 grid grid-cols-2 gap-1.5 z-40 max-h-56 overflow-y-auto">
                    {["hero", "about", "services", "products", "gallery", "testimonials", "faq", "team", "pricing", "contact", "booking", "portfolio", "menu"].map(type => (
                      <button 
                        key={type}
                        onClick={() => addSection(type)}
                        className="p-2 text-[10px] font-semibold bg-zinc-950 border border-zinc-800 hover:bg-zinc-850 text-zinc-300 rounded-lg hover:text-white capitalize transition-all"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ASSETS TAB */}
          {activeTab === "assets" && (
            <AssetsPanel
              selectedAsset={selectedAsset}
              setSelectedAsset={setSelectedAsset}
              assetAiPrompt={assetAiPrompt}
              setAssetAiPrompt={setAssetAiPrompt}
              cropAspectRatio={cropAspectRatio}
              setCropAspectRatio={setCropAspectRatio}
              handleAssetOptimize={handleAssetOptimize}
              handleAssetCrop={handleAssetCrop}
              handleAssetAiGenerate={handleAssetAiGenerate}
              presetPhotos={presetPhotos}
              getWebsiteImages={getWebsiteImages}
              handleAssetReplace={handleAssetReplace}
              handleAssetSelect={handleAssetSelect}
            />
          )}

          {/* TEMPLATES / THEME EDITOR */}
          {activeTab === "templates" && (
            <ThemePanel
              theme={theme}
              websiteJSON={websiteJSON}
              updateWebsiteJSON={updateWebsiteJSON}
              handleTextBlur={handleTextBlur}
              triggerToast={triggerToast}
            />
          )}

          {/* AI ASSISTANT TAB */}
          {activeTab === "ai" && (
            <AIAssistant
              aiMessages={aiMessages}
              chatInput={chatInput}
              setChatInput={setChatInput}
              handleAiSend={handleAiSend}
              isAiTyping={isAiTyping}
              chatEndRef={chatEndRef}
            />
          )}

        </aside>

        {/* Live Website Canvas Container */}
        <main className="flex-1 bg-zinc-950 p-6 overflow-y-auto flex items-start justify-center z-0 relative">
          <div 
            className="bg-white text-zinc-800 shadow-2xl transition-all duration-300 overflow-hidden flex flex-col relative"
            style={{
              width: device === "mobile" ? "375px" : device === "tablet" ? "768px" : "100%",
              maxWidth: device === "mobile" ? "375px" : device === "tablet" ? "768px" : "1200px"
            }}
          >
            <UniversalNavbar
              businessName={websiteJSON.meta?.title?.split("|")[0].trim() || "My Business"}
              logo={websiteJSON.meta?.logo}
              sections={sections}
              whatsappNumber={websiteJSON.globalSettings?.whatsappNumber}
              primaryCTA="Contact Us"
              theme={theme}
            />
            <div className="pt-[80px]">
              {/* Embedded site sections renderer */}
              {sections.map((sec) => {
              const isSectionActive = activeSectionId === sec.id;
              
              return (
                <div 
                  id={sec.id}
                  key={sec.id}
                  onClick={() => { setActiveSectionId(sec.id); setSelectedElement({ sectionId: sec.id, type: "section", fieldKey: "spacing", value: sec.content.spacing }); }}
                  className={`relative group border-2 transition-all ${
                    isSectionActive ? "border-indigo-500 shadow-lg" : "border-transparent hover:border-indigo-500/20"
                  }`}
                >
                  {/* Inline editors popup label */}
                  {isSectionActive && (
                    <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded shadow-sm z-30 uppercase tracking-widest flex items-center gap-1.5">
                      <Layers className="h-2.5 w-2.5" /> Active: {sec.type}
                    </div>
                  )}

                  {/* Canvas Section Renderers */}
                  
                  {/* HERO SECTION */}
                  {sec.type === "hero" && (
                    <section className="py-24 px-8 text-center text-white relative overflow-hidden bg-zinc-900 flex flex-col items-center justify-center" style={{ minHeight: "450px" }}>
                      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                        {/* Title */}
                        <div 
                          className={`relative border border-dashed rounded-lg p-1.5 cursor-pointer ${selectedElement?.fieldKey === "title" && selectedElement?.sectionId === sec.id ? "border-indigo-500 bg-indigo-500/5" : "border-transparent hover:border-zinc-700"}`}
                          onClick={(e) => { e.stopPropagation(); handleElementClick(sec.id, "title", "text", sec.content.title); }}
                        >
                          <h1 className="text-3xl md:text-5xl font-black leading-tight" style={fontStyle}>
                            {sec.content.title}
                          </h1>
                        </div>

                        {/* Subtitle */}
                        <div 
                          className={`relative border border-dashed rounded-lg p-1.5 cursor-pointer ${selectedElement?.fieldKey === "subtitle" && selectedElement?.sectionId === sec.id ? "border-indigo-500 bg-indigo-500/5" : "border-transparent hover:border-zinc-700"}`}
                          onClick={(e) => { e.stopPropagation(); handleElementClick(sec.id, "subtitle", "text", sec.content.subtitle); }}
                        >
                          <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                            {sec.content.subtitle}
                          </p>
                        </div>

                        {/* CTA button */}
                        <div className="pt-4 flex justify-center">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleElementClick(sec.id, "ctaText", "button", sec.content.ctaText); }}
                            className={`font-extrabold text-xs shadow-lg border border-dashed hover:scale-105 active:scale-95 transition-all text-white ${selectedElement?.fieldKey === "ctaText" && selectedElement?.sectionId === sec.id ? "border-white" : "border-transparent"}`}
                            style={{ 
                              backgroundColor: theme.primaryColor || "#4f46e5",
                              borderRadius: theme.style === "minimal" ? "0px" : theme.style === "luxury" ? "0px" : "16px",
                              padding: theme.style === "luxury" ? "14px 32px" : "12px 28px"
                            }}
                          >
                            {sec.content.ctaText || "Get Started"}
                          </button>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black/65 z-0" />
                      <div 
                        className="absolute inset-0 z-[-1] bg-cover bg-center cursor-pointer" 
                        style={{ backgroundImage: `url(${sec.content.backgroundImage})` }}
                        onClick={(e) => { e.stopPropagation(); handleElementClick(sec.id, "backgroundImage", "image", sec.content.backgroundImage); }}
                      />
                    </section>
                  )}

                  {/* ABOUT SECTION */}
                  {sec.type === "about" && (
                    <section className={`px-8 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "minimal" ? "#ffffff" : "#fafafa" }}>
                      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                          {/* Title */}
                          <div 
                            className={`relative border border-dashed rounded-lg p-1.5 cursor-pointer ${selectedElement?.fieldKey === "title" && selectedElement?.sectionId === sec.id ? "border-indigo-500 bg-indigo-500/5" : "border-transparent hover:border-zinc-300"}`}
                            onClick={(e) => { e.stopPropagation(); handleElementClick(sec.id, "title", "text", sec.content.title); }}
                          >
                            <h2 className="text-xl md:text-2xl font-black text-zinc-950" style={fontStyle}>
                              {sec.content.title}
                            </h2>
                          </div>

                          {/* Description */}
                          <div 
                            className={`relative border border-dashed rounded-lg p-1.5 cursor-pointer ${selectedElement?.fieldKey === "description" && selectedElement?.sectionId === sec.id ? "border-indigo-500 bg-indigo-500/5" : "border-transparent hover:border-zinc-300"}`}
                            onClick={(e) => { e.stopPropagation(); handleElementClick(sec.id, "description", "text", sec.content.description); }}
                          >
                            <p className="text-xs text-zinc-650 leading-relaxed font-light whitespace-pre-line">
                              {sec.content.description}
                            </p>
                          </div>
                          
                          {sec.content.highlights && (
                            <div className="grid grid-cols-2 gap-3 pt-2">
                              {sec.content.highlights.map((hl, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 text-[10.5px] text-zinc-800 font-bold bg-[#84A98C]/8 border border-[#84A98C]/15 px-3 py-2 rounded-2xl">
                                  <div className="h-4 w-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor || "#4f46e5"}15`, color: theme.primaryColor || "#4f46e5" }}>
                                    <Check className="h-2.5 w-2.5" />
                                  </div>
                                  <span>{hl}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div 
                          className={`overflow-hidden aspect-square cursor-pointer ${theme.style === "minimal" ? "" : theme.style === "luxury" ? "rounded-3xl shadow-2xl border border-amber-950/10" : "rounded-2xl shadow-lg"}`}
                          onClick={(e) => { e.stopPropagation(); handleElementClick(sec.id, "image", "image", sec.content.image); }}
                        >
                          <img src={sec.content.image} className="w-full h-full object-cover" alt="about" />
                        </div>
                      </div>
                    </section>
                  )}

                  {/* SERVICES SECTION */}
                  {sec.type === "services" && (
                    <section className={`px-8 bg-white border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <h2 className="text-xl md:text-2xl font-black text-zinc-955" style={fontStyle}>{sec.content.title}</h2>
                          {sec.content.subtitle && <p className="text-xs text-zinc-450 uppercase tracking-widest">{sec.content.subtitle}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {(sec.content.services || []).map((srv, idx) => (
                            <div 
                              key={idx} 
                              className={`p-6 space-y-3.5 transition-all duration-300 ${
                                theme.style === "minimal" 
                                  ? "border border-zinc-200" 
                                  : theme.style === "luxury" 
                                    ? "rounded-3xl border border-amber-900/10 shadow-lg bg-stone-50" 
                                    : "rounded-2xl border border-zinc-100 shadow bg-white hover:-translate-y-1"
                              }`}
                            >
                              <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primaryColor || "#4f46e5"}10`, color: theme.primaryColor || "#4f46e5" }}>
                                <SectionIcon name={srv.icon} className="h-4.5 w-4.5" />
                              </div>
                              <div className="space-y-1">
                                <span className="text-xs font-extrabold text-zinc-900 block">{srv.name}</span>
                                <p className="text-[10px] text-zinc-550 leading-relaxed font-light">{srv.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* PRODUCTS SECTION */}
                  {sec.type === "products" && (
                    <section className={`px-8 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "luxury" ? "#faf9f6" : "#ffffff" }}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <h2 className="text-xl md:text-2xl font-black text-zinc-955" style={fontStyle}>{sec.content.title}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {(sec.content.products || []).map((prod, idx) => (
                            <div 
                              key={idx} 
                              className={`overflow-hidden flex flex-col transition-all ${
                                theme.style === "minimal" 
                                  ? "border border-zinc-200 bg-white" 
                                  : theme.style === "luxury" 
                                    ? "rounded-3xl border border-amber-900/5 shadow-xl bg-white" 
                                    : "rounded-2xl border border-slate-100 shadow-md bg-white"
                              }`}
                            >
                              <div 
                                className="aspect-[4/3] w-full bg-zinc-100 overflow-hidden relative cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); handleElementClick(sec.id, `product_image_${idx}`, "image", prod.image, idx); }}
                              >
                                <img src={prod.image} className="w-full h-full object-cover" alt={prod.name} />
                                <span className="absolute top-3 right-3 text-[10px] font-black text-white px-3 py-1 rounded-full shadow" style={{ backgroundColor: theme.primaryColor || "#4f46e5" }}>
                                  {prod.price}
                                </span>
                              </div>
                              <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                                <div className="space-y-1">
                                  <span className="text-xs font-extrabold text-zinc-900 block">{prod.name}</span>
                                  <p className="text-[10px] text-zinc-555 leading-relaxed font-light">{prod.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* GALLERY SECTION */}
                  {sec.type === "gallery" && (
                    <section className={`px-8 bg-zinc-50 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center space-y-2">
                          <h2 className="text-xl md:text-2xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          {(sec.content.images || []).map((img, idx) => (
                            <div 
                              key={idx} 
                              className="space-y-1.5 cursor-pointer"
                              onClick={(e) => { e.stopPropagation(); handleElementClick(sec.id, `gallery_image_${idx}`, "image", img.url, idx); }}
                            >
                              <div className={`aspect-square w-full bg-zinc-200 overflow-hidden relative ${
                                theme.style === "minimal" ? "" : theme.style === "luxury" ? "rounded-3xl shadow" : "rounded-xl shadow-sm"
                              }`}>
                                <img src={img.url} className="w-full h-full object-cover" alt="gallery" />
                              </div>
                              <span className="text-[9px] font-bold text-zinc-400 block truncate text-center mt-1">{img.caption}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* PRICING SECTION */}
                  {sec.type === "pricing" && (
                    <section className={`px-8 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "luxury" ? "#faf9f6" : "#ffffff" }}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center">
                          <h2 className="text-xl md:text-2xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {(sec.content.tiers || []).map((tier, idx) => (
                            <div 
                              key={idx} 
                              className={`p-6 relative flex flex-col justify-between gap-6 transition-all ${
                                tier.popular && theme.style !== "minimal"
                                  ? "border-2 border-indigo-500 scale-102 shadow-2xl bg-white" 
                                  : "border border-zinc-150 bg-white"
                              } ${
                                theme.style === "minimal" 
                                  ? "rounded-none" 
                                  : "rounded-2xl"
                              }`}
                            >
                              <div className="space-y-4">
                                <div className="space-y-1.5">
                                  <span className="text-xs font-black text-zinc-900 block uppercase tracking-wider">{tier.name}</span>
                                  <span className="text-2xl font-black text-zinc-950 block">{tier.price}</span>
                                </div>
                                <div className="h-px bg-zinc-100" />
                                <div className="space-y-2.5">
                                  {(tier.features || []).map((feat, fidx) => (
                                    <div key={fidx} className="flex items-center gap-2 text-[10px] text-zinc-650 font-medium">
                                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                      <span>{feat}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* TESTIMONIALS SECTION */}
                  {sec.type === "testimonials" && (
                    <section className={`px-8 bg-zinc-50 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-5xl mx-auto space-y-10">
                        <div className="text-center">
                          <h2 className="text-xl md:text-2xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {(sec.content.testimonials || []).map((test, idx) => (
                            <div 
                              key={idx} 
                              className={`p-6 space-y-4 flex flex-col justify-between transition-all bg-white ${
                                theme.style === "minimal" 
                                  ? "border border-zinc-200" 
                                  : theme.style === "luxury" 
                                    ? "rounded-3xl border border-amber-900/10 shadow-lg" 
                                    : "rounded-2xl border border-zinc-100 shadow"
                              }`}
                            >
                              <div className="space-y-3">
                                <div className="flex gap-0.5">
                                  {Array.from({ length: test.rating || 5 }).map((_, sidx) => (
                                    <Star key={sidx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                  ))}
                                </div>
                                <p className="text-[11px] text-zinc-650 italic leading-relaxed">"{test.content}"</p>
                              </div>
                              <div className="flex items-center gap-3 border-t border-zinc-100 pt-3">
                                {test.avatar && (
                                  <div className="h-7 w-7 rounded-full overflow-hidden bg-zinc-250">
                                    <img src={test.avatar} className="w-full h-full object-cover" alt="client avatar" />
                                  </div>
                                )}
                                <div>
                                  <span className="text-[10px] font-black text-zinc-900 block">{test.name}</span>
                                  <span className="text-[8px] font-bold text-zinc-400 block uppercase tracking-wider">{test.role}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* FAQ SECTION */}
                  {sec.type === "faq" && (
                    <section className={`px-8 bg-white border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-4xl mx-auto space-y-10">
                        <div className="text-center">
                          <h2 className="text-xl md:text-2xl font-black text-zinc-955" style={fontStyle}>{sec.content.title}</h2>
                        </div>
                        <div className="space-y-4">
                          {(sec.content.faqs || []).map((faq, idx) => (
                            <div key={idx} className="p-4 border border-zinc-100 rounded-xl text-left bg-zinc-50/50">
                              <span className="text-xs font-bold text-zinc-900 block">{faq.question}</span>
                              <p className="text-[10.5px] text-zinc-550 pt-2 font-light">{faq.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* CONTACT SECTION */}
                  {sec.type === "contact" && (
                    <section className={`px-8 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`} style={{ backgroundColor: theme.style === "minimal" ? "#ffffff" : "#fafafa" }}>
                      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                          <h2 className="text-xl md:text-2xl font-black text-zinc-950" style={fontStyle}>{sec.content.title}</h2>
                          <div className="space-y-3 text-xs text-zinc-650">
                            {sec.content.phone && <p>📞 Phone: {sec.content.phone}</p>}
                            {sec.content.email && <p>✉️ Email: {sec.content.email}</p>}
                            {sec.content.address && <p>📍 Address: {sec.content.address}</p>}
                          </div>
                        </div>
                        <div className="p-6 bg-white border border-zinc-150 rounded-xl shadow-sm">
                          <span className="text-xs font-extrabold block border-b pb-2 mb-3">Send Message Form (Simulation)</span>
                          <div className="space-y-2">
                            <input disabled type="text" placeholder="Visitor Name" className="w-full h-8 px-2.5 border border-zinc-200 text-[10px]" />
                            <textarea disabled placeholder="Visitor Message" className="w-full h-14 p-2.5 border border-zinc-200 text-[10px] resize-none" />
                            <button disabled className="h-8 w-full bg-zinc-100 text-zinc-400 text-[10px] font-bold rounded">Disabled in Editor</button>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* BOOKING SECTION */}
                  {sec.type === "booking" && (
                    <section className={`px-8 bg-zinc-50 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-md mx-auto space-y-6 text-center">
                        <h2 className="text-xl md:text-2xl font-black text-zinc-955" style={fontStyle}>{sec.content.title}</h2>
                        <div className="p-6 bg-white border border-zinc-150 rounded-2xl text-left space-y-3">
                          <span className="text-[10px] font-extrabold text-zinc-400 block uppercase">Interactive Calendar Booking (Simulator)</span>
                          <div className="space-y-2">
                            <input disabled type="text" placeholder="Rohan Sen" className="w-full h-8 px-2 border border-zinc-200 text-[10px]" />
                            <button disabled className="w-full h-9 bg-zinc-100 text-zinc-400 text-[10px] font-black rounded uppercase">Booking Form Locked</button>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* MENU SECTION */}
                  {sec.type === "menu" && (
                    <section className={`px-8 bg-white border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="text-xl md:text-2xl font-black text-zinc-950 text-center" style={fontStyle}>{sec.content.title}</h2>
                        {(sec.content.categories || []).map((cat, idx) => (
                          <div key={idx} className="space-y-3">
                            <span className="text-xs font-black uppercase text-zinc-900 border-l-4 pl-3" style={{ borderColor: theme.primaryColor || "#4f46e5" }}>{cat.name}</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {(cat.items || []).map((item, iidx) => (
                                <div key={iidx} className="p-3 border border-zinc-100 rounded-xl bg-zinc-50/50 flex justify-between items-start">
                                  <div>
                                    <span className="text-xs font-bold text-zinc-900">{item.name}</span>
                                    <p className="text-[9.5px] text-zinc-500 font-light">{item.description}</p>
                                  </div>
                                  <span className="text-xs font-black text-zinc-955">{item.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* PORTFOLIO SECTION */}
                  {sec.type === "portfolio" && (
                    <section className={`px-8 bg-zinc-50 border-b border-zinc-150 ${theme.spacing === "large" ? "py-24" : theme.spacing === "compact" ? "py-12" : "py-16"}`}>
                      <div className="max-w-5xl mx-auto space-y-8">
                        <h2 className="text-xl md:text-2xl font-black text-zinc-955 text-center" style={fontStyle}>{sec.content.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {(sec.content.projects || []).map((proj, idx) => (
                            <div 
                              key={idx}
                              onClick={(e) => { e.stopPropagation(); handleElementClick(sec.id, `project_image_${idx}`, "image", proj.image, idx); }}
                              className="overflow-hidden bg-white border border-zinc-100 rounded-2xl cursor-pointer"
                            >
                              <div className="aspect-[4/3] overflow-hidden">
                                <img src={proj.image} className="w-full h-full object-cover" alt="proj" />
                              </div>
                              <div className="p-3">
                                <span className="text-xs font-bold text-zinc-900 block">{proj.name}</span>
                                <span className="text-[9px] text-zinc-400 block mt-0.5">{proj.category}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* FOOTER SECTION */}
                  {sec.type === "footer" && (
                    <footer className="py-12 px-8 bg-zinc-955 text-zinc-400 text-center text-[10px] space-y-3">
                      <span className="block text-sm font-extrabold uppercase text-white" style={{ color: theme.primaryColor || "#4f46e5" }}>{sec.content.businessName}</span>
                      <p className="font-mono text-[9px] text-zinc-650 leading-normal">{sec.content.copyright}</p>
                    </footer>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      </main>

        {/* Right Sidebar (Contextual Properties Panel) */}
        <aside className="w-72 border-l border-zinc-850 bg-zinc-900 flex flex-col shrink-0 z-10 overflow-y-auto p-5 space-y-6">
          <PropertiesPanel
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            handleTextChange={handleTextChange}
            handleTextBlur={handleTextBlur}
            updateImageURL={updateImageURL}
            setActiveTab={setActiveTab}
            handleAssetSelect={handleAssetSelect}
            theme={theme}
            websiteJSON={websiteJSON}
            updateWebsiteJSON={updateWebsiteJSON}
          />
        </aside>

      </div>

      {/* Floating Toast Notification */}
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
