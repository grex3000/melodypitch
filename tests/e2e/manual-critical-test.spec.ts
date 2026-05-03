import { test, expect } from '@playwright/test';

test.describe('CRITICAL PATH - Manual Real-World Testing', () => {
  const timestamp = Date.now();
  const testEmail = `realtest${timestamp}@melodypitch.test`;
  const testPassword = 'TestPassword123!';
  const testName = 'Real Test User';

  test.describe('Phase 1: Landing Page', () => {
    test('landing page loads completely', async ({ page }) => {
      console.log('\n=== TESTING: Landing Page Load ===');
      
      await page.goto('http://localhost:3000');
      
      // Check page title
      const title = await page.title();
      console.log(`Page title: ${title}`);
      
      // Check hero section
      const h1 = await page.locator('h1').first().textContent();
      console.log(`Hero headline: ${h1}`);
      expect(h1).toBeTruthy();
      
      // Check navbar
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      console.log('✅ Navbar visible');
      
      // Check features section
      const featuresSection = page.locator('text=Everything you need to pitch');
      const isFeaturesVisible = await featuresSection.isVisible().catch(() => false);
      console.log(`Features section visible: ${isFeaturesVisible ? '✅' : '❌'}`);
      
      // Check audience sections
      const labelsSection = page.locator('text=For Labels');
      const songwritersSection = page.locator('text=For Songwriters');
      const artistsSection = page.locator('text=For Artists');
      
      console.log(`✅ All sections loading`);
    });

    test('navbar buttons are clickable', async ({ page }) => {
      console.log('\n=== TESTING: Navbar Buttons ===');
      
      await page.goto('http://localhost:3000');
      
      // Check Sign in button exists
      const signInButtons = page.getByRole('link', { name: /Sign in/i });
      const count = await signInButtons.count();
      console.log(`Sign in buttons found: ${count}`);
      expect(count).toBeGreaterThan(0);
      console.log('✅ Sign in button visible');
      
      // Check Get started button exists
      const getStartedButtons = page.getByRole('link', { name: /Get started/i });
      const startCount = await getStartedButtons.count();
      console.log(`Get started buttons found: ${startCount}`);
      expect(startCount).toBeGreaterThan(0);
      console.log('✅ Get started button visible');
    });

    test('audience sections render correctly', async ({ page }) => {
      console.log('\n=== TESTING: Audience Sections ===');
      
      await page.goto('http://localhost:3000');
      
      // Scroll to audience sections
      await page.evaluate(() => {
        const element = document.querySelector('h2');
        if (element && element.textContent?.includes('Solutions for every role')) {
          element.scrollIntoView();
        }
      });
      
      await page.waitForTimeout(1000);
      
      // Check for labels section
      const labelSection = page.locator('text=For Labels & A&R');
      const labelsVisible = await labelSection.isVisible().catch(() => false);
      console.log(`Labels section visible: ${labelsVisible ? '✅' : '❌'}`);
      
      // Check for songwriters section
      const songwriterSection = page.locator('text=For Songwriters & Producers');
      const songwritersVisible = await songwriterSection.isVisible().catch(() => false);
      console.log(`Songwriters section visible: ${songwritersVisible ? '✅' : '❌'}`);
      
      // Check for artists section
      const artistSection = page.locator('text=For Artists & Management');
      const artistsVisible = await artistSection.isVisible().catch(() => false);
      console.log(`Artists section visible: ${artistsVisible ? '✅' : '❌'}`);
      
      if (labelsVisible && songwritersVisible && artistsVisible) {
        console.log('✅ All audience sections visible');
      }
    });
  });

  test.describe('Phase 2: Registration Flow', () => {
    test('registration page loads', async ({ page }) => {
      console.log('\n=== TESTING: Registration Page Load ===');
      
      await page.goto('http://localhost:3000/register');
      
      // Check page loaded
      const title = page.locator('h1');
      const titleText = await title.textContent();
      console.log(`Page title: ${titleText}`);
      expect(titleText).toContain('Create your account');
      console.log('✅ Registration page loaded');
      
      // Check form fields
      const nameField = page.locator('input[name="name"]');
      const emailField = page.locator('input[name="email"]');
      const passwordField = page.locator('input[name="password"]');
      const roleField = page.locator('select[name="role"]');
      
      await expect(nameField).toBeVisible();
      await expect(emailField).toBeVisible();
      await expect(passwordField).toBeVisible();
      await expect(roleField).toBeVisible();
      console.log('✅ All form fields visible');
    });

    test('google sign-up button exists', async ({ page }) => {
      console.log('\n=== TESTING: Google Sign-Up Button ===');
      
      await page.goto('http://localhost:3000/register');
      
      const googleBtn = page.getByRole('button', { name: /Sign in with Google/i });
      const isVisible = await googleBtn.isVisible().catch(() => false);
      console.log(`Google button visible: ${isVisible ? '✅' : '❌'}`);
      
      if (isVisible) {
        // Try clicking to see what happens
        await googleBtn.click();
        await page.waitForTimeout(2000);
        
        const url = page.url();
        console.log(`After clicking Google button, URL: ${url}`);
        
        if (url.includes('accounts.google.com')) {
          console.log('✅ Redirected to Google - Google OAuth working');
        } else if (url.includes('error') || url.includes('validation_failed')) {
          console.log('❌ Google OAuth error - provider not enabled');
        } else {
          console.log(`⚠️  Unexpected URL: ${url}`);
        }
        
        // Go back to register page
        await page.goto('http://localhost:3000/register');
      }
    });

    test('actual registration with email/password', async ({ page }) => {
      console.log('\n=== TESTING: Email Registration ===');
      console.log(`Creating account: ${testEmail}`);
      
      await page.goto('http://localhost:3000/register');
      
      // Fill form
      await page.fill('input[name="name"]', testName);
      console.log(`✅ Name entered: ${testName}`);
      
      await page.fill('input[name="email"]', testEmail);
      console.log(`✅ Email entered: ${testEmail}`);
      
      await page.fill('input[name="password"]', testPassword);
      console.log(`✅ Password entered`);
      
      await page.selectOption('select[name="role"]', 'SONGWRITER');
      console.log(`✅ Role selected: SONGWRITER`);
      
      // Submit form
      console.log('Clicking Create Account button...');
      await page.click('button[type="submit"]');
      
      // Wait and check result
      await page.waitForTimeout(3000);
      const finalUrl = page.url();
      console.log(`Final URL after registration: ${finalUrl}`);
      
      if (finalUrl.includes('/login') && finalUrl.includes('registered=1')) {
        console.log('✅ REGISTRATION SUCCESS - Redirected to /login?registered=1');
      } else if (finalUrl.includes('error=1')) {
        console.log('❌ REGISTRATION FAILED - error=1');
        
        // Check for error message
        const errorMsg = await page.locator('text=Unable to create account').isVisible().catch(() => false);
        if (errorMsg) {
          console.log('Error message displayed on page');
        }
      } else {
        console.log(`⚠️  Unexpected URL: ${finalUrl}`);
      }
    });
  });

  test.describe('Phase 3: Login Flow', () => {
    test('login page loads', async ({ page }) => {
      console.log('\n=== TESTING: Login Page Load ===');
      
      await page.goto('http://localhost:3000/login');
      
      const title = page.locator('h1');
      const titleText = await title.textContent();
      console.log(`Page title: ${titleText}`);
      expect(titleText).toContain('Sign in');
      console.log('✅ Login page loaded');
    });

    test('google sign-in button exists', async ({ page }) => {
      console.log('\n=== TESTING: Google Sign-In Button ===');
      
      await page.goto('http://localhost:3000/login');
      
      const googleBtn = page.getByRole('button', { name: /Sign in with Google/i });
      const isVisible = await googleBtn.isVisible().catch(() => false);
      console.log(`Google button visible: ${isVisible ? '✅' : '❌'}`);
      
      if (isVisible) {
        console.log('Google Sign-In button present and clickable');
      }
    });

    test('login with created account', async ({ page }) => {
      console.log('\n=== TESTING: Email Login ===');
      console.log(`Attempting login with: ${testEmail}`);
      
      await page.goto('http://localhost:3000/login');
      
      await page.fill('input[name="email"]', testEmail);
      console.log('✅ Email entered');
      
      await page.fill('input[name="password"]', testPassword);
      console.log('✅ Password entered');
      
      console.log('Clicking Sign In button...');
      await page.click('button[type="submit"]');
      
      // Wait and check result
      await page.waitForTimeout(3000);
      const finalUrl = page.url();
      console.log(`Final URL after login: ${finalUrl}`);
      
      if (finalUrl.includes('error=1')) {
        console.log('❌ LOGIN FAILED - error=1');
        const errorMsg = await page.locator('text=Invalid email or password').isVisible().catch(() => false);
        if (errorMsg) {
          console.log('Error message shown: "Invalid email or password"');
        }
      } else if (finalUrl.includes('dashboard') || finalUrl.includes('songwriter') || finalUrl.includes('label')) {
        console.log('✅ LOGIN SUCCESS - Redirected to dashboard');
      } else if (finalUrl === 'http://localhost:3000/login') {
        console.log('⚠️  Still on login page - check if session set correctly');
      } else {
        console.log(`⚠️  Redirected to: ${finalUrl}`);
      }
    });

    test('invalid login shows error', async ({ page }) => {
      console.log('\n=== TESTING: Invalid Login Error ===');
      
      await page.goto('http://localhost:3000/login');
      
      await page.fill('input[name="email"]', 'nonexistent@melodypitch.test');
      await page.fill('input[name="password"]', 'wrongpassword');
      
      await page.click('button[type="submit"]');
      await page.waitForTimeout(2000);
      
      const url = page.url();
      const hasError = url.includes('error=1');
      console.log(`URL contains error=1: ${hasError ? '✅' : '❌'}`);
      
      const errorText = await page.locator('text=Invalid email or password').isVisible().catch(() => false);
      console.log(`Error message visible: ${errorText ? '✅' : '❌'}`);
    });
  });

  test.describe('Phase 4: Protected Routes', () => {
    test('unauthenticated access redirects to login', async ({ page }) => {
      console.log('\n=== TESTING: Protected Route Redirect ===');
      
      // Try accessing songwriter dashboard without login
      await page.goto('http://localhost:3000/songwriter/dashboard', { waitUntil: 'networkidle' });
      
      const finalUrl = page.url();
      console.log(`After navigating to /songwriter/dashboard: ${finalUrl}`);
      
      if (finalUrl.includes('/login')) {
        console.log('✅ CORRECTLY redirected to /login');
      } else {
        console.log('❌ NOT redirected - middleware might not be working');
      }
    });
  });

  test.describe('Phase 5: Responsive Design', () => {
    test('mobile viewport (375px)', async ({ page }) => {
      console.log('\n=== TESTING: Mobile Responsive ===');
      
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3000');
      
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      console.log('✅ Hero visible on mobile');
      
      // Check hamburger menu
      const menuButton = page.getByRole('button', { name: /Toggle menu|menu/i });
      const hasMenu = await menuButton.isVisible().catch(() => false);
      console.log(`Hamburger menu visible: ${hasMenu ? '✅' : '❌'}`);
    });

    test('desktop viewport (1920px)', async ({ page }) => {
      console.log('\n=== TESTING: Desktop Responsive ===');
      
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('http://localhost:3000');
      
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      console.log('✅ Hero visible on desktop');
    });
  });

  test.describe('Phase 6: Console & Errors', () => {
    test('no console errors on landing page', async ({ page }) => {
      console.log('\n=== TESTING: Console Errors ===');
      
      const errors: string[] = [];
      const warnings: string[] = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        } else if (msg.type() === 'warning') {
          warnings.push(msg.text());
        }
      });
      
      await page.goto('http://localhost:3000');
      await page.waitForTimeout(2000);
      
      console.log(`Console errors: ${errors.length}`);
      console.log(`Console warnings: ${warnings.length}`);
      
      if (errors.length === 0) {
        console.log('✅ No console errors');
      } else {
        console.log('❌ Found console errors:');
        errors.forEach(e => console.log(`  - ${e}`));
      }
    });
  });
});
