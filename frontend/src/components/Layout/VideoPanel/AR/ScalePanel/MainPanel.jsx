

import React from 'react';
import Gauge from './Gauge';
import * as THREE from "three";
import { useState, useEffect, useMemo } from "react";
import Compass from './Compass';
import AngularSpeed from './AngularSpeed';
import OdometryDisplay from './Odometry';

export default function MainPanel({ odomData, featureParams }) {

    const dashboard = featureParams["Dashboard Information"];
    // const featureParams = {
    //     dashboard: {
    //         'showCompass': true,
    //         'compassSize': 60,

    //         'showAngularSpeed': true,
    //         'angularSpeedSize': 80,

    //         'showOdometry': true,
    //         'odometrySize': 100,

    //         'showGauge': true,
    //         'gaugeSize': 120,
    //     }
    // }

    // const featureParams = {
    //     dashboard: {
    //         showCompass: true,
    //         showAngularSpeed: true,
    //         showOdometry: true,
    //         showGauge: true,
    //     }
    // }
    


  // console.log("odomData: " , odomData)
  // --- Compute linear speed safely ---
  const speed = useMemo(() => Math.sqrt(
    (odomData?.linear_velocity?.x || 0) ** 2 +
    (odomData?.linear_velocity?.y || 0) ** 2 +
    (odomData?.linear_velocity?.z || 0) ** 2
  ), [odomData?.linear_velocity]);

  // --- Compute yaw angle (heading) from quaternion safely ---
  const yawDeg = useMemo(() => {
    const q = odomData?.orientation;
    if (!q) return 0;
    const siny = 2 * ((q.w || 0) * (q.z || 0) + (q.x || 0) * (q.y || 0));
    const cosy = 1 - 2 * ((q.y || 0) ** 2 + (q.z || 0) ** 2);
    const yaw = Math.atan2(siny, cosy);
    return THREE.MathUtils.radToDeg(yaw);
  }, [odomData?.orientation]);

  // --- Compute odometry (distance) from position ---
  const odometry = useMemo(() => {
    const pos = odomData?.position;
    if (!pos) return 0;
    return Math.sqrt(
      (pos.x || 0) ** 2 + (pos.y || 0) ** 2 + (pos.z || 0) ** 2
    );
  }, [odomData?.position]);

  // --- Compute angular speed ---
  const angularSpeed = useMemo(() => Math.sqrt(
    (odomData?.angular_velocity?.x || 0) ** 2 +
    (odomData?.angular_velocity?.y || 0) ** 2 +
    (odomData?.angular_velocity?.z || 0) ** 2
  ), [odomData?.angular_velocity]);

  // --- Is moving ---
  const isMoving = useMemo(() => speed > 0.01, [speed]);

  // Speed is Meter/seconds - convert to KM/h
  const speedKmh = Math.round(speed * 3.6); // Round to int


  // AngularSpeed is Rad/sec - convert to deg/sec
  const angularSpeedDeg = Math.round(angularSpeed * (180 / Math.PI));

  // Round to int
  const yawRounded = Math.round(yawDeg);
  

  // --- State for dashboard values ---
  const [data, setData] = useState({
    angle: yawRounded,
    speed: speedKmh,
    odometry: odometry,
    angularSpeed: angularSpeedDeg,
    isMoving
  });

  // --- Update state whenever any computed value changes ---
  // useEffect(() => {
  //   setData({
  //     speed,
  //     angle: yawDeg,
  //     odometry,
  //     angularSpeed,
  //     isMoving
  //   });
  // }, [speed, yawDeg, odometry, angularSpeed, isMoving, odomData]);

  useEffect(() => {
    setData({
        speed: speedKmh,
        angle: yawRounded,
        odometry,
        angularSpeed: angularSpeedDeg,
        isMoving
    });
  }, [speedKmh, yawRounded, odometry, angularSpeedDeg, isMoving]);

  
  
  return (

    <>

        {/* MainPanel in bottom-left corner */}
        <div id="MainPanel" className="absolute bottom-4 left-4 flex items-start gap-0 z-50" style={{ pointerEvents: "auto" }} >

            {/* Left column */}
            {dashboard.showCompass && (
                <div className="flex">
                    <Compass value={data.angle} size={dashboard.compassSize} />
                </div>
            )}

            {/* Center column */}
            <div className="flex flex-col items-center gap-2">

                {dashboard.showOdometry && (
                    <OdometryDisplay 
                        value={data.odometry} 
                        max={1000} 
                        unit="m" 
                        size={dashboard.odometrySize} 
                    />
                )}

                {dashboard.showGauge && (
                    <Gauge 
                        label="Speed" 
                        value={data.speed} 
                        max={200} 
                        unit="km/h" 
                        size={dashboard.gaugeSize} 
                    />
                )}
            </div>

            {/* Right column */}
            {dashboard.showAngularSpeed && (
                <div className="flex p-2">
                    <AngularSpeed value={data.angularSpeed} size={dashboard.angularSpeedSize} />
                </div>
            )}

        </div>

    </>

  );
}


