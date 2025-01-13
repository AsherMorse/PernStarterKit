#!/bin/bash

echo "Cleaning up Docker resources..."

# Stop all containers
echo "Stopping containers..."
docker compose down

# Remove unused containers, networks, images and volumes
echo "Removing unused Docker resources..."
docker system prune -af

# Remove volumes (optional, uncomment if you want to remove database data)
# echo "Removing volumes..."
# docker volume prune -f | cat

echo "Cleanup complete!" 