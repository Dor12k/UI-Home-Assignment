
// File: Rectangle.jsx

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Rectangle({ position = [0, 0, 0], scale = [1, 1, 1], color = "#00ffff", opacity = 1 }) {
  const meshRef = useRef();

  // Rotate around Z axis
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {/* Width: 1.5, Height: 0.8, Depth: 0.1 to make it flat like a rectangle */}
      <boxGeometry args={[1.1, 1.1, 3.1]} />
      <meshStandardMaterial 
        // color="#b87333"   // Copper color
        metalness={0.7} 
        roughness={0.6} 
        color={color}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}
