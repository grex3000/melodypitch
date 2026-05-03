# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: complete-user-flow.spec.ts >> Complete User Journey - All Roles >> Account Creation & Role Selection >> create ARTIST account: Luna Management
- Location: tests/e2e/complete-user-flow.spec.ts:32:11

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
        - textbox "Full name" [ref=e23]: Luna Management
      - generic [ref=e24]:
        - generic [ref=e25]: Email
        - textbox "Email" [ref=e26]: artist1777828666215@melodypitch.test
      - generic [ref=e27]:
        - generic [ref=e28]: Password
        - textbox "Password" [ref=e29]: ArtistMgmt123!
      - generic [ref=e30]:
        - generic [ref=e31]: I am a...
        - combobox "I am a..." [ref=e32]:
          - option "Select role"
          - option "Label / A&R"
          - option "Songwriter / Producer"
          - option "Artist / Management" [selected]
      - button "Create account" [active] [ref=e33] [cursor=pointer]
    - paragraph [ref=e34]:
      - text: Already have an account?
      - link "Sign in" [ref=e35] [cursor=pointer]:
        - /url: /login
  - alert [ref=e36]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Complete User Journey - All Roles', () => {
  4   |   const timestamp = Date.now();
  5   | 
  6   |   const testUsers = [
  7   |     {
  8   |       role: 'LABEL',
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
> 58  |         await page.waitForURL(/.*\/login.*registered=1/);
      |                    ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
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
  109 |       await page.waitForURL(/.*label\/dashboard/);
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
```