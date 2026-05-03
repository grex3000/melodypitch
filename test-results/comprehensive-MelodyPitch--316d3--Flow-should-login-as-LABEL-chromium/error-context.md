# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: comprehensive.spec.ts >> MelodyPitch Comprehensive Flow >> Login Flow >> should login as LABEL
- Location: tests/e2e/comprehensive.spec.ts:57:11

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
        - textbox "Email" [ref=e23]: label1777828768332@melodypitch.test
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
  23  |       await page.getByRole('link', { name: /Start Free/i }).click();
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
> 69  |         expect(url).not.toContain('error=1');
      |                         ^ Error: expect(received).not.toContain(expected) // indexOf
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
  124 |         await expect(page).toHaveURL(/.*artist\/dashboard|.*\/dashboard/);
  125 |       }
  126 |     });
  127 |   });
  128 | 
  129 |   test.describe('Portal Features', () => {
  130 |     test('label can create a new portal', async ({ page }) => {
  131 |       const user = testUsers[0];
  132 |       await page.goto('http://localhost:3000/login');
  133 |       await page.fill('input[name="email"]', user.email);
  134 |       await page.fill('input[name="password"]', user.password);
  135 |       await page.click('button[type="submit"]');
  136 |       await page.waitForTimeout(3000);
  137 |       
  138 |       const url = page.url();
  139 |       if (!url.includes('error=1')) {
  140 |         await page.goto('http://localhost:3000/label/portals/new');
  141 |         await expect(page.locator('h1')).toContainText(/New Portal|Create Portal/i);
  142 |       }
  143 |     });
  144 |   });
  145 | 
  146 |   test.describe('Auth Protection', () => {
  147 |     test('should redirect unauthenticated users from protected routes', async ({ page }) => {
  148 |       await page.goto('http://localhost:3000/label/dashboard');
  149 |       await expect(page).toHaveURL(/.*login/);
  150 |     });
  151 | 
  152 |     test('should have working register link from login page', async ({ page }) => {
  153 |       await page.goto('http://localhost:3000/login');
  154 |       await page.getByRole('link', { name: /Create one free/i }).click();
  155 |       await expect(page).toHaveURL(/.*register/);
  156 |     });
  157 |   });
  158 | });
```