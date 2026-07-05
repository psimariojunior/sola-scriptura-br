FROM node:20-alpine

WORKDIR /app

# Copy only backend files needed for dependency install (no lockfile to avoid workspace conflicts)
COPY packages/backend/package.json ./

# Install with dev deps so TypeScript is available
RUN npm install --include=dev --legacy-peer-deps

# Copy source and tsconfig
COPY packages/backend/tsconfig.json ./
COPY packages/backend/src/ src/

# Build TypeScript
RUN npx tsc -p tsconfig.json

# Remove dev deps to keep image small
RUN npm prune --production

EXPOSE 4000
CMD ["node", "dist/main.js"]
