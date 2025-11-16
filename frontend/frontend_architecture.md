


# Project Data Flow and Component Architecture

This document describes the end-to-end data flow of the system, starting from the server-side
data sources and continuing through the client-side logic.  
It outlines how backend data is processed, transmitted, and consumed by the frontend,
including the relationships between React components and the internal flow of information
between them.

The goal of this document is to provide developers with a clear understanding of:
- How data travels through the system  
- Which components handle which responsibilities  
- How the backend and frontend interact  
- The logical structure and dependencies inside the client application  


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

