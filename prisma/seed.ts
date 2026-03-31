import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Load DATABASE_URL from .env.local (Prisma CLI doesn't pick up .env.local automatically)
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const lines = fs.readFileSync(envLocalPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

// Match the exact adapter-pg pattern from src/lib/db.ts
const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const hash = (pw: string) => bcrypt.hash(pw, 12);

  // --- Label user ---
  const labelUser = await db.user.upsert({
    where: { email: "label@melodypitch.test" },
    update: {},
    create: {
      email: "label@melodypitch.test",
      name: "Nocturne Records",
      passwordHash: await hash("password123"),
      role: "LABEL" as Role,
    },
  });

  const label = await db.label.upsert({
    where: { userId: labelUser.id },
    update: {},
    create: { userId: labelUser.id, name: "Nocturne Records" },
  });

  // --- Songwriter user ---
  const writerUser = await db.user.upsert({
    where: { email: "writer@melodypitch.test" },
    update: {},
    create: {
      email: "writer@melodypitch.test",
      name: "Maren Solberg",
      passwordHash: await hash("password123"),
      role: "SONGWRITER" as Role,
    },
  });

  const songwriter = await db.songwriter.upsert({
    where: { userId: writerUser.id },
    update: {},
    create: { userId: writerUser.id },
  });

  // --- Artist user ---
  const artistUser = await db.user.upsert({
    where: { email: "artist@melodypitch.test" },
    update: {},
    create: {
      email: "artist@melodypitch.test",
      name: "Lena Rydell",
      passwordHash: await hash("password123"),
      role: "ARTIST" as Role,
    },
  });

  const artist = await db.artist.upsert({
    where: { id: "seed-artist-01" },
    update: {},
    create: { id: "seed-artist-01", name: "Lena Rydell" },
  });

  await db.artistMember.upsert({
    where: { userId: artistUser.id },
    update: {},
    create: { userId: artistUser.id, artistId: artist.id, role: "Artist" },
  });

  // --- Portal ---
  const portal = await db.portal.upsert({
    where: { slug: "nocturne-lp" },
    update: {},
    create: {
      labelId: label.id,
      type: "PROJECT",
      name: "Nocturne LP",
      slug: "nocturne-lp",
      brief: "Looking for introspective alt-pop. Dark, cinematic, sparse production.",
      isPublic: false,
      bgBlurPx: 5,
    },
  });

  // --- Submission with tracks ---
  const submission = await db.submission.create({
    data: {
      portalId: portal.id,
      songwriterId: songwriter.id,
      noteToLabel: "These two fit the Nocturne brief — both written last winter.",
      status: "NEW",
      tracks: {
        create: [
          {
            title: "Glass Weather",
            fileUrl: "https://example.com/tracks/glass-weather.mp3",
            fileSizeBytes: 8_400_000,
            durationSecs: 214,
            genres: ["indie pop", "alternative"],
            moods: ["melancholic", "atmospheric"],
          },
          {
            title: "Northern Fault",
            fileUrl: "https://example.com/tracks/northern-fault.mp3",
            fileSizeBytes: 7_200_000,
            durationSecs: 187,
            genres: ["alt-pop", "indie"],
            moods: ["dark", "cinematic"],
          },
        ],
      },
    },
    include: { tracks: true },
  });

  // --- Pitch package ---
  await db.pitchPackage.create({
    data: {
      labelId: label.id,
      artistId: artist.id,
      name: "Nocturne LP — Pitch #1",
      note: "Two strong candidates for the album. Glass Weather especially.",
      items: {
        create: submission.tracks.map((track) => ({
          trackId: track.id,
          verdict: "PENDING",
        })),
      },
    },
  });

  console.log("Done. Test accounts:");
  console.log("  label@melodypitch.test     / password123  (LABEL)");
  console.log("  writer@melodypitch.test    / password123  (SONGWRITER)");
  console.log("  artist@melodypitch.test    / password123  (ARTIST)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
