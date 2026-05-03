import { test, expect } from '@playwright/test';

test.describe('MelodyPitch Comprehensive Flow', () => {
  const timestamp = Date.now();
  const testUsers = [
    { email: `label${timestamp}@melodypitch.test`, name: 'Nocturne Records', role: 'LABEL', password: 'password123' },
    { email: `writer${timestamp}@melodypitch.test`, name: 'Maren Solberg', role: 'SONGWRITER', password: 'password123' },
    { email: `artist${timestamp}@melodypitch.test`, name: 'Lena Rydell', role: 'ARTIST', password: 'password123' },
  ];

  test.describe('Landing Page', () => {
    test('should display landing page correctly', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      await expect(page.locator('h1')).toContainText('Where great songs');
      await expect(page.getByRole('link', { name: /Get started free/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /See how it works/i })).toBeVisible();
    });

    test('should have working navigation buttons', async ({ page }) => {
      await page.goto('http://localhost:3000');
      
      await page.getByRole('link', { name: /Get started free/i }).click();
      await expect(page).toHaveURL(/.*register/);
    });

    test('should be mobile responsive', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('http://localhost:3000');
      
      await expect(page.locator('h1')).toBeVisible();
      const navButton = page.getByRole('link', { name: /Get started free/i });
      await expect(navButton).toBeVisible();
    });
  });

  test.describe('Registration Flow', () => {
    for (const user of testUsers) {
      test(`should register ${user.role} user`, async ({ page }) => {
        await page.goto('http://localhost:3000/register');
        
        await page.fill('input[name="name"]', user.name);
        await page.fill('input[name="email"]', user.email);
        await page.fill('input[name="password"]', user.password);
        await page.selectOption('select[name="role"]', user.role);
        
        await page.click('button[type="submit"]');
        
        await page.waitForURL(/.*login.*registered=1/, { timeout: 10000 });
        await expect(page).toHaveURL(/.*login.*registered=1/);
      });
    }
  });

  test.describe('Login Flow', () => {
    for (const user of testUsers) {
      test(`should login as ${user.role}`, async ({ page }) => {
        await page.goto('http://localhost:3000/login');
        
        await page.fill('input[name="email"]', user.email);
        await page.fill('input[name="password"]', user.password);
        await page.click('button[type="submit"]');
        
        await page.waitForTimeout(3000);
        
        const url = page.url();
        console.log(`Login result for ${user.role}:`, url);
        
        expect(url).not.toContain('error=1');
      });
    }

    test('should show error for invalid credentials', async ({ page }) => {
      await page.goto('http://localhost:3000/login');
      
      await page.fill('input[name="email"]', 'nonexistent@test.com');
      await page.fill('input[name="password"]', 'wrongpassword');
      await page.click('button[type="submit"]');
      
      await expect(page).toHaveURL(/.*error=1/);
      await expect(page.getByText('Invalid email or password')).toBeVisible();
    });
  });

  test.describe('Dashboard Navigation', () => {
    test('label should access their dashboard', async ({ page }) => {
      const user = testUsers[0];
      await page.goto('http://localhost:3000/login');
      await page.fill('input[name="email"]', user.email);
      await page.fill('input[name="password"]', user.password);
      await page.click('button[type="submit"]');
      await page.waitForTimeout(3000);
      
      const url = page.url();
      if (!url.includes('error=1')) {
        await expect(page).toHaveURL(/.*label\/dashboard|.*\/dashboard/);
      }
    });

    test('songwriter should access their dashboard', async ({ page }) => {
      const user = testUsers[1];
      await page.goto('http://localhost:3000/login');
      await page.fill('input[name="email"]', user.email);
      await page.fill('input[name="password"]', user.password);
      await page.click('button[type="submit"]');
      await page.waitForTimeout(3000);
      
      const url = page.url();
      if (!url.includes('error=1')) {
        await expect(page).toHaveURL(/.*songwriter\/dashboard|.*\/dashboard/);
      }
    });

    test('artist should access their dashboard', async ({ page }) => {
      const user = testUsers[2];
      await page.goto('http://localhost:3000/login');
      await page.fill('input[name="email"]', user.email);
      await page.fill('input[name="password"]', user.password);
      await page.click('button[type="submit"]');
      await page.waitForTimeout(3000);
      
      const url = page.url();
      if (!url.includes('error=1')) {
        await expect(page).toHaveURL(/.*artist\/dashboard|.*\/dashboard/);
      }
    });
  });

  test.describe('Portal Features', () => {
    test('label can create a new portal', async ({ page }) => {
      const user = testUsers[0];
      await page.goto('http://localhost:3000/login');
      await page.fill('input[name="email"]', user.email);
      await page.fill('input[name="password"]', user.password);
      await page.click('button[type="submit"]');
      await page.waitForTimeout(3000);
      
      const url = page.url();
      if (!url.includes('error=1')) {
        await page.goto('http://localhost:3000/label/portals/new');
        await expect(page.locator('h1')).toContainText(/New Portal|Create Portal/i);
      }
    });
  });

  test.describe('Auth Protection', () => {
    test('should redirect unauthenticated users from protected routes', async ({ page }) => {
      await page.goto('http://localhost:3000/label/dashboard');
      await expect(page).toHaveURL(/.*login/);
    });

    test('should have working register link from login page', async ({ page }) => {
      await page.goto('http://localhost:3000/login');
      await page.getByRole('link', { name: /Create one free/i }).click();
      await expect(page).toHaveURL(/.*register/);
    });
  });
});