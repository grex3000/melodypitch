import bcrypt from "bcryptjs";
import type { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function requireRole(
  allowedRoles: Role[]
): Promise<{ id: string; role: Role; email: string; name?: string | null }> {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!allowedRoles.includes(session.user.role)) {
    redirect("/login");
  }

  return {
    id: session.user.id,
    role: session.user.role,
    email: session.user.email ?? "",
    name: session.user.name,
  };
}
