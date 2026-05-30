"use client";

import { useState } from "react";
import { useEditorStore } from "@/store/editor.store";
import { Copy, Trash2, X } from "lucide-react";

const ANIMATIONS = ["none", "fade-in", "slide-up", "slide-left", "slide-right", "zoom-in"];

export function PropertiesPanel() {
  const { websiteJSON, selectedSectionId, updateSection, removeSection, selectSection, addSection } = useEditorStore();
  const [activeTab, setActiveTab] = useState("content");

  if (!websiteJSON || !selectedSectionId) {
    return (
      <div className="w-[300px] h-full bg-slate-950 border-l border-slate-800 flex items-center justify-center p-6 text-center text-slate-500 shrink-0">
        Select a section on the canvas to edit its properties.
      </div>
    );
  }

  const page = websiteJSON.pages[0];
  const sectionIndex = page.sections.findIndex(s => s.id === selectedSectionId);
  const section = page.sections[sectionIndex];

  if (!section) return null;

  const handleContentChange = (key: string, value: string) => {
    updateSection(section.id, { content: { ...section.content, [key]: value } });
  };

  const handleStyleChange = (key: string, value: string) => {
    updateSection(section.id, { styles: { ...section.styles, [key]: value } });
  };

  const handleAnimationChange = (value: string) => {
    updateSection(section.id, { animations: { ...section.animations, entrance: value } });
  };

  const handleDuplicate = () => {
    addSection(
      { ...section, id: `section-${Date.now()}` },
      sectionIndex + 1
    );
  };

  const bgStyle = section.styles?.backgroundColor || "";
  const textColorStyle = section.styles?.color || "";
  const padTop = section.styles?.paddingTop || "80px";
  const padBot = section.styles?.paddingBottom || "80px";
  const animEntrance = section.animations?.entrance || "none";

  return (
    <div className="w-[300px] h-full bg-slate-950 border-l border-slate-800 flex flex-col shrink-0 text-slate-200">
      <div className="flex items-center justify-between p-3 border-b border-slate-800">
        <h3 className="font-medium text-sm capitalize text-white">{section.type} Properties</h3>
        <button onClick={() => selectSection(null)} className="text-slate-400 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="flex p-2 gap-1 border-b border-slate-800">
        {["content", "style", "animation"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 text-xs font-medium rounded capitalize transition-colors ${activeTab === tab ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {activeTab === "content" && (
          <div className="space-y-4">
            {Object.entries(section.content).map(([key, value]) => (
              <div key={key}>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 capitalize">{key}</label>
                {typeof value === "string" ? (
                  <textarea
                    value={value}
                    onChange={(e) => handleContentChange(key, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                    rows={value.length > 60 ? 3 : 1}
                  />
                ) : (
                  <div className="text-xs text-slate-500 italic p-2 bg-slate-900/50 rounded border border-slate-800">
                    Complex list data. Edit directly in canvas or AI.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "style" && (
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Background Color (Hex, RGB, etc.)</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={bgStyle || "#ffffff"} 
                  onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                  className="h-8 w-8 rounded border border-slate-700 bg-slate-900 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={bgStyle}
                  placeholder="Theme Default"
                  onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-md p-1.5 text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Text Color</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={textColorStyle || "#0f172a"} 
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="h-8 w-8 rounded border border-slate-700 bg-slate-900 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={textColorStyle}
                  placeholder="Theme Default"
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-md p-1.5 text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Padding Top</label>
              <input
                type="text"
                value={padTop}
                onChange={(e) => handleStyleChange("paddingTop", e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-md p-1.5 text-sm focus:border-blue-500 outline-none mb-3"
              />
              
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Padding Bottom</label>
              <input
                type="text"
                value={padBot}
                onChange={(e) => handleStyleChange("paddingBottom", e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-md p-1.5 text-sm focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        )}

        {activeTab === "animation" && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Entrance Animation</label>
              <select
                value={animEntrance}
                onChange={(e) => handleAnimationChange(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm focus:border-blue-500 outline-none"
              >
                {ANIMATIONS.map(a => (
                  <option key={a} value={a}>{a.replace("-", " ").toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-800 flex gap-2 shrink-0">
        <button 
          onClick={handleDuplicate}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          <Copy size={16} /> Duplicate
        </button>
        <button 
          onClick={() => removeSection(section.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-950/50 hover:bg-red-900 text-red-400 text-sm font-medium rounded-lg transition-colors border border-red-900/50 shadow-sm"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
