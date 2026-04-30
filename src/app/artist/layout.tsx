import { requireRole } from "@/lib/auth-utils";
import ArtistShell from "@/components/shell/ArtistShell";

export default async function ArtistLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole(["ARTIST"]);
  return <ArtistShell userName={user.name ?? user.email}>{children}</ArtistShell>;
}
