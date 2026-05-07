import { getCurrentUser } from "@/lib/auth-context";
import { db } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { getLabelForUser } from "@/lib/label-context";
import { getPitchPackage } from "@/lib/pitches";
import Link from "next/link";

export const dynamic = "force-dynamic";

const VERDICT_STYLES = {
  APPROVED: { label: "Approved", className: "bg-green-500/10 text-green-400" },
  HOLD: { label: "Hold", className: "bg-amber-500/10 text-amber-400" },
  DECLINED: { label: "Declined", className: "bg-red-500/10 text-red-400" },
  PENDING: { label: "Pending", className: "bg-bg-surface-2 text-fg-3" },
} as const;

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default async function LabelPitchDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== "LABEL") redirect("/login");

  const label = await getLabelForUser(user.id);
  if (!label) redirect("/login");

  const pkg = await getPitchPackage(params.id);
  if (!pkg || pkg.labelId !== label.id) notFound();

  const counts = { APPROVED: 0, HOLD: 0, DECLINED: 0, PENDING: 0 };
  pkg.items.forEach((item) => {
    counts[item.verdict]++;
  });

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-2">
        <Link
          href="/label/pitches"
          className="type-body-sm text-fg-3 hover:text-fg-1 transition-colors"
        >
          ← Pitch CRM
        </Link>
      </div>

      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="type-h1">{pkg.name}</h1>
          <p className="type-body-sm text-fg-3 mt-1">
            Pitched to {pkg.artist.name}
          </p>
        </div>
        <div className="flex gap-3 text-sm shrink-0 font-mono">
          <span className="text-green-400">{counts.APPROVED} approved</span>
          <span className="text-amber-400">{counts.HOLD} hold</span>
          <span className="text-red-400">{counts.DECLINED} declined</span>
          <span className="text-fg-3">{counts.PENDING} pending</span>
        </div>
      </div>

      {pkg.note && (
        <div className="mb-6 p-4 bg-bg-surface-1 rounded-xl border border-border-default">
          <p className="type-body-sm text-fg-3 mb-1">Note to artist</p>
          <p className="type-body-sm text-fg-1">{pkg.note}</p>
        </div>
      )}

      <div className="space-y-4">
        {pkg.items.map((item) => {
          const verdict = VERDICT_STYLES[item.verdict];
          const songwriterName =
            item.track.submission.songwriter?.user.name ?? "Anonymous";

          return (
            <div key={item.id} className="card">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="type-label text-fg-1">{item.track.title}</h3>
                  <p className="type-body-sm text-fg-3">{songwriterName}</p>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {item.track.genres.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 rounded-full bg-bg-surface-2 text-xs text-fg-2"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {item.artistRating != null && (
                    <span className="text-sm text-fg-2">
                      {"★".repeat(item.artistRating)}
                      {"☆".repeat(5 - item.artistRating)}
                    </span>
                  )}
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${verdict.className}`}
                  >
                    {verdict.label}
                  </span>
                </div>
              </div>

              {item.comments.length > 0 && (
                <div className="border-t border-border-default pt-3 space-y-2">
                  {item.comments.map((c) => (
                    <div key={c.id} className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-accent-gold/20 shrink-0 flex items-center justify-center text-xs text-fg-2 font-medium">
                        {c.author.name[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-fg-1">
                            {c.author.name}
                          </span>
                          {c.timestampSec != null && (
                            <span className="text-xs text-fg-3 font-mono">
                              ▶ {formatTime(c.timestampSec)}
                            </span>
                          )}
                        </div>
                        <p className="type-body-sm text-fg-2 mt-0.5">{c.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
