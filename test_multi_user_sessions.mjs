import { chromium } from 'playwright';

async function testMultiUserSessions() {
  try {
    console.log('\n👥 Testing Multiple User Sessions\n');

    const browser = await chromium.launch({ headless: true });

    // Create separate browsers for different users
    const browser1 = await chromium.launch({ headless: true });
    const browser2 = await chromium.launch({ headless: true });
    
    const page1 = await browser1.newPage();
    const page2 = await browser2.newPage();

    // User 1: Login as Songwriter
    console.log('User 1: Login as SONGWRITER');
    await page1.goto('http://localhost:3000/login');
    await page1.fill('input[name="email"]', 'songwriter-test@melodypitch.test');
    await page1.fill('input[name="password"]', 'SongwriterTest123!');
    await page1.click('button[type="submit"]');
    await page1.waitForTimeout(2000);

    const user1Cookies = await page1.context().cookies();
    const user1HasSession = user1Cookies.some(c => c.name === 'sb-access-token');

    if (user1HasSession) {
      console.log(`  ✅ Songwriter logged in`);
    } else {
      console.log(`  ❌ Songwriter not logged in`);
      return false;
    }

    // User 2: Login as Label in separate browser
    console.log('\nUser 2: Login as LABEL');
    await page2.goto('http://localhost:3000/login');
    await page2.fill('input[name="email"]', 'label-test@melodypitch.test');
    await page2.fill('input[name="password"]', 'LabelTest123!');
    await page2.click('button[type="submit"]');
    await page2.waitForTimeout(2000);

    const user2Cookies = await page2.context().cookies();
    const user2HasSession = user2Cookies.some(c => c.name === 'sb-access-token');

    if (user2HasSession) {
      console.log(`  ✅ Label logged in`);
    } else {
      console.log(`  ❌ Label not logged in`);
      return false;
    }

    // Verify isolated sessions
    console.log('\nVerification: Sessions are isolated');
    const user1Token = user1Cookies.find(c => c.name === 'sb-access-token')?.value;
    const user2Token = user2Cookies.find(c => c.name === 'sb-access-token')?.value;

    if (user1Token && user2Token && user1Token !== user2Token) {
      console.log(`  ✅ Each user has unique session token`);
    } else {
      console.log(`  ⚠️  Token comparison: User1=${!!user1Token}, User2=${!!user2Token}`);
    }

    // Test separate dashboards
    console.log('\nTest: Each user can access their own dashboard');
    
    await page1.goto('http://localhost:3000/songwriter/dashboard');
    const songwriter_url = page1.url();

    await page2.goto('http://localhost:3000/label/dashboard');
    const label_url = page2.url();

    console.log(`  Songwriter URL: ${songwriter_url}`);
    console.log(`  Label URL: ${label_url}`);

    if (songwriter_url.includes('/songwriter/dashboard') && label_url.includes('/label/dashboard')) {
      console.log(`  ✅ Both users can access their dashboards`);
    } else {
      console.log(`  ❌ Dashboard access failed`);
      return false;
    }

    console.log('\n✅ MULTI-USER SESSION TEST PASSED\n');
    
    await page1.close();
    await page2.close();
    await browser1.close();
    await browser2.close();
    
    return true;

  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  }
}

const result = await testMultiUserSessions();
process.exit(result ? 0 : 1);
