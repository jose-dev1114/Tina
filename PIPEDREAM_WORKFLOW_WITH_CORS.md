# ✅ Pipedream Workflow with CORS Headers

## The Problem

Your Pipedream webhook is returning a **400 Bad Request** with **CORS error**:
```
No 'Access-Control-Allow-Origin' header is present on the requested resource
```

This means the Pipedream workflow needs to return proper CORS headers.

---

## ✅ Solution: Add CORS Headers to Response

Replace your Pipedream Node.js step with this code:

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
        console.error('❌ Missing address');
        return $.respond({
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: { 
            success: false,
            error: "address is required" 
          }
        });
      }
      
      if (!date) {
        console.error('❌ Missing date');
        return $.respond({
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: { 
            success: false,
            error: "date is required" 
          }
        });
      }
      
      // Step 1: Geocode using Geoapify
      console.log('🌍 Step 1: Geocoding', address);
      
      const geoapifyKey = process.env.GEOAPIFY_API_KEY;
      if (!geoapifyKey) {
        console.error('❌ GEOAPIFY_API_KEY not set');
        return $.respond({
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: { 
            success: false,
            error: "GEOAPIFY_API_KEY not configured in Pipedream" 
          }
        });
      }
      
      const geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${geoapifyKey}`;
      console.log('🔗 Calling Geoapify...');
      
      const geoResponse = await fetch(geoUrl);
      console.log('📊 Geoapify response status:', geoResponse.status);
      
      if (!geoResponse.ok) {
        console.error('❌ Geoapify error:', geoResponse.statusText);
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
      console.log('📍 Geoapify data:', JSON.stringify(geoData).substring(0, 200));
      
      const feature = geoData.features?.[0];
      if (!feature) {
        console.error('❌ No location found');
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
      
      console.log('✅ Coordinates found:', { lat, lon });
      
      // Extract timezone
      let timezone = 'UTC';
      if (typeof props.timezone === 'string') {
        timezone = props.timezone;
      } else if (props.timezone?.name) {
        timezone = props.timezone.name;
      }
      
      const formattedAddress = props.formatted || props.address_line1 || address;
      
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
          const [year, month, day] = date.split('-').map(Number);
          let hour = 12;
          let minute = 0;
          
          if (time) {
            const [h, m] = time.split(':').map(Number);
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

### 1. Use `$.respond()` for Custom Response
Instead of returning a plain object, use `$.respond()` to set status, headers, and body:

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

### 2. CORS Headers
```javascript
'Access-Control-Allow-Origin': '*'  // Allow all origins
'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent'
```

### 3. All Error Responses Include CORS Headers
Every error response also includes CORS headers so the browser can read the error message.

---

## 🚀 Setup Steps

### 1. Copy the Code Above
Copy the entire JavaScript code block.

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
3. Add:
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

### Test in Browser
1. Go to `http://localhost:4000/quiz`
2. Fill form:
   - Birth Date: `1990-10-30`
   - Birth Time: `03:12`
   - Birth Place: `Fremont, California, USA`
3. Click **"Reveal My Meditations"**
4. Open console (F12)
5. Should see logs with NO CORS errors

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

## ✅ Expected Result

**Console logs:**
```
🔄 Geocoding birth place and calculating birth chart...
✅ Geocoding successful!
📍 Latitude: 37.5485
📍 Longitude: -121.9886
🕐 Timezone: America/Los_Angeles
✅ Birth chart calculated!
☀️ Sun Sign: Scorpio
🌙 Moon Sign: Pisces
🌅 Rising Sign: Gemini
```

**No CORS errors!** ✅

---

## ✅ Verification Checklist

- [ ] Code copied and pasted into Pipedream
- [ ] Environment variables set
- [ ] Workflow deployed
- [ ] Dev server restarted
- [ ] Browser test works
- [ ] No CORS errors
- [ ] Birth chart data received

---

**Ready? Copy the code and deploy! 🚀**

