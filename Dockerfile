# Stage 1: Build the application
FROM node:16.20.2-alpine AS build

WORKDIR /trello_app

# Install required build tools
RUN apk add --no-cache python3 make g++

# Copy only the package.json files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy built files from the build stage
COPY --from=build /trello_app/build .

# Create a directory for other files and move everything except index.html
RUN mkdir mocktrello && \
    find . -maxdepth 1 ! -name 'index.html' ! -name '.' ! -name '..' -exec mv {} mocktrello/ \;

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
