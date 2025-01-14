#!/bin/bash

# logs.sh - Docker Compose Log Viewer
# 
# This script provides a convenient way to view logs from Docker Compose services.
# It can show logs for all services or a specific service.
#
# Usage:
#   ./logs.sh             - View logs for all services
#   ./logs.sh <service>   - View logs for a specific service
#
# Examples:
#   ./logs.sh            - Shows logs for all services
#   ./logs.sh server     - Shows logs for the server service
#   ./logs.sh client     - Shows logs for the client service
#

# Check if a service name was provided
if [ -z "$1" ]; then
    echo "Showing logs for all services..."
    docker compose logs -f
else
    echo "Showing logs for $1..."
    docker compose logs -f "$1"
fi 