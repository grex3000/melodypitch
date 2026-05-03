# Supabase Storage Bucket Setup Guide

## Quick Setup Steps

### 1. Create 'tracks' Bucket
```
Go to Supabase Dashboard → Storage → Buckets
Click "New bucket"
Name: tracks
Select "Public" (allow public access)
Click Create
```

### 2. Set Bucket Policy
```
Select 'tracks' bucket
Click "Policies" tab
Create policy:
- Policy name: "Public Read"
- Definition: SELECT
- For: All
- Status: Enabled
```

### 3. Configure CORS (if needed)
```
Go to SQL Editor
Run this query:

INSERT INTO storage.buckets (id, name, public)
VALUES ('tracks', 'tracks', true)
ON CONFLICT DO NOTHING;

-- Set CORS headers
INSERT INTO storage.bucket_cors (bucket_id, allowed_origins, allowed_methods, allowed_headers, max_age)
VALUES (
  'tracks',
  ARRAY['http://localhost:3000', 'https://localhost:3000', 'https://melodypitch.vercel.app'],
  ARRAY['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
  ARRAY['content-type', 'authorization'],
  3600
)
ON CONFLICT (bucket_id) DO UPDATE SET
  allowed_origins = EXCLUDED.allowed_origins,
  allowed_methods = EXCLUDED.allowed_methods,
  allowed_headers = EXCLUDED.allowed_headers,
  max_age = EXCLUDED.max_age;
```

## Verification

### Test Upload
```bash
node test_upload_simple.mjs
```

Should show:
- Status 200 or 500 (not 422)
- Response with 'path' and 'url' fields

### Test with Browser
1. Go to http://localhost:3000/login
2. Login with test account
3. Navigate to submission page
4. Upload an MP3 file
5. Should complete without "Bucket not found" error

## Troubleshooting

### Error: "Bucket not found"
- Bucket not created yet
- Check: Storage → Buckets → 'tracks' exists?

### Error: "403 Forbidden"
- Bucket is private
- Fix: Set to "Public" in bucket settings

### Error: "CORS policy"
- CORS headers not configured
- Fix: Run the CORS SQL query above

### Error: "Authentication failed"
- Service role key might be wrong
- Check: `.env.local` has correct SUPABASE_SERVICE_ROLE_KEY

## Environment Variables
Make sure `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=https://lzanwxebqypekmeedwrw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Next: Test E2E Upload
Once bucket is created, run:
```bash
node test_authenticated_upload.mjs
```
