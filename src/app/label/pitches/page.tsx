import { createServerComponentClient } from '@supabase/auth-helpers-nextjs/nextjs'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

export default async function LabelPitches() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user?.email) return <div>Loading...</div>

  const user = await db.user.findUnique({
    where: { email: session.user.email },
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
          <h1 className="text-2xl font-semibold tracking-tight">Pitch CRM</h1>
          <p className="text-sm text-[#78716c] mt-1">Manage pitches to artists</p>
        </div>
        <button className="px-4 py-2 bg-[#6366f1] text-white rounded-lg text-sm hover:bg-[#4f46e5]">
          New Pitch Package
        </button>
      </div>

      {pitchPackages.length === 0 ? (
        <div className="mt-8 text-center py-12 text-[#78716c]">
          No pitch packages yet. Create one to pitch demos to artists.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {pitchPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{pkg.name}</h3>
                  <p className="text-sm text-[#78716c]">To: {pkg.artist.name}</p>
                </div>
                <span className="text-sm text-[#78716c]">
                  {pkg.items.length} tracks
                </span>
              </div>
              {pkg.note && (
                <p className="mt-2 text-sm text-[#78716c]">{pkg.note}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
