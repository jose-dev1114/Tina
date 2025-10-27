# 🔧 Corrected Pipedream Workflow Code

## The Problem

Your frontend is sending:
```json
{
  "address": "...",
  "date": "...",
  "time": "..."
}
```

But the workflow code was expecting:
```json
{
  "birthPlace": "...",
  "birthDate": "...",
  "birthTime": "..."
}
```

This caused the **400 Bad Request** error!

---

## ✅ Corrected Workflow Code

Replace your Pipedream Node.js step with this code:

```javascript
export default defineComponent({
  async run({ steps, $ }) {
    // Handle both old and new field names
    const birthPlace = steps.trigger.event.body.birthPlace || steps.trigger.event.body.address;
    const birthDate = steps.trigger.event.body.birthDate || steps.trigger.event.body.date;
    const birthTime = steps.trigger.event.body.birthTime || steps.trigger.event.body.time;
    
    console.log('📥 Received:', { birthPlace, birthDate, birthTime });
    
    if (!birthPlace || !birthDate) {
      return { error: "birthPlace (or address) and birthDate (or date) are required" };
    }
    
    try {
      console.log('🌍 Processing:', birthPlace, birthDate, birthTime);
      
      // Step 1: Geocode the birth place
      const apiKey = process.env.GEOAPIFY_API_KEY;
      if (!apiKey) {
        return { error: "GEOAPIFY_API_KEY not configured" };
      }
      
      const geoResponse = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(birthPlace)}&apiKey=${apiKey}`
      );
      
      if (!geoResponse.ok) {
        throw new Error(`Geoapify error: ${geoResponse.statusText}`);
      }
      
      const geoData = await geoResponse.json();
      const feature = geoData.features?.[0];
      
      if (!feature) {
        return { error: `No location found for: ${birthPlace}` };
      }
      
      const props = feature.properties || {};
      const lat = props.lat ?? feature.geometry?.coordinates?.[1];
      const lon = props.lon ?? feature.geometry?.coordinates?.[0];
      
      let timezone =
        (typeof props.timezone === 'string' ? props.timezone : null) ||
        props.timezone?.name ||
        props.timezone?.offset_STD_timezone ||
        props.timezone?.offset_std_timezone ||
        null;
      
      if (!timezone) {
        timezone = 'UTC';
      }
      
      const formattedAddress = props.formatted || props.address_line1 || birthPlace;
      
      console.log('✅ Geocoding successful!');
      console.log('📍 Latitude:', lat);
      console.log('📍 Longitude:', lon);
      console.log('🕐 Timezone:', timezone);
      
      // Step 2: Calculate birth chart using Astro-API
      const astroApiKey = process.env.ASTRO_API_KEY;
      
      if (!astroApiKey) {
        console.warn('⚠️ ASTRO_API_KEY not configured. Returning geocoding data only.');
        return {
          lat,
          lon,
          timezone,
          formattedAddress,
          birthChart: null,
          warning: "Birth chart calculation requires ASTRO_API_KEY"
        };
      }
      
      // Parse birth date and time
      const [year, month, day] = birthDate.split('-').map(Number);
      let hour = 12; // Default to noon
      let minute = 0;
      
      if (birthTime) {
        const [h, m] = birthTime.split(':').map(Number);
        hour = h;
        minute = m;
      }
      
      console.log('📅 Birth Data:', { year, month, day, hour, minute, lat, lon });
      
      // Call Astro-API to calculate birth chart
      const astroResponse = await fetch('https://api.astro-api.com/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${astroApiKey}`
        },
        body: JSON.stringify({
          year,
          month,
          day,
          hour,
          minute,
          latitude: lat,
          longitude: lon
        })
      });
      
      if (!astroResponse.ok) {
        console.warn('⚠️ Astro-API error:', astroResponse.statusText);
        return {
          lat,
          lon,
          timezone,
          formattedAddress,
          birthChart: null,
          warning: `Astro-API error: ${astroResponse.statusText}`
        };
      }
      
      const astroData = await astroResponse.json();
      
      const birthChart = {
        sunSign: astroData.sun?.sign || 'Unknown',
        moonSign: astroData.moon?.sign || 'Unknown',
        risingSign: astroData.rising?.sign || astroData.asc?.sign || 'Unknown',
        sunDegree: astroData.sun?.degree || null,
        moonDegree: astroData.moon?.degree || null,
        risingDegree: astroData.rising?.degree || astroData.asc?.degree || null,
        moonHouse: astroData.moon?.house || null,
        moonPhase: astroData.moon?.phase || null,
        rawData: astroData
      };
      
      console.log('✅ Birth chart calculated!');
      console.log('☀️ Sun Sign:', birthChart.sunSign);
      console.log('🌙 Moon Sign:', birthChart.moonSign);
      console.log('🌅 Rising Sign:', birthChart.risingSign);
      
      return {
        lat,
        lon,
        timezone,
        formattedAddress,
        birthChart,
        success: true
      };
      
    } catch (error) {
      console.error('❌ Error:', error.message);
      return { error: error.message };
    }
  }
});
```

---

## 🔑 Key Changes

**Line 3-5:** Now handles BOTH field name formats:
```javascript
const birthPlace = steps.trigger.event.body.birthPlace || steps.trigger.event.body.address;
const birthDate = steps.trigger.event.body.birthDate || steps.trigger.event.body.date;
const birthTime = steps.trigger.event.body.birthTime || steps.trigger.event.body.time;
```

This means it will work with:
- ✅ `birthPlace` OR `address`
- ✅ `birthDate` OR `date`
- ✅ `birthTime` OR `time`

---

## 🚀 How to Fix

1. Go to https://pipedream.com
2. Open your geocoding workflow
3. Click the **Node.js step**
4. **Replace ALL the code** with the corrected code above
5. Click **"Save"**
6. Click **"Deploy"**
7. Test again!

---

## 🧪 Test It

```bash
curl -X POST https://eox9q14lqga0nqh.m.pipedream.net \
  -H "Content-Type: application/json" \
  -d '{
    "address": "New York",
    "date": "1990-08-15",
    "time": "14:30"
  }'
```

Should now return:
```json
{
  "lat": 40.7128,
  "lon": -74.0060,
  "timezone": "America/New_York",
  "formattedAddress": "New York, NY, USA",
  "birthChart": {
    "sunSign": "Leo",
    "moonSign": "Cancer",
    "risingSign": "Libra"
  },
  "success": true
}
```

---

## ✅ Verification

After updating:
- [ ] Pipedream code replaced
- [ ] Workflow deployed
- [ ] Dev server restarted
- [ ] Test in browser
- [ ] Check console logs
- [ ] No 400 errors

---

**Ready? Copy the corrected code and deploy! 🚀**

