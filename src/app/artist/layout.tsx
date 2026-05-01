import DashboardShell from "@/components/shell/DashboardShell";

export default async function ArtistLayout({ children }: { children: React.ReactNode }) {
  const { data: { session } } = await supabase.auth.getSession()
  const userName = session?.user?.email || "User"
  return <DashboardShell role="ARTIST" userName={userName}>{children}</DashboardShell>;
}
