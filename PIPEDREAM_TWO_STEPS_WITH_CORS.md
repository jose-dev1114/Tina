# ✅ Pipedream Two-Step Workflow with CORS

Your workflow has two steps:
1. **geo step** - Geocoding (extract lat, lon, timezone)
2. **astro step** - Birth chart calculation

The CORS error needs to be fixed in the **astro step** (the final step that returns the response).

---

## Step 1: Geo Step (No Changes Needed)

Keep your existing geo step code as-is:

```javascript
export default defineComponent({
  async run({ steps }) {
    const f = steps.search_address.$return_value?.features?.[0];
    if (!f) throw new Error("No geocoding result from search_address");
    const props = f.properties || {};
    const lat = props.lat ?? f.geometry?.coordinates?.[1];
    const lon = props.lon ?? f.geometry?.coordinates?.[0];

    let timezone =
      (typeof props.timezone === "string" ? props.timezone : null) ||
      props.timezone?.name ||
      props.timezone?.offset_STD_timezone ||
      props.timezone?.offset_std_timezone ||
      null;

    if (!timezone) {
      timezone = "UTC";
    }
    return { lat, lon, timezone };
  }
});
```

---

## Step 2: Astro Step (Updated with CORS)

Replace your astro step code with this:

```javascript
import fetch from "node-fetch";
import { DateTime } from "luxon";

export default defineComponent({
  async run({ steps, $ }) {
    try {
      const EPSILON_DEG = 0.5;
      const DEFAULT_HSYS = "P";
      const DEFAULT_ZOD  = "tropical";

      const geo = steps.geo?.$return_value;
      if (!geo) {
        return $.respond({
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
            'Content-Type': 'application/json'
          },
          body: { error: "Missing steps.geo.$return_value" }
        });
      }

      const { lat, lon, timezone } = geo;

      const body = steps.trigger.event.body || {};
      const date = body.date || "1989-06-10";
      const timeIn = body.time || "14:25";
      const houseSystem = (body.houseSystem || DEFAULT_HSYS).toUpperCase();
      const zodiac = (body.zodiac || DEFAULT_ZOD).toLowerCase();

      const parts = timeIn.split(":");
      const H = parseInt(parts[0] || "0", 10);
      const M = parseInt(parts[1] || "0", 10);
      const ISOtime = timeIn.length === 5 ? `${timeIn}:00` : timeIn;

      const dt = DateTime.fromISO(`${date}T${ISOtime}`, { zone: timezone || "UTC" });
      const tzone = dt.isValid ? dt.offset / 60 : 0;

      const [Y, Mo, D] = date.split("-").map(n => parseInt(n, 10));
      const payload = {
        day: D, month: Mo, year: Y,
        hour: H, min: M,
        lat, lon, tzone,
        house_system: houseSystem,
        hsys: houseSystem,
        zodiac
      };

      const call = async (endpoint) => {
        const resp = await fetch(`https://json.astrologyapi.com/v1/${endpoint}`, {
          method: "POST",
          headers: {
            "Authorization": "Basic " + Buffer.from(
              process.env.ASTRO_USER_ID + ":" + process.env.ASTRO_API_KEY
            ).toString("base64"),
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        const json = await resp.json().catch(() => ({}));
        return { ok: resp.ok, status: resp.status, json };
      };

      const findMoon = (root) => {
        const seen = new Set(); const stack = [root];
        while (stack.length) {
          const v = stack.pop();
          if (!v || typeof v !== "object" || seen.has(v)) continue;
          seen.add(v);
          if (Array.isArray(v)) {
            for (const it of v) {
              if (it && typeof it === "object" && it.name === "Moon") return it;
              stack.push(it);
            }
          } else {
            if (v.name === "Moon") return v;
            for (const k of Object.keys(v)) stack.push(v[k]);
          }
        }
        return null;
      };

      const norm = (a) => ((a % 360) + 360) % 360;

      const readCusps = (data) => {
        const asNumbers = (arr) => {
          if (!Array.isArray(arr)) return null;
          const out = [];
          for (let i = 0; i < 12; i++) {
            const v = arr[i];
            out.push(typeof v === "number" ? v : (v?.degree ?? v?.cusp ?? v?.longitude ?? null));
          }
          return out.every(x => typeof x === "number") ? out : null;
        };
        const fromObj = (obj) => {
          if (!obj || Array.isArray(obj)) return null;
          const out = [];
          for (let i = 1; i <= 12; i++) {
            const v = obj[`house${i}`];
            out.push(typeof v === "number" ? v : (v?.degree ?? v?.cusp ?? v?.longitude ?? null));
          }
          return out.every(x => typeof x === "number") ? out : null;
        };
        const fromHouseArray = (arr) => {
          if (!Array.isArray(arr)) return null;
          const out = [];
          for (let i = 1; i <= 12; i++) {
            const h = arr.find(o => (o.house ?? o.no) === i);
            const v = h ? (h.degree ?? h.cusp ?? h.longitude ?? null) : null;
            out.push(v);
          }
          return out.every(x => typeof x === "number") ? out : null;
        };

        return (
          asNumbers(data?.house_cusps) ||
          asNumbers(data?.cusps) ||
          fromHouseArray(data?.houses) ||
          fromObj(data?.houses) ||
          null
        );
      };

      const computeHouse = (lonDeg, cusps, eps) => {
        const c = cusps.map(norm);
        const wrap = [...c, c[0] + 360];
        const m = norm(lonDeg);
        for (let i = 0; i < 12; i++) {
          const a = wrap[i], b = wrap[i + 1];
          if (m >= a && m < b) {
            const toUpper = b - m;
            if (toUpper < eps) return ((i + 12) % 12) + 1;
            return i + 1;
          }
        }
        return null;
      };

      // 1) Moon
      const planets = await call("planets");
      if (!planets.ok) {
        return $.respond({
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
            'Content-Type': 'application/json'
          },
          body: { error: "AstrologyAPI planets error", status: planets.status, details: planets.json, sent: payload }
        });
      }

      const moon = findMoon(planets.json);
      if (!moon) {
        return $.respond({
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
            'Content-Type': 'application/json'
          },
          body: { error: "Moon not found", planets: planets.json, sent: payload }
        });
      }

      const apiHouse = moon.house;
      const moonLon = moon.fullDegree ?? moon.longitude ?? moon.degree ?? null;

      // 2) Cusps
      const candidates = ["house_cusps", "houses", "cusps"];
      let cusps = null, lastCuspsResp = null;
      for (const ep of candidates) {
        const r = await call(ep);
        if (r.ok) {
          const tryCusps = readCusps(r.json);
          if (tryCusps) { cusps = tryCusps; break; }
        }
        lastCuspsResp = r;
      }

      let computedHouse = null;
      if (cusps && typeof moonLon === "number") {
        computedHouse = computeHouse(moonLon, cusps, EPSILON_DEG);
      }

      // 3) Natal Wheel Chart
      let chartUrl = null;
      let chartError = null;
      try {
        const chartResp = await fetch('https://json.astrologyapi.com/v1/natal_wheel_chart', {
          method: "POST",
          headers: {
            "Authorization": "Basic " + Buffer.from(
              process.env.ASTRO_USER_ID + ":" + process.env.ASTRO_API_KEY
            ).toString("base64"),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...payload,
            planet_icon_color: "#F57C00",
            inner_circle_background: "#FFF8E1",
            sign_icon_color: "red",
            sign_background: "#ffffff",
            chart_size: 500,
            image_type: "png"
          })
        });

        const chartData = await chartResp.json().catch(() => ({}));

        if (chartResp.ok && chartData.chart_url) {
          chartUrl = chartData.chart_url;
        } else {
          chartError = chartData.msg || "Failed to generate chart";
        }
      } catch (chartErr) {
        chartError = chartErr.message;
      }

      // Return with CORS headers
      const response = {
        moonSign: moon.sign,
        moonHouse: computedHouse ?? apiHouse,
        apiHouse,
        computedHouse,
        moonLongitude: moonLon,
        cusps,
        timezoneUsed: timezone,
        tzone,
        lat, lon, date, time: ISOtime, houseSystem, zodiac,
        cuspsFound: !!cusps,
        cuspsEndpointTried: candidates,
        lastCuspsStatus: cusps ? undefined : lastCuspsResp?.status,
        lastCuspsKeys: cusps ? undefined : (lastCuspsResp?.json ? Object.keys(lastCuspsResp.json) : undefined),
        chartUrl,
        chartError
      };

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
      console.error('❌ Astro step error:', error.message);
      
      return $.respond({
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
          'Content-Type': 'application/json'
        },
        body: { 
          error: error.message,
          stack: error.stack
        }
      });
    }
  }
});
```

---

## 🔑 Key Changes in Astro Step

### 1. Added `$` Parameter
```javascript
async run({ steps, $ }) {  // Added $
```

### 2. Wrapped All Returns with `$.respond()`
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

### 3. Added Try/Catch for Error Handling
```javascript
try {
  // ... all your logic ...
} catch (error) {
  return $.respond({
    status: 500,
    headers: { 'Access-Control-Allow-Origin': '*', ... },
    body: { error: error.message }
  });
}
```

### 4. CORS Headers on All Responses
- Success (200)
- Errors (400, 500)

---

## 🚀 Setup Steps

### Step 1: Keep Geo Step As-Is
Your geo step doesn't need any changes. Leave it exactly as it is.

### Step 2: Update Astro Step
1. Go to https://pipedream.com
2. Open your geocoding workflow
3. Click the **astro step** (the second step)
4. **Delete all existing code**
5. **Paste the code above**
6. Click **"Save"**

### Step 3: Deploy
1. Click **"Deploy"** button
2. Wait for "Workflow deployed" message

### Step 4: Restart Dev Server
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
  "moonSign": "Pisces",
  "moonHouse": 5,
  "apiHouse": 5,
  "computedHouse": 5,
  "moonLongitude": 15.3,
  "cusps": [22.5, 45.2, 68.1, 90.0, 112.3, 135.1, 202.5, 225.2, 248.1, 270.0, 292.3, 315.1],
  "timezoneUsed": "America/Los_Angeles",
  "tzone": -7,
  "lat": 37.5485,
  "lon": -121.9886,
  "date": "1990-10-30",
  "time": "03:12:00",
  "houseSystem": "P",
  "zodiac": "tropical",
  "cuspsFound": true
}
```

---

## ✅ Verification Checklist

- [ ] Geo step left unchanged
- [ ] Astro step code replaced
- [ ] Clicked "Save"
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
| Moon not found | Check AstrologyAPI credentials in environment variables |
| Cusps not found | Try different house system or check API response |

---

**Ready? Update the astro step and deploy! 🚀**

