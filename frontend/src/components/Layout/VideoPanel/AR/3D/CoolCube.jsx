


// File: CoolCube.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CoolCube({ position = [0,0,0], scale = [1,1,1], color = "#5E40AF" }) {
  const meshRef = useRef();
  const edgesRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
        
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
    if (edgesRef.current) {
        
      edgesRef.current.material.color.offsetHSL(0.001, 0, 0);
    }
  });

  return (
    <group position={position} scale={scale}>
        
      <mesh ref={meshRef}>
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.1}
          
        />
      </mesh>


      <lineSegments ref={edgesRef}>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1,1,1)]} />
        <lineBasicMaterial attach="material" color={color} linewidth={2} />
      </lineSegments>
    </group>
  );
}
