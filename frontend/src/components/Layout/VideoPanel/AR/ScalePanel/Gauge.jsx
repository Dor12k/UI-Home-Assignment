

// File: Gauge.jsx
// ----------------------------------
// Gauge
// Half-circle sporty gauge component.
// Displays a value with a needle, colored scale, and smooth animation.
// Can be used for speed, angle, or other numeric metrics.

import React from "react";


export default function Gauge({ label, value = 0, max = 100, unit, size }) {

  const radius = size;
  const strokeWidth = 12;
  const center = radius + strokeWidth;
  const circumference = Math.PI * radius; // half-circle

  // Ensure value is a number
  const safeValue = isNaN(value) ? 0 : value;

  // Angle calculation (180° gauge)
  const angle = Math.min(safeValue / max, 1) * 180;
  const dashOffset = circumference - (angle / 180) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg
        width={2 * (radius + strokeWidth)}
        height={radius + strokeWidth + 30}
        className="overflow-visible"
      >
        {/* Background half-circle */}
        <path
          d={`
            M ${strokeWidth} ${center}
            A ${radius} ${radius} 0 0 1 ${2 * radius + strokeWidth} ${center}
          `}
          stroke="#1e2a3c"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
        />

        {/* Foreground arc (value) */}
        <path
          d={`
            M ${strokeWidth} ${center}
            A ${radius} ${radius} 0 0 1 ${2 * radius + strokeWidth} ${center}
          `}
          stroke="#00ffe0"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />

        {/* Needle */}
        <line
          x1={center}
          y1={center}
          x2={center + radius * Math.cos(Math.PI * (1 - safeValue / max))}
          y2={center - radius * Math.sin(Math.PI * (1 - safeValue / max))}
          stroke="#00cfff"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ transition: "x2 0.5s, y2 0.5s" }}
        />

        {/* Center circle */}
        <circle cx={center} cy={center} r={4} fill="#00ffe0" />
      </svg>

      {/* Label and value */}
      <div className="text-center mt-1 text-cyan-400 font-bold">
        {label}: {Math.round(safeValue)} {unit}
      </div>
    </div>
  );
};
