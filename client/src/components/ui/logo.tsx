// Use direct path to the public assets folder
const hackSnubLogo = "/assets/hacksnub-logo-transparent.png";

export function Logo({ className }: { className?: string }) {
  return (
    <img 
      src={hackSnubLogo} 
      alt="HackSnub Logo" 
      className={className} 
    />
  );
}

// Shield logo icon - SVG version matching brand style
export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {/* Shield outline */}
      <path 
        d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" 
        stroke="#ADFF6C" 
        strokeWidth="1.5" 
        fill="transparent"
      />
      {/* Hand inside shield */}
      <path 
        d="M13 9v2h-2V9h2m0-2h-2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-1 10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" 
        fill="#ADFF6C" 
      />
    </svg>
  );
}

export function LogoWithHand({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none">
      {/* Shield outline with transparent background */}
      <path d="M256 32L48 144v128c0 88.32 71.68 176 176 208 36.16-11.08 68.96-32.72 96-60.16 48.16-48.72 80-115.52 80-147.84V144L256 32z" stroke="#ADFF6C" strokeWidth="16" fill="transparent"/>
      {/* Hand symbol in lime green */}
      <path d="M371.8 144.6c-15.4 0-30 6-41 16.9l-13 13V136c0-22.1-17.9-40-40-40-12.1 0-22.9 5.4-30.3 13.9C239.9 91.5 226.8 80 211.5 80c-13.5 0-25.3 7.1-32 17.9-6.7-10.8-18.5-17.9-32-17.9-20.9 0-38 16.9-38 37.9v100.4l-18.9-25.4c-9.9-13.2-25.4-21-41.9-21-28.7 0-52 23.4-52 52.1 0 13.1 4.9 25.6 13.8 35.2l113.3 122.3c10.6 11.4 25.5 17.9 41.1 17.9h104c26.8 0 49.6-18.8 55-44.8l21.9-104.6c1.8-8.5 2.7-17.2 2.7-25.9v-48.4c0-17.7-14.3-32-32-32z" fill="#ADFF6C"/>
    </svg>
  );
}
