import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RagService } from './application/rag.service';
import { RagController } from './interface/rag.controller';
import { BibleVerse } from '../../infrastructure/database/entities/bible-verse.entity';
import { KnowledgeGraphEntity } from '../../infrastructure/database/entities/knowledge-graph.entity';
import { Commentary } from '../../infrastructure/database/entities/commentary.entity';
import { Doctrine } from '../../infrastructure/database/entities/doctrine.entity';
import { LexiconEntry } from '../../infrastructure/database/entities/lexicon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([BibleVerse, KnowledgeGraphEntity, Commentary, Doctrine, LexiconEntry]),
    ConfigModule,
  ],
  controllers: [RagController],
  providers: [RagService],
  exports: [RagService],
})
export class RagModule {}
