



// ---------------------------------------------------------------------------------------------------------------


// File: JoysticHover.jsx
// Modern AR Joystick Widget with glow, pulse, and side action buttons
// // Designed for Dark Mode interface with turquoise/blue accents

import React, { useState } from "react";
import "./JoystickWidget.css"; // We'll define styles separately

export default function JoystickWidget() {
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => setIsActive(true);
  const handleMouseUp = () => setIsActive(false);

  const handleMove = (e) => {
    if (!isActive) return;
    // Basic movement calculation
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2; // -1 to 1, inverted
    setJoystickPosition({ x, y });
  };

  return (
    <div className="joystick-wrapper">
      {/* Side Action Buttons */}
      <button className="action-btn">A</button>
      
      {/* Joystick Container */}
      <div
        className={`joystick-container ${isActive ? "active" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMove}
      >
        <div
          className="joystick-stick"
          style={{
            transform: `translate(${joystickPosition.x * 20}px, ${joystickPosition.y * 20}px)`,
          }}
        />
      </div>

      <button className="action-btn">B</button>
    </div>
  );
}
