import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM || 'MelodyPitch <noreply@melodypitch.com>';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://melodypitch.com';

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not set — skipping send');
    return null;
  }
  const { data, error } = await resend.emails.send({ from: FROM, to, subject, html });
  if (error) console.error('[email] send error:', error);
  return data;
}

export function buildInviteUrl(slug: string, token: string) {
  return `${APP_URL}/p/${slug}?token=${token}`;
}

export function buildTeamInviteUrl(token: string) {
  return `${APP_URL}/team-invite/${token}`;
}

export const emailTemplates = {
  portalInvite: (labelName: string, portalName: string, inviteUrl: string) => ({
    subject: `${labelName} invited you to submit demos on MelodyPitch`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
        <h2 style="margin:0 0 8px">You've been invited</h2>
        <p style="color:#666;margin:0 0 24px">${labelName} has invited you to submit demos to their <strong>${portalName}</strong> portal on MelodyPitch.</p>
        <a href="${inviteUrl}" style="display:inline-block;background:#6366f1;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600">Open Portal</a>
        <p style="color:#999;font-size:12px;margin-top:24px">This link is personal to you — don't share it, it grants direct access to this portal.</p>
      </div>
    `,
  }),

  submissionReceived: (submitterName: string, labelName: string) => ({
    subject: `Your submission to ${labelName} has been received`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
        <h2>Submission Received</h2>
        <p>Hi ${submitterName},</p>
        <p>Your submission to <strong>${labelName}</strong> has been received and is now under review.</p>
        <p style="color:#666">We'll notify you when there's an update.</p>
      </div>
    `,
  }),

  newSubmission: (labelName: string, submitterName: string, libraryUrl: string) => ({
    subject: `New submission from ${submitterName}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
        <h2>New Submission</h2>
        <p>Hi ${labelName},</p>
        <p><strong>${submitterName}</strong> has submitted a new demo to your portal.</p>
        <a href="${libraryUrl}" style="display:inline-block;background:#6366f1;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600">Review in Library</a>
      </div>
    `,
  }),

  statusChanged: (submitterName: string, oldStatus: string, newStatus: string, dashboardUrl: string) => ({
    subject: `Your submission status has been updated`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
        <h2>Submission Status Updated</h2>
        <p>Hi ${submitterName},</p>
        <p>Your submission status changed: <strong>${oldStatus}</strong> → <strong>${newStatus}</strong></p>
        <a href="${dashboardUrl}" style="display:inline-block;background:#6366f1;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600">View on MelodyPitch</a>
      </div>
    `,
  }),

  pitchPackageReceived: (artistName: string, labelName: string, packageName: string, reviewUrl: string) => ({
    subject: `${labelName} sent you a new pitch package`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
        <h2>New Pitch Package</h2>
        <p>Hi ${artistName},</p>
        <p><strong>${labelName}</strong> sent you a pitch package: <strong>${packageName}</strong>.</p>
        <a href="${reviewUrl}" style="display:inline-block;background:#6366f1;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600">Review Tracks</a>
      </div>
    `,
  }),

  teamInvite: (labelName: string, inviterName: string, acceptUrl: string) => ({
    subject: `${labelName} invited you to join their MelodyPitch workspace`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
        <h2 style="margin:0 0 8px">You've been invited</h2>
        <p style="color:#666;margin:0 0 24px">${inviterName} has invited you to join <strong>${labelName}</strong>'s workspace on MelodyPitch.</p>
        <a href="${acceptUrl}" style="display:inline-block;background:#6366f1;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600">Accept Invite</a>
        <p style="color:#999;font-size:12px;margin-top:24px">This link is for you only — it will create a new account linked to ${labelName}.</p>
      </div>
    `,
  }),
};
