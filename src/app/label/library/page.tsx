import { createServerComponentClient } from '@supabase/auth-helpers-nextjs/nextjs'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import TrackRow from '@/components/portal/TrackRow'

export default async function LabelLibrary() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user?.email) return <div>Loading...</div>

  const user = await db.user.findUnique({
    where: { email: session.user.email },
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
      <h1 className="text-2xl font-semibold tracking-tight">Demo Library</h1>
      <p className="text-sm text-[#78716c] mt-1">Manage all submitted demos</p>

      {submissions.length === 0 ? (
        <div className="mt-8 text-center py-12 text-[#78716c]">
          No submissions yet. Create a portal to start receiving demos.
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {submissions.map((sub) => (
            <div key={sub.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{sub.portal.name}</h3>
                  <p className="text-sm text-[#78716c]">
                    From: {sub.songwriter?.user?.name || 'Unknown'} • {new Date(sub.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  sub.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                  sub.status === 'REVIEWED' ? 'bg-yellow-100 text-yellow-800' :
                  sub.status === 'SHORTLISTED' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {sub.status}
                </span>
              </div>
              <div className="space-y-2">
                {sub.tracks.map((track) => (
                  <div key={track.id} className="flex items-center gap-4 p-3 bg-[#fafaf9] rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{track.title}</div>
                      <div className="text-xs text-[#78716c]">
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
