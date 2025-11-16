


import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DropPin({ position=[0,0,0], scale=[1,1,1], color="#00aaff", onRightClick }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 3) * 0.1; // bounce
  });

  
  const handlePointerDown = (e) => {
    if (e.nativeEvent.button === 2) { // right click
        e.stopPropagation();
        onRightClick?.();
    }
  };  


  return (
    <group ref={ref} position={position} scale={scale} onPointerDown={handlePointerDown} >
      {/* Sphere top */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Pointed cone bottom */}
      <mesh rotation={[-Math.PI, 0, 0]} position={[0, -0.1, 0]} castShadow>
        <coneGeometry args={[0.18, 0.4, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Optional glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <ringGeometry args={[0.15, 0.22, 32]} />
        <meshBasicMaterial color={color} opacity={0.6} transparent />
      </mesh>
    </group>
  );
}


