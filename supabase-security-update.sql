-- Enhanced Security Schema for Techspark Event Registration
-- This script improves the existing schema with better RLS policies

-- First, ensure we have the required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create admin_sessions table to track admin authentication
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  session_token TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- Create indexes for admin_sessions
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_email ON admin_sessions(email);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);

-- Enable RLS on admin_sessions
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Admin sessions policies - only allow service role access
CREATE POLICY "Service role can manage admin sessions" ON admin_sessions
  USING (auth.role() = 'service_role');

-- Drop existing overly permissive policies on participants
DROP POLICY IF EXISTS "Public can view participants" ON participants;
DROP POLICY IF EXISTS "Anyone can register" ON participants;

-- Create more secure policies for participants table

-- 1. Allow anonymous registration (but with potential for rate limiting)
CREATE POLICY "Allow anonymous registration" ON participants
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 2. Allow authenticated admin to view all participants
CREATE POLICY "Admin can view all participants" ON participants
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_sessions 
      WHERE email = 'admin@techspark.com' 
      AND session_token IS NOT NULL 
      AND expires_at > NOW() 
      AND is_active = true
    )
  );

-- 3. Allow service role full access (for API routes)
CREATE POLICY "Service role full access" ON participants
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 4. Admin can update/delete participants
CREATE POLICY "Admin can modify participants" ON participants
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_sessions 
      WHERE email = 'admin@techspark.com' 
      AND session_token IS NOT NULL 
      AND expires_at > NOW() 
      AND is_active = true
    )
  );

CREATE POLICY "Admin can delete participants" ON participants
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_sessions 
      WHERE email = 'admin@techspark.com' 
      AND session_token IS NOT NULL 
      AND expires_at > NOW() 
      AND is_active = true
    )
  );

-- Create a function to check if email already exists (for duplicate prevention)
CREATE OR REPLACE FUNCTION check_duplicate_registration(
  p_email VARCHAR(255),
  p_phone VARCHAR(15)
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM participants 
    WHERE email = p_email OR phone = p_phone
  );
END;
$$;

-- Create a function to get participant statistics
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

-- Ensure realtime is properly configured
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS participants;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS admin_sessions;

-- Set replica identity for change tracking
ALTER TABLE participants REPLICA IDENTITY FULL;
ALTER TABLE admin_sessions REPLICA IDENTITY FULL;

-- Create a cleanup function for expired admin sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM admin_sessions 
  WHERE expires_at < NOW() OR is_active = false;
END;
$$;