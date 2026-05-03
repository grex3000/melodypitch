import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Check hero section is visible
    await expect(page.locator('h1')).toContainText('Where great songs');
    await expect(page.getByRole('link', { name: 'Get started free' })).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    await page.getByRole('link', { name: 'Get started free' }).click();
    await expect(page).toHaveURL('http://localhost:3000/register');
  });

  test('should display features section', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    // Check features section specifically
    const featuresSection = page.locator('section').nth(1); // Second section is features
    await expect(featuresSection.getByText('Portal Submission')).toBeVisible();
    await expect(featuresSection.getByText('Pitch Management')).toBeVisible();
    await expect(featuresSection.getByText('Analytics Dashboard')).toBeVisible();
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:3000/');
    
    // Check that content is visible on mobile
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get started free' })).toBeVisible();
  });
});
