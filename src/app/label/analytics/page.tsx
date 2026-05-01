import { createServerComponentClient } from '@supabase/auth-helpers-nextjs/nextjs'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

export default async function LabelAnalytics() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user?.email) return <div>Loading...</div>

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { label: true }
  })

  if (!user?.label) return <div>Label profile not found</div>

  // Get submission stats by month
  const submissions = await db.submission.findMany({
    where: { portal: { labelId: user.label.id } },
    select: { createdAt: true, status: true }
  })

  // Group by month
  const monthlyStats = submissions.reduce((acc, sub) => {
    const month = new Date(sub.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' })
    acc[month] = (acc[month] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Status breakdown
  const statusCounts = submissions.reduce((acc, sub) => {
    acc[sub.status] = (acc[sub.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Top genres
  const tracks = await db.track.findMany({
    where: { submission: { portal: { labelId: user.label.id } } },
    select: { genres: true }
  })
  const genreCounts = tracks.flatMap(t => t.genres).reduce((acc, genre) => {
    acc[genre] = (acc[genre] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const topGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]).slice(0, 5)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
      <p className="text-sm text-[#78716c] mt-1">Submission trends and insights</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-3xl font-bold">{submissions.length}</div>
          <div className="text-sm text-[#78716c] mt-1">Total Submissions</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-3xl font-bold">{statusCounts['NEW'] || 0}</div>
          <div className="text-sm text-[#78716c] mt-1">New</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-3xl font-bold">{statusCounts['SHORTLISTED'] || 0}</div>
          <div className="text-sm text-[#78716c] mt-1">Shortlisted</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-3xl font-bold">{statusCounts['PITCHED'] || 0}</div>
          <div className="text-sm text-[#78716c] mt-1">Pitched</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-medium mb-4">Submissions by Month</h3>
          {Object.entries(monthlyStats).length === 0 ? (
            <div className="text-sm text-[#78716c]">No data yet</div>
          ) : (
            <div className="space-y-2">
              {Object.entries(monthlyStats).map(([month, count]) => (
                <div key={month} className="flex justify-between">
                  <span className="text-sm">{month}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-medium mb-4">Top Genres</h3>
          {topGenres.length === 0 ? (
            <div className="text-sm text-[#78716c]">No data yet</div>
          ) : (
            <div className="space-y-2">
              {topGenres.map(([genre, count]) => (
                <div key={genre} className="flex justify-between">
                  <span className="text-sm">{genre}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
