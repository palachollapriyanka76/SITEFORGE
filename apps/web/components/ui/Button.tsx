import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary", 
  type = "button",
  disabled = false
}: ButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "outline":
        return "border-2 border-[#52796F] text-[#52796F] hover:bg-[#52796F] hover:text-white bg-transparent";
      case "ghost":
        return "text-[#354F52] hover:bg-[#84A98C]/20 bg-transparent";
      default:
        return "bg-[#52796F] hover:bg-[#354F52] text-white shadow-sm border border-[#2F3E46]/10";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-semibold rounded-full text-xs uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${getVariantClasses()} ${className}`}
    >
      {children}
    </button>
  );
}
