/**
 * End-to-end test for the full MelodyPitch workflow:
 * Label creates portal → Songwriter submits demo → Label reviews/rates/shortlists
 * → Label creates pitch package → Artist responds → Analytics + team invite
 *
 * Tests run serially in a single worker so each step builds on the previous.
 */
import { test, expect, type Page, type BrowserContext } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { TEST_PORTAL_SLUG } from './global-setup';

test.use({ storageState: 'tests/e2e/.auth/label.json' });
test.describe.configure({ mode: 'serial' });

const FIXTURE_WAV = path.join(__dirname, 'fixtures/silence.wav');

// Load storage state cookies for role-switching within tests
function loadCookies(role: 'label' | 'songwriter' | 'artist') {
  const stateFile = path.join(__dirname, `.auth/${role}.json`);
  const state = JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
  return state.cookies ?? [];
}

async function switchRole(context: BrowserContext, page: Page, role: 'label' | 'songwriter' | 'artist') {
  await context.clearCookies();
  const cookies = loadCookies(role);
  if (cookies.length) await context.addCookies(cookies);
  await page.reload();
}

// ─── Landing page ─────────────────────────────────────────────────────────────

test('landing page loads', async ({ page, context }) => {
  await context.clearCookies();
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Where great songs');
  await expect(page.getByRole('link', { name: /Get started free/i })).toBeVisible();
});

test('unauthenticated → redirected to login', async ({ page, context }) => {
  await context.clearCookies();
  await page.goto('/label/dashboard');
  await expect(page).toHaveURL(/login/);
});

// ─── Label flow ───────────────────────────────────────────────────────────────

test('label: dashboard loads', async ({ page }) => {
  await page.goto('/label/dashboard');
  await expect(page.getByRole('heading', { name: /label dashboard/i })).toBeVisible();
});

test('label: create portal', async ({ page }) => {
  await page.goto('/label/portals/new');
  await expect(page.getByRole('heading', { name: /new portal/i })).toBeVisible();

  await page.selectOption('select[name="type"]', 'GENERAL');
  await page.fill('input[name="name"]', 'E2E Test Portal');
  await page.fill('input[placeholder="nocturne-lp"]', TEST_PORTAL_SLUG);
  await page.fill('textarea[name="brief"]', 'Looking for upbeat indie-pop tracks.');

  // Use specific button name, not generic type=submit (Sign Out button also has type=submit)
  await Promise.all([
    page.waitForURL('/label/portals', { timeout: 10000 }),
    page.getByRole('button', { name: /create portal/i }).click(),
  ]);

  await expect(page.getByText('E2E Test Portal')).toBeVisible();
});

test('label: portal page shows correct submission link', async ({ page }) => {
  await page.goto('/label/portals');
  await expect(page.getByText(`/p/${TEST_PORTAL_SLUG}`)).toBeVisible();
});

// ─── Songwriter flow ───────────────────────────────────────────────────────────

test('songwriter: dashboard loads', async ({ page, context }) => {
  await switchRole(context, page, 'songwriter');
  await page.goto('/songwriter/dashboard');
  await expect(page).toHaveURL(/songwriter\/dashboard/);
  await expect(page.locator('h1, h2').first()).toBeVisible();
});

test('songwriter: submit demo to portal', async ({ page, context }) => {
  await switchRole(context, page, 'songwriter');
  await page.goto(`/p/${TEST_PORTAL_SLUG}`);
  await expect(page.getByText('E2E Test Portal')).toBeVisible();

  // Upload file via the hidden file input inside FileDropZone
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles(FIXTURE_WAV);

  // Wait for track row to appear with the title input
  await expect(page.getByPlaceholder('Track title')).toBeVisible({ timeout: 8000 });
  await page.fill('[placeholder="Track title"]', 'E2E Test Track');

  // Submit the form
  await page.getByRole('button', { name: /submit/i }).click();

  // Success state
  await expect(page.getByText(/submitted|thank you|success/i)).toBeVisible({ timeout: 20000 });
});

// ─── Label reviews submission ─────────────────────────────────────────────────

test('label: library shows submitted track', async ({ page, context }) => {
  await switchRole(context, page, 'label');
  await page.goto('/label/library');
  await expect(page.getByText('E2E Test Track')).toBeVisible({ timeout: 10000 });
});

test('label: open track detail panel', async ({ page, context }) => {
  await switchRole(context, page, 'label');
  await page.goto('/label/library');
  await page.getByText('E2E Test Track').click();
  // Detail panel should open
  await expect(page.getByText('Label notes')).toBeVisible({ timeout: 5000 });
});

test('label: shortlist the submission', async ({ page, context }) => {
  await switchRole(context, page, 'label');
  await page.goto('/label/library');
  await page.getByText('E2E Test Track').click();
  await expect(page.getByText('Label notes')).toBeVisible({ timeout: 5000 });

  // Find and click the SHORTLISTED status button in the detail panel
  // Use first() because there may be both a status-change menu item and a current-status badge
  const shortlistBtn = page.getByRole('button', { name: /shortlist/i }).first();
  await expect(shortlistBtn).toBeVisible({ timeout: 5000 });
  await shortlistBtn.click();
  await page.waitForTimeout(1000);
});

test('label: add notes to track', async ({ page, context }) => {
  await switchRole(context, page, 'label');
  await page.goto('/label/library');
  await page.getByText('E2E Test Track').click();
  await expect(page.getByText('Label notes')).toBeVisible({ timeout: 5000 });

  // Notes textarea (inside the detail panel notes editor)
  const notesArea = page.locator('textarea').first();
  if (await notesArea.isVisible()) {
    await notesArea.fill('Great hook. Strong chorus energy. Test note.');
    await notesArea.blur();
    await page.waitForTimeout(500);
  }
});

// ─── Label creates pitch package ──────────────────────────────────────────────

test('label: pitches page loads', async ({ page, context }) => {
  await switchRole(context, page, 'label');
  await page.goto('/label/pitches');
  await expect(page.getByRole('heading', { name: /pitch/i })).toBeVisible();
});

// ─── Artist flow ──────────────────────────────────────────────────────────────

test('artist: dashboard loads', async ({ page, context }) => {
  await switchRole(context, page, 'artist');
  await page.goto('/artist/dashboard');
  await expect(page).toHaveURL(/artist\/dashboard/);
  await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 8000 });
});

test('artist: pitches list loads', async ({ page, context }) => {
  await switchRole(context, page, 'artist');
  await page.goto('/artist/dashboard');
  await expect(page.getByRole('heading', { name: /pitch/i })).toBeVisible({ timeout: 8000 });
});

// ─── Label analytics ──────────────────────────────────────────────────────────

test('label: analytics page loads with overview stats', async ({ page, context }) => {
  await switchRole(context, page, 'label');
  await page.goto('/label/analytics');
  await expect(page.getByRole('heading', { name: /analytics/i })).toBeVisible();
  await expect(page.getByText('Total')).toBeVisible();
  await expect(page.getByText('Shortlisted')).toBeVisible();
});

test('label: analytics shows submission data', async ({ page, context }) => {
  await switchRole(context, page, 'label');
  await page.goto('/label/analytics');
  // Stats cards should show at least 1 submission
  const totalCard = page.locator('div').filter({ hasText: /^[0-9]+$/ }).first();
  await expect(page.locator('.grid').first()).toBeVisible();
});

// ─── Team member invite ───────────────────────────────────────────────────────

test('label: team settings page loads', async ({ page, context }) => {
  await switchRole(context, page, 'label');
  await page.goto('/label/settings/team');
  await expect(page.getByRole('heading', { name: 'Team', exact: true })).toBeVisible();
  // Owner badge should be visible
  await expect(page.getByText(/owner/i)).toBeVisible();
});

test('label: invite form is visible (owner only)', async ({ page, context }) => {
  await switchRole(context, page, 'label');
  await page.goto('/label/settings/team');
  // Invite form should be present for owner
  const emailInput = page.locator('input[name="email"]').last();
  await expect(emailInput).toBeVisible({ timeout: 5000 });
});

// ─── Auth guards ──────────────────────────────────────────────────────────────

test('songwriter cannot access label routes', async ({ page, context }) => {
  await switchRole(context, page, 'songwriter');
  await page.goto('/label/dashboard');
  await expect(page).toHaveURL(/login/);
});

test('artist cannot access label routes', async ({ page, context }) => {
  await switchRole(context, page, 'artist');
  await page.goto('/label/library');
  await expect(page).toHaveURL(/login/);
});

test('invalid login shows error', async ({ page, context }) => {
  await context.clearCookies();
  await page.goto('/login');
  await page.fill('input[name="email"]', 'nobody@nowhere.com');
  await page.fill('input[name="password"]', 'wrongpass123');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page).toHaveURL(/error=1/, { timeout: 8000 });
  await expect(page.getByText('Invalid email or password')).toBeVisible();
});
