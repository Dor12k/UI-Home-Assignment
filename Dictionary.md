

======================================================================================================================
# ROS2 WebSocket Messages Dictionary

This file describes the structure of messages sent from the ROS2 WebSocket server.

---

## 1️⃣ Message Types Overview (msg.type)

| type  | fields                                  | notes                                      |
|-------|-----------------------------------------|--------------------------------------------|
| image | data, frame_index,  filename      | base64 string of jpg                             |
| gps   | lat, lon, alt, timestamp          | float values                                     |
| odom  | position{x,y,z},                  | Odometry data including position and orientation |
|       | orientation{x,y,z,w},             |                                                  |
|       | linear_velocity{x,y,z,w},         |                                                  |
|       | angular_velocity{x,y,z,w},        |                                                  |
|       | timestamp,                        |                                                  |

---

## 2️⃣ Detailed Message Structures

### **msg**
```json
    {
        type: 'gps'
        timestamp: 1754815584994873000, 
        lat: 31.6622733, 
        lon: 35.0074065, 
        alt: 346.052, 
        }
```

### **Image**

```json
    {
        "type": "image",
        "frame_index": 87,
        "filename": "frame_00088.jpg",
        "data": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBD...",
    }
```

### **GPS**
```json
    {
        type: 'gps'
        timestamp: 1754815584994873000, 
        lat: 31.6622733, 
        lon: 35.0074065, 
        alt: 346.052, 
    }
```

### **Odometry**
```json
            
    {
        "timestamp": 1754815496823498200,
        "position": {
            "x": 338.82374952242833,
            "y": 2418.344413258205,
            "z": 1267.820425544019
        },
        "orientation": {
            "x": 0.3684430985213134,
            "y": -0.12481449078743366,
            "z": 0.6826762213911277,
            "w": 0.6185662476959276
        },
        "linear_velocity": {
            "x": 2.1487048724029645,
            "y": -0.04843056971807109,
            "z": 0
        },
        "angular_velocity": {
            "x": 1,
            "y": 1,
            "z": 1
        },
        "type": "odom"
    }
```


====================================================================================================

3️⃣ Example Incoming Messages from WebSocket Server

    msg:
    ```json
            {
                type: 'gps'
                timestamp: 1754815584994873000, 
                lat: 31.6622733,
                lon: 35.0074065, 
                alt: 346.052, 
            }
    ```

================================ END of Dictionary of ROS2 WebSocket Messages senf from server ========================        


---

# T
========================================================================================================================