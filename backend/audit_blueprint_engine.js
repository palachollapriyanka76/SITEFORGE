const { generateThreeVariations } = require('./src/ai-engine/generator');

const businesses = [
  {
    name: "Urban Cafe",
    type: "Cafe",
    products: ["Coffee", "Pastries"],
    audience: "Professionals and students",
    style: "modern"
  },
  {
    name: "Footwear Hub",
    type: "Retail Store",
    products: ["Sneakers", "Running Shoes"],
    audience: "Athletes and casual wearers",
    style: "bold"
  },
  {
    name: "Kids Planet",
    type: "Toy Store",
    products: ["Toys", "Games"],
    audience: "Parents and children",
    style: "playful"
  }
];

async function runAudit() {
  console.log("=== BLUEPRINT ENGINE AUDIT ===");

  const results = {};

  for (const b of businesses) {
    console.log(`\n\n[Generating Blueprint for: ${b.name}]`);
    
    // Stub out the console.log from generator to keep output clean
    const originalLog = console.log;
    console.log = () => {}; 
    const variations = await generateThreeVariations(b);
    console.log = originalLog;
    
    results[b.name] = variations.map(v => {
      const sections = v.websiteJson.pages[0].sections;
      return {
        id: v.id,
        layoutType: v.websiteJson.theme?.style || "modern",
        sectionCount: sections.length,
        sectionList: sections.map(s => s.type)
      };
    });
    
    console.log(`\n[${b.name}] - Variation A (${results[b.name][0].layoutType})`);
    console.log(`Count: ${results[b.name][0].sectionCount}`);
    console.log(`Order: ${results[b.name][0].sectionList.join(" -> ")}`);
    
    console.log(`\n[${b.name}] - Variation B (${results[b.name][1].layoutType})`);
    console.log(`Count: ${results[b.name][1].sectionCount}`);
    console.log(`Order: ${results[b.name][1].sectionList.join(" -> ")}`);
    
    console.log(`\n[${b.name}] - Variation C (${results[b.name][2].layoutType})`);
    console.log(`Count: ${results[b.name][2].sectionCount}`);
    console.log(`Order: ${results[b.name][2].sectionList.join(" -> ")}`);
  }
  
  // Calculate structural difference percentage
  console.log("\n\n=== STRUCTURAL DIFFERENCE CALCULATION ===");
  
  function getDiffScore(arr1, arr2) {
    const minLen = Math.min(arr1.length, arr2.length);
    const maxLen = Math.max(arr1.length, arr2.length);
    let diff = maxLen - minLen; // length difference
    
    for (let i = 0; i < minLen; i++) {
      if (arr1[i] !== arr2[i]) diff++;
    }
    
    return ((diff / maxLen) * 100).toFixed(2);
  }

  const uca = results["Urban Cafe"][0].sectionList;
  const fwa = results["Footwear Hub"][0].sectionList;
  const kpa = results["Kids Planet"][0].sectionList;

  console.log(`Urban Cafe (A) vs Footwear Hub (A): ${getDiffScore(uca, fwa)}% difference`);
  console.log(`Urban Cafe (A) vs Kids Planet (A): ${getDiffScore(uca, kpa)}% difference`);
  console.log(`Footwear Hub (A) vs Kids Planet (A): ${getDiffScore(fwa, kpa)}% difference`);

}

runAudit();
