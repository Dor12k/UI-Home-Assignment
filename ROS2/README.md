

# ROS2 Data

This directory contains all ROS2-related files and scripts for the project, including the original bag file, extracted data, and parser utilities.

## Project Structure

```bash
.
└── ROS2
    ├── README.md
    ├── ROS2_bag
    │   ├── camera_calibration.yaml
    │   ├── data.mcap
    │   └── metadata.yaml
    ├── ROS2_stream
    │   ├── frames_info.json
    │   ├── gps
    │   │   └── gps.json
    │   ├── images
    │   │   ├── frame_00001.jpg
    │   └── odometry
    │       └── odom.json
    └── ROS2_utils
        ├── extract_ros2_stream.py
        ├── mcap_objects_structure.txt
        ├── mcap_readable.txt
        └── mcap_structure.txt
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

## ROS2

  - Include your ROS2 bag
```bash
  cd ROS2/ROS2_utils
  python extract_ros2_stream.py # to extract ROS2 bag - it will create folders: images, gps, odom in ROS2_stream
```
