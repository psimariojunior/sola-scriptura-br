FROM node:20-slim

WORKDIR /app

COPY packages/backend/package*.json packages/backend/
RUN cd packages/backend && npm install --legacy-peer-deps

COPY packages/backend/tsconfig.json packages/backend/
COPY packages/backend/src packages/backend/src

RUN cd packages/backend && npm run build

WORKDIR /app
EXPOSE 4000
CMD ["node", "packages/backend/dist/main.js"]
