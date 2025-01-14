# client/Dockerfile - React Frontend Container
#
# This Dockerfile uses multi-stage builds to create an optimized production image
# for the React frontend application. It builds the app with Node.js and serves
# it using Nginx for better performance.
#
# Stages:
# 1. Build - Compiles the React application using Node.js
# 2. Serve - Creates a lightweight Nginx container with the built assets
#
# Features:
# - Multi-stage build for smaller final image
# - Node.js 20 for modern JavaScript features
# - Nginx for efficient static file serving
# - Alpine-based images for minimal size
#
# Build Args: None
#
# Exposed Ports:
# - 80: HTTP (Nginx)
#
# Usage:
# - Build: docker build -t pern-client ./client
# - Run: docker run -d -p 80:80 pern-client
#   (prefer using docker-compose instead of direct docker commands)

# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
# Copy only package files first to leverage Docker cache
COPY package.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve the built application
FROM nginx:stable-alpine

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"] 