import { useState } from 'react';
import { Moon, Loader } from 'lucide-react';
import { calculateMoonPlacement, BirthData, AstroResult, getMoonSignDescription, getMoonElement } from '../services/astroApi';

interface MoonPlacementInputProps {
  onMoonDataReceived?: (data: AstroResult) => void;
}

export default function MoonPlacementInput({ onMoonDataReceived }: MoonPlacementInputProps) {
  const [birthData, setBirthData] = useState({
    year: new Date().getFullYear() - 30,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [moonData, setMoonData] = useState<AstroResult | null>(null);

  const handleInputChange = (field: string, value: string | number) => {
    setBirthData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? parseInt(value) : value
    }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await calculateMoonPlacement(birthData as BirthData);
      setMoonData(result);
      onMoonDataReceived?.(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate moon placement');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Input Form */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Moon className="h-5 w-5" />
          Your Birth Data
        </h3>

        <div className="space-y-4">
          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-primary-100 mb-2">
              Birth Year
            </label>
            <input
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={birthData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-primary-300"
            />
          </div>

          {/* Month */}
          <div>
            <label className="block text-sm font-medium text-primary-100 mb-2">
              Birth Month
            </label>
            <select
              value={birthData.month}
              onChange={(e) => handleInputChange('month', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-primary-300"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1} className="bg-primary-900">
                  {new Date(2000, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>

          {/* Day */}
          <div>
            <label className="block text-sm font-medium text-primary-100 mb-2">
              Birth Day
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={birthData.day}
              onChange={(e) => handleInputChange('day', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-primary-300"
            />
          </div>

          {/* Hour (Optional) */}
          <div>
            <label className="block text-sm font-medium text-primary-100 mb-2">
              Birth Hour (Optional)
            </label>
            <input
              type="number"
              min="0"
              max="23"
              value={birthData.hour}
              onChange={(e) => handleInputChange('hour', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-primary-300"
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Calculate Moon Placement
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* Results */}
      {moonData && (
        <div className="bg-gradient-to-br from-primary-600/30 to-primary-800/20 backdrop-blur-md rounded-2xl p-6 border border-primary-400/30">
          <h4 className="text-lg font-bold text-white mb-4">Your Moon Placement</h4>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-primary-100">Moon Sign:</span>
              <span className="text-xl font-bold text-primary-200">{moonData.moonSign}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-primary-100">Element:</span>
              <span className="text-primary-200">{getMoonElement(moonData.moonSign)}</span>
            </div>

            {moonData.moonPlacement.moonDegree && (
              <div className="flex justify-between items-center">
                <span className="text-primary-100">Degree:</span>
                <span className="text-primary-200">{moonData.moonPlacement.moonDegree.toFixed(2)}°</span>
              </div>
            )}

            <p className="text-sm text-primary-100 mt-4 italic">
              {getMoonSignDescription(moonData.moonSign)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

