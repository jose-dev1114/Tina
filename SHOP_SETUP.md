# 🛍️ Shop & E-commerce Setup Guide

This guide explains how the shop functionality works and how to set up Stripe payments for digital and physical products.

## 📋 Overview

The shop supports two types of products:
1. **Digital Products (Recordings)** - 6 meditation recordings with instant download
2. **Physical Products (Tina's Cards)** - 2 physical products that require shipping:
   - Self-discovery & Intention Journal ($19.95)
   - 100 Self-discovery & Intention Cards ($19.95)

## 🏗️ Architecture

### Components Created

1. **CartContext** (`src/contexts/CartContext.tsx`)
   - Global cart state management
   - LocalStorage persistence
   - Functions: addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount, hasPhysicalProducts

2. **Stripe Service** (`src/services/stripeService.ts`)
   - Stripe integration utilities
   - Checkout session creation
   - Cart totals calculation (subtotal, shipping, tax)
   - Redirect to Stripe Checkout

3. **Shop Page** (`src/pages/Shop.tsx`)
   - Product display with tabs (Recordings / Cards)
   - Element-based filtering for recordings
   - Add to cart functionality
   - "In Cart" status indicator
   - Floating cart button with total

4. **Checkout Page** (`src/pages/Checkout.tsx`)
   - Cart summary with quantity controls
   - Conditional shipping form (only for physical products)
   - Order summary with totals
   - Stripe payment integration

### Database Types

Added to `src/types/database.ts`:
- `Product` - Product information (digital/physical)
- `CartItem` - Cart item with product and quantity
- `ShippingAddress` - Shipping details
- `Order` - Order information with payment status

## 🔧 Setup Instructions

### 1. Stripe Account Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_STRIPE_CHECKOUT_WEBHOOK_URL=https://your-pipedream-webhook-url
```

### 3. Pipedream Webhook Setup

You need to create a Pipedream workflow to handle checkout sessions:

#### Create Workflow:
1. Go to https://pipedream.com
2. Create a new workflow with HTTP trigger
3. Copy the webhook URL to `VITE_STRIPE_CHECKOUT_WEBHOOK_URL`

#### Workflow Steps:

**Step 1: Receive Checkout Data**
```javascript
export default defineComponent({
  async run({ steps, $ }) {
    const { items, successUrl, cancelUrl, customerEmail, shippingAddress, userId } = steps.trigger.event.body;
    return { items, successUrl, cancelUrl, customerEmail, shippingAddress, userId };
  },
});
```

**Step 2: Create Stripe Checkout Session**
```javascript
import Stripe from 'stripe';

export default defineComponent({
  async run({ steps, $ }) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    const lineItems = steps.receive_data.$return_value.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          description: item.product.description,
          images: item.product.images,
          metadata: {
            productId: item.product.id,
            productType: item.product.type,
          },
        },
        unit_amount: Math.round(item.product.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: steps.receive_data.$return_value.successUrl,
      cancel_url: steps.receive_data.$return_value.cancelUrl,
      customer_email: steps.receive_data.$return_value.customerEmail,
      metadata: {
        userId: steps.receive_data.$return_value.userId || '',
      },
    };

    // Add shipping if physical products
    const hasPhysical = steps.receive_data.$return_value.items.some(
      item => item.product.type === 'physical'
    );
    
    if (hasPhysical && steps.receive_data.$return_value.shippingAddress) {
      sessionConfig.shipping_options = [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 599, currency: 'usd' }, // $5.99
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    
    return {
      id: session.id,
      url: session.url,
    };
  },
});
```

**Step 3: Return Session to Frontend**
```javascript
export default defineComponent({
  async run({ steps, $ }) {
    await $.respond({
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: steps.create_stripe_session.$return_value,
    });
  },
});
```

### 4. Stripe Webhook for Post-Purchase (Optional but Recommended)

Create another Pipedream workflow to handle Stripe webhooks:

1. Create new workflow with Stripe trigger
2. Select event: `checkout.session.completed`
3. Add steps to:
   - Generate secure download links for digital products
   - Send email with download links (use EmailJS or SendGrid)
   - Create order in Firebase
   - For physical products: trigger shipping workflow

## 📦 Product Management

### Adding Products

Currently, products are hardcoded in `Shop.tsx`. To make them dynamic:

1. **Create Products Collection in Firebase**:
   ```javascript
   // In Firebase Console, create 'products' collection
   // Or use AdminPanel to add products
   ```

2. **Fetch Products in Shop.tsx**:
   ```typescript
   useEffect(() => {
     const fetchProducts = async () => {
       const productsRef = collection(db, 'products');
       const snapshot = await getDocs(productsRef);
       const products = snapshot.docs.map(doc => ({
         id: doc.id,
         ...doc.data()
       })) as Product[];
       setRecordings(products.filter(p => p.type === 'digital'));
       setPhysicalProducts(products.filter(p => p.type === 'physical'));
     };
     fetchProducts();
   }, []);
   ```

### Product Schema

```typescript
{
  id: string;
  name: string;
  description: string;
  price: number; // in dollars
  currency: 'USD';
  type: 'digital' | 'physical';
  category: 'recording' | 'card-deck' | 'meditation' | 'course';
  images: string[]; // URLs
  featured: boolean;
  isActive: boolean;
  
  // Digital product fields
  duration?: string; // e.g., "42 minutes"
  format?: string; // e.g., "MP3"
  fileSize?: string; // e.g., "96 MB"
  downloadUrl?: string; // Secure download link
  
  // Physical product fields
  requiresShipping?: boolean;
  weight?: number; // in grams
  dimensions?: { length: number; width: number; height: number; }; // in cm
  inventory?: number;
  
  // Metadata
  tags?: string[];
  sunSign?: string;
  moonSign?: string;
  element?: 'fire' | 'earth' | 'air' | 'water';
  createdAt: Date;
  updatedAt: Date;
}
```

## 🧪 Testing

### Test Mode
1. Use Stripe test keys (starting with `pk_test_` and `sk_test_`)
2. Use test card: `4242 4242 4242 4242`
3. Any future expiry date and any CVC

### Test Scenarios
- [ ] Add digital product to cart
- [ ] Add physical product to cart
- [ ] Update quantities
- [ ] Remove items
- [ ] Cart persists on page refresh
- [ ] Checkout with digital only (no shipping form)
- [ ] Checkout with physical (shipping form required)
- [ ] Stripe redirect works
- [ ] Success/cancel URLs work

## 🚀 Going Live

1. Replace test keys with live keys
2. Set up production Stripe webhook
3. Configure tax rates in Stripe Dashboard
4. Set up real shipping rates
5. Test end-to-end with real payment
6. Set up email notifications for orders

## 📝 Next Steps

- [ ] Implement webhook handler for post-purchase fulfillment
- [ ] Add email notifications with download links
- [ ] Create admin panel for product management
- [ ] Add order history to user dashboard
- [ ] Implement discount codes/coupons
- [ ] Add product reviews and ratings
- [ ] Set up automated shipping label generation

## 🆘 Troubleshooting

**Cart not persisting**: Check localStorage in browser DevTools

**Stripe not loading**: Verify `VITE_STRIPE_PUBLISHABLE_KEY` is set correctly

**Checkout fails**: Check Pipedream workflow logs for errors

**Shipping not showing**: Ensure cart has physical products with `requiresShipping: true`

## 📚 Resources

- [Stripe Checkout Docs](https://stripe.com/docs/payments/checkout)
- [Pipedream Docs](https://pipedream.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)

