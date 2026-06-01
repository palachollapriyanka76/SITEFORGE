export const buildWebsitePrompt = (businessData) => {
    return `You are an expert web designer and copywriter.
Your task is to generate a complete website structure and content based on the user's business data.

Business Context:
${JSON.stringify(businessData, null, 2)}

=========================================
CRITICAL INSTRUCTIONS & RULES:
=========================================
1. INDUSTRY-SPECIFIC COPYWRITING:
   Customize the voice, tone, and copywriting style precisely for the business type:
   - "Bakery" or "Cafe" or "Restaurant": Warm, appetizing, fresh, inviting, family-friendly. Mention sensory words like aroma, handcrafted, buttery, freshly-brewed.
   - "Salon" or "Spa": Elegant, pampering, luxurious, relaxing. Focus on self-care, premium products, and expert stylists.
   - "Gym" or "Fitness Center": Energetic, motivating, intense, goal-oriented. Highlight strength, transformation, expert trainers, and state-of-the-art equipment.
   - "Clinic" or "Dental": Professional, reassuring, clean, trustworthy. Focus on patient care, expert doctors, gentle treatments, and modern technology.
   - "Boutique" or "Fashion": Trendy, sophisticated, stylish, artistic. Focus on premium fabrics, unique designs, and curated collections.
   - "Consulting" or "Finance": Authoritative, strategic, professional, data-driven. Focus on growth, expertise, trust, and proven results.
   - "Real Estate": Elite, premium, aspirational. Focus on dream homes, perfect locations, and seamless investments.
   - "Plumbing" or "Electrician" or "Local Services": Reliable, fast, expert, transparent. Focus on 24/7 availability, certified pros, and satisfaction guarantees.
   - "Pet Grooming" or "Pet Care": Playful, affectionate, loving, trustworthy. Focus on safety, happy pets, and expert handlers.
   - For any other business type: Align copywriting to represent their unique value proposition.

2. ANTI-PLACEHOLDER RULE:
   - Absolutely NEVER use placeholder text like "Lorem Ipsum", "Coming soon", "Insert description here", or dummy content.
   - All titles, descriptions, buttons, items, services, products, testimonials, and FAQs must be fully written, premium, and highly specific to this exact business name and business type.
   - If products or services were provided in the business context, flesh them out with beautiful, sensory descriptions and realistic pricing (in INR/Rs. since it's an Indian small business target).
   - If products or services were not provided, generate 4-6 realistic, high-quality products/services for their business type.

3. PAGE & SECTION REQUIREMENTS:
   - Create exactly 3 pages: Home (slug: "/"), About (slug: "/about"), and Services/Products (slug: "/services").
   - The Home page must have at least 6 sections: hero, about, services, testimonials, faq, contact.
   - The About page must have at least 4 sections: hero, about, testimonials, contact.
   - The Services/Products page must have at least 5 sections: hero, products, gallery, faq, contact.
   - Ensure the Contact page/section uses the actual phone number, email, and address provided in the business context. If not provided, generate professional details (e.g. hello@businessname.com, +91 98765 43210, Pune, Maharashtra).
   - A footer section must be appended at the end of each page.

4. UNIQUE IDs:
   - Every single section must have a unique, stable, random string ID (e.g. "sec_hero_8f2", "sec_about_3a7").

5. IMAGE RESOURCE GUIDELINES:
   - For image URLs, use high-quality Unsplash source URLs that fit the business category. Examples:
     - Bakery: https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80
     - Salon: https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80
     - Gym: https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80
     - Restaurant: https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80
     - General Tech/Office: https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80

=========================================
JSON SCHEMA (STRICTLY COMPLY WITH THIS):
=========================================
Your output must be a single, raw, valid JSON object that exactly matches the following TypeScript interface structure:

interface WebsiteJSON {
  meta: {
    title: string;          // Highly optimized SEO title, e.g., "Sweet Blossom Bakery | Handcrafted Cakes & Pastries in Pune"
    description: string;    // Engaging search engine snippet
    favicon: string;        // An appropriate single emoji (e.g., "🧁")
    keywords: string[];     // Array of 5-8 relevant search terms
  };
  theme: {
    primaryColor: string;   // Tailored Tailwind/CSS Hex (e.g. "#8B4513" for bakery, "#2563EB" for tech)
    secondaryColor: string; // Complementary Hex
    accentColor: string;    // Energetic accent Hex (e.g. "#FBBF24")
    fontFamily: string;     // Beautiful modern font (e.g., 'Inter', 'Outfit', 'Playfair Display', 'Poppins', 'Montserrat')
    style: string;          // One of: "modern", "playful", "corporate", "elegant", "bold"
  };
  pages: {
    name: string;           // E.g. "Home", "About Us", "Our Services"
    slug: string;           // E.g. "/", "/about", "/services"
    sections: {
      id: string;           // Stable unique ID
      type: "hero" | "about" | "services" | "products" | "gallery" | "testimonials" | "faq" | "contact" | "footer";
      order: number;        // Sequential integer starting from 0
      visible: boolean;     // true
      content: {
        // CONTENT STRUCTURE VARIES BY SECTION TYPE:
        
        // E.g. for "hero":
        // {
        //   "title": string,
        //   "subtitle": string,
        //   "ctaText": string,
        //   "ctaLink": string,
        //   "backgroundImage": string (Unsplash URL)
        // }
        
        // E.g. for "about":
        // {
        //   "title": string,
        //   "description": string,
        //   "image": string,
        //   "highlights": string[]
        // }
        
        // E.g. for "services":
        // {
        //   "title": string,
        //   "subtitle": string,
        //   "services": Array<{ "name": string, "description": string, "icon": string (Lucide icon name like "Sparkles", "Coffee", "Heart", "Clock", "Shield") }>
        // }
        
        // E.g. for "products":
        // {
        //   "title": string,
        //   "subtitle": string,
        //   "products": Array<{ "name": string, "price": string (e.g. "Rs. 250"), "description": string, "image": string }>
        // }
        
        // E.g. for "gallery":
        // {
        //   "title": string,
        //   "images": Array<{ "url": string, "caption": string }>
        // }
        
        // E.g. for "testimonials":
        // {
        //   "title": string,
        //   "testimonials": Array<{ "name": string, "role": string, "content": string, "rating": number }>
        // }
        
        // E.g. for "faq":
        // {
        //   "title": string,
        //   "faqs": Array<{ "question": string, "answer": string }>
        // }
        
        // E.g. for "contact":
        // {
        //   "title": string,
        //   "phone": string,
        //   "email": string,
        //   "address": string,
        //   "mapEmbedUrl"?: string
        // }
        
        // E.g. for "footer":
        // {
        //   "businessName": string,
        //   "copyright": string,
        //   "links": Array<{ "label": string, "href": string }>
        // }
      };
      styles: Record<string, any>;     // Leave as empty object {}
      animations: Record<string, any>; // Leave as empty object {}
    }[];
  }[];
  globalSettings: {
    navbarStyle: string;     // "transparent" or "solid" or "glass"
    footerStyle: string;     // "simple" or "complex"
    whatsappButton: boolean; // true or false
    whatsappNumber: string | null;
  };
}

=========================================
FEW-SHOT REFERENCE EXAMPLE (BAKERY):
=========================================
For inspiration, here is how a perfectly formatted and detailed JSON should look for a Bakery named "Golden Crust":

{
  "meta": {
    "title": "Golden Crust Bakery | Handcrafted Cakes & Pastries in Pune",
    "description": "Welcome to Golden Crust Bakery! We bake delicious handcrafted cakes, artisan breads, and premium pastries daily in Pune using organic local ingredients.",
    "favicon": "🥐",
    "keywords": ["bakery Pune", "artisan bread", "custom birthday cakes", "fresh pastries", "Golden Crust"]
  },
  "theme": {
    "primaryColor": "#78350F",
    "secondaryColor": "#FEF3C7",
    "accentColor": "#F59E0B",
    "fontFamily": "Outfit",
    "style": "elegant"
  },
  "pages": [
    {
      "name": "Home",
      "slug": "/",
      "sections": [
        {
          "id": "sec_home_hero",
          "type": "hero",
          "order": 0,
          "visible": true,
          "content": {
            "title": "Pure, Warm, Freshly Baked Happiness Every Single Day",
            "subtitle": "Indulge in artisanal sourdough breads, butter-rich croissants, and custom celebration cakes crafted by master bakers in Pune.",
            "ctaText": "Order on WhatsApp",
            "ctaLink": "https://wa.me/919876543210",
            "backgroundImage": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
          },
          "styles": {},
          "animations": {}
        },
        {
          "id": "sec_home_about",
          "type": "about",
          "order": 1,
          "visible": true,
          "content": {
            "title": "Our Story of Passion & Flour",
            "description": "At Golden Crust, we believe that bread is the soul of every meal. For over a decade, we have combined age-old French baking techniques with rich Indian flavors. We use no artificial preservatives, raising agents, or chemicals. Every loaf, pastry, and cake is handcrafted with pure organic butter and locally sourced premium ingredients.",
            "image": "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
            "highlights": ["100% Organic Flours", "Naturally Fermented Sourdough", "No Added Preservatives", "Handcrafted with Love"]
          },
          "styles": {},
          "animations": {}
        },
        {
          "id": "sec_home_services",
          "type": "services",
          "order": 2,
          "visible": true,
          "content": {
            "title": "What We Bake Fresh for You",
            "subtitle": "Discover our signature oven-fresh specialties prepared daily with maximum care",
            "services": [
              {
                "name": "Artisanal Breads",
                "description": "Crispy crust and airy crumb. Naturally fermented sourdough, rustic baguettes, and soft brioche.",
                "icon": "Flame"
              },
              {
                "name": "Custom Celebration Cakes",
                "description": "Make your special days unforgettable. Exquisite wedding and birthday cakes personalized to your exact preference.",
                "icon": "Sparkles"
              },
              {
                "name": "Gourmet Pastries",
                "description": "Flaky French croissants, creamy lemon tarts, and dark chocolate eclairs baked with organic butter.",
                "icon": "Heart"
              }
            ]
          },
          "styles": {},
          "animations": {}
        },
        {
          "id": "sec_home_testimonials",
          "type": "testimonials",
          "order": 3,
          "visible": true,
          "content": {
            "title": "Loved by Food Lovers in Pune",
            "testimonials": [
              {
                "name": "Priyanka Sharma",
                "role": "Local Food Critic",
                "content": "Golden Crust has the absolute best sourdough in town. Their almond croissants are pure perfection—crispy on the outside, soft and buttery inside!",
                "rating": 5
              },
              {
                "name": "Rohan Deshmukh",
                "role": "Regular Customer",
                "content": "We ordered a custom 3-tier chocolate truffle cake for my daughter's birthday. Not only was it stunningly beautiful, but it was also incredibly moist and delicious!",
                "rating": 5
              }
            ]
          },
          "styles": {},
          "animations": {}
        },
        {
          "id": "sec_home_faq",
          "type": "faq",
          "order": 4,
          "visible": true,
          "content": {
            "title": "Frequently Asked Questions",
            "faqs": [
              {
                "question": "Do you deliver across Pune?",
                "answer": "Yes, we offer home delivery across Pune. Custom cakes and bulk orders require bookings 24 hours in advance."
              },
              {
                "question": "Do you make eggless cakes and pastries?",
                "answer": "Absolutely! 80% of our products, including all our signature customized cakes, can be made eggless upon request."
              }
            ]
          },
          "styles": {},
          "animations": {}
        },
        {
          "id": "sec_home_contact",
          "type": "contact",
          "order": 5,
          "visible": true,
          "content": {
            "title": "Drop by or Say Hello!",
            "phone": "+91 98765 43210",
            "email": "hello@goldencrust.in",
            "address": "Shop No. 12, Galleria Mall, Koregaon Park, Pune, Maharashtra 411001"
          },
          "styles": {},
          "animations": {}
        },
        {
          "id": "sec_home_footer",
          "type": "footer",
          "order": 6,
          "visible": true,
          "content": {
            "businessName": "Golden Crust Bakery",
            "copyright": "© 2026 Golden Crust Bakery. All Rights Reserved.",
            "links": [
              { "label": "Home", "href": "/" },
              { "label": "About", "href": "/about" },
              { "label": "Services", "href": "/services" }
            ]
          },
          "styles": {},
          "animations": {}
        }
      ]
    }
  ],
  "globalSettings": {
    "navbarStyle": "glass",
    "footerStyle": "simple",
    "whatsappButton": true,
    "whatsappNumber": "+919876543210"
  }
}

You must return ONLY the raw JSON object. Do not include markdown code block syntax around the JSON. Check that every bracket matches. Ready? Let's generate a masterpieces!`;
};
//# sourceMappingURL=website.prompt.js.map