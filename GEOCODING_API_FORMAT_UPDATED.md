# ✅ Geocoding API Format Updated

## What Changed

Updated `src/utils/geocoding.ts` to send requests in the correct Pipedream format.

---

## 📝 Before

```javascript
const response = await fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    birthPlace: birthPlace,
    birthDate: birthDate,
    birthTime: birthTime
  })
});
```

---

## ✅ After

```javascript
// Format time to HH:MM:SS if provided
let formattedTime = undefined;
if (birthTime) {
  // If birthTime is HH:MM, convert to HH:MM:SS
  if (birthTime.includes(':') && birthTime.split(':').length === 2) {
    formattedTime = `${birthTime}:00`;
  } else {
    formattedTime = birthTime;
  }
}

const response = await fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'User-Agent': 'pipedream/1',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    address: birthPlace,
    date: birthDate,
    ...(formattedTime && { time: formattedTime })
  })
});
```

---

## 🔄 Key Changes

### 1. Headers
**Before:**
```javascript
headers: {
  'Content-Type': 'application/json',
}
```

**After:**
```javascript
headers: {
  'User-Agent': 'pipedream/1',
  'Content-Type': 'application/json',
}
```

### 2. Field Names
**Before:**
```javascript
{
  birthPlace: "...",
  birthDate: "...",
  birthTime: "..."
}
```

**After:**
```javascript
{
  address: "...",
  date: "...",
  time: "..."
}
```

### 3. Time Format
**Before:**
```javascript
birthTime: "14:30"  // HH:MM
```

**After:**
```javascript
time: "14:30:00"    // HH:MM:SS
```

---

## 📊 Example Request

Now sends:

```
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

## 🧪 Testing

### 1. Restart Dev Server
```bash
npm run dev
```

### 2. Test in Browser
1. Go to `http://localhost:4000/quiz`
2. Fill form:
   - Birth Date: `1990-10-30`
   - Birth Time: `03:12`
   - Birth Place: `Fremont, California, USA`
3. Click **"Reveal My Meditations"**
4. Open console (F12)
5. Should see logs with no errors

### 3. Test with Curl
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

## 📋 Checklist

- [x] Updated field names: `birthPlace` → `address`
- [x] Updated field names: `birthDate` → `date`
- [x] Updated field names: `birthTime` → `time`
- [x] Added `User-Agent: pipedream/1` header
- [x] Format time to HH:MM:SS
- [ ] Restart dev server
- [ ] Test in browser
- [ ] Test with curl
- [ ] Verify no errors

---

## 🎉 Result

Your app now sends requests in the exact format Pipedream expects:

✅ Correct field names
✅ Correct headers
✅ Correct time format
✅ Ready for birth chart calculation!

---

**Ready to test? Restart your dev server and try the quiz! 🚀**

