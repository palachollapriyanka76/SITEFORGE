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

async function auditBusiness(b) {
  const origLog = console.log;
  let accepted = 0;
  let rejected = 0;
  let queries = new Set();
  
  origLog(`\n### ${b.name} (${b.type})`);
  
  try {
    console.log = (msg) => {
      if (typeof msg !== 'string') return;
      if (msg.includes('[Filter] Accepted:')) {
        const parts = msg.match(/Accepted: (\d+), Rejected: (\d+)/);
        if (parts) {
          accepted += parseInt(parts[1]);
          rejected += parseInt(parts[2]);
        }
      }
      if (msg.includes('Query:')) {
        const q = msg.match(/Query: "([^"]+)"/);
        if (q) queries.add(q[1]);
      }
    };

    const vars = await generateThreeVariations(b);
    
    console.log = origLog;
    const bp = vars[0];
    
    // Check if blueprint exists
    if (!bp.blueprint) {
       origLog('* Blueprint object is missing. Full site keys:', Object.keys(bp));
       return;
    }

    origLog(`* **Blueprint:** ${bp.blueprint.layoutType}`);
    origLog(`* **Sections:** ${bp.blueprint.sections.join(', ')}`);
    origLog(`* **Unique Image Queries:** ${Array.from(queries).join(', ')}`);
    origLog(`* **Images Fetched:** ${accepted} accepted, ${rejected} rejected (Corporate filter)`);

  } catch(e) {
    console.log = origLog;
    console.error("Error generating for", b.name, e);
  }
}

async function runAudit() {
  for (const b of businesses) {
    await auditBusiness(b);
  }
}

runAudit();
