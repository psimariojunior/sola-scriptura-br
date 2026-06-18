import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LexiconService } from './application/lexicon.service';
import { LexiconController } from './interface/lexicon.controller';
import { LexiconEntry } from '../../infrastructure/database/entities/lexicon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LexiconEntry])],
  controllers: [LexiconController],
  providers: [LexiconService],
  exports: [LexiconService],
})
export class LexiconModule {}
