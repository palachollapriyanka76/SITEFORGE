import { Router } from "express";
import { prisma } from "@siteforge/database";
import axios from "axios";
const router = Router();
const AI_ENGINE_URL = process.env.AI_ENGINE_URL || "http://localhost:5001";
// High-quality stock photo keywords repository
const KEYWORD_IMAGES = {
    chocolate: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    velvet: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
    croissant: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    sourdough: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    bread: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
    pastry: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    cupcake: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
    paneer: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    chicken: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    pasta: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    cuisine: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    menu: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    styling: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    hair: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    bridal: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    makeup: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    color: "https://images.unsplash.com/photo-1620331702279-b7b0d2fe3576?auto=format&fit=crop&w=800&q=80",
    facial: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    spa: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80",
    beauty: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80",
    membership: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    trainer: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
    coaching: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
    workout: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    yoga: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    zumba: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    fitness: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    headphones: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    watch: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    laptop: "https://images.unsplash.com/photo-1496181130204-7552cc14ac1a?auto=format&fit=crop&w=800&q=80",
    phone: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    mobile: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    gadget: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    device: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"
};
function getUnsplashImageForProduct(name, type) {
    const cleanName = name.toLowerCase();
    for (const [key, url] of Object.entries(KEYWORD_IMAGES)) {
        if (cleanName.includes(key)) {
            return url;
        }
    }
    const cleanType = type.toLowerCase();
    if (cleanType.includes("bakery") || cleanType.includes("cake") || cleanType.includes("sweet")) {
        return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80";
    }
    if (cleanType.includes("rest") || cleanType.includes("cafe") || cleanType.includes("food") || cleanType.includes("dine")) {
        return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80";
    }
    if (cleanType.includes("salon") || cleanType.includes("spa") || cleanType.includes("hair") || cleanType.includes("beauty")) {
        return "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80";
    }
    if (cleanType.includes("elect") || cleanType.includes("phone") || cleanType.includes("shop") || cleanType.includes("gadg")) {
        return "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=800&q=80";
    }
    if (cleanType.includes("gym") || cleanType.includes("fit")) {
        return "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80";
    }
    return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
}
// Rich local industry mock generator for 5 core industries (Bakery, Restaurant, Salon, Electronics, Gym)
// Acts as the robust fallback of STEP 9 when OpenAI / AI-Engine fails or is unconfigured.
function generateMockIndustryWebsite(businessData) {
    const name = businessData.name || "My Premium Shop";
    const rawType = (businessData.type || "retail").toLowerCase();
    const location = businessData.location || "Pune, Maharashtra";
    const audience = businessData.audience || "discerning patrons";
    const brandPersonality = businessData.brandPersonality || "welcoming and modern";
    let type = "Business";
    let description = `High-quality ${rawType} services and products in ${location}.`;
    let products = [];
    let services = [];
    let gallery = [];
    let faqs = [];
    let phone = businessData.whatsappNumber || "+91 98765 43210";
    let address = `${location}, India`;
    let heroImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";
    let colorPalette = {
        primaryColor: "#4F46E5",
        secondaryColor: "#0F172A",
        accentColor: "#10B981"
    };
    const userProducts = Array.isArray(businessData.products) ? businessData.products : [];
    const userServices = Array.isArray(businessData.services) ? businessData.services : [];
    if (rawType.includes("bakery") || rawType.includes("cake") || rawType.includes("sweet")) {
        type = "Bakery & Confectionery";
        colorPalette = { primaryColor: "#78350F", secondaryColor: "#FEF3C7", accentColor: "#D97706" }; // Warm bakery tones
        heroImage = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80";
        description = `Indulge in Pune's finest fresh, handcrafted cakes, pastries, and artisanal breads baked daily at ${name}.`;
        const defaultProducts = [
            { name: "Signature Belgian Chocolate Cake", price: "Rs. 599", description: "Rich Belgian chocolate layers with silky ganache overlay." },
            { name: "Fresh Red Velvet Pastry", price: "Rs. 120", description: "Classic crimson cake slices topped with sweet cream cheese frosting." },
            { name: "Oven-Fresh Butter Croissant", price: "Rs. 99", description: "Flaky, buttery layered French pastry baked fresh every morning." }
        ];
        const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
        products = rawProds.map((p) => {
            const prodName = typeof p === "string" ? p : p.name;
            return {
                name: prodName,
                price: p.price || "Rs. 250",
                description: p.description || `Freshly baked ${prodName} made with organic butter and zero preservatives.`,
                image: getUnsplashImageForProduct(prodName, rawType)
            };
        });
        const defaultServices = [
            { name: "Bespoke Designer Cakes", description: "Beautiful custom designer cakes tailored for birthdays, weddings, and celebrations.", icon: "Sparkles" },
            { name: "Same-Day Doorstep Delivery", description: "Oven-fresh items delivered right to your home in Pune within 2 hours.", icon: "Clock" },
            { name: "Premium Party Catering", description: "Bespoke menus and large-scale pastry platters for your corporate and family events.", icon: "Heart" }
        ];
        const rawServs = userServices.length > 0 ? userServices : defaultServices;
        services = rawServs.map((s) => {
            const servName = typeof s === "string" ? s : s.name;
            return {
                name: servName,
                description: s.description || `Specialized ${servName} designed for our valued guests.`,
                icon: s.icon || "Sparkles"
            };
        });
        gallery = [
            { url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80", caption: "Our Baker's Oven" },
            { url: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=600&q=80", caption: "Handcrafted Cupcakes" },
            { url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80", caption: "Freshly Baked Breads" }
        ];
        faqs = [
            { question: "How early do I need to order custom celebration cakes?", answer: "We require at least 24 to 48 hours notice for custom designed cakes." },
            { question: "Do you offer eggless options for all bakery items?", answer: "Yes! 100% of our signature cakes, pastries, and breads can be made eggless upon request." }
        ];
    }
    else if (rawType.includes("rest") || rawType.includes("cafe") || rawType.includes("food") || rawType.includes("dine")) {
        type = "Fine Dining Restaurant";
        colorPalette = { primaryColor: "#991B1B", secondaryColor: "#1C1917", accentColor: "#FBBF24" }; // Deep red culinary
        heroImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80";
        description = `Savor authentic regional delicacies and modern culinary creations prepared by top chefs in ${location} at ${name}.`;
        const defaultProducts = [
            { name: "Paneer Tikka Masala", price: "Rs. 320", description: "Clay-oven grilled paneer cubes in rich spiced cashew tomato gravy." },
            { name: "Signature Butter Chicken", price: "Rs. 380", description: "Tender tandoori chicken shreds simmered in butter tomato velvet gravy." },
            { name: "Fragrant Dum Biryani", price: "Rs. 350", description: "Layers of premium basmati rice, aromatic spices, and traditional marinades." }
        ];
        const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
        products = rawProds.map((p) => {
            const prodName = typeof p === "string" ? p : p.name;
            return {
                name: prodName,
                price: p.price || "Rs. 299",
                description: p.description || `Exquisite, flavor-rich ${prodName} prepared fresh with local herbs.`,
                image: getUnsplashImageForProduct(prodName, rawType)
            };
        });
        const defaultServices = [
            { name: "Exquisite Dine-In Experience", description: "Elegant tables, custom ambient lighting, and stellar hospitality for private dining.", icon: "Utensils" },
            { name: "WhatsApp Express Takeaway", description: "Place orders directly via WhatsApp for swift curbside pickup or home delivery.", icon: "MessageSquare" },
            { name: "Exclusive Private Catering", description: "Bespoke live kitchen setups and curated menus for your intimate family celebrations.", icon: "Sparkles" }
        ];
        const rawServs = userServices.length > 0 ? userServices : defaultServices;
        services = rawServs.map((s) => {
            const servName = typeof s === "string" ? s : s.name;
            return {
                name: servName,
                description: s.description || `Luxury hospitality ${servName} designed for fine culinary experiences.`,
                icon: s.icon || "Utensils"
            };
        });
        gallery = [
            { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", caption: "Our Cozy Dining Room" },
            { url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80", caption: "Signature Fusion Dishes" },
            { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80", caption: "Fresh Local Ingredients" }
        ];
        faqs = [
            { question: "Do you accommodate gluten-free or vegan diets?", answer: "Yes, we feature extensive vegetarian, gluten-free, and vegan sections on our custom menus." },
            { question: "Can we book tables for private parties?", answer: "Absolutely! You can book half or all of our restaurant floor directly on WhatsApp." }
        ];
    }
    else if (rawType.includes("salon") || rawType.includes("spa") || rawType.includes("hair") || rawType.includes("beauty")) {
        type = "Luxury Hair & Beauty Salon";
        colorPalette = { primaryColor: "#EC4899", secondaryColor: "#0F172A", accentColor: "#F43F5E" }; // Elegant rose gold / charcoal
        heroImage = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80";
        description = `Pamper yourself with premium hair styling, customized botanical facials, and luxury spa therapies at ${name}.`;
        const defaultProducts = [
            { name: "Nourishing Hair Spa & Conditioning", price: "Rs. 1,200", description: "Deep hydration scalp therapy with herbal steam and deep scalp massage." },
            { name: "Premium HD Bridal Makeover", price: "Rs. 15,000", description: "Stunning professional high-definition makeup, hairstyle, and outfit draping." },
            { name: "Global Professional Hair Coloring", price: "Rs. 4,500", description: "Vibrant high-gloss ammonia-free global hair color by L'Oreal specialists." }
        ];
        const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
        products = rawProds.map((p) => {
            const prodName = typeof p === "string" ? p : p.name;
            return {
                name: prodName,
                price: p.price || "Rs. 999",
                description: p.description || `Premium nourishing ${prodName} using organic, dermatologically tested products.`,
                image: getUnsplashImageForProduct(prodName, rawType)
            };
        });
        const defaultServices = [
            { name: "Expert Creative Haircuts", description: "Stunning fashion cuts, texturing, and custom styling designed by leading artists.", icon: "Scissors" },
            { name: "Revitalizing Organic Facials", description: "Brightening and hydrating skin treatments incorporating local organic botanicals.", icon: "Sparkles" },
            { name: "Intricate Nail Styling & Extensions", description: "Durable extensions, custom gel nail art designs, and premium care.", icon: "Heart" }
        ];
        const rawServs = userServices.length > 0 ? userServices : defaultServices;
        services = rawServs.map((s) => {
            const servName = typeof s === "string" ? s : s.name;
            return {
                name: servName,
                description: s.description || `Elite styling and pampering ${servName} package.`,
                icon: s.icon || "Sparkles"
            };
        });
        gallery = [
            { url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80", caption: "Our Modern Styling Stations" },
            { url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80", caption: "Premium Skin Care Suite" },
            { url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=600&q=80", caption: "Relaxing Pedicures" }
        ];
        faqs = [
            { question: "Is booking an appointment in advance required?", answer: "We accommodate walk-ins, but strongly advise booking ahead to ensure zero wait times." },
            { question: "What cosmetic and skin brands do you use?", answer: "We exclusively utilize premium, safe brands including L'Oreal Professional, Olaplex, and Dermalogica." }
        ];
    }
    else if (rawType.includes("elect") || rawType.includes("phone") || rawType.includes("shop") || rawType.includes("gadg")) {
        type = "Premium Electronics Store";
        colorPalette = { primaryColor: "#2563EB", secondaryColor: "#1E293B", accentColor: "#38BDF8" }; // Tech cyber blue
        heroImage = "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1200&q=80";
        description = `Explore standard-setting smart appliances, high-performance computing gadgets, and accessories at Pune's favorite shop, ${name}.`;
        const defaultProducts = [
            { name: "Pro Sound Active Noise-Cancelling Headphones", price: "Rs. 8,999", description: "Hi-Res wireless hybrid active noise-cancelling overhead headphones." },
            { name: "Forge AMOLED Smart Watch", price: "Rs. 3,499", description: "Curved visual display with continuous heart rate and fitness tracker." },
            { name: "Ultra Book 14-inch Laptop", price: "Rs. 62,999", description: "Sleek all-metal chassis, 16GB RAM, and 12th Gen high-performance processor." }
        ];
        const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
        products = rawProds.map((p) => {
            const prodName = typeof p === "string" ? p : p.name;
            return {
                name: prodName,
                price: p.price || "Rs. 2,499",
                description: p.description || `Next-generation ${prodName} featuring industry-leading hardware specifications.`,
                image: getUnsplashImageForProduct(prodName, rawType)
            };
        });
        const defaultServices = [
            { name: "Authorized Brand Warranty", description: "100% genuine guaranteed items directly with full manufacturer warranty cards.", icon: "ShieldCheck" },
            { name: "Complimentary Device Setup", description: "Zero-cost data migration, premium software setups, and personalized walk-throughs.", icon: "Cpu" },
            { name: "No-Cost Easy EMIs", description: "Zero downpayment options and flexible financing with all major credit providers.", icon: "CreditCard" }
        ];
        const rawServs = userServices.length > 0 ? userServices : defaultServices;
        services = rawServs.map((s) => {
            const servName = typeof s === "string" ? s : s.name;
            return {
                name: servName,
                description: s.description || `State-of-the-art tech support and ${servName} configuration.`,
                icon: s.icon || "Cpu"
            };
        });
        gallery = [
            { url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80", caption: "Our Tech Display Counter" },
            { url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80", caption: "Smart Home Demonstrations" },
            { url: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=600&q=80", caption: "Premium Accessories Area" }
        ];
        faqs = [
            { question: "Do you offer exchange programs for old gadgets?", answer: "Yes! We run direct cash-back trade-ins for all working laptops and smartphones." },
            { question: "What is your replacement policy?", answer: "We provide an instant 7-day technical replacement for any manufactured defects." }
        ];
    }
    else {
        // DEFAULT & GYM
        type = "Elite Fitness Gym & Wellness Studio";
        colorPalette = { primaryColor: "#18181B", secondaryColor: "#F4F4F5", accentColor: "#10B981" }; // Dark zinc / neon emerald
        heroImage = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80";
        description = `Transform your mind, body, and strength with professional certified trainers and elite bodybuilding equipment at ${name}.`;
        const defaultProducts = [
            { name: "Gold Yearly Gym Access Pass", price: "Rs. 14,999", description: "All-hours unlimited access to gym floor, group cardio classes, and luxury lockers." },
            { name: "One-on-One Elite Coaching Session", price: "Rs. 4,500/mo", description: "Bespoke bodybuilding coaching, certified diet charts, and bi-weekly tracking." },
            { name: "SiteForge High-Performance Pre-workout", price: "Rs. 2,199", description: "Sustain extreme focus and pumps with premium formulated active amino acids." }
        ];
        const rawProds = userProducts.length > 0 ? userProducts : defaultProducts;
        products = rawProds.map((p) => {
            const prodName = typeof p === "string" ? p : p.name;
            return {
                name: prodName,
                price: p.price || "Rs. 1,999",
                description: p.description || `Premium fitness ${prodName} formulated for maximum physical conditioning.`,
                image: getUnsplashImageForProduct(prodName, rawType)
            };
        });
        const defaultServices = [
            { name: "Elite Strength & Conditioning", description: "Advanced mechanical resistance platforms, Olympic free weights, and performance decks.", icon: "Dumbbell" },
            { name: "Cardio, Zumba & Yoga Classes", description: "Vibrant high-energy group workouts scheduled daily under expert licensed instructors.", icon: "Smile" },
            { name: "Certified Personal Nutritionist", description: "Thorough biometric evaluations and macro meal planning tailored for your metabolism.", icon: "Heart" }
        ];
        const rawServs = userServices.length > 0 ? userServices : defaultServices;
        services = rawServs.map((s) => {
            const servName = typeof s === "string" ? s : s.name;
            return {
                name: servName,
                description: s.description || `Professional certified ${servName} program.`,
                icon: s.icon || "Dumbbell"
            };
        });
        gallery = [
            { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80", caption: "Our Gym Floor" },
            { url: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=600&q=80", caption: "Group Cycling Arena" },
            { url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80", caption: "MMA & Boxing Ring" }
        ];
        faqs = [
            { question: "Is a trial session available for newcomers?", answer: "Yes! We offer a free 3-day full-access pass. Reach out via WhatsApp to register." },
            { question: "Are shower and locker rooms provided?", answer: "Yes, we feature clean modern change rooms, electronic keypad lockers, and hot showers." }
        ];
    }
    // Override colors if specific colorTheme preference is entered by vendor
    if (businessData.colorTheme && businessData.colorTheme.startsWith("#")) {
        colorPalette.primaryColor = businessData.colorTheme;
    }
    // Assemble full base Website JSON
    return {
        meta: {
            title: `${name} | ${location}'s Finest ${type}`,
            description: `${description} Crafted specifically for ${audience} in ${location}.`,
            favicon: "✨",
            keywords: [name.toLowerCase(), type.toLowerCase(), location.toLowerCase(), "local services"]
        },
        theme: {
            primaryColor: colorPalette.primaryColor,
            secondaryColor: colorPalette.secondaryColor,
            accentColor: colorPalette.accentColor,
            fontFamily: "Outfit",
            style: "modern"
        },
        globalSettings: {
            navbarStyle: "glass",
            footerStyle: "simple",
            whatsappButton: businessData.whatsappEnabled !== undefined ? businessData.whatsappEnabled : true,
            whatsappNumber: businessData.whatsappNumber || phone
        },
        pages: [
            {
                name: "Home",
                slug: "/",
                sections: [
                    {
                        id: "sec_hero",
                        type: "hero",
                        order: 0,
                        visible: true,
                        content: {
                            title: `Crafting the Ultimate ${type} Experience at ${name}`,
                            subtitle: `Bespoke premium quality built meticulously for ${audience} seeking absolute perfection. Contact us and see what makes us local favorites.`,
                            ctaText: "Chat on WhatsApp",
                            ctaLink: phone ? `https://wa.me/${phone.replace(/\D/g, "")}` : "#contact",
                            backgroundImage: heroImage
                        },
                        styles: {},
                        animations: {}
                    },
                    {
                        id: "sec_about",
                        type: "about",
                        order: 1,
                        visible: true,
                        content: {
                            title: `Setting New Standards at ${name}`,
                            description: `At ${name}, we have combined elite craftsmanship with a ${brandPersonality} brand identity to serve ${audience} in our ${location} community. Our team is committed to standard-setting outcomes and personalized customer care.`,
                            image: gallery[0]?.url || "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
                            highlights: ["Premium Standard-Setting Quality", `Proudly Serving ${location}`, `${brandPersonality.toUpperCase()} Environment`]
                        },
                        styles: {},
                        animations: {}
                    },
                    {
                        id: "sec_services",
                        type: "services",
                        order: 2,
                        visible: true,
                        content: {
                            title: "Our Signature Services",
                            subtitle: `Discover custom professional options crafted to perfection in ${location}`,
                            services: services
                        },
                        styles: {},
                        animations: {}
                    },
                    {
                        id: "sec_products",
                        type: "products",
                        order: 3,
                        visible: true,
                        content: {
                            title: "Our Bestsellers & Showcase",
                            subtitle: "Popular items loved by the community",
                            products: products
                        },
                        styles: {},
                        animations: {}
                    },
                    {
                        id: "sec_gallery",
                        type: "gallery",
                        order: 4,
                        visible: true,
                        content: {
                            title: "Exquisite Creations & Space Gallery",
                            subtitle: "A visual peek into our dedication, craft, and premium customer smiles",
                            images: gallery
                        },
                        styles: {},
                        animations: {}
                    },
                    {
                        id: "sec_testimonials",
                        type: "testimonials",
                        order: 5,
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
                        id: "sec_faq",
                        type: "faq",
                        order: 6,
                        visible: true,
                        content: {
                            title: "Frequently Asked Questions",
                            faqs: faqs.length > 0 ? faqs : [
                                { question: `What makes ${name} different?`, answer: `We combine standard-setting ingredients, elite training, and ${brandPersonality} services to deliver absolute excellence.` }
                            ]
                        },
                        styles: {},
                        animations: {}
                    },
                    {
                        id: "sec_contact",
                        type: "contact",
                        order: 7,
                        visible: true,
                        content: {
                            title: "Connect with SiteForge Today",
                            phone: phone,
                            email: `hello@${name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com`,
                            address: address
                        },
                        styles: {},
                        animations: {}
                    },
                    {
                        id: "sec_footer",
                        type: "footer",
                        order: 8,
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
}
// Visual variations factory — creates 3 completely unique website concepts (Modern, Luxury, Minimal) with different layouts and structures
function createVariations(baseJson) {
    const modern = JSON.parse(JSON.stringify(baseJson));
    const luxury = JSON.parse(JSON.stringify(baseJson));
    const minimal = JSON.parse(JSON.stringify(baseJson));
    const baseTitle = baseJson.meta.title.split("|")[0].trim();
    const rawSections = baseJson.pages[0].sections;
    const heroSec = rawSections.find((s) => s.type === "hero");
    const aboutSec = rawSections.find((s) => s.type === "about");
    const servicesSec = rawSections.find((s) => s.type === "services");
    const productsSec = rawSections.find((s) => s.type === "products");
    const gallerySec = rawSections.find((s) => s.type === "gallery");
    const testimonialsSec = rawSections.find((s) => s.type === "testimonials");
    const faqSec = rawSections.find((s) => s.type === "faq");
    const contactSec = rawSections.find((s) => s.type === "contact");
    const footerSec = rawSections.find((s) => s.type === "footer");
    // 1. CONCEPT 1: MODERN PROFESSIONAL
    // Layout Order: hero -> about -> services -> products -> testimonials -> contact -> footer
    modern.theme = {
        primaryColor: baseJson.theme.primaryColor || "#4F46E5", // Indigo
        secondaryColor: "#0F172A", // Slate 900
        accentColor: "#10B981", // Emerald
        fontFamily: "Outfit",
        style: "modern"
    };
    if (heroSec) {
        heroSec.content.title = `Experience the Future of ${baseJson.meta.title.split("|")[1]?.trim() || "Quality Services"} at ${baseTitle}`;
        heroSec.content.subtitle = `Next-generation solutions crafted with elite professional standards and personalized customer care. Discover standard-setting innovation today.`;
        heroSec.content.ctaText = "Get Started Now";
    }
    modern.pages[0].sections = [
        { ...heroSec, order: 0 },
        { ...aboutSec, order: 1 },
        { ...servicesSec, order: 2 },
        { ...productsSec, order: 3 },
        { ...testimonialsSec, order: 4 },
        { ...contactSec, order: 5 },
        { ...footerSec, order: 6 }
    ];
    // 2. CONCEPT 2: LUXURY PREMIUM
    // Layout Order: hero -> testimonials -> products -> about -> gallery -> contact -> footer
    luxury.theme = {
        primaryColor: "#7F1D1D", // Crimson Burgundy
        secondaryColor: "#1C1917", // Stone 900
        accentColor: "#D97706", // Gold
        fontFamily: "Playfair Display",
        style: "luxury"
    };
    if (heroSec) {
        const luxHero = JSON.parse(JSON.stringify(heroSec));
        luxHero.content.title = `The Absolute Pinnacle of Fine Craftsmanship & Heritage — ${baseTitle}`;
        luxHero.content.subtitle = `Indulge in sophisticated luxury, handcrafted details, and exemplary service tailored strictly for our most discerning patrons.`;
        luxHero.content.ctaText = "Reserve Exclusive Access";
        luxury.pages[0].sections = [
            { ...luxHero, order: 0 },
            { ...testimonialsSec, order: 1 },
            { ...productsSec, order: 2 },
            { ...aboutSec, order: 3 },
            { ...gallerySec, order: 4 },
            { ...contactSec, order: 5 },
            { ...footerSec, order: 6 }
        ];
    }
    // 3. CONCEPT 3: MINIMAL CLEAN
    // Layout Order: hero -> services -> contact -> footer (Ultra high-contrast, bold, text-centric)
    minimal.theme = {
        primaryColor: "#18181B", // Zinc 900
        secondaryColor: "#F4F4F5", // Zinc 100
        accentColor: "#000000", // Black
        fontFamily: "Inter",
        style: "minimal"
    };
    if (heroSec) {
        const minHero = JSON.parse(JSON.stringify(heroSec));
        minHero.content.title = `Simply Perfect. Simply ${baseTitle}.`;
        minHero.content.subtitle = `No noise. Just pure dedication, high-quality offerings, and beautiful results.`;
        minHero.content.ctaText = "Get in Touch";
        minimal.pages[0].sections = [
            { ...minHero, order: 0 },
            { ...servicesSec, order: 1 },
            { ...contactSec, order: 2 },
            { ...footerSec, order: 3 }
        ];
    }
    return [
        {
            id: "modern",
            name: "Modern Professional",
            tagline: "Vibrant indigo theme, clean dynamic sections, and standard Outfit typography.",
            websiteJson: modern
        },
        {
            id: "luxury",
            name: "Luxury Premium",
            tagline: "Sophisticated Playfair Display serifs, deep rich crimson tones, and gold elements.",
            websiteJson: luxury
        },
        {
            id: "minimal",
            name: "Minimal Clean",
            tagline: "Ultra-spaced Inter typography, high-contrast zinc layout, and precise messaging.",
            websiteJson: minimal
        }
    ];
}
// POST /api/generate/website — Trigger generation and save to DB (Legacy, async job runner)
router.post("/website", async (req, res) => {
    try {
        const { businessData, userId, websiteId } = req.body;
        if (!businessData) {
            return res.status(400).json({ success: false, error: "Missing businessData" });
        }
        console.log("STEP 3: Generation API called (Legacy background job)");
        // Create a new AI Job in the database
        const job = await prisma.aIJob.create({
            data: {
                userId: userId || "anonymous",
                type: "GENERATE_WEBSITE",
                status: "PENDING",
                prompt: JSON.stringify(businessData),
                websiteId: websiteId || null,
            },
        });
        // Trigger AI Engine asynchronously (fire and forget)
        axios.post(`${AI_ENGINE_URL}/api/jobs/process`, {
            jobId: job.id,
            type: "GENERATE_WEBSITE",
            prompt: businessData,
        }).catch(err => console.error("Failed to trigger AI engine:", err.message));
        // Respond immediately with the job ID
        res.status(202).json({
            success: true,
            data: { jobId: job.id, websiteId: websiteId, status: "PENDING" }
        });
    }
    catch (error) {
        console.error("Failed to start website generation:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});
// POST /api/generate/website-variations — Synchronously fetch 3 distinct template variations (Modern, Luxury, Minimal)
router.post("/website-variations", async (req, res) => {
    const { businessData } = req.body;
    if (!businessData) {
        return res.status(400).json({ success: false, error: "Missing businessData" });
    }
    console.log("STEP 3: Generation API called for variations");
    console.log("STEP 4: OpenAI request started");
    try {
        // Attempt synchronous generation from AI-engine
        const response = await axios.post(`${AI_ENGINE_URL}/api/jobs/generate-sync`, {
            businessData
        }, { timeout: 35000 }); // 35 seconds timeout
        if (response.data && response.data.success) {
            console.log("STEP 5: OpenAI response received successfully");
            const baseWebsiteJson = response.data.data;
            console.log("STEP 6: Website JSON parsed from AI engine");
            const templates = createVariations(baseWebsiteJson);
            return res.json({ success: true, data: { templates } });
        }
        else {
            throw new Error("AI engine failed to process sync generation");
        }
    }
    catch (err) {
        console.warn("⚠️ AI Generation failed or timed out. Falling back to industry-specific mock templates instantly...", err.message);
        // STEP 9: Strict fallback to industry-specific templates (Bakery, Restaurant, Salon, Electronics, Gym)
        const baseFallbackJson = generateMockIndustryWebsite(businessData);
        console.log("STEP 5: Local industry fallback loaded");
        console.log("STEP 6: Local website JSON parsed");
        const templates = createVariations(baseFallbackJson);
        return res.json({ success: true, data: { templates, fallbackUsed: true } });
    }
});
// POST /api/generate/test-bakery — Direct self-contained test route to generate bakery without AI
router.post("/test-bakery", async (req, res) => {
    const { websiteId } = req.body;
    if (!websiteId) {
        return res.status(400).json({ success: false, error: "Missing websiteId" });
    }
    try {
        console.log("[Test Route] Manually generating Pune Bakery mockup...");
        const mockBakery = generateMockIndustryWebsite({
            name: "Pune Bakery Specialists",
            type: "Bakery",
            audience: "families and cake lovers",
            whatsappNumber: "+91 98765 43210"
        });
        const theme = mockBakery.theme;
        const meta = mockBakery.meta;
        const globalSettings = mockBakery.globalSettings;
        const pages = mockBakery.pages;
        await prisma.$transaction([
            prisma.website.update({
                where: { id: websiteId },
                data: {
                    description: meta.description || " Pune Bakery Shop",
                    config: { meta, theme, globalSettings }
                }
            }),
            prisma.page.deleteMany({
                where: { websiteId: websiteId }
            }),
            ...pages.map((page, index) => {
                return prisma.page.create({
                    data: {
                        websiteId: websiteId,
                        title: page.name,
                        slug: page.slug === "/" ? "home" : page.slug.replace(/^\//, ""),
                        description: page.name + " Page",
                        isHomepage: page.slug === "/" || page.slug === "home",
                        components: page.sections,
                        order: index
                    }
                });
            })
        ]);
        return res.json({ success: true, message: " Pune Bakery generated successfully in test route!" });
    }
    catch (error) {
        console.error("Test bakery creation failed:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
// GET /api/generate/status/:id — SSE progress stream
router.get("/status/:id", async (req, res) => {
    const id = req.params.id;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    res.write(`data: ${JSON.stringify({ status: "CONNECTED", message: "Analyzing..." })}\n\n`);
    let isClosed = false;
    req.on("close", () => {
        isClosed = true;
    });
    const interval = setInterval(async () => {
        if (isClosed) {
            clearInterval(interval);
            return;
        }
        try {
            const job = await prisma.aIJob.findUnique({
                where: { id },
            });
            if (!job) {
                res.write(`data: ${JSON.stringify({ status: "ERROR", message: "Job not found" })}\n\n`);
                clearInterval(interval);
                res.end();
                return;
            }
            let message = "Designing...";
            if (job.status === "COMPLETED")
                message = "Done!";
            else if (job.status === "FAILED")
                message = "Error!";
            else if (job.status === "PROCESSING") {
                message = "Writing...";
            }
            res.write(`data: ${JSON.stringify({
                status: job.status,
                message,
                result: job.status === "COMPLETED" ? job.result : null,
                error: job.error
            })}\n\n`);
            if (job.status === "COMPLETED" || job.status === "FAILED") {
                clearInterval(interval);
                res.end();
            }
        }
        catch (error) {
            console.error("SSE Poll Error:", error);
            res.write(`data: ${JSON.stringify({ status: "ERROR", message: "Internal Error" })}\n\n`);
            clearInterval(interval);
            res.end();
        }
    }, 1500);
});
export default router;
//# sourceMappingURL=generation.routes.js.map