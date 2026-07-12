"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { WebsiteJSONSection, WebsiteJSONTheme } from "@siteforge/types";
import { useEditorStore } from "@/store/editor.store";

import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { ServicesSection } from "./sections/ServicesSection";
import { ProductsSection } from "./sections/ProductsSection";
import { GallerySection } from "./sections/GallerySection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { FAQSection } from "./sections/FAQSection";
import { ContactSection } from "./sections/ContactSection";
import { FooterSection } from "./sections/FooterSection";
import { HeaderSection } from "./sections/HeaderSection";

// Simple fallback for unimplemented sections
const FallbackSection = ({ section, isEditing }: any) => (
  <div className="p-12 text-center border-y border-dashed border-slate-200">
    <h2 className="text-2xl font-bold">{section.content.title || section.type}</h2>
    <p className="text-slate-500 mt-2">Placeholder for {section.type} section component.</p>
  </div>
);

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

interface SectionRendererProps {
  section: WebsiteJSONSection;
  theme: WebsiteJSONTheme;
}

export function SectionRenderer({ section, theme }: SectionRendererProps) {
  const { selectedSectionId, selectSection } = useEditorStore();
  const isSelected = selectedSectionId === section.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  const Component = SECTION_MAP[section.type] || FallbackSection;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? 'opacity-50' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        selectSection(section.id);
      }}
    >
      {/* Selection Border */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none z-20 transition-all"></div>
      )}
      
      {/* Hover Outline */}
      {!isSelected && (
        <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/50 pointer-events-none z-10 transition-colors"></div>
      )}

      {/* Drag Handle (Shows on hover or select) */}
      <div 
        {...attributes} 
        {...listeners}
        className={`absolute top-0 right-0 p-1.5 bg-blue-500 text-white cursor-grab active:cursor-grabbing z-30 transition-opacity ${isSelected || isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        style={{ borderBottomLeftRadius: '4px' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
      </div>

      {/* Render the actual component */}
      <div className={`transition-opacity duration-200 ${isDragging ? 'opacity-30' : 'opacity-100'}`}>
        <Component section={section} theme={theme} isEditing={isSelected} />
      </div>
    </div>
  );
}
