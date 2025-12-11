# Pre-Deployment Checklist

Use this checklist before deploying to production.

## Local Setup ✓
- [ ] Node.js v16+ installed (`node --version`)
- [ ] All dependencies installed (`npm install`)
- [ ] `.env` file created with VITE_GEMINI_API_KEY
- [ ] App runs locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)

## Testing ✓
- [ ] All sections navigate correctly
- [ ] LIA AI simulations work for all verticals (AOG, Pharma, Retail)
- [ ] War Game crisis generator works
- [ ] Responsive design tested on mobile
- [ ] All animations working
- [ ] No console errors

## Deployment Platform ✓
- [ ] Choose platform (Vercel / Netlify / GitHub Pages / AWS Amplify)
- [ ] Platform CLI installed (if needed)
- [ ] Account created on platform

## Environment Configuration ✓
- [ ] VITE_GEMINI_API_KEY added to platform environment variables
- [ ] Build command set: `npm run build`
- [ ] Output directory set: `dist`
- [ ] Node version specified (if required by platform)

## Post-Deployment ✓
- [ ] Visit live URL and test all features
- [ ] Check browser console for errors
- [ ] Test on mobile device
- [ ] Verify AI features work in production
- [ ] All links and navigation work
- [ ] Page loads within acceptable time

## Optional Enhancements ✓
- [ ] Custom domain configured
- [ ] SSL/HTTPS enabled (usually automatic)
- [ ] Analytics added (Google Analytics, etc.)
- [ ] Error monitoring (Sentry, etc.)
- [ ] SEO meta tags optimized
- [ ] Social media preview images added

## Common Issues

### API Key Not Working in Production
**Solution:** Ensure environment variable is set in your hosting platform's dashboard, not just locally.

### Build Fails
**Solution:** Check Node.js version on platform matches local version (v16+).

### Styles Missing
**Solution:** Verify Tailwind CSS is properly configured and `index.css` imports are correct.

### Large Bundle Size
**Solution:** Consider code splitting or lazy loading for better performance.

## Quick Deploy Commands

### Vercel
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod
```

### GitHub Pages
```bash
npm run deploy
```

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Google Gemini API Docs](https://ai.google.dev/docs)

---

**Remember:** Always test in production after deployment!
