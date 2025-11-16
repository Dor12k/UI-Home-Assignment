

// File: VideoStream.jsx
// Renders the latest image from the stream onto a canvas.
// Handles mouse clicks via a callback from the parent.

import React, { useEffect, useCallback } from "react";
import frame from "../../../../../public/frame_00001.jpg";
frame

const VideoStream = ({ images, canvasRef, onCanvasClick, modes }) => {

  // useCallback ensures drawFrame reference is stable across renders
  const drawFrame = useCallback(
    (base64Image) => {
      if (!canvasRef.current || !base64Image) return;

      const img = new Image();
      // Debug: using static frame for now

      if(!modes.DebugMode){
        img.src = "data:image/jpeg;base64," + base64Image; 
      }
      if(modes.DebugMode || !img ){
        img.src = frame; // run on 1 frame
      }

      img.onload = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };
    },
    [canvasRef, modes.DebugMode] // dependency ensures latest canvasRef is used
  );

  // Draw the latest image whenever `images` changes
  useEffect(() => {
    if (images?.length) {
      drawFrame(images[images.length - 1]);
    }
  }, [images, drawFrame]); // include drawFrame to satisfy ESLint

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={675}
      className="border-2 border-gray-700 rounded bg-black"
      onClick={onCanvasClick}
    />
  );
};

export default VideoStream;








// ================================================== Dinamic canvas size version =========================

// // File: VideoStream.jsx
// import React, { useEffect } from "react";
// import frame from "../../../../public/frame_00001.jpg";

// const VideoStream = ({ images, canvasRef, onCanvasClick, width, height }) => {
//   // Draw the latest image whenever `images` changes
//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const drawFrame = (base64Image) => {
//       const ctx = canvasRef.current.getContext("2d");
//       ctx.clearRect(0, 0, width, height);

//       const img = new Image();
//       img.src = base64Image || frame;

//       img.onload = () => {
//         ctx.drawImage(img, 0, 0, width, height);
//       };
//     };

//     if (images?.length) {
//       drawFrame(images[images.length - 1]);
//     }
//   }, [images, canvasRef, width, height]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={width}
//       height={height}
//       className="border-2 border-gray-700 rounded bg-black"
//       onClick={onCanvasClick}
//     />
//   );
// };

// export default VideoStream;
