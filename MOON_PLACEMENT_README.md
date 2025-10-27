# 🌙 Moon Placement Integration - Complete Guide

Welcome! This guide will help you integrate moon placement calculation with your breathing circle animation.

## 📦 What You Get

✅ **Birth Date Input Form** - Beautiful form to collect year, month, day, hour  
✅ **Moon Placement Calculation** - Real astrology calculations via Pipedream  
✅ **Breathing Circle Animation** - Synchronized with lunar rhythm  
✅ **Complete Documentation** - Step-by-step guides and code examples  
✅ **Production Ready** - Error handling, validation, responsive design  

## 🚀 Quick Start (Choose Your Path)

### Path 1: Full Experience (Recommended)
```tsx
import BreathingCircleWithMoonData from '../components/BreathingCircleWithMoonData';

export default function HomePage() {
  return <BreathingCircleWithMoonData />;
}
```

### Path 2: Just the Input Form
```tsx
import MoonPlacementInput from '../components/MoonPlacementInput';

export default function MyPage() {
  return (
    <MoonPlacementInput 
      onMoonDataReceived={(data) => {
        console.log('Moon sign:', data.moonSign);
      }} 
    />
  );
}
```

## 📋 Setup Steps

### Step 1: Create Pipedream Workflow (15 min)
1. Go to https://pipedream.com
2. Create new workflow with HTTP trigger
3. Add Node.js step with astrology code
4. Deploy and copy webhook URL

**See:** `PIPEDREAM_SETUP.md` for detailed instructions

### Step 2: Configure Environment (2 min)
```env
VITE_PIPEDREAM_WEBHOOK_URL=https://eom.prod.eoapi.com/v1/webhooks/your_id
```

### Step 3: Use Component (1 min)
Replace your existing component or add new one

### Step 4: Test (2 min)
Enter birth date and verify moon sign appears

**Total Time:** ~20 minutes

## 📁 Files Included

### Components
- `src/components/MoonPlacementInput.tsx` - Input form
- `src/components/BreathingCircleWithMoonData.tsx` - Combined component
- `src/components/MoonPhaseSelector.tsx` - Breathing circle (existing)

### Services
- `src/services/astroApi.ts` - API integration

### Documentation
- `PIPEDREAM_SETUP.md` - Detailed setup guide
- `PIPEDREAM_WORKFLOW_CODE.md` - Ready-to-use code
- `MOON_PLACEMENT_QUICK_START.md` - Quick reference
- `INTEGRATION_SUMMARY.md` - Complete overview
- `SETUP_CHECKLIST.md` - Implementation checklist
- `MOON_PLACEMENT_README.md` - This file

## 🎯 Key Features

### Input Form
- Year, Month, Day, Hour (optional)
- Beautiful glassmorphism design
- Real-time validation
- Error handling

### Moon Calculation
- Moon Sign (Aries-Pisces)
- Moon Degree (0-30°)
- Moon House (1-12)
- Moon Element (Fire/Earth/Air/Water)

### Display
- Cosmic blueprint visualization
- Sun, Moon, Rising signs
- Moon placement details
- Responsive design

### Breathing Circle
- 4-phase breathing cycle
- Smooth animations
- Meditative experience
- Click to pause/resume

## 🔧 API Options

### Astro-API (Recommended)
- ✅ Easy setup
- ✅ Free tier (100 requests/month)
- ✅ Good accuracy
- 📍 https://astro-api.com

### Swiss Ephemeris
- ✅ Most accurate
- ✅ Professional grade
- ❌ Paid
- 📍 https://www.astro-seek.com

### Pymeeus
- ✅ Free
- ✅ Open source
- ❌ Complex setup
- 📍 https://github.com/monadius/pymeeus

## 📊 Data Flow

```
User Input (Birth Date)
    ↓
MoonPlacementInput Component
    ↓
calculateMoonPlacement() API Call
    ↓
Pipedream Webhook (POST)
    ↓
Astrology Calculation
    ↓
Return Moon Data (JSON)
    ↓
Display in BreathingCircleWithMoonData
    ↓
Show Moon Sign + Breathing Circle
```

## 🎨 Customization

### Change Colors
Edit Tailwind classes in components:
```tsx
className="bg-gradient-to-br from-primary-600/30 to-primary-800/20"
```

### Change Layout
Modify grid and flex layouts:
```tsx
<div className="grid md:grid-cols-3 gap-6">
  {/* Your layout */}
</div>
```

### Add More Data
Update `AstroResult` interface and Pipedream workflow:
```tsx
export interface AstroResult {
  sunSign: string;
  moonSign: string;
  venusSign?: string;  // Add new fields
  marsSign?: string;
}
```

## 🧪 Testing

### With Mock Data (Development)
```tsx
// In astroApi.ts
if (import.meta.env.DEV) {
  return {
    sunSign: 'Leo',
    moonSign: 'Cancer',
    moonPlacement: { moonSign: 'Cancer', moonDegree: 15.5 }
  };
}
```

### With Real API
1. Add webhook URL to `.env`
2. Restart dev server
3. Enter birth date
4. Click "Calculate"
5. See moon data appear

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Webhook URL not configured" | Add to `.env` and restart |
| CORS errors | Check Pipedream logs |
| No response | Verify webhook URL is correct |
| Invalid date | Use year 1900-present |

**See:** `SETUP_CHECKLIST.md` for more troubleshooting

## 📚 Documentation Map

```
Start Here
    ↓
MOON_PLACEMENT_README.md (this file)
    ↓
Choose your path:
├─ SETUP_CHECKLIST.md (step-by-step)
├─ PIPEDREAM_SETUP.md (detailed setup)
├─ MOON_PLACEMENT_QUICK_START.md (quick ref)
└─ INTEGRATION_SUMMARY.md (overview)

For code:
└─ PIPEDREAM_WORKFLOW_CODE.md (copy-paste)
```

## 🌙 Moon Sign Meanings

| Sign | Element | Meaning |
|------|---------|---------|
| Aries | Fire | Passionate, courageous |
| Taurus | Earth | Stable, sensual |
| Gemini | Air | Curious, communicative |
| Cancer | Water | Nurturing, intuitive |
| Leo | Fire | Expressive, warm-hearted |
| Virgo | Earth | Analytical, practical |
| Libra | Air | Harmonious, diplomatic |
| Scorpio | Water | Intense, transformative |
| Sagittarius | Fire | Optimistic, adventurous |
| Capricorn | Earth | Responsible, disciplined |
| Aquarius | Air | Innovative, detached |
| Pisces | Water | Compassionate, intuitive |

## ✅ Implementation Checklist

- [ ] Create Pipedream account
- [ ] Create HTTP workflow
- [ ] Add astrology calculation
- [ ] Deploy workflow
- [ ] Copy webhook URL
- [ ] Add to `.env`
- [ ] Restart dev server
- [ ] Test with birth date
- [ ] Integrate into pages
- [ ] Customize styling
- [ ] Deploy to production

## 🎓 Learning Resources

- [Pipedream Docs](https://pipedream.com/docs)
- [Astro-API Docs](https://astro-api.com/docs)
- [Astrology Basics](https://www.astrology.com)
- [Moon Sign Guide](https://www.cafeastrology.com/moonsigns.html)

## 💡 Pro Tips

1. **Start Simple** - Use `MoonPlacementInput` first
2. **Test Locally** - Use mock data for development
3. **Cache Results** - Store calculations to reduce API calls
4. **Handle Errors** - Show helpful messages to users
5. **Monitor Usage** - Track API calls and rate limits
6. **Customize UI** - Match your brand colors and fonts

## 🚀 Next Steps

1. **Read** `SETUP_CHECKLIST.md` for step-by-step guide
2. **Follow** `PIPEDREAM_SETUP.md` to create workflow
3. **Copy** code from `PIPEDREAM_WORKFLOW_CODE.md`
4. **Test** with sample birth date
5. **Integrate** into your pages
6. **Deploy** to production

## 🎉 You're Ready!

You now have everything needed to integrate moon placement calculation with your breathing circle. Start with the checklist and follow the guides.

**Questions?** Check the troubleshooting section or review the documentation.

**Happy coding!** 🌙✨

---

## 📞 Support

- 📖 Read the documentation files
- 🔍 Check browser console for errors
- 📋 Review Pipedream logs
- ✅ Use the setup checklist
- 🧪 Test with sample data

---

**Created with 🌙 for your Lunar Nidra meditation app**

