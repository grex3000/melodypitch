# 🧪 COMPREHENSIVE TESTING PLAN - Manual Browser Testing

**Purpose**: Verify ALL functionality by actually using the app (not assumptions)  
**Method**: Manual testing in real browser with Playwright automation  
**Focus**: Authentication, user flows, visual rendering

---

## Phase 1: Setup & Infrastructure ⚙️

### 1.1 Start Dev Server
- [ ] Kill any existing dev servers: `killall node`
- [ ] Start fresh: `npm run dev`
- [ ] Verify server starts without errors
- [ ] Check port 3000 is accessible: http://localhost:3000

### 1.2 Verify Build Status
- [ ] Run build: `npm run build`
- [ ] Check: 0 errors, 0 warnings
- [ ] Check: All pages compile

### 1.3 Clear All Caches
- [ ] Clear browser cookies/cache (or use incognito)
- [ ] Clear Next.js cache: `.next` folder
- [ ] Hard refresh browser (Cmd+Shift+R)

---

## Phase 2: Landing Page Testing 🎯

### 2.1 Page Load
- [ ] Navigate to http://localhost:3000
- [ ] Page loads completely in <3 seconds
- [ ] No console errors (DevTools F12 → Console)
- [ ] No 404 errors in network tab

### 2.2 Visual Inspection
- [ ] Navbar visible at top (sticky)
- [ ] Hero section renders completely
- [ ] Hero headline readable
- [ ] Features section visible
- [ ] **NEW**: Audience sections visible
- [ ] Footer visible
- [ ] All images/icons load

### 2.3 Navbar Functionality
- [ ] Logo clickable → goes to /
- [ ] "Features" link clickable → scrolls to features
- [ ] "How it Works" link clickable → scrolls to section
- [ ] "Sign in" button visible
- [ ] "Get started" button visible
- [ ] Both buttons clickable

### 2.4 Hero Section
- [ ] Headline text renders correctly
- [ ] Text spacing looks right
- [ ] Subheading readable
- [ ] "Get started free" button visible
- [ ] "See how it works" button visible
- [ ] Buttons clickable

### 2.5 Audience Sections (NEW)
- [ ] All 3 sections visible (Labels, Songwriters, Artists)
- [ ] Section titles readable
- [ ] Pain points cards visible (red background)
- [ ] Solution cards visible (green background)
- [ ] Icons visible on each section
- [ ] Text is readable and properly formatted

### 2.6 Features Section
- [ ] Bento grid cards visible
- [ ] All 5 cards present
- [ ] Cards animated (smooth reveal on scroll)
- [ ] Hover effects work (try hovering over a card)
- [ ] Responsive: cards stack on mobile

### 2.7 Animations
- [ ] Hero waveform animates (if visible)
- [ ] Feature cards animate on scroll
- [ ] Audience section icons rotate
- [ ] No stuttering or janky animations
- [ ] Page performance smooth

---

## Phase 3: Registration Flow 📝

### 3.1 Navigate to Register
- [ ] Click "Get started" button from landing page
- [ ] Navigate to http://localhost:3000/register manually
- [ ] Page loads without errors
- [ ] Form visible

### 3.2 Form Fields
- [ ] Name field present + functional
- [ ] Email field present + functional
- [ ] Password field present + functional
- [ ] Role dropdown present + functional
- [ ] "Create account" button visible
- [ ] Link to "Sign in" visible

### 3.3 Google Sign-Up (Setup Check)
- [ ] "Sign in with Google" button visible
- [ ] Button is clickable
- [ ] **Click button and check**: 
  - [ ] Redirects to Google consent screen? OR
  - [ ] Shows error about provider not enabled?

### 3.4 Email Registration Test
**Create a real test account**:
- [ ] Name: `Test Songwriter`
- [ ] Email: `testsongwriter@melodypitch.test`
- [ ] Password: `TestPassword123!`
- [ ] Role: Select "Songwriter / Producer"
- [ ] Click "Create account"

**Check result**:
- [ ] Error message? Document it
- [ ] Redirect to /login?registered=1? ✅ Success
- [ ] Redirect to /register?error=1? ❌ Failure
- [ ] Any other redirect? Document it

### 3.5 Password Validation
- [ ] Try registering with password < 8 chars
- [ ] Check: Form prevents submission OR shows error

---

## Phase 4: Login Flow 🔐

### 4.1 Navigate to Login
- [ ] Click "Sign in" from landing page
- [ ] Navigate to http://localhost:3000/login manually
- [ ] Page loads without errors
- [ ] Form visible

### 4.2 Form Fields
- [ ] Email field present + functional
- [ ] Password field present + functional
- [ ] "Sign in" button visible
- [ ] Link to "Create one free" visible

### 4.3 Google Sign-In (Setup Check)
- [ ] "Sign in with Google" button visible
- [ ] Button is clickable
- [ ] Click button:
  - [ ] Redirects to Google consent screen? OR
  - [ ] Shows error message?

### 4.4 Valid Login Test
**Use account from registration**:
- [ ] Email: `testsongwriter@melodypitch.test`
- [ ] Password: `TestPassword123!`
- [ ] Click "Sign in"

**Check result**:
- [ ] Error message? Document it
- [ ] Redirect to dashboard? ✅ Success
- [ ] Stay on /login with error=1? ❌ Failure
- [ ] Redirect somewhere else? Document it

### 4.5 Invalid Login Test
- [ ] Email: `nonexistent@melodypitch.test`
- [ ] Password: `wrongpassword`
- [ ] Click "Sign in"
- [ ] Check: Shows "Invalid email or password" error
- [ ] Check: Stays on /login page

### 4.6 Invalid Password Test
- [ ] Email: `testsongwriter@melodypitch.test`
- [ ] Password: `wrongpassword`
- [ ] Click "Sign in"
- [ ] Check: Shows error message

---

## Phase 5: Authenticated Routes 🔒

### 5.1 Access Protected Routes (Without Login)
- [ ] Navigate to http://localhost:3000/songwriter/dashboard
- [ ] Check: Redirected to /login
- [ ] Navigate to http://localhost:3000/label/dashboard
- [ ] Check: Redirected to /login
- [ ] Navigate to http://localhost:3000/artist/dashboard
- [ ] Check: Redirected to /login

### 5.2 Access Protected Routes (With Login)
- [ ] Log in with testsongwriter account
- [ ] Navigate to /songwriter/dashboard
- [ ] Check: Page loads (not redirected to /login)
- [ ] Check: Can see dashboard content
- [ ] Log out (if logout implemented)
- [ ] Check: Redirected back to login

---

## Phase 6: Responsive Design 📱

### 6.1 Mobile View (375px width)
- [ ] Open DevTools (F12)
- [ ] Set viewport to iPhone (375x667)
- [ ] Refresh page
- [ ] Check:
  - [ ] All content visible
  - [ ] Text readable
  - [ ] Buttons clickable
  - [ ] No horizontal scroll
  - [ ] Navigation menu works (hamburger)

### 6.2 Tablet View (768px width)
- [ ] Set viewport to iPad (768x1024)
- [ ] Refresh page
- [ ] Check: Layout adapts properly

### 6.3 Desktop View (1920px width)
- [ ] Set viewport to desktop (1920x1080)
- [ ] Refresh page
- [ ] Check: Full width features visible (glassmorphism hero asset)

---

## Phase 7: Error Handling 🛑

### 7.1 404 Error
- [ ] Navigate to http://localhost:3000/nonexistent-page
- [ ] Check: 404 page or graceful error

### 7.2 Network Errors
- [ ] Open DevTools Network tab
- [ ] Throttle to "Offline"
- [ ] Try navigating
- [ ] Check: Shows error gracefully

### 7.3 Form Validation
- [ ] Try submitting empty login form
- [ ] Check: HTML5 validation prevents it
- [ ] Try submitting with invalid email format
- [ ] Check: Form rejects it

---

## Phase 8: Browser Compatibility 🌐

### 8.1 Chrome
- [ ] Test on Chrome/Chromium
- [ ] No console errors
- [ ] All features work

### 8.2 Firefox (Optional)
- [ ] Test on Firefox
- [ ] No console errors
- [ ] All features work

### 8.3 Safari (Optional)
- [ ] Test on Safari
- [ ] No console errors
- [ ] All features work

---

## Phase 9: Performance 🚀

### 9.1 Page Load Speed
- [ ] Open DevTools → Performance tab
- [ ] Reload page
- [ ] Check: Load time < 3 seconds

### 9.2 Interaction Performance
- [ ] Click buttons
- [ ] Scroll page
- [ ] Check: No stuttering, smooth 60fps

### 9.3 Animation Performance
- [ ] Watch audience section icons
- [ ] Watch feature cards animate
- [ ] Check: Smooth animations, no jank

---

## Phase 10: Specific Audience Sections Testing 🎯

### 10.1 Labels Section
- [ ] Title "For Labels & A&R" visible
- [ ] Icon visible and rotating
- [ ] "The Problem" section has 4 pain point cards
- [ ] "The Solution" section has 4 solution cards
- [ ] Cards have proper colors (red = problems, green = solutions)
- [ ] Text readable and properly formatted

### 10.2 Songwriters Section
- [ ] Title "For Songwriters & Producers" visible
- [ ] Icon visible and rotating
- [ ] 4 pain points displayed
- [ ] 4 solutions displayed
- [ ] Layout mirrors Labels section (good design)

### 10.3 Artists Section
- [ ] Title "For Artists & Management" visible
- [ ] Icon visible and rotating
- [ ] 4 pain points displayed
- [ ] 4 solutions displayed
- [ ] All content readable

### 10.4 Animation & Interaction
- [ ] Sections animate smoothly on scroll
- [ ] Cards fade in staggered
- [ ] Hover effects on cards
- [ ] Icons rotate smoothly

---

## Phase 11: Console & Network Monitoring 🔍

### 11.1 Console Errors
- [ ] Open DevTools → Console
- [ ] Reload page
- [ ] Check: No red errors
- [ ] Check: No security warnings

### 11.2 Network Tab
- [ ] Open DevTools → Network
- [ ] Reload page
- [ ] Check: No failed requests (404, 500, etc)
- [ ] Check: All resources load
- [ ] Check: No excessive load time

### 11.3 Application Tab
- [ ] Check: Cookies are set
- [ ] Check: Session storage exists
- [ ] Check: Local storage OK

---

## Testing Checklist Template

When testing, use this format to document:

```
FEATURE: [name]
STATUS: ✅ PASS / ⚠️ WARN / ❌ FAIL
EXPECTED: [what should happen]
ACTUAL: [what actually happened]
NOTES: [any additional info]
```

---

## Critical Path Tests (Minimum Required)

Must pass all of these before deploying:

1. [ ] **Server starts** - `npm run dev` works
2. [ ] **Landing page loads** - No errors, renders completely
3. [ ] **Register account** - Can create actual test account
4. [ ] **Login account** - Can log in with created account
5. [ ] **Dashboard access** - Can access /songwriter/dashboard after login
6. [ ] **Protected routes** - Redirect to /login when not authenticated
7. [ ] **Responsive** - Works on mobile (375px) and desktop (1920px)
8. [ ] **No console errors** - DevTools console is clean

---

## Extended Tests (Nice to Have)

These should ideally pass but not blocking:

1. [ ] Google OAuth button works
2. [ ] Error messages display correctly
3. [ ] Form validation works
4. [ ] Animations are smooth
5. [ ] Audience sections render correctly
6. [ ] Mobile menu works

---

## Session Notes

Use this space to document findings:

```
## Testing Session - [DATE]

### Server Status
- ✅/❌ Dev server starts
- ✅/❌ Build passes
- Error: [if any]

### Landing Page
- ✅/❌ Loads
- ✅/❌ Audience sections visible
- Issue: [if any]

### Registration
- ✅/❌ Form submits
- ✅/❌ Account created
- Error: [if any]

### Login
- ✅/❌ Can log in
- ✅/❌ Redirects to dashboard
- Error: [if any]

### Google OAuth
- ✅/❌ Button works
- Error: [if any]

### Overall Status
BLOCKED / IN PROGRESS / READY
```

---

**Total Estimated Time**: 45-60 minutes for thorough testing  
**Start Time**: [when you begin]  
**End Time**: [when done]

