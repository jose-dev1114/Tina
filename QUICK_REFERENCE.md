# ⚡ Quick Reference Card

## 🚀 Start Dev Server
```bash
npm run dev
```
Then go to: `http://localhost:4000/quiz`

---

## 📋 Test the Feature

1. **Fill the form:**
   - Birth Date: `1990-08-15`
   - Birth Time: `14:30` (optional)
   - Birth Place: `New York`

2. **Click:** "Reveal My Meditations"

3. **Open Console:** Press `F12`

4. **Check Logs:**
   ```
   🚀 Reveal My Meditations clicked!
   📍 Latitude: 40.7128
   📍 Longitude: -74.0060
   🕐 Timezone: America/New_York
   ```

---

## 📍 Mock Data Locations

| Location | Latitude | Longitude | Timezone |
|----------|----------|-----------|----------|
| New York | 40.7128 | -74.0060 | America/New_York |
| London | 51.5074 | -0.1278 | Europe/London |
| Tokyo | 35.6762 | 139.6503 | Asia/Tokyo |
| Sydney | -33.8688 | 151.2093 | Australia/Sydney |
| Paris | 48.8566 | 2.3522 | Europe/Paris |
| Los Angeles | 34.0522 | -118.2437 | America/Los_Angeles |
| Toronto | 43.6532 | -79.3832 | America/Toronto |
| Mumbai | 19.0760 | 72.8777 | Asia/Kolkata |

---

## 🔧 Setup Real API (Optional)

1. **Get API Key:**
   - Go to https://www.geoapify.com/
   - Sign up (free)
   - Copy API key

2. **Add to `.env`:**
   ```
   VITE_GEOAPIFY_API_KEY=your_api_key_here
   ```

3. **Restart Dev Server:**
   ```bash
   npm run dev
   ```

---

## 📊 Console Output

```
🚀 Reveal My Meditations clicked!
📋 Quiz Data: {...}
🔄 Geocoding birth place...
🌍 Starting geocoding for: New York
✅ Geocoding successful!
📍 Latitude: 40.7128
📍 Longitude: -74.0060
🕐 Timezone: America/New_York
📊 Complete Data for Astrology Calculation: {...}
```

---

## 🎯 What Gets Logged

| Item | Example | Range |
|------|---------|-------|
| Latitude | 40.7128 | -90 to 90 |
| Longitude | -74.0060 | -180 to 180 |
| Timezone | America/New_York | IANA format |
| Birth Date | 1990-08-15 | YYYY-MM-DD |
| Birth Time | 14:30 | HH:MM |

---

## ✅ Success Checklist

- [ ] Dev server running
- [ ] Quiz page loads
- [ ] Form fills without errors
- [ ] "Reveal My Meditations" button clickable
- [ ] Console shows logs
- [ ] Latitude is a number between -90 and 90
- [ ] Longitude is a number between -180 and 180
- [ ] Timezone is in IANA format
- [ ] No red errors in console

---

## ❌ Troubleshooting

| Problem | Solution |
|---------|----------|
| No console logs | Press F12 to open console |
| "Missing required fields" | Fill Birth Date and Birth Place |
| Latitude/Longitude are 0 | Using mock data for unknown location |
| Timezone is "UTC" | Timezone not found, using default |
| API error | Check API key in .env |

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/utils/geocoding.ts` | Geocoding logic |
| `src/pages/AstroQuiz.tsx` | Quiz component |
| `.env` | API key config |

---

## 🔗 Documentation

- `GEOCODING_SETUP.md` - Full setup guide
- `CONSOLE_LOGS_REFERENCE.md` - Console examples
- `VISUAL_CONSOLE_GUIDE.md` - Step-by-step guide
- `IMPLEMENTATION_COMPLETE.md` - What's done

---

## 💡 Tips

1. **View Console:** Press `F12`
2. **Filter Logs:** Type in console filter box
3. **Copy Output:** Right-click → Copy
4. **Clear Console:** Click clear button or type `clear()`
5. **Expand Objects:** Click arrow next to objects

---

## 🎓 Code Example

```typescript
import { geocodeBirthPlace } from '../utils/geocoding';

// Use it like this:
const geoData = await geocodeBirthPlace('New York');

console.log(geoData.lat);      // 40.7128
console.log(geoData.lon);      // -74.0060
console.log(geoData.timezone); // America/New_York
```

---

## 🚀 Next Steps

1. ✅ Verify geocoding works
2. ⏳ Integrate astrology API
3. ⏳ Calculate sun/moon signs
4. ⏳ Filter meditations
5. ⏳ Show recommendations

---

## 📞 Need Help?

1. Check console for error messages
2. Read `GEOCODING_SETUP.md`
3. Check `CONSOLE_LOGS_REFERENCE.md`
4. Look at `src/utils/geocoding.ts`

---

**Happy testing! 🌙✨**

