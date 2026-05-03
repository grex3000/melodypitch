import { chromium } from 'playwright';

async function testLogoutButton() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('\n🔐 Testing Logout Button Flow\n');
    
    // Step 1: Login
    console.log('Step 1: Login as LABEL user');
    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });
    await page.fill('input[name="email"]', 'label-test@melodypitch.test');
    await page.fill('input[name="password"]', 'LabelTest123!');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(3000);
    console.log(`  ✅ Logged in`);

    // Step 2: Access dashboard
    console.log('\nStep 2: Access dashboard');
    await page.goto('http://localhost:3000/label/dashboard', { waitUntil: 'domcontentloaded' });
    console.log(`  ✅ On dashboard: ${page.url()}`);
    
    // Check for logout button
    const logoutBtn = await page.locator('button:has-text("Sign out")');
    const exists = await logoutBtn.isVisible().catch(() => false);
    console.log(`  ✅ Logout button visible: ${exists}`);

    // Step 3: Click logout button
    if (exists) {
      console.log('\nStep 3: Click logout button');
      await logoutBtn.click();
      
      console.log(`  🔄 Waiting for redirect...`);
      await page.waitForTimeout(2000);
      
      const finalUrl = page.url();
      console.log(`  📍 Final URL: ${finalUrl}`);

      if (finalUrl.includes('/login')) {
        console.log(`  ✅ Redirected to login page`);
        
        // Step 4: Verify session cleared
        console.log('\nStep 4: Try to access dashboard without logging back in');
        await page.goto('http://localhost:3000/label/dashboard', { waitUntil: 'domcontentloaded', timeout: 5000 });
        const afterLogoutUrl = page.url();
        console.log(`  📍 URL: ${afterLogoutUrl}`);
        
        if (afterLogoutUrl.includes('/login')) {
          console.log(`  ✅ Redirected to login (session cleared)`);
          console.log(`\n✅ LOGOUT BUTTON TEST PASSED\n`);
          return true;
        } else {
          console.log(`  ❌ Still accessible without login`);
          return false;
        }
      } else {
        console.log(`  ❌ Not redirected to login. URL: ${finalUrl}`);
        return false;
      }
    } else {
      console.log('  ❌ Logout button not found');
      return false;
    }

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

const result = await testLogoutButton();
process.exit(result ? 0 : 1);
