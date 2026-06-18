import type { VercelRequest, VercelResponse } from '@vercel/node';

let handler: any = null;

export default async function apiHandler(req: VercelRequest, res: VercelResponse) {
  if (!handler) {
    const { NestFactory } = await import('@nestjs/core');
    const { AppModule } = await import('../src/app.module');
    const { ValidationPipe } = await import('@nestjs/common');
    
    const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
    app.setGlobalPrefix('api/v1');
    app.enableCors({ origin: '*', credentials: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
    handler = app.getHttpAdapter().getInstance();
  }
  
  return handler(req, res);
}
