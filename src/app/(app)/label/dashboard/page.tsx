import { db } from '@/lib/db';

async function getLabelReceivedSubmissions() {
  try {
    // Get all submissions (in production, filter by label's portals)
    const submissions = await db.submission.findMany({
      include: {
        tracks: true,
        portal: true,
        songwriter: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    return submissions.map((sub) => ({
      ...sub,
      createdAt: sub.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return [];
  }
}

export default async function LabelDashboard() {
  const submissions = await getLabelReceivedSubmissions();

  const stats = {
    total: submissions.length,
    new: submissions.filter((s) => s.status === 'NEW').length,
    underReview: submissions.filter((s) => s.status === 'UNDER_REVIEW').length,
    accepted: submissions.filter((s) => s.status === 'SELECTED').length,
    rejected: submissions.filter((s) => s.status === 'REJECTED').length,
  };

  return (
    <div className="min-h-[100dvh] bg-bg-base px-8 py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="type-h2 text-fg-1 mb-2">Label Dashboard</h1>
          <p className="type-body-sm text-fg-2">Manage submissions and demos from songwriters</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
            <p className="type-label text-fg-2 mb-2">Total Submissions</p>
            <p className="type-h3 text-fg-1">{stats.total}</p>
          </div>

          <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
            <p className="type-label text-fg-2 mb-2">New</p>
            <p className="type-h3 text-accent-gold">{stats.new}</p>
          </div>

          <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
            <p className="type-label text-fg-2 mb-2">Under Review</p>
            <p className="type-h3 text-yellow-500">{stats.underReview}</p>
          </div>

          <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
            <p className="type-label text-fg-2 mb-2">Accepted</p>
            <p className="type-h3 text-green-500">{stats.accepted}</p>
          </div>

          <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
            <p className="type-label text-fg-2 mb-2">Rejected</p>
            <p className="type-h3 text-red-500">{stats.rejected}</p>
          </div>
        </div>

        {/* Submissions List */}
        <div>
          <h2 className="type-h4 text-fg-1 mb-6">Recent Submissions</h2>

          {submissions.length === 0 ? (
            <div className="bg-bg-surface-1 border border-border-default rounded-lg p-12 text-center">
              <p className="type-body-sm text-fg-2">No submissions received yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-bg-surface-1 border border-border-default rounded-lg p-6 hover:border-accent-gold/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="type-h6 text-fg-1 mb-1">
                        {submission.songwriter?.email || 'Anonymous'}
                      </h3>
                      <p className="type-body-sm text-fg-3">
                        {submission.tracks.length} track{submission.tracks.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        submission.status === 'NEW'
                          ? 'bg-blue-100 text-blue-800'
                          : submission.status === 'UNDER_REVIEW'
                            ? 'bg-yellow-100 text-yellow-800'
                            : submission.status === 'SELECTED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {submission.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  {/* Tracks */}
                  {submission.tracks.length > 0 && (
                    <div className="mb-4 pb-4 border-b border-border-default">
                      <div className="space-y-2">
                        {submission.tracks.map((track) => (
                          <div key={track.id} className="flex items-center gap-3 text-sm">
                            <span className="text-fg-2">{track.title}</span>
                            <a
                              href={track.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-gold hover:text-accent-gold-hover transition-colors"
                            >
                              Play
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Note */}
                  {submission.noteToLabel && (
                    <div>
                      <p className="type-label text-fg-2 mb-2">Note</p>
                      <p className="type-body-sm text-fg-2">{submission.noteToLabel}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
