/**
 * Geocoding Utility
 * Converts birth place to latitude, longitude, and timezone
 * Also calculates birth chart (Sun, Moon, Rising signs)
 * Uses Pipedream backend to bypass CORS issues
 */

export interface BirthChartData {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  sunDegree?: number;
  moonDegree?: number;
  risingDegree?: number;
  moonHouse?: number;
  moonPhase?: string;
  rawData?: any;

  // ✨ NEW: Full API response data
  apiHouse?: number;
  computedHouse?: number | null;
  moonLongitude?: number;
  cusps?: any;
  timezoneUsed?: string;
  tzone?: number;
  lat?: number;
  lon?: number;
  date?: string;
  time?: string;
  houseSystem?: string;
  zodiac?: string;
  cuspsFound?: boolean;
  cuspsEndpointTried?: string[];
  lastCuspsStatus?: number;
  lastCuspsKeys?: string[];
  chartUrl?: string;
  chartError?: string | null;
}

export interface GeocodingResult {
  lat: number;
  lon: number;
  timezone: string;
  formattedAddress?: string;
  birthChart?: BirthChartData;
}

/**
 * Geocode a birth place and calculate birth chart
 * Uses Pipedream backend to bypass CORS issues with Geoapify API
 * Also calculates Sun, Moon, and Rising signs if birth date is provided
 *
 * @param birthPlace - The birth place (e.g., "New York, USA")
 * @param birthDate - Optional birth date (YYYY-MM-DD format)
 * @param birthTime - Optional birth time (HH:MM format)
 * @param timezone - Optional timezone (IANA format, e.g., "America/New_York")
 * @returns GeocodingResult with lat, lon, timezone, and optional birth chart
 */
export const geocodeBirthPlace = async (
  birthPlace: string,
  birthDate?: string,
  birthTime?: string,
  timezone?: string
): Promise<GeocodingResult> => {
  try {
    console.log('🌍 Starting geocoding for:', birthPlace);

    // Get Pipedream webhook URL from environment
    const webhookUrl = import.meta.env.VITE_PIPEDREAM_GEOCODING_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn('⚠️ Pipedream geocoding webhook not configured. Using mock data for demonstration.');
      console.warn('📝 To use real geocoding, add VITE_PIPEDREAM_GEOCODING_WEBHOOK_URL to your .env file');
      console.warn('🔗 See PIPEDREAM_GEOCODING_SETUP.md for setup instructions');

      // Return mock data for demonstration
      return getMockGeocodingData(birthPlace);
    }

    // Call Pipedream webhook (backend handles CORS)
    console.log('🔄 Calling Pipedream geocoding webhook...');

    // Format time to HH:MM:SS if provided
    let formattedTime = undefined;
    if (birthTime) {
      // If birthTime is HH:MM, convert to HH:MM:SS
      if (birthTime.includes(':') && birthTime.split(':').length === 2) {
        formattedTime = `${birthTime}:00`;
      } else {
        formattedTime = birthTime;
      }
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'User-Agent': 'pipedream/1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: birthPlace,
        date: birthDate,
        ...(formattedTime && { time: formattedTime }),
        ...(timezone && { timezone })
      })
    });

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.statusText}`);
    }

    const data = await response.json();

    console.log('📦 Full API Response:', data);

    if (data.error) {
      throw new Error(data.error);
    }

    // ✨ The Pipedream API returns the complete birth chart data directly in the response
    // Extract the fields we need for geocoding
    const lat = data.lat;
    const lon = data.lon;
    // Use the user-provided timezone if available, otherwise use the one from the API
    const resultTimezone = timezone || data.timezone;
    const formattedAddress = data.formattedAddress;

    console.log('✅ Geocoding successful!');
    console.log('📍 Latitude:', lat);
    console.log('📍 Longitude:', lon);
    console.log('🕐 Timezone:', resultTimezone);
    console.log('📮 Formatted Address:', formattedAddress);

    // ✨ The entire response IS the birth chart data
    // It includes: moonSign, moonHouse, chartUrl, lat, lon, date, time, etc.
    const birthChart = data;

    if (birthChart && birthChart.moonSign) {
      console.log('✅ Birth chart calculated!');
      console.log('☀️ Sun Sign:', birthChart.sunSign);
      console.log('🌙 Moon Sign:', birthChart.moonSign);
      console.log('🌅 Rising Sign:', birthChart.risingSign);
      console.log('🏠 Moon House:', birthChart.moonHouse);
      console.log('📊 Chart URL:', birthChart.chartUrl);
      console.log('📋 Full Birth Chart Data:', birthChart);
    } else {
      console.warn('⚠️ No birth chart data in response');
      console.warn('📦 Response keys:', Object.keys(data));
    }

    return { lat, lon, timezone: resultTimezone, formattedAddress, birthChart };
  } catch (error) {
    console.error('❌ Geocoding error:', error);
    throw error;
  }
};

/**
 * Get mock geocoding data for demonstration purposes
 * This is used when API key is not configured
 */
const getMockGeocodingData = (birthPlace: string): GeocodingResult => {
  // Simple mock data based on common locations
  const mockLocations: Record<string, GeocodingResult> = {
    'new york': { lat: 40.7128, lon: -74.0060, timezone: 'America/New_York', formattedAddress: 'New York, NY, USA' },
    'london': { lat: 51.5074, lon: -0.1278, timezone: 'Europe/London', formattedAddress: 'London, UK' },
    'tokyo': { lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo', formattedAddress: 'Tokyo, Japan' },
    'sydney': { lat: -33.8688, lon: 151.2093, timezone: 'Australia/Sydney', formattedAddress: 'Sydney, Australia' },
    'paris': { lat: 48.8566, lon: 2.3522, timezone: 'Europe/Paris', formattedAddress: 'Paris, France' },
    'los angeles': { lat: 34.0522, lon: -118.2437, timezone: 'America/Los_Angeles', formattedAddress: 'Los Angeles, CA, USA' },
    'toronto': { lat: 43.6532, lon: -79.3832, timezone: 'America/Toronto', formattedAddress: 'Toronto, Canada' },
    'mumbai': { lat: 19.0760, lon: 72.8777, timezone: 'Asia/Kolkata', formattedAddress: 'Mumbai, India' },
  };
  
  const lowerPlace = birthPlace.toLowerCase();
  
  // Try to find a match
  for (const [key, value] of Object.entries(mockLocations)) {
    if (lowerPlace.includes(key)) {
      console.log('📌 Using mock data for:', key);
      return value;
    }
  }
  
  // Default to UTC if no match found
  console.log('📌 No mock data found, using default UTC');
  return {
    lat: 0,
    lon: 0,
    timezone: 'UTC',
    formattedAddress: birthPlace
  };
};

