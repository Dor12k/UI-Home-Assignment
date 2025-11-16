

// File: Compass.jsx
// ----------------------------------
// Compass
// Circular compass-style component for yaw / heading angle.
// Shows the vehicle’s orientation with a rotating needle on a dark background.

import React from "react";

const Compass = ({ value = 0, size = 100, label = "Heading" }) => {
  const center = size / 2;
  const radius = center - 10;

  // Convert degrees to radians for SVG rotation
  const angleRad = (value - 90) * (Math.PI / 180); // Subtract 90 to point up

  const x2 = center + radius * Math.cos(angleRad);
  const y2 = center + radius * Math.sin(angleRad);

  return (
    <div className="flex flex-col items-center p-2">
      <svg width={size} height={size}>
        {/* Circle */}
        <circle cx={center} cy={center} r={radius} stroke="#1e2a3c" strokeWidth="4" fill="transparent"/>
        
        {/* Needle */}
        <line
          x1={center}
          y1={center}
          x2={x2}
          y2={y2}
          stroke="#00ffe0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        {/* Center */}
        <circle cx={center} cy={center} r={4} fill="#00ffe0"/>
      </svg>
      <div className="text-center mt-1 text-cyan-400 font-bold">
        {label}: {Math.round(value)}°
      </div>
    </div>
  );
};

export default Compass;
