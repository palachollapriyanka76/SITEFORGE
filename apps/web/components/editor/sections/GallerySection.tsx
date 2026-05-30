"use client";

import { WebsiteJSONSection, WebsiteJSONTheme } from "@siteforge/types";
import { useEditorStore } from "@/store/editor.store";

interface GallerySectionProps {
  section: WebsiteJSONSection;
  theme: WebsiteJSONTheme;
  isEditing?: boolean;
}

export function GallerySection({ section, theme, isEditing }: GallerySectionProps) {
  const { updateSection } = useEditorStore();

  const handleBlur = (field: string) => (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditing) return;
    updateSection(section.id, {
      content: { ...section.content, [field]: e.currentTarget.textContent }
    });
  };

  const title = section.content.title || "Image Gallery";
  const subtitle = section.content.subtitle || "A glimpse into our world.";

  const containerStyle = {
    backgroundColor: section.styles?.backgroundColor || "#f8fafc",
    color: section.styles?.color || "#1e293b",
    paddingTop: section.styles?.paddingTop || "80px",
    paddingBottom: section.styles?.paddingBottom || "80px",
  };

  const images = section.content.images || [
    { url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&q=80", caption: "Premium styling" },
    { url: "https://images.unsplash.com/photo-1555529733-0e67056058e1?w=500&q=80", caption: "Our master creators" }
  ];

  const animationClass = section.animations?.entrance && section.animations.entrance !== "none" ? `animate-${section.animations.entrance}` : "";

  return (
    <section style={containerStyle} className={`px-4 ${animationClass}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
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
            className="text-lg opacity-80"
            contentEditable={isEditing}
            suppressContentEditableWarning
            onBlur={handleBlur("subtitle")}
            style={{ outline: 'none' }}
          >
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img: any, idx: number) => (
            <div key={idx} className="relative aspect-square md:aspect-video rounded-xl overflow-hidden bg-slate-200 group">
              <img 
                src={img.url || img} 
                alt={img.caption || `Gallery image ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
