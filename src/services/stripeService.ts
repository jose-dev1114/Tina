import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CartItem, ShippingAddress } from '../types/database';

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.error('Stripe publishable key not found in environment variables');
      return null;
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export interface CheckoutSessionData {
  items: CartItem[];
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  shippingAddress?: ShippingAddress;
  userId?: string;
}

/**
 * Create a Stripe Checkout Session
 * This should be called from your backend/serverless function
 * For now, this is a placeholder that shows the structure
 */
export const createCheckoutSession = async (
  data: CheckoutSessionData
): Promise<{ sessionId: string; url: string } | null> => {
  try {
    // TODO: Replace with your backend endpoint or Pipedream webhook
    const backendUrl = import.meta.env.VITE_STRIPE_CHECKOUT_WEBHOOK_URL;
    
    if (!backendUrl) {
      console.error('Stripe checkout webhook URL not configured');
      throw new Error('Payment system not configured. Please contact support.');
    }

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const session = await response.json();
    return {
      sessionId: session.id,
      url: session.url,
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return null;
  }
};

/**
 * Redirect to Stripe Checkout
 */
export const redirectToCheckout = async (sessionId: string): Promise<void> => {
  const stripe = await getStripe();
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });
  
  if (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
};

/**
 * Create checkout session and redirect
 * This is the main function to call from your components
 */
export const initiateCheckout = async (
  data: CheckoutSessionData
): Promise<void> => {
  try {
    const session = await createCheckoutSession(data);
    
    if (!session) {
      throw new Error('Failed to create checkout session');
    }

    // Redirect to Stripe Checkout
    window.location.href = session.url;
  } catch (error) {
    console.error('Error initiating checkout:', error);
    throw error;
  }
};

/**
 * Calculate cart totals including shipping and tax
 */
export const calculateCartTotals = (
  items: CartItem[],
  shippingAddress?: ShippingAddress
) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Check if cart has physical products
  const hasPhysicalProducts = items.some(
    (item) => item.product.type === 'physical'
  );

  // Calculate shipping (only for physical products)
  let shipping = 0;
  if (hasPhysicalProducts && shippingAddress) {
    // Flat rate shipping for now
    // TODO: Implement dynamic shipping rates based on location
    shipping = 5.99;
  }

  // Calculate tax (simplified - should be based on location)
  // TODO: Implement proper tax calculation based on shipping address
  const taxRate = 0.08; // 8% tax rate
  const tax = (subtotal + shipping) * taxRate;

  const total = subtotal + shipping + tax;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};

export default {
  getStripe,
  createCheckoutSession,
  redirectToCheckout,
  initiateCheckout,
  calculateCartTotals,
};

