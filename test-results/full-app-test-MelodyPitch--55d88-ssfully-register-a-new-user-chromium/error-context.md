# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: full-app-test.spec.ts >> MelodyPitch Full Application Test Suite >> Registration Flow >> should successfully register a new user
- Location: tests/e2e/full-app-test.spec.ts:162:9

# Error details

```
TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
  navigated to "http://localhost:3000/register?error=1"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - heading "Create your account" [level=1] [ref=e4]
    - paragraph [ref=e5]: Free for songwriters and artists.
    - paragraph [ref=e6]: Unable to create account. Please try again.
    - button "Sign in with Google" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e15]: Sign in with Google
    - generic [ref=e18]: Or sign up with email
    - generic [ref=e20]:
      - generic [ref=e21]:
        - generic [ref=e22]: Full name
        - textbox "Full name" [ref=e23]: Test User
      - generic [ref=e24]:
        - generic [ref=e25]: Email
        - textbox "Email" [ref=e26]: test1777828780391@melodypitch.test
      - generic [ref=e27]:
        - generic [ref=e28]: Password
        - textbox "Password" [ref=e29]: password123
      - generic [ref=e30]:
        - generic [ref=e31]: I am a...
        - combobox "I am a..." [ref=e32]:
          - option "Select role"
          - option "Label / A&R"
          - option "Songwriter / Producer" [selected]
          - option "Artist / Management"
      - button "Create account" [active] [ref=e33] [cursor=pointer]
    - paragraph [ref=e34]:
      - text: Already have an account?
      - link "Sign in" [ref=e35] [cursor=pointer]:
        - /url: /login
  - alert [ref=e36]
```

# Test source

```ts
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
  168 |       await page.fill('input[name="password"]', testPassword);
  169 |       await page.selectOption('select[name="role"]', testRole);
  170 |       
  171 |       // Submit form
  172 |       await page.click('button[type="submit"]');
  173 |       
  174 |       // Should redirect to login with registered message
> 175 |       await page.waitForURL(/.*login.*registered=1/, { timeout: 10000 });
      |                  ^ TimeoutError: page.waitForURL: Timeout 10000ms exceeded.
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
```