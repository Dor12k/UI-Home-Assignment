

import React from 'react';
import frame from '../../../public/frame_00001.jpg'
import MainLayout from './../../components/Layout/MainLayout/MainLayout';

import { useState, useEffect, useRef } from 'react';

const ROS2Streamer = () => {

    // Store data from the server (images, gps, odemetry)
    const [images, setImages] = useState([]);

    
    // --- Sample GPS data fallback ---
    const [gpsData, setGpsData] = useState({ type: 'gps', timestamp: 1.234, lat: 32.523, lon: 34.967, alt: 100 });// --- Sample Odom data fallback ---               

    // --- Sample Odom data fallback ---               
    const [odomData, setOdomData] = useState({
        "timestamp": 1754815496823498200,
        "position": {
            "x": 338.82374952242833,
            "y": 2418.344413258205,
            "z": 1267.820425544019
        },
        "orientation": {
            "x": 0.3684430985213134,
            "y": -0.12481449078743366,
            "z": 0.6826762213911277,
            "w": 0.6185662476959276
        },
        "linear_velocity": {
            "x": 2.1487048724029645,
            "y": -0.04843056971807109,
            "z": 0
        },
        "angular_velocity": {
            "x": 1,
            "y": 1,
            "z": 1
        },
        "type": "odom"
    });
    

    images
    gpsData
    odomData
    

    const wsRef = useRef(null); // save open connection 

    // Incoming msg types: [image, gps, odom] See Dictionary.md lines 1-100 for full msg structure
    useEffect( () => {

        // const ws = new WebSocket("ws://localhost:8000/ws/stream"); // localhost
        const ws = new WebSocket("ws://192.168.1.22:8000/ws/stream"); // WI-FI

        wsRef.current = ws;

        // Parse incoming message
        ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            
            if(msg.type === "image" && msg.data ){
                // console.log("image: ", msg)
                setImages(prev => [...prev, msg.data])
            }

            // --- GPS ---
            if(msg.type === "gps"){
                console.log("gps: ", msg)
                setGpsData( msg )
            }
   
            // --- Odometry ---
            if(msg.type === "odom"){
                // console.log("odometry: ", msg)
                setOdomData(msg);
            }
        }
        
        setImages(prev => [...prev, frame])

        ws.onopen = () => console.log("✅ WebSocket connected");
        ws.onclose = () => console.log("⚠️ WebSocket disconnected");
        return () => ws.close();
    }, [])


    // Send command to the server
    const sendCommandToServer = (cmd) => {
        if(wsRef.current && wsRef.current.readyState === WebSocket.OPEN){
            wsRef.current.send(JSON.stringify({ type: "joystick", data: cmd }));
        }
    };

    // Return command from joystick - Should convert to 'Twist' message
    const handleJoystickChange = ({ linear, angular }) => {
        // linear.x = forward/back
        // angular.z = left/right rotation

        // console.log("Send Twist command to server - linear: ", linear, "angular: ", angular);

        sendCommandToServer({
            type: "twist",
            data: {
            linear: { x: linear.x, y: 0, z: 0 },
            angular: { x: 0, y: 0, z: angular.z }
            }
        });
    };



    return (

        <div >

            {/* Main Layout  */}
            <MainLayout 
                images={images} 
                gpsData={gpsData} 
                odomData={odomData} 
                onJoystickChange={handleJoystickChange}
            
            />

        </div>
    );
};

export default ROS2Streamer;