require('dotenv').config();
const axios = require('axios');
const { generateThreeVariations } = require('./src/ai-engine/generator.js');
const fs = require('fs');

const businesses = [
  { name: 'Driftwood Surf', type: 'Surf Shop', description: 'Custom surfboards.', products: ['Longboards', 'Wetsuits'], services: ['Board Repair'] },
  { name: 'Neon Arcade', type: 'Retro Arcade', description: 'Classic arcade games.', products: ['Tokens', 'Snacks'], services: ['Party Hosting'] },
  { name: 'Crescent Moon', type: 'Astrology Reading', description: 'Tarot readings.', products: ['Crystals', 'Tarot Cards'], services: ['Birth Chart Reading'] },
  { name: 'Iron Forge', type: 'Blacksmith', description: 'Custom metalwork.', products: ['Swords', 'Knives'], services: ['Metal Casting'] },
  { name: 'Sapphire Seas', type: 'Boat Rental', description: 'Rent luxury boats.', products: ['Sunscreen'], services: ['Yacht Charter', 'Sailing Lessons'] },
  { name: 'Urban Bees', type: 'Apiary', description: 'Local honey.', products: ['Raw Honey', 'Beeswax Candles'], services: ['Beekeeping Classes'] },
  { name: 'Velocity Karts', type: 'Go-Kart Track', description: 'Indoor racing.', products: ['Helmets'], services: ['Track Racing'] },
  { name: 'Zenith Climbing', type: 'Rock Climbing Gym', description: 'Bouldering walls.', products: ['Climbing Shoes', 'Chalk'], services: ['Belay Classes'] },
  { name: 'Lumina Glass', type: 'Glassblowing Studio', description: 'Handblown art.', products: ['Vases', 'Ornaments'], services: ['Glassblowing Workshops'] },
  { name: 'Timber & Grain', type: 'Woodworking', description: 'Custom furniture.', products: ['Tables', 'Chairs'], services: ['Furniture Restoration'] },
  { name: 'Frosty Scoops', type: 'Ice Cream Parlor', description: 'Artisan gelato.', products: ['Gelato', 'Waffle Cones'], services: ['Ice Cream Catering'] },
  { name: 'Sonic Boom', type: 'Record Store', description: 'Vinyl records.', products: ['Vinyls', 'Turntables'], services: ['Record Cleaning'] },
  { name: 'Verdant Oasis', type: 'Hydroponics Shop', description: 'Indoor growing.', products: ['Grow Lights', 'Nutrients'], services: ['System Installation'] },
  { name: 'Crimson Thread', type: 'Tailor Shop', description: 'Custom suits.', products: ['Ties', 'Cufflinks'], services: ['Suit Alterations', 'Custom Tailoring'] },
  { name: 'Abyss Scuba', type: 'Dive Shop', description: 'Scuba gear.', products: ['Fins', 'Masks'], services: ['PADI Certification'] },
  { name: 'Rustic Hearth', type: 'Fireplace Store', description: 'Wood stoves.', products: ['Wood Stoves', 'Fire Pits'], services: ['Chimney Sweeping'] },
  { name: 'Aero Dynamics', type: 'Drone Photography', description: 'Aerial shots.', products: ['Drone Prints'], services: ['Real Estate Photography'] },
  { name: 'Canine Campus', type: 'Dog Training', description: 'Obedience school.', products: ['Leashes', 'Treats'], services: ['Puppy Classes'] },
  { name: 'Gilded Frame', type: 'Art Gallery', description: 'Local artists.', products: ['Paintings', 'Sculptures'], services: ['Art Appraisal'] },
  { name: 'Summit Gear', type: 'Mountaineering Store', description: 'Alpine equipment.', products: ['Ice Axes', 'Crampons'], services: ['Gear Rental'] }
];

// Re-implement keyword extractor to mimic generator.js exactly
function extractBusinessKeywords(businessData) {
  const name = (businessData.name || "").toLowerCase();
  const type = (businessData.type || "").toLowerCase();
  const audience = (businessData.audience || "").toLowerCase();
  const desc = (businessData.description || "").toLowerCase();
  const stopWords = new Set(["and", "the", "a", "an", "for", "in", "on", "with", "to", "of", "business", "store", "shop", "service", "services", "company", "inc", "ltd", "we", "are", "is", "our", "your"]);
  function tokenize(text) {
    if (!text) return [];
    return text.split(/[\s,.-]+/).filter(w => w.length > 2 && !stopWords.has(w));
  }
  const primaryKeywords = Array.from(new Set([...tokenize(name), ...tokenize(type)]));
  let productKeywords = [];
  if (businessData.products) businessData.products.forEach(p => productKeywords.push(...tokenize(p.toLowerCase())));
  productKeywords = Array.from(new Set(productKeywords));
  let serviceKeywords = [];
  if (businessData.services) businessData.services.forEach(s => serviceKeywords.push(...tokenize(s.toLowerCase())));
  serviceKeywords = Array.from(new Set(serviceKeywords));
  return [...primaryKeywords, ...productKeywords, ...serviceKeywords];
}

async function getPexelsPhoto(url) {
  const match = url.match(/photos\/(\d+)\//);
  if (!match) return null;
  const id = match[1];
  try {
    const res = await axios.get(`https://api.pexels.com/v1/photos/${id}`, {
      headers: { Authorization: process.env.PEXELS_API_KEY }
    });
    return res.data.alt;
  } catch (e) {
    return null;
  }
}

function scoreRelevance(alt, keywords) {
  if (!alt) return 0;
  const lowerAlt = alt.toLowerCase();
  let score = 0;
  keywords.forEach(kw => {
    if (lowerAlt.includes(kw.toLowerCase())) score += 1;
  });
  if (score > 0) score += 1; // bonus
  return score;
}

function classify(score) {
  if (score >= 3) return 'Highly Relevant';
  if (score >= 1) return 'Moderately Relevant';
  return 'Poorly Relevant';
}

async function run() {
  console.log("Starting Image Relevance Audit...");
  const results = [];
  
  // Hack to intercept generator console logs to get the generated query for each URL
  let currentQuery = '';
  const originalLog = console.log;
  console.log = function(...args) {
    const msg = args.join(' ');
    if (msg.includes('Primary Query:')) {
      const q = msg.match(/Primary Query: "([^"]+)"/);
      if (q) currentQuery = q[1];
    } else if (msg.includes('Fallback Query:')) {
      const q = msg.match(/Fallback Query: "([^"]+)"/);
      if (q) currentQuery = q[1];
    }
  };

  for (const b of businesses) {
    const kws = extractBusinessKeywords(b);
    let urls = new Set();
    
    // Generate (logs are intercepted)
    const vars = await generateThreeVariations(b);
    
    // Collect all unique image URLs from the generated JSON
    vars.forEach(v => {
      const w = v.websiteJson;
      const content = w.content || {};
      for (const [sec, data] of Object.entries(content)) {
        if (data.image) urls.add(data.image);
        if (data.backgroundImage) urls.add(data.backgroundImage);
        if (data.images) data.images.forEach(img => urls.add(img.url));
        if (data.products) data.products.forEach(p => p.image && urls.add(p.image));
        if (data.services) data.services.forEach(s => s.image && urls.add(s.image));
        if (data.testimonials) data.testimonials.forEach(t => t.avatar && urls.add(t.avatar));
      }
    });

    // We can't map exact query to URL perfectly without modifying generator.js
    // but we can just analyze the URL's alt text against the business.
    // For "Generated Query", we will just label it as "Inferred from Business"
    
    for (const url of Array.from(urls)) {
      if (url === 'null' || !url) continue;
      // skip dummy avatars if they exist
      if (url.includes('pravatar')) continue;
      
      const alt = await getPexelsPhoto(url);
      const score = scoreRelevance(alt, kws);
      
      // Determine match quality
      const bTypeLow = b.type.toLowerCase();
      const isProductMatch = b.products.some(p => alt && alt.toLowerCase().includes(p.toLowerCase()));
      const isServiceMatch = b.services.some(s => alt && alt.toLowerCase().includes(s.toLowerCase()));
      const isIndustryMatch = alt && (alt.toLowerCase().includes(bTypeLow) || bTypeLow.split(' ').some(w => w.length > 3 && alt.toLowerCase().includes(w)));
      
      let flags = [];
      if (!isProductMatch && !isServiceMatch && !isIndustryMatch) {
         flags.push("Subject does not explicitly match product, service, or industry");
      }
      
      results.push({
        businessName: b.name,
        businessType: b.type,
        url,
        alt: alt || 'NO ALT TEXT',
        score,
        classification: classify(score),
        flags,
        keywords: kws.join(', ')
      });
    }
  }

  originalLog("--- IMAGE RELEVANCE AUDIT RESULTS ---");
  
  let high = 0, mod = 0, poor = 0;
  results.forEach(r => {
    if (r.classification === 'Highly Relevant') high++;
    else if (r.classification === 'Moderately Relevant') mod++;
    else poor++;
  });
  
  originalLog(`\nTotal Images Analyzed: ${results.length}`);
  originalLog(`Highly Relevant: ${high} (${(high/results.length*100).toFixed(1)}%)`);
  originalLog(`Moderately Relevant: ${mod} (${(mod/results.length*100).toFixed(1)}%)`);
  originalLog(`Poorly Relevant: ${poor} (${(poor/results.length*100).toFixed(1)}%)`);
  
  originalLog("\n--- 10 LOWEST SCORING IMAGES ---");
  results.sort((a, b) => a.score - b.score);
  results.slice(0, 10).forEach((r, i) => {
    originalLog(`\n${i+1}. Business: ${r.businessName} (${r.businessType})`);
    originalLog(`URL: ${r.url}`);
    originalLog(`Alt Text: ${r.alt}`);
    originalLog(`Score: ${r.score} - ${r.classification}`);
    if (r.flags.length > 0) originalLog(`Flags: ${r.flags.join(', ')}`);
  });

  fs.writeFileSync('relevance_audit_results.json', JSON.stringify(results, null, 2));
  originalLog("\nAudit saved to relevance_audit_results.json");
}

run();
