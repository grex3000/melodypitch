import { db } from './db';
import { sendEmail, emailTemplates } from './email';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://melodypitch.com';

// Called after a submission is created — notify the label
export async function notifyLabelOfNewSubmission(submissionId: string) {
  try {
    const submission = await db.submission.findUnique({
      where: { id: submissionId },
      include: {
        portal: { include: { label: { include: { user: true } } } },
        songwriter: { include: { user: { select: { name: true } } } },
      },
    });
    if (!submission) return;

    const labelUser = submission.portal.label.user;
    const labelName = submission.portal.label.name;
    const submitterName = submission.songwriter?.user.name ?? 'Anonymous';
    const libraryUrl = `${APP_URL}/label/library`;

    const template = emailTemplates.newSubmission(labelName, submitterName, libraryUrl);
    await sendEmail({ to: labelUser.email, ...template });
  } catch (err) {
    console.error('[notify] notifyLabelOfNewSubmission:', err);
  }
}

// Called after status changes — notify the songwriter (if the submission is claimed)
export async function notifySongwriterOfStatusChange(
  submissionId: string,
  oldStatus: string,
  newStatus: string
) {
  try {
    const submission = await db.submission.findUnique({
      where: { id: submissionId },
      include: { songwriter: { include: { user: true } } },
    });
    if (!submission?.songwriter) return;

    const songwriterUser = submission.songwriter.user;
    const dashboardUrl = `${APP_URL}/songwriter/dashboard`;

    const template = emailTemplates.statusChanged(
      songwriterUser.name,
      oldStatus,
      newStatus,
      dashboardUrl
    );
    await sendEmail({ to: songwriterUser.email, ...template });
  } catch (err) {
    console.error('[notify] notifySongwriterOfStatusChange:', err);
  }
}

// Called after a pitch package is created — notify all artist members
export async function notifyArtistOfPitchPackage(packageId: string) {
  try {
    const pkg = await db.pitchPackage.findUnique({
      where: { id: packageId },
      include: {
        label: true,
        artist: { include: { members: { include: { user: true } } } },
      },
    });
    if (!pkg) return;

    const reviewUrl = `${APP_URL}/artist/pitches/${packageId}`;
    const template = emailTemplates.pitchPackageReceived(
      pkg.artist.name,
      pkg.label.name,
      pkg.name,
      reviewUrl
    );

    await Promise.all(
      pkg.artist.members.map((m) =>
        sendEmail({ to: m.user.email, ...template })
      )
    );
  } catch (err) {
    console.error('[notify] notifyArtistOfPitchPackage:', err);
  }
}

// Called after an artist sets a verdict — notify the label
export async function notifyLabelOfArtistVerdict(itemId: string) {
  try {
    const item = await db.pitchItem.findUnique({
      where: { id: itemId },
      include: {
        track: { select: { title: true } },
        package: {
          include: {
            label: { include: { user: true } },
            artist: true,
          },
        },
      },
    });
    if (!item) return;

    const labelUser = item.package.label.user;
    const artistName = item.package.artist.name;
    const trackTitle = item.track.title;
    const reviewUrl = `${APP_URL}/label/pitches/${item.package.id}`;

    await sendEmail({
      to: labelUser.email,
      subject: `${artistName} responded to "${trackTitle}"`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
          <h2>Artist Verdict</h2>
          <p><strong>${artistName}</strong> gave a verdict on <strong>${trackTitle}</strong> in pitch package <strong>${item.package.name}</strong>.</p>
          <a href="${reviewUrl}" style="display:inline-block;background:#6366f1;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600">View Pitch Package</a>
        </div>
      `,
    });
  } catch (err) {
    console.error('[notify] notifyLabelOfArtistVerdict:', err);
  }
}
