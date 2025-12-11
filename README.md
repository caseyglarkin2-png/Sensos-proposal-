# Sensos Proposal - BWTB

A React-based interactive proposal for Sensos, built with Vite.

## Features

- Interactive vertical-based scenarios (Aviation, Wine, Pharma)
- LIA (Logistics Intelligence Assistant) simulation
- Modern, responsive design with neon accents
- Real-time simulation demonstrations

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

The application uses Google Generative AI for the LIA simulation. To enable this feature:

1. Create a `.env` file in the root directory
2. Add your Google AI API key:
   ```
   VITE_GOOGLE_AI_API_KEY=your_api_key_here
   ```

**Note:** The API key is optional. If not provided, the LIA simulation will still display but without AI-powered responses.

## Deployment

This project is configured to automatically deploy to GitHub Pages (which can be mapped to dwtb.dev) when changes are pushed to the `main` branch.

The deployment workflow:
1. Builds the project using Vite
2. Deploys to GitHub Pages
3. Makes the site available at the configured domain

## Tech Stack

- React 18
- Vite 5
- Lucide React (icons)
- Google Generative AI
- Tailwind CSS (via inline classes)

## Project Structure

```
├── src/
│   ├── SensosProposal.jsx  # Main component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```
