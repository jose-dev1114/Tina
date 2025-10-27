interface OrganicShapeProps {
  variant?: 'hero' | 'section' | 'accent';
  className?: string;
}

const OrganicShapes = ({ variant = 'section', className = '' }: OrganicShapeProps) => {
  const shapes = {
    hero: (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Main flowing shape - inspired by Chico's hero */}
        <svg
          className="absolute -top-20 -right-20 w-[800px] h-[600px] opacity-60"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200 50C350 20 450 80 600 120C750 160 800 250 750 350C700 450 550 480 400 450C250 420 100 350 80 250C60 150 50 80 200 50Z"
            fill="url(#heroGradient1)"
            className="animate-float"
          />
          <defs>
            <linearGradient id="heroGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EBD6FB" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#C0C9EE" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#A2AADB" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Secondary accent shape */}
        <svg
          className="absolute -bottom-10 -left-20 w-[600px] h-[400px] opacity-40"
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 300C200 280 300 320 450 300C600 280 650 200 600 120C550 40 400 20 250 50C100 80 50 150 70 220C90 290 50 320 100 300Z"
            fill="url(#heroGradient2)"
            className="animate-pulse-slow"
          />
          <defs>
            <linearGradient id="heroGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C0C9EE" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#A2AADB" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Small floating elements */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-primary-100 rounded-full opacity-60 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-primary-100 rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-primary-200 rounded-full opacity-40 animate-pulse-slow"></div>
      </div>
    ),

    section: (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <svg
          className="absolute top-0 right-0 w-[400px] h-[300px] opacity-30"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M300 50C350 70 380 120 360 170C340 220 280 240 220 220C160 200 120 150 140 100C160 50 250 30 300 50Z"
            fill="url(#sectionGradient)"
          />
          <defs>
            <linearGradient id="sectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EBD6FB" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#C0C9EE" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),

    accent: (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <svg
          className="absolute -top-10 -left-10 w-[200px] h-[200px] opacity-20"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="url(#accentGradient)"
            className="animate-pulse-slow"
          />
          <defs>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EBD6FB" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#A2AADB" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  };

  return shapes[variant];
};

export default OrganicShapes;
