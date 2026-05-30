"use client";

import { useEditorStore } from "@/store/editor.store";
import { Undo, Redo, Monitor, Tablet, Smartphone, Save, Play, Globe } from "lucide-react";

export function Toolbar({ websiteId }: { websiteId: string }) {
  const { websiteJSON, undo, redo, device, setDevice, isSaving, historyStack, historyIndex } = useEditorStore();

  const handleNameChange = (e: React.FormEvent<HTMLSpanElement>) => {
    // In a real app, update name in store/DB
    console.log("Name changed:", e.currentTarget.textContent);
  };

  return (
    <div className="h-14 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">SF</div>
        <span 
          contentEditable 
          suppressContentEditableWarning
          onBlur={handleNameChange}
          className="text-sm font-medium outline-none border-b border-transparent focus:border-blue-500 transition-colors"
        >
          {websiteJSON?.meta.title || "Untitled Website"}
        </span>
      </div>

      <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
        <button 
          onClick={() => setDevice("desktop")} 
          className={`p-1.5 rounded ${device === "desktop" ? "bg-slate-800 text-blue-400" : "text-slate-400 hover:text-slate-200"}`}
        >
          <Monitor size={18} />
        </button>
        <button 
          onClick={() => setDevice("tablet")} 
          className={`p-1.5 rounded ${device === "tablet" ? "bg-slate-800 text-blue-400" : "text-slate-400 hover:text-slate-200"}`}
        >
          <Tablet size={18} />
        </button>
        <button 
          onClick={() => setDevice("mobile")} 
          className={`p-1.5 rounded ${device === "mobile" ? "bg-slate-800 text-blue-400" : "text-slate-400 hover:text-slate-200"}`}
        >
          <Smartphone size={18} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 border-r border-slate-800 pr-3">
          <button 
            onClick={undo} 
            disabled={historyIndex <= 0}
            className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Undo size={18} />
          </button>
          <button 
            onClick={redo}
            disabled={historyIndex >= historyStack.length - 1}
            className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Redo size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-400 mr-2">
          {isSaving ? (
            <span className="flex items-center gap-1 text-blue-400"><Save size={14} className="animate-pulse" /> Saving...</span>
          ) : (
            <span className="flex items-center gap-1"><Save size={14} /> Saved</span>
          )}
        </div>

        <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sm rounded-md transition-colors">
          <Play size={14} /> Preview
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded-md transition-colors">
          <Globe size={14} /> Publish
        </button>
      </div>
    </div>
  );
}
