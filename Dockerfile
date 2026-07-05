FROM node:20-alpine AS builder
ENV NODE_ENV=development
WORKDIR /app

COPY packages/backend/package.json ./
RUN npm install --legacy-peer-deps

COPY packages/backend/tsconfig.json ./
COPY packages/backend/src ./src

RUN npm run build

FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 4000
CMD ["node", "dist/main.js"]
