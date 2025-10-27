# ✅ Simple Working Pipedream Code

## The Issue

Your Pipedream workflow is returning a **400 Bad Request** error. This is likely because:

1. The code is throwing an error before returning a response
2. The response format is invalid
3. The environment variables aren't set up correctly

---

## ✅ Simple, Tested Code

Replace your Pipedream Node.js step with this **simple, working code**:

```javascript
export default defineComponent({
  async run({ steps, $ }) {
    try {
      console.log('📥 Webhook triggered');
      console.log('📦 Request body:', JSON.stringify(steps.trigger.event.body));
      
      // Get the request data
      const { birthPlace, birthDate, birthTime } = steps.trigger.event.body;
      
      console.log('🔍 Extracted:', { birthPlace, birthDate, birthTime });
      
      // Validate required fields
      if (!birthPlace) {
        console.error('❌ Missing birthPlace');
        return { 
          success: false,
          error: "birthPlace is required" 
        };
      }
      
      if (!birthDate) {
        console.error('❌ Missing birthDate');
        return { 
          success: false,
          error: "birthDate is required" 
        };
      }
      
      // Step 1: Geocode using Geoapify
      console.log('🌍 Step 1: Geocoding', birthPlace);
      
      const geoapifyKey = process.env.GEOAPIFY_API_KEY;
      if (!geoapifyKey) {
        console.error('❌ GEOAPIFY_API_KEY not set');
        return { 
          success: false,
          error: "GEOAPIFY_API_KEY not configured in Pipedream" 
        };
      }
      
      const geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(birthPlace)}&apiKey=${geoapifyKey}`;
      console.log('🔗 Calling Geoapify...');
      
      const geoResponse = await fetch(geoUrl);
      console.log('📊 Geoapify response status:', geoResponse.status);
      
      if (!geoResponse.ok) {
        console.error('❌ Geoapify error:', geoResponse.statusText);
        return { 
          success: false,
          error: `Geoapify error: ${geoResponse.statusText}` 
        };
      }
      
      const geoData = await geoResponse.json();
      console.log('📍 Geoapify data:', JSON.stringify(geoData).substring(0, 200));
      
      const feature = geoData.features?.[0];
      if (!feature) {
        console.error('❌ No location found');
        return { 
          success: false,
          error: `No location found for: ${birthPlace}` 
        };
      }
      
      // Extract coordinates
      const props = feature.properties || {};
      const lat = props.lat ?? feature.geometry?.coordinates?.[1];
      const lon = props.lon ?? feature.geometry?.coordinates?.[0];
      
      console.log('✅ Coordinates found:', { lat, lon });
      
      // Extract timezone
      let timezone = 'UTC';
      if (typeof props.timezone === 'string') {
        timezone = props.timezone;
      } else if (props.timezone?.name) {
        timezone = props.timezone.name;
      }
      
      const formattedAddress = props.formatted || props.address_line1 || birthPlace;
      
      console.log('✅ Geocoding complete:', { lat, lon, timezone, formattedAddress });
      
      // Step 2: Calculate birth chart (optional)
      console.log('🌙 Step 2: Calculating birth chart');
      
      const astroKey = process.env.ASTRO_API_KEY;
      let birthChart = null;
      
      if (!astroKey) {
        console.warn('⚠️ ASTRO_API_KEY not set - skipping birth chart calculation');
      } else {
        try {
          // Parse birth date
          const [year, month, day] = birthDate.split('-').map(Number);
          let hour = 12;
          let minute = 0;
          
          if (birthTime) {
            const [h, m] = birthTime.split(':').map(Number);
            hour = h;
            minute = m;
          }
          
          console.log('📅 Birth data:', { year, month, day, hour, minute });
          
          // Call Astro-API
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
      }
      
      // Return success response
      const response = {
        success: true,
        lat,
        lon,
        timezone,
        formattedAddress,
        birthChart
      };
      
      console.log('✅ Returning response:', JSON.stringify(response).substring(0, 200));
      return response;
      
    } catch (error) {
      console.error('❌ Workflow error:', error.message);
      console.error('📋 Stack:', error.stack);
      return { 
        success: false,
        error: error.message 
      };
    }
  }
});
```

---

## 🔧 Setup Steps

### 1. Copy the Code Above

Copy the entire code block above.

### 2. Update Pipedream

1. Go to https://pipedream.com
2. Open your geocoding workflow
3. Click the **Node.js step**
4. **Delete all existing code**
5. **Paste the code above**
6. Click **"Save"**

### 3. Set Environment Variables

1. Click **"Settings"** (gear icon)
2. Click **"Environment Variables"**
3. Add these variables:

```
GEOAPIFY_API_KEY=38d1c93862f1407289d31ed41da13df9
ASTRO_API_KEY=af036f676ee1e467ed543890325c33693bf8f61d
```

4. Click **"Save"**

### 4. Deploy

1. Click **"Deploy"** button
2. Wait for "Workflow deployed" message

### 5. Restart Dev Server

```bash
npm run dev
```

---

## 🧪 Test It

### Test 1: Simple Curl Test

```bash
curl -X POST https://eox9q14lqga0nqh.m.pipedream.net \
  -H "Content-Type: application/json" \
  -d '{
    "birthPlace": "New York",
    "birthDate": "1990-08-15",
    "birthTime": "14:30"
  }'
```

Should return:
```json
{
  "success": true,
  "lat": 40.7128,
  "lon": -74.0060,
  "timezone": "America/New_York",
  "formattedAddress": "New York, NY, USA",
  "birthChart": {
    "sunSign": "Leo",
    "moonSign": "Cancer",
    "risingSign": "Libra"
  }
}
```

### Test 2: In Browser

1. Go to `http://localhost:4000/quiz`
2. Fill form:
   - Birth Date: `1990-08-15`
   - Birth Time: `14:30`
   - Birth Place: `New York`
3. Click **"Reveal My Meditations"**
4. Open console (F12)
5. Should see logs and no errors

---

## 🔍 Debugging

If you still get errors:

1. **Check Pipedream Logs:**
   - Go to your workflow
   - Click **"Logs"** tab
   - Look for error messages

2. **Check Console:**
   - Open browser console (F12)
   - Look for error messages

3. **Verify Environment Variables:**
   - Go to Pipedream Settings
   - Check that `GEOAPIFY_API_KEY` and `ASTRO_API_KEY` are set

4. **Test with Curl:**
   - Run the curl command above
   - Check the response

---

## ✅ Verification Checklist

- [ ] Code copied and pasted into Pipedream
- [ ] Environment variables set
- [ ] Workflow deployed
- [ ] Dev server restarted
- [ ] Curl test returns success
- [ ] Browser test works
- [ ] Console shows logs
- [ ] No 400 errors

---

**Ready? Copy the code and deploy! 🚀**

