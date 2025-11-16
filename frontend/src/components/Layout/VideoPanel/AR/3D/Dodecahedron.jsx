

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Dodecahedron() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#4444ff" metalness={0.7} roughness={0.3} />
    </mesh>
  );
}
