# 📋 Two-Step Pipedream Workflow - Quick Guide

## Your Workflow Structure

```
Step 1: geo
├─ Input: steps.search_address.$return_value
├─ Output: { lat, lon, timezone }
└─ Status: ✅ No changes needed

Step 2: astro
├─ Input: steps.geo.$return_value + steps.trigger.event.body
├─ Output: { moonSign, moonHouse, cusps, ... }
└─ Status: ⚠️ Needs CORS headers
```

---

## 🔧 What to Update

### Step 1: Geo Step
**Status:** ✅ **LEAVE AS-IS** - No changes needed

Your current code is perfect. Don't touch it.

### Step 2: Astro Step
**Status:** ⚠️ **UPDATE REQUIRED** - Add CORS headers

---

## 🚀 3-Minute Fix

### Step 1: Copy the Updated Astro Code
Open: **`PIPEDREAM_TWO_STEPS_WITH_CORS.md`**
Copy the entire astro step code block.

### Step 2: Update Pipedream
1. Go to https://pipedream.com
2. Open your workflow
3. Click the **astro step** (Step 2)
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

## 🔑 Key Changes in Astro Step

### Before (Causes CORS error)
```javascript
export default defineComponent({
  async run({ steps }) {  // ❌ Missing $
    // ... your logic ...
    return {
      moonSign: moon.sign,
      moonHouse: computedHouse ?? apiHouse,
      // ... other fields ...
    };  // ❌ No CORS headers
  }
});
```

### After (Works!)
```javascript
export default defineComponent({
  async run({ steps, $ }) {  // ✅ Added $
    try {
      // ... your logic ...
      return $.respond({  // ✅ Use $.respond()
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
          'Content-Type': 'application/json'
        },
        body: {
          moonSign: moon.sign,
          moonHouse: computedHouse ?? apiHouse,
          // ... other fields ...
        }
      });
    } catch (error) {
      return $.respond({  // ✅ CORS headers on errors too
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*', ... },
        body: { error: error.message }
      });
    }
  }
});
```

---

## 📊 Changes Summary

| Aspect | Before | After |
|--------|--------|-------|
| Function parameter | `{ steps }` | `{ steps, $ }` |
| Return method | `return { ... }` | `return $.respond({ ... })` |
| CORS headers | ❌ None | ✅ Included |
| Error handling | `throw new Error()` | `try/catch` with CORS |
| Status code | Implicit | Explicit (200, 500) |

---

## ✅ What's Preserved

Your astro step logic is **100% preserved**:
- ✅ Moon finding logic
- ✅ Cusp calculation
- ✅ House computation
- ✅ All debug fields
- ✅ All error handling

---

## 🧪 Test It

### Browser Test
```
1. Go to http://localhost:4000/quiz
2. Fill form and submit
3. Open console (F12)
4. Should see NO CORS errors ✅
```

### Curl Test
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

## ✅ Verification Checklist

- [ ] Geo step left unchanged
- [ ] Astro step code replaced
- [ ] Clicked "Save"
- [ ] Clicked "Deploy"
- [ ] Restarted dev server
- [ ] Tested in browser
- [ ] No CORS errors

---

## 📚 Full Documentation

For complete details, see: **`PIPEDREAM_TWO_STEPS_WITH_CORS.md`**

---

**Ready? Update the astro step and deploy! 🚀**

