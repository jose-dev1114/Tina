# 🚀 Firebase Database - Quick Reference Card

## ⚡ TL;DR - Check Your Database in 30 Seconds

### **Fastest Way: Firebase Console**
```
1. Go to: https://console.firebase.google.com/
2. Select your project
3. Click: Firestore Database (left sidebar)
4. Click: users collection
5. Done! See all your Clerk users
```

---

## 🎯 3 Methods Comparison

| Method | Speed | Ease | Best For |
|--------|-------|------|----------|
| **Firebase Console** | ⚡ Instant | 🟢 Easy | Quick checks |
| **Admin Dashboard** | ⚡ Fast | 🟡 Medium | Regular monitoring |
| **Firebase CLI** | 🐢 Slow | 🔴 Hard | Automation |

---

## 📋 What You'll See

### In Firebase Console (users collection):

```
Document ID: user_2abc123def456
├─ email: "user@example.com"
├─ displayName: "John Doe"
├─ moonSign: "Cancer"
├─ sunSign: "Leo"
├─ risingSign: "Virgo"
├─ birthDate: "1990-08-15"
├─ totalMeditationTime: 120
├─ membershipStatus: "active"
├─ createdAt: "2024-01-15T10:30:00Z"
└─ ... (more fields)
```

---

## 🔗 Your Collections

```
Firestore Database
├─ users (👥 Your Clerk users)
├─ meditations (🧘 Meditation content)
├─ purchases (💳 Purchase history)
├─ userProgress (📊 Meditation tracking)
├─ quizResults (🎯 Quiz answers)
├─ communityPosts (💬 Forum posts)
├─ comments (💭 Post comments)
├─ coachingSessions (👨‍🏫 Coaching bookings)
├─ newsletter (📧 Email subscriptions)
└─ moonPhases (🌙 Moon data)
```

---

## 🛠️ Common Tasks

### View All Users
```
Firebase Console → Firestore Database → users
```

### View Specific User
```
Firebase Console → users → Click user document
```

### Filter Users by Moon Sign
```
Firebase Console → users → Add filter
Field: moonSign | Operator: == | Value: Cancer
```

### Export User Data
```
Firebase Console → users → Select all → Export
```

### Query Users in Code
```typescript
import { query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

const q = query(
  collection(db, 'users'),
  where('moonSign', '==', 'Cancer')
);
const snapshot = await getDocs(q);
const users = snapshot.docs.map(doc => doc.data());
```

---

## 📊 User Data Fields

### Basic Info
- `email` - User email
- `displayName` - Full name
- `firstName` - First name
- `lastName` - Last name
- `photoURL` - Profile picture

### Authentication
- `clerkUserId` - Clerk user ID
- `emailVerified` - Email verified?
- `id` - Firebase document ID

### Astrological Data
- `birthDate` - Birth date (YYYY-MM-DD)
- `birthTime` - Birth time (HH:MM)
- `birthPlace` - Birth location
- `sunSign` - Sun sign (Aries-Pisces)
- `moonSign` - Moon sign (Aries-Pisces)
- `risingSign` - Rising sign (Aries-Pisces)

### Preferences
- `spiritualGoals` - User's goals
- `challenges` - User's challenges
- `meditationPreferences` - Duration, time, voice, etc.

### Progress
- `totalMeditationTime` - Total minutes meditated
- `completedMeditations` - Array of completed meditations
- `currentStreak` - Current meditation streak
- `longestStreak` - Longest streak ever

### Membership
- `membershipTier` - moon-circle, star-seeker, cosmic-guide
- `membershipStatus` - active, inactive, trial
- `subscriptionStatus` - free, premium, lifetime

### Timestamps
- `createdAt` - Account creation date
- `updatedAt` - Last update date
- `lastLoginAt` - Last login date

---

## 🔐 Security Rules

Your data is protected:
- ✅ Users see only their own data
- ✅ Admins see all data
- ✅ Public data (meditations) readable by everyone
- ✅ Private data (purchases) protected

---

## 💡 Pro Tips

1. **Use Firebase Console for quick checks** - No setup needed
2. **Bookmark your project** - Save time
3. **Use filters** - Find specific users quickly
4. **Export data** - For backups or analysis
5. **Monitor usage** - Check costs in Firebase Console

---

## 🚨 Troubleshooting

### "No users showing"
- Check Firestore security rules
- Verify users are being created
- Check browser console for errors

### "Can't access Firebase Console"
- Verify you're logged in
- Check project permissions
- Try incognito mode

### "Firestore quota exceeded"
- Upgrade Firebase plan
- Optimize queries
- Add indexes

---

## 📚 Related Files

- `FIREBASE_DATABASE_GUIDE.md` - Detailed guide
- `DATABASE_STRUCTURE.md` - Full schema
- `AUTHENTICATION_INTEGRATION.md` - Clerk + Firebase
- `AdminDashboard.tsx` - Admin dashboard component

---

## 🎯 Quick Links

- [Firebase Console](https://console.firebase.google.com/)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Clerk Documentation](https://clerk.com/docs)

---

## ✅ Checklist

- [ ] Go to Firebase Console
- [ ] Select your project
- [ ] Click Firestore Database
- [ ] Click users collection
- [ ] See your Clerk users!
- [ ] Click a user to see details
- [ ] Check moon sign, sun sign, etc.
- [ ] Explore other collections

---

## 🌙 You're All Set!

Your Firebase database is ready to use. Your Clerk users are automatically synced to Firebase. Start exploring! ✨

**Next:** Check out `FIREBASE_DATABASE_GUIDE.md` for more details.

