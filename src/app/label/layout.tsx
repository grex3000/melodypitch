import DashboardShell from "@/components/shell/DashboardShell";

export default async function LabelLayout({ children }: { children: React.ReactNode }) {
  // For now, we'll get user from session
  // This is a simplified version - in production, use proper session handling
  const userName = "User"; // TODO: Get from Supabase session
  return <DashboardShell role="LABEL" userName={userName}>{children}</DashboardShell>;
}
