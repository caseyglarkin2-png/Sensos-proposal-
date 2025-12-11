# AI Features Guide

This guide explains the AI-powered features in the Sensos Proposal site and how to configure them.

## Overview

The proposal site uses **Google Gemini AI** to power interactive demonstrations of LIA (Logistics Intelligence Agent), showcasing real-time AI capabilities for supply chain automation.

## Features

### 1. LIA Simulations

Interactive crisis scenario simulations for three verticals:

- **Aviation (AOG)**: Parts stuck in customs
- **Life Sciences**: Temperature excursion prevention
- **Retail/3PL**: Port disruption mitigation

Each simulation:
- Generates AI-powered log sequences
- Shows real-time decision-making process
- Displays resolution metrics (time saved, cost prevented)
- Falls back to cached data if API is unavailable

### 2. War Game Crisis Generator

Located in the Manifest 2026 section:
- Generates realistic supply chain crisis scenarios
- Creates unique situations for roundtable discussions
- Demonstrates AI creativity and domain knowledge

## Setup

### 1. Get API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key

### 2. Configure Environment

Add to your `.env` file:

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

For production deployments:

**Vercel:**
- Project Settings → Environment Variables
- Add `VITE_GEMINI_API_KEY`

**Netlify:**
- Site Settings → Build & Deploy → Environment
- Add `VITE_GEMINI_API_KEY`

**Docker:**
```bash
docker run -e VITE_GEMINI_API_KEY=your_key sensos-proposal
```

### 3. API Key Security

⚠️ **Important Security Measures:**

1. **Domain Restrictions** (Recommended):
   - Go to Google Cloud Console
   - Navigate to APIs & Services → Credentials
   - Select your API key
   - Add HTTP referrer restrictions:
     ```
     https://yourdomain.com/*
     https://*.vercel.app/*
     ```

2. **API Restrictions**:
   - Restrict to "Generative Language API" only

3. **Usage Quotas**:
   - Set daily request limits
   - Set per-minute rate limits
   - Monitor usage regularly

## Implementation Details

### Code Location

All AI functionality is in `src/App.jsx`:

```javascript
// API Configuration
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash-preview-09-2025" 
});
```

### LIA Simulation Logic

```javascript
const runSimulation = async () => {
  // 1. Initialize
  setSimulationState('initializing');
  
  // 2. Generate AI logs
  const prompt = `Generate technical logs for: ${scenario.trigger}`;
  const result = await model.generateContent(prompt);
  
  // 3. Display logs with animation
  for (const line of logs) {
    addLog(line);
    await wait(600);
  }
  
  // 4. Show resolution
  setSimulationState('resolved');
}
```

### Fallback Strategy

If the API fails or is unavailable:

```javascript
try {
  // Try AI generation
  const result = await model.generateContent(prompt);
  streamData = JSON.parse(result.text());
} catch (e) {
  // Use backup data
  console.error("Gemini AI failed, using backup:", e);
  streamData = scenarios[activeVertical].backupLogs;
  addLog("AI UPLINK UNSTABLE... REVERTING TO LOCAL CACHE");
}
```

This ensures the site works even without an API key (useful for demos).

## Rate Limiting

### Client-Side Throttling

The implementation includes built-in delays:
- 500-600ms between log entries
- 1000-1500ms for analysis phases
- Simulations can't be triggered rapidly

### API Quotas

Google Gemini Free Tier:
- 60 requests per minute
- 1,500 requests per day

For production sites with high traffic, consider:
- Upgrading to a paid plan
- Implementing server-side caching
- Adding a Redis cache layer

## Cost Optimization

### 1. Use Flash Model

We're using `gemini-2.5-flash-preview` which is:
- Faster
- Cheaper
- Sufficient for log generation

### 2. Cache Responses

Consider implementing:

```javascript
// Simple in-memory cache
const cache = {};

const getCachedOrGenerate = async (key, promptFn) => {
  if (cache[key]) return cache[key];
  
  const result = await model.generateContent(promptFn());
  cache[key] = result.text();
  return cache[key];
}
```

### 3. Use Backup Data

The fallback data provides a good user experience without API costs:
- Perfect for preview deployments
- Useful for offline demos
- No API quota consumption

## Monitoring

### Track API Usage

1. **Google Cloud Console**:
   - Navigate to APIs & Services → Dashboard
   - View "Generative Language API" metrics
   - Monitor request counts and errors

2. **Client-Side Logging**:
   ```javascript
   // Add tracking
   try {
     const result = await model.generateContent(prompt);
     analytics.track('ai_generation_success');
   } catch (e) {
     analytics.track('ai_generation_failed', { error: e.message });
   }
   ```

### Error Monitoring

With Sentry (optional):

```javascript
import * as Sentry from "@sentry/react";

try {
  const result = await model.generateContent(prompt);
} catch (e) {
  Sentry.captureException(e, {
    tags: { feature: 'ai_simulation' },
    extra: { prompt, vertical: activeVertical }
  });
}
```

## Prompt Engineering

### Current Prompts

**LIA Simulation:**
```
You are LIA, an autonomous supply chain agent. 
Generate a sequence of 4-6 short, terse, highly technical system logs 
(no timestamps) showing you detecting and resolving this issue: 
"${scenarios[activeVertical].trigger}". 

Style: Cyberpunk/Terminal. Use uppercase mostly. 
Format: Return ONLY a raw JSON array of strings.
```

**War Game Crisis:**
```
Generate a short, high-stakes supply chain crisis scenario 
for a "War Game" roundtable. It must be realistic but catastrophic. 

Return ONLY valid JSON with this structure: 
{ "title": "Crisis Name", "situation": "What happened", 
  "impact": "Financial/Time Impact" }
```

### Best Practices

1. **Be Specific**: Clear instructions improve output quality
2. **Request JSON**: Easier to parse programmatically
3. **Set Style**: "Cyberpunk/Terminal" matches the aesthetic
4. **Constrain Length**: "4-6 short logs" prevents verbose output
5. **Handle Errors**: Always have fallback data

## Troubleshooting

### Issue: "API key not found"

**Solutions:**
1. Check `.env` file exists and contains key
2. Verify environment variable in hosting platform
3. Restart development server after adding key

### Issue: "429 Too Many Requests"

**Solutions:**
1. Check API quota in Google Cloud Console
2. Implement client-side throttling
3. Add exponential backoff
4. Consider upgrading API plan

### Issue: "Failed to parse JSON"

**Cause:** AI sometimes returns markdown-wrapped JSON

**Solution:** Already handled in code:
```javascript
const jsonText = text
  .replace(/```json/g, '')
  .replace(/```/g, '')
  .trim();
```

### Issue: Slow responses

**Solutions:**
1. Use flash model (already configured)
2. Reduce prompt complexity
3. Implement response caching
4. Use backup data for demos

## Future Enhancements

Potential improvements:

1. **Response Streaming**: Display tokens as they're generated
2. **Multi-turn Conversations**: Interactive Q&A with LIA
3. **Custom Scenarios**: User-defined crisis inputs
4. **Voice Interface**: Text-to-speech for LIA responses
5. **Real-time Data**: Integrate with actual logistics APIs
6. **Learning Mode**: Train on company-specific scenarios

## Testing

### Without API Key

The site works perfectly without an API key:
- Uses backup log data
- Shows "AI UPLINK UNSTABLE" message
- Maintains full functionality

### With API Key

To test AI features:

1. Start dev server: `npm run dev`
2. Navigate to "Meet LIA ✨"
3. Click "Aviation (AOG)"
4. Verify AI-generated logs appear
5. Check browser console for errors

### Manual Testing Checklist

- [ ] LIA simulations run for all three verticals
- [ ] Backup data works when API unavailable
- [ ] War Game generator creates unique crises
- [ ] No API key exposed in client code
- [ ] Error messages are user-friendly
- [ ] Animations complete smoothly

## References

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)
- [Google AI Studio](https://makersuite.google.com/)
- [API Pricing](https://ai.google.dev/pricing)

---

**Note**: This implementation prioritizes user experience over API dependency. The site remains functional and impressive even without AI connectivity, while providing enhanced demonstrations when available.
