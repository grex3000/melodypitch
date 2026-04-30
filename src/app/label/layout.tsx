import { requireRole } from "@/lib/auth-utils";
import LabelShell from "@/components/shell/LabelShell";

export default async function LabelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(["LABEL"]);
  return <LabelShell userName={user.name ?? user.email}>{children}</LabelShell>;
}
