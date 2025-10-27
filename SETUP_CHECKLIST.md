# Moon Placement Integration - Setup Checklist

## 🎯 Phase 1: Pipedream Setup (15 minutes)

### Create Pipedream Account
- [ ] Go to https://pipedream.com
- [ ] Sign up with email or GitHub
- [ ] Verify email address
- [ ] Log in to dashboard

### Create HTTP Workflow
- [ ] Click "Create Workflow"
- [ ] Select "HTTP" as trigger
- [ ] Copy the webhook URL
- [ ] Save URL somewhere safe (you'll need it)

### Add Astrology Calculation
- [ ] Click "+" to add a step
- [ ] Select "Node.js"
- [ ] Copy code from `PIPEDREAM_WORKFLOW_CODE.md` (Option 1: Astro-API)
- [ ] Paste into the code editor

### Set Up API Key (if using Astro-API)
- [ ] Go to https://astro-api.com
- [ ] Sign up for free account
- [ ] Get your API key
- [ ] In Pipedream: Go to workflow settings
- [ ] Add environment variable: `ASTRO_API_KEY=your_key_here`

### Add Response Step
- [ ] Click "+" to add another step
- [ ] Search for "Return HTTP Response"
- [ ] Set response body to: `{{ steps.nodejs.$return_value }}`
- [ ] Set status code to: `200`

### Deploy Workflow
- [ ] Click "Deploy" button
- [ ] Wait for confirmation
- [ ] Workflow is now live!

---

## 🎯 Phase 2: Local Setup (5 minutes)

### Update Environment File
- [ ] Open `.env` file (or create from `.env.example`)
- [ ] Add: `VITE_PIPEDREAM_WEBHOOK_URL=https://eom.prod.eoapi.com/v1/webhooks/your_id_here`
- [ ] Replace `your_id_here` with your actual webhook ID
- [ ] Save file

### Restart Dev Server
- [ ] Stop dev server (Ctrl+C)
- [ ] Run: `npm run dev`
- [ ] Wait for "ready in XXX ms"
- [ ] Dev server is running on http://localhost:4000

---

## 🎯 Phase 3: Component Integration (10 minutes)

### Option A: Full Experience (Recommended)
- [ ] Open `src/pages/HomePage.tsx`
- [ ] Find the line with `<MoonPhaseSelector />`
- [ ] Replace with: `<BreathingCircleWithMoonData />`
- [ ] Save file
- [ ] Check browser - should see input form

### Option B: Just the Input Form
- [ ] Open your desired page file
- [ ] Add import: `import MoonPlacementInput from '../components/MoonPlacementInput';`
- [ ] Add component: `<MoonPlacementInput onMoonDataReceived={(data) => console.log(data)} />`
- [ ] Save file

### Option C: In AstroQuiz
- [ ] Open `src/pages/AstroQuiz.tsx`
- [ ] Add import: `import MoonPlacementInput from '../components/MoonPlacementInput';`
- [ ] Add component in quiz flow
- [ ] Handle data with: `onMoonDataReceived={(data) => setQuizData(prev => ({ ...prev, moonSign: data.moonSign }))}`

---

## 🎯 Phase 4: Testing (5 minutes)

### Test the Integration
- [ ] Open browser to http://localhost:4000
- [ ] Navigate to page with component
- [ ] Enter birth date:
  - Year: 1990
  - Month: January
  - Day: 15
  - Hour: 12 (optional)
- [ ] Click "Calculate Moon Placement"
- [ ] Wait for response (should be instant)
- [ ] See moon sign appear (e.g., "Cancer")
- [ ] See breathing circle animation

### Verify Data Display
- [ ] Check that moon sign is displayed
- [ ] Check that sun sign is displayed (if available)
- [ ] Check that moon degree is shown (if available)
- [ ] Verify no error messages appear

### Test Error Handling
- [ ] Try invalid date (e.g., year 1800)
- [ ] Should see error message
- [ ] Try without webhook URL in .env
- [ ] Should see helpful error message

---

## 🎯 Phase 5: Customization (Optional)

### Customize Styling
- [ ] Open `src/components/MoonPlacementInput.tsx`
- [ ] Change colors, sizes, fonts as desired
- [ ] Update Tailwind classes
- [ ] Save and see changes in browser

### Customize Display
- [ ] Open `src/components/BreathingCircleWithMoonData.tsx`
- [ ] Modify layout, add/remove fields
- [ ] Change text and descriptions
- [ ] Adjust animations

### Add More Data
- [ ] Update `AstroResult` interface in `src/services/astroApi.ts`
- [ ] Add new fields (e.g., Venus sign, Mars sign)
- [ ] Update Pipedream workflow to return new data
- [ ] Display in components

---

## 🎯 Phase 6: Production Deployment (Optional)

### Before Deploying
- [ ] Test all functionality locally
- [ ] Check for console errors
- [ ] Verify responsive design on mobile
- [ ] Test with multiple birth dates

### Deploy to Production
- [ ] Add webhook URL to production `.env`
- [ ] Build project: `npm run build`
- [ ] Deploy to hosting (Netlify, Vercel, etc.)
- [ ] Test on production URL
- [ ] Monitor for errors

### Post-Deployment
- [ ] Monitor Pipedream logs for errors
- [ ] Check API usage/rate limits
- [ ] Gather user feedback
- [ ] Make improvements as needed

---

## 📋 Troubleshooting Checklist

### If you see "Webhook URL not configured"
- [ ] Check `.env` file exists
- [ ] Check `VITE_PIPEDREAM_WEBHOOK_URL` is set
- [ ] Verify URL format is correct
- [ ] Restart dev server
- [ ] Clear browser cache

### If you see CORS errors
- [ ] Pipedream should handle CORS automatically
- [ ] Check Pipedream workflow logs
- [ ] Verify webhook URL is correct
- [ ] Try different browser

### If you see "Failed to calculate moon placement"
- [ ] Check Pipedream workflow is deployed
- [ ] Check webhook URL is correct
- [ ] Verify API key is set (if using Astro-API)
- [ ] Check Pipedream logs for errors
- [ ] Try test request in Pipedream

### If no data appears
- [ ] Check browser console for errors
- [ ] Check network tab for API response
- [ ] Verify Pipedream workflow is running
- [ ] Try with different birth date
- [ ] Check component is imported correctly

---

## ✅ Final Verification

- [ ] Birth date input form displays
- [ ] Can enter year, month, day
- [ ] "Calculate" button works
- [ ] Moon sign appears after calculation
- [ ] No console errors
- [ ] Breathing circle animates
- [ ] Responsive on mobile
- [ ] All styling looks good

---

## 🎉 Success!

If all checkboxes are checked, you have successfully integrated moon placement calculation with your breathing circle! 

### Next Steps:
1. Customize styling to match your brand
2. Add more astrological data if desired
3. Integrate into other pages
4. Deploy to production
5. Gather user feedback
6. Iterate and improve

---

## 📞 Need Help?

- Check `PIPEDREAM_SETUP.md` for detailed setup
- Check `MOON_PLACEMENT_QUICK_START.md` for quick reference
- Check `PIPEDREAM_WORKFLOW_CODE.md` for code examples
- Check `INTEGRATION_SUMMARY.md` for overview
- Check browser console for error messages
- Check Pipedream logs for API errors

---

## 🌙 Congratulations!

You now have a fully functional moon placement calculator integrated with your breathing circle animation. Your users can discover their moon sign and begin their meditative journey! ✨

Happy coding! 🚀

