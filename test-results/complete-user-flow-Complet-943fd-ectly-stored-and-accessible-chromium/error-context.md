# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: complete-user-flow.spec.ts >> Complete User Journey - All Roles >> Complete User Profile Visibility >> user data is correctly stored and accessible
- Location: tests/e2e/complete-user-flow.spec.ts:270:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
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
        - textbox "Full name" [ref=e23]: Nocturne Records
      - generic [ref=e24]:
        - generic [ref=e25]: Email
        - textbox "Email" [ref=e26]: label1777828726584@melodypitch.test
      - generic [ref=e27]:
        - generic [ref=e28]: Password
        - textbox "Password" [ref=e29]: RecordLabel123!
      - generic [ref=e30]:
        - generic [ref=e31]: I am a...
        - combobox "I am a..." [ref=e32]:
          - option "Select role"
          - option "Label / A&R" [selected]
          - option "Songwriter / Producer"
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
  185 |       await page.fill('input[name="password"]', label.password);
  186 |       await page.click('button[type="submit"]');
  187 | 
  188 |       await page.waitForURL(/.*label\/dashboard/);
  189 |       console.log(`   ✅ Logged in`);
  190 | 
  191 |       // Try to access protected route after "logout" by clearing cookies
  192 |       await page.context().clearCookies();
  193 |       console.log(`   🔄 Cleared session`);
  194 | 
  195 |       await page.goto('http://localhost:3000/label/dashboard');
  196 |       await page.waitForURL(/.*login/, { timeout: 3000 }).catch(() => {});
  197 |       
  198 |       const url = page.url();
  199 |       console.log(`   ✅ Redirected to login after session clear`);
  200 |     });
  201 |   });
  202 | 
  203 |   test.describe('Role-Based Access Control', () => {
  204 |     test('songwriter cannot access label dashboard', async ({ page }) => {
  205 |       const songwriter = testUsers[1];
  206 |       console.log(`\n🛡️ Testing RBAC - songwriter accessing label path`);
  207 | 
  208 |       // Login as songwriter
  209 |       await page.goto('http://localhost:3000/login');
  210 |       await page.fill('input[name="email"]', songwriter.email);
  211 |       await page.fill('input[name="password"]', songwriter.password);
  212 |       await page.click('button[type="submit"]');
  213 | 
  214 |       await page.waitForURL(/.*songwriter\/dashboard/);
  215 |       console.log(`   ✅ Logged in as songwriter`);
  216 | 
  217 |       // Try to access label path
  218 |       await page.goto('http://localhost:3000/label/dashboard');
  219 |       await page.waitForTimeout(2000);
  220 | 
  221 |       const url = page.url();
  222 |       console.log(`   📍 Attempted to access /label/dashboard`);
  223 |       console.log(`   Result URL: ${url}`);
  224 | 
  225 |       // Should either:
  226 |       // 1. Redirect to songwriter dashboard
  227 |       // 2. Show error
  228 |       // 3. Show empty state
  229 |       console.log(`   ✅ Access control working\n`);
  230 |     });
  231 |   });
  232 | 
  233 |   test.describe('Form Validation', () => {
  234 |     test('registration rejects invalid email', async ({ page }) => {
  235 |       console.log(`\n✔️ Testing email validation`);
  236 | 
  237 |       await page.goto('http://localhost:3000/register');
  238 |       await page.fill('input[name="name"]', 'Test User');
  239 |       await page.fill('input[name="email"]', 'not-an-email');
  240 |       await page.fill('input[name="password"]', 'Test123456!');
  241 |       await page.selectOption('select[name="role"]', 'SONGWRITER');
  242 | 
  243 |       const submitBtn = page.locator('button[type="submit"]');
  244 |       const isDisabled = await submitBtn.evaluate((el: HTMLButtonElement) => el.disabled);
  245 |       
  246 |       console.log(`   📋 Form validation: email field checked`);
  247 |       console.log(`   ✅ Email validation working\n`);
  248 |     });
  249 | 
  250 |     test('registration rejects short password', async ({ page }) => {
  251 |       console.log(`\n✔️ Testing password length validation`);
  252 | 
  253 |       await page.goto('http://localhost:3000/register');
  254 |       await page.fill('input[name="name"]', 'Test User');
  255 |       await page.fill('input[name="email"]', `test${Date.now()}@example.com`);
  256 |       await page.fill('input[name="password"]', 'short');
  257 |       await page.selectOption('select[name="role"]', 'SONGWRITER');
  258 | 
  259 |       await page.click('button[type="submit"]');
  260 |       await page.waitForTimeout(500);
  261 | 
  262 |       // HTML5 validation should prevent submission
  263 |       const url = page.url();
  264 |       expect(url).toContain('/register');
  265 |       console.log(`   ✅ Password length validation working\n`);
  266 |     });
  267 |   });
  268 | 
  269 |   test.describe('Complete User Profile Visibility', () => {
  270 |     test('user data is correctly stored and accessible', async ({ page }) => {
  271 |       const label = testUsers[0];
  272 |       console.log(`\n👤 Testing user data storage`);
  273 | 
  274 |       // Register
  275 |       await page.goto('http://localhost:3000/register');
  276 |       await page.fill('input[name="name"]', label.name);
  277 |       await page.fill('input[name="email"]', label.email);
  278 |       await page.fill('input[name="password"]', label.password);
  279 |       await page.selectOption('select[name="role"]', 'LABEL');
  280 |       await page.click('button[type="submit"]');
  281 | 
  282 |       console.log(`   ✅ Account created`);
  283 | 
  284 |       // Login
> 285 |       await page.waitForURL(/.*registered=1/);
      |                  ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  286 |       await page.fill('input[name="email"]', label.email);
  287 |       await page.fill('input[name="password"]', label.password);
  288 |       await page.click('button[type="submit"]');
  289 | 
  290 |       await page.waitForURL(/.*label\/dashboard/);
  291 |       console.log(`   ✅ Logged in`);
  292 | 
  293 |       // Check if we can access dashboard (data is stored)
  294 |       const dashboardUrl = page.url();
  295 |       expect(dashboardUrl).toContain('label/dashboard');
  296 |       console.log(`   ✅ User data correctly stored and user role recognized\n`);
  297 |     });
  298 |   });
  299 | });
  300 | 
```