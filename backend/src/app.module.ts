import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { RedisModule } from './infra/cache/redis.module';
import { ElasticsearchModule } from './infra/busca/elasticsearch.module';
import { RabbitMQModule } from './infra/mensageria/rabbitmq.module';
import { OpenTelemetryModule } from './infra/observabilidade/opentelemetry.module';

import { BibliaModule } from './modules/biblia/biblia.module';
import { ExegeseModule } from './modules/exegese/exegese.module';
import { HermeneuticaModule } from './modules/hermeneutica/hermeneutica.module';
import { TeologiaModule } from './modules/teologia/teologia.module';
import { HistoriaModule } from './modules/historia/historia.module';
import { GeografiaModule } from './modules/geografia/geografia.module';
import { ArqueologiaModule } from './modules/arqueologia/arqueologia.module';
import { GregoModule } from './modules/grego/grego.module';
import { HebraicoModule } from './modules/hebraico/hebraico.module';
import { CronologiaModule } from './modules/cronologia/cronologia.module';
import { PersonagensModule } from './modules/personagens/personagens.module';
import { ReferenciasModule } from './modules/referencias/referencias.module';
import { ComentariosModule } from './modules/comentarios/comentarios.module';
import { IaModule } from './modules/ia/ia.module';
import { PesquisaModule } from './modules/pesquisa/pesquisa.module';
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AdminModule } from './modules/admin/admin.module';
import { PlanoLeituraModule } from './modules/plano-leitura/plano-leitura.module';
import { FavoritosModule } from './modules/favoritos/favoritos.module';
import { NotasModule } from './modules/notas/notas.module';
import { DicionarioModule } from './modules/dicionario/dicionario.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '.env.production'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get('DB_PORT', 5432),
        username: config.get('DB_USER', 'sola_scriptura'),
        password: config.get('DB_PASSWORD', 'sola_scriptura'),
        database: config.get('DB_NAME', 'sola_scriptura'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('NODE_ENV') === 'development',
        logging: config.get('NODE_ENV') === 'development',
        ssl: config.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
        migrations: [__dirname + '/infra/database/migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations',
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/infra/graphql/schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',
      context: ({ req, res }) => ({ req, res }),
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    EventEmitterModule.forRoot({ wildcard: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
    }),
    RedisModule,
    ElasticsearchModule,
    RabbitMQModule,
    OpenTelemetryModule,

    BibliaModule,
    ExegeseModule,
    HermeneuticaModule,
    TeologiaModule,
    HistoriaModule,
    GeografiaModule,
    ArqueologiaModule,
    GregoModule,
    HebraicoModule,
    CronologiaModule,
    PersonagensModule,
    ReferenciasModule,
    ComentariosModule,
    IaModule,
    PesquisaModule,
    AutenticacaoModule,
    UsuarioModule,
    AdminModule,
    PlanoLeituraModule,
    FavoritosModule,
    NotasModule,
    DicionarioModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
