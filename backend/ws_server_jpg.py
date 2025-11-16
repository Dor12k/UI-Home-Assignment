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
    # "http://SOMEIP:5173",  # add your frontend machine IP here
    # "http://SOMEIP:5174",
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
        gps_data = load_json_file(GPS_FILE)
        odom_data = load_json_file(ODOM_FILE)

        image_files = list(IMAGES_DIR.glob("*.jpeg")) + list(IMAGES_DIR.glob("*.jpg")) + list(IMAGES_DIR.glob("*.png"))
        image_files.sort(key=lambda x: extract_frame_index(x.name))

        max_len = max(len(image_files), len(gps_data), len(odom_data))

        # --- Task 1: read commands from client ---
        async def receive_commands():
            while True:
                msg = await websocket.receive_text()
                data = json.loads(msg)
                # print("📥 Received command:", data)

                # Example: twist command
                if data.get("type") == "twist":
                    # TODO: send to ROS2 Twist publisher
                    # print("🌀 Twist command received:", data["data"])
                    pass

        # --- Task 2: stream data to client ---
        async def stream_data():
            for i in range(max_len):

                if i < len(image_files):
                    img_b64 = load_image_file(image_files[i])
                    if img_b64:
                        await websocket.send_text(json.dumps({
                            "type": "image",
                            "frame_index": i,
                            "filename": image_files[i].name,
                            "data": img_b64
                        }))

                if i < len(gps_data):
                    gps_msg = gps_data[i].copy()
                    gps_msg["type"] = "gps"
                    await websocket.send_text(json.dumps(gps_msg))

                if i < len(odom_data):
                    odom_msg = odom_data[i].copy()
                    odom_msg["type"] = "odom"
                    await websocket.send_text(json.dumps(odom_msg))

                await asyncio.sleep(0.05)

        # Run both tasks in parallel
        await asyncio.gather(receive_commands(), stream_data())

    except WebSocketDisconnect:
        print("⚠️ Client disconnected")
    except Exception as e:
        print("❌ Error:", e)
