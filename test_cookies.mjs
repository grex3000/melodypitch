import { chromium } from 'playwright';

async function testCookiePersistence() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('\n🍪 Testing Cookie Persistence\n');
    
    // Get initial cookies
    let cookies = await page.context().cookies();
    console.log(`  Initial cookies: ${cookies.length}`);

    // Go to login
    console.log('  → Navigating to login...');
    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });

    // Get cookies after page load
    cookies = await page.context().cookies();
    console.log(`  Cookies after login page load: ${cookies.length}`);
    cookies.forEach(c => console.log(`    - ${c.name}: ${c.value.substring(0, 20)}...`));

    // Login
    console.log('  → Submitting login form...');
    await page.fill('input[name="email"]', 'label-test@melodypitch.test');
    await page.fill('input[name="password"]', 'LabelTest123!');
    await page.click('button[type="submit"]');

    // Wait for navigation
    await page.waitForTimeout(3000);
    console.log(`  → After login submission, URL: ${page.url()}`);

    // Get cookies after login
    cookies = await page.context().cookies();
    console.log(`  Cookies after login: ${cookies.length}`);
    cookies.forEach(c => {
      const value = c.value ? c.value.substring(0, 30) + '...' : '(empty)';
      console.log(`    - ${c.name}: ${value}`);
    });

    // Check for session cookies
    const hasAccessToken = cookies.some(c => c.name === 'sb-access-token');
    const hasRefreshToken = cookies.some(c => c.name === 'sb-refresh-token');
    
    console.log(`\n  ✓ sb-access-token present: ${hasAccessToken}`);
    console.log(`  ✓ sb-refresh-token present: ${hasRefreshToken}`);

    if (hasAccessToken && hasRefreshToken) {
      console.log('\n✅ COOKIES PROPERLY SET\n');
      return true;
    } else {
      console.log('\n❌ COOKIES NOT SET\n');
      return false;
    }

  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

await testCookiePersistence();
