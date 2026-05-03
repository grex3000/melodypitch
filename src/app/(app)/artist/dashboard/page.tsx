import { db } from '@/lib/db'
import { Card } from '@/components/ui'

export const dynamic = 'force-dynamic'

export default async function ArtistDashboard() {
  // Simplified: assume middleware protects route, use test user for now
  const user = await db.user.findFirst({
    where: { role: 'ARTIST' },
    include: { artistMember: { include: { artist: true } } }
  })

  if (!user?.artistMember) return <div className="p-8 type-body text-fg-1">Artist profile not found</div>

  const pitchPackages = await db.pitchPackage.findMany({
    where: { artistId: user.artistMember.artistId },
    include: {
      label: true,
      items: { 
        include: { 
          track: true,
          comments: true
        } 
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <h1 className="type-h2 text-fg-1">Pitch Packages</h1>
      <p className="type-body-sm text-fg-2 mt-2">Review demos pitched to you here.</p>

      {pitchPackages.length === 0 ? (
        <div className="mt-8 text-center py-12 type-body-sm text-fg-3">
          No pitch packages yet. Labels will pitch demos to you.
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {pitchPackages.map((pkg) => (
            <Card key={pkg.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="type-h5 text-fg-1">{pkg.name}</h3>
                  <p className="type-body-sm text-fg-2 mt-1">From: {pkg.label.name}</p>
                </div>
                <span className="type-body-sm text-fg-3">
                  {pkg.items.length} tracks
                </span>
              </div>

              {pkg.note && (
                <p className="type-body-sm text-fg-2 mb-4">{pkg.note}</p>
              )}

              <div className="space-y-3">
                {pkg.items.map((item) => (
                  <div key={item.id} className="p-3 bg-bg-surface-2 rounded-md border border-border-subtle">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="type-body font-medium text-fg-1">{item.track.title}</div>
                        <div className="type-body-sm text-fg-3 mt-1">
                          {item.track.genres.join(', ')}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-md type-label ${
                        item.verdict === 'PENDING' ? 'bg-status-pending/10 text-status-pending' :
                        item.verdict === 'APPROVED' ? 'bg-success/10 text-success' :
                        item.verdict === 'HOLD' ? 'bg-warning/10 text-warning' :
                        'bg-error/10 text-error'
                      }`}>
                        {item.verdict}
                      </span>
                    </div>
                    {item.comments.length > 0 && (
                      <div className="mt-2 type-body-sm text-fg-2">
                        {item.comments.length} comment(s)
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
