FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json tsconfig*.json ./
COPY packages/shared/package.json packages/shared/
COPY packages/backend/package.json packages/backend/
COPY packages/frontend/package.json packages/frontend/

RUN npm install

COPY . .

# Only build shared + backend (frontend is deployed on Vercel)
RUN npm run build -w packages/shared && npm run build -w packages/backend

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/packages/backend/dist ./packages/backend/dist
COPY --from=builder /app/packages/backend/node_modules ./packages/backend/node_modules
COPY --from=builder /app/packages/backend/package.json ./packages/backend/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 4000

CMD ["node", "packages/backend/dist/main.js"]
