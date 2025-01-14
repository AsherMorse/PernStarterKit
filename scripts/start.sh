#!/bin/bash

# start.sh - PERN Stack Development Environment Launcher
#
# This script starts all services required for the PERN Stack development environment.
# It builds and launches containers, waits for them to be ready, and displays access URLs.
#
# Actions:
#   1. Builds and starts all containers in detached mode
#   2. Waits for services to initialize
#   3. Verifies container status
#   4. Displays access URLs for all services
#
# Environment Variables (optional):
#   CLIENT_URL - Override client URL (default: http://localhost:3000)
#   API_URL    - Override API URL (default: http://localhost:8080)
#   DB_HOST    - Override database host (default: localhost)
#
# Usage:
#   ./start.sh    - Start all services

echo "Starting PERN Stack containers..."

# Build and start containers in detached mode
docker compose up -d --build

# Wait for containers to be ready
echo "Waiting for services to be ready..."
sleep 5

# Check if containers are running
echo "Checking container status..."
docker compose ps

echo "Services are running at:"
echo "- Client: ${CLIENT_URL:-http://localhost:3000}"
echo "- API: ${API_URL:-http://localhost:8080}"
echo "- Database: ${DB_HOST:-localhost}:5438" 