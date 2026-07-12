const axios = require("axios");
const crypto = require("crypto");

// In-memory cache for search queries
const imageCache = new Map();
let sessionCookies = "";

function getProductSearchQuery(name, industry) {
  const n = name.toLowerCase();
  const ind = (industry || "").toLowerCase();

  // Bakery
  if (ind.includes("bakery") || ind.includes("cake") || ind.includes("sweet")) {
    if (n.includes("cupcake")) return "cupcake bakery";
    if (n.includes("croissant")) return "croissant bakery";
    if (n.includes("cookie") || n.includes("cookies")) return "cookies bakery";
    if (n.includes("cake") || n.includes("gateau")) return "bakery cake";
    if (n.includes("bread") || n.includes("sourdough")) return "artisan bread";
    if (n.includes("pastry") || n.includes("pastries")) return "pastry bakery";
    if (n.includes("donut") || n.includes("donuts")) return "donut bakery";
    return "bakery cake"; // Default bakery
  }

  // Restaurant
  if (ind.includes("restaurant") || ind.includes("cafe") || ind.includes("food") || ind.includes("dine")) {
    if (n.includes("chef") || n.includes("cook")) return "professional chef";
    if (n.includes("interior") || n.includes("dining") || n.includes("room") || n.includes("table")) return "restaurant interior";
    return "restaurant food"; // Default restaurant
  }

  // Salon
  if (ind.includes("salon") || ind.includes("spa") || ind.includes("hair") || ind.includes("beauty")) {
    if (n.includes("hair")) return "hair salon";
    if (n.includes("spa") || n.includes("massage")) return "spa luxury";
    if (n.includes("makeup") || n.includes("beauty") || n.includes("facial") || n.includes("treatment")) return "beauty treatment";
    return "beauty treatment"; // Default salon
  }

  // Electronics
  if (ind.includes("elect") || ind.includes("phone") || ind.includes("gadg") || ind.includes("hardware")) {
    if (n.includes("keyboard")) return "mechanical keyboard";
    if (n.includes("laptop") || n.includes("computer") || n.includes("pc")) return "modern laptop";
    if (n.includes("headphone") || n.includes("headphones") || n.includes("earphone") || n.includes("audio")) return "wireless headphones";
    return "modern laptop"; // Default electronics
  }

  // Fashion
  if (ind.includes("fashion") || ind.includes("cloth") || ind.includes("boutique") || ind.includes("wear")) {
    if (n.includes("luxury") || n.includes("designer") || n.includes("premium")) return "designer clothing";
    return "fashion boutique"; // Default fashion
  }

  // Gym
  if (ind.includes("gym") || ind.includes("fit")) {
    if (n.includes("trainer") || n.includes("coach") || n.includes("instructor")) return "fitness trainer";
    if (n.includes("equipment") || n.includes("dumbbell") || n.includes("barbell") || n.includes("weight")) return "gym equipment";
    return "gym workout"; // Default gym
  }

  // Fallback keyword search queries if none match
  if (n.includes("cake")) return "bakery cake";
  if (n.includes("cupcake")) return "cupcake bakery";
  if (n.includes("croissant")) return "croissant bakery";
  if (n.includes("bread")) return "artisan bread";
  if (n.includes("cookie")) return "cookies bakery";
  if (n.includes("pastry")) return "pastry bakery";
  if (n.includes("donut")) return "donut bakery";
  if (n.includes("hair")) return "hair salon";
  if (n.includes("spa")) return "spa luxury";
  if (n.includes("beauty") || n.includes("facial")) return "beauty treatment";
  if (n.includes("keyboard")) return "mechanical keyboard";
  if (n.includes("laptop")) return "modern laptop";
  if (n.includes("headphone")) return "wireless headphones";
  if (n.includes("clothing")) return "fashion boutique";
  if (n.includes("workout")) return "gym workout";
  if (n.includes("trainer")) return "fitness trainer";
  if (n.includes("equipment") || n.includes("weights")) return "gym equipment";

  return `${industry} product`; // Generic search
}

function parseCookies(headers) {
  const cookieMap = {};
  if (!headers) return cookieMap;
  for (const h of headers) {
    const pair = h.split(";")[0];
    const index = pair.indexOf("=");
    if (index !== -1) {
      const key = pair.slice(0, index).trim();
      const val = pair.slice(index + 1).trim();
      cookieMap[key] = val;
    }
  }
  return cookieMap;
}

function solvePoW(randomData, difficulty) {
  let nonce = 0;
  const p = Math.floor(difficulty / 2);
  const u = difficulty % 2 !== 0;

  while (true) {
    const hash = crypto.createHash("sha256").update(randomData + nonce).digest();
    
    let isMatch = true;
    for (let s = 0; s < p; s++) {
      if (hash[s] !== 0) {
        isMatch = false;
        break;
      }
    }
    
    if (isMatch && u && (hash[p] >> 4) !== 0) {
      isMatch = false;
    }

    if (isMatch) {
      return { hash: hash.toString("hex"), nonce };
    }
    nonce++;
  }
}

async function searchUnsplashImages(query) {
  const normalizedQuery = query.trim().toLowerCase();
  
  // Check cache first
  if (imageCache.has(normalizedQuery)) {
    const cached = imageCache.get(normalizedQuery);
    if (cached && cached.length > 0) {
      console.log(`[Unsplash Engine] Cache hit for query: "${normalizedQuery}"`);
      return cached;
    }
  }

  console.log(`[Unsplash Engine] Cache miss for query: "${normalizedQuery}". Fetching...`);
  let urls = [];

  const apiKey = process.env.UNSPLASH_ACCESS_KEY || process.env.UNSPLASH_CLIENT_ID;
  if (apiKey && !apiKey.includes("placeholder")) {
    try {
      console.log(`[Unsplash Engine] Querying official Unsplash API for: "${normalizedQuery}"`);
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: normalizedQuery,
          per_page: 30,
          orientation: "landscape"
        },
        headers: {
          Authorization: `Client-ID ${apiKey}`
        }
      });
      if (response.data && Array.isArray(response.data.results)) {
        urls = response.data.results.map((img) => img.urls.raw);
      }
    } catch (err) {
      console.error("[Unsplash Engine] Official Unsplash API failed, falling back to scraper:", err.message);
    }
  }

  // Fallback to web search scraper
  if (urls.length === 0) {
    try {
      console.log(`[Unsplash Engine] Scraping public Unsplash page for: "${normalizedQuery}"`);
      const searchUrl = `https://unsplash.com/s/photos/${encodeURIComponent(normalizedQuery)}`;
      
      const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      };
      if (sessionCookies) {
        headers["Cookie"] = sessionCookies;
      }

      let response;
      try {
        response = await axios.get(searchUrl, { headers });
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.log("[Unsplash Engine] 401 Unauthorized. Solving BotStopper challenge...");
          const responseHtml = err.response.data;
          const initialCookieHeaders = err.response.headers["set-cookie"] || [];
          const initialCookieMap = parseCookies(initialCookieHeaders);

          // Parse challenge data from HTML
          const challengeRegex = /<script id="anubis_challenge" type="application\/json">([\s\S]*?)<\/script>/;
          const challengeMatch = responseHtml.match(challengeRegex);
          if (!challengeMatch) {
            throw new Error("Could not find anubis_challenge script tag in HTML.");
          }

          const challengeData = JSON.parse(challengeMatch[1]);
          const { challenge, rules } = challengeData;
          const startTime = Date.now();
          const { hash, nonce } = solvePoW(challenge.randomData, rules.difficulty);
          const elapsedTime = Date.now() - startTime;

          // Build cookies to send to pass-challenge endpoint
          const initialCookiesStr = Object.entries(initialCookieMap)
            .map(([k, v]) => `${k}=${v}`)
            .join("; ");

          const passUrl = `https://unsplash.com/.within.website/x/cmd/anubis/api/pass-challenge`;
          const passResponse = await axios.get(passUrl, {
            params: {
              id: challenge.id,
              response: hash,
              nonce: nonce,
              redir: searchUrl,
              elapsedTime: elapsedTime
            },
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
              "Cookie": initialCookiesStr
            },
            maxRedirects: 0,
            validateStatus: (status) => status >= 200 && status < 400
          });

          const passCookies = passResponse.headers["set-cookie"] || [];
          const passCookieMap = parseCookies(passCookies);

          // Merge cookie maps (new cookies overwrite old ones)
          const finalCookieMap = { ...initialCookieMap, ...passCookieMap };
          
          // Clean up empty ones
          sessionCookies = Object.entries(finalCookieMap)
            .filter(([_, v]) => v !== "")
            .map(([k, v]) => `${k}=${v}`)
            .join("; ");

          console.log("[Unsplash Engine] Challenge solved successfully. Retrying search...");
          headers["Cookie"] = sessionCookies;
          response = await axios.get(searchUrl, { headers });
        } else {
          throw err;
        }
      }

      const html = response.data;
      const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g;
      const matches = html.match(regex) || [];
      // De-duplicate matches
      urls = Array.from(new Set(matches));
    } catch (err) {
      console.error("[Unsplash Engine] Unsplash scraper failed:", err.message);
    }
  }

  // Clean URLs & append crop limits (fit=crop, w=1200, h=800)
  const cleanedUrls = urls.map(url => {
    const baseUrl = url.split("?")[0];
    return `${baseUrl}?auto=format&fit=crop&w=1200&h=800&q=80`;
  });

  if (cleanedUrls.length > 0) {
    imageCache.set(normalizedQuery, cleanedUrls);
  }

  return cleanedUrls;
}

module.exports = {
  getProductSearchQuery,
  searchUnsplashImages
};
