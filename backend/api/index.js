const serverless = require('serverless-http');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');
const { ValidationPipe } = require('@nestjs/common');

let cachedHandler;

async function bootstrap() {
  if (cachedHandler) return cachedHandler;
  
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: '*', credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.init();
  
  cachedHandler = serverless(app.getHttpAdapter().getInstance());
  return cachedHandler;
}

module.exports = async (req, res) => {
  const handler = await bootstrap();
  return handler(req, res);
};
