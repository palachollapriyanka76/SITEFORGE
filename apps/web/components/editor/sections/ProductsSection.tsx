"use client";

import { WebsiteJSONSection, WebsiteJSONTheme } from "@siteforge/types";
import { useEditorStore } from "@/store/editor.store";

interface ProductsSectionProps {
  section: WebsiteJSONSection;
  theme: WebsiteJSONTheme;
  isEditing?: boolean;
}

export function ProductsSection({ section, theme, isEditing }: ProductsSectionProps) {
  const { updateSection } = useEditorStore();

  const handleBlur = (field: string) => (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditing) return;
    updateSection(section.id, {
      content: { ...section.content, [field]: e.currentTarget.textContent }
    });
  };

  const title = section.content.title || "Featured Products";
  const subtitle = section.content.subtitle || "Browse our catalog of premium items.";

  const containerStyle = {
    backgroundColor: section.styles?.backgroundColor || "#ffffff",
    color: section.styles?.color || "#1e293b",
    paddingTop: section.styles?.paddingTop || "80px",
    paddingBottom: section.styles?.paddingBottom || "80px",
  };

  const products = section.content.products || [
    { name: "Classic Item 1", price: "Rs. 499", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
    { name: "Premium Item 2", price: "Rs. 899", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" }
  ];

  const handleProductChange = (idx: number, key: "name" | "price") => (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditing) return;
    const updatedProducts = [...products];
    updatedProducts[idx] = { ...updatedProducts[idx], [key]: e.currentTarget.textContent || "" };
    updateSection(section.id, {
      content: { ...section.content, products: updatedProducts }
    });
  };

  const animationClass = section.animations?.entrance && section.animations.entrance !== "none" ? `animate-${section.animations.entrance}` : "";

  return (
    <section style={containerStyle} className={`px-4 ${animationClass}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-4">
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
          <button 
            className="px-6 py-2 rounded-full font-bold text-sm"
            style={{ border: `2px solid ${theme.primaryColor}`, color: theme.primaryColor }}
          >
            View All Products
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any, idx: number) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img 
                  src={product.image || product.img} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 
                className="font-bold text-lg outline-none animate-pulse-once"
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={handleProductChange(idx, "name")}
              >
                {product.name}
              </h3>
              <p 
                className="font-semibold outline-none" 
                style={{ color: theme.accentColor || theme.primaryColor }}
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={handleProductChange(idx, "price")}
              >
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

