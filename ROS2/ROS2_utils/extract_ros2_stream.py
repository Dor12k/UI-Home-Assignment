

# File: Server-Template/ROS2/ROS2_utils/extract_ros2_stream.py
# Description: Extract GPS, Odometry, and Camera images from ROS2 MCAP bag
#              and save as JSON and JPEG for UI streaming
#              Timestamp is saved intact to avoid overflow issues
# Requirements:
# pip install rosbags opencv-python numpy tqdm

import json
import cv2
import numpy as np
from pathlib import Path
from tqdm import tqdm
from rosbags.highlevel import AnyReader

# --- Paths ---
BASE_DIR = Path(__file__).parent
BAG_FILE = BASE_DIR.parent / 'ROS2_bag' / 'data.mcap'
STREAM_DIR = BASE_DIR.parent / 'ROS2_stream'
GPS_JSON = STREAM_DIR / 'gps' / 'gps.json'
ODOM_JSON = STREAM_DIR / 'odometry' / 'odom.json'
FRAMES_DIR = STREAM_DIR / 'images'
FRAMES_INFO_JSON = STREAM_DIR / 'frames_info.json'

# --- Ensure directories exist ---
(GPS_JSON.parent).mkdir(parents=True, exist_ok=True)
(ODOM_JSON.parent).mkdir(parents=True, exist_ok=True)
FRAMES_DIR.mkdir(parents=True, exist_ok=True)

# --- Containers ---
gps_data = []
odom_data = []
frames_info = []

# --- Open MCAP bag with AnyReader ---
with AnyReader([BAG_FILE]) as reader:
    connections = {c.id: c.topic for c in reader.connections}

    for i, (connection, timestamp, rawdata) in enumerate(tqdm(reader.messages(), desc="Extracting messages")):
        topic = connections[connection.id]
        msg = reader.deserialize(rawdata, connection.msgtype)

        # --- Timestamp intact ---
        if isinstance(timestamp, bytes):
            timestamp_val = int.from_bytes(timestamp, byteorder='little', signed=False)
        else:
            timestamp_val = timestamp

        # --- GPS ---
        if topic == '/ublox_gps_node/fix':
            gps_entry = {
                "timestamp": timestamp_val,
                "lat": getattr(msg, 'latitude', None),
                "lon": getattr(msg, 'longitude', None),
                "alt": getattr(msg, 'altitude', None)
            }
            gps_data.append(gps_entry)

        # --- Odometry ---
        elif topic == '/robot_odom':
            odom_entry = {
                "timestamp": timestamp_val,
                "position": {
                    "x": getattr(msg.pose.pose.position, 'x', None),
                    "y": getattr(msg.pose.pose.position, 'y', None),
                    "z": getattr(msg.pose.pose.position, 'z', None)
                },
                "orientation": {
                    "x": getattr(msg.pose.pose.orientation, 'x', None),
                    "y": getattr(msg.pose.pose.orientation, 'y', None),
                    "z": getattr(msg.pose.pose.orientation, 'z', None),
                    "w": getattr(msg.pose.pose.orientation, 'w', None)
                },
                "linear_velocity": {
                    "x": getattr(msg.twist.twist.linear, 'x', None),
                    "y": getattr(msg.twist.twist.linear, 'y', None),
                    "z": getattr(msg.twist.twist.linear, 'z', None)
                },
                "angular_velocity": {
                    "x": getattr(msg.twist.twist.angular, 'x', None),
                    "y": getattr(msg.twist.twist.angular, 'y', None),
                    "z": getattr(msg.twist.twist.angular, 'z', None)
                }
            }
            odom_data.append(odom_entry)

        # --- Compressed Camera Images ---
        elif topic == '/neural_depth/left/image_rect_raw/compressed':
            img_array = np.frombuffer(msg.data, np.uint8)
            img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
            if img is not None:
                frame_filename = f"frame_{len(frames_info)+1:05d}.jpg"
                frame_path = FRAMES_DIR / frame_filename
                cv2.imwrite(str(frame_path), img)
                frames_info.append({
                    "frame": frame_filename,
                    "timestamp": timestamp_val
                })




# --- Write JSON files ---
with open(GPS_JSON, 'w') as f:
    json.dump(gps_data, f, indent=2)

with open(ODOM_JSON, 'w') as f:
    json.dump(odom_data, f, indent=2)

with open(FRAMES_INFO_JSON, 'w') as f:
    json.dump(frames_info, f, indent=2)

print("Extraction complete!")
print(f"GPS entries: {len(gps_data)} saved to {GPS_JSON}")
print(f"Odometry entries: {len(odom_data)} saved to {ODOM_JSON}")
print(f"Camera frames: {len(frames_info)} saved in {FRAMES_DIR}")
