import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });

  app.use(helmet());
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Bible Scholar AI - API')
    .setDescription('Enterprise Biblical Study Platform API')
    .setVersion('1.0.0')
    .addTag('Bible', 'Biblical text operations')
    .addTag('Exegesis', 'Exegetical analysis engine')
    .addTag('Theology', 'Systematic theology engine')
    .addTag('Hermeneutics', 'Hermeneutical analysis')
    .addTag('Linguistics', 'Original language analysis')
    .addTag('Geography', 'Biblical geography and maps')
    .addTag('Archaeology', 'Biblical archaeology')
    .addTag('Knowledge Graph', 'Biblical knowledge graph')
    .addTag('RAG', 'Retrieval Augmented Generation')
    .addTag('AI Chat', 'AI chat assistant')
    .addTag('Lexicon', 'Biblical lexicons')
    .addTag('Reference', 'Cross references')
    .addTag('Chronology', 'Biblical timeline')
    .addTag('User', 'User management')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  logger.log(`Server running on http://localhost:${port}`);
  logger.log(`API docs at http://localhost:${port}/api/docs`);
}

bootstrap();
