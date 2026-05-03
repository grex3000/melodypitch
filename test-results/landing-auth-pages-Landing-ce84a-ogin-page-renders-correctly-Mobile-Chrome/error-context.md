# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing-auth-pages.spec.ts >> Landing Page & Auth Pages >> login page renders correctly
- Location: tests/e2e/landing-auth-pages.spec.ts:63:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('a:has-text("Create account")').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('a:has-text("Create account")').first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - heading "Sign in to MelodyPitch" [level=1] [ref=e4]
    - paragraph [ref=e5]: Enter your credentials to continue.
    - button "Sign in with Google" [ref=e8] [cursor=pointer]:
      - img [ref=e9]
      - generic [ref=e14]: Sign in with Google
    - generic [ref=e17]: Or continue with email
    - generic [ref=e19]:
      - generic [ref=e20]:
        - generic [ref=e21]: Email
        - textbox "Email" [ref=e22]
      - generic [ref=e23]:
        - generic [ref=e24]: Password
        - textbox "Password" [ref=e25]
      - button "Sign in" [ref=e26] [cursor=pointer]
    - paragraph [ref=e27]:
      - text: No account?
      - link "Create one free" [ref=e28] [cursor=pointer]:
        - /url: /register
  - alert [ref=e29]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Landing Page & Auth Pages', () => {
  4   |   test('landing page loads successfully', async ({ page }) => {
  5   |     await page.goto('http://localhost:3000');
  6   |     
  7   |     // Check hero section
  8   |     await expect(page.locator('h1:has-text("Where great songs")')).toBeVisible();
  9   |     
  10  |     // Check buttons are visible
  11  |     const getStartedBtn = page.locator('a:has-text("Get started free")').first();
  12  |     await expect(getStartedBtn).toBeVisible();
  13  |     const signInBtn = page.locator('a:has-text("Sign in")').first();
  14  |     await expect(signInBtn).toBeVisible();
  15  |     
  16  |     // Check features section
  17  |     await expect(page.locator('h2:has-text("Everything you need to pitch")')).toBeVisible();
  18  |     
  19  |     console.log('✅ Landing page loaded successfully');
  20  |   });
  21  | 
  22  |   test('navbar is sticky and functional', async ({ page }) => {
  23  |     await page.goto('http://localhost:3000');
  24  |     
  25  |     // Check navbar is visible at top
  26  |     const navbar = page.locator('nav.sticky');
  27  |     await expect(navbar).toBeVisible();
  28  |     
  29  |     // Check MelodyPitch logo/brand
  30  |     await expect(page.locator('span:has-text("MelodyPitch")').first()).toBeVisible();
  31  |     
  32  |     // Check sign in button
  33  |     const signInBtn = page.locator('a:has-text("Sign in")');
  34  |     await expect(signInBtn).toBeVisible();
  35  |     
  36  |     // Click sign in and verify navigation
  37  |     await signInBtn.click();
  38  |     await page.waitForURL(/.*\/login/);
  39  |     
  40  |     expect(page.url()).toContain('/login');
  41  |     console.log('✅ Navbar navigation working');
  42  |   });
  43  | 
  44  |   test('mobile menu toggle works', async ({ page }) => {
  45  |     // Set mobile viewport
  46  |     await page.setViewportSize({ width: 375, height: 667 });
  47  |     await page.goto('http://localhost:3000');
  48  |     
  49  |     // Mobile menu button should be visible
  50  |     const mobileMenuBtn = page.locator('button[aria-label="Toggle menu"]');
  51  |     await expect(mobileMenuBtn).toBeVisible();
  52  |     
  53  |     // Click to toggle menu
  54  |     await mobileMenuBtn.click();
  55  |     
  56  |     // Nav links should be visible in menu
  57  |     const mobileSignIn = page.locator('a:has-text("Sign in")').last();
  58  |     await expect(mobileSignIn).toBeVisible();
  59  |     
  60  |     console.log('✅ Mobile menu working');
  61  |   });
  62  | 
  63  |   test('login page renders correctly', async ({ page }) => {
  64  |     await page.goto('http://localhost:3000/login');
  65  |     
  66  |     // Check form elements
  67  |     await expect(page.locator('input[name="email"]')).toBeVisible();
  68  |     await expect(page.locator('input[name="password"]')).toBeVisible();
  69  |     const submitButton = page.locator('button[type="submit"]');
  70  |     await expect(submitButton).toBeVisible();
  71  |     
  72  |     // Check links
  73  |     const createAccountLink = page.locator('a:has-text("Create account")').first();
> 74  |     await expect(createAccountLink).toBeVisible();
      |                                     ^ Error: expect(locator).toBeVisible() failed
  75  |     
  76  |     console.log('✅ Login page loaded');
  77  |   });
  78  | 
  79  |   test('register page renders correctly', async ({ page }) => {
  80  |     await page.goto('http://localhost:3000/register');
  81  |     
  82  |     // Check form elements
  83  |     await expect(page.locator('input[name="name"]')).toBeVisible();
  84  |     await expect(page.locator('input[name="email"]')).toBeVisible();
  85  |     await expect(page.locator('input[name="password"]')).toBeVisible();
  86  |     await expect(page.locator('select[name="role"]')).toBeVisible();
  87  |     
  88  |     // Check role options exist (options in selects can't be checked for visibility with Playwright)
  89  |     const roleSelect = page.locator('select[name="role"]');
  90  |     const optionText = await roleSelect.textContent();
  91  |     expect(optionText).toContain('Label / A&R');
  92  |     expect(optionText).toContain('Songwriter / Producer');
  93  |     expect(optionText).toContain('Artist / Management');
  94  |     
  95  |     console.log('✅ Register page loaded with all role options');
  96  |   });
  97  | 
  98  |   test('register page role selection works', async ({ page }) => {
  99  |     await page.goto('http://localhost:3000/register');
  100 |     
  101 |     // Test each role can be selected
  102 |     const roleSelect = page.locator('select[name="role"]');
  103 |     
  104 |     await roleSelect.selectOption('LABEL');
  105 |     expect(await roleSelect.inputValue()).toBe('LABEL');
  106 |     
  107 |     await roleSelect.selectOption('SONGWRITER');
  108 |     expect(await roleSelect.inputValue()).toBe('SONGWRITER');
  109 |     
  110 |     await roleSelect.selectOption('ARTIST');
  111 |     expect(await roleSelect.inputValue()).toBe('ARTIST');
  112 |     
  113 |     console.log('✅ All roles selectable');
  114 |   });
  115 | 
  116 |   test('login form validation', async ({ page }) => {
  117 |     await page.goto('http://localhost:3000/login');
  118 |     
  119 |     // Try to submit empty form
  120 |     const submitBtn = page.locator('button:has-text("Sign in")');
  121 |     
  122 |     // Email field is required
  123 |     const emailInput = page.locator('input[name="email"]');
  124 |     const hasRequired = await emailInput.evaluate((el: HTMLInputElement) => el.required);
  125 |     expect(hasRequired).toBeTruthy();
  126 |     
  127 |     // Password field is required
  128 |     const passwordInput = page.locator('input[name="password"]');
  129 |     const passwordRequired = await passwordInput.evaluate((el: HTMLInputElement) => el.required);
  130 |     expect(passwordRequired).toBeTruthy();
  131 |     
  132 |     console.log('✅ Form validation active');
  133 |   });
  134 | 
  135 |   test('register form validation', async ({ page }) => {
  136 |     await page.goto('http://localhost:3000/register');
  137 |     
  138 |     // Check all required fields
  139 |     const nameInput = page.locator('input[name="name"]');
  140 |     const emailInput = page.locator('input[name="email"]');
  141 |     const passwordInput = page.locator('input[name="password"]');
  142 |     const roleSelect = page.locator('select[name="role"]');
  143 |     
  144 |     // All should be required
  145 |     expect(await nameInput.evaluate((el: HTMLInputElement) => el.required)).toBeTruthy();
  146 |     expect(await emailInput.evaluate((el: HTMLInputElement) => el.required)).toBeTruthy();
  147 |     expect(await passwordInput.evaluate((el: HTMLInputElement) => el.required)).toBeTruthy();
  148 |     expect(await roleSelect.evaluate((el: HTMLSelectElement) => el.required)).toBeTruthy();
  149 |     
  150 |     // Password should have minLength of 8
  151 |     const minLength = await passwordInput.evaluate((el: HTMLInputElement) => el.minLength);
  152 |     expect(minLength).toBe(8);
  153 |     
  154 |     console.log('✅ Register form validation active');
  155 |   });
  156 | 
  157 |   test('features section is responsive', async ({ page }) => {
  158 |     // Desktop view
  159 |     await page.setViewportSize({ width: 1920, height: 1080 });
  160 |     await page.goto('http://localhost:3000');
  161 |     
  162 |     const featuresSection = page.locator('section:has(h2:has-text("Everything you need to pitch"))');
  163 |     await expect(featuresSection).toBeVisible();
  164 |     
  165 |     // Mobile view
  166 |     await page.setViewportSize({ width: 375, height: 667 });
  167 |     await expect(featuresSection).toBeVisible();
  168 |     
  169 |     console.log('✅ Features section is responsive');
  170 |   });
  171 | 
  172 |   test('audience sections are visible and responsive', async ({ page }) => {
  173 |     await page.goto('http://localhost:3000');
  174 |     
```