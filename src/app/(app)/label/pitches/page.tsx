import { getCurrentUser } from "@/lib/auth-context";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getLabelForUser } from "@/lib/label-context";
import { getPitchPackagesForLabel } from "@/lib/pitches";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function LabelPitchesPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "LABEL") redirect("/login");

  const label = await getLabelForUser(user.id);
  if (!label) redirect("/login");

  const packages = await getPitchPackagesForLabel(label.id);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="type-h1">Pitch CRM</h1>
          <p className="type-body-sm text-fg-3 mt-1">Track pitches sent to artists</p>
        </div>
        <Link href="/label/library" className="btn btn-primary">
          Create from Library
        </Link>
      </div>

      {packages.length === 0 ? (
        <div className="mt-8 text-center py-16 text-fg-3">
          <p className="type-body-sm">No pitch packages yet.</p>
          <p className="type-body-sm mt-1">
            Select tracks in the Demo Library to create one.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {packages.map((pkg) => {
            const counts = { APPROVED: 0, HOLD: 0, DECLINED: 0, PENDING: 0 };
            pkg.items.forEach((item) => {
              counts[item.verdict]++;
            });
            const responded = pkg.items.length - counts.PENDING;
            const progress =
              pkg.items.length > 0
                ? Math.round((responded / pkg.items.length) * 100)
                : 0;

            return (
              <Link
                key={pkg.id}
                href={`/label/pitches/${pkg.id}`}
                className="block card hover:bg-bg-surface-2 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="type-label text-fg-1">{pkg.name}</h3>
                    <p className="type-body-sm text-fg-3 mt-0.5">
                      → {pkg.artist.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-sm font-mono">
                    <span className="text-green-400">{counts.APPROVED}✓</span>
                    <span className="text-amber-400">{counts.HOLD}◐</span>
                    <span className="text-red-400">{counts.DECLINED}✗</span>
                    <span className="text-fg-3">{counts.PENDING} pending</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="h-1 bg-border-default rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-gold rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-fg-3 mt-1 font-mono">
                    {responded}/{pkg.items.length} responded
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
