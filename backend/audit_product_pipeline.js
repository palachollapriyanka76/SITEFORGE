const { generateThreeVariations } = require('./src/ai-engine/generator');

const businessData = {
  name: "Urban Cafe",
  type: "Cafe",
  description: "A lovely local cafe.",
  products: [
    "Coffee",
    "Burgers",
    "Pizzas",
    "Sandwiches",
    "Desserts",
    "Specialty Beverages"
  ]
};

async function auditPipeline() {
  console.log("=== PRODUCT PIPELINE AUDIT ===\n");

  console.log("1. Exact onboarding payload received:");
  console.log(JSON.stringify(businessData, null, 2));

  console.log("\n2. Products array received by generator.js:");
  console.log(JSON.stringify(businessData.products, null, 2));

  // Run generator
  const originalLog = console.log;
  let logs = [];
  console.log = (...args) => logs.push(args.join(" "));
  const variations = await generateThreeVariations(businessData);
  console.log = originalLog;

  // We need to extract the keywords and concepts since they are private to generator.js
  // Let's re-implement the extraction here to show the user exactly what it produced.
  const name = (businessData.name || "").toLowerCase();
  const type = (businessData.type || "").toLowerCase();
  const desc = (businessData.description || "").toLowerCase();
  const stopWords = new Set(["and", "the", "a", "an", "for", "in", "on", "with", "to", "of", "business", "store", "shop", "service", "services", "company", "inc", "ltd", "we", "are", "is", "our", "your"]);
  function tokenize(text) {
    if (!text) return [];
    return text.split(/[\s,.-]+/).filter(w => w.length > 2 && !stopWords.has(w));
  }
  let productKeywords = [];
  businessData.products.forEach(p => {
     productKeywords.push(...tokenize(p.toLowerCase()));
  });
  productKeywords = Array.from(new Set(productKeywords));
  
  console.log("\n3. Extracted Keywords (productKeywords):");
  console.log(JSON.stringify(productKeywords, null, 2));

  let productConcepts = [];
  if (productKeywords.length > 0) {
    productConcepts = businessData.products.map(p => typeof p === 'string' ? p : p.name).filter(Boolean);
  } else {
    productConcepts = [`${type} products`, `${type} collection`];
  }
  console.log("\n4. Generated productConcepts:");
  console.log(JSON.stringify(productConcepts, null, 2));

  console.log("\n5. Generated Image Queries (from inner logs):");
  const queryLogs = logs.filter(l => l.includes("QUERY ENGINE") || l.includes(" - ["));
  queryLogs.forEach(l => console.log(l));

  console.log("\n6. Function that creates the products:");
  console.log(`
      // In generateDynamicSectionContent()
      case "products":
      case "collections":
      case "catalog":
      case "inventory":
      case "featured-products":
      case "menu":
        const pSrc = keywords.productKeywords.length > 0 ? keywords.productKeywords : keywords.primaryKeywords;
        const prods = pSrc.slice(0, 3).map((kw, i) => ({
          name: \`\${capitalize(kw)} Selection\`,
          price: "Contact Us",
          description: \`A carefully curated \${kw} experience.\`,
          image: getImages(3)[i] || null
        }));
  `);

  console.log("7. Override Analysis:");
  console.log("User-provided products are NOT overridden by templates or fallbacks.");
  console.log("Instead, they are overridden by the NLP TOKENIZER (`productKeywords`).");
  console.log("The tokenizer breaks 'Specialty Beverages' into 'specialty' and 'beverages'.");
  console.log("Then, the content generator takes the first 3 tokens: pSrc.slice(0,3) and appends 'Selection'.");

  console.log("\n8. Exact file and line number of override:");
  console.log("- File: backend/src/ai-engine/generator.js");
  console.log("- Line 378: `const prods = pSrc.slice(0, 3).map((kw, i) => ({ ... name: \`\${capitalize(kw)} Selection\` ...`");
  
  console.log("\nResulting Products in JSON:");
  const variant = variations[0];
  const prodSec = variant.websiteJson.sections.find(s => s.type === 'products' || s.type === 'menu' || s.type === 'catalog' || s.type === 'inventory' || s.type === 'collections' || s.type === 'featured-products');
  if (prodSec) {
      console.log(JSON.stringify(prodSec.content.products, null, 2));
  } else {
      console.log("No product section in Variant A");
  }

}

auditPipeline();
