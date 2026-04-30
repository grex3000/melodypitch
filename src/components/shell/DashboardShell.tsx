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
        <aside className="w-52 shrink-0 flex flex-col bg-white border-r border-[#d6d3d1] px-3 py-6">
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

        <main className="flex-1 overflow-auto">{children}</main>
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

        <nav className="flex items-center gap-6 mr-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
