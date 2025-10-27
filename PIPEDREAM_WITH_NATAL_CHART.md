# ✅ Pipedream Astro Step with Natal Wheel Chart

I've added the natal wheel chart API to your astro step. Now you'll get a chart URL in the response!

---

## 🎨 What's New

Your astro step now makes **3 API calls**:

1. **planets** - Get Moon sign
2. **house_cusps** - Get house cusps
3. **natal_wheel_chart** - Get chart image URL ✨ NEW!

---

## 📊 Response Now Includes

```json
{
  "moonSign": "Pisces",
  "moonHouse": 5,
  "cusps": [...],
  "chartUrl": "https://s3.ap-south-1.amazonaws.com/western-chart/65a7ab90-df91-11e9-9ab4-a70005bb269b.svg",
  "chartError": null,
  "lat": 37.5485,
  "lon": -121.9886,
  "date": "1990-10-30",
  "time": "03:12:00"
}
```

---

## 🔑 Chart Customization

The chart is customized with these colors:

```javascript
{
  planet_icon_color: "#F57C00",        // Orange
  inner_circle_background: "#FFF8E1",  // Light yellow
  sign_icon_color: "red",              // Red
  sign_background: "#ffffff",          // White
  chart_size: 500,                     // 500x500 pixels
  image_type: "png"                    // PNG format
}
```

You can customize these colors in the code if you want different colors.

---

## 🚀 Setup Steps

### Step 1: Copy the Updated Code
Open: **`PIPEDREAM_TWO_STEPS_WITH_CORS.md`**
Copy the entire astro step code block (it's already updated with the chart API).

### Step 2: Update Pipedream
1. Go to https://pipedream.com
2. Open your workflow
3. Click the **astro step**
4. **Delete all code**
5. **Paste the new code**
6. Click **"Save"**

### Step 3: Deploy
1. Click **"Deploy"** button
2. Wait for "Workflow deployed"

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
5. Look for `chartUrl` in the response ✅

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

## 📝 Code Changes

### What Was Added

```javascript
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
      ...payload,  // Reuse the same payload (day, month, year, hour, min, lat, lon, tzone)
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
```

### Response Updated

```javascript
const response = {
  moonSign: moon.sign,
  moonHouse: computedHouse ?? apiHouse,
  cusps,
  timezoneUsed: timezone,
  tzone,
  lat, lon, date, time: ISOtime,
  chartUrl,        // ✨ NEW!
  chartError       // ✨ NEW!
};
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
  "cuspsFound": true,
  "chartUrl": "https://s3.ap-south-1.amazonaws.com/western-chart/65a7ab90-df91-11e9-9ab4-a70005bb269b.svg",
  "chartError": null
}
```

---

## 🎨 Customizing Chart Colors

If you want to change the chart colors, edit these lines in the astro step:

```javascript
body: JSON.stringify({
  ...payload,
  planet_icon_color: "#F57C00",        // Change this
  inner_circle_background: "#FFF8E1",  // Change this
  sign_icon_color: "red",              // Change this
  sign_background: "#ffffff",          // Change this
  chart_size: 500,                     // Change size (pixels)
  image_type: "png"                    // or "svg"
})
```

---

## 🖼️ Using the Chart URL in Frontend

Once you get the `chartUrl`, you can display it in your React component:

```jsx
// In your component
const [chartUrl, setChartUrl] = useState(null);

// After getting response from Pipedream
if (response.chartUrl) {
  setChartUrl(response.chartUrl);
}

// In JSX
{chartUrl && (
  <div className="chart-container">
    <img src={chartUrl} alt="Natal Wheel Chart" />
  </div>
)}
```

---

## ✅ Verification Checklist

- [ ] Copied updated code from `PIPEDREAM_TWO_STEPS_WITH_CORS.md`
- [ ] Pasted into Pipedream astro step
- [ ] Clicked "Save"
- [ ] Clicked "Deploy"
- [ ] Restarted dev server
- [ ] Tested in browser
- [ ] `chartUrl` appears in response
- [ ] No CORS errors

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| `chartUrl` is null | Check AstrologyAPI credentials |
| `chartError` has message | Check the error message for details |
| Chart image not loading | Try opening the URL directly in browser |
| Still getting CORS error | Make sure you clicked **"Deploy"** |

---

## 📚 Files

| File | Purpose |
|------|---------|
| **`PIPEDREAM_TWO_STEPS_WITH_CORS.md`** | ⭐ Updated astro step with chart API |
| **`PIPEDREAM_WITH_NATAL_CHART.md`** | This file - chart API guide |

---

**Ready? Update the astro step and deploy! 🚀**

