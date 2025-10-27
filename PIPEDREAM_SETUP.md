# Pipedream Moon Placement Integration Guide

This guide walks you through setting up a Pipedream workflow to calculate moon placement from birth data.

## 📋 Overview

The integration allows users to input their birth year, month, and day, and receive their moon sign and placement data through a Pipedream webhook.

## 🚀 Step-by-Step Setup

### Step 1: Create a Pipedream Account
1. Go to https://pipedream.com
2. Sign up for a free account
3. Verify your email

### Step 2: Create a New Workflow
1. Click "Create Workflow" or go to https://pipedream.com/workflows
2. Click "Create New"
3. Choose "HTTP" as the trigger
4. You'll get a unique webhook URL (save this!)

### Step 3: Add Astrology Calculation Step

In your Pipedream workflow, add a new step:

1. Click "+" to add a step
2. Search for "Node.js" and select it
3. Paste the following code:

```javascript
import axios from 'axios';

export default defineComponent({
  async run({ steps, $ }) {
    const { year, month, day, hour = 12, minute = 0 } = steps.trigger.event.body;
    
    try {
      // Using Astro-API (free tier available)
      // Alternative: Use pymeeus, swisseph, or other astrology libraries
      const response = await axios.post('https://api.astro-api.com/calculate', {
        year,
        month,
        day,
        hour,
        minute,
        latitude: 0,
        longitude: 0
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.ASTRO_API_KEY}`
        }
      });

      return {
        sunSign: response.data.sun.sign,
        moonSign: response.data.moon.sign,
        risingSign: response.data.rising?.sign,
        moonPlacement: {
          moonSign: response.data.moon.sign,
          moonDegree: response.data.moon.degree,
          moonHouse: response.data.moon.house,
          moonPhase: response.data.moon.phase,
          moonElement: response.data.moon.element
        }
      };
    } catch (error) {
      $.flow.exit(`Error: ${error.message}`);
    }
  }
});
```

### Step 4: Add Response Step

1. Click "+" to add another step
2. Search for "Return HTTP Response"
3. Set the response body to: `{{ steps.nodejs.$return_value }}`

### Step 5: Deploy and Get Webhook URL

1. Click "Deploy" button
2. Copy the webhook URL from the HTTP trigger
3. It should look like: `https://eom.prod.eoapi.com/v1/webhooks/xxxxx`

### Step 6: Add to Environment Variables

1. Create or update your `.env` file in the project root:

```env
VITE_PIPEDREAM_WEBHOOK_URL=https://eom.prod.eoapi.com/v1/webhooks/your_webhook_id_here
```

2. Restart your dev server: `npm run dev`

## 🔧 Alternative: Using Astro-API

If you prefer a simpler setup without Pipedream, you can use Astro-API directly:

1. Sign up at https://astro-api.com
2. Get your API key
3. Add to `.env`:
```env
VITE_ASTRO_API_KEY=your_api_key_here
```

4. Update `src/services/astroApi.ts` to call the API directly

## 📱 Using the Component

### In HomePage.tsx:

```tsx
import MoonPlacementInput from '../components/MoonPlacementInput';

export default function HomePage() {
  const handleMoonData = (data) => {
    console.log('Moon placement:', data);
    // Use the data to update your breathing circle or other components
  };

  return (
    <div>
      {/* Your existing content */}
      <MoonPlacementInput onMoonDataReceived={handleMoonData} />
    </div>
  );
}
```

### In Breathing Circle Component:

```tsx
import { useState } from 'react';
import BreathingCircleAnimation from '../components/MoonPhaseSelector';
import MoonPlacementInput from '../components/MoonPlacementInput';

export default function HeroSection() {
  const [moonData, setMoonData] = useState(null);

  return (
    <div>
      <MoonPlacementInput onMoonDataReceived={setMoonData} />
      {moonData && (
        <div>
          <p>Your Moon Sign: {moonData.moonSign}</p>
          <BreathingCircleAnimation />
        </div>
      )}
    </div>
  );
}
```

## 🧪 Testing

1. Start your dev server: `npm run dev`
2. Navigate to the page with `MoonPlacementInput`
3. Enter a birth date (e.g., 1990-01-15)
4. Click "Calculate Moon Placement"
5. You should see the moon sign and placement data

## 🐛 Troubleshooting

### "Webhook URL not configured"
- Make sure `VITE_PIPEDREAM_WEBHOOK_URL` is in your `.env` file
- Restart your dev server after adding the env variable

### "Failed to calculate moon placement"
- Check that your Pipedream workflow is deployed
- Verify the webhook URL is correct
- Check Pipedream logs for errors

### CORS Issues
- Pipedream webhooks should handle CORS automatically
- If issues persist, add CORS headers in Pipedream response step

## 📚 Resources

- [Pipedream Documentation](https://pipedream.com/docs)
- [Astro-API Documentation](https://astro-api.com/docs)
- [Astrology Calculation Libraries](https://github.com/topics/astrology)

## 🎯 Next Steps

1. ✅ Set up Pipedream workflow
2. ✅ Add webhook URL to `.env`
3. ✅ Test the integration
4. ✅ Integrate with your components
5. ✅ Deploy to production

Happy calculating! 🌙✨

