# syntax=docker/dockerfile:1
FROM node:20-alpine

WORKDIR /app

# Copy only what's needed for backend
COPY packages/backend/package*.json packages/backend/

# Install dependencies including dev for typescript
RUN cd packages/backend && npm install --include=dev --legacy-peer-deps

# Copy backend source and config
COPY packages/backend/tsconfig.json packages/backend/
COPY packages/backend/src/ packages/backend/src/

# Build
RUN cd packages/backend && npx tsc -p tsconfig.json

# Remove dev deps to reduce image size
RUN cd packages/backend && npm prune --production

EXPOSE 4000
WORKDIR /app/packages/backend
CMD ["node", "dist/main.js"]
