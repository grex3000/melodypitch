import { chromium } from 'playwright';

async function testLogin(role, email, password, expectedDashboard) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log(`\n🔐 Testing ${role} User Login`);
    console.log(`   Email: ${email}`);
    
    // Navigate to login
    console.log('   → Loading login page...');
    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded', timeout: 10000 });
    console.log('   ✅ Login page loaded');

    // Enter credentials
    await page.fill('input[name="email"]', email);
    console.log('   ✅ Email entered');

    await page.fill('input[name="password"]', password);
    console.log('   ✅ Password entered');

    // Submit
    console.log('   → Submitting form...');
    await page.click('button[type="submit"]');

    // Wait for redirect
    console.log('   🔄 Waiting for redirect...');
    try {
      await page.waitForURL(/dashboard/, { timeout: 12000 });
      const finalUrl = page.url();
      console.log(`   ✅ Redirected to: ${finalUrl}`);

      if (finalUrl.includes(expectedDashboard)) {
        console.log(`   ✅ Correct dashboard! (${expectedDashboard})`);
        console.log(`\n✅ ${role} LOGIN TEST PASSED\n`);
        return true;
      } else {
        console.log(`   ⚠️  Wrong dashboard. Expected: ${expectedDashboard}, Got: ${finalUrl}`);
        return false;
      }
    } catch (e) {
      console.log(`   ❌ Failed to redirect to dashboard`);
      console.log(`   Current URL: ${page.url()}`);
      const content = await page.content();
      if (content.includes('error')) {
        console.log('   Page contains error message');
      }
      return false;
    }
  } catch (error) {
    console.error(`   ❌ Test failed: ${error.message}`);
    return false;
  } finally {
    await page.close();
    await browser.close();
  }
}

console.log('═══════════════════════════════════════');
console.log('  LOGIN & DASHBOARD REDIRECT TESTS');
console.log('═══════════════════════════════════════');

const results = [];

// Test LABEL
const labelResult = await testLogin('LABEL', 'label-test@melodypitch.test', 'LabelTest123!', 'label/dashboard');
results.push({ role: 'LABEL', passed: labelResult });

// Test SONGWRITER
const songwriterResult = await testLogin('SONGWRITER', 'songwriter-test@melodypitch.test', 'SongwriterTest123!', 'songwriter/dashboard');
results.push({ role: 'SONGWRITER', passed: songwriterResult });

// Test ARTIST
const artistResult = await testLogin('ARTIST', 'artist-test@melodypitch.test', 'ArtistTest123!', 'artist/dashboard');
results.push({ role: 'ARTIST', passed: artistResult });

// Summary
console.log('\n═══════════════════════════════════════');
console.log('  TEST SUMMARY');
console.log('═══════════════════════════════════════');
results.forEach(r => {
  const status = r.passed ? '✅ PASS' : '❌ FAIL';
  console.log(`  ${status}  ${r.role}`);
});

const passed = results.filter(r => r.passed).length;
const total = results.length;
console.log(`\n  Result: ${passed}/${total} tests passed`);
console.log('═══════════════════════════════════════\n');

process.exit(passed === total ? 0 : 1);
