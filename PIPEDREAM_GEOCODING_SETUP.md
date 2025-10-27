# 🌍 Pipedream Geocoding Setup Guide

## Problem: CORS Error

When calling Geoapify API directly from the browser, you get:
```
CORS policy: The 'Access-Control-Allow-Origin' header has a value 
'https://ourhealingpractices.com' that is not equal to the supplied origin
```

**Solution:** Use Pipedream as a backend proxy to bypass CORS!

---

## ✅ Solution: Pipedream Webhook

Pipedream will:
1. ✅ Receive geocoding requests from your app
2. ✅ Call Geoapify API from the backend (no CORS issues)
3. ✅ Return coordinates and timezone to your app

---

## 🚀 Setup Instructions (5 minutes)

### Step 1: Create Pipedream Workflow

1. Go to https://pipedream.com
2. Click **"Create Workflow"**
3. Choose **"HTTP Trigger"** (default)
4. Click **"Create"**

### Step 2: Add Node.js Step

1. Click **"+"** to add a step
2. Search for **"Node.js"**
3. Click **"Run Node.js Code"**
4. Replace the code with the code below:

```javascript
export default defineComponent({
  async run({ steps, $ }) {
    const { birthPlace } = steps.trigger.event.body;
    
    if (!birthPlace) {
      return {
        error: "birthPlace is required"
      };
    }
    
    try {
      console.log('🌍 Geocoding:', birthPlace);
      
      // Get API key from environment
      const apiKey = process.env.GEOAPIFY_API_KEY;
      
      if (!apiKey) {
        return {
          error: "GEOAPIFY_API_KEY not configured in Pipedream"
        };
      }
      
      // Call Geoapify API
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(birthPlace)}&apiKey=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`Geoapify error: ${response.statusText}`);
      }
      
      const data = await response.json();
      const feature = data.features?.[0];
      
      if (!feature) {
        return {
          error: `No location found for: ${birthPlace}`
        };
      }
      
      const props = feature.properties || {};
      const lat = props.lat ?? feature.geometry?.coordinates?.[1];
      const lon = props.lon ?? feature.geometry?.coordinates?.[0];
      
      // Extract timezone
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
      
      return {
        lat,
        lon,
        timezone,
        formattedAddress
      };
    } catch (error) {
      console.error('❌ Error:', error.message);
      return {
        error: error.message
      };
    }
  }
});
```

### Step 3: Add Environment Variable

1. Click **"Settings"** (gear icon)
2. Click **"Environment Variables"**
3. Click **"Add"**
4. **Name:** `GEOAPIFY_API_KEY`
5. **Value:** `38d1c93862f1407289d31ed41da13df9` (your API key)
6. Click **"Save"**

### Step 4: Deploy Workflow

1. Click **"Deploy"** button (top right)
2. Wait for "Workflow deployed" message

### Step 5: Copy Webhook URL

1. Click the **HTTP Trigger** step
2. Copy the **Webhook URL** (looks like: `https://eom.prod.eoapi.com/v1/webhooks/xxxxx`)

### Step 6: Add to .env

1. Open `.env` file in your project
2. Find: `VITE_PIPEDREAM_GEOCODING_WEBHOOK_URL=your_pipedream_geocoding_webhook_url_here`
3. Replace with your webhook URL:
   ```
   VITE_PIPEDREAM_GEOCODING_WEBHOOK_URL=https://eom.prod.eoapi.com/v1/webhooks/xxxxx
   ```
4. Save file

### Step 7: Restart Dev Server

```bash
npm run dev
```

---

## 🧪 Test It

### Test in Browser

1. Go to `http://localhost:4000/quiz`
2. Fill form:
   - Birth Date: `1990-08-15`
   - Birth Time: `14:30`
   - Birth Place: `Cathedral City, Riverside County, California, United States`
3. Click **"Reveal My Meditations"**
4. Open console (F12)
5. Check for logs:
   ```
   🔄 Calling Pipedream geocoding webhook...
   ✅ Geocoding successful!
   📍 Latitude: 33.7298
   📍 Longitude: -116.2453
   🕐 Timezone: America/Los_Angeles
   ```

### Test Webhook Directly

Use curl or Postman:

```bash
curl -X POST https://eom.prod.eoapi.com/v1/webhooks/xxxxx \
  -H "Content-Type: application/json" \
  -d '{"birthPlace": "New York"}'
```

Expected response:
```json
{
  "lat": 40.7128,
  "lon": -74.0060,
  "timezone": "America/New_York",
  "formattedAddress": "New York, NY, USA"
}
```

---

## ✅ Verification Checklist

- [ ] Pipedream account created
- [ ] Workflow created with HTTP trigger
- [ ] Node.js step added with geocoding code
- [ ] Environment variable `GEOAPIFY_API_KEY` set
- [ ] Workflow deployed
- [ ] Webhook URL copied
- [ ] `.env` file updated with webhook URL
- [ ] Dev server restarted
- [ ] Quiz page loads
- [ ] Geocoding works (check console logs)
- [ ] No CORS errors

---

## 🐛 Troubleshooting

### "Pipedream geocoding webhook not configured"
**Solution:** Add `VITE_PIPEDREAM_GEOCODING_WEBHOOK_URL` to `.env` and restart dev server

### "No location found for: [location]"
**Solution:** Try a different location or check Geoapify API limits

### "GEOAPIFY_API_KEY not configured in Pipedream"
**Solution:** Add environment variable in Pipedream settings

### Webhook returns error
**Solution:** Check Pipedream logs for details

### Still getting CORS error
**Solution:** Make sure you're using the Pipedream webhook URL, not calling Geoapify directly

---

## 📊 How It Works

```
Browser App
    ↓
POST to Pipedream Webhook
    ↓
Pipedream Backend
    ↓
Call Geoapify API (no CORS issues)
    ↓
Return coordinates + timezone
    ↓
Browser App receives data
```

---

## 🔗 Useful Links

- **Pipedream:** https://pipedream.com
- **Geoapify:** https://www.geoapify.com
- **Geoapify Docs:** https://apidocs.geoapify.com/

---

## 💡 Tips

1. **Test webhook URL** - Use curl or Postman to test before using in app
2. **Check Pipedream logs** - Click "Logs" tab to see execution details
3. **Monitor API usage** - Check Geoapify dashboard for rate limits
4. **Use mock data** - If webhook not configured, app falls back to mock data

---

## 🎉 Success!

Once set up, your app will:
- ✅ Geocode any birth place
- ✅ Get accurate coordinates
- ✅ Extract timezone information
- ✅ No CORS errors!

---

**Questions? Check the console logs or Pipedream logs for details!**

