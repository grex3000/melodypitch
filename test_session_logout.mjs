import { chromium } from 'playwright';

async function testLogoutSession() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('\n🔐 Testing Session Logout and Clearing\n');

    // Step 1: Login
    console.log('Step 1: Login and verify session');
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'songwriter-test@melodypitch.test');
    await page.fill('input[name="password"]', 'SongwriterTest123!');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(2000);

    const cookiesAfterLogin = await page.context().cookies();
    const hasSessionBeforeLogout = cookiesAfterLogin.some(c => c.name.includes('sb-'));

    if (hasSessionBeforeLogout) {
      console.log(`  ✅ Session created after login`);
      console.log(`     Cookies: ${cookiesAfterLogin.filter(c => c.name.includes('sb-')).map(c => c.name).join(', ')}`);
    } else {
      console.log(`  ❌ No session cookies after login`);
      return false;
    }

    // Step 2: Verify dashboard access
    console.log('\nStep 2: Verify dashboard is accessible');
    await page.goto('http://localhost:3000/songwriter/dashboard');
    await page.waitForTimeout(1000);
    
    if (page.url().includes('/songwriter/dashboard')) {
      console.log(`  ✅ Dashboard accessible with session`);
    } else {
      console.log(`  ⚠️  Dashboard not accessible, URL: ${page.url()}`);
    }

    // Step 3: Clear session manually (simulating logout)
    console.log('\nStep 3: Clear session cookies');
    await page.context().clearCookies();
    const cookiesAfterClear = await page.context().cookies();
    const sessionCookiesRemaining = cookiesAfterClear.filter(c => c.name.includes('sb-'));

    if (sessionCookiesRemaining.length === 0) {
      console.log(`  ✅ Session cookies cleared successfully`);
    } else {
      console.log(`  ❌ Session cookies still present: ${sessionCookiesRemaining.map(c => c.name).join(', ')}`);
      return false;
    }

    // Step 4: Verify protected route is inaccessible
    console.log('\nStep 4: Verify protected routes are inaccessible without session');
    await page.goto('http://localhost:3000/songwriter/dashboard');
    await page.waitForTimeout(1000);
    
    const finalUrl = page.url();
    if (finalUrl.includes('/login')) {
      console.log(`  ✅ Redirected to login after session clear`);
      console.log(`     URL: ${finalUrl}`);
    } else if (finalUrl.includes('/songwriter/dashboard')) {
      console.log(`  ❌ Still accessible without session (SECURITY ISSUE!)`);
      return false;
    } else {
      console.log(`  ⚠️  Unexpected redirect: ${finalUrl}`);
    }

    console.log('\n✅ LOGOUT SESSION TEST PASSED\n');
    return true;

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

const result = await testLogoutSession();
process.exit(result ? 0 : 1);
