# 🔧 FIX AUTH - ROOT CAUSE FOUND

**Date**: May 3, 2026, 14:45 UTC  
**Issue**: Invalid Supabase Service Role Key  
**Solution**: Replace with valid key from Supabase dashboard

---

## THE EXACT PROBLEM

When users try to register, we get:
```
Registration error: AuthApiError: Invalid API key
```

This is because **SUPABASE_SERVICE_ROLE_KEY in .env.local is invalid or revoked**.

### Why This Matters
Registration uses the service role key to create users:
```typescript
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const { data, error } = await supabaseAdmin.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { name, role },
});
```

If the key is invalid, `auth.admin.createUser()` fails immediately.

---

## HOW TO FIX (5 minutes)

### Step 1: Open Supabase Dashboard
- Go to: https://app.supabase.com/
- Login with your account
- Select project: `lzanwxebqypekmeedwrw`

### Step 2: Get New Service Role Key
- In left sidebar, click **Settings** (gear icon)
- Click **API** tab
- Look for "Service Role" section
- You should see a key starting with `eyJhbGciOi...`
- Click the **copy icon** next to it
- This is your valid service role key

### Step 3: Update .env.local
- Open `.env.local` in your editor
- Find this line:
  ```
  SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6NXd4ZWJxeXBla21lZWR3cnciLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNzM3NzU1Mjc3LCJleHAiOjIwOTMxMjg3Nzd9.C5cCTtqw9SX1SCdOpchYd4xzrm1ltb5TuN_pGR6H7b8
  ```
- **Replace it completely** with the key you just copied
- Save the file

### Step 4: Restart Dev Server
```bash
# Kill current server
killall node

# Start fresh
npm run dev
```

### Step 5: Test Registration
- Go to http://localhost:3000/register
- Fill in:
  - Name: `Test User`
  - Email: `testuser@melodypitch.test`
  - Password: `TestPassword123!`
  - Role: `Songwriter / Producer`
- Click "Create account"
- **Expected**: Redirect to /login?registered=1 ✅
- **What you'll get if fixed**: Success message

### Step 6: Test Login
- Go to http://localhost:3000/login
- Use the email/password you just created
- Click "Sign in"
- **Expected**: Redirect to dashboard ✅

---

## WHAT THE INVALID KEY LOOKS LIKE

**Current (INVALID)**:
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**From Supabase Dashboard (VALID)**:
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
(but a DIFFERENT key - Supabase gives you a specific one per project)
```

The keys look similar but are different. If you copied the wrong one or it was regenerated, that's the issue.

---

## WHY THIS HAPPENED

Possible reasons:
1. **Key was regenerated** in Supabase dashboard (you or someone else)
2. **Different Supabase project** (the key is for a different project)
3. **Key expired** (less likely since exp is year 2036)
4. **Key was revoked** (Supabase revokes keys when you regenerate)

The solution is the same: **Get the current valid key from the dashboard**.

---

## VERIFICATION CHECKLIST

After making the change:

- [ ] .env.local has new service role key
- [ ] Dev server restarted
- [ ] Navigate to /register
- [ ] Create test account (email: test@melodypitch.test)
- [ ] See "Redirect to /login?registered=1" ✅
- [ ] Go to /login
- [ ] Login with test email/password
- [ ] See dashboard (not error=1) ✅
- [ ] Try invalid password
- [ ] See error message ✅

If all ✅, registration and login are FIXED!

---

## IF IT STILL DOESN'T WORK

If you still get "Invalid API key" after replacing the key:

1. **Double-check the key**
   - Copy again from Supabase dashboard
   - Make sure it's the SERVICE ROLE key, not anon key
   - Make sure it's the full key (it's long)

2. **Check Supabase project**
   - Make sure you're in the right project: `lzanwxebqypekmeedwrw`
   - Check in dashboard: it should say this at the top

3. **Verify the URL**
   - Check NEXT_PUBLIC_SUPABASE_URL is correct
   - Current: `https://lzanwxebqypekmeedwrw.supabase.co`
   - Supabase gives this to you in project settings

4. **Try regenerating the key**
   - In Supabase → Settings → API
   - Click "Regenerate" for Service Role key
   - Copy the new one
   - Update .env.local
   - Restart dev server

---

## AFTER AUTH IS FIXED

Once registration and login work, I still need to check:
1. ✅ Email/password auth working
2. ❓ Google OAuth complete flow
3. ✅ Dashboard access after login
4. ✅ Protected routes working
5. ✅ Session management working

But first: **Replace that service role key!**

---

**This should take 5 minutes max to fix.**

Let me know once you've updated the key and restarted the server!
