# Project Setup Guide

This guide will walk you through setting up the Sensos Proposal site for local development.

## System Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (comes with Node.js)
- **Git**: Latest version
- **Operating System**: Windows, macOS, or Linux
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## Step-by-Step Setup

### 1. Install Node.js

If you don't have Node.js installed:

**Windows/macOS:**
- Download from [nodejs.org](https://nodejs.org/)
- Install the LTS (Long Term Support) version
- Verify installation:
```bash
node --version
npm --version
```

**Linux:**
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/caseyglarkin2-png/Sensos-proposal-.git

# Navigate to the project directory
cd Sensos-proposal-
```

### 3. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React and React DOM
- Vite (build tool)
- Tailwind CSS
- Lucide React (icons)
- Google Generative AI SDK

### 4. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Open .env in your text editor
nano .env
# or
code .env
```

Add your Google Gemini API key:
```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

#### Getting a Google Gemini API Key:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Paste it into your `.env` file

### 5. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

You should see output like:
```
VITE v5.4.11  ready in 320 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### 6. Verify Installation

Open your browser and navigate to `http://localhost:3000`

You should see:
- The Sensos proposal homepage
- Smooth animations
- Navigation working correctly
- If your API key is configured, AI features should work

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

Features:
- Hot Module Replacement (HMR) - changes reflect instantly
- Fast refresh for React components
- Error overlay in browser

### Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Previewing Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

### Linting Code

```bash
npm run lint
```

This checks your code for common errors and style issues.

## Project Structure Explained

```
Sensos-proposal-/
├── .github/
│   └── workflows/          # CI/CD automation
│       └── deploy.yml      # GitHub Actions workflow
├── docs/                   # Documentation
│   ├── SETUP.md           # This file
│   └── SECURITY.md        # Security guidelines
├── public/                # Static assets
├── src/
│   ├── App.jsx           # Main React component
│   ├── main.jsx          # Application entry
│   └── index.css         # Global styles
├── .env.example          # Environment template
├── .eslintrc.cjs         # ESLint configuration
├── .gitignore            # Git ignore rules
├── DEPLOYMENT.md         # Deployment guide
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose config
├── index.html            # HTML entry point
├── netlify.toml          # Netlify configuration
├── nginx.conf            # Nginx configuration
├── package.json          # Dependencies & scripts
├── postcss.config.js     # PostCSS configuration
├── README.md             # Main documentation
├── tailwind.config.js    # Tailwind CSS config
├── vercel.json           # Vercel configuration
└── vite.config.js        # Vite build config
```

## Common Issues and Solutions

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

Or change the port in `vite.config.js`:
```javascript
server: {
  port: 3001  // Use a different port
}
```

### Issue: Module not found errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Tailwind CSS not working

**Solution:**
1. Verify `tailwind.config.js` exists
2. Check that `src/index.css` includes Tailwind directives
3. Restart the development server

### Issue: AI features not working

**Solutions:**
1. Verify API key is set in `.env`
2. Check API key is valid in Google Cloud Console
3. Open browser console to see error messages
4. Ensure you have internet connectivity

### Issue: Build fails

**Solutions:**
1. Check Node.js version: `node --version` (should be 18+)
2. Update dependencies: `npm update`
3. Clear build cache: `rm -rf dist`
4. Try building again: `npm run build`

## IDE Setup

### VS Code (Recommended)

Install recommended extensions:
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

Recommended `settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### WebStorm

WebStorm has built-in support for:
- React
- Tailwind CSS
- ESLint
- Vite

Just open the project and it will configure automatically.

## Understanding Key Technologies

### Vite
- Modern build tool
- Lightning-fast HMR
- Optimized production builds
- Native ES modules

### React
- Component-based UI library
- Version 18 with concurrent features
- Hooks for state management

### Tailwind CSS
- Utility-first CSS framework
- Custom design system
- Responsive by default
- Small production bundle

### Google Gemini AI
- Powers LIA demonstrations
- Real-time crisis generation
- AI-driven simulations

## Next Steps

1. **Explore the codebase**: Start with `src/App.jsx`
2. **Customize content**: Update text, colors, and sections
3. **Add features**: Extend LIA capabilities
4. **Deploy**: Follow [DEPLOYMENT.md](../DEPLOYMENT.md)

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Google Gemini API](https://ai.google.dev/)

## Getting Help

If you encounter issues:
1. Check this guide's troubleshooting section
2. Review the [README.md](../README.md)
3. Check the [DEPLOYMENT.md](../DEPLOYMENT.md) for production issues
4. Create an issue on GitHub with:
   - Node.js version
   - npm version
   - Operating system
   - Error message
   - Steps to reproduce

---

**Happy coding!** 🚀

Built with ❤️ by Casey Larkin
