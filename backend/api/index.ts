import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();
let appReady = false;

async function bootstrap() {
  if (!appReady) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
      { logger: ['error', 'warn', 'log'] },
    );
    app.setGlobalPrefix('api/v1');
    app.enableCors({
      origin: ['https://frontend-virid-three-58.vercel.app', 'http://localhost:3000'],
      credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
    appReady = true;
  }
  return server;
}

export default async function handler(req: any, res: any) {
  await bootstrap();
  server(req, res);
}
