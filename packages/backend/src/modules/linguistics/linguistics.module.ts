import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinguisticsService } from './application/linguistics.service';
import { LinguisticsController } from './interface/linguistics.controller';
import { WordAnalysis } from '../../infrastructure/database/entities/word-analysis.entity';
import { LexiconEntry } from '../../infrastructure/database/entities/lexicon.entity';
import { BibleModule } from '../bible/bible.module';

@Module({
  imports: [TypeOrmModule.forFeature([WordAnalysis, LexiconEntry]), BibleModule],
  controllers: [LinguisticsController],
  providers: [LinguisticsService],
  exports: [LinguisticsService],
})
export class LinguisticsModule {}
