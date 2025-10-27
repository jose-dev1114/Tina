# 🔍 Firebase Database - How to Check User Info

## Quick Answer: 3 Ways to View Your Firebase Database

### **Method 1: Firebase Console (Easiest) ⭐**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **"Firestore Database"** in left sidebar
4. Click the **`users`** collection
5. See all your Clerk users with their data!

**What you'll see:**
- User email
- Display name
- Astrological data (moon sign, sun sign, rising sign)
- Birth date/time/place
- Meditation progress
- Membership status
- And more...

---

### **Method 2: Admin Dashboard (In Your App)**

I created an admin dashboard page for you!

**To use it:**

1. Add route to your app (in `src/App.tsx` or router):
```tsx
import AdminDashboard from './pages/AdminDashboard';

// Add to your routes:
<Route path="/admin/users" element={<AdminDashboard />} />
```

2. Visit: `http://localhost:4000/admin/users`

3. See:
   - Table of all users
   - User statistics
   - Detailed user information
   - Expandable user details

**Features:**
- ✅ View all users in a table
- ✅ See user statistics
- ✅ Expand individual users for full details
- ✅ Filter by membership status
- ✅ See astrological data

---

### **Method 3: Firebase CLI (Command Line)**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# List all users in 'users' collection
firebase firestore:delete users --recursive

# Or use the emulator
firebase emulators:start
```

---

## 📊 Database Collections

Your Firebase has these collections:

| Collection | Purpose | Contains |
|-----------|---------|----------|
| **users** | User profiles | Email, name, astro data, preferences |
| **meditations** | Meditation content | Audio, duration, description |
| **purchases** | Purchase history | Order info, payment status |
| **userProgress** | Meditation tracking | Completed meditations, time |
| **quizResults** | Astrology quiz | Quiz answers, results |
| **communityPosts** | Forum posts | Posts, likes, comments |
| **comments** | Post comments | Comment text, author |
| **coachingSessions** | Coaching bookings | Session details, notes |
| **newsletter** | Email subscriptions | Email, subscription status |
| **moonPhases** | Moon data | Phase info, recommendations |

---

## 👥 User Document Structure

Each user document in the `users` collection contains:

```typescript
{
  id: "user_2abc123def456",           // Clerk user ID
  
  // Basic Info
  email: "user@example.com",
  displayName: "John Doe",
  firstName: "John",
  lastName: "Doe",
  photoURL: "https://...",
  
  // Authentication
  clerkUserId: "user_2abc123def456",
  emailVerified: true,
  
  // Astrological Profile
  birthDate: "1990-08-15",
  birthTime: "14:30",
  birthPlace: "New York, NY",
  sunSign: "Leo",
  moonSign: "Pisces",
  risingSign: "Virgo",
  
  // Preferences
  spiritualGoals: ["inner peace", "stress relief"],
  challenges: ["anxiety", "sleep"],
  meditationPreferences: {
    preferredDuration: 10,
    preferredTime: "morning",
    favoriteElements: ["water", "earth"],
    voicePreference: "female"
  },
  
  // Progress
  totalMeditationTime: 120,
  completedMeditations: [...],
  currentStreak: 5,
  longestStreak: 12,
  
  // Membership
  membershipTier: "star-seeker",
  membershipStatus: "active",
  subscriptionStatus: "premium",
  
  // Timestamps
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z",
  lastLoginAt: "2024-01-15T10:30:00Z"
}
```

---

## 🔐 Security & Access

**Important:** Your Firestore security rules ensure:
- ✅ Users can only see their own data
- ✅ Admins can see all data
- ✅ Public data (meditations) is readable by everyone
- ✅ Private data (purchases, progress) is protected

**To access admin features:**
- You need to be authenticated as an admin
- Or use Firebase Admin SDK with service account

---

## 🛠️ Common Tasks

### View All Users
**Firebase Console:**
1. Firestore Database → users collection
2. See all documents

**Admin Dashboard:**
1. Visit `/admin/users`
2. See table of all users

### View Specific User
**Firebase Console:**
1. Click on user document
2. See all fields

**Admin Dashboard:**
1. Click "Details" on user row
2. Expand to see full info

### Query Users by Criteria
**Firebase Console:**
1. Click "Add filter"
2. Select field (e.g., `moonSign`)
3. Select operator (e.g., `==`)
4. Enter value (e.g., `Cancer`)

**Code Example:**
```typescript
import { query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

const q = query(
  collection(db, 'users'),
  where('moonSign', '==', 'Cancer')
);
const snapshot = await getDocs(q);
```

### Export User Data
**Firebase Console:**
1. Select users
2. Click "Export"
3. Choose format (JSON, CSV)
4. Download

---

## 🔗 Clerk to Firebase Sync

Your users from Clerk are automatically synced to Firebase:

**When a user signs up with Clerk:**
1. Clerk creates user account
2. Your app creates Firebase user document
3. Document ID = Clerk user ID
4. User data synced automatically

**User ID mapping:**
- Clerk ID: `user_2abc123def456`
- Firebase ID: `user_2abc123def456` (same!)

---

## 📈 Monitoring & Analytics

**In Firebase Console:**
1. Go to "Firestore Database"
2. Click "Usage" tab
3. See:
   - Read/write operations
   - Storage used
   - Bandwidth
   - Costs

---

## 🚀 Next Steps

1. **View your users:**
   - Option A: Firebase Console (easiest)
   - Option B: Admin Dashboard (`/admin/users`)
   - Option C: Firebase CLI

2. **Check user data:**
   - Email, name, profile
   - Astrological data
   - Meditation progress
   - Membership status

3. **Query specific users:**
   - By moon sign
   - By membership status
   - By join date
   - By meditation time

4. **Export data:**
   - For analysis
   - For backups
   - For reports

---

## 💡 Pro Tips

1. **Use Firebase Console for quick checks** - No coding needed
2. **Use Admin Dashboard for regular monitoring** - See all users at once
3. **Use CLI for automation** - Batch operations
4. **Set up indexes** - For faster queries on large datasets
5. **Monitor costs** - Firestore charges per read/write

---

## 🐛 Troubleshooting

### "No users showing in Firebase"
- Check Firestore security rules
- Verify users are being created
- Check browser console for errors

### "Can't access admin dashboard"
- Add route to your app
- Restart dev server
- Check authentication

### "Firestore quota exceeded"
- Upgrade Firebase plan
- Optimize queries
- Add indexes

---

## 📚 Related Documentation

- `DATABASE_STRUCTURE.md` - Full database schema
- `AUTHENTICATION_INTEGRATION.md` - Clerk + Firebase setup
- `FIREBASE_SETUP_GUIDE.md` - Initial Firebase setup
- `firestore.rules` - Security rules

---

## 🎯 Summary

**To check your Firebase database:**

1. **Easiest:** Go to [Firebase Console](https://console.firebase.google.com/) → Firestore → users
2. **In-app:** Visit `/admin/users` (after adding route)
3. **Command line:** Use Firebase CLI

**Your Clerk users are automatically synced to Firebase!** ✨

---

**Happy exploring! 🌙**

