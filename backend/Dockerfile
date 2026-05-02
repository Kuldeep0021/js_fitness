# Backend Dockerfile for Node/Express API
# Multi-stage build to keep image small
FROM node:18-alpine AS deps
WORKDIR /app

# Install dependencies (production only)
COPY package*.json ./
RUN npm ci --production

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

# Expose default backend port
EXPOSE 5000

# Healthcheck (adjust path/port if your server uses a different health endpoint)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD wget -qO- --no-check-certificate http://127.0.0.1:5000/ || exit 1

# Run the server. Ensure required env vars are provided at runtime: MONGO_URI, JWT_SECRET, NODE_ENV
CMD ["node", "server.js"]
