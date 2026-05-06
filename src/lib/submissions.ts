"use server";

import { db } from "@/lib/db";
import { notifyLabelOfNewSubmission } from "@/lib/notifications";

interface TrackInput {
  title: string;
  fileUrl: string;
  fileSizeBytes: number;
  genres: string[];
  moods: string[];
}

interface SubmissionInput {
  portalId: string;
  songwriterId?: string;
  noteToLabel?: string;
  tracks: TrackInput[];
}

export async function createSubmission(
  input: SubmissionInput
): Promise<{ submissionId?: string; error?: string }> {
  const portal = await db.portal.findUnique({
    where: { id: input.portalId },
    select: { id: true },
  });

  if (!portal) {
    return { error: "Portal not found" };
  }

  if (input.tracks.length === 0) {
    return { error: "At least one track is required" };
  }

  if (input.tracks.length > 10) {
    return { error: "Maximum 10 tracks per submission" };
  }

  const submission = await db.submission.create({
    data: {
      portalId: input.portalId,
      songwriterId: input.songwriterId ?? null,
      noteToLabel: input.noteToLabel ?? null,
      status: "NEW",
      tracks: {
        create: input.tracks.map((t) => ({
          title: t.title,
          fileUrl: t.fileUrl,
          fileSizeBytes: t.fileSizeBytes,
          genres: t.genres,
          moods: t.moods,
        })),
      },
    },
  });

  // Fire-and-forget — don't block the submission response on email delivery
  notifyLabelOfNewSubmission(submission.id).catch(() => {});

  return { submissionId: submission.id };
}
