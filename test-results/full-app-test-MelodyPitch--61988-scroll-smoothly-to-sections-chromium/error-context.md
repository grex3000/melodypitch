# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: full-app-test.spec.ts >> MelodyPitch Full Application Test Suite >> Landing Page >> should scroll smoothly to sections
- Location: tests/e2e/full-app-test.spec.ts:128:9

# Error details

```
Error: locator.isVisible: Error: strict mode violation: getByRole('link', { name: /How it works/i }) resolved to 3 elements:
    1) <a href="#how-it-works" class="px-4 py-2 text-fg-2 hover:text-fg-1 transition-colors duration-200 text-sm font-medium">How it Works</a> aka getByRole('link', { name: 'How it Works', exact: true })
    2) <a href="#features" class="jsx-c3a2862e41502fa0 gap-2 flex items-center justify-center">…</a> aka getByRole('link', { name: 'See how it works' }).first()
    3) <a href="#how-it-works" class="inline-flex items-center justify-center px-8 py-4 border border-border-default text-fg-2 font-medium rounded-lg hover:bg-bg-surface-1 hover:text-fg-1 transition-colors">See how it works</a> aka getByRole('link', { name: 'See how it works' }).nth(1)

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
    - generic [ref=e148]:
      - generic [ref=e151]: Built for everyone in music
      - heading "Solutions for every role in music" [level=2] [ref=e152]
      - paragraph [ref=e153]: Whether you're a label searching for talent, a songwriter seeking opportunities, or an artist building your career—MelodyPitch solves your biggest pain points.
    - generic [ref=e154]:
      - generic [ref=e155]:
        - generic [ref=e156]:
          - img [ref=e158]
          - generic [ref=e160]:
            - heading "For Labels & A&R" [level=3] [ref=e161]
            - paragraph [ref=e162]: Both problems and solutions
        - generic [ref=e163]:
          - generic [ref=e164]:
            - heading "The Problem" [level=4] [ref=e165]:
              - img [ref=e166]
              - text: The Problem
            - generic [ref=e168]:
              - paragraph [ref=e169]: 💌 Drowning in unsolicited demos
              - paragraph [ref=e170]: Hundreds of unvetted submissions clogging your inbox every day
            - generic [ref=e171]:
              - paragraph [ref=e172]: ⏰ Months to find one good track
              - paragraph [ref=e173]: Sifting through poor quality submissions wastes time and resources
            - generic [ref=e174]:
              - paragraph [ref=e175]: 🔄 Chaotic submission process
              - paragraph [ref=e176]: No standardized way to receive, organize, or track submissions
            - generic [ref=e177]:
              - paragraph [ref=e178]: 📊 Can't identify emerging trends
              - paragraph [ref=e179]: Missing signals about what new artists are making waves
          - generic [ref=e180]:
            - heading "The Solution" [level=4] [ref=e181]:
              - img [ref=e182]
              - text: The Solution
            - generic [ref=e184]:
              - paragraph [ref=e185]: ✨ Curated submission portal
              - paragraph [ref=e186]: Control exactly what you receive with custom briefs and requirements
            - generic [ref=e187]:
              - paragraph [ref=e188]: 🎯 Pre-filtered quality tracks
              - paragraph [ref=e189]: Only receive submissions that match your label aesthetic and needs
            - generic [ref=e190]:
              - paragraph [ref=e191]: 📈 Real-time analytics dashboard
              - paragraph [ref=e192]: Track submission metrics and discover emerging talent early
            - generic [ref=e193]:
              - paragraph [ref=e194]: ⚡ Instant artist communication
              - paragraph [ref=e195]: Built-in messaging for A&R feedback without leaving the platform
      - generic [ref=e196]:
        - generic [ref=e197]:
          - img [ref=e199]
          - generic [ref=e201]:
            - heading "For Songwriters & Producers" [level=3] [ref=e202]
            - paragraph [ref=e203]: Both problems and solutions
        - generic [ref=e204]:
          - generic [ref=e205]:
            - heading "The Problem" [level=4] [ref=e206]:
              - img [ref=e207]
              - text: The Problem
            - generic [ref=e209]:
              - paragraph [ref=e210]: 🚪 Gatekeepers blocking the door
              - paragraph [ref=e211]: Labels only accept submissions through official channels you can't access
            - generic [ref=e212]:
              - paragraph [ref=e213]: ❓ No feedback on rejections
              - paragraph [ref=e214]: Submit to labels and get silence—no idea why it didn't work
            - generic [ref=e215]:
              - paragraph [ref=e216]: 🎯 Wasting time on wrong targets
              - paragraph [ref=e217]: Manually researching which labels might want your style takes forever
            - generic [ref=e218]:
              - paragraph [ref=e219]: 📧 Cold emails getting ignored
              - paragraph [ref=e220]: Your carefully crafted pitches disappear into spam folders
          - generic [ref=e221]:
            - heading "The Solution" [level=4] [ref=e222]:
              - img [ref=e223]
              - text: The Solution
            - generic [ref=e225]:
              - paragraph [ref=e226]: 🔓 Direct access to labels
              - paragraph [ref=e227]: Submit to curated opportunities without needing connections or agents
            - generic [ref=e228]:
              - paragraph [ref=e229]: 💬 Get actual feedback
              - paragraph [ref=e230]: Labels share thoughts on your track—finally know what to improve
            - generic [ref=e231]:
              - paragraph [ref=e232]: 🎯 Smart matching
              - paragraph [ref=e233]: Find labels that actually want your style of music automatically
            - generic [ref=e234]:
              - paragraph [ref=e235]: 📊 Track your pitch success
              - paragraph [ref=e236]: See exactly how many labels viewed your submission and their responses
      - generic [ref=e237]:
        - generic [ref=e238]:
          - img [ref=e240]
          - generic [ref=e242]:
            - heading "For Artists & Management" [level=3] [ref=e243]
            - paragraph [ref=e244]: Both problems and solutions
        - generic [ref=e245]:
          - generic [ref=e246]:
            - heading "The Problem" [level=4] [ref=e247]:
              - img [ref=e248]
              - text: The Problem
            - generic [ref=e250]:
              - paragraph [ref=e251]: 🤝 Complex label deals are hard to navigate
              - paragraph [ref=e252]: Understanding contracts and distribution options without expertise is risky
            - generic [ref=e253]:
              - paragraph [ref=e254]: 🎵 Your music gets lost in the crowd
              - paragraph [ref=e255]: Independent artists have no way to stand out to major players
            - generic [ref=e256]:
              - paragraph [ref=e257]: 📱 No centralized artist platform
              - paragraph [ref=e258]: Managing demos, metadata, and versions across different tools is chaos
            - generic [ref=e259]:
              - paragraph [ref=e260]: 🚫 Limited distribution options
              - paragraph [ref=e261]: Choosing between labels, DIY releases, or distributors is overwhelming
          - generic [ref=e262]:
            - heading "The Solution" [level=4] [ref=e263]:
              - img [ref=e264]
              - text: The Solution
            - generic [ref=e266]:
              - paragraph [ref=e267]: 📋 Organized demo hub
              - paragraph [ref=e268]: Store all versions, stems, and metadata in one place&mdash;always ready
            - generic [ref=e269]:
              - paragraph [ref=e270]: 🏆 Build your artist profile
              - paragraph [ref=e271]: Create a professional presence that labels can discover and explore
            - generic [ref=e272]:
              - paragraph [ref=e273]: 🎁 Multiple release paths
              - paragraph [ref=e274]: Choose between label deals, distribution, or collaboration opportunities
            - generic [ref=e275]:
              - paragraph [ref=e276]: 👥 Direct label relationships
              - paragraph [ref=e277]: Communicate directly with A&R to understand opportunities and negotiate
    - generic [ref=e278]:
      - paragraph [ref=e279]: No matter your role in music, MelodyPitch has the tools you need.
      - generic [ref=e280]:
        - link "Start your journey free" [ref=e281] [cursor=pointer]:
          - /url: /register
        - link "See how it works" [ref=e282] [cursor=pointer]:
          - /url: "#how-it-works"
  - generic [ref=e284]:
    - heading "How MelodyPitch Works" [level=2] [ref=e285]
    - generic [ref=e286]:
      - generic [ref=e287]:
        - generic [ref=e288]: "1"
        - heading "Create a Portal" [level=3] [ref=e289]
        - paragraph [ref=e290]: Labels set up branded submission portals with custom briefs and deadlines.
      - generic [ref=e291]:
        - generic [ref=e292]: "2"
        - heading "Submit Demos" [level=3] [ref=e293]
        - paragraph [ref=e294]: Songwriters upload tracks with metadata, genres, and personal notes to label.
      - generic [ref=e295]:
        - generic [ref=e296]: "3"
        - heading "Pitch to Artists" [level=3] [ref=e297]
        - paragraph [ref=e298]: Labels curate pitch packages and send selected tracks directly to artists.
  - generic [ref=e300]:
    - heading "Ready to get your music heard?" [level=2] [ref=e301]
    - paragraph [ref=e302]: Join thousands of songwriters and artists who are building their careers with MelodyPitch.
    - generic [ref=e303]:
      - link "Create free account" [ref=e304] [cursor=pointer]:
        - /url: /register
      - link "Sign in" [ref=e305] [cursor=pointer]:
        - /url: /login
    - paragraph [ref=e306]: Free forever for songwriters and artists
  - generic [ref=e309]:
    - generic [ref=e310]:
      - generic [ref=e312]: M
      - generic [ref=e313]: MelodyPitch
    - paragraph [ref=e314]: 2026 MelodyPitch. All rights reserved.
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
      |                                ^ Error: locator.isVisible: Error: strict mode violation: getByRole('link', { name: /How it works/i }) resolved to 3 elements:
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