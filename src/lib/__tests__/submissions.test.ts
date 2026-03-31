import { db } from "../db";
import { createSubmission } from "../submissions";

const PORTAL_SLUG = "nocturne-lp";
let portalId: string;

beforeAll(async () => {
  const portal = await db.portal.findUnique({ where: { slug: PORTAL_SLUG } });
  if (!portal) throw new Error("Run `npx prisma db seed` first");
  portalId = portal.id;
});

afterAll(async () => {
  await db.submission.deleteMany({
    where: { portalId, noteToLabel: "test-jest-submission" },
  });
  await db.$disconnect();
});

describe("createSubmission", () => {
  it("creates a submission with tracks and returns no error", async () => {
    const result = await createSubmission({
      portalId,
      noteToLabel: "test-jest-submission",
      tracks: [
        {
          title: "Test Track A",
          fileUrl: "uploads/test-key-a.mp3",
          fileSizeBytes: 4_000_000,
          genres: ["pop"],
          moods: ["happy"],
        },
      ],
    });

    expect(result.error).toBeUndefined();

    const saved = await db.submission.findFirst({
      where: { portalId, noteToLabel: "test-jest-submission" },
      include: { tracks: true },
    });

    expect(saved).not.toBeNull();
    expect(saved?.tracks).toHaveLength(1);
    expect(saved?.tracks[0].title).toBe("Test Track A");
    expect(saved?.tracks[0].genres).toEqual(["pop"]);
  });

  it("returns an error for a non-existent portalId", async () => {
    const result = await createSubmission({
      portalId: "nonexistent-portal-id",
      tracks: [
        {
          title: "Orphan Track",
          fileUrl: "uploads/orphan.mp3",
          fileSizeBytes: 1_000_000,
          genres: [],
          moods: [],
        },
      ],
    });

    expect(result.error).toBeDefined();
  });
});
