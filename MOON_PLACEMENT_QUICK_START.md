# Moon Placement Integration - Quick Start Guide

## 🎯 What You Now Have

1. **`src/services/astroApi.ts`** - API service to call Pipedream
2. **`src/components/MoonPlacementInput.tsx`** - Input form for birth data
3. **`src/components/BreathingCircleWithMoonData.tsx`** - Combined component with breathing circle
4. **`PIPEDREAM_SETUP.md`** - Detailed Pipedream setup instructions

## ⚡ Quick Setup (5 minutes)

### 1. Create Pipedream Workflow
- Go to https://pipedream.com
- Create new workflow with HTTP trigger
- Copy the webhook URL

### 2. Add to .env
```env
VITE_PIPEDREAM_WEBHOOK_URL=https://eom.prod.eoapi.com/v1/webhooks/your_id_here
```

### 3. Use in Your App

**Option A: Simple Input Form**
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

**Option B: Full Experience (Recommended)**
```tsx
import BreathingCircleWithMoonData from '../components/BreathingCircleWithMoonData';

export default function HeroSection() {
  return <BreathingCircleWithMoonData />;
}
```

## 📊 Data Flow

```
User Input (Birth Date)
    ↓
MoonPlacementInput Component
    ↓
calculateMoonPlacement() function
    ↓
Pipedream Webhook
    ↓
Astrology Calculation
    ↓
Return Moon Data
    ↓
Display in Component
```

## 🔑 Key Functions

### `calculateMoonPlacement(birthData)`
Calls Pipedream webhook with birth data
```tsx
const result = await calculateMoonPlacement({
  year: 1990,
  month: 1,
  day: 15,
  hour: 12,
  minute: 0
});
// Returns: { sunSign, moonSign, risingSign, moonPlacement }
```

### `getMoonSignDescription(moonSign)`
Returns description of moon sign
```tsx
getMoonSignDescription('Cancer')
// Returns: "Nurturing, intuitive, and deeply emotional"
```

### `getMoonElement(moonSign)`
Returns element (Fire, Earth, Air, Water)
```tsx
getMoonElement('Aries')
// Returns: "Fire"
```

## 🎨 Customization

### Change Input Fields
Edit `MoonPlacementInput.tsx` to add/remove fields:
```tsx
// Add latitude/longitude for more accurate calculations
<input
  type="number"
  placeholder="Latitude"
  value={birthData.latitude}
  onChange={(e) => handleInputChange('latitude', e.target.value)}
/>
```

### Customize Display
Edit `BreathingCircleWithMoonData.tsx` to change layout:
```tsx
// Change grid layout
<div className="grid md:grid-cols-2 gap-8">
  {/* Your custom layout */}
</div>
```

### Add More Astrological Data
Update `AstroResult` interface in `astroApi.ts`:
```tsx
export interface AstroResult {
  sunSign: string;
  moonSign: string;
  risingSign?: string;
  venusSign?: string;  // Add new fields
  marsSign?: string;
  moonPlacement: MoonPlacementData;
}
```

## 🧪 Testing Without Pipedream

For development, you can mock the API response:

```tsx
// In astroApi.ts
export async function calculateMoonPlacement(birthData: BirthData): Promise<AstroResult> {
  // Mock response for testing
  if (import.meta.env.DEV) {
    return {
      sunSign: 'Leo',
      moonSign: 'Cancer',
      risingSign: 'Libra',
      moonPlacement: {
        moonSign: 'Cancer',
        moonDegree: 15.5,
        moonHouse: 5
      }
    };
  }
  
  // Real API call
  // ... rest of code
}
```

## 🚀 Integration Points

### In HomePage.tsx
```tsx
import BreathingCircleWithMoonData from '../components/BreathingCircleWithMoonData';

// Replace the existing MoonPhaseSelector with:
<BreathingCircleWithMoonData />
```

### In AstroQuiz.tsx
```tsx
import MoonPlacementInput from '../components/MoonPlacementInput';

// Add to quiz flow:
<MoonPlacementInput 
  onMoonDataReceived={(data) => {
    setQuizData(prev => ({
      ...prev,
      moonSign: data.moonSign,
      sunSign: data.sunSign
    }));
  }}
/>
```

## 📱 Component Props

### MoonPlacementInput
```tsx
interface MoonPlacementInputProps {
  onMoonDataReceived?: (data: AstroResult) => void;
}
```

### BreathingCircleWithMoonData
No props needed - fully self-contained

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Webhook URL not configured" | Add `VITE_PIPEDREAM_WEBHOOK_URL` to `.env` and restart dev server |
| CORS errors | Pipedream handles CORS automatically, check webhook logs |
| No response from API | Verify Pipedream workflow is deployed and webhook URL is correct |
| Invalid date error | Ensure year is between 1900 and current year |

## 📚 Next Steps

1. ✅ Set up Pipedream workflow (see `PIPEDREAM_SETUP.md`)
2. ✅ Add webhook URL to `.env`
3. ✅ Test with `MoonPlacementInput` component
4. ✅ Integrate into your pages
5. ✅ Customize styling and layout
6. ✅ Deploy to production

## 🌙 Example Usage

```tsx
import { useState } from 'react';
import BreathingCircleWithMoonData from '../components/BreathingCircleWithMoonData';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Your existing hero content */}
      
      {/* Add the moon placement + breathing circle */}
      <section className="py-20">
        <BreathingCircleWithMoonData />
      </section>
      
      {/* Rest of your page */}
    </div>
  );
}
```

That's it! You now have a fully functional moon placement calculator integrated with your breathing circle animation. 🌙✨

