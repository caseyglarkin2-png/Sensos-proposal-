# Security Guidelines

This document outlines security best practices for the Sensos Proposal site.

## Table of Contents

1. [API Key Security](#api-key-security)
2. [Environment Variables](#environment-variables)
3. [Dependency Management](#dependency-management)
4. [Content Security](#content-security)
5. [Deployment Security](#deployment-security)
6. [Incident Response](#incident-response)

---

## API Key Security

### Google Gemini API Key Protection

**Critical**: The Gemini API key must be protected at all times.

### Best Practices:

1. **Never commit API keys to Git**
   - Use `.env` files (already in `.gitignore`)
   - Never hardcode keys in source code
   - Use environment variables on hosting platforms

2. **Restrict API Key Usage**
   - In Google Cloud Console, set HTTP referrer restrictions
   - Restrict to your domain only:
     ```
     https://yourdomain.com/*
     https://*.vercel.app/*  (for preview deployments)
     ```

3. **Enable API Key Quotas**
   - Set daily request limits
   - Set per-minute rate limits
   - Monitor usage in Google Cloud Console

4. **Rotate Keys Regularly**
   - Rotate API keys every 90 days
   - Create new key before deleting old one
   - Update all environments simultaneously

5. **Monitor API Usage**
   - Set up alerts for unusual activity
   - Review usage reports weekly
   - Investigate unexpected spikes immediately

### API Key Restrictions in Google Cloud:

```
1. Go to Google Cloud Console
2. Navigate to APIs & Services > Credentials
3. Select your API key
4. Under "Application restrictions":
   - Choose "HTTP referrers"
   - Add your domains
5. Under "API restrictions":
   - Restrict to "Generative Language API"
6. Save changes
```

---

## Environment Variables

### Required Environment Variables

```bash
# Required
VITE_GEMINI_API_KEY=your_api_key_here

# Optional
VITE_APP_NAME=Sensos Proposal
VITE_APP_VERSION=1.0.0
```

### Environment-Specific Configuration

**Development**:
- Use `.env` file locally
- Never commit `.env` to Git
- Share via secure channels only

**Staging/Production**:
- Set environment variables in hosting platform
- Use separate API keys for each environment
- Never log environment variables

### Hosting Platform Configuration:

**Vercel**:
1. Project Settings → Environment Variables
2. Add variables for Production, Preview, Development
3. Mark sensitive variables as "Sensitive"

**Netlify**:
1. Site Settings → Build & Deploy → Environment
2. Add key-value pairs
3. Set visibility to "Sensitive"

**Docker**:
```bash
# Use docker secrets or environment files
docker run -e VITE_GEMINI_API_KEY=key sensos-proposal

# Or use .env file with docker-compose
docker-compose --env-file .env up
```

---

## Dependency Management

### Regular Security Audits

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Check for major updates
npx npm-check-updates
```

### Keep Dependencies Updated

```bash
# Update all dependencies
npm update

# Update to latest versions (careful!)
npx npm-check-updates -u
npm install
```

### Review Dependencies Before Adding

1. Check npm package reputation
2. Review GitHub repository
3. Check last update date
4. Review open issues
5. Check download statistics

### Automated Dependency Updates

Enable Dependabot in GitHub:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

---

## Content Security

### Content Security Policy (CSP)

Add CSP headers to prevent XSS attacks:

**Nginx Configuration**:
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://generativelanguage.googleapis.com;" always;
```

**Vercel** (`vercel.json`):
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://generativelanguage.googleapis.com;"
        }
      ]
    }
  ]
}
```

### Additional Security Headers

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Input Validation

- All user inputs are handled by React
- No direct DOM manipulation
- No `dangerouslySetInnerHTML` usage
- Sanitize any dynamic content

---

## Deployment Security

### HTTPS/SSL

**Always use HTTPS in production**:
- Vercel/Netlify: Automatic SSL
- Custom domain: Use Let's Encrypt
- Docker: Use reverse proxy (nginx/Caddy)

### Docker Security

```dockerfile
# Use specific versions, not 'latest'
FROM node:18-alpine AS builder

# Run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Don't include .env in image
COPY --chown=nextjs:nodejs . .
```

### Server Hardening

**Ubuntu/Debian Server**:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Enable firewall
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable

# Install fail2ban
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

---

## Incident Response

### Security Incident Checklist

If you suspect a security breach:

1. **Immediate Actions**:
   - Rotate all API keys immediately
   - Review access logs
   - Disable compromised services
   - Document incident timeline

2. **Investigation**:
   - Identify the vulnerability
   - Determine what data was accessed
   - Find entry point
   - Review all logs

3. **Remediation**:
   - Patch vulnerability
   - Update all credentials
   - Deploy fixes
   - Monitor closely

4. **Post-Incident**:
   - Conduct post-mortem
   - Update security procedures
   - Implement additional safeguards
   - Document lessons learned

### Contact Information

- **Technical Lead**: Casey Larkin
- **Hosting Support**: 
  - Vercel: support@vercel.com
  - Netlify: support@netlify.com
- **Google Cloud Support**: Google Cloud Console

---

## Security Checklist

Before deploying to production:

- [ ] All API keys stored securely in environment variables
- [ ] API keys have usage restrictions enabled
- [ ] HTTPS/SSL enabled
- [ ] Security headers configured
- [ ] Dependencies audited (`npm audit`)
- [ ] `.env` file not committed to Git
- [ ] Rate limiting implemented (if applicable)
- [ ] Error messages don't expose sensitive data
- [ ] Monitoring and alerting set up
- [ ] Backup strategy documented
- [ ] Incident response plan reviewed

---

## Monitoring and Alerts

### Set Up Monitoring

1. **Uptime Monitoring**:
   - UptimeRobot (free)
   - Pingdom
   - Better Uptime

2. **Error Tracking**:
   - Sentry
   - LogRocket
   - Bugsnag

3. **Usage Monitoring**:
   - Google Cloud Console (API usage)
   - Vercel Analytics
   - Google Analytics

### Alert Configuration

Set up alerts for:
- API quota exceeded
- Site downtime
- Error rate spike
- Unusual traffic patterns
- Failed deployments

---

## Compliance

### Data Privacy

- No personal data collected
- No cookies used (except by analytics if enabled)
- No user authentication required
- API calls to Google Gemini (review their privacy policy)

### GDPR Compliance

If you add analytics or user tracking:
- Display cookie consent banner
- Provide privacy policy
- Allow users to opt-out
- Document data retention

---

## Regular Security Tasks

### Daily
- Monitor uptime
- Review error logs

### Weekly
- Check API usage
- Review security alerts
- Monitor traffic patterns

### Monthly
- Run security audit
- Update dependencies
- Review access logs
- Test backup restoration

### Quarterly
- Rotate API keys
- Review security policies
- Conduct penetration testing
- Update documentation

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Google Cloud Security Best Practices](https://cloud.google.com/security/best-practices)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [Vercel Security](https://vercel.com/docs/security)
- [React Security Best Practices](https://react.dev/learn/security)

---

## Reporting Security Issues

If you discover a security vulnerability:

1. **Do not** open a public GitHub issue
2. Email the security team directly
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We aim to respond within 24 hours.

---

*Last Updated: December 2024*

**Remember**: Security is an ongoing process, not a one-time task.
