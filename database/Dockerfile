# database/Dockerfile - PostgreSQL Database Container
#
# This Dockerfile sets up a PostgreSQL database container for the PERN Stack application.
# It uses the official PostgreSQL Alpine image for a lightweight footprint.
#
# Features:
# - PostgreSQL 15 on Alpine Linux
# - Automatic schema initialization
# - Lightweight container size
#
# Build Args: None
#
# Volumes (defined in docker-compose.yml):
# - PostgreSQL data directory
# - Initialization scripts
#
# Ports (defined in docker-compose.yml):
# - 5432: PostgreSQL default port
#
# Usage:
# - Build: docker build -t pern-db ./database
# - Run: docker run -d --name db pern-db
#   (prefer using docker-compose instead of direct docker commands)

# Use official PostgreSQL 15 Alpine image for smaller size
FROM postgres:15-alpine

# Copy database initialization script
# This will be automatically executed on container first run
COPY init.sql /docker-entrypoint-initdb.d/ 