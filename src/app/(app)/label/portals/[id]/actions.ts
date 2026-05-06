'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-context';
import { sendEmail, emailTemplates, buildInviteUrl } from '@/lib/email';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function sendPortalInvite(portalId: string, email: string) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'LABEL') redirect('/login');

  const label = await db.label.findUnique({ where: { userId: user.id } });
  if (!label) redirect('/login');

  const portal = await db.portal.findUnique({ where: { id: portalId } });
  if (!portal || portal.labelId !== label.id) {
    return { error: 'Portal not found' };
  }

  const existing = await db.portalInvite.findFirst({
    where: { portalId, email, acceptedAt: null },
  });
  if (existing) {
    return { error: 'An invite has already been sent to this address' };
  }

  const invite = await db.portalInvite.create({
    data: { portalId, email },
  });

  const inviteUrl = buildInviteUrl(portal.slug, invite.token);
  const template = emailTemplates.portalInvite(label.name, portal.name, inviteUrl);
  await sendEmail({ to: email, ...template });

  revalidatePath(`/label/portals/${portalId}`);
  return { success: true, inviteUrl };
}

export async function revokePortalInvite(inviteId: string) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'LABEL') redirect('/login');

  const label = await db.label.findUnique({ where: { userId: user.id } });
  if (!label) redirect('/login');

  const invite = await db.portalInvite.findUnique({
    where: { id: inviteId },
    include: { portal: true },
  });
  if (!invite || invite.portal.labelId !== label.id) {
    return { error: 'Invite not found' };
  }

  await db.portalInvite.delete({ where: { id: inviteId } });
  revalidatePath(`/label/portals/${invite.portalId}`);
  return { success: true };
}
