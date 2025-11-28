# Security Guidelines

## Environment Variables

### ⚠️ CRITICAL: Never Commit Sensitive Data

**NEVER** commit the following files to version control:
- `.env`
- `.env.local`
- `.env.development.local`
- `.env.test.local`
- `.env.production.local`
- `server/.env`

These files contain sensitive credentials like:
- Database connection strings
- SMTP passwords
- API keys
- Secret tokens

### Setting Up Environment Variables

1. **Backend (Server)**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env and add your actual credentials
   ```

2. **Frontend (React App)**
   ```bash
   # For local development
   cp .env.example .env.development
   
   # For production
   cp .env.example .env.production
   ```

## Security Checklist

### Before Deployment

- [ ] All `.env` files are listed in `.gitignore`
- [ ] No hardcoded credentials in source code
- [ ] CORS is properly configured (not set to `*` in production)
- [ ] API endpoints require authentication where needed
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
- [ ] HTTPS is enabled in production
- [ ] Database credentials are secure
- [ ] SMTP credentials are secure

### Authentication & Authorization

**TODO**: Implement these security features:
- [ ] JWT-based authentication
- [ ] API key validation for protected endpoints
- [ ] Role-based access control (RBAC)
- [ ] Session management
- [ ] Password hashing (if implementing user accounts)

### API Security

**Current Status**: ⚠️ API endpoints are currently open
**Required**:
- [ ] Add authentication middleware
- [ ] Implement rate limiting (express-rate-limit)
- [ ] Add request validation (express-validator)
- [ ] Add CSRF protection
- [ ] Add helmet.js for security headers

### Database Security

- [x] Connection string stored in environment variables
- [x] SSL/TLS enabled for database connections
- [ ] Prepared statements used (prevent SQL injection)
- [ ] Database backups configured
- [ ] Access logs enabled

### SMTP Security

- [x] Credentials stored in environment variables
- [x] SSL/TLS enabled for email
- [ ] Rate limiting on email endpoints
- [ ] Email validation and sanitization
- [ ] SPF, DKIM, DMARC records configured

## Incident Response

If credentials are accidentally committed:

1. **Immediately rotate all exposed credentials**
   - Change database passwords
   - Change SMTP passwords
   - Regenerate API keys

2. **Remove from git history**
   ```bash
   # Use git filter-branch or BFG Repo-Cleaner
   # Contact your team lead for assistance
   ```

3. **Update environment variables** in all environments

4. **Review access logs** for unauthorized access

## Reporting Security Issues

If you discover a security vulnerability:
1. **DO NOT** create a public GitHub issue
2. Contact the security team immediately
3. Provide detailed information about the vulnerability

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
