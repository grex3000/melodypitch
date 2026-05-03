# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: full-app-test.spec.ts >> MelodyPitch Full Application Test Suite >> Landing Page >> navbar should have sign in and get started buttons
- Location: tests/e2e/full-app-test.spec.ts:62:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /Sign in/i })
Expected: visible
Error: strict mode violation: getByRole('link', { name: /Sign in/i }) resolved to 2 elements:
    1) <a href="/login">Sign in</a> aka getByRole('navigation').getByRole('link', { name: 'Sign in' })
    2) <a href="/login" class="inline-flex items-center justify-center px-8 py-4 border border-border-default text-fg-2 font-medium rounded-lg hover:bg-bg-surface-1 hover:text-fg-1 transition-colors">Sign in</a> aka getByRole('link', { name: 'Sign in' }).nth(1)

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /Sign in/i })

```

# Page snapshot

```yaml
- main [ref=e2]:
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "M" [ref=e6] [cursor=pointer]:
          - /url: /
          - generic [ref=e8]: M
        - button "Toggle menu" [ref=e9] [cursor=pointer]:
          - img [ref=e10]
      - generic [ref=e13]:
        - link "Features" [ref=e14] [cursor=pointer]:
          - /url: "#features"
        - link "How it Works" [ref=e15] [cursor=pointer]:
          - /url: "#how-it-works"
        - generic [ref=e16]:
          - link "Sign in" [ref=e18] [cursor=pointer]:
            - /url: /login
          - link "Get started" [ref=e20] [cursor=pointer]:
            - /url: /register
  - generic [ref=e24]:
    - generic [ref=e27]: Now in public beta
    - heading "Where great songs meet their audience" [level=1] [ref=e28]:
      - text: Where great songs
      - text: meet their audience
    - paragraph [ref=e29]: MelodyPitch is the modern way for songwriters and labels to connect. Skip the gatekeepers. Skip the cold emails. Just pure music discovery, done right.
    - generic [ref=e30]:
      - link "Get started free" [ref=e32] [cursor=pointer]:
        - /url: /register
        - text: Get started free
        - img [ref=e33]
      - link "See how it works" [ref=e36] [cursor=pointer]:
        - /url: "#features"
        - img [ref=e37]
        - text: See how it works
    - generic [ref=e39]:
      - generic [ref=e45]: 2,400+ creators
      - generic [ref=e47]: No credit card
  - generic [ref=e49]:
    - generic [ref=e51]:
      - generic [ref=e52]:
        - img [ref=e53]
        - generic [ref=e55]: Powerful features
      - heading "Everything you need to pitch" [level=2] [ref=e56]
      - paragraph [ref=e57]: From submission to signed deal, MelodyPitch streamlines every step of the music discovery process with tools built for modern creators.
    - generic [ref=e58]:
      - generic [ref=e60]:
        - img [ref=e63]
        - heading "Smart Portals" [level=3] [ref=e66]
        - paragraph [ref=e67]: Labels create branded submission portals with custom briefs, deadlines, and genre requirements.
        - generic [ref=e69]:
          - img [ref=e70]
          - generic [ref=e72]: Featured
      - generic [ref=e74]:
        - img [ref=e77]
        - heading "Real-time Analytics" [level=3] [ref=e80]
        - paragraph [ref=e81]: Track submission performance, label engagement, and pitch conversion rates.
      - generic [ref=e83]:
        - img [ref=e86]
        - heading "Direct Communication" [level=3] [ref=e89]
        - paragraph [ref=e90]: Built-in messaging between songwriters and A&R. No more lost emails.
      - generic [ref=e92]:
        - img [ref=e95]
        - heading "One-Click Submissions" [level=3] [ref=e98]
        - paragraph [ref=e99]: Upload once, pitch to multiple labels. Your metadata follows the track.
        - generic [ref=e101]:
          - img [ref=e102]
          - generic [ref=e104]: Featured
      - generic [ref=e106]:
        - img [ref=e109]
        - heading "Demo Management" [level=3] [ref=e112]
        - paragraph [ref=e113]: Store all your versions, stems, and production notes in one place.
  - generic [ref=e115]:
    - heading "How MelodyPitch Works" [level=2] [ref=e116]
    - generic [ref=e117]:
      - generic [ref=e118]:
        - generic [ref=e119]: "1"
        - heading "Create a Portal" [level=3] [ref=e120]
        - paragraph [ref=e121]: Labels set up branded submission portals with custom briefs and deadlines.
      - generic [ref=e122]:
        - generic [ref=e123]: "2"
        - heading "Submit Demos" [level=3] [ref=e124]
        - paragraph [ref=e125]: Songwriters upload tracks with metadata, genres, and personal notes to label.
      - generic [ref=e126]:
        - generic [ref=e127]: "3"
        - heading "Pitch to Artists" [level=3] [ref=e128]
        - paragraph [ref=e129]: Labels curate pitch packages and send selected tracks directly to artists.
  - generic [ref=e131]:
    - heading "Ready to get your music heard?" [level=2] [ref=e132]
    - paragraph [ref=e133]: Join thousands of songwriters and artists who are building their careers with MelodyPitch.
    - generic [ref=e134]:
      - link "Create free account" [ref=e135] [cursor=pointer]:
        - /url: /register
      - link "Sign in" [ref=e136] [cursor=pointer]:
        - /url: /login
    - paragraph [ref=e137]: Free forever for songwriters and artists
  - generic [ref=e140]:
    - generic [ref=e141]:
      - generic [ref=e143]: M
      - generic [ref=e144]: MelodyPitch
    - paragraph [ref=e145]: 2026 MelodyPitch. All rights reserved.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('MelodyPitch Full Application Test Suite', () => {
  4   |   const timestamp = Date.now();
  5   |   const testEmail = `test${timestamp}@melodypitch.test`;
  6   |   const testPassword = 'password123';
  7   |   const testName = 'Test User';
  8   |   const testRole = 'SONGWRITER';
  9   | 
  10  |   test.describe('Landing Page', () => {
  11  |     test('should load landing page with navbar and hero', async ({ page }) => {
  12  |       await page.goto('http://localhost:3000');
  13  |       
  14  |       // Check navbar is present
  15  |       await expect(page.locator('nav')).toBeVisible();
  16  |       
  17  |       // Check logo
  18  |       await expect(page.getByRole('link').first()).toBeVisible();
  19  |       
  20  |       // Check hero section exists
  21  |       await expect(page.locator('h1')).toBeVisible();
  22  |       
  23  |       // Check hero has content
  24  |       const heroText = await page.locator('h1').textContent();
  25  |       expect(heroText).toBeTruthy();
  26  |     });
  27  | 
  28  |     test('should display hero section correctly', async ({ page }) => {
  29  |       await page.goto('http://localhost:3000');
  30  |       
  31  |       // Check hero headline
  32  |       const headline = page.locator('h1');
  33  |       await expect(headline).toContainText('Where great songs meet their audience');
  34  |       
  35  |       // Check subheading
  36  |       const subheading = page.locator('p').first();
  37  |       await expect(subheading).toBeVisible();
  38  |       
  39  |       // Check CTA buttons
  40  |       const ctaButton = page.getByRole('link', { name: /Get started free/i });
  41  |       await expect(ctaButton).toBeVisible();
  42  |     });
  43  | 
  44  |     test('should display features section with bento grid', async ({ page }) => {
  45  |       await page.goto('http://localhost:3000');
  46  |       
  47  |       // Scroll to features section
  48  |       await page.evaluate(() => {
  49  |         const featuresSection = document.querySelector('#features');
  50  |         if (featuresSection) {
  51  |           featuresSection.scrollIntoView();
  52  |         }
  53  |       });
  54  |       
  55  |       await page.waitForTimeout(500);
  56  |       
  57  |       // Check if features heading exists
  58  |       const heading = await page.locator('text=Everything you need to pitch').isVisible();
  59  |       expect(heading).toBeTruthy();
  60  |     });
  61  | 
  62  |     test('navbar should have sign in and get started buttons', async ({ page }) => {
  63  |       await page.goto('http://localhost:3000');
  64  |       
  65  |       // Check for Sign in button
  66  |       const signInBtn = page.getByRole('link', { name: /Sign in/i });
> 67  |       await expect(signInBtn).toBeVisible();
      |                               ^ Error: expect(locator).toBeVisible() failed
  68  |       
  69  |       // Check for Get started button
  70  |       const getStartedBtn = page.getByRole('link', { name: /Get started/i });
  71  |       await expect(getStartedBtn).toBeVisible();
  72  |     });
  73  | 
  74  |     test('navbar sign in button should navigate to login', async ({ page }) => {
  75  |       await page.goto('http://localhost:3000');
  76  |       
  77  |       const signInBtn = page.getByRole('link', { name: /Sign in/i }).first();
  78  |       await signInBtn.click();
  79  |       
  80  |       await expect(page).toHaveURL(/.*login/);
  81  |     });
  82  | 
  83  |     test('navbar get started button should navigate to register', async ({ page }) => {
  84  |       await page.goto('http://localhost:3000');
  85  |       
  86  |       const getStartedBtn = page.getByRole('link', { name: /Get started/i }).first();
  87  |       await getStartedBtn.click();
  88  |       
  89  |       await expect(page).toHaveURL(/.*register/);
  90  |     });
  91  | 
  92  |     test('should be responsive on mobile', async ({ page }) => {
  93  |       await page.setViewportSize({ width: 375, height: 667 });
  94  |       await page.goto('http://localhost:3000');
  95  |       
  96  |       // Check hero is still visible
  97  |       await expect(page.locator('h1')).toBeVisible();
  98  |       
  99  |       // Check navbar is visible
  100 |       await expect(page.locator('nav')).toBeVisible();
  101 |       
  102 |       // Check mobile menu button exists
  103 |       const menuButton = page.getByRole('button', { name: /Toggle menu/i });
  104 |       const isVisible = await menuButton.isVisible();
  105 |       
  106 |       // On mobile, hamburger menu should be visible
  107 |       if (isVisible) {
  108 |         await expect(menuButton).toBeVisible();
  109 |       }
  110 |     });
  111 | 
  112 |     test('should be responsive on tablet', async ({ page }) => {
  113 |       await page.setViewportSize({ width: 768, height: 1024 });
  114 |       await page.goto('http://localhost:3000');
  115 |       
  116 |       await expect(page.locator('h1')).toBeVisible();
  117 |       await expect(page.locator('nav')).toBeVisible();
  118 |     });
  119 | 
  120 |     test('should be responsive on desktop', async ({ page }) => {
  121 |       await page.setViewportSize({ width: 1920, height: 1080 });
  122 |       await page.goto('http://localhost:3000');
  123 |       
  124 |       await expect(page.locator('h1')).toBeVisible();
  125 |       await expect(page.locator('nav')).toBeVisible();
  126 |     });
  127 | 
  128 |     test('should scroll smoothly to sections', async ({ page }) => {
  129 |       await page.goto('http://localhost:3000');
  130 |       
  131 |       // Click "How it works" link if visible
  132 |       const howItWorksLink = page.getByRole('link', { name: /How it works/i });
  133 |       if (await howItWorksLink.isVisible()) {
  134 |         await howItWorksLink.click();
  135 |         await page.waitForTimeout(500);
  136 |       }
  137 |     });
  138 |   });
  139 | 
  140 |   test.describe('Registration Flow', () => {
  141 |     test('should load register page', async ({ page }) => {
  142 |       await page.goto('http://localhost:3000/register');
  143 |       
  144 |       // Check page title
  145 |       const heading = page.locator('h1');
  146 |       await expect(heading).toContainText('Create your account');
  147 |       
  148 |       // Check all form fields are present
  149 |       await expect(page.locator('input[name="name"]')).toBeVisible();
  150 |       await expect(page.locator('input[name="email"]')).toBeVisible();
  151 |       await expect(page.locator('input[name="password"]')).toBeVisible();
  152 |       await expect(page.locator('select[name="role"]')).toBeVisible();
  153 |     });
  154 | 
  155 |     test('should display Google Sign-Up button', async ({ page }) => {
  156 |       await page.goto('http://localhost:3000/register');
  157 |       
  158 |       const googleBtn = page.getByRole('button', { name: /Sign in with Google/i });
  159 |       await expect(googleBtn).toBeVisible();
  160 |     });
  161 | 
  162 |     test('should successfully register a new user', async ({ page }) => {
  163 |       await page.goto('http://localhost:3000/register');
  164 |       
  165 |       // Fill form
  166 |       await page.fill('input[name="name"]', testName);
  167 |       await page.fill('input[name="email"]', testEmail);
```