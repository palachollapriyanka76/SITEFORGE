require('dotenv').config();
const { generateThreeVariations } = require('./src/ai-engine/generator.js');
const fs = require('fs');

const baseBusinesses = [
  { name: "Apex Footwear", type: "Footwear Store", desc: "Running and casual shoes.", products: ["Sneakers", "Boots"], services: ["Shoe Fitting"] },
  { name: "Morning Brew", type: "Cafe", desc: "Artisan coffee and pastries.", products: ["Espresso", "Croissants"], services: ["Catering"] },
  { name: "Pages & Chapters", type: "Book Store", desc: "Independent bookstore.", products: ["Fiction Books", "Journals"], services: ["Book Club"] },
  { name: "Playtime Wonder", type: "Toy Store", desc: "Educational toys.", products: ["Board Games", "Action Figures"], services: ["Gift Wrapping"] },
  { name: "Paws & Play", type: "Pet Store", desc: "Everything for your pets.", products: ["Dog Food", "Cat Toys"], services: ["Pet Grooming"] },
  { name: "Oak & Iron", type: "Furniture Store", desc: "Handcrafted furniture.", products: ["Sofas", "Dining Tables"], services: ["Interior Design"] },
  { name: "Skyline Realty", type: "Real Estate", desc: "Luxury apartments and homes.", products: ["Condos", "Villas"], services: ["Property Management"] },
  { name: "Circuit Hub", type: "Electronics Store", desc: "Latest gadgets and gear.", products: ["Laptops", "Headphones"], services: ["Device Repair"] },
  { name: "Velvet Thread", type: "Fashion Boutique", desc: "Designer clothing.", products: ["Dresses", "Handbags"], services: ["Personal Styling"] },
  { name: "Sizzle & Smoke", type: "Restaurant", desc: "Gourmet steakhouse.", products: ["Ribeye", "Wine"], services: ["Private Dining"] },
  
  // Generating 40 more to reach 50
  ...Array.from({ length: 40 }).map((_, i) => ({
    name: `Business ${i+11}`,
    type: ["Yoga Studio", "Bakery", "Mechanic", "Florist", "Dentist", "Plumber", "Gym", "Salon", "Consulting", "Software Agency"][i % 10],
    desc: "Premium quality services for you.",
    products: [ ["Yoga Mats", "Blocks"], ["Cakes", "Bread"], ["Tires", "Oil"], ["Bouquets", "Vases"], ["Toothbrushes"], ["Pipes", "Faucets"], ["Weights", "Supplements"], ["Shampoo", "Conditioner"], ["Reports", "Strategies"], ["SaaS", "Apps"] ][i % 10],
    services: [ ["Vinyasa", "Hatha"], ["Custom Cakes", "Catering"], ["Engine Repair", "Inspection"], ["Wedding Flowers", "Delivery"], ["Cleaning", "Whitening"], ["Leak Repair", "Installation"], ["Personal Training", "Classes"], ["Haircuts", "Coloring"], ["Business Strategy", "Financial Audit"], ["Web Dev", "App Dev"] ][i % 10]
  }))
];

async function runAudit() {
  console.log("Starting 50 Business Architecture Audit...\n");
  
  // Intercept logs
  let currentAIPrompts = [];
  let currentQueries = [];
  
  const originalLog = console.log;
  console.log = function(...args) {
    const msg = args.join(' ');
    if (msg.includes('Hero Prompt:')) {
      const match = msg.match(/Hero Prompt: "(.*?)"/);
      if (match) currentAIPrompts.push(match[1]);
    }
    if (msg.includes('--- PEXELS REQUEST')) {
      // Just capturing the fact a request started
    }
    if (msg.includes('Primary Query:')) {
      const match = msg.match(/Primary Query: "(.*?)"/);
      if (match && !currentQueries.includes(match[1])) currentQueries.push(match[1]);
    }
  };

  for (let i = 0; i < baseBusinesses.length; i++) {
    const b = baseBusinesses[i];
    currentAIPrompts = [];
    currentQueries = [];
    
    try {
      const vars = await generateThreeVariations(b);
      
      let aiHeroImages = [];
      let galleryImages = new Set();
      let productImages = new Set();
      
      vars.forEach(v => {
        const heroSec = v.websiteJson.sections.find(s => s.type === 'hero');
        if (heroSec && heroSec.content.backgroundImage) aiHeroImages.push(heroSec.content.backgroundImage);
        
        v.websiteJson.sections.forEach(s => {
          if (s.type === 'gallery' || s.type === 'showcase' || s.type === 'portfolio') {
             if (s.content.images) s.content.images.forEach(img => galleryImages.add(img.url));
          }
          if (s.type === 'products' || s.type === 'collections' || s.type === 'catalog') {
             if (s.content.products) s.content.products.forEach(p => p.image && productImages.add(p.image));
          }
        });
      });
      
      // Deduplicate hero images across variations
      aiHeroImages = Array.from(new Set(aiHeroImages));
      
      originalLog(`\n==============================================`);
      originalLog(`Business ${i+1}: ${b.name} (${b.type})`);
      originalLog(`Generated Image Prompts (AI):`);
      currentAIPrompts.forEach(p => originalLog(`  - ${p}`));
      
      originalLog(`Generated AI Hero Images (FLUX):`);
      aiHeroImages.forEach(url => originalLog(`  - ${url}`));
      
      originalLog(`Generated Pexels Queries:`);
      currentQueries.forEach(q => originalLog(`  - ${q}`));
      
      originalLog(`Assigned Gallery Images (Pexels):`);
      Array.from(galleryImages).forEach(url => originalLog(`  - ${url}`));
      
      originalLog(`Assigned Product Images (Pexels):`);
      Array.from(productImages).forEach(url => originalLog(`  - ${url}`));
      
    } catch (err) {
      originalLog(`Error processing ${b.name}: ${err.message}`);
    }
  }

  console.log = originalLog;
  console.log("\nAUDIT COMPLETE");
}

runAudit();
