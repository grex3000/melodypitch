# 🔐 Authentication Setup Guide - CRITICAL ISSUES

**Status**: ❌ 2 Critical Issues Found  
**Date**: May 3, 2026

---

## 🚨 Critical Issues

### Issue 1: Email/Password Login Not Working
**Error**: `label@melodypitch.test / password123` fails to authenticate  
**Status**: Blocking all users from logging in

### Issue 2: Google OAuth Not Enabled
**Error**: `"Unsupported provider: provider is not enabled"`  
**Status**: Google Sign-In buttons don't work

---

## 🔧 How to Fix

### Fix 1: Enable Google OAuth Provider in Supabase

1. **Go to Supabase Dashboard**
   - URL: https://app.supabase.com/
   - Project: `lzanwxebqypekmeedwrw`

2. **Navigate to Authentication Settings**
   - Left sidebar → **Authentication**
   - Click **Providers**
   - Find **Google** in the list

3. **Enable Google OAuth**
   - Toggle **Enabled** to ON
   - You should see form fields for:
     - Client ID
     - Client Secret

4. **Enter Your Google Credentials**
   - **Client ID**: Check your `.env.local` file for `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - **Client Secret**: Check your `.env.local` file for `GOOGLE_CLIENT_SECRET`

5. **Verify Redirect URLs**
   - Supabase will show you the redirect URL
   - Should be something like: `https://lzanwxebqypekmeedwrw.supabase.co/auth/v1/callback`
   - Make sure this is added to Google Cloud Console OAuth app

6. **Click Save**
   - Google OAuth should now be enabled ✅

### Fix 2: Verify Email Confirmation Settings

1. **Go to Authentication → Policies**

2. **Check "Enable email confirmations"**
   - This might be blocking login
   - Two options:
     - **Option A** (Recommended): Keep enabled but use emails that confirm automatically in development
     - **Option B**: Disable for testing, re-enable for production

3. **If Disabled**: User can login immediately after registration ✅

4. **If Enabled**: You need to confirm email first:
   - Check email for confirmation link (in dev, check Supabase logs)
   - Click link to confirm
   - Then login works

### Fix 3: Check Auth Database Settings

1. **Go to Authentication → Email Templates**
   - Verify confirmation email template exists
   - Check sender email address is configured

2. **Go to Authentication → Providers → Email**
   - Verify email provider is enabled
   - Check SMTP settings if using custom email

### Fix 4: Verify User Creation

1. **Go to Authentication → Users**
   - Search for `label@melodypitch.test`
   - Check if user exists
   - If exists, check:
     - **Email confirmed**: Should be ✅ or ❌
     - **Last sign in**: Should show timestamp if logged in

2. **If User Doesn't Exist**:
   - Register new user at http://localhost:3000/register
   - Use email: `label@melodypitch.test`
   - Use password: `password123`
   - Select role: `Label / A&R`

3. **If Email Not Confirmed**:
   - Option A: Manually confirm in Supabase dashboard
     - Click user → "Confirm identity"
   - Option B: Click confirmation email link
   - Option C: Disable email confirmation in settings

---

## 🧪 Testing Checklist

After making changes, test the following:

### Email/Password Login Test
```bash
# 1. Go to http://localhost:3000/login
# 2. Enter credentials:
Email: label@melodypitch.test
Password: password123
# 3. Click Sign In

# Expected result: ✅ Redirect to /label/dashboard
# Current result: ❌ Stays on /login with error=1
```

### Google OAuth Test
```bash
# 1. Go to http://localhost:3000/register
# 2. Click "Sign in with Google" button

# Expected result: ✅ Redirect to Google consent screen
# Current result: ❌ Error: "Unsupported provider"
```

### Registration Test
```bash
# 1. Go to http://localhost:3000/register
# 2. Fill form:
Name: Test Songwriter
Email: songwriter@melodypitch.test
Password: password123
Role: Songwriter / Producer
# 3. Click "Create account"

# Expected result: ✅ Redirect to /login?registered=1
# Current result: ❌ Redirects to /register?error=1
```

---

## 🔍 Debugging Steps

### If Google OAuth Still Fails

1. **Check Redirect URL in Google Cloud Console**
   - Go to Google Cloud Console
   - Project: Select your project
   - APIs & Services → Credentials
   - Click OAuth 2.0 Client ID
   - Check "Authorized redirect URIs"
   - Should include: `https://lzanwxebqypekmeedwrw.supabase.co/auth/v1/callback`

2. **Check Supabase Console for Errors**
   - Authentication → Providers → Google
   - Look for any error messages
   - Verify Client ID and Secret are exactly correct

3. **Clear Browser Cache**
   ```bash
   # Hard refresh in browser: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   ```

### If Email/Password Login Still Fails

1. **Check User Email Confirmation**
   - Go to Supabase dashboard
   - Authentication → Users
   - Click on `label@melodypitch.test`
   - Check "Email confirmed" status
   - If unchecked, manually confirm it

2. **Check Password Hash**
   - Supabase automatically hashes passwords
   - If password was set via API, ensure `email_confirm: true` is being used

3. **Check Auth Logs**
   - Supabase dashboard → Authentication
   - Look for login attempt logs
   - Check error messages

4. **Reset User Password**
   - Go to user in Supabase dashboard
   - Click "Reset password" link
   - Send password reset email
   - Click link in email to set new password

---

## 📋 Complete Setup Checklist

- [ ] **Step 1**: Google OAuth enabled in Supabase
- [ ] **Step 2**: Google Client ID pasted
- [ ] **Step 3**: Google Client Secret pasted
- [ ] **Step 4**: Email confirmation setting checked/configured
- [ ] **Step 5**: Test user `label@melodypitch.test` exists
- [ ] **Step 6**: Test user email is confirmed
- [ ] **Step 7**: Email/password login works
- [ ] **Step 8**: Google OAuth buttons appear
- [ ] **Step 9**: Google OAuth redirect works
- [ ] **Step 10**: Registration flow completes

---

## 🚀 After Everything Works

1. **Update production settings**:
   - Go to Production Supabase project
   - Repeat same configuration steps
   - Use same Google credentials (works across environments)

2. **Update Vercel environment**:
   - Add all Supabase variables
   - Deploy to production

3. **Test production OAuth**:
   - Visit melodypitch.com
   - Test email/password login
   - Test Google OAuth flow

---

## 📚 Relevant Documentation

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Google OAuth](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Supabase Password Auth](https://supabase.com/docs/guides/auth/passwords)

---

## ⏰ Expected Fixes Time

- **Google OAuth**: 5 minutes (just enable in Supabase)
- **Email/Password**: 10-15 minutes (check settings, verify user, confirm email)
- **Testing**: 10 minutes (test all flows)

**Total**: ~30 minutes to fully fix and test

---

## 💬 Need Help?

If issues persist:

1. **Check Supabase Status Page**: https://status.supabase.com/
2. **Check Your Supabase Project Logs**: Authentication → Logs
3. **Verify Credentials**: Compare with .env.local exactly
4. **Clear All Caches**: Browser cache + Supabase cache
5. **Restart Dev Server**: `npm run dev`

---

**Status**: Will be resolved after completing setup steps above  
**Blocked Tasks**: Email login, Google OAuth, User registration  
**Ready to Continue**: Landing page audience sections (Build will pass)
