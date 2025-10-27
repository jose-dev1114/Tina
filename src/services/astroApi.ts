/**
 * Astrology API Service
 * Integrates with Pipedream workflow to calculate moon placement
 */

export interface BirthData {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
  latitude?: number;
  longitude?: number;
}

export interface MoonPlacementData {
  moonSign: string;
  moonDegree: number;
  moonHouse?: number;
  moonPhase?: string;
  moonElement?: string;
  moonModality?: string;
  description?: string;
}

export interface AstroResult {
  sunSign: string;
  moonSign: string;
  risingSign?: string;
  moonPlacement: MoonPlacementData;
  rawData?: any;
}

/**
 * Call Pipedream workflow to calculate moon placement
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://pipedream.com
 * 2. Create a new workflow
 * 3. Add an HTTP trigger (you'll get a webhook URL)
 * 4. Add a step that uses an astrology library (e.g., pymeeus, swisseph)
 * 5. Copy the webhook URL and add to .env as VITE_PIPEDREAM_WEBHOOK_URL
 * 
 * Example Pipedream workflow code (Node.js):
 * ```
 * const axios = require('axios');
 * 
 * export default defineComponent({
 *   async run({ steps, $ }) {
 *     const { year, month, day, hour = 12, minute = 0, latitude = 0, longitude = 0 } = steps.trigger.event.body;
 *     
 *     // Call astrology calculation service
 *     const response = await axios.post('https://your-astro-api.com/calculate', {
 *       year, month, day, hour, minute, latitude, longitude
 *     });
 *     
 *     return response.data;
 *   }
 * });
 * ```
 */
export async function calculateMoonPlacement(birthData: BirthData): Promise<AstroResult> {
  const webhookUrl = import.meta.env.VITE_PIPEDREAM_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error(
      'Pipedream webhook URL not configured. Add VITE_PIPEDREAM_WEBHOOK_URL to your .env file'
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        year: birthData.year,
        month: birthData.month,
        day: birthData.day,
        hour: birthData.hour || 12,
        minute: birthData.minute || 0,
        latitude: birthData.latitude || 0,
        longitude: birthData.longitude || 0,
      }),
    });

    if (!response.ok) {
      throw new Error(`Pipedream API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data as AstroResult;
  } catch (error) {
    console.error('Error calculating moon placement:', error);
    throw error;
  }
}

/**
 * Parse birth date string (YYYY-MM-DD) into BirthData
 */
export function parseBirthDate(dateString: string): Partial<BirthData> {
  const [year, month, day] = dateString.split('-').map(Number);
  return { year, month, day };
}

/**
 * Format moon sign with description
 */
export function getMoonSignDescription(moonSign: string): string {
  const descriptions: Record<string, string> = {
    'Aries': 'Passionate, courageous, and emotionally direct',
    'Taurus': 'Stable, sensual, and grounded in feelings',
    'Gemini': 'Curious, communicative, and emotionally adaptable',
    'Cancer': 'Nurturing, intuitive, and deeply emotional',
    'Leo': 'Expressive, warm-hearted, and emotionally generous',
    'Virgo': 'Analytical, practical, and emotionally reserved',
    'Libra': 'Harmonious, diplomatic, and emotionally balanced',
    'Scorpio': 'Intense, transformative, and emotionally deep',
    'Sagittarius': 'Optimistic, adventurous, and emotionally expansive',
    'Capricorn': 'Responsible, disciplined, and emotionally controlled',
    'Aquarius': 'Innovative, detached, and emotionally independent',
    'Pisces': 'Compassionate, intuitive, and emotionally sensitive'
  };

  return descriptions[moonSign] || 'Your emotional nature';
}

/**
 * Get moon element (Fire, Earth, Air, Water)
 */
export function getMoonElement(moonSign: string): string {
  const fireSigns = ['Aries', 'Leo', 'Sagittarius'];
  const earthSigns = ['Taurus', 'Virgo', 'Capricorn'];
  const airSigns = ['Gemini', 'Libra', 'Aquarius'];
  const waterSigns = ['Cancer', 'Scorpio', 'Pisces'];

  if (fireSigns.includes(moonSign)) return 'Fire';
  if (earthSigns.includes(moonSign)) return 'Earth';
  if (airSigns.includes(moonSign)) return 'Air';
  if (waterSigns.includes(moonSign)) return 'Water';
  return 'Unknown';
}

