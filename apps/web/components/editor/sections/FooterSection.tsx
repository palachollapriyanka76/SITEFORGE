"use client";

import { WebsiteJSONSection, WebsiteJSONTheme } from "@siteforge/types";
import { useEditorStore } from "@/store/editor.store";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

interface FooterSectionProps {
  section: WebsiteJSONSection;
  theme: WebsiteJSONTheme;
  isEditing?: boolean;
}

export function FooterSection({ section, theme, isEditing }: FooterSectionProps) {
  const { updateSection } = useEditorStore();

  const handleBlur = (field: string) => (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditing) return;
    const key = field === "title" && section.content.businessName ? "businessName" : field;
    updateSection(section.id, {
      content: { ...section.content, [key]: e.currentTarget.textContent }
    });
  };

  const title = section.content.businessName || section.content.title || "Our Brand";
  const subtitle = section.content.copyright || section.content.subtitle || "Making the world a better place, one day at a time.";

  const containerStyle = {
    backgroundColor: section.styles?.backgroundColor || theme.secondaryColor || "#1e293b",
    color: section.styles?.color || "#ffffff",
    paddingTop: section.styles?.paddingTop || "80px",
    paddingBottom: section.styles?.paddingBottom || "40px",
  };

  return (
    <footer style={containerStyle} className="px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-4">
            <h3 
              className="text-2xl font-black tracking-tight"
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={handleBlur("title")}
              style={{ outline: 'none' }}
            >
              {title}
            </h3>
            <p 
              className="opacity-70 max-w-sm leading-relaxed"
              contentEditable={isEditing}
              suppressContentEditableWarning
              onBlur={handleBlur("subtitle")}
              style={{ outline: 'none' }}
            >
              {subtitle}
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold tracking-wider uppercase text-sm opacity-50">Quick Links</h4>
            <ul className="space-y-3 opacity-80">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Services</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold tracking-wider uppercase text-sm opacity-50">Legal</h4>
            <ul className="space-y-3 opacity-80">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center opacity-50 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {title}. All rights reserved.</p>
          <p>Powered by SiteForge</p>
        </div>
      </div>
    </footer>
  );
}
