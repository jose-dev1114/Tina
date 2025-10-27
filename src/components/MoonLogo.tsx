interface MoonLogoProps {
  size?: number;
  className?: string;
}

const MoonLogo = ({ size = 40, className = "" }: MoonLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#f0e6ff" stopOpacity="1" />
        </linearGradient>
        <filter id="moonGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer glow circle */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#C0C9EE" strokeWidth="1" opacity="0.3" />

      {/* Main moon circle */}
      <circle cx="50" cy="50" r="42" fill="url(#moonGradient)" filter="url(#moonGlow)" />

      {/* Moon shadow/crater effect */}
      <circle cx="58" cy="42" r="8" fill="#E8E0F5" opacity="0.6" />
      <circle cx="52" cy="58" r="5" fill="#E8E0F5" opacity="0.4" />
      <circle cx="65" cy="55" r="4" fill="#E8E0F5" opacity="0.5" />

      {/* Subtle inner glow */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="#A2AADB" strokeWidth="0.5" opacity="0.2" />

      {/* Crescent highlight for depth */}
      <path
        d="M 35 30 Q 40 25 45 30"
        stroke="#ffffff"
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />

      {/* Stars around the moon */}
      <circle cx="20" cy="25" r="1.5" fill="#A2AADB" opacity="0.7" />
      <circle cx="80" cy="30" r="1" fill="#A2AADB" opacity="0.6" />
      <circle cx="75" cy="70" r="1.2" fill="#A2AADB" opacity="0.7" />
      <circle cx="25" cy="75" r="1" fill="#A2AADB" opacity="0.6" />

      {/* Decorative orbiting dots */}
      <circle cx="50" cy="15" r="1.5" fill="#C0C9EE" opacity="0.5" />
      <circle cx="85" cy="50" r="1.5" fill="#C0C9EE" opacity="0.5" />
      <circle cx="50" cy="85" r="1.5" fill="#C0C9EE" opacity="0.5" />
      <circle cx="15" cy="50" r="1.5" fill="#C0C9EE" opacity="0.5" />
    </svg>
  );
};

export default MoonLogo;

