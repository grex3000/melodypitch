import { db } from './db';

export interface NotificationEvent {
  type: 'submission_received' | 'new_submission' | 'status_changed' | 'new_comment';
  userId: string;
  data: Record<string, unknown>;
}

export async function createNotification(event: NotificationEvent) {
  try {
    // Get user
    const user = await db.user.findUnique({
      where: { id: event.userId },
    });

    if (!user) return;

    // Log notification event
    console.log(`Notification event: ${event.type} for user ${user.email}`);
    
    // TODO: Implement email notifications in Phase 2
    // For now, just log the events
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}

export async function notifySubmissionReceived(
  submissionId: string,
  songwriterId: string
) {
  await createNotification({
    type: 'submission_received',
    userId: songwriterId,
    data: { submissionId },
  });
}

export async function notifyNewSubmission(
  submissionId: string,
  labelId: string
) {
  await createNotification({
    type: 'new_submission',
    userId: labelId,
    data: { submissionId },
  });
}

export async function notifyStatusChanged(
  submissionId: string,
  songwriterId: string,
  newStatus: string
) {
  await createNotification({
    type: 'status_changed',
    userId: songwriterId,
    data: { submissionId, newStatus },
  });
}

export async function notifyNewComment(
  submissionId: string,
  userId: string,
  commentId: string
) {
  await createNotification({
    type: 'new_comment',
    userId,
    data: { submissionId, commentId },
  });
}
