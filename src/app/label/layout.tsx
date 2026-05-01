import DashboardShell from "@/components/shell/DashboardShell";

export default async function LabelLayout({ children }: { children: React.ReactNode }) {
  const { data: { session } } = await supabase.auth.getSession()
  const userName = session?.user?.email || "User"
  return <DashboardShell role="LABEL" userName={userName}>{children}</DashboardShell>;
}
