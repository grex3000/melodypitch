# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: full-app-test.spec.ts >> MelodyPitch Full Application Test Suite >> Landing Page >> should display hero section correctly
- Location: tests/e2e/full-app-test.spec.ts:28:9

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1')
Expected substring: "Where great songs meet their audience"
Received string:    "Where great songsmeet their audience"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h1')
    8 × locator resolved to <h1 class="jsx-c3a2862e41502fa0 type-h1 mb-6 text-fg-1 leading-tight">…</h1>
      - unexpected value "Where great songsmeet their audience"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - navigation [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - link "M MelodyPitch" [ref=e6] [cursor=pointer]:
            - /url: /
            - generic [ref=e7]: M
            - text: MelodyPitch
          - generic [ref=e8]:
            - link "Features" [ref=e9] [cursor=pointer]:
              - /url: "#features"
            - link "How it Works" [ref=e10] [cursor=pointer]:
              - /url: "#how-it-works"
          - generic [ref=e11]:
            - link "Sign in" [ref=e13] [cursor=pointer]:
              - /url: /login
            - link "Get started" [ref=e15] [cursor=pointer]:
              - /url: /register
          - button "Toggle menu" [ref=e16]:
            - img [ref=e17]
        - generic [ref=e19]:
          - link "Features" [ref=e20] [cursor=pointer]:
            - /url: "#features"
          - link "How it Works" [ref=e21] [cursor=pointer]:
            - /url: "#how-it-works"
          - generic [ref=e22]:
            - link "Sign in" [ref=e24] [cursor=pointer]:
              - /url: /login
            - link "Get started" [ref=e26] [cursor=pointer]:
              - /url: /register
    - generic [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e31]: Now in public beta
        - heading "Where great songs meet their audience" [level=1] [ref=e32]:
          - text: Where great songs
          - text: meet their audience
        - paragraph [ref=e33]: MelodyPitch is the modern way for songwriters and labels to connect. Skip the gatekeepers. Skip the cold emails. Just pure music discovery, done right.
        - generic [ref=e34]:
          - link "Get started free" [ref=e36] [cursor=pointer]:
            - /url: /register
            - text: Get started free
            - img [ref=e37]
          - link "See how it works" [ref=e40] [cursor=pointer]:
            - /url: "#features"
            - img [ref=e41]
            - text: See how it works
        - generic [ref=e43]:
          - generic [ref=e44]: 2,400+ creators
          - text: No credit card
      - generic [ref=e47]:
        - generic [ref=e49]:
          - img [ref=e51]
          - generic [ref=e54]:
            - paragraph [ref=e55]: Midnight Echoes
            - paragraph [ref=e56]: Submitted 2h ago
        - generic [ref=e57]:
          - generic [ref=e58]:
            - text: Status
            - generic [ref=e59]: Under review
          - generic [ref=e60]: Views this week847
    - generic [ref=e62]:
      - generic [ref=e64]:
        - generic [ref=e65]:
          - img [ref=e66]
          - text: Powerful features
        - heading "Everything you need to pitch" [level=2] [ref=e68]
        - paragraph [ref=e69]: From submission to signed deal, MelodyPitch streamlines every step of the music discovery process with tools built for modern creators.
      - generic [ref=e70]:
        - generic [ref=e72]:
          - img [ref=e75]
          - heading "Smart Portals" [level=3] [ref=e78]
          - paragraph [ref=e79]: Labels create branded submission portals with custom briefs, deadlines, and genre requirements.
          - generic [ref=e81]:
            - img [ref=e82]
            - text: Featured
        - generic [ref=e85]:
          - img [ref=e88]
          - heading "Real-time Analytics" [level=3] [ref=e91]
          - paragraph [ref=e92]: Track submission performance, label engagement, and pitch conversion rates.
        - generic [ref=e94]:
          - img [ref=e97]
          - heading "Direct Communication" [level=3] [ref=e100]
          - paragraph [ref=e101]: Built-in messaging between songwriters and A&R. No more lost emails.
        - generic [ref=e103]:
          - img [ref=e106]
          - heading "One-Click Submissions" [level=3] [ref=e109]
          - paragraph [ref=e110]: Upload once, pitch to multiple labels. Your metadata follows the track.
          - generic [ref=e112]:
            - img [ref=e113]
            - text: Featured
        - generic [ref=e116]:
          - img [ref=e119]
          - heading "Demo Management" [level=3] [ref=e122]
          - paragraph [ref=e123]: Store all your versions, stems, and production notes in one place.
    - generic [ref=e125]:
      - heading "How MelodyPitch Works" [level=2] [ref=e126]
      - generic [ref=e127]:
        - generic [ref=e128]:
          - generic [ref=e129]: "1"
          - heading "Create a Portal" [level=3] [ref=e130]
          - paragraph [ref=e131]: Labels set up branded submission portals with custom briefs and deadlines.
        - generic [ref=e132]:
          - generic [ref=e133]: "2"
          - heading "Submit Demos" [level=3] [ref=e134]
          - paragraph [ref=e135]: Songwriters upload tracks with metadata, genres, and personal notes to label.
        - generic [ref=e136]:
          - generic [ref=e137]: "3"
          - heading "Pitch to Artists" [level=3] [ref=e138]
          - paragraph [ref=e139]: Labels curate pitch packages and send selected tracks directly to artists.
    - generic [ref=e141]:
      - heading "Ready to get your music heard?" [level=2] [ref=e142]
      - paragraph [ref=e143]: Join thousands of songwriters and artists who are building their careers with MelodyPitch.
      - generic [ref=e144]:
        - link "Create free account" [ref=e145] [cursor=pointer]:
          - /url: /register
        - link "Sign in" [ref=e146] [cursor=pointer]:
          - /url: /login
      - paragraph [ref=e147]: Free forever for songwriters and artists
    - generic [ref=e150]:
      - generic [ref=e151]:
        - generic [ref=e152]: M
        - text: MelodyPitch
      - paragraph [ref=e153]: 2026 MelodyPitch. All rights reserved.
  - alert [ref=e154]
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
> 33  |       await expect(headline).toContainText('Where great songs meet their audience');
      |                              ^ Error: expect(locator).toContainText(expected) failed
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
  67  |       await expect(signInBtn).toBeVisible();
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
```