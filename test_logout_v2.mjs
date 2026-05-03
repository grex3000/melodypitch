import { chromium } from 'playwright';

async function testLogout() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('\n🔐 Testing Logout Flow\n');
    
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
    await page.goto('http://localhost:3000/label/dashboard');
    console.log(`  ✅ Dashboard URL: ${page.url()}`);

    // Step 3: Directly navigate to logout endpoint
    console.log('\nStep 3: Navigate to logout endpoint');
    await page.goto('http://localhost:3000/api/auth/logout', { 
      method: 'POST',
      waitUntil: 'domcontentloaded' 
    });
    
    await page.waitForTimeout(2000);
    const finalUrl = page.url();
    console.log(`  📍 URL after logout: ${finalUrl}`);

    if (finalUrl.includes('/login')) {
      console.log(`  ✅ Redirected to login page`);
      
      // Step 4: Try to access dashboard again (should fail)
      console.log('\nStep 4: Try to access dashboard after logout');
      await page.goto('http://localhost:3000/label/dashboard', { 
        waitUntil: 'domcontentloaded',
        timeout: 5000 
      });
      const afterLogoutUrl = page.url();
      console.log(`  📍 URL: ${afterLogoutUrl}`);
      
      if (afterLogoutUrl.includes('/login')) {
        console.log(`  ✅ Redirected to login (session cleared)`);
        console.log(`\n✅ LOGOUT TEST PASSED\n`);
        return true;
      } else if (afterLogoutUrl.includes('/label/dashboard')) {
        console.log(`  ❌ Still on dashboard (session not cleared)`);
        return false;
      }
    } else {
      console.log(`  ❌ Not redirected. URL: ${finalUrl}`);
      return false;
    }

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

const result = await testLogout();
process.exit(result ? 0 : 1);
