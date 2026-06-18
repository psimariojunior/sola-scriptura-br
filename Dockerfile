# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json tsconfig*.json ./
COPY packages/shared/package.json packages/shared/
COPY packages/backend/package.json packages/backend/
COPY packages/frontend/package.json packages/frontend/

RUN npm install

COPY . .

RUN npm run build

# Backend production
FROM node:20-alpine AS backend
WORKDIR /app
COPY --from=builder /app/packages/backend/dist ./dist
COPY --from=builder /app/packages/backend/package.json ./
RUN npm install --production
EXPOSE 4000
CMD ["node", "dist/main.js"]

# Frontend production
FROM node:20-alpine AS frontend
WORKDIR /app
COPY --from=builder /app/packages/frontend/.next ./.next
COPY --from=builder /app/packages/frontend/public ./public
COPY --from=builder /app/packages/frontend/package.json ./
RUN npm install --production
EXPOSE 3000
CMD ["npx", "next", "start"]
