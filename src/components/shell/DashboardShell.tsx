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
      <div className="min-h-[100dvh] flex bg-[#e7e5e4]">
        {/* Mobile menu button */}
        <input type="checkbox" id="mobile-menu-toggle" className="hidden peer" />
        <label
          htmlFor="mobile-menu-toggle"
          className="hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-sm cursor-pointer md:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>

        {/* Sidebar */}
        <aside className="w-52 shrink-0 flex flex-col bg-white border-r border-[#d6d3d1] px-3 py-6
          fixed inset-y-0 left-0 z-40 transform -translate-x-full transition-transform
          peer-checked:translate-x-0 md:relative md:translate-x-0 md:z-auto">
          <div className="px-3 mb-8">
            <span className="text-base font-semibold tracking-tight text-[#1c1917]">
              MelodyPitch
            </span>
          </div>

          <nav className="flex flex-col gap-0.5 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-[0.625rem] text-sm text-[#78716c] hover:bg-[#f5f5f4] hover:text-[#1c1917] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form action={handleSignOut} className="px-3">
            <div className="text-xs text-[#78716c] mb-2 truncate">{userName}</div>
            <button
              type="submit"
              className="text-xs text-[#78716c] hover:text-[#1c1917] transition-colors"
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
    <div className="min-h-[100dvh] flex flex-col bg-[#e7e5e4]">
      <header className="h-14 flex items-center px-6 bg-white border-b border-[#d6d3d1] shrink-0">
        <span className="text-sm font-semibold tracking-tight text-[#1c1917] flex-1">
          MelodyPitch
        </span>

        {/* Mobile menu for Artist/Songwriter */}
        <input type="checkbox" id="mobile-nav-toggle" className="hidden peer" />
        <label
          htmlFor="mobile-nav-toggle"
          className="ml-auto p-2 cursor-pointer md:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>

        <nav className="hidden peer-checked:flex flex-col absolute top-14 left-0 right-0 bg-white border-b border-[#d6d3d1] p-4 gap-2 md:flex md:flex-row md:relative md:top-0 md:border-0 md:p-0 md:mr-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors py-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <span className="text-sm text-[#78716c]">{userName}</span>
          <form action={handleSignOut}>
            <button
              type="submit"
              className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors"
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
