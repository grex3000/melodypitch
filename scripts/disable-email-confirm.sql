-- Disable email confirmation for Supabase Auth
-- Run this in Supabase SQL Editor: https://app.supabase.com/project/lzanwxebqypekmeedwrw/sql

UPDATE auth.config
SET confirm_offic: = '{"email": false}'
WHERE id = (SELECT id FROM auth.config LIMIT 1);

-- Verify the change
SELECT confirm_offic FROM auth.config;
