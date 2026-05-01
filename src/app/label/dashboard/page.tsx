import { db } from '@/lib/db'

export default async function LabelDashboard() {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session?.user?.email) return <div>Loading...</div>

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { label: { include: { portals: true, pitchPackages: true } } }
  })

  if (!user?.label) return <div>Label profile not found</div>

  const portalCount = user.label.portals.length
  const pitchCount = user.label.pitchPackages.length

  // Get submission count across all portals
  const submissionCount = await db.submission.count({
    where: { portal: { labelId: user.label.id } }
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
      <p className="text-sm text-[#78716c] mt-1">Welcome to your label dashboard.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-3xl font-bold">{portalCount}</div>
          <div className="text-sm text-[#78716c] mt-1">Active Portals</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-3xl font-bold">{submissionCount}</div>
          <div className="text-sm text-[#78716c] mt-1">Total Submissions</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-3xl font-bold">{pitchCount}</div>
          <div className="text-sm text-[#78716c] mt-1">Pitch Packages</div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <a href="/label/portals" className="px-4 py-2 bg-[#6366f1] text-white rounded-lg text-sm hover:bg-[#4f46e5]">
          Manage Portals
        </a>
        <a href="/label/library" className="px-4 py-2 border border-[#6366f1] text-[#6366f1] rounded-lg text-sm hover:bg-[#6366f1]/10">
          View Library
        </a>
      </div>
    </div>
  );
}
