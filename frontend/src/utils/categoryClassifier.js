/**
 * Classifies a user-provided custom business category into a structured path:
 * [Broad Category] → [Specific Category]
 * 
 * @param {string} input - The raw custom category input
 * @returns {string} The classified category string
 */
export function classifyBusinessCategory(input) {
  if (!input) return "Other Services";
  
  const normalized = input.toLowerCase().trim();

  // Retail & E-commerce
  if (normalized.includes("drone") || normalized.includes("quadcopter")) {
    return "Retail → Drone Store";
  }
  if (normalized.includes("solar") || normalized.includes("renewable")) {
    return "Retail → Solar Panel Shop";
  }
  if (normalized.includes("shoe") || normalized.includes("footwear") || normalized.includes("sneaker") || normalized.includes("sandal")) {
    return "Retail → Footwear Store";
  }
  if (normalized.includes("travel") || normalized.includes("tour") || normalized.includes("trip")) {
    return "Travel → Travel Agency";
  }
  if (normalized.includes("agri") || normalized.includes("farm") || normalized.includes("produce") || normalized.includes("vegetable") || normalized.includes("fruit") || normalized.includes("dairy")) {
    return "Agriculture → Fresh Produce";
  }
  if (normalized.includes("gaming") || normalized.includes("esports") || normalized.includes("game")) {
    return "Entertainment → Gaming Center";
  }
  if (normalized.includes("toy") || normalized.includes("kids") || normalized.includes("child") || normalized.includes("baby")) {
    return "Retail → Toy Store";
  }
  if (normalized.includes("fish") || normalized.includes("aquarium") || normalized.includes("aqua")) {
    return "Retail → Aquarium & Fish Store";
  }
  if (normalized.includes("book") || normalized.includes("novel")) {
    return "Retail → Bookstore";
  }
  if (normalized.includes("grocery") || normalized.includes("supermarket") || normalized.includes("mart") || normalized.includes("convenience")) {
    return "Retail → Grocery Store";
  }
  if (normalized.includes("gift") || normalized.includes("souvenir") || normalized.includes("craft")) {
    return "Retail → Gift Shop";
  }
  if (normalized.includes("furniture") || normalized.includes("decor") || normalized.includes("home")) {
    return "Retail → Home Decor & Furniture";
  }

  // Food & Beverage (outside Restaurant/Bakery)
  if (normalized.includes("cafe") || normalized.includes("coffee")) {
    return "Food & Beverage → Cafe";
  }
  if (normalized.includes("bar") || normalized.includes("brewery") || normalized.includes("pub")) {
    return "Food & Beverage → Bar & Pub";
  }

  // Services
  if (normalized.includes("pet") || normalized.includes("dog") || normalized.includes("cat") || normalized.includes("vet")) {
    return "Pet Services → Pet Care";
  }
  if (normalized.includes("art") || normalized.includes("paint") || normalized.includes("draw")) {
    return "Creative → Art Studio";
  }
  if (normalized.includes("clean") || normalized.includes("maid") || normalized.includes("housekeeping")) {
    return "Local Services → Cleaning Service";
  }
  if (normalized.includes("photo") || normalized.includes("video") || normalized.includes("camera")) {
    return "Creative → Photography";
  }

  // Generic fallback: Capitalize the words and prefix with Retail
  const words = normalized
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return `Retail → ${words}`;
}
