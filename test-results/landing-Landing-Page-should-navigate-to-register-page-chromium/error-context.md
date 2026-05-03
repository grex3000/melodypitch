# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing.spec.ts >> Landing Page >> should navigate to register page
- Location: tests/e2e/landing.spec.ts:12:7

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('link', { name: 'Start Free Beta' })

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Landing Page', () => {
  4  |   test('should display hero section', async ({ page }) => {
  5  |     await page.goto('http://localhost:3000/');
  6  |     
  7  |     // Check hero section is visible
  8  |     await expect(page.locator('h1')).toContainText('Connect Songwriters with Labels & Artists');
  9  |     await expect(page.getByRole('link', { name: 'Start Free Beta' })).toBeVisible();
  10 |   });
  11 | 
  12 |   test('should navigate to register page', async ({ page }) => {
  13 |     await page.goto('http://localhost:3000/');
  14 |     
> 15 |     await page.getByRole('link', { name: 'Start Free Beta' }).click();
     |                                                               ^ Error: locator.click: Target page, context or browser has been closed
  16 |     await expect(page).toHaveURL('http://localhost:3000/register');
  17 |   });
  18 | 
  19 |   test('should display features section', async ({ page }) => {
  20 |     await page.goto('http://localhost:3000/');
  21 |     
  22 |     // Check features section specifically
  23 |     const featuresSection = page.locator('section').nth(1); // Second section is features
  24 |     await expect(featuresSection.getByText('Portal Submission')).toBeVisible();
  25 |     await expect(featuresSection.getByText('Pitch Management')).toBeVisible();
  26 |     await expect(featuresSection.getByText('Analytics Dashboard')).toBeVisible();
  27 |   });
  28 | 
  29 |   test('should be mobile responsive', async ({ page }) => {
  30 |     await page.setViewportSize({ width: 375, height: 812 });
  31 |     await page.goto('http://localhost:3000/');
  32 |     
  33 |     // Check that content is visible on mobile
  34 |     await expect(page.locator('h1')).toBeVisible();
  35 |     await expect(page.getByRole('link', { name: 'Start Free Beta' })).toBeVisible();
  36 |   });
  37 | });
  38 | 
```