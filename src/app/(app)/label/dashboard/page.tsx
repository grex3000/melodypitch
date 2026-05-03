import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function LabelDashboard() {
  const user = await db.user.findFirst({
    where: { role: 'LABEL' },
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
      <h1 className="type-h1">Overview</h1>
      <p className="type-body-sm fg-3 mt-1">Welcome to your label dashboard.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-bg-surface-1 p-6 rounded-xl">
          <div className="text-3xl font-bold fg-1">{portalCount}</div>
          <div className="type-body-sm fg-3 mt-1">Active Portals</div>
        </div>
        <div className="bg-bg-surface-1 p-6 rounded-xl">
          <div className="text-3xl font-bold fg-1">{submissionCount}</div>
          <div className="type-body-sm fg-3 mt-1">Total Submissions</div>
        </div>
        <div className="bg-bg-surface-1 p-6 rounded-xl">
          <div className="text-3xl font-bold fg-1">{pitchCount}</div>
          <div className="type-body-sm fg-3 mt-1">Pitch Packages</div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <a href="/label/portals" className="btn btn-primary">
          Manage Portals
        </a>
        <a href="/label/library" className="btn btn-secondary">
          View Library
        </a>
      </div>
    </div>
  );
}
