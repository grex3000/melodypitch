import { chromium } from 'playwright';

async function debugButtons() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Login
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'label-test@melodypitch.test');
    await page.fill('input[name="password"]', 'LabelTest123!');
    await page.click('button:has-text("Sign in")');
    
    await page.waitForTimeout(3000);

    // Go to dashboard
    await page.goto('http://localhost:3000/label/dashboard');
    await page.waitForTimeout(2000);
    
    // Get all text
    const bodyText = await page.textContent('body');
    console.log('\n=== Full page text ===');
    console.log(bodyText);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    await browser.close();
  }
}

debugButtons();
