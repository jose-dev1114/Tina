import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { 
  checkSubscriptionStatus, 
  subscribeToSubscriptionStatus,
  createSubscriptionCheckout,
  getSubscriptionDetails,
  SubscriptionData
} from '../services/subscriptionService';
import toast from 'react-hot-toast';

export const useSubscription = () => {
  const { user, isLoaded } = useUser();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);

  // Check subscription status on mount and when user changes
  useEffect(() => {
    if (!isLoaded || !user) {
      setLoading(false);
      setIsSubscribed(false);
      return;
    }

    // Initial check
    const checkStatus = async () => {
      setLoading(true);
      const status = await checkSubscriptionStatus(user.id);
      const details = await getSubscriptionDetails(user.id);
      setIsSubscribed(status);
      setSubscriptionData(details);
      setLoading(false);
    };

    checkStatus();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToSubscriptionStatus(user.id, (status) => {
      setIsSubscribed(status);
    });

    return () => {
      unsubscribe();
    };
  }, [user, isLoaded]);

  // Handle subscription checkout
  const subscribe = async () => {
    if (!user) {
      toast.error('Please sign in to subscribe');
      return;
    }

    setSubscribing(true);
    try {
      const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress;
      
      if (!email) {
        throw new Error('No email address found');
      }

      const sessionUrl = await createSubscriptionCheckout(user.id, email);
      
      // Redirect to Stripe Checkout
      window.location.href = sessionUrl;
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to start subscription. Please try again.');
      setSubscribing(false);
    }
  };

  return {
    isSubscribed,
    subscriptionData,
    loading,
    subscribing,
    subscribe,
    user,
  };
};

