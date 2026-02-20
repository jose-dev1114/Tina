import { useState } from 'react';

type CardState = 'idle' | 'shuffling' | 'revealed';

const CardShuffle = () => {
  const [cardState, setCardState] = useState<CardState>('idle');
  const [revealedCardIndex, setRevealedCardIndex] = useState<number | null>(null);

  // Card back image path
  const cardBackImage = '/img/card/Selfdiscovery cards 100final_pages-to-jpg-0001.jpg';

  // Generate array of card image paths (starting from 0002 since 0001 is the back)
  const cards = Array.from({ length: 19 }, (_, i) =>
    `/img/card/Selfdiscovery cards 100final_pages-to-jpg-${String(i + 2).padStart(4, '0')}.jpg`
  );

  const handleShuffle = () => {
    if (cardState === 'shuffling') return;

    setCardState('shuffling');
    setRevealedCardIndex(null);

    // After shuffle animation, reveal a random card
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * cards.length);
      setRevealedCardIndex(randomIndex);
      setCardState('revealed');
    }, 1500);
  };

  const handleDrawAgain = () => {
    setCardState('idle');
    setRevealedCardIndex(null);
  };

  // Card back component using the actual card back image
  const CardBack = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
    <div
      className={`rounded-2xl shadow-xl overflow-hidden border-4 border-white/90 ring-1 ring-primary-300/50 ${className}`}
      style={style}
    >
      <img
        src={cardBackImage}
        alt="Card back"
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  );

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
      {/* Card Stack Area - Landscape card proportions (width > height) */}
      <div className="relative w-[300px] sm:w-[360px] md:w-[420px] h-[200px] sm:h-[240px] md:h-[280px]">

        {/* Idle State - Show card deck */}
        {cardState === 'idle' && (
          <div
            className="absolute inset-0 cursor-pointer group"
            onClick={handleShuffle}
          >
            {/* Stack of card backs */}
            {[4, 3, 2, 1, 0].map((i) => (
              <CardBack
                key={`stack-${i}`}
                className="absolute inset-0 transition-all duration-500 ease-out group-hover:shadow-2xl"
                style={{
                  transform: `translateY(${i * -5}px) translateX(${i * -3}px) rotate(${(i - 2) * 3}deg)`,
                  zIndex: 5 - i,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              />
            ))}

            {/* Hover instruction */}
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <p className="text-sm text-primary-600 font-medium opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                ✨ Click to shuffle & draw
              </p>
            </div>
          </div>
        )}

        {/* Shuffling State - Animated cards */}
        {cardState === 'shuffling' && (
          <div className="absolute inset-0">
            {[0, 1, 2, 3, 4].map((i) => (
              <CardBack
                key={`shuffle-${i}`}
                className={`absolute inset-0 card-shuffle-${i}`}
                style={{
                  zIndex: 10 - i,
                  animation: `shuffle-dance 1.5s ease-in-out`,
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}

            {/* Shuffling text */}
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <p className="text-sm text-primary-600 font-medium animate-pulse">
                ✨ Shuffling...
              </p>
            </div>
          </div>
        )}

        {/* Revealed State - Show the drawn card */}
        {cardState === 'revealed' && revealedCardIndex !== null && (
          <div className="absolute inset-0 cursor-pointer group" onClick={handleDrawAgain}>
            {/* Revealed card with flip animation */}
            <div
              className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden animate-card-flip"
              style={{ zIndex: 10 }}
            >
              <img
                src={cards[revealedCardIndex]}
                alt={`Self-discovery card ${revealedCardIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Draw again instruction - centered overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                <p className="text-white font-medium text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 drop-shadow-lg">
                  ✨ Click to draw another ✨
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Floating decorative elements */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary-200/60 rounded-full blur-2xl animate-pulse" style={{ zIndex: -1 }} />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-primary-300/50 rounded-full blur-2xl animate-pulse" style={{ zIndex: -1, animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default CardShuffle;

