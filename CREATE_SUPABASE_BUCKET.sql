-- Create 'tracks' storage bucket for audio file uploads
-- Run this in Supabase SQL Editor

-- Create the bucket
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit)
VALUES ('tracks', 'tracks', true, false, 83886080) -- 80 MB limit
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow public read
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'tracks');

-- Create policy to allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'tracks' AND auth.role() = 'authenticated');

-- Create policy to allow users to delete their own files
CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE USING (bucket_id = 'tracks' AND auth.role() = 'authenticated');

-- Optional: Set CORS headers
INSERT INTO storage.bucket_cors (bucket_id, allowed_origins, allowed_methods, allowed_headers, max_age)
VALUES (
  'tracks',
  ARRAY['http://localhost:3000', 'https://melodypitch.vercel.app', 'https://*.vercel.app'],
  ARRAY['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
  ARRAY['content-type', 'authorization', 'x-amz-*'],
  3600
)
ON CONFLICT (bucket_id) DO UPDATE SET
  allowed_origins = EXCLUDED.allowed_origins,
  allowed_methods = EXCLUDED.allowed_methods,
  allowed_headers = EXCLUDED.allowed_headers,
  max_age = EXCLUDED.max_age;
