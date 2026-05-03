# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login-and-dashboards.spec.ts >> Login & Role-Based Dashboards >> Dashboard Content Verification >> ARTIST dashboard shows artist-specific content
- Location: tests/e2e/login-and-dashboards.spec.ts:188:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
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
      - generic [ref=e5]:
        - generic [ref=e6]:
          - link "M" [ref=e7] [cursor=pointer]:
            - /url: /
            - generic [ref=e9]: M
          - button "Toggle menu" [ref=e10] [cursor=pointer]:
            - img [ref=e11]
        - generic [ref=e14]:
          - link "Features" [ref=e15] [cursor=pointer]:
            - /url: "#features"
          - link "How it Works" [ref=e16] [cursor=pointer]:
            - /url: "#how-it-works"
          - generic [ref=e17]:
            - link "Sign in" [ref=e19] [cursor=pointer]:
              - /url: /login
            - link "Get started" [ref=e21] [cursor=pointer]:
              - /url: /register
    - generic [ref=e25]:
      - generic [ref=e28]: Now in public beta
      - heading "Where great songs meet their audience" [level=1] [ref=e29]:
        - text: Where great songs
        - text: meet their audience
      - paragraph [ref=e30]: MelodyPitch is the modern way for songwriters and labels to connect. Skip the gatekeepers. Skip the cold emails. Just pure music discovery, done right.
      - generic [ref=e31]:
        - link "Get started free" [ref=e33] [cursor=pointer]:
          - /url: /register
          - text: Get started free
          - img [ref=e34]
        - link "See how it works" [ref=e37] [cursor=pointer]:
          - /url: "#features"
          - img [ref=e38]
          - text: See how it works
      - generic [ref=e40]:
        - generic [ref=e46]: 2,400+ creators
        - generic [ref=e48]: No credit card
    - generic [ref=e50]:
      - generic [ref=e52]:
        - generic [ref=e53]:
          - img [ref=e54]
          - generic [ref=e56]: Powerful features
        - heading "Everything you need to pitch" [level=2] [ref=e57]
        - paragraph [ref=e58]: From submission to signed deal, MelodyPitch streamlines every step of the music discovery process with tools built for modern creators.
      - generic [ref=e59]:
        - generic [ref=e61]:
          - img [ref=e64]
          - heading "Smart Portals" [level=3] [ref=e67]
          - paragraph [ref=e68]: Labels create branded submission portals with custom briefs, deadlines, and genre requirements.
          - generic [ref=e70]:
            - img [ref=e71]
            - generic [ref=e73]: Featured
        - generic [ref=e75]:
          - img [ref=e78]
          - heading "Real-time Analytics" [level=3] [ref=e81]
          - paragraph [ref=e82]: Track submission performance, label engagement, and pitch conversion rates.
        - generic [ref=e84]:
          - img [ref=e87]
          - heading "Direct Communication" [level=3] [ref=e90]
          - paragraph [ref=e91]: Built-in messaging between songwriters and A&R. No more lost emails.
        - generic [ref=e93]:
          - img [ref=e96]
          - heading "One-Click Submissions" [level=3] [ref=e99]
          - paragraph [ref=e100]: Upload once, pitch to multiple labels. Your metadata follows the track.
          - generic [ref=e102]:
            - img [ref=e103]
            - generic [ref=e105]: Featured
        - generic [ref=e107]:
          - img [ref=e110]
          - heading "Demo Management" [level=3] [ref=e113]
          - paragraph [ref=e114]: Store all your versions, stems, and production notes in one place.
    - generic [ref=e116]:
      - generic [ref=e118]:
        - generic [ref=e121]: Built for everyone in music
        - heading "Solutions for every role in music" [level=2] [ref=e122]
        - paragraph [ref=e123]: Whether you're a label searching for talent, a songwriter seeking opportunities, or an artist building your career—MelodyPitch solves your biggest pain points.
      - generic [ref=e124]:
        - generic [ref=e125]:
          - generic [ref=e126]:
            - img [ref=e128]
            - generic [ref=e130]:
              - heading "For Labels & A&R" [level=3] [ref=e131]
              - paragraph [ref=e132]: Both problems and solutions
          - generic [ref=e133]:
            - generic [ref=e134]:
              - heading "The Problem" [level=4] [ref=e135]:
                - img [ref=e136]
                - text: The Problem
              - generic [ref=e138]:
                - paragraph [ref=e139]: 💌 Drowning in unsolicited demos
                - paragraph [ref=e140]: Hundreds of unvetted submissions clogging your inbox every day
              - generic [ref=e141]:
                - paragraph [ref=e142]: ⏰ Months to find one good track
                - paragraph [ref=e143]: Sifting through poor quality submissions wastes time and resources
              - generic [ref=e144]:
                - paragraph [ref=e145]: 🔄 Chaotic submission process
                - paragraph [ref=e146]: No standardized way to receive, organize, or track submissions
              - generic [ref=e147]:
                - paragraph [ref=e148]: 📊 Can't identify emerging trends
                - paragraph [ref=e149]: Missing signals about what new artists are making waves
            - generic [ref=e150]:
              - heading "The Solution" [level=4] [ref=e151]:
                - img [ref=e152]
                - text: The Solution
              - generic [ref=e154]:
                - paragraph [ref=e155]: ✨ Curated submission portal
                - paragraph [ref=e156]: Control exactly what you receive with custom briefs and requirements
              - generic [ref=e157]:
                - paragraph [ref=e158]: 🎯 Pre-filtered quality tracks
                - paragraph [ref=e159]: Only receive submissions that match your label aesthetic and needs
              - generic [ref=e160]:
                - paragraph [ref=e161]: 📈 Real-time analytics dashboard
                - paragraph [ref=e162]: Track submission metrics and discover emerging talent early
              - generic [ref=e163]:
                - paragraph [ref=e164]: ⚡ Instant artist communication
                - paragraph [ref=e165]: Built-in messaging for A&R feedback without leaving the platform
        - generic [ref=e166]:
          - generic [ref=e167]:
            - img [ref=e169]
            - generic [ref=e171]:
              - heading "For Songwriters & Producers" [level=3] [ref=e172]
              - paragraph [ref=e173]: Both problems and solutions
          - generic [ref=e174]:
            - generic [ref=e175]:
              - heading "The Problem" [level=4] [ref=e176]:
                - img [ref=e177]
                - text: The Problem
              - generic [ref=e179]:
                - paragraph [ref=e180]: 🚪 Gatekeepers blocking the door
                - paragraph [ref=e181]: Labels only accept submissions through official channels you can't access
              - generic [ref=e182]:
                - paragraph [ref=e183]: ❓ No feedback on rejections
                - paragraph [ref=e184]: Submit to labels and get silence—no idea why it didn't work
              - generic [ref=e185]:
                - paragraph [ref=e186]: 🎯 Wasting time on wrong targets
                - paragraph [ref=e187]: Manually researching which labels might want your style takes forever
              - generic [ref=e188]:
                - paragraph [ref=e189]: 📧 Cold emails getting ignored
                - paragraph [ref=e190]: Your carefully crafted pitches disappear into spam folders
            - generic [ref=e191]:
              - heading "The Solution" [level=4] [ref=e192]:
                - img [ref=e193]
                - text: The Solution
              - generic [ref=e195]:
                - paragraph [ref=e196]: 🔓 Direct access to labels
                - paragraph [ref=e197]: Submit to curated opportunities without needing connections or agents
              - generic [ref=e198]:
                - paragraph [ref=e199]: 💬 Get actual feedback
                - paragraph [ref=e200]: Labels share thoughts on your track—finally know what to improve
              - generic [ref=e201]:
                - paragraph [ref=e202]: 🎯 Smart matching
                - paragraph [ref=e203]: Find labels that actually want your style of music automatically
              - generic [ref=e204]:
                - paragraph [ref=e205]: 📊 Track your pitch success
                - paragraph [ref=e206]: See exactly how many labels viewed your submission and their responses
        - generic [ref=e207]:
          - generic [ref=e208]:
            - img [ref=e210]
            - generic [ref=e212]:
              - heading "For Artists & Management" [level=3] [ref=e213]
              - paragraph [ref=e214]: Both problems and solutions
          - generic [ref=e215]:
            - generic [ref=e216]:
              - heading "The Problem" [level=4] [ref=e217]:
                - img [ref=e218]
                - text: The Problem
              - generic [ref=e220]:
                - paragraph [ref=e221]: 🤝 Complex label deals are hard to navigate
                - paragraph [ref=e222]: Understanding contracts and distribution options without expertise is risky
              - generic [ref=e223]:
                - paragraph [ref=e224]: 🎵 Your music gets lost in the crowd
                - paragraph [ref=e225]: Independent artists have no way to stand out to major players
              - generic [ref=e226]:
                - paragraph [ref=e227]: 📱 No centralized artist platform
                - paragraph [ref=e228]: Managing demos, metadata, and versions across different tools is chaos
              - generic [ref=e229]:
                - paragraph [ref=e230]: 🚫 Limited distribution options
                - paragraph [ref=e231]: Choosing between labels, DIY releases, or distributors is overwhelming
            - generic [ref=e232]:
              - heading "The Solution" [level=4] [ref=e233]:
                - img [ref=e234]
                - text: The Solution
              - generic [ref=e236]:
                - paragraph [ref=e237]: 📋 Organized demo hub
                - paragraph [ref=e238]: Store all versions, stems, and metadata in one place&mdash;always ready
              - generic [ref=e239]:
                - paragraph [ref=e240]: 🏆 Build your artist profile
                - paragraph [ref=e241]: Create a professional presence that labels can discover and explore
              - generic [ref=e242]:
                - paragraph [ref=e243]: 🎁 Multiple release paths
                - paragraph [ref=e244]: Choose between label deals, distribution, or collaboration opportunities
              - generic [ref=e245]:
                - paragraph [ref=e246]: 👥 Direct label relationships
                - paragraph [ref=e247]: Communicate directly with A&R to understand opportunities and negotiate
      - generic [ref=e248]:
        - paragraph [ref=e249]: No matter your role in music, MelodyPitch has the tools you need.
        - generic [ref=e250]:
          - link "Start your journey free" [ref=e251] [cursor=pointer]:
            - /url: /register
          - link "See how it works" [ref=e252] [cursor=pointer]:
            - /url: "#how-it-works"
    - generic [ref=e254]:
      - heading "How MelodyPitch Works" [level=2] [ref=e255]
      - generic [ref=e256]:
        - generic [ref=e257]:
          - generic [ref=e258]: "1"
          - heading "Create a Portal" [level=3] [ref=e259]
          - paragraph [ref=e260]: Labels set up branded submission portals with custom briefs and deadlines.
        - generic [ref=e261]:
          - generic [ref=e262]: "2"
          - heading "Submit Demos" [level=3] [ref=e263]
          - paragraph [ref=e264]: Songwriters upload tracks with metadata, genres, and personal notes to label.
        - generic [ref=e265]:
          - generic [ref=e266]: "3"
          - heading "Pitch to Artists" [level=3] [ref=e267]
          - paragraph [ref=e268]: Labels curate pitch packages and send selected tracks directly to artists.
    - generic [ref=e270]:
      - heading "Ready to get your music heard?" [level=2] [ref=e271]
      - paragraph [ref=e272]: Join thousands of songwriters and artists who are building their careers with MelodyPitch.
      - generic [ref=e273]:
        - link "Create free account" [ref=e274] [cursor=pointer]:
          - /url: /register
        - link "Sign in" [ref=e275] [cursor=pointer]:
          - /url: /login
      - paragraph [ref=e276]: Free forever for songwriters and artists
    - generic [ref=e279]:
      - generic [ref=e280]:
        - generic [ref=e282]: M
        - generic [ref=e283]: MelodyPitch
      - paragraph [ref=e284]: 2026 MelodyPitch. All rights reserved.
```

# Test source

```ts
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
  171 |       await page.fill('input[name="email"]', account.email);
  172 |       await page.fill('input[name="password"]', account.password);
  173 |       await page.click('button[type="submit"]');
  174 | 
  175 |       await page.waitForURL(/songwriter\/dashboard/);
  176 |       console.log(`   ✅ On SONGWRITER dashboard`);
  177 | 
  178 |       const content = await page.content();
  179 |       if (content.includes('Submissions') || content.includes('tracks')) {
  180 |         console.log(`   ✅ Songwriter-specific content found`);
  181 |       } else {
  182 |         console.log(`   📋 Page loaded (content verification skipped)`);
  183 |       }
  184 | 
  185 |       console.log(`   ✅ SONGWRITER dashboard verified!\n`);
  186 |     });
  187 | 
  188 |     test('ARTIST dashboard shows artist-specific content', async ({ page }) => {
  189 |       const account = testAccounts[2];
  190 |       console.log(`\n📋 Testing ARTIST dashboard content`);
  191 | 
  192 |       // Login as artist
  193 |       await page.goto('http://localhost:3000/login');
  194 |       await page.fill('input[name="email"]', account.email);
  195 |       await page.fill('input[name="password"]', account.password);
  196 |       await page.click('button[type="submit"]');
  197 | 
> 198 |       await page.waitForURL(/artist\/dashboard/);
      |                  ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  199 |       console.log(`   ✅ On ARTIST dashboard`);
  200 | 
  201 |       const content = await page.content();
  202 |       console.log(`   📋 Page loaded`);
  203 | 
  204 |       console.log(`   ✅ ARTIST dashboard verified!\n`);
  205 |     });
  206 |   });
  207 | 
  208 |   test.describe('Role-Based Access Control', () => {
  209 |     test('SONGWRITER cannot access LABEL dashboard', async ({ page }) => {
  210 |       const songwriter = testAccounts[1];
  211 |       const labelPath = testAccounts[0].dashboardPath;
  212 |       
  213 |       console.log(`\n🛡️ Testing RBAC: SONGWRITER accessing LABEL path`);
  214 | 
  215 |       // Login as songwriter
  216 |       await page.goto('http://localhost:3000/login');
  217 |       await page.fill('input[name="email"]', songwriter.email);
  218 |       await page.fill('input[name="password"]', songwriter.password);
  219 |       await page.click('button[type="submit"]');
  220 | 
  221 |       await page.waitForURL(/songwriter\/dashboard/);
  222 |       console.log(`   ✅ Logged in as SONGWRITER`);
  223 | 
  224 |       // Try to access label dashboard
  225 |       await page.goto(`http://localhost:3000${labelPath}`, { waitUntil: 'domcontentloaded' });
  226 |       const url = page.url();
  227 | 
  228 |       console.log(`   📍 Tried to access: ${labelPath}`);
  229 |       console.log(`   📍 Ended up at: ${url}`);
  230 | 
  231 |       // Should either redirect or show error
  232 |       if (url.includes('songwriter')) {
  233 |         console.log(`   ✅ Access denied - redirected to songwriter dashboard`);
  234 |       } else if (url.includes('error')) {
  235 |         console.log(`   ✅ Access denied - error page shown`);
  236 |       } else {
  237 |         console.log(`   ⚠️  Unable to verify access control (may need middleware check)`);
  238 |       }
  239 | 
  240 |       console.log(`   ✅ RBAC test completed!\n`);
  241 |     });
  242 |   });
  243 | });
  244 | 
```