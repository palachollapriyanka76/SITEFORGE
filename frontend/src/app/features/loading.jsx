import React from "react";
import { Sparkles } from "lucide-react";

export default function FeaturesLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-[#52796F]/20 border-t-[#52796F] animate-spin" />
        <div className="absolute flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-[#52796F] animate-pulse" />
        </div>
      </div>
      
      <h3 className="text-sm font-extrabold tracking-widest text-[#354F52] uppercase animate-pulse">
        Loading Features...
      </h3>
      <p className="text-xs text-zinc-500 max-w-[200px] text-center">
        Assembling layout components for SiteForge features
      </p>
    </div>
  );
}
