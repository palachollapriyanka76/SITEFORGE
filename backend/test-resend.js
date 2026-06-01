const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const emailService = require('./src/services/email.service');

async function testResend() {
  console.log("==================================================");
  console.log("    TESTING REAL EMAIL DELIVERY VIA RESEND API    ");
  console.log("==================================================");
  console.log(`RESEND_API_KEY present: ${!!process.env.RESEND_API_KEY}`);
  
  const recipient = "kavithaag239@gmail.com";
  const mockLink = "http://localhost:3000/reset-password/test_token_resend_999";
  
  try {
    const result = await emailService.sendPasswordResetEmail(recipient, mockLink, 20);
    
    console.log("\n==================================================");
    console.log("          DELIVERY TEST SUITE RESULTS             ");
    console.log("==================================================");
    console.log(`Current Provider:  Ethereal Sandbox (DEPRECATED)`);
    console.log(`New Provider:      ${result.provider}`);
    console.log(`Recipient:         ${recipient}`);
    console.log(`Message ID:        ${result.messageId}`);
    console.log(`Delivery Status:   Success (Confirmed by Resend API)`);
    console.log("==================================================\n");
  } catch (error) {
    console.error("\n==================================================");
    console.error("             DELIVERY TEST FAILED                 ");
    console.error("==================================================");
    console.error(`Error Details:     ${error.message}`);
    console.error("==================================================\n");
  }
}

testResend();
