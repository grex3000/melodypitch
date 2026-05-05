import { getCurrentUser } from "@/lib/auth-context";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getPitchPackagesForArtist } from "@/lib/pitches";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ArtistDashboard() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ARTIST") redirect("/login");

  const member = await db.artistMember.findUnique({
    where: { userId: user.id },
    include: { artist: true },
  });
  if (!member) redirect("/login");

  const packages = await getPitchPackagesForArtist(member.artistId);

  const totals = packages.reduce(
    (acc, pkg) => {
      pkg.items.forEach((item) => {
        acc[item.verdict]++;
      });
      return acc;
    },
    { APPROVED: 0, HOLD: 0, DECLINED: 0, PENDING: 0 }
  );

  return (
    <div className="min-h-[100dvh] bg-bg-base px-8 py-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <h1 className="type-h2 text-fg-1 mb-2">Pitch Packages</h1>
          <p className="type-body-sm text-fg-2">
            Demos pitched to {member.artist.name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Packages", value: packages.length, className: "text-fg-1" },
            { label: "Approved", value: totals.APPROVED, className: "text-green-400" },
            { label: "On Hold", value: totals.HOLD, className: "text-amber-400" },
            { label: "Pending Review", value: totals.PENDING, className: "text-fg-1" },
          ].map(({ label, value, className }) => (
            <div
              key={label}
              className="bg-bg-surface-1 border border-border-default rounded-lg p-6"
            >
              <p className="type-label text-fg-2 mb-2">{label}</p>
              <p className={`type-h3 ${className}`}>{value}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="type-h4 text-fg-1 mb-6">Pitch Packages</h2>
          {packages.length === 0 ? (
            <div className="bg-bg-surface-1 border border-border-default rounded-lg p-12 text-center">
              <p className="type-body-sm text-fg-2">
                No pitch packages received yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {packages.map((pkg) => {
                const pending = pkg.items.filter(
                  (i) => i.verdict === "PENDING"
                ).length;
                return (
                  <Link
                    key={pkg.id}
                    href={`/artist/pitches/${pkg.id}`}
                    className="block bg-bg-surface-1 border border-border-default rounded-lg p-6 hover:border-accent-gold/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="type-h6 text-fg-1 mb-1">{pkg.name}</h3>
                        <p className="type-body-sm text-fg-3">
                          {pkg.items.length} track
                          {pkg.items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      {pending > 0 && (
                        <span className="px-2.5 py-1 rounded-full bg-accent-gold/10 text-accent-gold text-xs font-medium shrink-0">
                          {pending} to review
                        </span>
                      )}
                    </div>
                    {pkg.note && (
                      <p className="type-body-sm text-fg-3 mt-3 line-clamp-2">
                        {pkg.note}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
