

// // File: Cube.jsx
// import React, { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// export default function Cube() {
//   const meshRef = useRef();

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += 0.01;
//       meshRef.current.rotation.y += 0.01;
//     }
//   });

//   return (
//     <mesh ref={meshRef} position={[0, 0, 0]}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="#00ffff" wireframe />
//     </mesh>
//   );
// }



// File: Cube.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Cube({ position, scale, color, opacity, onRightClick }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      // meshRef.current.rotation.x += 0.01;
      // meshRef.current.rotation.y += 0.01;
    }
  });

  const handlePointerDown = (e) => {
    if (e.nativeEvent.button === 2) { // right click
        e.stopPropagation();
        onRightClick?.();
    }
  };  


  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      scale={scale} 
      onPointerDown={handlePointerDown} 
      >
      
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        transparent={opacity < 1}
        opacity={opacity}
      />

    </mesh>
  );
}

