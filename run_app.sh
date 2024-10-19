#!/bin/bash

# Start the backend server
cd backend
python3 app.py &

# Start the frontend server
cd ../frontend
npm start
