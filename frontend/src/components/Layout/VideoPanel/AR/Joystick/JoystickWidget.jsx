/**
 * JoystickWidget.jsx
 * -----------------------------------------
 * A visually enhanced joystick widget.
 * Focus: Stunning UI design (Dark mode + Blue/Turquoise palette)
 * Logic kept minimal.
 */

// import { useRef, useState } from "react";

// export default function JoystickWidget({ featureParams, onChange  }) {

//   // 'Joystick Widget': { 
//   //     showJoystick: true,
//   //     design: "classic",
//   //     size: 150,
//   //     color: '#ff0000',
//   // },
  
//   // setJoystickCommand("Commands")
//   const size = featureParams['size']
//   // const color = featureParams['color']

//   const radius = size / 2;
//   const knobRadius = size * 0.23;

//   const areaRef = useRef(null);
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   const handleMove = (e) => {
//     const rect = areaRef.current.getBoundingClientRect();

//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//     const dx = clientX - (rect.left + radius);
//     const dy = clientY - (rect.top + radius);

//     const distance = Math.min(Math.sqrt(dx * dx + dy * dy), radius - knobRadius);
//     const angle = Math.atan2(dy, dx);

//     const newX = distance * Math.cos(angle);
//     const newY = distance * Math.sin(angle);

//     setPosition({ x: newX, y: newY });
//     // onChange({ x: newX, y: newY }); 
//     onChange({ speed: 444, angle: 333 }); 
//   };

//   const reset = () => setPosition({ x: 0, y: 0 });

//   return (
//     <div
//       ref={areaRef}
//       onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
//       onMouseUp={reset}
//       onMouseLeave={reset}
//       onTouchMove={handleMove}
//       onTouchEnd={reset}
//       style={{
//         width: size,
//         height: size,
//         borderRadius: "50%",
//         position: "relative",
//         background: `
//           radial-gradient(circle at 50% 50%, rgba(8, 35, 55, 0.9), #04121f 80%),
//           conic-gradient(from 0deg at 50% 50%, #0a324d, #0a465a 60%, #0a324d)
//         `,
//         border: "3px solid rgba(0, 180, 200, 0.25)",
//         boxShadow: `
//           0 0 25px rgba(0, 200, 255, 0.18),
//           inset 0 0 60px rgba(0, 140, 170, 0.25)
//         `,
//         cursor: "grab",
//         userSelect: "none",
//         touchAction: "none",
//         overflow: "hidden",
//       }}
//     >
//       {/* Decorative glowing rings */}
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           borderRadius: "50%",
//           border: "2px solid rgba(0, 200, 255, 0.12)",
//           boxShadow: "0 0 35px rgba(0, 200, 255, 0.15)",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           inset: "12%",
//           borderRadius: "50%",
//           border: "2px solid rgba(0, 200, 255, 0.08)",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           inset: "25%",
//           borderRadius: "50%",
//           border: "2px solid rgba(0, 200, 255, 0.05)",
//         }}
//       />

//       {/* Center glow */}
//       <div
//         style={{
//           position: "absolute",
//           left: "50%",
//           top: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "45%",
//           height: "45%",
//           borderRadius: "50%",
//           background: "radial-gradient(circle, rgba(0,180,200,0.12), transparent 70%)",
//           filter: "blur(10px)",
//         }}
//       />

//       {/* Joystick Knob */}
//       <div
//         style={{
//           width: knobRadius * 2,
//           height: knobRadius * 2,
//           borderRadius: "50%",
//           position: "absolute",
//           left: radius + position.x - knobRadius,
//           top: radius + position.y - knobRadius,
//           transition:
//             position.x === 0 && position.y === 0
//               ? "0.25s cubic-bezier(.14,.58,.42,1.39)"
//               : "none",
//           background: `
//             radial-gradient(circle at 30% 30%, #1ba6bb, #0b4c63 70%),
//             linear-gradient(145deg, rgba(0,160,190,0.2), rgba(0,100,120,0.1))
//           `,
//           border: "2px solid rgba(0,180,200,0.4)",
//           boxShadow: `
//             0 8px 18px rgba(0,0,0,0.65),
//             inset 0 0 20px rgba(0,180,200,0.35),
//             0 0 25px rgba(0,200,255,0.25)
//           `,
//         }}
//       />
//     </div>
//   );
// }




// ============================================================================================



/**
 * File: JoystickWidget.jsx
 * -----------------------------------------
 * Flexible Joystick Widget
 * - Computes linear & angular velocities for ROS2 Twist messages
 * - Can optionally move an augmented shape in AR
 * - Dark mode design with glowing knob
 */

import { useRef, useState } from "react";

export default function JoystickWidget({ featureParams, onJoystickChange, moveShapeFunc }) {
  // featureParams = featureParams['Joystick Widget']
  const joy = featureParams;

  const size = joy.size || 150;
  const radius = size / 2;
  const knobRadius = size * 0.23;
  const maxLinearSpeed = 3.0;  // m/s
  const maxAngularSpeed = 1.0; // rad/s

  const areaRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = areaRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - (rect.left + radius);
    const dy = clientY - (rect.top + radius);

    const distance = Math.min(Math.sqrt(dx * dx + dy * dy), radius - knobRadius);
    const angle = Math.atan2(dy, dx);

    const newX = distance * Math.cos(angle);
    const newY = distance * Math.sin(angle);
    setPosition({ x: newX, y: newY });

    // --- Convert to linear & angular velocity ---
    const linear = ( -newY / (radius - knobRadius) ) * maxLinearSpeed; // forward/back
    const angular = ( newX / (radius - knobRadius) ) * maxAngularSpeed; // left/right

    // Send to parent / server
    onJoystickChange({ linear: { x: linear }, angular: { z: angular } });

    // Move augmented shape if enabled
    if (joy.moveShape && moveShapeFunc) {
      moveShapeFunc(linear, angular);
      // console.log("moveShapeFunc - linear: ", linear, "angular: ", angular)
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    onJoystickChange?.({ linear: 0, angular: 0 });
    if (joy.moveShape && moveShapeFunc) moveShapeFunc(0, 0);
  };

  return (
    <div
      ref={areaRef}
      onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
      onMouseUp={reset}
      onMouseLeave={reset}
      onTouchMove={handleMove}
      onTouchEnd={reset}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        position: "relative",
        background: `
          radial-gradient(circle at 50% 50%, rgba(8, 35, 55, 0.9), #04121f 80%),
          conic-gradient(from 0deg at 50% 50%, #0a324d, #0a465a 60%, #0a324d)
        `,
        border: `3px solid ${joy.color || '#00b4c8'}55`,
        boxShadow: `
          0 0 25px rgba(0, 200, 255, 0.18),
          inset 0 0 60px rgba(0, 140, 170, 0.25)
        `,
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        overflow: "hidden",
      }}
    >
      {/* Decorative rings */}
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        border: "2px solid rgba(0, 200, 255, 0.12)",
        boxShadow: "0 0 35px rgba(0, 200, 255, 0.15)"
      }} />
      <div style={{
        position: "absolute",
        inset: "12%",
        borderRadius: "50%",
        border: "2px solid rgba(0, 200, 255, 0.08)"
      }} />
      <div style={{
        position: "absolute",
        inset: "25%",
        borderRadius: "50%",
        border: "2px solid rgba(0, 200, 255, 0.05)"
      }} />

      {/* Center glow */}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "45%",
        height: "45%",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,180,200,0.12), transparent 70%)",
        filter: "blur(10px)",
      }} />

      {/* Knob */}
      <div style={{
        width: knobRadius * 2,
        height: knobRadius * 2,
        borderRadius: "50%",
        position: "absolute",
        left: radius + position.x - knobRadius,
        top: radius + position.y - knobRadius,
        transition: position.x === 0 && position.y === 0
          ? "0.25s cubic-bezier(.14,.58,.42,1.39)"
          : "none",
        background: `
          radial-gradient(circle at 30% 30%, #1ba6bb, #0b4c63 70%),
          linear-gradient(145deg, rgba(0,160,190,0.2), rgba(0,100,120,0.1))
        `,
        border: "2px solid rgba(0,180,200,0.4)",
        boxShadow: `
          0 8px 18px rgba(0,0,0,0.65),
          inset 0 0 20px rgba(0,180,200,0.35),
          0 0 25px rgba(0,200,255,0.25)
        `
      }} />
    </div>
  );
}
