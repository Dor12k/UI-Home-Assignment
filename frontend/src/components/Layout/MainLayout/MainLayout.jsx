

// File Name: MainLayout.jsx

import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import VideoPanel from '../VideoPanel/VideoPanel';




const MainLayout = ({ images, gpsData, odomData, onJoystickChange }) => {

    /*
    Props:
        images    : Array of base64 jpg strings, newest image last
        gpsData   : Array of GPS objects { timestamp: float, lat: float, lon: float, alt: float }
        odomData  : Array of Odometry objects { timestamp: float, position: {x,y,z}, orientation: {x,y,z,w}, linear_velocity{x,y,z,w}, angular_velocity{x,y,z,w} }
    */
    
    const [DebugMode, setDebugModes] = useState(true); setDebugModes
    
    const [modes, setModes] = useState({
        ARMode: false,
        MapMode: false,
        DebugMode: false,
        features: {
            'Augmented Shape': false,
            'Mouse Control': false,
            'Pointer 3D': false,
            'Joystick Widget': false,
            'Dashboard Information': false,
        }
    });    

    const [featureParams, setFeatureParams] = useState({

        'Augmented Shape': {  
            showShape: true,
            x: 0.3, y: 3.9, z: -2.1, w: 1.2, h: 0.5, d: 0.2, 
            orientation: false, rotating: true, rotationX: 0, rotationY: 0, rotationZ: 0, rotationSpeedX: 0, rotationSpeedY: 0, rotationSpeedZ: 9,
            color: '#00b4c8', opacity: 1 
        },

        'Mouse control': { 
            w: 1, h: 1, d: 1, 
            color: '#5E40AF', opacity: 1 
        },

        'Pointer 3D': { 
            w: 1, h: 1, d: 1, 
            color: '#32CD32', opacity: 1 
        },

        'Joystick Widget': { 
            showJoystick: true,
            design: "classic",
            size: 150,
            moveShape: true,
            color: '#30E0C0',
        },


        'Dashboard Information': {
            showCompass: true,
            compassSize: 60,

            showAngularSpeed: true,
            angularSpeedSize: 80,

            showOdometry: true,
            odometrySize: 50,

            showGauge: true,
            gaugeSize: 100,
        },

    });

    // Generic toggle for top-level modes (like ARMode, MapMode)
    const toggleMode = (key) => {
                    
        setModes((prev) => {
            // if feature in features
            if (key in prev.features) {
                return {
                    ...prev,
                    features: {
                        ...prev.features,
                        [key]: !prev.features[key],
                    },
                };
            } else {
                // Top-level field like AR Mode with no subfields
                return {
                    ...prev,
                    [key]: !prev[key],
                };
            }
        });
    };     
    
    return (

        <div className="min-h-screen bg-gray-900 flex  text-gray-100 font-sans" id={"MainLayout"}>

            {/* Side Panel */}
            <Sidebar modes={modes} toggleMode={toggleMode} featureParams={featureParams}  setFeatureParams={setFeatureParams} />
            
            {/* Main Content */}
            <div className='w-full flex flex-col py-4' id={"MainLayout (videoPanel-Dashboard)"}>

                <VideoPanel 
                    images={images} 
                    gpsData={gpsData} 
                    odomData={odomData} 
                    modes={modes} 
                    featureParams={featureParams}
                    onJoystickChange={onJoystickChange}
                
                />

                <Dashboard modes={modes} toggleMode={toggleMode} />

            </div>
        </div>
    );
};

export default MainLayout;