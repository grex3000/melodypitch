"use server";

import { getCurrentUser } from "@/lib/auth-context";
import { db } from "@/lib/db";
import type {
  PitchPackage,
  PitchItem,
  Track,
  Submission,
  Songwriter,
  User,
  Artist,
  ArtistComment,
  TrackVerdict,
} from "@prisma/client";

// ─── Types ───────────────────────────────────────────────────────────────────

export type PitchTrack = Track & {
  submission: Submission & {
    songwriter: (Songwriter & { user: Pick<User, "name"> }) | null;
  };
};

export type PitchComment = ArtistComment & {
  author: Pick<User, "id" | "name" | "role">;
};

export type PitchItemWithDetails = PitchItem & {
  track: PitchTrack;
  comments: PitchComment[];
};

export type PitchPackageWithItems = PitchPackage & {
  artist: Pick<Artist, "id" | "name">;
  items: PitchItemWithDetails[];
};

export type PitchPackageSummary = PitchPackage & {
  artist: Pick<Artist, "id" | "name">;
  items: Pick<PitchItem, "id" | "verdict">[];
};

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getPitchPackagesForLabel(
  labelId: string
): Promise<PitchPackageSummary[]> {
  return db.pitchPackage.findMany({
    where: { labelId },
    include: {
      artist: { select: { id: true, name: true } },
      items: { select: { id: true, verdict: true } },
    },
    orderBy: { createdAt: "desc" },
  }) as Promise<PitchPackageSummary[]>;
}

export async function getPitchPackage(
  packageId: string
): Promise<PitchPackageWithItems | null> {
  return db.pitchPackage.findUnique({
    where: { id: packageId },
    include: {
      artist: { select: { id: true, name: true } },
      items: {
        include: {
          track: {
            include: {
              submission: {
                include: {
                  songwriter: {
                    include: { user: { select: { name: true } } },
                  },
                },
              },
            },
          },
          comments: {
            include: {
              author: { select: { id: true, name: true, role: true } },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  }) as Promise<PitchPackageWithItems | null>;
}

export async function getPitchPackagesForArtist(
  artistId: string
): Promise<PitchPackageSummary[]> {
  return db.pitchPackage.findMany({
    where: { artistId },
    include: {
      artist: { select: { id: true, name: true } },
      items: { select: { id: true, verdict: true } },
    },
    orderBy: { createdAt: "desc" },
  }) as Promise<PitchPackageSummary[]>;
}

export async function getArtistsList(): Promise<Pick<Artist, "id" | "name">[]> {
  return db.artist.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export async function createPitchPackage(
  labelId: string,
  data: { name: string; note: string | null; artistId: string; trackIds: string[] }
): Promise<{ id: string }> {
  const user = await getCurrentUser();
  if (!user || user.role !== "LABEL") throw new Error("Unauthorized");

  const label = await db.label.findUnique({ where: { userId: user.id } });
  if (!label || label.id !== labelId) throw new Error("Forbidden");

  const pkg = await db.pitchPackage.create({
    data: {
      labelId,
      artistId: data.artistId,
      name: data.name,
      note: data.note ?? null,
      items: {
        create: data.trackIds.map((trackId) => ({ trackId })),
      },
    },
  });

  const tracks = await db.track.findMany({
    where: { id: { in: data.trackIds }, submission: { portal: { labelId } } },
    select: { submissionId: true },
  });
  const submissionIds = Array.from(new Set(tracks.map((t) => t.submissionId)));
  await db.submission.updateMany({
    where: { id: { in: submissionIds } },
    data: { status: "PITCHED" },
  });

  return { id: pkg.id };
}

async function verifyArtistOwnsItem(userId: string, itemId: string): Promise<void> {
  const member = await db.artistMember.findUnique({ where: { userId } });
  if (!member) throw new Error("Forbidden");

  const item = await db.pitchItem.findUnique({
    where: { id: itemId },
    select: { package: { select: { artistId: true } } },
  });
  if (!item || item.package.artistId !== member.artistId) throw new Error("Forbidden");
}

export async function setItemVerdict(
  itemId: string,
  verdict: TrackVerdict
): Promise<void> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ARTIST") throw new Error("Unauthorized");
  await verifyArtistOwnsItem(user.id, itemId);

  await db.pitchItem.update({
    where: { id: itemId },
    data: { verdict },
  });
}

export async function setItemRating(
  itemId: string,
  rating: number | null
): Promise<void> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ARTIST") throw new Error("Unauthorized");
  await verifyArtistOwnsItem(user.id, itemId);

  await db.pitchItem.update({
    where: { id: itemId },
    data: { artistRating: rating },
  });
}

export async function addArtistComment(
  itemId: string,
  body: string,
  timestampSec?: number
): Promise<void> {
  const user = await getCurrentUser();
  if (!user || user.role !== "ARTIST") throw new Error("Unauthorized");
  await verifyArtistOwnsItem(user.id, itemId);

  await db.artistComment.create({
    data: {
      pitchItemId: itemId,
      authorId: user.id,
      body,
      timestampSec: timestampSec ?? null,
    },
  });
}
