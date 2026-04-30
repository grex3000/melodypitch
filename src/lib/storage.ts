import { supabaseServer } from './supabase-server'
import { randomUUID } from 'crypto'

const ALLOWED_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/x-wav',
  'audio/aiff',
  'audio/x-aiff',
  'audio/flac',
  'audio/x-flac',
]
const MAX_FILE_SIZE = 80 * 1024 * 1024 // 80 MB

export function validateUpload(contentType: string, fileSize: number): string | null {
  if (!ALLOWED_TYPES.includes(contentType)) {
    return 'Unsupported format. Accepted: MP3, WAV, AIFF, FLAC.'
  }
  if (fileSize > MAX_FILE_SIZE) {
    return 'File too large. Maximum size is 80 MB.'
  }
  return null
}

export async function uploadToStorage(
  file: Buffer,
  contentType: string
): Promise<{ path: string; publicUrl: string; error?: never } | { error: string; path?: never; publicUrl?: never }> {
  const validationError = validateUpload(contentType, file.length)
  if (validationError) return { error: validationError }

  const ext = contentType.split('/')[1].replace('x-', '').replace('mpeg', 'mp3')
  const path = `uploads/${randomUUID()}.${ext}`

  const { error } = await supabaseServer.storage
    .from('tracks')
    .upload(path, file, {
      contentType,
      upsert: false,
    })

  if (error) return { error: error.message }

  const { data } = supabaseServer.storage.from('tracks').getPublicUrl(path)

  return { path, publicUrl: data.publicUrl }
}
