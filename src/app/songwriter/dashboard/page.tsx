import { createServerComponentClient } from '@supabase/auth-helpers-nextjs/nextjs'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

const STATUS_STEPS = ['NEW', 'REVIEWED', 'SHORTLISTED', 'PITCHED'] as const

export default async function SongwriterDashboard() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user?.email) return <div>Loading...</div>

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { songwriter: true }
  })

  if (!user?.songwriter) return <div>Songwriter profile not found</div>

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
      <h1 className="text-2xl font-semibold tracking-tight">My Submissions</h1>
      <p className="text-sm text-[#78716c] mt-1">Track the status of your demos here.</p>

      {submissions.length === 0 ? (
        <div className="mt-8 text-center py-12 text-[#78716c]">
          No submissions yet. Submit demos via portal links.
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {submissions.map((sub) => (
            <div key={sub.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{sub.portal.name}</h3>
                  <p className="text-sm text-[#78716c]">
                    {sub.tracks.length} tracks • {new Date(sub.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Status Progress Bar */}
              <div className="flex items-center gap-1 mt-4">
                {STATUS_STEPS.map((step, idx) => {
                  const currentIdx = STATUS_STEPS.indexOf(sub.status)
                  const isActive = idx <= currentIdx
                  return (
                    <div key={step} className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        isActive ? 'bg-[#6366f1] text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {idx + 1}
                      </div>
                      {idx < STATUS_STEPS.length - 1 && (
                        <div className={`h-1 w-8 ${
                          idx < currentIdx ? 'bg-[#6366f1]' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between mt-1">
                {STATUS_STEPS.map((step) => (
                  <span key={step} className="text-xs text-[#78716c]">{step}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
