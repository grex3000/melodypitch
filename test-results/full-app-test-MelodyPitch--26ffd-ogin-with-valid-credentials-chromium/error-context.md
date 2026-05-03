# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: full-app-test.spec.ts >> MelodyPitch Full Application Test Suite >> Login Flow >> should successfully login with valid credentials
- Location: tests/e2e/full-app-test.spec.ts:222:9

# Error details

```
Error: expect(received).not.toContain(expected) // indexOf

Expected substring: not "error=1"
Received string:        "http://localhost:3000/login?error=1&callbackUrl=%2F"
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - heading "Sign in to MelodyPitch" [level=1] [ref=e4]
    - paragraph [ref=e5]: Enter your credentials to continue.
    - paragraph [ref=e6]: Invalid email or password.
    - button "Sign in with Google" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e15]: Sign in with Google
    - generic [ref=e18]: Or continue with email
    - generic [ref=e20]:
      - generic [ref=e21]:
        - generic [ref=e22]: Email
        - textbox "Email" [ref=e23]: test1777808294540@melodypitch.test
      - generic [ref=e24]:
        - generic [ref=e25]: Password
        - textbox "Password" [ref=e26]: password123
      - button "Sign in" [active] [ref=e27] [cursor=pointer]
    - paragraph [ref=e28]:
      - text: No account?
      - link "Create one free" [ref=e29] [cursor=pointer]:
        - /url: /register
  - alert [ref=e30]
```

# Test source

```ts
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
> 233 |       expect(url).not.toContain('error=1');
      |                       ^ Error: expect(received).not.toContain(expected) // indexOf
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
  288 |         await featuresLink.click();
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
```