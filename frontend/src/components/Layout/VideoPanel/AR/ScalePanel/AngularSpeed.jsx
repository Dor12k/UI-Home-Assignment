



// File: AngularSpeed.jsx
// ----------------------------------
// AngularSpeed
// Gauge-style component for angular speed (rad/sec or deg/sec).
// Small sporty dial with needle and glowing scale to indicate rotation velocity.

import React from "react";

const AngularSpeed = ({ value = 0, size = 80, label = "Angular Speed" }) => {
  const center = size / 2;
  const radius = center - 10;

  // Convert angular speed to radians for visualization (normalize to max 360 deg/sec)
  const maxVal = 360;
  const angle = Math.min(value / maxVal, 1) * 180; // half-circle
  const dashOffset = Math.PI * radius - (angle / 180) * Math.PI * radius;

  return (
    <div className="flex flex-col items-center p-2">
      <svg width={size} height={size / 2 + 20} className="overflow-visible">
        {/* Background half-circle */}
        <path
          d={`
            M 10 ${center}
            A ${radius} ${radius} 0 0 1 ${size - 10} ${center}
          `}
          stroke="#1e2a3c"
          strokeWidth="6"
          fill="transparent"
          strokeLinecap="round"
        />

        {/* Foreground arc */}
        <path
          d={`
            M 10 ${center}
            A ${radius} ${radius} 0 0 1 ${size - 10} ${center}
          `}
          stroke="#00cfff"
          strokeWidth="6"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={Math.PI * radius}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />

        {/* Needle */}
        <line
          x1={center}
          y1={center}
          x2={center + radius * Math.cos(Math.PI * (1 - value / maxVal))}
          y2={center - radius * Math.sin(Math.PI * (1 - value / maxVal))}
          stroke="#00ffe0"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ transition: "x2 0.5s, y2 0.5s" }}
        />

        {/* Center */}
        <circle cx={center} cy={center} r={4} fill="#00ffe0" />
      </svg>

      <div className="text-center mt-1 text-cyan-400 font-bold">
        {label}: {Math.round(value)}°/s
      </div>
    </div>
  );
};

export default AngularSpeed;
