"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createPortalAction(formData: FormData) {
  const { data: { user } } = await supabaseServer.auth.getUser();
  if (!user) redirect("/login");

  let label;
  try {
    label = await db.label.findUnique({ where: { userId: user.id } });
  } catch (e) {
    // Database not set up yet
    redirect("/label/portals");
  }
  
  if (!label) redirect("/login");

  const type = formData.get("type") as "GENERAL" | "PROJECT";
  const name = (formData.get("name") as string).trim();
  const slug = (formData.get("slug") as string)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const isPublic = formData.get("isPublic") === "true";
  const brief = (formData.get("brief") as string | null)?.trim() || null;
  const deadlineRaw = formData.get("deadline") as string | null;
  const deadline = deadlineRaw ? new Date(deadlineRaw) : null;
  const bgImageUrl = (formData.get("bgImageUrl") as string | null)?.trim() || null;
  const bgBlurPx = Math.min(40, Math.max(0, Number(formData.get("bgBlurPx") ?? "5")));

  if (!name || !slug) redirect("/label/portals/new?error=missing-fields");

  const existing = await db.portal.findUnique({ where: { slug } });
  if (existing) redirect("/label/portals/new?error=slug-taken");

  await db.portal.create({
    data: { labelId: label.id, type, name, slug, isPublic, brief, deadline, bgImageUrl, bgBlurPx },
  });

  redirect("/label/portals");
}
