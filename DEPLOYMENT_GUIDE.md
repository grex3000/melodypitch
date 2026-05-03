# MelodyPitch Deployment Guide

## Domain Architecture Setup

Your MelodyPitch application is now configured for optimal domain structure with `melodypitch.com` pointing to a single Vercel deployment.

## URL Structure

```
melodypitch.com/                     → Landing page (public)
melodypitch.com/login                → Login page (public)
melodypitch.com/register             → Registration page (public)
melodypitch.com/label/*              → Label dashboard (protected)
melodypitch.com/songwriter/*         → Songwriter dashboard (protected)
melodypitch.com/artist/*             → Artist dashboard (protected)
melodypitch.com/p/[slug]             → Public submission portals (public)
```

## Application Architecture

### Route Groups (Next.js 13+ App Router)

The application uses **route groups** to organize code logically without affecting URLs:

```
src/app/
├── (landing)/              ← Landing page routes
│   ├── layout.tsx
│   └── page.tsx           (melodypitch.com/)
│
├── (auth)/                ← Authentication routes
│   ├── login/
│   │   └── page.tsx       (melodypitch.com/login)
│   └── register/
│       └── page.tsx       (melodypitch.com/register)
│
├── (app)/                 ← Protected app routes
│   ├── label/
│   │   ├── dashboard/
│   │   ├── portals/
│   │   ├── library/
│   │   ├── pitches/
│   │   ├── analytics/
│   │   └── layout.tsx     (sidebar layout for labels)
│   ├── songwriter/
│   │   ├── dashboard/
│   │   └── layout.tsx
│   ├── artist/
│   │   ├── dashboard/
│   │   └── layout.tsx
│   └── layout.tsx         (app wrapper)
│
├── p/                     ← Public portals
│   └── [slug]/
│       └── page.tsx
│
├── api/                   ← API routes
│   └── upload/
│
├── layout.tsx             (root layout - fonts, global CSS)
└── globals.css
```

### Key Features

✅ **Single Deployment**: One Vercel project handles all routes
✅ **Clean URLs**: No subdomains or URL prefixes needed
✅ **Protected Routes**: Middleware automatically redirects to `/login`
✅ **SEO-Friendly**: Landing page at root is easily crawlable
✅ **Scalable**: Easy to add new features without restructuring

## Middleware Protection

The application uses **Next.js middleware** (`src/middleware.ts`) to protect routes:

- **Public paths**: `/`, `/login`, `/register`, `/api/upload`, `/p/*`
- **Protected paths**: `/label/*`, `/songwriter/*`, `/artist/*`

When unauthenticated users try to access protected routes, they are automatically redirected to `/login`.

```typescript
// src/middleware.ts
const PUBLIC_PATHS = ['/', '/login', '/register', '/api/upload']
const PORTAL_PATH_PATTERN = /^\/p\//;

// Protected routes: /label/*, /songwriter/*, /artist/*
if (isProtectedRoute && !hasSession) {
  return NextResponse.redirect(new URL('/login', req.url))
}
```

## Authentication Flow

1. **Unauthenticated User** → Visits `melodypitch.com/`
2. **Lands on Landing Page** → Sees marketing content and CTA
3. **Clicks "Sign Up"** → Redirects to `melodypitch.com/register`
4. **Creates Account** → Selects role (Label/Songwriter/Artist)
5. **Logs In** → Session stored in cookies
6. **Accesses App** → Middleware allows access to `/label/*`, `/songwriter/*`, or `/artist/*`
7. **Logs Out** → Session cleared, redirects to login on next protected route visit

## Vercel Deployment Checklist

### Pre-Deployment

- [ ] Domain `melodypitch.com` points to Vercel project
- [ ] Vercel project connected to Git repository
- [ ] Environment variables configured in Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `DATABASE_URL`

### Deployment Steps

1. **Connect Domain to Vercel**
   - In Vercel dashboard: Project Settings → Domains
   - Add `melodypitch.com`
   - Point domain registrar DNS to Vercel
   - Wait for SSL certificate (usually instant)

2. **Configure Environment Variables**
   - Go to Vercel: Settings → Environment Variables
   - Add all variables from `.env.local`
   - Ensure they're available in Production environment

3. **Deploy**
   - Push to Git (automatic deployment)
   - Or manually: `vercel --prod`

4. **Verify**
   - Test landing page: `melodypitch.com/`
   - Test auth: `melodypitch.com/login`
   - Test protection: Try accessing `/label/dashboard` → should redirect to `/login`

## Environment Variables Required

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Database
DATABASE_URL=postgresql://...
```

## Build & Performance

### Build Output

```
Route (app)                              Size     First Load JS
├ ○ /                                    9.9 kB         97.1 kB
├ ○ /_not-found                          873 B          88.1 kB
├ ƒ /api/upload                          0 B                0 B
├ ƒ /artist/dashboard                    162 B          87.4 kB
├ ƒ /label/analytics                     162 B          87.4 kB
├ ƒ /label/dashboard                     162 B          87.4 kB
├ ƒ /label/library                       162 B          87.4 kB
├ ƒ /label/pitches                       162 B          87.4 kB
├ ƒ /label/portals                       183 B          96.1 kB
├ ○ /label/portals/new                   1.57 kB        88.8 kB
├ ƒ /login                               162 B          87.4 kB
├ ƒ /p/[slug]                            4.85 kB        92.1 kB
├ ƒ /register                            162 B          87.4 kB
└ ƒ /songwriter/dashboard                162 B          87.4 kB
```

- `ƒ` = Dynamic (server-rendered on demand)
- `○` = Static (prerendered as static content)

### Optimization Tips

- Landing page is static → fast CDN delivery
- App routes are dynamic → tailored per user
- Middleware runs on Edge → fast auth checks
- No extra redirects needed

## Testing URLs

After deployment, test these URLs:

```bash
# Public routes (should load)
https://melodypitch.com/
https://melodypitch.com/login
https://melodypitch.com/register
https://melodypitch.com/p/test-portal

# Protected routes (should redirect to /login)
https://melodypitch.com/label/dashboard
https://melodypitch.com/songwriter/dashboard
https://melodypitch.com/artist/dashboard

# After logging in
https://melodypitch.com/label/dashboard        (for labels)
https://melodypitch.com/songwriter/dashboard   (for songwriters)
https://melodypitch.com/artist/dashboard       (for artists)
```

## Troubleshooting

### Issue: Landing page shows "Not Found"
- **Solution**: Ensure `src/app/(landing)/page.tsx` exists
- **Check**: Run `npm run build` to verify build succeeds

### Issue: Protected routes don't redirect to login
- **Solution**: Verify middleware is active in `src/middleware.ts`
- **Check**: Cookies are set properly: `sb-access-token` or `sb-refresh-token`

### Issue: Styles not applying after deployment
- **Solution**: Clear Vercel cache and redeploy
- **Command**: `vercel --prod --clear-cache`

### Issue: Auth not working
- **Solution**: Verify Supabase environment variables in Vercel
- **Check**: Test with: `curl https://melodypitch.com/api/auth`

## Future Enhancements

- [ ] Add analytics (Vercel Analytics)
- [ ] Set up error tracking (Sentry)
- [ ] Configure email notifications
- [ ] Add CDN for file uploads
- [ ] Set up database backups
- [ ] Configure monitoring alerts

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Middleware Guide**: https://nextjs.org/docs/advanced-features/middleware

---

**Last Updated**: May 3, 2026
**Status**: ✅ Production Ready
