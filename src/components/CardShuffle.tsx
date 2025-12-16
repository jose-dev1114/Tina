import { useState, useEffect } from 'react';

const CardShuffle = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [nextCardIndex, setNextCardIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Generate array of card image paths
  const cards = Array.from({ length: 20 }, (_, i) =>
    `/img/card/Selfdiscovery cards 100final_pages-to-jpg-${String(i + 1).padStart(4, '0')}.jpg`
  );

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsAnimating(true);

      // Prepare next card
      setNextCardIndex((currentCardIndex + 1) % cards.length);

      // After animation completes, update current card
      setTimeout(() => {
        setCurrentCardIndex((prev) => (prev + 1) % cards.length);
        setIsAnimating(false);
      }, 1000);
    }, 5000); // Change card every 5 seconds - slower

    return () => clearInterval(interval);
  }, [cards.length, isPaused, currentCardIndex]);

  const handleCardClick = () => {
    if (isAnimating) return; // Prevent clicking during animation

    setIsPaused(true);
    setIsAnimating(true);

    // Prepare next card
    setNextCardIndex((currentCardIndex + 1) % cards.length);

    // After animation completes, update current card
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
      setIsAnimating(false);

      // Resume auto-play after 10 seconds of inactivity
      setTimeout(() => {
        setIsPaused(false);
      }, 10000);
    }, 1000);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4">
      {/* Card Stack - Background cards - Responsive sizing */}
      <div className="relative w-full max-w-[525px] h-[200px] sm:h-[250px] md:h-[300px]">
        {/* Stack of cards behind */}
        {[...Array(2)].map((_, i) => (
          <div
            key={`stack-${i}`}
            className="absolute inset-0 bg-white rounded-2xl shadow-2xl"
            style={{
              transform: `translateY(${(i + 1) * -10}px) translateX(${(i + 1) * -5}px) rotate(${(i + 1) * -2}deg)`,
              zIndex: 2 - i,
              opacity: 1 - (i + 1) * 0.2,
            }}
          />
        ))}

        {/* Next Card - Behind current card, comes forward during animation */}
        <div
          className={`absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-1000 ${
            isAnimating ? 'animate-card-rise' : ''
          }`}
          style={{
            zIndex: 5,
            transform: 'translateY(-10px) translateX(-5px)',
            opacity: 0.8
          }}
        >
          <img
            src={cards[nextCardIndex]}
            alt={`Self-discovery card ${nextCardIndex + 1}`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Current Active Card with shuffle animation - exits to the right */}
        <div
          className={`absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-1000 cursor-pointer hover:shadow-3xl ${
            isAnimating ? 'animate-card-shuffle' : ''
          }`}
          style={{ zIndex: 10 }}
          onClick={handleCardClick}
        >
          <img
            src={cards[currentCardIndex]}
            alt={`Self-discovery card ${currentCardIndex + 1}`}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary-200 rounded-full blur-xl animate-pulse" style={{ zIndex: 1 }} />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary-300 rounded-full blur-xl animate-pulse" style={{ zIndex: 1, animationDelay: '1s' }} />
      </div>

      {/* Card counter */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
        <p className="text-sm font-medium text-primary-700">
          Card {currentCardIndex + 1} of {cards.length}
        </p>
      </div> */}
    </div>
  );
};

export default CardShuffle;

