# 📋 Firebase User Fields - Quick Reference

## ✨ NEW Fields Added

| Field | Type | Example | Source |
|-------|------|---------|--------|
| **username** | string | `jose` | Clerk |
| **phone** | string | `+1 (760) 587-8472` | Clerk |

---

## 📊 Complete User Document Structure

### **Identification**
```
id: "user_34TSUQNweLffuDyOqOGFJsen4AU"
clerkUserId: "user_34TSUQNweLffuDyOqOGFJsen4AU"
```

### **Basic Info** ✨ UPDATED
```
email: "joseiscoding@gmail.com"
firstName: "Jose"
lastName: "Juarez"
displayName: "Jose Juarez"
username: "jose"                    ✨ NEW
phone: "+1 (760) 587-8472"         ✨ NEW
photoURL: "https://img.clerk.com/..."
```

### **Authentication**
```
emailVerified: true
```

### **Timestamps**
```
createdAt: "2024-01-15T10:30:00Z"
updatedAt: "2024-01-15T10:30:00Z"
lastLoginAt: "2024-01-15T10:30:00Z"
```

### **Astrological Profile**
```
birthDate: "1990-08-15"
birthTime: "14:30"
birthPlace: "New York, NY"
sunSign: "Leo"
moonSign: "Pisces"
risingSign: "Virgo"
```

### **Spiritual Preferences**
```
spiritualGoals: ["inner peace", "stress relief"]
challenges: ["anxiety", "sleep"]
meditationPreferences: {
  preferredDuration: 10,
  preferredTime: "evening",
  favoriteElements: ["water", "earth"],
  voicePreference: "female"
}
```

### **Progress Tracking**
```
totalMeditationTime: 120
completedMeditations: [
  {
    meditationId: "med_123",
    completedAt: "2024-01-15T10:30:00Z",
    duration: 10
  }
]
favoritemeditations: ["med_123", "med_456"]
currentStreak: 5
longestStreak: 12
```

### **Membership/Subscription**
```
membershipTier: "star-seeker"
membershipStatus: "active"
membershipStartDate: "2024-01-15T10:30:00Z"
membershipEndDate: "2024-02-15T10:30:00Z"
subscriptionStatus: "premium"
subscriptionTier: "basic"
```

### **Privacy & Community**
```
profileVisibility: "private"
allowCommunityInteraction: true
```

### **Onboarding**
```
hasCompletedOnboarding: false
hasCompletedAstroQuiz: false
```

---

## 🔍 How to Access Fields

### **In React Component**
```typescript
import { useAuth } from '../hooks/useClerkAuth';

export function MyComponent() {
  const { userProfile } = useAuth();
  
  return (
    <div>
      <p>Email: {userProfile?.email}</p>
      <p>Username: @{userProfile?.username}</p>
      <p>Phone: {userProfile?.phone}</p>
      <p>Moon Sign: {userProfile?.moonSign}</p>
    </div>
  );
}
```

### **In Firebase Query**
```typescript
import { userService } from '../services/firebaseService';

// Get user by ID
const user = await userService.getById('user_34TSUQNweLffuDyOqOGFJsen4AU');

// Access fields
console.log(user.username);  // "jose"
console.log(user.phone);     // "+1 (760) 587-8472"
console.log(user.email);     // "joseiscoding@gmail.com"
```

### **Query by Field**
```typescript
import { query, where, getDocs, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Find user by username
const q = query(
  collection(db, 'users'),
  where('username', '==', 'jose')
);
const snapshot = await getDocs(q);
const users = snapshot.docs.map(doc => doc.data());
```

---

## 📝 Field Types

| Field | Type | Required | Nullable |
|-------|------|----------|----------|
| id | string | ✅ | ❌ |
| email | string | ✅ | ❌ |
| firstName | string | ❌ | ✅ |
| lastName | string | ❌ | ✅ |
| displayName | string | ❌ | ✅ |
| username | string | ❌ | ✅ |
| phone | string | ❌ | ✅ |
| photoURL | string | ❌ | ✅ |
| clerkUserId | string | ✅ | ❌ |
| emailVerified | boolean | ❌ | ✅ |
| createdAt | Date | ✅ | ❌ |
| updatedAt | Date | ✅ | ❌ |
| lastLoginAt | Date | ❌ | ✅ |
| birthDate | string | ❌ | ✅ |
| birthTime | string | ❌ | ✅ |
| birthPlace | string | ❌ | ✅ |
| sunSign | string | ❌ | ✅ |
| moonSign | string | ❌ | ✅ |
| risingSign | string | ❌ | ✅ |
| spiritualGoals | string[] | ❌ | ✅ |
| challenges | string[] | ❌ | ✅ |
| meditationPreferences | object | ❌ | ✅ |
| totalMeditationTime | number | ❌ | ✅ |
| completedMeditations | array | ❌ | ✅ |
| favoritemeditations | string[] | ❌ | ✅ |
| currentStreak | number | ❌ | ✅ |
| longestStreak | number | ❌ | ✅ |
| membershipTier | string | ❌ | ✅ |
| membershipStatus | string | ❌ | ✅ |
| membershipStartDate | Date | ❌ | ✅ |
| membershipEndDate | Date | ❌ | ✅ |
| subscriptionStatus | string | ❌ | ✅ |
| subscriptionTier | string | ❌ | ✅ |
| profileVisibility | string | ❌ | ✅ |
| allowCommunityInteraction | boolean | ❌ | ✅ |
| hasCompletedOnboarding | boolean | ❌ | ✅ |
| hasCompletedAstroQuiz | boolean | ❌ | ✅ |

---

## 🎯 Common Use Cases

### **Display User Profile**
```typescript
const { userProfile } = useAuth();

<div>
  <h1>{userProfile?.displayName}</h1>
  <p>@{userProfile?.username}</p>
  <p>{userProfile?.email}</p>
  <p>{userProfile?.phone}</p>
</div>
```

### **Mention Users**
```typescript
// Find user by username
const user = await userService.getAll([
  where('username', '==', 'jose')
]);
```

### **Contact Users**
```typescript
// Get all users with phone numbers
const users = await userService.getAll([
  where('phone', '!=', '')
]);

// Send SMS to users
users.forEach(user => {
  sendSMS(user.phone, message);
});
```

### **Personalize Experience**
```typescript
const { userProfile } = useAuth();

// Show meditations for user's moon sign
const meditations = await getMeditationsByMoonSign(
  userProfile?.moonSign
);
```

---

## 🔐 Security Considerations

### **Public Fields** (readable by anyone)
- username (for mentions)
- displayName (for profiles)

### **Private Fields** (only user can read)
- email
- phone
- birthDate
- birthTime
- birthPlace

### **Admin Fields** (only admins can read)
- All fields (admins have full access)

---

## 📊 Example Queries

### **Get User by Email**
```typescript
const user = await userQueries.getByEmail('joseiscoding@gmail.com');
```

### **Get User by Username**
```typescript
const users = await userService.getAll([
  where('username', '==', 'jose')
]);
```

### **Get Users by Moon Sign**
```typescript
const users = await userService.getAll([
  where('moonSign', '==', 'Cancer')
]);
```

### **Get Active Premium Users**
```typescript
const users = await userService.getAll([
  where('subscriptionStatus', '==', 'premium'),
  where('membershipStatus', '==', 'active')
]);
```

### **Get Users with Phone**
```typescript
const users = await userService.getAll([
  where('phone', '!=', '')
]);
```

---

## 🚀 Next Steps

1. **Test the sync** - Have users sign up and check Firebase
2. **Use the data** - Display in profiles, use for queries
3. **Monitor** - Check Admin Dashboard regularly
4. **Extend** - Add more fields as needed

---

## 📚 Related Files

- `FIREBASE_USER_SYNC_GUIDE.md` - Complete sync guide
- `src/types/database.ts` - User interface
- `src/hooks/useClerkAuth.tsx` - Sync logic
- `src/pages/AdminDashboard.tsx` - Admin dashboard

---

## ✅ Checklist

- [ ] User signs up with Clerk
- [ ] Check Firebase Console
- [ ] See username field populated
- [ ] See phone field populated
- [ ] Visit `/admin/users`
- [ ] See new columns in table
- [ ] Query users by username
- [ ] Query users by phone
- [ ] Use data in components

---

**You're all set! Your Firebase database now captures all Clerk user information! 🌙✨**

