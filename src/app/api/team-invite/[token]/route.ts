import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  const invite = await db.labelTeamInvite.findUnique({
    where: { token: params.token },
    include: { label: { select: { name: true } } },
  });

  if (!invite || invite.acceptedAt) {
    return NextResponse.json({ error: 'Invalid invite' }, { status: 404 });
  }

  return NextResponse.json({
    email: invite.email,
    labelName: invite.label.name,
  });
}
