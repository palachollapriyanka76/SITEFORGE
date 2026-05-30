"use client";

import { useEffect } from "react";
import { EditorLayout } from "@/components/editor/EditorLayout";
import { AIEditorAssistant } from "@/components/editor/AIEditorAssistant";
import { useEditorStore } from "@/store/editor.store";

export default function EditorPage({ params }: { params: { websiteId: string } }) {
  const { loadWebsite, websiteJSON } = useEditorStore();

  useEffect(() => {
    loadWebsite(params.websiteId);
  }, [params.websiteId, loadWebsite]);

  if (!websiteJSON) return <div className="h-screen w-full flex items-center justify-center bg-slate-900 text-white">Loading Editor...</div>;

  return (
    <div className="w-full h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col font-sans">
      <EditorLayout websiteId={params.websiteId} />
      <AIEditorAssistant />
    </div>
  );
}
