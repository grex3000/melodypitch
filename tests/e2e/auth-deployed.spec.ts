import { test, expect } from '@playwright/test';

test.describe('Deployed App Authentication', () => {
  const BASE_URL = 'https://melodypitch.vercel.app';
  
  const users = [
    { email: 'label@melodypitch.test', password: 'password123', name: 'Nocturne Records', role: 'LABEL' },
    { email: 'writer@melodypitch.test', password: 'password123', name: 'Maren Solberg', role: 'SONGWRITER' },
    { email: 'artist@melodypitch.test', password: 'password123', name: 'Lena Rydell', role: 'ARTIST' },
  ];

  // First, try to sign up the users
  for (const user of users) {
    test(`sign up ${user.role}`, async ({ page }) => {
      await page.goto(`${BASE_URL}/register`);
      
      // Fill in the form
      await page.fill('input[name="email"]', user.email);
      await page.fill('input[name="name"]', user.name);
      await page.fill('input[name="password"]', user.password);
      await page.selectOption('select[name="role"]', user.role);
      
      // Submit
      await page.click('button[type="submit"]');
      
      // Wait for redirect (to login page with registered=1, or dashboard)
      await page.waitForTimeout(3000);
      
      console.log(`After signup for ${user.email}: ${page.url()}`);
    });
  }

  // Then test login
  test('should login as label', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    
    await page.fill('input[name="email"]', 'label@melodypitch.test');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(3000);
    console.log('After login attempt:', page.url());
    
    // Should NOT have error=1
    expect(page.url()).not.toContain('error=1');
  });
});
