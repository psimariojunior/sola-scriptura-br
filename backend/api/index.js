const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { ValidationPipe } = require('@nestjs/common');

let app;

async function bootstrap() {
  if (!app) {
    const instance = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
    instance.setGlobalPrefix('api/v1');
    instance.enableCors({ origin: '*', credentials: true });
    instance.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await instance.init();
    app = instance.getHttpAdapter().getInstance();
  }
  return app;
}

module.exports = async (req, res) => {
  const handler = await bootstrap();
  return handler(req, res);
};
