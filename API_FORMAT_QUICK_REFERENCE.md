# 📋 API Format - Quick Reference

## ✅ Updated Request Format

Your app now sends requests in the correct Pipedream format:

```
POST https://eox9q14lqga0nqh.m.pipedream.net/

Headers:
User-Agent: pipedream/1
Content-Type: application/json

Body:
{
  "address": "Fremont, California, USA",
  "date": "1990-10-30",
  "time": "03:12:00"
}
```

---

## 🔄 Field Mapping

| Old Name | New Name | Format | Example |
|----------|----------|--------|---------|
| `birthPlace` | `address` | String | `"Fremont, California, USA"` |
| `birthDate` | `date` | YYYY-MM-DD | `"1990-10-30"` |
| `birthTime` | `time` | HH:MM:SS | `"03:12:00"` |

---

## 📝 Code Changes

**File:** `src/utils/geocoding.ts`

**What changed:**
- ✅ Headers now include `User-Agent: pipedream/1`
- ✅ Body fields renamed to `address`, `date`, `time`
- ✅ Time automatically formatted to HH:MM:SS

---

## 🧪 Test It

### Quick Test
```bash
curl -X POST https://eox9q14lqga0nqh.m.pipedream.net \
  -H "User-Agent: pipedream/1" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "Fremont, California, USA",
    "date": "1990-10-30",
    "time": "03:12:00"
  }'
```

### In Browser
1. `npm run dev`
2. Go to `http://localhost:4000/quiz`
3. Fill form and click "Reveal My Meditations"
4. Check console (F12) for logs

---

## ✅ Expected Response

```json
{
  "success": true,
  "lat": 37.5485,
  "lon": -121.9886,
  "timezone": "America/Los_Angeles",
  "formattedAddress": "Fremont, CA, USA",
  "birthChart": {
    "sunSign": "Scorpio",
    "moonSign": "Pisces",
    "risingSign": "Gemini"
  }
}
```

---

## 🎯 Next Steps

1. **Restart dev server:** `npm run dev`
2. **Test in browser:** Fill quiz and submit
3. **Check console:** F12 to see logs
4. **Verify:** No errors, birth chart data received

---

## 📚 Related Files

- `src/utils/geocoding.ts` - Updated utility
- `GEOCODING_API_FORMAT_UPDATED.md` - Detailed changes
- `PIPEDREAM_SIMPLE_WORKING_CODE.md` - Pipedream workflow code

---

**Ready? Restart your dev server and test! 🚀**

