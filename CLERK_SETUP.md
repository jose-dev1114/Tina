# Clerk Authentication Setup Guide

This guide will help you set up Clerk authentication for your meditation app with Google sign-in support.

## 🚀 Quick Setup

### 1. Create a Clerk Account
1. Go to [clerk.com](https://clerk.com) and sign up for a free account
2. Create a new application
3. Choose your preferred sign-in methods (Email, Google, etc.)

### 2. Configure Environment Variables
1. Copy your Clerk Publishable Key from the Clerk Dashboard
2. Update your `.env` file:

```bash
# Replace with your actual Clerk publishable key
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

### 3. Configure Google OAuth (Optional)
1. In your Clerk Dashboard, go to "User & Authentication" → "Social Connections"
2. Enable Google OAuth
3. Add your domain to the authorized domains list

## 🎯 Features Included

### ✅ **Authentication Components**
- **SignInButton** - Customizable sign-in button with modal/redirect modes
- **SignUpButton** - Customizable sign-up button with modal/redirect modes  
- **UserButton** - User profile dropdown with account management
- **ProtectedRoute** - Route protection with beautiful fallback UI

### ✅ **User Management**
- **Automatic user sync** between Clerk and Firebase
- **Profile management** with astrological data
- **Seamless authentication flow**
- **Google sign-in support**

### ✅ **Integration Features**
- **Firebase sync** - User profiles automatically created in Firestore
- **Custom user IDs** - Uses Clerk user IDs as Firebase document IDs
- **Profile updates** - Sync between Clerk and Firebase user data
- **Protected routes** - Secure access to user-specific content

## 🛠️ Usage Examples

### Basic Authentication
```tsx
import { useAuth } from '@clerk/clerk-react';
import SignInButton from './components/auth/SignInButton';
import UserButton from './components/auth/UserButton';

function MyComponent() {
  const { isSignedIn } = useAuth();
  
  return (
    <div>
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton />
      )}
    </div>
  );
}
```

### Protected Routes
```tsx
import ProtectedRoute from './components/auth/ProtectedRoute';

function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content requires authentication</div>
    </ProtectedRoute>
  );
}
```

### User Profile Access
```tsx
import { useAuth } from '../hooks/useClerkAuth';

function ProfileComponent() {
  const { clerkUser, userProfile, updateUserProfile } = useAuth();
  
  const handleUpdate = async () => {
    await updateUserProfile({
      sunSign: 'Leo',
      moonSign: 'Pisces'
    });
  };
  
  return (
    <div>
      <h1>Welcome, {clerkUser?.firstName}!</h1>
      <p>Sun Sign: {userProfile?.sunSign}</p>
    </div>
  );
}
```

## 🎨 Customization

### Styling Authentication Components
All auth components accept custom className props:

```tsx
<SignInButton 
  className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700"
  mode="modal"
/>

<SignUpButton 
  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full"
  mode="redirect"
/>
```

### Custom Protected Route Fallback
```tsx
<ProtectedRoute 
  fallback={
    <div className="custom-auth-prompt">
      <h2>Please sign in to continue</h2>
      <SignInButton />
    </div>
  }
>
  <ProtectedContent />
</ProtectedRoute>
```

## 🔧 Advanced Configuration

### Clerk Appearance Customization
You can customize Clerk's UI components in your `ClerkProvider`:

```tsx
<ClerkProvider 
  publishableKey={PUBLISHABLE_KEY}
  appearance={{
    elements: {
      formButtonPrimary: 'bg-purple-600 hover:bg-purple-700',
      card: 'shadow-xl border-0',
      headerTitle: 'text-purple-800',
      socialButtonsBlockButton: 'border-purple-200 hover:bg-purple-50'
    }
  }}
>
  <App />
</ClerkProvider>
```

### Custom Sign-in/Sign-up Pages
Create custom pages at `/sign-in` and `/sign-up`:

```tsx
import { SignIn, SignUp } from '@clerk/clerk-react';

// Sign-in page
function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn 
        routing="path" 
        path="/sign-in" 
        signUpUrl="/sign-up"
      />
    </div>
  );
}

// Sign-up page  
function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp 
        routing="path" 
        path="/sign-up" 
        signInUrl="/sign-in"
      />
    </div>
  );
}
```

## 🔐 Security Features

- **Secure by default** - Clerk handles all security best practices
- **Session management** - Automatic token refresh and session handling
- **Multi-factor authentication** - Optional MFA support
- **Social login** - Secure Google OAuth integration
- **Email verification** - Built-in email verification flow
- **Password requirements** - Configurable password policies

## 📱 Mobile Support

Clerk components are fully responsive and work seamlessly on mobile devices. The authentication modals are optimized for mobile screens.

## 🚨 Troubleshooting

### Common Issues

1. **"Missing Publishable Key" Error**
   - Make sure `VITE_CLERK_PUBLISHABLE_KEY` is set in your `.env` file
   - Restart your development server after adding the key

2. **Google OAuth Not Working**
   - Verify Google OAuth is enabled in Clerk Dashboard
   - Check that your domain is added to authorized domains
   - Ensure you're using HTTPS in production

3. **User Profile Not Syncing**
   - Check Firebase configuration
   - Verify Firestore rules allow user document creation
   - Check browser console for Firebase errors

### Getting Help

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Discord Community](https://discord.com/invite/b5rXHjAg7A)
- [Firebase Documentation](https://firebase.google.com/docs)

## 🎉 You're All Set!

Your meditation app now has a professional authentication system with:
- ✅ Smooth user experience
- ✅ Google sign-in support  
- ✅ Automatic profile management
- ✅ Secure session handling
- ✅ Beautiful UI components
- ✅ Mobile-responsive design

Users can now sign up, sign in, and manage their profiles seamlessly while you focus on building amazing meditation experiences! 🧘‍♀️✨
