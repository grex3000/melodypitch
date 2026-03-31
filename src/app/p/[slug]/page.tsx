import { notFound } from "next/navigation";
import { getPortalBySlug, validateInviteToken } from "@/lib/portals";
import PortalBackground from "@/components/portal/PortalBackground";
import SubmissionForm from "@/components/portal/SubmissionForm";

interface Props {
  params: { slug: string };
  searchParams: { token?: string };
}

export default async function PortalPage({ params, searchParams }: Props) {
  const portal = await getPortalBySlug(params.slug);

  if (!portal) notFound();

  // Private portal access check
  if (!portal.isPublic) {
    const token = searchParams.token ?? "";
    const hasAccess = token ? await validateInviteToken(params.slug, token) : false;

    if (!hasAccess) {
      return (
        <PortalBackground imageUrl={portal.bgImageUrl} blurPx={portal.bgBlurPx}>
          <header className="h-14 flex items-center px-6">
            <span className="text-white/90 font-semibold text-sm tracking-tight">
              {portal.label.name}
            </span>
          </header>
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.25rem] p-8 max-w-sm w-full text-center">
              <h1 className="text-white text-xl font-semibold mb-2">Access restricted</h1>
              <p className="text-white/70 text-sm">
                This portal is invite-only. Check your email for a private link.
              </p>
            </div>
          </div>
        </PortalBackground>
      );
    }
  }

  return (
    <PortalBackground imageUrl={portal.bgImageUrl} blurPx={portal.bgBlurPx}>
      {/* Topbar */}
      <header className="h-14 flex items-center px-6 shrink-0">
        <span className="text-white/90 font-semibold text-sm tracking-tight">
          {portal.label.name}
        </span>
      </header>

      {/* Upload card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <SubmissionForm
          portalId={portal.id}
          portalName={portal.name}
          brief={portal.brief ?? undefined}
          deadline={portal.deadline?.toISOString() ?? undefined}
        />
      </div>
    </PortalBackground>
  );
}
