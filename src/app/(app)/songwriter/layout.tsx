import DashboardShell from "@/components/shell/DashboardShell";
import { getCurrentUser } from "@/lib/auth-context";
import { redirect } from "next/navigation";

export default async function SongwriterLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  return <DashboardShell role="SONGWRITER" userName={user.name}>{children}</DashboardShell>;
}
