/**
 * Mailchimp Newsletter Subscription Webhook
 * 
 * This Pipedream workflow adds new subscribers to your Mailchimp audience.
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a new Pipedream workflow
 * 2. Add HTTP / Webhook trigger (select "Return a custom response")
 * 3. Copy the webhook URL
 * 4. Add a Node.js code step and paste this code
 * 5. Set the following environment variables in Pipedream:
 *    - MAILCHIMP_API_KEY: Your Mailchimp API key
 *    - MAILCHIMP_SERVER_PREFIX: Your server prefix (e.g., "us21" from your API key)
 *    - MAILCHIMP_AUDIENCE_ID: Your audience/list ID
 * 6. Deploy the workflow
 * 7. Add the webhook URL to your .env file as VITE_MAILCHIMP_WEBHOOK_URL
 * 
 * HOW TO GET MAILCHIMP CREDENTIALS:
 * 
 * API Key:
 * - Go to Mailchimp → Account → Extras → API keys → Create A Key
 * - The server prefix is the part after the dash (e.g., "us21" in "abc123-us21")
 * 
 * Audience ID:
 * - Go to Audience → Settings → Audience name and defaults
 * - The Audience ID is listed there
 */

export default defineComponent({
  async run({ steps, $ }) {
    const crypto = await import('crypto');
    
    // Get environment variables
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
    const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    
    // Get data from request body
    const { email, firstName, source, timestamp } = steps.trigger.event.body;
    
    // Validate required fields
    if (!email) {
      return $.respond({
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email is required' })
      });
    }
    
    // Validate environment variables
    if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_AUDIENCE_ID) {
      console.error('Missing Mailchimp configuration');
      return $.respond({
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Server configuration error' })
      });
    }
    
    try {
      // Create MD5 hash of lowercase email (required by Mailchimp)
      const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
      
      // Mailchimp API endpoint
      const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${emailHash}`;
      
      // Make request to Mailchimp
      const response = await fetch(url, {
        method: 'PUT', // PUT will add or update the subscriber
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email_address: email.toLowerCase(),
          status_if_new: 'subscribed', // Auto-subscribe new users
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName || '',
            SOURCE: source || 'website'
          },
          tags: ['Website Signup'],
          timestamp_signup: timestamp || new Date().toISOString()
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Check if already subscribed
        if (data.title === 'Member Exists') {
          return $.respond({
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              success: true,
              message: "You're already part of our sacred circle! 🌙",
              alreadySubscribed: true
            })
          });
        }
        
        console.error('Mailchimp error:', data);
        return $.respond({
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: data.detail || 'Failed to subscribe' })
        });
      }
      
      // Success!
      return $.respond({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          success: true,
          message: '🌙 Welcome to our sacred circle! Check your email for a special gift.'
        })
      });
      
    } catch (error) {
      console.error('Error subscribing to Mailchimp:', error);
      return $.respond({
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to subscribe. Please try again.' })
      });
    }
  }
});

