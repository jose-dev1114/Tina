import { useState, useEffect, useRef } from 'react';
import { Clock, Search, ChevronDown } from 'lucide-react';

// Complete list of IANA timezones with friendly labels
const allTimezones = [
  // UTC
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)', region: 'UTC' },
  
  // North America
  { value: 'America/New_York', label: 'Eastern Time (ET) - New York, Miami, Atlanta', region: 'North America' },
  { value: 'America/Chicago', label: 'Central Time (CT) - Chicago, Houston, Dallas', region: 'North America' },
  { value: 'America/Denver', label: 'Mountain Time (MT) - Denver, Phoenix, Salt Lake City', region: 'North America' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT) - Los Angeles, San Francisco, Seattle', region: 'North America' },
  { value: 'America/Anchorage', label: 'Alaska Time (AKT) - Anchorage, Juneau', region: 'North America' },
  { value: 'Pacific/Honolulu', label: 'Hawaii Time (HST) - Honolulu', region: 'North America' },
  { value: 'America/Phoenix', label: 'Arizona (No DST) - Phoenix, Tucson', region: 'North America' },
  { value: 'America/Detroit', label: 'Eastern Time - Detroit', region: 'North America' },
  { value: 'America/Indiana/Indianapolis', label: 'Eastern Time - Indianapolis', region: 'North America' },
  { value: 'America/Boise', label: 'Mountain Time - Boise', region: 'North America' },
  
  // Canada
  { value: 'America/Toronto', label: 'Eastern Time - Toronto, Ottawa, Montreal', region: 'Canada' },
  { value: 'America/Vancouver', label: 'Pacific Time - Vancouver, Victoria', region: 'Canada' },
  { value: 'America/Edmonton', label: 'Mountain Time - Edmonton, Calgary', region: 'Canada' },
  { value: 'America/Winnipeg', label: 'Central Time - Winnipeg', region: 'Canada' },
  { value: 'America/Halifax', label: 'Atlantic Time - Halifax', region: 'Canada' },
  { value: 'America/St_Johns', label: 'Newfoundland Time - St. Johns', region: 'Canada' },
  
  // Mexico & Central America
  { value: 'America/Mexico_City', label: 'Central Time - Mexico City, Guadalajara', region: 'Mexico & Central America' },
  { value: 'America/Tijuana', label: 'Pacific Time - Tijuana', region: 'Mexico & Central America' },
  { value: 'America/Cancun', label: 'Eastern Time - Cancun', region: 'Mexico & Central America' },
  { value: 'America/Guatemala', label: 'Central Time - Guatemala City', region: 'Mexico & Central America' },
  { value: 'America/Costa_Rica', label: 'Central Time - San José, Costa Rica', region: 'Mexico & Central America' },
  { value: 'America/Panama', label: 'Eastern Time - Panama City', region: 'Mexico & Central America' },
  
  // Caribbean
  { value: 'America/Havana', label: 'Cuba Time - Havana', region: 'Caribbean' },
  { value: 'America/Jamaica', label: 'Eastern Time - Kingston, Jamaica', region: 'Caribbean' },
  { value: 'America/Puerto_Rico', label: 'Atlantic Time - San Juan, Puerto Rico', region: 'Caribbean' },
  { value: 'America/Santo_Domingo', label: 'Atlantic Time - Santo Domingo', region: 'Caribbean' },
  
  // South America
  { value: 'America/Sao_Paulo', label: 'Brasilia Time - São Paulo, Rio de Janeiro', region: 'South America' },
  { value: 'America/Buenos_Aires', label: 'Argentina Time - Buenos Aires', region: 'South America' },
  { value: 'America/Santiago', label: 'Chile Time - Santiago', region: 'South America' },
  { value: 'America/Lima', label: 'Peru Time - Lima', region: 'South America' },
  { value: 'America/Bogota', label: 'Colombia Time - Bogotá, Medellín', region: 'South America' },
  { value: 'America/Caracas', label: 'Venezuela Time - Caracas', region: 'South America' },
  { value: 'America/La_Paz', label: 'Bolivia Time - La Paz', region: 'South America' },
  { value: 'America/Montevideo', label: 'Uruguay Time - Montevideo', region: 'South America' },
  { value: 'America/Guayaquil', label: 'Ecuador Time - Quito, Guayaquil', region: 'South America' },
  
  // Europe - Western
  { value: 'Europe/London', label: 'GMT/BST - London, Edinburgh, Dublin', region: 'Europe' },
  { value: 'Europe/Dublin', label: 'GMT/IST - Dublin, Ireland', region: 'Europe' },
  { value: 'Europe/Lisbon', label: 'WET - Lisbon, Portugal', region: 'Europe' },
  
  // Europe - Central
  { value: 'Europe/Paris', label: 'CET - Paris, Lyon, Marseille', region: 'Europe' },
  { value: 'Europe/Berlin', label: 'CET - Berlin, Munich, Frankfurt', region: 'Europe' },
  { value: 'Europe/Rome', label: 'CET - Rome, Milan, Naples', region: 'Europe' },
  { value: 'Europe/Madrid', label: 'CET - Madrid, Barcelona, Valencia', region: 'Europe' },
  { value: 'Europe/Amsterdam', label: 'CET - Amsterdam, Rotterdam', region: 'Europe' },
  { value: 'Europe/Brussels', label: 'CET - Brussels, Antwerp', region: 'Europe' },
  { value: 'Europe/Vienna', label: 'CET - Vienna, Salzburg', region: 'Europe' },
  { value: 'Europe/Zurich', label: 'CET - Zurich, Geneva', region: 'Europe' },
  { value: 'Europe/Stockholm', label: 'CET - Stockholm, Gothenburg', region: 'Europe' },
  { value: 'Europe/Oslo', label: 'CET - Oslo, Bergen', region: 'Europe' },
  { value: 'Europe/Copenhagen', label: 'CET - Copenhagen', region: 'Europe' },
  { value: 'Europe/Warsaw', label: 'CET - Warsaw, Krakow', region: 'Europe' },
  { value: 'Europe/Prague', label: 'CET - Prague, Brno', region: 'Europe' },
  { value: 'Europe/Budapest', label: 'CET - Budapest', region: 'Europe' },
  
  // Europe - Eastern
  { value: 'Europe/Athens', label: 'EET - Athens, Thessaloniki', region: 'Europe' },
  { value: 'Europe/Helsinki', label: 'EET - Helsinki', region: 'Europe' },
  { value: 'Europe/Bucharest', label: 'EET - Bucharest', region: 'Europe' },
  { value: 'Europe/Sofia', label: 'EET - Sofia', region: 'Europe' },
  { value: 'Europe/Kiev', label: 'EET - Kyiv, Kharkiv', region: 'Europe' },
  { value: 'Europe/Moscow', label: 'MSK - Moscow, St. Petersburg', region: 'Europe' },
  { value: 'Europe/Istanbul', label: 'TRT - Istanbul, Ankara', region: 'Europe' },
  
  // Middle East
  { value: 'Asia/Dubai', label: 'Gulf Time (GST) - Dubai, Abu Dhabi', region: 'Middle East' },
  { value: 'Asia/Riyadh', label: 'Arabia Time - Riyadh, Jeddah', region: 'Middle East' },
  { value: 'Asia/Tehran', label: 'Iran Time - Tehran', region: 'Middle East' },
  { value: 'Asia/Jerusalem', label: 'Israel Time - Jerusalem, Tel Aviv', region: 'Middle East' },
  { value: 'Asia/Beirut', label: 'Eastern European Time - Beirut', region: 'Middle East' },
  { value: 'Asia/Baghdad', label: 'Arabia Time - Baghdad', region: 'Middle East' },
  { value: 'Asia/Kuwait', label: 'Arabia Time - Kuwait City', region: 'Middle East' },
  { value: 'Asia/Qatar', label: 'Arabia Time - Doha', region: 'Middle East' },
  
  // South Asia
  { value: 'Asia/Kolkata', label: 'India Time (IST) - Mumbai, Delhi, Bangalore, Chennai', region: 'South Asia' },
  { value: 'Asia/Karachi', label: 'Pakistan Time - Karachi, Lahore, Islamabad', region: 'South Asia' },
  { value: 'Asia/Dhaka', label: 'Bangladesh Time - Dhaka', region: 'South Asia' },
  { value: 'Asia/Colombo', label: 'Sri Lanka Time - Colombo', region: 'South Asia' },
  { value: 'Asia/Kathmandu', label: 'Nepal Time - Kathmandu', region: 'South Asia' },
  
  // Southeast Asia
  { value: 'Asia/Bangkok', label: 'Indochina Time - Bangkok, Hanoi', region: 'Southeast Asia' },
  { value: 'Asia/Ho_Chi_Minh', label: 'Indochina Time - Ho Chi Minh City', region: 'Southeast Asia' },
  { value: 'Asia/Singapore', label: 'Singapore Time - Singapore', region: 'Southeast Asia' },
  { value: 'Asia/Kuala_Lumpur', label: 'Malaysia Time - Kuala Lumpur', region: 'Southeast Asia' },
  { value: 'Asia/Jakarta', label: 'Western Indonesia Time - Jakarta', region: 'Southeast Asia' },
  { value: 'Asia/Manila', label: 'Philippine Time - Manila', region: 'Southeast Asia' },
  
  // East Asia
  { value: 'Asia/Hong_Kong', label: 'Hong Kong Time - Hong Kong', region: 'East Asia' },
  { value: 'Asia/Shanghai', label: 'China Time - Shanghai, Beijing, Shenzhen', region: 'East Asia' },
  { value: 'Asia/Taipei', label: 'Taiwan Time - Taipei', region: 'East Asia' },
  { value: 'Asia/Tokyo', label: 'Japan Time - Tokyo, Osaka, Kyoto', region: 'East Asia' },
  { value: 'Asia/Seoul', label: 'Korea Time - Seoul, Busan', region: 'East Asia' },
  { value: 'Asia/Pyongyang', label: 'Korea Time - Pyongyang', region: 'East Asia' },
  
  // Australia & New Zealand
  { value: 'Australia/Sydney', label: 'AEST/AEDT - Sydney, Melbourne, Canberra', region: 'Australia & Pacific' },
  { value: 'Australia/Brisbane', label: 'AEST (No DST) - Brisbane', region: 'Australia & Pacific' },
  { value: 'Australia/Perth', label: 'AWST - Perth', region: 'Australia & Pacific' },
  { value: 'Australia/Adelaide', label: 'ACST/ACDT - Adelaide', region: 'Australia & Pacific' },
  { value: 'Australia/Darwin', label: 'ACST (No DST) - Darwin', region: 'Australia & Pacific' },
  { value: 'Australia/Hobart', label: 'AEST/AEDT - Hobart', region: 'Australia & Pacific' },
  { value: 'Pacific/Auckland', label: 'NZST/NZDT - Auckland, Wellington', region: 'Australia & Pacific' },
  { value: 'Pacific/Fiji', label: 'Fiji Time - Suva', region: 'Australia & Pacific' },
  
  // Africa
  { value: 'Africa/Cairo', label: 'Egypt Time - Cairo, Alexandria', region: 'Africa' },
  { value: 'Africa/Johannesburg', label: 'South Africa Time - Johannesburg, Cape Town', region: 'Africa' },
  { value: 'Africa/Lagos', label: 'West Africa Time - Lagos, Abuja', region: 'Africa' },
  { value: 'Africa/Nairobi', label: 'East Africa Time - Nairobi', region: 'Africa' },
  { value: 'Africa/Casablanca', label: 'Morocco Time - Casablanca, Rabat', region: 'Africa' },
  { value: 'Africa/Accra', label: 'GMT - Accra, Ghana', region: 'Africa' },
  { value: 'Africa/Addis_Ababa', label: 'East Africa Time - Addis Ababa', region: 'Africa' },
  { value: 'Africa/Algiers', label: 'CET - Algiers', region: 'Africa' },
  { value: 'Africa/Tunis', label: 'CET - Tunis', region: 'Africa' },
];

interface TimezoneAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TimezoneAutocomplete = ({ value, onChange, placeholder }: TimezoneAutocompleteProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredTimezones, setFilteredTimezones] = useState(allTimezones);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get selected timezone label
  const selectedTimezone = allTimezones.find(tz => tz.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter timezones based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTimezones(allTimezones);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allTimezones.filter(tz =>
      tz.label.toLowerCase().includes(query) ||
      tz.value.toLowerCase().includes(query) ||
      tz.region.toLowerCase().includes(query)
    );
    setFilteredTimezones(filtered);
  }, [searchQuery]);

  // Handle timezone selection
  const handleSelect = (tz: typeof allTimezones[0]) => {
    onChange(tz.value);
    setShowDropdown(false);
    setSearchQuery('');
  };

  // Group timezones by region
  const groupedTimezones = filteredTimezones.reduce((acc, tz) => {
    if (!acc[tz.region]) {
      acc[tz.region] = [];
    }
    acc[tz.region].push(tz);
    return acc;
  }, {} as Record<string, typeof allTimezones>);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Selected Value Display / Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setShowDropdown(!showDropdown);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-primary-300 bg-white text-left flex items-center justify-between"
      >
        <span className={selectedTimezone ? 'text-gray-900' : 'text-gray-400'}>
          {selectedTimezone ? selectedTimezone.label : (placeholder || 'Select your timezone')}
        </span>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
      </button>
      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-100 sticky top-0 bg-white">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search timezone or city..."
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Timezone List */}
          <div className="overflow-y-auto max-h-64">
            {filteredTimezones.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <Clock className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>No timezones found</p>
                <p className="text-sm">Try a different search term</p>
              </div>
            ) : (
              Object.entries(groupedTimezones).map(([region, tzList]) => (
                <div key={region}>
                  <div className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0">
                    {region}
                  </div>
                  {tzList.map((tz) => (
                    <button
                      key={tz.value}
                      type="button"
                      onClick={() => handleSelect(tz)}
                      className={`w-full px-4 py-3 text-left hover:bg-primary-50 transition-colors duration-150 border-b border-gray-50 flex items-center space-x-3 ${
                        value === tz.value ? 'bg-primary-50 border-l-4 border-l-primary-500' : ''
                      }`}
                    >
                      <Clock className={`h-4 w-4 flex-shrink-0 ${value === tz.value ? 'text-primary-600' : 'text-gray-400'}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate ${value === tz.value ? 'font-medium text-primary-700' : 'text-gray-700'}`}>
                          {tz.label}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{tz.value}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimezoneAutocomplete;

