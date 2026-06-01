require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

console.log("==================================================");
console.log("     GOOGLE OAUTH CONFIGURATION AUDIT REPORT     ");
console.log("==================================================");

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const nextauthUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
const nextauthSecret = process.env.NEXTAUTH_SECRET;

console.log("\n--- ENVIRONMENT VARIABLE STATUS ---");
console.log(`* Client ID loaded?          : ${clientId ? "YES" : "NO — Set GOOGLE_CLIENT_ID in backend/.env"}`);
console.log(`* Secret loaded?             : ${clientSecret ? "YES" : "NO — Set GOOGLE_CLIENT_SECRET in backend/.env"}`);
console.log(`* Redirect URI used?         : ${nextauthUrl}/auth/callback`);
console.log(`* NextAuth URL configured?   : ${process.env.NEXTAUTH_URL ? "YES" : "NO (Defaults to http://localhost:3000)"}`);
console.log(`* NextAuth Secret configured?: ${nextauthSecret ? "YES" : "NO"}`);
console.log(`* OAuth provider initialized?: ${clientId && clientSecret ? "YES" : "NO — Google Sign In will be disabled on frontend"}`);

console.log("\n--- ENV FILE BEING USED ---");
console.log(`  Path: ${require('path').resolve(__dirname, '.env')}`);

console.log("\n--- MISSING SETUP STEPS ---");
const missing = [];
if (!clientId) missing.push("1. Go to https://console.cloud.google.com/apis/credentials");
if (!clientId) missing.push("2. Create OAuth 2.0 Client ID (Web Application)");
if (!clientId) missing.push("3. Set Authorized JavaScript Origins: http://localhost:3000");
if (!clientId) missing.push("4. Set Authorized Redirect URIs: http://localhost:3000/auth/callback");
if (!clientId) missing.push("5. Copy Client ID → GOOGLE_CLIENT_ID in backend/.env");
if (!clientId) missing.push("   Copy Client ID → NEXT_PUBLIC_GOOGLE_CLIENT_ID in frontend/.env");
if (!clientSecret) missing.push("6. Copy Client Secret → GOOGLE_CLIENT_SECRET in backend/.env");
if (!nextauthSecret) missing.push("7. Generate a random string → NEXTAUTH_SECRET in backend/.env");

if (missing.length === 0) {
  console.log("  ✅ All credentials configured. Google Sign In is ready.");
} else {
  missing.forEach(m => console.log(`  ❌ ${m}`));
}

console.log("\n==================================================");
console.log("              AUDIT COMPLETED SUCCESSFULLY        ");
console.log("==================================================\n");
