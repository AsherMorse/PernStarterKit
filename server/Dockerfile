# Use an official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the server port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"] 