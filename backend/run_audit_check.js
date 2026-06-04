require('dotenv').config();
const { generateThreeVariations } = require('./src/ai-engine/generator.js');

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

async function checkNullImages(websiteJson) {
  let nullCount = 0;
  let totalImages = 0;

  function traverse(obj) {
    if (Array.isArray(obj)) {
      obj.forEach(traverse);
    } else if (obj !== null && typeof obj === 'object') {
      for (const [key, value] of Object.entries(obj)) {
        if (key === 'image' || key === 'backgroundImage' || key === 'avatar' || key === 'url') {
          totalImages++;
          if (value === null || value === '' || value === undefined) {
            nullCount++;
          }
        } else {
          traverse(value);
        }
      }
    }
  }
  traverse(websiteJson.sections);
  return { nullCount, totalImages };
}

async function runAudit() {
  let totalNulls = 0;
  let totalImgs = 0;

  for (const b of businesses) {
    console.log(`\n==============================================`);
    console.log(`Testing: ${b.name}`);
    try {
      const vars = await generateThreeVariations(b);
      
      let bNulls = 0;
      let bImgs = 0;
      for (const v of vars) {
        const { nullCount, totalImages } = await checkNullImages(v.websiteJson);
        bNulls += nullCount;
        bImgs += totalImages;
      }
      
      console.log(`\n[RESULT] ${b.name} -> Images: ${bImgs}, Nulls: ${bNulls}`);
      totalNulls += bNulls;
      totalImgs += bImgs;

    } catch (err) {
      console.error(`Error for ${b.name}:`, err.message);
    }
  }

  console.log(`\n==============================================`);
  console.log(`AUDIT COMPLETE`);
  console.log(`Total Images Evaluated: ${totalImgs}`);
  console.log(`Total Null/Broken Images: ${totalNulls}`);
  console.log(`Image Coverage: ${totalImgs > 0 ? ((totalImgs - totalNulls) / totalImgs * 100).toFixed(2) : 0}%`);
}

runAudit();
