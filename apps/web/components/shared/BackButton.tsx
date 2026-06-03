"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  fallback?: string;
  label?: string;
  className?: string;
}

export default function BackButton({ 
  fallback = "/", 
  label = "Back", 
  className = "" 
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center justify-center gap-2 px-4.5 py-2.5 text-xs font-black text-white bg-[#52796F] hover:bg-[#354F52] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 hover:scale-105 active:scale-95 shrink-0 z-50 ${className}`}
      style={{ borderRadius: "14px" }}
    >
      <ArrowLeft size={14} className="stroke-[2.5]" />
      <span>{label}</span>
    </button>
  );
}
