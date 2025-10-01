# 🔥 Firebase Setup Guide for Meditation App

This guide will help you set up Firebase for your meditation app with Clerk authentication integration.

## 📋 Prerequisites

- ✅ Clerk authentication already set up
- ✅ Node.js and npm installed
- ✅ Firebase CLI installed (`npm install -g firebase-tools`)

## 🚀 Step-by-Step Setup

### 1. Create Firebase Project

1. **Go to [Firebase Console](https://console.firebase.google.com)**
2. **Click "Create a project"** or "Add project"
3. **Enter project name**: `meditation-app` (or your preferred name)
4. **Enable Google Analytics**: Optional but recommended
5. **Click "Create project"**

### 2. Get Firebase Configuration

1. **In your Firebase project dashboard**, click the ⚙️ **gear icon** → **"Project settings"**
2. **Scroll down** to "Your apps" section
3. **Click the web app icon** `</>`
4. **Register your app** with nickname: "Meditation Web App"
5. **Copy the firebaseConfig object** - it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-ABCDEF1234"
};
```

### 3. Update Your .env File

### 4. Enable Firestore Database

1. **In Firebase Console**, go to **"Firestore Database"**
2. **Click "Create database"**
3. **Choose "Start in test mode"** (we'll update rules later)
4. **Select your preferred location** (choose closest to your users)
5. **Click "Done"**

### 5. Enable Firebase Storage

1. **In Firebase Console**, go to **"Storage"**
2. **Click "Get started"**
3. **Choose "Start in test mode"**
4. **Select same location** as your Firestore
5. **Click "Done"**

### 6. Deploy Security Rules

**Run these commands in your project directory:**

```bash
# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select:
# - Firestore: Configure security rules and indexes files
# - Storage: Configure security rules file
# - Use existing project: Select your meditation app project

# Deploy security rules
firebase deploy --only firestore:rules,storage
```

### 7. Test Firebase Integration

1. **Restart your development server**: `npm run dev`
2. **Sign in to your app** using Clerk authentication
3. **Go to `/admin`** route in your browser
4. **Scroll down** to "Firebase Integration Test" section
5. **Click "Run Firebase Tests"** to test all functionality

## 🧪 Testing Your Setup

### Expected Test Results:
- ✅ Basic profile update successful
- ✅ Astrological profile update successful  
- ✅ Meditation preferences update successful
- ✅ Spiritual goals update successful
- ✅ Onboarding completion successful
- ✅ Astro quiz completion successful
- ✅ Meditation progress tracking successful
- ✅ Favorite meditation toggle successful

### If Tests Fail:

1. **Check Console Errors**: Open browser dev tools → Console tab
2. **Verify .env Values**: Make sure all Firebase config values are correct
3. **Check Firebase Rules**: Ensure Firestore is in test mode
4. **Restart Dev Server**: Stop and restart `npm run dev`

## 🔐 Security Rules (Production)

**Once testing is complete**, update your Firestore rules for production:

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Meditations are public read, admin write
    match /meditations/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.email in ['admin@yourapp.com'];
    }
    
    // Other collections...
  }
}
```

## 📊 Database Collections Created

Your Firebase will have these collections:

- **`users`** - User profiles with Clerk integration
- **`meditations`** - Meditation content and metadata
- **`purchases`** - User purchase history
- **`userProgress`** - Meditation progress tracking
- **`quizResults`** - Astrology quiz results
- **`communityPosts`** - Community forum posts
- **`comments`** - Post comments
- **`coachingSessions`** - Coaching session data
- **`newsletter`** - Newsletter subscriptions
- **`moonPhases`** - Moon phase data

## 🎯 Key Features Enabled

### ✅ **User Management**
- Automatic user profile creation when signing up with Clerk
- Sync between Clerk and Firebase user data
- Comprehensive user preferences and progress tracking

### ✅ **Astrological Integration**
- Birth chart data storage
- Sun/Moon/Rising sign tracking
- Personalized meditation recommendations

### ✅ **Progress Tracking**
- Meditation completion tracking
- Total meditation time
- Favorite meditations
- Spiritual goals and challenges

### ✅ **Onboarding Flow**
- Track onboarding completion
- Astrology quiz completion
- Personalized setup process

## 🚨 Troubleshooting

### Common Issues:

1. **"Firebase config not found" Error**
   - Check that all `VITE_FIREBASE_*` variables are set in `.env`
   - Restart development server after updating `.env`

2. **"Permission denied" Errors**
   - Ensure Firestore is in "test mode"
   - Check that user is signed in with Clerk

3. **"User profile not syncing"**
   - Check browser console for errors
   - Verify Clerk user ID matches Firebase document ID

4. **Tests failing**
   - Sign in first before running tests
   - Check Firebase project settings
   - Verify internet connection

## 🎉 Success!

Once all tests pass, your meditation app has:

- ✅ **Seamless Clerk + Firebase integration**
- ✅ **Automatic user profile management**
- ✅ **Comprehensive progress tracking**
- ✅ **Astrological data storage**
- ✅ **Production-ready database structure**

Your users can now sign up, complete their profiles, track meditation progress, and enjoy a fully personalized experience! 🌙✨

## 📞 Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

Happy coding! 🚀
