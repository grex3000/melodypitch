import { db } from "@/lib/db";
import type { Portal, Label } from "@prisma/client";

export type PortalWithLabel = Portal & { label: Pick<Label, "id" | "name" | "logoUrl"> };

export async function getPortalBySlug(slug: string): Promise<PortalWithLabel | null> {
  return db.portal.findUnique({
    where: { slug },
    include: {
      label: {
        select: { id: true, name: true, logoUrl: true },
      },
    },
  });
}

export async function validateInviteToken(slug: string, token: string): Promise<boolean> {
  const invite = await db.portalInvite.findFirst({
    where: {
      token,
      portal: { slug },
      acceptedAt: null,
    },
  });
  return invite !== null;
}
