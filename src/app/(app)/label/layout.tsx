import DashboardShell from "@/components/shell/DashboardShell";
import { getCurrentUser } from "@/lib/auth-context";
import { redirect } from "next/navigation";

export default async function LabelLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  return <DashboardShell role="LABEL" userName={user.name}>{children}</DashboardShell>;
}
