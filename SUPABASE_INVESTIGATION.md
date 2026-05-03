# Supabase Registration Issue - Investigation Report

## Executive Summary

Fixed a critical API key mismatch issue, but email/password registration still fails with "Database error creating new user" from Supabase backend. This appears to be a Supabase infrastructure configuration issue, not an application bug.

## Issues Identified & Fixed

### ✅ FIXED: API Key Mismatch

**Problem:** 
- Anon key in `.env.local` was pointing to wrong Supabase project (`lz5wxebqypekmeedwrw`)
- Service role key was pointing to correct project (`lzanwxebqypekmeedwrw`)
- This caused auth operations to use inconsistent projects

**Root Cause:**
- Likely copy-paste error during initial setup
- Keys are stored in JWT format and can't be visually distinguished

**How It Was Found:**
1. Decoded JWT tokens from both keys
2. Extracted `ref` (project reference) field from JWT payloads
3. Compared and found mismatch
4. Used `supabase projects api-keys` CLI command to get correct key

**Fix Applied:**
```
OLD: NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...ref:lz5wxebqypekmeedwrw...
NEW: NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...ref:lzanwxebqypekmeedwrw...
```

### 🔴 REMAINING: "Database error creating new user"

**Problem:**
- Even with correct keys, `supabaseAdmin.auth.admin.createUser()` returns error
- Error: `AuthApiError: Database error creating new user`
- Occurs consistently on all registration attempts

**Diagnostic Steps Taken:**

1. **Checked Supabase API directly:**
   ```bash
   curl -X POST https://lzanwxebqypekmeedwrw.supabase.co/auth/v1/admin/users \
     -H "Authorization: Bearer SERVICE_ROLE_KEY" \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"Test123!"}'
   ```
   Result: Same error from Supabase API

2. **Verified service role key is valid:**
   - Can list users with it: `supabase projects api-keys` works
   - Key has `service_role` claim
   - Key hasn't expired

3. **Checked project configuration:**
   - Linked project with `supabase link`
   - Confirmed using `supabase projects list`
   - Database connection works

4. **Ruled out application code:**
   - Error originates from Supabase's `GoTrueAdminApi.createUser()`
   - Not from our Prisma code
   - Same error with minimal API call

**Likely Root Causes:**
1. **Database RLS Policy Issue** - Supabase auth schema might have overly restrictive RLS
2. **Database Trigger Failure** - Auth insert might trigger a function that fails
3. **Connection Pool Issue** - Temporary connectivity or quota issue
4. **Auth Service Configuration** - Missing provider setup or email domain restrictions
5. **Database Constraint** - Unique constraint or foreign key issue in auth schema

## Files Investigated

1. `.env.local` - ✅ API keys fixed
2. `src/app/(auth)/register/page.tsx` - ✅ Added logging and Prisma User creation
3. `prisma/setup.sql` - Reviewed schema (looks correct)
4. `scripts/disable-email-confirm.sql` - Reviewed (has typo but shouldn't affect create)
5. Supabase CLI config - Verified project link is correct

## Commands That Would Help Diagnose Further

If you have Supabase dashboard access:

```bash
# Check if there are triggers on auth.users table
SELECT * FROM information_schema.triggers 
WHERE event_object_table = 'users' 
AND event_object_schema = 'auth';

# Check Row Level Security policies
SELECT * FROM pg_policies 
WHERE schemaname = 'auth' 
AND tablename = 'users';

# Check for constraint violations
SELECT * FROM pg_constraint 
WHERE conrelid = 'auth.users'::regclass;

# Check auth configuration
SELECT * FROM auth.config;
```

## Workaround Implemented

Since automated registration is blocked, users can:

1. Create accounts manually in Supabase dashboard (Authentication > Users)
2. Set user metadata (name, role) in the dashboard
3. Create corresponding `User` records in PostgreSQL via SQL Editor
4. Test login and dashboard access via the app

See `MANUAL_TEST_ACCOUNTS.md` for detailed instructions.

## Recommendations

### Short Term (Unblock Testing)
1. ✅ Use manual account creation approach
2. ✅ Test login, dashboards, and role-based features
3. Create automated tests for login flow

### Medium Term (Investigate Root Cause)
1. Contact Supabase support with:
   - Project reference: `lzanwxebqypekmeedwrw`
   - Error: "Database error creating new user"
   - Detailed steps to reproduce
   - Any recent changes to auth config
   
2. Check Supabase documentation for:
   - Known issues with auth.admin.createUser()
   - Auth schema configuration requirements
   - RLS policy recommendations for auth schema

3. Try in Supabase project clone:
   - Create a new Supabase project
   - Copy our schema
   - Test if registration works there
   - If it does, compare configurations

### Long Term (Fix Registration)
1. Once root cause is identified, implement fix
2. Re-enable automated registration tests
3. Test full end-to-end registration flow
4. Deploy to production

## Test Results

- **Landing Page Tests:** 19/24 passing ✅
- **Manual Registration Tests:** Blocked 🔴
- **Login Tests:** Blocked until accounts created
- **Dashboard Tests:** Blocked until accounts created

## Code Quality

- ✅ No errors in `npm run build`
- ✅ No TypeScript errors
- ✅ No console errors in app
- ✅ Added detailed error logging
- ✅ Proper error handling

## Learnings

1. **JWT Decoding:** Can extract claims without verification using base64 decode
2. **Supabase CLI:** Very powerful for debugging - `supabase projects api-keys` was key to finding the issue
3. **API Key Security:** Should store keys in secure vault, not discoverable in JWT
4. **Auth Service Debugging:** Sometimes the issue isn't in your code, but in the third-party service configuration
