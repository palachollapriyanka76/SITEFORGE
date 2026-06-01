/**
 * SiteForge Image Optimization Helper
 * Parses Unsplash image URLs and appends resizing/format parameters dynamically.
 */

export function getOptimizedImageUrl(url, size = "full") {
  if (!url) return "";

  // If it's a data URI or not an Unsplash URL, return it directly
  if (url.startsWith("data:") || !url.includes("images.unsplash.com")) {
    return url;
  }

  let w = 1200;
  let q = 85;

  switch (size) {
    case "micro":
      w = 150;
      q = 50;
      break;
    case "thumbnail":
      w = 400;
      q = 65;
      break;
    case "medium":
      w = 800;
      q = 80;
      break;
    case "full":
    default:
      w = 1200;
      q = 85;
      break;
  }

  try {
    const urlObj = new URL(url);
    // Force WebP format for optimal compression and speed
    urlObj.searchParams.set("fm", "webp");
    urlObj.searchParams.set("w", w.toString());
    urlObj.searchParams.set("q", q.toString());
    urlObj.searchParams.set("fit", "crop");
    // Remove auto=format to guarantee WebP output
    urlObj.searchParams.delete("auto");
    
    return urlObj.toString();
  } catch (e) {
    console.error("Failed to parse and optimize image URL:", url, e);
    return url;
  }
}
