import React from "react";

export default function SkeletonCard() {
  return (
    <div className="bg-white border border-[#84A98C]/15 rounded-[28px] p-4 flex flex-col justify-between shadow-[0_20px_60px_rgba(47,62,70,0.08)] animate-pulse">
      <div className="space-y-4">
        {/* Mock image container */}
        <div className="relative aspect-[4/3] rounded-2xl bg-zinc-200 border border-[#84A98C]/10 overflow-hidden" />
        
        {/* Mock meta details */}
        <div className="px-1.5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 w-16 bg-zinc-200 rounded-full" />
            <div className="h-4 w-12 bg-zinc-200 rounded-full" />
          </div>
          <div className="h-5 w-3/4 bg-zinc-250 rounded-lg" />
          <div className="h-3 w-full bg-zinc-200 rounded" />
        </div>
      </div>
      
      {/* Mock footer action */}
      <div className="mt-5 border-t border-[#84A98C]/10 pt-4 flex items-center justify-between px-1">
        <div className="h-5 w-24 bg-zinc-200 rounded-full" />
        <div className="h-4 w-16 bg-zinc-200 rounded-full" />
      </div>
    </div>
  );
}
