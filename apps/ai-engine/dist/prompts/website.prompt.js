export const buildWebsitePrompt = (businessData, randomConfig, imagePool) => {
    return `You are the world's most advanced AI website designer inside SITEFORGE.
Your task is to generate a completely unique, production-ready website configuration as a valid JSON object.

Business Context:
${JSON.stringify(businessData, null, 2)}

=========================================
PRE-SELECTED DESIGN LAYOUT & STYLES (YOU MUST STRICTOR ADHERE TO THIS CONFIGURATION):
=========================================
- Business Category Detected: ${randomConfig.categoryName}
- Visual Design Style: ${randomConfig.visualStyle}
- Navigation Layout Style: ${randomConfig.navigationStyle}
- Hero Layout Style: ${randomConfig.heroStyle}
- Section Ordering (Page Layout): ${randomConfig.sectionOrdering.join(" -> ")}
- Card Design Style: ${randomConfig.cardDesign}
- Footer Design Layout: ${randomConfig.footerDesign}
- Category-Specific Sections to highlight: ${randomConfig.categorySections.join(", ")}

=========================================
CRITICAL IMAGE RELEVANCE & DIVERSITY SYSTEM RULES:
=========================================
1. Every single image URL used in the website MUST directly represent the business and category.
2. Here is a pool of HIGH-QUALITY, VERIFIED UNSPLASH IMAGES matching your business category:
${imagePool.map((url, idx) => `[Image ${idx + 1}]: ${url}`).join("\n")}

3. IMAGE UNIQUE-DIVERSITY RULE:
   - Absolutely NEVER reuse the same image URL twice anywhere in the JSON configuration.
   - Use a completely unique image URL from the pool above for the Hero background, About section, each individual product/service in the list, and all items in the gallery.
   - If the pool contains fewer images than needed, ensure you extract and use unique Unsplash image URLs of high-quality matching the category. Never repeat image URLs.

=========================================
CRITICAL INSTRUCTIONS & RULES:
=========================================
1. STRUCTURAL VARIATION:
   - Make this website feel purpose-built and uniquely designed by a professional agency, distinct from standard generic layouts.
   - Structure copy, descriptions, and taglines specifically reflecting the category "${randomConfig.categoryName}".
   
2. ANTI-PLACEHOLDER RULE:
   - Never use placeholder text like "Lorem Ipsum", "Coming soon", "Insert description here", or dummy content.
   - All text, headers, subtitles, services, products, FAQs, and testimonials must be written in full, premium, and highly specific to the business name "${businessData.name || "My Business"}".
   - Price products or services in INR/Rs. since this is an Indian small business target.

3. PAGE & SECTION REQUIREMENTS:
   - Create exactly 3 pages: Home (slug: "/"), About (slug: "/about"), and Services/Products (slug: "/services").
   - The Home page must have at least 6 sections: ${randomConfig.sectionOrdering.filter(s => s !== "footer").join(", ")}.
   - A footer section must be appended at the end of each page.
   
4. UNIQUE IDs:
   - Every single section must have a unique, stable, random string ID (e.g. "sec_hero_8f2", "sec_about_3a7").

=========================================
JSON SCHEMA (STRICTLY COMPLY WITH THIS):
=========================================
Your output must be a single, raw, valid JSON object that exactly matches the following structure:

{
  "meta": {
    "title": "Optimized SEO title reflecting the category and location",
    "description": "Engaging search engine meta description snippet",
    "favicon": "A single appropriate emoji",
    "keywords": ["5-8 relevant search terms"]
  },
  "theme": {
    "primaryColor": "A tailored hex code fitting the theme style",
    "secondaryColor": "Complementary hex code",
    "accentColor": "Energetic accent hex code",
    "fontFamily": "Beautiful modern font (e.g., 'Inter', 'Outfit', 'Playfair Display', 'Poppins', 'Montserrat', 'Merriweather')",
    "style": "${randomConfig.visualStyle.toLowerCase().replace(/[^a-z0-9]+/g, "")}"
  },
  "pages": [
    {
      "name": "Home",
      "slug": "/",
      "sections": [
        // Generate sections in this exact order: ${randomConfig.sectionOrdering.join(", ")}
        // Content structure varies by section type:
        // E.g. for "hero": { "title": string, "subtitle": string, "ctaText": string, "ctaLink": string, "backgroundImage": string (Unique image from pool) }
        // E.g. for "about": { "title": string, "description": string, "image": string (Unique image from pool), "highlights": string[] }
        // E.g. for "services": { "title": string, "subtitle": string, "services": Array<{ "name": string, "description": string, "icon": string }> }
        // E.g. for "products": { "title": string, "subtitle": string, "products": Array<{ "name": string, "price": string, "description": string, "image": string (Unique image from pool) }> }
        // E.g. for "gallery": { "title": string, "images": Array<{ "url": string (Unique image from pool), "caption": string }> }
        // E.g. for "testimonials": { "title": string, "testimonials": Array<{ "name": string, "role": string, "content": string, "rating": number }> }
        // E.g. for "faq": { "title": string, "faqs": Array<{ "question": string, "answer": string }> }
        // E.g. for "contact": { "title": string, "phone": string, "email": string, "address": string }
        // E.g. for "footer": { "businessName": string, "copyright": string, "links": Array<{ "label": string, "href": string }> }
      ]
    }
  ],
  "globalSettings": {
    "navbarStyle": "${randomConfig.navigationStyle.toLowerCase()}",
    "footerStyle": "complex",
    "whatsappButton": true,
    "whatsappNumber": "${businessData.whatsappNumber || "+919876543210"}"
  }
}

You must return ONLY the raw JSON object. Do not include markdown code block syntax around the JSON. Check that every bracket matches. Ready? Let's generate a masterpiece!`;
};
//# sourceMappingURL=website.prompt.js.map