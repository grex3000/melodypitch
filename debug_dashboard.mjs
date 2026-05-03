import { chromium } from 'playwright';

async function debugDashboard() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Login
    console.log('Logging in...');
    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });
    await page.fill('input[name="email"]', 'label-test@melodypitch.test');
    await page.fill('input[name="password"]', 'LabelTest123!');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(3000);

    // Go to dashboard
    await page.goto('http://localhost:3000/label/dashboard', { waitUntil: 'domcontentloaded' });
    
    // Get full page HTML
    const html = await page.content();
    console.log('=== DASHBOARD HTML ===');
    console.log(html.substring(0, 2000));
    console.log('...');
    
    // Find all buttons
    const buttons = await page.locator('button').all();
    console.log(`\nTotal buttons found: ${buttons.length}`);
    
    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      console.log(`Button ${i}: "${text}"`);
    }

  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    await browser.close();
  }
}

debugDashboard();
