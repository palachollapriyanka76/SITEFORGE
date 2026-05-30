"use client";

import { useState } from "react";
import { LayoutTemplate, Type, Image as ImageIcon, LayoutGrid, Plus } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { useEditorStore } from "@/store/editor.store";

const SECTION_TYPES = [
  { type: "hero", label: "Hero Section", icon: <LayoutTemplate size={16} /> },
  { type: "about", label: "About Us", icon: <Type size={16} /> },
  { type: "services", label: "Services", icon: <LayoutGrid size={16} /> },
  { type: "products", label: "Products", icon: <LayoutGrid size={16} /> },
  { type: "gallery", label: "Gallery", icon: <ImageIcon size={16} /> },
  { type: "testimonials", label: "Testimonials", icon: <Type size={16} /> },
  { type: "faq", label: "FAQ", icon: <Type size={16} /> },
  { type: "contact", label: "Contact", icon: <Type size={16} /> },
  { type: "footer", label: "Footer", icon: <LayoutTemplate size={16} /> },
];

function DraggableSectionCard({ section }: { section: typeof SECTION_TYPES[0] }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `new-section-${section.type}`,
    data: {
      type: "new-section",
      sectionType: section.type
    }
  });
  const { addSection } = useEditorStore();

  const handleAddClick = () => {
    addSection({
      id: `section-${Date.now()}`,
      type: section.type as any,
      order: 0,
      visible: true,
      content: { title: `New ${section.label}` },
      styles: {},
      animations: {}
    });
  };

  return (
    <div 
      ref={setNodeRef}
      className={`p-3 bg-slate-900 border border-slate-800 rounded-lg cursor-grab hover:border-slate-700 transition-colors flex items-center justify-between group ${isDragging ? 'opacity-50' : ''}`}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-center gap-3 text-slate-300">
        {section.icon}
        <span className="text-sm font-medium">{section.label}</span>
      </div>
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Prevent drag start on click
          handleAddClick();
        }} 
        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-800 rounded transition-all text-slate-400 hover:text-white cursor-pointer"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export function Sidebar() {
  const [activeTab, setActiveTab] = useState("sections");

  const TABS = [
    { id: "sections", label: "Sections" },
    { id: "elements", label: "Elements" },
    { id: "templates", label: "Templates" },
    { id: "media", label: "Media" },
  ];

  return (
    <div className="w-[280px] h-full bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
      <div className="flex p-2 gap-1 border-b border-slate-800">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-1.5 text-xs font-medium rounded ${activeTab === tab.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "sections" && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Add Section</h3>
            <p className="text-xs text-slate-400 mb-4">Drag a block onto the canvas or click + to append.</p>
            {SECTION_TYPES.map(s => (
              <DraggableSectionCard key={s.type} section={s} />
            ))}
          </div>
        )}

        {activeTab === "elements" && (
          <div className="text-sm text-slate-400 text-center mt-10">
            Element level dragging (Text, Image, Button) inside sections is coming soon.
          </div>
        )}

        {activeTab === "media" && (
          <div className="space-y-4">
             <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded-md transition-colors">
              Upload via Cloudinary
            </button>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-slate-800 rounded border border-slate-700 flex items-center justify-center">
                  <ImageIcon size={24} className="text-slate-600" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "templates" && (
          <div className="text-sm text-slate-400 text-center mt-10">
            Pre-designed section templates library.
          </div>
        )}
      </div>
    </div>
  );
}
