import { chromium } from 'playwright';

async function testSessionManagement() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('\n🔐 Testing Session Management\n');

    // Test 1: Cookie storage
    console.log('Test 1: Session cookies are stored correctly');
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'label-test@melodypitch.test');
    await page.fill('input[name="password"]', 'LabelTest123!');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(2000);

    const cookies = await page.context().cookies();
    const accessToken = cookies.find(c => c.name === 'sb-access-token');
    const refreshToken = cookies.find(c => c.name === 'sb-refresh-token');

    if (accessToken) {
      console.log(`  ✅ Access token cookie stored`);
      console.log(`     Path: ${accessToken.path}`);
      console.log(`     HttpOnly: ${accessToken.httpOnly}`);
      console.log(`     SameSite: ${accessToken.sameSite}`);
    } else {
      console.log(`  ❌ Access token not found`);
      return false;
    }

    if (refreshToken) {
      console.log(`  ✅ Refresh token cookie stored`);
      console.log(`     Path: ${refreshToken.path}`);
      console.log(`     HttpOnly: ${refreshToken.httpOnly}`);
      console.log(`     SameSite: ${refreshToken.sameSite}`);
    } else {
      console.log(`  ⚠️  Refresh token not found`);
    }

    // Test 2: Session persistence across navigation
    console.log('\nTest 2: Session persists across page navigation');
    const cookiesBefore = await page.context().cookies();
    const beforeTokenCount = cookiesBefore.filter(c => c.name.includes('sb-')).length;

    await page.goto('http://localhost:3000/');
    const cookiesAfter = await page.context().cookies();
    const afterTokenCount = cookiesAfter.filter(c => c.name.includes('sb-')).length;

    if (beforeTokenCount === afterTokenCount && beforeTokenCount > 0) {
      console.log(`  ✅ Cookies persisted across navigation (${afterTokenCount} cookies)`);
    } else {
      console.log(`  ❌ Cookies not persisted (before: ${beforeTokenCount}, after: ${afterTokenCount})`);
      return false;
    }

    // Test 3: Protected route access with valid session
    console.log('\nTest 3: Protected routes accessible with valid session');
    await page.goto('http://localhost:3000/label/dashboard');
    await page.waitForTimeout(1000);
    
    const currentUrl = page.url();
    if (currentUrl.includes('/label/dashboard')) {
      console.log(`  ✅ Protected route accessible with session`);
      console.log(`     URL: ${currentUrl}`);
    } else if (currentUrl.includes('/login')) {
      console.log(`  ❌ Redirected to login despite having session`);
      return false;
    } else {
      console.log(`  ⚠️  Unexpected URL: ${currentUrl}`);
    }

    // Test 4: Cookie security attributes
    console.log('\nTest 4: Cookie security attributes');
    const hasHttpOnlyAccess = cookies.filter(c => c.name.includes('sb-') && c.httpOnly).length > 0;
    const hasSameSiteAccess = cookies.filter(c => c.name.includes('sb-') && c.sameSite).length > 0;

    if (hasHttpOnlyAccess) {
      console.log(`  ✅ HttpOnly flag set (prevents XSS access)`);
    } else {
      console.log(`  ❌ HttpOnly flag not set`);
    }

    if (hasSameSiteAccess) {
      console.log(`  ✅ SameSite attribute set (prevents CSRF)`);
    } else {
      console.log(`  ❌ SameSite attribute not set`);
    }

    // Test 5: Cookie expiration
    console.log('\nTest 5: Token expiration configuration');
    if (accessToken && accessToken.expires) {
      const expiresDate = new Date(accessToken.expires * 1000);
      const now = new Date();
      const expiresIn = Math.round((expiresDate - now) / 1000 / 60);
      console.log(`  ✅ Access token expiration: ${expiresIn} minutes`);
    } else {
      console.log(`  ⚠️  Token expiration time not available`);
    }

    if (refreshToken && refreshToken.expires) {
      const expiresDate = new Date(refreshToken.expires * 1000);
      const now = new Date();
      const expiresInDays = Math.round((expiresDate - now) / 1000 / 60 / 60 / 24);
      console.log(`  ✅ Refresh token expiration: ${expiresInDays} days`);
    }

    console.log('\n✅ SESSION MANAGEMENT TEST PASSED\n');
    return true;

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

const result = await testSessionManagement();
process.exit(result ? 0 : 1);
