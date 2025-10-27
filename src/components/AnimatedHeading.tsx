import { useState, useEffect } from 'react';

interface AnimatedHeadingProps {
  staticText: string;
  animatedWords: string[];
  className?: string;
}

const AnimatedHeading = ({ 
  staticText, 
  animatedWords,
  className = ""
}: AnimatedHeadingProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000); // Change word every 4 seconds

    return () => clearInterval(interval);
  }, [animatedWords.length]);

  return (
    <h1 className={`text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-800 mb-6 leading-tight ${className}`}>
      {staticText}
      <span className="block relative h-auto overflow-visible">
        <span
          className={`inline-block text-primary-500 font-serif font-bold transition-all duration-300 whitespace-nowrap ${
            isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
          }`}
        >
          {animatedWords[currentWordIndex]}.
        </span>
      </span>
    </h1>
  );
};

export default AnimatedHeading;

