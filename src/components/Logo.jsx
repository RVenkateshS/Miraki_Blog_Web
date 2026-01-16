import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div style={{ width }}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="mirakiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" /> {/* Blue-500 */}
            <stop offset="100%" stopColor="#8B5CF6" /> {/* Violet-500 */}
          </linearGradient>
        </defs>

        {/* The Main 'M' Shape - Modern & Geometric */}
        <path 
          d="M20 80 V 30 C 20 20 35 20 35 30 L 50 60 L 65 30 C 65 20 80 20 80 30 V 80" 
          stroke="url(#mirakiGradient)" 
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />

        {/* The 'Spark' Dot (Representing AI/Innovation) */}
        <circle cx="82" cy="20" r="6" fill="#F59E0B">
          <animate 
            attributeName="opacity" 
            values="1;0.5;1" 
            dur="2s" 
            repeatCount="indefinite" 
          />
        </circle>
      </svg>
    </div>
  )
}

export default Logo