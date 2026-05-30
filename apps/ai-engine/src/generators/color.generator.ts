export interface ColorPalette {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export const generateColorPalette = (preference: string | undefined, businessType: string): ColorPalette => {
  // Simple heuristic color mapping. In a real scenario, this could also call an AI or a color service.
  const lowerBusinessType = businessType.toLowerCase();
  
  if (preference && preference.startsWith("#")) {
    // If a hex code is provided as a preference, build around it
    return {
      primaryColor: preference,
      secondaryColor: "#1A202C", // Dark gray fallback
      accentColor: "#F6AD55", // Orange fallback
    };
  }

  // Pre-defined palettes based on business types
  if (lowerBusinessType.includes("tech") || lowerBusinessType.includes("software")) {
    return { primaryColor: "#2563EB", secondaryColor: "#1E40AF", accentColor: "#F59E0B" }; // Blue/Amber
  }
  
  if (lowerBusinessType.includes("health") || lowerBusinessType.includes("medical") || lowerBusinessType.includes("clinic")) {
    return { primaryColor: "#059669", secondaryColor: "#047857", accentColor: "#3B82F6" }; // Green/Blue
  }

  if (lowerBusinessType.includes("food") || lowerBusinessType.includes("restaurant") || lowerBusinessType.includes("cafe")) {
    return { primaryColor: "#DC2626", secondaryColor: "#991B1B", accentColor: "#FBBF24" }; // Red/Yellow
  }
  
  if (lowerBusinessType.includes("finance") || lowerBusinessType.includes("bank") || lowerBusinessType.includes("consulting")) {
    return { primaryColor: "#1E3A8A", secondaryColor: "#172554", accentColor: "#10B981" }; // Dark Blue/Emerald
  }

  // Default elegant palette
  return {
    primaryColor: "#0F172A", // Slate
    secondaryColor: "#334155", // Lighter Slate
    accentColor: "#38BDF8", // Sky Blue
  };
};
