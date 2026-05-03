# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: full-app-test.spec.ts >> MelodyPitch Full Application Test Suite >> Navigation >> should have working navigation links
- Location: tests/e2e/full-app-test.spec.ts:282:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('link', { name: /Features/i })
    - locator resolved to <a href="#features" class="block px-4 py-2 text-fg-2 hover:text-fg-1 hover:bg-bg-surface-1 rounded-lg transition-colors duration-200 text-sm font-medium">Features</a>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="md:hidden overflow-hidden border-t border-border-subtle">…</div> intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="flex items-center justify-between h-16 md:h-20">…</div> intercepts pointer events
  - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="md:hidden overflow-hidden border-t border-border-subtle">…</div> intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <h1 class="jsx-c3a2862e41502fa0 type-h1 mb-6 text-fg-1 leading-tight">…</h1> from <section class="jsx-c3a2862e41502fa0 relative min-h-[100dvh] flex items-center overflow-hidden bg-bg-base">…</section> subtree intercepts pointer events
  13 × retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="flex items-center justify-between h-16 md:h-20">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="md:hidden overflow-hidden border-t border-border-subtle">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <h1 class="jsx-c3a2862e41502fa0 type-h1 mb-6 text-fg-1 leading-tight">…</h1> from <section class="jsx-c3a2862e41502fa0 relative min-h-[100dvh] flex items-center overflow-hidden bg-bg-base">…</section> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <h1 class="jsx-c3a2862e41502fa0 type-h1 mb-6 text-fg-1 leading-tight">…</h1> from <section class="jsx-c3a2862e41502fa0 relative min-h-[100dvh] flex items-center overflow-hidden bg-bg-base">…</section> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

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
  - alert [ref=e146]
```

# Test source

```ts
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
  234 |     });
  235 | 
  236 |     test('should show error for invalid credentials', async ({ page }) => {
  237 |       await page.goto('http://localhost:3000/login');
  238 |       
  239 |       await page.fill('input[name="email"]', 'nonexistent@test.com');
  240 |       await page.fill('input[name="password"]', 'wrongpassword');
  241 |       await page.click('button[type="submit"]');
  242 |       
  243 |       await page.waitForTimeout(2000);
  244 |       await expect(page).toHaveURL(/.*error=1/);
  245 |     });
  246 | 
  247 |     test('should show link to register page', async ({ page }) => {
  248 |       await page.goto('http://localhost:3000/login');
  249 |       
  250 |       const registerLink = page.getByRole('link', { name: /Create one free/i });
  251 |       await expect(registerLink).toBeVisible();
  252 |     });
  253 |   });
  254 | 
  255 |   test.describe('Authentication Protection', () => {
  256 |     test('should redirect unauthenticated users to login', async ({ page }) => {
  257 |       await page.goto('http://localhost:3000/label/dashboard');
  258 |       
  259 |       await expect(page).toHaveURL(/.*login/);
  260 |     });
  261 | 
  262 |     test('should redirect from songwriter dashboard to login when not authenticated', async ({ page }) => {
  263 |       await page.goto('http://localhost:3000/songwriter/dashboard');
  264 |       
  265 |       await expect(page).toHaveURL(/.*login/);
  266 |     });
  267 | 
  268 |     test('should redirect from artist dashboard to login when not authenticated', async ({ page }) => {
  269 |       await page.goto('http://localhost:3000/artist/dashboard');
  270 |       
  271 |       await expect(page).toHaveURL(/.*login/);
  272 |     });
  273 | 
  274 |     test('should allow access to landing page without authentication', async ({ page }) => {
  275 |       await page.goto('http://localhost:3000');
  276 |       
  277 |       await expect(page).toHaveURL(/.*\/$/);
  278 |     });
  279 |   });
  280 | 
  281 |   test.describe('Navigation', () => {
  282 |     test('should have working navigation links', async ({ page }) => {
  283 |       await page.goto('http://localhost:3000');
  284 |       
  285 |       // Test Features link
  286 |       const featuresLink = page.getByRole('link', { name: /Features/i });
  287 |       if (await featuresLink.isVisible()) {
> 288 |         await featuresLink.click();
      |                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
  289 |         await page.waitForTimeout(500);
  290 |       }
  291 |     });
  292 | 
  293 |     test('should have working mobile menu', async ({ page }) => {
  294 |       await page.setViewportSize({ width: 375, height: 667 });
  295 |       await page.goto('http://localhost:3000');
  296 |       
  297 |       // Check if hamburger menu exists
  298 |       const menuButton = page.getByRole('button', { name: /Toggle menu/i });
  299 |       if (await menuButton.isVisible()) {
  300 |         await menuButton.click();
  301 |         await page.waitForTimeout(300);
  302 |         
  303 |         // Menu should be expanded
  304 |         const navLinks = page.getByRole('link', { name: /Features/i });
  305 |         // Check if menu content is visible
  306 |       }
  307 |     });
  308 |   });
  309 | 
  310 |   test.describe('Error Handling', () => {
  311 |     test('should handle 404 gracefully', async ({ page }) => {
  312 |       const response = await page.goto('http://localhost:3000/nonexistent-page');
  313 |       
  314 |       // Page should still load (404 handling)
  315 |       expect(response?.status()).toBeLessThan(500);
  316 |     });
  317 | 
  318 |     test('should show error message for invalid login', async ({ page }) => {
  319 |       await page.goto('http://localhost:3000/login');
  320 |       
  321 |       await page.fill('input[name="email"]', 'invalid@email.com');
  322 |       await page.fill('input[name="password"]', 'wrongpassword');
  323 |       await page.click('button[type="submit"]');
  324 |       
  325 |       await page.waitForURL(/.*error=1/, { timeout: 5000 });
  326 |       
  327 |       const errorMsg = page.getByText('Invalid email or password');
  328 |       await expect(errorMsg).toBeVisible();
  329 |     });
  330 |   });
  331 | 
  332 |   test.describe('Animations and UI', () => {
  333 |     test('page should load without console errors', async ({ page }) => {
  334 |       const errors: string[] = [];
  335 |       
  336 |       page.on('console', msg => {
  337 |         if (msg.type() === 'error') {
  338 |           errors.push(msg.text());
  339 |         }
  340 |       });
  341 |       
  342 |       await page.goto('http://localhost:3000');
  343 |       await page.waitForTimeout(2000);
  344 |       
  345 |       expect(errors.length).toBe(0);
  346 |     });
  347 | 
  348 |     test('should not have layout shifts', async ({ page }) => {
  349 |       await page.goto('http://localhost:3000');
  350 |       
  351 |       // Wait for all animations to complete
  352 |       await page.waitForTimeout(2000);
  353 |       
  354 |       // Check page is still responsive
  355 |       const mainContent = page.locator('main');
  356 |       await expect(mainContent).toBeVisible();
  357 |     });
  358 |   });
  359 | 
  360 |   test.describe('Performance', () => {
  361 |     test('landing page should load quickly', async ({ page }) => {
  362 |       const startTime = Date.now();
  363 |       await page.goto('http://localhost:3000');
  364 |       const loadTime = Date.now() - startTime;
  365 |       
  366 |       // Should load in under 5 seconds
  367 |       expect(loadTime).toBeLessThan(5000);
  368 |       
  369 |       console.log(`Landing page load time: ${loadTime}ms`);
  370 |     });
  371 | 
  372 |     test('should handle multiple rapid navigation', async ({ page }) => {
  373 |       await page.goto('http://localhost:3000');
  374 |       await page.goto('http://localhost:3000/login');
  375 |       await page.goto('http://localhost:3000/register');
  376 |       await page.goto('http://localhost:3000');
  377 |       
  378 |       // Should end up back on landing page
  379 |       await expect(page).toHaveURL(/.*\/$/);
  380 |     });
  381 |   });
  382 | });
  383 | 
```