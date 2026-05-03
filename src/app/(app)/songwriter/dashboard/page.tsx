import { db } from '@/lib/db';
import SubmissionsList from '@/components/dashboard/SubmissionsList';

async function getSongwriterSubmissions(userId?: string) {
  try {
    // For now, get all submissions (in production, filter by logged-in user)
    const submissions = await db.submission.findMany({
      include: {
        tracks: true,
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

export default async function SongwriterDashboard() {
  const submissions = await getSongwriterSubmissions();

  return (
    <div className="min-h-[100dvh] bg-bg-base">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
        <div className="mb-8">
          <h1 className="type-h2 text-fg-1 mb-2">My Submissions</h1>
          <p className="type-body-sm text-fg-2">Track the status of your demo submissions</p>
        </div>

        <div className="grid gap-8">
          {/* Submissions List */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="type-h4 text-fg-1">Recent Submissions</h2>
              <a href="/songwriter/submit" className="btn btn-primary btn-sm">
                New Submission
              </a>
            </div>
            <SubmissionsList
              submissions={submissions}
              emptyMessage="No submissions yet. Submit your first demo to get started!"
            />
          </div>

          {/* Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
              <p className="type-label text-fg-2 mb-2">Total Submissions</p>
              <p className="type-h4 text-fg-1">{submissions.length}</p>
            </div>

            <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
              <p className="type-label text-fg-2 mb-2">Under Review</p>
              <p className="type-h4 text-fg-1">
                {submissions.filter((s) => s.status === 'UNDER_REVIEW').length}
              </p>
            </div>

            <div className="bg-bg-surface-1 border border-border-default rounded-lg p-6">
              <p className="type-label text-fg-2 mb-2">Accepted</p>
              <p className="type-h4 text-fg-1">
                {submissions.filter((s) => s.status === 'SELECTED').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
