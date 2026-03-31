import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const ALLOWED_TYPES: Record<string, string> = {
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/aiff": "aiff",
  "audio/x-aiff": "aiff",
  "audio/flac": "flac",
  "audio/x-flac": "flac",
};

const MAX_FILE_SIZE_BYTES = 80 * 1024 * 1024; // 80 MB

export function validateUpload(contentType: string, fileSize: number): string | null {
  if (!ALLOWED_TYPES[contentType]) {
    return `Unsupported format. Accepted: MP3, WAV, AIFF, FLAC.`;
  }
  if (fileSize > MAX_FILE_SIZE_BYTES) {
    return `File too large. Maximum size is 80 MB.`;
  }
  return null;
}

export async function presignPutUrl(
  contentType: string,
  fileSize: number
): Promise<{ uploadUrl: string; key: string; error?: never } | { error: string; uploadUrl?: never; key?: never }> {
  const validationError = validateUpload(contentType, fileSize);
  if (validationError) return { error: validationError };

  const ext = ALLOWED_TYPES[contentType];
  const key = `uploads/${randomUUID()}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
    ContentLength: fileSize,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  return { uploadUrl, key };
}
