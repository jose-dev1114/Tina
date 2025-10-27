# 🔧 Fix 400 Bad Request Error - Quick Guide

## Problem

You're getting a **400 Bad Request** error from Pipedream when trying to geocode.

## Solution

Your Pipedream workflow code needs to be updated with **simple, working code** that handles errors properly.

---

## ✅ 3-Step Fix (5 minutes)

### Step 1: Get the Working Code

Open this file: **`PIPEDREAM_SIMPLE_WORKING_CODE.md`**

Copy the entire code block (the JavaScript code inside the triple backticks).

### Step 2: Update Pipedream

1. Go to https://pipedream.com
2. Open your geocoding workflow
3. Click the **Node.js step**
4. **Delete all existing code**
5. **Paste the code** from Step 1
6. Click **"Save"**

### Step 3: Set Environment Variables

1. Click **"Settings"** (gear icon)
2. Click **"Environment Variables"**
3. Add these two variables:

```
GEOAPIFY_API_KEY=38d1c93862f1407289d31ed41da13df9
ASTRO_API_KEY=af036f676ee1e467ed543890325c33693bf8f61d
```

4. Click **"Save"**
5. Click **"Deploy"** button

---

## 🧪 Test It

### Quick Test with Curl

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

### Test in Browser

1. Restart dev server: `npm run dev`
2. Go to `http://localhost:4000/quiz`
3. Fill form with birth info
4. Click **"Reveal My Meditations"**
5. Open console (F12)
6. Should see logs and NO errors

---

## ✅ Checklist

- [ ] Copied code from `PIPEDREAM_SIMPLE_WORKING_CODE.md`
- [ ] Pasted into Pipedream Node.js step
- [ ] Set `GEOAPIFY_API_KEY` environment variable
- [ ] Set `ASTRO_API_KEY` environment variable
- [ ] Clicked "Deploy"
- [ ] Restarted dev server
- [ ] Curl test returns success
- [ ] Browser test works

---

## 🎉 Done!

Your app now:
- ✅ Geocodes birth place
- ✅ Calculates birth chart
- ✅ No 400 errors
- ✅ Ready for meditations!

---

**Need help? Check `PIPEDREAM_SIMPLE_WORKING_CODE.md` for detailed instructions! 🚀**

