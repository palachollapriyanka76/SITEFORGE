"use client";

import { WebsiteJSONSection, WebsiteJSONTheme } from "@siteforge/types";
import { useEditorStore } from "@/store/editor.store";

interface AboutSectionProps {
  section: WebsiteJSONSection;
  theme: WebsiteJSONTheme;
  isEditing?: boolean;
}

export function AboutSection({ section, theme, isEditing }: AboutSectionProps) {
  const { updateSection } = useEditorStore();

  const handleBlur = (field: string) => (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditing) return;
    const key = field === "subtitle" && section.content.description ? "description" : field;
    updateSection(section.id, {
      content: { ...section.content, [key]: e.currentTarget.textContent }
    });
  };

  const title = section.content.title || "About Us";
  const subtitle = section.content.description || section.content.subtitle || "Learn more about our mission, values, and the people behind the business. We are dedicated to providing the best service to our customers.";

  const containerStyle = {
    backgroundColor: section.styles?.backgroundColor || "#ffffff",
    color: section.styles?.color || "#1e293b",
    paddingTop: section.styles?.paddingTop || "80px",
    paddingBottom: section.styles?.paddingBottom || "80px",
  };

  const animationClass = section.animations?.entrance && section.animations.entrance !== "none" 
    ? `animate-${section.animations.entrance}` 
    : "";

  return (
    <section style={containerStyle} className={`px-4 ${animationClass}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 
            className="text-4xl font-extrabold tracking-tight"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={handleBlur("title")}
            style={{ outline: 'none', color: theme.primaryColor }}
          >
            {title}
          </h2>
          <p 
            className="text-lg leading-relaxed opacity-90"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={handleBlur("subtitle")}
            style={{ outline: 'none' }}
          >
            {subtitle}
          </p>
          <button 
            className="px-6 py-2.5 rounded-full font-semibold transition-transform hover:scale-105 shadow-md"
            style={{ backgroundColor: theme.primaryColor, color: "#fff" }}
          >
            Read Our Story
          </button>
        </div>
        <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-slate-200">
          <img 
            src={section.content.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"} 
            alt="About Us"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
