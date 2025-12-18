/**
 * Pipedream Workflow: Create Stripe Subscription Checkout
 * 
 * Trigger: HTTP / Webhook
 * 
 * This workflow creates a Stripe Checkout session for the $5/month subscription
 */

// Step 1: Trigger - HTTP / Webhook Request
// Configure this to accept POST requests

// Step 2: Node.js Code - Create Stripe Checkout Session
export default defineComponent({
  props: {
    stripe: {
      type: "app",
      app: "stripe",
    },
  },
  async run({ steps, $ }) {
    const stripe = require('stripe')(this.stripe.$auth.api_key);
    
    // Get data from request body
    const { userId, email, priceId, successUrl, cancelUrl } = steps.trigger.event.body;
    
    // Validate required fields
    if (!userId || !email || !priceId) {
      return $.respond({
        status: 400,
        body: { error: 'Missing required fields: userId, email, priceId' }
      });
    }
    
    try {
      // Create or retrieve customer
      let customer;
      const existingCustomers = await stripe.customers.list({
        email: email,
        limit: 1
      });
      
      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: email,
          metadata: {
            userId: userId
          }
        });
      }
      
      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId, // Your Stripe Price ID for $5/month subscription
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: successUrl || `${steps.trigger.event.headers.origin}/shop?subscription=success`,
        cancel_url: cancelUrl || `${steps.trigger.event.headers.origin}/shop?subscription=canceled`,
        metadata: {
          userId: userId
        },
        subscription_data: {
          metadata: {
            userId: userId
          }
        }
      });
      
      // Return the checkout session URL
      return $.respond({
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          sessionUrl: session.url,
          sessionId: session.id
        }
      });
      
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return $.respond({
        status: 500,
        body: { error: 'Failed to create checkout session', details: error.message }
      });
    }
  },
});

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a new Pipedream workflow
 * 2. Add HTTP / Webhook trigger
 * 3. Copy the webhook URL
 * 4. Add Stripe app connection
 * 5. Paste this code in a Node.js step
 * 6. Deploy the workflow
 * 7. Add the webhook URL to your .env file as VITE_STRIPE_SUBSCRIPTION_WEBHOOK_URL
 * 
 * STRIPE SETUP:
 * 
 * 1. Go to Stripe Dashboard > Products
 * 2. Create a new product: "Lunar Nidra Subscription"
 * 3. Add a recurring price: $5/month
 * 4. Copy the Price ID (starts with price_)
 * 5. Update the priceId in subscriptionService.ts
 */

