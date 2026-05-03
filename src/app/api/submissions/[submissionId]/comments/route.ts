import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: { submissionId: string } }
) {
  try {
    const { submissionId } = params;

    const comments = await db.comment.findMany({
      where: {
        submissionId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
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
    const body = await request.json();
    const { body: commentBody } = body;

    if (!commentBody || typeof commentBody !== 'string' || !commentBody.trim()) {
      return NextResponse.json({ error: 'Comment body is required' }, { status: 400 });
    }

    // In a real app, we'd get the current user from the session
    // For now, we'll need to pass it or get it from auth
    // This is a simplified implementation
    
    // Get current user from cookies (would need to decrypt/validate in production)
    const cookieStore = await cookies();
    const hasSession = cookieStore.has('sb-access-token');

    if (!hasSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In a real implementation, we'd:
    // 1. Extract user ID from JWT token
    // 2. Verify submission belongs to portal user can comment on
    // 3. Create comment

    // For now, return a placeholder
    return NextResponse.json(
      { error: 'Comment feature requires authenticated user context' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
