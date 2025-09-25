# Security Guide for Techspark Deployment

## 🔒 Pre-Deployment Security Checklist

### ✅ Environment Variables Security
- [x] `.env.local` is in `.gitignore`
- [x] JWT_SECRET updated with secure 64-character key
- [x] Admin password strengthened
- [ ] **CRITICAL**: Set these in Vercel dashboard, NOT in code

### ✅ Database Security (Supabase)
- [x] Row Level Security (RLS) enabled
- [x] Service role key configured
- [x] Anonymous registration limited to INSERT only
- [x] Admin operations require authentication

### ✅ Authentication Security
- [x] JWT tokens with expiration
- [x] HTTP-only cookies
- [x] Secure cookie flags in production
- [x] Server-side token verification

### ✅ API Security
- [x] Admin routes require authentication
- [x] CORS policies configured
- [x] Input validation on forms
- [x] Error handling without data leakage

## 🚀 Secure Deployment Steps

### 1. Pre-Deployment (Local)
```bash
# Generate new JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Update your local .env.local with the new secret
# Change admin password to something stronger
```

### 2. Vercel Dashboard Setup
1. Go to Project Settings → Environment Variables
2. Add these variables (copy from your .env.local):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD` (use new strong password)
   - `JWT_SECRET` (use newly generated key)

### 3. Supabase Security (Run in SQL Editor)
```sql
-- Ensure RLS is enabled
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Verify policies exist
SELECT schemaname, tablename, policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'participants';
```

## 🛡️ Security Features

### Authentication Flow
1. Admin login → JWT token in HTTP-only cookie
2. Each admin API call → Token verification
3. Database operations → Service role with RLS
4. Logout → Token deletion

### Data Protection
- Personal data encrypted in transit (HTTPS)
- Database connections secured (Supabase SSL)
- No sensitive data in client-side code
- Admin credentials server-side only

### Rate Limiting (Recommended)
Consider adding rate limiting for:
- Registration form submissions
- Admin login attempts
- API endpoints

## 🔍 Security Monitoring

### Post-Deployment Checks
1. Test admin login with new credentials
2. Verify registration form works
3. Check that admin dashboard requires authentication
4. Confirm environment variables are set in Vercel
5. Test that `.env.local` is not accessible via web

### Regular Security Tasks
- [ ] Monitor Supabase logs for unusual activity
- [ ] Review Vercel function logs
- [ ] Update dependencies regularly
- [ ] Rotate JWT secret quarterly
- [ ] Update admin password regularly

## 🚨 Emergency Procedures

### If Credentials Compromised
1. Immediately change admin password in Vercel
2. Rotate JWT secret
3. Check Supabase audit logs
4. Review recent registrations for anomalies

### If Database Compromised
1. Change Supabase service role key
2. Review and tighten RLS policies
3. Audit participant data for unauthorized changes
4. Consider temporary shutdown if severe

## 📞 Security Contacts
- Supabase Security: https://supabase.com/security
- Vercel Security: https://vercel.com/security
- Next.js Security: https://nextjs.org/docs/app/building-your-application/deploying/production-checklist

## 🔐 Password Policy
- Minimum 16 characters
- Mix of uppercase, lowercase, numbers, symbols
- No dictionary words
- Change every 3-6 months
- Use unique passwords for each service