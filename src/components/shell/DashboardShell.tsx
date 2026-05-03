import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";

const NAV_ITEMS: Record<string, Array<{ href: string; label: string }>> = {
  LABEL: [
    { href: "/label/dashboard", label: "Overview" },
    { href: "/label/portals", label: "Portals" },
    { href: "/label/library", label: "Demo Library" },
    { href: "/label/pitches", label: "Pitch CRM" },
    { href: "/label/analytics", label: "Analytics" },
  ],
  SONGWRITER: [
    { href: "/songwriter/dashboard", label: "My Submissions" },
  ],
  ARTIST: [
    { href: "/artist/dashboard", label: "Pitch Packages" },
  ],
};

interface DashboardShellProps {
  role: "LABEL" | "SONGWRITER" | "ARTIST";
  userName: string;
  children: React.ReactNode;
}

export default function DashboardShell({
  role,
  userName,
  children,
}: DashboardShellProps) {
  const navItems = NAV_ITEMS[role] || [];

  async function handleSignOut() {
    "use server";
    await supabaseServer.auth.signOut();
    // Note: In production, use proper SSR cookie handling
  }

  // Label uses sidebar layout
  if (role === "LABEL") {
    return (
      <div className="min-h-[100dvh] flex bg-bg-base">
        {/* Mobile menu button */}
        <input type="checkbox" id="mobile-menu-toggle" className="hidden peer" />
        <label
          htmlFor="mobile-menu-toggle"
          className="hidden fixed top-4 left-4 z-50 p-2 bg-bg-surface-1 rounded-md border border-border-default cursor-pointer md:hidden"
        >
          <svg className="w-6 h-6 text-fg-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>

        {/* Sidebar */}
        <aside className="w-52 shrink-0 flex flex-col bg-bg-surface-1 border-r border-border-default px-3 py-6
          fixed inset-y-0 left-0 z-40 transform -translate-x-full transition-transform
          peer-checked:translate-x-0 md:relative md:translate-x-0 md:z-auto">
          <div className="px-3 mb-8">
            <span className="type-h5 text-fg-1">
              MelodyPitch
            </span>
          </div>

          <nav className="flex flex-col gap-0.5 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md type-body-sm text-fg-2 hover:bg-bg-surface-2 hover:text-fg-1 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form action={handleSignOut} className="px-3">
            <div className="type-label text-fg-2 mb-2 truncate">{userName}</div>
            <button
              type="submit"
              className="type-body-sm text-fg-2 hover:text-fg-1 transition-colors"
            >
              Sign out
            </button>
          </form>
        </aside>

        {/* Overlay for mobile menu */}
        <label
          htmlFor="mobile-menu-toggle"
          className="hidden peer-checked:block fixed inset-0 bg-black/50 z-30 md:hidden cursor-pointer"
        />

        <main className="flex-1 overflow-auto md:ml-0 ml-0">{children}</main>
      </div>
    );
  }

  // Artist and Songwriter use header layout
  return (
    <div className="min-h-[100dvh] flex flex-col bg-bg-base">
      <header className="h-14 flex items-center px-6 bg-bg-surface-1 border-b border-border-default shrink-0">
        <span className="type-h6 text-fg-1 flex-1">
          MelodyPitch
        </span>

        {/* Mobile menu for Artist/Songwriter */}
        <input type="checkbox" id="mobile-nav-toggle" className="hidden peer" />
        <label
          htmlFor="mobile-nav-toggle"
          className="ml-auto p-2 cursor-pointer md:hidden"
        >
          <svg className="w-6 h-6 text-fg-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>

        <nav className="hidden peer-checked:flex flex-col absolute top-14 left-0 right-0 bg-bg-surface-1 border-b border-border-default p-4 gap-2 md:flex md:flex-row md:relative md:top-0 md:border-0 md:p-0 md:mr-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="type-body-sm text-fg-2 hover:text-fg-1 transition-colors py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <span className="type-body-sm text-fg-2">{userName}</span>
          <form action={handleSignOut}>
            <button
              type="submit"
              className="type-body-sm text-fg-2 hover:text-fg-1 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
