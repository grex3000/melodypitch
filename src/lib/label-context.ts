import { db } from './db';

export async function getLabelForUser(userId: string) {
  const direct = await db.label.findUnique({ where: { userId } });
  if (direct) return direct;
  const membership = await db.labelMember.findUnique({
    where: { userId },
    include: { label: true },
  });
  return membership?.label ?? null;
}
