import OpenAI from "openai";
import { WebsiteJSON, WebsiteJSONSection, WebsiteJSONPage } from "@siteforge/types";
import { buildWebsitePrompt } from "../prompts/website.prompt.js";
import { generateColorPalette } from "./color.generator.js";
import { detectCategory } from "./categoryData.js";
import { searchUnsplashImages } from "./unsplash.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
});

const VISUAL_STYLES = [
  "Minimal Modern", "Luxury Premium", "Creative Studio", "Corporate Professional",
  "Elegant Classic", "Bold Contemporary", "Dark Mode Premium", "Organic Natural",
  "Artistic Showcase", "Glassmorphism", "Neumorphism", "Magazine Layout"
];

const NAVIGATION_STYLES = ["Horizontal", "Sidebar", "Centered", "Floating", "Fullscreen"];

const HERO_STYLES = [
  "Split Screen", "Full Width", "Video Hero", "Carousel",
  "Masonry", "Product Focus", "Story Focus", "Background Image"
];

const CARD_DESIGNS = [
  "Clean flat design with thin gray borders, minimal padding, and light gray background",
  "Luxury style cards with subtle gold accent borders, serif typography, and elegant shadows",
  "Glassmorphism styling with semi-transparent backdrop blur, light white border, and subtle white glow",
  "Neumorphism cards with dual light/dark soft drop shadows producing a raised physical effect",
  "Bold contemporary block cards with thick black borders, solid primary color shadows, and high contrast",
  "Minimal borderless cards with large typography, bold headings, and premium organic spacing"
];

const FOOTER_DESIGNS = [
  "Simple clean single row with copyright text on left and social icons on right",
  "Complex three-column grid containing brand description, detailed navigation links, and full contact details",
  "Two-column minimal row with logo on left, legal links and copyright on right",
  "Artistic modern centered layout with large newsletter input box, social links, and small copyright notice"
];

const DEFAULT_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=800&q=80"
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const generateLocalMockWebsite = (businessData: any): WebsiteJSON => {
  const name = businessData.name || "My Business Shop";
  const type = businessData.type || "Retail Shop";
  const audience = businessData.audience || "valued customers";
  const productsList = businessData.products && businessData.products.length > 0 
    ? businessData.products 
    : ["Premium Product A", "Premium Product B", "Custom Services"];

  const themePreference = businessData.colorTheme || businessData.themePreference;
  const palette = generateColorPalette(themePreference, type);

  const categoryConfig = detectCategory(type);
  const visualStyle = VISUAL_STYLES[Math.floor(Math.random() * VISUAL_STYLES.length)];
  const navigationStyle = NAVIGATION_STYLES[Math.floor(Math.random() * NAVIGATION_STYLES.length)];
  const heroStyle = HERO_STYLES[Math.floor(Math.random() * HERO_STYLES.length)];
  
  const coreSections = ["about", "services", "products", "gallery", "testimonials", "faq", "contact"];
  const shuffledInBetweens = shuffleArray(coreSections);
  const sectionOrdering = ["hero", ...shuffledInBetweens, "footer"];

  // Unique local fallback images mapping
  const localImages = DEFAULT_FALLBACK_IMAGES;

  return {
    meta: {
      title: `${name} | Pune's Finest ${categoryConfig.name}`,
      description: `Welcome to ${name}. We offer high-quality ${type.toLowerCase()} specialties tailored for ${audience} in Pune, Maharashtra.`,
      favicon: "✨",
      keywords: [name.toLowerCase(), categoryConfig.name.toLowerCase(), "Pune services", "local business"]
    },
    theme: {
      primaryColor: palette.primaryColor,
      secondaryColor: palette.secondaryColor,
      accentColor: palette.accentColor,
      fontFamily: "Outfit",
      style: visualStyle.toLowerCase().replace(/[^a-z0-9]+/g, "")
    },
    globalSettings: {
      navbarStyle: navigationStyle.toLowerCase(),
      footerStyle: "complex",
      whatsappButton: businessData.whatsappEnabled !== undefined ? businessData.whatsappEnabled : true,
      whatsappNumber: businessData.whatsappNumber || null
    },
    pages: [
      {
        name: "Home",
        slug: "/",
        sections: sectionOrdering.map((sectionType, index) => {
          const id = `sec_${sectionType}_mock_${Math.random().toString(36).substring(2, 6)}`;
          let content: Record<string, any> = {};

          switch (sectionType) {
            case "hero":
              content = {
                title: `Experience the Finest ${categoryConfig.name} at ${name}`,
                subtitle: `Handcrafted premium quality tailored specifically for ${audience}. Order fresh and enjoy local delivery.`,
                ctaText: "Order on WhatsApp",
                ctaLink: businessData.whatsappNumber ? `https://wa.me/${businessData.whatsappNumber}` : "#contact",
                backgroundImage: localImages[0]
              };
              break;
            case "about":
              content = {
                title: `Our Story of Passion & Dedication`,
                description: `At ${name}, we are dedicated to setting standard-setting quality in our community. Every selection is prepared naturally, handcrafted with elite ingredients, and delivered fresh daily with maximum care.`,
                image: localImages[1],
                highlights: ["100% Premium Quality", "Local Pune Craftsmanship", "Customer-First Care"]
              };
              break;
            case "services":
              content = {
                title: `What We Offer Fresh Daily`,
                subtitle: `Signature local Pune specialties prepared daily with maximum care`,
                services: productsList.map((prod: string, idx: number) => ({
                  name: prod,
                  description: `Handcrafted ${prod} made with fresh organic ingredients and traditional techniques.`,
                  icon: idx % 3 === 0 ? "Sparkles" : idx % 3 === 1 ? "Clock" : "Heart"
                }))
              };
              break;
            case "products":
              content = {
                title: `Featured ${categoryConfig.name} Catalog`,
                subtitle: "Premium collections prepared daily",
                products: productsList.map((prod: string, idx: number) => ({
                  name: prod,
                  price: `Rs. ${(idx + 1) * 150}`,
                  description: `Finest quality ${prod} crafted with premium ingredients.`,
                  image: localImages[(2 + idx) % localImages.length]
                }))
              };
              break;
            case "gallery":
              content = {
                title: "Visual Showcase",
                subtitle: "A glimpse into our daily creations",
                images: [
                  { url: localImages[4], caption: "Freshly Made" },
                  { url: localImages[5], caption: "Handcrafted Delight" },
                  { url: localImages[6], caption: "Signature Showcase" }
                ]
              };
              break;
            case "testimonials":
              content = {
                title: "Loved by the Community",
                testimonials: [
                  { name: "Priyanka Sharma", role: "Local Guide", content: `Absolutely exceptional experience at ${name}. Their service is always professional and product quality is outstanding!`, rating: 5 },
                  { name: "Rohan Deshmukh", role: "Regular Client", content: `The absolute best in Koregaon Park. Warm staff, great pricing, and pristine cleanliness!`, rating: 5 }
                ]
              };
              break;
            case "faq":
              content = {
                title: "Frequently Asked Questions",
                faqs: [
                  { question: "What are your delivery areas in Pune?", answer: "We deliver across Pune including Koregaon Park, Kalyani Nagar, Viman Nagar, and Baner." },
                  { question: "Do you accept custom orders?", answer: "Yes! We specialize in custom party orders and corporate bookings. Contact us 24 hours in advance." }
                ]
              };
              break;
            case "contact":
              content = {
                title: "Get in Touch Today",
                phone: businessData.whatsappNumber || "+91 98765 43210",
                email: `hello@${name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com`,
                address: "Shop No. 12, Koregaon Park Plaza, Pune, Maharashtra 411001"
              };
              break;
            case "footer":
              content = {
                businessName: name,
                copyright: `© ${new Date().getFullYear()} ${name}. All Rights Reserved.`,
                links: [{ label: "Home", href: "/" }]
              };
              break;
          }

          return {
            id,
            type: sectionType as any,
            order: index,
            visible: true,
            content,
            styles: {},
            animations: {}
          };
        })
      }
    ]
  };
};

export const generateWebsite = async (businessData: any): Promise<WebsiteJSON> => {
  const type = businessData.type || businessData.category || "Retail Shop";
  const categoryConfig = detectCategory(type);

  // 1. Fetch relevant Unsplash images
  let imagePool: string[] = [];
  try {
    for (const query of categoryConfig.queries) {
      const urls = await searchUnsplashImages(query);
      if (urls && urls.length > 0) {
        imagePool = [...imagePool, ...urls];
      }
    }
  } catch (err) {
    console.error("[AI Engine] Error fetching Unsplash images:", err);
  }

  // De-duplicate and filter
  imagePool = Array.from(new Set(imagePool)).filter(url => url && url.startsWith("http"));
  if (imagePool.length < 15) {
    imagePool = [...imagePool, ...DEFAULT_FALLBACK_IMAGES];
    imagePool = Array.from(new Set(imagePool));
  }

  // 2. Pre-select randomized styles
  const visualStyle = VISUAL_STYLES[Math.floor(Math.random() * VISUAL_STYLES.length)];
  const navigationStyle = NAVIGATION_STYLES[Math.floor(Math.random() * NAVIGATION_STYLES.length)];
  const heroStyle = HERO_STYLES[Math.floor(Math.random() * HERO_STYLES.length)];
  const cardDesign = CARD_DESIGNS[Math.floor(Math.random() * CARD_DESIGNS.length)];
  const footerDesign = FOOTER_DESIGNS[Math.floor(Math.random() * FOOTER_DESIGNS.length)];

  // Randomized sections ordering (Home page must have at least 6 sections)
  const coreSections = ["about", "services", "products", "gallery", "testimonials", "faq", "contact"];
  const shuffledInBetweens = shuffleArray(coreSections);
  const sectionOrdering = ["hero", ...shuffledInBetweens, "footer"];

  const randomConfig = {
    visualStyle,
    navigationStyle,
    heroStyle,
    sectionOrdering,
    cardDesign,
    footerDesign,
    categoryName: categoryConfig.name,
    categorySections: categoryConfig.sections
  };

  const hasRealKey = process.env.OPENAI_API_KEY && 
                     !process.env.OPENAI_API_KEY.includes("placeholder") && 
                     process.env.OPENAI_API_KEY.startsWith("sk-");

  if (!hasRealKey) {
    console.warn("[AI Engine] OpenAI API Key is missing or placeholder. Running fallback mockup website generation locally...");
    return generateLocalMockWebsite(businessData);
  }

  const prompt = buildWebsitePrompt(businessData, randomConfig, imagePool);
  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      console.log(`[AI Engine] Generating website for ${businessData.name} (Attempt ${attempt + 1}/${MAX_RETRIES})`);
      
      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant that only responds in valid JSON format without markdown code blocks." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 8000,
      });

      const responseContent = completion.choices[0].message.content;
      
      if (!responseContent) {
        throw new Error("Received empty response from OpenAI");
      }

      // Clean markdown code blocks
      let cleanedContent = responseContent.trim();
      if (cleanedContent.startsWith("```json")) {
        cleanedContent = cleanedContent.replace(/^```json\n/, "").replace(/\n```$/, "");
      } else if (cleanedContent.startsWith("```")) {
        cleanedContent = cleanedContent.replace(/^```\n/, "").replace(/\n```$/, "");
      }

      let parsedJSON: any;
      try {
        parsedJSON = JSON.parse(cleanedContent);
      } catch (err: any) {
        throw new Error(`Failed to parse response content as JSON: ${err.message}`);
      }

      // 3. TOP LEVEL VALIDATION & DEFAULT FALLBACKS
      if (!parsedJSON.meta) parsedJSON.meta = {};
      parsedJSON.meta.title = parsedJSON.meta.title || `${businessData.name || "My Business"} | Premium Services`;
      parsedJSON.meta.description = parsedJSON.meta.description || `Welcome to ${businessData.name || "our website"}. We offer the highest quality services and products.`;
      parsedJSON.meta.favicon = parsedJSON.meta.favicon || "🌐";
      parsedJSON.meta.keywords = Array.isArray(parsedJSON.meta.keywords) ? parsedJSON.meta.keywords : [businessData.name || "business", "services", "products"];

      if (!parsedJSON.theme) parsedJSON.theme = {};
      parsedJSON.theme.primaryColor = parsedJSON.theme.primaryColor || "#0F172A";
      parsedJSON.theme.secondaryColor = parsedJSON.theme.secondaryColor || "#334155";
      parsedJSON.theme.accentColor = parsedJSON.theme.accentColor || "#38BDF8";
      parsedJSON.theme.fontFamily = parsedJSON.theme.fontFamily || "Inter";
      parsedJSON.theme.style = parsedJSON.theme.style || visualStyle.toLowerCase().replace(/[^a-z0-9]+/g, "");

      if (!parsedJSON.globalSettings) parsedJSON.globalSettings = {};
      parsedJSON.globalSettings.navbarStyle = parsedJSON.globalSettings.navbarStyle || navigationStyle.toLowerCase();
      parsedJSON.globalSettings.footerStyle = parsedJSON.globalSettings.footerStyle || "complex";
      parsedJSON.globalSettings.whatsappButton = parsedJSON.globalSettings.whatsappButton !== undefined ? parsedJSON.globalSettings.whatsappButton : true;
      parsedJSON.globalSettings.whatsappNumber = parsedJSON.globalSettings.whatsappNumber || businessData.whatsappNumber || null;

      // 4. PAGES & SECTIONS VALIDATION
      if (!parsedJSON.pages || !Array.isArray(parsedJSON.pages) || parsedJSON.pages.length === 0) {
        parsedJSON.pages = [{ name: "Home", slug: "/", sections: [] }];
      }

      const usedIds = new Set<string>();
      let sectionCounter = 1;

      // Image uniqueness registry to detect duplicates
      const assignedImages = new Set<string>();
      let poolIndex = 0;

      parsedJSON.pages.forEach((page: any, pIndex: number) => {
        if (!page.name) page.name = pIndex === 0 ? "Home" : `Page ${pIndex + 1}`;
        if (!page.slug) page.slug = pIndex === 0 ? "/" : `/${page.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        
        // Enforce the pre-selected section order on the Home Page
        if (pIndex === 0 && (!page.sections || page.sections.length === 0)) {
          // If sections missing, generate them
          page.sections = sectionOrdering.map((st, i) => ({ type: st, order: i }));
        }

        page.sections.forEach((section: any, sIndex: number) => {
          section.order = typeof section.order === "number" ? section.order : sIndex;
          section.visible = section.visible !== undefined ? section.visible : true;
          section.styles = section.styles || {};
          section.animations = section.animations || {};
          
          if (!section.id || usedIds.has(section.id)) {
            section.id = `sec_${section.type || "comp"}_${sectionCounter++}_${Math.random().toString(36).substring(2, 5)}`;
          }
          usedIds.add(section.id);

          if (!section.content || typeof section.content !== "object") {
            section.content = {};
          }

          // Enforce unique images from the category imagePool
          const getUniqueImage = (): string => {
            while (poolIndex < imagePool.length) {
              const candidate = imagePool[poolIndex++];
              if (!assignedImages.has(candidate)) {
                assignedImages.add(candidate);
                return candidate;
              }
            }
            // Fallback if pool is exhausted: generate cache-busting Unsplash parameter
            const fallback = `https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&h=800&q=80&sig=${Math.floor(Math.random() * 100000)}`;
            assignedImages.add(fallback);
            return fallback;
          };

          // Sanitize & replace duplicates/empty images
          switch (section.type) {
            case "hero":
              section.content.title = section.content.title || `Welcome to ${businessData.name || "Our Shop"}`;
              section.content.subtitle = section.content.subtitle || `Serving the best products and experiences in town.`;
              section.content.ctaText = section.content.ctaText || "Learn More";
              section.content.ctaLink = section.content.ctaLink || "#about";
              
              if (!section.content.backgroundImage || assignedImages.has(section.content.backgroundImage)) {
                section.content.backgroundImage = getUniqueImage();
              } else {
                assignedImages.add(section.content.backgroundImage);
              }
              break;

            case "about":
              section.content.title = section.content.title || "Our Journey & Story";
              section.content.description = section.content.description || `Dedicated to excellence since our establishment, we work tirelessly to create beautiful products and premium customer care.`;
              
              if (!section.content.image || assignedImages.has(section.content.image)) {
                section.content.image = getUniqueImage();
              } else {
                assignedImages.add(section.content.image);
              }
              section.content.highlights = Array.isArray(section.content.highlights) ? section.content.highlights : ["Premium Quality", "Customer First", "Handcrafted Craftsmanship"];
              break;

            case "services":
              section.content.title = section.content.title || "Our Signature Services";
              section.content.subtitle = section.content.subtitle || "Premium services designed specifically for you";
              section.content.services = Array.isArray(section.content.services) ? section.content.services : [
                { name: "Premium Consultation", description: "Get direct support from industry experts tailored to your goals.", icon: "Sparkles" },
                { name: "Fast & Reliable Delivery", description: "Get items delivered straight to your doorstep on demand.", icon: "Clock" }
              ];
              break;

            case "products":
              section.content.title = section.content.title || "Our Bestsellers";
              section.content.subtitle = section.content.subtitle || "Popular choices you'll fall in love with";
              
              if (Array.isArray(section.content.products)) {
                section.content.products.forEach((prod: any) => {
                  if (!prod.image || assignedImages.has(prod.image)) {
                    prod.image = getUniqueImage();
                  } else {
                    assignedImages.add(prod.image);
                  }
                });
              } else {
                section.content.products = [
                  { 
                    name: "Signature Item", 
                    price: "Rs. 499", 
                    description: "Crafted meticulously with premium local ingredients.", 
                    image: getUniqueImage() 
                  }
                ];
              }
              break;

            case "gallery":
              section.content.title = section.content.title || "Moments & Creations";
              if (Array.isArray(section.content.images)) {
                section.content.images.forEach((img: any) => {
                  if (!img.url || assignedImages.has(img.url)) {
                    img.url = getUniqueImage();
                  } else {
                    assignedImages.add(img.url);
                  }
                });
              } else {
                section.content.images = [
                  { url: getUniqueImage(), caption: "Premium Quality" },
                  { url: getUniqueImage(), caption: "Artisan Craft" }
                ];
              }
              break;

            case "testimonials":
              section.content.title = section.content.title || "What Our Clients Say";
              section.content.testimonials = Array.isArray(section.content.testimonials) ? section.content.testimonials : [
                { name: "Aarav Mehta", role: "Loyal Customer", content: "Absolutely wonderful experience. Extremely professional staff and exceptional results!", rating: 5 }
              ];
              break;

            case "faq":
              section.content.title = section.content.title || "Frequently Asked Questions";
              section.content.faqs = Array.isArray(section.content.faqs) ? section.content.faqs : [
                { question: "What are your operating hours?", answer: "We are open from 9:00 AM to 8:00 PM, Monday through Saturday." }
              ];
              break;

            case "contact":
              section.content.title = section.content.title || "Get in Touch Today";
              section.content.phone = section.content.phone || businessData.whatsappNumber || "+91 98765 43210";
              section.content.email = section.content.email || "hello@business.com";
              section.content.address = section.content.address || "Pune, Maharashtra, India";
              break;

            case "footer":
              section.content.businessName = section.content.businessName || businessData.name || "My Business";
              section.content.copyright = section.content.copyright || `© ${new Date().getFullYear()} ${businessData.name || "My Business"}. All Rights Reserved.`;
              section.content.links = Array.isArray(section.content.links) ? section.content.links : [
                { label: "Home", href: "/" }
              ];
              break;
          }
        });
      });

      // Color Palette updates based on businessType or chosen visualStyle
      if (businessData.colorTheme || businessData.themePreference) {
        const palette = generateColorPalette(businessData.colorTheme || businessData.themePreference, type);
        parsedJSON.theme.primaryColor = palette.primaryColor;
        parsedJSON.theme.secondaryColor = palette.secondaryColor;
        parsedJSON.theme.accentColor = palette.accentColor;
      }

      return parsedJSON as WebsiteJSON;

    } catch (error) {
      console.error(`[AI Engine] Attempt ${attempt + 1} failed:`, error);
      attempt++;
      if (attempt >= MAX_RETRIES) {
        throw new Error(`Failed to generate valid website JSON after ${MAX_RETRIES} attempts. Error: ${error instanceof Error ? error.message : "Unknown"}`);
      }
    }
  }
  
  throw new Error("Unexpected error in generateWebsite");
};
