# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login-and-dashboards.spec.ts >> Login & Role-Based Dashboards >> Role-Based Dashboard Access >> SONGWRITER user sees correct dashboard
- Location: tests/e2e/login-and-dashboards.spec.ts:60:11

# Error details

```
Error: page.waitForURL: Target page, context or browser has been closed
=========================== logs ===========================
waiting for navigation until "load"
  navigated to "http://localhost:3000/"
============================================================
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Login & Role-Based Dashboards', () => {
  4   |   const testAccounts = [
  5   |     {
  6   |       role: 'LABEL',
  7   |       email: 'label-test@melodypitch.test',
  8   |       password: 'LabelTest123!',
  9   |       dashboardPath: '/label/dashboard',
  10  |       dashboardTitle: 'My Submissions',
  11  |     },
  12  |     {
  13  |       role: 'SONGWRITER',
  14  |       email: 'songwriter-test@melodypitch.test',
  15  |       password: 'SongwriterTest123!',
  16  |       dashboardPath: '/songwriter/dashboard',
  17  |       dashboardTitle: 'My Submissions',
  18  |     },
  19  |     {
  20  |       role: 'ARTIST',
  21  |       email: 'artist-test@melodypitch.test',
  22  |       password: 'ArtistTest123!',
  23  |       dashboardPath: '/artist/dashboard',
  24  |       dashboardTitle: 'Artist Dashboard',
  25  |     },
  26  |   ];
  27  | 
  28  |   test.describe('Login Functionality', () => {
  29  |     for (const account of testAccounts) {
  30  |       test(`${account.role} user can login`, async ({ page }) => {
  31  |         console.log(`\n🔐 Testing ${account.role} login`);
  32  |         
  33  |         await page.goto('http://localhost:3000/login');
  34  |         console.log(`   ✅ Navigated to login page`);
  35  | 
  36  |         // Fill in credentials
  37  |         await page.fill('input[name="email"]', account.email);
  38  |         console.log(`   ✅ Email entered`);
  39  | 
  40  |         await page.fill('input[name="password"]', account.password);
  41  |         console.log(`   ✅ Password entered`);
  42  | 
  43  |         // Submit form
  44  |         await page.click('button[type="submit"]');
  45  |         console.log(`   🔄 Submitting login form...`);
  46  | 
  47  |         // Should redirect to dashboard
  48  |         await page.waitForURL(/dashboard/, { timeout: 10000 });
  49  |         const url = page.url();
  50  |         console.log(`   ✅ Redirected to: ${url}`);
  51  | 
  52  |         expect(url).toContain('dashboard');
  53  |         console.log(`   ✅ ${account.role} login successful!\n`);
  54  |       });
  55  |     }
  56  |   });
  57  | 
  58  |   test.describe('Role-Based Dashboard Access', () => {
  59  |     for (const account of testAccounts) {
  60  |       test(`${account.role} user sees correct dashboard`, async ({ page }) => {
  61  |         console.log(`\n📊 Testing ${account.role} dashboard access`);
  62  |         
  63  |         // Login
  64  |         await page.goto('http://localhost:3000/login');
  65  |         await page.fill('input[name="email"]', account.email);
  66  |         await page.fill('input[name="password"]', account.password);
  67  |         await page.click('button[type="submit"]');
  68  | 
  69  |         // Wait for dashboard
> 70  |         await page.waitForURL(/dashboard/, { timeout: 10000 });
      |                    ^ Error: page.waitForURL: Target page, context or browser has been closed
  71  |         console.log(`   ✅ On dashboard`);
  72  | 
  73  |         // Check URL contains role-specific path
  74  |         const url = page.url();
  75  |         expect(url).toContain(account.dashboardPath);
  76  |         console.log(`   ✅ Correct dashboard path: ${account.dashboardPath}`);
  77  | 
  78  |         // Page should load without errors
  79  |         const pageTitle = await page.title();
  80  |         console.log(`   ✅ Page title: ${pageTitle}`);
  81  | 
  82  |         console.log(`   ✅ ${account.role} dashboard access verified!\n`);
  83  |       });
  84  |     }
  85  |   });
  86  | 
  87  |   test.describe('Session Management', () => {
  88  |     test('user remains logged in after navigation', async ({ page }) => {
  89  |       const account = testAccounts[0]; // Use label account
  90  |       console.log(`\n🔐 Testing session persistence`);
  91  | 
  92  |       // Login
  93  |       await page.goto('http://localhost:3000/login');
  94  |       await page.fill('input[name="email"]', account.email);
  95  |       await page.fill('input[name="password"]', account.password);
  96  |       await page.click('button[type="submit"]');
  97  | 
  98  |       await page.waitForURL(/dashboard/);
  99  |       console.log(`   ✅ Logged in`);
  100 | 
  101 |       // Navigate away
  102 |       await page.goto('http://localhost:3000/');
  103 |       console.log(`   ✅ Navigated to home page`);
  104 | 
  105 |       // Should still be logged in (home page should be accessible to authenticated users)
  106 |       // Try to go back to dashboard
  107 |       await page.goto(`http://localhost:3000${account.dashboardPath}`);
  108 |       const url = page.url();
  109 |       console.log(`   ✅ Back on dashboard: ${url}`);
  110 | 
  111 |       expect(url).toContain('dashboard');
  112 |       console.log(`   ✅ Session persisted!\n`);
  113 |     });
  114 | 
  115 |     test('protected routes redirect to login when not authenticated', async ({ page }) => {
  116 |       console.log(`\n🛡️ Testing protected route access`);
  117 | 
  118 |       // Clear cookies to simulate logout
  119 |       await page.context().clearCookies();
  120 |       console.log(`   🔄 Cleared session cookies`);
  121 | 
  122 |       // Try to access protected route
  123 |       await page.goto('http://localhost:3000/label/dashboard', { waitUntil: 'networkidle' });
  124 |       await page.waitForTimeout(1000);
  125 | 
  126 |       const url = page.url();
  127 |       console.log(`   📍 Current URL: ${url}`);
  128 | 
  129 |       // Should redirect to login or show error
  130 |       if (url.includes('login')) {
  131 |         console.log(`   ✅ Redirected to login (protected route working)`);
  132 |       } else if (url.includes('dashboard')) {
  133 |         console.log(`   ⚠️  Still on dashboard (check if session was actually cleared)`);
  134 |       }
  135 |       
  136 |       console.log(`   ✅ Protected route access control verified!\n`);
  137 |     });
  138 |   });
  139 | 
  140 |   test.describe('Dashboard Content Verification', () => {
  141 |     test('LABEL dashboard shows label-specific content', async ({ page }) => {
  142 |       const account = testAccounts[0];
  143 |       console.log(`\n📋 Testing LABEL dashboard content`);
  144 | 
  145 |       // Login as label
  146 |       await page.goto('http://localhost:3000/login');
  147 |       await page.fill('input[name="email"]', account.email);
  148 |       await page.fill('input[name="password"]', account.password);
  149 |       await page.click('button[type="submit"]');
  150 | 
  151 |       await page.waitForURL(/label\/dashboard/);
  152 |       console.log(`   ✅ On LABEL dashboard`);
  153 | 
  154 |       // Check for label-specific content
  155 |       const content = await page.content();
  156 |       if (content.includes('Submissions') || content.includes('Portal')) {
  157 |         console.log(`   ✅ Label-specific content found`);
  158 |       } else {
  159 |         console.log(`   📋 Page loaded (content verification skipped)`);
  160 |       }
  161 | 
  162 |       console.log(`   ✅ LABEL dashboard verified!\n`);
  163 |     });
  164 | 
  165 |     test('SONGWRITER dashboard shows songwriter-specific content', async ({ page }) => {
  166 |       const account = testAccounts[1];
  167 |       console.log(`\n📋 Testing SONGWRITER dashboard content`);
  168 | 
  169 |       // Login as songwriter
  170 |       await page.goto('http://localhost:3000/login');
```