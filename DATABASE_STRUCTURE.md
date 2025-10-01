# Firebase Database Structure for Lunar Nidra Meditation App

## Overview
This document outlines the complete Firebase Firestore database structure for the meditation app, including collections, document schemas, security rules, and usage patterns.

## Collections

### 1. Users (`users`)
Stores user profile information and preferences.

```typescript
interface User {
  id: string;                    // Document ID (matches Firebase Auth UID)
  email: string;                 // User's email address
  displayName?: string;          // User's display name
  photoURL?: string;             // Profile picture URL
  birthDate?: string;            // Birth date for astrology
  birthTime?: string;            // Birth time for astrology
  birthPlace?: string;           // Birth place for astrology
  sunSign?: string;              // Astrological sun sign
  moonSign?: string;             // Astrological moon sign
  risingSign?: string;           // Astrological rising sign
  spiritualGoals?: string[];     // User's spiritual goals
  challenges?: string[];         // User's challenges
  membershipTier?: string;       // 'moon-circle' | 'star-seeker' | 'cosmic-guide'
  membershipStatus?: string;     // 'active' | 'inactive' | 'trial'
  membershipStartDate?: Date;    // Membership start date
  membershipEndDate?: Date;      // Membership end date
  createdAt: Date;               // Account creation date
  updatedAt: Date;               // Last profile update
  lastLoginAt?: Date;            // Last login timestamp
}
```

### 2. Meditations (`meditations`)
Stores meditation content and metadata.

```typescript
interface Meditation {
  id: string;                    // Document ID
  title: string;                 // Meditation title
  description: string;           // Detailed description
  sunSign: string;               // Target sun sign
  moonSign: string;              // Target moon sign
  duration: number;              // Duration in minutes
  audioUrl?: string;             // Firebase Storage URL for audio
  thumbnailUrl?: string;         // Firebase Storage URL for thumbnail
  price: number;                 // Price in cents
  currency: string;              // Currency code (USD, EUR, etc.)
  element: string;               // 'fire' | 'earth' | 'air' | 'water'
  intention: string;             // Meditation intention
  tags: string[];                // Searchable tags
  featured: boolean;             // Featured on homepage
  difficulty: string;            // 'beginner' | 'intermediate' | 'advanced'
  category: string;              // 'lunar-nidra' | 'solar-practice' | etc.
  createdAt: Date;               // Creation timestamp
  updatedAt: Date;               // Last update timestamp
  createdBy: string;             // Creator user ID
  isActive: boolean;             // Published status
}
```

### 3. Purchases (`purchases`)
Tracks user purchases and payment information.

```typescript
interface Purchase {
  id: string;                    // Document ID
  userId: string;                // Buyer's user ID
  meditationId: string;          // Purchased meditation ID
  amount: number;                // Amount paid in cents
  currency: string;              // Currency code
  paymentMethod: string;         // Payment method used
  paymentStatus: string;         // 'pending' | 'completed' | 'failed' | 'refunded'
  transactionId?: string;        // Payment processor transaction ID
  purchaseDate: Date;            // Purchase timestamp
  accessExpiryDate?: Date;       // For time-limited access
}
```

### 4. User Progress (`userProgress`)
Tracks user meditation progress and statistics.

```typescript
interface UserProgress {
  id: string;                    // Document ID
  userId: string;                // User ID
  meditationId: string;          // Meditation ID
  completedSessions: number;     // Number of completed sessions
  totalListenTime: number;       // Total listening time in minutes
  lastAccessedAt: Date;          // Last access timestamp
  favorited: boolean;            // User favorited this meditation
  rating?: number;               // User rating (1-5 stars)
  review?: string;               // User review text
  createdAt: Date;               // First access date
  updatedAt: Date;               // Last update timestamp
}
```

### 5. Quiz Results (`quizResults`)
Stores astrology quiz results and recommendations.

```typescript
interface QuizResult {
  id: string;                    // Document ID
  userId?: string;               // User ID (optional for anonymous)
  sessionId: string;             // Anonymous session tracking
  birthDate: string;             // Birth date from quiz
  birthTime: string;             // Birth time from quiz
  birthPlace: string;            // Birth place from quiz
  sunSign: string;               // Calculated sun sign
  moonSign: string;              // Calculated moon sign
  risingSign?: string;           // Calculated rising sign
  spiritualGoals: string[];      // Selected spiritual goals
  challenges: string[];          // Selected challenges
  recommendedMeditations: string[]; // Recommended meditation IDs
  completedAt: Date;             // Quiz completion timestamp
  emailCaptured?: boolean;       // Whether email was captured
  email?: string;                // Email if provided
}
```

## Security Rules

The Firestore security rules ensure:
- Users can only access their own data
- Meditations are publicly readable but admin-writable
- Purchases and progress are private to users
- Quiz results can be submitted anonymously
- Community content has appropriate permissions

## Indexes

Key composite indexes for optimal query performance:
- Meditations by sun/moon signs and active status
- Meditations by element, active status, and creation date
- User purchases by user ID and purchase date
- User progress by user ID and last accessed date
- Community posts by category, published status, and creation date

## Usage Examples

### Creating a User Profile
```typescript
import { userService } from './services/firebaseService';

const createUserProfile = async (userData: Partial<User>) => {
  const userId = await userService.create(userData);
  return userId;
};
```

### Querying Meditations by Astro Signs
```typescript
import { meditationQueries } from './services/firebaseService';

const getUserMeditations = async (sunSign: string, moonSign: string) => {
  const meditations = await meditationQueries.getByAstroSigns(sunSign, moonSign);
  return meditations;
};
```

### Recording Purchase
```typescript
import { purchaseService } from './services/firebaseService';

const recordPurchase = async (purchaseData: Omit<Purchase, 'id'>) => {
  const purchaseId = await purchaseService.create(purchaseData);
  return purchaseId;
};
```

## Environment Setup

1. Create a `.env` file based on `.env.example`
2. Add your Firebase configuration values
3. Initialize Firebase in your app using `src/lib/firebase.ts`

## Seeding Data

Use the seed script to populate initial data:
```typescript
import { seedDatabase } from './utils/seedData';

// Run once to populate sample meditations and moon phases
await seedDatabase();
```

## Best Practices

1. **Data Validation**: Always validate data before writing to Firestore
2. **Error Handling**: Implement proper error handling for all database operations
3. **Pagination**: Use pagination for large result sets
4. **Caching**: Implement client-side caching for frequently accessed data
5. **Security**: Never expose sensitive data in client-side code
6. **Monitoring**: Set up Firebase monitoring and alerts

## Next Steps

1. Set up Firebase project in console
2. Configure authentication providers
3. Deploy security rules and indexes
4. Set up Firebase Storage for audio files
5. Configure Firebase Hosting for deployment
