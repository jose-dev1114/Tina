# 🌍 Geocoding Setup Guide

## Overview

When users click "Reveal My Meditations" in the Astro Quiz, the app now:
1. ✅ Validates birth date and birth place
2. ✅ Geocodes the birth place to get latitude, longitude, and timezone
3. ✅ Logs all data to the browser console for verification
4. ✅ Prepares data for astrology calculation

---

## 🚀 Quick Start

### Option 1: Use Mock Data (No API Key Needed) ⭐

The app comes with **mock geocoding data** for common locations:
- New York
- London
- Tokyo
- Sydney
- Paris
- Los Angeles
- Toronto
- Mumbai

**To test:**
1. Start your app: `npm run dev`
2. Go to `/quiz`
3. Fill in the form with:
   - **Birth Date**: Any date
   - **Birth Time**: Optional
   - **Birth Place**: Try "New York" or "London"
4. Click "Reveal My Meditations"
5. **Check the browser console** (F12 or Cmd+Option+I)

You'll see console logs like:
```
🌍 Starting geocoding for: New York
📌 Using mock data for: new york
✅ Geocoding successful!
📍 Latitude: 40.7128
📍 Longitude: -74.0060
🕐 Timezone: America/New_York
📮 Formatted Address: New York, NY, USA
```

---

### Option 2: Use Real Geoapify API

For real geocoding with any location:

#### Step 1: Get a Free Geoapify API Key

1. Go to [Geoapify](https://www.geoapify.com/)
2. Sign up for a free account
3. Copy your API key

#### Step 2: Add to .env

```bash
VITE_GEOAPIFY_API_KEY=your_api_key_here
```

#### Step 3: Restart Dev Server

```bash
npm run dev
```

#### Step 4: Test

Fill in the quiz with any location and click "Reveal My Meditations"

---

## 📊 Console Output

When you click "Reveal My Meditations", you'll see:

```
🚀 Reveal My Meditations clicked!
📋 Quiz Data: {
  birthDate: "1990-08-15",
  birthTime: "14:30",
  birthPlace: "New York",
  spiritualGoals: ["Inner peace", "Stress relief"],
  challenges: ["Anxiety and worry"]
}
🔄 Geocoding birth place...
🌍 Starting geocoding for: New York
✅ Geocoding successful!
📍 Latitude: 40.7128
📍 Longitude: -74.0060
🕐 Timezone: America/New_York
📮 Formatted Address: New York, NY, USA
📊 Complete Data for Astrology Calculation:
{
  birthDate: "1990-08-15",
  birthTime: "14:30",
  birthPlace: "New York",
  latitude: 40.7128,
  longitude: -74.0060,
  timezone: "America/New_York",
  spiritualGoals: ["Inner peace", "Stress relief"],
  challenges: ["Anxiety and worry"]
}
```

---

## 🔍 What to Check

### ✅ Latitude & Longitude
- Should be valid decimal numbers
- Latitude: -90 to 90
- Longitude: -180 to 180

### ✅ Timezone
- Should be a valid IANA timezone (e.g., "America/New_York", "Europe/London")
- If not found, defaults to "UTC"

### ✅ Birth Date & Time
- Birth Date: Required (YYYY-MM-DD format)
- Birth Time: Optional (HH:MM format, defaults to noon if not provided)

---

## 🛠️ Troubleshooting

### "No geocoding result found"
- Check the birth place spelling
- Try a more specific location (e.g., "New York, USA" instead of just "New York")
- Check if you're using mock data or real API

### "Geoapify API key not configured"
- This is normal! The app will use mock data
- To use real geocoding, add your API key to .env

### "Error processing your birth information"
- Check the browser console for detailed error messages
- Verify Birth Date and Birth Place are filled in
- Try a different location

---

## 📁 Files Modified

- `src/pages/AstroQuiz.tsx` - Added geocoding call in handleSubmit
- `src/utils/geocoding.ts` - New utility file with geocoding logic
- `.env` - Added VITE_GEOAPIFY_API_KEY

---

## 🔗 Next Steps

After geocoding works, the next step is to:
1. Send lat, lon, timezone to astrology API
2. Calculate sun sign, moon sign, rising sign
3. Return personalized meditation recommendations

---

## 📚 Related Files

- `src/utils/geocoding.ts` - Geocoding utility
- `src/pages/AstroQuiz.tsx` - Quiz component
- `.env` - Environment variables

---

**Happy testing! 🌙**

