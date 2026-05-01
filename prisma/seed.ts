import { PrismaClient, Role, SubmissionStatus, TrackVerdict } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { createClient } from "@supabase/supabase-js";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Royalty-free audio from SoundHelix
const SAMPLE_MP3_BASE = "http://www.soundhelix.com/examples/mp3/SoundHelix-Song";
const GENRES = ["Pop", "Electronic", "Indie", "Hip-Hop", "R&B"];
const MOODS = ["Upbeat", "Chill", "Dark", "Energetic", "Dreamy"];

async function main() {
  console.log("Seeding database...");

  // Clean up existing data
  await db.artistComment.deleteMany();
  await db.pitchItem.deleteMany();
  await db.pitchPackage.deleteMany();
  await db.labelNote.deleteMany();
  await db.track.deleteMany();
  await db.submission.deleteMany();
  await db.portalInvite.deleteMany();
  await db.portal.deleteMany();
  await db.artistMember.deleteMany();
  await db.artist.deleteMany();
  await db.songwriter.deleteMany();
  await db.label.deleteMany();
  await db.user.deleteMany();

  // Create users via Supabase Auth and Prisma
  const users = [
    {
      email: "label@melodypitch.test",
      password: "password123",
      name: "Nocturne Records",
      role: Role.LABEL,
    },
    {
      email: "writer@melodypitch.test",
      password: "password123",
      name: "Maren Solberg",
      role: Role.SONGWRITER,
    },
    {
      email: "artist@melodypitch.test",
      password: "password123",
      name: "Lena Rydell",
      role: Role.ARTIST,
    },
  ];

  const createdUsers: Record<string, { id: string; supabaseId: string }> = {};

  for (const u of users) {
    // Create Supabase user
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
      user_metadata: { name: u.name, role: u.role },
    });

    if (error) {
      console.log(`User ${u.email} may already exist:`, error.message);
      continue;
    }

    const supabaseUser = data.user;
    // Create Prisma user
    const dbUser = await db.user.create({
      data: {
        supabaseUserId: supabaseUser.id,
        email: u.email,
        name: u.name,
        passwordHash: null,
        role: u.role,
      },
    });
    createdUsers[u.email] = { id: dbUser.id, supabaseId: supabaseUser.id };
    console.log(`Created user: ${u.email}`);
  }

  // Create role-specific profiles
  const labelUser = createdUsers["label@melodypitch.test"];
  const writerUser = createdUsers["writer@melodypitch.test"];
  const artistUser = createdUsers["artist@melodypitch.test"];

  // Create Label
  const label = await db.label.create({
    data: {
      userId: labelUser!.id,
      name: "Nocturne Records",
    },
  });

  // Create Songwriter
  const songwriter = await db.songwriter.create({
    data: {
      userId: writerUser!.id,
    },
  });

  // Create Artist and ArtistMember
  const artist = await db.artist.create({
    data: {
      name: "Lena Rydell",
    },
  });
  await db.artistMember.create({
    data: {
      userId: artistUser!.id,
      artistId: artist.id,
      role: "Primary",
    },
  });

  // Create Portals
  const portal1 = await db.portal.create({
    data: {
      labelId: label.id,
      type: "GENERAL",
      name: "Open Demo Submissions",
      slug: "nocturne-open",
      brief: "Send us your best tracks for consideration.",
      isPublic: true,
    },
  });

  const portal2 = await db.portal.create({
    data: {
      labelId: label.id,
      type: "PROJECT",
      name: "Summer EP Project",
      slug: "summer-ep-2026",
      brief: "Looking for upbeat tracks for our summer compilation.",
      deadline: new Date("2026-07-31"),
      isPublic: true,
    },
  });

  // Create Submissions with Tracks
  const tracks1 = Array.from({ length: 3 }, (_, i) => ({
    title: `Demo Track ${i + 1}`,
    fileUrl: `${SAMPLE_MP3_BASE}-${i + 1}.mp3`,
    fileSizeBytes: 5000000,
    durationSecs: 180 + i * 30,
    genres: [GENRES[i % GENRES.length]],
    moods: [MOODS[i % MOODS.length]],
  }));

  const submission1 = await db.submission.create({
    data: {
      portalId: portal1.id,
      songwriterId: songwriter.id,
      noteToLabel: "Here are my latest demos for your consideration.",
      status: SubmissionStatus.SHORTLISTED,
      tracks: { create: tracks1 },
    },
  });

  // Add LabelNotes to tracks
  const createdTracks1 = await db.track.findMany({ where: { submissionId: submission1.id } });
  for (const track of createdTracks1) {
    await db.labelNote.create({
      data: {
        trackId: track.id,
        authorId: labelUser!.id,
        body: `Great track! Love the ${track.genres[0]} vibe.`,
        rating: 4,
      },
    });
  }

  // Create Pitch Package
  const pitchPackage = await db.pitchPackage.create({
    data: {
      labelId: label.id,
      artistId: artist.id,
      name: "Summer Vibes Pitch",
      note: "Tracks that would fit Lena's upcoming summer EP.",
    },
  });

  // Add PitchItems with verdicts and comments
  for (const track of createdTracks1.slice(0, 2)) {
    const pitchItem = await db.pitchItem.create({
      data: {
        packageId: pitchPackage.id,
        trackId: track.id,
        verdict: TrackVerdict.APPROVED,
        artistRating: 5,
      },
    });

    await db.artistComment.create({
      data: {
        pitchItemId: pitchItem.id,
        authorId: artistUser!.id,
        body: "This track is perfect for the EP. Let's use it!",
        timestampSec: 45,
      },
    });
  }

  console.log("Seed completed successfully!");
  console.log("Test accounts:");
  console.log("  label@melodypitch.test     / password123  (LABEL)");
  console.log("  writer@melodypitch.test    / password123  (SONGWRITER)");
  console.log("  artist@melodypitch.test    / password123  (ARTIST)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => db.$disconnect());
