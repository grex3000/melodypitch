import { db } from '@/lib/db'
import { Card, StatusBadge } from '@/components/ui'

const STATUS_STEPS = ['NEW', 'REVIEWED', 'SHORTLISTED', 'PITCHED'] as const

export const dynamic = 'force-dynamic'

export default async function SongwriterDashboard() {
  const user = await db.user.findFirst({
    where: { role: 'SONGWRITER' },
    include: { songwriter: true }
  })

  if (!user?.songwriter) return <div className="p-8 type-body text-fg-1">Songwriter profile not found</div>

  const submissions = await db.submission.findMany({
    where: { songwriterId: user.songwriter.id },
    include: {
      portal: true,
      tracks: true
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <h1 className="type-h2 text-fg-1">My Submissions</h1>
      <p className="type-body-sm text-fg-2 mt-2">Track the status of your demos here.</p>

      {submissions.length === 0 ? (
        <div className="mt-8 text-center py-12 type-body-sm text-fg-3">
          No submissions yet. Submit demos via portal links.
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {submissions.map((sub) => (
            <Card key={sub.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="type-h5 text-fg-1">{sub.portal.name}</h3>
                  <p className="type-body-sm text-fg-2 mt-1">
                    {sub.tracks.length} tracks • {new Date(sub.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Status Progress Bar - only show for active submissions */}
              {sub.status !== 'ARCHIVED' ? (
                <>
                  <div className="flex items-center gap-1 mt-4">
                    {STATUS_STEPS.map((step, idx) => {
                      const currentIdx = STATUS_STEPS.indexOf(sub.status as typeof STATUS_STEPS[number])
                      const isActive = idx <= currentIdx
                      return (
                        <div key={step} className="flex items-center">
                          <div className={`w-6 h-6 rounded-pill flex items-center justify-center type-label ${
                            isActive ? 'bg-accent-gold text-fg-inverse' : 'bg-border-default text-fg-3'
                          }`}>
                            {idx + 1}
                          </div>
                          {idx < STATUS_STEPS.length - 1 && (
                            <div className={`h-1 w-8 ${
                              idx < currentIdx ? 'bg-accent-gold' : 'bg-border-default'
                            }`} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex justify-between mt-2">
                    {STATUS_STEPS.map((step) => (
                      <span key={step} className="type-label text-fg-2">{step}</span>
                    ))}
                  </div>
                </>
              ) : (
                <StatusBadge status="archived" className="mt-4">
                  Archived
                </StatusBadge>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
