import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-context';
import { redirect } from 'next/navigation';

export default async function TeamInviteAcceptPage({
  params,
}: {
  params: { token: string };
}) {
  const invite = await db.labelTeamInvite.findUnique({
    where: { token: params.token },
    include: { label: true },
  });

  if (!invite || invite.acceptedAt) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-bg-base">
        <div className="w-full max-w-md bg-bg-surface-1 rounded-lg p-8 border border-border-default text-center">
          <h1 className="type-h4 text-fg-1 mb-3">Invite not found</h1>
          <p className="type-body-sm text-fg-2">
            This invite link is invalid or has already been used.
          </p>
        </div>
      </div>
    );
  }

  const user = await getCurrentUser();
  if (user) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-bg-base">
        <div className="w-full max-w-md bg-bg-surface-1 rounded-lg p-8 border border-border-default text-center">
          <h1 className="type-h4 text-fg-1 mb-3">Already signed in</h1>
          <p className="type-body-sm text-fg-2">
            You&apos;re already signed in with an existing account. Team invites require a new account.
            Please sign out first if you&apos;d like to accept this invite with a different email.
          </p>
        </div>
      </div>
    );
  }

  redirect(`/register?teamInvite=${params.token}`);
}
