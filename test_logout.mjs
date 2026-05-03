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

    // Step 3: Call logout API
    console.log('\nStep 3: Call logout API');
    const logoutResponse = await page.evaluate(async () => {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      return { status: response.status, ok: response.ok };
    });
    console.log(`  ✅ Logout API response: ${logoutResponse.status}`);

    // Step 4: Wait for redirect
    await page.waitForTimeout(2000);
    const finalUrl = page.url();
    console.log(`\nStep 4: Check final URL`);
    console.log(`  📍 Final URL: ${finalUrl}`);

    if (finalUrl.includes('/login')) {
      console.log(`  ✅ Redirected to login page`);
      
      // Step 5: Try to access dashboard again (should redirect to login)
      console.log('\nStep 5: Try to access dashboard after logout');
      await page.goto('http://localhost:3000/label/dashboard', { waitUntil: 'domcontentloaded' });
      const afterLogoutUrl = page.url();
      console.log(`  📍 URL after attempting dashboard access: ${afterLogoutUrl}`);
      
      if (afterLogoutUrl.includes('/login')) {
        console.log(`  ✅ Cannot access dashboard - redirected to login`);
        console.log(`\n✅ LOGOUT TEST PASSED\n`);
        return true;
      } else {
        console.log(`  ❌ Still able to access dashboard after logout!`);
        return false;
      }
    } else {
      console.log(`  ❌ Not redirected to login. URL: ${finalUrl}`);
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
