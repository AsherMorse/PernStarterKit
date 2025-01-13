# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies and generate fresh package-lock.json
COPY package.json ./
RUN npm install

# Copy source code
COPY . .

# Build with Vite
RUN npm run build

# Serve stage
FROM nginx:stable-alpine
# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf
# Copy the build output from Vite's default dist directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"] 