#!/bin/bash

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