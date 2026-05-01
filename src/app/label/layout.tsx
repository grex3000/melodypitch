import { createServerComponentClient } from '@supabase/auth-helpers-nextjs/nextjs'
import { cookies } from 'next/headers'
import DashboardShell from "@/components/shell/DashboardShell";

export default async function LabelLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const userName = session?.user?.email || "User"
  return <DashboardShell role="LABEL" userName={userName}>{children}</DashboardShell>;
}
