#!/bin/bash

# stop.sh - PERN Stack Development Environment Shutdown
#
# This script gracefully stops all running services in the development environment.
# It preserves all data and containers for the next startup.
#
# Actions:
#   1. Stops all running containers (docker compose down)
#   2. Preserves volumes and images for next startup
#
# Note:
#   - This script only stops services, it does not remove any data
#   - Use cleanup.sh instead if you want to remove unused resources
#
# Usage:
#   ./stop.sh    - Stop all services

echo "Stopping PERN Stack containers..."

# Stop containers
docker compose down

echo "All containers stopped successfully!" 