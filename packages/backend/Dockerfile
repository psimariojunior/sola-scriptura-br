FROM node:20-alpine AS builder
WORKDIR /app

COPY packages/backend/package.json ./
COPY packages/backend/tsconfig.json ./
COPY packages/backend/nest-cli.json ./
COPY packages/backend/src/ ./src/

RUN npm install
RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 4000

CMD ["node", "dist/main.js"]
