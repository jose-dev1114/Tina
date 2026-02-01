/**
 * Newsletter Service - Mailchimp Integration
 *
 * This service handles newsletter subscriptions via Mailchimp
 * Using Mailchimp's embedded form submission (no server required)
 */

// Mailchimp form configuration
const MAILCHIMP_URL = 'https://ourhealingpractices.us21.list-manage.com/subscribe/post-json';
const MAILCHIMP_U = '228e9235f98cf38f46bbc7af0';
const MAILCHIMP_ID = '95ea1551b1';

export interface NewsletterResponse {
  success: boolean;
  message: string;
  alreadySubscribed?: boolean;
}

/**
 * Subscribe an email to the Mailchimp newsletter
 */
export const subscribeToNewsletter = async (email: string, firstName?: string, lastName?: string): Promise<NewsletterResponse> => {
  // Validate email
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address');
  }

  try {
    // Build the URL with parameters
    const params = new URLSearchParams({
      u: MAILCHIMP_U,
      id: MAILCHIMP_ID,
      EMAIL: email.toLowerCase().trim(),
      FNAME: firstName?.trim() || '',
      LNAME: lastName?.trim() || '',
      c: 'callback' // JSONP callback name
    });

    const url = `${MAILCHIMP_URL}?${params.toString()}`;

    // Use JSONP approach since Mailchimp doesn't support CORS
    return new Promise((resolve, reject) => {
      const callbackName = 'mailchimpCallback_' + Date.now();

      // Create callback function
      (window as unknown as Record<string, unknown>)[callbackName] = (response: { result: string; msg: string }) => {
        // Clean up
        delete (window as unknown as Record<string, unknown>)[callbackName];
        const script = document.getElementById(callbackName);
        if (script) script.remove();

        if (response.result === 'success') {
          resolve({
            success: true,
            message: '🌙 Welcome to our sacred circle! Check your email for a special gift.'
          });
        } else if (response.msg?.includes('already subscribed')) {
          resolve({
            success: true,
            message: "You're already part of our sacred circle! 🌙",
            alreadySubscribed: true
          });
        } else {
          // Clean up Mailchimp's error message (remove HTML and "0 -" prefix)
          let errorMsg = response.msg || 'Failed to subscribe';
          errorMsg = errorMsg.replace(/<[^>]*>/g, '').replace(/^\d+\s*-\s*/, '').trim();
          reject(new Error(errorMsg));
        }
      };

      // Create script element for JSONP
      const script = document.createElement('script');
      script.id = callbackName;
      script.src = url.replace('c=callback', `c=${callbackName}`);
      script.onerror = () => {
        delete (window as unknown as Record<string, unknown>)[callbackName];
        script.remove();
        reject(new Error('Failed to connect to newsletter service'));
      };

      // Add timeout
      setTimeout(() => {
        if ((window as unknown as Record<string, unknown>)[callbackName]) {
          delete (window as unknown as Record<string, unknown>)[callbackName];
          script.remove();
          reject(new Error('Request timed out. Please try again.'));
        }
      }, 10000);

      document.body.appendChild(script);
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    throw error;
  }
};

