import { db } from '@/lib/db';
import SubmissionsList from '@/components/dashboard/SubmissionsList';

async function getSongwriterSubmissions() {
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
    console.error('Failed to fetch submissions:', error);
    return [];
  }
}

export default async function SongwriterDashboard() {
  const submissions = await getSongwriterSubmissions();

  return (
    <div className="bg-bg-base min-h-[100dvh] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="type-h2 text-fg-1 mb-2">My Submissions</h1>
        <p className="type-body-sm text-fg-2 mb-8">
          Track your submissions to labels and see feedback.
        </p>

        <SubmissionsList submissions={submissions} />
      </div>
    </div>
  );
}
