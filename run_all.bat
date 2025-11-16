

@echo off
echo Activating Python virtual environment...
python -m venv venv
call venv\Scripts\activate

echo Installing backend dependencies...
pip install -r requirements.txt

echo Extracting ROS2 data...
cd ROS2\ROS2_utils
python extract_ros2_stream.py
cd ..\..

echo Starting backend server...
start cmd /k "cd backend && uvicorn main:app --reload"
start cmd /k "cd backend && uvicorn ws_server_jpg:app --reload --port 8000"

echo Starting frontend...
cd frontend
npm install
npm run dev -- --host






