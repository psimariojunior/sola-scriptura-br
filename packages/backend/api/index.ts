import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import express from 'express';

let cachedServer: express.Express;

async function createServer(): Promise<express.Express> {
  if (cachedServer) return cachedServer;

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.init();

  const server = express();
  app.use(server);

  cachedServer = server;
  return server;
}

export default async function handler(req: any, res: any) {
  const server = await createServer();
  server(req, res);
}
