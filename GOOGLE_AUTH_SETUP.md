# Google OAuth Setup Guide

## ✅ Completed Setup

Your Google OAuth integration is now configured in the following locations:

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

These credentials are already configured in your `.env.local` file.

### Redirect URLs Configured
For local development:
- `http://localhost:3000/auth/callback`

For production (melodypitch.com):
- `https://melodypitch.com/auth/callback`

For Vercel preview deployments (optional):
- `https://*.vercel.app/auth/callback`

## 📁 Files Created/Modified

### New Files
1. **src/components/auth/GoogleSignInButton.tsx**
   - Reusable Google Sign-In button component
   - Handles OAuth flow with Supabase
   - Shows loading state and error handling

2. **src/app/api/auth/google/route.ts**
   - API route to initiate Google OAuth
   - Handles redirect to Supabase OAuth endpoint

3. **src/app/auth/callback/route.ts**
   - Handles OAuth callback from Google
   - Exchanges auth code for session
   - Sets secure HTTP-only cookies

### Modified Files
1. **src/app/(auth)/login/page.tsx**
   - Added GoogleSignInButton at the top
   - Added divider between Google and email auth
   - Maintains email/password login

2. **src/app/(auth)/register/page.tsx**
   - Added GoogleSignInButton at the top
   - Added divider between Google and email signup
   - Maintains email/password registration

3. **.env.local**
   - Added Google Client ID
   - Added Google Client Secret
   - Added APP_URL

## 🔐 Supabase Configuration Required

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project: `lzanwxebqypekmeedwrw`
3. Navigate to **Authentication** → **Providers**
4. Click on **Google**
5. Toggle **Enabled** to ON
6. Paste your Google OAuth credentials (from your .env.local):
   - **Client ID**: Your Google Client ID
   - **Client Secret**: Your Google Client Secret
7. Click **Save**

## 🧪 Testing the OAuth Flow

### Local Development
1. Start the dev server: `npm run dev`
2. Go to `http://localhost:3000/login` or `/register`
3. Click "Sign in with Google" button
4. You'll be redirected to Google consent screen
5. After approval, you'll be redirected back to `http://localhost:3000/auth/callback`
6. Session will be created and you'll be redirected to your dashboard

### Testing Checklist
- [ ] Google Sign-In button appears on login page
- [ ] Google Sign-In button appears on register page
- [ ] Clicking button redirects to Google consent screen
- [ ] After approval, redirects back to app successfully
- [ ] User is authenticated and can access protected routes
- [ ] Session cookies are set correctly
- [ ] Email is stored in user metadata

## 🚀 Production Deployment

### Before Deploying to Vercel

1. Update `NEXT_PUBLIC_APP_URL` in Vercel environment variables:
   ```
   NEXT_PUBLIC_APP_URL=https://melodypitch.com
   ```

2. Verify all environment variables are set in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DATABASE_URL`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXT_PUBLIC_APP_URL`

3. Add production redirect URL to Google Cloud Console:
   - `https://melodypitch.com/auth/callback`

4. Deploy and test the full OAuth flow in production

## 🐛 Troubleshooting

### Issue: Redirect URI mismatch
**Solution**: Ensure the redirect URL in your Google Cloud Console exactly matches the one in your app. Check for trailing slashes and http vs https.

### Issue: Button shows "Signing in..." indefinitely
**Solution**: Check browser console for errors. Ensure Supabase credentials are valid and Google provider is enabled in Supabase.

### Issue: User is not authenticated after OAuth
**Solution**: Check that cookies are being set correctly (check DevTools → Application → Cookies). Ensure `secure` flag is appropriate for your environment.

### Issue: OAuth works locally but not in production
**Solution**: 
- Verify `NEXT_PUBLIC_APP_URL` is set to your production domain
- Check Google Cloud Console has the production redirect URL
- Verify Supabase project is configured correctly

## 📚 Related Files

- Landing page navbar: `src/components/landing/Navbar.tsx`
- Hero section: `src/components/landing/Hero.tsx`
- Features section: `src/components/landing/Features.tsx`
- Auth middleware: `src/middleware.ts`
- Root layout: `src/app/layout.tsx`

## 🔗 Resources

- [Supabase OAuth Documentation](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth Setup](https://cloud.google.com/docs/authentication/oauth)
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
