// SiteForge Template Marketplace Registry
// Defines categories, variants, design presets, and compiles the website JSON on the fly for 50 distinct templates.

export const CATEGORIES = [
  { id: "bakery", name: "Bakery", icon: "Store" },
  { id: "restaurant", name: "Restaurant", icon: "Utensils" },
  { id: "salon", name: "Salon", icon: "Scissors" },
  { id: "electronics", name: "Electronics", icon: "Cpu" },
  { id: "fashion", name: "Fashion", icon: "ShoppingBag" },
  { id: "grocery", name: "Grocery", icon: "Apple" },
  { id: "gym", name: "Gym", icon: "Dumbbell" },
  { id: "clinic", name: "Clinic", icon: "Activity" },
  { id: "photography", name: "Photography", icon: "Camera" },
  { id: "freelancer", name: "Freelancer", icon: "User" }
];

export const STYLES = [
  { id: "luxury", name: "Luxury", description: "Premium styling, serif fonts, gold accent tones, spacious layouts." },
  { id: "artisan", name: "Artisan", description: "Warm earthy tones, hand-crafted aesthetic, traditional serif styles." },
  { id: "modern", name: "Modern", description: "Vibrant gradients, Outfit sans-serif, rounded shapes, highly dynamic." },
  { id: "vintage", name: "Vintage", description: "Classic retro layout, muted sepia/cream palettes, styled borders." },
  { id: "minimal", name: "Minimal", description: "Stark monochrome grids, generous whitespace, square buttons." }
];

// Expanded Industry-Specific Unsplash Image Library
export const UNSPLASH_IMAGES = {
  bakery: [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", // bread
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80", // cake
    "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80", // cupcakes
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80", // croissants
    "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80", // sourdough
    "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80", // counter
    "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80", // pastry
    "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80", // showcases
    "https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&w=800&q=80", // process
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"  // interior
  ],
  restaurant: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", // room
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", // paneer
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80", // butter chicken
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", // chef plating
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80", // table
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80", // plate
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80", // interior
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", // steak
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", // tables
    "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80"  // plating
  ],
  salon: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80", // chair
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80", // makeup
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80", // facial
    "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80", // blowout
    "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80", // mirrors
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80", // tools
    "https://images.unsplash.com/photo-1633681926035-ec1ac984418a?auto=format&fit=crop&w=800&q=80", // wash
    "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80", // massage
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80", // station
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80"  // cut
  ],
  electronics: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", // headphones
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", // watch
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80", // speaker
    "https://images.unsplash.com/photo-1496181130204-7552cc145cdb?auto=format&fit=crop&w=800&q=80", // laptop
    "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80", // soundbar
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", // phone
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80", // gaming
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80", // shelves
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80", // desk
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80"  // monitor
  ],
  fashion: [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80", // store
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80", // rail
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80", // design
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80", // model
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80", // models
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80", // hanger
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80", // mannequin
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80", // apparels
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80", // mirror
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"  // posing
  ],
  grocery: [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", // produce
    "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80", // organic
    "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80", // aisles
    "https://images.unsplash.com/photo-1543083503-4c072e54c35a?auto=format&fit=crop&w=800&q=80", // berries
    "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=800&q=80", // market
    "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=800&q=80", // bags
    "https://images.unsplash.com/photo-1526362040912-341d6368d3b6?auto=format&fit=crop&w=800&q=80", // veggies
    "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&w=800&q=80", // basket
    "https://images.unsplash.com/photo-1610348725531-843dff163e2c?auto=format&fit=crop&w=800&q=80", // harvest
    "https://images.unsplash.com/photo-1488459718128-d3f9f39d1883?auto=format&fit=crop&w=800&q=80"  // fruit display
  ],
  gym: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80", // dumbbells
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80", // lifter
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80", // active run
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80", // coach
    "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80", // racks
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80", // machinery
    "https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?auto=format&fit=crop&w=800&q=80", // workout
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80", // dumbell
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80", // ropes
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"  // crossfit
  ],
  clinic: [
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80", // lobby
    "https://images.unsplash.com/photo-1581595220892-b0739db3ba87?auto=format&fit=crop&w=800&q=80", // dentist
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80", // stethoscope
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80", // examination
    "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80", // wellness
    "https://images.unsplash.com/photo-1629909006035-ec1ac984418a?auto=format&fit=crop&w=800&q=80", // equipment
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80", // check
    "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=800&q=80", // physio
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80", // lounge
    "https://images.unsplash.com/photo-1581595220892-b0739db3ba87?auto=format&fit=crop&w=800&q=80"  // doctor
  ],
  photography: [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80", // lens
    "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=800&q=80", // portrait
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", // wedding
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80", // travel
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=80", // flash
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80", // camera
    "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=800&q=80", // couple
    "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=800&q=80", // capture
    "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80", // gears
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"  // studio
  ],
  freelancer: [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80", // dev code
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80", // UI figma
    "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80", // writing desk
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", // smile
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", // workflow
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80", // creative desk
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", // collaborative
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80", // designs
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80", // laptop screen
    "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80"  // consulting
  ]
};

// Design presets mapping style ids to theme details
export const DESIGN_PRESETS = {
  luxury: {
    primaryColor: "#7F1D1D", // Burgundy Red
    secondaryColor: "#0F172A", // Dark Carbon
    accentColor: "#D97706", // Amber Gold
    fontFamily: "Playfair Display",
    style: "luxury",
    spacing: "large",
    cardStyle: "rounded-3xl border border-amber-900/10 shadow-2xl bg-stone-50/70 backdrop-blur-md hover:border-amber-800/30 transition-all duration-500",
    buttonStyle: "rounded-none font-bold tracking-widest uppercase border border-amber-800 hover:bg-amber-900 hover:text-white transition-all px-8 py-3.5",
    imageStyle: "rounded-3xl shadow-2xl object-cover border border-stone-200"
  },
  artisan: {
    primaryColor: "#C2410C", // Terracotta Orange
    secondaryColor: "#1C1917", // Stone Charcoal
    accentColor: "#B45309", // Warm Ochre
    fontFamily: "Lora",
    style: "artisan",
    spacing: "medium",
    cardStyle: "rounded-2xl border border-stone-200/50 shadow-xl bg-stone-50 hover:-translate-y-1 transition-all duration-500",
    buttonStyle: "rounded-2xl font-semibold tracking-wide bg-stone-900 hover:bg-stone-800 text-stone-100 transition-all px-7 py-3 shadow-lg",
    imageStyle: "rounded-2xl shadow-xl object-cover"
  },
  modern: {
    primaryColor: "#4F46E5", // Indigo Blue
    secondaryColor: "#0F172A", // Slate Black
    accentColor: "#10B981", // Teal Emerald
    fontFamily: "Outfit",
    style: "modern",
    spacing: "medium",
    cardStyle: "rounded-2xl border border-slate-100 shadow-xl bg-white/70 backdrop-blur-lg hover:shadow-2xl hover:border-indigo-100 transition-all duration-300",
    buttonStyle: "rounded-2xl font-black bg-gradient-to-r from-indigo-600 to-indigo-700 hover:to-indigo-500 text-white shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-97 transition-all px-7 py-3",
    imageStyle: "rounded-2xl shadow-xl object-cover hover:scale-103 transition-all duration-300"
  },
  vintage: {
    primaryColor: "#7C2D12", // Brick Orange
    secondaryColor: "#1C1917", // Cream Warm
    accentColor: "#059669", // Dark Sage
    fontFamily: "Cormorant Garamond",
    style: "vintage",
    spacing: "large",
    cardStyle: "rounded-none border border-stone-850 shadow-none bg-stone-100/50 hover:bg-stone-50 transition-all duration-300",
    buttonStyle: "rounded-none font-bold tracking-widest uppercase border border-stone-900 hover:bg-stone-900 hover:text-white transition-all px-8 py-3.5",
    imageStyle: "rounded-none shadow-md border border-stone-300 object-cover"
  },
  minimal: {
    primaryColor: "#18181B", // Zinc Charcoal
    secondaryColor: "#F4F4F5", // Neutral Grey
    accentColor: "#71717A", // Slate Grey
    fontFamily: "Inter",
    style: "minimal",
    spacing: "compact",
    cardStyle: "rounded-none border border-zinc-200 shadow-none bg-white hover:bg-zinc-50 transition-all duration-200",
    buttonStyle: "rounded-none font-black tracking-wider uppercase bg-black text-white hover:bg-zinc-800 transition-all px-6 py-3",
    imageStyle: "rounded-none shadow-none border border-zinc-150 object-cover"
  }
};

// Rotates images mathematically based on style variation index
const STYLE_OFFSETS = {
  luxury: 0,
  artisan: 2,
  modern: 4,
  vintage: 6,
  minimal: 8
};

// Compiles a fully populated Website JSON schema
export function generateTemplateJson(categoryId, styleId, customName = null) {
  const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  const style = STYLES.find(s => s.id === styleId) || STYLES[0];
  
  // Base design preset
  let design = JSON.parse(JSON.stringify(DESIGN_PRESETS[style.id] || DESIGN_PRESETS.modern));

  // Category + Style Custom Palette & Design Overrides
  if (category.id === "fashion" && style.id === "luxury") {
    design = {
      primaryColor: "#0A0A0A", // Jet Black
      secondaryColor: "#121212", // Dark Carbon
      accentColor: "#D4AF37", // Luxury Gold
      fontFamily: "Playfair Display",
      style: "luxury",
      spacing: "large",
      cardStyle: "rounded-none border border-amber-500/20 bg-[#121212] text-white shadow-2xl hover:border-amber-400/80 transition-all duration-500",
      buttonStyle: "rounded-none font-bold tracking-widest uppercase border border-amber-400 bg-transparent text-amber-400 hover:bg-amber-400 hover:text-black transition-all px-8 py-3.5",
      imageStyle: "rounded-none object-cover border border-amber-500/10"
    };
  } else if (category.id === "fashion" && style.id === "modern") {
    design = {
      primaryColor: "#0F172A",
      secondaryColor: "#F8FAFC",
      accentColor: "#6366F1",
      fontFamily: "Outfit",
      style: "modern",
      spacing: "medium",
      cardStyle: "rounded-none border border-slate-205 bg-white hover:border-indigo-500 hover:shadow-xl transition-all duration-300",
      buttonStyle: "rounded-none bg-black text-white hover:bg-zinc-800 transition-all px-7 py-3",
      imageStyle: "rounded-none object-cover"
    };
  } else if (category.id === "bakery" && style.id === "luxury") {
    design = {
      primaryColor: "#581C0C", // Plum/Burgundy
      secondaryColor: "#FFFDF9",
      accentColor: "#D97706", // Honey Gold
      fontFamily: "Lora",
      style: "luxury",
      spacing: "large",
      cardStyle: "rounded-3xl border border-stone-100 bg-white/95 shadow-xl hover:scale-101 hover:border-amber-900/10 transition-all duration-300",
      buttonStyle: "rounded-full bg-[#581C0C] hover:bg-[#782816] text-white transition-all px-8 py-3.5",
      imageStyle: "rounded-3xl object-cover shadow-lg"
    };
  } else if (category.id === "bakery" && style.id === "vintage") {
    design = {
      primaryColor: "#7C2D12", // Terracotta
      secondaryColor: "#FAF6F0", // Warm Cream
      accentColor: "#B45309", // Ochre
      fontFamily: "Cormorant Garamond",
      style: "vintage",
      spacing: "large",
      cardStyle: "rounded-none border border-stone-300 bg-[#FAF6F0] hover:bg-stone-50/50 transition-all duration-300",
      buttonStyle: "rounded-none border border-stone-800 text-stone-850 hover:bg-stone-850 hover:text-white transition-all px-7 py-3",
      imageStyle: "rounded-none border border-stone-400 object-cover"
    };
  } else if (category.id === "restaurant" && style.id === "luxury") {
    design = {
      primaryColor: "#090D16", // Midnight Black
      secondaryColor: "#111827",
      accentColor: "#C5A880", // Champagne Gold
      fontFamily: "Playfair Display",
      style: "luxury",
      spacing: "large",
      cardStyle: "rounded-none border border-stone-800 bg-[#090D16] text-[#E5E7EB] hover:border-amber-700/30 transition-all duration-500",
      buttonStyle: "rounded-none font-bold tracking-widest uppercase border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-black transition-all px-8 py-3.5",
      imageStyle: "rounded-none border border-[#C5A880]/20 object-cover"
    };
  } else if (category.id === "restaurant" && style.id === "modern") {
    design = {
      primaryColor: "#EF4444", // Vibrant Red
      secondaryColor: "#FFFBEB",
      accentColor: "#F59E0B",
      fontFamily: "Outfit",
      style: "modern",
      spacing: "medium",
      cardStyle: "rounded-2xl border border-orange-100 shadow-md bg-white hover:-translate-y-1 transition-all duration-300",
      buttonStyle: "rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold px-7 py-3 shadow-lg",
      imageStyle: "rounded-2xl object-cover"
    };
  } else if (category.id === "salon" && style.id === "luxury") {
    design = {
      primaryColor: "#BE123C", // Rose Pink
      secondaryColor: "#FFF5F5",
      accentColor: "#FDA4AF",
      fontFamily: "Lora",
      style: "luxury",
      spacing: "large",
      cardStyle: "rounded-2xl border border-rose-100 bg-white/90 shadow-md hover:shadow-xl transition-all duration-300",
      buttonStyle: "rounded-full bg-rose-600 hover:bg-rose-500 text-white px-7 py-3 transition-all",
      imageStyle: "rounded-2xl object-cover shadow-sm"
    };
  } else if (category.id === "gym" && style.id === "modern") {
    design = {
      primaryColor: "#111111", // Jet Black
      secondaryColor: "#000000",
      accentColor: "#EF4444", // Red Accent
      fontFamily: "Outfit",
      style: "modern",
      spacing: "medium",
      cardStyle: "rounded-none border-2 border-zinc-800 bg-black text-white hover:border-red-600 transition-all duration-300",
      buttonStyle: "rounded-none font-black tracking-wider uppercase bg-red-600 hover:bg-red-700 text-white transition-all px-8 py-3.5",
      imageStyle: "rounded-none border border-zinc-800 object-cover"
    };
  }

  const images = UNSPLASH_IMAGES[category.id] || UNSPLASH_IMAGES.bakery;
  const offset = STYLE_OFFSETS[style.id] || 0;
  const name = customName || `${style.name} ${category.name}`;

  // Section Sequence Selection
  let sectionTypes = [];
  if (category.id === "fashion" && style.id === "luxury") {
    sectionTypes = ["hero", "gallery", "products", "services", "testimonials", "contact", "footer"];
  } else if (category.id === "fashion" && style.id === "modern") {
    sectionTypes = ["hero", "products", "services", "testimonials", "booking", "contact", "footer"];
  } else if (category.id === "bakery" && style.id === "luxury") {
    sectionTypes = ["hero", "products", "gallery", "menu", "testimonials", "contact", "booking", "footer"];
  } else if (category.id === "bakery" && style.id === "vintage") {
    sectionTypes = ["hero", "about", "menu", "gallery", "testimonials", "contact", "footer"];
  } else if (category.id === "restaurant" && style.id === "luxury") {
    sectionTypes = ["hero", "menu", "about", "products", "booking", "testimonials", "contact", "footer"];
  } else if (category.id === "restaurant" && style.id === "modern") {
    sectionTypes = ["hero", "products", "services", "gallery", "contact", "footer"];
  } else if (category.id === "salon" && style.id === "luxury") {
    sectionTypes = ["hero", "services", "gallery", "pricing", "testimonials", "booking", "footer"];
  } else if (category.id === "gym" && style.id === "modern") {
    sectionTypes = ["hero", "services", "team", "success-stories", "memberships", "contact", "footer"];
  } else {
    // Default full-featured sequence for clinic, photography, grocery, freelancer etc.
    sectionTypes = ["hero", "about", "services"];
    if (category.id === "restaurant" || category.id === "bakery") {
      sectionTypes.push("menu");
    }
    if (category.id === "salon" || category.id === "clinic" || category.id === "restaurant") {
      sectionTypes.push("booking");
    }
    if (category.id === "gym") {
      sectionTypes.push("memberships", "success-stories");
    }
    if (category.id === "photography" || category.id === "freelancer") {
      sectionTypes.push("portfolio");
    }
    sectionTypes.push("products", "gallery", "testimonials", "faq", "contact", "footer");
  }

  const sectionsArray = [];

  // Helper to get CTA link targets based on active sections in template
  const getCtaLinkTarget = (types) => {
    if (types.includes("booking")) return "#sec_booking";
    if (types.includes("menu")) return "#sec_menu";
    if (types.includes("products")) return "#sec_products";
    if (types.includes("services")) return "#sec_services";
    if (types.includes("memberships")) return "#sec_memberships";
    if (types.includes("contact")) return "#sec_contact";
    return "#sec_contact";
  };

  const ctaLinkTarget = getCtaLinkTarget(sectionTypes);

  // Compile sections dynamically
  sectionTypes.forEach(type => {
    if (type === "hero") {
      // Custom Hero CTA texts
      let ctaText = "Browse Offerings";
      if (category.id === "gym") ctaText = "Sign Up Now";
      else if (category.id === "salon") ctaText = "Book Appointment";
      else if (category.id === "restaurant") ctaText = "Reserve a Table";
      else if (category.id === "fashion" && style.id === "luxury") ctaText = "View Lookbook";
      else if (category.id === "fashion" && style.id === "modern") ctaText = "New Arrivals";
      else if (category.id === "bakery" && style.id === "luxury") ctaText = "Order Specials";

      sectionsArray.push({
        id: "sec_hero",
        type: "hero",
        content: {
          title: getHeroTitle(category.id, style.id, name),
          subtitle: getHeroSubtitle(category.id),
          ctaText,
          ctaLink: ctaLinkTarget,
          backgroundImage: images[offset % images.length]
        }
      });
    }

    else if (type === "about") {
      sectionsArray.push({
        id: "sec_about",
        type: "about",
        content: {
          title: "Our Story",
          description: getAboutDescription(category.id),
          image: images[(offset + 1) % images.length],
          highlights: getAboutHighlights(category.id)
        }
      });
    }

    else if (type === "services") {
      sectionsArray.push({
        id: "sec_services",
        type: "services",
        content: {
          title: category.id === "gym" ? "Our Programs" : "Our Services",
          subtitle: "EXCLUSIVELY CURATED",
          services: getServicesList(category.id)
        }
      });
    }

    else if (type === "menu") {
      sectionsArray.push({
        id: "sec_menu",
        type: "menu",
        content: {
          title: "Signature Menu",
          subtitle: "FRESH INGREDIENTS DAILY",
          categories: getMenuCategories(category.id)
        }
      });
    }

    else if (type === "booking") {
      sectionsArray.push({
        id: "sec_booking",
        type: "booking",
        content: {
          title: category.id === "restaurant" ? "Reserve A Table" : "Schedule An Appointment",
          subtitle: "BOOK ONLINE INSTANTLY",
          submitText: category.id === "restaurant" ? "Confirm Table Booking" : "Confirm Reservation Slot",
          fields: getBookingFields(category.id)
        }
      });
    }

    else if (type === "memberships") {
      sectionsArray.push({
        id: "sec_memberships",
        type: "memberships",
        content: {
          title: "Membership Tiers",
          subtitle: "CHOOSE YOUR GOAL",
          plans: [
            { name: "Silver Tier", price: "Rs. 1,999/mo", duration: "Standard access", features: ["Full Floor access", "Locker access", "1x Coach Audit"], highlight: false },
            { name: "Gold Premium", price: "Rs. 4,499/mo", duration: "Recommended plan", features: ["24/7 Access", "Diet Macro Sheets", "Group Classes", "Sauna access"], highlight: true },
            { name: "VIP Iron Forge", price: "Rs. 9,999/mo", duration: "All inclusive plan", features: ["Private trainer", "Free protein shakes", "Workout metrics", "Priority slots"], highlight: false }
          ]
        }
      });
    }

    else if (type === "success-stories") {
      sectionsArray.push({
        id: "sec_success_stories",
        type: "success-stories",
        content: {
          title: "Transformations",
          subtitle: "REAL STATS ACHIEVED BY MEMBERS",
          stories: [
            { title: "Lean Muscle Build", period: "16 Weeks", result: "+6.5kg Lean Mass", before: "Low energy levels.", after: "Robust functional muscle.", client: "Aditya Patil" },
            { title: "Body Fat Shred", period: "12 Weeks", result: "-9kg Body Fat", before: "High visceral fat.", after: "Active cardiovascular stamina.", client: "Anjali Gore" }
          ]
        }
      });
    }

    else if (type === "portfolio") {
      sectionsArray.push({
        id: "sec_portfolio",
        type: "portfolio",
        content: {
          title: "Work Portfolio",
          subtitle: "RECENT MASTERPIECES",
          projects: [
            { name: "E-Commerce Launch", category: "Full-Stack Dev", image: images[(offset + 2) % images.length] },
            { name: "Bridal Scenery Shoots", category: "Event Media", image: images[(offset + 3) % images.length] },
            { name: "Premium Branding Campaign", category: "Creative Direction", image: images[(offset + 4) % images.length] }
          ]
        }
      });
    }

    else if (type === "products") {
      sectionsArray.push({
        id: "sec_products",
        type: "products",
        content: {
          title: category.id === "fashion" ? "Featured Collection" : "Featured Products",
          subtitle: "POPULAR CLIENT FAVORITES",
          products: getProductsList(category.id, images, offset)
        }
      });
    }

    else if (type === "gallery") {
      // Lookbook customization for Fashion Luxury
      const title = (category.id === "fashion" && style.id === "luxury") ? "Instagram Lookbook" : "Visual Gallery";
      const subtitle = (category.id === "fashion" && style.id === "luxury") ? "@LUXE_BOUTIQUE_OFFICIAL" : "TOUR OUR DYNAMIC SPACES AND WORKFLOWS";

      sectionsArray.push({
        id: "sec_gallery",
        type: "gallery",
        content: {
          title,
          subtitle,
          images: [
            { url: images[(offset + 5) % images.length], caption: "Atmospheric workspace detail" },
            { url: images[(offset + 6) % images.length], caption: "Artisanal creation processes" },
            { url: images[(offset + 7) % images.length], caption: "Premium quality selection" },
            { url: images[(offset + 8) % images.length], caption: "Prepared with absolute passion" },
            { url: images[(offset + 9) % images.length], caption: "Designed to wow customers" }
          ]
        }
      });
    }

    else if (type === "testimonials") {
      sectionsArray.push({
        id: "sec_testimonials",
        type: "testimonials",
        content: {
          title: "Client Reviews",
          testimonials: getTestimonialsList(category.id)
        }
      });
    }

    else if (type === "faq") {
      sectionsArray.push({
        id: "sec_faq",
        type: "faq",
        content: {
          title: "Frequently Asked Questions",
          faqs: getFaqList(category.id)
        }
      });
    }

    else if (type === "contact") {
      sectionsArray.push({
        id: "sec_contact",
        type: "contact",
        content: {
          title: "Get In Touch",
          phone: "+91 98765 43210",
          email: `hello@${category.id}forge.com`,
          address: "Shop No. 12, Galleria Commercial Plaza, Koregaon Park, Pune, Maharashtra 411001"
        }
      });
    }

    else if (type === "footer") {
      const footerLinks = [];
      if (sectionTypes.includes("about")) footerLinks.push({ label: "About", href: "#sec_about" });
      if (sectionTypes.includes("services")) footerLinks.push({ label: "Services", href: "#sec_services" });
      if (sectionTypes.includes("menu")) footerLinks.push({ label: "Menu", href: "#sec_menu" });
      if (sectionTypes.includes("products")) footerLinks.push({ label: "Catalog", href: "#sec_products" });
      if (sectionTypes.includes("booking")) footerLinks.push({ label: "Bookings", href: "#sec_booking" });
      if (sectionTypes.includes("contact")) footerLinks.push({ label: "Contact", href: "#sec_contact" });

      sectionsArray.push({
        id: "sec_footer",
        type: "footer",
        content: {
          businessName: name,
          links: footerLinks,
          copyright: `© 2026 ${name}. Built with SiteForge.`
        }
      });
    }
  });

  return {
    theme: design,
    pages: [
      {
        name: "Home",
        sections: sectionsArray
      }
    ]
  };
}

// Generate the 50 Template Metadata variants
export const TEMPLATES_LIST = [];
CATEGORIES.forEach(cat => {
  STYLES.forEach(style => {
    const capitalizedStyle = style.name;
    const templateName = `${capitalizedStyle} ${cat.name}`;
    const id = `${cat.id}-${style.id}`;
    const images = UNSPLASH_IMAGES[cat.id] || UNSPLASH_IMAGES.bakery;
    const offset = STYLE_OFFSETS[style.id] || 0;

    TEMPLATES_LIST.push({
      id,
      name: templateName,
      category: cat.name,
      categoryId: cat.id,
      style: style.id,
      tagline: `${style.description} Built specifically for ${cat.name} businesses.`,
      description: `Premium responsive theme for ${cat.name} shops. Configured with the ${style.name} branding design system.`,
      rating: parseFloat((4.7 + Math.random() * 0.29).toFixed(1)),
      reviewsCount: Math.floor(10 + Math.random() * 85),
      image: images[offset % images.length] // Category specific image based on style index rotation!
    });
  });
});

// PRESSETS GENERATOR HELPERS

function getHeroTitle(catId, styleId, name) {
  if (catId === "bakery") return `Artisanal Confections at ${name}`;
  if (catId === "restaurant") return `Culinary Dining at ${name}`;
  if (catId === "salon") return `Luxury Hair & Styling at ${name}`;
  if (catId === "electronics") return `Premium Gadget Innovations`;
  if (catId === "fashion") return `Boutique Clothing & Apparel`;
  if (catId === "grocery") return `Organic Produce Daily`;
  if (catId === "gym") return `Peak Physical Strength`;
  if (catId === "clinic") return `Empathetic Healthcare Care`;
  if (catId === "photography") return `Capturing Raw Moments`;
  return `Premium Tailored Solutions`;
}

function getHeroSubtitle(catId) {
  if (catId === "bakery") return "Indulge in award-winning cakes and pastries baked fresh daily.";
  if (catId === "restaurant") return "Experience exquisite fine dining curated by master chefs in Pune.";
  if (catId === "salon") return "Bespoke hair styling and beauty treatments for your confidence.";
  if (catId === "electronics") return "Get the latest smart accessories and headphones at best prices.";
  if (catId === "fashion") return "Discover modern boutique clothing and premium apparel collections.";
  if (catId === "grocery") return "100% organic fruits, fresh vegetables, and local market goods.";
  if (catId === "gym") return "Achieve your peak transformation with certified coaching sessions.";
  if (catId === "clinic") return "Advanced patient care, modern dental scans, and family wellness.";
  if (catId === "photography") return "Capturing raw moments, wedding memories, and scenic travel frames.";
  if (catId === "freelancer") return "Professional custom software engineering and creative UI/UX designs.";
  return "Hand-crafted visually scan-friendly designs optimized for conversions.";
}

function getAboutDescription(catId) {
  if (catId === "bakery") return "For over a decade, we have combined natural slow-fermentation with organic local ingredients.";
  if (catId === "restaurant") return "We slow-simmer signature dishes using pure spices and fresh, local ingredients.";
  if (catId === "salon") return "We merge advanced European styling trends with organic skin formulations.";
  if (catId === "electronics") return "SiteForge Tech is Pune's authorized dealer for premium smart devices with warranty.";
  if (catId === "fashion") return "We curate limited edition luxury collections matching modern boutique trends.";
  if (catId === "grocery") return "We source fresh farm produce daily to guarantee pure organic nutrition.";
  if (catId === "gym") return "Our training decks offer Olympic compound gear frames and macro diet plans.";
  if (catId === "clinic") return "We coordinate sterile clinical checkups, dental surgeries, and pediatric consultation.";
  if (catId === "photography") return "We deliver HD wedding coverages, portrait shoots, and editorial landscape campaigns.";
  if (catId === "freelancer") return "We build high-performance Webflow/NextJS applications and copywriter assets.";
  return "We believe in standard-setting execution using eco-friendly resources and custom designs.";
}

function getAboutHighlights(catId) {
  if (catId === "bakery") return ["🎂 50+ Cake Designs", "🍰 Fresh Daily", "⭐ 4.9 Rating", "🚚 Same Day Delivery"];
  if (catId === "restaurant") return ["🍽️ Michelin Chef", "🍷 Private Cabins", "⭐ 4.8 Rating", "🛵 Express Takeaway"];
  if (catId === "salon") return ["💇 Expert Stylists", "💆 Skin Facials", "💅 Premium Brands", "📅 Slot Bookings"];
  if (catId === "electronics") return ["🎧 Hybrid ANC Rigs", "⌚ Smart Sync", "💳 Easy EMIs", "🛡️ Brand Warranty"];
  if (catId === "fashion") return ["👗 Boutique Rails", "👔 Premium Apparel", "👜 Accessories", "✨ New Collections"];
  if (catId === "grocery") return ["🍎 100% Organic", " Broccoli Farm Fresh", "🥚 Local Markets", "🚚 Daily Delivery"];
  if (catId === "gym") return ["🏋️ Strength Rigs", "💪 Personal Coach", "🥗 Custom Macros", "📊 Caliper Audits"];
  if (catId === "clinic") return ["🦷 Dental Scan", "🩺 Expert Doctors", "🏥 ISO Sterile", "💳 Insurance Claims"];
  if (catId === "photography") return ["📷 Premium Lenses", "👰 Wedding shoots", "✈️ Travel snaps", "🖼️ Portrait studio"];
  if (catId === "freelancer") return ["💻 React / NextJS", "🎨 Custom UI/UX", "📝 Copywriting", "🚀 Fast Delivery"];
  return ["⭐ 4.9 Reviews", "🚚 Quick Shipping", "🤝 Certified Support", "📞 WhatsApp Assist"];
}

function getServicesList(catId) {
  const generic = [
    { name: "Expert Consultations", description: "Direct advisory sessions.", icon: "Sparkles" },
    { name: "WhatsApp Delivery", description: "Settle orders instantly.", icon: "Clock" },
    { name: "Manufacturer Warranty", description: "Official replacement care.", icon: "ShieldCheck" }
  ];
  if (catId === "bakery") return [
    { name: "Designer Party Cakes", description: "Custom multi-tier celebration cakes.", icon: "Cake" },
    { name: "Warm Pastry Treats", description: "Fresh croissants & butter pastries.", icon: "Cookie" },
    { name: "Artisan Breads", description: "Wild-yeast slow-fermentation boules.", icon: "Flame" }
  ];
  if (catId === "salon") return [
    { name: "Trend Haircuts", description: "Modern crops, colors, & balayage.", icon: "Scissors" },
    { name: "Facial Skin Care", description: "Deep hydration and organic scrubs.", icon: "Sparkles" },
    { name: "HD Bridal Makeup", description: "Full airbrush saree draping styling.", icon: "Calendar" }
  ];
  if (catId === "restaurant") return [
    { name: "Clay Oven Grills", description: "Smoky paneer tikka & skewers.", icon: "Flame" },
    { name: "Private Dining", description: "Temperature acoustic private cabins.", icon: "GlassWater" },
    { name: "Counter Takeaway", description: "Order online, pick up in 15m.", icon: "ShoppingBag" }
  ];
  if (catId === "gym") return [
    { name: "Compound Lifts", description: "Barbell drills & strength training.", icon: "Dumbbell" },
    { name: "Stamina HIIT", description: "Rowers, box pads, metabolic loops.", icon: "Activity" },
    { name: "Diet Macros", description: "Macro sheets and caliper records.", icon: "Utensils" }
  ];
  if (catId === "electronics") return [
    { name: "ANC Audio Auditioning", description: "Audition headphones live.", icon: "Headphones" },
    { name: "Smart Home Setup", description: "Camera integration & smart plugs.", icon: "Cpu" },
    { name: "Manufacturer Care", description: "Warranty replacement desk support.", icon: "ShieldCheck" }
  ];
  return generic;
}

function getMenuCategories(catId) {
  if (catId === "bakery") return [
    {
      name: "Fresh Bakes",
      items: [
        { name: "Sourdough Boule", price: "Rs. 180", tags: ["Veg", "Bestseller"], desc: "Crunchy leavened sourdough." },
        { name: "Butter Croissant", price: "Rs. 130", tags: ["Veg"], desc: "Flaky puff pastry croissant." }
      ]
    },
    {
      name: "Desserts",
      items: [
        { name: "Chocolate Truffle Cake", price: "Rs. 699", tags: ["Eggless", "Bestseller"], desc: "Dark Belgian cocoa layers." },
        { name: "Red Velvet Slice", price: "Rs. 140", tags: ["Eggless"], desc: "Topped with sweet cream cheese." }
      ]
    }
  ];
  return [
    {
      name: "Tandoor Starters",
      items: [
        { name: "Kasturi Paneer Tikka", price: "Rs. 320", tags: ["Veg", "Chef Special"], desc: "Paneer grilled in fenugreek cream." },
        { name: "Tandoori Mushrooms", price: "Rs. 280", tags: ["Veg"], desc: "Stuffed with grilled cottage cheese." }
      ]
    },
    {
      name: "Main Classics",
      items: [
        { name: "Butter Chicken Masala", price: "Rs. 390", tags: ["Non-Veg", "Bestseller"], desc: "Shredded chicken in buttery tomato velvet." },
        { name: "Awadhi Dum Biryani", price: "Rs. 290", tags: ["Veg"], desc: "Basmati rice cooked slow on dum." }
      ]
    }
  ];
}

function getBookingFields(catId) {
  const common = [
    { label: "Your Name", type: "text", placeholder: "E.g. Siddharth" },
    { label: "WhatsApp Number", type: "tel", placeholder: "E.g. +91 98765 43210" }
  ];
  if (catId === "salon") return [
    ...common,
    { label: "Select Service", type: "select", options: ["Precision Haircut & Style", "Deep Dermal Skin Facial", "HD Bridal Makeup Package", "Keratin Smoothing Therapy"] }
  ];
  if (catId === "clinic") return [
    ...common,
    { label: "Clinic Slot", type: "select", options: ["General Medical Checkup", "Orthodontic Dental Scan", "Physiotherapy Session", "Wellness Spa Consultation"] }
  ];
  return [
    ...common,
    { label: "Guests Number", type: "number", placeholder: "E.g. 4 Guests" },
    { label: "Dining Cabins", type: "select", options: ["Main Dining Hall", "Private Family Cabin", "Open Air Sky Terrace"] }
  ];
}

function getProductsList(catId, images, offset) {
  const imgA = images[(offset + 2) % images.length];
  const imgB = images[(offset + 3) % images.length];

  if (catId === "electronics") return [
    { name: "Wireless Pro Headphones", price: "Rs. 6,499", description: "Hybrid active noise cancelling ANC.", image: imgA },
    { name: "Amoled Active Smartwatch", price: "Rs. 3,299", description: "Curved display with oxygen tracker.", image: imgB }
  ];
  if (catId === "grocery") return [
    { name: "Fresh Kashmir Apples (1kg)", price: "Rs. 240", description: "Crisp red apples harvested fresh.", image: imgA },
    { name: "Organic Cold-Pressed Oil", price: "Rs. 195", description: "Pure mustard seed cooking oil.", image: imgB }
  ];
  if (catId === "fashion") return [
    { name: "Slim Fit Linen Shirt", price: "Rs. 1,899", description: "100% organic cotton fabrics.", image: imgA },
    { name: "Premium Leather Belt", price: "Rs. 999", description: "Handmade belt with silver buckle.", image: imgB }
  ];
  return [
    { name: "Signature Collection Box", price: "Rs. 1,499", description: "Curated catalog items highly rated.", image: imgA },
    { name: "Bestseller Starter Pack", price: "Rs. 899", description: "Coordinated sets perfect for gifting.", image: imgB }
  ];
}

function getTestimonialsList(catId) {
  return [
    { name: "Neha Deshmukh", role: "Pune Local", content: "Exceptional quality. Quick support over WhatsApp. Highly recommend this brand!", rating: 5, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" },
    { name: "Vikram Malhotra", role: "Resident Manager", content: "They maintain high professional standards. Materials feel premium. Five stars!", rating: 5, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" }
  ];
}

function getFaqList(catId) {
  return [
    { question: "What are your operational timings?", answer: "Open from 9:30 AM to 8:30 PM, Monday through Saturday." },
    { question: "Do you deliver in Pune?", answer: "Yes, fast doorstep delivery using local courier riders." }
  ];
}
