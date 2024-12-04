# Use Node.js 20 as the base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package files first and install dependencies (improves caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port (ensure this matches the one in your Docker Compose)
EXPOSE 3001

# Set default environment variable
ENV PORT=3001

# Command to run the app in development mode
CMD ["npm", "run", "dev"]
