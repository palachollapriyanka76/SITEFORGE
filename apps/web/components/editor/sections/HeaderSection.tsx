"use client";

import { WebsiteJSONSection, WebsiteJSONTheme } from "@siteforge/types";
import { useEditorStore } from "@/store/editor.store";

interface HeaderSectionProps {
  section: WebsiteJSONSection;
  theme: WebsiteJSONTheme;
  isEditing?: boolean;
}

export function HeaderSection({ section, theme, isEditing }: HeaderSectionProps) {
  const { updateSection } = useEditorStore();

  const handleBlur = (field: string) => (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditing || !section?.id) return;
    updateSection(section.id, {
      content: { ...section.content, [field]: e.currentTarget.textContent }
    });
  };

  const title = section?.content?.title || section?.content?.businessName || (theme as any)?.logo?.text || (theme as any)?.title || "Brand";
  const rawLogo = (theme as any)?.logo || (section?.content as any)?.logo || (section as any)?.logo || (theme as any)?.websiteLogo || (theme as any)?.logoUrl || (section?.content as any)?.logoUrl;
  const logo = typeof rawLogo === 'string' ? { url: rawLogo, emoji: "✨" } : rawLogo;
  const links = Array.isArray(section?.content?.links) ? section.content.links : [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "Products", href: "#products" },
    { label: "Contact", href: "#contact" },
  ];

  const headerStyle = {
    backgroundColor: section?.styles?.backgroundColor || theme.secondaryColor || "#0F172A",
    color: section?.styles?.color || "#ffffff",
  };

  return (
    <header style={headerStyle} className="sticky top-0 z-40 w-full px-6 py-4 shadow-md border-b border-white/10 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {logo?.url ? (
            <img src={logo.url} alt={title} className="h-10 w-auto object-contain" />
          ) : logo?.svgString ? (
            <div className="h-10 w-36" dangerouslySetInnerHTML={{ __html: logo.svgString }} />
          ) : (
            <div className="flex items-center gap-2">
              <span className="h-9 w-9 rounded-xl flex items-center justify-center text-lg shadow-sm" style={{ backgroundColor: theme.primaryColor || "#4F46E5", color: "#fff" }}>
                {logo?.emoji || "✨"}
              </span>
              <span 
                className="text-xl font-extrabold tracking-tight"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={handleBlur("title")}
                style={{ outline: 'none' }}
              >
                {title}
              </span>
            </div>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium opacity-90">
          {links.map((link: any, idx: number) => (
            <a key={idx} href={link.href || "#"} className="hover:opacity-100 hover:text-blue-400 transition-colors">
              {link.label || link.name || `Link ${idx + 1}`}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a 
            href="#contact" 
            className="px-4 py-2 rounded-lg text-xs font-bold shadow-md transition-transform hover:scale-105"
            style={{ backgroundColor: theme.primaryColor || "#4F46E5", color: "#fff" }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </header>
  );
}
