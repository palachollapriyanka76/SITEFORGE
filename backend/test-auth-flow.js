const axios = require('axios');

const BACKEND_URL = 'http://localhost:5000/api';

// Utility helper to generate test JWT token
const generateSandboxTokens = (email, name, emailVerified, isValid = true) => {
  const header = Buffer.from(JSON.stringify({ alg: "RS256", kid: "sandbox-kid" })).toString('base64')
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  
  const payload = Buffer.from(JSON.stringify({
    iss: "https://accounts.google.com",
    sub: `sandbox_sub_${email.split("@")[0]}`,
    email: email,
    email_verified: emailVerified,
    name: name || email.split("@")[0],
    aud: "sandbox-client-id",
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000),
    is_sandbox: isValid
  })).toString('base64').replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  
  const signature = isValid ? "valid-sandbox-signature" : "invalid-signature";
  const idToken = `${header}.${payload}.${signature}`;
  const accessToken = `sandbox-token-${Buffer.from(JSON.stringify({ email, email_verified: emailVerified, is_sandbox: isValid })).toString('base64')}`;
  
  return { idToken, accessToken };
};

async function runTests() {
  console.log("==================================================");
  console.log("   RUNNING GOOGLE AUTHENTICATION INTEGRATION TESTS   ");
  console.log("==================================================\n");

  let passed = 0;
  let failed = 0;

  const assert = (condition, message) => {
    if (condition) {
      passed++;
      console.log(`✅ [PASS] ${message}`);
    } else {
      failed++;
      console.log(`❌ [FAIL] ${message}`);
    }
  };

  // Test Case 1: Create a new user with a new Google Account
  try {
    console.log("Scenario 1: Testing New Google Account registration...");
    const email = "alex.siteforge@gmail.com";
    const { idToken, accessToken } = generateSandboxTokens(email, "Alex SiteForge", true, true);

    const response = await axios.post(`${BACKEND_URL}/auth/google`, {
      access_token: accessToken,
      id_token: idToken
    });

    assert(response.status === 200, "Should return HTTP 200 OK");
    assert(response.data.success === true, "Should return success: true");
    assert(response.data.token && response.data.token.length > 20, "Should return signed JWT session token");
    assert(response.data.user.email === email, `Should return correct user email: ${email}`);
    assert(response.data.user.id.startsWith("user_"), `Should return generated user ID format: ${response.data.user.id}`);
    
    const userId1 = response.data.user.id;

    // Test Case 2: Log in the existing user
    console.log("\nScenario 2: Testing Login with existing Google Account...");
    const response2 = await axios.post(`${BACKEND_URL}/auth/google`, {
      access_token: accessToken,
      id_token: idToken
    });

    assert(response2.status === 200, "Should return HTTP 200 OK");
    assert(response2.data.success === true, "Should return success: true");
    assert(response2.data.token && response2.data.token.length > 20, "Should return signed JWT session token for existing user");
    assert(response2.data.user.id === userId1, "Should return the existing user ID (not create duplicate)");

    // Test Case 3: Reject Login if token signature is invalid
    console.log("\nScenario 3: Testing Rejection of Invalid Token Signature...");
    const { idToken: badToken, accessToken: badAccess } = generateSandboxTokens("hacker@bad.com", "Hacker", true, false);

    try {
      await axios.post(`${BACKEND_URL}/auth/google`, {
        access_token: badAccess,
        id_token: badToken
      });
      assert(false, "Should have failed with HTTP 401");
    } catch (err) {
      assert(err.response && err.response.status === 401, `Should fail with HTTP 401 Unauthorized (Got: ${err.response?.status})`);
      assert(err.response && err.response.data.error.includes("Invalid signature"), `Should return clear signature error: "${err.response?.data.error}"`);
    }

    // Test Case 4: Reject Login if email is not verified by Google
    console.log("\nScenario 4: Testing Rejection of Unverified Email...");
    const { idToken: unverifiedToken, accessToken: unverifiedAccess } = generateSandboxTokens("unverified@gmail.com", "Unverified User", false, true);

    try {
      await axios.post(`${BACKEND_URL}/auth/google`, {
        access_token: unverifiedAccess,
        id_token: unverifiedToken
      });
      assert(false, "Should have failed with HTTP 401");
    } catch (err) {
      assert(err.response && err.response.status === 401, `Should fail with HTTP 401 Unauthorized (Got: ${err.response?.status})`);
      assert(err.response && err.response.data.error.includes("Email not verified"), `Should return clear verification error: "${err.response?.data.error}"`);
    }

  } catch (err) {
    console.error("Test execution failed due to connection/server error:", err.message);
  }

  console.log("\n==================================================");
  console.log(` TESTS RUN COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");
}

runTests();
