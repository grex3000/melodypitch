# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login-and-dashboards.spec.ts >> Login & Role-Based Dashboards >> Role-Based Dashboard Access >> LABEL user sees correct dashboard
- Location: tests/e2e/login-and-dashboards.spec.ts:60:11

# Error details

```
TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
  navigated to "http://localhost:3000/"
============================================================
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]
  - main [ref=e3]:
    - navigation [ref=e4]:
      - generic [ref=e6]:
        - link "M MelodyPitch" [ref=e7] [cursor=pointer]:
          - /url: /
          - generic [ref=e9]: M
          - generic [ref=e10]: MelodyPitch
        - generic [ref=e11]:
          - link "Features" [ref=e12] [cursor=pointer]:
            - /url: "#features"
          - link "How it Works" [ref=e13] [cursor=pointer]:
            - /url: "#how-it-works"
        - generic [ref=e14]:
          - link "Sign in" [ref=e16] [cursor=pointer]:
            - /url: /login
          - link "Get started" [ref=e18] [cursor=pointer]:
            - /url: /register
    - generic [ref=e21]:
      - generic [ref=e22]:
        - generic [ref=e25]: Now in public beta
        - heading "Where great songs meet their audience" [level=1] [ref=e26]:
          - text: Where great songs
          - text: meet their audience
        - paragraph [ref=e27]: MelodyPitch is the modern way for songwriters and labels to connect. Skip the gatekeepers. Skip the cold emails. Just pure music discovery, done right.
        - generic [ref=e28]:
          - link "Get started free" [ref=e30] [cursor=pointer]:
            - /url: /register
            - text: Get started free
            - img [ref=e31]
          - link "See how it works" [ref=e34] [cursor=pointer]:
            - /url: "#features"
            - img [ref=e35]
            - text: See how it works
        - generic [ref=e37]:
          - generic [ref=e43]: 2,400+ creators
          - generic [ref=e45]: No credit card
      - generic [ref=e49]:
        - generic [ref=e51]:
          - img [ref=e53]
          - generic [ref=e56]:
            - paragraph [ref=e57]: Midnight Echoes
            - paragraph [ref=e58]: Submitted 2h ago
        - generic [ref=e72]:
          - generic [ref=e73]:
            - generic [ref=e74]: Status
            - generic [ref=e75]: Under review
          - generic [ref=e77]:
            - generic [ref=e78]: Views this week
            - generic [ref=e79]: "847"
    - generic [ref=e81]:
      - generic [ref=e83]:
        - generic [ref=e84]:
          - img [ref=e85]
          - generic [ref=e87]: Powerful features
        - heading "Everything you need to pitch" [level=2] [ref=e88]
        - paragraph [ref=e89]: From submission to signed deal, MelodyPitch streamlines every step of the music discovery process with tools built for modern creators.
      - generic [ref=e90]:
        - generic [ref=e92]:
          - img [ref=e95]
          - heading "Smart Portals" [level=3] [ref=e98]
          - paragraph [ref=e99]: Labels create branded submission portals with custom briefs, deadlines, and genre requirements.
          - generic [ref=e101]:
            - img [ref=e102]
            - generic [ref=e104]: Featured
        - generic [ref=e106]:
          - img [ref=e109]
          - heading "Real-time Analytics" [level=3] [ref=e112]
          - paragraph [ref=e113]: Track submission performance, label engagement, and pitch conversion rates.
        - generic [ref=e115]:
          - img [ref=e118]
          - heading "Direct Communication" [level=3] [ref=e121]
          - paragraph [ref=e122]: Built-in messaging between songwriters and A&R. No more lost emails.
        - generic [ref=e124]:
          - img [ref=e127]
          - heading "One-Click Submissions" [level=3] [ref=e130]
          - paragraph [ref=e131]: Upload once, pitch to multiple labels. Your metadata follows the track.
          - generic [ref=e133]:
            - img [ref=e134]
            - generic [ref=e136]: Featured
        - generic [ref=e138]:
          - img [ref=e141]
          - heading "Demo Management" [level=3] [ref=e144]
          - paragraph [ref=e145]: Store all your versions, stems, and production notes in one place.
    - generic [ref=e147]:
      - generic [ref=e149]:
        - generic [ref=e152]: Built for everyone in music
        - heading "Solutions for every role in music" [level=2] [ref=e153]
        - paragraph [ref=e154]: Whether you're a label searching for talent, a songwriter seeking opportunities, or an artist building your career—MelodyPitch solves your biggest pain points.
      - generic [ref=e155]:
        - generic [ref=e156]:
          - generic [ref=e157]:
            - img [ref=e159]
            - generic [ref=e161]:
              - heading "For Labels & A&R" [level=3] [ref=e162]
              - paragraph [ref=e163]: Both problems and solutions
          - generic [ref=e164]:
            - generic [ref=e165]:
              - heading "The Problem" [level=4] [ref=e166]:
                - img [ref=e167]
                - text: The Problem
              - generic [ref=e169]:
                - paragraph [ref=e170]: 💌 Drowning in unsolicited demos
                - paragraph [ref=e171]: Hundreds of unvetted submissions clogging your inbox every day
              - generic [ref=e172]:
                - paragraph [ref=e173]: ⏰ Months to find one good track
                - paragraph [ref=e174]: Sifting through poor quality submissions wastes time and resources
              - generic [ref=e175]:
                - paragraph [ref=e176]: 🔄 Chaotic submission process
                - paragraph [ref=e177]: No standardized way to receive, organize, or track submissions
              - generic [ref=e178]:
                - paragraph [ref=e179]: 📊 Can't identify emerging trends
                - paragraph [ref=e180]: Missing signals about what new artists are making waves
            - generic [ref=e181]:
              - heading "The Solution" [level=4] [ref=e182]:
                - img [ref=e183]
                - text: The Solution
              - generic [ref=e185]:
                - paragraph [ref=e186]: ✨ Curated submission portal
                - paragraph [ref=e187]: Control exactly what you receive with custom briefs and requirements
              - generic [ref=e188]:
                - paragraph [ref=e189]: 🎯 Pre-filtered quality tracks
                - paragraph [ref=e190]: Only receive submissions that match your label aesthetic and needs
              - generic [ref=e191]:
                - paragraph [ref=e192]: 📈 Real-time analytics dashboard
                - paragraph [ref=e193]: Track submission metrics and discover emerging talent early
              - generic [ref=e194]:
                - paragraph [ref=e195]: ⚡ Instant artist communication
                - paragraph [ref=e196]: Built-in messaging for A&R feedback without leaving the platform
        - generic [ref=e197]:
          - generic [ref=e198]:
            - img [ref=e200]
            - generic [ref=e202]:
              - heading "For Songwriters & Producers" [level=3] [ref=e203]
              - paragraph [ref=e204]: Both problems and solutions
          - generic [ref=e205]:
            - generic [ref=e206]:
              - heading "The Problem" [level=4] [ref=e207]:
                - img [ref=e208]
                - text: The Problem
              - generic [ref=e210]:
                - paragraph [ref=e211]: 🚪 Gatekeepers blocking the door
                - paragraph [ref=e212]: Labels only accept submissions through official channels you can't access
              - generic [ref=e213]:
                - paragraph [ref=e214]: ❓ No feedback on rejections
                - paragraph [ref=e215]: Submit to labels and get silence—no idea why it didn't work
              - generic [ref=e216]:
                - paragraph [ref=e217]: 🎯 Wasting time on wrong targets
                - paragraph [ref=e218]: Manually researching which labels might want your style takes forever
              - generic [ref=e219]:
                - paragraph [ref=e220]: 📧 Cold emails getting ignored
                - paragraph [ref=e221]: Your carefully crafted pitches disappear into spam folders
            - generic [ref=e222]:
              - heading "The Solution" [level=4] [ref=e223]:
                - img [ref=e224]
                - text: The Solution
              - generic [ref=e226]:
                - paragraph [ref=e227]: 🔓 Direct access to labels
                - paragraph [ref=e228]: Submit to curated opportunities without needing connections or agents
              - generic [ref=e229]:
                - paragraph [ref=e230]: 💬 Get actual feedback
                - paragraph [ref=e231]: Labels share thoughts on your track—finally know what to improve
              - generic [ref=e232]:
                - paragraph [ref=e233]: 🎯 Smart matching
                - paragraph [ref=e234]: Find labels that actually want your style of music automatically
              - generic [ref=e235]:
                - paragraph [ref=e236]: 📊 Track your pitch success
                - paragraph [ref=e237]: See exactly how many labels viewed your submission and their responses
        - generic [ref=e238]:
          - generic [ref=e239]:
            - img [ref=e241]
            - generic [ref=e243]:
              - heading "For Artists & Management" [level=3] [ref=e244]
              - paragraph [ref=e245]: Both problems and solutions
          - generic [ref=e246]:
            - generic [ref=e247]:
              - heading "The Problem" [level=4] [ref=e248]:
                - img [ref=e249]
                - text: The Problem
              - generic [ref=e251]:
                - paragraph [ref=e252]: 🤝 Complex label deals are hard to navigate
                - paragraph [ref=e253]: Understanding contracts and distribution options without expertise is risky
              - generic [ref=e254]:
                - paragraph [ref=e255]: 🎵 Your music gets lost in the crowd
                - paragraph [ref=e256]: Independent artists have no way to stand out to major players
              - generic [ref=e257]:
                - paragraph [ref=e258]: 📱 No centralized artist platform
                - paragraph [ref=e259]: Managing demos, metadata, and versions across different tools is chaos
              - generic [ref=e260]:
                - paragraph [ref=e261]: 🚫 Limited distribution options
                - paragraph [ref=e262]: Choosing between labels, DIY releases, or distributors is overwhelming
            - generic [ref=e263]:
              - heading "The Solution" [level=4] [ref=e264]:
                - img [ref=e265]
                - text: The Solution
              - generic [ref=e267]:
                - paragraph [ref=e268]: 📋 Organized demo hub
                - paragraph [ref=e269]: Store all versions, stems, and metadata in one place&mdash;always ready
              - generic [ref=e270]:
                - paragraph [ref=e271]: 🏆 Build your artist profile
                - paragraph [ref=e272]: Create a professional presence that labels can discover and explore
              - generic [ref=e273]:
                - paragraph [ref=e274]: 🎁 Multiple release paths
                - paragraph [ref=e275]: Choose between label deals, distribution, or collaboration opportunities
              - generic [ref=e276]:
                - paragraph [ref=e277]: 👥 Direct label relationships
                - paragraph [ref=e278]: Communicate directly with A&R to understand opportunities and negotiate
      - generic [ref=e279]:
        - paragraph [ref=e280]: No matter your role in music, MelodyPitch has the tools you need.
        - generic [ref=e281]:
          - link "Start your journey free" [ref=e282] [cursor=pointer]:
            - /url: /register
          - link "See how it works" [ref=e283] [cursor=pointer]:
            - /url: "#how-it-works"
    - generic [ref=e285]:
      - heading "How MelodyPitch Works" [level=2] [ref=e286]
      - generic [ref=e287]:
        - generic [ref=e288]:
          - generic [ref=e289]: "1"
          - heading "Create a Portal" [level=3] [ref=e290]
          - paragraph [ref=e291]: Labels set up branded submission portals with custom briefs and deadlines.
        - generic [ref=e292]:
          - generic [ref=e293]: "2"
          - heading "Submit Demos" [level=3] [ref=e294]
          - paragraph [ref=e295]: Songwriters upload tracks with metadata, genres, and personal notes to label.
        - generic [ref=e296]:
          - generic [ref=e297]: "3"
          - heading "Pitch to Artists" [level=3] [ref=e298]
          - paragraph [ref=e299]: Labels curate pitch packages and send selected tracks directly to artists.
    - generic [ref=e301]:
      - heading "Ready to get your music heard?" [level=2] [ref=e302]
      - paragraph [ref=e303]: Join thousands of songwriters and artists who are building their careers with MelodyPitch.
      - generic [ref=e304]:
        - link "Create free account" [ref=e305] [cursor=pointer]:
          - /url: /register
        - link "Sign in" [ref=e306] [cursor=pointer]:
          - /url: /login
      - paragraph [ref=e307]: Free forever for songwriters and artists
    - generic [ref=e310]:
      - generic [ref=e311]:
        - generic [ref=e313]: M
        - generic [ref=e314]: MelodyPitch
      - paragraph [ref=e315]: 2026 MelodyPitch. All rights reserved.
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
      |                    ^ TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
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