import React from 'react';
import { cn } from '@/lib/utils';

interface SnubbyMascotProps {
  mood?: 'neutral' | 'happy' | 'concerned' | 'excited';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

export function SnubbyMascot({ 
  mood = 'neutral', 
  size = 'md', 
  className,
  animated = false
}: SnubbyMascotProps) {
  // Size mapping
  const sizeClass = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  // Color mapping based on mood
  const colors = {
    neutral: {
      primary: '#ADFF6C',
      secondary: '#1A1A1A',
      accent: '#5FD35F'
    },
    happy: {
      primary: '#ADFF6C',
      secondary: '#1A1A1A',
      accent: '#5FD35F'
    },
    concerned: {
      primary: '#FFCC00',
      secondary: '#1A1A1A',
      accent: '#FF9900'
    },
    excited: {
      primary: '#C77DFF',
      secondary: '#1A1A1A',
      accent: '#9D4EDD'
    }
  };

  // Generate SVG for the mascot
  return (
    <div className={cn(
      "relative rounded-full overflow-hidden",
      sizeClass[size],
      animated && "transition-all duration-300",
      animated && mood === 'happy' && "animate-bounce",
      animated && mood === 'excited' && "animate-pulse",
      className
    )} 
    style={{ 
      backgroundColor: colors[mood].secondary,
      border: `2px solid ${colors[mood].primary}`
    }}>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Security elements in background */}
        <circle cx="70" cy="25" r="8" fill={colors[mood].primary} opacity="0.3" />
        <circle cx="25" cy="30" r="5" fill={colors[mood].primary} opacity="0.3" />
        
        {/* Lock icon */}
        <g transform="translate(50, 22) scale(0.8)">
          <circle 
            cx="0" 
            cy="0" 
            r="8" 
            stroke={colors[mood].primary} 
            strokeWidth="2.5" 
            fill="none" 
          />
          <rect 
            x="-3" 
            y="0" 
            width="6" 
            height="5" 
            fill={colors[mood].primary} 
            rx="1" 
          />
        </g>
        
        {/* Eyes */}
        <g transform={mood === 'concerned' ? "translate(0, 4)" : ""}>
          {/* Left eye */}
          <circle 
            cx="35" 
            cy="40" 
            r={mood === 'excited' ? "7" : "6"} 
            fill="white" 
            className={animated && mood === 'excited' ? "animate-pulse" : ""}
          />
          <circle 
            cx="35" 
            cy={mood === 'happy' ? "39" : "40"} 
            r="3" 
            fill="black" 
          />
          
          {/* Right eye */}
          <circle 
            cx="65" 
            cy="40" 
            r={mood === 'excited' ? "7" : "6"} 
            fill="white" 
            className={animated && mood === 'excited' ? "animate-pulse" : ""}
          />
          <circle 
            cx="65" 
            cy={mood === 'happy' ? "39" : "40"} 
            r="3" 
            fill="black" 
          />
        </g>
        
        {/* Mouth - changes based on mood */}
        {mood === 'neutral' && (
          <rect x="42" y="65" width="16" height="3" rx="1.5" fill="white" />
        )}
        
        {mood === 'happy' && (
          <path
            d="M40,65 Q50,75 60,65"
            stroke="white"
            strokeWidth="4"
            fill="none"
          />
        )}
        
        {mood === 'concerned' && (
          <path
            d="M40,68 Q50,62 60,68"
            stroke="white"
            strokeWidth="4"
            fill="none"
          />
        )}
        
        {mood === 'excited' && (
          <path
            d="M38,65 Q50,78 62,65"
            stroke="white"
            strokeWidth="5"
            fill="none"
          />
        )}
        
        {/* Shield element */}
        <path
          d="M50,85 L60,80 Q63,70 60,65 L50,70 L40,65 Q37,70 40,80 Z"
          fill={colors[mood].primary}
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

export default SnubbyMascot;