const axios = require('axios');

const BACKEND_URL = 'http://localhost:5000/api';

async function runSecurityAudit() {
  console.log("==================================================");
  console.log("   RUNNING AUTHENTICATION SECURITY AUDIT TESTS     ");
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

  try {
    // -------------------------------------------------------------------------
    // Scenario 1: Correct email & correct password -> Login success with JWT
    // -------------------------------------------------------------------------
    console.log("Scenario 1: Testing login with CORRECT email and password...");
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login`, {
        email: "test@example.com",
        password: "password123"
      });
      assert(res.status === 200, "Should return HTTP 200 OK");
      assert(res.data.success === true, "Should return success: true");
      assert(res.data.token && res.data.token.length > 20, "Should return signed JWT session token");
      assert(res.data.user.email === "test@example.com", "Should return authenticated user email");
      assert(res.data.user.id === "user_test123", "Should return correct user ID");
    } catch (err) {
      assert(false, `Correct login failed: ${err.message}`);
    }

    // -------------------------------------------------------------------------
    // Scenario 2: Correct email & wrong password -> Login blocked, generic error, no JWT
    // -------------------------------------------------------------------------
    console.log("\nScenario 2: Testing login with CORRECT email but INCORRECT password...");
    try {
      await axios.post(`${BACKEND_URL}/auth/login`, {
        email: "test@example.com",
        password: "wrong-password-999"
      });
      assert(false, "Login with wrong password should have failed");
    } catch (err) {
      assert(err.response && err.response.status === 401, "Should return HTTP 401 Unauthorized");
      assert(err.response.data.success === false, "Should return success: false");
      assert(err.response.data.error === "Invalid email or password.", `Should return generic error: "${err.response.data.error}"`);
      assert(!err.response.data.token, "Should NOT generate JWT token upon failure");
    }

    // -------------------------------------------------------------------------
    // Scenario 3: Unregistered email & any password -> Login blocked, generic error, no JWT
    // -------------------------------------------------------------------------
    console.log("\nScenario 3: Testing login with UNREGISTERED email...");
    try {
      await axios.post(`${BACKEND_URL}/auth/login`, {
        email: "not-registered-hacker@attacker.com",
        password: "any-password"
      });
      assert(false, "Login with unregistered email should have failed");
    } catch (err) {
      assert(err.response && err.response.status === 401, "Should return HTTP 401 Unauthorized");
      assert(err.response.data.success === false, "Should return success: false");
      assert(err.response.data.error === "Invalid email or password.", `Should return generic enumeration-safe error: "${err.response.data.error}"`);
      assert(!err.response.data.token, "Should NOT generate JWT token upon failure");
    }

    // -------------------------------------------------------------------------
    // Scenario 4: User signup, hashing, and token issuing flow
    // -------------------------------------------------------------------------
    console.log("\nScenario 4: Testing hashing & token issuing flow during new user signup...");
    const testEmail = `new-user-${Math.floor(Math.random() * 100000)}@siteforge.com`;
    const testPassword = "securePassword789!";
    let registeredUser = null;
    let registrationToken = null;

    try {
      const res = await axios.post(`${BACKEND_URL}/auth/signup`, {
        name: "Security Merchant",
        email: testEmail,
        password: testPassword
      });
      assert(res.status === 201, "Signup should return HTTP 201 Created");
      assert(res.data.success === true, "Signup should return success: true");
      assert(res.data.user.email === testEmail, "Should return correct registered email");
      assert(res.data.token && res.data.token.length > 20, "Signup should immediately issue signed JWT token");
      assert(res.data.user.password !== testPassword, "Stored password in database MUST NOT be plain-text");
      assert(res.data.user.password.length === 64, `Stored password MUST be secure SHA-256 hash (64 hex characters)`);
      
      registeredUser = res.data.user;
      registrationToken = res.data.token;
    } catch (err) {
      assert(false, `Signup flow failed: ${err.message}`);
    }

    // Verify the newly registered user can login with their credentials
    if (registeredUser) {
      console.log("\nScenario 5: Verifying login for the newly registered hashed user...");
      try {
        const res = await axios.post(`${BACKEND_URL}/auth/login`, {
          email: testEmail,
          password: testPassword
        });
        assert(res.status === 200, "Hashed user login should return HTTP 200 OK");
        assert(res.data.success === true, "Should return success: true");
        assert(res.data.token && res.data.token.length > 20, "Should successfully return signed JWT token");
      } catch (err) {
        assert(false, `Newly hashed user login failed: ${err.message}`);
      }
    }

  } catch (err) {
    console.error("Security audit test execution aborted due to unexpected error:", err.message);
  }

  console.log("\n==================================================");
  console.log(` SECURITY AUDIT COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");
}

runSecurityAudit();
