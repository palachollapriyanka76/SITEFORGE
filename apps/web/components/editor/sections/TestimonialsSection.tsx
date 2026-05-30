"use client";

import { WebsiteJSONSection, WebsiteJSONTheme } from "@siteforge/types";
import { useEditorStore } from "@/store/editor.store";
import { Star } from "lucide-react";

interface TestimonialsSectionProps {
  section: WebsiteJSONSection;
  theme: WebsiteJSONTheme;
  isEditing?: boolean;
}

export function TestimonialsSection({ section, theme, isEditing }: TestimonialsSectionProps) {
  const { updateSection } = useEditorStore();

  const handleBlur = (field: string) => (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditing) return;
    updateSection(section.id, {
      content: { ...section.content, [field]: e.currentTarget.textContent }
    });
  };

  const title = section.content.title || "Client Testimonials";
  const subtitle = section.content.subtitle || "What our customers are saying about us.";

  const containerStyle = {
    backgroundColor: section.styles?.backgroundColor || "#ffffff",
    color: section.styles?.color || "#1e293b",
    paddingTop: section.styles?.paddingTop || "80px",
    paddingBottom: section.styles?.paddingBottom || "80px",
  };

  const testimonials = section.content.testimonials || [
    { name: "Sarah Johnson", role: "CEO, TechCorp", content: "Outstanding service! They delivered exactly what we needed and exceeded our expectations in every way.", rating: 5 },
    { name: "Michael Chen", role: "Founder, StartupX", content: "The team is incredibly responsive and talented. Our sales have doubled since we launched the new platform.", rating: 5 }
  ];

  const handleTestimonialChange = (idx: number, key: "name" | "role" | "content") => (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditing) return;
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[idx] = { ...updatedTestimonials[idx], [key]: e.currentTarget.textContent || "" };
    updateSection(section.id, {
      content: { ...section.content, testimonials: updatedTestimonials }
    });
  };

  const animationClass = section.animations?.entrance && section.animations.entrance !== "none" ? `animate-${section.animations.entrance}` : "";

  return (
    <section style={containerStyle} className={`px-4 ${animationClass}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test: any, idx: number) => {
            const stars = test.rating || test.stars || 5;
            return (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 relative">
                <div className="flex gap-1 mb-6">
                  {[...Array(stars)].map((_, i) => (
                    <Star key={i} className="h-5 w-5" style={{ fill: theme.accentColor || theme.primaryColor, color: theme.accentColor || theme.primaryColor }} />
                  ))}
                </div>
                <p 
                  className="text-slate-600 mb-8 italic outline-none"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={handleTestimonialChange(idx, "content")}
                >
                  {test.content || test.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-300 flex items-center justify-center font-bold text-white text-lg">
                    {(test.name || "U").charAt(0)}
                  </div>
                  <div>
                    <h4 
                      className="font-bold outline-none"
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={handleTestimonialChange(idx, "name")}
                    >
                      {test.name}
                    </h4>
                    <p 
                      className="text-sm text-slate-500 outline-none"
                      contentEditable={isEditing}
                      suppressContentEditableWarning
                      onBlur={handleTestimonialChange(idx, "role")}
                    >
                      {test.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

