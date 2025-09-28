# 🚀 Deployment Guide

## Database Setup

### Required Environment Variables
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Admin Authentication
ADMIN_EMAIL=your_admin_email@domain.com
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_generated_jwt_secret

# Database Configuration
APP_ADMIN_EMAIL=your_admin_email@domain.com
```

### Database Function Setup

#### Required Supabase SQL Functions
Run these commands in your Supabase SQL Editor:

```sql
-- Set admin email configuration
SELECT set_config('app.admin_email', 'your_admin_email@domain.com', false);

-- Create required function for stats API
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

-- Grant permissions
GRANT EXECUTE ON FUNCTION get_participant_stats() TO service_role;
```

### Security Checklist
- [ ] Replace all default credentials
- [ ] Set strong JWT_SECRET (64+ characters)
- [ ] Configure admin email in database settings
- [ ] Enable RLS policies
- [ ] Test admin authentication
- [ ] Verify API endpoint security

### Local Development
1. Copy `.env.example` to `.env.local`
2. Fill in your environment variables
3. Run database setup commands
4. Test admin login functionality

## ⚠️ Security Notes
- Never commit real credentials to version control
- Use strong, unique passwords for admin accounts
- Rotate JWT secrets regularly
- Monitor admin session logs
- Enable database audit logging in production