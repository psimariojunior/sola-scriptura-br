FROM node:20-alpine

WORKDIR /app

# Must set development mode - Railway may inject NODE_ENV=production into builds
ENV NODE_ENV=development

COPY packages/backend/package.json ./
RUN npm install --legacy-peer-deps

COPY packages/backend/tsconfig.json ./
COPY packages/backend/src/ src/

RUN npx tsc -p tsconfig.json

# Production deps only for runtime
RUN npm prune --production

EXPOSE 4000
CMD ["node", "dist/main.js"]
