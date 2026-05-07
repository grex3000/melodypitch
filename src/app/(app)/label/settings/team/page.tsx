import { getCurrentUser } from '@/lib/auth-context';
import { getLabelForUser } from '@/lib/label-context';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { sendTeamInvite, revokeTeamInvite, removeLabelMember } from './actions';
import CopyButton from '@/components/portal/CopyButton';
import { buildTeamInviteUrl } from '@/lib/email';

export const dynamic = 'force-dynamic';

export default async function TeamSettingsPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'LABEL') redirect('/login');

  const label = await getLabelForUser(user.id);
  if (!label) redirect('/login');

  const isOwner = label.userId === user.id;

  const fullLabel = await db.label.findUnique({
    where: { id: label.id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      members: {
        include: { user: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: 'asc' },
      },
      teamInvites: {
        where: { acceptedAt: null },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!fullLabel) redirect('/login');

  const formError = searchParams.error ?? null;

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="type-h2 text-fg-1 mb-1">Team</h1>
        <p className="type-body-sm text-fg-2">Manage who has access to {fullLabel.name}&apos;s workspace.</p>
      </div>

      {/* Current team */}
      <section className="mb-10">
        <h2 className="type-label text-fg-2 mb-3">Members</h2>
        <div className="space-y-2">
          {/* Owner row */}
          <div className="flex items-center gap-3 bg-bg-surface-1 border border-border-default rounded-lg px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="type-body-sm text-fg-1 truncate">{fullLabel.user.name}</p>
              <p className="text-xs text-fg-3 mt-0.5">{fullLabel.user.email}</p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold font-medium">Owner</span>
          </div>

          {/* Member rows */}
          {fullLabel.members.map((member) => (
            <div key={member.id} className="flex items-center gap-3 bg-bg-surface-1 border border-border-default rounded-lg px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="type-body-sm text-fg-1 truncate">{member.user.name}</p>
                <p className="text-xs text-fg-3 mt-0.5">{member.user.email}</p>
              </div>
              {isOwner && (
                <form
                  action={async () => {
                    'use server';
                    await removeLabelMember(member.id);
                  }}
                >
                  <button type="submit" className="text-xs text-fg-3 hover:text-red-400 transition-colors">
                    Remove
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pending invites — owner only */}
      {isOwner && fullLabel.teamInvites.length > 0 && (
        <section className="mb-10">
          <h2 className="type-label text-fg-2 mb-3">Pending invites</h2>
          <div className="space-y-2">
            {fullLabel.teamInvites.map((invite) => (
              <div key={invite.id} className="flex items-center gap-3 bg-bg-surface-1 border border-border-default rounded-lg px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="type-body-sm text-fg-1 truncate">{invite.email}</p>
                  <p className="text-xs text-fg-3 mt-0.5">
                    Sent {formatDistanceToNow(invite.createdAt, { addSuffix: true })}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <CopyButton text={buildTeamInviteUrl(invite.token)} label="Copy link" />
                  <form
                    action={async () => {
                      'use server';
                      await revokeTeamInvite(invite.id);
                    }}
                  >
                    <button type="submit" className="text-xs text-fg-3 hover:text-red-400 transition-colors">
                      Revoke
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Invite form — owner only */}
      {isOwner && (
        <section>
          <h2 className="type-label text-fg-2 mb-3">Invite a team member</h2>
          {formError && (
            <p className="type-body-sm text-error bg-error-muted px-3 py-2 rounded-md mb-4">
              {formError}
            </p>
          )}
          <form
            action={async (formData: FormData) => {
              'use server';
              const email = (formData.get('email') as string)?.trim().toLowerCase();
              if (email) {
                const result = await sendTeamInvite(label.id, email);
                if (result?.error) {
                  redirect(`/label/settings/team?error=${encodeURIComponent(result.error)}`);
                }
              }
            }}
            className="flex gap-2"
          >
            <input
              name="email"
              type="email"
              placeholder="colleague@label.com"
              required
              className="input flex-1"
            />
            <button type="submit" className="btn btn-primary shrink-0">
              Send invite
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
