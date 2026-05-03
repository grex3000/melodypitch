import nodemailer from 'nodemailer';

// For development, we'll use a console transport
// In production, use SendGrid, Mailgun, or similar
const isDevelopment = process.env.NODE_ENV === 'development';

const transporter = isDevelopment
  ? nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
    })
  : nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    if (!transporter) {
      console.warn('Email not configured');
      return;
    }

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@melodypitch.com',
      ...options,
    });

    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Email templates
export const emailTemplates = {
  submissionReceived: (submitterName: string, labelName: string) => ({
    subject: `Your submission to ${labelName} has been received`,
    html: `
      <h2>Submission Received</h2>
      <p>Hi ${submitterName},</p>
      <p>Your submission to <strong>${labelName}</strong> has been received and is now under review.</p>
      <p>We'll notify you as soon as there's any update on your submission.</p>
      <p>Best regards,<br/>The MelodyPitch Team</p>
    `,
  }),

  newSubmission: (labelName: string, submitterName: string, submissionId: string) => ({
    subject: `New submission from ${submitterName}`,
    html: `
      <h2>New Submission</h2>
      <p>Hi ${labelName},</p>
      <p><strong>${submitterName}</strong> has submitted a new demo to your portal.</p>
      <p><a href="https://melodypitch.com/submissions/${submissionId}">View Submission</a></p>
      <p>Best regards,<br/>The MelodyPitch Team</p>
    `,
  }),

  statusChanged: (submitterName: string, oldStatus: string, newStatus: string) => ({
    subject: `Your submission status has been updated`,
    html: `
      <h2>Submission Status Updated</h2>
      <p>Hi ${submitterName},</p>
      <p>Your submission status has been updated:</p>
      <p><strong>${oldStatus}</strong> → <strong>${newStatus}</strong></p>
      <p>Best regards,<br/>The MelodyPitch Team</p>
    `,
  }),

  newComment: (recipientName: string, commenterName: string, submissionId: string) => ({
    subject: `New comment on your submission`,
    html: `
      <h2>New Comment</h2>
      <p>Hi ${recipientName},</p>
      <p><strong>${commenterName}</strong> left a comment on your submission.</p>
      <p><a href="https://melodypitch.com/submissions/${submissionId}">View Submission</a></p>
      <p>Best regards,<br/>The MelodyPitch Team</p>
    `,
  }),

  welcomeEmail: (userName: string, role: string) => ({
    subject: 'Welcome to MelodyPitch!',
    html: `
      <h2>Welcome to MelodyPitch, ${userName}!</h2>
      <p>Your ${role.toLowerCase()} account has been created successfully.</p>
      <p>You can now:</p>
      <ul>
        ${role === 'SONGWRITER' ? '<li>Submit your demos to labels</li>' : ''}
        ${role === 'LABEL' ? '<li>Create submission portals</li><li>Receive submissions from songwriters</li>' : ''}
        ${role === 'ARTIST' ? '<li>Browse available pitch opportunities</li>' : ''}
      </ul>
      <p>Happy creating!<br/>The MelodyPitch Team</p>
    `,
  }),
};
