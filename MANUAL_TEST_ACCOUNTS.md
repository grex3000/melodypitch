# Manual Test Account Creation Guide

Due to a Supabase auth service issue, email/password registration is currently blocked with "Database error creating new user". This guide shows how to manually create test accounts directly in Supabase to proceed with testing.

## Root Cause Found ✅

**Issue:** Anon API key was pointing to wrong Supabase project
- **Wrong:** `lz5wxebqypekmeedwrw` 
- **Correct:** `lzanwxebqypekmeedwrw`

**Status:** ✅ FIXED - Updated `.env.local` with correct anon key

**Remaining Issue:** Even with correct keys, `auth.admin.createUser()` returns "Database error creating new user" from Supabase API

This appears to be a Supabase backend configuration issue, not an application code issue.

## Workaround: Manual Account Creation

Since the automated registration flow is blocked by Supabase, you can create test accounts manually via the Supabase dashboard:

### Step 1: Access Supabase Dashboard

1. Open https://app.supabase.com
2. Navigate to your project: `melodypitch` (lzanwxebqypekmeedwrw)
3. Click on **Authentication** in the left sidebar
4. Click on **Users** tab

### Step 2: Create Test Accounts

Create 3 accounts for testing each role:

#### Account 1: Label User
- Email: `label-test@melodypitch.test`
- Password: `LabelTest123!`
- User metadata (set in admin panel if available):
  ```json
  {
    "name": "Test Label",
    "role": "LABEL"
  }
  ```

#### Account 2: Songwriter User  
- Email: `songwriter-test@melodypitch.test`
- Password: `SongwriterTest123!`
- User metadata:
  ```json
  {
    "name": "Test Songwriter",
    "role": "SONGWRITER"
  }
  ```

#### Account 3: Artist User
- Email: `artist-test@melodypitch.test`
- Password: `ArtistTest123!`
- User metadata:
  ```json
  {
    "name": "Test Artist",
    "role": "ARTIST"
  }
  ```

### Step 3: Create Database Records

Since user registration also needs to create Prisma User records, you'll need to:

1. Go to **SQL Editor** in Supabase
2. Run this SQL to create the User records:

```sql
-- Create Label user record
INSERT INTO "User" (id, "supabaseUserId", email, name, role)
VALUES (
  gen_random_uuid(),
  (SELECT id FROM auth.users WHERE email = 'label-test@melodypitch.test'),
  'label-test@melodypitch.test',
  'Test Label',
  'LABEL'
);

-- Create Songwriter user record
INSERT INTO "User" (id, "supabaseUserId", email, name, role)
VALUES (
  gen_random_uuid(),
  (SELECT id FROM auth.users WHERE email = 'songwriter-test@melodypitch.test'),
  'songwriter-test@melodypitch.test',
  'Test Songwriter',
  'SONGWRITER'
);

-- Create Artist user record
INSERT INTO "User" (id, "supabaseUserId", email, name, role)
VALUES (
  gen_random_uuid(),
  (SELECT id FROM auth.users WHERE email = 'artist-test@melodypitch.test'),
  'artist-test@melodypitch.test',
  'Test Artist',
  'ARTIST'
);
```

### Step 4: Test Login & Dashboards

Once accounts are created:

1. Go to http://localhost:3000/login
2. Login as label-test@melodypitch.test / LabelTest123!
   - Should redirect to `/label/dashboard`
3. Logout and login as songwriter-test@melodypitch.test / SongwriterTest123!
   - Should redirect to `/songwriter/dashboard`
4. Logout and login as artist-test@melodypitch.test / ArtistTest123!
   - Should redirect to `/artist/dashboard`

## Testing Checklist

- [ ] Create 3 test accounts in Supabase dashboard
- [ ] Create 3 User records in database
- [ ] Login as Label user → verify redirect to label dashboard
- [ ] Login as Songwriter user → verify redirect to songwriter dashboard  
- [ ] Login as Artist user → verify redirect to artist dashboard
- [ ] Verify role-based access control (try accessing other dashboard routes)
- [ ] Test logout and re-login
- [ ] Test session persistence (navigate around app, come back to dashboard)

## Next Steps

After completing manual testing:

1. Document which features are working
2. Create automated tests for login + dashboard access
3. Test Google OAuth complete flow
4. Investigate Supabase registration issue with Supabase support
5. Once fixed, test full email/password registration flow

## Files Updated

- `.env.local` - ✅ Fixed NEXT_PUBLIC_SUPABASE_ANON_KEY to correct project
- `src/app/(auth)/register/page.tsx` - ✅ Added Prisma User record creation
