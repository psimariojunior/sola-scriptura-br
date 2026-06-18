import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from './application/history.service';
import { HistoryController } from './interface/history.controller';
import { BiblePerson } from '../../infrastructure/database/entities/person.entity';
import { BibleLocation } from '../../infrastructure/database/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BiblePerson, BibleLocation])],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
