import { getCurrentUser } from "@/lib/auth-context";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getLibraryTracks, getPortalsForLabel } from "@/lib/library";
import LibraryShell from "@/components/library/LibraryShell";
import type { SubmissionStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const VALID_STATUSES: SubmissionStatus[] = [
  "NEW",
  "REVIEWED",
  "SHORTLISTED",
  "PITCHED",
  "ARCHIVED",
];

interface PageProps {
  searchParams: {
    portal?: string;
    status?: string;
    search?: string;
    genre?: string;
    mood?: string;
    sort?: string;
  };
}

export default async function LibraryPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();
  if (!user || user.role !== "LABEL") redirect("/login");

  const label = await db.label.findUnique({ where: { userId: user.id } });
  if (!label) redirect("/login");

  const status = VALID_STATUSES.includes(searchParams.status as SubmissionStatus)
    ? (searchParams.status as SubmissionStatus)
    : undefined;

  const [tracks, portals] = await Promise.all([
    getLibraryTracks(label.id, {
      portalId: searchParams.portal,
      status,
      search: searchParams.search,
      genre: searchParams.genre,
      mood: searchParams.mood,
      sort: (searchParams.sort as "newest" | "oldest" | "rating") || "newest",
    }),
    getPortalsForLabel(label.id),
  ]);

  return (
    <LibraryShell
      tracks={tracks}
      portals={portals}
      labelId={label.id}
      labelUserId={user.id}
      activePortalId={searchParams.portal}
      activeStatus={searchParams.status}
      activeSearch={searchParams.search}
      activeGenre={searchParams.genre}
      activeMood={searchParams.mood}
      activeSort={searchParams.sort}
    />
  );
}
