
require('dotenv').config();
const { generateThreeVariations } = require('./src/ai-engine/generator.js');

async function testBusiness(name, type, desc, products, services) {
  console.log('\n=======================================');
  console.log('TESTING:', name, '(', type, ')');
  const result = await generateThreeVariations({ name, type, description: desc, products, services });
  
  result.forEach((res, idx) => {
    console.log('\n--- VARIATION ' + (idx + 1) + ' (' + res.name + ') ---');
    console.log('Layout Strategy:', res.websiteJson.globalSettings.layoutStrategy);
    const sections = res.websiteJson.pages[0].sections.map(s => s.type);
    console.log('Sections:', sections.join(' -> '));
    const hero = res.websiteJson.pages[0].sections.find(s => s.type === 'hero')?.content;
    console.log('Hero Title:', hero?.title);
  });
}

async function runAll() {
  await testBusiness('Artisan Bread House', 'Bakery', 'We bake fresh organic sourdough daily.', ['Sourdough Loaf', 'Almond Croissant'], ['Bulk Orders']);
  await testBusiness('Tech Nova Solutions', 'IT Consulting', 'Enterprise cloud architecture and migration.', [], ['Cloud Migration', 'Security Audits', 'Infrastructure Design']);
  await testBusiness('Summit Fitness', 'Gym', '24/7 access local gym with personal training.', ['Protein Powder', 'Gym Merchandise'], ['Personal Training', 'Yoga Classes']);
}

runAll();

