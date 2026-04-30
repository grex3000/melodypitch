import DashboardShell from "@/components/shell/DashboardShell";

export default async function SongwriterLayout({ children }: { children: React.ReactNode }) {
  const userName = "User"; // TODO: Get from Supabase session
  return <DashboardShell role="SONGWRITER" userName={userName}>{children}</DashboardShell>;
}
