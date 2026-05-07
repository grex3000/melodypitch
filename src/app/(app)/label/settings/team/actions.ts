'use server';

import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-context';
import { sendEmail, emailTemplates, buildTeamInviteUrl } from '@/lib/email';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function requireOwner() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'LABEL') redirect('/login');
  const label = await db.label.findUnique({ where: { userId: user.id } });
  if (!label) redirect('/login');
  return { user, label };
}

export async function sendTeamInvite(labelId: string, email: string) {
  const { user, label } = await requireOwner();
  if (label.id !== labelId) return { error: 'Forbidden' };

  if (email === user.email) return { error: 'You are already the owner of this workspace' };

  const alreadyMember = await db.labelMember.findFirst({
    where: { labelId, user: { email } },
  });
  if (alreadyMember) return { error: 'This person is already a team member' };

  const existingInvite = await db.labelTeamInvite.findFirst({
    where: { labelId, email, acceptedAt: null },
  });
  if (existingInvite) return { error: 'An invite has already been sent to this address' };

  const invite = await db.labelTeamInvite.create({ data: { labelId, email } });

  try {
    const acceptUrl = buildTeamInviteUrl(invite.token);
    const template = emailTemplates.teamInvite(label.name, user.name, acceptUrl);
    await sendEmail({ to: email, ...template });
  } catch {
    await db.labelTeamInvite.delete({ where: { id: invite.id } });
    return { error: 'Failed to send invite email. Please try again.' };
  }

  revalidatePath('/label/settings/team');
  return { success: true };
}

export async function revokeTeamInvite(inviteId: string) {
  const { label } = await requireOwner();

  const invite = await db.labelTeamInvite.findUnique({ where: { id: inviteId } });
  if (!invite || invite.labelId !== label.id) return { error: 'Invite not found' };

  await db.labelTeamInvite.delete({ where: { id: inviteId } });
  revalidatePath('/label/settings/team');
  return { success: true };
}

export async function removeLabelMember(memberId: string) {
  const { label } = await requireOwner();

  const member = await db.labelMember.findUnique({ where: { id: memberId } });
  if (!member || member.labelId !== label.id) return { error: 'Member not found' };

  await db.labelMember.delete({ where: { id: memberId } });
  revalidatePath('/label/settings/team');
  return { success: true };
}
