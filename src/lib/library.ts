"use server";

import { db } from "@/lib/db";
import type {
  Track,
  Submission,
  Songwriter,
  User,
  Portal,
  LabelNote,
  SubmissionStatus,
} from "@prisma/client";

// ─── Types ───────────────────────────────────────────────────────────────────

export type LibraryTrack = Track & {
  submission: Submission & {
    songwriter: (Songwriter & { user: Pick<User, "name"> }) | null;
    portal: Pick<Portal, "id" | "name" | "type" | "slug">;
  };
  labelNotes: LabelNote[];
};

export type PortalSummary = {
  id: string;
  name: string;
  type: string;
  slug: string;
  newCount: number;
};

export interface LibraryFilters {
  portalId?: string;
  status?: SubmissionStatus;
  search?: string;
  genre?: string;
  mood?: string;
  sort?: "newest" | "oldest" | "rating";
}

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getLibraryTracks(
  labelId: string,
  filters: LibraryFilters
): Promise<LibraryTrack[]> {
  return db.track.findMany({
    where: {
      submission: {
        portal: { labelId },
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.portalId ? { portalId: filters.portalId } : {}),
      },
      ...(filters.search
        ? {
            OR: [
              { title: { contains: filters.search, mode: "insensitive" } },
              {
                submission: {
                  songwriter: {
                    user: { name: { contains: filters.search, mode: "insensitive" } },
                  },
                },
              },
            ],
          }
        : {}),
      ...(filters.genre ? { genres: { has: filters.genre } } : {}),
      ...(filters.mood ? { moods: { has: filters.mood } } : {}),
    },
    include: {
      submission: {
        include: {
          songwriter: {
            include: { user: { select: { name: true } } },
          },
          portal: { select: { id: true, name: true, type: true, slug: true } },
        },
      },
      labelNotes: { orderBy: { createdAt: "desc" } },
    },
    orderBy:
      filters.sort === "oldest"
        ? { createdAt: "asc" }
        : filters.sort === "rating"
        ? { rating: { sort: "desc", nulls: "last" } }
        : { createdAt: "desc" },
  }) as Promise<LibraryTrack[]>;
}

export async function getPortalsForLabel(labelId: string): Promise<PortalSummary[]> {
  const portals = await db.portal.findMany({
    where: { labelId },
    orderBy: { createdAt: "asc" },
  });

  const withNewCount = await Promise.all(
    portals.map(async (p) => {
      const newCount = await db.submission.count({
        where: { portalId: p.id, status: "NEW" },
      });
      return {
        id: p.id,
        name: p.name,
        type: p.type,
        slug: p.slug,
        newCount,
      };
    })
  );

  return withNewCount;
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export async function updateSubmissionStatus(
  submissionId: string,
  status: SubmissionStatus
): Promise<void> {
  await db.submission.update({
    where: { id: submissionId },
    data: { status },
  });
}

export async function setTrackRating(
  trackId: string,
  rating: number | null
): Promise<void> {
  await db.track.update({
    where: { id: trackId },
    data: { rating },
  });
}

export async function addLabelNote(
  trackId: string,
  authorId: string,
  body: string
): Promise<LabelNote> {
  return db.labelNote.create({
    data: { trackId, authorId, body },
  });
}

export async function archiveSubmissions(submissionIds: string[]): Promise<void> {
  await db.submission.updateMany({
    where: { id: { in: submissionIds } },
    data: { status: "ARCHIVED" },
  });
}
