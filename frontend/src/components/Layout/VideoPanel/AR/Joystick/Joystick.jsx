


// ============================================================================
// File: Joystick.jsx
// Simple virtual joystick widget.
// - Displays a big circle (base) and a small circle (handle)
// - User can drag the handle inside the base
// - Emits { x, y } values in range [-1, 1]
// - Prints values to console (can be replaced later)
// ============================================================================

import React, { useRef, useState } from "react";

export default function Joystick() {
  const baseRef = useRef(null);
  const [handlePos, setHandlePos] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);

    const base = baseRef.current;
    const rect = base.getBoundingClientRect();
    const center = { x: rect.width / 2, y: rect.height / 2 };
    const radius = rect.width / 2;

    const move = (ev) => {
      const dx = ev.clientX - rect.left - center.x;
      const dy = ev.clientY - rect.top - center.y;

      // Limit movement to circle radius
      const dist = Math.sqrt(dx * dx + dy * dy);
      const limit = Math.min(dist, radius);

      const angle = Math.atan2(dy, dx);

      const clampedX = Math.cos(angle) * limit;
      const clampedY = Math.sin(angle) * limit;

      setHandlePos({ x: clampedX, y: clampedY });

      // Normalize output to [-1, 1]
      const output = {
        x: clampedX / radius,
        y: clampedY / radius * -1, // invert y (up = positive)
      };

      console.log("Joystick output:", output);
    };

    const end = () => {
      e.target.releasePointerCapture(e.pointerId);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);

      // Return handle to center
      setHandlePos({ x: 0, y: 0 });
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
  };

  return (
    <div
      ref={baseRef}
      onPointerDown={handlePointerDown}
      className="w-32 h-32 bg-gray-700 rounded-full relative select-none"
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
      }}
    >
      {/* Handle */}
      <div
        className="w-12 h-12 bg-blue-400 rounded-full absolute"
        style={{
          transform: `translate(${handlePos.x + 64 - 24}px, ${handlePos.y + 64 - 24}px)`,
        }}
      ></div>
    </div>
  );
}
