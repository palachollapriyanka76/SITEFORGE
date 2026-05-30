"use client";

import { useEffect } from "react";
import { Toolbar } from "./Toolbar";
import { Sidebar } from "./Sidebar";
import { EditorCanvas } from "./EditorCanvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { useEditorStore } from "@/store/editor.store";

export function EditorLayout({ websiteId }: { websiteId: string }) {
  const { undo, redo, save } = useEditorStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "y") {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        save();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, save]);

  return (
    <div className="flex flex-col h-full w-full">
      <Toolbar websiteId={websiteId} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 bg-slate-900 overflow-y-auto relative">
          <EditorCanvas />
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
}
