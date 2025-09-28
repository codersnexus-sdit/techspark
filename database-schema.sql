-- Production Database Schema
-- This file contains the essential database functions and policies
-- WITHOUT sensitive configuration details

-- Essential function for statistics API
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

-- Function to safely get participant data for admin
CREATE OR REPLACE FUNCTION get_participants_for_admin()
RETURNS SETOF participants
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT * FROM participants ORDER BY created_at DESC;
$$;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION get_participants_for_admin() TO service_role;

-- Basic RLS policies (environment-specific policies should be added separately)
-- Enable RLS on participants table
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Allow service role full access for API operations
CREATE POLICY "Service role full access" ON participants
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow anonymous registration
CREATE POLICY "Anonymous can register" ON participants
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure realtime is configured
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