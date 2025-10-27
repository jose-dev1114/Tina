# 📋 Pipedream CORS Configuration - Quick Reference

## The Key: Use `$.respond()` with CORS Headers

### ❌ Wrong (Causes CORS error)
```javascript
return {
  success: true,
  lat: 40.7128,
  lon: -74.0060
};
```

### ✅ Correct (Works!)
```javascript
return $.respond({
  status: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
    'Content-Type': 'application/json'
  },
  body: {
    success: true,
    lat: 40.7128,
    lon: -74.0060,
    timezone: "America/New_York",
    birthChart: { ... }
  }
});
```

---

## 🚀 5-Minute Setup

### 1. Copy the Code
Open: **`PIPEDREAM_CORS_SETUP_GUIDE.md`**
Copy the entire JavaScript code block.

### 2. Update Pipedream
1. Go to https://pipedream.com
2. Open your workflow
3. Click **Node.js step**
4. Delete all code
5. Paste the new code
6. Click **"Save"**

### 3. Set Environment Variables
1. Click **"Settings"** (gear icon)
2. Click **"Environment Variables"**
3. Add:
   ```
   GEOAPIFY_API_KEY=38d1c93862f1407289d31ed41da13df9
   ASTRO_API_KEY=882309db5811a1d8dd18f90ac8b76e4853cc52c0
   ```
4. Click **"Save"**

### 4. Deploy
1. Click **"Deploy"** button
2. Wait for "Workflow deployed"

### 5. Restart Dev Server
```bash
npm run dev
```

---

## 🔑 CORS Headers Explained

| Header | Purpose | Value |
|--------|---------|-------|
| `Access-Control-Allow-Origin` | Which origins can access | `*` (all) |
| `Access-Control-Allow-Methods` | Which HTTP methods allowed | `GET, POST, OPTIONS` |
| `Access-Control-Allow-Headers` | Which headers allowed in request | `Content-Type, Authorization, User-Agent` |
| `Content-Type` | Response format | `application/json` |

---

## 📝 $.respond() Syntax

```javascript
return $.respond({
  status: 200,                    // HTTP status code
  headers: {                      // Response headers
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
  body: {                         // Response body
    success: true,
    data: { ... }
  }
});
```

---

## 🧪 Test Commands

### Browser Test
1. Go to `http://localhost:4000/quiz`
2. Fill form and submit
3. Open console (F12)
4. Should see logs with NO CORS errors

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

- [ ] Code pasted into Pipedream
- [ ] Environment variables set
- [ ] Workflow deployed
- [ ] Dev server restarted
- [ ] Browser test works
- [ ] No CORS errors
- [ ] Birth chart data received

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Still getting CORS error | Make sure you clicked **"Deploy"** (not just "Save") |
| 400 Bad Request | Check that `address`, `date`, `time` are being sent |
| Circular reference error | Code already handles this - only extracts primitive values |
| No response | Check Pipedream logs for errors |

---

## 📚 Full Documentation

For detailed setup instructions, see: **`PIPEDREAM_CORS_SETUP_GUIDE.md`**

---

**Ready? Follow the 5-minute setup above! 🚀**

