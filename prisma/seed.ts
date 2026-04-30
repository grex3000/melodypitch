import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { createClient } from "@supabase/supabase-js";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log("Seeding database...");

  // Create users via Supabase Auth
  const users = [
    {
      email: "label@melodypitch.test",
      password: "password123",
      name: "Nocturne Records",
      role: "LABEL" as Role,
    },
    {
      email: "writer@melodypitch.test",
      password: "password123",
      name: "Maren Solberg",
      role: "SONGWRITER" as Role,
    },
    {
      email: "artist@melodypitch.test",
      password: "password123",
      name: "Lena Rydell",
      role: "ARTIST" as Role,
    },
  ];

  for (const u of users) {
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

    const user = data.user;
    console.log(`Created user: ${u.email}`);
  }

  // Seed portal and other data
  // Note: This is simplified - in production, link Supabase Auth users to your Prisma models
  console.log("Done. Test accounts:");
  console.log("  label@melodypitch.test     / password123  (LABEL)");
  console.log("  writer@melodypitch.test    / password123  (SONGWRITER)");
  console.log("  artist@melodypitch.test    / password123  (ARTIST)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => db.$disconnect());
