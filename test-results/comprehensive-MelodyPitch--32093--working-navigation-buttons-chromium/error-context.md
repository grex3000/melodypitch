# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: comprehensive.spec.ts >> MelodyPitch Comprehensive Flow >> Landing Page >> should have working navigation buttons
- Location: tests/e2e/comprehensive.spec.ts:20:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: /Start Free/i })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
  - alert [ref=e315]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('MelodyPitch Comprehensive Flow', () => {
  4   |   const timestamp = Date.now();
  5   |   const testUsers = [
  6   |     { email: `label${timestamp}@melodypitch.test`, name: 'Nocturne Records', role: 'LABEL', password: 'password123' },
  7   |     { email: `writer${timestamp}@melodypitch.test`, name: 'Maren Solberg', role: 'SONGWRITER', password: 'password123' },
  8   |     { email: `artist${timestamp}@melodypitch.test`, name: 'Lena Rydell', role: 'ARTIST', password: 'password123' },
  9   |   ];
  10  | 
  11  |   test.describe('Landing Page', () => {
  12  |     test('should display landing page correctly', async ({ page }) => {
  13  |       await page.goto('http://localhost:3000');
  14  |       
  15  |       await expect(page.locator('h1')).toContainText('Connect Songwriters');
  16  |       await expect(page.getByRole('link', { name: /Start Free/i })).toBeVisible();
  17  |       await expect(page.getByRole('link', { name: /Learn More/i })).toBeVisible();
  18  |     });
  19  | 
  20  |     test('should have working navigation buttons', async ({ page }) => {
  21  |       await page.goto('http://localhost:3000');
  22  |       
> 23  |       await page.getByRole('link', { name: /Start Free/i }).click();
      |                                                             ^ Error: locator.click: Test timeout of 30000ms exceeded.
  24  |       await expect(page).toHaveURL(/.*register/);
  25  |     });
  26  | 
  27  |     test('should be mobile responsive', async ({ page }) => {
  28  |       await page.setViewportSize({ width: 375, height: 667 });
  29  |       await page.goto('http://localhost:3000');
  30  |       
  31  |       await expect(page.locator('h1')).toBeVisible();
  32  |       const navButton = page.getByRole('link', { name: /Start Free/i });
  33  |       await expect(navButton).toBeVisible();
  34  |     });
  35  |   });
  36  | 
  37  |   test.describe('Registration Flow', () => {
  38  |     for (const user of testUsers) {
  39  |       test(`should register ${user.role} user`, async ({ page }) => {
  40  |         await page.goto('http://localhost:3000/register');
  41  |         
  42  |         await page.fill('input[name="name"]', user.name);
  43  |         await page.fill('input[name="email"]', user.email);
  44  |         await page.fill('input[name="password"]', user.password);
  45  |         await page.selectOption('select[name="role"]', user.role);
  46  |         
  47  |         await page.click('button[type="submit"]');
  48  |         
  49  |         await page.waitForURL(/.*login.*registered=1/, { timeout: 10000 });
  50  |         await expect(page).toHaveURL(/.*login.*registered=1/);
  51  |       });
  52  |     }
  53  |   });
  54  | 
  55  |   test.describe('Login Flow', () => {
  56  |     for (const user of testUsers) {
  57  |       test(`should login as ${user.role}`, async ({ page }) => {
  58  |         await page.goto('http://localhost:3000/login');
  59  |         
  60  |         await page.fill('input[name="email"]', user.email);
  61  |         await page.fill('input[name="password"]', user.password);
  62  |         await page.click('button[type="submit"]');
  63  |         
  64  |         await page.waitForTimeout(3000);
  65  |         
  66  |         const url = page.url();
  67  |         console.log(`Login result for ${user.role}:`, url);
  68  |         
  69  |         expect(url).not.toContain('error=1');
  70  |       });
  71  |     }
  72  | 
  73  |     test('should show error for invalid credentials', async ({ page }) => {
  74  |       await page.goto('http://localhost:3000/login');
  75  |       
  76  |       await page.fill('input[name="email"]', 'nonexistent@test.com');
  77  |       await page.fill('input[name="password"]', 'wrongpassword');
  78  |       await page.click('button[type="submit"]');
  79  |       
  80  |       await expect(page).toHaveURL(/.*error=1/);
  81  |       await expect(page.getByText('Invalid email or password')).toBeVisible();
  82  |     });
  83  |   });
  84  | 
  85  |   test.describe('Dashboard Navigation', () => {
  86  |     test('label should access their dashboard', async ({ page }) => {
  87  |       const user = testUsers[0];
  88  |       await page.goto('http://localhost:3000/login');
  89  |       await page.fill('input[name="email"]', user.email);
  90  |       await page.fill('input[name="password"]', user.password);
  91  |       await page.click('button[type="submit"]');
  92  |       await page.waitForTimeout(3000);
  93  |       
  94  |       const url = page.url();
  95  |       if (!url.includes('error=1')) {
  96  |         await expect(page).toHaveURL(/.*label\/dashboard|.*\/dashboard/);
  97  |       }
  98  |     });
  99  | 
  100 |     test('songwriter should access their dashboard', async ({ page }) => {
  101 |       const user = testUsers[1];
  102 |       await page.goto('http://localhost:3000/login');
  103 |       await page.fill('input[name="email"]', user.email);
  104 |       await page.fill('input[name="password"]', user.password);
  105 |       await page.click('button[type="submit"]');
  106 |       await page.waitForTimeout(3000);
  107 |       
  108 |       const url = page.url();
  109 |       if (!url.includes('error=1')) {
  110 |         await expect(page).toHaveURL(/.*songwriter\/dashboard|.*\/dashboard/);
  111 |       }
  112 |     });
  113 | 
  114 |     test('artist should access their dashboard', async ({ page }) => {
  115 |       const user = testUsers[2];
  116 |       await page.goto('http://localhost:3000/login');
  117 |       await page.fill('input[name="email"]', user.email);
  118 |       await page.fill('input[name="password"]', user.password);
  119 |       await page.click('button[type="submit"]');
  120 |       await page.waitForTimeout(3000);
  121 |       
  122 |       const url = page.url();
  123 |       if (!url.includes('error=1')) {
```