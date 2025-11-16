


# Project: Elbit Robotics UI & Backend

## Overview
A lightweight system for visualizing ROS2 robot data in real time using a FastAPI backend and a Vite+React frontend.

---

### 🎬 Demo Video

Check out the real-time robot UI in action!  

## 🤖 Real-Time Interactive User Interface | Augmented Reality Robot UI 🌐

[![Watch the Demo](https://github.com/user-attachments/assets/9fbcfc1f-7215-488a-9973-2ca8e571c6d6)](https://youtu.be/dBqTq7Yx9kY)

Click the image above to watch the full demo on YouTube.


---

## Install

Use the "run_all.bat" file to run the installation. Make sure the `ROS2_bag` folder contains the `data.mcap` file, then run:

```bash
.\run_all.bat
```

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

---

# Implemented

## Core Features (Implemented)

| Feature           | Status          |
|------------------|----------------|
| Live Video Feed   | ✅ implemented  |
| Augmented Shapes  | ✅ implemented  |

## Advanced Features (Implemented)

| Feature                          | Status          |
|---------------------------------|----------------|
| Augmented Shapes + Mouse Control | ✅ implemented  |
| Joystick Widget                  | ✅ implemented  |
| World Maps                       | ✅ implemented  |
| Dashboard Information            | ✅ implemented  |
| Novel Feature                    | ✅ implemented  |

---



# Implemented with "Novel Feature"

## Features


| Feature                          | Status          | Notes |
|---------------------------------|----------------|-------|
| Augmented Shapes                 | ✅ implemented  | - Design and control features (size, color, opacity)<br>- Switch between user input or car orientation |
| Augmented Shapes + Mouse Control | ✅ implemented  | - Add multiple shapes on the screen<br>- Define size (width, height, depth), color, opacity<br>- Delete shapes with right-click on the mouse |
| Joystick Widget                  | ✅ implemented  | - Button to switch between joystick type/design |


---

# Implemented with "**It would be impressive to see**"

| Feature                          | Status                                |
|---------------------------------|--------------------------------------|
| Augmented Shapes                 | ✅ implemented                        |
| Dashboard Information            | ✅ implemented                        |
| Novel Feature                    | ✅ implemented                        |
| World Maps                       | 🟡 In Progress / Partially Implemented|
---
