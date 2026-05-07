import { chromium, type FullConfig } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

export const TEST_USERS = {
  label: { email: 'e2e-label@melodypitch.test', password: 'TestPass123!', name: 'E2E Records', role: 'LABEL' },
  songwriter: { email: 'e2e-songwriter@melodypitch.test', password: 'TestPass123!', name: 'E2E Writer', role: 'SONGWRITER' },
  artist: { email: 'e2e-artist@melodypitch.test', password: 'TestPass123!', name: 'E2E Artist', role: 'ARTIST' },
} as const;

export const TEST_PORTAL_SLUG = 'e2e-test-portal';

async function globalSetup(_config: FullConfig) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Recreate test users with confirmed emails (delete first if they exist)
  const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 1000 });
  for (const user of Object.values(TEST_USERS)) {
    const existing = users.find(u => u.email === user.email);
    if (existing) {
      await admin.auth.admin.deleteUser(existing.id);
    }
    const { error } = await admin.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { name: user.name, role: user.role },
    });
    if (error) throw new Error(`Failed to create ${user.role} test user: ${error.message}`);
    console.log(`[setup] Created ${user.role} user: ${user.email}`);
  }

  // Save an auth storage state for each role by logging in via UI
  const authDir = path.join(__dirname, '.auth');
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  const browser = await chromium.launch();
  for (const [key, user] of Object.entries(TEST_USERS)) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', user.email);
    await page.fill('input[name="password"]', user.password);
    await page.click('button[type="submit"]');
    // Wait for redirect to role dashboard
    await page.waitForURL(/\/(label|songwriter|artist)\/dashboard/, { timeout: 15000 });
    const statePath = path.join(authDir, `${key}.json`);
    await context.storageState({ path: statePath });
    await context.close();
    console.log(`[setup] Saved auth state for ${key}`);
  }
  await browser.close();
}

export default globalSetup;
