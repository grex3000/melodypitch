import { createServerComponentClient } from '@supabase/auth-helpers-nextjs/nextjs'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

export default async function ArtistDashboard() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user?.email) return <div>Loading...</div>

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { artistMember: { include: { artist: true } } }
  })

  if (!user?.artistMember) return <div>Artist profile not found</div>

  const pitchPackages = await db.pitchPackage.findMany({
    where: { artistId: user.artistMember.artistId },
    include: {
      label: true,
      items: { 
        include: { 
          track: true,
          comments: true
        } 
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Pitch Packages</h1>
      <p className="text-sm text-[#78716c] mt-1">Review demos pitched to you here.</p>

      {pitchPackages.length === 0 ? (
        <div className="mt-8 text-center py-12 text-[#78716c]">
          No pitch packages yet. Labels will pitch demos to you.
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {pitchPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{pkg.name}</h3>
                  <p className="text-sm text-[#78716c]">From: {pkg.label.name}</p>
                </div>
                <span className="text-sm text-[#78716c]">
                  {pkg.items.length} tracks
                </span>
              </div>

              {pkg.note && (
                <p className="text-sm text-[#78716c] mb-4">{pkg.note}</p>
              )}

              <div className="space-y-3">
                {pkg.items.map((item) => (
                  <div key={item.id} className="p-3 bg-[#fafaf9] rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">{item.track.title}</div>
                        <div className="text-xs text-[#78716c]">
                          {item.track.genres.join(', ')}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.verdict === 'PENDING' ? 'bg-gray-100 text-gray-800' :
                        item.verdict === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        item.verdict === 'HOLD' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.verdict}
                      </span>
                    </div>
                    {item.comments.length > 0 && (
                      <div className="mt-2 text-xs text-[#78716c]">
                        {item.comments.length} comment(s)
                      </div>
                    )}
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
