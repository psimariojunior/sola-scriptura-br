import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { ValidationPipe } from '@nestjs/common';

const server = express();
let appReady = false;

async function bootstrapApp() {
  if (appReady) return;
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
    { logger: ['error', 'warn', 'log'] },
  );
  app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: '*', credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.init();
  appReady = true;
}

export default async function handler(req: any, res: any) {
  await bootstrapApp();
  server(req, res);
}
