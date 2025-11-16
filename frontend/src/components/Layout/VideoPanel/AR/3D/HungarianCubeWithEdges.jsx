

// File: HungarianCubeWithEdges.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HungarianCubeWithEdges({ position = [0, 0, 0], scale = [1, 1, 1] }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      // Rotate the cube slightly on X and Y axis
      // groupRef.current.rotation.x += 0.01;
      // groupRef.current.rotation.y += 0.015;
    }
  });

  // Colors for each face (Hungarian flag inspired + extra colors)
  const faceColors = [
    "#FF0000", // red
    "#FFFFFF", // white
    "#008000", // green
    "#0000FF", // blue
    "#FFFF00", // yellow
    "#FFA500"  // orange
  ];

  // Rotation and position for each face
  const faces = [
    { rotation: [0, Math.PI, 0], position: [0, 0, -0.5] }, // back
    { rotation: [0, 0, 0], position: [0, 0, 0.5] },         // front
    { rotation: [0, -Math.PI / 2, 0], position: [-0.5, 0, 0] }, // left
    { rotation: [0, Math.PI / 2, 0], position: [0.5, 0, 0] },   // right
    { rotation: [-Math.PI / 2, 0, 0], position: [0, 0.5, 0] },  // top
    { rotation: [Math.PI / 2, 0, 0], position: [0, -0.5, 0] },  // bottom
  ];

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {faces.map((face, idx) => (
        <mesh key={idx} rotation={face.rotation} position={face.position}>
          {/* Plane for each face */}
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color={faceColors[idx]} metalness={0.3} roughness={0.3} />

          {/* Black edges for each face */}
          <lineSegments>
            <edgesGeometry attach="geometry" args={[new THREE.PlaneGeometry(1, 1)]} />
            <lineBasicMaterial attach="material" color="#000000" linewidth={1.5} />
          </lineSegments>
        </mesh>
      ))}
    </group>
  );
}
