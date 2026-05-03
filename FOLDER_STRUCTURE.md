# MelodyPitch Folder Structure

## App Router Organization

```
src/app/
│
├── layout.tsx                      # Root layout (global fonts, CSS)
├── globals.css                     # Design system CSS & utilities
├── middleware.ts                   # Auth protection middleware
│
├── (landing)/                      # Landing page routes
│   ├── layout.tsx                 # Optional landing layout
│   └── page.tsx                   # melodypitch.com/ - Main landing page
│
├── (auth)/                         # Authentication routes
│   ├── login/
│   │   └── page.tsx               # melodypitch.com/login
│   └── register/
│       └── page.tsx               # melodypitch.com/register
│
├── (app)/                          # Protected app routes (requires auth)
│   ├── layout.tsx                 # App wrapper layout
│   │
│   ├── label/                     # Label dashboard routes
│   │   ├── layout.tsx             # Sidebar layout
│   │   ├── dashboard/
│   │   │   └── page.tsx           # melodypitch.com/label/dashboard
│   │   ├── portals/
│   │   │   ├── page.tsx           # melodypitch.com/label/portals
│   │   │   └── new/
│   │   │       └── page.tsx       # melodypitch.com/label/portals/new
│   │   ├── library/
│   │   │   └── page.tsx           # melodypitch.com/label/library
│   │   ├── pitches/
│   │   │   └── page.tsx           # melodypitch.com/label/pitches
│   │   └── analytics/
│   │       └── page.tsx           # melodypitch.com/label/analytics
│   │
│   ├── songwriter/                # Songwriter dashboard routes
│   │   ├── layout.tsx             # Header layout
│   │   └── dashboard/
│   │       └── page.tsx           # melodypitch.com/songwriter/dashboard
│   │
│   └── artist/                    # Artist dashboard routes
│       ├── layout.tsx             # Header layout
│       └── dashboard/
│           └── page.tsx           # melodypitch.com/artist/dashboard
│
├── p/                              # Public submission portals
│   └── [slug]/
│       └── page.tsx               # melodypitch.com/p/[slug]
│
├── api/                            # API routes
│   └── upload/
│       └── route.ts               # melodypitch.com/api/upload
│
└── fonts/                          # Font files
    └── [font files...]
```

## Components Organization

```
src/components/
│
├── ui/                             # Reusable design system components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Badge.tsx
│   ├── Typography.tsx
│   └── index.ts                   # Barrel export
│
├── landing/                        # Landing page components
│   ├── Hero.tsx
│   ├── Features.tsx
│   └── HowItWorks.tsx
│
├── shell/                          # Layout shells
│   └── DashboardShell.tsx          # Sidebar/header layout wrapper
│
└── portal/                         # Portal components
    ├── SubmissionForm.tsx
    ├── FileDropZone.tsx
    ├── TrackRow.tsx
    ├── MultiSelect.tsx
    ├── PostSubmitPrompt.tsx
    └── PortalBackground.tsx
```

## Other Key Files

```
src/
├── lib/                            # Utilities and helpers
│   ├── db.ts                       # Prisma client
│   ├── supabase-server.ts
│   ├── portals.ts
│   ├── submissions.ts
│   └── [other utilities]
│
├── types/                          # TypeScript type definitions
│   └── [type files]
│
└── constants/                      # Constants
    └── [constant files]

prisma/
├── schema.prisma                   # Database schema
└── seed.ts                         # Database seeding

public/
├── favicon.ico
└── [static assets]

tests/
├── [test files]

.env.local                          # Local environment variables
.env.vercel                         # Vercel environment variables
next.config.mjs                     # Next.js configuration
tailwind.config.ts                  # Tailwind CSS configuration
tsconfig.json                       # TypeScript configuration
package.json                        # Dependencies
```

## Route Groups Explanation

Route groups (folders with parentheses) are a Next.js feature that:

✅ **Don't affect URLs**: `(landing)` doesn't add `/landing` to the URL
✅ **Organize code logically**: Group related pages together
✅ **Allow different layouts**: Each group can have its own layout.tsx
✅ **Improve readability**: Clear separation of concerns

### Example: Route Groups in Action

```
src/app/
├── (landing)/page.tsx    → URL: /              (root)
├── (auth)/login/page.tsx → URL: /login         (auth section)
└── (app)/label/dashboard/page.tsx → URL: /label/dashboard (app section)
```

The parentheses don't appear in URLs, they just organize the code!

## Authentication Flow (Middleware)

Protected routes automatically check for session:

```
User visits /label/dashboard
         ↓
Middleware checks: Is user authenticated?
         ↓
   No ↙           ↘ Yes
  Redirect        Allow access
  to /login       to /label/dashboard
```

The middleware checks for Supabase cookies:
- `sb-access-token`
- `sb-refresh-token`

## Design System Structure

```
src/app/
├── globals.css                     # All design system CSS
│                                   # - Colors (CSS variables)
│                                   # - Typography classes
│                                   # - Component classes
│                                   # - Spacing utilities
│
tailwind.config.ts                  # Tailwind mapping
                                    # - Color palette
                                    # - Spacing scale
                                    # - Typography scale
                                    # - Extensions
```

## Adding New Routes

### For Protected Routes (e.g., new label feature)

1. Create folder: `src/app/(app)/label/new-feature/`
2. Add file: `src/app/(app)/label/new-feature/page.tsx`
3. (Optional) Add layout: `src/app/(app)/label/new-feature/layout.tsx`
4. Middleware automatically protects it ✅

### For Public Routes (e.g., FAQ page)

1. Create folder: `src/app/(landing)/faq/`
2. Add file: `src/app/(landing)/faq/page.tsx`
3. No authentication needed ✅

### For Auth Pages (e.g., forgot password)

1. Create folder: `src/app/(auth)/forgot-password/`
2. Add file: `src/app/(auth)/forgot-password/page.tsx`
3. No authentication needed ✅

---

**Key Takeaway**: Route groups make the folder structure cleaner without affecting URLs. The parentheses are purely organizational!
