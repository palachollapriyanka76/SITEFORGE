"use client";

import { WebsiteJSONSection, WebsiteJSONTheme } from "@siteforge/types";
import { useEditorStore } from "@/store/editor.store";

interface HeroSectionProps {
  section: WebsiteJSONSection;
  theme: WebsiteJSONTheme;
  isEditing?: boolean;
}

export function HeroSection({ section, theme, isEditing }: HeroSectionProps) {
  const { updateSection } = useEditorStore();

  const handleBlur = (field: string) => (e: React.FocusEvent<HTMLHeadingElement | HTMLParagraphElement>) => {
    if (!isEditing) return;
    updateSection(section.id, {
      content: { ...section.content, [field]: e.currentTarget.textContent }
    });
  };

  const title = section.content.title || "Hero Title";
  const subtitle = section.content.subtitle || "A catchy subtitle for your website.";
  const backgroundImage = section.content.backgroundImage || section.content.image || (section.content as any).bgImage || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80";

  const sectionStyle = {
    backgroundImage: backgroundImage ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.75)), url(${backgroundImage})` : undefined,
    backgroundSize: backgroundImage ? "cover" : undefined,
    backgroundPosition: backgroundImage ? "center" : undefined,
    backgroundColor: theme.primaryColor,
    color: "#fff"
  };

  return (
    <section 
      className="relative min-h-[550px] flex items-center justify-center text-center px-4 py-20"
      style={sectionStyle}
    >
      <div className="max-w-4xl mx-auto z-10 space-y-6">
        <h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={handleBlur("title")}
          style={{ outline: 'none' }}
        >
          {title}
        </h1>
        
        <p 
          className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto"
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={handleBlur("subtitle")}
          style={{ outline: 'none' }}
        >
          {subtitle}
        </p>

        <div className="pt-8 flex justify-center gap-4">
          <button 
            className="px-8 py-3 rounded-full font-semibold transition-transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: theme.accentColor, color: "#000" }}
          >
            Get Started
          </button>
          <button 
            className="px-8 py-3 rounded-full font-semibold border-2 bg-transparent transition-colors hover:bg-white hover:text-black"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
