# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

1. **DO NOT** create a public GitHub issue
2. Email the maintainers directly at: [your-email]
3. Include a detailed description of the vulnerability
4. Provide steps to reproduce if possible

## Security Measures

### Authentication
- Admin authentication uses JWT tokens
- Passwords are validated server-side only
- No sensitive credentials stored in client-side code

### Database Security
- Row Level Security (RLS) enabled on all tables
- Service role access restricted to API routes only
- Anonymous users can only register (INSERT permissions)
- Admin operations require valid authentication

### Environment Variables
- All sensitive configuration stored in environment variables
- `.env.example` provided for reference (no real values)
- Production deployments use separate credential management

### API Security
- All admin routes protected with JWT verification
- CORS configured appropriately
- Rate limiting should be implemented for production

## Security Best Practices for Contributors

1. **Never commit real credentials** to the repository
2. **Use environment variables** for all sensitive configuration
3. **Test authentication flows** before submitting PRs
4. **Follow principle of least privilege** for database permissions
5. **Validate all user inputs** in API routes

## Known Security Considerations

- This is an open-source project - ensure your deployment uses unique credentials
- Default admin credentials MUST be changed in production
- JWT secrets should be cryptographically secure (64+ characters)
- Regular security audits recommended for production deployments

## Database Function Security

The `get_participant_stats()` function is marked as `SECURITY DEFINER` and only accessible to the service role, ensuring proper access control for statistics data.