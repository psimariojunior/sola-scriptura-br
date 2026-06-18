import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibleModule } from '../bible/bible.module';
import { ExegesisService } from './application/exegesis.service';
import { ExegesisController } from './interface/exegesis.controller';
import { BibleVerse } from '../../infrastructure/database/entities/bible-verse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BibleVerse]), BibleModule],
  controllers: [ExegesisController],
  providers: [ExegesisService],
  exports: [ExegesisService],
})
export class ExegesisModule {}
