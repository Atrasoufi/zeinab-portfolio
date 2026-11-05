import React from 'react';

interface NeonButterflyProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const NeonButterfly: React.FC<NeonButterflyProps> = ({
  className = '',
  size = 32,
  glow = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${glow ? 'animate-pulse-glow' : ''} ${className}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="neonButterflyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#FF85C0" />
          <stop offset="70%" stopColor="#F12D91" />
          <stop offset="100%" stopColor="#B84DFF" />
        </linearGradient>

        <linearGradient id="wingDetailGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B84DFF" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#F12D91" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
        </linearGradient>

        <filter id="neonButterflyGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#neonButterflyGlow)">
        {/* Left Upper Wing */}
        <path
          d="M24 20 C22 13 14 6 7 9 C2 11 3 20 10 24 C16 27 21 24 24 20 Z"
          fill="url(#neonButterflyGrad)"
          stroke="#FF85C0"
          strokeWidth="1.2"
        />
        {/* Left Inner Wing Detailing */}
        <path
          d="M19 19 C15 14 10 11 6 13 C4 15 5 20 11 22 C14 23 17 21 19 19 Z"
          fill="url(#wingDetailGrad)"
          opacity="0.8"
        />

        {/* Right Upper Wing */}
        <path
          d="M24 20 C26 13 34 6 41 9 C46 11 45 20 38 24 C32 27 27 24 24 20 Z"
          fill="url(#neonButterflyGrad)"
          stroke="#FF85C0"
          strokeWidth="1.2"
        />
        {/* Right Inner Wing Detailing */}
        <path
          d="M29 19 C33 14 38 11 42 13 C44 15 43 20 37 22 C34 23 31 21 29 19 Z"
          fill="url(#wingDetailGrad)"
          opacity="0.8"
        />

        {/* Left Lower Wing */}
        <path
          d="M23 23 C19 25 10 28 8 35 C7 39 12 41 16 38 C20 35 22 28 23 23 Z"
          fill="url(#neonButterflyGrad)"
          stroke="#F12D91"
          strokeWidth="1.1"
        />

        {/* Right Lower Wing */}
        <path
          d="M25 23 C29 25 38 28 40 35 C41 39 36 41 32 38 C28 35 26 28 25 23 Z"
          fill="url(#neonButterflyGrad)"
          stroke="#F12D91"
          strokeWidth="1.1"
        />

        {/* Slender Antennae */}
        <path
          d="M23 15 C20 10 16 6 12 7"
          stroke="#FF85C0"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="7" r="1.2" fill="#FFFFFF" />

        <path
          d="M25 15 C28 10 32 6 36 7"
          stroke="#FF85C0"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="36" cy="7" r="1.2" fill="#FFFFFF" />

        {/* Butterfly Body */}
        <ellipse cx="24" cy="24" rx="1.8" ry="8" fill="#FFFFFF" />
        <ellipse cx="24" cy="17" rx="2.2" ry="2.2" fill="#FF85C0" />
      </g>
    </svg>
  );
};
