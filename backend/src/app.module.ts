import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

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
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AdminModule } from './modules/admin/admin.module';
import { PlanoLeituraModule } from './modules/plano-leitura/plano-leitura.module';
import { FavoritosModule } from './modules/favoritos/favoritos.module';
import { NotasModule } from './modules/notas/notas.module';
import { DicionarioModule } from './modules/dicionario/dicionario.module';
import { PesquisaModule } from './modules/pesquisa/pesquisa.module';
import { SegurancaModule } from './infra/seguranca/seguranca.module';
import { RedisModule } from './infra/cache/redis.module';
import { ElasticsearchModule } from './infra/busca/elasticsearch.module';
import { RabbitMQModule } from './infra/mensageria/rabbitmq.module';
import { SaudeController } from './modules/saude.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.local'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get('DATABASE_URL');
        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
            logging: false,
          };
        }
        return {
          type: 'postgres',
          host: config.get('DB_HOST') || config.get('PGHOST') || 'localhost',
          port: parseInt(config.get('DB_PORT') || config.get('PGPORT') || '5432'),
          username: config.get('DB_USER') || config.get('PGUSER') || 'sola_scriptura',
          password: config.get('DB_PASSWORD') || config.get('PGPASSWORD') || 'sola_scriptura',
          database: config.get('DB_NAME') || config.get('PGDATABASE') || 'sola_scriptura',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          ssl: config.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
          logging: config.get('NODE_ENV') !== 'production',
        };
      },
    }),
    EventEmitterModule.forRoot({ wildcard: true }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.THROTTLE_TTL || '60000'),
        limit: parseInt(process.env.THROTTLE_LIMIT || '100'),
      },
    ]),
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
    AutenticacaoModule,
    UsuarioModule,
    AdminModule,
    PlanoLeituraModule,
    FavoritosModule,
    NotasModule,
    DicionarioModule,
    PesquisaModule,
    SegurancaModule,
    RedisModule,
    ElasticsearchModule,
    RabbitMQModule,
  ],
  controllers: [SaudeController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
