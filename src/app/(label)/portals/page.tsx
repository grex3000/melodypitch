import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LabelPortalsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const label = await db.label.findUnique({
    where: { userId: session.user.id },
    include: {
      portals: {
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { submissions: true } },
        },
      },
    },
  });

  if (!label) redirect("/login");

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Portals</h1>
          <p className="text-sm text-[#78716c] mt-0.5">Submission portals for your label</p>
        </div>
        <Link
          href="/label/portals/new"
          className="bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-medium rounded-[0.625rem] px-4 py-2 transition-colors"
        >
          New portal
        </Link>
      </div>

      {label.portals.length === 0 ? (
        <div className="border border-dashed border-[#d6d3d1] rounded-[1.25rem] py-16 text-center">
          <p className="text-[#78716c] text-sm">No portals yet.</p>
          <Link href="/label/portals/new" className="text-[#6366f1] text-sm hover:underline mt-1 inline-block">
            Create your first portal →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {label.portals.map((portal) => (
            <div
              key={portal.id}
              className="bg-white rounded-[1rem] px-5 py-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-[#1c1917] truncate">{portal.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    portal.isPublic
                      ? "bg-green-50 text-green-700"
                      : "bg-orange-50 text-orange-700"
                  }`}>
                    {portal.isPublic ? "Public" : "Invite-only"}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#f5f5f4] text-[#78716c] font-medium">
                    {portal.type === "GENERAL" ? "General" : "Project"}
                  </span>
                </div>
                <p className="text-xs text-[#78716c] mt-0.5">
                  /p/{portal.slug} · {portal._count.submissions} submission{portal._count.submissions !== 1 ? "s" : ""}
                </p>
              </div>
              <a
                href={`/p/${portal.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#6366f1] hover:underline shrink-0"
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
