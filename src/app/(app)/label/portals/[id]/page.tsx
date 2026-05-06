import { getCurrentUser } from '@/lib/auth-context';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { buildInviteUrl } from '@/lib/email';
import { sendPortalInvite, revokePortalInvite } from './actions';
import CopyButton from '@/components/portal/CopyButton';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export const dynamic = 'force-dynamic';

export default async function PortalManagePage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'LABEL') redirect('/login');

  const label = await db.label.findUnique({ where: { userId: user.id } });
  if (!label) redirect('/login');

  const portal = await db.portal.findUnique({
    where: { id: params.id },
    include: {
      invites: { orderBy: { createdAt: 'desc' } },
      _count: { select: { submissions: true } },
    },
  });

  if (!portal || portal.labelId !== label.id) redirect('/label/portals');

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://melodypitch.com';
  const portalUrl = `${appUrl}/p/${portal.slug}`;

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <Link href="/label/portals" className="type-body-sm text-fg-3 hover:text-fg-1 transition-colors">
          ← Portals
        </Link>
      </div>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="type-h2 text-fg-1">{portal.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${portal.isPublic ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'}`}>
              {portal.isPublic ? 'Public' : 'Invite-only'}
            </span>
            <span className="text-xs text-fg-3">
              {portal._count.submissions} submission{portal._count.submissions !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-sm shrink-0">
          View portal ↗
        </a>
      </div>

      {/* Portal link */}
      <section className="mb-8">
        <h2 className="type-label text-fg-2 mb-3">Portal link</h2>
        <div className="flex items-center gap-2 bg-bg-surface-1 border border-border-default rounded-lg px-4 py-3">
          <span className="type-body-sm text-fg-3 truncate flex-1 font-mono text-xs">{portalUrl}</span>
          <CopyButton text={portalUrl} />
        </div>
      </section>

      {/* Invites — only for private portals */}
      {!portal.isPublic && (
        <section>
          <h2 className="type-label text-fg-2 mb-3">Invite songwriters</h2>

          <form
            action={async (formData: FormData) => {
              'use server';
              const email = (formData.get('email') as string)?.trim().toLowerCase();
              if (email) await sendPortalInvite(portal.id, email);
            }}
            className="flex gap-2 mb-6"
          >
            <input
              name="email"
              type="email"
              placeholder="songwriter@example.com"
              required
              className="input flex-1"
            />
            <button type="submit" className="btn btn-primary shrink-0">
              Send invite
            </button>
          </form>

          {portal.invites.length === 0 ? (
            <p className="type-body-sm text-fg-3 py-8 text-center border border-dashed border-border-subtle rounded-lg">
              No invites sent yet
            </p>
          ) : (
            <div className="space-y-2">
              {portal.invites.map((invite) => (
                <div key={invite.id} className="flex items-center gap-3 bg-bg-surface-1 border border-border-default rounded-lg px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="type-body-sm text-fg-1 truncate">{invite.email}</p>
                    <p className="text-xs text-fg-3 mt-0.5">
                      Sent {formatDistanceToNow(invite.createdAt, { addSuffix: true })}
                      {invite.acceptedAt && (
                        <span className="text-green-400 ml-2">✓ Accepted</span>
                      )}
                    </p>
                  </div>

                  {!invite.acceptedAt && (
                    <div className="flex items-center gap-3 shrink-0">
                      <CopyButton
                        text={buildInviteUrl(portal.slug, invite.token)}
                        label="Copy link"
                      />
                      <form
                        action={async () => {
                          'use server';
                          await revokePortalInvite(invite.id);
                        }}
                      >
                        <button type="submit" className="text-xs text-fg-3 hover:text-red-400 transition-colors">
                          Revoke
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
