import { db } from '@/lib/db';

async function getArtistPitches() {
  try {
    // Get all portals (in production, filter by artist's managed labels)
    const portals = await db.portal.findMany({
      include: {
        _count: {
          select: { submissions: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    return portals;
  } catch (error) {
    console.error('Error fetching portals:', error);
    return [];
  }
}

export default async function ArtistDashboard() {
  const portals = await getArtistPitches();

  return (
    <div className="min-h-[100dvh] bg-bg-base px-8 py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="type-h2 text-fg-1 mb-2">Pitch Packages</h1>
          <p className="type-body-sm text-fg-2">View open pitch opportunities from labels</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
            <p className="type-label text-fg-2 mb-2">Open Opportunities</p>
            <p className="type-h3 text-fg-1">{portals.length}</p>
          </div>

          <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
            <p className="type-label text-fg-2 mb-2">Submissions Received</p>
            <p className="type-h3 text-accent-gold">
              {portals.reduce((sum, p) => sum + (p._count?.submissions || 0), 0)}
            </p>
          </div>

          <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
            <p className="type-label text-fg-2 mb-2">Save Rate</p>
            <p className="type-h3 text-fg-1">-</p>
          </div>
        </div>

        {/* Pitch List */}
        <div>
          <h2 className="type-h4 text-fg-1 mb-6">Available Pitches</h2>

          {portals.length === 0 ? (
            <div className="bg-bg-surface-1 border border-border-default rounded-lg p-12 text-center">
              <p className="type-body-sm text-fg-2">No pitch opportunities available yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {portals.map((portal) => (
                <div
                  key={portal.id}
                  className="bg-bg-surface-1 border border-border-default rounded-lg p-6 hover:border-accent-gold/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="type-h6 text-fg-1 mb-2">{portal.name}</h3>
                      <p className="type-body-sm text-fg-2 mb-4">{portal.brief}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-fg-3">
                          {portal._count?.submissions || 0} submission{(portal._count?.submissions || 0) !== 1 ? 's' : ''}
                        </span>
                        {portal.deadline && (
                          <span className="text-fg-3">
                            Deadline: {new Date(portal.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <a href={`/p/${portal.slug}`} className="btn btn-primary btn-sm">
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
