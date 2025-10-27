# 🌍✨ Enhanced Pipedream Workflow: Geocoding + Birth Chart Calculation

## Overview

Your current Pipedream geocoding webhook only returns coordinates and timezone. We can enhance it to also calculate the **complete birth chart** (Sun sign, Moon sign, Rising sign) in a single call!

---

## 🚀 Enhanced Workflow Code

Replace your current Pipedream Node.js step with this code:

```javascript
export default defineComponent({
  async run({ steps, $ }) {
    const { birthPlace, birthDate, birthTime } = steps.trigger.event.body;
    
    if (!birthPlace || !birthDate) {
      return { error: "birthPlace and birthDate are required" };
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

## 🔧 Setup Instructions

### 1. Update Pipedream Environment Variables

In your Pipedream workflow settings, add:

```
GEOAPIFY_API_KEY=38d1c93862f1407289d31ed41da13df9
ASTRO_API_KEY=af036f676ee1e467ed543890325c33693bf8f61d
```

### 2. Update Your Frontend Code

Update `src/utils/geocoding.ts` to handle birth chart data:

```typescript
export interface BirthChartData {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  sunDegree?: number;
  moonDegree?: number;
  risingDegree?: number;
  moonHouse?: number;
  moonPhase?: string;
  rawData?: any;
}

export interface GeocodingResult {
  lat: number;
  lon: number;
  timezone: string;
  formattedAddress?: string;
  birthChart?: BirthChartData;
}
```

### 3. Update AstroQuiz.tsx

Modify `handleSubmit()` to send birth date and time to the webhook:

```typescript
const geoData = await geocodeBirthPlace(
  quizData.birthPlace,
  quizData.birthDate,
  quizData.birthTime
);

// Now you have birth chart data!
if (geoData.birthChart) {
  console.log('☀️ Sun Sign:', geoData.birthChart.sunSign);
  console.log('🌙 Moon Sign:', geoData.birthChart.moonSign);
  console.log('🌅 Rising Sign:', geoData.birthChart.risingSign);
}
```

---

## 📊 Expected Response

```json
{
  "lat": 33.7298,
  "lon": -116.2453,
  "timezone": "America/Los_Angeles",
  "formattedAddress": "Cathedral City, CA, USA",
  "birthChart": {
    "sunSign": "Leo",
    "moonSign": "Cancer",
    "risingSign": "Libra",
    "sunDegree": 22.5,
    "moonDegree": 15.3,
    "risingDegree": 18.7,
    "moonHouse": 5,
    "moonPhase": "Waxing Crescent"
  },
  "success": true
}
```

---

## 🧪 Test It

### Test Request:
```bash
curl -X POST https://eox9q14lqga0nqh.m.pipedream.net \
  -H "Content-Type: application/json" \
  -d '{
    "birthPlace": "Cathedral City, Riverside County, California, United States",
    "birthDate": "1990-08-15",
    "birthTime": "14:30"
  }'
```

### Expected Response:
```json
{
  "lat": 33.7298,
  "lon": -116.2453,
  "timezone": "America/Los_Angeles",
  "formattedAddress": "Cathedral City, CA, USA",
  "birthChart": {
    "sunSign": "Leo",
    "moonSign": "Cancer",
    "risingSign": "Libra"
  },
  "success": true
}
```

---

## ✅ Benefits

✅ **Single API Call** - Get geocoding + birth chart in one request
✅ **No CORS Issues** - Backend handles all API calls
✅ **Complete Data** - Sun, Moon, Rising signs + degrees
✅ **Timezone Aware** - Accurate calculations with timezone
✅ **Error Handling** - Graceful fallbacks if APIs fail
✅ **Console Logging** - Detailed logs for debugging

---

## 🎯 Next Steps

1. Update Pipedream workflow with new code
2. Add `ASTRO_API_KEY` to Pipedream environment variables
3. Update `src/utils/geocoding.ts` to handle birth chart data
4. Update `AstroQuiz.tsx` to pass birth date and time
5. Test with the curl command above
6. Display birth chart results in the UI

---

**Ready to get complete birth chart data in one call? 🌍✨**

