FROM node:20-slim

WORKDIR /app

COPY packages/backend/package*.json ./
RUN npm install --include=dev --legacy-peer-deps

COPY packages/backend/tsconfig.json ./
COPY packages/backend/src ./src

RUN npx tsc -p tsconfig.json

RUN npm prune --production

EXPOSE 4000
CMD ["node", "dist/main.js"]
