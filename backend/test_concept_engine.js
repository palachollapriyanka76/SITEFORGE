require('dotenv').config();
const { generateThreeVariations } = require('./src/ai-engine/generator.js');

async function auditBusiness(name, type, desc, products, services) {
  console.log('\n========================================================================');
  console.log(`TESTING: ${name} (Type: ${type})`);
  try {
    await generateThreeVariations({ name, type, description: desc, products, services });
  } catch(e) {
    console.error("Error generating for", name, e);
  }
}

async function runAudit() {
  await auditBusiness('Green Thumb Nursery', 'Plant Nursery', 'We sell organic plants and trees.', ['Succulents', 'Fruit Trees'], ['Landscaping']);
  await auditBusiness('Banshee Cycles', 'Motorcycle Repair', 'Custom chopper builds.', ['Exhaust Pipes'], ['Engine Rebuilding', 'Tire Change']);
  await auditBusiness('Aqua Clean', 'Pool Cleaning', 'Keep your pool blue.', ['Chlorine Tabs'], ['Weekly Maintenance']);
  await auditBusiness('Starlight Bakery', 'Bakery', 'Freshly baked goods.', ['Cupcakes', 'Wedding Cakes'], ['Custom Decorating']);
  await auditBusiness('Iron Temple', 'Powerlifting Gym', 'Hardcore lifting gym.', ['Chalk', 'Lifting Belts'], ['Strength Coaching']);
  await auditBusiness('Happy Paws', 'Dog Grooming', 'We make pets happy.', ['Organic Shampoo'], ['Pet Haircuts', 'Nail Trimming']);
  await auditBusiness('Pixel Perfect', 'Photography Studio', 'Capture your moments.', ['Canvas Prints'], ['Wedding Photography', 'Portraits']);
  await auditBusiness('Zen Den', 'Yoga Studio', 'Find your peace.', ['Yoga Mats'], ['Vinyasa Classes', 'Meditation']);
  await auditBusiness('Spice Route', 'Indian Restaurant', 'Authentic spices.', ['Biryani', 'Samosas'], ['Catering Delivery']);
  await auditBusiness('Quantum Data', 'B2B Data Analytics', 'Enterprise analytics.', ['Dashboard Software'], ['Data Migration']);
}

runAudit();
