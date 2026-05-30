"use client";

import { WebsiteJSONSection, WebsiteJSONTheme } from "@siteforge/types";
import { useEditorStore } from "@/store/editor.store";
import { ChevronDown } from "lucide-react";

interface FAQSectionProps {
  section: WebsiteJSONSection;
  theme: WebsiteJSONTheme;
  isEditing?: boolean;
}

export function FAQSection({ section, theme, isEditing }: FAQSectionProps) {
  const { updateSection } = useEditorStore();

  const handleBlur = (field: string) => (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditing) return;
    updateSection(section.id, {
      content: { ...section.content, [field]: e.currentTarget.textContent }
    });
  };

  const title = section.content.title || "Frequently Asked Questions";
  const subtitle = section.content.subtitle || "Everything you need to know about our services.";

  const containerStyle = {
    backgroundColor: section.styles?.backgroundColor || "#f8fafc",
    color: section.styles?.color || "#1e293b",
    paddingTop: section.styles?.paddingTop || "80px",
    paddingBottom: section.styles?.paddingBottom || "80px",
  };

  const faqs = section.content.faqs || [
    { question: "How long does it take to get started?", answer: "We typically onboard new clients within 24 to 48 hours. Our streamlined process ensures you can start seeing results immediately." },
    { question: "What forms of payment do you accept?", answer: "We accept all major credit cards, UPI, PayPal, and standard bank transfers." }
  ];

  const handleFaqChange = (idx: number, key: "question" | "answer") => (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditing) return;
    const updatedFaqs = [...faqs];
    updatedFaqs[idx] = { ...updatedFaqs[idx], [key]: e.currentTarget.textContent || "" };
    updateSection(section.id, {
      content: { ...section.content, faqs: updatedFaqs }
    });
  };

  const animationClass = section.animations?.entrance && section.animations.entrance !== "none" ? `animate-${section.animations.entrance}` : "";

  return (
    <section style={containerStyle} className={`px-4 ${animationClass}`}>
      <div className="max-w-4xl mx-auto">
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

        <div className="space-y-4">
          {faqs.map((faq: any, idx: number) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between cursor-pointer group">
              <div className="w-full">
                <h3 
                  className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors outline-none" 
                  style={{ color: theme.primaryColor }}
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={handleFaqChange(idx, "question")}
                >
                  {faq.question || faq.q}
                </h3>
                <p 
                  className="text-slate-500 leading-relaxed outline-none"
                  contentEditable={isEditing}
                  suppressContentEditableWarning
                  onBlur={handleFaqChange(idx, "answer")}
                >
                  {faq.answer || faq.a}
                </p>
              </div>
              <ChevronDown className="h-5 w-5 text-slate-400 mt-1 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

