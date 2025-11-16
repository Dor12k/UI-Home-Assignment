

// File: FancyShape.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function FancyShape({ position = [0,0,0], scale = [1,1,1], color = "#5E40AF" }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      // סיבוב עדין של הצורה
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {/* צורה מרשימה */}
      <dodecahedronGeometry args={[0.5, 0]} />
      
      {/* חומר יפה עם מעט ברק */}
      <meshStandardMaterial
        color={color}
        metalness={0.5}
        roughness={0.2}
        flatShading={true} // נותן קווים ברורים בין הפאות
      />
    </mesh>
  );
}
