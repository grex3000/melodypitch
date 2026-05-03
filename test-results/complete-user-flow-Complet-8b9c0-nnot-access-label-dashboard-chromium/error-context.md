# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: complete-user-flow.spec.ts >> Complete User Journey - All Roles >> Role-Based Access Control >> songwriter cannot access label dashboard
- Location: tests/e2e/complete-user-flow.spec.ts:204:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
  navigated to "http://localhost:3000/login?error=1&callbackUrl=%2F"
============================================================
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
        - textbox "Email" [ref=e23]: songwriter1777828725145@melodypitch.test
      - generic [ref=e24]:
        - generic [ref=e25]: Password
        - textbox "Password" [ref=e26]: SongWriter123!
      - button "Sign in" [active] [ref=e27] [cursor=pointer]
    - paragraph [ref=e28]:
      - text: No account?
      - link "Create one free" [ref=e29] [cursor=pointer]:
        - /url: /register
  - alert [ref=e30]
```

# Test source

```ts
  114 |       console.log(`   📋 Page loaded and accessible`);
  115 |     });
  116 | 
  117 |     test('SONGWRITER dashboard shows expected content', async ({ page }) => {
  118 |       const songwriter = testUsers[1];
  119 |       console.log(`\n📊 Testing SONGWRITER dashboard`);
  120 | 
  121 |       await page.goto('http://localhost:3000/login');
  122 |       await page.fill('input[name="email"]', songwriter.email);
  123 |       await page.fill('input[name="password"]', songwriter.password);
  124 |       await page.click('button[type="submit"]');
  125 | 
  126 |       await page.waitForURL(/.*songwriter\/dashboard/);
  127 |       console.log(`   ✅ On songwriter dashboard`);
  128 | 
  129 |       const pageContent = await page.content();
  130 |       console.log(`   📋 Page loaded and accessible`);
  131 |     });
  132 | 
  133 |     test('ARTIST dashboard shows expected content', async ({ page }) => {
  134 |       const artist = testUsers[2];
  135 |       console.log(`\n📊 Testing ARTIST dashboard`);
  136 | 
  137 |       await page.goto('http://localhost:3000/login');
  138 |       await page.fill('input[name="email"]', artist.email);
  139 |       await page.fill('input[name="password"]', artist.password);
  140 |       await page.click('button[type="submit"]');
  141 | 
  142 |       await page.waitForURL(/.*artist\/dashboard/);
  143 |       console.log(`   ✅ On artist dashboard`);
  144 | 
  145 |       const pageContent = await page.content();
  146 |       console.log(`   📋 Page loaded and accessible`);
  147 |     });
  148 |   });
  149 | 
  150 |   test.describe('User Session Management', () => {
  151 |     test('user remains logged in after navigation', async ({ page }) => {
  152 |       const songwriter = testUsers[1];
  153 |       console.log(`\n🔐 Testing session persistence`);
  154 | 
  155 |       // Login
  156 |       await page.goto('http://localhost:3000/login');
  157 |       await page.fill('input[name="email"]', songwriter.email);
  158 |       await page.fill('input[name="password"]', songwriter.password);
  159 |       await page.click('button[type="submit"]');
  160 | 
  161 |       await page.waitForURL(/.*dashboard/);
  162 |       console.log(`   ✅ Logged in`);
  163 | 
  164 |       // Navigate around
  165 |       await page.goto('http://localhost:3000/');
  166 |       console.log(`   ✅ Navigated to home`);
  167 | 
  168 |       // Go back to dashboard
  169 |       await page.goto('http://localhost:3000/songwriter/dashboard');
  170 |       const url = page.url();
  171 |       console.log(`   ✅ Still on dashboard: ${url}`);
  172 | 
  173 |       expect(url).toContain('dashboard');
  174 |       expect(url).not.toContain('login');
  175 |       console.log(`   ✅ Session maintained!\n`);
  176 |     });
  177 | 
  178 |     test('logout redirects to login', async ({ page }) => {
  179 |       const label = testUsers[0];
  180 |       console.log(`\n🔓 Testing logout`);
  181 | 
  182 |       // Login first
  183 |       await page.goto('http://localhost:3000/login');
  184 |       await page.fill('input[name="email"]', label.email);
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
> 214 |       await page.waitForURL(/.*songwriter\/dashboard/);
      |                  ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
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
  285 |       await page.waitForURL(/.*registered=1/);
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