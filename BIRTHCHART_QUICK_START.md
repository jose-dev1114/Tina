# 🌍✨ Birth Chart Calculation - Quick Start

## What's New

Your Pipedream webhook now calculates **complete birth charts** (Sun, Moon, Rising signs) in addition to geocoding!

---

## 🚀 3-Step Setup

### Step 1: Update Pipedream Workflow

1. Go to https://pipedream.com
2. Open your geocoding workflow
3. Click the **Node.js step**
4. Replace code with: **`PIPEDREAM_ENHANCED_GEOCODING_BIRTHCHART.md`**
5. Click **"Deploy"**

### Step 2: Add API Key to Pipedream

1. Click **"Settings"** (gear icon)
2. Click **"Environment Variables"**
3. Add:
   ```
   ASTRO_API_KEY=af036f676ee1e467ed543890325c33693bf8f61d
   ```
4. Click **"Save"**

### Step 3: Restart Dev Server

```bash
npm run dev
```

---

## ✅ Done!

Your app now:
- ✅ Geocodes location
- ✅ Calculates birth chart
- ✅ Returns all data in one call

---

## 🧪 Test It

### In Browser

1. Go to `http://localhost:4000/quiz`
2. Fill form:
   - Birth Date: `1990-08-15`
   - Birth Time: `14:30`
   - Birth Place: `New York`
3. Click **"Reveal My Meditations"**
4. Open console (F12)
5. Look for:
   ```
   ✅ Birth chart calculated!
   ☀️ Sun Sign: Leo
   🌙 Moon Sign: Cancer
   🌅 Rising Sign: Libra
   ```

### With Curl

```bash
curl -X POST https://eox9q14lqga0nqh.m.pipedream.net \
  -H "Content-Type: application/json" \
  -d '{
    "birthPlace": "New York",
    "birthDate": "1990-08-15",
    "birthTime": "14:30"
  }'
```

---

## 📊 Response Format

```json
{
  "lat": 40.7128,
  "lon": -74.0060,
  "timezone": "America/New_York",
  "formattedAddress": "New York, NY, USA",
  "birthChart": {
    "sunSign": "Leo",
    "moonSign": "Cancer",
    "risingSign": "Libra",
    "sunDegree": 22.5,
    "moonDegree": 15.3,
    "risingDegree": 18.7
  },
  "success": true
}
```

---

## 📝 Code Changes

### `src/utils/geocoding.ts`
- ✅ Added `BirthChartData` interface
- ✅ Updated function to accept `birthDate` and `birthTime`
- ✅ Sends all parameters to Pipedream webhook
- ✅ Returns birth chart data

### `src/pages/AstroQuiz.tsx`
- ✅ Passes birth date and time to geocoding function
- ✅ Logs birth chart data to console

---

## 🎯 Next Steps

Now you can:

1. **Display birth chart** on results page
2. **Filter meditations** by astrological signs
3. **Personalize recommendations** based on chart
4. **Generate PDF guides** with interpretations

---

## 📚 Full Documentation

- **`PIPEDREAM_ENHANCED_GEOCODING_BIRTHCHART.md`** - Workflow code
- **`IMPLEMENT_BIRTHCHART_CALCULATION.md`** - Detailed setup guide
- **`src/utils/geocoding.ts`** - Updated utility
- **`src/pages/AstroQuiz.tsx`** - Updated component

---

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| "ASTRO_API_KEY not configured" | Add to Pipedream environment variables |
| Birth chart is null | Check Pipedream logs |
| No data returned | Verify webhook URL in `.env` |

---

## 🎉 Summary

**Before:** Geocoding only (lat, lon, timezone)
**After:** Geocoding + Birth Chart (lat, lon, timezone, Sun/Moon/Rising signs)

**All in one API call! 🌍✨**

---

**Ready? Follow the 3 steps above!**

