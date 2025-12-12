# Publishing Checklist for dwtb.dev

## Current Status: ✅ Code Ready, 🔧 Deployment Pending

The Sensos Proposal application is **production-ready** and verified. To publish to dwtb.dev, complete these steps:

---

## Step 1: Merge This PR ✅ Ready

**Action**: Merge PR #11 to main branch

This PR contains:
- Complete deployment documentation
- Build verification (2.69s, 250KB bundle)
- All quality checks passed

**How to merge**:
1. Review this PR
2. Click "Ready for review" to remove draft status (if needed)
3. Click "Merge pull request"
4. Confirm merge

---

## Step 2: Close PR #1 ✅ Ready

**Action**: Close PR #1 as superseded

PR #1 is outdated and has merge conflicts. It's been superseded by the current main branch.

**How to close**:
1. Go to PR #1
2. Add comment: "Closing as superseded by current main branch. All features have been implemented via PR #10 and documented in PR #11."
3. Click "Close pull request"

---

## Step 3: Configure GitHub Secrets 🔧 Required

**Action**: Add deployment secrets to GitHub repository

The GitHub Actions workflow is configured but needs these secrets:

### Required Secrets

Navigate to: `Repository Settings` → `Secrets and variables` → `Actions` → `New repository secret`

Add these 4 secrets:

1. **VERCEL_TOKEN**
   - Get from: https://vercel.com/account/tokens
   - Create new token with name: "Sensos Deployment"
   - Copy and paste token value

2. **VERCEL_ORG_ID**
   - Get from: Vercel dashboard → Settings → General → "Your ID"
   - Copy org ID

3. **VERCEL_PROJECT_ID**
   - Create project at: https://vercel.com/new
   - Import GitHub repository
   - Go to project Settings → General → "Project ID"
   - Copy project ID

4. **VITE_GEMINI_API_KEY**
   - Get from: https://makersuite.google.com/app/apikey
   - Sign in with Google account
   - Create API key
   - Copy API key

---

## Step 4: Configure Vercel Project 🔧 Required

**Action**: Set up Vercel project for automatic deployment

### 4.1 Create Vercel Project

1. Go to https://vercel.com/new
2. Import your GitHub repository: `caseyglarkin2-png/Sensos-proposal-`
3. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variable:
   - Name: `VITE_GEMINI_API_KEY`
   - Value: Your Google Gemini API key

5. Click "Deploy"

### 4.2 Add Custom Domain

After first deployment:

1. Go to project Settings → Domains
2. Add domain: `dwtb.dev`
3. Add domain: `www.dwtb.dev`
4. Vercel will show DNS configuration needed

---

## Step 5: Configure DNS 🔧 Required

**Action**: Point dwtb.dev to Vercel

Go to your domain registrar's DNS settings and add:

### For Root Domain (dwtb.dev)

**Option A - CNAME (Recommended)**:
- Type: `CNAME`
- Name: `@` or leave blank
- Value: `cname.vercel-dns.com`
- TTL: `3600` (or Auto)

**Option B - A Record**:
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)
- TTL: `3600`

### For WWW Subdomain

- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: `3600`

**Note**: DNS propagation takes 1-48 hours (usually 1-2 hours)

---

## Step 6: Verify Deployment ✅ After Steps 1-5

**Action**: Confirm the site is live

### Automatic Deployment (after merging to main)

Once you merge to main and GitHub secrets are configured:
1. GitHub Actions will automatically deploy to Vercel
2. Check deployment status: `Actions` tab in GitHub
3. View deployment: https://dwtb.dev (after DNS propagates)

### Manual Verification

1. **Site loads**: Visit https://dwtb.dev
2. **HTTPS works**: Check for lock icon in browser
3. **AI features work**: Test the LIA simulation
4. **Mobile responsive**: Test on mobile device
5. **Performance**: Page load < 3 seconds

### Check Deployment Status

**GitHub Actions**:
- Go to repository → Actions tab
- Look for "CI/CD Pipeline" workflow
- Should show green checkmark when deployed

**Vercel Dashboard**:
- Go to https://vercel.com
- Select your project
- View deployments and logs

---

## Alternative: Manual Deployment (No GitHub Actions)

If you prefer to skip GitHub Actions:

### Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
cd /path/to/Sensos-proposal-
vercel --prod
```

The CLI will:
1. Upload your code
2. Build the application
3. Deploy to Vercel
4. Provide deployment URL

Then add custom domain `dwtb.dev` in Vercel dashboard.

---

## Quick Reference: What Each Tool Does

| Tool | Purpose | Required? |
|------|---------|-----------|
| GitHub Actions | Automatic deployment on push to main | Optional |
| Vercel | Hosting platform, CDN, SSL | Required |
| Vercel CLI | Manual deployment | Optional |
| DNS Provider | Point dwtb.dev to Vercel | Required |
| Google Gemini API | Powers AI features | Required |

---

## Troubleshooting

### "GitHub Actions deployment failed"

**Check**:
1. All 4 secrets are set correctly
2. Secret names match exactly (case-sensitive)
3. Vercel token has deployment permissions

**Fix**: Update secrets in repository settings

### "Site shows 404 or not found"

**Check**:
1. DNS has propagated (use https://dnschecker.org)
2. Domain added in Vercel dashboard
3. Deployment succeeded on Vercel

**Fix**: Wait for DNS or check Vercel configuration

### "AI features don't work"

**Check**:
1. `VITE_GEMINI_API_KEY` is set in Vercel
2. API key is valid (test at https://makersuite.google.com)
3. Check browser console for errors (F12)

**Fix**: Update environment variable in Vercel

---

## Summary: 3 Paths to Publish

### Path 1: Full Automation (Recommended)
1. ✅ Merge PR #11
2. 🔧 Configure GitHub secrets (4 secrets)
3. 🔧 Set up Vercel project
4. 🔧 Configure DNS
5. ✅ Push to main → Auto-deploy

**Time**: ~30 minutes setup, auto-deploy forever

### Path 2: Manual with CLI
1. ✅ Merge PR #11
2. 🔧 Install Vercel CLI
3. 🔧 Run `vercel --prod`
4. 🔧 Configure DNS
5. ✅ Deployed

**Time**: ~15 minutes per deployment

### Path 3: Vercel GitHub Integration Only
1. ✅ Merge PR #11
2. 🔧 Connect GitHub to Vercel
3. 🔧 Configure in Vercel dashboard
4. 🔧 Configure DNS
5. ✅ Auto-deploy on push

**Time**: ~20 minutes setup, auto-deploy forever

---

## Current Blockers

❌ **Cannot proceed without**:
- GitHub secrets (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID, VITE_GEMINI_API_KEY)
- Vercel account access
- DNS configuration access for dwtb.dev

✅ **Already completed**:
- Code is production-ready
- Build verified (2.69s)
- Documentation complete
- Quality checks passed

---

## Need Help?

- **Deployment docs**: See [DEPLOYMENT-DWTB.md](./DEPLOYMENT-DWTB.md)
- **General setup**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **PR #1 details**: See [PR1-ANALYSIS.md](./PR1-ANALYSIS.md)

---

**Ready to publish?** Start with Step 1 (merge this PR), then complete Steps 3-5 to go live!

*Last updated: December 12, 2025*
