import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-context';

export async function GET(
  request: NextRequest,
  { params }: { params: { submissionId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { submissionId } = params;

    const submission = await db.submission.findUnique({
      where: { id: submissionId },
      include: {
        songwriter: true,
        portal: { include: { label: true } },
      },
    });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const canRead =
      (currentUser.role === 'LABEL' && submission.portal?.label?.userId === currentUser.id) ||
      (currentUser.role === 'SONGWRITER' && submission.songwriter?.userId === currentUser.id);

    if (!canRead) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const comments = await db.comment.findMany({
      where: { submissionId },
      include: {
        author: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({
      comments: comments.map((c) => ({
        id: c.id,
        body: c.body,
        author: c.author,
        createdAt: c.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { submissionId: string } }
) {
  try {
    const { submissionId } = params;

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (currentUser.role !== 'LABEL') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const submission = await db.submission.findUnique({
      where: { id: submissionId },
      include: { portal: { include: { label: true } } },
    });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    if (submission.portal?.label?.userId !== currentUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { body: commentBody } = body;

    if (!commentBody || typeof commentBody !== 'string' || !commentBody.trim()) {
      return NextResponse.json({ error: 'Comment body is required' }, { status: 400 });
    }

    const comment = await db.comment.create({
      data: {
        submissionId,
        authorId: currentUser.id,
        body: commentBody.trim(),
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json(
      {
        comment: {
          id: comment.id,
          body: comment.body,
          author: comment.author,
          createdAt: comment.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
