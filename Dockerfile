FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json .
COPY packages/shared/package.json packages/shared/
COPY packages/backend/package.json packages/backend/

RUN npm install --install-strategy=hoisted

COPY . .

RUN npm run build -w packages/shared && npm run build -w packages/backend

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/packages/backend/dist ./dist
COPY --from=builder /app/packages/backend/node_modules ./node_modules
COPY --from=builder /app/packages/backend/package.json ./
COPY --from=builder /app/packages/shared/dist packages/shared/dist

EXPOSE 4000

CMD ["node", "dist/main.js"]
