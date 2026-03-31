import Link from "next/link";
import { signOut } from "@/auth";

export default function SongwriterShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#e7e5e4]">
      <header className="h-14 flex items-center px-6 bg-white border-b border-[#d6d3d1] shrink-0">
        <span className="text-sm font-semibold tracking-tight text-[#1c1917] flex-1">MelodyPitch</span>

        <nav className="flex items-center gap-6 mr-8">
          <Link href="/songwriter/dashboard" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
            My Submissions
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-sm text-[#78716c]">{userName}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button type="submit" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
