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
    minRating?: string;
    songwriter?: string;
    dateRange?: string;
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

  const minRating = searchParams.minRating ? parseInt(searchParams.minRating) : undefined;
  const validMinRating = minRating && minRating >= 1 && minRating <= 5 ? minRating : undefined;

  const [tracks, portals, songwriters] = await Promise.all([
    getLibraryTracks(label.id, {
      portalId: searchParams.portal,
      status,
      search: searchParams.search,
      genre: searchParams.genre,
      mood: searchParams.mood,
      sort: (searchParams.sort as "newest" | "oldest" | "rating") || "newest",
      minRating: validMinRating,
      songwriterId: searchParams.songwriter,
      dateRange: (searchParams.dateRange as "7d" | "30d" | "90d") || undefined,
    }),
    getPortalsForLabel(label.id),
    db.songwriter.findMany({
      where: { submissions: { some: { portal: { labelId: label.id } } } },
      include: { user: { select: { name: true } } },
      orderBy: { user: { name: "asc" } },
    }),
  ]);

  return (
    <LibraryShell
      tracks={tracks}
      portals={portals}
      labelId={label.id}
      songwriters={songwriters.map(s => ({ id: s.id, name: s.user.name }))}
      activePortalId={searchParams.portal}
      activeStatus={searchParams.status}
      activeSearch={searchParams.search}
      activeGenre={searchParams.genre}
      activeMood={searchParams.mood}
      activeSort={searchParams.sort}
      activeMinRating={searchParams.minRating}
      activeSongwriterId={searchParams.songwriter}
      activeDateRange={searchParams.dateRange}
    />
  );
}
