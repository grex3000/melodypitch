import { getCurrentUser } from "@/lib/auth-context";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getArtistsList } from "@/lib/pitches";
import NewPitchForm from "@/components/pitches/NewPitchForm";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: { tracks?: string };
}

export default async function NewPitchPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();
  if (!user || user.role !== "LABEL") redirect("/login");

  const label = await db.label.findUnique({ where: { userId: user.id } });
  if (!label) redirect("/login");

  const trackIds = (searchParams.tracks ?? "").split(",").filter(Boolean);
  if (trackIds.length === 0) redirect("/label/library");

  const [tracks, artists] = await Promise.all([
    db.track.findMany({
      where: {
        id: { in: trackIds },
        submission: { portal: { labelId: label.id } },
      },
      include: {
        submission: {
          include: {
            songwriter: { include: { user: { select: { name: true } } } },
          },
        },
      },
    }),
    getArtistsList(),
  ]);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="type-h1">New Pitch Package</h1>
        <p className="type-body-sm text-fg-3 mt-1">
          {tracks.length} track{tracks.length !== 1 ? "s" : ""} selected
        </p>
      </div>
      <NewPitchForm tracks={tracks} artists={artists} labelId={label.id} />
    </div>
  );
}
