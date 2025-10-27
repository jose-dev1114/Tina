import { useState } from 'react';
import BreathingCircleAnimation from './MoonPhaseSelector';
import MoonPlacementInput from './MoonPlacementInput';
import { AstroResult } from '../services/astroApi';

/**
 * Combined component that shows:
 * 1. Moon placement input form
 * 2. Breathing circle animation
 * 3. Moon data display
 */
export default function BreathingCircleWithMoonData() {
  const [moonData, setMoonData] = useState<AstroResult | null>(null);
  const [showBreathingCircle, setShowBreathingCircle] = useState(false);

  const handleMoonDataReceived = (data: AstroResult) => {
    setMoonData(data);
    setShowBreathingCircle(true);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary-300 via-primary-400 to-primary-500">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full animate-float-particle"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: `rgba(${Math.random() > 0.5 ? '168, 85, 247' : '139, 92, 246'}, ${Math.random() * 0.6 + 0.3})`,
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 8 + 8 + 's'
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12">
        {!showBreathingCircle ? (
          // Input Form View
          <div className="flex flex-col items-center justify-center min-h-96">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                🌙 Discover Your Moon
              </h1>
              <p className="text-xl text-white/90 drop-shadow-md">
                Enter your birth date to calculate your moon placement and begin your meditative journey
              </p>
            </div>

            <MoonPlacementInput onMoonDataReceived={handleMoonDataReceived} />
          </div>
        ) : (
          // Breathing Circle View
          <div className="space-y-12">
            {/* Moon Data Display */}
            {moonData && (
              <div className="text-center">
                <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h2 className="text-3xl font-bold text-white mb-6">Your Cosmic Blueprint</h2>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Sun Sign */}
                    <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-xl p-6 border border-yellow-400/30">
                      <div className="text-4xl mb-2">☉</div>
                      <p className="text-sm text-white/70 mb-2">Sun Sign</p>
                      <p className="text-2xl font-bold text-yellow-200">{moonData.sunSign}</p>
                    </div>

                    {/* Moon Sign */}
                    <div className="bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-xl p-6 border border-purple-400/30">
                      <div className="text-4xl mb-2">☽</div>
                      <p className="text-sm text-white/70 mb-2">Moon Sign</p>
                      <p className="text-2xl font-bold text-purple-200">{moonData.moonSign}</p>
                    </div>

                    {/* Rising Sign */}
                    <div className="bg-gradient-to-br from-pink-400/20 to-rose-500/20 rounded-xl p-6 border border-pink-400/30">
                      <div className="text-4xl mb-2">↑</div>
                      <p className="text-sm text-white/70 mb-2">Rising Sign</p>
                      <p className="text-2xl font-bold text-pink-200">
                        {moonData.risingSign || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Moon Details */}
                  {moonData.moonPlacement && (
                    <div className="bg-white/5 rounded-lg p-4 mb-6">
                      <p className="text-sm text-white/70 mb-2">Moon Placement Details</p>
                      <div className="grid grid-cols-2 gap-4 text-left">
                        {moonData.moonPlacement.moonDegree && (
                          <div>
                            <span className="text-white/60">Degree:</span>
                            <p className="text-white font-semibold">
                              {moonData.moonPlacement.moonDegree.toFixed(2)}°
                            </p>
                          </div>
                        )}
                        {moonData.moonPlacement.moonHouse && (
                          <div>
                            <span className="text-white/60">House:</span>
                            <p className="text-white font-semibold">
                              House {moonData.moonPlacement.moonHouse}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setShowBreathingCircle(false)}
                    className="text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    ← Change Birth Date
                  </button>
                </div>
              </div>
            )}

            {/* Breathing Circle */}
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <BreathingCircleAnimation />
              </div>
            </div>

            {/* Meditation Guidance */}
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Begin Your Practice</h3>
              <p className="text-white/80 mb-6">
                Click the breathing circle to start your meditative journey. Align your breath with the lunar rhythm 
                and let your {moonData?.moonSign} Moon guide you to deeper peace and self-discovery.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                  Start Meditation
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 border border-white/40">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

