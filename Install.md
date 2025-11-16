




# Project README

# Project: Elbit Robotics UI & Backend

## Overview
This project is a home assignment for the Robotics & Algorithms Team at Elbit C4I and Cyber.  
It consists of three main parts:
- **Backend** – FastAPI server
- **Frontend** – Vite + React application
- **ROS2** – simulated robot sensor data and parser

The goal is to visualize real-time robot data, provide a flexible backend API, and a user-friendly frontend interface.

---

## Full Project Structure



```bash
.
└── Project
    ├── Dictionary.md
    ├── README.md
    ├── ROS2
    │   ├── README.md
    │   ├── ROS2_bag
    │   │   ├── camera_calibration.yaml
    │   │   ├── data.mcap
    │   │   └── metadata.yaml
    │   ├── ROS2_stream
    │   │   ├── frames_info.json
    │   │   ├── gps
    │   │   │   └── gps.json
    │   │   ├── images
    │   │   │   ├── frame_00001.jpg
    │   │   └── odometry
    │   │       └── odom.json
    │   └── ROS2_utils
    │       ├── extract_ros2_stream.py
    │       ├── mcap_objects_structure.txt
    │       ├── mcap_readable.txt
    │       └── mcap_structure.txt
    ├── backend
    │   ├── main.py
    │   └── ws_server_jpg.py
    ├── frontend
    │   ├── README.md
    │   ├── UIStructure.txt
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   │   ├── frame_00001.jpg
    │   │   └── vite.svg
    │   ├── src
    │   │   ├── App.jsx
    │   │   ├── DataStream
    │   │   │   └── ROS2
    │   │   │       └── ROS2Streamer.jsx
    │   │   ├── assets
    │   │   │   └── react.svg
    │   │   ├── components
    │   │   │   ├── Layout
    │   │   │   │   ├── Dashboard
    │   │   │   │   │   └── Dashboard.jsx
    │   │   │   │   ├── MainLayout
    │   │   │   │   │   └── MainLayout.jsx
    │   │   │   │   ├── Sidebar
    │   │   │   │   │   └── Sidebar.jsx
    │   │   │   │   └── VideoPanel
    │   │   │   │       ├── AR
    │   │   │   │       │   ├── 3D
    │   │   │   │       │   │   ├── Cone.jsx
    │   │   │   │       │   │   ├── CoolCube.jsx
    │   │   │   │       │   │   ├── Cube.jsx
    │   │   │   │       │   │   ├── Dodecahedron.jsx
    │   │   │   │       │   │   ├── DropPin.jsx
    │   │   │   │       │   │   ├── FancyShape.jsx
    │   │   │   │       │   │   ├── HungarianCubeWithEdges.jsx
    │   │   │   │       │   │   ├── Octahedron.jsx
    │   │   │   │       │   │   ├── Rectangle.jsx
    │   │   │   │       │   │   ├── Sphere.jsx
    │   │   │   │       │   │   ├── Torus.jsx
    │   │   │   │       │   │   └── Vehicle.jsx
    │   │   │   │       │   ├── AROverlay.jsx
    │   │   │   │       │   ├── Joystick
    │   │   │   │       │   │   ├── Joystick.jsx
    │   │   │   │       │   │   ├── JoystickHover.jsx
    │   │   │   │       │   │   ├── JoystickWidget.css
    │   │   │   │       │   │   ├── JoystickWidget.jsx
    │   │   │   │       │   │   └── widgetJoystick.jsx
    │   │   │   │       │   └── ScalePanel
    │   │   │   │       │       ├── AngularSpeed.jsx
    │   │   │   │       │       ├── Compass.jsx
    │   │   │   │       │       ├── Gauge.jsx
    │   │   │   │       │       ├── MainPanel.jsx
    │   │   │   │       │       └── Odometry.jsx
    │   │   │   │       ├── VideoPanel.jsx
    │   │   │   │       └── VideoStream
    │   │   │   │           └── VideoStream.jsx
    │   │   │   └── Map
    │   │   │       └── MapOverlay.jsx
    │   │   ├── index.css
    │   │   ├── main.jsx
    │   │   └── pages
    │   │       └── Main.jsx
    │   └── vite.config.js
    ├── requirements.txt
    └── utils
        ├── ROS2_tree.md
        ├── backend_tree.md
        ├── frontend_tree.md
        ├── main_algorithm.md
        ├── print_project_tree.py
        └── project_tree.md
```


---

## ROS2

- **Data source:** `ROS2/ROS2_bag/data.mcap` (approximately 16 minutes of robot mission data)
- **Topics included:**
  - `/ublox_gps_node/fix`: GPS position (latitude, longitude, altitude) at ~4 Hz
  - `/robot_odom`: Robot odometry (position, orientation, velocities) at ~30 Hz
  - `/neural_depth/left/image_rect_raw/compressed`: Compressed camera images at ~13 Hz
- **Camera calibration:** `ROS2/ROS2_bag/camera_calibration.yaml`

**Parser:**  
- `ROS2/ROS2_utils/extract_ros2_stream.py` extracts data from the MCAP file and saves to `ROS2_stream`:
  - GPS → `gps/gps_data.json`
  - Odometry → `odomometry/odom_data.json`
  - Images → `images/frames.jpg`
  - frame_info.json / contain timestmap of image
---

# Use script and run
```bash
.\run_all.bat  
```

## ROS2

  - Include your ROS2 bag
```bash
  cd ROS2/ROS2_utils
  python extract_ros2_stream.py # to extract ROS2 bag - it will create folders: images, gps, odom in ROS2_stream
```
## Backend

- **Framework:** FastAPI
- **Dependencies:** Python 3.x, FastAPI, Uvicorn,
- **Setup & Run:**
  - Activate virtual environment:
    ```bash
    cd root
    python -m venv venv
    venv\Scripts\activate     
    source venv/bin/activate  # Linux/Mac
    ```
  - Make sure you define Python interface with Shift+P  
  - Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
  - Start server:
    ```bash
    cd backend
    uvicorn main:app --reload # Health check
    uvicorn ws_server_jpg:app --reload --port 8000 # UI connection
    uvicorn ws_server_jpg:app --reload --host 0.0.0.0 --port 8000 # for WI-FI connection
    ```

- **Endpoints:**
  - `/` → Checks if server is running
  - `/health` → Health check endpoint

---

## Frontend

- **Framework:** React + Vite
- **Setup & Run:**
  ```bash
  cd frontend
  npm install
  npm run dev
  npm run dev -- --host # WI-FI connection
  ```

---


## 📌 Frontend Component Architecture

```bash
App.jsx
└─ Main.jsx
    └─ ROS2Streamer.jsx              # Gets images, GPS, and odometry from FastAPI server
        └─ MainLayout.jsx            # Defines the main screen layout
            ├─ Sidebar.jsx           # Feature & mode controls
            ├─ Dashboard.jsx         # Telemetry & system status
            └─ VideoPanel.jsx        # Final rendered video + AR overlay
                ├─ VideoStream.jsx   # Streams video frames from backend
                └─ AROverlay.jsx     # Augmented Reality overlay layer
                    ├─ 3D/           # 3D geometric shapes (Three.js)
                    │   ├─ Cube.jsx
                    │   ├─ Rectangle.jsx
                    │   ├─ Vehicle.jsx
                    │   ├─ Sphere.jsx
                    │   ├─ Cone.jsx
                    │   ├─ Torus.jsx
                    │   ├─ Octahedron.jsx
                    │   └─ Dodecahedron.jsx
                    ├─ Joystick/      # Multiple joystick UI variants
                    │   ├─ Joystick.jsx
                    │   ├─ JoystickHover.jsx
                    │   ├─ JoystickWidget.jsx
                    │   ├─ JoystickWidget.css
                    │   └─ WidgetJoystick.jsx
                    └─ ScalePanel/
                        └─ MainPanel.jsx    # Main dashboard panel
                            ├─ AngularSpeed.jsx   # Angular velocity display
                            ├─ Compass.jsx        # Heading / yaw indicator
                            ├─ Gauge.jsx          # Speed gauge
                            └─ Odometry.jsx       # Odometry board
```


## Usage Notes

1. Run `extract_ros2_stream.py` first to extract ROS2 data into `ROS2_stream`.
2. Start backend server.
3. Start frontend server.
4. Frontend communicates with backend to fetch and visualize data.
5. You can extend the frontend to implement real-time visualizations or interactive controls for the robot data.

---

## Additional Information

- The project structure separates backend, frontend, and ROS2 utilities for clarity.
- The `utils` folder contains helper scripts and project tree outputs.
- This setup allows easy testing of each part independently before integrating them together.



---


```