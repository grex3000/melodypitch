import { chromium } from 'playwright';

async function testDashboardAccess(role, email, password, dashboardPath) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log(`\n📊 Testing ${role} Dashboard Access`);
    
    // Login first
    console.log('  1️⃣  Logging in...');
    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    
    // Wait for redirect
    await page.waitForTimeout(2000);
    console.log(`  ✅ Form submitted`);

    // Try to directly navigate to dashboard
    console.log(`  2️⃣  Navigating to dashboard: ${dashboardPath}`);
    await page.goto(`http://localhost:3000${dashboardPath}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    const finalUrl = page.url();
    console.log(`  📍 Final URL: ${finalUrl}`);

    if (finalUrl.includes(dashboardPath)) {
      console.log(`  ✅ Successfully accessed ${dashboardPath}`);
      
      // Check page has content
      const pageTitle = await page.title();
      console.log(`  📄 Page title: ${pageTitle}`);
      console.log(`\n✅ ${role} DASHBOARD ACCESS TEST PASSED\n`);
      return true;
    } else {
      console.log(`  ❌ Ended up at: ${finalUrl}`);
      console.log(`\n❌ ${role} DASHBOARD ACCESS TEST FAILED\n`);
      return false;
    }
  } catch (error) {
    console.error(`  ❌ Test failed: ${error.message}`);
    console.log(`\n❌ ${role} DASHBOARD ACCESS TEST FAILED\n`);
    return false;
  } finally {
    await browser.close();
  }
}

console.log('═══════════════════════════════════════');
console.log('  DASHBOARD ACCESS TESTS');
console.log('═══════════════════════════════════════');

const results = [];

// Test LABEL dashboard
const labelResult = await testDashboardAccess('LABEL', 'label-test@melodypitch.test', 'LabelTest123!', '/label/dashboard');
results.push({ role: 'LABEL', passed: labelResult });

// Test SONGWRITER dashboard
const songwriterResult = await testDashboardAccess('SONGWRITER', 'songwriter-test@melodypitch.test', 'SongwriterTest123!', '/songwriter/dashboard');
results.push({ role: 'SONGWRITER', passed: songwriterResult });

// Test ARTIST dashboard
const artistResult = await testDashboardAccess('ARTIST', 'artist-test@melodypitch.test', 'ArtistTest123!', '/artist/dashboard');
results.push({ role: 'ARTIST', passed: artistResult });

// Summary
console.log('═══════════════════════════════════════');
console.log('  FINAL TEST SUMMARY');
console.log('═══════════════════════════════════════');
results.forEach(r => {
  const status = r.passed ? '✅ PASS' : '❌ FAIL';
  console.log(`  ${status}  ${r.role}`);
});

const passed = results.filter(r => r.passed).length;
const total = results.length;
console.log(`\n  Overall: ${passed}/${total} tests passed\n`);
console.log('═══════════════════════════════════════\n');

process.exit(passed === total ? 0 : 1);
