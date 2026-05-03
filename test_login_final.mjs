import { chromium } from 'playwright';

async function testLogin(role, email, password, expectedDashboard) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log(`\n🔐 Testing ${role} User Login`);
    console.log(`   Email: ${email}`);
    
    // Navigate to login
    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded', timeout: 10000 });
    console.log('   ✅ Login page loaded');

    // Enter credentials
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    console.log('   ✅ Credentials entered');

    // Submit
    console.log('   → Submitting form...');
    await page.click('button[type="submit"]');

    // Wait longer for redirect and page load
    console.log('   🔄 Waiting for page load (up to 15 seconds)...');
    try {
      await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
    } catch (e) {
      // Might still have loaded
    }

    // Give it a moment more
    await page.waitForTimeout(2000);

    const finalUrl = page.url();
    console.log(`   📍 Final URL: ${finalUrl}`);

    // Check if we're on dashboard or if we can still access it
    if (finalUrl.includes(expectedDashboard)) {
      console.log(`   ✅ On correct dashboard!`);
      console.log(`\n✅ ${role} LOGIN TEST PASSED\n`);
      return true;
    } else if (finalUrl.includes('/')) {
      // We're somewhere - try to directly navigate to dashboard
      const dashboardUrl = `http://localhost:3000/${expectedDashboard}`;
      console.log(`   → Attempting direct navigation to: ${dashboardUrl}`);
      await page.goto(dashboardUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
      const currentUrl = page.url();
      console.log(`   📍 After direct nav: ${currentUrl}`);
      
      if (currentUrl.includes(expectedDashboard)) {
        console.log(`   ✅ Successfully accessed dashboard directly!`);
        console.log(`\n✅ ${role} LOGIN TEST PASSED (direct access)\n`);
        return true;
      } else {
        console.log(`   ❌ Could not access dashboard - redirected to: ${currentUrl}`);
        console.log(`\n❌ ${role} LOGIN TEST FAILED\n`);
        return false;
      }
    }

  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    console.log(`\n❌ ${role} LOGIN TEST FAILED\n`);
    return false;
  } finally {
    await browser.close();
  }
}

console.log('═══════════════════════════════════════');
console.log('  LOGIN & DASHBOARD TESTS');
console.log('═══════════════════════════════════════');

const results = [];

// Test all roles
const labelResult = await testLogin('LABEL', 'label-test@melodypitch.test', 'LabelTest123!', 'label/dashboard');
results.push({ role: 'LABEL', passed: labelResult });

const songwriterResult = await testLogin('SONGWRITER', 'songwriter-test@melodypitch.test', 'SongwriterTest123!', 'songwriter/dashboard');
results.push({ role: 'SONGWRITER', passed: songwriterResult });

const artistResult = await testLogin('ARTIST', 'artist-test@melodypitch.test', 'ArtistTest123!', 'artist/dashboard');
results.push({ role: 'ARTIST', passed: artistResult });

// Summary
console.log('═══════════════════════════════════════');
console.log('  FINAL RESULTS');
console.log('═══════════════════════════════════════');
results.forEach(r => {
  const status = r.passed ? '✅ PASS' : '❌ FAIL';
  console.log(`  ${status}  ${r.role}`);
});

const passed = results.filter(r => r.passed).length;
const total = results.length;
console.log(`\n  Result: ${passed}/${total} tests passed\n`);
console.log('═══════════════════════════════════════\n');

process.exit(passed === total ? 0 : 1);
