# Deployment Guide for dwtb.dev

This project is now ready to be deployed to dwtb.dev. Follow these steps to complete the deployment:

## GitHub Pages Setup

1. **Enable GitHub Pages**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Under "Build and deployment", select "GitHub Actions" as the source
   - The workflow is already configured in `.github/workflows/deploy.yml`

2. **Trigger the Deployment**
   - Merge this pull request to the `main` branch
   - The GitHub Actions workflow will automatically build and deploy the site
   - You can monitor the deployment in the "Actions" tab of your repository

3. **Custom Domain Configuration (dwtb.dev)**
   - In GitHub Pages settings, add `dwtb.dev` as a custom domain
   - In your DNS provider (where dwtb.dev is registered):
     - Add a CNAME record pointing `dwtb.dev` to `caseyglarkin2-png.github.io`
     - Or use an A record pointing to GitHub Pages IP addresses:
       - `185.199.108.153`
       - `185.199.109.153`
       - `185.199.110.153`
       - `185.199.111.153`
   - Wait for DNS propagation (can take up to 24 hours)

4. **Enable HTTPS**
   - Once the custom domain is verified, enable "Enforce HTTPS" in GitHub Pages settings
   - GitHub will automatically provision an SSL certificate

## Alternative: Direct Hosting

If dwtb.dev uses a different hosting provider:

1. **Build the project**
   ```bash
   npm install
   npm run build
   ```

2. **Upload the `dist` folder**
   - The `dist` folder contains all the production-ready files
   - Upload the contents to your web server
   - Point the domain to the uploaded files

## Verification

Once deployed, visit dwtb.dev to verify:
- The site loads correctly
- All sections are interactive (Strategy, LIA, Manifest, Bid)
- The LIA simulation works with different verticals (AOG, Wine, Pharma)
- Responsive design works on mobile devices

## Troubleshooting

- **404 errors**: Ensure the base URL in `vite.config.js` matches your deployment path
- **Blank page**: Check browser console for errors, ensure all dependencies are included
- **API errors**: The Google Generative AI integration requires an API key (configured in the component)
