import hackSnubLogo from "@assets/ChatGPT Image Apr 4, 2025, 07_42_12 PM.png";

export function Logo({ className }: { className?: string }) {
  return (
    <img 
      src={hackSnubLogo} 
      alt="HackSnub Logo" 
      className={className} 
    />
  );
}

// Shield logo with hand - SVG version as fallback
export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm1-8h-2V7h2v2z"/>
    </svg>
  );
}

export function LogoWithHand({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none">
      <path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32z" fill="#1A1A1A"/>
      <path d="M371.8 144.6c-15.4 0-30 6-41 16.9l-13 13V136c0-22.1-17.9-40-40-40-12.1 0-22.9 5.4-30.3 13.9C239.9 91.5 226.8 80 211.5 80c-13.5 0-25.3 7.1-32 17.9-6.7-10.8-18.5-17.9-32-17.9-20.9 0-38 16.9-38 37.9v100.4l-18.9-25.4c-9.9-13.2-25.4-21-41.9-21-28.7 0-52 23.4-52 52.1 0 13.1 4.9 25.6 13.8 35.2l113.3 122.3c10.6 11.4 25.5 17.9 41.1 17.9h104c26.8 0 49.6-18.8 55-44.8l21.9-104.6c1.8-8.5 2.7-17.2 2.7-25.9v-48.4c0-17.7-14.3-32-32-32z" fill="#ADFF6C"/>
    </svg>
  );
}
