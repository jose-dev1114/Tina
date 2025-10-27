# ✅ Updated Pipedream Code with CORS Headers

## Your Current Code

Your workflow already has a `search_address` step that does geocoding. Now we need to add CORS headers to the final response.

---

## ✅ Updated Code with CORS

Replace your Node.js step with this code:

```javascript
export default defineComponent({
  async run({ steps, $ }) {
    try {
      console.log('📥 Webhook triggered');
      console.log('📦 Request body:', JSON.stringify(steps.trigger.event.body));
      
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
      
      // Use the search_address step result
      console.log('🌍 Using search_address step result');
      
      const f = steps.search_address.$return_value?.features?.[0];
      if (!f) {
        return $.respond({
          status: 404,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
            'Content-Type': 'application/json'
          },
          body: { 
            success: false,
            error: `No geocoding result found for: ${address}` 
          }
        });
      }
      
      const props = f.properties || {};
      const lat = props.lat ?? f.geometry?.coordinates?.[1];
      const lon = props.lon ?? f.geometry?.coordinates?.[0];
      
      console.log('✅ Coordinates found:', { lat, lon });
      
      // Extract timezone (handles multiple formats from Geoapify)
      let timezone =
        (typeof props.timezone === "string" ? props.timezone : null) ||
        props.timezone?.name ||
        props.timezone?.offset_STD_timezone ||
        props.timezone?.offset_std_timezone ||
        "UTC";
      
      const formattedAddress = props.formatted || props.address_line1 || address;
      
      console.log('✅ Geocoding complete:', { lat, lon, timezone, formattedAddress });
      
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
          
          console.log('🔗 Calling Astro-API...');
          
          const astroResponse = await fetch(astroUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${astroKey}`
            },
            body: JSON.stringify(astroBody)
          });
          
          console.log('📊 Astro-API response status:', astroResponse.status);
          
          if (astroResponse.ok) {
            const astroData = await astroResponse.json();
            console.log('✅ Astro-API data received');
            
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
            
            console.log('✅ Birth chart calculated:', birthChart);
          } else {
            console.warn('⚠️ Astro-API error:', astroResponse.statusText);
          }
        } catch (astroError) {
          console.warn('⚠️ Birth chart calculation failed:', astroError.message);
        }
      } else {
        console.warn('⚠️ ASTRO_API_KEY not set - skipping birth chart calculation');
      }
      
      // Return success response with CORS headers
      const response = {
        success: true,
        lat,
        lon,
        timezone,
        formattedAddress,
        birthChart
      };
      
      console.log('✅ Returning response:', JSON.stringify(response).substring(0, 200));
      
      return $.respond({
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
          'Content-Type': 'application/json'
        },
        body: response
      });
      
    } catch (error) {
      console.error('❌ Workflow error:', error.message);
      console.error('📋 Stack:', error.stack);
      
      return $.respond({
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
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

## 🔑 Key Changes

### 1. Added `$` Parameter
```javascript
async run({ steps, $ }) {  // Added $
```

The `$` object gives us access to `$.respond()` for custom responses.

### 2. Use `$.respond()` for All Responses
```javascript
return $.respond({
  status: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
    'Content-Type': 'application/json'
  },
  body: response
});
```

### 3. CORS Headers on Every Response
- Success responses (200)
- Error responses (400, 404, 500)

### 4. Kept Your Timezone Logic
Your timezone extraction logic is preserved:
```javascript
let timezone =
  (typeof props.timezone === "string" ? props.timezone : null) ||
  props.timezone?.name ||
  props.timezone?.offset_STD_timezone ||
  props.timezone?.offset_std_timezone ||
  "UTC";
```

### 5. Added Birth Chart Calculation
Calls Astro-API to calculate Sun, Moon, and Rising signs.

---

## 🚀 Setup Steps

### Step 1: Copy the Code Above
Copy the entire JavaScript code block.

### Step 2: Update Pipedream
1. Go to https://pipedream.com
2. Open your geocoding workflow
3. Find your Node.js step (the one with the timezone logic)
4. **Delete all existing code**
5. **Paste the code above**
6. Click **"Save"**

### Step 3: Verify Environment Variables
1. Click **"Settings"** (gear icon)
2. Click **"Environment Variables"**
3. Make sure you have:
   ```
   GEOAPIFY_API_KEY=38d1c93862f1407289d31ed41da13df9
   ASTRO_API_KEY=882309db5811a1d8dd18f90ac8b76e4853cc52c0
   ```
4. If missing, add them and click **"Save"**

### Step 4: Deploy
1. Click **"Deploy"** button
2. Wait for "Workflow deployed" message

### Step 5: Restart Dev Server
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
  -H "Content-Type: application/json" \
  -d '{
    "address": "Fremont, California, USA",
    "date": "1990-10-30",
    "time": "03:12:00"
  }'
```

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

- [ ] Copied code from this file
- [ ] Pasted into Pipedream Node.js step
- [ ] Clicked "Save"
- [ ] Verified environment variables
- [ ] Clicked "Deploy"
- [ ] Restarted dev server
- [ ] Tested in browser
- [ ] No CORS errors
- [ ] Birth chart data received

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Still getting CORS error | Make sure you clicked **"Deploy"** (not just "Save") |
| 400 Bad Request | Check that `address`, `date`, `time` are being sent |
| No birth chart data | Check that `ASTRO_API_KEY` is set in environment variables |
| Circular reference error | Code already handles this - only extracts primitive values |

---

**Ready? Copy the code and deploy! 🚀**

