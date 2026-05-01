# MelodyPitch Promotable Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.
> **Model Note:** Use the best available model per opencode GO subscription (e.g., high-tier models like opencode/hy3-preview) for all implementation tasks.

**Goal:** Make MelodyPitch fully functional, add example content with royalty-free audio, create landing page, make mobile-friendly, test with Playwright, find test users.

**Architecture:** Next.js App Router with Supabase Auth/Storage, Prisma ORM, PostgreSQL. Incremental tasks to fix auth, complete features, add seed data with real audio, build landing page, add mobile responsiveness, execute Playwright browser tests, and outreach.

**Tech Stack:** Next.js 14, React 18, TypeScript, Prisma 7, Supabase (Auth, Storage, PostgreSQL), Tailwind CSS, Jest, Playwright.

---

## File Structure
**Create:**
- `src/app/page.tsx` (landing page)
- `src/components/landing/` (landing components)
- `tests/e2e/` (Playwright tests)
- Updated `prisma/seed.ts`

**Modify:**
- `src/middleware.ts`
- `src/app/label/layout.tsx`, `src/app/songwriter/layout.tsx`, `src/app/artist/layout.tsx`
- All dashboard/placeholder pages
- `.gitignore`
- `src/components/shell/DashboardShell.tsx` (mobile menu)

---

### Task 1: Fix Security (.gitignore)
**Files:** Modify `.gitignore`
- [ ] Add `.env`, `.env.local`, `.env.vercel` to `.gitignore`
- [ ] Run `git rm --cached .env .env.local .env.vercel` if tracked
- [ ] Commit: `fix: secure env files`

### Task 2: Fix Auth Session Validation
**Files:** Modify `src/middleware.ts`
- [ ] Write test for protected route access
- [ ] Implement `getSession()` check in middleware
- [ ] Redirect unauthenticated users to `/login`
- [ ] Commit: `feat: add session validation to middleware`

### Task 3: Integrate User Names in Layouts
**Files:** Modify `src/app/label/layout.tsx`, `src/app/songwriter/layout.tsx`, `src/app/artist/layout.tsx`
- [ ] Fetch user from Supabase session
- [ ] Replace hardcoded "User" with `session.user.email` or name
- [ ] Commit: `fix: show real user names in layouts`

### Task 4: Fix Registration Flow
**Files:** Modify `src/app/(auth)/register/page.tsx`
- [ ] After Supabase Auth signup, create Prisma record (Label/Songwriter/Artist)
- [ ] Link Supabase user ID to Prisma user
- [ ] Commit: `feat: create Prisma profiles on registration`

### Task 5: Complete Label Dashboard
**Files:** Modify `src/app/label/dashboard/page.tsx`
- [ ] Fetch portal count, submission count stats
- [ ] Add quick links to Portals, Library, Pitches
- [ ] Commit: `feat: build label dashboard overview`

### Task 6: Build Label Library
**Files:** Modify `src/app/label/library/page.tsx`
- [ ] Fetch all submissions with tracks
- [ ] Add filters by portal, status, genre
- [ ] Add TrackRow display with playback/notes
- [ ] Commit: `feat: build label demo library`

### Task 7: Build Label Pitches Page
**Files:** Modify `src/app/label/pitches/page.tsx`
- [ ] Fetch pitch packages with tracks/artists
- [ ] Add pitch package creation form
- [ ] Add verdict (APPROVED/HOLD/DECLINED) UI
- [ ] Commit: `feat: build pitch CRM`

### Task 8: Build Label Analytics
**Files:** Modify `src/app/label/analytics/page.tsx`
- [ ] Add submission trends chart (by month)
- [ ] Add pitch acceptance rate
- [ ] Add top genres/moods stats
- [ ] Commit: `feat: build analytics dashboard`

### Task 9: Build Songwriter Dashboard
**Files:** Modify `src/app/songwriter/dashboard/page.tsx`
- [ ] Fetch user's submissions with status
- [ ] Add track progress (NEW → REVIEWED → SHORTLISTED → PITCHED)
- [ ] Commit: `feat: build songwriter submission tracker`

### Task 10: Build Artist Dashboard
**Files:** Modify `src/app/artist/dashboard/page.tsx`
- [ ] Fetch pitch packages for artist
- [ ] Add comment section on pitch items
- [ ] Add rating UI
- [ ] Commit: `feat: build artist pitch review dashboard`

### Task 11: Enhance Seed Script with Royalty-Free Audio
**Files:** Modify `prisma/seed.ts`
- [ ] Create Prisma Label, Songwriter, Artist records
- [ ] Add 3 portals with invites
- [ ] Source 10-15 royalty-free MP3s from SoundHelix or Pixabay Music
- [ ] Add 15 tracks with metadata (genres, moods, duration) matching actual MP3s
- [ ] Upload MP3s to Supabase Storage or use public URLs for seed tracks
- [ ] Add 5 submissions with statuses
- [ ] Add LabelNotes, PitchItems, ArtistComments
- [ ] Commit: `feat: add comprehensive example content with royalty-free audio`

### Task 12: Create Landing Page
**Files:** Create `src/app/page.tsx`, `src/components/landing/*`
- [ ] Hero section: "Connect Songwriters with Labels & Artists"
- [ ] Features: Portal Submission, Pitch Management, Analytics
- [ ] How It Works: 3-step flow
- [ ] CTA: "Start Free Beta"
- [ ] Mobile-responsive design
- [ ] Commit: `feat: create promotional landing page`

### Task 13: Playwright Browser-Based E2E Testing
**Files:** Create `tests/e2e/*`
- [ ] Test portal creation → submission → library flow using Playwright browser
- [ ] Test auth (login/register) for all roles via browser
- [ ] Test file upload to Supabase using real browser file picker
- [ ] Test mobile viewports (iPhone 12) for all pages
- [ ] Commit: `test: add Playwright browser E2E tests`

### Task 14: Compile Test User List
- [ ] Research 50 indie labels, A&R reps, managers on LinkedIn
- [ ] Create outreach email template
- [ ] Post in r/WeAreTheMusicMakers, r/musicbusiness
- [ ] Commit: `docs: add test user outreach list`

### Task 15: Make App Mobile Responsive
**Files:** Modify `src/components/shell/DashboardShell.tsx`, all page components, form components
- [ ] Audit all routes for mobile responsiveness (Tailwind breakpoints)
- [ ] Add hamburger menu for Label sidebar on mobile
- [ ] Update FileDropZone, SubmissionForm, MultiSelect for mobile touch
- [ ] Test all pages with Playwright mobile emulation (375x812 viewport)
- [ ] Fix layout overflow/truncation issues on small screens
- [ ] Commit: `fix: make app fully mobile responsive`
