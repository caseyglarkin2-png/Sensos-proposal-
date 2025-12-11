# Sensos Proposal - Interactive React Application

A cutting-edge, interactive proposal application for Sensos x DWTB built with React, featuring AI-powered simulations using Google's Gemini API.

## 🚀 Live Deployment Guide

This guide will help you deploy this React application to production.

### Prerequisites

Before deploying, ensure you have:
- Node.js (v16 or higher)
- npm or yarn package manager
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Option 1: Deploy to Vercel (Recommended - Fastest)

Vercel is perfect for React applications and offers zero-configuration deployments.

#### Steps:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Prepare your project:**
   - Ensure you have a `package.json` file in your project root (see setup section below)
   - Make sure all dependencies are listed

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Add your Google Gemini API key as an environment variable when prompted

4. **Set Environment Variables:**
   - Go to your Vercel dashboard
   - Navigate to Project Settings → Environment Variables
   - Add: `VITE_GEMINI_API_KEY` = your API key
   - Redeploy to apply changes

**Deploy URL:** After deployment, Vercel provides a live URL (e.g., `your-app.vercel.app`)

### Option 2: Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your project:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```
   - Choose the `dist` folder when prompted
   - Add environment variables in Netlify dashboard

### Option 3: Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/sensos-proposal",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Option 4: Deploy to AWS Amplify

1. **Install Amplify CLI:**
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Initialize and deploy:**
   ```bash
   amplify init
   amplify add hosting
   amplify publish
   ```

## 🛠️ Local Development Setup

### 1. Create Project Structure

If you don't have a complete React project yet, here's how to set it up:

```bash
# Create a new Vite + React project
npm create vite@latest sensos-proposal -- --template react

# Navigate to project
cd sensos-proposal

# Install dependencies
npm install
```

### 2. Install Required Dependencies

```bash
# Core dependencies
npm install react react-dom

# UI and Icons
npm install lucide-react

# AI Integration
npm install @google/generative-ai

# Tailwind CSS (for styling)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configure Tailwind CSS

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fadeIn': 'fadeIn 0.5s ease-in',
        'slideRight': 'slideRight 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}
```

### 4. Set Up Environment Variables

Create a `.env` file in your project root:

```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

**Important:** Never commit your `.env` file to version control!

Update your component to use environment variables:

```javascript
// In your component, replace:
const apiKey = ""; 

// With:
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
```

### 5. Project Structure

```
sensos-proposal/
├── public/
├── src/
│   ├── App.jsx              # Main app component
│   ├── main.jsx            # Entry point
│   ├── index.css           # Tailwind imports
│   └── components/
│       └── SensosProposal.jsx  # Your proposal component
├── .env                     # Environment variables (don't commit!)
├── .env.example            # Template for environment variables
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

### 6. Run Locally

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Your app will be available at `http://localhost:5173`

## 🔐 Environment Variables

This application requires the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI features | Yes |

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

## 📦 Dependencies

- **React** - UI framework
- **lucide-react** - Icon library
- **@google/generative-ai** - Google Gemini AI integration
- **Tailwind CSS** - Styling framework

## 🎨 Features

- **Interactive Hero Section** - Engaging landing page
- **LIA AI Simulation** - Real-time AI-powered supply chain simulations
- **Strategy Visualization** - Dynamic problem/solution showcase
- **Manifest 2026 Section** - Event details and interactive war game
- **Pricing Calculator** - Transparent bid comparison
- **Responsive Design** - Mobile-first approach

## 🔧 Troubleshooting

### Common Issues

**1. API Key Not Working**
- Verify your API key is correct
- Check that environment variables are properly set
- For production, ensure environment variables are set in your hosting platform

**2. Build Fails**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be v16+)

**3. Styles Not Loading**
- Ensure Tailwind is properly configured
- Check that `index.css` imports Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

## 📝 Deployment Checklist

Before going live:

- [ ] Test all features locally
- [ ] Set up environment variables in your hosting platform
- [ ] Configure custom domain (if applicable)
- [ ] Test on multiple devices and browsers
- [ ] Enable HTTPS (usually automatic with Vercel/Netlify)
- [ ] Set up analytics (optional)
- [ ] Configure error tracking (optional)

## 🚦 Quick Deploy Commands

```bash
# For Vercel
vercel --prod

# For Netlify
netlify deploy --prod

# For GitHub Pages
npm run deploy

# For AWS Amplify
amplify publish
```

## 📞 Support

For issues or questions:
- Check the documentation above
- Review error messages in browser console
- Verify all dependencies are installed
- Ensure API keys are properly configured

## 🎯 Next Steps After Deployment

1. **Custom Domain:** Configure a custom domain in your hosting platform
2. **Analytics:** Add Google Analytics or similar tracking
3. **SEO:** Add meta tags and optimize for search engines
4. **Performance:** Monitor performance with Lighthouse
5. **Monitoring:** Set up error tracking with Sentry or similar

---

**Made with ⚡ by Casey Larkin - The Freight Marketer**

*"You Merely Adopted the Supply Chain. We Were Born In It."*
