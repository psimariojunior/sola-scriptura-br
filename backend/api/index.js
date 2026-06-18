module.exports = async (req, res) => {
  try {
    const serverless = require('serverless-http');
    const { NestFactory } = require('@nestjs/core');
    const { AppModule } = require('../dist/app.module');
    const { ValidationPipe } = require('@nestjs/common');

    const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
    app.setGlobalPrefix('api/v1');
    app.enableCors({ origin: '*', credentials: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    const handler = serverless(app.getHttpAdapter().getInstance());
    return handler(req, res);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
      name: error.name,
    });
  }
};
