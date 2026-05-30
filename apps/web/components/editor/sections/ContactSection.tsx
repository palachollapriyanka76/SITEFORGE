"use client";

import { WebsiteJSONSection, WebsiteJSONTheme } from "@siteforge/types";
import { useEditorStore } from "@/store/editor.store";
import { MapPin, Phone, Mail } from "lucide-react";

interface ContactSectionProps {
  section: WebsiteJSONSection;
  theme: WebsiteJSONTheme;
  isEditing?: boolean;
}

export function ContactSection({ section, theme, isEditing }: ContactSectionProps) {
  const { updateSection } = useEditorStore();

  const handleBlur = (field: string) => (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditing) return;
    updateSection(section.id, {
      content: { ...section.content, [field]: e.currentTarget.textContent }
    });
  };

  const title = section.content.title || "Contact Us";
  const subtitle = section.content.subtitle || "Get in touch with our team today.";
  const phone = section.content.phone || "+91 98765 43210";
  const email = section.content.email || "hello@ourbusiness.com";
  const address = section.content.address || "Pune, Maharashtra, India";

  const containerStyle = {
    backgroundColor: section.styles?.backgroundColor || "#ffffff",
    color: section.styles?.color || "#1e293b",
    paddingTop: section.styles?.paddingTop || "80px",
    paddingBottom: section.styles?.paddingBottom || "80px",
  };

  const animationClass = section.animations?.entrance && section.animations.entrance !== "none" ? `animate-${section.animations.entrance}` : "";

  return (
    <section style={containerStyle} className={`px-4 ${animationClass}`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Info */}
        <div className="space-y-8">
          <div className="space-y-4">
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

          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-slate-100">
                <MapPin className="h-5 w-5" style={{ color: theme.primaryColor }} />
              </div>
              <div>
                <h4 className="font-bold">Address</h4>
                <p 
                  className="text-slate-500 outline-none"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={handleBlur("address")}
                >
                  {address}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-slate-100">
                <Phone className="h-5 w-5" style={{ color: theme.primaryColor }} />
              </div>
              <div>
                <h4 className="font-bold">Phone</h4>
                <p 
                  className="text-slate-500 outline-none"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={handleBlur("phone")}
                >
                  {phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full flex items-center justify-center bg-slate-100">
                <Mail className="h-5 w-5" style={{ color: theme.primaryColor }} />
              </div>
              <div>
                <h4 className="font-bold">Email</h4>
                <p 
                  className="text-slate-500 outline-none"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={handleBlur("email")}
                >
                  {email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
          <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">First Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-500" placeholder="John" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Last Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-500" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Email Address</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-500" placeholder="john@example.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-500" placeholder="How can we help?"></textarea>
            </div>
            <button 
              className="w-full py-3.5 rounded-xl font-bold text-white transition-opacity hover:opacity-90 mt-2"
              style={{ backgroundColor: theme.primaryColor }}
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
