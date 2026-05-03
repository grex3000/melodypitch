import { chromium } from 'playwright';

async function checkContent() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const timeout = setTimeout(() => process.exit(1), 45000);

  try {
    // Login
    console.log('Logging in...');
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'label-test@melodypitch.test');
    await page.fill('input[name="password"]', 'LabelTest123!');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(3000);

    // Go to dashboard
    await page.goto('http://localhost:3000/label/dashboard');
    
    // Wait for page to load
    await page.waitForTimeout(1000);
    
    // Check if "Sign out" button exists anywhere
    const allButtons = await page.locator('button').all();
    console.log(`Total buttons on page: ${allButtons.length}`);
    
    for (const btn of allButtons) {
      const text = await btn.textContent();
      console.log(`  Button: "${text}"`);
    }
    
    // Get all text content
    const allText = await page.textContent('body');
    console.log('\n=== PAGE TEXT (first 500 chars) ===');
    console.log(allText?.substring(0, 500) || 'No content');
    
    clearTimeout(timeout);
    await browser.close();

  } catch (error) {
    console.error(`Error: ${error.message}`);
    clearTimeout(timeout);
    await browser.close();
  }
}

checkContent();
