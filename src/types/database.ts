// Database Types for Firebase Firestore

export interface User {
  id: string;

  // Basic info from Clerk
  email: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  username?: string;
  phone?: string;

  // Authentication info
  clerkUserId?: string;
  emailVerified?: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;

  // Astrological profile
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  timezone?: string;  // IANA timezone (e.g., "America/New_York", "Europe/Brussels")
  sunSign?: string;
  moonSign?: string;
  risingSign?: string;

  // ✨ NEW: Full birth chart data from API
  birthChartData?: {
    moonSign?: string;
    moonHouse?: number;
    apiHouse?: number;
    computedHouse?: number | null;
    moonLongitude?: number;
    cusps?: any;
    timezoneUsed?: string;
    tzone?: number;
    lat?: number;
    lon?: number;
    date?: string;
    time?: string;
    houseSystem?: string;
    zodiac?: string;
    cuspsFound?: boolean;
    cuspsEndpointTried?: string[];
    lastCuspsStatus?: number;
    lastCuspsKeys?: string[];
    chartUrl?: string;
    chartError?: string | null;
    sunSign?: string;
    risingSign?: string;
    sunDegree?: number;
    moonDegree?: number;
    risingDegree?: number;
    moonPhase?: string;
    moonPhaseReport?: {
      consideredDate?: string;
      moonPhase?: string;
      significance?: string;
      report?: string;
    };
    moonPhaseError?: string | null;
    rawData?: any;
  };

  // Spiritual preferences
  spiritualGoals?: string[];
  challenges?: string[];
  meditationPreferences?: {
    preferredDuration?: number; // minutes
    preferredTime?: string; // morning, afternoon, evening, night
    favoriteElements?: string[]; // fire, earth, air, water
    voicePreference?: string; // male, female, neutral
  };

  // Progress tracking
  totalMeditationTime?: number; // in minutes
  completedMeditations?: Array<{
    meditationId: string;
    completedAt: Date;
    duration: number;
  }>;
  favoritemeditations?: string[]; // meditation IDs
  currentStreak?: number;
  longestStreak?: number;

  // Membership/Subscription info
  membershipTier?: 'moon-circle' | 'star-seeker' | 'cosmic-guide';
  membershipStatus?: 'active' | 'inactive' | 'trial';
  membershipStartDate?: Date;
  membershipEndDate?: Date;
  subscriptionStatus?: 'free' | 'premium' | 'lifetime';

  // Privacy settings
  profileVisibility?: 'public' | 'private' | 'friends';
  allowCommunityInteraction?: boolean;

  // Onboarding
  hasCompletedOnboarding?: boolean;
  hasCompletedAstroQuiz?: boolean;
}

export interface Meditation {
  id: string;
  title: string;
  description: string;
  sunSign: string;
  moonSign: string;
  duration: number; // in minutes
  audioUrl?: string;
  thumbnailUrl?: string;
  price: number;
  currency: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  intention: string;
  tags: string[];
  featured: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'lunar-nidra' | 'solar-practice' | 'chakra-healing' | 'moon-phase';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // user ID
  isActive: boolean;
}

export interface Purchase {
  id: string;
  userId: string;
  meditationId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  purchaseDate: Date;
  accessExpiryDate?: Date; // for time-limited access
}

export interface UserProgress {
  id: string;
  userId: string;
  meditationId: string;
  completedSessions: number;
  totalListenTime: number; // in minutes
  lastAccessedAt: Date;
  favorited: boolean;
  rating?: number; // 1-5 stars
  review?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizResult {
  id: string;
  userId?: string; // optional for anonymous users
  sessionId: string; // for anonymous tracking
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  sunSign: string;
  moonSign: string;
  risingSign?: string;
  spiritualGoals: string[];
  challenges: string[];
  recommendedMeditations: string[]; // meditation IDs
  completedAt: Date;
  emailCaptured?: boolean;
  email?: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: 'general' | 'meditation-tips' | 'astrology' | 'moon-phases' | 'success-stories';
  tags: string[];
  likes: number;
  comments: number;
  isPublished: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  parentCommentId?: string; // for nested comments
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface CoachingSession {
  id: string;
  userId: string;
  coachId: string;
  sessionType: 'birth-chart-reading' | 'meditation-guidance' | 'spiritual-coaching';
  duration: number; // in minutes
  price: number;
  currency: string;
  scheduledAt: Date;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  meetingLink?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Newsletter {
  id: string;
  email: string;
  subscriptionDate: Date;
  isActive: boolean;
  preferences: {
    moonPhaseReminders: boolean;
    newMeditations: boolean;
    communityUpdates: boolean;
    specialOffers: boolean;
  };
  source: 'homepage' | 'quiz' | 'checkout' | 'community';
}

export interface MoonPhase {
  id: string;
  phase: 'new-moon' | 'waxing-crescent' | 'first-quarter' | 'waxing-gibbous' | 'full-moon' | 'waning-gibbous' | 'last-quarter' | 'waning-crescent';
  date: Date;
  sign: string; // zodiac sign
  description: string;
  meditationRecommendations: string[]; // meditation IDs
  ritualSuggestions: string[];
  createdAt: Date;
}

// Product Types for Shop
export type ProductType = 'digital' | 'physical';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: ProductType;
  category: 'recording' | 'card-deck' | 'meditation' | 'course';
  images: string[];
  featured: boolean;
  isActive: boolean;
  stripePriceId?: string; // Stripe Price ID for checkout
  stripeProductId?: string; // Stripe Product ID
  createdAt: Date;
  updatedAt: Date;

  // Digital product specific
  downloadUrl?: string;
  fileSize?: string;
  duration?: string; // for audio/video
  format?: string; // mp3, pdf, etc.

  // Physical product specific
  requiresShipping?: boolean;
  weight?: number; // in grams
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  inventory?: number;

  // Metadata
  tags?: string[];
  sunSign?: string;
  moonSign?: string;
  element?: 'fire' | 'earth' | 'air' | 'water';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Order {
  id: string;
  userId?: string;
  email: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;

  // Shipping info (for physical products)
  shippingAddress?: ShippingAddress;

  // Payment info
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  paymentStatus: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';

  // Order status
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;

  // Digital delivery
  downloadLinks?: {
    productId: string;
    url: string;
    expiresAt: Date;
  }[];

  createdAt: Date;
  updatedAt: Date;
}

// Firestore collection names
export const COLLECTIONS = {
  USERS: 'users',
  MEDITATIONS: 'meditations',
  PURCHASES: 'purchases',
  USER_PROGRESS: 'userProgress',
  QUIZ_RESULTS: 'quizResults',
  COMMUNITY_POSTS: 'communityPosts',
  COMMENTS: 'comments',
  COACHING_SESSIONS: 'coachingSessions',
  NEWSLETTER: 'newsletter',
  MOON_PHASES: 'moonPhases',
  PRODUCTS: 'products',
  ORDERS: 'orders'
} as const;
