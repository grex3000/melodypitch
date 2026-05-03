import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-context';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let portals;

    if (currentUser.role === 'LABEL') {
      // Get portals created by this label
      portals = await db.portal.findMany({
        where: {
          label: {
            userId: currentUser.id,
          },
        },
        include: {
          _count: {
            select: { submissions: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else if (currentUser.role === 'SONGWRITER') {
      // Get public portals available to submit to
      portals = await db.portal.findMany({
        where: { isPublic: true },
        include: {
          label: true,
          _count: {
            select: { submissions: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({
      portals: portals.map((p) => ({
        ...p,
        createdAt: p.createdAt.toISOString(),
        deadline: p.deadline?.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Error fetching portals:', error);
    return NextResponse.json({ error: 'Failed to fetch portals' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'LABEL') {
      return NextResponse.json({ error: 'Only labels can create portals' }, { status: 403 });
    }

    const body = await request.json();
    const { name, brief, deadline, type, bgImageUrl } = body;

    if (!name) {
      return NextResponse.json({ error: 'Portal name is required' }, { status: 400 });
    }

    // Get or create label profile
    let label = await db.label.findUnique({
      where: { userId: currentUser.id },
    });

    if (!label) {
      label = await db.label.create({
        data: {
          userId: currentUser.id,
          name: currentUser.name,
        },
      });
    }

    // Create portal
    const portal = await db.portal.create({
      data: {
        labelId: label.id,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        brief: brief || null,
        deadline: deadline ? new Date(deadline) : null,
        type: type || 'GENERAL',
        bgImageUrl: bgImageUrl || null,
        isPublic: true,
      },
    });

    return NextResponse.json(
      {
        portal: {
          ...portal,
          createdAt: portal.createdAt.toISOString(),
          deadline: portal.deadline?.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating portal:', error);
    return NextResponse.json({ error: 'Failed to create portal' }, { status: 500 });
  }
}
