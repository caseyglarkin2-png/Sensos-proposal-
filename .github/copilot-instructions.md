# Copilot Instructions for Sensos Proposal Site

## Project Overview

This is a **React-based single-page application** showcasing Sensos, an AI-powered supply chain platform. The site features interactive demonstrations of LIA (Logistics Intelligence Agent) powered by Google Gemini AI, with crisis scenario simulations for Aviation, Pharma, and Retail industries.

### Technology Stack
- **Frontend**: React 18 with JSX
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3 with PostCSS
- **Icons**: Lucide React
- **AI Integration**: Google Gemini AI (@google/generative-ai)
- **Linting**: ESLint with React plugins
- **Deployment**: Vercel/Netlify (production), Docker (optional)

## Repository Structure

```
.
├── .github/
│   └── workflows/        # CI/CD pipelines
├── src/
│   ├── App.jsx          # Main React component with all features
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles with Tailwind directives
├── public/              # Static assets
├── docs/                # Additional documentation
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── .eslintrc.cjs        # ESLint configuration
├── README.md            # Project documentation
├── DEPLOYMENT.md        # Deployment guide
└── .env.example         # Environment variable template
```

## Development Setup

### Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)
- Google Gemini API key for AI features

### Installation and Running
1. Install dependencies: `npm install`
2. Copy environment template: `cp .env.example .env`
3. Add your Gemini API key to `.env`: `VITE_GEMINI_API_KEY=your_key_here`
4. Start dev server: `npm run dev` (opens on http://localhost:3000)
5. Preview production build: `npm run preview`

## Build and Test Commands

| Command | Purpose | Notes |
|---------|---------|-------|
| `npm run dev` | Start development server | Hot reload enabled, uses Vite |
| `npm run build` | Build for production | Outputs to `dist/` directory |
| `npm run preview` | Preview production build | Serves the `dist/` folder locally |
| `npm run lint` | Run ESLint checks | Checks JS/JSX files for code quality |

### Build Requirements
- Building requires `VITE_GEMINI_API_KEY` environment variable to be set
- Build outputs to `dist/` directory
- Production builds are optimized and minified by Vite

## Code Standards and Conventions

### React and JavaScript
- Use **functional components** with hooks (no class components)
- Use **JSX** syntax for React components
- Follow **ESLint rules** defined in `.eslintrc.cjs`
- Use **ES6+ features** (arrow functions, destructuring, etc.)
- Prefer **const** over let, avoid var

### Styling
- Use **Tailwind CSS utility classes** for styling
- Follow the **cyberpunk/neon aesthetic** established in the design
- Color palette: Primary #00FFC2 (cyan/teal), with dark backgrounds
- Keep responsive design in mind (mobile-first approach)

### File Organization
- Keep components in `src/App.jsx` (single-file application)
- Global styles go in `src/index.css`
- Static assets in `public/` directory
- Configuration files at root level

### Naming Conventions
- Components: PascalCase (e.g., `SimulationBox`, `PricingCard`)
- Functions: camelCase (e.g., `handleSubmit`, `generateCrisis`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_KEY`, `MAX_RETRIES`)
- CSS classes: Use Tailwind utilities (kebab-case for custom classes)

## Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the frontend.

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_GEMINI_API_KEY` | Google Gemini AI API key | Yes | None |
| `VITE_APP_NAME` | Application name | No | "Sensos Proposal" |
| `VITE_APP_VERSION` | Application version | No | From package.json |

**Security Note**: Never commit API keys or secrets to the repository. Use `.env` files (which are gitignored) for local development and GitHub Secrets for CI/CD.

## Deployment

### Primary Deployment: Vercel
- Deployment is automated via GitHub Actions (see `.github/workflows/deploy.yml`)
- Pushes to `main` branch trigger production deployment
- Requires secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `VITE_GEMINI_API_KEY`

### Alternative Deployments
- **Netlify**: Configuration in `netlify.toml`
- **Docker**: Dockerfile and docker-compose.yml included
- **Manual**: Build with `npm run build` and serve `dist/` directory

See `DEPLOYMENT.md` for comprehensive deployment instructions.

## AI Integration

### Google Gemini AI
- Used for generating crisis scenarios in AI demonstrations
- Integrated via `@google/generative-ai` package
- API calls are made from the frontend (client-side)
- Model used: `gemini-1.5-flash`

### When working with AI features:
- Always handle API errors gracefully with try-catch blocks
- Show loading states during API calls
- Validate API responses before using data
- Keep prompts concise and specific for better results
- Test with actual API calls when possible

## Testing

Currently, there is **no formal test suite** in this project. When adding tests:
- Use Vitest (Vite's test runner) for unit tests
- Use React Testing Library for component tests
- Add test scripts to `package.json`
- Place test files alongside source files (e.g., `App.test.jsx`)

## CI/CD Pipeline

The repository uses GitHub Actions for CI/CD (`.github/workflows/deploy.yml`):

1. **Lint Job**: Runs ESLint on all JS/JSX files
2. **Build Job**: Builds the application and uploads artifacts
3. **Deploy Job**: Deploys to Vercel (main branch only)
4. **Docker Job**: Builds and pushes Docker image (optional)

All jobs run on `push` and `pull_request` events for `main` and `develop` branches.

## Making Changes

### When adding new features:
1. Follow the existing component structure in `App.jsx`
2. Use Tailwind classes for styling to match the design system
3. Ensure responsive design works on mobile, tablet, and desktop
4. Test locally with `npm run dev` before committing
5. Run `npm run lint` to check code quality
6. Run `npm run build` to ensure production build works

### When fixing bugs:
1. Reproduce the bug locally
2. Check browser console for errors
3. Fix the issue with minimal changes
4. Test the fix thoroughly
5. Verify the build still works

### When updating dependencies:
1. Check for breaking changes in release notes
2. Update `package.json` and run `npm install`
3. Test all features locally
4. Update documentation if APIs changed
5. Check for security vulnerabilities with `npm audit`

## Common Pitfalls

- **Missing API Key**: Ensure `VITE_GEMINI_API_KEY` is set in `.env` for AI features to work
- **Port Conflicts**: Dev server runs on port 3000 by default; change in `vite.config.js` if needed
- **Build Errors**: Clear `node_modules` and `dist` directories, then reinstall with `npm install`
- **Tailwind Not Working**: Ensure `index.css` imports Tailwind directives and PostCSS is configured
- **Environment Variables**: Remember the `VITE_` prefix for all frontend environment variables

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Google Gemini AI Documentation](https://ai.google.dev/docs)
- [Project README](../README.md) - Getting started guide
- [Deployment Guide](../DEPLOYMENT.md) - Comprehensive deployment instructions

## Project-Specific Context

### Business Context
- Target audience: Supply chain and logistics companies
- Key differentiator: "The Singularity" - where visibility collapses into action
- Competitive advantage: AI-powered autonomous resolution vs passive dashboards

### Key Features
1. **Hero Section**: "The Singularity" concept with animated visuals
2. **Problem Statement**: Industry challenges with passive visibility
3. **LIA Demonstrations**: Three interactive AI scenarios (AOG, Pharma, Retail)
4. **Manifest 2026**: Event preview with booth concept
5. **Pricing**: Transparent cost comparison with "hometown discount"

### Design Philosophy
- **Cyberpunk/Neon Aesthetic**: Dark backgrounds with cyan (#00FFC2) accents
- **Smooth Animations**: Fade-ins, hover effects, and transitions
- **Professional Yet Bold**: Enterprise-quality with distinctive personality
- **Mobile-First**: Responsive design for all screen sizes

## Acceptance Criteria for Changes

When making changes, ensure:
- [ ] Code follows ESLint rules (no lint errors)
- [ ] Build completes successfully (`npm run build`)
- [ ] Features work in development mode (`npm run dev`)
- [ ] Responsive design maintained (test on different screen sizes)
- [ ] No console errors or warnings in browser
- [ ] AI features work if applicable (with valid API key)
- [ ] Documentation updated if public APIs changed
- [ ] Environment variables documented if added
- [ ] Security best practices followed (no secrets in code)

## Contact

**Project Owner**: Casey Larkin - The Freight Marketer
**License**: MIT License (see LICENSE file)
