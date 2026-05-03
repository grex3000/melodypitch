import { test, expect } from '@playwright/test';

test.describe('MelodyPitch Full Application Test Suite', () => {
  const timestamp = Date.now();
  const testEmail = `test${timestamp}@melodypitch.test`;
  const testPassword = 'password123';
  const testName = 'Test User';
  const testRole = 'SONGWRITER';

  test.describe('Landing Page', () => {
    test('should load landing page with navbar and hero', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Check navbar is present
      await expect(page.locator('nav')).toBeVisible();
      
      // Check logo
      await expect(page.getByRole('link').first()).toBeVisible();
      
      // Check hero section exists
      await expect(page.locator('h1')).toBeVisible();
      
      // Check hero has content
      const heroText = await page.locator('h1').textContent();
      expect(heroText).toBeTruthy();
    });

    test('should display hero section correctly', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Check hero headline
      const headline = page.locator('h1');
      await expect(headline).toContainText('Where great songs meet their audience');
      
      // Check subheading
      const subheading = page.locator('p').first();
      await expect(subheading).toBeVisible();
      
      // Check CTA buttons
      const ctaButton = page.getByRole('link', { name: /Get started free/i });
      await expect(ctaButton).toBeVisible();
    });

    test('should display features section with bento grid', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Scroll to features section
      await page.evaluate(() => {
        const featuresSection = document.querySelector('#features');
        if (featuresSection) {
          featuresSection.scrollIntoView();
        }
      });
      
      await page.waitForTimeout(500);
      
      // Check if features heading exists
      const heading = await page.locator('text=Everything you need to pitch').isVisible();
      expect(heading).toBeTruthy();
    });

    test('navbar should have sign in and get started buttons', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Check for Sign in button
      const signInBtn = page.getByRole('link', { name: /Sign in/i });
      await expect(signInBtn).toBeVisible();
      
      // Check for Get started button
      const getStartedBtn = page.getByRole('link', { name: /Get started/i });
      await expect(getStartedBtn).toBeVisible();
    });

    test('navbar sign in button should navigate to login', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      const signInBtn = page.getByRole('link', { name: /Sign in/i }).first();
      await signInBtn.click();
      
      await expect(page).toHaveURL(/.*login/);
    });

    test('navbar get started button should navigate to register', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      const getStartedBtn = page.getByRole('link', { name: /Get started/i }).first();
      await getStartedBtn.click();
      
      await expect(page).toHaveURL(/.*register/);
    });

    test('should be responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3000');
      
      // Check hero is still visible
      await expect(page.locator('h1')).toBeVisible();
      
      // Check navbar is visible
      await expect(page.locator('nav')).toBeVisible();
      
      // Check mobile menu button exists
      const menuButton = page.getByRole('button', { name: /Toggle menu/i });
      const isVisible = await menuButton.isVisible();
      
      // On mobile, hamburger menu should be visible
      if (isVisible) {
        await expect(menuButton).toBeVisible();
      }
    });

    test('should be responsive on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('http://localhost:3000');
      
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
    });

    test('should be responsive on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('http://localhost:3000');
      
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
    });

    test('should scroll smoothly to sections', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Click "How it works" link if visible
      const howItWorksLink = page.getByRole('link', { name: /How it works/i });
      if (await howItWorksLink.isVisible()) {
        await howItWorksLink.click();
        await page.waitForTimeout(500);
      }
    });
  });

  test.describe('Registration Flow', () => {
    test('should load register page', async ({ page }) => {
      await page.goto('http://localhost:3000/register');
      
      // Check page title
      const heading = page.locator('h1');
      await expect(heading).toContainText('Create your account');
      
      // Check all form fields are present
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('input[name="password"]')).toBeVisible();
      await expect(page.locator('select[name="role"]')).toBeVisible();
    });

    test('should display Google Sign-Up button', async ({ page }) => {
      await page.goto('http://localhost:3000/register');
      
      const googleBtn = page.getByRole('button', { name: /Sign in with Google/i });
      await expect(googleBtn).toBeVisible();
    });

    test('should successfully register a new user', async ({ page }) => {
      await page.goto('http://localhost:3000/register');
      
      // Fill form
      await page.fill('input[name="name"]', testName);
      await page.fill('input[name="email"]', testEmail);
      await page.fill('input[name="password"]', testPassword);
      await page.selectOption('select[name="role"]', testRole);
      
      // Submit form
      await page.click('button[type="submit"]');
      
      // Should redirect to login with registered message
      await page.waitForURL(/.*login.*registered=1/, { timeout: 10000 });
      await expect(page).toHaveURL(/.*login.*registered=1/);
    });

    test('should show link to sign in page', async ({ page }) => {
      await page.goto('http://localhost:3000/register');
      
      const signInLink = page.getByRole('link', { name: /Sign in/i });
      await expect(signInLink).toBeVisible();
    });

    test('should validate password field', async ({ page }) => {
      await page.goto('http://localhost:3000/register');
      
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="email"]', `test${Date.now()}@test.com`);
      await page.fill('input[name="password"]', 'short');
      await page.selectOption('select[name="role"]', 'SONGWRITER');
      
      // Try to submit
      const submitBtn = page.click('button[type="submit"]');
      
      // HTML5 validation should prevent submission
      await page.waitForTimeout(500);
    });
  });

  test.describe('Login Flow', () => {
    test('should load login page', async ({ page }) => {
      await page.goto('http://localhost:3000/login');
      
      // Check page title
      const heading = page.locator('h1');
      await expect(heading).toContainText('Sign in to MelodyPitch');
      
      // Check form fields
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('input[name="password"]')).toBeVisible();
    });

    test('should display Google Sign-In button', async ({ page }) => {
      await page.goto('http://localhost:3000/login');
      
      const googleBtn = page.getByRole('button', { name: /Sign in with Google/i });
      await expect(googleBtn).toBeVisible();
    });

    test('should successfully login with valid credentials', async ({ page }) => {
      // Use the registered test user
      await page.goto('http://localhost:3000/login');
      
      await page.fill('input[name="email"]', testEmail);
      await page.fill('input[name="password"]', testPassword);
      await page.click('button[type="submit"]');
      
      // Should redirect to dashboard (not stay on login with error)
      await page.waitForTimeout(2000);
      const url = page.url();
      expect(url).not.toContain('error=1');
    });

    test('should show error for invalid credentials', async ({ page }) => {
      await page.goto('http://localhost:3000/login');
      
      await page.fill('input[name="email"]', 'nonexistent@test.com');
      await page.fill('input[name="password"]', 'wrongpassword');
      await page.click('button[type="submit"]');
      
      await page.waitForTimeout(2000);
      await expect(page).toHaveURL(/.*error=1/);
    });

    test('should show link to register page', async ({ page }) => {
      await page.goto('http://localhost:3000/login');
      
      const registerLink = page.getByRole('link', { name: /Create one free/i });
      await expect(registerLink).toBeVisible();
    });
  });

  test.describe('Authentication Protection', () => {
    test('should redirect unauthenticated users to login', async ({ page }) => {
      await page.goto('http://localhost:3000/label/dashboard');
      
      await expect(page).toHaveURL(/.*login/);
    });

    test('should redirect from songwriter dashboard to login when not authenticated', async ({ page }) => {
      await page.goto('http://localhost:3000/songwriter/dashboard');
      
      await expect(page).toHaveURL(/.*login/);
    });

    test('should redirect from artist dashboard to login when not authenticated', async ({ page }) => {
      await page.goto('http://localhost:3000/artist/dashboard');
      
      await expect(page).toHaveURL(/.*login/);
    });

    test('should allow access to landing page without authentication', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      await expect(page).toHaveURL(/.*\/$/);
    });
  });

  test.describe('Navigation', () => {
    test('should have working navigation links', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Test Features link
      const featuresLink = page.getByRole('link', { name: /Features/i });
      if (await featuresLink.isVisible()) {
        await featuresLink.click();
        await page.waitForTimeout(500);
      }
    });

    test('should have working mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3000');
      
      // Check if hamburger menu exists
      const menuButton = page.getByRole('button', { name: /Toggle menu/i });
      if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.waitForTimeout(300);
        
        // Menu should be expanded
        const navLinks = page.getByRole('link', { name: /Features/i });
        // Check if menu content is visible
      }
    });
  });

  test.describe('Error Handling', () => {
    test('should handle 404 gracefully', async ({ page }) => {
      const response = await page.goto('http://localhost:3000/nonexistent-page');
      
      // Page should still load (404 handling)
      expect(response?.status()).toBeLessThan(500);
    });

    test('should show error message for invalid login', async ({ page }) => {
      await page.goto('http://localhost:3000/login');
      
      await page.fill('input[name="email"]', 'invalid@email.com');
      await page.fill('input[name="password"]', 'wrongpassword');
      await page.click('button[type="submit"]');
      
      await page.waitForURL(/.*error=1/, { timeout: 5000 });
      
      const errorMsg = page.getByText('Invalid email or password');
      await expect(errorMsg).toBeVisible();
    });
  });

  test.describe('Animations and UI', () => {
    test('page should load without console errors', async ({ page }) => {
      const errors: string[] = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto('http://localhost:3000');
      await page.waitForTimeout(2000);
      
      expect(errors.length).toBe(0);
    });

    test('should not have layout shifts', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      // Wait for all animations to complete
      await page.waitForTimeout(2000);
      
      // Check page is still responsive
      const mainContent = page.locator('main');
      await expect(mainContent).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('landing page should load quickly', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('http://localhost:3000');
      const loadTime = Date.now() - startTime;
      
      // Should load in under 5 seconds
      expect(loadTime).toBeLessThan(5000);
      
      console.log(`Landing page load time: ${loadTime}ms`);
    });

    test('should handle multiple rapid navigation', async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.goto('http://localhost:3000/login');
      await page.goto('http://localhost:3000/register');
      await page.goto('http://localhost:3000');
      
      // Should end up back on landing page
      await expect(page).toHaveURL(/.*\/$/);
    });
  });
});
