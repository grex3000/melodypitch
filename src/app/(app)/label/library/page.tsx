import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function LabelLibrary() {
  const user = await db.user.findFirst({
    where: { role: 'LABEL' },
    include: { label: true }
  })

  if (!user?.label) return <div>Label profile not found</div>

  // Get all submissions for this label's portals
  const submissions = await db.submission.findMany({
    where: { portal: { labelId: user.label.id } },
    include: {
      portal: true,
      songwriter: { include: { user: true } },
      tracks: true
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <h1 className="type-h1">Demo Library</h1>
      <p className="type-body-sm fg-3 mt-1">Manage all submitted demos</p>

      {submissions.length === 0 ? (
        <div className="mt-8 text-center py-12 fg-3">
          No submissions yet. Create a portal to start receiving demos.
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {submissions.map((sub) => (
            <div key={sub.id} className="card bg-bg-surface-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="type-label fg-1">{sub.portal.name}</h3>
                  <p className="type-body-sm fg-3">
                    From: {sub.songwriter?.user?.name || 'Unknown'} • {new Date(sub.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`badge ${
                  sub.status === 'NEW' ? 'status-pending' :
                  sub.status === 'REVIEWED' ? 'status-reviewing' :
                  sub.status === 'SHORTLISTED' ? 'status-interested' :
                  'status-archived'
                }`}>
                  {sub.status}
                </span>
              </div>
              <div className="space-y-2">
                {sub.tracks.map((track) => (
                  <div key={track.id} className="flex items-center gap-4 p-3 bg-bg-surface-2 rounded-lg border border-border-subtle">
                    <div className="flex-1">
                      <div className="type-label fg-1">{track.title}</div>
                      <div className="type-body-sm fg-3">
                        {track.genres.join(', ')} • {Math.floor((track.durationSecs || 0) / 60)}:{(track.durationSecs || 0) % 60}
                      </div>
                    </div>
                    <audio controls src={track.fileUrl} className="h-8" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
