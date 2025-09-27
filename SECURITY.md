# 🔒 Security Guide for Techspark

## Overview
This guide covers the security measures implemented in Techspark and how to maintain security when deploying or contributing to this open-source project.

## 🛡️ Security Features

### Authentication & Authorization
- **JWT-based Authentication**: Secure token-based admin authentication
- **HTTP-Only Cookies**: Admin tokens stored in secure HTTP-only cookies
- **Session Management**: 24-hour token expiration with automatic cleanup
- **Role-based Access**: Admin role verification for all protected routes
- **Server-side Validation**: All admin endpoints verify authentication

### Data Protection
- **Environment Variables**: All sensitive data stored in environment variables
- **No Hardcoded Secrets**: No credentials or secrets in source code
- **Supabase RLS**: Row Level Security policies protect database access
- **Service Role Isolation**: Admin operations use dedicated service role

### API Security
- **Request Validation**: Input validation on all API endpoints
- **Error Handling**: Secure error responses without information leakage
- **Rate Limiting**: Built-in protection via hosting platform
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🚨 Critical Security Requirements

### Required Environment Variables
These environment variables **MUST** be set in production:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Authentication (CHANGE THESE!)
ADMIN_EMAIL=your_admin_email@domain.com
ADMIN_PASSWORD=your_very_secure_password

# JWT Secret (GENERATE A NEW ONE!)
JWT_SECRET=your_cryptographically_secure_random_string
```

### ⚠️ IMPORTANT: The application will NOT start without these variables!

## 🔐 Production Security Checklist

### Before Deployment:
- [ ] Change default admin credentials
- [ ] Generate a new JWT secret (64+ characters)
- [ ] Set all environment variables in hosting platform
- [ ] Enable HTTPS (automatic with Vercel/Netlify)
- [ ] Review Supabase security policies
- [ ] Test admin authentication flow

### Generating Secure Secrets:
```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use OpenSSL
openssl rand -hex 64
```

## 🔍 Security Verification

### Test Admin Security:
1. Try accessing `/admin/dashboard` without authentication → Should redirect to login
2. Try accessing API endpoints without token → Should return 401
3. Try using expired tokens → Should reject access
4. Verify logout clears all session data

### Database Security:
1. Confirm RLS policies are active
2. Test that anonymous users cannot access admin data
3. Verify service role has appropriate permissions only

## 🚫 Security Don'ts

### Never Do These:
- ❌ Commit `.env.local` files to Git
- ❌ Use default credentials in production
- ❌ Share admin credentials in plain text
- ❌ Disable HTTPS in production
- ❌ Store secrets in client-side code
- ❌ Use weak passwords or JWT secrets

## 🔧 Common Security Issues & Fixes

### Issue: Admin Dashboard Not Loading
**Cause**: Missing environment variables
**Fix**: Ensure all required environment variables are set

### Issue: Login Fails in Production
**Cause**: Incorrect JWT secret or admin credentials
**Fix**: Verify environment variables match between development and production

### Issue: API Returns 401 Errors
**Cause**: Token validation failing
**Fix**: Check JWT secret consistency and token expiration

## 📊 Database Security

### Row Level Security (RLS)
The database uses RLS policies to ensure:
- Anonymous users can only insert new registrations
- Admin operations require service role authentication
- No direct public access to participant data

### Required Database Function
```sql
-- This function must exist in your Supabase database
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

GRANT EXECUTE ON FUNCTION get_participant_stats() TO service_role;
```

## 🚨 Incident Response

### If Security is Compromised:
1. **Immediately** change admin credentials
2. **Regenerate** JWT secret
3. **Revoke** all active admin sessions
4. **Review** access logs in Supabase
5. **Update** environment variables in hosting platform
6. **Test** all security measures

## 📞 Security Contact

For security-related issues or questions:
- Create a private security issue in GitHub
- Contact the maintainers directly
- Follow responsible disclosure practices

## 🔄 Regular Security Maintenance

### Monthly Tasks:
- [ ] Review admin access logs
- [ ] Update dependencies for security patches
- [ ] Verify environment variables are secure
- [ ] Test authentication flows
- [ ] Review database access patterns

### Before Each Release:
- [ ] Security audit of new code
- [ ] Dependency vulnerability scan
- [ ] Environment variable validation
- [ ] Authentication flow testing

---

**Remember**: Security is an ongoing process, not a one-time setup. Stay vigilant and keep security practices up to date.