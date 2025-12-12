# GitHub Copilot Instructions - Sensos Proposal Site

## Repository Overview

This repository contains the **Sensos Proposal Site** - an innovative AI-powered supply chain platform proposal site showcasing "The Singularity" concept, where visibility collapses into action. The site features LIA (Logistics Intelligence Agent), the world's first agentic supply chain employee, with interactive AI demonstrations powered by Google Gemini AI.

### Purpose
- Showcase Sensos AI-powered supply chain solutions
- Demonstrate real-time crisis scenario simulations (Aviation, Pharma, Retail)
- Present professional pricing and value propositions
- Provide interactive AI-powered features (Meme Generator, Voice Engine)

## Technology Stack

- **Frontend Framework**: React 18.3 with JSX
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **AI Integration**: Google Gemini AI (@google/generative-ai)
- **Development**: ESLint for code quality
- **Hosting**: Vercel (primary), Netlify (alternative)

## Project Structure

```
/home/runner/work/Sensos-proposal-/Sensos-proposal-/
├── .github/
│   ├── workflows/          # CI/CD pipelines
│   └── copilot-instructions.md  # This file
├── src/
│   ├── App.jsx            # Main React component (all UI logic)
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles with Tailwind
├── public/                # Static assets
├── docs/                  # Additional documentation
├── .env.example           # Environment template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── .eslintrc.cjs          # ESLint configuration
└── DEPLOYMENT.md          # Comprehensive deployment guide
```

## Coding Standards

### JavaScript/React Standards
- **Follow ESLint rules** defined in `.eslintrc.cjs`
- Use **functional components** and React Hooks
- Use **JSX runtime** (no need to import React explicitly)
- **Prop-types validation**: Disabled (type safety via comments if needed)
- **Naming conventions**:
  - Components: PascalCase (e.g., `SensosProposal`)
  - Functions: camelCase (e.g., `handleClick`)
  - Constants: UPPER_SNAKE_CASE for true constants
- **No unused variables**: Use ESLint to catch warnings
- **React Hooks**: Follow exhaustive-deps warnings
- **Comments**: Add comments for complex logic, AI integration, or non-obvious business rules

### Style Guide
- Use **Tailwind CSS** utility classes - avoid custom CSS where possible
- Follow the custom color palette defined in App.jsx:
  - `void: '#050505'` - Singularity Background
  - `neon: '#00FFC2'` - LIA Intelligence
  - `alert: '#FF2A00'` - Risk/Exception
  - `text: '#E5E5E5'` - Titanium White
  - `subtext: '#9CA3AF'` - Muted Code
- Maintain **responsive design** patterns already established
- Use **Lucide React icons** for UI elements

## Environment Variables

### Required Variables
- **`VITE_GEMINI_API_KEY`**: Google Gemini API key (REQUIRED for AI features)
  - Never commit this key to the repository
  - Use `.env.example` as a template
  - In production, set via hosting platform (Vercel/Netlify)

### Optional Variables
- `VITE_APP_NAME`: Application name (default: "Sensos Proposal")
- `VITE_APP_VERSION`: Application version (default: "1.0.0")

## Development Workflow

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
# Configured to run on http://localhost:3000 (not default Vite port 5173)
```

### Build
```bash
npm run build
# Output: dist/ directory
```

### Linting
```bash
npm run lint
# Must pass with zero warnings (--max-warnings 0) before PR approval
```

### Preview Production Build
```bash
npm run preview
```

## Testing Requirements

- **No formal test suite**: This is a proposal/demo site without unit tests
- **Manual testing required**:
  - Test all interactive features (AI demos, voice engine, meme generator)
  - Verify responsive design on multiple screen sizes
  - Test navigation and smooth scrolling behavior
  - Validate AI features with valid Gemini API key
- **Build verification**: `npm run build` must complete successfully
- **Lint verification**: `npm run lint` must pass with zero errors

## CI/CD Pipeline

Located in `.github/workflows/deploy.yml`:

1. **Lint Job**: Runs ESLint (continues on error - failures don't block pipeline)
2. **Build Job**: Compiles production build (must succeed)
3. **Deploy Job**: Deploys to Vercel (main branch only)
4. **Docker Job**: Builds Docker image (optional, main branch only)

### Branch Strategy
- `main`: Production branch - auto-deploys to Vercel
- `develop`: Development branch - CI checks only
- Feature branches: Create from `develop`, PR to `develop`

## Special Considerations

### Security
- **Never commit API keys** or secrets to the repository
- Use environment variables for all sensitive data
- The `.env` file is gitignored - never remove it from `.gitignore`
- API key must be prefixed with `VITE_` to be exposed to the frontend

### AI Integration
- Google Gemini API is used for AI features
- Error handling is implemented for API failures
- Rate limiting may apply - handle gracefully
- API responses are displayed in real-time with streaming

### Performance
- Code splitting is configured in `vite.config.js` for vendor chunks
- Lazy loading should be considered for large components
- Images should be optimized before adding to `public/` directory

### Areas Requiring Care
- **App.jsx**: Main component with all UI logic - changes here affect entire app
- **API Integration**: Google Gemini AI code - test thoroughly
- **Environment Variables**: Ensure proper VITE_ prefix for frontend access
- **Build Configuration**: Changes to vite.config.js or tailwind.config.js impact build

## Acceptance Criteria for PRs

### Every PR Must Include:
1. **Clear description** of changes and why they were made
2. **Reference to related issue** (if applicable)
3. **Successful build**: `npm run build` must complete without errors
4. **Passing lint**: `npm run lint` with zero errors
5. **Manual testing results**: Describe what was tested and verified
6. **No console errors**: Check browser console for JS errors
7. **Responsive design**: Test on mobile/tablet/desktop if UI changed
8. **No committed secrets**: Double-check no API keys in code
9. **Updated documentation**: If adding features, update README.md

### Code Review Checklist:
- [ ] Code follows ESLint rules and style guide
- [ ] No unused imports or variables
- [ ] Proper error handling for async operations
- [ ] Tailwind classes used appropriately
- [ ] Component structure follows React best practices
- [ ] Environment variables properly used (VITE_ prefix)
- [ ] No breaking changes to existing features
- [ ] Build artifacts (dist/) not committed

## Contact & Collaboration

- **Repository Owner**: Casey Larkin (The Freight Marketer)
- **License**: MIT
- **Issues**: Use GitHub Issues for bugs and feature requests
- **PR Etiquette**: 
  - Use descriptive commit messages
  - Keep PRs focused and small
  - Respond to review comments promptly
  - If Copilot needs to make changes, mention @copilot in PR comments

## Helpful Commands Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview

# Check for outdated packages
npm outdated

# Update dependencies (with care)
npm update
```

## Additional Resources

- **Deployment Guide**: See `DEPLOYMENT.md` for comprehensive deployment instructions
- **Documentation**: Check `docs/` directory for additional guides
- **Environment Setup**: Use `.env.example` as template for `.env` file
- **GitHub Actions**: Review `.github/workflows/deploy.yml` for CI/CD pipeline

---

**Remember**: This is a high-visibility proposal site for a client. Changes should be professional, well-tested, and maintain the existing cyberpunk aesthetic and "Singularity" brand identity. Quality over speed!
