import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-context';

export async function GET(_request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let submissions;

    // Get submissions based on user role
    if (currentUser.role === 'SONGWRITER') {
      // Get submissions by this songwriter
      submissions = await db.submission.findMany({
        where: {
          songwriter: {
            userId: currentUser.id,
          },
        },
        include: {
          tracks: true,
          portal: true,
          comments: {
            select: { id: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
    } else if (currentUser.role === 'LABEL') {
      // Get submissions to this label's portals
      submissions = await db.submission.findMany({
        where: {
          portal: {
            label: {
              userId: currentUser.id,
            },
          },
        },
        include: {
          tracks: true,
          portal: true,
          comments: {
            select: { id: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
    } else {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({
      submissions: submissions.map((s) => ({
        ...s,
        createdAt: s.createdAt.toISOString(),
        updatedAt: s.updatedAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (currentUser.role !== 'SONGWRITER') {
      return NextResponse.json({ error: 'Only songwriters can submit' }, { status: 403 });
    }

    const body = await request.json();
    const { portalId, noteToLabel, tracks } = body;

    if (!portalId || !Array.isArray(tracks) || tracks.length === 0) {
      return NextResponse.json(
        { error: 'Portal ID and at least one track is required' },
        { status: 400 }
      );
    }

    // Get or create songwriter profile
    let songwriter = await db.songwriter.findUnique({
      where: { userId: currentUser.id },
    });

    if (!songwriter) {
      songwriter = await db.songwriter.create({
        data: { userId: currentUser.id },
      });
    }

    // Create submission
    const submission = await db.submission.create({
      data: {
        portalId,
        songwriterId: songwriter.id,
        noteToLabel: noteToLabel || null,
        tracks: {
          create: tracks.map((track: Record<string, unknown>) => ({
            title: track.title,
            fileUrl: track.fileUrl,
            fileSizeBytes: track.fileSizeBytes || 0,
            durationSecs: track.durationSecs,
            genres: track.genres || [],
            moods: track.moods || [],
          })),
        },
      },
      include: {
        tracks: true,
      },
    });

    return NextResponse.json(
      {
        submission: {
          ...submission,
          createdAt: submission.createdAt.toISOString(),
          updatedAt: submission.updatedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
  }
}
