#!/bin/bash

# Start the backend server
cd backend
python3 app.py &

# Wait for the backend to start
sleep 5

# Open the index.html file in the default browser
xdg-open http://localhost:5000

# Keep the script running
wait
