interface WaveTopProps {
  fillColor?: string;
  className?: string;
  variant?: 'default' | 'white' | 'ethereal-50' | 'blush' | 'lavender';
}

const WaveTop = ({
  fillColor,
  className = "",
  variant = 'default'
}: WaveTopProps) => {
  // Predefined color variants that match your theme
  const colorVariants = {
    'default': '#fffcf9',
    'white': '#ffffff',
    'ethereal-50': '#f8fafc',
    'blush': '#FEEBF6',
    'lavender': '#EBD6FB'
  };

  const finalFillColor = fillColor || colorVariants[variant];
  return (
    <div className={`absolute top-0 left-0 w-full overflow-hidden ${className}`}>
      <svg
        className="relative block w-full h-auto"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 1917.4 165.2"
        preserveAspectRatio="none"
        style={{ transform: 'rotate(180deg)' }}
      >
        <g>
          <path
            fill={finalFillColor}
            d="M1920.1,118.2c0,15.7,0,31.3,0,47c-640,0-1280,0-1920,0c0-26.3,0-52.7,0-79c0.9-0.3,1.9-0.7,2.8-1
            C101,53.2,201.6,32.4,303.7,18.3C363.5,10.1,423.5,5.1,483.9,3C587.1-0.6,689.7,4.6,791.7,21c79.7,12.8,158.1,31.5,233.7,59.7
            c94.2,35.2,191.2,58.3,290.9,70.2c61.8,7.4,123.8,10.7,186,10.8c70,0.1,139.9-3.4,209.5-11.5c37.7-4.3,75.4-9.3,112.9-15.1
            C1856.7,130.4,1888.3,124,1920.1,118.2z"
          />
        </g>
      </svg>
    </div>
  );
};

export default WaveTop;
