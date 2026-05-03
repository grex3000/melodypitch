# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing.spec.ts >> Landing Page >> should be mobile responsive
- Location: tests/e2e/landing.spec.ts:29:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Start Free Beta' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: 'Start Free Beta' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
      - generic [ref=e117]:
        - generic [ref=e120]: Built for everyone in music
        - heading "Solutions for every role in music" [level=2] [ref=e121]
        - paragraph [ref=e122]: Whether you're a label searching for talent, a songwriter seeking opportunities, or an artist building your career—MelodyPitch solves your biggest pain points.
      - generic [ref=e123]:
        - generic [ref=e124]:
          - generic [ref=e125]:
            - img [ref=e127]
            - generic [ref=e129]:
              - heading "For Labels & A&R" [level=3] [ref=e130]
              - paragraph [ref=e131]: Both problems and solutions
          - generic [ref=e132]:
            - generic [ref=e133]:
              - heading "The Problem" [level=4] [ref=e134]:
                - img [ref=e135]
                - text: The Problem
              - generic [ref=e137]:
                - paragraph [ref=e138]: 💌 Drowning in unsolicited demos
                - paragraph [ref=e139]: Hundreds of unvetted submissions clogging your inbox every day
              - generic [ref=e140]:
                - paragraph [ref=e141]: ⏰ Months to find one good track
                - paragraph [ref=e142]: Sifting through poor quality submissions wastes time and resources
              - generic [ref=e143]:
                - paragraph [ref=e144]: 🔄 Chaotic submission process
                - paragraph [ref=e145]: No standardized way to receive, organize, or track submissions
              - generic [ref=e146]:
                - paragraph [ref=e147]: 📊 Can't identify emerging trends
                - paragraph [ref=e148]: Missing signals about what new artists are making waves
            - generic [ref=e149]:
              - heading "The Solution" [level=4] [ref=e150]:
                - img [ref=e151]
                - text: The Solution
              - generic [ref=e153]:
                - paragraph [ref=e154]: ✨ Curated submission portal
                - paragraph [ref=e155]: Control exactly what you receive with custom briefs and requirements
              - generic [ref=e156]:
                - paragraph [ref=e157]: 🎯 Pre-filtered quality tracks
                - paragraph [ref=e158]: Only receive submissions that match your label aesthetic and needs
              - generic [ref=e159]:
                - paragraph [ref=e160]: 📈 Real-time analytics dashboard
                - paragraph [ref=e161]: Track submission metrics and discover emerging talent early
              - generic [ref=e162]:
                - paragraph [ref=e163]: ⚡ Instant artist communication
                - paragraph [ref=e164]: Built-in messaging for A&R feedback without leaving the platform
        - generic [ref=e165]:
          - generic [ref=e166]:
            - img [ref=e168]
            - generic [ref=e170]:
              - heading "For Songwriters & Producers" [level=3] [ref=e171]
              - paragraph [ref=e172]: Both problems and solutions
          - generic [ref=e173]:
            - generic [ref=e174]:
              - heading "The Problem" [level=4] [ref=e175]:
                - img [ref=e176]
                - text: The Problem
              - generic [ref=e178]:
                - paragraph [ref=e179]: 🚪 Gatekeepers blocking the door
                - paragraph [ref=e180]: Labels only accept submissions through official channels you can't access
              - generic [ref=e181]:
                - paragraph [ref=e182]: ❓ No feedback on rejections
                - paragraph [ref=e183]: Submit to labels and get silence—no idea why it didn't work
              - generic [ref=e184]:
                - paragraph [ref=e185]: 🎯 Wasting time on wrong targets
                - paragraph [ref=e186]: Manually researching which labels might want your style takes forever
              - generic [ref=e187]:
                - paragraph [ref=e188]: 📧 Cold emails getting ignored
                - paragraph [ref=e189]: Your carefully crafted pitches disappear into spam folders
            - generic [ref=e190]:
              - heading "The Solution" [level=4] [ref=e191]:
                - img [ref=e192]
                - text: The Solution
              - generic [ref=e194]:
                - paragraph [ref=e195]: 🔓 Direct access to labels
                - paragraph [ref=e196]: Submit to curated opportunities without needing connections or agents
              - generic [ref=e197]:
                - paragraph [ref=e198]: 💬 Get actual feedback
                - paragraph [ref=e199]: Labels share thoughts on your track—finally know what to improve
              - generic [ref=e200]:
                - paragraph [ref=e201]: 🎯 Smart matching
                - paragraph [ref=e202]: Find labels that actually want your style of music automatically
              - generic [ref=e203]:
                - paragraph [ref=e204]: 📊 Track your pitch success
                - paragraph [ref=e205]: See exactly how many labels viewed your submission and their responses
        - generic [ref=e206]:
          - generic [ref=e207]:
            - img [ref=e209]
            - generic [ref=e211]:
              - heading "For Artists & Management" [level=3] [ref=e212]
              - paragraph [ref=e213]: Both problems and solutions
          - generic [ref=e214]:
            - generic [ref=e215]:
              - heading "The Problem" [level=4] [ref=e216]:
                - img [ref=e217]
                - text: The Problem
              - generic [ref=e219]:
                - paragraph [ref=e220]: 🤝 Complex label deals are hard to navigate
                - paragraph [ref=e221]: Understanding contracts and distribution options without expertise is risky
              - generic [ref=e222]:
                - paragraph [ref=e223]: 🎵 Your music gets lost in the crowd
                - paragraph [ref=e224]: Independent artists have no way to stand out to major players
              - generic [ref=e225]:
                - paragraph [ref=e226]: 📱 No centralized artist platform
                - paragraph [ref=e227]: Managing demos, metadata, and versions across different tools is chaos
              - generic [ref=e228]:
                - paragraph [ref=e229]: 🚫 Limited distribution options
                - paragraph [ref=e230]: Choosing between labels, DIY releases, or distributors is overwhelming
            - generic [ref=e231]:
              - heading "The Solution" [level=4] [ref=e232]:
                - img [ref=e233]
                - text: The Solution
              - generic [ref=e235]:
                - paragraph [ref=e236]: 📋 Organized demo hub
                - paragraph [ref=e237]: Store all versions, stems, and metadata in one place&mdash;always ready
              - generic [ref=e238]:
                - paragraph [ref=e239]: 🏆 Build your artist profile
                - paragraph [ref=e240]: Create a professional presence that labels can discover and explore
              - generic [ref=e241]:
                - paragraph [ref=e242]: 🎁 Multiple release paths
                - paragraph [ref=e243]: Choose between label deals, distribution, or collaboration opportunities
              - generic [ref=e244]:
                - paragraph [ref=e245]: 👥 Direct label relationships
                - paragraph [ref=e246]: Communicate directly with A&R to understand opportunities and negotiate
      - generic [ref=e247]:
        - paragraph [ref=e248]: No matter your role in music, MelodyPitch has the tools you need.
        - generic [ref=e249]:
          - link "Start your journey free" [ref=e250] [cursor=pointer]:
            - /url: /register
          - link "See how it works" [ref=e251] [cursor=pointer]:
            - /url: "#how-it-works"
    - generic [ref=e253]:
      - heading "How MelodyPitch Works" [level=2] [ref=e254]
      - generic [ref=e255]:
        - generic [ref=e256]:
          - generic [ref=e257]: "1"
          - heading "Create a Portal" [level=3] [ref=e258]
          - paragraph [ref=e259]: Labels set up branded submission portals with custom briefs and deadlines.
        - generic [ref=e260]:
          - generic [ref=e261]: "2"
          - heading "Submit Demos" [level=3] [ref=e262]
          - paragraph [ref=e263]: Songwriters upload tracks with metadata, genres, and personal notes to label.
        - generic [ref=e264]:
          - generic [ref=e265]: "3"
          - heading "Pitch to Artists" [level=3] [ref=e266]
          - paragraph [ref=e267]: Labels curate pitch packages and send selected tracks directly to artists.
    - generic [ref=e269]:
      - heading "Ready to get your music heard?" [level=2] [ref=e270]
      - paragraph [ref=e271]: Join thousands of songwriters and artists who are building their careers with MelodyPitch.
      - generic [ref=e272]:
        - link "Create free account" [ref=e273] [cursor=pointer]:
          - /url: /register
        - link "Sign in" [ref=e274] [cursor=pointer]:
          - /url: /login
      - paragraph [ref=e275]: Free forever for songwriters and artists
    - generic [ref=e278]:
      - generic [ref=e279]:
        - generic [ref=e281]: M
        - generic [ref=e282]: MelodyPitch
      - paragraph [ref=e283]: 2026 MelodyPitch. All rights reserved.
  - alert [ref=e284]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Landing Page', () => {
  4  |   test('should display hero section', async ({ page }) => {
  5  |     await page.goto('http://localhost:3000/');
  6  |     
  7  |     // Check hero section is visible
  8  |     await expect(page.locator('h1')).toContainText('Connect Songwriters with Labels & Artists');
  9  |     await expect(page.getByRole('link', { name: 'Start Free Beta' })).toBeVisible();
  10 |   });
  11 | 
  12 |   test('should navigate to register page', async ({ page }) => {
  13 |     await page.goto('http://localhost:3000/');
  14 |     
  15 |     await page.getByRole('link', { name: 'Start Free Beta' }).click();
  16 |     await expect(page).toHaveURL('http://localhost:3000/register');
  17 |   });
  18 | 
  19 |   test('should display features section', async ({ page }) => {
  20 |     await page.goto('http://localhost:3000/');
  21 |     
  22 |     // Check features section specifically
  23 |     const featuresSection = page.locator('section').nth(1); // Second section is features
  24 |     await expect(featuresSection.getByText('Portal Submission')).toBeVisible();
  25 |     await expect(featuresSection.getByText('Pitch Management')).toBeVisible();
  26 |     await expect(featuresSection.getByText('Analytics Dashboard')).toBeVisible();
  27 |   });
  28 | 
  29 |   test('should be mobile responsive', async ({ page }) => {
  30 |     await page.setViewportSize({ width: 375, height: 812 });
  31 |     await page.goto('http://localhost:3000/');
  32 |     
  33 |     // Check that content is visible on mobile
  34 |     await expect(page.locator('h1')).toBeVisible();
> 35 |     await expect(page.getByRole('link', { name: 'Start Free Beta' })).toBeVisible();
     |                                                                       ^ Error: expect(locator).toBeVisible() failed
  36 |   });
  37 | });
  38 | 
```