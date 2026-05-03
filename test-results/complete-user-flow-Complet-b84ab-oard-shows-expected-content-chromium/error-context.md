# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: complete-user-flow.spec.ts >> Complete User Journey - All Roles >> Role-Specific Dashboard Content >> LABEL dashboard shows expected content
- Location: tests/e2e/complete-user-flow.spec.ts:100:9

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
        - textbox "Email" [ref=e23]: label1777828692311@melodypitch.test
      - generic [ref=e24]:
        - generic [ref=e25]: Password
        - textbox "Password" [ref=e26]: RecordLabel123!
      - button "Sign in" [active] [ref=e27] [cursor=pointer]
    - paragraph [ref=e28]:
      - text: No account?
      - link "Create one free" [ref=e29] [cursor=pointer]:
        - /url: /register
  - alert [ref=e30]
```

# Test source

```ts
  9   |       name: 'Nocturne Records',
  10  |       email: `label${timestamp}@melodypitch.test`,
  11  |       password: 'RecordLabel123!',
  12  |       dashboardPath: '/label/dashboard',
  13  |     },
  14  |     {
  15  |       role: 'SONGWRITER',
  16  |       name: 'Alex Producer',
  17  |       email: `songwriter${timestamp}@melodypitch.test`,
  18  |       password: 'SongWriter123!',
  19  |       dashboardPath: '/songwriter/dashboard',
  20  |     },
  21  |     {
  22  |       role: 'ARTIST',
  23  |       name: 'Luna Management',
  24  |       email: `artist${timestamp}@melodypitch.test`,
  25  |       password: 'ArtistMgmt123!',
  26  |       dashboardPath: '/artist/dashboard',
  27  |     },
  28  |   ];
  29  | 
  30  |   test.describe('Account Creation & Role Selection', () => {
  31  |     for (const user of testUsers) {
  32  |       test(`create ${user.role} account: ${user.name}`, async ({ page }) => {
  33  |         console.log(`\n📝 Creating ${user.role} account: ${user.name}`);
  34  |         
  35  |         await page.goto('http://localhost:3000/register');
  36  | 
  37  |         // Fill registration form
  38  |         await page.fill('input[name="name"]', user.name);
  39  |         console.log(`   ✅ Name entered: ${user.name}`);
  40  | 
  41  |         await page.fill('input[name="email"]', user.email);
  42  |         console.log(`   ✅ Email entered: ${user.email}`);
  43  | 
  44  |         await page.fill('input[name="password"]', user.password);
  45  |         console.log(`   ✅ Password entered`);
  46  | 
  47  |         // SELECT ROLE
  48  |         console.log(`   📌 Selecting role: ${user.role}`);
  49  |         const roleValue = user.role === 'ARTIST' ? 'ARTIST' : user.role;
  50  |         await page.selectOption('select[name="role"]', roleValue);
  51  |         console.log(`   ✅ Role selected: ${user.role}`);
  52  | 
  53  |         // Submit
  54  |         await page.click('button[type="submit"]');
  55  |         console.log(`   🔄 Submitting form...`);
  56  | 
  57  |         // Wait for redirect
  58  |         await page.waitForURL(/.*\/login.*registered=1/);
  59  |         const url = page.url();
  60  |         console.log(`   ✅ Redirected to: ${url}`);
  61  | 
  62  |         expect(url).toContain('/login');
  63  |         expect(url).toContain('registered=1');
  64  |         console.log(`   ✅ ${user.role} account created successfully!\n`);
  65  |       });
  66  |     }
  67  |   });
  68  | 
  69  |   test.describe('Login & Dashboard Access', () => {
  70  |     for (const user of testUsers) {
  71  |       test(`login as ${user.role} and access dashboard`, async ({ page }) => {
  72  |         console.log(`\n🔐 Testing ${user.role} login`);
  73  |         
  74  |         await page.goto('http://localhost:3000/login');
  75  | 
  76  |         // Login
  77  |         await page.fill('input[name="email"]', user.email);
  78  |         console.log(`   ✅ Email entered`);
  79  | 
  80  |         await page.fill('input[name="password"]', user.password);
  81  |         console.log(`   ✅ Password entered`);
  82  | 
  83  |         await page.click('button[type="submit"]');
  84  |         console.log(`   🔄 Submitting login...`);
  85  | 
  86  |         // Should redirect to dashboard
  87  |         await page.waitForURL(/.*dashboard/, { timeout: 5000 });
  88  |         const url = page.url();
  89  |         console.log(`   ✅ Logged in! Redirected to: ${url}`);
  90  | 
  91  |         // Check dashboard is accessible
  92  |         expect(url).toContain('dashboard');
  93  |         expect(url).not.toContain('error=1');
  94  |         console.log(`   ✅ ${user.role} successfully logged in!\n`);
  95  |       });
  96  |     }
  97  |   });
  98  | 
  99  |   test.describe('Role-Specific Dashboard Content', () => {
  100 |     test('LABEL dashboard shows expected content', async ({ page }) => {
  101 |       const label = testUsers[0];
  102 |       console.log(`\n📊 Testing LABEL dashboard`);
  103 | 
  104 |       await page.goto('http://localhost:3000/login');
  105 |       await page.fill('input[name="email"]', label.email);
  106 |       await page.fill('input[name="password"]', label.password);
  107 |       await page.click('button[type="submit"]');
  108 | 
> 109 |       await page.waitForURL(/.*label\/dashboard/);
      |                  ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  110 |       console.log(`   ✅ On label dashboard`);
  111 | 
  112 |       // Check for label-specific content
  113 |       const pageContent = await page.content();
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
```