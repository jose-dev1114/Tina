import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface SubscriptionData {
  status: 'active' | 'inactive' | 'canceled' | 'past_due';
  subscriptionId?: string;
  customerId?: string;
  currentPeriodEnd?: number;
  cancelAtPeriodEnd?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

/**
 * Check if user has an active subscription
 */
export const checkSubscriptionStatus = async (userId: string): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const data = userDoc.data() as SubscriptionData | undefined;
    
    if (!data || !data.status) {
      return false;
    }

    // Check if subscription is active and not expired
    if (data.status === 'active') {
      // If currentPeriodEnd exists, check if it's still valid
      if (data.currentPeriodEnd) {
        return data.currentPeriodEnd * 1000 > Date.now();
      }
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return false;
  }
};

/**
 * Subscribe to real-time subscription status updates
 */
export const subscribeToSubscriptionStatus = (
  userId: string,
  callback: (isSubscribed: boolean) => void
) => {
  const userDocRef = doc(db, 'users', userId);
  
  return onSnapshot(userDocRef, (snapshot) => {
    const data = snapshot.data() as SubscriptionData | undefined;
    
    if (!data || !data.status) {
      callback(false);
      return;
    }

    const isActive = data.status === 'active' && 
      (!data.currentPeriodEnd || data.currentPeriodEnd * 1000 > Date.now());
    
    callback(isActive);
  }, (error) => {
    console.error('Error subscribing to subscription status:', error);
    callback(false);
  });
};

/**
 * Create Stripe Checkout Session for subscription
 */
export const createSubscriptionCheckout = async (
  userId: string,
  email: string,
  priceId: string = import.meta.env.VITE_STRIPE_PRICE_ID || 'price_1SfPwcQ4beB4tY3liBdjbu5E'
): Promise<string> => {
  try {
    // Call Vercel serverless function
    const response = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        email,
        priceId,
        successUrl: `${window.location.origin}/shop?subscription=success`,
        cancelUrl: `${window.location.origin}/shop?subscription=canceled`,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checkout session');
    }

    const data = await response.json();
    return data.sessionUrl;
  } catch (error) {
    console.error('Error creating subscription checkout:', error);
    throw error;
  }
};

/**
 * Get signed URL for audio file (requires backend endpoint)
 */
export const getSignedAudioUrl = async (
  fileName: string,
  userId: string
): Promise<string> => {
  try {
    // Call Vercel serverless function
    const response = await fetch('/api/get-audio-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName,
        userId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get signed URL');
    }

    const data = await response.json();
    return data.signedUrl;
  } catch (error) {
    console.error('Error getting signed audio URL:', error);
    throw error;
  }
};

/**
 * Cancel subscription at period end
 */
export const cancelSubscription = async (
  userId: string,
  subscriptionId: string
): Promise<void> => {
  try {
    const response = await fetch(import.meta.env.VITE_STRIPE_CANCEL_SUBSCRIPTION_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        subscriptionId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to cancel subscription');
    }
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};

/**
 * Get subscription details
 */
export const getSubscriptionDetails = async (userId: string): Promise<SubscriptionData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const data = userDoc.data() as SubscriptionData | undefined;
    
    return data || null;
  } catch (error) {
    console.error('Error getting subscription details:', error);
    return null;
  }
};

