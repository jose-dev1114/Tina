/**
 * Pipedream Workflow: Get Signed Audio URL
 * 
 * Trigger: HTTP / Webhook
 * 
 * This workflow generates signed URLs for audio files (only for subscribed users)
 */

// Step 1: Trigger - HTTP / Webhook Request
// Configure this to accept POST requests

// Step 2: Node.js Code - Generate Signed URL
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
    const storage = admin.storage();
    
    // Get data from request body
    const { userId, fileName } = steps.trigger.event.body;
    
    // Validate required fields
    if (!userId || !fileName) {
      return $.respond({
        status: 400,
        body: { error: 'Missing required fields: userId, fileName' }
      });
    }
    
    try {
      // 1. Check if user has active subscription
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data();
      
      if (!userData || userData.subscriptionStatus !== 'active') {
        return $.respond({
          status: 403,
          body: { error: 'Active subscription required to access audio files' }
        });
      }
      
      // 2. Check if subscription is not expired
      if (userData.currentPeriodEnd && userData.currentPeriodEnd * 1000 < Date.now()) {
        return $.respond({
          status: 403,
          body: { error: 'Subscription expired. Please renew to continue listening.' }
        });
      }
      
      // 3. Generate signed URL
      const bucket = storage.bucket();
      const file = bucket.file(`recordings/${fileName}`);
      
      // Check if file exists
      const [exists] = await file.exists();
      if (!exists) {
        return $.respond({
          status: 404,
          body: { error: 'Audio file not found' }
        });
      }
      
      // Generate signed URL (expires in 1 hour)
      const [signedUrl] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 3600000, // 1 hour from now
      });
      
      // 4. Log access for analytics (optional)
      await db.collection('audioAccess').add({
        userId: userId,
        fileName: fileName,
        accessedAt: admin.firestore.FieldValue.serverTimestamp(),
        ipAddress: steps.trigger.event.headers['x-forwarded-for'] || 'unknown'
      });
      
      // Return signed URL
      return $.respond({
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          signedUrl: signedUrl,
          expiresIn: 3600 // seconds
        }
      });
      
    } catch (error) {
      console.error('Error generating signed URL:', error);
      return $.respond({
        status: 500,
        body: { error: 'Failed to generate signed URL', details: error.message }
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
 * 4. Add Firebase Admin SDK app connection
 * 5. Paste this code in a Node.js step
 * 6. Replace YOUR_STORAGE_BUCKET with your Firebase storage bucket name
 * 7. Deploy the workflow
 * 8. Add the webhook URL to your .env file as VITE_AUDIO_SIGNED_URL_ENDPOINT
 * 
 * FIREBASE STORAGE SETUP:
 * 
 * 1. Go to Firebase Console > Storage
 * 2. Create a folder called "recordings"
 * 3. Upload your 19 MP3 files to this folder
 * 4. Set storage rules to private (only accessible via signed URLs):
 * 
 * rules_version = '2';
 * service firebase.storage {
 *   match /b/{bucket}/o {
 *     match /recordings/{fileName} {
 *       allow read: if false; // No direct access
 *     }
 *   }
 * }
 * 
 * This ensures files can ONLY be accessed via signed URLs from your backend
 */

