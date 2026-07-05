FROM node:20-alpine AS builder
ENV NODE_ENV=development
WORKDIR /app

COPY package.json ./
COPY packages/shared/package.json packages/shared/
COPY packages/backend/package.json packages/backend/

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build -w @bible-scholar/shared && npm run build -w @bible-scholar/backend

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/packages/backend/dist packages/backend/dist
COPY --from=builder /app/packages/backend/node_modules packages/backend/node_modules
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json ./

EXPOSE 4000
CMD ["node", "packages/backend/dist/main.js"]
