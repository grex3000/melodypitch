# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: full-app-test.spec.ts >> MelodyPitch Full Application Test Suite >> Landing Page >> should scroll smoothly to sections
- Location: tests/e2e/full-app-test.spec.ts:128:9

# Error details

```
Error: locator.isVisible: Error: strict mode violation: getByRole('link', { name: /How it works/i }) resolved to 2 elements:
    1) <a href="#how-it-works" class="px-4 py-2 text-fg-2 hover:text-fg-1 transition-colors duration-200 text-sm font-medium">How it Works</a> aka getByRole('link', { name: 'How it Works', exact: true })
    2) <a href="#features" class="jsx-c3a2862e41502fa0 gap-2 flex items-center justify-center">…</a> aka getByRole('link', { name: 'See how it works' })

Call log:
    - checking visibility of getByRole('link', { name: /How it works/i })

```

# Page snapshot

```yaml
- main [ref=e2]:
  - navigation [ref=e3]:
    - generic [ref=e5]:
      - link "M MelodyPitch" [ref=e6] [cursor=pointer]:
        - /url: /
        - generic [ref=e8]: M
        - generic [ref=e9]: MelodyPitch
      - generic [ref=e10]:
        - link "Features" [ref=e11] [cursor=pointer]:
          - /url: "#features"
        - link "How it Works" [ref=e12] [cursor=pointer]:
          - /url: "#how-it-works"
      - generic [ref=e13]:
        - link "Sign in" [ref=e15] [cursor=pointer]:
          - /url: /login
        - link "Get started" [ref=e17] [cursor=pointer]:
          - /url: /register
  - generic [ref=e20]:
    - generic [ref=e21]:
      - generic [ref=e24]: Now in public beta
      - heading "Where great songs meet their audience" [level=1] [ref=e25]:
        - text: Where great songs
        - text: meet their audience
      - paragraph [ref=e26]: MelodyPitch is the modern way for songwriters and labels to connect. Skip the gatekeepers. Skip the cold emails. Just pure music discovery, done right.
      - generic [ref=e27]:
        - link "Get started free" [ref=e29] [cursor=pointer]:
          - /url: /register
          - text: Get started free
          - img [ref=e30]
        - link "See how it works" [ref=e33] [cursor=pointer]:
          - /url: "#features"
          - img [ref=e34]
          - text: See how it works
      - generic [ref=e36]:
        - generic [ref=e42]: 2,400+ creators
        - generic [ref=e44]: No credit card
    - generic [ref=e48]:
      - generic [ref=e50]:
        - img [ref=e52]
        - generic [ref=e55]:
          - paragraph [ref=e56]: Midnight Echoes
          - paragraph [ref=e57]: Submitted 2h ago
      - generic [ref=e71]:
        - generic [ref=e72]:
          - generic [ref=e73]: Status
          - generic [ref=e74]: Under review
        - generic [ref=e76]:
          - generic [ref=e77]: Views this week
          - generic [ref=e78]: "847"
  - generic [ref=e80]:
    - generic [ref=e82]:
      - generic [ref=e83]:
        - img [ref=e84]
        - generic [ref=e86]: Powerful features
      - heading "Everything you need to pitch" [level=2] [ref=e87]
      - paragraph [ref=e88]: From submission to signed deal, MelodyPitch streamlines every step of the music discovery process with tools built for modern creators.
    - generic [ref=e89]:
      - generic [ref=e91]:
        - img [ref=e94]
        - heading "Smart Portals" [level=3] [ref=e97]
        - paragraph [ref=e98]: Labels create branded submission portals with custom briefs, deadlines, and genre requirements.
        - generic [ref=e100]:
          - img [ref=e101]
          - generic [ref=e103]: Featured
      - generic [ref=e105]:
        - img [ref=e108]
        - heading "Real-time Analytics" [level=3] [ref=e111]
        - paragraph [ref=e112]: Track submission performance, label engagement, and pitch conversion rates.
      - generic [ref=e114]:
        - img [ref=e117]
        - heading "Direct Communication" [level=3] [ref=e120]
        - paragraph [ref=e121]: Built-in messaging between songwriters and A&R. No more lost emails.
      - generic [ref=e123]:
        - img [ref=e126]
        - heading "One-Click Submissions" [level=3] [ref=e129]
        - paragraph [ref=e130]: Upload once, pitch to multiple labels. Your metadata follows the track.
        - generic [ref=e132]:
          - img [ref=e133]
          - generic [ref=e135]: Featured
      - generic [ref=e137]:
        - img [ref=e140]
        - heading "Demo Management" [level=3] [ref=e143]
        - paragraph [ref=e144]: Store all your versions, stems, and production notes in one place.
  - generic [ref=e146]:
    - heading "How MelodyPitch Works" [level=2] [ref=e147]
    - generic [ref=e148]:
      - generic [ref=e149]:
        - generic [ref=e150]: "1"
        - heading "Create a Portal" [level=3] [ref=e151]
        - paragraph [ref=e152]: Labels set up branded submission portals with custom briefs and deadlines.
      - generic [ref=e153]:
        - generic [ref=e154]: "2"
        - heading "Submit Demos" [level=3] [ref=e155]
        - paragraph [ref=e156]: Songwriters upload tracks with metadata, genres, and personal notes to label.
      - generic [ref=e157]:
        - generic [ref=e158]: "3"
        - heading "Pitch to Artists" [level=3] [ref=e159]
        - paragraph [ref=e160]: Labels curate pitch packages and send selected tracks directly to artists.
  - generic [ref=e162]:
    - heading "Ready to get your music heard?" [level=2] [ref=e163]
    - paragraph [ref=e164]: Join thousands of songwriters and artists who are building their careers with MelodyPitch.
    - generic [ref=e165]:
      - link "Create free account" [ref=e166] [cursor=pointer]:
        - /url: /register
      - link "Sign in" [ref=e167] [cursor=pointer]:
        - /url: /login
    - paragraph [ref=e168]: Free forever for songwriters and artists
  - generic [ref=e171]:
    - generic [ref=e172]:
      - generic [ref=e174]: M
      - generic [ref=e175]: MelodyPitch
    - paragraph [ref=e176]: 2026 MelodyPitch. All rights reserved.
```

# Test source

```ts
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
> 133 |       if (await howItWorksLink.isVisible()) {
      |                                ^ Error: locator.isVisible: Error: strict mode violation: getByRole('link', { name: /How it works/i }) resolved to 2 elements:
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
  168 |       await page.fill('input[name="password"]', testPassword);
  169 |       await page.selectOption('select[name="role"]', testRole);
  170 |       
  171 |       // Submit form
  172 |       await page.click('button[type="submit"]');
  173 |       
  174 |       // Should redirect to login with registered message
  175 |       await page.waitForURL(/.*login.*registered=1/, { timeout: 10000 });
  176 |       await expect(page).toHaveURL(/.*login.*registered=1/);
  177 |     });
  178 | 
  179 |     test('should show link to sign in page', async ({ page }) => {
  180 |       await page.goto('http://localhost:3000/register');
  181 |       
  182 |       const signInLink = page.getByRole('link', { name: /Sign in/i });
  183 |       await expect(signInLink).toBeVisible();
  184 |     });
  185 | 
  186 |     test('should validate password field', async ({ page }) => {
  187 |       await page.goto('http://localhost:3000/register');
  188 |       
  189 |       await page.fill('input[name="name"]', 'Test User');
  190 |       await page.fill('input[name="email"]', `test${Date.now()}@test.com`);
  191 |       await page.fill('input[name="password"]', 'short');
  192 |       await page.selectOption('select[name="role"]', 'SONGWRITER');
  193 |       
  194 |       // Try to submit
  195 |       const submitBtn = page.click('button[type="submit"]');
  196 |       
  197 |       // HTML5 validation should prevent submission
  198 |       await page.waitForTimeout(500);
  199 |     });
  200 |   });
  201 | 
  202 |   test.describe('Login Flow', () => {
  203 |     test('should load login page', async ({ page }) => {
  204 |       await page.goto('http://localhost:3000/login');
  205 |       
  206 |       // Check page title
  207 |       const heading = page.locator('h1');
  208 |       await expect(heading).toContainText('Sign in to MelodyPitch');
  209 |       
  210 |       // Check form fields
  211 |       await expect(page.locator('input[name="email"]')).toBeVisible();
  212 |       await expect(page.locator('input[name="password"]')).toBeVisible();
  213 |     });
  214 | 
  215 |     test('should display Google Sign-In button', async ({ page }) => {
  216 |       await page.goto('http://localhost:3000/login');
  217 |       
  218 |       const googleBtn = page.getByRole('button', { name: /Sign in with Google/i });
  219 |       await expect(googleBtn).toBeVisible();
  220 |     });
  221 | 
  222 |     test('should successfully login with valid credentials', async ({ page }) => {
  223 |       // Use the registered test user
  224 |       await page.goto('http://localhost:3000/login');
  225 |       
  226 |       await page.fill('input[name="email"]', testEmail);
  227 |       await page.fill('input[name="password"]', testPassword);
  228 |       await page.click('button[type="submit"]');
  229 |       
  230 |       // Should redirect to dashboard (not stay on login with error)
  231 |       await page.waitForTimeout(2000);
  232 |       const url = page.url();
  233 |       expect(url).not.toContain('error=1');
```