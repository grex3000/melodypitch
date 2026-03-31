import { NextRequest, NextResponse } from "next/server";
import { presignPutUrl } from "@/lib/s3";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body.contentType !== "string" || typeof body.fileSize !== "number") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = await presignPutUrl(body.contentType, body.fileSize);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  return NextResponse.json({ uploadUrl: result.uploadUrl, key: result.key });
}
