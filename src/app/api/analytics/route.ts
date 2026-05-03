import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-context';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let analytics: any = {};

    if (currentUser.role === 'SONGWRITER') {
      // Songwriter analytics
      const submissions = await db.submission.findMany({
        where: {
          songwriter: {
            userId: currentUser.id,
          },
        },
        select: {
          id: true,
          status: true,
          createdAt: true,
          _count: {
            select: { comments: true },
          },
        },
      });

      const statusCounts = submissions.reduce(
        (acc, sub) => {
          acc[sub.status] = (acc[sub.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      analytics = {
        totalSubmissions: submissions.length,
        statusBreakdown: statusCounts,
        totalComments: submissions.reduce((sum, s) => sum + (s._count?.comments || 0), 0),
        averageCommentsPerSubmission:
          submissions.length > 0
            ? (submissions.reduce((sum, s) => sum + (s._count?.comments || 0), 0) / submissions.length).toFixed(1)
            : 0,
      };
    } else if (currentUser.role === 'LABEL') {
      // Label analytics
      const label = await db.label.findUnique({
        where: { userId: currentUser.id },
      });

      if (!label) {
        return NextResponse.json({ analytics: {} });
      }

      const submissions = await db.submission.findMany({
        where: {
          portal: {
            labelId: label.id,
          },
        },
        select: {
          id: true,
          status: true,
          createdAt: true,
          tracks: { select: { id: true } },
          _count: {
            select: { comments: true },
          },
        },
      });

      const portals = await db.portal.findMany({
        where: { labelId: label.id },
        select: { id: true, name: true },
      });

      const statusCounts = submissions.reduce(
        (acc, sub) => {
          acc[sub.status] = (acc[sub.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const recentSubmissions = submissions.filter((s) => new Date(s.createdAt) > sevenDaysAgo)
        .length;

      analytics = {
        totalSubmissions: submissions.length,
        totalPortals: portals.length,
        statusBreakdown: statusCounts,
        totalTracks: submissions.reduce((sum, s) => sum + (s.tracks?.length || 0), 0),
        recentSubmissions7Days: recentSubmissions,
        totalComments: submissions.reduce((sum, s) => sum + (s._count?.comments || 0), 0),
        averageCommentsPerSubmission:
          submissions.length > 0
            ? (submissions.reduce((sum, s) => sum + (s._count?.comments || 0), 0) / submissions.length).toFixed(1)
            : 0,
      };
    }

    return NextResponse.json({ analytics });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
