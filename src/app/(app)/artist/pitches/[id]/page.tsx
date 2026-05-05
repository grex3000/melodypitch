import { getCurrentUser } from "@/lib/auth-context";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { getPitchPackage } from "@/lib/pitches";
import PitchShell from "@/components/pitches/PitchShell";

export const dynamic = "force-dynamic";

export default async function ArtistPitchPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ARTIST") redirect("/login");

  const member = await db.artistMember.findUnique({
    where: { userId: user.id },
  });
  if (!member) redirect("/login");

  const pkg = await getPitchPackage(params.id);
  if (!pkg || pkg.artistId !== member.artistId) notFound();

  return (
    <PitchShell
      pkg={pkg}
      currentUserId={user.id}
      currentUserName={user.name}
      currentUserRole={user.role}
    />
  );
}
