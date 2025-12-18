/**
 * Pipedream Workflow: Stripe Webhook Handler
 * 
 * Trigger: Stripe - New Event (Webhook)
 * 
 * This workflow handles Stripe subscription events and updates Firebase
 */

// Step 1: Trigger - Stripe Webhook
// Configure to listen for these events:
// - customer.subscription.created
// - customer.subscription.updated
// - customer.subscription.deleted
// - invoice.payment_succeeded
// - invoice.payment_failed

// Step 2: Node.js Code - Update Firebase
export default defineComponent({
  props: {
    firebase: {
      type: "app",
      app: "firebase_admin_sdk",
    },
  },
  async run({ steps, $ }) {
    const admin = require('firebase-admin');
    
    // Initialize Firebase Admin (if not already initialized)
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(this.firebase.$auth),
        storageBucket: 'YOUR_STORAGE_BUCKET.appspot.com' // Replace with your bucket
      });
    }
    
    const db = admin.firestore();
    const event = steps.trigger.event;
    
    console.log('Processing Stripe event:', event.type);
    
    try {
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated': {
          const subscription = event.data.object;
          const userId = subscription.metadata.userId;
          
          if (!userId) {
            console.error('No userId in subscription metadata');
            return;
          }
          
          // Determine subscription status
          let status = 'inactive';
          if (subscription.status === 'active' || subscription.status === 'trialing') {
            status = 'active';
          } else if (subscription.status === 'past_due') {
            status = 'past_due';
          } else if (subscription.status === 'canceled') {
            status = 'canceled';
          }
          
          // Update Firestore
          await db.collection('users').doc(userId).set({
            subscriptionStatus: status,
            subscriptionId: subscription.id,
            customerId: subscription.customer,
            currentPeriodEnd: subscription.current_period_end,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
          
          console.log(`Updated subscription for user ${userId}: ${status}`);
          break;
        }
        
        case 'customer.subscription.deleted': {
          const subscription = event.data.object;
          const userId = subscription.metadata.userId;
          
          if (!userId) {
            console.error('No userId in subscription metadata');
            return;
          }
          
          // Update Firestore
          await db.collection('users').doc(userId).set({
            subscriptionStatus: 'canceled',
            cancelAtPeriodEnd: false,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
          
          console.log(`Canceled subscription for user ${userId}`);
          break;
        }
        
        case 'invoice.payment_succeeded': {
          const invoice = event.data.object;
          const subscriptionId = invoice.subscription;
          
          if (!subscriptionId) return;
          
          // Get subscription to find userId
          const stripe = require('stripe')(process.env.STRIPE_API_KEY);
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const userId = subscription.metadata.userId;
          
          if (!userId) return;
          
          // Update payment status
          await db.collection('users').doc(userId).set({
            subscriptionStatus: 'active',
            lastPaymentDate: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
          
          console.log(`Payment succeeded for user ${userId}`);
          break;
        }
        
        case 'invoice.payment_failed': {
          const invoice = event.data.object;
          const subscriptionId = invoice.subscription;
          
          if (!subscriptionId) return;
          
          // Get subscription to find userId
          const stripe = require('stripe')(process.env.STRIPE_API_KEY);
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const userId = subscription.metadata.userId;
          
          if (!userId) return;
          
          // Update payment status
          await db.collection('users').doc(userId).set({
            subscriptionStatus: 'past_due',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
          
          console.log(`Payment failed for user ${userId}`);
          break;
        }
        
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
      
      return { success: true, eventType: event.type };
      
    } catch (error) {
      console.error('Error processing webhook:', error);
      throw error;
    }
  },
});

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a new Pipedream workflow
 * 2. Add Stripe Webhook trigger
 * 3. Select these events:
 *    - customer.subscription.created
 *    - customer.subscription.updated
 *    - customer.subscription.deleted
 *    - invoice.payment_succeeded
 *    - invoice.payment_failed
 * 4. Add Firebase Admin SDK app connection
 * 5. Paste this code in a Node.js step
 * 6. Replace YOUR_STORAGE_BUCKET with your Firebase storage bucket name
 * 7. Deploy the workflow
 * 8. Pipedream will automatically register the webhook with Stripe
 */

