import { getCurrentUser } from "@/lib/auth-context";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function LabelAnalytics() {
  const user = await getCurrentUser();
  if (!user || user.role !== "LABEL") redirect("/login");

  const label = await db.label.findUnique({ where: { userId: user.id } });
  if (!label) redirect("/login");

  // ── Overview counts ──────────────────────────────────────────────────────────
  const submissions = await db.submission.findMany({
    where: { portal: { labelId: label.id } },
    select: { createdAt: true, status: true },
  });

  const statusCounts = submissions.reduce((acc, sub) => {
    acc[sub.status] = (acc[sub.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const monthlyStats = submissions.reduce((acc, sub) => {
    const month = new Date(sub.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // ── Top genres ───────────────────────────────────────────────────────────────
  const tracks = await db.track.findMany({
    where: { submission: { portal: { labelId: label.id } } },
    select: { genres: true, rating: true },
  });
  const genreCounts = tracks.flatMap(t => t.genres).reduce((acc, g) => {
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // ── Songwriter performance ───────────────────────────────────────────────────
  const songwriterSubmissions = await db.submission.findMany({
    where: {
      portal: { labelId: label.id },
      songwriterId: { not: null },
    },
    include: {
      songwriter: { include: { user: { select: { name: true } } } },
      tracks: { select: { rating: true } },
    },
  });

  type SongwriterRow = {
    name: string;
    total: number;
    avgRating: number | null;
    pitchRate: number;
    shortlistRate: number;
  };

  const songwriterMap = new Map<string, SongwriterRow>();
  for (const sub of songwriterSubmissions) {
    if (!sub.songwriter) continue;
    const name = sub.songwriter.user.name;
    const existing = songwriterMap.get(name) ?? { name, total: 0, avgRating: null, pitchRate: 0, shortlistRate: 0, _ratingSum: 0, _ratingCount: 0, _pitched: 0, _shortlisted: 0 } as SongwriterRow & { _ratingSum: number; _ratingCount: number; _pitched: number; _shortlisted: number };
    existing.total++;
    if (sub.status === 'PITCHED') (existing as any)._pitched++;
    if (sub.status === 'SHORTLISTED' || sub.status === 'PITCHED') (existing as any)._shortlisted++;
    for (const t of sub.tracks) {
      if (t.rating != null) {
        (existing as any)._ratingSum += t.rating;
        (existing as any)._ratingCount++;
      }
    }
    songwriterMap.set(name, existing);
  }

  const songwriterRows: SongwriterRow[] = Array.from(songwriterMap.values()).map((r: any) => ({
    name: r.name,
    total: r.total,
    avgRating: r._ratingCount > 0 ? Math.round((r._ratingSum / r._ratingCount) * 10) / 10 : null,
    pitchRate: r.total > 0 ? Math.round((r._pitched / r.total) * 100) : 0,
    shortlistRate: r.total > 0 ? Math.round((r._shortlisted / r.total) * 100) : 0,
  })).sort((a, b) => b.shortlistRate - a.shortlistRate || b.total - a.total).slice(0, 10);

  // ── Artist responsiveness ────────────────────────────────────────────────────
  const pitchPackages = await db.pitchPackage.findMany({
    where: { labelId: label.id },
    include: {
      artist: { select: { name: true } },
      items: {
        include: { comments: { select: { id: true } } },
      },
    },
  });

  type ArtistRow = {
    name: string;
    totalItems: number;
    approved: number;
    hold: number;
    declined: number;
    pending: number;
    approvalRate: number;
    responseRate: number;
    comments: number;
  };

  const artistMap = new Map<string, ArtistRow>();
  for (const pkg of pitchPackages) {
    const name = pkg.artist.name;
    const row = artistMap.get(name) ?? { name, totalItems: 0, approved: 0, hold: 0, declined: 0, pending: 0, approvalRate: 0, responseRate: 0, comments: 0 };
    for (const item of pkg.items) {
      row.totalItems++;
      if (item.verdict === 'APPROVED') row.approved++;
      else if (item.verdict === 'HOLD') row.hold++;
      else if (item.verdict === 'DECLINED') row.declined++;
      else row.pending++;
      row.comments += item.comments.length;
    }
    artistMap.set(name, row);
  }
  const artistRows: ArtistRow[] = Array.from(artistMap.values()).map(r => ({
    ...r,
    approvalRate: r.totalItems > 0 ? Math.round((r.approved / r.totalItems) * 100) : 0,
    responseRate: r.totalItems > 0 ? Math.round(((r.totalItems - r.pending) / r.totalItems) * 100) : 0,
  })).sort((a, b) => b.responseRate - a.responseRate || b.totalItems - a.totalItems);

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="type-h1 text-fg-1">Analytics</h1>
      <p className="type-body-sm text-fg-3 mt-1 mb-8">Submission trends and pipeline insights</p>

      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: submissions.length },
          { label: 'New', value: statusCounts['NEW'] || 0 },
          { label: 'Shortlisted', value: statusCounts['SHORTLISTED'] || 0 },
          { label: 'Pitched', value: statusCounts['PITCHED'] || 0 },
        ].map(({ label, value }) => (
          <div key={label} className="bg-bg-surface-1 border border-border-default rounded-xl p-5">
            <div className="text-3xl font-bold text-fg-1">{value}</div>
            <div className="type-body-sm text-fg-3 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Monthly + Top Genres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-bg-surface-1 border border-border-default rounded-xl p-5">
          <h3 className="type-label text-fg-1 mb-4">Submissions by month</h3>
          {Object.keys(monthlyStats).length === 0 ? (
            <p className="type-body-sm text-fg-3">No data yet</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(monthlyStats).map(([month, count]) => (
                <div key={month} className="flex justify-between items-center">
                  <span className="type-body-sm text-fg-2">{month}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-border-default rounded-full overflow-hidden">
                      <div className="h-full bg-accent-gold rounded-full" style={{ width: `${Math.round((count / submissions.length) * 100)}%` }} />
                    </div>
                    <span className="type-body-sm text-fg-1 font-mono w-6 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-bg-surface-1 border border-border-default rounded-xl p-5">
          <h3 className="type-label text-fg-1 mb-4">Top genres</h3>
          {topGenres.length === 0 ? (
            <p className="type-body-sm text-fg-3">No data yet</p>
          ) : (
            <div className="space-y-2">
              {topGenres.map(([genre, count]) => (
                <div key={genre} className="flex justify-between items-center">
                  <span className="type-body-sm text-fg-2">{genre}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-border-default rounded-full overflow-hidden">
                      <div className="h-full bg-accent-gold rounded-full" style={{ width: `${Math.round((count / tracks.length) * 100)}%` }} />
                    </div>
                    <span className="type-body-sm text-fg-1 font-mono w-6 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Songwriter performance */}
      <section className="mb-8">
        <h2 className="type-label text-fg-1 mb-3">Songwriter performance</h2>
        {songwriterRows.length === 0 ? (
          <div className="bg-bg-surface-1 border border-border-default rounded-xl p-5">
            <p className="type-body-sm text-fg-3">No songwriter data yet</p>
          </div>
        ) : (
          <div className="bg-bg-surface-1 border border-border-default rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-default text-fg-3">
                  <th className="text-left px-4 py-3 font-medium">Songwriter</th>
                  <th className="text-right px-4 py-3 font-medium">Submissions</th>
                  <th className="text-right px-4 py-3 font-medium">Avg rating</th>
                  <th className="text-right px-4 py-3 font-medium">Shortlist rate</th>
                  <th className="text-right px-4 py-3 font-medium">Pitch rate</th>
                </tr>
              </thead>
              <tbody>
                {songwriterRows.map((row, i) => (
                  <tr key={row.name} className={i < songwriterRows.length - 1 ? 'border-b border-border-default' : ''}>
                    <td className="px-4 py-3 text-fg-1 font-medium">{row.name}</td>
                    <td className="px-4 py-3 text-fg-2 text-right font-mono">{row.total}</td>
                    <td className="px-4 py-3 text-fg-2 text-right font-mono">
                      {row.avgRating != null ? `${row.avgRating} ★` : '—'}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      <span className={row.shortlistRate >= 50 ? 'text-green-400' : row.shortlistRate >= 20 ? 'text-amber-400' : 'text-fg-3'}>
                        {row.shortlistRate}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      <span className={row.pitchRate >= 30 ? 'text-green-400' : row.pitchRate >= 10 ? 'text-amber-400' : 'text-fg-3'}>
                        {row.pitchRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Artist responsiveness */}
      <section>
        <h2 className="type-label text-fg-1 mb-3">Artist responsiveness</h2>
        {artistRows.length === 0 ? (
          <div className="bg-bg-surface-1 border border-border-default rounded-xl p-5">
            <p className="type-body-sm text-fg-3">No pitch data yet</p>
          </div>
        ) : (
          <div className="bg-bg-surface-1 border border-border-default rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-default text-fg-3">
                  <th className="text-left px-4 py-3 font-medium">Artist</th>
                  <th className="text-right px-4 py-3 font-medium">Tracks pitched</th>
                  <th className="text-right px-4 py-3 font-medium">Response rate</th>
                  <th className="text-right px-4 py-3 font-medium">Approval rate</th>
                  <th className="text-right px-4 py-3 font-medium">Comments</th>
                </tr>
              </thead>
              <tbody>
                {artistRows.map((row, i) => (
                  <tr key={row.name} className={i < artistRows.length - 1 ? 'border-b border-border-default' : ''}>
                    <td className="px-4 py-3 text-fg-1 font-medium">{row.name}</td>
                    <td className="px-4 py-3 text-fg-2 text-right font-mono">{row.totalItems}</td>
                    <td className="px-4 py-3 text-right font-mono">
                      <span className={row.responseRate >= 80 ? 'text-green-400' : row.responseRate >= 50 ? 'text-amber-400' : 'text-fg-3'}>
                        {row.responseRate}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      <span className={row.approvalRate >= 50 ? 'text-green-400' : row.approvalRate >= 25 ? 'text-amber-400' : 'text-fg-3'}>
                        {row.approvalRate}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-fg-2 text-right font-mono">{row.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
