const axios = require('axios');

async function testPexels() {
  const query = 'nature';
  const apiKey = 'bNr4meMXDKM8uaUF4JaMj2i5sIguPbSOcKEOe6kkIcrfA3FdrBIZSfzW';

  try {
    const res = await axios.get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=40&orientation=landscape`, {
      headers: {
        Authorization: apiKey,
      },
    });

    console.log("=== HTTP STATUS ===");
    console.log(res.status);
    
    console.log("\n=== EXACT PEXELS API RESPONSE ===");
    console.log(JSON.stringify(res.data, null, 2));

    console.log("\n=== REMAINING QUOTA (HEADERS) ===");
    console.log(res.headers);

  } catch (error) {
    console.log("=== HTTP STATUS ===");
    console.log(error.response ? error.response.status : "No Response");
    
    console.log("\n=== ERROR RESPONSE ===");
    console.log(error.message);

    if (error.response) {
      console.log("\n=== EXACT PEXELS API RESPONSE ===");
      console.log(JSON.stringify(error.response.data, null, 2));

      console.log("\n=== REMAINING QUOTA (HEADERS) ===");
      console.log(JSON.stringify(error.response.headers, null, 2));
    }
  }
}

testPexels();
