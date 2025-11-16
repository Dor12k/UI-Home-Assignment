

import React from 'react';
import ROS2Streamer from '../DataStream/ROS2/ROS2Streamer';

const Main = () => {

    return (

        <div>
            {/* Get data from server (images, gps, odometry) */}
            < ROS2Streamer />
        </div>
    );
};

export default Main;