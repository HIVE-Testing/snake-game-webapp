#!/bin/bash

# Simple script to run the snake game locally
echo "Starting Snake Game Web App..."
echo "Please open your browser and navigate to http://localhost:8080"

# Try to start a simple HTTP server
if command -v python3 &> /dev/null; then
    echo "Using Python 3 to serve files..."
    python3 -m http.server 8080
elif command -v http-server &> /dev/null; then
    echo "Using http-server to serve files..."
    http-server . -p 8080
else
    echo "No web server found. Please install Python 3 or http-server:"
    echo "  Python 3: https://www.python.org/downloads/"
    echo "  http-server: npm install -g http-server"
    echo ""
    echo "Then run this script again."
fi