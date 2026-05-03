import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function LabelPitches() {
  const user = await db.user.findFirst({
    where: { role: 'LABEL' },
    include: { label: true }
  })

  if (!user?.label) return <div>Label profile not found</div>

  const pitchPackages = await db.pitchPackage.findMany({
    where: { labelId: user.label.id },
    include: {
      artist: true,
      items: { include: { track: true } }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="type-h1">Pitch CRM</h1>
          <p className="type-body-sm fg-3 mt-1">Manage pitches to artists</p>
        </div>
        <button className="btn btn-primary">
          New Pitch Package
        </button>
      </div>

      {pitchPackages.length === 0 ? (
        <div className="mt-8 text-center py-12 fg-3">
          No pitch packages yet. Create one to pitch demos to artists.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {pitchPackages.map((pkg) => (
            <div key={pkg.id} className="card bg-bg-surface-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="type-label fg-1">{pkg.name}</h3>
                  <p className="type-body-sm fg-3">To: {pkg.artist.name}</p>
                </div>
                <span className="type-body-sm fg-3">
                  {pkg.items.length} tracks
                </span>
              </div>
              {pkg.note && (
                <p className="mt-2 type-body-sm fg-3">{pkg.note}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
