import DashboardShell from "@/components/shell/DashboardShell";
import { db } from '@/lib/db'

export default async function SongwriterLayout({ children }: { children: React.ReactNode }) {
  const user = await db.user.findFirst({ where: { role: 'SONGWRITER' } })
  const userName = user?.email || "Songwriter User"
  return <DashboardShell role="SONGWRITER" userName={userName}>{children}</DashboardShell>;
}
