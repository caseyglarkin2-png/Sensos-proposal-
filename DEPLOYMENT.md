# Deployment Guide - Sensos Proposal Site

This comprehensive guide covers production deployment for the Sensos proposal site across multiple hosting platforms and configurations.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Configuration](#environment-configuration)
3. [Deployment Options](#deployment-options)
4. [Security Considerations](#security-considerations)
5. [Monitoring and Logging](#monitoring-and-logging)
6. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All environment variables are properly configured
- [ ] Google Gemini API key is valid and has appropriate rate limits
- [ ] Build completes successfully (`npm run build`)
- [ ] All dependencies are up to date
- [ ] SSL certificate is configured (handled by most platforms)
- [ ] Domain/subdomain is configured
- [ ] Analytics tracking is set up (optional)
- [ ] Error monitoring is configured (optional)

---

## Environment Configuration

### Required Environment Variables

Create a `.env` file (never commit this to Git):

```bash
# Google Gemini API Configuration
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here

# Application Configuration
VITE_APP_NAME=Sensos Proposal
VITE_APP_VERSION=1.0.0
NODE_ENV=production
```

### Obtaining Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your environment variables

**Important**: Keep your API key secure and never commit it to version control.

---

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the easiest deployment with automatic CI/CD integration.

#### Steps:

1. **Install Vercel CLI** (optional):
```bash
npm install -g vercel
```

2. **Deploy via GitHub Integration** (Recommended):
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy automatically on every push

3. **Deploy via CLI**:
```bash
vercel login
vercel
```

#### Vercel Configuration

Create `vercel.json` in your project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

#### Environment Variables in Vercel:

1. Go to Project Settings → Environment Variables
2. Add each variable:
   - Name: `VITE_GEMINI_API_KEY`
   - Value: Your API key
   - Environments: Production, Preview, Development

---

### Option 2: Netlify

Netlify offers similar features to Vercel with excellent performance.

#### Steps:

1. **Install Netlify CLI** (optional):
```bash
npm install -g netlify-cli
```

2. **Deploy via GitHub Integration**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add environment variables

3. **Deploy via CLI**:
```bash
netlify login
netlify init
netlify deploy --prod
```

#### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

### Option 3: Docker Deployment

For containerized deployment on any platform.

#### Dockerfile

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  sensos-proposal:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

#### Build and Run:

```bash
# Build the Docker image
docker build -t sensos-proposal .

# Run the container
docker run -d -p 80:80 --name sensos-proposal sensos-proposal

# Or use docker-compose
docker-compose up -d
```

---

### Option 4: Custom VPS/Server

For deployment on your own server (Ubuntu/Debian).

#### Prerequisites:

- Ubuntu 20.04+ or Debian 11+
- Node.js 18+
- Nginx
- PM2 (process manager)
- SSL certificate (Let's Encrypt)

#### Steps:

1. **Install dependencies**:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

2. **Clone and build**:
```bash
# Clone repository
git clone https://github.com/caseyglarkin2-png/Sensos-proposal-.git
cd Sensos-proposal-

# Install dependencies
npm install

# Create .env file
cp .env.example .env
nano .env  # Add your API key

# Build for production
npm run build
```

3. **Serve with Nginx**:

Create `/etc/nginx/sites-available/sensos`:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/Sensos-proposal-/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/sensos /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

4. **Setup SSL with Let's Encrypt**:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Security Considerations

### API Key Security

1. **Never commit API keys** to version control
2. Use environment variables for all sensitive data
3. Rotate API keys regularly
4. Set up API key restrictions in Google Cloud Console:
   - Restrict to specific domains
   - Set rate limits
   - Enable API key usage monitoring

### Content Security Policy

Add security headers in your hosting configuration:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://generativelanguage.googleapis.com;
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Rate Limiting

Implement rate limiting for API calls:

1. **Client-side**: Throttle AI feature requests
2. **API-side**: Use Google Cloud quotas
3. **Server-side**: Use Nginx rate limiting if self-hosting

### HTTPS

Always use HTTPS in production:
- Vercel/Netlify: Automatic SSL
- Docker/VPS: Use Let's Encrypt

---

## Monitoring and Logging

### Error Tracking with Sentry

1. Install Sentry:
```bash
npm install --save @sentry/react
```

2. Configure in `src/main.jsx`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});
```

### Analytics with Google Analytics

1. Add to `.env`:
```
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

2. Add script to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Uptime Monitoring

Recommended services:
- **UptimeRobot**: Free, 5-minute intervals
- **Pingdom**: Advanced monitoring
- **Better Uptime**: Status pages included

### Log Management

For production debugging:
- **Vercel**: Built-in logging in dashboard
- **Netlify**: Function logs and analytics
- **Self-hosted**: Use PM2 logs or ELK stack

```bash
# PM2 logs
pm2 logs sensos-proposal
pm2 monit
```

---

## Troubleshooting

### Build Failures

**Issue**: `npm run build` fails

**Solutions**:
1. Clear cache: `rm -rf node_modules package-lock.json && npm install`
2. Check Node version: `node -v` (should be 18+)
3. Review error messages for missing dependencies

### API Key Issues

**Issue**: AI features not working

**Solutions**:
1. Verify API key is set: `echo $VITE_GEMINI_API_KEY`
2. Check API key restrictions in Google Cloud Console
3. Verify API is enabled in Google Cloud Console
4. Check browser console for error messages

### Deployment Issues

**Issue**: Site not loading after deployment

**Solutions**:
1. Check build output directory is correct (`dist`)
2. Verify environment variables are set in hosting platform
3. Check browser console for errors
4. Review hosting platform logs

### Performance Issues

**Issue**: Slow page load times

**Solutions**:
1. Enable CDN (automatic on Vercel/Netlify)
2. Optimize images (use WebP format)
3. Enable compression (gzip/brotli)
4. Check bundle size: `npm run build -- --mode analyze`

---

## Continuous Deployment

### GitHub Actions

The included `.github/workflows/deploy.yml` automatically:
- Runs on push to main branch
- Installs dependencies
- Runs linting
- Builds the project
- Deploys to hosting platform

### Manual Rollback

**Vercel**:
```bash
vercel rollback
```

**Netlify**:
Use the Netlify dashboard to rollback to a previous deployment

**Docker**:
```bash
docker pull sensos-proposal:previous-tag
docker-compose up -d
```

---

## Performance Optimization

### Build Optimization

1. **Code Splitting**: Already configured in `vite.config.js`
2. **Tree Shaking**: Automatic with Vite
3. **Asset Optimization**: Minification enabled by default

### Runtime Optimization

1. **Lazy Loading**: Implement for route-based code splitting
2. **Image Optimization**: Use modern formats (WebP, AVIF)
3. **Caching**: Configure proper cache headers

### CDN Configuration

Most platforms handle this automatically:
- **Vercel**: Edge Network (automatic)
- **Netlify**: Global CDN (automatic)
- **Cloudflare**: Can be added to any deployment

---

## Support and Maintenance

### Regular Maintenance Tasks

1. **Weekly**: Review error logs and uptime reports
2. **Monthly**: Update dependencies (`npm update`)
3. **Quarterly**: Security audit (`npm audit`)
4. **As needed**: Rotate API keys

### Backup Strategy

1. **Code**: Version controlled in Git
2. **Environment**: Document all environment variables
3. **Database**: Not applicable (static site)

---

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Google Gemini API Documentation](https://ai.google.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

---

**Questions or Issues?**

For deployment support, create an issue in the GitHub repository or contact the development team.

---

*Last Updated: December 2024*
