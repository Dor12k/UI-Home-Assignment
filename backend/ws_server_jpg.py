# File: backend/ws_server_stream_full.py
# Streams images, GPS, and Odometry from ROS2_stream to frontend via WebSocket (FastAPI)
import json
import asyncio
import base64
import re
from pathlib import Path
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


# Allow CORS from all local network devices (or specify exact IPs)
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:3000",
    "http://192.168.1.22:5173",  # add your frontend machine IP here
    "http://192.168.1.22:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or use ["*"] for all origins in LAN
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Paths ---
ROOT_DIR = Path(__file__).resolve().parents[1]
STREAM_DIR = ROOT_DIR / "ROS2" / "ROS2_stream"
IMAGES_DIR = STREAM_DIR / "images"
GPS_FILE = STREAM_DIR / "gps" / "gps.json"
ODOM_FILE = STREAM_DIR / "odometry" / "odom.json"

# --- Helpers ---
def load_image_file(file_path: Path):
    try:
        return base64.b64encode(file_path.read_bytes()).decode("utf-8")
    except Exception as e:
        print(f"❌ Failed to read {file_path.name}: {e}")
        return None

def extract_frame_index(filename: str) -> int:
    match = re.search(r'\d+', filename)
    return int(match.group()) if match else -1

def load_json_file(file_path: Path):
    try:
        return json.load(open(file_path, "r"))
    except Exception as e:
        print(f"❌ Failed to load {file_path}: {e}")
        return []

# --- WebSocket endpoint ---
@app.websocket("/ws/stream")
async def stream_ros2(websocket: WebSocket):
    await websocket.accept()
    print("✅ Client connected")

    try:
        # Load full GPS/ODOM data
        gps_data = load_json_file(GPS_FILE)
        odom_data = load_json_file(ODOM_FILE)

        # Load and sort images
        image_files = list(IMAGES_DIR.glob("*.jpeg")) + list(IMAGES_DIR.glob("*.jpg")) + list(IMAGES_DIR.glob("*.png"))
        image_files.sort(key=lambda x: extract_frame_index(x.name))

        max_len = max(len(image_files), len(gps_data), len(odom_data))
        print(f"📡 Streaming {len(image_files)} images, {len(gps_data)} GPS entries, {len(odom_data)} Odom entries")

        for i in range(max_len):
            # --- Image ---
            if i < len(image_files):
                img_b64 = load_image_file(image_files[i])
                if img_b64:
                    frame_msg = {
                        "type": "image",
                        "frame_index": i,
                        "filename": image_files[i].name,
                        "data": img_b64
                    }
                    await websocket.send_text(json.dumps(frame_msg))

            # --- GPS ---
            if i < len(gps_data):
                gps_msg = gps_data[i].copy()
                gps_msg["type"] = "gps"
                await websocket.send_text(json.dumps(gps_msg))

            # --- Odometry ---
            if i < len(odom_data):
                odom_msg = odom_data[i].copy()
                odom_msg["type"] = "odom"
                await websocket.send_text(json.dumps(odom_msg))

            await asyncio.sleep(0.05)  # ~20 FPS

        print("✅ Streaming finished")
        await websocket.close()

    except WebSocketDisconnect:
        print("⚠️ Client disconnected")

    except Exception as e:
        print(f"❌ Streaming error: {e}")
        await websocket.close()
