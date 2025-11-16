

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Cone() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <coneGeometry args={[0.5, 1, 32]} />
      <meshStandardMaterial color="#ff4444" metalness={0.6} roughness={0.4} />
    </mesh>
  );
}
