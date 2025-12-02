-- Production Database Schema
-- This file contains the essential database functions and policies
-- WITHOUT sensitive configuration details

-- Create participants table
CREATE TABLE IF NOT EXISTS participants (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL,
    member1_name VARCHAR(255) NOT NULL,
    member1_usn VARCHAR(20) NOT NULL,
    member1_email VARCHAR(255) NOT NULL,
    member1_phone VARCHAR(15) NOT NULL,
    member2_name VARCHAR(255),
    member2_usn VARCHAR(20),
    member2_email VARCHAR(255),
    member2_phone VARCHAR(15),
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_participants_team_name ON participants(team_name);
CREATE INDEX IF NOT EXISTS idx_participants_transaction_id ON participants(transaction_id);
CREATE INDEX IF NOT EXISTS idx_participants_created_at ON participants(created_at);

-- Enable Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Create policies for participants table
-- Allow everyone to insert (registration)
CREATE POLICY "Allow insert for everyone" ON participants
FOR INSERT WITH CHECK (true);

-- Allow select for authenticated users only
CREATE POLICY "Allow select for authenticated users" ON participants
FOR SELECT USING (true);

-- Allow update for authenticated users only
CREATE POLICY "Allow update for authenticated users" ON participants
FOR UPDATE USING (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE participants TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE participants_id_seq TO anon, authenticated;

-- Essential function for statistics API
CREATE OR REPLACE FUNCTION get_participant_stats()
RETURNS TABLE(
    total_participants BIGINT,
    teams_with_two_members BIGINT,
    recent_registrations BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) AS total_participants,
        COUNT(CASE WHEN member2_name IS NOT NULL AND TRIM(member2_name) != '' THEN 1 END) AS teams_with_two_members,
        COUNT(CASE WHEN created_at >= NOW() - INTERVAL '24 hours' THEN 1 END) AS recent_registrations
    FROM participants;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_participant_stats() TO anon, authenticated;