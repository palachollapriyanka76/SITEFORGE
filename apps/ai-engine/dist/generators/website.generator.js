import OpenAI from "openai";
import { buildWebsitePrompt } from "../prompts/website.prompt.js";
import { generateColorPalette } from "./color.generator.js";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "sk-placeholder",
});
export const generateLocalMockWebsite = (businessData) => {
    const name = businessData.name || "My Business Shop";
    const type = businessData.type || "Retail Shop";
    const audience = businessData.audience || "valued customers";
    const productsList = businessData.products && businessData.products.length > 0
        ? businessData.products
        : ["Premium Product A", "Premium Product B", "Custom Services"];
    const themePreference = businessData.colorTheme || businessData.themePreference;
    const palette = generateColorPalette(themePreference, type);
    return {
        meta: {
            title: `${name} | Pune's Finest ${type}`,
            description: `Welcome to ${name}. We offer high-quality ${type.toLowerCase()} specialties tailored for ${audience} in Pune, Maharashtra.`,
            favicon: "✨",
            keywords: [name.toLowerCase(), type.toLowerCase(), "Pune services", "local business"]
        },
        theme: {
            primaryColor: palette.primaryColor,
            secondaryColor: palette.secondaryColor,
            accentColor: palette.accentColor,
            fontFamily: "Outfit",
            style: businessData.style || "modern"
        },
        globalSettings: {
            navbarStyle: "glass",
            footerStyle: "simple",
            whatsappButton: businessData.whatsappEnabled !== undefined ? businessData.whatsappEnabled : true,
            whatsappNumber: businessData.whatsappNumber || null
        },
        pages: [
            {
                name: "Home",
                slug: "/",
                sections: [
                    {
                        id: "sec_hero_mock",
                        type: "hero",
                        order: 0,
                        visible: true,
                        content: {
                            title: `Experience the Finest ${type} at ${name}`,
                            subtitle: `Handcrafted premium quality tailored specifically for ${audience}. Order fresh and enjoy local delivery.`,
                            ctaText: "Order on WhatsApp",
                            ctaLink: businessData.whatsappNumber ? `https://wa.me/${businessData.whatsappNumber}` : "#contact",
                            backgroundImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                        },
                        styles: {},
                        animations: {}
                    },
                    {
                        id: "sec_about_mock",
                        type: "about",
                        order: 1,
                        visible: true,
                        content: {
                            title: "Our Story of Passion",
                            description: `At ${name}, we are dedicated to setting standard-setting quality in our community. Every selection is prepared naturally, handcrafted with elite ingredients, and delivered fresh daily with maximum care.`,
                            image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
                            highlights: ["100% Premium Quality", "Local Pune Craftsmanship", "Customer-First Care"]
                        },
                        styles: {},
                        animations: {}
                    },
                    {
                        id: "sec_services_mock",
                        type: "services",
                        order: 2,
                        visible: true,
                        content: {
                            title: "What We Offer Fresh Daily",
                            subtitle: "Signature local Pune specialties prepared daily with maximum care",
                            services: productsList.map((prod, idx) => ({
                                name: prod,
                                description: `Handcrafted ${prod} made with fresh organic ingredients and traditional techniques.`,
                                icon: idx % 3 === 0 ? "Sparkles" : idx % 3 === 1 ? "Clock" : "Heart"
                            }))
                        },
                        styles: {},
                        animations: {}
                    },
                    {
                        id: "sec_testimonials_mock",
                        type: "testimonials",
                        order: 3,
                        visible: true,
                        content: {
                            title: "Loved by the Community",
                            testimonials: [
                                { name: "Priyanka Sharma", role: "Local Guide", content: `Absolutely exceptional experience at ${name}. Their service is always professional and product quality is outstanding!`, rating: 5 },
                                { name: "Rohan Deshmukh", role: "Regular Client", content: `The absolute best in Koregaon Park. Warm staff, great pricing, and pristine cleanliness!`, rating: 5 }
                            ]
                        },
                        styles: {},
                        animations: {}
                    },
                    {
                        id: "sec_faq_mock",
                        type: "faq",
                        order: 4,
                        visible: true,
                        content: {
                            title: "Frequently Asked Questions",
                            faqs: [
                                { question: "What are your delivery areas in Pune?", answer: "We deliver across Pune including Koregaon Park, Kalyani Nagar, Viman Nagar, and Baner." },
                                { question: "Do you accept custom orders?", answer: "Yes! We specialize in custom party orders and corporate bookings. Contact us 24 hours in advance." }
                            ]
                        },
                        styles: {},
                        animations: {}
                    },
                    {
                        id: "sec_contact_mock",
                        type: "contact",
                        order: 5,
                        visible: true,
                        content: {
                            title: "Get in Touch Today",
                            phone: businessData.whatsappNumber || "+91 98765 43210",
                            email: `hello@${name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com`,
                            address: "Shop No. 12, Koregaon Park Plaza, Pune, Maharashtra 411001"
                        },
                        styles: {},
                        animations: {}
                    },
                    {
                        id: "sec_footer_mock",
                        type: "footer",
                        order: 6,
                        visible: true,
                        content: {
                            businessName: name,
                            copyright: `© ${new Date().getFullYear()} ${name}. All Rights Reserved.`,
                            links: [{ label: "Home", href: "/" }]
                        },
                        styles: {},
                        animations: {}
                    }
                ]
            }
        ]
    };
};
export const generateWebsite = async (businessData) => {
    const hasRealKey = process.env.OPENAI_API_KEY &&
        !process.env.OPENAI_API_KEY.includes("placeholder") &&
        process.env.OPENAI_API_KEY.startsWith("sk-");
    if (!hasRealKey) {
        console.warn("[AI Engine] OpenAI API Key is missing or placeholder. Running fallback mockup website generation locally...");
        return generateLocalMockWebsite(businessData);
    }
    const prompt = buildWebsitePrompt(businessData);
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
            // Clean markdown if OpenAI accidentally included it despite instructions
            let cleanedContent = responseContent.trim();
            if (cleanedContent.startsWith("```json")) {
                cleanedContent = cleanedContent.replace(/^```json\n/, "").replace(/\n```$/, "");
            }
            else if (cleanedContent.startsWith("```")) {
                cleanedContent = cleanedContent.replace(/^```\n/, "").replace(/\n```$/, "");
            }
            let parsedJSON;
            try {
                parsedJSON = JSON.parse(cleanedContent);
            }
            catch (err) {
                throw new Error(`Failed to parse response content as JSON: ${err.message}`);
            }
            // 1. TOP LEVEL VALIDATION & DEFAULT FALLBACKS
            if (!parsedJSON.meta)
                parsedJSON.meta = {};
            parsedJSON.meta.title = parsedJSON.meta.title || `${businessData.name || "My Business"} | Premium Services`;
            parsedJSON.meta.description = parsedJSON.meta.description || `Welcome to ${businessData.name || "our website"}. We offer the highest quality services and products.`;
            parsedJSON.meta.favicon = parsedJSON.meta.favicon || "🌐";
            parsedJSON.meta.keywords = Array.isArray(parsedJSON.meta.keywords) ? parsedJSON.meta.keywords : [businessData.name || "business", "services", "products"];
            if (!parsedJSON.theme)
                parsedJSON.theme = {};
            parsedJSON.theme.primaryColor = parsedJSON.theme.primaryColor || "#0F172A";
            parsedJSON.theme.secondaryColor = parsedJSON.theme.secondaryColor || "#334155";
            parsedJSON.theme.accentColor = parsedJSON.theme.accentColor || "#38BDF8";
            parsedJSON.theme.fontFamily = parsedJSON.theme.fontFamily || "Inter";
            parsedJSON.theme.style = parsedJSON.theme.style || "modern";
            if (!parsedJSON.globalSettings)
                parsedJSON.globalSettings = {};
            parsedJSON.globalSettings.navbarStyle = parsedJSON.globalSettings.navbarStyle || "glass";
            parsedJSON.globalSettings.footerStyle = parsedJSON.globalSettings.footerStyle || "simple";
            parsedJSON.globalSettings.whatsappButton = parsedJSON.globalSettings.whatsappButton !== undefined ? parsedJSON.globalSettings.whatsappButton : true;
            parsedJSON.globalSettings.whatsappNumber = parsedJSON.globalSettings.whatsappNumber || businessData.whatsappNumber || null;
            // 2. PAGES VALIDATION
            if (!parsedJSON.pages || !Array.isArray(parsedJSON.pages) || parsedJSON.pages.length === 0) {
                // Fallback: Generate home page
                parsedJSON.pages = [
                    {
                        name: "Home",
                        slug: "/",
                        sections: []
                    }
                ];
            }
            // 3. SECTION VALIDATION, ID DE-DUPLICATION, & ORDERING
            const usedIds = new Set();
            let sectionCounter = 1;
            parsedJSON.pages.forEach((page, pIndex) => {
                if (!page.name)
                    page.name = pIndex === 0 ? "Home" : `Page ${pIndex + 1}`;
                if (!page.slug)
                    page.slug = pIndex === 0 ? "/" : `/${page.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
                if (!page.sections || !Array.isArray(page.sections) || page.sections.length === 0) {
                    // Generate default sections for a home page as fallback
                    page.sections = [
                        {
                            id: `sec_fallback_hero_${Math.random().toString(36).substring(2, 5)}`,
                            type: "hero",
                            order: 0,
                            visible: true,
                            content: {
                                title: `Welcome to ${businessData.name || "Our Business"}`,
                                subtitle: `High-quality ${businessData.type || "services"} tailored to your exact needs.`,
                                ctaText: "Get in Touch",
                                ctaLink: "#contact",
                                backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                            },
                            styles: {},
                            animations: {}
                        },
                        {
                            id: `sec_fallback_about_${Math.random().toString(36).substring(2, 5)}`,
                            type: "about",
                            order: 1,
                            visible: true,
                            content: {
                                title: "About Us",
                                description: `We are proud to serve our community with standard-setting dedication and craftsmanship. Our focus is delivering top tier quality.`,
                                image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
                                highlights: ["High Quality", "Professional Staff", "Customer First"]
                            },
                            styles: {},
                            animations: {}
                        },
                        {
                            id: `sec_fallback_contact_${Math.random().toString(36).substring(2, 5)}`,
                            type: "contact",
                            order: 2,
                            visible: true,
                            content: {
                                title: "Contact Us",
                                phone: businessData.whatsappNumber || "+91 99999 99999",
                                email: "info@business.com",
                                address: "Pune, Maharashtra, India"
                            },
                            styles: {},
                            animations: {}
                        },
                        {
                            id: `sec_fallback_footer_${Math.random().toString(36).substring(2, 5)}`,
                            type: "footer",
                            order: 3,
                            visible: true,
                            content: {
                                businessName: businessData.name || "Our Business",
                                copyright: `© ${new Date().getFullYear()} ${businessData.name || "Our Business"}. All Rights Reserved.`,
                                links: [{ label: "Home", href: "/" }]
                            },
                            styles: {},
                            animations: {}
                        }
                    ];
                }
                page.sections.forEach((section, sIndex) => {
                    // Verify required fields
                    section.order = typeof section.order === "number" ? section.order : sIndex;
                    section.visible = section.visible !== undefined ? section.visible : true;
                    section.styles = section.styles || {};
                    section.animations = section.animations || {};
                    // Fix or generate ID
                    if (!section.id || usedIds.has(section.id)) {
                        section.id = `sec_${section.type || "comp"}_${sectionCounter++}_${Math.random().toString(36).substring(2, 5)}`;
                    }
                    usedIds.add(section.id);
                    // Standardize section type
                    const allowedTypes = ["hero", "about", "services", "products", "gallery", "testimonials", "faq", "contact", "footer"];
                    if (!section.type || !allowedTypes.includes(section.type)) {
                        section.type = "about"; // Safe fallback
                    }
                    // Verify or generate standard content based on section type
                    if (!section.content || typeof section.content !== "object") {
                        section.content = {};
                    }
                    switch (section.type) {
                        case "hero":
                            section.content.title = section.content.title || `Welcome to ${businessData.name || "Our Shop"}`;
                            section.content.subtitle = section.content.subtitle || `Serving the best products and experiences in town.`;
                            section.content.ctaText = section.content.ctaText || "Learn More";
                            section.content.ctaLink = section.content.ctaLink || "#about";
                            section.content.backgroundImage = section.content.backgroundImage || "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80";
                            break;
                        case "about":
                            section.content.title = section.content.title || "Our Journey & Story";
                            section.content.description = section.content.description || `Dedicated to excellence since our establishment, we work tirelessly to create beautiful products and premium customer care.`;
                            section.content.image = section.content.image || "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80";
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
                            section.content.products = Array.isArray(section.content.products) ? section.content.products : [
                                { name: "Signature Collection Item", price: "Rs. 499", description: "Crafted meticulously with premium local ingredients.", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80" }
                            ];
                            break;
                        case "gallery":
                            section.content.title = section.content.title || "Moments & Creations";
                            section.content.images = Array.isArray(section.content.images) ? section.content.images : [
                                { url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", caption: "Premium Quality" }
                            ];
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
            // Override colors if preference is provided in business data, otherwise rely on AI or color generator
            if (businessData.colorTheme || businessData.themePreference) {
                const palette = generateColorPalette(businessData.colorTheme || businessData.themePreference, businessData.type || "");
                parsedJSON.theme.primaryColor = palette.primaryColor;
                parsedJSON.theme.secondaryColor = palette.secondaryColor;
                parsedJSON.theme.accentColor = palette.accentColor;
            }
            const validatedJSON = parsedJSON;
            return validatedJSON;
        }
        catch (error) {
            console.error(`[AI Engine] Attempt ${attempt + 1} failed:`, error);
            attempt++;
            if (attempt >= MAX_RETRIES) {
                throw new Error(`Failed to generate valid website JSON after ${MAX_RETRIES} attempts. Error: ${error instanceof Error ? error.message : "Unknown"}`);
            }
        }
    }
    throw new Error("Unexpected error in generateWebsite");
};
//# sourceMappingURL=website.generator.js.map