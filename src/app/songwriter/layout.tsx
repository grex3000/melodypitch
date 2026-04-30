import { requireRole } from "@/lib/auth-utils";
import SongwriterShell from "@/components/shell/SongwriterShell";

export default async function SongwriterLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(["SONGWRITER"]);
  return <SongwriterShell userName={user.name ?? user.email}>{children}</SongwriterShell>;
}
