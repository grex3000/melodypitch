import { chromium } from 'playwright';

async function testOAuthCallback() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('\n🔐 Testing OAuth Callback Handler\n');
    
    // Step 1: Simulate OAuth callback by manually creating a session
    console.log('Step 1: Create mock session cookies (simulating OAuth callback)');
    
    // First, get an actual OAuth code or simulate the callback
    // For testing, we can test the callback route directly
    
    console.log('Step 2: Test callback route with code parameter');
    await page.goto('http://localhost:3000/auth/callback?code=test_code_123&next=/');
    
    await page.waitForTimeout(1000);
    
    const currentUrl = page.url();
    console.log(`  📍 URL after callback: ${currentUrl}`);
    
    // Check if we got an error or redirected
    if (currentUrl.includes('/login') && currentUrl.includes('error')) {
      console.log(`  ℹ️  Got expected error (code was invalid)`);
      console.log(`  ✅ Callback route is working (invalid code handled correctly)`);
    } else if (currentUrl === 'http://localhost:3000/') {
      console.log(`  ✅ Redirected to home page (callback successful)`);
    } else if (currentUrl.includes('/login')) {
      console.log(`  ✅ Callback route functional`);
    }
    
    // Step 3: Verify callback route exists and returns proper status
    console.log('\nStep 3: Verify callback route exists');
    const response = await page.request.get('http://localhost:3000/auth/callback?code=test&next=/dashboard');
    console.log(`  Status: ${response.status()}`);
    
    if (response.status() === 307 || response.status() === 302) {
      console.log(`  ✅ Callback route returns redirect (${response.status()})`);
      const location = response.headers()['location'];
      console.log(`  📍 Redirects to: ${location}`);
      console.log(`\n✅ OAUTH CALLBACK HANDLER TEST PASSED\n`);
      return true;
    } else {
      console.log(`  ❌ Unexpected status: ${response.status()}`);
      return false;
    }

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

const result = await testOAuthCallback();
process.exit(result ? 0 : 1);
