import { createClient } from '@supabase/supabase-js';
import { db } from '../../src/lib/db';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { TEST_USERS, TEST_PORTAL_SLUG } from './global-setup';

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

async function globalTeardown() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Clean up Prisma data first (portal + submissions + pitches cascade)
  try {
    const portal = await db.portal.findUnique({ where: { slug: TEST_PORTAL_SLUG } });
    if (portal) {
      await db.portal.delete({ where: { id: portal.id } });
      console.log('[teardown] Deleted test portal');
    }

    // Delete any pitch packages created during e2e
    for (const email of [TEST_USERS.label.email]) {
      const user = await db.user.findUnique({ where: { email } });
      if (user) {
        const label = await db.label.findUnique({ where: { userId: user.id } });
        if (label) {
          await db.pitchPackage.deleteMany({ where: { labelId: label.id } });
          await db.labelTeamInvite.deleteMany({ where: { labelId: label.id } });
        }
      }
    }
  } catch (e) {
    console.warn('[teardown] Prisma cleanup warning:', e);
  } finally {
    await db.$disconnect();
  }

  // Delete Supabase users
  const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 1000 });
  for (const testUser of Object.values(TEST_USERS)) {
    const found = users.find(u => u.email === testUser.email);
    if (found) {
      await admin.auth.admin.deleteUser(found.id);
      console.log(`[teardown] Deleted ${testUser.role} user`);
    }
  }
}

export default globalTeardown;
