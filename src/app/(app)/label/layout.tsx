import DashboardShell from "@/components/shell/DashboardShell";
import { db } from '@/lib/db'

export default async function LabelLayout({ children }: { children: React.ReactNode }) {
  const user = await db.user.findFirst({ where: { role: 'LABEL' } })
  const userName = user?.email || "Label User"
  return <DashboardShell role="LABEL" userName={userName}>{children}</DashboardShell>;
}
