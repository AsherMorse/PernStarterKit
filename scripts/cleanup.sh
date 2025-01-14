#!/bin/bash

# cleanup.sh - Docker Environment Cleanup Script
#
# This script performs a thorough cleanup of Docker resources in the development environment.
# It stops all containers, removes unused resources, and optionally cleans volumes.
#
# Actions:
#   1. Stops all running containers (docker compose down)
#   2. Removes unused containers, networks, and images (docker system prune)
#   3. Optionally removes volumes (commented out by default to protect data)
#
# Warning:
#   - This script will remove ALL unused Docker resources
#   - Uncommenting the volume prune will delete ALL unused volumes including databases
#
# Usage:
#   ./cleanup.sh    - Run the cleanup process

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