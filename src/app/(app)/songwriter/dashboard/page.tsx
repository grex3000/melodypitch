import { getCurrentUser } from '@/lib/auth-context';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import SubmissionsList from '@/components/dashboard/SubmissionsList';

export const dynamic = 'force-dynamic';

export default async function SongwriterDashboard() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'SONGWRITER') redirect('/login');

  const songwriter = await db.songwriter.findUnique({ where: { userId: user.id } });
  if (!songwriter) redirect('/login');

  const submissions = await db.submission.findMany({
    where: { songwriterId: songwriter.id },
    include: { tracks: true },
    orderBy: { createdAt: 'desc' },
  });

  const serialized = submissions.map((sub) => ({
    ...sub,
    createdAt: sub.createdAt.toISOString(),
  }));

  return (
    <div className="bg-bg-base min-h-[100dvh] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="type-h2 text-fg-1 mb-2">My Submissions</h1>
        <p className="type-body-sm text-fg-2 mb-8">
          Track your submissions to labels and see feedback.
        </p>
        <SubmissionsList submissions={serialized} />
      </div>
    </div>
  );
}
