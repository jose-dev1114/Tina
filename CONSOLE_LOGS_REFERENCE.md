# 📋 Console Logs Reference

## How to View Console Logs

1. **Open Browser Developer Tools:**
   - Windows/Linux: Press `F12` or `Ctrl+Shift+I`
   - Mac: Press `Cmd+Option+I`

2. **Go to Console Tab**

3. **Click "Reveal My Meditations" button**

4. **Watch the logs appear in real-time**

---

## 🎯 Expected Console Output

### Step 1: Button Clicked
```
🚀 Reveal My Meditations clicked!
```

### Step 2: Quiz Data Logged
```
📋 Quiz Data: {
  birthDate: "1990-08-15",
  birthTime: "14:30",
  birthPlace: "New York",
  spiritualGoals: ["Inner peace", "Stress relief"],
  challenges: ["Anxiety and worry"]
}
```

### Step 3: Geocoding Started
```
🔄 Geocoding birth place...
🌍 Starting geocoding for: New York
```

### Step 4: Geocoding Result (Mock Data)
```
📌 Using mock data for: new york
✅ Geocoding successful!
📍 Latitude: 40.7128
📍 Longitude: -74.0060
🕐 Timezone: America/New_York
📮 Formatted Address: New York, NY, USA
```

### Step 5: Complete Data Object
```
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

## 🔴 Error Cases

### Missing Birth Date
```
⚠️ Missing required fields: Birth Date and Birth Place are required
```
(Alert shown to user)

### Missing Birth Place
```
⚠️ Missing required fields: Birth Date and Birth Place are required
```
(Alert shown to user)

### Geocoding Error (Real API)
```
❌ Geocoding error: Error: No geocoding result found for the given location
```

### API Key Not Configured
```
⚠️ Geoapify API key not configured. Using mock data for demonstration.
📝 To use real geocoding, add VITE_GEOAPIFY_API_KEY to your .env file
🔗 Get a free API key at: https://www.geoapify.com/
📌 Using mock data for: [location]
```

---

## 📍 Latitude & Longitude Values

### Valid Range
- **Latitude:** -90 to 90
- **Longitude:** -180 to 180

### Examples
```
New York:     lat: 40.7128,  lon: -74.0060
London:       lat: 51.5074,  lon: -0.1278
Tokyo:        lat: 35.6762,  lon: 139.6503
Sydney:       lat: -33.8688, lon: 151.2093
Paris:        lat: 48.8566,  lon: 2.3522
Los Angeles:  lat: 34.0522,  lon: -118.2437
Toronto:      lat: 43.6532,  lon: -79.3832
Mumbai:       lat: 19.0760,  lon: 72.8777
```

---

## 🕐 Timezone Values

### Valid Timezones
```
America/New_York
America/Los_Angeles
America/Toronto
Europe/London
Europe/Paris
Asia/Tokyo
Asia/Kolkata
Australia/Sydney
UTC
```

### Format
- IANA timezone format (e.g., "America/New_York")
- Includes daylight saving time handling
- Falls back to "UTC" if not found

---

## 🧪 Test Cases

### Test 1: New York with Time
**Input:**
- Birth Date: 1990-08-15
- Birth Time: 14:30
- Birth Place: New York

**Expected Console:**
```
🚀 Reveal My Meditations clicked!
📋 Quiz Data: {...}
🔄 Geocoding birth place...
🌍 Starting geocoding for: New York
📌 Using mock data for: new york
✅ Geocoding successful!
📍 Latitude: 40.7128
📍 Longitude: -74.0060
🕐 Timezone: America/New_York
📮 Formatted Address: New York, NY, USA
📊 Complete Data for Astrology Calculation: {...}
```

### Test 2: London without Time
**Input:**
- Birth Date: 1985-03-20
- Birth Time: (empty)
- Birth Place: London

**Expected Console:**
```
🚀 Reveal My Meditations clicked!
📋 Quiz Data: {
  birthDate: "1985-03-20",
  birthTime: "",
  birthPlace: "London",
  ...
}
🔄 Geocoding birth place...
🌍 Starting geocoding for: London
📌 Using mock data for: london
✅ Geocoding successful!
📍 Latitude: 51.5074
📍 Longitude: -0.1278
🕐 Timezone: Europe/London
📮 Formatted Address: London, UK
📊 Complete Data for Astrology Calculation: {
  birthDate: "1985-03-20",
  birthTime: "Not provided (will use noon)",
  ...
  latitude: 51.5074,
  longitude: -0.1278,
  timezone: "Europe/London",
  ...
}
```

### Test 3: Unknown Location
**Input:**
- Birth Date: 1995-06-10
- Birth Time: 09:15
- Birth Place: "Unknown City"

**Expected Console:**
```
🚀 Reveal My Meditations clicked!
📋 Quiz Data: {...}
🔄 Geocoding birth place...
🌍 Starting geocoding for: Unknown City
📌 No mock data found, using default UTC
✅ Geocoding successful!
📍 Latitude: 0
📍 Longitude: 0
🕐 Timezone: UTC
📮 Formatted Address: Unknown City
📊 Complete Data for Astrology Calculation: {...}
```

---

## 💡 Tips

1. **Copy Console Output**
   - Right-click in console
   - Select "Save as..."
   - Save for debugging

2. **Filter Logs**
   - Type in the filter box
   - Search for "🌍" to see geocoding logs
   - Search for "❌" to see errors

3. **Expand Objects**
   - Click the arrow next to objects
   - View nested properties
   - Check latitude/longitude values

---

## 🔗 Related Files

- `src/utils/geocoding.ts` - Geocoding logic
- `src/pages/AstroQuiz.tsx` - Quiz component
- `GEOCODING_SETUP.md` - Setup guide

---

**Happy debugging! 🐛✨**

