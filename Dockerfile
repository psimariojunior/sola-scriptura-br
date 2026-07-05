FROM node:20-alpine
ENV NODE_ENV=development
WORKDIR /app

COPY packages/backend/package.json ./
RUN npm install --legacy-peer-deps

COPY packages/backend/tsconfig.json ./
COPY packages/backend/src/ src/

RUN ./node_modules/.bin/tsc -p tsconfig.json

EXPOSE 4000
CMD ["node", "dist/main.js"]
