import { db } from "@/lib/db";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function LabelPortalsPage() {
  const user = await db.user.findFirst({
    where: { role: 'LABEL' },
    include: {
      label: {
        include: {
          portals: {
            orderBy: { createdAt: "desc" },
            include: {
              _count: { select: { submissions: true } },
            },
          },
        },
      },
    },
  });

  if (!user?.label) return <div>Label profile not found</div>;

  const label = user.label;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="type-h1">Portals</h1>
          <p className="type-body-sm fg-3 mt-0.5">Submission portals for your label</p>
        </div>
        <Link
          href="/label/portals/new"
          className="btn btn-primary"
        >
          New portal
        </Link>
      </div>

      {label.portals.length === 0 ? (
        <div className="border border-dashed border-border-subtle rounded-lg py-16 text-center">
          <p className="fg-3 type-body-sm">No portals yet.</p>
          <Link href="/label/portals/new" className="accent-gold type-body-sm hover:underline mt-1 inline-block">
            Create your first portal →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {label.portals.map((portal) => (
            <div
              key={portal.id}
              className="bg-bg-surface-1 rounded-lg px-5 py-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="type-label fg-1 truncate">{portal.name}</span>
                  <span className={`type-label px-2 py-0.5 rounded-pill font-medium ${
                    portal.isPublic
                      ? "status-passed"
                      : "status-pending"
                  }`}>
                    {portal.isPublic ? "Public" : "Invite-only"}
                  </span>
                  <span className="type-label px-2 py-0.5 rounded-pill bg-bg-surface-2 fg-3">
                    {portal.type === "GENERAL" ? "General" : "Project"}
                  </span>
                </div>
                <p className="type-label fg-3 mt-0.5">
                  /p/{portal.slug} · {portal._count.submissions} submission{portal._count.submissions !== 1 ? "s" : ""}
                </p>
              </div>
              <a
                href={`/p/${portal.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="type-label accent-gold hover:underline shrink-0"
              >
                Open portal ↗
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
