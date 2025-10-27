# 🔧 Pipedream CORS Configuration Guide

## Problem

You're getting a CORS error:
```
No 'Access-Control-Allow-Origin' header is present on the requested resource
```

This means your Pipedream workflow is not returning the required CORS headers.

---

## ✅ Solution: Configure CORS in Pipedream

Your Pipedream workflow needs to use `$.respond()` to return proper CORS headers.

---

## 🚀 Step-by-Step Setup

### Step 1: Open Your Pipedream Workflow

1. Go to https://pipedream.com
2. Click **"Workflows"** in the left sidebar
3. Find your geocoding workflow (should be named something like "Moon placement API" or "Geocoding")
4. Click to open it

---

### Step 2: Add/Update the Node.js Step

1. Look for the **Node.js** step in your workflow
2. If you don't have one, click **"+"** to add a new step
3. Search for **"Node.js"** and select it

---

### Step 3: Replace the Code

**Delete all existing code** and paste this:

```javascript
export default defineComponent({
  async run({ steps, $ }) {
    try {
      console.log('📥 Webhook triggered');
      
      // Get the request data
      const { address, date, time } = steps.trigger.event.body;
      
      console.log('🔍 Extracted:', { address, date, time });
      
      // Validate required fields
      if (!address) {
        return $.respond({
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
            'Content-Type': 'application/json'
          },
          body: { 
            success: false,
            error: "address is required" 
          }
        });
      }
      
      if (!date) {
        return $.respond({
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
            'Content-Type': 'application/json'
          },
          body: { 
            success: false,
            error: "date is required" 
          }
        });
      }
      
      // Step 1: Geocode using Geoapify
      console.log('🌍 Geocoding:', address);
      
      const geoapifyKey = process.env.GEOAPIFY_API_KEY;
      if (!geoapifyKey) {
        return $.respond({
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: { 
            success: false,
            error: "GEOAPIFY_API_KEY not configured" 
          }
        });
      }
      
      const geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${geoapifyKey}`;
      
      const geoResponse = await fetch(geoUrl);
      
      if (!geoResponse.ok) {
        return $.respond({
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: { 
            success: false,
            error: `Geoapify error: ${geoResponse.statusText}` 
          }
        });
      }
      
      const geoData = await geoResponse.json();
      
      const feature = geoData.features?.[0];
      if (!feature) {
        return $.respond({
          status: 404,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: { 
            success: false,
            error: `No location found for: ${address}` 
          }
        });
      }
      
      // Extract coordinates
      const props = feature.properties || {};
      const lat = props.lat ?? feature.geometry?.coordinates?.[1];
      const lon = props.lon ?? feature.geometry?.coordinates?.[0];
      
      console.log('✅ Coordinates:', { lat, lon });
      
      // Extract timezone
      let timezone = 'UTC';
      if (typeof props.timezone === 'string') {
        timezone = props.timezone;
      } else if (props.timezone?.name) {
        timezone = props.timezone.name;
      }
      
      const formattedAddress = props.formatted || props.address_line1 || address;
      
      // Step 2: Calculate birth chart
      console.log('🌙 Calculating birth chart');
      
      const astroKey = process.env.ASTRO_API_KEY;
      let birthChart = null;
      
      if (astroKey) {
        try {
          const [year, month, day] = date.split('-').map(Number);
          let hour = 12;
          let minute = 0;
          
          if (time) {
            const [h, m] = time.split(':').map(Number);
            hour = h;
            minute = m;
          }
          
          console.log('📅 Birth data:', { year, month, day, hour, minute });
          
          const astroUrl = 'https://api.astro-api.com/calculate';
          const astroBody = {
            year,
            month,
            day,
            hour,
            minute,
            latitude: lat,
            longitude: lon
          };
          
          const astroResponse = await fetch(astroUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${astroKey}`
            },
            body: JSON.stringify(astroBody)
          });
          
          if (astroResponse.ok) {
            const astroData = await astroResponse.json();
            
            // Extract only primitive values (avoid circular references)
            birthChart = {
              sunSign: astroData.sun?.sign || 'Unknown',
              moonSign: astroData.moon?.sign || 'Unknown',
              risingSign: astroData.rising?.sign || astroData.asc?.sign || 'Unknown',
              sunDegree: astroData.sun?.degree || null,
              moonDegree: astroData.moon?.degree || null,
              risingDegree: astroData.rising?.degree || astroData.asc?.degree || null,
              moonHouse: astroData.moon?.house || null,
              moonPhase: astroData.moon?.phase || null
            };
            
            console.log('✅ Birth chart:', birthChart);
          }
        } catch (astroError) {
          console.warn('⚠️ Birth chart failed:', astroError.message);
        }
      }
      
      // Return success response with CORS headers
      return $.respond({
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
          'Content-Type': 'application/json'
        },
        body: {
          success: true,
          lat,
          lon,
          timezone,
          formattedAddress,
          birthChart
        }
      });
      
    } catch (error) {
      console.error('❌ Error:', error.message);
      
      return $.respond({
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: { 
          success: false,
          error: error.message 
        }
      });
    }
  }
});
```

---

### Step 4: Set Environment Variables in Pipedream

1. Click **"Settings"** (gear icon) in the top right
2. Click **"Environment Variables"**
3. Add these two variables:
   ```
   GEOAPIFY_API_KEY=38d1c93862f1407289d31ed41da13df9
   ASTRO_API_KEY=882309db5811a1d8dd18f90ac8b76e4853cc52c0
   ```
4. Click **"Save"**

---

### Step 5: Deploy the Workflow

1. Click **"Save"** button (if not already saved)
2. Click **"Deploy"** button
3. Wait for "Workflow deployed" message

---

### Step 6: Restart Your Dev Server

```bash
npm run dev
```

---

## 🧪 Test It

### Test in Browser
1. Go to `http://localhost:4000/quiz`
2. Fill form:
   - Birth Date: `1990-10-30`
   - Birth Time: `03:12`
   - Birth Place: `Fremont, California, USA`
3. Click **"Reveal My Meditations"**
4. Open console (F12)
5. Should see logs with **NO CORS errors** ✅

### Test with Curl
```bash
curl -X POST https://eox9q14lqga0nqh.m.pipedream.net \
  -H "User-Agent: pipedream/1" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "Fremont, California, USA",
    "date": "1990-10-30",
    "time": "03:12:00"
  }'
```

---

## 🔑 Key CORS Headers

The code uses `$.respond()` to return these CORS headers:

```javascript
headers: {
  'Access-Control-Allow-Origin': '*',           // Allow all origins
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
  'Content-Type': 'application/json'
}
```

This tells the browser:
- ✅ Allow requests from any origin (`*`)
- ✅ Allow GET, POST, OPTIONS methods
- ✅ Allow these headers in requests
- ✅ Response is JSON

---

## ✅ Expected Response

```json
{
  "success": true,
  "lat": 37.5485,
  "lon": -121.9886,
  "timezone": "America/Los_Angeles",
  "formattedAddress": "Fremont, CA, USA",
  "birthChart": {
    "sunSign": "Scorpio",
    "moonSign": "Pisces",
    "risingSign": "Gemini",
    "sunDegree": 22.5,
    "moonDegree": 15.3,
    "risingDegree": 18.7,
    "moonHouse": 5,
    "moonPhase": "Waxing Crescent"
  }
}
```

---

## ✅ Verification Checklist

- [ ] Opened Pipedream workflow
- [ ] Found Node.js step
- [ ] Deleted old code
- [ ] Pasted new code
- [ ] Clicked "Save"
- [ ] Set environment variables
- [ ] Clicked "Deploy"
- [ ] Restarted dev server
- [ ] Tested in browser
- [ ] No CORS errors

---

## 🆘 Troubleshooting

### Still getting CORS error?
1. Make sure you clicked **"Deploy"** (not just "Save")
2. Wait 10 seconds for deployment to complete
3. Restart your dev server: `npm run dev`
4. Clear browser cache (Ctrl+Shift+Delete)
5. Try again

### Getting 400 error?
1. Check that `address`, `date`, `time` are being sent
2. Check Pipedream logs for error messages
3. Make sure environment variables are set

### Getting circular reference error?
1. The code above already handles this
2. It only extracts primitive values from astroData
3. No nested objects are included

---

**Ready? Follow the steps above and test! 🚀**

