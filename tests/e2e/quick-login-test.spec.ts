import { test, expect } from '@playwright/test';

test('LABEL user can login and access dashboard', async ({ page }) => {
  console.log('\n🔐 Testing LABEL login...');
  
  await page.goto('http://localhost:3000/login');
  console.log('✅ Navigated to login');

  await page.fill('input[name="email"]', 'label-test@melodypitch.test');
  await page.fill('input[name="password"]', 'LabelTest123!');
  console.log('✅ Credentials entered');

  await page.click('button[type="submit"]');
  console.log('🔄 Submitted form...');

  await page.waitForURL(/dashboard/, { timeout: 15000 });
  const url = page.url();
  
  console.log(`✅ Redirected to: ${url}`);
  expect(url).toContain('dashboard');
  console.log('✅ LABEL login successful!');
});

test('SONGWRITER user can login and access dashboard', async ({ page }) => {
  console.log('\n🔐 Testing SONGWRITER login...');
  
  await page.goto('http://localhost:3000/login');
  console.log('✅ Navigated to login');

  await page.fill('input[name="email"]', 'songwriter-test@melodypitch.test');
  await page.fill('input[name="password"]', 'SongwriterTest123!');
  console.log('✅ Credentials entered');

  await page.click('button[type="submit"]');
  console.log('🔄 Submitted form...');

  await page.waitForURL(/dashboard/, { timeout: 15000 });
  const url = page.url();
  
  console.log(`✅ Redirected to: ${url}`);
  expect(url).toContain('songwriter/dashboard');
  console.log('✅ SONGWRITER login successful!');
});

test('ARTIST user can login and access dashboard', async ({ page }) => {
  console.log('\n🔐 Testing ARTIST login...');
  
  await page.goto('http://localhost:3000/login');
  console.log('✅ Navigated to login');

  await page.fill('input[name="email"]', 'artist-test@melodypitch.test');
  await page.fill('input[name="password"]', 'ArtistTest123!');
  console.log('✅ Credentials entered');

  await page.click('button[type="submit"]');
  console.log('🔄 Submitted form...');

  await page.waitForURL(/dashboard/, { timeout: 15000 });
  const url = page.url();
  
  console.log(`✅ Redirected to: ${url}`);
  expect(url).toContain('artist/dashboard');
  console.log('✅ ARTIST login successful!');
});
