

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Torus() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[0.5, 0.2, 16, 100]} />
      <meshStandardMaterial color="#ff9900" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}
