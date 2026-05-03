import DashboardShell from "@/components/shell/DashboardShell";
import { db } from '@/lib/db'

export default async function ArtistLayout({ children }: { children: React.ReactNode }) {
  const user = await db.user.findFirst({ where: { role: 'ARTIST' } })
  const userName = user?.email || "Artist User"
  return <DashboardShell role="ARTIST" userName={userName}>{children}</DashboardShell>;
}
