# Quick Start Guide

This guide will help you get the Sensos Proposal application running in 5 minutes.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Get your Google Gemini API key from: https://makersuite.google.com/app/apikey

3. Open `.env` and add your API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

## Step 3: Run Development Server

```bash
npm run dev
```

Visit http://localhost:5173 in your browser.

## Step 4: Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Step 5: Deploy

Choose your preferred platform:

### Vercel (Fastest - Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

### Manual Deployment
Simply upload the contents of the `dist` folder to any static hosting service.

## Troubleshooting

**Problem:** "Failed to load module"
- **Solution:** Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Problem:** AI features not working
- **Solution:** Check that your VITE_GEMINI_API_KEY is set correctly in `.env`

**Problem:** Build fails
- **Solution:** Ensure you're using Node.js v16 or higher (`node --version`)

## Need Help?

Refer to the main [README.md](./README.md) for detailed documentation.
