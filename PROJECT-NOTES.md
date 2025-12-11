# Project Notes

## File Structure

This repository contains a React application for the Sensos x DWTB proposal.

### Original Files
- `Sensos Proposal BWTB` - Original React component file (kept for reference)
- This file has been copied to `src/App.jsx` and integrated into the proper React project structure

### Current Project Structure
```
sensos-proposal/
├── src/
│   ├── App.jsx          # Main application component (from "Sensos Proposal BWTB")
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS imports and custom styles
├── public/              # Static assets (create as needed)
├── .env.example         # Environment variable template
├── .gitignore           # Git ignore rules
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── README.md            # Main documentation
├── QUICKSTART.md        # Quick start guide
└── DEPLOYMENT-CHECKLIST.md  # Pre-deployment checklist
```

## Development Workflow

1. **First Time Setup:**
   ```bash
   npm install
   cp .env.example .env
   # Edit .env and add your VITE_GEMINI_API_KEY
   ```

2. **Daily Development:**
   ```bash
   npm run dev
   ```

3. **Before Deploying:**
   ```bash
   npm run build
   npm run preview  # Test production build locally
   ```

4. **Deploy:**
   ```bash
   vercel  # or netlify deploy --prod
   ```

## Key Features

- **Interactive Sections:** Home, Strategy, LIA Demo, Manifest 2026, Bid
- **AI Integration:** Google Gemini API for dynamic content generation
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Animations:** Custom animations and transitions
- **TypeScript-ready:** Can be converted to TypeScript if needed

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library
- **Google Generative AI** - AI-powered features

## Environment Variables

- `VITE_GEMINI_API_KEY` - Required for AI features
  - Get from: https://makersuite.google.com/app/apikey
  - Set in `.env` for local development
  - Set in hosting platform dashboard for production

## Customization

To customize the application:

1. **Branding:** Update colors in `src/App.jsx` (lines 34-40)
2. **Content:** Edit section components in `src/App.jsx`
3. **Styles:** Modify `tailwind.config.js` or `src/index.css`
4. **AI Model:** Change model name in `src/App.jsx` (line 154)

## Maintenance

- Update dependencies: `npm update`
- Check for security issues: `npm audit`
- Format code: Add Prettier if needed
- Lint code: Add ESLint if needed

## Troubleshooting

See [README.md](./README.md) for detailed troubleshooting steps.
