import { NextRequest, NextResponse } from 'next/server'
import { uploadToStorage, validateUpload } from '@/lib/storage'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const validationError = validateUpload(file.type, file.size)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 422 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await uploadToStorage(buffer, file.type)

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      path: result.path,
      url: result.publicUrl,
    })
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
