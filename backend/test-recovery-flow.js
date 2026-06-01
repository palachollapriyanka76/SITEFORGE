const axios = require('axios');

const BACKEND_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log("==================================================");
  console.log("   RUNNING PASSWORD RECOVERY API INTEGRATION TESTS  ");
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
    // Scenario 1: Recovery Request & Verification Hook
    // -------------------------------------------------------------------------
    console.log("Scenario 1: Testing recovery request for a valid registered email...");
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/forgot-password`, {
        email: "test@example.com"
      });
      assert(res.status === 200, "Should return HTTP 200 OK");
      assert(res.data.success === true, "Should return success: true");
    } catch (err) {
      assert(false, `Valid recovery request failed: ${err.message}`);
    }

    // -------------------------------------------------------------------------
    // Scenario 2: Retrieve Token & Verify
    // -------------------------------------------------------------------------
    console.log("\nScenario 2: Retrieving dev-token hook and verifying token validity...");
    let unhashedToken = "";
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/test/latest-token`);
      assert(res.status === 200, "Should successfully fetch token from development backdoor hook");
      assert(res.data.token && res.data.token.length === 64, `Should return valid 64-character hex token`);
      unhashedToken = res.data.token;
      
      // Hit verification endpoint
      const verifyRes = await axios.get(`${BACKEND_URL}/auth/reset-password/${unhashedToken}`);
      assert(verifyRes.status === 200, "GET /api/auth/reset-password/:token should return HTTP 200 for active token");
      assert(verifyRes.data.valid === true, "Should verify token as valid: true");
    } catch (err) {
      assert(false, `Dev token verification failed: ${err.message}`);
    }

    // -------------------------------------------------------------------------
    // Scenario 3: Update Password (Weak & Strong)
    // -------------------------------------------------------------------------
    console.log("\nScenario 3: Resetting password using the retrieved token...");
    
    // Weak password rejection
    try {
      await axios.post(`${BACKEND_URL}/auth/reset-password/${unhashedToken}`, {
        password: "weak"
      });
      assert(false, "Weak password update should fail");
    } catch (err) {
      assert(err.response && err.response.status === 400, "Should return HTTP 400 Bad Request for weak password");
      assert(err.response.data.error.includes("8 characters"), "Should return password length validation error");
    }

    // Strong password success
    try {
      const resetRes = await axios.post(`${BACKEND_URL}/auth/reset-password/${unhashedToken}`, {
        password: "newSecurePassword123!"
      });
      assert(resetRes.status === 200, "Should successfully reset password with strong input");
      assert(resetRes.data.success === true, "Should return success: true");
      assert(resetRes.data.message.includes("successfully"), "Should return success message");
    } catch (err) {
      assert(false, `Password update failed: ${err.message}`);
    }

    // -------------------------------------------------------------------------
    // Scenario 4: revoking token (Single-Use Check)
    // -------------------------------------------------------------------------
    console.log("\nScenario 4: Enforcing single-use security constraint (Revocation check)...");
    try {
      await axios.get(`${BACKEND_URL}/auth/reset-password/${unhashedToken}`);
      assert(false, "Used token check should have failed");
    } catch (err) {
      assert(err.response && err.response.status === 400, "GET on used token should return HTTP 400 Bad Request");
      assert(err.response.data.valid === false, "Should return valid: false");
    }

    try {
      await axios.post(`${BACKEND_URL}/auth/reset-password/${unhashedToken}`, {
        password: "anotherNewPassword123!"
      });
      assert(false, "Used token reset should have failed");
    } catch (err) {
      assert(err.response && err.response.status === 400, "POST on used token should return HTTP 400 Bad Request");
      assert(err.response.data.error.includes("invalid or has expired"), "Should return invalid/expired error message");
    }

    // -------------------------------------------------------------------------
    // Scenario 5: User Enumeration Protection
    // -------------------------------------------------------------------------
    console.log("\nScenario 5: Testing recovery request for an unregistered email (Enumeration Attack)...");
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/forgot-password`, {
        email: "hacker-enumerator@notexists.com"
      });
      assert(res.status === 200, "Should return HTTP 200 OK");
      assert(res.data.success === true, "Should return success: true (prevent enumeration)");
      assert(res.data.message.includes("sent"), "Should return standard generic message");
    } catch (err) {
      assert(false, `Enumeration protection request failed: ${err.message}`);
    }

    // -------------------------------------------------------------------------
    // Scenario 6: Input Email Format Validation
    // -------------------------------------------------------------------------
    console.log("\nScenario 6: Testing email input validation format...");
    try {
      await axios.post(`${BACKEND_URL}/auth/forgot-password`, {
        email: "invalid-email-format"
      });
      assert(false, "Should have failed with HTTP 400");
    } catch (err) {
      assert(err.response && err.response.status === 400, `Should fail with HTTP 400 Bad Request (Got: ${err.response?.status})`);
      assert(err.response.data.error.includes("valid email"), "Should return email format validation error message");
    }

    // -------------------------------------------------------------------------
    // Scenario 7: Rate Limiting
    // -------------------------------------------------------------------------
    console.log("\nScenario 7: Testing password reset rate limiter...");
    console.log("Firing consecutive requests to trigger the rate limiter (Limit: 5 requests inside 15 min)...");
    
    // We already fired 2 forgot-password requests (S1, S5).
    // Let's fire 4 more requests to trigger the limit.
    let rateLimitTriggered = false;
    for (let i = 0; i < 5; i++) {
      try {
        const res = await axios.post(`${BACKEND_URL}/auth/forgot-password`, {
          email: "test@example.com"
        });
        console.log(`  Request ${i + 3}: Success (Status ${res.status})`);
      } catch (err) {
        if (err.response && err.response.status === 429) {
          rateLimitTriggered = true;
          console.log(`  Request ${i + 3}: Blocked by Rate Limiter! (Status 429)`);
          assert(err.response.data.error.includes("recently requested"), `Should return rate limit error: "${err.response.data.error}"`);
          break;
        } else {
          console.log(`  Request ${i + 3}: Failed with unexpected error: ${err.message}`);
        }
      }
    }
    assert(rateLimitTriggered, "Rate limiter should have successfully triggered and blocked requests (HTTP 429)");

  } catch (err) {
    console.error("Test execution aborted due to unexpected error:", err.message);
  }

  console.log("\n==================================================");
  console.log(` TESTS RUN COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");
}

runTests();
