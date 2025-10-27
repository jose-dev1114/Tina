# 📋 Pipedream Complete Workflow Code

## Copy This Code Into Your Pipedream Node.js Step

Replace your current Node.js step code with this complete code:

```javascript
export default defineComponent({
  async run({ steps, $ }) {
    try {
      console.log('📥 Webhook triggered');
      const { address, date, time } = steps.trigger.event.body;
      
      console.log('🔍 Extracted:', { address, date, time });
      
      if (!address) {
        return $.respond({
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
          body: { success: false, error: "address is required" }
        });
      }

      // 1) GEOCODING with Geoapify
      console.log('🌍 Geocoding address...');
      const geoKey = process.env.GEOAPIFY_API_KEY;
      const geoResp = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${geoKey}`);
      const geoData = await geoResp.json();
      
      if (!geoData.features || geoData.features.length === 0) {
        return $.respond({
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
          body: { success: false, error: "Address not found" }
        });
      }

      const feature = geoData.features[0];
      const lat = feature.properties.lat;
      const lon = feature.properties.lon;
      let timezone = feature.properties.timezone?.name || 'UTC';
      const formattedAddress = feature.properties.formatted;
      
      console.log('✅ Geocoding successful:', { lat, lon, timezone, formattedAddress });

      // 2) BIRTH CHART CALCULATION with AstrologyAPI
      let birthChart = null;
      const astroKey = process.env.ASTRO_API_KEY;
      const astroUserId = process.env.ASTRO_USER_ID;
      
      if (!astroKey || !astroUserId) {
        console.warn('⚠️ ASTRO_API_KEY or ASTRO_USER_ID not set');
      } else if (date) {
        try {
          const [year, month, day] = date.split('-').map(Number);
          let hour = 12, minute = 0;
          
          if (time) {
            const [h, m] = time.split(':').map(Number);
            hour = h;
            minute = m;
          }
          
          console.log('📅 Birth data:', { year, month, day, hour, minute, lat, lon });
          
          // Get timezone offset
          const tzResp = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${geoKey}`);
          const tzData = await tzResp.json();
          const tzName = tzData.features?.[0]?.properties?.timezone?.name || timezone;
          
          // Calculate timezone offset
          const now = new Date();
          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tzName,
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          
          const tzone = Math.round((new Date(now.toLocaleString('en-US', { timeZone: tzName })).getTime() - now.getTime()) / 3600000);
          
          const payload = { day, month, year, hour, min: minute, lat, lon, tzone };
          
          // 2a) Get Planets (Moon sign, house, etc.)
          console.log('🌙 Calling planets endpoint...');
          const planetsResp = await fetch('https://json.astrologyapi.com/v1/planets', {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + Buffer.from(`${astroUserId}:${astroKey}`).toString('base64'),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
          
          const planetsData = await planetsResp.json();
          console.log('✅ Planets data received');
          
          // 2b) Get House Cusps
          console.log('🏠 Calling house_cusps endpoint...');
          let cusps = null;
          let cuspsFound = false;
          let cuspsEndpointTried = [];
          let lastCuspsStatus = null;
          let lastCuspsKeys = [];
          
          for (const endpoint of ['house_cusps', 'houses', 'cusps']) {
            cuspsEndpointTried.push(endpoint);
            try {
              const cuspsResp = await fetch(`https://json.astrologyapi.com/v1/${endpoint}`, {
                method: 'POST',
                headers: {
                  'Authorization': 'Basic ' + Buffer.from(`${astroUserId}:${astroKey}`).toString('base64'),
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
              });
              
              lastCuspsStatus = cuspsResp.status;
              const cuspsDataResp = await cuspsResp.json();
              lastCuspsKeys = Object.keys(cuspsDataResp);
              
              if (cuspsResp.ok && cuspsDataResp.cusps) {
                cusps = cuspsDataResp.cusps;
                cuspsFound = true;
                console.log('✅ Cusps found via', endpoint);
                break;
              }
            } catch (e) {
              console.warn(`⚠️ ${endpoint} failed:`, e.message);
            }
          }
          
          // 2c) Get Natal Wheel Chart
          console.log('🎨 Calling natal_wheel_chart endpoint...');
          let chartUrl = null;
          let chartError = null;
          try {
            const chartResp = await fetch('https://json.astrologyapi.com/v1/natal_wheel_chart', {
              method: 'POST',
              headers: {
                'Authorization': 'Basic ' + Buffer.from(`${astroUserId}:${astroKey}`).toString('base64'),
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                ...payload,
                planet_icon_color: '#F57C00',
                inner_circle_background: '#FFF8E1',
                sign_icon_color: 'red',
                sign_background: '#ffffff',
                chart_size: 500,
                image_type: 'png'
              })
            });
            
            const chartData = await chartResp.json().catch(() => ({}));
            
            if (chartResp.ok && chartData.chart_url) {
              chartUrl = chartData.chart_url;
              console.log('✅ Chart URL received');
            } else {
              chartError = chartData.msg || 'Failed to generate chart';
              console.warn('⚠️ Chart generation failed:', chartError);
            }
          } catch (chartErr) {
            chartError = chartErr.message;
            console.warn('⚠️ Chart API error:', chartError);
          }
          
          // Build birth chart response
          birthChart = {
            moonSign: planetsData.moon?.sign || 'Unknown',
            moonHouse: planetsData.moon?.house || null,
            sunSign: planetsData.sun?.sign || 'Unknown',
            risingSign: planetsData.rising?.sign || planetsData.asc?.sign || 'Unknown',
            sunDegree: planetsData.sun?.degree || null,
            moonDegree: planetsData.moon?.degree || null,
            risingDegree: planetsData.rising?.degree || planetsData.asc?.degree || null,
            moonLongitude: planetsData.moon?.longitude || null,
            apiHouse: planetsData.moon?.house || null,
            computedHouse: cusps ? cusps[3] : null,
            cusps,
            timezoneUsed: tzName,
            tzone,
            lat,
            lon,
            date,
            time: time || '12:00:00',
            houseSystem: 'P',
            zodiac: 'tropical',
            cuspsFound,
            cuspsEndpointTried,
            lastCuspsStatus,
            lastCuspsKeys,
            chartUrl,
            chartError
          };
          
          console.log('✅ Birth chart calculated:', JSON.stringify(birthChart).substring(0, 200));
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
      
      console.log('✅ Returning response');
      
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

## Environment Variables to Add

In Pipedream Settings → Environment Variables, add:

```
GEOAPIFY_API_KEY=38d1c93862f1407289d31ed41da13df9
ASTRO_USER_ID=your_astro_api_user_id
ASTRO_API_KEY=your_astro_api_key
```

---

## Steps to Update

1. Go to https://pipedream.com
2. Open your workflow
3. Click on the Node.js step
4. Replace all code with the code above
5. Click "Deploy"
6. Test in browser

---

## Expected Response

```json
{
  "success": true,
  "lat": 33.7810031,
  "lon": -116.464076,
  "timezone": "America/Los_Angeles",
  "formattedAddress": "Riverside, CA, USA",
  "birthChart": {
    "moonSign": "Scorpio",
    "moonHouse": 8,
    "sunSign": "Libra",
    "risingSign": "Gemini",
    "chartUrl": "https://s3.ap-south-1.amazonaws.com/western-chart/...",
    "lat": 33.7810031,
    "lon": -116.464076,
    "date": "1990-10-20",
    "time": "17:56:00",
    "timezoneUsed": "America/Los_Angeles",
    "tzone": -7,
    "cuspsFound": false,
    "chartError": null
  }
}
```

---

## ✅ Ready!

Copy the code, update Pipedream, and test! 🚀

