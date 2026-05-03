import { chromium } from 'playwright';

async function testLoginDebug() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('\n🔐 Testing LABEL Login (with error debugging)\n');
    
    // Navigate to login
    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });
    console.log('✅ Login page loaded');

    // Get form action
    const formAction = await page.evaluate(() => {
      const form = document.querySelector('form');
      return form ? form.action : 'no form found';
    });
    console.log(`Form action: ${formAction}`);

    // Enter credentials
    await page.fill('input[name="email"]', 'label-test@melodypitch.test');
    await page.fill('input[name="password"]', 'LabelTest123!');
    console.log('✅ Credentials entered');

    // Listen for response
    const responsePromise = page.waitForResponse(response => {
      console.log(`Response: ${response.status()} ${response.url()}`);
      return true;
    });

    // Submit form
    console.log('→ Submitting form...');
    await page.click('button[type="submit"]');

    // Wait a bit for response
    await page.waitForTimeout(2000);

    const finalUrl = page.url();
    console.log(`\nFinal URL: ${finalUrl}`);

    // Get page content to see error
    const pageContent = await page.content();
    if (pageContent.includes('error')) {
      console.log('❌ Page contains error message');
      
      // Try to extract error message
      const errorMatch = pageContent.match(/error["\']?\s*[:=>\s]*["\']?([^"\'<>]+)/i);
      if (errorMatch) {
        console.log(`Error message: ${errorMatch[1]}`);
      }
    }

    // Check for any visible error text
    const errorElements = await page.locator('[class*="error"]').count();
    console.log(`Error elements found: ${errorElements}`);

    // Get all visible text
    const allText = await page.innerText('body');
    console.log(`\nPage text (first 500 chars):\n${allText.substring(0, 500)}`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    await page.close();
    await browser.close();
  }
}

await testLoginDebug();
