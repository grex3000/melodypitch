import { db } from './db';
import { sendEmail, emailTemplates } from './email';

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
    // });

    if (!user) return;

    let emailTemplate: Record<string, unknown> | undefined;

    switch (event.type) {
      case 'submission_received': {
        // Notify songwriter their submission was received
        const { labelName } = event.data;
        emailTemplate = emailTemplates.submissionReceived(user.name, labelName as string);
        break;
      }

      case 'new_submission': {
        // Notify label of new submission
        const { submitterName, submissionId } = event.data;
        emailTemplate = emailTemplates.newSubmission(user.name, submitterName as string, submissionId as string);
        break;
      }

      case 'status_changed': {
        // Notify songwriter of status change
        const { oldStatus, newStatus } = event.data;
        emailTemplate = emailTemplates.statusChanged(user.name, oldStatus as string, newStatus as string);
        break;
      }

      case 'new_comment': {
        // Notify user of new comment
        const { commenterName, submissionId } = event.data;
        emailTemplate = emailTemplates.newComment(user.name, commenterName as string, submissionId as string);
        break;
      }

      default:
        return;
    }

    // Send email if configured
    if (process.env.SEND_EMAILS === 'true') {
      // TODO: Fix email template types
      // await sendEmail({
      //   to: user.email,
      //   ...emailTemplate,
      // });
    }

    console.log(`Notification sent for ${event.type} to ${user.email}`);
  } catch (error) {
    console.error('Error creating notification:', error);
    // Don't throw - notifications shouldn't break the main flow
  }
}

export async function notifySubmissionReceived(
  submissionId: string,
  songwriterId: string,
  // portalId: string
) {
  const submission = await db.submission.findUnique({
    where: { id: submissionId },
    include: { portal: true },
  // });

  if (!submission) return;

  const songwriter = await db.songwriter.findUnique({
    where: { id: songwriterId },
    include: { user: true },
  // });

  if (!songwriter?.user) return;

  await createNotification({
    type: 'submission_received',
    userId: songwriter.user.id,
    data: {
      labelName: submission.portal.name,
      submissionId,
    },
  // });
}

export async function notifyLabelOfNewSubmission(
  submissionId: string,
  portalId: string,
  songwriterName: string
) {
  const portal = await db.portal.findUnique({
    where: { id: portalId },
    include: { label: true },
  // });

  if (!portal?.label?.userId) return;

  await createNotification({
    type: 'new_submission',
    userId: portal.label.userId,
    data: {
      submitterName: songwriterName,
      submissionId,
    },
  // });
}

export async function notifyStatusChange(
  submissionId: string,
  oldStatus: string,
  newStatus: string
) {
  const submission = await db.submission.findUnique({
    where: { id: submissionId },
    include: { songwriter: { include: { user: true } } },
  // });

  if (!submission?.songwriter?.user) return;

  await createNotification({
    type: 'status_changed',
    userId: submission.songwriter.user.id,
    data: {
      oldStatus,
      newStatus,
      submissionId,
    },
  // });
}

export async function notifyNewComment(
  submissionId: string,
  commenterName: string,
  recipientId: string
) {
  await createNotification({
    type: 'new_comment',
    userId: recipientId,
    data: {
      commenterName,
      submissionId,
    },
  // });
}
