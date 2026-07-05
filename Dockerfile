FROM node:20-alpine
ENV NODE_ENV=development
WORKDIR /app

COPY packages/backend/package.json ./
RUN npm install --legacy-peer-deps

COPY packages/backend/tsconfig.json ./
COPY packages/backend/src/ src/

RUN ./node_modules/.bin/tsc -p tsconfig.json && node -e "const f=require('fs');const t=JSON.parse(f.readFileSync('tsconfig.json','utf8'));t.compilerOptions.baseUrl='./dist';f.writeFileSync('tsconfig.json',JSON.stringify(t))"

EXPOSE 4000
CMD ["node", "-r", "tsconfig-paths/register", "dist/main.js"]
