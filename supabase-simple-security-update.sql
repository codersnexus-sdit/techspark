-- Simple Security Update for Existing Techspark Schema
-- This maintains compatibility with your current setup while improving security
-- Run this in your Supabase SQL Editor

-- 1. Drop the overly permissive "Public can view participants" policy
DROP POLICY IF EXISTS "Public can view participants" ON participants;

-- 2. Create a more restrictive policy for viewing participants
-- Only allow service_role (your API routes) to read data
CREATE POLICY "API can access participants" ON participants
  FOR SELECT
  TO service_role
  USING (true);

-- 3. Keep the registration policy but make it more specific
DROP POLICY IF EXISTS "Anyone can register" ON participants;

CREATE POLICY "Anonymous can register" ON participants
  FOR INSERT
  TO anon, service_role
  WITH CHECK (true);

-- 4. Add policies for admin operations (update/delete)
CREATE POLICY "Service role can modify participants" ON participants
  FOR UPDATE
  TO service_role
  USING (true);

CREATE POLICY "Service role can delete participants" ON participants
  FOR DELETE
  TO service_role
  USING (true);

-- 5. Create a function to safely get participant data (optional, for extra security)
CREATE OR REPLACE FUNCTION get_participants_for_admin()
RETURNS SETOF participants
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT * FROM participants ORDER BY created_at DESC;
$$;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION get_participants_for_admin() TO service_role;

-- 6. Create a function for participant statistics
CREATE OR REPLACE FUNCTION get_participant_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_participants', (SELECT COUNT(*) FROM participants),
    'unique_colleges', (SELECT COUNT(DISTINCT college) FROM participants),
    'unique_departments', (SELECT COUNT(DISTINCT department) FROM participants),
    'today_registrations', (
      SELECT COUNT(*) FROM participants 
      WHERE DATE(created_at) = CURRENT_DATE
    ),
    'week_registrations', (
      SELECT COUNT(*) FROM participants 
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
    )
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION get_participant_stats() TO service_role;

-- 7. Ensure realtime is still working (optional)
-- This should already be set, but just in case
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'participants'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE participants;
  END IF;
END $$;