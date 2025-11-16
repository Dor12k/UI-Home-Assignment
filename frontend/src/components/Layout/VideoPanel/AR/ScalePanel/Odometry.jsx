

// File: Odometry.jsx
// ----------------------------------
// OdometryDisplay
// Small wide digital-style display for odometry distance.
// Shows the value in meters with glowing turquoise text on a dark background.

import React from "react";

const OdometryDisplay = ({ value, unit = "m", width = 150, size }) => {

  // const height = width / 3;
  const height = size

  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: "#0a0f1c", // dark background
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 10px rgba(0, 255, 255, 0.6)", // subtle glow
        fontFamily: "monospace",
      }}
    >
      <span
        style={{
          color: "#00ffe0",
          fontSize: height / 2,
          fontWeight: "bold",
        }}
      >
        {Math.round(value)} {unit}
      </span>
    </div>
  );
};

export default OdometryDisplay;
