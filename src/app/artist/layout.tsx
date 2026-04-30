import DashboardShell from "@/components/shell/DashboardShell";

export default async function ArtistLayout({ children }: { children: React.ReactNode }) {
  const userName = "User"; // TODO: Get from Supabase session
  return <DashboardShell role="ARTIST" userName={userName}>{children}</DashboardShell>;
}
