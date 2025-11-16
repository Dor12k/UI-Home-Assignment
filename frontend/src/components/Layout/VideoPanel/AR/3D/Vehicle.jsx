


// Vehicle.jsx
import React, { useRef, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Euler, Quaternion } from "three";

export default function Vehicle(
  {
      // position of the center
      position = [0, 0.5, 0],
      // scale (size)
      scale = [1, 1, 1],
      // optional manual rotation (Euler angles in degrees)
      rotationX = 0,
      rotationY = 0,
      rotationZ = 0,
      // rotation speeds in deg/s
      rotationSpeedX = 0,
      rotationSpeedY = 0,
      rotationSpeedZ = 0,
      // boolean flags
      rotation = [0, 0, 0],
      rotating = false,
      orientation = false, // whether to use odom.orientation
      // appearance
      color = "#556B2F",
      opacity = 1,
      // data from the vehicle
      gpsData = null,
      odomData = null
  }
){
  
  scale
  gpsData
  
  rotation
  rotationX
  rotationY
  rotationZ
  
  rotating
  

  const groupRef = useRef();
  const wheels = {
    FL: useRef(),
    FR: useRef(),
    BL: useRef(),
    BR: useRef(),
  };

  // Rotate vehicle and animate wheels
  useFrame(() => {
    if (groupRef.current) {
      // groupRef.current.rotation.y -= 0.005; // slow vehicle rotation

      // console.log("orientation: " , orientation)
      if(orientation && odomData && odomData.orientation) {

          if(odomData.orientation){
            // Rotate based on odomData ROS orientation (quaternion)
            const { x, y, z, w } = odomData.orientation;
            const quaternion = new Quaternion(x, y, z, w);
            const euler = new Euler().setFromQuaternion(quaternion, 'XYZ');   // Convert to Euler angles

            // Only apply yaw (turn left/right)
            // ROS Z-up -> Three.js Y-up: yaw (heading) is euler.z in ROS, map to rotation.y in Three.js
            groupRef.current.rotation.x = euler.y * 0;  // swap axes
            groupRef.current.rotation.y = euler.z * 100; // yaw
            groupRef.current.rotation.z = euler.x * 0;
            console.log("orentation z: " , groupRef.current.rotation.y)
          }
          
          // console.log("Error: No orientation field in odomData: ", odomData)
          
      } else {
          if(rotating){
            // Rotate manually based on user-defined rotation speeds
            groupRef.current.rotation.x -= rotationSpeedY / 1000;
            groupRef.current.rotation.y -= rotationSpeedZ / 1000;
            groupRef.current.rotation.z -= rotationSpeedX / 1000;

          }
          else{
            // Init values
            groupRef.current.rotation.x = 0;
            groupRef.current.rotation.y = 0;
            groupRef.current.rotation.z = 0;
            groupRef.current.rotation.set(0, 0, 0);
          }
      }

    }

    // Rotate each wheel forward (around Z axis)
    Object.values(wheels).forEach((wheel) => {
      if (wheel.current) {
        wheel.current.rotation.z -= 0.08;
      }
    });
  });

  // Helper to render a single wheel
  const Wheel = forwardRef(({ position }, ref) => (
    <group ref={ref} position={position}>
      {/* Black tire */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* White rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.02, 16, 100]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  ));

  return (
    <group ref={groupRef} position={position}>
      {/* Vehicle Body */}
      <mesh position={[0, 0, 0]} material-opacity={opacity} material-transparent={opacity < 1}>
        <boxGeometry args={[2, 0.5, 1]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} transparent={opacity < 1} opacity={opacity} />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 0.35, 0]} material-opacity={opacity} material-transparent={opacity < 1}>
        <boxGeometry args={[1, 0.3, 0.8]} />
        <meshStandardMaterial color="#335899" metalness={0.2} roughness={0.3} transparent={opacity < 1} opacity={opacity} />
      </mesh>

      {/* Wheels */}
      <Wheel ref={wheels.FL} position={[-0.8, -0.25, 0.45]} />
      <Wheel ref={wheels.FR} position={[0.8, -0.25, 0.45]} />
      <Wheel ref={wheels.BL} position={[-0.8, -0.25, -0.45]} />
      <Wheel ref={wheels.BR} position={[0.8, -0.25, -0.45]} />

      {/* Headlights */}
      <mesh position={[1.05, 0.05, 0.25]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="yellow" emissive="yellow" transparent={opacity < 1} opacity={opacity} />
      </mesh>
      <mesh position={[1.05, 0.05, -0.25]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="yellow" emissive="yellow" transparent={opacity < 1} opacity={opacity} />
      </mesh>
    </group>
  );
}







