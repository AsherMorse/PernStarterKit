# server/Dockerfile - Express Backend Container
#
# This Dockerfile sets up the Node.js environment for the Express backend.
# Uses multi-stage build pattern for optimized production deployment.
#
# Features:
# - Node.js 20 on Alpine Linux for minimal size
# - Proper dependency caching
# - Production-ready configuration
#
# Build Args: None
#
# Exposed Ports:
# - 3000: Express server
#
# Usage:
# - Build: docker build -t pern-server ./server
# - Run: docker run -d -p 3000:3000 pern-server
#   (prefer using docker-compose instead of direct docker commands)

# Use Node.js 20 Alpine as the base image
FROM node:20-alpine

# Set working directory for all subsequent commands
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json package-lock.json ./
RUN npm install

# Copy application source code
COPY . .

# Expose the Express server port
EXPOSE 3000

# Start the server in production mode
CMD ["npm", "run", "start"] 