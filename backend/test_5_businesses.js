const { config } = require('dotenv');
config();

const { generateThreeVariations } = require('./src/ai-engine/generator');

const businesses = [
  {
    name: "Stitch & Sew",
    businessType: "Tailoring",
    description: "Custom tailoring and alterations for men and women.",
    targetAudience: "Professionals and fashion enthusiasts"
  },
  {
    name: "TechFix Solutions",
    businessType: "IT Support",
    description: "On-site and remote IT support, networking, and computer repair.",
    targetAudience: "Small businesses and home users"
  },
  {
    name: "Green Thumb Landscaping",
    businessType: "Landscaping",
    description: "Lawn care, garden design, and hardscaping services.",
    targetAudience: "Homeowners and commercial properties"
  },
  {
    name: "Fresh Start Cleaners",
    businessType: "Cleaning Services",
    description: "Eco-friendly residential and office cleaning.",
    targetAudience: "Busy professionals and office managers"
  },
  {
    name: "Peak Performance Fitness",
    businessType: "Personal Training",
    description: "1-on-1 personal training, group fitness, and nutrition coaching.",
    targetAudience: "Individuals looking to improve health and fitness"
  }
];

async function runTest() {
  console.log("==========================================");
  console.log("   5-BUSINESS PRODUCTION SMOKE TEST       ");
  console.log("==========================================");

  let successCount = 0;

  for (let i = 0; i < businesses.length; i++) {
    const b = businesses[i];
    console.log(`\n\n--- Generating Business ${i+1}/5: ${b.name} ---`);
    try {
      const variations = await generateThreeVariations(b);
      const blueprint = variations[0].websiteJson;
      console.log(`✅ Success for ${b.name}`);
      console.log(`   - Business Sector: ${blueprint.analysis.businessType}`);
      console.log(`   - Theme Color: ${blueprint.theme.primaryColor}`);
      console.log(`   - Pages: ${blueprint.pages.length}`);
      
      const homePage = blueprint.pages.find(p => p.slug === 'home' || p.isHomepage);
      if (homePage) {
        console.log(`   - Home Sections: ${homePage.sections.length}`);
        let nullImages = 0;
        homePage.sections.forEach(s => {
          if (s.content.image === null || s.content.backgroundImage === null) {
            nullImages++;
          }
          if (s.content.images) {
            s.content.images.forEach(img => {
              if (img.url === null) nullImages++;
            });
          }
        });
        console.log(`   - Null Images: ${nullImages}`);
      }

      successCount++;
    } catch (e) {
      console.log(`❌ Failed for ${b.name}: ${e.message}`);
    }
  }

  console.log("\n==========================================");
  console.log(`Test Complete. ${successCount}/5 Successful.`);
  console.log("==========================================");
}

runTest();
