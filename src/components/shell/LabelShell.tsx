import Link from "next/link";
import { signOut } from "@/auth";

const NAV = [
  { href: "/label/dashboard", label: "Overview" },
  { href: "/label/library", label: "Demo Library" },
  { href: "/label/portals", label: "Portals" },
  { href: "/label/pitches", label: "Pitch CRM" },
  { href: "/label/analytics", label: "Analytics" },
];

export default function LabelShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  return (
    <div className="min-h-[100dvh] flex bg-[#e7e5e4]">
      <aside className="w-52 shrink-0 flex flex-col bg-white border-r border-[#d6d3d1] px-3 py-6">
        <div className="px-3 mb-8">
          <span className="text-base font-semibold tracking-tight text-[#1c1917]">MelodyPitch</span>
        </div>

        <nav className="flex flex-col gap-0.5 flex-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-[0.625rem] text-sm text-[#78716c] hover:bg-[#f5f5f4] hover:text-[#1c1917] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
          className="px-3"
        >
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
