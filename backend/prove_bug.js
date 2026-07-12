const { generateThreeVariations } = require('./src/ai-engine/generator');

const business = {
  name: "Urban Cafe",
  type: "Cafe",
  products: ["Coffee", "Pastries"],
  audience: "Professionals and students",
  style: "modern"
};

const SUPPORTED_FRONTEND_COMPONENTS = [
  "hero", "about", "services", "products", "gallery", "team", "pricing", 
  "testimonials", "faq", "contact", "booking", "menu", "portfolio", 
  "success-stories", "memberships", "promotions", "events", "footer"
];

async function proveBug() {
  console.log("=== RENDERING BUG PROOF ===");
  
  const originalLog = console.log;
  console.log = () => {}; 
  const variations = await generateThreeVariations(business);
  console.log = originalLog;
  
  const variantA = variations[0];
  const sections = variantA.websiteJson.pages[0].sections;
  
  console.log("\n1. Exact generated blueprint JSON (sections array):");
  const extractedSections = sections.map(s => ({ id: s.id, type: s.type }));
  console.log(JSON.stringify(extractedSections, null, 2));
  
  console.log(`\n2. Total section count in the blueprint: ${sections.length}`);
  
  console.log("\n3. Section IDs passed into PreviewSectionRenderer & Their Render Status:");
  
  let renderedCount = 0;
  const renderedSections = [];
  const droppedSections = [];
  
  sections.forEach(sec => {
    const isSupported = SUPPORTED_FRONTEND_COMPONENTS.includes(sec.type);
    console.log(`  - ID: ${sec.id} (Type: '${sec.type}')`);
    if (isSupported) {
      console.log(`    => ✅ SUCCESS (Matches switch case "${sec.type}")`);
      renderedCount++;
      renderedSections.push(sec);
    } else {
      console.log(`    => ❌ DROPPED (Hits default: return null case)`);
      droppedSections.push(sec);
    }
  });
  
  console.log("\n4. Section IDs that successfully render:");
  renderedSections.forEach(s => console.log(`  - ${s.id} (${s.type})`));
  
  console.log("\n5. Section IDs that fall into the default/null case:");
  droppedSections.forEach(s => console.log(`  - ${s.id} (${s.type})`));
  
  console.log(`\n6. Final rendered section count: ${renderedCount} / ${sections.length}`);
  
  if (renderedCount < sections.length) {
    console.log("\n[!] BUG IDENTIFIED: The rendered count is strictly lower than the blueprint count.");
    console.log(`[!] EXACT MISSING SECTIONS: ${droppedSections.map(s => `'${s.type}'`).join(", ")}`);
    console.log("[!] REASON: The React PreviewSectionRenderer lacks `case` statements for these dynamically generated semantic aliases.");
  }
}

proveBug();
