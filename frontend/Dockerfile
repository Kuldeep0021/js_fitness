# Frontend Dockerfile for Next.js standalone output
FROM node:18-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production

# Install deps
COPY package*.json ./
RUN npm ci --production=false

# Copy rest and build
COPY . .
RUN npm run build

# Runner image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy standalone build and static assets
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
