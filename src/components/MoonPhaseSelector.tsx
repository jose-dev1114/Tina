import { useState, useEffect } from 'react';
import './MoonPhaseSelector.css';

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

export default function BreathingCircleAnimation() {
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('inhale');
  const [isAnimating, setIsAnimating] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);

  const breathCycle = {
    inhale: { duration: 4000, label: 'Inhale', instruction: 'Breathe in slowly' },
    hold: { duration: 4000, label: 'Hold', instruction: 'Hold your breath' },
    exhale: { duration: 4000, label: 'Exhale', instruction: 'Breathe out slowly' },
    rest: { duration: 2000, label: 'Rest', instruction: 'Natural pause' }
  };

  useEffect(() => {
    if (!isAnimating) return;

    const phases: BreathPhase[] = ['inhale', 'hold', 'exhale', 'rest'];
    let currentPhaseIndex = 0;

    const cycleBreath = () => {
      const phase = phases[currentPhaseIndex];
      setBreathPhase(phase);

      const timer = setTimeout(() => {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        if (currentPhaseIndex === 0) {
          setCycleCount(prev => prev + 1);
        }
        cycleBreath();
      }, breathCycle[phase].duration);

      return timer;
    };

    const timer = cycleBreath();
    return () => clearTimeout(timer);
  }, [isAnimating]);

  const getScaleValue = () => {
    switch (breathPhase) {
      case 'inhale':
        return 1.5;
      case 'hold':
        return 1.5;
      case 'exhale':
        return 0.8;
      case 'rest':
        return 0.8;
      default:
        return 1;
    }
  };

  const getOpacity = () => {
    switch (breathPhase) {
      case 'inhale':
        return 0.8;
      case 'hold':
        return 0.9;
      case 'exhale':
        return 0.5;
      case 'rest':
        return 0.4;
      default:
        return 0.5;
    }
  };

  return (
    <div className="relative w-full h-full min-h-96 flex items-center justify-center overflow-hidden">
      {/* Cosmic background with animated nebula */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 via-primary-600/10 to-primary-800/20 animate-gradient-shift" />

        {/* Floating cosmic particles */}
        {[...Array(20)].map((_, i) => (
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

      {/* Main breathing circle container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        {/* Breathing circle button */}
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full transition-all duration-1000 ease-in-out focus:outline-none hover:scale-105"
          style={{
            background: `radial-gradient(circle, rgba(168, 85, 247, ${getOpacity()}), rgba(139, 92, 246, ${getOpacity() * 0.5}))`,
            transform: `scale(${getScaleValue()})`,
            boxShadow: `0 0 60px rgba(168, 85, 247, ${getOpacity()}), inset 0 0 40px rgba(168, 85, 247, ${getOpacity() * 0.3})`,
            backdropFilter: 'blur(10px)',
            border: `2px solid rgba(168, 85, 247, ${getOpacity() * 0.6})`
          }}
        >
          {/* Outer glow rings */}
          <div className="absolute inset-0 rounded-full border border-primary-400/20 animate-spin-slow" />
          <div className="absolute inset-8 rounded-full border border-primary-500/15 animate-spin-reverse" />

          {/* Inner meditation circle */}
          <div className="absolute inset-12 rounded-full bg-gradient-to-br from-primary-600/30 to-primary-800/20 flex items-center justify-center backdrop-blur-md border border-primary-400/30">
            <div className="text-center pointer-events-none">
              <div className="text-6xl md:text-7xl mb-4 animate-float-gentle">🌙</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                {breathCycle[breathPhase].label}
              </h3>
              <p className="text-sm md:text-base text-primary-100 drop-shadow-md">
                {breathCycle[breathPhase].instruction}
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

