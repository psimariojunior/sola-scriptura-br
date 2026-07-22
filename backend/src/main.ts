import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CacheInterceptor } from './infra/cache/cache.interceptor';
import { CacheService } from './infra/cache/cache.service';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const configService = app.get(ConfigService);
  const logger = new Logger('SolaScriptura');

  // Graceful shutdown
  const server = app.getHttpServer();
  
  async function gracefulShutdown(signal: string) {
    logger.log(`${signal} received. Starting graceful shutdown...`);
    
    // Stop accepting new connections
    server.close(() => {
      logger.log('HTTP server closed');
    });

    // Force close after 10s
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);

    try {
      await app.close();
      logger.log('Application closed gracefully');
      process.exit(0);
    } catch (err) {
      logger.error('Error during graceful shutdown', err);
      process.exit(1);
    }
  }

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Catch unhandled rejections
  process.on('unhandledRejection', (reason: unknown) => {
    logger.error('Unhandled Promise Rejection:', reason);
  });

  // Catch uncaught exceptions but don't crash (PM2 will restart)
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    // Don't exit - let PM2 handle restart if needed
  });

  app.setGlobalPrefix('api/v1');

  const allowedOrigins = configService
    .get('CORS_ORIGINS', 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim());

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
    exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
    credentials: true,
    maxAge: 86400,
  });

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://accounts.google.com", "https://apis.google.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://accounts.google.com", "https://oauth2.googleapis.com", "https://www.googleapis.com"],
        frameSrc: ["'self'", "https://accounts.google.com"],
        formAction: ["'self'", "https://accounts.google.com", "https://solascripturabr.com.br"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));
  app.use(compression());
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      disableErrorMessages: false,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Redis cache interceptor (only active if REDIS_HOST is configured)
  try {
    const cacheService = app.get(CacheService);
    if (cacheService.isAvailable()) {
      app.useGlobalInterceptors(new CacheInterceptor(cacheService));
      logger.log('Redis cache interceptor ativo');
    }
  } catch {
    logger.warn('Cache interceptor não configurado — cache desabilitado');
  }

  if (configService.get('NODE_ENV') !== 'production') {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sola Scriptura BR - API')
    .setDescription('API da Plataforma de Estudo Bíblico Acadêmico')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Bíblia', 'Leitura e pesquisa bíblica')
    .addTag('Exegese', 'Análise exegética')
    .addTag('Teologia', 'Teologia sistemática')
    .addTag('História', 'Contexto histórico bíblico')
    .addTag('Geografia', 'Geografia bíblica')
    .addTag('Arqueologia', 'Arqueologia bíblica')
    .addTag('Grego', 'Língua grega')
    .addTag('Hebraico', 'Língua hebraica')
    .addTag('IA', 'Assistente inteligente')
    .addTag('Autenticação', 'Login e cadastro')
    .addTag('Saúde', 'Health checks')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('PORT', 4000);
  await app.listen(port);

  logger.log(`Sola Scriptura BR rodando na porta ${port}`);
  logger.log(`Documentação: http://localhost:${port}/api/docs`);
  logger.log(`Health check: http://localhost:${port}/api/v1/health`);
}

bootstrap();
