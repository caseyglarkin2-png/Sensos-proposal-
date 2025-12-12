# Deploying Sensos Proposal to dwtb.dev

This guide provides step-by-step instructions for deploying the Sensos Proposal React application to the dwtb.dev domain.

## Prerequisites

- Access to dwtb.dev DNS settings
- Google Gemini API key
- One of the following deployment platforms:
  - Vercel account (recommended)
  - Netlify account
  - Custom server with Node.js 18+

## Quick Start - Deploy Now

### Option 1: Vercel (Recommended for dwtb.dev)

Vercel provides the simplest deployment with custom domain support.

#### 1. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from this directory
vercel --prod
```

Or use the Vercel GitHub Integration:
1. Go to https://vercel.com/new
2. Import this GitHub repository
3. Configure environment variables (see below)
4. Deploy

#### 2. Configure Environment Variables in Vercel

In your Vercel project settings, add:
- `VITE_GEMINI_API_KEY` = your Google Gemini API key

#### 3. Add Custom Domain dwtb.dev

1. In Vercel project settings, go to "Domains"
2. Add `dwtb.dev` and `www.dwtb.dev`
3. Vercel will provide DNS configuration instructions

#### 4. Configure DNS for dwtb.dev

Point your domain to Vercel:
- **Type**: CNAME
- **Name**: `@` or `dwtb.dev`
- **Value**: `cname.vercel-dns.com`

For www subdomain:
- **Type**: CNAME
- **Name**: `www`
- **Value**: `cname.vercel-dns.com`

**DNS Propagation**: May take up to 48 hours, typically 1-2 hours

### Option 2: Netlify

#### 1. Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

Or use Netlify's GitHub Integration:
1. Go to https://app.netlify.com/start
2. Connect your GitHub repository
3. Configure build settings (already set in netlify.toml)
4. Deploy

#### 2. Configure Environment Variables

In Netlify project settings:
- `VITE_GEMINI_API_KEY` = your Google Gemini API key

#### 3. Add Custom Domain

1. In Netlify project settings, go to "Domain management"
2. Add custom domain: `dwtb.dev`
3. Follow DNS configuration instructions

DNS settings:
- **Type**: A
- **Name**: `@`
- **Value**: `75.2.60.5` (Netlify load balancer)

For www:
- **Type**: CNAME
- **Name**: `www`
- **Value**: `<your-site>.netlify.app`

### Option 3: Custom Server / VPS

If you have your own server for dwtb.dev:

#### 1. Build the Application

```bash
npm install
npm run build
```

This creates a `dist/` directory with static files.

#### 2. Configure Web Server

**Nginx Configuration** (recommended):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name dwtb.dev www.dwtb.dev;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name dwtb.dev www.dwtb.dev;

    # SSL configuration (use certbot for Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/dwtb.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dwtb.dev/privkey.pem;

    root /var/www/dwtb.dev/dist;
    index index.html;

    # SPA routing - all requests go to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### 3. Deploy Files

```bash
# Copy built files to server
scp -r dist/* user@dwtb.dev:/var/www/dwtb.dev/

# Or use rsync
rsync -avz dist/ user@dwtb.dev:/var/www/dwtb.dev/
```

#### 4. Setup SSL Certificate

```bash
# Using certbot (Let's Encrypt)
sudo certbot --nginx -d dwtb.dev -d www.dwtb.dev
```

## Environment Variables

The application requires one environment variable:

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI features | Yes | `AIzaSy...` |

### Getting Google Gemini API Key

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your deployment platform

**Security Note**: Never commit API keys to git. Always use environment variables or secrets management.

## Post-Deployment Verification

After deployment, verify:

1. **Site loads**: Visit https://dwtb.dev
2. **SSL works**: Check for HTTPS lock icon
3. **AI features work**: Test the LIA simulation (requires API key)
4. **All sections render**: Scroll through the page
5. **Mobile responsive**: Test on mobile device
6. **Performance**: Check page load time (should be < 3s)

## Monitoring and Maintenance

### Check Deployment Status

**Vercel**:
```bash
vercel list
```

**Netlify**:
```bash
netlify status
```

### View Logs

**Vercel**: View in dashboard at https://vercel.com
**Netlify**: View in dashboard at https://app.netlify.com

### Update Deployment

Simply push to the main branch (if using GitHub integration) or run:

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod
```

## Troubleshooting

### DNS Not Resolving

```bash
# Check DNS propagation
dig dwtb.dev
nslookup dwtb.dev

# Force DNS flush (on your local machine)
# macOS
sudo dscacheutil -flushcache

# Windows
ipconfig /flushdns

# Linux
sudo systemd-resolve --flush-caches
```

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### AI Features Not Working

1. Verify `VITE_GEMINI_API_KEY` is set in deployment platform
2. Check API key is valid at https://makersuite.google.com/app/apikey
3. Check browser console for errors (F12)
4. Verify API quota hasn't been exceeded

### 404 on Routes

Ensure your hosting platform is configured for SPA (Single Page Application) routing:
- All routes should redirect to `/index.html`
- Check `vercel.json` or `netlify.toml` configuration

## Security Checklist

- [ ] SSL/TLS certificate is active (HTTPS)
- [ ] API keys are stored as environment variables, not in code
- [ ] CORS is properly configured
- [ ] Security headers are set (X-Frame-Options, etc.)
- [ ] Regular dependency updates via `npm audit`
- [ ] Monitor for security vulnerabilities

## Performance Optimization

The build is already optimized, but you can verify:

```bash
# Check bundle size
npm run build

# Preview production build locally
npm run preview
```

Expected bundle sizes:
- Total: ~250 KB
- Gzipped: ~70 KB
- Load time: < 3 seconds on 3G

## Support

For deployment issues:
- Check the main [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides
- Review [docs/SETUP.md](./docs/SETUP.md) for development setup
- Create an issue in the GitHub repository

## Quick Reference Commands

```bash
# Build for production
npm run build

# Test production build locally
npm run preview

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod

# Check build size
du -sh dist/

# Verify environment variables (local)
cat .env
```

---

**Ready to deploy?** Choose Option 1 (Vercel) for the fastest deployment to dwtb.dev.

Last updated: December 2025
