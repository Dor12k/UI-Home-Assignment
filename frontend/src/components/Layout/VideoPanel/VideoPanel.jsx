

// File: VideoPanel.jsx
// Renders the video stream and overlays AR features on top of it.
// Manages canvas interactions, clicked points, and passes data to VideoStream and AROverlay.

import AROverlay from "./AR/AROverlay";
import VideoStream from "./VideoStream/VideoStream"
import MapOverlay from "../../Map/MapOverlay";

import { useRef, useState } from "react";


const VideoPanel = ({ images, gpsData, odomData, modes, featureParams, onJoystickChange  }) => {
  
  // Canvas ref for video
  const canvasRef = useRef(null);

  // mouse click on canvas
  const [clickedPoints, setClickedPoints] = useState([]);

  // Handle mouse click on canvas
  const handleCanvasClick = (event) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect(); // position of canvas on screen

    // Get relative coordinates
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const z = 1; 

    const newPoint = { x, y, z };
    setClickedPoints((prev) => [...prev, newPoint]);
  };

  
  return (
    <div className="relative flex-1 w-full h-full flex flex-col items-center justify-center" id={"VideoPanel"}>

      <div className="relative w-[1200px] h-[675px]" id={"VideoPanel (MapOverlay+VideoStream"}>

        {modes.MapMode ? (
          <MapOverlay gpsData={gpsData} odomData={odomData}/>  // Map mode
        ) : ( 
          <VideoStream modes={modes} images={images} canvasRef={canvasRef} onCanvasClick={!modes.ARMode ? handleCanvasClick : undefined} />// Video stream canvas // ❗️disable clicks in AR mode 
        )}

        {/* AR overlay */}
        {modes.ARMode && (
            <AROverlay 
                canvasRef={canvasRef}
                gpsData={gpsData}
                odomData={odomData}
                clickedPoints={clickedPoints}
                modes={modes}
                featureParams={featureParams}     
                onJoystickChange={onJoystickChange} 
                style={{ position: "absolute", top: 0, left: 0, width: "1200px", height: "675px" }}  
            
            
            />
        )}

      </div>
    </div>
  );
};

export default VideoPanel;



