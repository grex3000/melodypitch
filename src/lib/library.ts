"use server";

import { getCurrentUser } from "@/lib/auth-context";
import { db } from "@/lib/db";
import { notifySongwriterOfStatusChange } from "@/lib/notifications";
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
  minRating?: number;
  songwriterId?: string;
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
      ...(filters.minRating != null ? { rating: { gte: filters.minRating } } : {}),
      ...(filters.songwriterId
        ? { submission: { songwriterId: filters.songwriterId } }
        : {}),
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

async function requireLabelUser() {
  const user = await getCurrentUser();
  if (!user || user.role !== "LABEL") throw new Error("Unauthorized");
  const label = await db.label.findUnique({ where: { userId: user.id } });
  if (!label) throw new Error("Forbidden");
  return { user, label };
}

export async function updateSubmissionStatus(
  submissionId: string,
  status: SubmissionStatus
): Promise<void> {
  const { label } = await requireLabelUser();

  const before = await db.submission.findFirst({
    where: { id: submissionId, portal: { labelId: label.id } },
    select: { status: true },
  });
  if (!before) throw new Error("Forbidden");

  const result = await db.submission.updateMany({
    where: { id: submissionId, portal: { labelId: label.id } },
    data: { status },
  });
  if (result.count === 0) throw new Error("Forbidden");

  notifySongwriterOfStatusChange(submissionId, before.status, status).catch(() => {});
}

export async function setTrackRating(
  trackId: string,
  rating: number | null
): Promise<void> {
  const { label } = await requireLabelUser();
  const result = await db.track.updateMany({
    where: { id: trackId, submission: { portal: { labelId: label.id } } },
    data: { rating },
  });
  if (result.count === 0) throw new Error("Forbidden");
}

export async function addLabelNote(
  trackId: string,
  body: string
): Promise<LabelNote> {
  const { user, label } = await requireLabelUser();
  const track = await db.track.findFirst({
    where: { id: trackId, submission: { portal: { labelId: label.id } } },
    select: { id: true },
  });
  if (!track) throw new Error("Forbidden");
  return db.labelNote.create({
    data: { trackId, authorId: user.id, body },
  });
}

export async function archiveSubmissions(submissionIds: string[]): Promise<void> {
  const { label } = await requireLabelUser();
  await db.submission.updateMany({
    where: { id: { in: submissionIds }, portal: { labelId: label.id } },
    data: { status: "ARCHIVED" },
  });
}
