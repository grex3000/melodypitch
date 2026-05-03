# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Auth Flow >> should login successfully with test account
- Location: tests/e2e/auth.spec.ts:9:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*label\/dashboard/
Received string:  "http://localhost:3000/login?error=1&callbackUrl=%2F"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    4 × unexpected value "http://localhost:3000/login"
    5 × unexpected value "http://localhost:3000/login?error=1&callbackUrl=%2F"

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
  3  | test.describe('Auth Flow', () => {
  4  |   test('should redirect to login from protected route', async ({ page }) => {
  5  |     await page.goto('http://localhost:3000/label/dashboard');
  6  |     await expect(page).toHaveURL(/.*login/);
  7  |   });
  8  | 
  9  |   test('should login successfully with test account', async ({ page }) => {
  10 |     await page.goto('http://localhost:3000/login');
  11 |     await page.fill('input[name="email"]', 'label@melodypitch.test');
  12 |     await page.fill('input[name="password"]', 'password123');
  13 |     await page.click('button[type="submit"]');
  14 |     // Should redirect to label dashboard
> 15 |     await expect(page).toHaveURL(/.*label\/dashboard/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  16 |   });
  17 | });
  18 | 
```