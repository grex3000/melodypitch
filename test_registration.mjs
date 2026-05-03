import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('🧪 Testing account registration on melodypitch.com...\n');
  
  try {
    // Navigate to register page
    console.log('📍 Going to /register...');
    await page.goto('https://melodypitch.com/register', { waitUntil: 'networkidle' });
    
    // Fill in form
    console.log('✏️  Filling out registration form...');
    await page.fill('input[name="name"]', 'Test User ' + Date.now());
    await page.fill('input[name="email"]', `testuser${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'TestPass123!');
    await page.selectOption('select[name="role"]', 'SONGWRITER');
    
    // Submit form
    console.log('🚀 Submitting form...');
    await page.click('button[type="submit"]');
    
    // Wait for response
    await page.waitForTimeout(3000);
    
    // Check if we got an error or success
    const errorMsg = await page.$('.text-error');
    const successMsg = await page.$('.text-success');
    const currentUrl = page.url();
    
    if (errorMsg) {
      const errorText = await errorMsg.textContent();
      console.log('❌ ERROR:', errorText);
    } else if (successMsg) {
      const successText = await successMsg.textContent();
      console.log('✅ SUCCESS:', successText);
    } else if (currentUrl.includes('/login')) {
      console.log('✅ REDIRECTED TO LOGIN - Account created successfully!');
    } else {
      console.log('⚠️  Unexpected state. URL:', currentUrl);
      console.log('Page content:', await page.content());
    }
    
  } catch (err) {
    console.error('💥 Test failed:', err.message);
  } finally {
    await browser.close();
  }
})();
