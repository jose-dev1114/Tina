import { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface LocationSuggestion {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
  };
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const LocationAutocomplete = ({ value, onChange, placeholder }: LocationAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions from Nominatim API (OpenStreetMap)
  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(query)}&` +
        `format=json&` +
        `addressdetails=1&` +
        `limit=5`,
        {
          headers: {
            'User-Agent': 'OurHealingPractices/1.0'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with debounce
  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    onChange(newValue);

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(newValue);
    }, 500);
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: LocationSuggestion) => {
    const city = suggestion.address.city || suggestion.address.town || suggestion.address.village || '';
    const state = suggestion.address.state || '';
    const country = suggestion.address.country || '';
    
    // Format: "City, State, Country" or "City, Country" if no state
    const formattedLocation = [city, state, country]
      .filter(Boolean)
      .join(', ');

    setInputValue(formattedLocation);
    onChange(formattedLocation);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Format display name for suggestions
  const formatDisplayName = (suggestion: LocationSuggestion) => {
    const parts = suggestion.display_name.split(', ');
    // Show first 4 parts for brevity
    return parts.slice(0, 4).join(', ');
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder || "e.g., New York, USA"}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-primary-300"
        />
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-500 animate-spin" />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-primary-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 flex items-start space-x-3"
            >
              <MapPin className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {formatDisplayName(suggestion)}
                </p>
                {(suggestion.address.state || suggestion.address.country) && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {[suggestion.address.state, suggestion.address.country]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;

