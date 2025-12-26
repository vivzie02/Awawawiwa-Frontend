# ---- Build stage ----
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source
COPY . .

# Build the production assets
RUN npm run build


# ---- Production stage ----
FROM nginx:alpine

# Copy built assets to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 (Nginx serves on 80)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
