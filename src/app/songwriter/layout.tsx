import DashboardShell from "@/components/shell/DashboardShell";

export default async function SongwriterLayout({ children }: { children: React.ReactNode }) {
  const { data: { session } } = await supabase.auth.getSession()
  const userName = session?.user?.email || "User"
  return <DashboardShell role="SONGWRITER" userName={userName}>{children}</DashboardShell>;
}
