


// File: Shpere.jsx

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Sphere() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#00ffcc" metalness={0.7} roughness={0.3} />
    </mesh>
  );
}
