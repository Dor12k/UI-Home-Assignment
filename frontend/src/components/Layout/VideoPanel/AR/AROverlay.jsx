
import { useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

// === Import your shapes ===

import Cube from "../AR/3D/Cube";
import DropPin from '../AR/3D/DropPin';
import Vehicle from "../AR/3D/Vehicle";
import Rectangle from "../AR/3D/Rectangle";
import MainPanel from "../AR/ScalePanel/MainPanel";
import JoystickHover from "../AR/Joystick/JoystickHover";
import JoystickWidget from '../AR/Joystick/JoystickWidget';
import HungarianCubeWithEdges from '../AR/3D/HungarianCubeWithEdges';




// === Map sidebar feature → component mapping ===
const featureComponents = {
  "Augmented Shape": Vehicle,
  "Mouse Control": Cube, // HungarianCubeWithEdges
  "Pointer 3D": DropPin,
  "Joystick Widget": null,
  "Dashboard Information": null,
};


export default function AROverlay({ canvasRef, gpsData, odomData, clickedPoints, modes, featureParams, onJoystickChange }) {

    const [objects, setObjects] = useState([]);
    const [mouseShapePos, setMouseShapePos] = useState(null);
    const [activeFeatures, setActiveFeatures] = useState([]); // Update active feature-based shapes (not clickable ones)
    const [selectedObjectIndex, setSelectedObjectIndex] = useState(null);

    gpsData,
    odomData,
    canvasRef,
    clickedPoints,
    setMouseShapePos
    selectedObjectIndex
    setSelectedObjectIndex



    // ========= Update active features =====================
    useEffect(() => {
        if (!modes.ARMode) {
            setActiveFeatures([]);
            return;
        }

        // Update new object feature 
        const newFeatures = Object.keys(modes.features)
            .filter((key) => modes.features[key])
                .map((key) => {
                    const params = featureParams[key];
                    const Component = featureComponents[key];
                    if (!Component) return null;

                    // Handle Augmented Shape
                    if (key === "Augmented Shape") {

                        // Conver values from camera to screen
                        const screenPos = [params.y || 0, params.z || 0, params.x || 0]; // camera → screen
                        return {
                            key,
                            component: Component,
                            props: {
                                position: screenPos,
                                scale: [params?.w || 1, params?.h || 1, params?.d || 1],
                                orientation: params.orientation,
                                rotating: params.rotating,
                                // rotation: [0,0,0], // can use odomData.orientation if needed
                                rotationX: params.rotationX, 
                                rotationY: params.rotationY, 
                                rotationZ: params.rotationZ,
                                rotationSpeedX: params.rotationSpeedX, 
                                rotationSpeedY: params.rotationSpeedY, 
                                rotationSpeedZ: params.rotationSpeedZ,
                                rotation: [params.rotationX, params.rotationY, params.rotationZ], // can use odomData.orientation if needed
                                color: params?.color || "#30E0C0",
                                opacity: params?.opacity ?? 1,
                                odomData: odomData,
                                gpsData: gpsData
                            },
                        };
                    }
                    
                    // Handle Mouse Control separately
                    if (key === "Mouse Control") {

                        if (!mouseShapePos) return null;
                            return {
                                key,
                                component: Component,
                                props: {
                                position: mouseShapePos,
                                scale: [params?.w || 1, params?.h || 1, params?.d || 1],
                                rotation: [0, 0, 0],
                                color: params?.color || "#5E40AF",
                                opacity: params?.opacity ?? 1,
                                },
                            };
                    }

                    // Handle Pointer 3D
                    if (key === "Pointer 3D") {
                        if (!mouseShapePos) return null;
                        
                        return {
                            key,
                            component: Component,
                            props: {
                                position: mouseShapePos || [0, 0, 0],
                                scale: [params?.w || 1, params?.h || 1, params?.d || 1],
                                rotation: [0, 0, 0],
                                color: params?.color || "#32CD32",
                                opacity: params?.opacity ?? 1,
                            },
                        };
                    }

                    if (key == "Joystick Widget"){
                        console.log("Joystick Widget: ", )
                    }

                    if (key == "Dashboard Information"){
                        console.log("Dashboard Information: ", )
                    }

                    return null;
        })
        .filter(Boolean);

        setActiveFeatures(newFeatures);
    }, [modes, featureParams, mouseShapePos, objects, odomData, gpsData]);

    // Prevents the default context menu (right-click) from appearing on the AR overlay container.
    useEffect(() => {
        const preventContext = (e) => e.preventDefault();
        document.addEventListener("contextmenu", preventContext);
        return () => document.removeEventListener("contextmenu", preventContext);
    }, []);

    // Click on AR Overlay
    const handleOverlayClick = useCallback(
        (e) => {
            
            // Only add objects if Pointer 3D or Mouse Control is ON
            if ((!modes.features["Pointer 3D"] && !modes.features["Mouse Control"]) )
                return;

            // Only allow drawing if Mouse Control or Pointer 3D are active
            const isMouse = modes.features["Mouse Control"];
            const isPointer = modes.features["Pointer 3D"];

            if (!isMouse && !isPointer) return;

            // Select the correct drawing mode 
            let activeKey = null;
            if (isMouse) activeKey = "Mouse Control";
            else if (isPointer) activeKey = "Pointer 3D";

            if (!activeKey) return;

            const rect = e.target.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2(x, y);

            const camera = window._threeCamera;
            const scene = window._threeScene;
            scene

            raycaster.setFromCamera(mouse, camera);

            const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
            const point = new THREE.Vector3();
            raycaster.ray.intersectPlane(plane, point);

            const params = featureParams[activeKey];

            // Add object feature to activeFeatures
            if(modes.features["Mouse Control"]){

                // Update mouseShapePos for Mouse Control feature
                setActiveFeatures((prev) => {
                    const clickPos = [point.x, point.y, point.z];
                    
                    const newFeature = {
                        key: "Mouse Control",
                        component: featureComponents["Mouse Control"],
                        props: {
                            position: clickPos,
                            scale: [params?.w || 1, params?.h || 1, params?.d || 1],
                            rotation: [0,0,0],
                            color: params?.color || "#30E0C0",
                            opacity: params?.opacity ?? 1
                        }
                    };

                    return [
                        ...(prev ?? []).filter(f => f.key !== "Mouse Control"), // Set null if prev is empty
                        newFeature
                    ];
                });

            }
        
            // Add object feature to activeFeatures
            if(modes.features["Pointer 3D"]){

                // Update mouseShapePos for Mouse Control feature
                setActiveFeatures((prev) => {
                    const clickPos = [point.x, point.y, point.z];
                    
                    const newFeature = {
                        key: "Pointer 3D",
                        component: featureComponents["Pointer 3D"],
                        props: {
                            position: clickPos,
                            scale: [params?.w || 1, params?.h || 1, params?.d || 1],
                            rotation: [0,0,0],
                            color: params?.color || "#5E40AF",
                            opacity: params?.opacity ?? 1
                        }
                    };

                    return [
                        ...(prev ?? []).filter(f => f.key !== "Pointer 3D"), // Set null if prev is empty
                        newFeature
                    ];
                });

            }

            // Always add to objects array  - clickable
            const newObj = {
                type: activeKey,
                position: [point.x, point.y, point.z],
                scale: [params?.w || 1, params?.h || 1, params?.d || 1],
                color: params?.color || "#30E0C0",
                opacity: params?.opacity || 1,
                
            };
            setObjects((prev) => [...prev, newObj]);
        },
        [modes, featureParams]
    );


    const moveARShape = (linear, angular) => {
        console.log("Move augmented shape - linear: ", linear, "angular: ", angular);
        
    };moveARShape


    return (
        // Main Canvas layput 
        <div className="absolute inset-0" onClick={ handleOverlayClick} style={{ zIndex: 20 }} id={"AROverlay"}> 
        
            <Canvas camera={ { position: [0, 0, 5] }} onCreated={({ camera, scene }) => { window._threeCamera = camera; window._threeScene = scene; } }  >
                
                {/* Light */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} />

                {/* Objects placed by clicking */}
                {objects.map((obj, index) => {
                    const Component = featureComponents[obj.type];
                    if (!Component) return null;

                    return (
                        <Component
                            key={index}
                            position={obj.position}
                            scale={obj.scale}
                            color={obj.color}
                            opacity={obj.opacity}
                            onRightClick={() => {
                            setObjects(prev => prev.filter((_, i) => i !== index));
                            }}

                        />
                    );
                })}

                {/* Active feature objects (non-clickable) */}
                {activeFeatures.map((feat, i) => {
                    const Comp = feat.component;
                    return <Comp key={"feat" + i} {...feat.props} />;
                })}

            </Canvas>


            {/* Widget Joystick  */}
            {modes.features['Joystick Widget'] && featureParams['Joystick Widget']['showJoystick'] && (        
                <div style={{ position: "absolute", bottom: "25px", left: "50%", transform: "translateX(-50%)", zIndex: 9999, pointerEvents: "auto", }} >
                    {featureParams['Joystick Widget']['design'] == 'classic' ? (
                        <JoystickWidget featureParams={featureParams['Joystick Widget']} onJoystickChange={onJoystickChange} moveShapeFunc={moveARShape} />
                    ): (
                        <JoystickHover featureParams={featureParams['Joystick Widget']} onJoystickChange={onJoystickChange} moveShapeFunc={moveARShape} />
                    )}
                </div>
            )}

            {/* Dashboard Information  */}
            {modes.features['Dashboard Information'] && (            

                <MainPanel odomData={odomData} featureParams={featureParams} />
            )}

        </div>
    );
}




// const [modes, setModes] = useState({
//     ARMode: false,
//     MapMode: false,
//     DebugMode: false,
//     features: {
//         'Augmented Shape': false,
//         'Mouse Control': false,
//         'Pointer 3D': false,
//         'Joystick Widget': false,
//         'Dashboard Information': false,
//     }
// });    


// const [featureParams, setFeatureParams] = useState({

//     'Augmented Shape': { 
//         x: 0.3, y: 3.9, z: -2.1, w: 1.2, h: 0.5, d: 0.2,
//         color: '#00b4c8', opacity: 1 
//     },

//     'Mouse control': { 
//         w: 1, h: 1, d: 1, 
//         color: '#5E40AF', opacity: 1 
//     },

//     'Pointer 3D': { 
//         w: 1, h: 1, d: 1, 
//         color: '#32CD32', opacity: 1 
//     },

//     'Joystick Widget': { 
//         showJoystick: true,
//         design: "classic",
//         size: 150,
//         moveShape: true,
//         color: '#30E0C0',
//     },


//     'Dashboard Information': {
//         showCompass: true,
//         compassSize: 60,

//         showAngularSpeed: true,
//         angularSpeedSize: 80,

//         showOdometry: true,
//         odometrySize: 50,

//         showGauge: true,
//         gaugeSize: 100,
//     },

// });
