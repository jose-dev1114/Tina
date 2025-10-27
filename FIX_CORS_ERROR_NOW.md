# 🔧 Fix CORS Error - Step by Step

## ❌ The Error You Got

```
CORS policy: The 'Access-Control-Allow-Origin' header has a value 
'https://ourhealingpractices.com' that is not equal to the supplied origin
```

## ✅ The Fix

Use Pipedream as a backend proxy to call Geoapify API.

---

## 🚀 Setup (5 minutes)

### Step 1: Go to Pipedream

1. Open https://pipedream.com
2. Sign in or create account
3. Click **"Create Workflow"**

### Step 2: Create HTTP Trigger

1. Choose **"HTTP Trigger"** (default)
2. Click **"Create"**

### Step 3: Add Node.js Step

1. Click **"+"** to add step
2. Search for **"Node.js"**
3. Click **"Run Node.js Code"**
4. **Delete** the default code
5. **Paste** this code:

```javascript
export default defineComponent({
  async run({ steps, $ }) {
    const { birthPlace } = steps.trigger.event.body;
    
    if (!birthPlace) {
      return { error: "birthPlace is required" };
    }
    
    try {
      console.log('🌍 Geocoding:', birthPlace);
      
      const apiKey = process.env.GEOAPIFY_API_KEY;
      if (!apiKey) {
        return { error: "GEOAPIFY_API_KEY not configured" };
      }
      
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(birthPlace)}&apiKey=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`Geoapify error: ${response.statusText}`);
      }
      
      const data = await response.json();
      const feature = data.features?.[0];
      
      if (!feature) {
        return { error: `No location found for: ${birthPlace}` };
      }
      
      const props = feature.properties || {};
      const lat = props.lat ?? feature.geometry?.coordinates?.[1];
      const lon = props.lon ?? feature.geometry?.coordinates?.[0];
      
      let timezone =
        (typeof props.timezone === 'string' ? props.timezone : null) ||
        props.timezone?.name ||
        props.timezone?.offset_STD_timezone ||
        props.timezone?.offset_std_timezone ||
        null;
      
      if (!timezone) {
        timezone = 'UTC';
      }
      
      const formattedAddress = props.formatted || props.address_line1 || birthPlace;
      
      console.log('✅ Geocoding successful!');
      console.log('📍 Latitude:', lat);
      console.log('📍 Longitude:', lon);
      console.log('🕐 Timezone:', timezone);
      
      return { lat, lon, timezone, formattedAddress };
    } catch (error) {
      console.error('❌ Error:', error.message);
      return { error: error.message };
    }
  }
});
```

### Step 4: Add Environment Variable

1. Click **"Settings"** (gear icon)
2. Click **"Environment Variables"**
3. Click **"Add"**
4. **Name:** `GEOAPIFY_API_KEY`
5. **Value:** `38d1c93862f1407289d31ed41da13df9`
6. Click **"Save"**

### Step 5: Deploy

1. Click **"Deploy"** button (top right)
2. Wait for "Workflow deployed" message

### Step 6: Copy Webhook URL

1. Click the **HTTP Trigger** step
2. Copy the **Webhook URL** (it's in the blue box)
3. It looks like: `https://eom.prod.eoapi.com/v1/webhooks/xxxxx`

### Step 7: Update .env File

1. Open `.env` in your project
2. Find this line:
   ```
   VITE_PIPEDREAM_GEOCODING_WEBHOOK_URL=your_pipedream_geocoding_webhook_url_here
   ```
3. Replace with your webhook URL:
   ```
   VITE_PIPEDREAM_GEOCODING_WEBHOOK_URL=https://eom.prod.eoapi.com/v1/webhooks/xxxxx
   ```
4. Save file

### Step 8: Restart Dev Server

```bash
npm run dev
```

---

## 🧪 Test It

1. Go to `http://localhost:4000/quiz`
2. Fill form:
   - Birth Date: `1990-08-15`
   - Birth Time: `14:30`
   - Birth Place: `Cathedral City, Riverside County, California, United States`
3. Click **"Reveal My Meditations"**
4. Open console (F12)
5. Look for:
   ```
   🔄 Calling Pipedream geocoding webhook...
   ✅ Geocoding successful!
   📍 Latitude: 33.7298
   📍 Longitude: -116.2453
   🕐 Timezone: America/Los_Angeles
   ```

---

## ✅ Success Checklist

- [ ] Pipedream workflow created
- [ ] HTTP trigger set up
- [ ] Node.js step added with code
- [ ] Environment variable `GEOAPIFY_API_KEY` set to `38d1c93862f1407289d31ed41da13df9`
- [ ] Workflow deployed
- [ ] Webhook URL copied
- [ ] `.env` file updated with webhook URL
- [ ] Dev server restarted
- [ ] Quiz page loads
- [ ] Geocoding works (check console)
- [ ] No CORS errors

---

## 🐛 If It Doesn't Work

### "webhook not configured"
→ Make sure `.env` has `VITE_PIPEDREAM_GEOCODING_WEBHOOK_URL` set
→ Restart dev server

### Still getting CORS error
→ Make sure you're using the Pipedream webhook URL, not Geoapify directly
→ Check that `.env` is updated

### "No location found"
→ Try a simpler location like "New York"
→ Check Pipedream logs for details

### Webhook returns error
→ Click "Logs" in Pipedream to see what went wrong
→ Check that `GEOAPIFY_API_KEY` is set in Pipedream

---

## 📚 More Help

- **Full Setup Guide:** `PIPEDREAM_GEOCODING_SETUP.md`
- **CORS Fix Summary:** `CORS_FIX_SUMMARY.md`
- **Code Changes:** `src/utils/geocoding.ts`

---

## 🎉 Done!

Your app now:
- ✅ Geocodes birth places without CORS errors
- ✅ Gets accurate coordinates
- ✅ Extracts timezone information
- ✅ Works perfectly!

---

**Questions? Check the console logs or Pipedream logs!**

