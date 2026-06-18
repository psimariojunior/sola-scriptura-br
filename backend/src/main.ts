import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { OpenTelemetry } from './infra/observabilidade/opentelemetry';

async function bootstrap() {
  OpenTelemetry.iniciar();

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('SolaScriptura');

  app.setGlobalPrefix('api/v1');

  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());

  app.enableCors({
    origin: configService.get('FRONTEND_URL', 'http://localhost:3000'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sola Scriptura BR - API')
    .setDescription('API da Plataforma de Estudo Bíblico Sola Scriptura')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Bíblia', 'Leitura e navegação bíblica')
    .addTag('Exegese', 'Análise exegética de textos')
    .addTag('Hermenêutica', 'Interpretação bíblica')
    .addTag('Teologia', 'Doutrinas teológicas')
    .addTag('Grego', 'Grego Koiné')
    .addTag('Hebraico', 'Hebraico Bíblico')
    .addTag('História', 'História bíblica')
    .addTag('Geografia', 'Geografia bíblica e mapas')
    .addTag('Arqueologia', 'Arqueologia bíblica')
    .addTag('IA', 'Inteligência artificial para estudos')
    .addTag('Pesquisa', 'Busca avançada')
    .addTag('Autenticação', 'Login e segurança')
    .addTag('Usuário', 'Perfil do usuário')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('PORT', 4000);
  await app.listen(port);

  logger.log(`Sola Scriptura BR rodando na porta ${port}`);
  logger.log(`Documentação Swagger: http://localhost:${port}/api/docs`);
  logger.log(`Ambiente: ${configService.get('NODE_ENV', 'development')}`);
}

bootstrap();
