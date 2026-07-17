# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Install PM2 globally
RUN npm install -g pm2

COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/infra/database/seed.ts ./src/infra/database/seed.ts
COPY docker/entrypoint.sh /app/entrypoint.sh
COPY docker/ecosystem.config.js /app/ecosystem.config.js

RUN chmod +x /app/entrypoint.sh

USER nestjs

EXPOSE 4000

HEALTHCHECK --interval=15s --timeout=5s --retries=3 --start-period=30s \
  CMD wget --spider -q http://localhost:4000/api/v1/health || exit 1

CMD ["/app/entrypoint.sh"]
