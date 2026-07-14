import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('SolaScriptura');

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

  app.use(helmet());
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
