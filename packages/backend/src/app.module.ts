import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bullmq';

import { DatabaseConfig } from '@common/database/database.config';
import { BibleModule } from '@modules/bible/bible.module';
import { ExegesisModule } from '@modules/exegesis/exegesis.module';
import { TheologyModule } from '@modules/theology/theology.module';
import { HermeneuticsModule } from '@modules/hermeneutics/hermeneutics.module';
import { LinguisticsModule } from '@modules/linguistics/linguistics.module';
import { GeographyModule } from '@modules/geography/geography.module';
import { ArchaeologyModule } from '@modules/archaeology/archaeology.module';
import { KnowledgeGraphModule } from '@modules/knowledge-graph/knowledge-graph.module';
import { RagModule } from '@modules/rag/rag.module';
import { AiModule } from '@modules/ai/ai.module';
import { ChatModule } from '@modules/chat/chat.module';
import { ReferenceModule } from '@modules/reference/reference.module';
import { LexiconModule } from '@modules/lexicon/lexicon.module';
import { HistoryModule } from '@modules/history/history.module';
import { ChronologyModule } from '@modules/chronology/chronology.module';
import { AtlasModule } from '@modules/atlas/atlas.module';
import { MapModule } from '@modules/map/map.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    EventEmitterModule.forRoot({ wildcard: true }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfig }),
    CacheModule.register({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    BibleModule,
    ExegesisModule,
    TheologyModule,
    HermeneuticsModule,
    LinguisticsModule,
    GeographyModule,
    ArchaeologyModule,
    KnowledgeGraphModule,
    RagModule,
    AiModule,
    ChatModule,
    ReferenceModule,
    LexiconModule,
    HistoryModule,
    ChronologyModule,
    AtlasModule,
    MapModule,
    UserModule,
  ],
})
export class AppModule {}
