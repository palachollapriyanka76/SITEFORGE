"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { WebsiteJSON } from "@siteforge/types";
import { Eye, ArrowLeft, Check, Sparkles } from "lucide-react";

// Section imports
import { HeroSection } from "@/components/editor/sections/HeroSection";
import { AboutSection } from "@/components/editor/sections/AboutSection";
import { ServicesSection } from "@/components/editor/sections/ServicesSection";
import { ProductsSection } from "@/components/editor/sections/ProductsSection";
import { GallerySection } from "@/components/editor/sections/GallerySection";
import { TestimonialsSection } from "@/components/editor/sections/TestimonialsSection";
import { FAQSection } from "@/components/editor/sections/FAQSection";
import { ContactSection } from "@/components/editor/sections/ContactSection";
import { FooterSection } from "@/components/editor/sections/FooterSection";
import { HeaderSection } from "@/components/editor/sections/HeaderSection";

const SECTION_MAP: Record<string, any> = {
  header: HeaderSection,
  navbar: HeaderSection,
  hero: HeroSection,
  about: AboutSection,
  team: AboutSection,
  agents: AboutSection,
  services: ServicesSection,
  programs: ServicesSection,
  consultation: ServicesSection,
  products: ProductsSection,
  collections: ProductsSection,
  catalog: ProductsSection,
  inventory: ProductsSection,
  "featured-products": ProductsSection,
  menu: ProductsSection,
  "popular-dishes": ProductsSection,
  properties: ProductsSection,
  gallery: GallerySection,
  showcase: GallerySection,
  portfolio: GallerySection,
  testimonials: TestimonialsSection,
  reviews: TestimonialsSection,
  faq: FAQSection,
  contact: ContactSection,
  booking: ContactSection,
  locations: ContactSection,
  footer: FooterSection,
};

export default function FullscreenPreviewPage({ params }: { params: { websiteId: string } }) {
  const router = useRouter();
  const [websiteJson, setWebsiteJson] = useState<WebsiteJSON | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        if (params.websiteId === "temp") {
          const raw = localStorage.getItem("siteforge_temp_preview");
          if (!raw) {
            throw new Error("No temporary preview found in session.");
          }
          setWebsiteJson(JSON.parse(raw));
        } else {
          const res = await axios.get(`/api/websites/${params.websiteId}/json`);
          if (res.data && res.data.success) {
            setWebsiteJson(res.data.data);
          } else {
            throw new Error("Failed to load website configuration");
          }
        }
      } catch (err: any) {
        console.error("Preview load error:", err);
        setError(err.message || "Failed to load website configuration.");
      } finally {
        setLoading(false);
      }
    };

    fetchWebsite();
  }, [params.websiteId]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white font-sans space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <p className="text-sm font-semibold tracking-wide text-indigo-400">Loading Full-Screen Preview...</p>
      </div>
    );
  }

  if (error || !websiteJson) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white font-sans p-6 text-center space-y-4">
        <p className="text-red-400 font-bold text-lg">⚠️ Failed to Load Preview</p>
        <p className="text-sm text-slate-400 max-w-md">{error || "The website configuration is unavailable."}</p>
        <button
          onClick={() => window.close()}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all border border-slate-700"
        >
          Close Tab
        </button>
      </div>
    );
  }

  const mainPage = websiteJson.pages[0];
  const sections = mainPage?.sections || [];

  return (
    <div className="w-full min-h-screen bg-white relative selection:bg-indigo-600 selection:text-white" style={{ fontFamily: websiteJson.theme.fontFamily || "Inter" }}>
      
      {/* Elegant floating banner showing preview indicator */}
      {bannerVisible && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md border border-slate-800 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-6 z-[100] transition-all animate-bounce">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">PREVIEWING LIVE CONCEPT</span>
          </div>
          
          <div className="flex items-center gap-2.5">
            {params.websiteId === "temp" ? (
              <button
                onClick={() => window.close()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold rounded-lg transition-all shadow"
              >
                <ArrowLeft size={13} /> Back to Selection
              </button>
            ) : (
              <button
                onClick={() => window.close()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold rounded-lg transition-all shadow"
              >
                <ArrowLeft size={13} /> Back to Editor
              </button>
            )}
            <button
              onClick={() => setBannerVisible(false)}
              className="text-slate-400 hover:text-white text-xs font-semibold px-2 py-1.5 transition-colors"
            >
              Hide
            </button>
          </div>
        </div>
      )}

      {/* Floating reveal button when banner is hidden */}
      {!bannerVisible && (
        <button
          onClick={() => setBannerVisible(true)}
          className="fixed top-4 right-4 bg-slate-900 border border-slate-800 text-white p-3 rounded-full shadow-2xl z-[100] hover:scale-105 transition-all"
          title="Show Preview Controls"
        >
          <Eye size={16} className="text-indigo-400" />
        </button>
      )}

      {/* Render the sections completely clean and realistic */}
      <main className="w-full">
        {!sections.some((s: any) => s.type === "header" || s.type === "navbar") && (
          <HeaderSection 
            section={{ id: "auto-header", type: "header", content: { title: websiteJson.meta?.title?.split(" | ")[0] || "Our Business" }, order: -1, visible: true }} 
            theme={{ ...(websiteJson.theme || {}), logo: websiteJson.theme?.logo || (websiteJson as any).logo || (websiteJson as any).logoUrl, websiteLogo: (websiteJson as any).logo || (websiteJson as any).logoUrl } as any} 
            isEditing={false} 
          />
        )}
        {sections
          .filter((s: any) => s.visible !== false)
          .sort((a: any, b: any) => a.order - b.order)
          .map((section: any) => {
            const SectionComponent = SECTION_MAP[section.type] || (() => null);
            return (
              <SectionComponent
                key={section.id}
                section={section}
                theme={{ ...(websiteJson.theme || {}), logo: websiteJson.theme?.logo || (websiteJson as any).logo || (websiteJson as any).logoUrl, websiteLogo: (websiteJson as any).logo || (websiteJson as any).logoUrl } as any}
                isEditing={false}
              />
            );
          })}
      </main>

      {/* WhatsApp Button Widget */}
      {websiteJson.globalSettings.whatsappButton && websiteJson.globalSettings.whatsappNumber && (
        <a 
          href={`https://wa.me/${websiteJson.globalSettings.whatsappNumber.replace(/\D/g,"")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 h-14 w-14 bg-green-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-[99]"
          aria-label="Contact on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </a>
      )}

    </div>
  );
}
