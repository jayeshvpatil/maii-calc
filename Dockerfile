# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy all source code
COPY . .

# Build the React application
RUN npm run build

# --- Run stage ---
FROM nginx:alpine AS runtime

# Copy built application to nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Set environment variables
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]