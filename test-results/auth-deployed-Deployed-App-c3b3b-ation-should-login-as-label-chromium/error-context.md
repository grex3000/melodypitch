# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth-deployed.spec.ts >> Deployed App Authentication >> should login as label
- Location: tests/e2e/auth-deployed.spec.ts:34:7

# Error details

```
Error: expect(received).not.toContain(expected) // indexOf

Expected substring: not "error=1"
Received string:        "https://melodypitch.vercel.app/login?error=1&callbackUrl=%2F"
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
        - textbox "Email" [ref=e23]: label@melodypitch.test
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
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Deployed App Authentication', () => {
  4  |   const BASE_URL = 'https://melodypitch.vercel.app';
  5  |   
  6  |   const users = [
  7  |     { email: 'label@melodypitch.test', password: 'password123', name: 'Nocturne Records', role: 'LABEL' },
  8  |     { email: 'writer@melodypitch.test', password: 'password123', name: 'Maren Solberg', role: 'SONGWRITER' },
  9  |     { email: 'artist@melodypitch.test', password: 'password123', name: 'Lena Rydell', role: 'ARTIST' },
  10 |   ];
  11 | 
  12 |   // First, try to sign up the users
  13 |   for (const user of users) {
  14 |     test(`sign up ${user.role}`, async ({ page }) => {
  15 |       await page.goto(`${BASE_URL}/register`);
  16 |       
  17 |       // Fill in the form
  18 |       await page.fill('input[name="email"]', user.email);
  19 |       await page.fill('input[name="name"]', user.name);
  20 |       await page.fill('input[name="password"]', user.password);
  21 |       await page.selectOption('select[name="role"]', user.role);
  22 |       
  23 |       // Submit
  24 |       await page.click('button[type="submit"]');
  25 |       
  26 |       // Wait for redirect (to login page with registered=1, or dashboard)
  27 |       await page.waitForTimeout(3000);
  28 |       
  29 |       console.log(`After signup for ${user.email}: ${page.url()}`);
  30 |     });
  31 |   }
  32 | 
  33 |   // Then test login
  34 |   test('should login as label', async ({ page }) => {
  35 |     await page.goto(`${BASE_URL}/login`);
  36 |     
  37 |     await page.fill('input[name="email"]', 'label@melodypitch.test');
  38 |     await page.fill('input[name="password"]', 'password123');
  39 |     await page.click('button[type="submit"]');
  40 |     
  41 |     await page.waitForTimeout(3000);
  42 |     console.log('After login attempt:', page.url());
  43 |     
  44 |     // Should NOT have error=1
> 45 |     expect(page.url()).not.toContain('error=1');
     |                            ^ Error: expect(received).not.toContain(expected) // indexOf
  46 |   });
  47 | });
  48 | 
```