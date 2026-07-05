FROM node:20

WORKDIR /app

COPY packages/backend/package.json ./
RUN npm install --legacy-peer-deps

COPY packages/backend/tsconfig.json ./
COPY packages/backend/src ./src

RUN npm run build

RUN npm prune --production

EXPOSE 4000
CMD ["node", "dist/main.js"]
