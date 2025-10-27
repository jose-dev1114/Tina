# Pipedream Workflow Code Examples

Copy and paste these code snippets into your Pipedream workflow steps.

## Option 1: Using Astro-API (Recommended - Easiest)

### Step 1: HTTP Trigger (Built-in)
No code needed - Pipedream creates this automatically

### Step 2: Node.js Step - Call Astro-API

```javascript
import axios from 'axios';

export default defineComponent({
  async run({ steps, $ }) {
    const { year, month, day, hour = 12, minute = 0, latitude = 0, longitude = 0 } = steps.trigger.event.body;
    
    try {
      // Using Astro-API (free tier: 100 requests/month)
      // Sign up at https://astro-api.com
      const response = await axios.post('https://api.astro-api.com/calculate', {
        year,
        month,
        day,
        hour,
        minute,
        latitude,
        longitude
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.ASTRO_API_KEY}`
        }
      });

      return {
        sunSign: response.data.sun.sign,
        moonSign: response.data.moon.sign,
        risingSign: response.data.rising?.sign || null,
        moonPlacement: {
          moonSign: response.data.moon.sign,
          moonDegree: response.data.moon.degree,
          moonHouse: response.data.moon.house,
          moonPhase: response.data.moon.phase,
          moonElement: response.data.moon.element
        },
        rawData: response.data
      };
    } catch (error) {
      $.flow.exit(`Error calculating moon placement: ${error.message}`);
    }
  }
});
```

### Step 3: Return HTTP Response (Built-in)
- Response Body: `{{ steps.nodejs.$return_value }}`
- Status Code: `200`

---

## Option 2: Using Pymeeus (Python - More Accurate)

### Step 1: HTTP Trigger (Built-in)
No code needed

### Step 2: Python Step - Calculate with Pymeeus

```python
import json
from pymeeus.Epoch import Epoch
from pymeeus.Coordinates import Coordinates
from pymeeus.Star import Star
from pymeeus.Sun import Sun
from pymeeus.Moon import Moon

def handler(pd: "pipedream"):
    data = pd.steps["trigger"]["event"]["body"]
    
    year = data.get("year")
    month = data.get("month")
    day = data.get("day")
    hour = data.get("hour", 12)
    minute = data.get("minute", 0)
    latitude = data.get("latitude", 0)
    longitude = data.get("longitude", 0)
    
    try:
        # Create epoch
        epoch = Epoch(year, month, day + hour/24 + minute/1440)
        
        # Calculate Sun position
        sun = Sun(epoch)
        sun_lon = sun.apparent_geocentric_longitude()
        sun_sign = get_zodiac_sign(float(sun_lon))
        
        # Calculate Moon position
        moon = Moon(epoch)
        moon_lon = moon.apparent_geocentric_longitude()
        moon_lat = moon.apparent_geocentric_latitude()
        moon_sign = get_zodiac_sign(float(moon_lon))
        moon_degree = float(moon_lon) % 30
        
        return {
            "sunSign": sun_sign,
            "moonSign": moon_sign,
            "moonPlacement": {
                "moonSign": moon_sign,
                "moonDegree": round(moon_degree, 2),
                "moonLatitude": round(float(moon_lat), 2)
            }
        }
    except Exception as e:
        return {"error": str(e)}

def get_zodiac_sign(longitude):
    """Convert longitude to zodiac sign"""
    signs = [
        "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ]
    lon = float(longitude) % 360
    sign_index = int(lon / 30)
    return signs[sign_index]

return handler(pd)
```

### Step 3: Return HTTP Response
- Response Body: `{{ steps.python.$return_value }}`

---

## Option 3: Using Swiss Ephemeris (Most Accurate)

### Step 1: HTTP Trigger (Built-in)

### Step 2: Node.js Step - Swiss Ephemeris

```javascript
import axios from 'axios';

export default defineComponent({
  async run({ steps, $ }) {
    const { year, month, day, hour = 12, minute = 0, latitude = 0, longitude = 0 } = steps.trigger.event.body;
    
    try {
      // Using Astro-Seek API (Swiss Ephemeris backend)
      const response = await axios.get('https://www.astro-seek.com/api/calculate', {
        params: {
          year,
          month,
          day,
          hour,
          minute,
          latitude,
          longitude,
          api_key: process.env.ASTRO_SEEK_API_KEY
        }
      });

      const data = response.data;
      
      return {
        sunSign: data.sun.sign,
        moonSign: data.moon.sign,
        risingSign: data.asc?.sign,
        moonPlacement: {
          moonSign: data.moon.sign,
          moonDegree: data.moon.degree,
          moonHouse: data.moon.house,
          moonPhase: calculateMoonPhase(data.moon.degree, data.sun.degree)
        },
        rawData: data
      };
    } catch (error) {
      $.flow.exit(`Error: ${error.message}`);
    }
  }
});

function calculateMoonPhase(moonDegree, sunDegree) {
  const phase = (moonDegree - sunDegree + 360) % 360;
  if (phase < 45) return "New Moon";
  if (phase < 90) return "Waxing Crescent";
  if (phase < 135) return "First Quarter";
  if (phase < 180) return "Waxing Gibbous";
  if (phase < 225) return "Full Moon";
  if (phase < 270) return "Waning Gibbous";
  if (phase < 315) return "Last Quarter";
  return "Waning Crescent";
}
```

---

## Environment Variables Setup

In Pipedream, add these secrets:

1. Go to your workflow settings
2. Click "Environment Variables"
3. Add:

```
ASTRO_API_KEY=your_astro_api_key_here
ASTRO_SEEK_API_KEY=your_astro_seek_api_key_here
```

---

## Testing Your Workflow

### Test Request Body:
```json
{
  "year": 1990,
  "month": 1,
  "day": 15,
  "hour": 12,
  "minute": 0,
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

### Expected Response:
```json
{
  "sunSign": "Capricorn",
  "moonSign": "Cancer",
  "risingSign": "Libra",
  "moonPlacement": {
    "moonSign": "Cancer",
    "moonDegree": 15.5,
    "moonHouse": 5
  }
}
```

---

## Debugging Tips

1. **Check Logs**: Click "Logs" in Pipedream to see execution details
2. **Test Step**: Use Pipedream's "Test" button to run with sample data
3. **Inspect Response**: Look at the HTTP response in the logs
4. **Verify API Keys**: Make sure environment variables are set correctly

---

## API Comparison

| API | Accuracy | Cost | Setup |
|-----|----------|------|-------|
| Astro-API | Good | Free (100/mo) | Easy |
| Swiss Ephemeris | Excellent | Paid | Medium |
| Pymeeus | Good | Free | Hard |

**Recommendation**: Start with Astro-API for simplicity, upgrade to Swiss Ephemeris for production accuracy.

---

## Next Steps

1. Choose your preferred option (Astro-API recommended)
2. Copy the code into your Pipedream workflow
3. Add environment variables if needed
4. Test with the sample request
5. Deploy and get your webhook URL
6. Add URL to your `.env` file

Happy calculating! 🌙✨

