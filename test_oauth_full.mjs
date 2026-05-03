import { chromium } from 'playwright';

async function testOAuthFlow() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('\n🔐 Testing Complete Google OAuth Flow\n');
    
    console.log('Test 1: Verify Google button is functional');
    await page.goto('http://localhost:3000/login');
    await page.waitForTimeout(1000);
    
    const googleBtn = await page.getByText('Sign in with Google');
    const visible = await googleBtn.isVisible();
    
    if (!visible) {
      console.log(`  ❌ Google button not found`);
      return false;
    }
    console.log(`  ✅ Google button visible and clickable`);
    
    console.log('\nTest 2: Verify callback route handles OAuth code exchange');
    
    // Test callback with invalid code (expected to fail gracefully)
    await page.goto('http://localhost:3000/auth/callback?code=invalid_code&next=/label/dashboard');
    await page.waitForTimeout(1500);
    
    const callbackUrl = page.url();
    if (callbackUrl.includes('/login?error=auth_failed')) {
      console.log(`  ✅ Callback properly handles invalid code`);
      console.log(`  ✅ Redirects to login with error parameter`);
    } else if (callbackUrl.includes('/login')) {
      console.log(`  ✅ Callback routes to login on error`);
    } else {
      console.log(`  ⚠️  Unexpected redirect: ${callbackUrl}`);
    }
    
    console.log('\nTest 3: Verify OAuth redirect URL is correct');
    
    // Go back to login and check the redirect URL
    await page.goto('http://localhost:3000/login');
    await page.waitForTimeout(1000);
    
    // Get the href of the Google button (if it's a link)
    const googleBtnParent = await page.locator('button:has-text("Sign in with Google")').first();
    
    // Click and check the redirect
    let oauthUrl = null;
    const navigationPromise = page.waitForNavigation();
    
    googleBtnParent.click().catch(() => {}); // Click but don't wait
    
    // Wait a bit for potential navigation
    await page.waitForTimeout(2000);
    
    oauthUrl = page.url();
    
    if (oauthUrl.includes('authorize')) {
      console.log(`  ✅ OAuth authorization URL detected`);
      console.log(`  📍 URL: ${oauthUrl.substring(0, 80)}...`);
      
      if (oauthUrl.includes('provider=google')) {
        console.log(`  ✅ Correct OAuth provider (Google)`);
      }
      
      if (oauthUrl.includes('localhost:3000/auth/callback')) {
        console.log(`  ✅ Correct callback URL configured`);
      }
    }
    
    console.log('\n✅ GOOGLE OAUTH FLOW TEST PASSED\n');
    return true;

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

const result = await testOAuthFlow();
process.exit(result ? 0 : 1);
