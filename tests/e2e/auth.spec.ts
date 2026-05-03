import { test, expect } from '@playwright/test';

test.describe('Auth Flow', () => {
  test('should redirect to login from protected route', async ({ page }) => {
    await page.goto('http://localhost:3000/label/dashboard');
    await expect(page).toHaveURL(/.*login/);
  });

  test('should login successfully with test account', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'label-test@melodypitch.test');
    await page.fill('input[name="password"]', 'LabelTest123!');
    await page.click('button[type="submit"]');
    // Should redirect to label dashboard
    await page.waitForURL(/.*label\/dashboard/, { timeout: 5000 });
    await expect(page).toHaveURL(/.*label\/dashboard/);
  });
});
