import { chromium } from 'playwright';

async function testFullFlow() {
  const browser = await chromium.launch({ headless: false });  // headless: false to see what's happening
  const page = await browser.newPage();

  try {
    console.log('\n🔐 FULL LOGIN & DASHBOARD FLOW TEST\n');
    
    console.log('Step 1: Navigate to login page');
    await page.goto('http://localhost:3000/login');
    console.log(`  URL: ${page.url()}`);

    console.log('\nStep 2: Fill in credentials');
    await page.fill('input[name="email"]', 'label-test@melodypitch.test');
    await page.fill('input[name="password"]', 'LabelTest123!');
    console.log(`  ✓ Credentials entered`);

    console.log('\nStep 3: Click submit button');
    await page.click('button[type="submit"]');
    console.log(`  ✓ Form submitted`);

    console.log('\nStep 4: Wait for navigation (any page)');
    try {
      await page.waitForLoadState('networkidle', { timeout: 5000 });
    } catch (e) {
      // Navigation might be fast
    }
    
    const finalUrl = page.url();
    console.log(`  Final URL: ${finalUrl}`);

    console.log('\nStep 5: Check where we ended up');
    if (finalUrl.includes('/label/dashboard')) {
      console.log(`  ✅ SUCCESS! On label dashboard`);
      return true;
    } else if (finalUrl.includes('/login')) {
      console.log(`  ❌ Redirected back to login (session not working)`);
    } else if (finalUrl.includes('/')) {
      console.log(`  ❌ Redirected to home page`);
    }

    console.log('\nStep 6: Try to manually navigate to dashboard');
    await page.goto('http://localhost:3000/label/dashboard');
    const dashboardUrl = page.url();
    console.log(`  After manual nav: ${dashboardUrl}`);

    if (dashboardUrl.includes('/label/dashboard')) {
      console.log(`  ✅ CAN ACCESS DASHBOARD`);
      return true;
    } else {
      console.log(`  ❌ CANNOT ACCESS DASHBOARD (redirected to ${dashboardUrl})`);
      return false;
    }

  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false;
  } finally {
    // Don't close yet - let me see what's on screen
    console.log('\n🛑 Browser window still open - manually close when ready');
    await page.waitForTimeout(5000);  // Keep browser open for 5 seconds
    await browser.close();
  }
}

await testFullFlow();
