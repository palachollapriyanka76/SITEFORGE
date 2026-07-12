"use client";

import { WebsiteJSONSection, WebsiteJSONTheme } from "@siteforge/types";
import { useEditorStore } from "@/store/editor.store";
import * as LucideIcons from "lucide-react";
import { CheckCircle2 } from "lucide-react";

interface ServicesSectionProps {
  section: WebsiteJSONSection;
  theme: WebsiteJSONTheme;
  isEditing?: boolean;
}

export function ServicesSection({ section, theme, isEditing }: ServicesSectionProps) {
  const { updateSection } = useEditorStore();

  const handleBlur = (field: string) => (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditing) return;
    updateSection(section.id, {
      content: { ...section.content, [field]: e.currentTarget.textContent }
    });
  };

  const title = section.content.title || "Our Services";
  const subtitle = section.content.subtitle || "What we offer to our customers.";
  
  const services = section.content.services || [
    { name: "Premium Consulting", description: "Get direct support from industry experts.", icon: "Sparkles" },
    { name: "24/7 Priority Support", description: "We are always here to help you solve issues.", icon: "Clock" },
    { name: "Custom Solutions", description: "Tailored options built specifically for your goals.", icon: "CheckCircle2" }
  ];

  const handleServiceChange = (idx: number, key: "name" | "description") => (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditing) return;
    const updatedServices = [...services];
    updatedServices[idx] = { ...updatedServices[idx], [key]: e.currentTarget.textContent || "" };
    updateSection(section.id, {
      content: { ...section.content, services: updatedServices }
    });
  };

  const containerStyle = {
    backgroundColor: section.styles?.backgroundColor || "#f8fafc",
    color: section.styles?.color || "#1e293b",
    paddingTop: section.styles?.paddingTop || "80px",
    paddingBottom: section.styles?.paddingBottom || "80px",
  };

  const animationClass = section.animations?.entrance && section.animations.entrance !== "none" ? `animate-${section.animations.entrance}` : "";

  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? (
      <IconComponent className="h-8 w-8 mb-4" style={{ color: theme.accentColor || theme.primaryColor }} />
    ) : (
      <CheckCircle2 className="h-8 w-8 mb-4" style={{ color: theme.accentColor || theme.primaryColor }} />
    );
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any, idx: number) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between group">
              {service.image && (
                <div className="h-48 w-full relative overflow-hidden bg-slate-100 shrink-0">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {getIconComponent(service.icon)}
                  <h3 
                    className="text-xl font-bold mb-2 outline-none"
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={handleServiceChange(idx, "name")}
                  >
                    {service.name}
                  </h3>
                  <p 
                    className="text-slate-500 text-sm leading-relaxed outline-none"
                    contentEditable={isEditing}
                    suppressContentEditableWarning
                    onBlur={handleServiceChange(idx, "description")}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

